import { levelOrder, type Level } from "./course";
import { choice } from "./drills";
import { grammarLessons } from "./method";

type LessonSeed = [video: string, focus: string, questions: string[]];
const curriculum: Record<Level, LessonSeed[]> = {
  A1: [
    ["O-_cxHx5FD4", "Найди личный глагол в утверждении и сравни его место с вопросом.", ["A1-g-0", "A1-g-1", "A1-g-3", "A1-g-9", "lesson-a1-word-order"]],
    ["fPKH95g_9cs", "Заметь, как меняется артикль мужского рода, когда предмет становится дополнением.", ["A1-g-4", "A1-g-5", "A1-g-12", "lesson-a1-article", "lesson-a1-article-negative"]],
    ["Tizr0WwCzFQ", "Запиши пример, где приставка отделяется, и сравни с фразой после модального глагола.", ["A1-g-3", "A1-g-8", "A1-g-11", "lesson-a1-frame", "lesson-a1-frame-modal"]],
    ["Mty5HjzgNOc", "Выдели вежливую форму с Sie. Затем произнеси короткое указание, куда идти.", ["A1-g-6", "A1-g-7", "lesson-a1-request", "lesson-a1-direction", "diktat-8"]],
  ],
  A2: [
    ["3q50fD7o7Xw", "Выпиши по одному примеру Perfekt с haben и sein.", ["A2-g-0", "A2-g-1", "A2-g-10", "A2-g-12", "A2-x-11"]],
    ["auWRmuw_AcY", "Для каждого примера сначала спроси себя Wo? или Wohin?, затем проверь падеж.", ["A2-g-4", "A2-g-5", "lesson-a2-place", "lesson-a2-target", "lesson-a2-move"]],
    ["ATnUjMoNXhE", "В примерах с weil, dass и wenn проследи за местом личной формы.", ["A2-g-2", "A2-g-3", "A2-g-9", "lesson-a2-condition", "lesson-a2-because"]],
    ["dLYFZZqpE6c", "Заметь форму сравнения с als. В теории рядом сравни её с so … wie.", ["A2-g-7", "A2-g-8", "A2-g-15", "lesson-a2-equal", "lesson-a2-request"]],
  ],
  B1: [
    ["wzmul2DzOEU", "В каждом примере определи роль относительного местоимения внутри придаточного.", ["B1-g-0", "B1-g-1", "B1-g-14", "B1-x-1", "B1-x-8"]],
    ["u36SxFGEfrQ", "Сравни, кто выполняет действие в главной и придаточной части. Это поможет выбрать um … zu или damit.", ["B1-g-3", "B1-g-4", "B1-g-5", "B1-g-6", "lesson-b1-purpose"]],
    ["43m6-wQuaGo", "Заметь конструкцию werden + Partizip II. После видео сравни её с формой состояния в теории.", ["B1-g-7", "B1-g-8", "lesson-b1-state", "lesson-b1-process", "lesson-b1-passive-past"]],
    ["5ahbDsOy178", "Отдельно выпиши вопрос с ob и вопрос с вопросительным словом.", ["B1-g-2", "B1-g-13", "lesson-b1-embedded-order", "lesson-b1-embedded-question", "lesson-b1-embedded-ob"]],
  ],
  B2: [
    ["BA_Aj7X4lNc", "Следи, как передача чужих слов отличается от гипотезы и собственного утверждения.", ["B2-g-0", "B2-g-1", "B2-x-2", "B2-x-3", "B2-x-8"]],
    ["DZP6fSRo2qU", "Проследи, как придаточное превращается в определение перед существительным.", ["B2-g-3", "lesson-b2-attribute-case", "lesson-b2-attribute-number", "lesson-b2-attribute-relative", "lesson-b2-attribute-form"]],
    ["nmvRkwbJMMM", "Различи причину, следствие и уступку. Сравни союзы в видео с da, daher и dennoch в теории.", ["B2-g-2", "B2-g-5", "B2-g-6", "B2-g-7", "B2-g-15"]],
    ["HHzILliRgT8", "Запиши глагол вместе с предлогом и падежом. В теории дополнительно проверь форму sich lassen.", ["B2-g-4", "B2-g-10", "B2-g-11", "B2-g-12", "lesson-b2-can-be"]],
  ],
  C1: [
    ["kNcxYxt4we8", "Отметь связки, которыми автор вводит условие, аргумент или ограничение. Сформулируй вывод со степенью уверенности.", ["C1-g-1", "C1-g-2", "C1-g-4", "C1-g-14", "ac-reading-causality"]],
    ["QkQ9VLWFPdg", "Сравни одну пару «глагольная конструкция ↔ именная» и реши, где каждая звучит уместно.", ["C1-g-13", "lesson-c1-register-a", "lesson-c1-register-b", "lesson-c1-register-c", "lesson-c1-register-d"]],
    ["J6G6M-MRfT8", "Заметь, какую часть утверждения уточняет оборот insofern …, als ….", ["C1-g-0", "C1-g-7", "ac-grammar-concession", "ac-sprachbausteine-register", "lesson-c1-agreement"]],
    ["6BCzu3j2MUg", "Обрати внимание на отбор главного и пересказ своими словами. В заданиях сохрани ещё и степень уверенности источника.", ["ac-notes-error", "ac-reading-not-stated", "ac-consultation-note", "lesson-c1-mediation-hedge", "lesson-c1-mediation-source"]],
  ],
};

const channels: Record<Level, string[]> = {
  A1: ["YourGermanTeacher", "YourGermanTeacher", "YourGermanTeacher", "YourGermanTeacher"],
  A2: ["DeutschZeit", "YourGermanTeacher", "YourGermanTeacher", "lingoni GERMAN"],
  B1: ["YourGermanTeacher", "Lingster Academy", "YourGermanTeacher", "lingoni GERMAN"],
  B2: ["Benjamin – Der Deutschlehrer", "Studi-Deutsch", "einfach Deutsch mit Flora", "YourGermanTeacher"],
  C1: ["Benjamin – Der Deutschlehrer", "Benjamin – Der Deutschlehrer", "Deutsch plus", "Arnold Erklärt"],
};

export const lessons = levelOrder.flatMap((level) => grammarLessons[level].map(([title, theory, example, transfer], index) => {
  const [video, focus, questionIds] = curriculum[level][index];
  const order = index + 1;
  return { id: `${level.toLowerCase()}-${order}`, level, order, title, theory, example, transfer, video, channel: channels[level][index], focus, questionIds };
}));
export type Lesson = typeof lessons[number];
export const passingAnswers = (count: number) => Math.ceil(count * 0.75);

type Extra = [id: string, level: Level, prompt: string, answer: string, wrong: string, other: string, tip: string];
const extra: Extra[] = [
  ["a1-word-order", "A1", "Выбери утверждение с правильным порядком слов.", "Am Freitag lerne ich Deutsch.", "Am Freitag ich lerne Deutsch.", "Am Freitag Deutsch ich lerne.", "Am Freitag занимает первую позицию, lerne — вторую."],
  ["a1-article", "A1", "Ich kaufe ___ Apfel. (der Apfel)", "einen", "ein", "eine", "Мужской род в Akkusativ: ein → einen."],
  ["a1-article-negative", "A1", "Ich habe ___ Schlüssel. (der Schlüssel)", "keinen", "kein", "keine", "После habe прямое дополнение в Akkusativ: keinen Schlüssel."],
  ["a1-frame", "A1", "Wähle den Satz mit anrufen.", "Ich rufe dich morgen an.", "Ich anrufe dich morgen.", "Ich rufe an dich morgen.", "В главном предложении приставка an закрывает рамку."],
  ["a1-frame-modal", "A1", "Ich kann dich heute ___. (anrufen)", "anrufen", "rufe an", "anrufe", "После kann нужен целый инфинитив в конце предложения."],
  ["a1-request", "A1", "Выбери вежливую инструкцию с Sie.", "Gehen Sie bitte geradeaus.", "Gehst Sie geradeaus.", "Geradeaus Sie gehen.", "В Imperativ с Sie глагол стоит перед местоимением."],
  ["a1-direction", "A1", "Wir fahren mit ___ Bahn.", "der", "die", "den", "Mit требует Dativ: die Bahn → mit der Bahn."],
  ["a2-place", "A2", "Der Schlüssel liegt neben ___ Tür. (die Tür)", "der", "die", "den", "Где лежит? Neben + Dativ."],
  ["a2-target", "A2", "Ich stelle den Stuhl neben ___ Tür. (die Tür)", "die", "der", "den", "Куда ставлю? Neben + Akkusativ."],
  ["a2-move", "A2", "Wir laufen im Park. Что сообщает im Park?", "Место, где мы бегаем", "Место, куда мы бежим", "Время пробежки", "Движение происходит внутри парка. Вопрос Wo?, поэтому in dem → im."],
  ["a2-condition", "A2", "Wenn ich morgen Zeit habe, ___ ich dich an.", "rufe", "ich rufe", "anrufe", "После придаточного сразу следует личная форма главного предложения."],
  ["a2-because", "A2", "Ich kann nicht kommen, weil ich morgen ___. (arbeiten)", "arbeite", "arbeitest", "arbeiten", "После weil личная форма в конце. Ich arbeite."],
  ["a2-equal", "A2", "Das Zimmer ist so groß ___ das andere.", "wie", "als", "dass", "Равенство: so … wie. Неравенство: größer als."],
  ["a2-request", "A2", "Выбери вежливую просьбу уточнить цену.", "Könnten Sie mir den Preis nennen?", "Nennst Sie mir den Preis?", "Können mir Sie den Preis nennen?", "Könnten Sie …? — вежливая рамка. Nennen остаётся в конце."],
  ["b1-purpose", "B1", "Ich zeige dir den Plan, ___ du den Eingang findest.", "damit", "um", "obwohl", "Цель. Подлежащие разные: ich zeige, du findest."],
  ["b1-state", "B1", "Welche Form beschreibt den Zustand der Tür?", "Die Tür ist geschlossen.", "Die Tür wird geschlossen.", "Die Tür wurde gestern geschlossen.", "Sein + Partizip II указывает на состояние. Werden описывает действие."],
  ["b1-process", "B1", "Vorgangspassiv im Präsens: Der Brief ___ gerade geschrieben.", "wird", "ist", "war", "Wird + Partizip II показывает, что процесс сейчас идёт."],
  ["b1-passive-past", "B1", "Vorgangspassiv im Präteritum: Die Unterlagen ___ gestern geprüft.", "wurden", "werden", "waren", "Für die Unterlagen: wurden + geprüft."],
  ["b1-embedded-order", "B1", "Wissen Sie, ___?", "wann die Bibliothek schließt", "wann schließt die Bibliothek", "die Bibliothek wann schließt", "После wann в косвенном вопросе глагол schließt стоит в конце."],
  ["b1-embedded-question", "B1", "Könnten Sie mir sagen, ___ der Eingang ist?", "wo", "ob", "wenn", "Вопрос о месте сохраняет wo."],
  ["b1-embedded-ob", "B1", "Mach aus „Ist der Raum frei?“ eine indirekte Frage.", "Ich möchte wissen, ob der Raum frei ist.", "Ich möchte wissen, wann der Raum frei ist.", "Ich möchte wissen, ob ist der Raum frei.", "Общий вопрос вводит ob. Личная форма в конце."],
  ["b2-attribute-case", "B2", "Wir arbeiten mit den gestern ___ Daten. (erheben)", "erhobenen", "erhobene", "erhoben", "После den во множественном Dativ определение получает -en."],
  ["b2-attribute-number", "B2", "Das gestern ___ Protokoll liegt vor. (prüfen)", "geprüfte", "geprüften", "prüfende", "Protokoll было проверено. После das в Nominativ: das geprüfte Protokoll."],
  ["b2-attribute-relative", "B2", "Welche Umschreibung passt zu „die gestern verschickte Nachricht“?", "die Nachricht, die gestern verschickt wurde", "die Nachricht, die gestern verschickt werden soll", "die Nachricht, die gestern angekommen sein könnte", "Verschickte Nachricht beschreibt eine abgeschlossene Handlung im Passiv."],
  ["b2-attribute-form", "B2", "Die vor zwei Tagen ___ Studie ist online. (veröffentlichen)", "veröffentlichte", "veröffentlichende", "veröffentlicht", "Речь об уже опубликованном исследовании: Partizip II + окончание прилагательного."],
  ["b2-can-be", "B2", "Welche Umformung hat denselben Sinn wie „Die Frage kann geklärt werden“?", "Die Frage lässt sich klären.", "Die Frage wird gerade geklärt.", "Die Frage ist bereits geklärt.", "Sich lassen + Infinitiv сохраняет значение возможности."],
  ["c1-register-a", "C1", "Welche Nominalform passt zu „nachdem die Daten geprüft wurden“?", "nach der Prüfung der Daten", "während der Prüfung der Daten", "vor der Prüfung der Daten", "Nach der Prüfung сохраняет порядок действий, выраженный nachdem."],
  ["c1-register-b", "C1", "Welche Verbalform passt zu „zur Verbesserung der Vergleichbarkeit“?", "um die Vergleichbarkeit zu verbessern", "weil die Vergleichbarkeit besser wurde", "obwohl der Vergleich möglich ist", "Zur + номинализация цели соответствует um … zu."],
  ["c1-register-c", "C1", "Wähle die Nominalform für „weil die Frist verlängert wurde“.", "aufgrund der Verlängerung der Frist", "trotz der Verlängerung der Frist", "bis zur Verlängerung der Frist", "Aufgrund обозначает причину, как weil."],
  ["c1-register-d", "C1", "Welche Form passt als klare mündliche Erklärung zu „Die Veröffentlichung erfolgt nach Abschluss der Prüfung“?", "Wir veröffentlichen die Ergebnisse, sobald die Prüfung abgeschlossen ist.", "Wir veröffentlichen die Ergebnisse, bevor die Prüfung beginnt.", "Wir prüfen erst, wenn die Ergebnisse veröffentlicht sind.", "Глагольная форма сохраняет порядок действий и делает его ясным."],
  ["c1-agreement", "C1", "Welche Formulierung stimmt einem Einwand nur teilweise zu?", "Der Einwand ist insofern berechtigt, als die Stichprobe klein ist.", "Der Einwand ist unter allen Umständen vollständig überzeugend.", "Der Einwand ist in jeder Hinsicht unberechtigt.", "Insofern …, als … уточняет, в каком отношении автор согласен."],
  ["c1-mediation-hedge", "C1", "Quelle: „Ein Effekt ist möglich, aber noch nicht nachgewiesen.“ Welcher Satz gibt das korrekt wieder?", "Die Forschenden halten einen Effekt für möglich. Ein Nachweis fehlt noch.", "Die Forschenden weisen einen Effekt nach.", "Die Forschenden schließen einen Effekt aus.", "Пересказ сохраняет осторожность источника и статус доказательств."],
  ["c1-mediation-source", "C1", "Wie trennst du einen Bericht von deinem Kommentar?", "Laut Bericht sinkt die Wartezeit. Ich halte eine weitere Prüfung für sinnvoll.", "Die Wartezeit sinkt eindeutig, deshalb ist meine Empfehlung erwiesen.", "Der Bericht fordert eine weitere Prüfung, obwohl ich sie vorgeschlagen habe.", "Laut Bericht маркирует источник. Ich halte маркирует собственное суждение."],
];
export const lessonDrills = extra.map(([id, level, prompt, answer, wrong, other, tip]) => choice(`lesson-${id}`, level, "Grammatik", [prompt, answer, wrong, other, tip]));
