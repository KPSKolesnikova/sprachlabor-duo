import { type Level, levelOrder } from "./course";
import { choice, fill, type Question } from "./drills";
import scripts from "./listening.json";

type Scene = [material: string, items: [prompt: string, answer: string, distractor: string, other: string, feedback: string][]];

const read: Record<Level, [Scene, Scene, Scene]> = {
  A1: [
    ["Hallo Sara, am Montag arbeite ich zu Hause. Um zwei Uhr habe ich einen Termin. Um fünf Uhr gehe ich mit Tim einkaufen. Hast du am Dienstag Zeit? Wir können uns um sieben am Bahnhof treffen. Viele Grüße, Mia", [
      ["Wann arbeitet Mia zu Hause?", "Am Montag", "Am Dienstag", "Am Freitag", "Am Montag arbeitet Mia zu Hause."],
      ["Wann hat Mia einen Termin?", "Um zwei Uhr", "Um fünf Uhr", "Um sieben Uhr", "Mia hat um zwei Uhr einen Termin."],
      ["Mit wem geht Mia einkaufen?", "Mit Tim", "Mit Sara", "Allein", "Mit Tim geht sie einkaufen."],
      ["Wann will Mia Sara treffen?", "Am Dienstag", "Am Montag", "Am Mittwoch", "Mia fragt, ob Sara am Dienstag Zeit hat."],
      ["Wo schlägt Mia ein Treffen vor?", "Am Bahnhof", "Zu Hause", "Im Büro", "Der vorgeschlagene Treffpunkt ist am Bahnhof."],
    ]],
    ["Guten Tag Herr Klein, der Deutschkurs beginnt am Mittwoch um neun Uhr. Wir treffen uns im ersten Stock in Raum 14. Der Eingang am Park ist geschlossen. Bitte kommen Sie durch den Eingang in der Lindenstraße. Bringen Sie Ihr Kursbuch mit. Das Sprachbüro", [
      ["An welchem Tag beginnt der Kurs?", "Mittwoch", "Dienstag", "Freitag", "Der Kurs beginnt am Mittwoch."],
      ["Wann geht es los?", "09:00", "14:00", "19:00", "Der Kurs beginnt um neun Uhr."],
      ["Welcher Raum ist richtig?", "Raum 14", "Raum 9", "Raum 40", "Die Gruppe trifft sich in Raum 14."],
      ["Welcher Eingang ist offen?", "Lindenstraße", "Am Park", "Bahnhofstraße", "Der Eingang am Park ist geschlossen."],
      ["Was soll Herr Klein mitbringen?", "Sein Kursbuch", "Seinen Laptop", "Seinen Ausweis", "Die Nachricht sagt: Bringen Sie Ihr Kursbuch mit."],
    ]],
    ["Hallo Jonas, am Freitag bin ich von zehn bis zwölf in der Mensa. Am Nachmittag arbeite ich in der Bibliothek. Um halb sechs warte ich am Kino. Komm bitte zum Eingang an der Marktstraße. Nach dem Film fahren wir mit dem Bus nach Hause. Grüße, Lea", [
      ["Wo ist Lea vormittags?", "In der Mensa", "Im Kino", "In der Bibliothek", "Vormittags ist sie von zehn bis zwölf in der Mensa."],
      ["Wo arbeitet sie am Nachmittag?", "In der Bibliothek", "Zu Hause", "Am Bahnhof", "Sie arbeitet am Nachmittag in der Bibliothek."],
      ["Wann wartet Lea am Kino?", "17:30", "18:30", "16:30", "Halb sechs bedeutet 5:30 bzw. 17:30. Der Kontext ist Nachmittag."],
      ["Wo ist der Treffpunkt?", "Am Eingang an der Marktstraße", "An der Bushaltestelle", "In der Mensa", "Jonas soll zum Eingang an der Marktstraße kommen."],
      ["Wie fahren sie nach Hause?", "Mit dem Bus", "Mit der Bahn", "Mit dem Auto", "Nach dem Film nehmen sie den Bus."],
    ]],
  ],
  A2: [
    ["Liebe Frau Seidel, danke für Ihre Nachricht. Die Wohnungsbesichtigung kann leider nicht am Donnerstag stattfinden. Wir könnten uns am Samstag um 11 Uhr treffen. Bitte warten Sie vor Hausnummer 18 und klingeln Sie bei Weber. Die Wohnung liegt im dritten Stock. Die Besichtigung dauert etwa zwanzig Minuten. Antworten Sie bitte bis Freitagmittag.", [
      ["Warum schreibt der Absender?", "Um die Besichtigung zu verschieben", "Um die Miete zu erhöhen", "Um die Wohnung zu kündigen", "Der Donnerstagstermin fällt aus, ein neuer wird angeboten."],
      ["Wann ist der neue Termin?", "Samstag um 11 Uhr", "Donnerstag um 11 Uhr", "Freitag um 12 Uhr", "Vorgeschlagen ist Samstag um elf."],
      ["Bei wem soll Frau Seidel klingeln?", "Bei Weber", "Bei Seidel", "Bei Schmidt", "Sie soll bei Weber klingeln."],
      ["Wo liegt die Wohnung?", "Im dritten Stock", "Im Erdgeschoss", "Im zweiten Stock", "Die Wohnung liegt im dritten Stock."],
      ["Bis wann soll sie antworten?", "Bis Freitagmittag", "Bis Samstagabend", "Bis Donnerstagmorgen", "Die Bitte lautet, bis Freitagmittag zu antworten."],
    ]],
    ["Hallo Team, gestern habe ich die neue Version der App auf dem Tablet getestet. Die Anmeldung hat funktioniert. Beim Export der Liste hat die App aber eine Fehlermeldung gezeigt. Nach einem Neustart war der Fehler immer noch da. Ich habe die Schritte notiert. Morgen kann ich den Test erst nach 15 Uhr wiederholen, weil ich am Vormittag einen Kurs habe.", [
      ["Womit hat die Person getestet?", "Mit einem Tablet", "Mit einem Handy", "Mit einem Laptop", "Getestet wurde auf dem Tablet."],
      ["Wann trat der Fehler auf?", "Beim Export der Liste", "Bei der Anmeldung", "Beim Öffnen der App", "Die Anmeldung war erfolgreich, der Export scheiterte."],
      ["Was passierte nach dem Neustart?", "Der Fehler blieb", "Der Fehler verschwand", "Die Anmeldung war unmöglich", "Der Fehler war immer noch da."],
      ["Was hat die Person dokumentiert?", "Die Schritte", "Die Teilnehmerliste", "Den Kursplan", "Sie hat die Schritte notiert."],
      ["Ab wann kann sie morgen testen?", "Nach 15 Uhr", "Vor dem Kurs", "Ab 10 Uhr", "Am Vormittag ist sie im Kurs."],
    ]],
    ["Das Stadtmuseum ist während des Umbaus geöffnet. Besucherinnen benutzen den Eingang am Innenhof. Die Ausstellung im ersten Stock kann man wie gewohnt besuchen. Für Führungen muss man sich bis zum Vortag anmelden. Kinder unter zwölf Jahren zahlen keinen Eintritt. An jedem ersten Sonntag des Monats ist der Eintritt für alle frei.", [
      ["Wo gehen Gäste hinein?", "Am Innenhof", "Am Haupteingang", "Im ersten Stock", "Der Eingang am Innenhof wird während des Umbaus genutzt."],
      ["Welche Ausstellung bleibt zugänglich?", "Die im ersten Stock", "Nur die im Keller", "Keine", "Die Ausstellung im ersten Stock ist wie gewohnt zugänglich."],
      ["Was ist für eine Führung nötig?", "Anmeldung bis zum Vortag", "Ein Ausweis", "Anmeldung am gleichen Tag", "Die Anmeldung muss bis zum Vortag erfolgen."],
      ["Für wen ist der Eintritt immer frei?", "Kinder unter zwölf Jahren", "Alle Studierenden", "Alle Familien", "Kostenfrei ist der Eintritt für Kinder unter zwölf."],
      ["Wann ist der Eintritt für alle frei?", "Am ersten Sonntag im Monat", "Jeden Sonntag", "Am ersten Montag im Monat", "Die Regel gilt am ersten Sonntag jedes Monats."],
    ]],
  ],
  B1: [
    ["Das Team wollte ein Dashboard einführen, damit alle schneller sehen, wie viele Anfragen offen sind. Beim ersten Test zeigte sich jedoch, dass verschiedene Abteilungen eine Anfrage unterschiedlich zählen. In einer Abteilung gilt sie bereits beim Weiterleiten als erledigt. In einer anderen bleibt sie bis zur Antwort offen. Bevor die Anzeige im ganzen Haus genutzt wird, soll das Team eine gemeinsame Definition erarbeiten und mit einem kleinen Datensatz überprüfen.", [
      ["Welches Ziel hat das Dashboard?", "Offene Anfragen schneller sichtbar machen", "Das Personal ersetzen", "Die Antworten automatisch schreiben", "Das Dashboard soll offene Anfragen sichtbar machen."],
      ["Was ist im Test aufgefallen?", "Abteilungen zählen unterschiedlich", "Es gibt gar keine Anfragen", "Die Software lädt zu langsam", "Die Definition von erledigt unterscheidet sich."],
      ["Wann zählt eine Abteilung eine Anfrage als erledigt?", "Sobald sie weitergeleitet wird", "Sobald sie eingegangen ist", "Erst nach Ablauf eines Monats", "Bei der Weiterleitung kann sie bereits als erledigt gelten."],
      ["Was kommt vor dem Einsatz im ganzen Haus?", "Eine gemeinsame Definition", "Ein kompletter Systemwechsel", "Die Kündigung des Projekts", "Zuerst soll eine gemeinsame Definition erarbeitet werden."],
      ["Wie soll die Definition geprüft werden?", "Mit einem kleinen Datensatz", "Mit einer Personalumfrage", "Mit einer Klausur", "Der Text nennt eine Überprüfung an einem kleinen Datensatz."],
    ]],
    ["Die Hochschulbibliothek verlängert ab Mai ihre Öffnungszeiten. Die Räume zum Arbeiten bleiben bis 22 Uhr offen. Die Ausleihe schließt weiterhin um 19 Uhr. Wer später Bücher zurückgeben möchte, kann die Rückgabebox neben dem Eingang nutzen. Die längeren Zeiten gelten während der Prüfungsphase auch am Samstag. Danach wertet die Bibliothek aus, ob das Angebot dauerhaft bestehen bleibt.", [
      ["Was ändert sich ab Mai?", "Die Arbeitsräume schließen später", "Die Ausleihe schließt später", "Die Bibliothek schließt früher", "Die Arbeitsräume bleiben bis 22 Uhr offen."],
      ["Wann schließt die Ausleihe?", "Um 19 Uhr", "Um 22 Uhr", "Um 17 Uhr", "Die Ausleihzeit bleibt unverändert."],
      ["Wie kann man später ein Buch zurückgeben?", "Über die Rückgabebox", "Per E-Mail", "Nur am nächsten Tag", "Dafür gibt es die Box am Eingang."],
      ["Wann gelten die längeren Zeiten auch samstags?", "Während der Prüfungsphase", "Ab Juni immer", "Nur in den Ferien", "Die Samstagsregel gilt während der Prüfungsphase."],
      ["Was passiert danach?", "Die Bibliothek prüft, ob das Angebot bleibt", "Die Bibliothek schließt endgültig", "Alle Bücher werden aussortiert", "Die Entscheidung wird nach einer Auswertung getroffen."],
    ]],
    ["Wegen einer Baustelle wird die Haltestelle am Rathaus für drei Wochen verlegt. Die Ersatzhaltestelle befindet sich vor der Post, etwa fünf Minuten zu Fuß entfernt. Die Busse fahren nach dem bisherigen Fahrplan. Wer mit dem Rollstuhl unterwegs ist, kann auf Wunsch beim Fahrdienst eine barrierefreie Fahrt bestellen. Die Stadt bittet darum, sich am Vortag telefonisch zu melden.", [
      ["Warum wird die Haltestelle verlegt?", "Wegen einer Baustelle", "Wegen eines Streiks", "Wegen eines Stadtfests", "Die Baustelle ist der Grund."],
      ["Wie lange gilt die Änderung?", "Drei Wochen", "Fünf Tage", "Einen Monat", "Die Änderung gilt für drei Wochen."],
      ["Wo liegt die Ersatzhaltestelle?", "Vor der Post", "Hinter dem Rathaus", "Am Bahnhof", "Die Ersatzhaltestelle ist vor der Post."],
      ["Ändert sich der Fahrplan?", "Nein, er bleibt gleich", "Ja, alle Busse fahren früher", "Ja, es gibt nur Nachtbusse", "Die Busse fahren nach dem bisherigen Fahrplan."],
      ["Wann soll eine barrierefreie Fahrt bestellt werden?", "Am Vortag", "Erst nach der Fahrt", "Eine Woche vorher", "Die Stadt bittet um einen Anruf am Vortag."],
    ]],
  ],
  B2: [
    ["In einer Pilotstudie ersetzte ein Team manuelle Plausibilitätsprüfungen teilweise durch ein automatisches System. Die mediane Bearbeitungszeit sank, doch besonders seltene Fehlertypen wurden häufiger übersehen. Die Forschenden führen dies auf die geringe Zahl solcher Fälle in den Trainingsdaten zurück. Sie empfehlen, Routinefälle automatisiert vorzubereiten und die seltenen Fälle bis zu einer externen Validierung gezielt von Menschen prüfen zu lassen.", [
      ["Was hat sich messbar verbessert?", "Die mediane Bearbeitungszeit sank", "Jede Fallart wurde genauer erkannt", "Die Trainingsdaten wurden größer", "Der Median der Bearbeitungszeit ging zurück."],
      ["Welches Risiko blieb?", "Seltene Fehler wurden häufiger übersehen", "Manuelle Kontrollen fielen vollständig weg", "Die Auswertung wurde teurer", "Die Schwäche betrifft seltene Fehlertypen."],
      ["Welche Erklärung schlagen die Forschenden vor?", "Seltene Fälle sind im Training unterrepräsentiert", "Die Software war veraltet", "Prüfende wollten das System nicht nutzen", "Als Erklärung dient die geringe Zahl seltener Trainingsfälle."],
      ["Welche Aufgabe ist für Automatisierung vorgesehen?", "Routinefälle vorbereiten", "Seltene Fälle abschließend bewerten", "Die externe Validierung ersetzen", "Die Empfehlung betrifft die Vorbereitung der Routinefälle."],
      ["Was gilt bis zur externen Validierung?", "Seltene Fälle gezielt manuell prüfen", "Alle Fälle ohne Kontrolle freigeben", "Keine Fälle mehr bearbeiten", "Menschen sollen seltene Fälle gezielt prüfen."],
    ]],
    ["Die Daten eines Verkehrsprojekts zeigen, dass der Umstieg vom Auto auf den Bus vor allem in Vierteln mit kurzen Taktzeiten zunahm. Die Projektgruppe weist darauf hin, dass diese Viertel zugleich mehr Radwege und weniger kostenlose Parkplätze haben. Eine weitere Untersuchung soll die Einflüsse trennen, indem vergleichbare Viertel mit unterschiedlichen Taktänderungen betrachtet werden. Die bisherigen Ergebnisse sollen als Grundlage für Hypothesen dienen.", [
      ["Welcher Zusammenhang wurde beobachtet?", "Mehr Umstiege bei kurzen Taktzeiten", "Weniger Umstiege bei kurzen Taktzeiten", "Gleiche Umstiegsquote in jedem Viertel", "Der Umstieg nahm vor allem bei kurzen Taktzeiten zu."],
      ["Was erschwert die Deutung?", "Weitere Unterschiede zwischen den Vierteln", "Vollständig fehlende Fahrpläne", "Widersprüchliche Umfragen zum Alter", "Radwege und Parkplätze unterscheiden sich ebenfalls."],
      ["Welchen Faktor nennt der Text ausdrücklich?", "Weniger kostenlose Parkplätze", "Niedrigere Bustarife", "Höhere Einwohnerzahl", "Kostenlose Parkplätze kommen ausdrücklich vor."],
      ["Wie soll die nächste Untersuchung aussehen?", "Vergleichbare Viertel mit unterschiedlichen Taktänderungen prüfen", "Nur ein Viertel beobachten", "Alle Daten aus dem Ausland nehmen", "Der geplante Vergleich soll die Einflüsse besser trennen."],
      ["Welche Funktion haben die bisherigen Ergebnisse?", "Hypothesen entwickeln", "Eine Ursache endgültig beweisen", "Das Projekt beenden", "Die Befunde werden als Ausgangspunkt für Hypothesen verwendet."],
    ]],
    ["Ein Unternehmen bewertet Kundenanfragen seit Kurzem mit einer neuen Kennzahl. Sie zählt Fälle, die innerhalb von 24 Stunden erstmals beantwortet wurden. Dadurch sehen die Ergebnisse besser aus, obwohl Beschwerden über unvollständige Antworten zugenommen haben. Die Qualitätssicherung schlägt vor, die Schnelligkeit zusammen mit dem Anteil vollständig gelöster Fälle zu berichten und Stichproben der Antworten zu prüfen.", [
      ["Was misst die neue Kennzahl?", "Erste Antwort innerhalb von 24 Stunden", "Vollständige Lösung innerhalb von 24 Stunden", "Zahl der Beschwerden", "Sie misst die Geschwindigkeit der ersten Antwort."],
      ["Was entwickelte sich ungünstig?", "Beschwerden über unvollständige Antworten nahmen zu", "Die Anfragen wurden seltener", "Jede Antwort kam später", "Unvollständige Antworten wurden häufiger beanstandet."],
      ["Welche zusätzliche Größe wird vorgeschlagen?", "Anteil vollständig gelöster Fälle", "Anzahl der eingesetzten Computer", "Monatliche Kündigungen", "Der Anteil vollständig gelöster Fälle ergänzt die Schnelligkeit."],
      ["Welche zusätzliche Prüfung ist vorgesehen?", "Stichproben der Antworten", "Eine neue Passwortregel", "Nur ein Vergleich der Kosten", "Antworten sollen stichprobenartig geprüft werden."],
      ["Welches Grundproblem illustriert der Text?", "Eine schnelle Antwort kann qualitativ unzureichend sein", "Jede langsame Antwort ist unvollständig", "Antwortzeiten sind grundsätzlich unmessbar", "Die erste Antwort ist etwas anderes als eine vollständige Lösung."],
    ]],
  ],
  C1: [
    ["In einer Auswertung wurde der Einsatz digitaler Beratung mit höheren Abschlussquoten in Verbindung gebracht. Die Teilnahme am digitalen Angebot war freiwillig, und Personen mit sicherem Internetzugang waren überrepräsentiert. Eine statistische Anpassung verringerte den beobachteten Unterschied, beseitigte ihn aber nicht vollständig. Die Autorinnen weisen darauf hin, dass unbeobachtete Unterschiede zwischen den Gruppen weiterhin eine Rolle spielen können. Für eine Entscheidung über den Ausbau empfehlen sie eine gestufte Einführung mit vorher definierten Endpunkten.", [
      ["Welche Aussage ist durch den Bericht gedeckt?", "Die Nutzung ging mit höheren Abschlussquoten einher", "Das Angebot verursachte die höheren Quoten nachweislich", "Sicherer Internetzugang hatte keinen Einfluss", "Der Bericht beschreibt eine beobachtete Verbindung."],
      ["Was war bei der Teilnahme auffällig?", "Personen mit sicherem Internetzugang waren überrepräsentiert", "Die Zuteilung erfolgte zufällig", "Alle Gruppen hatten identische Voraussetzungen", "Die Teilnahme war freiwillig und die Gruppe nicht gleichmäßig zusammengesetzt."],
      ["Was änderte die statistische Anpassung?", "Sie verringerte den Unterschied", "Sie beseitigte den Unterschied vollständig", "Sie verstärkte den Unterschied", "Der Unterschied wurde kleiner, blieb aber bestehen."],
      ["Welche Unsicherheit bleibt?", "Unbeobachtete Gruppenunterschiede", "Ob ein digitales Angebot existiert", "Ob Abschlussquoten gemessen wurden", "Nicht beobachtete Merkmale können den Befund mit erklären."],
      ["Was empfehlen die Autorinnen?", "Eine gestufte Einführung mit vorab festgelegten Endpunkten", "Den sofortigen Ausbau ohne Begleitung", "Den Verzicht auf weitere Forschung", "Die Einführung soll kontrolliert und mit vorher definierten Endpunkten erfolgen."],
    ]],
    ["In zwei Kliniken ergab sich ein ähnlich starker Zusammenhang zwischen einem Risikoscore und späteren Komplikationen. Allerdings waren die Messintervalle verschieden, und die Kliniken verwendeten unterschiedliche Kriterien für einen vollständigen Fall. Die Übereinstimmung der Schätzwerte ist daher ermutigend, reicht aber für die Annahme gleicher Messbedingungen nicht aus. Die Arbeitsgruppe will prüfen, wie empfindlich die Befunde auf eine gemeinsame Falldefinition und harmonisierte Messintervalle reagieren.", [
      ["Welche Übereinstimmung wird berichtet?", "Ähnlich starker Zusammenhang zwischen Score und Komplikationen", "Gleiche Messintervalle in beiden Kliniken", "Identische Auswahl vollständiger Fälle", "Ähnlich sind die geschätzten Zusammenhänge."],
      ["Welche zwei methodischen Unterschiede gab es?", "Messintervalle und Kriterien für vollständige Fälle", "Behandlungszeiten und Finanzierung", "Datenschutzvorgaben und Personalschlüssel", "Der Text nennt Intervalle und Falldefinitionen."],
      ["Was reicht laut Text für gleiche Messbedingungen nicht aus?", "Ähnliche Schätzwerte", "Eine gemeinsame Falldefinition", "Harmonisierte Messintervalle", "Die Ähnlichkeit der Schätzwerte belegt keine gleichen Messbedingungen."],
      ["Was wird im nächsten Schritt geprüft?", "Empfindlichkeit gegenüber methodischer Harmonisierung", "Ob ein Risikoscore überhaupt vorliegt", "Ob nur eine Klinik weiter Daten erhebt", "Die Gruppe plant eine Sensitivitätsprüfung."],
      ["Welche Haltung nehmen die Forschenden ein?", "Vorsichtiger Optimismus", "Völlige Ablehnung beider Ergebnisse", "Uneingeschränkte Zustimmung", "Der Befund wird ermutigend genannt und methodisch eingegrenzt."],
    ]],
    ["Die Projektkommission diskutiert, ob Vorhersagemodelle jährlich anhand derselben Kriterien überprüft werden sollten. Standardisierte Prüfungen erleichtern Vergleiche über die Zeit. Sie können aber relevante Veränderungen der Zielgruppe verdecken, sofern Berichte nur aggregierte Ergebnisse ausweisen. Der Vorschlag sieht einen stabilen Kern von Kennzahlen und ergänzende Prüfungen für besonders betroffene Gruppen vor. Änderungen der Kriterien sollen dokumentiert und in der Interpretation berücksichtigt werden.", [
      ["Welchen Vorteil haben standardisierte Prüfungen?", "Sie erleichtern zeitliche Vergleiche", "Sie beseitigen jede Verzerrung", "Sie machen Dokumentation überflüssig", "Ein stabiler Standard erleichtert Vergleiche über die Zeit."],
      ["Wann können Zielgruppenänderungen verdeckt werden?", "Wenn Berichte nur aggregierte Ergebnisse zeigen", "Wenn betroffene Gruppen einzeln betrachtet werden", "Wenn Kennzahlen dokumentiert sind", "Aggregierte Werte können Unterschiede zwischen Teilgruppen verbergen."],
      ["Welche Kombination schlägt die Kommission vor?", "Stabile Kernkennzahlen und gruppenspezifische Zusatzprüfungen", "Jährlich komplett neue Kennzahlen", "Ausschließlich eine Gesamtkennzahl", "Vergleichbarkeit und Kontext sollen gemeinsam berücksichtigt werden."],
      ["Was soll bei Änderungen der Kriterien geschehen?", "Dokumentieren und bei der Deutung berücksichtigen", "Verschweigen, damit Vergleiche möglich bleiben", "Die gesamte Prüfung wiederholen", "Änderungen sollen nachvollziehbar dokumentiert werden."],
      ["Welche Spannung steht im Mittelpunkt?", "Vergleichbarkeit und Aufmerksamkeit für Kontext", "Genauigkeit und Stromkosten", "Geschwindigkeit und Datenschutz allein", "Der stabile Kern erlaubt Vergleich, Zusatzprüfungen erfassen Kontext."],
    ]],
  ],
};

const listen: Record<keyof typeof scripts, Scene[1]> = {
  "a1-p": [
    ["In welchem Raum ist der Kurs?", "Raum 21", "Raum 12", "Raum 8", "Emma sagt: Raum einundzwanzig."],
    ["Wann beginnt der Kurs?", "Um acht", "Um neun", "Um zehn", "Der Kurs beginnt um acht Uhr."],
    ["Wo soll man warten?", "Vor dem Haupteingang", "In der Mensa", "An der Haltestelle", "Emma bittet darum, vor dem Haupteingang zu warten."],
    ["Was soll man mitbringen?", "Das Buch", "Den Ausweis", "Den Laptop", "Emma sagt: Bring dein Buch mit."],
  ],
  "a1-a": [
    ["An welchem Tag ist die Anmeldung?", "Dienstag", "Mittwoch", "Donnerstag", "Die Anmeldung ist am Dienstag."],
    ["Wann ist die Anmeldung?", "09:30", "10:30", "09:00", "Halb zehn ist 9:30."],
    ["Wo findet sie statt?", "Erdgeschoss, Raum 5", "Erster Stock, Raum 5", "Erdgeschoss, Raum 15", "Erdgeschoss, Raum fünf."],
    ["Was muss man mitbringen?", "Den Ausweis", "Das Kursbuch", "Einen Stift", "Das Sprachbüro bittet um den Ausweis."],
  ],
  "a1-b": [
    ["An welchem Tag ist die Person in der Bibliothek?", "Donnerstag", "Dienstag", "Samstag", "Sie nennt Donnerstag."],
    ["Wann geht sie zum Café?", "Viertel nach vier", "Viertel vor fünf", "Viertel vor vier", "Sie sagt „um Viertel nach vier“."],
    ["Wo ist das Café?", "Am Bahnhof", "An der Uni", "Neben der Post", "Das Café ist am Bahnhof."],
    ["Was soll Ben mitbringen?", "Den Laptop", "Den Ausweis", "Das Kursbuch", "Die Nachricht endet mit der Bitte um den Laptop."],
  ],
  "a2-p": [
    ["Warum wird der Termin verschoben?", "Die Handwerker sind noch da", "Die Wohnung ist schon vermietet", "Frau Winter ist krank", "Die Handwerker arbeiten noch in der Wohnung."],
    ["Wann ist ein Ersatztermin möglich?", "Freitag ab 16 Uhr", "Heute um 17 Uhr", "Freitag vor 16 Uhr", "Am Freitag geht es ab sechzehn Uhr."],
    ["Wie lautet die Adresse?", "Gartenstraße 12", "Gartenstraße 20", "Bahnhofstraße 12", "Die Adresse bleibt Gartenstraße zwölf."],
    ["Was soll Frau Winter tun, wenn der Termin passt?", "Eine kurze Nachricht schreiben", "Noch einmal anrufen", "Ein Formular im Büro holen", "Sie soll eine kurze Nachricht schicken."],
  ],
  "a2-a": [
    ["Auf welchem Gerät funktionierte alles?", "Auf dem Laptop", "Auf dem Handy", "Auf dem Tablet", "Der Test auf dem Laptop verlief gut."],
    ["Wann erschien die Fehlermeldung?", "Nach der Anmeldung", "Vor dem Öffnen der App", "Beim Drucken", "Auf dem Handy erschien sie nach der Anmeldung."],
    ["Was hat die Person gespeichert?", "Einen Screenshot", "Eine Tonaufnahme", "Einen Fahrplan", "Sie hat einen Screenshot gespeichert."],
    ["Wann möchte sie sich treffen?", "Morgen um elf", "Heute um elf", "Morgen um zwölf", "Vorgeschlagen ist morgen um elf."],
  ],
  "a2-b": [
    ["Von welchem Gleis fährt der Zug nach Leipzig?", "Gleis 8", "Gleis 2", "Gleis 10", "Heute fährt der Zug von Gleis acht."],
    ["Wann fährt er ab?", "14:20", "14:10", "14:30", "Die Ansage nennt vierzehn Uhr zwanzig."],
    ["Wohin fährt der Bus?", "Nach Halle", "Nach Leipzig", "Nach Dresden", "Der Bus ist für Fahrgäste nach Halle."],
    ["Welche Fahrkarte braucht man für den Bus?", "Die vorhandene gilt", "Eine neue Fahrkarte", "Eine Wochenkarte", "Die vorhandene Fahrkarte gilt auch im Bus."],
  ],
  "b1-p": [
    ["An welchem Tag kommen besonders viele Anfragen?", "Montag", "Donnerstag", "Freitag", "Montags kommen doppelt so viele Anfragen wie donnerstags."],
    ["Was fehlt in der Auswertung?", "Feiertage", "Alle Montagsdaten", "Die Anzahl der Abteilungen", "Der Zeitraum enthält keine Feiertage."],
    ["Was soll vor der Planänderung passieren?", "Einen längeren Zeitraum prüfen", "Alle Schichten streichen", "Sofort mehr Personal einstellen", "Die Gruppe will zuerst weitere Daten prüfen."],
    ["Wer übernimmt die nächste Auswertung?", "Sara", "Die Geschäftsführung", "Ein externer Anbieter", "Sara übernimmt die Auswertung."],
  ],
  "b1-a": [
    ["Warum ist der Gruppenraum geschlossen?", "Neue Steckdosen werden installiert", "Es gibt zu wenige Buchungen", "Die Heizung wird repariert", "Die Bibliothek lässt Steckdosen installieren."],
    ["Wo gibt es einen Ersatzraum?", "Im Nachbargebäude", "In der Mensa", "Im gleichen Flur", "Der Raum im Nachbargebäude ist kostenlos buchbar."],
    ["Bis wann kann online gebucht werden?", "Bis zum Vortag", "Bis eine Stunde vorher", "Bis Ende des Monats", "Onlinebuchungen gehen bis zum Vortag."],
    ["Was bleibt unverändert?", "Die Öffnungszeiten", "Die Verfügbarkeit des Gruppenraums", "Die Zimmernummern im Nachbargebäude", "Die Öffnungszeiten der Bibliothek bleiben gleich."],
  ],
  "b1-b": [
    ["Was braucht man für den Einstieg?", "Keine Programmiererfahrung", "Python auf fortgeschrittenem Niveau", "Ein eigenes Forschungsprojekt", "Der Kurs setzt keine Programmiererfahrung voraus."],
    ["Was dürfen Teilnehmende mit Pythonkenntnissen vorschlagen?", "Ein kleines eigenes Projekt", "Eine neue Abschlussklausur", "Den Wechsel des Computerraums", "Das ist im zweiten Teil möglich."],
    ["Wie wird die Teilnahme nachgewiesen?", "Durch regelmäßige Übungen", "Durch eine Abschlussklausur", "Durch ein Gespräch am Empfang", "Die regelmäßigen Übungen dienen als Nachweis."],
    ["Wo ist die erste Sitzung?", "Im Computerraum", "In der Bibliothek", "Ausschließlich online", "Sie findet im Computerraum statt."],
  ],
  "b2-p": [
    ["Was verbesserte das neue Verfahren?", "Es erkannte mehr tatsächliche Fehler", "Es verhinderte alle Fehlalarme", "Es machte weitere Tests überflüssig", "Mehr tatsächliche Fehler wurden markiert."],
    ["Welche Nebenwirkung trat auf?", "Mehr Fehlalarme", "Weniger Datenzugriff", "Die Stichprobe wurde größer", "Das Verfahren erzeugte zusätzlich mehr Fehlalarme."],
    ["Warum ist das im Alltag relevant?", "Fehlalarme kosten Prüfzeit", "Fehlalarme erhöhen automatisch die Datenqualität", "Prüfzeit spielt im Alltag keine Rolle", "Fehlalarme binden Prüfzeit."],
    ["Was ist als Nächstes vorgesehen?", "Fehlerkosten getrennt erfassen und extern im Haus prüfen", "Sofort den Schwellenwert halbieren", "Nur eine Gesamttrefferquote veröffentlichen", "Vor der Änderung werden die Fehlertypen getrennt bewertet und das Modell in einer zweiten Abteilung geprüft."],
  ],
  "b2-a": [
    ["Welche Gruppe schätzte flexible Termine besonders?", "Berufstätige", "Alle Erstsemester", "Ausschließlich Lehrkräfte", "Berufstätige bevorzugten häufiger die flexible Terminwahl."],
    ["Was empfanden Erstsemester häufiger als hilfreich?", "Persönliche Gespräche", "Eine Pflicht zur Videoberatung", "Eine kürzere Semesterzeit", "Erstsemester bewerteten persönliche Gespräche häufiger positiv."],
    ["Welche Entscheidung ist für den Pilotversuch gefallen?", "Beide Kanäle werden angeboten", "Persönliche Beratung wird beendet", "Nur Berufstätige erhalten Beratung", "Beide Formate bleiben im Pilotversuch verfügbar."],
    ["Welche Daten werden erhoben?", "Wartezeiten, Abbrüche und freiwillige Rückmeldungen", "Nur die Zahl der Erstsemester", "Nur die Kosten des Gebäudes", "Die drei Größen sollen getrennt erfasst werden."],
  ],
  "b2-b": [
    ["Wie änderte sich der Durchschnitt?", "Von zwölf auf neun Minuten", "Von neun auf zwölf Minuten", "Von zwölf auf sechs Minuten", "Der Durchschnitt sank von zwölf auf neun Minuten."],
    ["Welche gleichzeitige Veränderung wird genannt?", "Komplexe Fälle gingen an ein anderes Team", "Alle Fälle wurden komplexer", "Es wurden keine Anfragen mehr angenommen", "Ein Teil der komplexen Fälle wurde weitergegeben."],
    ["Warum ist der Vergleich allein vorsichtig zu deuten?", "Die Fallzusammensetzung kann sich geändert haben", "Der Durchschnitt kann nicht berechnet werden", "Es wurden nur Preise verglichen", "Unterschiedliche Fallmischungen können die Änderung erklären."],
    ["Was soll zusätzlich berichtet werden?", "Die Verteilung", "Nur der frühere Durchschnitt", "Die Zahl der Arbeitsplätze", "Neben dem Durchschnitt soll die Verteilung sichtbar sein."],
  ],
  "c1-p": [
    ["Welcher scheinbare Widerspruch wird erklärt?", "Wirksamkeit im Experiment und geringer Nutzen im Alltag", "Hoher Nutzen im Alltag bei gleichbleibenden Preisen", "Unterschiedliche Ergebnisse desselben Fragebogens", "Die Aufnahme trennt Wirksamkeit unter kontrollierten Bedingungen vom Nutzen unter Alltagsbedingungen."],
    ["Was prägte die Studienbedingungen?", "Motivierte Teilnehmende und enge Begleitung", "Zufällige Auswahl aller Zielgruppen", "Vollständiger Verzicht auf Betreuung", "Die Auswahl und die Betreuung können den Unterschied mit erklären."],
    ["Was reicht für die Ausbauentscheidung allein nicht aus?", "Replikation im selben Setting", "Berücksichtigung unterschiedlicher Zielgruppen", "Prüfung der Implementierungsbedingungen", "Eine Wiederholung unter unveränderten Bedingungen beantwortet die Praxisfrage nur teilweise."],
    ["Was soll eine weitere Untersuchung abbilden?", "Bedingungen der Umsetzung und unterschiedliche Zielgruppen", "Nur die ursprünglichen Studierenden", "Nur Kosten, unabhängig von der Anwendung", "Beide Aspekte werden ausdrücklich genannt."],
  ],
  "c1-a": [
    ["Was erlaubt Transparenz über das Training allein nicht?", "Eine Aussage zur Eignung in einem neuen Kontext", "Eine bessere Nachvollziehbarkeit", "Eine Beschreibung der Trainingsschritte", "Trainingsdokumentation ersetzt keine externe Eignungsprüfung."],
    ["Was folgt aus guten externen Testergebnissen?", "Die Dokumentation ist dadurch allein noch nicht hinreichend", "Die Dokumentation ist automatisch vollständig", "Es besteht keine Notwendigkeit für Kriterien", "Externe Leistung und Dokumentation beantworten unterschiedliche Fragen."],
    ["Welche Entscheidung schlägt die Arbeitsgruppe vor?", "Zwei getrennte Freigabekriterien", "Freigabe nur nach Trainingskosten", "Verzicht auf externe Validierung", "Dokumentation und Validierung sollen getrennt geprüft werden."],
    ["Wie sollen Ausnahmen gehandhabt werden?", "Begründet und befristet", "Automatisch und dauerhaft", "Nur mündlich und ohne Dokumentation", "Ausnahmen sollen sowohl eine Begründung als auch eine Frist haben."],
  ],
  "c1-b": [
    ["Welche Annahme wurde zuerst vorgebracht?", "Einheitliche Audits erhöhten automatisch die Vergleichbarkeit", "Audits seien grundsätzlich unmöglich", "Zielgruppen sollten gar nicht betrachtet werden", "Die Aufnahme stellt zunächst das Argument der Vergleichbarkeit dar."],
    ["Was war der zentrale Einwand?", "Identische Kriterien können bei verschiedenen Zielpopulationen irreführen", "Jede Dokumentation sei zu teuer", "Die Kriterien seien grundsätzlich vertraulich", "Unterschiedliche Zielpopulationen können dieselben Kriterien anders wirken lassen."],
    ["Welche Lösung wurde vorgeschlagen?", "Gemeinsamer Kern und kontextspezifische Ergänzungen", "Keine gemeinsamen Kriterien", "Ausschließlich identische Kriterien ohne Ergänzungen", "Der Kompromiss kombiniert Standardisierung und Kontext."],
    ["Warum sollen die Annahmen offengelegt werden?", "Damit Außenstehende die Vergleichsgrenzen beurteilen können", "Damit Berichte kürzer werden", "Damit alle Ergebnisse gleich aussehen", "Die Offenlegung unterstützt die Einordnung durch Außenstehende."],
  ],
};

function scene(level: Level, mode: "p" | "a" | "b") {
  const index = mode === "p" ? 0 : mode === "a" ? 1 : 2;
  const [text, items] = read[level][index];
  const key = `${level.toLowerCase()}-${mode}` as keyof typeof scripts;
  return [
    ...items.map((item, i) => ({ ...choice(`${key}-r-${i}`, level, "Lesen", item), text })),
    ...listen[key].map((item, i) => ({ ...choice(`${key}-l-${i}`, level, "Hören", item), audio: `/audio/${key}.mp3` })),
  ];
}
export const scenePractice = levelOrder.flatMap((level) => scene(level, "p"));
export const examQuestions = (level: Level, variant: "A" | "B") => scene(level, variant === "A" ? "a" : "b");

const d0Text = "Hallo Anna, ich bin am Mittwoch in der Uni. Mein Deutschkurs beginnt um neun Uhr. Danach gehe ich mit Paul in die Mensa. Am Nachmittag arbeite ich zu Hause. Ich habe um halb vier einen Termin mit meiner Kollegin. Hast du am Donnerstag Zeit? Wir können uns um sechs Uhr am Bahnhof treffen. Viele Grüße, Lara";
const d0: [string, string, string, string, string][] = [
  ["В какой день Лара в университете?", "В среду", "Во вторник", "В четверг", "Am Mittwoch in der Uni."],
  ["Во сколько начинается курс?", "В девять", "В три", "В шесть", "Um neun Uhr."],
  ["С кем она идёт в столовую?", "С Паулем", "С Анной", "С коллегой", "Mit Paul in die Mensa."],
  ["Где она работает после обеда?", "Дома", "В университете", "На вокзале", "Am Nachmittag arbeite ich zu Hause."],
  ["Во сколько встреча с коллегой?", "15:30", "16:30", "14:30", "Halb vier — половина четвёртого."],
  ["Когда и где она предлагает встретиться с Анной?", "В четверг в 18:00 на вокзале", "В среду в 18:00 в столовой", "В четверг в 15:30 в университете", "Am Donnerstag um sechs Uhr am Bahnhof."],
  ["На какой день перенесена встреча?", "Пятница", "Четверг", "Суббота", "Der Termin ist jetzt am Freitag."],
  ["Во сколько она теперь начинается?", "10:30", "11:30", "10:00", "Halb elf — 10:30."],
  ["На каком этаже новая комната?", "Первый этаж (erster Stock)", "Второй этаж", "Erdgeschoss", "Im ersten Stock."],
  ["Какой у комнаты номер?", "112", "102", "120", "Raum einhundertzwölf."],
  ["Что нужно взять с собой?", "Удостоверение личности", "Учебник", "Ноутбук", "Bringen Sie bitte Ihren Ausweis mit."],
];
export const diagnostic = d0.map((item, i): Question => ({
  ...choice(`d0-${i}`, "A1", i < 6 ? "Lesen" : "Hören", item),
  ...(i < 6 ? { text: d0Text } : { audio: "/audio/d0.mp3" }),
}));

const dictations = [
  ["w01_1", "Hallo, ich heiße Lena."],
  ["w01_2", "Ich studiere Informatik und arbeite mit Daten."],
  ["w01_3", "Heute lerne ich Deutsch."],
  ["w01_4", "Der Kurs beginnt um neun Uhr."],
  ["w02_1", "Guten Tag."],
  ["w02_2", "Ich möchte einen Termin vereinbaren."],
  ["w02_3", "Geht es auch am Donnerstag? Ja, um halb drei."],
  ["w02_4", "Vielen Dank, das passt mir."],
  ["w03_1", "Gehen Sie zuerst geradeaus."],
  ["w03_2", "Dann nehmen Sie die zweite Straße rechts."],
  ["w03_3", "Die Bibliothek ist neben dem Café."],
];
export const dictation = dictations.map(([audio, script], i) => ({
  ...fill(`diktat-${i}`, "A1", "Hören", ["Запиши фразу или короткий диалог, который услышишь.", script, "Проверь заглавные буквы, умлауты и знаки внутри фразы. Конечная точка не влияет на результат."]),
  audio: `/audio/${audio}.mp3`, exact: true,
}));
