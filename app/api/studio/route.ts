import { and, desc, eq, ne, or, sql } from "drizzle-orm";
import { z } from "zod";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { activity, homework, members } from "../../../db/schema";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "private, no-store" };
const json = (data: unknown, status = 200) => Response.json(data, { status, headers });

const id = z.string().uuid();
const entry = z.object({ key: z.string().regex(/^[a-z0-9][a-z0-9:_-]{0,95}$/i), value: z.unknown() });
const change = z.discriminatedUnion("type", [
  z.object({ type: z.literal("activity"), entries: z.array(entry).min(1).max(24) }),
  z.object({ type: z.literal("pair-create") }),
  z.object({ type: z.literal("pair-join"), code: id }),
  z.object({ type: z.literal("pair-leave") }),
  z.object({ type: z.literal("submit"), id, alias: z.string().trim().min(1).max(48), level: z.enum(["A1", "A2", "B1", "B2", "C1"]), kind: z.enum(["Schreiben", "Sprechen"]), task: z.string().trim().min(1).max(1500), body: z.string().trim().min(1).max(6000), shared: z.boolean() }),
  z.object({ type: z.literal("share"), id, shared: z.boolean() }),
  z.object({ type: z.literal("review"), id, scores: z.array(z.number().int().min(0).max(5).nullable()).length(4), feedback: z.string().trim().min(1).max(2500) }),
]);

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return json({ error: "Войди, чтобы синхронизировать прогресс." }, 401);
  const db = getDb();
  const currentDuo = db.select({ duo: members.duo }).from(members).where(eq(members.owner, user.userId));
  const owner = eq(homework.owner, user.userId);
  const [records, submissions, membership] = await Promise.all([
    db.select({ key: activity.key, payload: activity.payload }).from(activity).where(eq(activity.owner, user.userId)),
    db.select().from(homework).where(or(owner, eq(homework.duo, currentDuo))).orderBy(desc(homework.submitted)).limit(250),
    db.select({ code: members.duo, count: sql<number>`(select count(*) from members as peer where peer.duo = ${members.duo})` }).from(members).where(eq(members.owner, user.userId)).get(),
  ]);
  return json({
    records: Object.fromEntries(records.map(({ key, payload }) => [key, JSON.parse(payload)])),
    submissions: submissions.map(({ owner, duo, review, ...row }) => ({ ...row, own: owner === user.userId, shared: Boolean(duo && membership && duo === membership.code), review: review ? JSON.parse(review) : null })),
    pair: membership ? { code: membership.count === 1 ? membership.code : null, count: membership.count } : null,
  });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return json({ error: "Требуется вход." }, 401);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin && origin !== new URL(request.url).origin && fetchSite !== "same-origin") return json({ error: "Запрос из другого источника." }, 403);
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return json({ error: "Запрос из другого источника." }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({ error: "Ожидаются данные JSON." }, 415);
  const raw = await request.text();
  if (raw.length > 64_000) return json({ error: "Слишком длинная запись." }, 413);
  let input: unknown;
  try { input = JSON.parse(raw); } catch { return json({ error: "Некорректный запрос." }, 400); }
  const result = change.safeParse(input);
  if (!result.success) return json({ error: "Проверь обязательные поля и длину ответа." }, 400);
  const data = result.data;
  const db = getDb();
  const currentDuo = db.select({ duo: members.duo }).from(members).where(eq(members.owner, user.userId));
  switch (data.type) {
    case "activity": {
      const items = data.entries.map(({ key, value }) => ({ owner: user.userId, key, payload: JSON.stringify(value) ?? "null" }));
      if (items.some(({ payload }) => payload.length > 12_000)) return json({ error: "Слишком длинная запись." }, 413);
      await db.insert(activity).values(items).onConflictDoUpdate({ target: [activity.owner, activity.key], set: { payload: sql`excluded.payload` } });
      break;
    }
    case "pair-create":
      await db.insert(members).values({ owner: user.userId, duo: crypto.randomUUID() }).onConflictDoNothing({ target: members.owner });
      break;
    case "pair-join": {
      // The count and insert share one SQLite statement so two joiners cannot claim the last seat.
      const joined = await db.all(sql`insert into members (owner, duo)
        select ${user.userId}, ${data.code}
        where (select count(*) from members where duo = ${data.code}) = 1
        on conflict (owner) do nothing returning owner`);
      if (!joined.length) return json({ error: "Код уже использован, отозван или у тебя уже есть пара." }, 409);
      break;
    }
    case "pair-leave": {
      const pair = await db.select().from(members).where(eq(members.owner, user.userId)).get();
      if (pair) await db.delete(members).where(eq(members.duo, pair.duo));
      break;
    }
    case "submit": {
      const pair = data.shared ? await db.select().from(members).where(eq(members.owner, user.userId)).get() : null;
      if (data.shared && !pair) return json({ error: "Сначала создай пару." }, 409);
      await db.insert(homework).values({ id: data.id, owner: user.userId, alias: data.alias, level: data.level, kind: data.kind, task: data.task, body: data.body, duo: pair?.duo ?? null, submitted: new Date().toISOString() }).onConflictDoNothing({ target: homework.id });
      break;
    }
    case "share": {
      const pair = data.shared ? await db.select().from(members).where(eq(members.owner, user.userId)).get() : null;
      if (data.shared && !pair) return json({ error: "Сначала создай пару." }, 409);
      const updated = await db.update(homework).set({ duo: pair?.duo ?? null }).where(and(eq(homework.id, data.id), eq(homework.owner, user.userId))).returning({ id: homework.id });
      if (!updated.length) return json({ error: "Работа недоступна." }, 404);
      break;
    }
    case "review": {
      const accessible = and(eq(homework.id, data.id), ne(homework.owner, user.userId), eq(homework.duo, currentDuo));
      const submission = await db.select({ kind: homework.kind }).from(homework).where(accessible).get();
      if (!submission) return json({ error: "Работа недоступна для проверки." }, 404);
      if (data.scores.some((score, index) => score === null && (submission.kind !== "Sprechen" || (index !== 1 && index !== 3)))) return json({ error: "Заполни обязательные критерии." }, 400);
      const review = JSON.stringify({ scores: data.scores, feedback: data.feedback, date: new Date().toISOString() });
      const updated = await db.update(homework).set({ review }).where(accessible).returning({ id: homework.id });
      if (!updated.length) return json({ error: "Работа недоступна для проверки." }, 404);
      break;
    }
  }
  return json({ ok: true });
}
