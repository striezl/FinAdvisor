import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next"
                }
            },
            de: {
                translation: {
                    "Actual": "Ist",
                    "Target": "Soll",
                    "Debts": "Schulden",
                    "Description": "Beschreibung",
                    "Value": "Wert",
                    "Please list all your assets and debts.": "Bitte alle Deine Vermögens- und Schuldenpositionen auflisten.",
                    "Enter all currency amounts in Euro (€).": "Alle Währungsbeträge in Euro (€) eingeben.",
                    "Asset type": "Anlagenklasse",
                    "Your net worth: ": "Dein Nettovermögen: ",
                    "Assets actual/target %": "Vermögen Ist/Soll %",
                    "Add": "Weitere",
                    "Delete": "Löschen",
                    'Asset distribution': "Vermögensverteilung",
                    "Stocks": "Aktien",
                    "Example: ETF MSCI World": "Beispiel: ETF MSCI World",
                    'Bonds': 'Anleihen',
                    'Real Estate': 'Immobilien',
                    'Cash': 'Cash',
                    'Savings at Bank': 'Bankeinlagen',
                    'Tangibles': 'Sachwerte',
                    'Cryptos': 'Krypto',
                    'Others': 'Andere',
                    'Loan: Real Estate': 'Kredit: Immobilien',
                    'Loan: Consumer': 'Kredit: Konsum',
                    'Loan: Others': 'Kredit: Andere',
                    'Investor profile': 'Anlegerprofil',
                    'Assets and debts': 'Vermögen und Schulden',
                    'Analysis': 'Analyse',
                    'Save': 'Speichern',
                    'Reset': 'Zurücksetzen',
                    'Finish': 'Beenden',
                    'Next': 'Weiter',
                    'Back': 'Zurück',
                    'To start, please give us some personal data to describe your profile as an investor.': "Zu Beginn gib uns bitte einige persönliche Daten, um Dein Anlegerprofil zu beschreiben.",
                    "Risk profile": "Risikoprofil",
                    'Gross income annually ca.': "Bruttojahreseinkommen ca.",
                    'Year of Birth': "Geburtsjahr",
                    'Children': "Kinder",
                    'Focus on safety': "Fokus auf Sicherheit",
                    'Balanced': "Ausgewogen",
                    'Focus on yield': "Fokus auf Rendite",
                    'Main investment duration': "Hauptsächliche Anlagedauer",
                    "Short term 0 - 3 years": "Kurzfristig 0 - 3 Jahre",
                    'Mid term 3 - 6 years': "Mittelfristig 3 - 6 Jahre",
                    'Long term 6+ years': "Langfristig 6+ Jahre",
                    "Married": "Verheiratet",
                    "Save file locally": "Datei lokal speichern",
                    'Here you have the possibility to save your entries to reuse them later.': 'Hier hast Du die Möglichkeit, Deine Eingaben zu sichern, um sie später wiederzuverwenden.',
                    'Currently, the export as a file to your computer is possible, more saving options will follow in the future. The file "{{fn}}" contains the data you entered in plain text, remember to protect it accordingly.': 'Aktuell ist der Export als Datei auf Deinen Rechner möglich, weitere Speicheroptionen werden in Zukunft folgen. Die Datei "{{fn}}" enthält die von Dir angegebenen Daten im Klartext, denke daran sie entsprechend zu schützen. ',
                    'You have already saved an analysis?': 'Du hast bereits eine Analyse gespeichert?',
                    'That`s great, please upload the .json file here. The filename might be "{{fn}}".': 'Großartig, bitte die .json-Datei hier hochladen. Der Dateiname könnte "{{fn}}" lauten.',
                    'Upload File': 'Datei hochladen',
                    'Net income monthly ca.': 'Nettoeinkommen monatlich ca.',
                    'Seven golden steps to balanced wealth distribution.': 'Sieben goldene Schritte zu einer ausgewogenen Vermögensverteilung.',
                    'Purely informative - investment is at your own risk.': 'Rein informativ - Anlage erfolgt auf eigenes Risiko.',
                    '#1: Get an overview':'#1: Überblick verschaffen',
                    'You`ve already recorded your assets and liabilities, great! Your net worth is {{netWorth}} €. You can find the distribution among the asset classes in the charts. Go back one step if you want to change something.':'Du hast Deine Schulden und Dein Vermögen bereits erfasst, toll! Dein Nettovermögen beträgt {{netWorth}} €. Die Verteilung auf die einzelnen Anlageklassen findest Du in den Charts. Gehe einen Schritt zurück, wenn du etwas ändern möchtest.',
                    '#2: Repay expensive loans, build up liquidity reserve':'#2: Teure Kredite zurückzahlen, Liquiditätsreserve aufbauen',
                    'Your cash (cash, current account, call money) amounts to {{cash}} €, which is {{cashIncomeRatio}} times your monthly income. Generally a {{trendCashIncome}} factor of {{targetCashIncomeRatio}} is recommended.':'Dein Barvermögen (Bargeld, Girokonto, Tagesgeld) beläuft sich auf {{cash}} €, was dem {{cashIncomeRatio}}-fachen Deines monatlichen Nettoeinkommens entspricht. Im Allgemeinen wird ein {{trendCashIncome}} Faktor von {{targetCashIncomeRatio}} empfohlen.',
                    'Your liabilities add up to {{totalDebts}} €. Amongst them are {{debtsConsumer}} € consumer and {{debtsOthers}} € other loans. If relevant and possible you may consider paying back expensive loans (interest rate > ~3%).':'Deine Verbindlichkeiten belaufen sich auf {{totalDebts}} €. Darunter befinden sich {{debtsConsumer}} € Verbraucherkredite und {{debtsOthers}} € sonstige Kredite. Falls relevant und möglich, kannst Du die Rückzahlung teurer Kredite (Zinssatz > ~3%) in Betracht ziehen.',
                    '#3: Stocks and bonds (ETFs)':'#3: Aktien und Anleihen (-ETFs)',
                    'You have invested {{stocks}} € in stocks, which is {{stockNetWorthRatio}}% of your total net worth. ':'Du hast {{stocks}} € in Aktien investiert, was {{stockNetWorthRatio}}% Deines gesamten Nettovermögens entspricht. ',
                    'According to your risk profile and target investment duration a {{trend}} quota of about {{riskProfileStocks}}% is recommended. ':'Entsprechend Deinem Risikoprofil und der angestrebten Anlagedauer wird eine {{trend}} Quote von ca. {{riskProfileStocks}}% empfohlen. ',
                    'For a broad investment in the stock market ETFs such as {{eSA}} (accumulating) are recommended. ':'Für eine breite Investition in den Aktienmarkt werden ETFs wie {{eSA}} (thesaurierend) empfohlen. ',
                    'If your excemption is not yet exceeded, consider a distributing alternative, such as {{eSD}}. ':'Wenn Dein Freistellungsauftrag noch nicht ausgeschöpft ist, ziehe eine ausschüttende Alternative wie {{eSD}} in Betracht. ',
                    'The latter covers only industrialized countries, hence you may want to add a smaller portion of emerging market stocks, e.g. with {{eSED}}. ':'Letzterer deckt nur Industrieländer ab, weshalb Du vielleicht einen kleineren Anteil an Schwellenländeraktien hinzufügen möchtest, z.B. mit {{eSED}}. ',
                    'Invest only a relatively small amount in individual shares, where you can live with a total loss if necessary. ':'Investiere nur einen relativ kleinen Betrag in einzelne Aktien, bei dem Du notfalls auch mit einem Totalverlust leben kannst. ',
                    'Another {{b}} € or {{bp}}% of your assets is invested in bonds. ':'Weitere {{b}} € oder {{bp}}% Deines Vermögens sind in Anleihen investiert. ',
                    'Pursuant to your risk profile and target investment duration a {{trend}} quota of about {{rPS}}% is recommended. ':'Ausgehend von Deinem Risikoprofil und der angestrebten Anlagedauer wird eine {{trend}} Quote von etwa {{rPS}}% empfohlen.',
                    'Investments in the bond market should also be as diversified as possible. An ETF with global bonds of good to medium credit quality (investment grade) is the {{eSA}} (accumulating). ':'Auch in den Anleihenmarkt sollte möglichst diversifiziert angelegt werden. Ein ETF mit weltweiten Anleihen guter bis mittlerer Bonität (Investment Grade) ist der {{eSA}} (akkumulierend). ',
                    '#4: Savings at bank':'#4: Bankeinlagen',
                    'You have invested {{am}} € or {{per}}% in classic bank products such as time deposits, bank savings plans and house savings or classic pension and life insurances. ':'Du hast {{am}} € oder {{per}}% in klassische Bankprodukte wie Festgeld, Banksparpläne und Bausparen oder klassische Renten- und Lebensversicherungen investiert. ',
                    'According to your risk profile and target investment duration a {{trend}} quota of about {{rp}}% is recommended. ':'Deinem Risikoprofil und der angestrebten Anlagedauer entsprechend wird eine {{trend}} Quote von etwa {{rp}}% empfohlen.',
                    'Although bank products are generally not subject to price risk, they also usually provide only a minimal return. An exception can be lucrative old contracts, normally you should keep these, even if your bank or building society tries to get you out of the contract.':'Bankprodukte unterliegen zwar in der Regel keinem Kursrisiko, bieten aber auch meist nur eine minimale Rendite. Eine Ausnahme können lukrative Altverträge sein, die Du in der Regel behalten solltest, auch wenn Deine Bank oder Bausparkasse versucht, Dich aus dem Vertrag herauszubekommen.',
                    '#5: Real estate':'#5: Immobilien',
                    'You have invested {{am}} € or {{per}}% in real estate, including residential property for own use or capital investment, real estate funds and real estate shares. ':'Du hast {{am}} € oder {{per}}% in Immobilien investiert, wie beispielsweise Wohnimmobilien zur Eigennutzung oder als Kapitalanlage, Immobilienfonds oder Immobilienaktien. ',
                    'When investing in an apartment or a house, the share of total assets typically becomes large quickly. This is no cause for concern, only a further investment in real estate should be well considered if the share is significantly above the target value.':'Bei Investitionen in eine Wohnung oder ein Haus wird der Anteil am Gesamtvermögen in der Regel schnell groß. Dies ist kein Grund zur Besorgnis, nur sollte eine weitere Anlage in Immobilien gut überlegt sein, wenn der Anteil deutlich über dem Zielwert liegt.',
                    'If only indirect real estate ownership is created with funds or shares, the share should rather be chosen lower, about 5% of the total assets are enough.':'Wird nur indirektes Immobilieneigentum mit Fonds oder Aktien geschaffen, sollte der Anteil eher niedriger gewählt werden, etwa 5% des Gesamtvermögens sind ausreichend.',
                    '#6: Tangibles':'#6: Sachwerte',
                    'You have invested {{am}} € or {{per}}% in tangibles, such as gold, arts and vintage cars. ':'Du hast {{am}} € oder {{per}}% in Sachwerte, wie Gold, Kunst und Oldtimer, investiert. ',
                    'If you are considering investing in tangible assets, keep in mind that they often do not provide an immediate return, are difficult to store and require expert knowledge.':'Wenn Du erwägst, in Sachwerte zu investieren, bedenke, dass diese oft keine unmittelbare Rendite abwerfen, schwer zu lagern sind und Expertenwissen erfordern.',
                    '#7: Crypto':'#7: Krypto',
                    'You have invested {{am}} € or {{per}}% in crypto currencies, such as bitcoin or Ethereum. ':'Du hast {{am}} € oder {{per}}% in Kryptowährungen wie bitcoin oder Ethereum investiert. ',
                    'Take note that this is still a young and largely unregulated form of investment. There may be opportunities, but there is great danger for the invested capital, a total loss is in the range of probable.':'Beachte, dass es sich um eine noch junge und weitgehend unregulierte Form der Geldanlage handelt. Es mag Chancen geben, aber es besteht eine große Gefahr für das eingesetzte Kapital, ein Totalverlust ist im Bereich des Wahrscheinlichen.',
                    'Bonus':'Bonus',
                    'Make sure that you submit an exemption order for capital gains to the bank. As an unmarried person, you are entitled to 801 € of tax-free income from capital assets per year. As a married couple, you are entitled to 1602 € of tax-free income per year. A separate exemption order can also be submitted for children; in addition, a non-assessment certificate can be submitted for them.':'Stelle sicher, dass Du einen Freistellungsauftrag für Kapitalerträge bei der Bank einreichst. Als unverheiratete Person hast Du Anspruch auf 801 € steuerfreie Einkünfte aus Kapitalvermögen pro Jahr. Als Ehepaar habt Ihr Anspruch auf 1602 € steuerfreie Einkünfte pro Jahr. Auch für Kinder kann ein eigener Freistellungsauftrag eingereicht werden; außerdem kann für sie eine Nichtveranlagungsbescheinigung vorgelegt werden.',
                    'Investing regularly for children is also worthwhile because of the cost average effect. Since it is usually a long-term savings goal, a higher proportion of shares (ETFs) can be utilized. Use a savings plan, for securities see recommendations for equity and bond ETFs in #3.':'Regelmäßiges Investieren für Kinder lohnt sich auch wegen des Cost-Average-Effekts. Da es sich in der Regel um ein langfristiges Sparziel handelt, kann ein höherer Anteil an Aktien (-ETFs) genutzt werden. Nutze einen Sparplan für Wertpapiere, siehe Empfehlungen für Aktien- und Renten-ETFs in #3.',
                    'A securities savings plan is also a simple, solid and promising way to save or provide for old age in the long term. For example, invest half in stocks and half in bonds ETFs, again as mentioned in #3. Check your monthly expenses, if you optimize them a bit, there is usually already potential for a savings plan.':'Ein Wertpapier-Sparplan ist auch ein einfacher, solider und chancenreicher Weg, um langfristig zu sparen oder für das Alter vorzusorgen. Investiere z.B. je eine Hälfte in Aktien- und Anleihen-ETFs, wieder wie in #3 erwähnt. Prüfe Deine monatlichen Ausgaben. Wenn Du sie ein wenig optimierst, gibt es meist schon Potenzial für einen Sparplan.',
                    'The Riester pension can be interesting for you, if you fulfill on of the following criteria: Children (if entitled to child benefits) or high income. If you are married and there is no direct entitlement, you or your partner may be eligible for a contract as indirect beneficiary. The Riester contract that promises the highest share quota is "UniProfiRente Select with UniGlobal II". Which is good, because the value of the shares cannot fall below the sum of the payments and allowances received.':'Die Riester-Rente kann für Dich interessant sein, wenn Du eines der folgenden Kriterien erfüllst: Kinder (sofern kindergeldberechtigt) oder hohes Einkommen. Wenn Du verheiratet bist und kein unmittelbarer Anspruch besteht, kann für Dich oder Deinen Partner ein Vertrag als mittelbar Begünstigter in Frage kommen. Der Riester-Vertrag, der die höchste Aktienquote verspricht, ist die "UniProfiRente Select mit UniGlobal II". Das ist gut, denn der Wert der Anteile kann nicht unter die Summe der Einzahlungen und Zulagen fallen.',
                    'Check whether you are entitled to capital formation benefits from your employer and, in addition, to employee savings allowance and housing subsidy from the state.':'Prüfe, ob Du Anspruch auf vermögenswirksame Leistungen Deines Arbeitgebers und darüber hinaus auf Arbeitnehmersparzulage und Wohngeld vom Staat hast.',
                    'Print': 'Drucken',
                    'Show on GitHub': 'Auf GitHub anzeigen',
                    'lower': 'niedrigere',
                    'higher': 'höhere'
                }
            }
        },
        lng: "de", //ToDo if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });