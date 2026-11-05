const models = {
  A1: "https://www.goethe.de/ins/de/en/prf/gzsd1/ueb.html",
  A2: "https://www.goethe.de/ins/de/de/prf/gzsd2/ub2.html",
};

function WritingA2() {
  return <>
    <h3>Schreiben · SMS и e-mail</h3>
    <ol>
      <li lang="de"><strong>SMS (20–30 Wörter).</strong> Sie wollten Nina am Bahnhof treffen. Schreiben Sie Nina. Entschuldigen Sie sich für die Verspätung. Schreiben Sie, warum Sie später kommen. Nennen Sie eine neue Uhrzeit.</li>
      <li lang="de"><strong>E-Mail (30–40 Wörter).</strong> Ihr Deutschkurs beginnt am Dienstag. An diesem Tag können Sie nicht kommen. Schreiben Sie an die Kursleiterin Frau Keller. Erklären Sie den Grund. Fragen Sie nach den Hausaufgaben. Sagen Sie, wann Sie wieder zum Kurs kommen.</li>
    </ol>
    <p className="muted">Проверьте, можно ли подчеркнуть по одной реплике на каждый пункт. Сверьте обращение, прощание, длину и понятность текста.</p>
  </>;
}

function SpeakingA2() {
  return <>
    <h3>Sprechen · три задания</h3>
    <ol lang="de">
      <li><strong>Fragen stellen und antworten.</strong> Thema Freizeit. Jede Person stellt zwei Fragen und beantwortet zwei. Wörter für die Fragen: <em>Wochenende, Sport, Musik, Freunde</em>.</li>
      <li><strong>Von sich erzählen.</strong> Wie lernen Sie am liebsten? Sprechen Sie über den Lernort, die Zeit, digitale Hilfsmittel und eine Person, mit der Sie gern lernen.</li>
      <li><strong>Etwas gemeinsam planen.</strong> Sie wollen am Samstag zusammen lernen. Finden Sie eine Uhrzeit und einen Ort. Fragen Sie, wann die andere Person Zeit hat. Machen Sie Vorschläge und reagieren Sie darauf.</li>
    </ol>
    <details><summary>Карточка A · открой только свою</summary><p lang="de">Samstag: 10–12 Uhr Sport, 12–14 Uhr Einkaufen, 14–17 Uhr frei, ab 17 Uhr Familienbesuch. Du kannst in die Bibliothek oder in ein Café gehen.</p></details>
    <details><summary>Карточка B · открой только свою</summary><p lang="de">Samstag: 10–13 Uhr Arbeit, 13–15 Uhr Besuch, 15–18 Uhr frei, ab 18 Uhr Kino. Die Bibliothek schließt um 16 Uhr. Ein Café ist bis 19 Uhr offen.</p></details>
    <p className="muted">После диалога проверьте, каждая ли задала вопросы и ответила на них, понятны ли рассказ и произношение, есть ли общая договорённость.</p>
  </>;
}

export function FoundationExam({ lessonId }: { lessonId: string }) {
  const a1 = lessonId === "a1-final";
  const final = a1 || lessonId === "a2-final";
  if (!final && lessonId !== "a2-email" && lessonId !== "a2-oral") return null;
  const level = a1 ? "A1" : "A2";
  return <section className="panel lesson-step foundation-exam">
    <div className="eyebrow">PRÜFUNGSTRAINING / {level}</div>
    <h2>Практика по формату Goethe</h2>
    <p className="muted">Авторские задания для тренировки. Письмо и речь разберите с партнёршей по критериям из официального комплекта.</p>
    {a1 ? <>
      <h3>Schreiben · короткое сообщение</h3>
      <p lang="de">Sie können am Montag nicht zum Deutschkurs kommen. Schreiben Sie Ihrem Lehrer Herrn Vogt. Sagen Sie, an welchem Tag Sie nicht kommen. Schreiben Sie, warum Sie fehlen. Fragen Sie nach den Hausaufgaben. Schreiben Sie circa 30 Wörter.</p>
      <p className="muted">Проверьте три пункта, приветствие, прощание и понятность каждой фразы. Анкету можно повторить в A1.1.</p>
      <h3>Sprechen · представление, вопрос и просьба</h3>
      <ol lang="de">
        <li>Stellen Sie sich vor. Buchstabieren Sie Ihren Familiennamen und sagen Sie eine Telefonnummer.</li>
        <li>Thema Einkauf, Wort <em>Brot</em>. Stellen Sie eine Frage. Antworten Sie auf die Frage Ihrer Partnerin zum Wort <em>Preis</em>.</li>
        <li>Stellen Sie sich eine Bildkarte mit einem Kugelschreiber vor. Bitten Sie um den Gegenstand. Reagieren Sie auf die Bitte Ihrer Partnerin zur Bildkarte mit einem Glas Wasser.</li>
      </ol>
      <p className="muted">Вопрос должен подходить к теме, просьба звучать как просьба, реакция отвечать на реплику партнёрши.</p>
    </> : <>
      {(final || lessonId === "a2-email") && <WritingA2 />}
      {(final || lessonId === "a2-oral") && <SpeakingA2 />}
    </>}
    {final && <p className="hint">{a1 ? "На полном пробнике. Hören — около 20 мин, Lesen — 25 мин, Schreiben — 20 мин, Sprechen — около 15 мин в группе." : "На полном пробнике. Lesen — 30 мин, Hören — около 30 мин, Schreiben — 30 мин, Sprechen — около 15 мин в паре."}</p>}
    <a className="text-link" href={models[level]} target="_blank" rel="noreferrer">Официальные комплекты и критерии Goethe {level} ↗</a>
  </section>;
}
