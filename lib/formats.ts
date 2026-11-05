import { type Level } from "./course";
import { fill, orderedChoices, type Question } from "./drills";

type GoetheFormat = {
  duration: string;
  pass: string;
  reading: string;
  listening: string;
  writing: string;
  speaking: string;
  official: string;
  wordlist?: string;
};

const modularPass = "От 60 из 100 в каждом модуле. Высокий балл в одном модуле не компенсирует другой.";

export const goetheFormats: Record<Level, GoetheFormat> = {
  A1: {
    duration: "Чтение 25 мин · слух около 20 мин · письмо 20 мин · речь около 15 мин в группе",
    pass: "От 60 из 100 суммарно при выполнении всех частей.",
    reading: "Три части: короткие письма и записки, объявления и указатели. Отмечай, соответствует ли утверждение тексту, и выбирай подходящий источник.",
    listening: "Три части: короткие разговоры и объявления. В модели части 1 и 3 звучат дважды, часть 2 — один раз.",
    writing: "Заполни анкету по данным из текста и напиши короткое личное сообщение около 30 слов. Ответь на все три пункта.",
    speaking: "Представься, назови данные по просьбе экзаменатора, задай и ответь на вопросы, затем сформулируй просьбу и отреагируй на просьбу партнёра.",
    official: "https://www.goethe.de/ins/de/de/prf/gzsd1/ueb.html",
    wordlist: "https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf",
  },
  A2: {
    duration: "Чтение 30 мин · слух 30 мин · письмо 30 мин · речь около 15 мин на пару",
    pass: "От 60 из 100, из них минимум 45 из 75 за письменную часть и 15 из 25 за устную. Нужно выполнить все части.",
    reading: "Четыре части: статья, указатель, письмо и подбор объявления к ситуации. Для одной ситуации в модели подходящего объявления нет.",
    listening: "Четыре части: короткие фрагменты, разговор, пять коротких разговоров и интервью. В официальной модели число прослушиваний по частям — 2 / 1 / 1 / 2.",
    writing: "Два сообщения: SMS на 20–30 слов и электронное письмо на 30–40 слов. Отработай по три речевых действия и подходящий тон.",
    speaking: "Задай вопросы и ответь на вопросы о себе, расскажи о знакомой теме, затем согласуй общий план с партнёром.",
    official: "https://www.goethe.de/ins/de/de/prf/gzsd2/ub2.html",
    wordlist: "https://www.goethe.de/pro/relaunch/prf/de/Goethe-Zertifikat_A2_Wortliste.pdf",
  },
  B1: {
    duration: "Чтение 65 мин · слух 40 мин · письмо 60 мин · речь около 15 мин на пару + 15 мин подготовки",
    pass: modularPass,
    reading: "Пять частей: верно/неверно, выбор ответа по статьям, ситуации и объявления с одним пропуском, позиция автора, правила и инструкции.",
    listening: "Четыре части: короткие сообщения, информационный текст, диалог и дискуссия с определением говорящих. Прослушивания — 2 / 1 / 1 / 2.",
    writing: "Личное письмо около 80 слов, мнение в дискуссии около 80 слов, короткое формальное письмо около 40 слов.",
    speaking: "Согласуйте план, представь одну из двух тем и обсуди её. После доклада партнёра дай обратную связь и задай вопрос.",
    official: "https://www.goethe.de/ins/de/de/m/prf/prf/gzb1/ueb.html",
    wordlist: "https://www.goethe.de/pro/relaunch/prf/id/Goethe-Zertifikat_B1_Wortliste.pdf",
  },
  B2: {
    duration: "Чтение 65 мин · слух около 40 мин · письмо 75 мин · речь около 15 мин на пару + 15 мин подготовки",
    pass: modularPass,
    reading: "Пять частей: сопоставление утверждений и авторов, вставка предложений в статью, выбор ответа, сопоставление заголовков с мнениями и разделами регламента.",
    listening: "Четыре части: короткие разговоры, интервью, обсуждение с определением говорящего и доклад. Прослушивания — 1 / 2 / 1 / 2.",
    writing: "Сообщение на форуме около 150 слов и формальное рабочее письмо около 100. Учитывай четыре пункта задания, адресата, связность и объём.",
    speaking: "Короткий доклад около 4 минут с последующими вопросами и дискуссия вдвоём около 5 минут. Отреагируй на аргумент и подведи итог.",
    official: "https://www.goethe.de/ins/de/de/prf/gzb2/ue9.html",
  },
  C1: {
    duration: "Чтение 65 мин · слух около 40 мин · письмо 75 мин · речь около 20 мин на пару + 20 мин подготовки",
    pass: modularPass,
    reading: "Четыре части с журнальными и онлайн-текстами. Тренируй выбор слова по контексту, понимание позиции, вставку предложений и сопоставление.",
    listening: "Четыре части: подкаст, интервью, дискуссия и доклад. В модели прослушивания — 1 / 2 / 1 / 2. В части 3 запись поделена на фрагменты.",
    writing: "Аргументированный пост на форуме около 230 слов и формальное сообщение около 120. Отрабатывай смену регистра.",
    speaking: "Доклад около 5 минут и ответы на вопросы. Затем обсуждение спорной темы в паре около 5 минут.",
    official: "https://www.goethe.de/ins/de/de/prf/gzc1/u24.html",
  },
};

function select(
  level: Level, key: string, prompt: string, answer: string, other: string[], tip: string,
  text?: string, skill: Question["skill"] = "Lesen",
): Question {
  const id = `fmt-${level.toLowerCase()}-${key}`;
  return { id, level, skill, prompt, answers: [answer], choices: orderedChoices(id, [answer, ...other]), tip, ...(text ? { text } : {}) };
}

const a1Notice = "Stadtbibliothek West. Am Montag öffnen wir erst um 13 Uhr. Rückgabe am Automaten: jeden Tag ab 7 Uhr. Die Kindergruppe trifft sich am Dienstag um 16 Uhr.";
const a1Form = "Mara Klein wohnt in Bonn. Ihre Adresse: Uferweg 8. Sie möchte am 12. Mai am Samstagkurs teilnehmen. Die Kursgebühr bezahlt sie per Überweisung.";
const a2Ads = "A · Im Radladen: Reparaturen montags bis freitags. B · Lerntreff: Deutsch sprechen, donnerstags ab 18 Uhr. C · Stadtbibliothek: kostenlose Einführung am Samstagvormittag.";
const b1Ads = "A · Stadtmuseum: Audioguide auf Deutsch, Montag geschlossen. B · Jugendzentrum: Keramikwerkstatt für Erwachsene am Montagabend. C · Sportverein: Schwimmkurs für Erwachsene, samstags, Plätze frei.";
const b2Voices = "Ada: Ich begrüße feste Zeitfenster ohne Meetings, solange wir sie im Team gemeinsam festlegen. Ben: Zeitfenster für konzentriertes Arbeiten finde ich gut, ich möchte aber selbst entscheiden, wann ich sie nutze. Clara: Für mich ist schnelle Abstimmung wichtiger. Feste Sperrzeiten würde ich daher nicht einführen.";
const c1Voices = "Mina: Automatische Transkripte machen Interviews leichter durchsuchbar, aber Zitate müssen am Original geprüft werden. Oskar: Wir sollten Transkripte auch als barrierearme Ergänzung veröffentlichen. Tarek: Bei sensiblen Aufnahmen ist entscheidend, ob Betroffene der Verarbeitung zugestimmt haben.";

export const formatDrills: Question[] = [
  select("A1", "richtig", "Richtig oder falsch? Am Montag ist die Bibliothek um 9 Uhr offen.", "Falsch", ["Richtig"], "В понедельник сама библиотека открывается лишь в 13:00. В 7:00 можно воспользоваться автоматом.", a1Notice),
  select("A1", "dienstag", "Richtig oder falsch? Die Kindergruppe trifft sich am Dienstag.", "Richtig", ["Falsch"], "В объявлении прямо указан вторник.", a1Notice),
  select("A1", "anzeige", "Welches Angebot passt? Jonas möchte am Sonntagmorgen Brot kaufen.", "A", ["B", "C"], "Нужны сразу два признака: воскресенье утром и хлеб.", "A · Bäckerei am Markt: Sonntag 8–11 Uhr. B · Supermarkt am Park: Montag bis Samstag. C · Blumenladen: Sonntag 9–12 Uhr."),
  { ...fill("fmt-a1-formular-nachname", "A1", "Lesen", ["Formular. Trage den Familiennamen ein.", "Klein", "Familienname или Nachname означает фамилию."]), text: a1Form },
  { ...fill("fmt-a1-formular-wohnort", "A1", "Lesen", ["Formular. Trage den Wohnort ein.", "Bonn", "Wohnort — город проживания. Улица заполняется в другом поле."]), text: a1Form },
  select("A1", "bitte", "Du brauchst einen Stift. Welche Bitte passt?", "Gibst du mir bitte einen Stift?", ["Ist das dein Stift?", "Der Stift liegt hier."], "В первой реплике собеседника просят дать предмет. Вторая уточняет, чей он.", undefined, "Wortschatz"),
  select("A1", "wortstellung", "Welche Frage hat die richtige Wortstellung?", "Wo ist der Eingang?", ["Wo der Eingang ist?", "Ist wo der Eingang?"], "В прямом вопросе с wo личная форма ist идёт сразу после вопросительного слова.", undefined, "Grammatik"),

  select("A2", "anzeige-abends", "Welche Anzeige passt? Leyla möchte nach der Arbeit Deutsch sprechen.", "B", ["A", "C"], "Совпадают цель и время: разговорный немецкий после 18:00.", a2Ads),
  select("A2", "anzeige-keine", "Welche Anzeige passt? Leo sucht einen Schwimmkurs für Anfänger.", "Keine Anzeige", ["A", "B", "C"], "На экзамене возможна ситуация без подходящего объявления. В этих предложениях нет занятий плаванием.", a2Ads),
  select("A2", "wegweiser", "Wo bekommst du einen neuen Bibliotheksausweis?", "Im Erdgeschoss", ["Im ersten Stock", "Im zweiten Stock"], "Ausweise оформляют там, где указано Anmeldung und Ausweise.", "Erdgeschoss: Anmeldung und Ausweise. 1. Stock: Romane und Hörbücher. 2. Stock: Lernräume."),
  select("A2", "termin", "Richtig oder falsch? Der Termin findet heute statt.", "Falsch", ["Richtig"], "Fällt aus означает, что встреча отменена. Новая дата в письме ещё не подтверждена.", "Guten Tag, Ihr heutiger Termin fällt aus. Wir melden uns morgen mit einem neuen Vorschlag."),
  select("A2", "register", "Welche Formulierung passt zu einer E-Mail an die Hausverwaltung?", "Könnten Sie mir bitte einen neuen Termin nennen?", ["Sag mir mal, wann du Zeit hast.", "Du musst morgen kommen."], "Для формального запроса подходит обращение Sie и вежливое könnten.", undefined, "Wortschatz"),
  select("A2", "nebensatz", "Welche Ergänzung passt? Ich komme später, weil …", "mein Bus Verspätung hat.", ["mein Bus hat Verspätung.", "hat mein Bus Verspätung."], "В придаточном с weil спрягаемый глагол стоит в конце: hat.", undefined, "Grammatik"),
  select("A2", "geschlossen", "Warum kann Mira heute nicht im Laden einkaufen?", "Der Laden hat wegen Inventur geschlossen.", ["Der Laden ist umgezogen.", "Mira hat die Öffnungszeit vergessen."], "Wegen Inventur называет причину, а bleibt geschlossen означает, что магазин не откроется.", "Kundeninformation. Wegen Inventur bleibt unser Laden heute geschlossen. Morgen öffnen wir wieder um 9 Uhr."),

  select("B1", "anzeige", "Welche Anzeige passt? Jo sucht einen Kurs am Montagabend, bei dem man etwas mit den Händen macht.", "B", ["A", "C", "Keine Anzeige"], "Только вариант B совпадает по времени, возрасту и виду занятия.", b1Ads),
  select("B1", "anzeige-null", "Welche Anzeige passt? Eine Familie sucht am Montag eine Führung im Museum.", "Keine Anzeige", ["A", "B", "C"], "Слово Museum совпадает, но в понедельник музей закрыт. Проверяй все условия.", b1Ads),
  select("B1", "meinung", "Ist Niko für ein generelles Handyverbot in der Bibliothek?", "Nein", ["Ja"], "Автор поддерживает тишину, но оставляет возможность пользоваться телефоном без звука.", "Niko: Klingeltöne stören mich beim Lesen. Wer sein Handy stumm schaltet und damit nur kurz nach etwas sucht, sollte es aber behalten dürfen."),
  select("B1", "regel", "Wer darf den Raum nach 20 Uhr nutzen?", "Nur angemeldete Gruppen", ["Alle Besucherinnen und Besucher", "Niemand"], "Nur ограничивает правило, ab 20 Uhr обозначает начало действия ограничения.", "Raumordnung. Bis 20 Uhr ist der Arbeitsraum für alle geöffnet. Ab 20 Uhr dürfen nur angemeldete Gruppen bleiben."),
  select("B1", "meldung", "Welche Aussage trifft zu?", "Der Treffpunkt hat sich geändert.", ["Der Ausflug beginnt eine Stunde später.", "Die Teilnehmenden brauchen keine Fahrkarte."], "Statt и bleibt zeigen, какая деталь меняется и какая остаётся прежней.", "Der Ausflug beginnt wie geplant um neun Uhr. Wir treffen uns jedoch vor dem Haupteingang statt an der Bushaltestelle. Bitte bringen Sie Ihre Fahrkarte mit."),
  select("B1", "umformung", "Wähle das Vorgangspassiv im Präteritum.", "Die Unterlagen wurden gestern geprüft.", ["Die Unterlagen waren gestern schon geprüft.", "Wir prüften gestern die Unterlagen."], "Wurden + Partizip II описывает действие в Präteritum. Waren + Partizip II описывает состояние.", undefined, "Grammatik"),
  select("B1", "vorschlag", "Welche Antwort macht einen Gegenvorschlag?", "Könnten wir uns stattdessen am Freitag treffen?", ["Vielen Dank für den Vorschlag.", "Ich habe deine Nachricht gestern gelesen."], "Stattdessen вводит альтернативу, а вопрос с könnten делает предложение вежливым.", undefined, "Wortschatz"),

  select("B2", "stimme-ada", "Wer befürwortet eine für alle gemeinsam vereinbarte Regel?", "Ada", ["Ben", "Clara"], "Ada согласна, если интервалы без встреч команда определяет вместе. Ben предпочитает решать сам.", b2Voices),
  select("B2", "stimme-clara", "Für wen hat die Möglichkeit spontaner Rückfragen Vorrang?", "Clara", ["Ada", "Ben"], "Clara считает быструю координацию важнее фиксированных пауз.", b2Voices),
  select("B2", "luecke", "Welcher Satz passt in die Lücke [X]?", "Das sagt allerdings noch nichts darüber aus, wer die Räder tatsächlich nutzt.", ["Deshalb wurden alle Räder nach der Testphase verkauft.", "Das Projekt konnte wegen eines Lieferengpasses gar nicht starten."], "Allerdings подготавливает контраст. Следующее предложение уточняет, какие сведения ещё предстоит собрать.", "Im ersten Monat wurden die neuen Leihräder häufiger ausgeliehen als erwartet. [X] Im nächsten Schritt will die Stadt deshalb untersuchen, ob Menschen aus unterschiedlichen Stadtteilen gleichermaßen erreicht werden."),
  select("B2", "ueberschrift", "Welche Überschrift passt zu diesem Absatz einer Kursordnung?", "Rücktritt und Kostenerstattung", ["Barrierefreiheit am Kursort", "Benotung der Abschlussprüfung"], "Абзац регулирует отказ от участия и условия возврата оплаты.", "Wer bis sieben Tage vor Kursbeginn absagt, erhält die Gebühr vollständig zurück. Bei späterer Absage ist eine Erstattung nur mit ärztlichem Attest möglich."),
  select("B2", "schluss", "Welche Schlussfolgerung ist durch den Text gedeckt?", "Die Daten zeigen einen Zusammenhang, belegen aber keine Ursache.", ["Die Pausen allein verursachen die höhere Konzentration.", "Die Studie widerlegt jeden Einfluss von Pausen."], "В наблюдении видна связь. Авторы не разделяли участников случайным образом, поэтому причинный вывод преждевременен.", "Beschäftigte, die häufiger kurze Pausen machten, schnitten im Konzentrationstest besser ab. Sie hatten ihre Pausen allerdings selbst gewählt. Die Untersuchung erfasste weder Schlafdauer noch Arbeitsbelastung."),
  select("B2", "konnektor", "Wähle einen Konnektor, der den Gegensatz markiert: Die Befragung war kurz. ___ lieferte sie Hinweise für den nächsten Versuch.", "Dennoch", ["Folglich", "Somit"], "Dennoch вводит уступку. Folglich и somit выражают следствие.", undefined, "Grammatik"),
  select("B2", "register", "Welche Bitte passt in eine formelle E-Mail an die Personalabteilung?", "Ich wäre Ihnen dankbar, wenn Sie mir die Bestätigung bis Freitag zusenden könnten.", ["Schickt mir die Bestätigung endlich bis Freitag.", "Also, ich will den Zettel spätestens Freitag."], "Форма Ihnen и условная конструкция смягчают просьбу, при этом срок обозначен однозначно.", undefined, "Wortschatz"),

  select("C1", "stimme", "Wer nennt den Abgleich mit der Primärquelle als Qualitätsbedingung?", "Mina", ["Oskar", "Tarek"], "Mina говорит, что цитаты следует сверять с оригиналом интервью. Остальные обсуждают доступность и согласие.", c1Voices),
  select("C1", "implizit", "Welche Annahme stellt die Autorin infrage?", "Ein aggregierter Wert bildet die Versorgungslage aller Gruppen hinreichend ab.", ["Qualitätsberichte können Kennzahlen enthalten.", "Die Wartezeit lässt sich in Minuten erfassen."], "Автор критикует перенос общего показателя на каждую группу, а не измерение времени ожидания.", "Die durchschnittliche Wartezeit sank, während sie in zwei Stadtteilen zunahm. Wer allein die Gesamtzahl veröffentlicht, verschweigt diesen Befund nicht absichtlich. Dennoch könnte die Darstellung den Eindruck erwecken, die Verbesserung sei überall angekommen."),
  select("C1", "luecke", "Welcher Satz fügt sich am besten in die Lücke [X] ein?", "Die Übereinstimmung ist daher zunächst ein Hinweis auf Stabilität innerhalb dieses Messverfahrens.", ["Damit ist gezeigt, dass beide Messverfahren dieselben Merkmale erfassen.", "Diese Abweichung schließt jeden weiteren Vergleich aus."], "Der Satz verbindet die beobachtete Übereinstimmung mit der offenen Frage zur Übertragbarkeit.", "Zwei Arbeitsgruppen gelangten mit demselben Messinstrument zu ähnlichen Ergebnissen. [X] Ob sich der Befund bei einem anderen Instrument wiederholt, bleibt offen."),
  select("C1", "ueberschrift", "Welche Überschrift trifft den Schwerpunkt des Absatzes am genauesten?", "Aussagegrenzen einer freiwilligen Befragung", ["Ein allgemeingültiger Nachweis der Wirkung", "Weshalb Befragungen grundsätzlich ungeeignet sind"], "В абзаце описано ограничение самоотбора. Оно не делает опрос бесполезным.", "Bei einer freiwilligen Befragung zur Mediennutzung antworteten vor allem Menschen, die das Angebot bereits regelmäßig nutzten. Die Rückmeldungen sind für die Produktpflege nützlich, lassen sich aber nicht auf die gesamte Zielgruppe übertragen."),
  select("C1", "sprachbaustein-1", "Wähle die passende Präposition: Dem Vorschlag zufolge soll der Zugang ___ nachvollziehbaren Kriterien geregelt werden.", "nach", ["gegen", "über"], "Nach Kriterien regeln: nach указывает на принцип или правило.", undefined, "Grammatik"),
  select("C1", "sprachbaustein-2", "Wähle die passende Verbindung: Die Ergebnisse sind nur ___ vergleichbar, als die Gruppen nach denselben Regeln gebildet wurden.", "insofern", ["dennoch", "demzufolge"], "Связка insofern …, als … обозначает, в какой мере справедливо утверждение.", undefined, "Grammatik"),
  select("C1", "praezision", "Welche Formulierung gibt den Befund zurückhaltend wieder?", "Die Daten legen einen Zusammenhang nahe, seine Richtung bleibt jedoch offen.", ["Die Studie weist die Ursache zweifelsfrei nach.", "Die Daten schließen einen Zusammenhang aus."], "Nahelegen оставляет неопределённость. Ограничение во второй части конкретно называет, чего мы пока не знаем.", "In einer fiktiven Befragung traten zwei Merkmale häufig gemeinsam auf. Welches Merkmal zeitlich zuerst auftrat, wurde nicht erfasst."),
];
