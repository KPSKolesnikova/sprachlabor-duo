"use client";

import { useEffect, useState } from "react";
import { books, checkpoints, goethePdfs, levelOrder, levels, sources, week, type Level, type Skill } from "../lib/course";
import { academicDrills } from "../lib/academic";
import { drills, type Question } from "../lib/drills";
import { formatDrills } from "../lib/formats";
import { diagnostic, dictation, examQuestions, scenePractice } from "../lib/scenes";
import { allTrackQuestions, missions, trackQuestions, tracks, trackResources, type Track } from "../lib/tracks";
import { Duo, type Assignment } from "./duo";
import { achievements, Cards, Progress, weeklyMinutes } from "./progress";
import { ExamGuide, Method, VocabularyCoverage } from "./preparation";
import { Quiz, type Result, type Session } from "./quiz";
import { dateKey, newId, useStudioState, values, type Account, type AnswerLog, type Records } from "./state";
import { Brand, Icon, SectionHead } from "./ui";

const pages = [
  { id: "home", title: "Студия", icon: "home" }, { id: "route", title: "Маршрут", icon: "route" },
  { id: "practice", title: "Тренажёр", icon: "practice" }, { id: "cards", title: "Карточки", icon: "cards" },
  { id: "exams", title: "Пробники", icon: "exam" }, { id: "duo", title: "Вдвоём", icon: "duo" },
  { id: "progress", title: "Прогресс", icon: "stats" }, { id: "library", title: "Библиотека", icon: "book" },
] as const;
type Page = typeof pages[number]["id"];
const practiceQuestions = [...drills, ...scenePractice, ...dictation, ...formatDrills, ...academicDrills];
const allQuestions = [...practiceQuestions, ...allTrackQuestions, ...diagnostic, ...levelOrder.flatMap((item) => [...examQuestions(item, "A"), ...examQuestions(item, "B")])];
const filters = ["Все", "Grammatik", "Wortschatz", "Lesen", "Hören", "Diktat", "Формат экзамена"] as const;
type Filter = typeof filters[number];
const studySkills: Skill[] = ["Grammatik", "Wortschatz", "Lesen", "Hören"];

function pageFromHash(): Page {
  const key = window.location.hash.slice(1);
  return pages.find((page) => page.id === key)?.id ?? "home";
}

export default function Studio({ account }: { account: Account | null }) {
  const state = useStudioState(account);
  const [page, setPage] = useState<Page>("home");
  const [session, setSession] = useState<Session | null>(null);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<Filter>("Все");
  const [libraryFilter, setLibraryFilter] = useState("Все");
  const [libraryText, setLibraryText] = useState("");
  const [assignment, setAssignment] = useState<Assignment>({ level: "A1", variant: "A", subject: "general" });
  const [workKey, setWorkKey] = useState(0);
  const level = levelOrder.find((item) => item === state.records.level) ?? "A1";
  const track = state.records.track === "media" ? "media" : "data";
  const stage = levels[level];
  const mission = missions[track][level];
  const metrics = achievements(state.records);
  const thisWeek = weeklyMinutes(state.records);
  const hasD0 = values<Result>(state.records, "run:").some(([, result]) => result.mode === "diagnostic");
  const activeQuestions = [...practiceQuestions, ...trackQuestions(track, level)].filter((q) => q.level === level);
  const solved = activeQuestions.filter((q) => (state.records[`q:${q.id}`] as AnswerLog | undefined)?.solved).length;
  const visibleBooks = [...books, ...trackResources].filter((book) => (libraryFilter === "Все" || book.category === libraryFilter) && `${book.title} ${book.description} ${book.label}`.toLowerCase().includes(libraryText.trim().toLowerCase()));

  useEffect(() => {
    function onHash() { setPage(pageFromHash()); setSession(null); setMenu(false); }
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function go(destination: Page) {
    window.history.pushState(null, "", destination === "home" ? window.location.pathname : `#${destination}`);
    setSession(null);
    setPage(destination);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function setLevel(value: Level) { state.save({ level: value }); }
  function setTrack(value: Track) { state.save({ track: value }); }
  function start(title: string, questions: Question[], mode: Session["mode"], minutes?: number, variant?: "A" | "B") {
    if (!questions.length) return;
    setSession({ id: newId(), title, level: questions[0].level, mode, minutes, variant, questions,
      subtitle: mode === "practice" ? "Сразу после ответа — ключ и короткое объяснение." : "Ответы и разбор открываются после сдачи. Пропуски входят в результат." });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function startD0() { start("D0 · Входная диагностика", diagnostic, "diagnostic", 15); }
  function startPractice(items: Question[], title: string) {
    const unseen = items.filter((q) => !state.records[`q:${q.id}`]);
    const missed = items.filter((q) => state.records[`q:${q.id}`] && !(state.records[`q:${q.id}`] as AnswerLog).ok);
    const known = items.filter((q) => (state.records[`q:${q.id}`] as AnswerLog | undefined)?.ok);
    start(title, [...unseen, ...missed, ...known].slice(0, 10), "practice");
  }
  function openDuo(value: Level, variant: "A" | "B", subject: Assignment["subject"] = "general") {
    setAssignment({ level: value, variant, subject });
    setWorkKey(workKey + 1);
    go("duo");
  }
  const relevant = activeQuestions.filter((q) => filter === "Diktat" ? q.id.startsWith("diktat-") : filter === "Формат экзамена" ? q.id.startsWith("fmt-") || q.id.startsWith("ac-") : filter === "Все" || q.skill === filter);

  return <div className="app-shell">
    <aside className={"sidebar" + (menu ? " expanded" : "")}>
      <button className="brand-button" aria-label="На главную" onClick={() => go("home")}><Brand /></button>
      <div className="side-caption">НАВИГАЦИЯ</div>
      <nav aria-label="Разделы студии">{pages.map((item) => <button key={item.id} type="button" className={"nav-item" + (page === item.id ? " current" : "")} aria-current={page === item.id ? "page" : undefined} onClick={() => item.id === "duo" ? openDuo(level, "A") : go(item.id)}>
        <Icon name={item.icon} /><span>{item.title}</span>{page === item.id && <span className="nav-dot" />}
      </button>)}</nav>
      <div className="side-footer"><div className="eyebrow">PROGRAMM</div><strong>Deutschland 2028/29</strong><small>Вход → практика → экзамен</small></div>
    </aside>
    <div className="workspace">
      <header className="topbar">
        <button className="menu-button" aria-label={menu ? "Закрыть меню" : "Открыть меню"} aria-expanded={menu} onClick={() => setMenu(!menu)}><Icon name="menu" /></button>
        <div className="top-path">SPRACHLABOR <span>/</span> <strong>{pages.find((item) => item.id === page)?.title}</strong></div>
        <div className="top-controls">
          <span className="xp" title="10 XP за уникальный правильный ответ"><Icon name="spark" size={15} /> {metrics.completed * 10} XP</span>
          {account ? <button className="account" title={account.name} onClick={() => go("progress")}><span className="avatar">{account.name[0]?.toUpperCase() || "U"}</span><span>{account.name.split(" ")[0]}</span></button> : <a className="account login" href="/signin-with-chatgpt?return_to=%2F" target="_top"><span className="avatar">↗</span><span>Войти</span></a>}
        </div>
      </header>
      <main className="main">
        {state.status === "queued" && <div className="notice" role="status">Синхронизация приостановлена. Прогресс занятий сохранён в этом браузере. <button className="text-link" onClick={() => void state.refresh()}>Повторить</button></div>}
        {session ? <Quiz key={session.id} session={session} onLeave={() => setSession(null)} onHomework={openDuo} onFinish={(result, attempts) => {
          const day = dateKey();
          const changes: Records = { [`run:${result.id}`]: { ...result, day } };
          for (const { question, answer, ok } of attempts) {
            const key = `q:${question.id}`;
            const previous = state.records[key] as AnswerLog | undefined;
            changes[key] = { ok, solved: ok || Boolean(previous?.solved), last: answer.slice(0, 400), day };
          }
          state.save(changes);
        }} /> : <>
          {page === "home" && <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow"><span className="signal" /> СТУДИЯ НЕМЕЦКОГО · A1–C1</div>
                <h1>Deutsch<br /><em>zu zweit.</em></h1>
                <p>Учите немецкий в своём темпе, выбирайте темы по интересам и встречайтесь на общих контрольных.</p>
                <div className="actions"><button className="primary" onClick={() => hasD0 ? startPractice(activeQuestions, `${level} · Практика`) : startD0()}>{hasD0 ? "Продолжить тренировку" : "Начать диагностику"} <Icon name="arrow" size={17} /></button><button className="secondary" onClick={() => go("route")}>Открыть маршрут</button></div>
              </div>
              <div className="hero-art" aria-label="Альфи и кавалер-кинг-чарльз-спаниель — маскоты студии">
                <div className="orbit one" /><div className="orbit two" /><div className="orbit three" />
                <span className="art-tag first">DE / 01</span><span className="art-tag last">DUO MODE</span>
                <span className="art-spark a">✦</span><span className="art-spark b">+</span><span className="art-spark c">✦</span>
                <div className="mascot-stage"><Mascot name="data" /><Mascot name="media" /></div>
              </div>
            </section>
            <div className="stat-row">
              <Metric icon="practice" label="Верные ответы" value={String(metrics.completed)} hint="Уникальные задания" />
              <Metric icon="clock" label="Неделя" value={`${Math.floor(thisWeek / 60)} ч ${thisWeek % 60} мин`} hint="Цель · 10 ч 30 мин" />
              <Metric icon="trophy" label="Серия" value={String(metrics.streak)} hint="Дней подряд" />
              <Metric icon="exam" label="Мини-пробники" value={String(metrics.exams)} hint="Завершённые попытки" />
            </div>
            <section className="panel course-overview">
              <div className="panel-head"><div><div className="eyebrow">KAMPAGNE / 01</div><h2>Карта уровней</h2></div><button className="text-link" onClick={() => go("route")}>Вся программа <Icon name="arrow" size={16} /></button></div>
              <LevelStrip level={level} change={setLevel} />
              <div className="stage-note"><div><strong>{stage.title}</strong><span>{stage.subtitle}</span></div><button className="secondary" onClick={() => go("practice")}>К тренировкам</button></div>
            </section>
            <div className="two-column">
              <section className="panel">
                <div className="eyebrow"><Icon name="spark" /> СЮЖЕТНЫЕ ВЕТКИ</div><h2>Твоя программа</h2>
                <TrackSelect track={track} change={setTrack} />
              </section>
              <section className="panel objective"><div className="eyebrow"><Icon name="practice" /> СЛЕДУЮЩЕЕ ЗАДАНИЕ</div><h2>{hasD0 ? mission.name : "D0 · Стартовый профиль"}</h2><p className="muted">{hasD0 ? mission.brief : "Чтение и аудирование с таймером. Письмо и речь доступны в тетради и в мастерской."}</p><div className="actions">{hasD0 ? <button className="primary" onClick={() => openDuo(level, "A", "track")}>Открыть миссию <Icon name="arrow" size={17} /></button> : <button className="primary" onClick={startD0}>Пройти D0 <Icon name="arrow" size={17} /></button>}</div><small>{state.status === "local" ? "Гостевой прогресс · этот браузер" : state.status === "connected" ? "Прогресс синхронизирован" : "Загрузка личного прогресса"}</small></section>
            </div>
          </>}
          {page === "route" && <>
            <SectionHead code="KAMPAGNE / 01" title="Твой маршрут" detail="Общая программа A1–C1 и две ветки практики. Контрольные даты уточняются по результатам." />
            <section className="panel"><LevelStrip level={level} change={setLevel} /><div className="panel-head stage-detail"><div><div className="eyebrow">{stage.calendar} · {stage.german} НЕМЕЦКОГО В ЗАНЯТИЯХ</div><h2>{level} · {stage.title}</h2><p>{stage.subtitle}</p></div><button className="primary" onClick={() => go("practice")}>Тренировать {level} <Icon name="arrow" size={17} /></button></div>
              <div className="lesson-grid"><Detail name="Грамматика">{stage.grammar}</Detail><Detail name="Активный словарь">{stage.active}</Detail><Detail name="Пассивный словарь">{stage.passive}</Detail><Detail name="Контроль">{stage.gate}</Detail></div>
            </section>
            <section className="panel"><div className="eyebrow">ТЕМАТИЧЕСКАЯ ВЕТКА</div><TrackSelect track={track} change={setTrack} /><div className="stage-note"><div><strong>{mission.name}</strong><span>{mission.brief}</span></div><button className="secondary" onClick={() => openDuo(level, "A", "track")}>Миссия →</button></div></section>
            <Method level={level} />
            <div className="two-column">
              <section className="panel"><h2>Недельный ритм</h2>{week.map((day) => <div className="schedule-row" key={day.day}><span className="day">{day.day}</span><div><strong>{day.task}</strong><small>{day.output}</small></div><span className="muted">{day.minutes ? `${day.minutes} мин` : "—"}</span></div>)}</section>
              <section className="panel"><h2>Контрольные точки</h2>{checkpoints.map((checkpoint) => <div className="record" key={checkpoint.title}><div><small>{checkpoint.when}</small><strong>{checkpoint.title}</strong><p>{checkpoint.note}</p></div></div>)}<a href="/materialien/roadmap.md" className="text-link" download>Скачать подробную карту <Icon name="download" size={17} /></a></section>
            </div>
          </>}
          {page === "practice" && <>
            <SectionHead code="TRAINING / 02" title="Тренажёр" detail={`${allQuestions.length} заданий по всем разделам. После ответа сайт показывает ключ и короткий разбор.`} />
            <section className="panel"><div className="panel-head"><div><div className="eyebrow">{tracks[track].tag} · {solved}/{activeQuestions.length} РЕШЕНО</div><h2>Выбери уровень и навык</h2></div></div><LevelStrip level={level} change={(value) => { setLevel(value); setFilter("Все"); }} />
              <div className="chips">{filters.map((item) => <button className={item === filter ? "chip selected" : "chip"} aria-pressed={item === filter} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
              <div className="stage-note"><div><strong>{relevant.length} заданий в подборке</strong><span>В сессию входят до десяти заданий. Сначала новые, затем ошибки.</span></div><button className="primary" disabled={!relevant.length} onClick={() => startPractice(relevant, `${level} · ${filter === "Все" ? "Практика" : filter}`)}>Начать <Icon name="arrow" size={17} /></button></div>
              <div className="skill-grid">{studySkills.map((skill) => { const group = activeQuestions.filter((q) => q.skill === skill); return <button key={skill} className="skill-tile" onClick={() => startPractice(group, `${level} · ${skill}`)}><span>{skill}</span><strong>{group.length}</strong><Icon name="arrow" size={16} /></button>; })}</div>
            </section>
            <section className="panel"><div className="eyebrow">{tracks[track].tag}</div><h2>{mission.name}</h2><p className="muted">{mission.brief}</p><div className="actions"><button className="primary" onClick={() => startPractice(trackQuestions(track, level), `${level} · ${tracks[track].label}`)}>Словарь ветки</button><button className="secondary" onClick={() => openDuo(level, "A", "track")}>Миссия для письма и речи</button></div></section>
          </>}
          {page === "cards" && <><div className="small-levels"><LevelStrip level={level} change={setLevel} /></div><Cards key={`${level}-${track}`} questions={activeQuestions.filter((q) => q.skill === "Wortschatz")} records={state.records} save={state.save} /><VocabularyCoverage key={level} level={level} records={state.records} save={state.save} /></>}
          {page === "exams" && <>
            <SectionHead code="PRÜFUNG / 04" title="Пробные экзамены" detail="Авторские мини-пробники для контроля и официальные комплекты для проверки формата." />
            <section className="panel"><div className="eyebrow">EINSTUFUNG</div><div className="panel-head"><div><h2>D0 · Старт</h2><p className="muted">11 вопросов по чтению и слуху. Письмо и речь оцениваются отдельно.</p></div><button className="primary" onClick={startD0}>Пройти D0 <Icon name="arrow" size={17} /></button></div></section>
            <section className="panel"><LevelStrip level={level} change={setLevel} /><h2 className="spaced">{level} · Варианты A и B</h2><p className="muted">В каждом — 5 вопросов по чтению и 4 по аудированию. Затем отдельные письмо и речь. Тексты вариантов различаются, разбор доступен после сдачи.</p>
              <div className="two-column no-margin">{(["A", "B"] as const).map((variant) => <div className="exam-card" key={variant}><span className="pill">{level} / {variant}</span><h3>Вариант {variant}</h3><p className="muted">20 минут · Lesen + Hören</p><div className="actions"><button className="primary" onClick={() => start(`${level} · Мини-пробник ${variant}`, examQuestions(level, variant), "exam", 20, variant)}>Запустить</button><button className="secondary" onClick={() => openDuo(level, variant)}>Письмо и речь</button></div></div>)}</div>
            </section>
            <section className="panel"><div className="eyebrow">OFFIZIELLE MATERIALIEN</div><h2>Официальный формат</h2><p className="muted">Мини-пробники измеряют прогресс. Для готовности к экзамену пройди два полноформатных варианта по правилам организатора и проверь каждый навык отдельно.</p>
              <div className="actions"><a className="primary" href={goethePdfs[level]} target="_blank" rel="noreferrer">Goethe {level} · PDF ↗</a><a className="secondary" href={sources.goethe} target="_blank" rel="noreferrer">Аудио Goethe ↗</a><a className="secondary" href={sources.testdaf} target="_blank" rel="noreferrer">TestDaF ↗</a><a className="secondary" href={sources.telc} target="_blank" rel="noreferrer">telc C1 Hochschule ↗</a></div>
              <p className="hint">Для немецкоязычной программы сначала сверь допустимый сертификат и дедлайн. <a href={sources.admission} target="_blank" rel="noreferrer">uni-assist ↗</a> · <a href={sources.georgia} target="_blank" rel="noreferrer">TestDaF в Грузии ↗</a></p>
            </section>
            <ExamGuide level={level} records={state.records} save={state.save} />
          </>}
          {page === "duo" && <Duo key={workKey} account={account} state={state} track={track} selection={assignment} />}
          {page === "progress" && <Progress records={state.records} save={state.save} questions={allQuestions} retry={(items) => start("Повторение ошибок", items, "practice")} level={level} />}
          {page === "library" && <>
            <SectionHead code="BIBLIOTHEK / 07" title="Библиотека" detail="Учебники, рабочие листы, авторские материалы и официальные пробники. Для материалов издателей используются оригинальные ссылки." />
            <section className="panel library-search"><label className="field"><span>Найти материал</span><input value={libraryText} onChange={(e) => setLibraryText(e.target.value)} placeholder="Например, B1 или Goethe" /></label><div className="chips">{["Все", "Учебники", "Курсы", "Пробники", "Наши файлы"].map((item) => <button key={item} className={item === libraryFilter ? "chip selected" : "chip"} aria-pressed={item === libraryFilter} onClick={() => setLibraryFilter(item)}>{item}</button>)}</div></section>
            <div className="library-grid">{visibleBooks.map((book) => {
              const download = book.href.startsWith("/") && !book.href.endsWith(".html");
              return <article className="panel book" key={book.title}><div className="book-top"><span className="book-icon"><Icon name="book" /></span><span className="pill">{book.label}</span></div><h2>{book.title}</h2><p className="muted">{book.description}</p><div className="actions"><a className="secondary" href={book.href} target={download ? undefined : "_blank"} rel="noreferrer" download={download || undefined}>{download ? "Скачать" : book.href.startsWith("/") ? "Открыть ↗" : "Источник ↗"}</a>{book.download && <a className="text-link" href={book.download} target="_blank" rel="noreferrer">Файл <Icon name="download" size={16} /></a>}</div></article>;
            })}</div>
            {!visibleBooks.length && <p className="hint" role="status">По этому запросу ничего не найдено. Попробуй название или уровень.</p>}
          </>}
        </>}
        <footer><span>SPRACHLABOR</span><span>Учебные уровни по <a href={sources.cefr} target="_blank" rel="noreferrer">CEFR ↗</a> · без официальной сертификации</span>{account && <a href="/signout-with-chatgpt?return_to=%2F" target="_top">Выйти</a>}</footer>
      </main>
    </div>
  </div>;
}

function Metric({ icon, label, value, hint }: { icon: string; label: string; value: string; hint: string }) {
  return <div className="metric"><div className="metric-label"><Icon name={icon} size={16} /> {label}</div><strong>{value}</strong><small>{hint}</small></div>;
}
function LevelStrip({ level, change }: { level: Level; change: (level: Level) => void }) {
  return <div className="level-strip" aria-label="Уровень немецкого">{levelOrder.map((item) => <button key={item} className={level === item ? "level selected" : "level"} aria-pressed={level === item} onClick={() => change(item)}><span>{levels[item].chapter} /</span><strong>{item}</strong><small>{levels[item].title}</small></button>)}</div>;
}
function Mascot({ name }: { name: Track }) {
  return name === "data" ? <div className="mascot alfie" role="img" aria-label="Альфи, львёнок в синем свитере" /> : <img className="mascot spaniel" src="/mascots/spaniel.webp" alt="Кавалер в бежевом свитере и тёмно-синих брюках" />;
}
function TrackSelect({ track, change }: { track: Track; change: (track: Track) => void }) {
  return <div className="track-select" aria-label="Тематическая ветка">{(["data", "media"] as const).map((item) => <button className={item === track ? "track selected" : "track"} key={item} aria-pressed={item === track} onClick={() => change(item)}><span className="track-emblem"><Icon name={item === "data" ? "stats" : "book"} size={20} /></span><span><strong>{tracks[item].label}</strong><small>{tracks[item].subtitle}</small></span>{track === item && <Icon name="check" size={17} />}</button>)}</div>;
}
function Detail({ name, children }: { name: string; children: string }) {
  return <div className="detail"><span>{name}</span><p>{children}</p></div>;
}
