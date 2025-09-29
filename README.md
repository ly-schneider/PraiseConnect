<div align=center><img src="https://github.com/user-attachments/assets/7b054b13-4ed1-41a2-80f9-025059753b58" style="width: 600px; height: 155px" /></div>

# PraiseConnect

✨ *A prototype social platform built for PraiseCamp to help participants connect through shared activities.*

## Overview

PraiseConnect was built as a prototype after hearing feedback from participants that it would be great to have a platform to discover and connect with new people at the event.

It was **launched publicly at [www.praiseconnect.ch](http://www.praiseconnect.ch)** but never actively marketed, and therefore remained more of an experiment than a fully adopted product.

The platform allows users to:

* Browse activities and meet others with shared interests.
* Create connections in a structured but lightweight way.
* Experience a modern, serverless web stack from end to end.

## Tech Highlights

* **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
* **Backend**: Next.js Route Handlers (API routes), [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/)
* **Infrastructure & Services**: [Vercel](https://vercel.com/) (hosting), [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) (cloud database), [Mailgun](https://www.mailgun.com/) (emails), [Infomaniak](https://www.infomaniak.com/) (domain & mail services)
* **Tooling**: [MongoDB Compass](https://www.mongodb.com/products/tools/compass) for local database exploration

> 💡 **Note for developers**: The codebase is organized to allow quick iteration. Configurations are handled via environment variables for database, JWT authentication, and optional email integration.

## Quick Start (Developer Notes)

If you’d like to run the project locally:

```bash
# Clone the repository
git clone https://github.com/ly-schneider/PraiseConnect
cd PraiseConnect

# Install dependencies
npm install
```

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/praiseconnect
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Optional Mailgun settings
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
```

Then run the development server:

```bash
npm run dev
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

## Why It Matters

Although PraiseConnect remained a prototype with limited exposure, it demonstrates:

* Designing and launching a **full-stack production-ready app**.
* Deploying a complete **serverless architecture** with modern tooling.
* The ability to **take an idea from feedback → prototype → live product**, even without marketing efforts.
