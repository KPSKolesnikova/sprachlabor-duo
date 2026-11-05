"use client";

import { useState } from "react";
import { academicFormats, academicTasks } from "../lib/academic";
import type { Level } from "../lib/course";
import { goetheFormats } from "../lib/formats";
import { grammarLessons, methodSources } from "../lib/method";
import { dateKey, displayDate, later, newId, values, type FullMock, type Lexeme, type Records } from "./state";
import { Icon } from "./ui";

export function Method({ level }: { level: Level }) {
  return <>
    <section className="panel">
      <div className="eyebrow">GRAMMATIK / {level}</div><h2>Разбор конструкций</h2>
      <p className="muted">Сначала распознай форму в примере. Затем объясни выбор, составь свою фразу и проверь перенос в новом диалоге.</p>
      {grammarLessons[level].map(([topic, rule, example, task]) => <details className="work-item" key={topic}><summary><strong>{topic}</strong><span className="pill">Правило и практика</span></summary><div className="work-content"><p>{rule}</p><blockquote lang="de">{example}</blockquote><p className="hint"><strong>Проверь себя.</strong> {task}</p></div></details>)}
    </section>
    <section className="panel"><div className="eyebrow">METHODE / 40 MIN</div><h2>Как провести занятие вдвоём</h2>
      <ol className="compact-list"><li><strong>5 мин.</strong> Вспомни старое без подсказки.</li><li><strong>8 мин.</strong> Прочитай или прослушай новый материал, выдели смысл и детали.</li><li><strong>7 мин.</strong> Найди конструкцию и реши 4–6 закрытых заданий.</li><li><strong>12 мин.</strong> Выполните реальную задачу с разной исходной информацией, затем передайте итог своими словами.</li><li><strong>5 мин.</strong> Дай партнёрше подсказку для самокоррекции и покажи один образец.</li><li><strong>3 мин.</strong> Запиши следующий шаг. Через 2–7 дней проверь то же действие на новой теме.</li></ol>
      <p className="muted">Действие, взаимодействие и медиация опираются на CEFR и Goethe DLL. Длительность блоков, интервалы карточек и контрольные пороги — настройки этой программы.</p>
      <div className="actions spaced">{methodSources.map(([label, url]) => <a key={label} className="text-link" href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</div>
    </section>
  </>;
}

export function VocabularyCoverage({ level, records, save }: { level: Level; records: Records; save: (updates: Records) => void }) {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("Быт и услуги");
  const collection = values<Lexeme>(records, "lex:").filter(([, row]) => row.level === level);
  const checklist = ["Узнаю в новом тексте", "Узнаю в новой аудиозаписи", "Употребляю без подсказки", "Применяю после паузы"];
  const list = goetheFormats[level].wordlist;
  return <section className="panel">
    <div className="eyebrow"><Icon name="book" /> WORTSCHATZ / {level}</div><h2>Сверка словаря</h2>
    <p className="muted">{list ? "Открой официальный Wortliste и добавь слова, которые нужно проверить. Внесённые слова составляют твою выборку." : "Для B2/C1 отслеживай речевые функции и темы на новых материалах. Записывай сочетания, формальный регистр и способы перефразировать."}</p>
    {list && <a className="text-link" href={list} target="_blank" rel="noreferrer">Официальный Wortliste {level} ↗</a>}
    <p className="hint">В журнале {collection.length} записей этого уровня. Последний статус открывается через 7 дней и подтверждается применением в новой ситуации.</p>
    <form className="inline-form" onSubmit={(e) => { e.preventDefault(); const text = word.trim(); if (!text || collection.some(([, row]) => row.text.toLocaleLowerCase("de") === text.toLocaleLowerCase("de"))) return; save({ [`lex:${newId()}`]: { text, level, category, added: dateKey(), checks: [false, false, false, false] } }); setWord(""); }}>
      <label className="field"><span>Слово или фраза</span><input value={word} onChange={(e) => setWord(e.target.value)} maxLength={100} placeholder="der Termin · einen Termin vereinbaren" required /></label>
      <label className="field"><span>Тема</span><select value={category} onChange={(e) => setCategory(e.target.value)}>{["Быт и услуги", "Семья и люди", "Здоровье", "Транспорт и поездки", "Работа и учёба", "Общество и медиа", "Культура и экология", "Инструкции экзамена"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <button className="secondary">Добавить</button>
    </form>
    {collection.map(([key, row]) => <details key={key} className="work-item"><summary><span><strong lang="de">{row.text}</strong><small>{row.category}</small></span><span className="pill">{row.checks.filter(Boolean).length}/4</span></summary><div className="work-content">{checklist.map((label, index) => <label className="checkline" key={label}><input type="checkbox" checked={row.checks[index]} disabled={index === 3 && (row.added > later(-7) || !row.checks[2])} onChange={(e) => save({ [key]: { ...row, checks: row.checks.map((current, i) => i === index ? e.target.checked : index === 2 && !e.target.checked && i === 3 ? false : current) } })} /> {label}</label>)}</div></details>)}
  </section>;
}

const emptyMock: FullMock = { name: "", date: "", reading: "", listening: "", writing: "", speaking: "", fresh: false };
export function ExamGuide({ level, records, save }: { level: Level; records: Records; save: (updates: Records) => void }) {
  const format = goetheFormats[level];
  const [run, setRun] = useState<FullMock>({ ...emptyMock, date: dateKey() });
  const mock = values<FullMock>(records, "full:").reverse();
  return <>
    <section className="panel">
      <div className="eyebrow">FORMAT / GOETHE {level}</div><h2>Что будет на официальном экзамене</h2>
      <p className="muted">{format.duration}</p><p className="hint">{format.pass}</p>
      <div className="lesson-grid">{[["Lesen", format.reading], ["Hören", format.listening], ["Schreiben", format.writing], ["Sprechen", format.speaking]].map(([skill, detail]) => <div className="detail" key={skill}><span>{skill}</span><p>{detail}</p></div>)}</div>
      <div className="actions spaced"><a className="primary" href={format.official} target="_blank" rel="noreferrer">Комплект Goethe {level} ↗</a>{format.wordlist && <a className="secondary" href={format.wordlist} target="_blank" rel="noreferrer">Официальный словник ↗</a>}</div>
    </section>
    {(level === "B2" || level === "C1") && <section className="panel">
      <div className="eyebrow">HOCHSCHULE</div><h2>Два академических формата</h2>
      {academicFormats.map((item) => <details className="work-item" key={item.name}><summary><strong>{item.name}</strong><span className="pill">Формат</span></summary><div className="work-content"><p className="muted">{item.timing}</p><div className="lesson-grid">{[["Lesen", item.reading], ["Hören", item.listening], ["Schreiben", item.writing], ["Sprechen", item.speaking]].map(([skill, detail]) => <div className="detail" key={skill}><span>{skill}</span><p>{detail}</p></div>)}</div><div className="actions spaced"><a className="primary" href={item.source} target="_blank" rel="noreferrer">Организатор ↗</a><a className="secondary" href={item.rubric} target="_blank" rel="noreferrer">Критерии ↗</a></div></div></details>)}
      {academicTasks.map((item) => <details className="work-item" key={item.id}><summary><strong>{item.title}</strong><span className="pill">Авторский кейс</span></summary><div className="work-content"><blockquote lang="de" className="submitted-text">{item.input}</blockquote><p lang="de"><strong>Schreiben.</strong> {item.writing}</p><p lang="de"><strong>Sprechen.</strong> {item.speaking}</p><ul className="compact-list">{item.rubric.map((r) => <li key={r}>{r}</li>)}</ul></div></details>)}
    </section>}
    <section className="panel"><div className="eyebrow">PRÜFUNGSPROTOKOLL</div><h2>Полноформатные контрольные</h2>
      <p className="muted">Проведи два свежих комплекта в разные дни с официальным таймингом. Впиши результаты по шкале организатора, например 82/100 или TDN 4. Пропуск оставь пустым. Повтор знакомого комплекта запиши как тренировку.</p>
      <form onSubmit={(e) => { e.preventDefault(); if (run.name.trim() && run.date) { save({ [`full:${newId()}`]: run }); setRun({ ...emptyMock, date: dateKey() }); } }}>
        <div className="form-grid"><label className="field"><span>Экзамен и комплект</span><input maxLength={110} value={run.name} onChange={(e) => setRun({ ...run, name: e.target.value })} placeholder={`Goethe ${level} · Übungssatz 1`} required /></label><label className="field"><span>Дата</span><input type="date" max={dateKey()} value={run.date} onChange={(e) => setRun({ ...run, date: e.target.value })} required /></label>{([["reading", "Lesen"], ["listening", "Hören"], ["writing", "Schreiben"], ["speaking", "Sprechen"]] as const).map(([key, skill]) => <label className="field" key={key}><span>{skill}</span><input value={run[key]} maxLength={22} onChange={(e) => setRun({ ...run, [key]: e.target.value })} /></label>)}</div>
        <div className="actions spaced"><label className="checkline"><input type="checkbox" checked={run.fresh} onChange={(e) => setRun({ ...run, fresh: e.target.checked })} /> Незнакомый комплект</label><button className="secondary">Сохранить результат</button></div>
      </form>
      {mock.map(([key, item]) => <div className="record" key={key}><div><strong>{item.name}</strong><p>{displayDate(item.date)} · {item.fresh ? "свежий" : "тренировка"}</p><small>Lesen {item.reading || "—"} · Hören {item.listening || "—"} · Schreiben {item.writing || "—"} · Sprechen {item.speaking || "—"}</small></div><button className="ghost" onClick={() => save({ [key]: null })}>Убрать</button></div>)}
    </section>
  </>;
}
