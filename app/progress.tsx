"use client";

import { useState } from "react";
import type { Level } from "../lib/course";
import type { Question } from "../lib/drills";
import type { Result } from "./quiz";
import { dateKey, displayDate, later, newId, values, type Admission, type AnswerLog, type CardLog, type Note, type Records } from "./state";
import { Icon, SectionHead } from "./ui";

export function weeklyMinutes(records: Records) {
  const now = new Date();
  const monday = later(-((now.getDay() + 6) % 7), now);
  const today = dateKey(now);
  return values<number>(records, "minutes:").filter(([key]) => key.slice(8) >= monday && key.slice(8) <= today).reduce((sum, [, minutes]) => sum + minutes, 0);
}

export function achievements(records: Records) {
  const logs = values<AnswerLog>(records, "q:");
  const completed = logs.filter(([, row]) => row.solved).length;
  const exams = values<Result>(records, "run:").filter(([, result]) => result.mode === "exam").length;
  const cardCount = values<CardLog>(records, "card:").length;
  const days = new Set([...logs.map(([, row]) => row.day), ...values<number>(records, "minutes:").filter(([, time]) => time > 0).map(([key]) => key.slice(8))]);
  let streak = 0;
  const from = days.has(dateKey()) ? 0 : -1;
  while (days.has(later(from - streak))) streak++;
  return { completed, exams, cardCount, streak };
}

export function Cards({ questions, records, save }: { questions: Question[]; records: Records; save: (updates: Records) => void }) {
  const [reveal, setReveal] = useState(false);
  const [position, setPosition] = useState(0);
  const today = dateKey();
  const due = questions.filter((q) => {
    const row = records[`card:${q.id}`] as CardLog | undefined;
    return !row || row.due <= today;
  });
  const card = due[position % Math.max(due.length, 1)];
  function grade(ok: boolean) {
    const old = records[`card:${card.id}`] as CardLog | undefined;
    const next = ok ? Math.min((old?.step ?? -1) + 1, 4) : -1;
    save({ [`card:${card.id}`]: { step: next, due: later(ok ? [1, 3, 7, 14, 30][next] : 1), day: today } });
    setReveal(false);
  }
  return <>
    <SectionHead code="MEMORY / 03" title="Карточки" detail="Сначала вспомни фразу. Потом открой ответ и отметь, насколько уверенно ты её произнесла." />
    <section className="panel flashcard">
      <div className="eyebrow"><Icon name="cards" /> {due.length} К ПОВТОРЕНИЮ · {questions.length} В КОЛОДЕ</div>
      {card ? <><h2>{card.prompt}</h2>{reveal ? <div className="flash-answer" lang="de"><strong>{card.answers.join(" / ")}</strong><p className="muted">{card.tip}</p></div> : <p className="muted">Скажи фразу вслух перед тем, как открыть ответ.</p>}
        <div className="actions">{reveal ? <><button className="secondary" onClick={() => grade(false)}>Сложно · завтра</button><button className="primary" onClick={() => grade(true)}>Помню</button></> : <button className="primary" onClick={() => setReveal(true)}>Показать ответ</button>}<button className="ghost" onClick={() => { setPosition(position + 1); setReveal(false); }}>Пропустить</button></div>
      </> : <><h2>На сегодня всё</h2><p className="muted">Карточки снова появятся по расписанию. Можно открыть задания следующего уровня или выбрать другую ветку.</p></>}
    </section>
  </>;
}

const emptyAdmission: Admission = { program: "", language: "", certificate: "", deadline: "", source: "" };
const codes = ["WO", "KAS", "ART", "VT", "LEX", "REG", "ORTH", "PHON", "TASK"];
export function Progress({ records, save, questions, retry, level }: { records: Records; save: (updates: Records) => void; questions: Question[]; retry: (questions: Question[]) => void; level: Level }) {
  const [minutes, setMinutes] = useState("");
  const [day, setDay] = useState(dateKey());
  const [admission, setAdmission] = useState(emptyAdmission);
  const [note, setNote] = useState({ code: "WO", wrong: "", correct: "" });
  const [notice, setNotice] = useState("");
  const { completed, exams, streak, cardCount } = achievements(records);
  const results = values<Result>(records, "run:").map(([, row]) => row).reverse();
  const notes = values<Note>(records, "note:");
  const byId = new Map(questions.map((q) => [q.id, q]));
  const missed = values<AnswerLog>(records, "q:").filter(([, row]) => !row.ok).flatMap(([key]) => {
    const item = byId.get(key.slice(2));
    return item ? [item] : [];
  });
  const hours = weeklyMinutes(records);
  const unlocks = [
    ["Первый сигнал", "Первый правильный ответ", completed >= 1],
    ["Держу темп", "Три дня практики подряд", streak >= 3],
    ["Тест-пилот", "Завершён первый мини-пробник", exams >= 1],
    ["Память в деле", "Десять карточек в повторении", cardCount >= 10],
    ["Набор скорости", "50 уникальных верных ответов", completed >= 50],
  ] as const;
  function addMinutes() {
    const key = `minutes:${day}`;
    const previous = Number(records[key] ?? 0);
    const next = previous + Number(minutes);
    if (!day || day > dateKey() || Number(minutes) <= 0 || next > 1440) {
      setNotice("Проверь дату и количество минут.");
      return;
    }
    save({ [key]: next });
    setMinutes("");
    setNotice(`Сохранено · ${displayDate(day)} · ${next} мин за день.`);
  }
  return <>
    <SectionHead code="STATS / 06" title="Прогресс" detail="Твои результаты, учебное время, ошибки и поступление. Каждый показатель относится к твоему профилю." />
    <div className="two-column">
      <section className="panel">
        <div className="eyebrow"><Icon name="clock" /> УЧЕБНОЕ ВРЕМЯ</div><h2>{Math.floor(hours / 60)} ч {hours % 60} мин <small className="muted">на этой неделе</small></h2>
        <div className="meter"><div style={{ width: `${Math.min(100, hours / 630 * 100)}%` }} /></div><p className="muted">Цель недели · 10 ч 30 мин. Добавляй и занятия вне сайта.</p>
        <form className="inline-form" onSubmit={(e) => { e.preventDefault(); addMinutes(); }}>
          <label className="field"><span>Дата</span><input type="date" value={day} max={dateKey()} onChange={(e) => setDay(e.target.value)} required /></label>
          <label className="field"><span>Минуты</span><input type="number" value={minutes} min="1" max="1440" onChange={(e) => setMinutes(e.target.value)} placeholder="30" required /></label><button className="secondary">Добавить</button>
        </form>
        {notice && <p role="status" className="hint">{notice}</p>}
      </section>
      <section className="panel">
        <div className="eyebrow"><Icon name="trophy" /> ДОСТИЖЕНИЯ</div><h2>{completed * 10} XP</h2>
        {unlocks.map(([title, detail, unlocked]) => <div className="achievement" key={title}><span className={unlocked ? "badge unlocked" : "badge"}><Icon name={unlocked ? "check" : "trophy"} size={16} /></span><div><strong>{title}</strong><small>{detail}</small></div><span className="sr-only">{unlocked ? "Открыто" : "Закрыто"}</span></div>)}
      </section>
    </div>
    <section className="panel">
      <div className="eyebrow">ERGEBNISSE</div><h2>Результаты занятий</h2>
      {results.length ? <div className="table-scroll"><table><thead><tr><th>Занятие</th><th>Дата</th><th>Верно</th><th>По навыкам</th></tr></thead><tbody>{results.slice(0, 20).map((result) => <tr key={result.id}><td>{result.title}</td><td>{displayDate(result.day)}</td><td>{result.correct}/{result.total}</td><td>{Object.entries(result.skills).map(([skill, score]) => `${skill} ${score[0]}/${score[1]}`).join(" · ")}</td></tr>)}</tbody></table></div> : <p className="muted">Заверши D0 или любое занятие, чтобы появилась первая строка.</p>}
    </section>
    <section className="panel">
      <div className="eyebrow">FEHLERLOG</div><h2>Журнал ошибок</h2>
      <p className="muted">{missed.length ? `${missed.length} заданий ждут повторной попытки. Они исчезнут из очереди после верного ответа.` : "Ошибки из тестов автоматически появятся здесь."}</p>
      {missed.length > 0 && <button className="primary" onClick={() => retry(missed.slice(0, 10))}>Повторить до 10 заданий →</button>}
      <form className="form-grid" onSubmit={(e) => { e.preventDefault(); if (note.wrong.trim() && note.correct.trim()) { save({ [`note:${newId()}`]: { ...note, closed: false, due: later(3) } }); setNote({ code: "WO", wrong: "", correct: "" }); } }}>
        <label className="field"><span>Код ошибки</span><select value={note.code} onChange={(e) => setNote({ ...note, code: e.target.value })}>{codes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="field"><span>Было</span><input value={note.wrong} onChange={(e) => setNote({ ...note, wrong: e.target.value })} maxLength={250} required /></label>
        <label className="field"><span>Исправление и пример</span><input value={note.correct} onChange={(e) => setNote({ ...note, correct: e.target.value })} maxLength={450} required /></label>
        <button className="secondary">Добавить</button>
      </form>
      {notes.map(([key, item]) => <div className="record" key={key}><div><span className="pill">{item.code}</span><p>{item.wrong} → {item.correct}</p><small>{item.closed ? "Закрыто" : `Повтор ${displayDate(item.due)}`}</small></div><button className="ghost" onClick={() => save({ [key]: { ...item, closed: !item.closed } })}>{item.closed ? "Открыть" : "Закрыть"}</button></div>)}
    </section>
    <section className="panel">
      <div className="eyebrow">STUDIUM / {level}</div><h2>Поступление</h2>
      <p className="muted">Сверяй язык, допустимый сертификат и отдельную дату его подачи по официальной странице программы.</p>
      <form className="form-grid" onSubmit={(e) => { e.preventDefault(); if (admission.program.trim()) { save({ [`uni:${newId()}`]: admission }); setAdmission(emptyAdmission); } }}>
        <label className="field"><span>Программа</span><input value={admission.program} onChange={(e) => setAdmission({ ...admission, program: e.target.value })} maxLength={100} required /></label>
        <label className="field"><span>Языки</span><input value={admission.language} onChange={(e) => setAdmission({ ...admission, language: e.target.value })} maxLength={90} /></label>
        <label className="field"><span>Сертификат и порог</span><input value={admission.certificate} onChange={(e) => setAdmission({ ...admission, certificate: e.target.value })} maxLength={120} /></label>
        <label className="field"><span>Дедлайн сертификата</span><input type="date" value={admission.deadline} onChange={(e) => setAdmission({ ...admission, deadline: e.target.value })} /></label>
        <label className="field"><span>Источник</span><input type="url" value={admission.source} onChange={(e) => setAdmission({ ...admission, source: e.target.value })} maxLength={400} placeholder="https://…" /></label>
        <button className="secondary">Добавить программу</button>
      </form>
      {values<Admission>(records, "uni:").map(([key, item]) => <div className="record" key={key}><div><strong>{item.program}</strong><p>{[item.language, item.certificate, item.deadline && displayDate(item.deadline)].filter(Boolean).join(" · ")}</p>{/^https?:\/\//i.test(item.source) && <a className="text-link" href={item.source} target="_blank" rel="noreferrer">Источник ↗</a>}</div><button className="ghost" onClick={() => save({ [key]: null })}>Убрать</button></div>)}
    </section>
  </>;
}
