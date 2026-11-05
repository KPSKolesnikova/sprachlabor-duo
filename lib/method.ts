import type { Level } from "./course";

type Lesson = [topic: string, rule: string, sample: string, transfer: string];
export const grammarLessons: Record<Level, Lesson[]> = {
  A1: [
    ["Позиция глагола и вопрос", "В обычном утверждении личная форма занимает вторую позицию. На первом месте может быть целая группа. В общем вопросе глагол первый, в W-вопросе — после вопросительного слова.", "Am Montag um acht arbeite ich. Arbeitest du heute? Wann arbeitest du?", "Перенеси встречу и начни одну фразу со времени, другую с места."],
    ["Артикль и Akkusativ", "Артикль выражает род, число и падеж. В Akkusativ меняется мужской род: der → den, ein → einen, kein → keinen. Для слов учи артикль и множественное вместе.", "Der Termin ist morgen. Ich habe einen Termin. Ich habe keinen Termin.", "Попроси в магазине предмет мужского, женского и среднего рода."],
    ["Рамка предложения", "Личная форма на второй позиции. Инфинитив после модального глагола или отделяемая приставка закрывают рамку.", "Ich kann morgen anrufen. Morgen rufe ich an.", "Дай два варианта обещания перезвонить. Один с können, другой с anrufen."],
    ["Просьбы и ориентиры", "Для вежливой инструкции используй Imperativ с Sie. Различай am для дня, um для времени, mit + Dativ и готовые сочетания места.", "Gehen Sie geradeaus. Am Freitag um vier. Mit der Bahn. Am Eingang.", "Объясни партнёрше, как дойти до входа и во сколько прийти."],
  ],
  A2: [
    ["Perfekt в разговоре", "Личная форма haben/sein стоит в начале рамки, Partizip II в конце. Большинство глаголов идут с haben. Движение с изменением места и bleiben часто идут с sein. Учим пары.", "Ich habe gearbeitet. Ich bin zur Uni gefahren. Ich bin zu Hause geblieben.", "Перескажи вчерашний день, включи минимум два глагола с каждым вспомогательным."],
    ["Wo? и Wohin?", "С Wechselpräpositionen место обычно требует Dativ, а цель перемещения — Akkusativ. Сам факт движения падеж не определяет.", "Ich laufe im Park. Ich laufe in den Park. Die Datei liegt auf dem Tisch.", "Опиши, где предмет сейчас, и куда его нужно положить."],
    ["Потому что, что, если", "После weil, dass и wenn личный глагол в конце. Если придаточное стоит первым, после запятой в главной части сразу идёт личный глагол.", "Ich bleibe hier, weil ich arbeite. Wenn ich Zeit habe, rufe ich an.", "Перенеси встречу, дай причину и условие для нового времени."],
    ["Сравнения и вежливый тон", "Для неравенства используй сравнительную степень и als. Для равенства — so … wie. Könnten Sie …? удобно для формальной просьбы.", "Der Weg ist kürzer als gestern. Das Zimmer ist so hell wie das andere. Könnten Sie mir helfen?", "Сравни две квартиры и вежливо уточни один неизвестный факт."],
  ],
  B1: [
    ["Относительное предложение", "Род и число относительного местоимения зависят от существительного. Падеж задаёт его роль внутри придаточного. Если требуется предлог, он стоит перед местоимением.", "Die Kollegin, die arbeitet. Die Kollegin, der ich helfe. Die Kollegin, mit der ich arbeite.", "Опиши коллегу или автора двумя предложениями с разным падежом."],
    ["Цель и уступка", "При одном деятеле часто удобно um … zu. При разных — damit. Obwohl вводит придаточное, trotzdem обычно начинает новое главное предложение.", "Ich notiere das Datum, um es nicht zu vergessen. Ich schreibe dir, damit du es weißt. Es regnet. Trotzdem gehen wir.", "Объясни, зачем встречаться, и почему план действует несмотря на сложность."],
    ["Действие и состояние", "В пассиве действия werden меняется по времени, Partizip II сохраняется. Для состояния используют sein + Partizip II.", "Der Bericht wird geprüft. Der Bericht wurde geprüft. Der Bericht ist geprüft.", "Отчитайся о трёх задачах, различая процесс, прошлое событие и состояние."],
    ["Косвенный вопрос", "Вопросительное слово сохраняется, личный глагол уходит в конец. Общий вопрос вводится ob.", "Weißt du, wann der Kurs beginnt? Wissen Sie, ob der Raum frei ist?", "Уточни три детали по телефону, используя минимум один вопрос с ob."],
  ],
  B2: [
    ["Передача чужого высказывания", "Konjunktiv I отмечает передачу чужих слов. Где форма совпадает с Indikativ, часто выбирают Konjunktiv II или явно указывают источник.", "Die Autorin sagt, der Befund sei vorläufig. Laut Bericht seien weitere Daten nötig.", "Перескажи позицию спикера и отдельно сформулируй собственную."],
    ["Расширенное определение", "Partizip II может стоять перед существительным и получать окончание прилагательного. Прилагательное согласуется с артиклем, родом, числом и падежом.", "Daten, die gestern erhoben wurden → die gestern erhobenen Daten.", "Перепиши предложение двумя способами и выбери более понятный для читателя."],
    ["Логическая связь", "Da вводит придаточное причины, daher связывает главное предложение со следствием. Dennoch показывает уступку. Сначала определи смысл связи.", "Da die Daten fehlen, warten wir. Die Daten fehlen. Daher warten wir. Dennoch können wir den Ablauf prüfen.", "Изложи ситуацию, последствие и осторожную альтернативу."],
    ["Управление и альтернативы пассиву", "Учи глагол вместе с предлогом и падежом. Sich lassen + инфинитив показывает возможность, а не просто факт выполнения.", "Die Auswahl hängt von den Daten ab. Das Problem lässt sich lösen.", "Объясни, от чего зависит решение, и что ещё можно проверить."],
  ],
  C1: [
    ["Условие и границы вывода", "В академическом тексте отделяй наблюдение от интерпретации. Формулы ограничения полезны, когда есть конкретное основание.", "Die Daten legen nahe, dass … Der Befund ist nur unter der Voraussetzung übertragbar, dass …", "Добавь к тезису источник, условие и альтернативное объяснение."],
    ["Точный регистр", "Номинализация уместна, если помогает упаковать уже известное. Для нового сложного вывода часто яснее глагольная конструкция.", "Nach Prüfung der Daten … / Nachdem wir die Daten geprüft hatten, …", "Перепиши одну фразу для отчёта и для короткого устного объяснения."],
    ["Уступка и граница согласия", "Insofern …, als … указывает, в каком отношении верно утверждение. Для уступки в формальном регистре возможны dennoch и gleichwohl.", "Der Einwand ist insofern berechtigt, als die Messung nur einen Teil des Problems erfasst.", "Прими часть возражения и сформулируй, с какой частью ты споришь."],
    ["Медиация и перефразирование", "При пересказе отбирай главное под задачу слушателя, сохраняй степень уверенности и явно отделяй источник от комментария.", "Die Autorinnen berichten von einem Zusammenhang. Die Frage nach der Ursache bleibt offen.", "Передай содержание заметки коллеге за минуту и уточни, какие детали ему нужны."],
  ],
};

export const methodSources = [
  ["Goethe · Deutsch Lehren Lernen", "https://www.goethe.de/de/spr/unt/dll/upr.html"],
  ["CEFR Companion Volume", "https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors"],
  ["Kim & Webb · интервальная практика", "https://doi.org/10.1111/lang.12479"],
  ["Kurokawa et al. · видео с субтитрами", "https://doi.org/10.1111/lang.12697"],
  ["Lyster & Saito · обратная связь", "https://doi.org/10.1017/S0272263109990520"],
];
