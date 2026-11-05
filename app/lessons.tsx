"use client";

import { useState } from "react";
import type { Level } from "../lib/course";
import { beginnerPlan, checkpointsByStage } from "../lib/foundation";
import type { Stage } from "../lib/foundation-model";
import { lessons, passingAnswers, type Lesson } from "../lib/lessons";
import { FoundationExam } from "./foundation-exam";
import type { Result } from "./quiz";
import { values, type Records } from "./state";
import { Icon, SectionHead } from "./ui";

function lessonKey(id: string, step: "theory" | "video" | "transfer") {
  return `lesson:${id}:${step}`;
}

function lessonProgress(lesson: Lesson, records: Records) {
  const theory = records[lessonKey(lesson.id, "theory")] === "done";
  const video = records[lessonKey(lesson.id, "video")] === "done";
  const transfer = records[lessonKey(lesson.id, "transfer")] === "done";
  const attempts = values<Result>(records, "run:").filter(([, result]) =>
    result.lessonId === lesson.id && (!lesson.stage || result.lessonSet === lesson.questionIds[0]));
  const best = attempts.length ? Math.max(...attempts.map(([, result]) => result.correct)) : null;
  const practice = best !== null && best >= passingAnswers(lesson.questionIds.length);
  const steps = lesson.stage ? 4 : 3;
  const done = Number(theory) + Number(video) + Number(practice) + Number(Boolean(lesson.stage && transfer));
  return { theory, video, practice, transfer, best, done, steps, complete: done === steps };
}

const beginner = lessons.filter((lesson) => lesson.stage);
const beginnerById = new Map(beginner.map((lesson) => [lesson.id, lesson]));
const references = {
  A1: { full: "https://www.goethe.de/ins/de/en/prf/gzsd1/ueb.html", words: "https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf", vhs: "https://a1.vhs-lernportal.de/" },
  A2: { full: "https://www.goethe.de/ins/de/de/prf/gzsd2/ub2.html", words: "https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf", vhs: "https://a2.vhs-lernportal.de/" },
};

export function LessonCatalog({ records, activeLevel, openExams }: { records: Records; activeLevel: Level; openExams: (level: "A1" | "A2") => void }) {
  const [filter, setFilter] = useState<Stage | "all">("all");
  const progressById = new Map(beginner.map((lesson) => [lesson.id, lessonProgress(lesson, records)]));
  const completed = [...progressById.values()].filter((progress) => progress.complete).length;
  const selected = filter === "all" ? beginner : beginner.filter((lesson) => lesson.stage === filter);
  const recommended = (filter === "all" ? selected.find((lesson) => lesson.level === activeLevel && !progressById.get(lesson.id)?.complete) : undefined)
    ?? selected.find((lesson) => !progressById.get(lesson.id)?.complete);
  return <>
    <SectionHead code="KURS / A1–A2" title="Курс с нуля до A2" detail="Четыре последовательных этапа. В каждом уроке есть объяснение, видео, автопроверка и задание на применение." />
    <section className="panel lessons-overview">
      <div><div className="eyebrow">ПРОГРЕСС ПО УРОКАМ</div><h2>{completed} из {beginner.length} уроков пройдено</h2><div className="meter" role="progressbar" aria-label="Пройденные уроки" aria-valuemin={0} aria-valuemax={beginner.length} aria-valuenow={completed}><div style={{ width: `${100 * completed / beginner.length}%` }} /></div></div>
      {recommended && <a className="primary" href={`#lessons/${recommended.id}`}>{completed ? "Продолжить" : "Начать"} {recommended.stage} <Icon name="arrow" size={17} /></a>}
    </section>
    <div className="chips lesson-filters" aria-label="Фильтр уроков по этапу">
      {(["all", ...beginnerPlan.map((stage) => stage.id)] as const).map((stage) => <button key={stage} className={filter === stage ? "chip selected" : "chip"} aria-pressed={filter === stage} onClick={() => setFilter(stage)}>{stage === "all" ? "Все этапы" : stage}</button>)}
    </div>
    <div className="foundation-stages">
      {beginnerPlan.filter((stage) => filter === "all" || filter === stage.id).map((stage) => {
        const group = beginner.filter((lesson) => lesson.stage === stage.id);
        const checkpoint = checkpointsByStage[stage.id];
        const refs = references[checkpoint.level];
        return <section className="panel foundation-stage" key={stage.id}>
          <div className="panel-head"><div><h2><span className="lesson-level">{stage.id}</span> {stage.title}</h2><p>{stage.outcome}</p></div><span className="pill">{group.filter((lesson) => progressById.get(lesson.id)?.complete).length}/{group.length} уроков</span></div>
          <div className="foundation-modules">{stage.modules.map((module, index) => <div className="lesson-group foundation-module" key={module.title}>
            <div className="eyebrow">МОДУЛЬ {index + 1}</div><h3>{module.title}</h3><p className="muted">{module.target}</p>
            <ol>{module.units.map((unit) => {
              const lesson = beginnerById.get(unit.id)!;
              const progress = progressById.get(unit.id)!;
              return <li key={lesson.id}><a className="lesson-row" href={`#lessons/${lesson.id}`}><span className={progress.complete ? "lesson-index is-done" : "lesson-index"}>{progress.complete ? <Icon name="check" size={17} /> : String(lesson.order).padStart(2, "0")}</span><span><strong>{lesson.title}</strong><small>{progress.complete ? "Пройден" : progress.done ? `В процессе · ${progress.done}/${progress.steps}` : lesson.details?.goal}</small></span><Icon name="arrow" size={17} /></a></li>;
            })}</ol>
          </div>)}</div>
          <div className="stage-note foundation-checkpoint"><div><strong>{checkpoint.title}</strong><span>{checkpoint.note}</span></div><button className="secondary" onClick={() => openExams(checkpoint.level)}>В пробники →</button></div>
          <div className="actions spaced"><a className="text-link" href={refs.full} target="_blank" rel="noreferrer">Модели Goethe {checkpoint.level} ↗</a><a className="text-link" href={refs.words} target="_blank" rel="noreferrer">Официальный словник ↗</a><a className="text-link" href={refs.vhs} target="_blank" rel="noreferrer">Дополнительная практика VHS ↗</a></div>
        </section>;
      })}
    </div>
    <section className="panel foundation-readiness"><div className="eyebrow">LERNRHYTHMUS / НЕДЕЛЯ</div><h2>Как заниматься 10–12 часов в неделю</h2><p>Ориентир — два новых урока в неделю. Выдели около 3 часов на теорию, видео и задания, 2 часа на чтение и слух, 2 часа на письмо и речь и 2 часа на лексику. Оставь 1–3 часа на повторение, контрольную или разбор ошибок.</p><p className="muted">После урока выбери 3–5 фраз для активного запаса и составь с ними свои реплики. Фразы для пассивного запаса узнавай в новых текстах и записях. Проверь себя через день и через неделю, затем возьми следующую тему из словника Goethe.</p></section>
    <section className="panel foundation-readiness"><div className="eyebrow">ЦЕЛЬ / ВЫСОКИЙ БАЛЛ</div><h2>Когда переходить к экзамену</h2><p>Зачёт урока показывает, что ты справилась с одной темой. Для подготовки на максимальный балл пройди по два незнакомых полноформатных комплекта каждого целевого уровня. Соблюдай время, инструкции и количество прослушиваний. Письмо и речь проверьте вдвоём по рубрикам Goethe.</p><p className="muted">Тренировочная цель — стремиться к 95–100% на свежих комплектах, выполнить все пункты письма и реагировать на партнёршу в устной части. Записывай потери по каждому навыку отдельно и проверяй исправления на новых заданиях. Официальные проходные правила находятся в разделе «Пробники».</p></section>
  </>;
}

export function LessonPage({ lesson, records, save, start }: { lesson: Lesson; records: Records; save: (changes: Records) => void; start: () => void }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const progress = lessonProgress(lesson, records);
  const total = lesson.questionIds.length;
  const required = passingAnswers(total);
  const candidate = lessons[lessons.indexOf(lesson) + 1];
  const next = lesson.stage && !candidate?.stage ? undefined : candidate;
  const watchUrl = `https://www.youtube.com/watch?v=${lesson.video}`;
  return <>
    <a className="text-link lesson-back" href="#lessons">← Все уроки</a>
    <SectionHead code={`KURS / ${lesson.stage ?? lesson.level} · ${String(lesson.order).padStart(2, "0")}`} title={lesson.title} detail={lesson.details?.goal ?? "Пройди три шага. Сайт сохранит результат практики и покажет, что осталось."}>
      <span className={progress.complete ? "pill lesson-pass" : "pill"} role="status">{progress.complete ? "✓ Урок пройден" : `${progress.done}/${progress.steps} шага`}</span>
    </SectionHead>
    <section className="panel lesson-step">
      <div className="eyebrow">01 / THEORIE</div>
      <h2>Теория</h2>
      {lesson.details ? <div className="foundation-theory">
        <div><h3>Зачем это нужно</h3><p>{lesson.details.why}</p></div>
        <div><h3>Как это работает</h3><p>{lesson.details.how}</p></div>
        <div><h3>Примеры с переводом</h3><ul className="foundation-examples">{lesson.details.examples.map(([de, ru]) => <li key={de}><strong lang="de">{de}</strong><span>{ru}</span></li>)}</ul></div>
        <div className="hint"><strong>На что обратить внимание.</strong> {lesson.details.error}</div>
      </div> : <><p>{lesson.theory}</p><blockquote lang="de">{lesson.example}</blockquote></>}
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
      <div className="foundation-transfer"><h3>Примени в новой ситуации</h3><p>{lesson.transfer}</p><p className="muted">Сделай это устно или письменно. Для разбора открытой работы можно использовать раздел «Вдвоём».</p>
        {lesson.stage && <div className="actions spaced"><button className="secondary" disabled={!progress.theory || !progress.video || !progress.practice || progress.transfer} onClick={() => save({ [lessonKey(lesson.id, "transfer")]: "done" })}>{progress.transfer ? "✓ Самостоятельная практика выполнена" : "Отметить самостоятельную практику"}</button></div>}
      </div>
    </section>
    <FoundationExam lessonId={lesson.id} />
  </>;
}
