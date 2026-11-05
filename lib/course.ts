export const levelOrder = ["A1", "A2", "B1", "B2", "C1"] as const;
export type Level = typeof levelOrder[number];
export type Skill = "Grammatik" | "Wortschatz" | "Lesen" | "Hören" | "Schreiben" | "Sprechen";

export const levels = {
  A1: { chapter: "01", title: "Erster Kontakt", subtitle: "Представься, переспроси и договорись о встрече.", calendar: "Ноя 2026 — янв 2027", german: "35%", gate: "Goethe A1 и знакомство без сценария", grammar: "Präsens, V2, вопросы, артикли, Akkusativ, отрицание, модальные и отделяемые глаголы.", active: "Ich arbeite mit Daten. Können Sie das bitte wiederholen? Wann beginnt der Kurs?", passive: "die Anmeldung, der Eingang, die Besprechung, der Datensatz", work: "Расскажи о себе и о своей работе в трёх простых фразах." },
  A2: { chapter: "02", title: "Im Alltag", subtitle: "Решай бытовые задачи и рассказывай о прошлом.", calendar: "Фев — апр 2027", german: "50%", gate: "Goethe A2 и незнакомый разговор о переносе встречи", grammar: "Perfekt, Dativ, Wechselpräpositionen, сравнительная степень, weil, dass, wenn.", active: "Ich habe den Termin verschoben. Könnten wir uns am Donnerstag treffen?", passive: "die Besichtigung, die Voraussetzung, der Ersatztermin, die Fehlermeldung", work: "Объясни, как воспроизвести ошибку и что ты уже проверила." },
  B1: { chapter: "03", title: "Eigene Stimme", subtitle: "Объясняй решения, аргументируй и задавай уточняющие вопросы.", calendar: "Май — авг 2027", german: "70%", gate: "Четыре модуля Goethe B1 и объяснение простого графика", grammar: "Relativsätze, косвенные вопросы, um … zu/damit, Konjunktiv II, Passiv, связки.", active: "Die Daten zeigen, dass … Meiner Meinung nach … Könnten Sie erläutern, …?", passive: "die Stichprobe, die Anforderung, die Rückmeldung, die Einschränkung", work: "Представь дашборд, назови источник и ограничение, предложи следующий шаг." },
  B2: { chapter: "04", title: "Argument & Analyse", subtitle: "Сопоставляй позиции, читай графики и обсуждай риски.", calendar: "Сен — дек 2027", german: "85%", gate: "Goethe B2 и сверка формата академического экзамена", grammar: "Konjunktiv I/II, расширенные определения, Nominalstil, связки, стиль и управление.", active: "Die Ergebnisse deuten darauf hin, dass … Daraus lässt sich ableiten, …", passive: "die Verzerrung, die Aussagekraft, der Schwellenwert, die Generalisierbarkeit", work: "Поясни выбор метрики и влияние дисбаланса классов." },
  C1: { chapter: "05", title: "Campus & Forschung", subtitle: "Обсуждай исследования, точность вывода и альтернативы.", calendar: "Янв — март 2028", german: "90–95%", gate: "Два свежих пробника выбранного экзамена и оценка всех навыков", grammar: "Косвенная речь, академическая связность, оттенки модальности, перефразирование, регистр.", active: "Diese Deutung setzt voraus, dass … Der Einwand ist insofern berechtigt, als …", passive: "die Übertragbarkeit, die Kausalität, die Abwägung, der Störfaktor", work: "Защити вывод ML-пилота, объясни ограничения и ответь на контраргумент." },
} satisfies Record<Level, { chapter: string; title: string; subtitle: string; calendar: string; german: string; gate: string; grammar: string; active: string; passive: string; work: string }>;

export const week = [
  { day: "Пн", minutes: 90, task: "Курс, грамматика и речь", output: "1 короткий устный ответ" },
  { day: "Вт", minutes: 85, task: "Аудирование, диктант, произношение", output: "1 диктант" },
  { day: "Ср", minutes: 90, task: "Чтение, письмо, редактирование", output: "1 текст" },
  { day: "Чт", minutes: 95, task: "Грамматика, диалог, пересказ", output: "1 ролевая беседа" },
  { day: "Пт", minutes: 75, task: "Бытовой или IT-сценарий, исправления", output: "1 новый пример на перенос" },
  { day: "Сб", minutes: 195, task: "Контроль, разбор, речь и лёгкий немецкий", output: "1 тест и следующий шаг" },
  { day: "Вс", minutes: 0, task: "Отдых", output: "Лёгкий контакт с языком по желанию" },
];

export const checkpoints = [
  { title: "D0 · стартовый профиль", when: "Сейчас", note: "Чтение и слух в стартовом тесте. Письмо и речь — в рабочей тетради." },
  { title: "Контроль 01 · A1", when: "Неделя 4", note: "Незнакомые чтение, слух, письмо и разговор с таймером." },
  { title: "Goethe A1 → A2 → B1 → B2", when: "2027", note: "Внутренний ориентир — от 75% в каждом навыке на двух свежих заданиях. У официальных экзаменов свои шкалы." },
  { title: "Академический экзамен", when: "2028", note: "Сверь допустимый сертификат, центр и дедлайн. Для TestDaF ориентир TDN 4 в каждом разделе; внутренний тест TDN не присваивает." },
];

export const sources = {
  goethe: "https://www.goethe.de/ins/de/de/prf/exc.html",
  testdaf: "https://www.testdaf.de/de/teilnehmende/der-digitale-testdaf/vorbereitung-auf-den-digitalen-testdaf",
  georgia: "https://www.goethe.de/ins/ge/de/spr/prf/testdaf.html",
  telc: "https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/telc-deutsch-c1-hochschule/",
  telcZip: "https://www.telc.net/fileadmin/user_upload/mock_exams/Deutsch/telc_deutsch_c1_hochschule.zip",
  cefr: "https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors",
  admission: "https://www.uni-assist.de/bewerben/dokumente-sammeln/sprachzertifikate/",
};

export type Book = { title: string; label: string; category: string; description: string; href: string; download?: string; details?: string };
export const books: Book[] = [
  { title: "Deutsch im Blick", label: "A1–A2", category: "Учебники", description: "Открытый курс UT Austin с упражнениями, видео и главами для самостоятельной работы.", href: "https://www.coerll.utexas.edu/dib/", download: "https://www.coerll.utexas.edu/dib/pdfs/DeutschImBlick-textbook.pdf" },
  { title: "Ankunft in Würzburg", label: "A1", category: "Учебники", description: "Первая глава и Kurspaket. Приветствия, имена, числа, знакомство. COERLL, UT Austin, CC BY.", href: "https://coerll.utexas.edu/dib/toc.php?k=1", download: "/materialien/COERLL_Kurspaket_01.pdf" },
  { title: "Begegnungen A1+", label: "A1", category: "Учебники", description: "62 страницы дополнительных рабочих листов от SCHUBERT-Verlag.", href: "https://www.aufgaben.schubert-verlag.de/uebungen_a1/a1_uebungen_index.htm", download: "https://www.aufgaben.schubert-verlag.de/uebungen_a1/A1-Onlineaufgaben.pdf" },
  { title: "Willkommen: Deutsch für alle 2", label: "B1", category: "Учебники", description: "Открытый курс Claudia Kost и Crystal Sawatzky. B1.1–B1.2 с заданиями на четыре навыка.", href: "https://pressbooks.openeducationalberta.ca/willkommen-deutsch-2/", download: "https://openlibrary-repo.ecampusontario.ca/jspui/bitstream/123456789/2179/2/Willkommen-Deutsch-fur-alle-2-1707858327.pdf" },
  { title: "Fokus Deutsch B2", label: "B2", category: "Учебники", description: "Пробные главы 1–3 курса и рабочей тетради. Немецкий для работы и повседневных задач.", href: "https://www.cornelsen.de/reihen/fokus-deutsch-120002370000/allgemeine-ausgabe-120002370001", download: "https://www.cornelsen.de/_Resources/Persistent/0/a/9/3/0a93eb5f9aa1263eb2a0a7d2755fc9dff1bf9ca1/0001100000220%20KVAD_Fokus_Deutsch_B2_low.pdf" },
  { title: "vhs-Lernportal", label: "A1–C1", category: "Курсы", description: "Основной бесплатный курс для A1–B1 и профессиональные материалы B2/C1.", href: "https://www.vhs-lernportal.de/wws/kursangebot.php" },
  { title: "Nicos Weg · Deutsche Welle", label: "A1–B1", category: "Курсы", description: "Сюжетные уроки, короткие видео и тренировка аудирования.", href: "https://learngerman.dw.com/en/nicos-weg/c-36519789" },
  { title: "Easy German Podcast", label: "B1–C1", category: "Курсы", description: "Живой разговорный немецкий. Возьми фрагмент, запиши тезис и перескажи.", href: "https://www.easygerman.org/podcast" },
  { title: "openHPI · Schmutzige Daten", label: "B2–C1", category: "Курсы", description: "Немецкий на реальной профессиональной теме качества данных.", href: "https://open.hpi.de/learn/insighthpi01" },
  { title: "telc Deutsch C1 Hochschule", label: "C1", category: "Пробники", description: "Официальный Übungstest 1 с PDF и аудио. Сверь, принимает ли сертификат выбранная программа.", href: sources.telc, download: sources.telcZip },
  { title: "Digitaler TestDaF", label: "B2–C1", category: "Пробники", description: "Примеры заданий, инструкции, аудио и рубрики по каждому разделу.", href: sources.testdaf },
  { title: "Goethe Onleihe", label: "A1–C1", category: "Учебники", description: "Легальный доступ к цифровым книгам и аудиокнигам по правилам библиотеки.", href: "https://www.goethe.de/de/kul/bib/onl.html" },
  { title: "Deutsch · план до 2028/29", label: "A1–C1", category: "Наши файлы", description: "Полный исходный маршрут, методика, критерии и источники.", href: "/materialien/roadmap.md" },
  { title: "Arbeitsheft 01", label: "A1", category: "Наши файлы", description: "Входная диагностика, четыре недели занятий и контрольная.", href: "/materialien/arbeitsheft.md" },
  { title: "Arbeitsheft · аудио", label: "A1", category: "Наши файлы", description: "D0, диктанты и контрольная первого месяца. Синтезированная немецкая озвучка.", href: "/materialien/hoeren.html" },
  { title: "Трекер Excel", label: "A1–C1", category: "Наши файлы", description: "Офлайн-журнал на 99 недель, ошибки, контрольные и программы.", href: "/materialien/tracker.xlsx" },
  { title: "Anki · старт", label: "A1", category: "Наши файлы", description: "20 карточек в UTF-8. Импортируй в Anki как два поля с табуляцией.", href: "/materialien/anki.tsv" },
];

export const goethePdfs: Record<Level, string> = {
  A1: "https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_modellsatz.pdf",
  A2: "https://www.goethe.de/pro/relaunch/prf/materialien/A2/A2_Modellsatz_Erwachsene.pdf",
  B1: "https://www.goethe.de/pro/relaunch/prf/materialien/B1/b1_modellsatz_erwachsene.pdf",
  B2: "https://www.goethe.de/pro/relaunch/prf/materialien/B2/b2_modellsatz_erwachsene.pdf",
  C1: "https://www.goethe.de/pro/relaunch/prf/materialien/C1_modular/c1-modular_modellsatz.pdf",
};
for (const level of levelOrder) {
  books.push({ title: `Goethe-Zertifikat ${level}`, label: level, category: "Пробники", description: "Официальный комплект для взрослых. Аудио и дополнительные материалы доступны у Goethe-Institut.", href: sources.goethe, download: goethePdfs[level] });
}

type OpenTasks = { write: string; speak: string; words: string; time: string };
export const openTasks: Record<Level, [OpenTasks, OpenTasks]> = {
  A1: [
    { write: "Du kannst am Mittwoch nicht zum Deutschkurs kommen. Schreib der Lehrerin. Begrüße sie, nenne einen Grund, frag nach den Hausaufgaben und verabschiede dich.", speak: "Stell dich vor. Sag, was du lernst oder machst, was du gern tust und wann du Zeit für einen Deutschkurs hast. Bitte deine Partnerin um eine Rückfrage.", words: "30–55 слов", time: "60–90 секунд" },
    { write: "Du möchtest mit einer neuen Kommilitonin lernen. Schreib ihr: Schlage einen Tag, eine Uhrzeit und einen Ort vor. Frage, ob sie Zeit hat.", speak: "Vereinbart ein Treffen am Bahnhof. Nenne einen Termin, frage nach dem Eingang und wiederhole am Ende Tag, Uhrzeit und Ort.", words: "30–55 слов", time: "60–90 секунд" },
  ],
  A2: [
    { write: "Die Besichtigung einer Wohnung wurde verschoben. Schreib an die Vermieterin. Sage, wann du Zeit hast, frag nach der Adresse und bitte um Bestätigung.", speak: "Erzähle, was du gestern bei der Arbeit oder im Studium gemacht hast. Nenne eine Schwierigkeit und erkläre, wie du sie gelöst hast.", words: "70–90 слов", time: "2–3 минуты" },
    { write: "Du hast gestern einen Fehler in einer App entdeckt. Schreib deiner Kollegin: Beschreibe die Schritte, nenne das Ergebnis und schlage einen neuen Testtermin vor.", speak: "Du hast einen Termin am Freitag, kannst aber nicht kommen. Entschuldige dich, erkläre den Grund, mache zwei Vorschläge und bestätige den neuen Termin.", words: "70–90 слов", time: "2–3 минуты" },
  ],
  B1: [
    { write: "Dein Kurs soll wahlweise online oder in Präsenz stattfinden. Schreib im Kursforum: Nenne deine Präferenz, beschreibe deine Erfahrung, nenne einen Vorteil der anderen Option und schlage einen Kompromiss vor.", speak: "Stell ein einfaches Dashboard vor. Erkläre, woher die Daten kommen, welche Kennzahl du beobachtest, welche Einschränkung es gibt und was du als Nächstes prüfen würdest.", words: "120–160 слов", time: "4–5 минут" },
    { write: "Ein Uni-Termin fällt mit deinem Praktikum zusammen. Bitte die Dozentin um eine Lösung. Erkläre den Konflikt, biete zwei Möglichkeiten an und formuliere eine höfliche Rückfrage.", speak: "Diskutiert, ob Studierende im Unterricht KI verwenden dürfen. Nenne zwei Gründe, reagiere auf einen Einwand und formuliert am Ende eine Regel für den Kurs.", words: "120–160 слов", time: "4–5 минут" },
  ],
  B2: [
    { write: "Eine Hochschule testet ein automatisches Feedbacksystem. In einem Pilotprojekt sank die Wartezeit von fünf auf zwei Tage, aber 18 von 100 Rückmeldungen enthielten ungenaue Hinweise. Fasse die Ergebnisse zusammen, diskutiere Chancen und Risiken und empfiehl ein Vorgehen.", speak: "In einer Stichprobe sind 95 Prozent der Fälle negativ. Ein Modell klassifiziert alles als negativ. Erkläre seiner Projektleitung, warum die Genauigkeit täuscht, nenne sinnvolle Alternativen und beantworte einen Einwand.", words: "180–240 слов", time: "5–6 минут" },
    { write: "Eine Stadt möchte anonymisierte Nutzungsdaten auswerten, um Busfahrpläne anzupassen. Vergleiche zwei Vorteile und zwei Risiken, erläutere eine Bedingung für eine faire Stichprobe und ziehe ein Fazit.", speak: "Vergleicht ein Dashboard für das Management und eines für ein operatives Team. Legt Zielgruppe, wichtigste Kennzahl und einen Prüfpunkt für die Datenqualität fest.", words: "180–240 слов", time: "5–6 минут" },
  ],
  C1: [
    { write: "Gruppe A nutzt ein Lernsystem freiwillig und erreicht 12 Punkte mehr als Gruppe B. Gruppe A besteht überwiegend aus erfahrenen Studierenden. Interpretiere den Befund, erläutere die Grenzen der Kausalaussage und schlage ein belastbareres Studiendesign vor.", speak: "Stell ein ML-Pilotprojekt vor: Fragestellung, Stichprobe, Wahl einer Kennzahl, Unsicherheiten und Freigabebedingung. Gehe auf den Einwand ein, dass ein externer Datensatz andere Ergebnisse liefern könnte.", words: "220–280 слов", time: "6–8 минут" },
    { write: "Ein Institut findet an zwei Standorten ähnliche Korrelationen, obwohl die Erhebungsverfahren voneinander abweichen. Diskutiere, welche Schlussfolgerungen vertretbar sind, unterscheide Reproduzierbarkeit und Übertragbarkeit und formuliere eine differenzierte Empfehlung.", speak: "Fasse zwei Positionen zu verpflichtenden Modell-Audits zusammen. Wäge Nutzen und Ressourcen gegeneinander ab, formuliere eine überprüfbare Mindestanforderung und antworte auf einen Einwand.", words: "220–280 слов", time: "6–8 минут" },
  ],
};

export const rubrics = {
  Schreiben: ["Выполнение задания", "Структура и регистр", "Словарь", "Грамматика и орфография"],
  Sprechen: ["Выполнение задания", "Понятность и связность", "Диапазон и точность", "Темп и взаимодействие"],
};
