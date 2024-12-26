# PraiseConnect

✨ Die Open-Source Plattform des PraiseCamps um neue Connections zu knüpfen

## Der Grund

PraiseConnect wurde als Prototyp erstellt weil ich einige Inputs bekam, dass es doch cool wäre eine Plattform zu haben um neue Personen durch Aktivitäten zu finden.

## Tech Stack

Frontend:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwindcss](https://tailwindcss.com/)

Backend & Datenbank:
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

Anderes:
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass) (MongoDB GUI)
- [Mailgun](https://www.mailgun.com/) (E-Mail API)
- [Infomaniak](https://www.infomaniak.com/de) (Domain & E-Mail Anbieter)
- [Vercel](https://vercel.com/) (Hosting)
- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) (MongoDB Cloud Datenbank)


## Mithelfen

Wenn du denkst du hast ein Fehler gefunden oder du möchtest irgendetwas optimieren, dann folge diesem Guide für das aufsetzten von PraiseConnect lokal.

## Installation

Installiere Node:\
[https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)

Installiere Git:\
[https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Installliere die MongoDB Community Edition:\
[https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/)

Installiere MongoDB Compass (optional):\
[https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass)

Klone das Git Repository:\
`git clone https://github.com/ly-schneider/PraiseConnect`

Gehe in den Ordner:\
`cd PraiseConnect`

Installiere die Module:\
`npm install`

Erstelle eine `.env.local` Datei im Hauptverzeichnis

### Umgebungsvariablen

- `MONGODB_URI`: Eine URI für die Datenbank Verbindung. Nutze dazu: `mongodb://localhost:27017/praiseconnect`
- `JWT_SECRET`: Ein frei wählbarer Schlüssel für die Ver- und Entschlüsslung des JWT Tokens
- `NEXT_PUBLIC_API_URL`: Eine URL für die Backend Verbindung. Nutze dazu: `http://localhost:3000/api`
- `MAILGUN_API_KEY` & `MAILGUN_DOMAIN` (optional): Wenn du Lust auf einen E-Mail Anbieter hast, kannst du Mailgun verwenden und diese Werte ausfüllen.

### MongoDB Compass

Verifiziere das MongoDB als Service im Hintergrund läuft. Dies sollte eigentlich nach der Installation von MongoDB Community Edition bereits der Fall sein. 

Starte MongoDB Compass. Sobald du zum "New Connection" Bildschirm kommst füge die URI: `mongodb://localhost:27017/praiseconnect` ein und verbinde dich.

### Viel Spass

Um richtig loszulegen starte jetzt noch die Next Entwicklungsumgebung mit `npm run dev` im Hauptverzeichnis.