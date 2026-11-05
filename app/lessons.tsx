"use client";

import { useState } from "react";
import { levelOrder, levels, type Level } from "../lib/course";
import { lessons, passingAnswers, type Lesson } from "../lib/lessons";
import type { Result } from "./quiz";
import { values, type Records } from "./state";
import { Icon, SectionHead } from "./ui";

export function lessonKey(id: string, step: "theory" | "video") {
  return `lesson:${id}:${step}`;
}

function lessonProgress(lesson: Lesson, records: Records) {
  const theory = records[lessonKey(lesson.id, "theory")] === "done";
  const video = records[lessonKey(lesson.id, "video")] === "done";
  const attempts = values<Result>(records, "run:").filter(([, result]) => result.lessonId === lesson.id);
  const best = attempts.length ? Math.max(...attempts.map(([, result]) => result.correct)) : null;
  const practice = best !== null && best >= passingAnswers(lesson.questionIds.length);
  const done = Number(theory) + Number(video) + Number(practice);
  return { theory, video, practice, best, done, complete: done === 3 };
}

export function LessonCatalog({ records, activeLevel }: { records: Records; activeLevel: Level }) {
  const [filter, setFilter] = useState<Level | "all">("all");
  const completed = lessons.filter((lesson) => lessonProgress(lesson, records).complete).length;
  const recommended = lessons.find((lesson) => lesson.level === activeLevel && !lessonProgress(lesson, records).complete);
  return <>
    <SectionHead code="KURS / A1–C1" title="Уроки" detail="Открой любую тему. Сначала теория с примерами, затем видео и практика с автопроверкой." />
    <section className="panel lessons-overview">
      <div><div className="eyebrow">ПРОГРЕСС КУРСА</div><h2>{completed} из {lessons.length} уроков пройдено</h2><div className="meter" role="progressbar" aria-label="Пройденные уроки" aria-valuemin={0} aria-valuemax={lessons.length} aria-valuenow={completed}><div style={{ width: `${100 * completed / lessons.length}%` }} /></div></div>
      {recommended && <a className="primary" href={`#lessons/${recommended.id}`}>Продолжить {activeLevel} <Icon name="arrow" size={17} /></a>}
    </section>
    <div className="chips lesson-filters" aria-label="Фильтр уроков по уровню">
      {(["all", ...levelOrder] as const).map((level) => <button key={level} className={filter === level ? "chip selected" : "chip"} aria-pressed={filter === level} onClick={() => setFilter(level)}>{level === "all" ? "Все уровни" : level}</button>)}
    </div>
    <div className="lesson-groups">
      {levelOrder.filter((level) => filter === "all" || filter === level).map((level) => {
        const group = lessons.filter((lesson) => lesson.level === level);
        return <section className="panel lesson-group" key={level}>
          <div className="panel-head"><h2><span className="lesson-level">{level}</span> {levels[level].title}</h2><span className="pill">{group.filter((lesson) => lessonProgress(lesson, records).complete).length}/{group.length}</span></div>
          <ol>{group.map((lesson) => {
            const progress = lessonProgress(lesson, records);
            return <li key={lesson.id}><a className="lesson-row" href={`#lessons/${lesson.id}`}><span className={progress.complete ? "lesson-index is-done" : "lesson-index"}>{progress.complete ? <Icon name="check" size={17} /> : String(lesson.order).padStart(2, "0")}</span><span><strong>{lesson.title}</strong><small>{progress.complete ? "Пройден" : progress.done ? `В процессе · ${progress.done}/3` : "Теория · видео · задания"}</small></span><Icon name="arrow" size={17} /></a></li>;
          })}</ol>
        </section>;
      })}
    </div>
  </>;
}

export function LessonPage({ lesson, records, save, start }: { lesson: Lesson; records: Records; save: (changes: Records) => void; start: () => void }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const progress = lessonProgress(lesson, records);
  const total = lesson.questionIds.length;
  const required = passingAnswers(total);
  const next = lessons[lessons.indexOf(lesson) + 1];
  const watchUrl = `https://www.youtube.com/watch?v=${lesson.video}`;
  return <>
    <a className="text-link lesson-back" href="#lessons">← Все уроки</a>
    <SectionHead code={`KURS / ${lesson.level} · ${String(lesson.order).padStart(2, "0")}`} title={lesson.title} detail="Пройди три шага. Сайт сохранит результат практики и покажет, что осталось.">
      <span className={progress.complete ? "pill lesson-pass" : "pill"} role="status">{progress.complete ? "✓ Урок пройден" : `${progress.done}/3 шага`}</span>
    </SectionHead>
    <section className="panel lesson-step">
      <div className="eyebrow">01 / THEORIE</div>
      <h2>Теория</h2><p>{lesson.theory}</p><blockquote lang="de">{lesson.example}</blockquote>
      <p className="muted"><strong>Попробуй.</strong> {lesson.transfer}</p>
      <div className="actions spaced"><button className={progress.theory ? "secondary" : "primary"} disabled={progress.theory} onClick={() => save({ [lessonKey(lesson.id, "theory")]: "done" })}>{progress.theory ? "✓ Теория прочитана" : "Отметить теорию прочитанной"}</button></div>
    </section>
    <section className="panel lesson-step">
      <div className="eyebrow">02 / VIDEO</div><h2>Видео по теме</h2><p className="muted">{lesson.focus}</p><p className="muted"><small>{lesson.channel} · YouTube</small></p>
      {showPlayer && <div className="lesson-player"><iframe title={`YouTube · ${lesson.title}`} src={`https://www.youtube-nocookie.com/embed/${lesson.video}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>}
      <div className="actions spaced">
        {!showPlayer && <button className="primary" onClick={() => setShowPlayer(true)}>Смотреть на сайте</button>}
        <a className="text-link" href={watchUrl} target="_blank" rel="noopener noreferrer">Открыть на YouTube ↗</a>
        <button className="secondary" disabled={!progress.theory || progress.video} onClick={() => save({ [lessonKey(lesson.id, "video")]: "done" })}>{progress.video ? "✓ Видео просмотрено" : "Я посмотрела видео"}</button>
      </div>
      {!progress.theory && <p className="hint">Чтобы отметить видео, сначала отметь теорию.</p>}
      {showPlayer && <p className="muted"><small>Если плеер недоступен, открой видео на YouTube и вернись, чтобы отметить просмотр.</small></p>}
    </section>
    <section className="panel lesson-step">
      <div className="eyebrow">03 / ÜBUNGEN</div><h2>Задания</h2>
      <p className="muted">{total} заданий по теме. Для зачёта нужно {required} из {total}. После каждого ответа будет короткое объяснение, попытку можно повторить.</p>
      {progress.best !== null && <p className="hint">Лучший результат · {progress.best}/{total}{progress.practice ? " · практика зачтена" : " · можно попробовать ещё раз"}</p>}
      <div className="actions spaced"><button className="primary" disabled={!progress.theory || !progress.video} onClick={start}>{progress.best === null ? "Начать задания" : "Повторить задания"} <Icon name="arrow" size={17} /></button>
        {progress.complete && next && <a className="secondary" href={`#lessons/${next.id}`}>Следующий урок →</a>}
      </div>
      {(!progress.theory || !progress.video) && <p className="hint">Задания откроются после отметок о теории и видео.</p>}
    </section>
  </>;
}
