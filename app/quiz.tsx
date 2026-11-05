"use client";

import { useEffect, useRef, useState } from "react";
import { checkAnswer, type Question } from "../lib/drills";
import type { Level, Skill } from "../lib/course";

export type Session = {
  id: string; title: string; subtitle: string; questions: Question[];
  mode: "practice" | "diagnostic" | "exam"; minutes?: number; level: Level; variant?: "A" | "B";
};
export type Result = { id: string; title: string; level: Level; variant?: "A" | "B"; mode: Session["mode"]; correct: number; total: number; skills: Partial<Record<Skill, [number, number]>>; day: string };
type Attempt = { question: Question; answer: string; ok: boolean };

export function Quiz({ session, onFinish, onLeave, onHomework }: {
  session: Session; onFinish: (result: Omit<Result, "day">, attempts: Attempt[]) => void; onLeave: () => void;
  onHomework: (level: Level, variant: "A" | "B") => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [summary, setSummary] = useState<{ result: Omit<Result, "day">; attempts: Attempt[] } | null>(null);
  const [started] = useState(() => Date.now());
  const [remaining, setRemaining] = useState((session.minutes ?? 0) * 60);
  const [showReview, setShowReview] = useState(false);
  const done = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const practice = session.mode === "practice";
  const questions = session.questions;
  const question = questions[index];
  const answer = answers[question.id] ?? "";
  const isChecked = Object.hasOwn(checked, question.id);
  const isCorrect = checked[question.id];
  const elapsed = session.minutes ? remaining : null;
  const filled = questions.filter((item) => Boolean(answers[item.id]?.trim())).length;

  function finish() {
    if (done.current) return;
    done.current = true;
    const attempts = questions.map((item) => ({ question: item, answer: answers[item.id] ?? "", ok: checkAnswer(item, answers[item.id] ?? "") }));
    const skills: Result["skills"] = {};
    for (const item of attempts) {
      const score = skills[item.question.skill] ?? [0, 0];
      skills[item.question.skill] = [score[0] + Number(item.ok), score[1] + 1];
    }
    const result = { id: session.id, title: session.title, level: session.level, variant: session.variant, mode: session.mode, correct: attempts.filter((a) => a.ok).length, total: attempts.length, skills };
    setSummary({ result, attempts });
    onFinish(result, attempts);
  }

  useEffect(() => {
    if (!session.minutes || summary) return;
    const timer = setInterval(() => setRemaining(Math.max(0, session.minutes! * 60 - Math.floor((Date.now() - started) / 1000))), 250);
    return () => clearInterval(timer);
  }, [session.minutes, started, summary]);

  useEffect(() => {
    if (session.minutes && remaining === 0 && !summary) finish();
  });

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [index, summary]);

  function setAnswer(value: string) {
    setAnswers((current) => ({ ...current, [question.id]: value }));
  }

  function next() {
    if (practice && !isChecked) {
      if (answer.trim()) setChecked((current) => ({ ...current, [question.id]: checkAnswer(question, answer) }));
      return;
    }
    if (index + 1 < questions.length) setIndex(index + 1);
    else finish();
  }

  if (summary) {
    const { result, attempts } = summary;
    const pct = Math.round(100 * result.correct / result.total);
    const missed = attempts.filter((a) => !a.ok);
    return <section className="quiz panel result">
      <div className="eyebrow"><span className="signal" /> СЕССИЯ ЗАВЕРШЕНА</div>
      <h2 ref={heading} tabIndex={-1}>Результат · {result.title}</h2>
      <p className="muted">Доля правильных ответов в этой подборке</p><div className="result-total">{pct}<small>%</small></div>
      <p className="muted">{result.correct} из {result.total} верных. {elapsed === 0 ? "Время вышло. " : ""}{missed.length ? "Ошибки добавлены в журнал повторения." : "Все ответы верны."}</p>
      <div className="score-grid">{Object.entries(result.skills).map(([skill, [correct, total]]) => <div key={skill}><span>{skill}</span><strong>{correct}/{total}</strong></div>)}</div>
      {session.mode !== "practice" && <p className="hint">{session.mode === "diagnostic" ? "Входная выборка A1 по чтению и слуху. Письмо, речь и общий уровень пока не определены." : "Результат мини-пробника. Письмо и речь проверяются отдельно. Для проверки формата и готовности используй полноформатные комплекты."}</p>}
      <div className="actions">
        <button className="primary" onClick={onLeave}>Вернуться в студию</button>
        {missed.length > 0 && <button className="secondary" onClick={() => setShowReview(!showReview)}>{showReview ? "Скрыть разбор" : "Разобрать ошибки"}</button>}
        {session.mode !== "practice" && <button className="secondary" onClick={() => onHomework(session.level, session.variant ?? "A")}>Письмо и речь ↗</button>}
      </div>
      {showReview && <div className="review-list">{missed.map(({ question: item, answer: response }) => <div key={item.id} className="review-note"><strong>{item.prompt}</strong><p>Твой ответ: {response || "пропуск"}</p><p>Ключ: {item.answers.join(" / ")}</p><small>{item.tip}</small></div>)}</div>}
    </section>;
  }

  return <section className="quiz panel">
    <div className="quiz-top">
      <div><div className="eyebrow">{session.title}</div><p className="muted">{session.subtitle}</p></div>
      {elapsed !== null && <strong className="timer" aria-label="Оставшееся время">{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}</strong>}
    </div>
    <div className="meter"><div style={{ width: `${(index + 1) / questions.length * 100}%` }} /></div>
    <div className="quiz-step"><span className="pill">{question.skill}</span><span>{index + 1} / {questions.length}</span></div>
    {question.text && <blockquote lang="de">{question.text}</blockquote>}
    {question.audio && <div className="audio-box"><span>Аудиозапись · {practice ? "можно повторять" : "ориентир этой тренировки — два прослушивания"}</span><audio aria-label="Аудиофрагмент задания" controls preload="metadata" src={question.audio} /></div>}
    <h2 ref={heading} tabIndex={-1}>{question.prompt}</h2>
    <form onSubmit={(event) => { event.preventDefault(); next(); }}>
      {question.choices ? <fieldset className="options"><legend className="sr-only">Выбери ответ</legend>{question.choices.map((value, i) => <label className={"option" + (answer === value ? " selected" : "")} key={value}>
        <input type="radio" name={question.id} value={value} checked={answer === value} onChange={() => setAnswer(value)} disabled={practice && isChecked} />
        <span className="key">{String.fromCharCode(65 + i)}</span><span>{value}</span>
      </label>)}</fieldset> : <label className="field"><span>Твой ответ</span><input key={question.id} autoComplete="off" spellCheck={false} lang="de" value={answer} onChange={(event) => setAnswer(event.target.value)} readOnly={practice && isChecked} placeholder="Antwort eingeben" /></label>}
      {practice && isChecked && <div role="status" className={isCorrect ? "feedback good" : "feedback bad"}><strong>{isCorrect ? "Верно · +10 XP за первое решение" : `Ключ: ${question.answers.join(" / ")}`}</strong><div>{question.tip}</div>{!isCorrect && !question.choices && !question.exact && <small>Для открытого ввода сравниваем с целевой формой. Уместный синоним можно обсудить отдельно.</small>}</div>}
      <div className="quiz-actions">
        <div className="actions">
          {!practice && index > 0 && <button type="button" className="secondary" onClick={() => setIndex(index - 1)}>← Назад</button>}
          <button type="submit" className="primary" disabled={practice && !isChecked && !answer.trim()}>{practice && !isChecked ? "Проверить" : index + 1 < questions.length ? "Дальше →" : "Завершить"}</button>
        </div>
        {!practice && <button type="button" className="ghost" onClick={finish} disabled={filled === 0}>Сдать сейчас · {filled}/{questions.length}</button>}
      </div>
    </form>
  </section>;
}
