"use client";

import { useState } from "react";
import { levelOrder, openTasks, rubrics, type Level } from "../lib/course";
import { missions, tracks, type Track } from "../lib/tracks";
import { dateKey, displayDate, newId, values, type Account, type Work, type useStudioState } from "./state";
import { Icon, SectionHead } from "./ui";

type State = ReturnType<typeof useStudioState>;
export type Assignment = { level: Level; variant: "A" | "B"; subject: "general" | "track" };

export function Duo({ account, state, track, selection }: { account: Account | null; state: State; track: Track; selection: Assignment }) {
  const [level, setLevel] = useState(selection.level);
  const [variant, setVariant] = useState(selection.variant);
  const [subject, setSubject] = useState(selection.subject);
  const [kind, setKind] = useState<Work["kind"]>("Schreiben");
  const [alias, setAlias] = useState("Участница");
  const [body, setBody] = useState("");
  const [share, setShare] = useState(false);
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingLeave, setPendingLeave] = useState(false);
  const pack = openTasks[level][variant === "A" ? 0 : 1];
  const mission = missions[track][level];
  const task = kind === "Schreiben" ? subject === "track" ? mission.write : pack.write : subject === "track" ? mission.speak : pack.speak;
  const pair = state.cloud.pair;
  const submissions = account ? state.cloud.submissions : values<Work>(state.records, "draft:").map(([, value]) => value).reverse();
  const words = body.trim().split(/\s+/u).filter(Boolean).length;
  const paired = pair?.count === 2;

  async function action(value: Record<string, unknown>, message: string) {
    if (busy) return false;
    setBusy(true);
    setNotice("");
    try {
      await state.act(value);
      setNotice(message);
      return true;
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Связь прервалась. Попробуй ещё раз.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!body.trim()) return;
    const id = newId();
    if (!account) {
      state.save({ [`draft:${id}`]: { id, alias, level, kind, task, body: body.trim(), own: true, shared: false, submitted: dateKey(), review: null } });
      setBody("");
      setNotice("Черновик сохранён в этом браузере.");
      return;
    }
    const saved = await action({ type: "submit", id, alias, level, kind, task, body, shared: Boolean(paired && share) }, paired && share ? "Работа отправлена в пару." : "Работа сохранена в личном кабинете.");
    if (saved) { setBody(""); setShare(false); }
  }

  async function copyCode(value: string) {
    try { await navigator.clipboard.writeText(value); setNotice("Код скопирован. Отправь его только партнёрше."); }
    catch { setNotice("Выдели код в поле и скопируй его вручную."); }
  }

  return <>
    <SectionHead code="DUO / 05" title="Мастерская вдвоём" detail="Письмо и устные задания. У каждой свой кабинет, обмен работами включается отдельно." />
    <div className="two-column">
      <section className="panel">
        <div className="eyebrow"><Icon name="duo" /> СВЯЗЬ В ПАРЕ</div>
        <h2>{paired ? "Пара подключена" : pair ? "Пригласи партнёршу" : "Твоя учебная пара"}</h2>
        {!account ? <><p className="muted">Войди через ChatGPT, чтобы получить код или присоединиться. Гостевые черновики хранятся в этом браузере.</p><a className="primary" href="/signin-with-chatgpt?return_to=%2F%23duo" target="_top">Войти через ChatGPT</a></> :
          paired ? <><p className="muted">Партнёрша видит работы, которыми ты поделилась. Личные черновики и прогресс доступны только тебе.</p><div className="actions"><button className="secondary" onClick={() => void state.refresh()}>Обновить</button><button className="ghost" onClick={() => setPendingLeave(!pendingLeave)}>Управлять парой</button></div>{pendingLeave && <div className="notice"><p>При разрыве пары общий доступ к работам закроется у обеих участниц.</p><button className="secondary" disabled={busy} onClick={() => void action({ type: "pair-leave" }, "Пара отключена.").then((ok) => { if (ok) setPendingLeave(false); })}>Отключить пару</button></div>}</> :
            pair?.code ? <><p className="muted">Код действует для одного присоединения. Партнёрша входит в свой аккаунт и вводит его здесь.</p><label className="field"><span>Код пары</span><input value={pair.code} readOnly onFocus={(e) => e.target.select()} /></label><div className="actions"><button className="primary" onClick={() => void copyCode(pair.code!)}>Скопировать код</button><button className="secondary" onClick={() => void state.refresh()}>Обновить</button><button className="ghost" disabled={busy} onClick={() => void action({ type: "pair-leave" }, "Код отозван.")}>Отозвать код</button></div></> :
              <><p className="muted">Создай одноразовый код или введи код от партнёрши. Обе сможете учиться и по желанию проверять работы.</p><button className="primary" disabled={busy} onClick={() => void action({ type: "pair-create" }, "Код готов.")}>Создать код</button><form className="inline-form" onSubmit={(e) => { e.preventDefault(); void action({ type: "pair-join", code: code.trim() }, "Пара подключена."); }}><label className="field"><span>Полученный код</span><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Вставь код" maxLength={40} required /></label><button className="secondary" disabled={busy || !code.trim()}>Подключиться</button></form></>}
      </section>
      <section className="panel">
        <div className="eyebrow">РУБРИКА / 4 × 5</div>
        <h2>Как давать обратную связь</h2>
        <ol className="compact-list"><li>Отметь, что получилось, и назови одну конкретную деталь.</li><li>Выбери до трёх важных исправлений, объясни причину.</li><li>Попроси использовать исправленную конструкцию в новой фразе.</li></ol>
        <p className="hint">Шкала 0–5 на критерий. Для устной работы оцените произношение и темп после живого разговора. В кабинете можно сохранить транскрипт или план.</p>
      </section>
    </div>
    {notice && <div role="status" className="notice">{notice}</div>}
    <section className="panel">
      <div className="eyebrow">SCHREIBEN / SPRECHEN</div>
      <h2>Сдать работу</h2>
      <form onSubmit={(e) => { e.preventDefault(); void submit(); }}>
        <div className="form-grid">
          <label className="field"><span>Уровень</span><select value={level} onChange={(e) => setLevel(e.target.value as Level)}>{levelOrder.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="field"><span>Тип</span><select value={kind} onChange={(e) => setKind(e.target.value as Work["kind"])}><option>Schreiben</option><option>Sprechen</option></select></label>
          <label className="field"><span>Ветка</span><select value={subject} onChange={(e) => setSubject(e.target.value as Assignment["subject"])}><option value="general">Общая учебная</option><option value="track">{tracks[track].label}</option></select></label>
          {subject === "general" && <label className="field"><span>Вариант</span><select value={variant} onChange={(e) => setVariant(e.target.value as Assignment["variant"])}><option>A</option><option>B</option></select></label>}
        </div>
        <blockquote lang="de">{task}</blockquote>
        <p className="muted">Ориентир · {kind === "Schreiben" ? pack.words : pack.time}</p>
        <label className="field"><span>{kind === "Schreiben" ? "Текст на немецком" : "Транскрипт или опорные тезисы"}</span><textarea lang="de" value={body} onChange={(e) => setBody(e.target.value)} rows={6} maxLength={6000} placeholder="Schreib hier …" required /></label>
        <div className="quiz-actions"><small className="muted">{words} слов</small>{paired && <label className="checkline"><input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} /> Поделиться с партнёршей</label>}</div>
        {share && paired && <label className="field"><span>Подпись для партнёрши</span><input value={alias} onChange={(e) => setAlias(e.target.value)} maxLength={48} required /></label>}
        <button className="primary" disabled={busy || !body.trim()}>{paired && share ? "Отправить в пару" : "Сохранить для себя"}</button>
      </form>
    </section>
    <section className="panel">
      <div className="eyebrow">ABGABEN</div>
      <h2>Работы и разборы</h2>
      {submissions.length ? submissions.map((work) => <Submission key={work.id} work={work} busy={busy} paired={paired} action={action} />) : <p className="muted">Здесь появится первая сохранённая работа.</p>}
    </section>
  </>;
}

function Submission({ work, paired, busy, action }: { work: Work; paired: boolean; busy: boolean; action: (body: Record<string, unknown>, message: string) => Promise<boolean> }) {
  const [editing, setEditing] = useState(false);
  const [scores, setScores] = useState(work.review?.scores.map((value) => value === null ? "unmeasured" : String(value)) ?? ["", "", "", ""]);
  const [feedback, setFeedback] = useState(work.review?.feedback ?? "");
  return <details className="work-item">
    <summary><span><strong>{work.kind} · {work.level}</strong><small>{work.own ? work.shared ? "Моя · в паре" : "Моя · личная" : work.alias} · {displayDate(work.submitted)}</small></span><span className="pill">{work.review ? "Проверено" : work.shared ? "В паре" : "Черновик"}</span></summary>
    <div className="work-content"><p className="muted" lang="de">{work.task}</p><p className="submitted-text" lang="de">{work.body}</p>
      {work.review && <div className="feedback good"><strong>{work.review.scores.includes(null) ? "Частичный разбор" : `Учебная рубрика · ${work.review.scores.reduce<number>((sum, score) => sum + (score ?? 0), 0)} / 20`}</strong><p>{work.review.feedback}</p><small>{rubrics[work.kind].map((item, i) => `${item} ${work.review!.scores[i] === null ? "не измерено" : `${work.review!.scores[i]}/5`}`).join(" · ")}</small></div>}
      {work.own && paired && <button className="secondary" disabled={busy} onClick={() => void action({ type: "share", id: work.id, shared: !work.shared }, work.shared ? "Работа стала личной." : "Работа теперь видна партнёрше.")}>{work.shared ? "Сделать личной" : "Поделиться с партнёршей"}</button>}
      {!work.own && <button className="secondary" onClick={() => setEditing(!editing)}>{editing ? "Свернуть рубрику" : work.review ? "Обновить разбор" : "Проверить по рубрике"}</button>}
      {editing && <form onSubmit={(e) => { e.preventDefault(); void action({ type: "review", id: work.id, scores: scores.map((score) => score === "unmeasured" ? null : Number(score)), feedback }, "Разбор сохранён.").then((ok) => { if (ok) setEditing(false); }); }}>
        <div className="form-grid">{rubrics[work.kind].map((label, i) => <label className="field" key={label}><span>{label}</span><select required value={scores[i]} onChange={(e) => setScores(scores.map((score, index) => index === i ? e.target.value : score))}><option value="">Баллы</option>{work.kind === "Sprechen" && (i === 1 || i === 3) && <option value="unmeasured">Не измерено</option>}{[0, 1, 2, 3, 4, 5].map((score) => <option key={score}>{score}</option>)}</select></label>)}</div>
        <label className="field"><span>Разбор и следующий шаг</span><textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} maxLength={2500} required /></label><button className="primary" disabled={busy || scores.includes("") || !feedback.trim()}>Сохранить разбор</button>
      </form>}
    </div>
  </details>;
}
