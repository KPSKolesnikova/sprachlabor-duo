"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Level } from "../lib/course";
import type { Result } from "./quiz";

export type Account = { id: string; name: string };
export type AnswerLog = { ok: boolean; solved: boolean; last: string; day: string };
export type CardLog = { step: number; due: string; day: string };
export type Admission = { program: string; language: string; certificate: string; deadline: string; source: string };
export type Note = { code: string; wrong: string; correct: string; due: string; closed: boolean };
export type Lexeme = { text: string; level: Level; category: string; checks: boolean[]; added: string };
export type FullMock = { name: string; date: string; reading: string; listening: string; writing: string; speaking: string; fresh: boolean };
export type Review = { scores: (number | null)[]; feedback: string; date: string };
export type Work = { id: string; alias: string; level: Level; kind: "Schreiben" | "Sprechen"; task: string; body: string; own: boolean; shared: boolean; submitted: string; review: Review | null };
export type Pair = { code: string | null; count: number } | null;
export type Value = Level | string | number | AnswerLog | Result | CardLog | Admission | Note | Lexeme | FullMock | Work | null;
export type Records = Record<string, Value>;
type Cloud = { records: Records; submissions: Work[]; pair: Pair };

export function dateKey(date = new Date()) {
  const pad = (number: number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
export function later(days: number, date = new Date()) {
  const target = new Date(date);
  target.setDate(target.getDate() + days);
  return dateKey(target);
}
export function displayDate(day: string) {
  return day.slice(0, 10).split("-").reverse().join(".");
}
export function values<T extends Value>(records: Records, prefix: string): Array<[string, T]> {
  return Object.entries(records).filter(([key, value]) => key.startsWith(prefix) && value !== null).map(([key, value]) => [key, value as T]);
}
export function newId() {
  return crypto.randomUUID();
}

export function useStudioState(account: Account | null) {
  const storage = `sprachlabor-v1:${account?.id ?? "guest"}`;
  const [records, setRecords] = useState<Records>({});
  const [cloud, setCloud] = useState<Cloud>({ records: {}, submissions: [], pair: null });
  const [status, setStatus] = useState<"local" | "loading" | "connected" | "queued">(account ? "loading" : "local");
  const [loaded, setLoaded] = useState(false);
  const current = useRef<Records>({});
  const pending = useRef<Records>({});
  const writing = useRef(false);

  const persist = useCallback(() => {
    try {
      localStorage.setItem(storage, JSON.stringify(current.current));
      if (account) localStorage.setItem(`${storage}:pending`, JSON.stringify(pending.current));
    } catch {
      // The current page is still usable when browser storage is disabled.
    }
  }, [account, storage]);

  const flush = useCallback(async () => {
    if (!account || writing.current) return;
    writing.current = true;
    try {
      while (Object.keys(pending.current).length) {
        const batch = Object.entries(pending.current).slice(0, 24).map(([key, value]) => ({ key, value }));
        const response = await fetch("/api/studio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "activity", entries: batch }) });
        if (!response.ok) throw new Error("sync");
        for (const { key, value } of batch) {
          if (pending.current[key] === value) delete pending.current[key];
        }
        persist();
      }
      setStatus("connected");
    } catch {
      setStatus("queued");
    } finally {
      writing.current = false;
    }
  }, [account, persist]);

  const refresh = useCallback(async () => {
    if (!account) return;
    try {
      const response = await fetch("/api/studio", { cache: "no-store" });
      if (!response.ok) throw new Error("sync");
      const data = await response.json() as Cloud;
      setCloud(data);
      current.current = { ...current.current, ...data.records, ...pending.current };
      setRecords(current.current);
      persist();
      await flush();
    } catch {
      setStatus("queued");
    }
  }, [account, flush, persist]);

  useEffect(() => {
    try {
      current.current = JSON.parse(localStorage.getItem(storage) ?? "{}");
      pending.current = account ? JSON.parse(localStorage.getItem(`${storage}:pending`) ?? "{}") : {};
    } catch {
      current.current = {};
      pending.current = {};
    }
    setRecords(current.current);
    setLoaded(true);
    void refresh();
    const reconnect = () => { void refresh(); };
    window.addEventListener("online", reconnect);
    return () => window.removeEventListener("online", reconnect);
  }, [account, refresh, storage]);

  function save(changes: Records) {
    current.current = { ...current.current, ...changes };
    setRecords(current.current);
    if (account) Object.assign(pending.current, changes);
    persist();
    void flush();
  }

  async function act(body: Record<string, unknown>) {
    const response = await fetch("/api/studio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!response.ok) {
      const data = await response.json().catch(() => ({})) as { error?: string };
      throw new Error(data.error || "Сайт не смог сохранить действие. Попробуй ещё раз.");
    }
    await refresh();
  }

  return { records, cloud, status, loaded, save, refresh, act };
}
