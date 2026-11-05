import { type Level, type Skill, levelOrder } from "./course";

export type Question = {
  id: string; level: Level; skill: Skill; prompt: string; answers: string[]; tip: string;
  choices?: string[]; text?: string; audio?: string; exact?: boolean;
};
type Pick = [prompt: string, answer: string, wrong1: string, wrong2: string, tip: string];
type Fill = [prompt: string, answer: string | string[], tip: string];

const grammar: Record<Level, Pick[]> = {
  A1: [
    ["Heute ___ ich im Büro.", "arbeite", "arbeiten", "arbeitest", "Сегодняшнее обстоятельство занимает первую позицию; личный глагол идёт вторым."],
    ["___ du Deutsch?", "Lernst", "Lerne", "Lernen", "В общем вопросе глагол на первом месте; у du окончание -st."],
    ["Ich ___ aus Moskau.", "komme", "kommt", "kommst", "Для ich — окончание -e."],
    ["Wann ___ der Kurs an?", "fängt", "fangen", "fängst", "anfangen отделяется: der Kurs fängt … an."],
    ["Ich brauche ___ Stift.", "einen", "ein", "eine", "Der Stift → einen Stift в Akkusativ."],
    ["Wir haben heute ___ Unterricht.", "keinen", "nicht", "kein", "Отрицание существительного: der Unterricht → keinen Unterricht."],
    ["Ich arbeite ___ Montag.", "am", "um", "im", "Для дня недели употребляем am, для времени um."],
    ["Der Kurs beginnt ___ neun Uhr.", "um", "am", "im", "Перед точным временем ставим um."],
    ["Ich möchte in die Bibliothek ___.", "gehen", "gehe", "gehst", "После möchte смысловой глагол стоит в инфинитиве."],
    ["Wie ___ man das?", "schreibt", "schreiben", "schreibst", "Man согласуется с третьим лицом единственного числа."],
    ["Du ___ heute Zeit.", "hast", "hat", "habe", "haben: ich habe, du hast, er/sie hat."],
    ["Ich rufe morgen ___. (anrufen)", "an", "auf", "ab", "anrufen: отделяемая приставка уходит в конец."],
    ["Das ist ___ Frage.", "eine", "ein", "einen", "Die Frage → eine Frage в Nominativ."],
    ["Ich komme heute ___.", "nicht", "kein", "keinen", "Здесь отрицаем действие, а nicht стоит в конце."],
    ["Wo ___ die Bibliothek?", "ist", "sind", "bist", "Die Bibliothek — единственное число."],
    ["Wir ___ aus Georgien.", "kommen", "kommt", "komme", "Wir употребляем с окончанием -en."],
  ],
  A2: [
    ["Gestern ___ ich zu Hause gearbeitet.", "habe", "bin", "hat", "arbeiten образует Perfekt с haben."],
    ["Wir ___ am Freitag nach Tbilisi gefahren.", "sind", "haben", "ist", "Смена места при fahren без прямого дополнения — Perfekt с sein."],
    ["Ich bleibe zu Hause, weil ich krank ___.", "bin", "sein", "ist", "После weil личный глагол стоит в конце."],
    ["Ich weiß, ___ der Termin morgen ist.", "dass", "denn", "deshalb", "dass вводит придаточное; глагол уходит в конец."],
    ["Ich lege das Buch auf ___ Tisch.", "den", "dem", "der", "Куда? auf + Akkusativ: den Tisch."],
    ["Das Buch liegt auf ___ Tisch.", "dem", "den", "der", "Где? auf + Dativ: dem Tisch."],
    ["Wir fahren mit ___ Bahn.", "der", "die", "den", "После mit всегда Dativ."],
    ["Der neue Weg ist ___ als der alte.", "kürzer", "kurz", "am kürzesten", "Для сравнения с als нужна сравнительная степень."],
    ["Das war die ___ Aufgabe im Test.", "schwierigste", "schwieriger", "schwierig", "В контексте всего теста нужна превосходная степень."],
    ["___ du Zeit hast, ruf mich an.", "Wenn", "Denn", "Dann", "Условное придаточное вводит wenn."],
    ["Ich habe gestern meine Kollegin ___.", "angerufen", "geanrufen", "anruft", "anrufen → angerufen: ge между приставкой и основой."],
    ["Wir haben die Software ___.", "getestet", "getesten", "getest", "testen → getestet."],
    ["Sie hat die E-Mail ___.", "geschrieben", "geschreibt", "schrieb", "schreiben → geschrieben."],
    ["Ich habe einen Termin ___ der Ärztin.", "bei", "zu", "auf", "bei der Ärztin обозначает приём у специалиста."],
    ["Vor einem Jahr ___ ich wenig Zeit.", "hatte", "habe", "hätte", "Präteritum von haben: hatte."],
    ["Entschuldigung, ___ Sie mir helfen?", "könnten", "kann", "könntest", "Könnten Sie …? — вежливая просьба."],
  ],
  B1: [
    ["Das ist die Kollegin, ___ das Projekt leitet.", "die", "der", "den", "Роль относительного местоимения — подлежащее."],
    ["Das ist der Kollege, ___ ich gestern geholfen habe.", "dem", "der", "den", "helfen требует Dativ."],
    ["Wissen Sie, ___ der Kurs beginnt?", "wann", "wenn", "als", "Косвенный вопрос о времени — wann + глагол в конце."],
    ["Ich wiederhole die Wörter, ___ sie im Gespräch zu benutzen.", "um", "damit", "denn", "Цель при одном подлежащем: um … zu."],
    ["Ich schreibe dir, ___ du den Termin eintragen kannst.", "damit", "um", "deshalb", "Разные подлежащие: damit + придаточное."],
    ["___ es regnet, fahren wir mit dem Rad.", "Obwohl", "Trotzdem", "Deshalb", "obwohl вводит уступительное придаточное."],
    ["Es regnet. ___ fahren wir mit dem Rad.", "Trotzdem", "Obwohl", "Weil", "trotzdem соединяет главные предложения; после него глагол на второй позиции."],
    ["Die Daten ___ morgen ausgewertet.", "werden", "wird", "haben", "Vorgangspassiv: werden + Partizip II; Die Daten — множественное."],
    ["Vorgangspassiv im Präteritum: Das Ergebnis ___ gestern überprüft.", "wurde", "war", "hat", "Пассив действия: wurde überprüft. War überprüft описывает состояние."],
    ["Wenn ich mehr Zeit hätte, ___ ich häufiger Deutsch sprechen.", "würde", "wurde", "werde", "Гипотеза: würde + Infinitiv."],
    ["Ich interessiere mich ___ Statistik.", "für", "an", "über", "sich interessieren für + Akkusativ."],
    ["Er nimmt ___ der Besprechung teil.", "an", "auf", "für", "teilnehmen an + Dativ."],
    ["Wir warten ___ eine Rückmeldung.", "auf", "an", "mit", "warten auf + Akkusativ."],
    ["Ich frage mich, ___ das Ergebnis stimmt.", "ob", "wenn", "als", "Косвенный общий вопрос вводит ob."],
    ["Die Kollegin, mit ___ ich arbeite, kommt später.", "der", "die", "den", "mit + Dativ; женский род → der."],
    ["Der Test war schwierig, ___ ich habe ihn bestanden.", "aber", "obwohl", "trotzdem", "aber соединяет два главных предложения с обычным порядком слов."],
  ],
  B2: [
    ["Der Projektleiter erklärte, die Ergebnisse ___ vorläufig.", "seien", "wären gewesen", "sein", "Konjunktiv I Plural von sein: seien."],
    ["Sie sagte, sie ___ das Modell bereits geprüft.", "habe", "hatten", "werde", "Konjunktiv I Perfekt: habe + Partizip II."],
    ["___ der geringen Stichprobe ist die Aussagekraft begrenzt.", "Aufgrund", "Trotzdem", "Währenddessen", "aufgrund + Genitiv выражает причину."],
    ["Die gestern ___ Daten werden ausgewertet.", "erhobenen", "erheben", "erhebende", "Расширенное определение: die gestern erhobenen Daten."],
    ["Das Problem lässt sich leicht ___.", "lösen", "gelöst", "löste", "sich lassen + Infinitiv — альтернатива пассиву."],
    ["___ die Daten fehlen, lässt sich der Befund nicht überprüfen.", "Da", "Dennoch", "Daher", "Da вводит причинное придаточное с глаголом в конце."],
    ["Die Daten fehlen. ___ bleibt der Befund vorläufig.", "Daher", "Da", "Obwohl", "Daher соединяет главные предложения и занимает первую позицию."],
    ["Wir prüfen das Modell, ___ es produktiv eingesetzt wird.", "bevor", "damals", "inzwischen", "bevor описывает порядок двух действий."],
    ["___ die Stichprobe größer, wäre das Ergebnis belastbarer.", "Wäre", "Ist", "War", "Условная конструкция без wenn начинается с глагола в Konjunktiv II."],
    ["Wir müssen zwischen Korrelation und Kausalität ___. (различать)", "unterscheiden", "vermeiden", "vergleichen", "zwischen A und B unterscheiden — различать A и B."],
    ["Die Ergebnisse stimmen mit den Vorbefunden ___.", "überein", "über", "ein", "übereinstimmen mit + Dativ."],
    ["Das Ergebnis hängt ___ der Auswahl der Daten ab.", "von", "für", "über", "abhängen von + Dativ."],
    ["Der Bericht weist ___ eine mögliche Verzerrung hin.", "auf", "an", "zu", "hinweisen auf + Akkusativ."],
    ["___ des Experiments wurden mehrere Messfehler entdeckt.", "Während", "Danach", "Darüber", "Während + Genitiv указывает на период действия."],
    ["Ein Risiko besteht darin, dass wichtige Signale ___ werden.", "übersehen", "übersieht", "übersah", "Vorgangspassiv: werden + Partizip II; übersehen сохраняет форму."],
    ["Gegensatz: Die Daten sind begrenzt. ___ ist die Methode für einen ersten Test geeignet.", "Dennoch", "Infolgedessen", "Deswegen", "dennoch вводит уступку: несмотря на ограничение."],
  ],
  C1: [
    ["Der Einwand ist insofern berechtigt, ___ die Stichprobe verzerrt sein könnte.", "als", "wie", "damit", "insofern …, als … уточняет, в каком отношении верно утверждение."],
    ["Die Übertragbarkeit ist ___, solange externe Daten fehlen.", "fraglich", "unbestritten", "nachgewiesen", "Осторожный вывод при отсутствии внешней проверки — fraglich."],
    ["Das Modell ist nur ___, dass die Eingangsdaten vollständig sind, für diesen Zweck geeignet.", "unter der Voraussetzung", "im Widerspruch", "im Hinblick", "unter der Voraussetzung, dass … задаёт условие."],
    ["Die Autorin führte an, der Effekt ___ nur kurzfristig aufgetreten.", "sei", "habe", "hat", "Косвенная речь: auftreten образует Perfekt с sein → sei aufgetreten."],
    ["Aus einer bloßen Korrelation lässt sich ein kausaler Zusammenhang ___ ableiten.", "nicht ohne Weiteres", "zweifelsfrei", "mit Sicherheit", "Это уместное ограничение выводов из корреляции."],
    ["___ eines direkten Vergleichs wurden die Methoden getrennt ausgewertet. (вместо)", "Anstelle", "Dank", "Ungeachtet", "Anstelle + Genitiv обозначает замену одного способа другим."],
    ["Die Ergebnisse sind ___ der unterschiedlichen Messverfahren nur bedingt vergleichbar.", "angesichts", "entgegen", "gemäß", "angesichts + Genitiv означает «с учётом» обстоятельства."],
    ["Gegensatz: Die Methode ist transparent. ___ sind die Annahmen nur teilweise überprüfbar.", "Gleichwohl", "Infolgedessen", "Demnach", "gleichwohl вводит уступку в формальном регистре."],
    ["Der Befund beruht ___ einer einmaligen Beobachtung.", "auf", "unter", "über", "beruhen auf + Dativ."],
    ["___ sich der Effekt replizieren lässt, bleibt offen.", "Ob", "Dass", "Weil", "Ob вводит открытую косвенную альтернативу."],
    ["Die Studie legt nahe, ___ das Verfahren die Bearbeitung beschleunigt.", "dass", "obwohl", "zumal", "legt nahe, dass … — вывод с осторожной модальностью."],
    ["Redewendung für wirksam werden: Der Vorteil kommt erst ___, wenn die Daten vollständig sind.", "zum Tragen", "zur Sprache", "in Betracht", "zum Tragen kommen — проявиться, начать действовать."],
    ["Die Aufteilung der Daten trägt dem Datenschutz ___.", "Rechnung", "Folge", "Sorge", "einer Sache Rechnung tragen — учитывать."],
    ["Zunächst bedarf es ___ methodischen Klärung.", "einer", "eine", "einem", "bedürfen + Genitiv."],
    ["Die Ergebnisse sind allenfalls als Hinweis zu ___.", "werten", "gewertet", "wertete", "sein + zu + Infinitiv; als Hinweis werten."],
    ["Die These hält einer kritischen Prüfung nur bedingt ___.", "stand", "aus", "fest", "einer Prüfung standhalten + Dativ."],
  ],
};

const lex: Record<Level, Fill[]> = {
  A1: [
    ["Как сказать «данные»?", "die Daten", "В этой теме употребляем множественное: mit Daten arbeiten."],
    ["Как вежливо попросить повторить? Вопрос с können.", "Können Sie das bitte wiederholen?", "Können Sie …? — вежливая форма обращения."],
    ["Как называется встреча или приём? С артиклем.", "der Termin", "Plural: die Termine. Einen Termin vereinbaren."],
    ["Как называется вход? С артиклем.", "der Eingang", "Der Eingang ist rechts."],
    ["Как называется остановка? С артиклем.", "die Haltestelle", "An der Haltestelle warten."],
    ["Как называется набор данных? С артиклем.", "der Datensatz", "Plural: die Datensätze."],
    ["Как по-немецки «университетская столовая»? С артиклем.", "die Mensa", "In die Mensa gehen."],
    ["Вежливо спроси «Где библиотека?»", ["Wo ist die Bibliothek?", "Entschuldigung, wo ist die Bibliothek?"], "Wo ist …? — вопрос о местоположении."],
    ["Какое время означает halb acht? В формате ч:мм.", ["7:30", "07:30", "19:30"], "Halb acht — половина восьмого; контекст определяет утро или вечер."],
    ["Как сказать «у меня есть вопрос»?", "Ich habe eine Frage.", "Die Frage → eine Frage."],
  ],
  A2: [
    ["Как называется осмотр квартиры? С артиклем.", "die Besichtigung", "Einen Termin für die Besichtigung vereinbaren."],
    ["Как называется сообщение об ошибке? С артиклем.", "die Fehlermeldung", "Eine Fehlermeldung erscheint."],
    ["Глагол «перенести» в сочетании einen Termin …", "verschieben", "Perfekt: einen Termin verschoben haben."],
    ["Глагол «подтвердить» в сочетании den Termin …", "bestätigen", "Können Sie den Termin bestätigen?"],
    ["Как называется запасная дата встречи? С артиклем.", "der Ersatztermin", "Einen Ersatztermin vorschlagen."],
    ["Слово «вчера».", "gestern", "Gestern habe ich gearbeitet."],
    ["Bilde den höflichen Imperativ mit zurückrufen und bitte.", ["Rufen Sie bitte zurück.", "Bitte rufen Sie zurück.", "Rufen Sie zurück, bitte."], "zurückrufen — отделяемый глагол."],
    ["Ergänze: Entschuldigen Sie bitte meine ___. (опоздание)", "Verspätung", "Die Verspätung — опоздание или задержка."],
    ["Как называется предварительное условие? С артиклем.", "die Voraussetzung", "Die Voraussetzung für die Teilnahme."],
    ["Какой глагол значит «сохранять» файл?", "speichern", "Eine Datei speichern."],
  ],
  B1: [
    ["Как называется обратная связь? С артиклем.", "die Rückmeldung", "Eine Rückmeldung geben oder bekommen."],
    ["Как называется требование? С артиклем.", "die Anforderung", "Anforderungen klären oder erfüllen."],
    ["Как называется выборка? С артиклем.", "die Stichprobe", "Eine Stichprobe ziehen oder untersuchen."],
    ["Глагол «исправить» в einen Fehler …", ["beheben", "korrigieren"], "Einen Fehler beheben — устранить ошибку."],
    ["Как называется ограничение? С артиклем.", "die Einschränkung", "Eine Einschränkung berücksichtigen."],
    ["Как сказать «по моему мнению»?", ["meiner Meinung nach", "meines Erachtens", "aus meiner Sicht", "meiner Ansicht nach"], "Если Meiner Meinung nach вынесено на первую позицию, дальше следует личная форма глагола."],
    ["Как назвать количественный показатель? С артиклем.", "die Kennzahl", "Eine Kennzahl berechnen."],
    ["Как сказать «подвести итог» глаголом?", ["zusammenfassen", "resümieren"], "Die Ergebnisse zusammenfassen."],
    ["Глагол «собирать» в сочетании Daten …, типичный для исследования.", "erheben", "Daten erheben, auswerten und dokumentieren."],
    ["Как сказать «предложить решение»?", ["eine Lösung vorschlagen", "eine Lösung anbieten"], "Einen Vorschlag machen — близкое выражение."],
  ],
  B2: [
    ["Как называется систематическое искажение? С артиклем.", "die Verzerrung", "Eine systematische Verzerrung kann den Vergleich erschweren."],
    ["Как называется пороговое значение? С артиклем.", "der Schwellenwert", "Den Schwellenwert ändern."],
    ["Как назвать информативность или доказательную силу результата? С артиклем.", "die Aussagekraft", "Die Aussagekraft der Ergebnisse ist begrenzt."],
    ["Как называется обобщаемость? С артиклем.", "die Generalisierbarkeit", "Die Generalisierbarkeit auf andere Kontexte prüfen."],
    ["Что значит «die Daten bereinigen»? Два слова по-русски.", ["очистить данные", "очищать данные"], "bereinigen — удалять или исправлять ошибки и дубликаты."],
    ["Вставь слово: Die Daten ___ darauf hin, dass …", "deuten", "auf etwas hindeuten → deutet/deuten darauf hin."],
    ["Как назвать недостающие значения?", "fehlende Werte", "fehlende Werte erfassen, ersetzen или исключать с объяснением."],
    ["Как назвать взаимосвязь без утверждения о причине? С артиклем.", ["die Korrelation", "der Zusammenhang"], "Die Korrelation allein belegt keine Kausalität."],
    ["Дополни: Das Modell wird anhand eines zweiten Datensatzes ___. (проверено на валидность)", "validiert", "validieren → validiert."],
    ["Как по-немецки «учитывать ограничение»?", ["eine Einschränkung berücksichtigen", "die Einschränkung berücksichtigen"], "berücksichtigen употребляется с Akkusativ."],
  ],
  C1: [
    ["Как называется переносимость результата? С артиклем.", "die Übertragbarkeit", "Die Übertragbarkeit auf andere Einrichtungen."],
    ["Как назвать фактор, мешающий интерпретации исследования? С артиклем.", ["der Störfaktor", "die Störvariable"], "Störfaktoren können beobachtete Zusammenhänge verzerren."],
    ["Как называется взвешивание аргументов и интересов? С артиклем.", "die Abwägung", "Die Abwägung von Chancen und Risiken."],
    ["Как называется причинность? С артиклем.", "die Kausalität", "Aus Korrelation lässt sich keine Kausalität ableiten."],
    ["Дополни формальную фразу: Das muss kritisch ___ werden. (поставить под вопрос)", "hinterfragt", "kritisch hinterfragen — подвергать критической проверке."],
    ["Дополни: Dieser Schluss ist nur unter bestimmten Annahmen ___. (обоснован)", ["vertretbar", "begründet", "gerechtfertigt"], "Eine Schlussfolgerung kann vertretbar, begründet oder gerechtfertigt sein."],
    ["Дополни: Die Ergebnisse stehen ___ mit den Vorbefunden. (согласуются)", "im Einklang", "im Einklang mit + Dativ."],
    ["Ergänze: Die Ergebnisse sind nur ___ übertragbar. (ограниченно)", ["bedingt", "eingeschränkt"], "Nur bedingt übertragbar oder mit Einschränkungen übertragbar."],
    ["Как назвать воспроизводимость? С артиклем.", "die Reproduzierbarkeit", "Reproduzierbarkeit и Übertragbarkeit отвечают на разные вопросы."],
    ["Дополни: Die Daten ___ keine eindeutige Schlussfolgerung zu.", "lassen", "etwas zulassen → lässt/lassen … zu."],
  ],
};

function hash(value: string) {
  return [...value].reduce((acc, char) => Math.imul(acc ^ char.charCodeAt(0), 16777619), 2166136261) >>> 0;
}
export function orderedChoices(key: string, values: string[]) {
  return values.slice().sort((a, b) => hash(key + a) - hash(key + b));
}

export function choice(id: string, level: Level, skill: Skill, item: Pick): Question {
  const [prompt, answer, one, two, tip] = item;
  return { id, level, skill, prompt, answers: [answer], choices: orderedChoices(id, [answer, one, two]), tip };
}
export function fill(id: string, level: Level, skill: Skill, item: Fill): Question {
  const [prompt, answer, tip] = item;
  return { id, level, skill, prompt, answers: Array.isArray(answer) ? answer : [answer], tip };
}

const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const a1 = days.flatMap((day, i): Fill[] => [
  [`Вставь предлог: Wir sehen uns ___ ${day}.`, "am", "Дни недели употребляются с am."],
  [`Der Kurs beginnt am ${day} um halb ${["vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"][i]}. Запиши время в формате ч:мм.`, [`${i + 3}:30`, `0${i + 3}:30`, `${i + 15}:30`], "Halb + следующий час. Контекст определяет время суток."],
]);
const perf: Array<[string, string, string, string]> = [
  ["einen Bericht", "schreiben", "habe", "geschrieben"], ["zur Uni", "fahren", "bin", "gefahren"], ["die Datei", "speichern", "habe", "gespeichert"], ["in die Mensa", "gehen", "bin", "gegangen"],
  ["den Termin", "verschieben", "habe", "verschoben"], ["zu Hause", "bleiben", "bin", "geblieben"], ["das Buch", "lesen", "habe", "gelesen"], ["das Problem", "erklären", "habe", "erklärt"],
];
const a2 = perf.flatMap(([object, verb, aux, part]): Fill[] => [
  [`Ergänze das Hilfsverb: Ich ___ gestern ${object} ${part}.`, aux, `${verb} → ich ${aux} … ${part}.`],
  [`Ergänze das Partizip: Ich ${aux} gestern ${object} ___. (${verb})`, part, `${verb} → ${part}.`],
]);
const relative: Array<[string, string, string, string]> = [
  ["die Kollegin", "heute arbeitet", "die", "Nominativ"], ["den Bericht", "wir lesen", "den", "Akkusativ"], ["den Studenten", "ich geholfen habe", "dem", "Dativ"],
  ["das Modell", "wir testen", "das", "Akkusativ"], ["die Daten", "uns fehlen", "die", "Nominativ Plural"], ["die Dozentin", "ich gestern geschrieben habe", "der", "Dativ"],
  ["den Laptop", "kaputt ist", "der", "Nominativ"], ["die Studie", "wir besprechen", "die", "Akkusativ"], ["die Kurse", "wir uns anmelden", "für die", "sich anmelden für + Akkusativ"],
  ["das Team", "ich arbeite", "mit dem", "mit + Dativ"], ["die Stadt", "ich wohne", "in der", "in + Dativ для места"], ["die Frage", "ich nachdenken muss", "über die", "nachdenken über + Akkusativ"],
];
const b1: Fill[] = relative.map(([noun, verb, answer, tip]) => [`Ergänze den Relativsatz: Hier geht es um ${noun}, ___ ${verb}.`, answer, `Относительная форма определяется ролью в придаточном: ${tip}.`]);
const indirect: Array<[string, string, string]> = [
  ["ich habe die Daten geprüft", "er", "habe"], ["ich bin mit dem Ergebnis zufrieden", "sie", "sei"], ["wir sind noch nicht fertig", "sie (Plural)", "seien"],
  ["ich kann die Kennzahl erklären", "er", "könne"], ["ich werde den Fehler beheben", "sie", "werde"], ["ich muss die Datei erneut prüfen", "er", "müsse"],
  ["ich nehme morgen teil", "sie", "nehme"], ["ich komme später", "er", "komme"], ["ich weiß davon nichts", "sie", "wisse"],
  ["ich sehe keinen Unterschied", "er", "sehe"], ["ich halte die Methode für sinnvoll", "sie", "halte"], ["ich gehe von stabilen Daten aus", "er", "gehe"],
];
const b2: Fill[] = indirect.map(([statement, speaker, answer]) => [`Konjunktiv I · „${statement[0].toUpperCase() + statement.slice(1)}.“ Welche finite Form hat das Verb nach „${speaker}“ in der indirekten Rede?`, answer, `In der indirekten Rede lautet die Form hier „${answer}“.`]);
const c1: Fill[] = [
  ["Formeller Stil: Die Ergebnisse geben ___ zu weiteren Untersuchungen.", "Anlass", "Anlass zu weiteren Untersuchungen geben."],
  ["Ergänze: Der Plan steht und fällt ___ der Qualität der Daten.", "mit", "mit etwas stehen und fallen — полностью зависеть от чего-либо."],
  ["Ergänze: In der Debatte gilt es, die Risiken gegeneinander ___.", "abzuwägen", "gegeneinander abwägen → gegeneinander abzuwägen."],
  ["Ergänze: Die Kritik ___ sich auf einen Vergleich ohne Kontrollgruppe.", "stützt", "sich auf etwas stützen — опираться на что-либо."],
  ["Formeller Stil: Der Einwand lässt sich nicht von der Hand ___.", "weisen", "etwas nicht von der Hand weisen können — довод нельзя просто отвергнуть."],
  ["Ergänze: Die Daten stehen nur in begrenztem ___ zur Verfügung.", "Umfang", "in begrenztem Umfang — в ограниченном объёме."],
  ["Ergänze: Die Ergebnisse bedürfen einer weiteren ___. (проверка)", ["Überprüfung", "Prüfung"], "bedürfen + Genitiv."],
  ["Ergänze: Unter Berücksichtigung der Unsicherheit lässt sich der Effekt nicht ___ beziffern. (однозначно)", "eindeutig", "einen Effekt eindeutig beziffern."],
  ["Ergänze: Der Bericht nimmt ___ auf frühere Befunde.", "Bezug", "Bezug auf etwas nehmen."],
  ["Ergänze: Wir sollten ___ in Betracht ziehen, dass die Stichprobe verzerrt ist. (также)", ["auch", "ebenfalls"], "in Betracht ziehen, dass … — учитывать возможность."],
  ["Ergänze: Die Ergebnisse geben keinen ___ darüber, wie sich das Modell in anderen Kliniken verhält. (сведения)", "Aufschluss", "Aufschluss geben über + Akkusativ."],
  ["Ergänze: Ob die Maßnahme Wirkung zeigt, hängt ___ ab, wie sie umgesetzt wird.", "davon", "von etwas abhängen → davon abhängen, wie …"],
];
const extra = { A1: a1, A2: a2, B1: b1, B2: b2, C1: c1 };

export const drills = levelOrder.flatMap((level) => [
  ...grammar[level].map((item, i) => choice(`${level}-g-${i}`, level, "Grammatik", item)),
  ...lex[level].map((item, i) => fill(`${level}-v-${i}`, level, "Wortschatz", item)),
  ...extra[level].map((item, i) => fill(`${level}-x-${i}`, level, "Grammatik", item)),
]);

export function normalize(value: string, exact = false) {
  const clean = value.normalize("NFC").trim().replace(/[.!?]+$/u, "").trim().replace(/\s+/gu, " ");
  return exact ? clean : clean.toLocaleLowerCase("de");
}

export function checkAnswer(item: Question, value: string) {
  const answer = normalize(value, item.exact);
  return Boolean(answer) && item.answers.some((expected) => normalize(expected, item.exact) === answer);
}
