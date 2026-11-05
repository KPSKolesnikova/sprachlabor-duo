import { choice, fill, orderedChoices, type Question } from "./drills";

type AcademicFormat = {
  name: string;
  timing: string;
  reading: string;
  listening: string;
  writing: string;
  speaking: string;
  source: string;
  rubric: string;
};

export const academicFormats: AcademicFormat[] = [
  {
    name: "Digitaler TestDaF",
    timing: "Lesen около 55 мин, Hören около 40 мин, Schreiben около 60 мин, Sprechen около 35 мин. Фактическая длительность может варьироваться. К предыдущей задаче вернуться нельзя.",
    reading: "Семь типов: лексические пропуски, порядок абзацев, выбор ответа, речевые действия, распределение утверждений по категориям, сопоставление с парой понятий, поиск ошибок в резюме.",
    listening: "Семь типов: три вида печатных кратких ответов по аудио и видео, поиск ошибок в резюме, сопоставление утверждений с говорящими на видео, выбор ответа, сверка услышанного с написанным.",
    writing: "Аргументированный текст от 200 слов и сводка информации из текста и графика примерно на 100–150 слов. Оба ответа печатаются.",
    speaking: "Семь записываемых ответов в гарнитуру: дать совет, взвесить варианты, резюмировать текст, сопоставить источники и выразить позицию, представить тему, пересказать аргументы и ответить на них, критически оценить меры. Время ответа от 45 до 150 секунд.",
    source: "https://www.testdaf.de/de/teilnehmende/der-digitale-testdaf/aufbau-des-digitalen-testdaf/",
    rubric: "https://www.testdaf.de/de/teilnehmende/der-digitale-testdaf/auswertung-des-digitalen-testdaf",
  },
  {
    name: "telc Deutsch C1 Hochschule",
    timing: "Lesen и Sprachbausteine вместе 90 мин, перерыв 20 мин, Hören 40 мин, Schreiben 70 мин. Sprechen около 16 мин обычно в паре, после 20 мин подготовки.",
    reading: "Восстановление текста, сопоставление утверждений с абзацами, различение «верно», «неверно» и «в тексте не сказано», выбор заголовка. В Sprachbausteine 22 пропуска на лексику, грамматику и орфографию.",
    listening: "Записи звучат один раз. Нужно сопоставить высказывания с говорящими, понять детали интервью или дискуссии и заполнить конспект выступления.",
    writing: "Выбрать одну из двух тем и за 70 минут написать структурированный текст примерно на 350 слов. Важно явно ответить на задание, развить аргументы и выдержать регистр.",
    speaking: "Короткая презентация, резюме презентации партнёра и уточняющие вопросы, затем совместная дискуссия. Тренируй реакцию на реальный вклад партнёра и связь реплик.",
    source: "https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/telc-deutsch-c1-hochschule/",
    rubric: "https://www.telc.net/fileadmin/user_upload/pdfs/Handbuch_und_Tipps_fuer_Pruefungsvorbereitung/Deutsch_c1_hochschule_tipps_zur_pruefungsvorbereitung.pdf",
  },
];

const transport = "Eine Hochschule prüfte im Frühjahr 2026, ob ein späterer Abendbus den Heimweg nach der Bibliothek erleichtert. Auf dem Nordcampus fuhr der letzte Bus zwei Monate lang eine Stunde später, auf dem Südcampus blieb der Fahrplan unverändert. In einer freiwilligen Befragung wurde erfasst, wer den Bus mindestens einmal pro Woche für den Heimweg nutzte. Gleichzeitig verlängerte die Bibliothek am Nordcampus ihre Öffnungszeiten. Die Befragung liefert damit Hinweise auf verändertes Verhalten, erlaubt aber keine eindeutige Zuordnung zu einer einzelnen Maßnahme.";
const transportTable = "Anteil der Befragten mit mindestens einer wöchentlichen Busfahrt nach Hause. Nordcampus: vor der Erprobung 36 %, danach 52 %. Südcampus: vorher 40 %, danach 44 %.";
const consultation = "Die Studienberatung erprobte eine Online-Sprechstunde und ließ die Präsenzsprechstunde bestehen. Studierende wählten das Format selbst. Erfasst wurden bei beiden Gruppen die mittlere Wartezeit auf einen Termin und der Anteil der Befragten, die nach dem Gespräch ihren nächsten Schritt benennen konnten. Vor der Auswertung fiel auf, dass Studierende im ersten Semester öfter in Präsenz kamen. In beiden Formaten wurden dieselben Informationen angeboten.";
const consultationTable = "Online: mittlere Wartezeit 3 Tage, nächster Schritt bekannt bei 74 % der Befragten. Präsenz: mittlere Wartezeit 6 Tage, nächster Schritt bekannt bei 82 %.";

export const academicTasks: {
  id: string;
  title: string;
  input: string;
  writing: string;
  speaking: string;
  rubric: string[];
}[] = [
  {
    id: "ac-campus-transport",
    title: "Abendbus und Bibliothek",
    input: `${transport}\n\n${transportTable}`,
    writing: "Fasse den Text und die Angaben in etwa 100–150 Wörtern zusammen. Stelle beide Standorte gegenüber, nenne die Erhebungsmethode und erläutere, warum aus der Auswertung kein eindeutiger Effekt des Fahrplans folgt.",
    speaking: "Im Studierendenrat fordert jemand, den Abendbus sofort auf alle Standorte auszuweiten. Antworte in 60–90 Sekunden. Beziehe dich auf die Angaben, nenne ein Gegenargument und schlage einen nächsten Schritt vor.",
    rubric: ["Оба источника представлены, значения и направление изменения сохранены.", "Разница в процентных пунктах и возможное объяснение разведены.", "Письмо связано и нейтрально, устный ответ учитывает собеседника и предлагает конкретный шаг."],
  },
  {
    id: "ac-campus-consultation",
    title: "Digitale Studienberatung",
    input: `${consultation}\n\n${consultationTable}`,
    writing: "Fasse den Text und die Daten in etwa 100–150 Wörtern zusammen. Vergleiche beide Formate anhand beider Kennzahlen und nenne einen Grund, warum sich die Formate auf Grundlage dieser Daten nicht direkt bewerten lassen.",
    speaking: "Eine Kommilitonin meint, alle Sprechstunden sollten online stattfinden. Reagiere in 60–90 Sekunden. Wäge Wartezeit und Nutzen ab, gehe auf die unterschiedliche Zusammensetzung der Gruppen ein und formuliere eine Empfehlung.",
    rubric: ["Обе метрики названы для обоих форматов, величины прочитаны правильно.", "Выбор формата самими студентами учтён, вывод не выходит за пределы данных.", "Изложение структурировано, устная рекомендация отвечает на позицию собеседницы."],
  },
];

const notes = "Notiz 1: Der spätere Bus wurde an beiden Standorten erprobt. Notiz 2: Der Anteil stieg am Nordcampus von 36 auf 52 %. Notiz 3: Die Teilnahme an der Befragung war freiwillig.";
const continuity = "Die Hochschule veröffentlichte die Auswertung erst nach Ende der Erprobung. [Lücke] Aus diesem Grund warnte die Projektleitung davor, die Unterschiede vorschnell auf den Fahrplan zurückzuführen.";
const cloze = "Der digitale Zugang kann Wege verkürzen. […] bleibt offen, ob alle Studierenden gleichermaßen davon profitieren. Bei der Einordnung muss berücksichtigt werden, dass sie das Beratungsformat selbst gewählt haben.";
const fourOptions = orderedChoices("ac-sprachbausteine-register", ["dennoch", "infolgedessen", "insbesondere", "beispielsweise"]);

export const academicDrills: Question[] = [
  { ...fill("ac-nord-difference", "C1", "Lesen", ["Um wie viele Prozentpunkte stieg der Anteil am Nordcampus? Gib nur die Zahl an.", ["16", "16,0", "16.0"], "52 minus 36 ergibt 16 Prozentpunkte. Die Angabe bezieht sich auf Anteile."]), text: transportTable },
  { ...fill("ac-sued-difference", "C1", "Lesen", ["Um wie viele Prozentpunkte stieg der Anteil am Südcampus? Gib nur die Zahl an.", ["4", "4,0", "4.0"], "44 minus 40 ergibt 4 Prozentpunkte."]), text: transportTable },
  { ...fill("ac-notes-error", "C1", "Lesen", ["Welche Notiz widerspricht dem Text? Gib nur ihre Nummer an.", "1", "Nur am Nordcampus fuhr der letzte Bus später. Die beiden anderen Notizen stimmen." ]), text: `${transport}\n\n${transportTable}\n\n${notes}` },
  { ...choice("ac-reading-causality", "C1", "Lesen", ["Was begrenzt die Aussagekraft für den Effekt des Busfahrplans?", "Die Bibliothek blieb am Nordcampus gleichzeitig länger geöffnet.", "Am Nordcampus wurde kein neuer Fahrplan erprobt.", "Der Bus wurde nach der Erprobung gar nicht mehr genutzt.", "Die beiden Veränderungen fielen am Nordcampus zusammen. Ein zeitlicher Zusammenhang belegt noch keinen einzelnen Auslöser."]), text: transport },
  { ...choice("ac-reading-not-stated", "C1", "Lesen", ["Aussage: Die Teilnahme an der freiwilligen Befragung wurde vergütet. Was sagt der Text dazu?", "Das steht nicht im Text.", "Die Aussage ist richtig.", "Die Aussage widerspricht dem Text.", "Freiwilligkeit allein sagt nichts über eine Vergütung aus."]), text: transport },
  { ...choice("ac-reading-coherence", "C1", "Lesen", ["Welcher Satz passt in die Lücke?", "Zeitgleich änderten sich am Nordcampus auch die Öffnungszeiten der Bibliothek.", "In der Projektgruppe standen im Frühjahr drei Stellen zur Verfügung.", "Die Datei mit den Abbildungen war nach dem Download leicht zu öffnen.", "«Aus diesem Grund» braucht hier einen sachlichen Grund für die vorsichtige Deutung."]), text: continuity },
  { ...fill("ac-consultation-wait", "C1", "Lesen", ["Um wie viele Tage war die mittlere Wartezeit online kürzer? Gib nur die Zahl an.", ["3", "3,0", "3.0"], "6 minus 3 ergibt 3 Tage." ]), text: consultationTable },
  { ...choice("ac-consultation-note", "C1", "Lesen", ["Welche Formulierung fasst die beiden Kennzahlen zutreffend zusammen?", "Online war die Wartezeit kürzer. In Präsenz kannten mehr Befragte ihren nächsten Schritt.", "Online schnitt das Angebot bei beiden Kennzahlen besser ab.", "Die Wartezeit war in Präsenz kürzer. Der Anteil mit bekanntem nächsten Schritt war gleich.", "Die beiden Kennzahlen zeigen Vorteile in unterschiedlichen Formaten."]), text: consultationTable },
  { ...fill("ac-grammar-concession", "C1", "Grammatik", ["Ergänze die Konjunktion, die einen Einwand einräumt: ___ die mittlere Wartezeit online kürzer war, bleibt offen, welches Format hilfreicher ist.", ["obwohl", "obgleich", "obschon", "wenngleich"], "Konzessive Konjunktionen verbinden einen zugestandenen Befund mit einer Einschränkung. Das finite Verb steht im Nebensatz am Ende."]) },
  { ...choice("ac-sprachbausteine-register", "C1", "Grammatik", ["Welches Adverb drückt hier einen Gegensatz aus?", "dennoch", "infolgedessen", "insbesondere", "«Dennoch» räumt den Vorteil ein und führt die offene Frage ein. «Infolgedessen» würde eine Folge ausdrücken."]), choices: fourOptions, text: cloze },
  { ...fill("ac-sprachbausteine-orthography", "C1", "Grammatik", ["Ergänze die feste Verbindung: Der Unterschied ist nicht ohne ___ auf alle Studierenden übertragbar. Schreibe das fehlende Wort groß.", "Weiteres", "«Ohne Weiteres» bedeutet in diesem Kontext ohne weitere Prüfung oder Einschränkung. Hier wird die großgeschriebene Standardform geübt." ]), exact: true },
  { ...choice("ac-sprachbausteine-indirect", "C1", "Grammatik", ["Die Projektleitung erklärte, die Teilnahme ___ freiwillig gewesen. Ergänze den Konjunktiv I.", "sei", "war", "wäre", "«Sei gewesen» ist Konjunktiv I der Vergangenheit und markiert die wiedergegebene Aussage." ]), choices: orderedChoices("ac-sprachbausteine-indirect", ["sei", "war", "wäre", "hat"]) },
];
