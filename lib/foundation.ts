import { a11, a12 } from "./foundation-a1";
import { a21, a22 } from "./foundation-a2";
import { choice, fill } from "./drills";
import type { Check } from "./foundation-model";
import type { Level } from "./course";

const teacher = "YourGermanTeacher";
const dw = "Deutsch lernen mit der DW";
const videos: Record<string, [id: string, channel: string]> = {
  letters: ["PBDJuFA4_do", "DeutschZeit"], sounds: ["nI77g2VWysE", teacher], greetings: ["dC6ZGLzdaTs", dw], sein: ["yKnV9OBuZS4", "Deutsch für Euch"],
  present: ["Ya-3_64snmo", teacher], v2: ["O-_cxHx5FD4", teacher], numbers: ["aqk2YZX8YVw", teacher], time: ["niBAknPZn0I", teacher],
  articles: ["IFsEX4ZY6bc", teacher], plural: ["dY6u8L0Y58g", "Deutsch für Euch"], have: ["xy4a1c7W7k0", "Learn German"], a1exam: ["ozAUc8rF450", teacher],
  acc: ["fPKH95g_9cs", teacher], negation: ["2BHNFxSehgg", "Daily German Lesson"], cafe: ["jJiE4Rfcl9w", "Learn German"], shop: ["aZkLp5VEV1I", "Hallo Deutschschule"],
  frame: ["Tizr0WwCzFQ", teacher], direction: ["Fz_AuTNFa8k", dw], station: ["1_WSkHySOqs", "Learn German"], meet: ["Vvt6H_EvGX0", dw],
  home: ["bbZxpdieqIA", dw], routine: ["jUElkIpQlNw", dw], doctor: ["cTJ1KFzmhbc", dw], a1oral: ["SwDaZZ_PKvU", teacher],
  perfekt: ["3q50fD7o7Xw", "DeutschZeit"], past: ["nmyEEsPEv-k", "Learn German"], delay: ["uyWpdn0NL1Q", "Slow German Podcast"], a2write: ["42cmmEXGcpo", "Five Minute German"],
  objects: ["KD654SYP5GI", teacher], twoway: ["auWRmuw_AcY", teacher], flat: ["GE4sWbCiWG8", "Deutsch Lernen Haus"], compare: ["dLYFZZqpE6c", "lingoni GERMAN"],
  subordinate: ["ATnUjMoNXhE", teacher], modal: ["SBp5L_A7b6g", teacher], adjectives: ["SXKD5bQl-zQ", teacher],
  duration: ["O3khyMoBV-g", "Sprachschule | Learn German Fast"], verbprep: ["U_p72whCx7s", teacher], reflexive: ["UMbQxcw8MW0", teacher], work: ["906tHgfvtm0", dw],
  a2plan: ["maptUu1bHM4", "Planet Deutsch"], returns: ["VfHG1B7y3oQ", "Deutsch Persisch TV"], digital: ["xuVnMMMztx0", dw], connectors: ["T-G5NEBsHpU", "Learn German"],
};

export const beginnerPlan = [a11, a12, a21, a22];
export const beginnerLessons = beginnerPlan.flatMap((stage) => stage.modules.flatMap((module, moduleIndex) => module.units.map((details, index) => {
  const level: Level = stage.id.startsWith("A1") ? "A1" : "A2";
  const [video, channel] = videos[details.video];
  return {
    id: details.id, level, order: moduleIndex * 4 + index + 1, title: details.title,
    theory: details.how, example: details.examples[0][0], transfer: details.transfer,
    video, channel, focus: details.watch, stage: stage.id, details,
    questionIds: Array.from({ length: 5 }, (_, i) => `course-${details.id}-${i + 1}`),
  };
})));

const audioChecks: Record<string, [audio: string, item: Check]> = {
  "a1-time": ["w02_3", ["Wann treffen sie sich?", "Donnerstag, 2:30", "Donnerstag, 3:30", "Dienstag, 2:30", "Am Donnerstag um halb drei — в четверг в половине третьего."]],
  "a1-4": ["w03_1", ["Wohin soll die Person zuerst gehen?", "geradeaus", "nach links", "nach rechts", "Zuerst geradeaus — сначала прямо."]],
  "a1-transit": ["a1-p", ["Wo ist der Deutschkurs heute?", "In Raum 21", "In Raum 12", "In Raum 8", "Emma sagt Raum einundzwanzig. Acht — это время начала."]],
  "a1-plans": ["a1-b", ["Wo möchte die Person Ben treffen?", "Im Café am Bahnhof", "In der Bibliothek", "Am Haupteingang", "Dort относится к только что названному Café am Bahnhof."]],
  "a2-delay": ["a2-b", ["Von welchem Gleis fährt der Zug nach Leipzig heute?", "Gleis 8", "Gleis 2", "Gleis 10", "Gleis acht statt Gleis zwei — восьмой путь вместо второго."]],
  "a2-digital": ["a2-a", ["Wann erschien die Fehlermeldung?", "Nach der Anmeldung auf dem Handy", "Beim Start des Laptops", "Vor der Anmeldung auf dem Handy", "Nach der Anmeldung — после входа. На ноутбуке всё работало."]],
};
const formText = "Mara Fischer wohnt in Bremen. Sie wurde am 7. April 2002 geboren. Ihre Telefonnummer ist 0176 23456789.";
const formFields: [string, string | string[], string][] = [
  ["Vorname", "Mara", "Vorname — имя."],
  ["Familienname", "Fischer", "Familienname, или Nachname, — фамилия."],
  ["Wohnort", "Bremen", "Wohnort — населённый пункт, где человек живёт."],
  ["Geburtsdatum", ["07.04.2002", "7.4.2002", "7. April 2002", "07.04.02", "07.4.2002", "7.04.2002"], "April — четвёртый месяц. В немецкой дате сначала день, затем месяц."],
  ["Telefonnummer", ["0176 23456789", "017623456789", "0176-23456789", "0176/23456789"], "Номер начинается с 0. Перенеси все цифры из текста."],
];

export const beginnerDrills = beginnerLessons.flatMap((lesson) => {
  if (lesson.id === "a1-form") {
    return formFields.map(([label, answer, tip], i) => ({
      ...fill(lesson.questionIds[i], lesson.level, "Lesen", [`Formular · ${label}`, answer, tip]),
      text: formText,
    }));
  }
  const { checks, examples } = lesson.details;
  const audio = audioChecks[lesson.id];
  return [
    ...checks.map((item, i) => choice(lesson.questionIds[i], lesson.level, "Grammatik", item)),
    ...examples.slice(0, 2).map(([german, russian], i) => {
      if (i === 1 && audio) {
        return { ...choice(lesson.questionIds[4], lesson.level, "Hören", audio[1]), audio: `/audio/${audio[0]}.mp3` };
      }
      const [other, last] = examples.filter((_, index) => index !== i);
      return choice(lesson.questionIds[i + 3], lesson.level, "Lesen", [`Что означает «${german}»?`, russian, other[1], last[1], `${german} — ${russian}`]);
    }),
  ];
});

export const checkpointsByStage = {
  "A1.1": { title: "Контроль основы", note: "Продиктуй имя и телефон. Заполни анкету по новому описанию. Представься и задай два вопроса без сценария.", level: "A1" },
  "A1.2": { title: "Два полных комплекта Goethe A1", note: "Пройди чтение, аудирование, анкету, короткое сообщение и устные карточки. Отдельно разберите письмо и речь по ключам и критериям.", level: "A1" },
  "A2.1": { title: "Промежуточная контрольная", note: "Пройди чтение и аудирование на новом материале. Напиши SMS с тремя пунктами и договорись о новом времени без подсказок.", level: "A2" },
  "A2.2": { title: "Два полных комплекта Goethe A2", note: "Выполни чтение, аудирование, SMS, e-mail и три устных задания. Для второго результата используй незнакомый официальный вариант.", level: "A2" },
} as const;
