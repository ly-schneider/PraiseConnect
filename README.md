<div align=center><img src="https://github.com/user-attachments/assets/7b054b13-4ed1-41a2-80f9-025059753b58" style="width: 600px; height: 155px" /></div>

# PraiseConnect

PraiseConnect — a Next.js + MongoDB social app for discovering people with similar interests and starting chats around posts.

## TL;DR

- Problem: Event participants struggle to discover like‑minded people and coordinate meetups.
- Outcome: Lightweight posts + chat around activities; JWT auth with protected routes; password reset via email.
- Stack: Next.js 15 (App Router), React 19, MongoDB + Mongoose 8, Tailwind, Mailgun (optional).
- Scope: Accounts, posts with activities, 1:1 chats, auth middleware; no media uploads or notifications.
- Standout: Clean server-side auth, simple data model, deploy‑ready API routes.
- Role: Lead engineer/writer; Solo

## Why This Project Exists

Motivation: Built as a prototype to help attendees at a large youth event quickly find others with similar interests (e.g., football, basketball) and coordinate meetups. The goal was to validate whether simple activity‑tagged posts plus direct messaging increases real‑world connections with minimal friction. While the public version was soft‑launched, the code demonstrates a clear, maintainable path to a production‑ready MVP.

## Key Features

- Account registration and login with secure password hashing (bcrypt) and JWT session cookies.
- Create posts with optional activity tags and browse a feed of posts.
- Start and continue 1:1 chats based on a post; messages stored with read status per participant.
- Password reset flow: token generation, email delivery (Mailgun), and password update.
- Auth middleware guarding routes; server components fetch with Authorization headers.

## Architecture at a Glance

- Next.js App Router serves UI and API Route Handlers in a single repo.
- MongoDB via Mongoose with global connection caching to avoid reconnect storms.
- JWTs signed with `jose`; cookie‑backed sessions read server‑side; Authorization header sent for API fetches.
- Optional Mailgun client for password reset emails; degrades gracefully if keys are missing.
- Middleware redirects based on auth state; public policy pages bypass.

```
User Browser
   |
   v
Next.js App (UI)
   |  (fetch /api/* with JWT)
   v
Route Handlers (API)
   |-- read/write --> MongoDB
   `-- send reset --> Mailgun
```

Mini ADR: Auth
- Context: Need SSR‑friendly auth for API routes and UI redirects.
- Decision: JWT signed with `jose`; stored in httpOnly cookie; server reads session, clients include `Authorization` when needed.
- Consequences: Simple and portable; no server session store; ensure CSRF mitigations where state‑changing actions occur.

## Tech Stack

- Next.js 15: App Router, Route Handlers, middleware.
- React 19: Client/server components.
- Tailwind + Radix UI: Styling and accessible UI primitives.
- MongoDB + Mongoose 8: Document models for `Account`, `Post`, `Chat`, `PasswordReset`.
- jose: JWT sign/verify for auth; 7‑day expiry.
- bcrypt: Secure password hashing and verification.
- Mailgun.js: Email delivery for password reset (optional).

## Quickstart (Developers)

Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)

Setup
```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` (minimal local example):
```env
MONGODB_URI=mongodb://localhost:27017/praiseconnect
JWT_SECRET=replace-with-a-long-random-string
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Optional email
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
```

Run
```bash
npm run dev
# open http://localhost:3000
```

Demo data
- Register a user via UI at `/registrieren` or via API (see below).

Common scripts
- `npm run dev`: Start dev server (Turbopack).
- `npm run build`: Production build.
- `npm run start`: Start production server.
- `npm run lint`: ESLint check.

## Configuration & Environment Variables

| NAME                | Required | Default | Description |
|---------------------|----------|---------|-------------|
| `MONGODB_URI`       | Yes      | —       | MongoDB connection string. Module throws if unset. |
| `JWT_SECRET`        | Yes      | —       | Secret used to sign/verify JWTs (jose). |
| `MAILGUN_API_KEY`   | No       | —       | Mailgun API key for password reset emails. If unset, emails are skipped. |
| `MAILGUN_DOMAIN`    | No       | —       | Mailgun domain used as sender. Required if API key is set. |
| `NEXT_PUBLIC_API_URL` | Yes    | —       | Base URL used in email links (e.g., `http://localhost:3000/api`). |

Secrets handling
- Use `.env.local` for local dev; do not commit.
- In production, set env vars via your hosting provider (e.g., Vercel env, Atlas connection string).

## API Overview (If Applicable)

Auth
- `POST /api/auth/login` — Body: `{ email, password }` → Header `accessToken: Bearer <JWT>`, JSON `{ success: true }`.

Accounts
- `POST /api/accounts` — Register. Body: `{ email, password, name, birthdate, terms }` → Header `accessToken`, `201`.
- `GET /api/accounts/id/:id` — Get account (auth). Returns account without password.
- `PUT /api/accounts/id/:id` — Update self (auth). If email changes, returns new `accessToken`.
- `GET /api/accounts/email?email=...` — Check availability (auth). Returns `{ success: boolean }`.

Password Reset
- `POST /api/accounts/password-reset` — Start reset. Body: `{ email }`. Creates token; emails via Mailgun if configured.
- `GET /api/accounts/password-reset?guid=...` — Validate token.
- `PUT /api/accounts/password-reset` — Reset password. Body: `{ guid, password }`.

Posts
- `GET /api/posts` — List posts (auth). Populates `account { name, birthdate }`.
- `POST /api/posts` — Create post (auth). Body: `{ content, activities?: string[] }`.
- `GET /api/posts/id/:id` — Get post by id (auth).
- `DELETE /api/posts/id/:id` — Delete own post (auth/author only).

Chats
- `GET /api/chats` — List chats for current user (auth). Populates participants and message senders.
- `POST /api/chats` — Start or continue chat linked to a post. Body: `{ postId, content }`.
- `GET /api/chats/id/:id` — Fetch a chat you participate in (auth).
- `POST /api/chats/id/:id` — Send message. Body: `{ content }`.

Example: Login then list posts
```bash
# Login
TOKEN=$(curl -s -i -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"secret"}' | awk -F' ' '/accessToken:/ {print $3}')

# List posts
curl -s http://localhost:3000/api/posts -H "Authorization: Bearer $TOKEN"
```

## Data Model

- `Account` — `{ email (unique), password (hashed), name, birthdate, terms, createdAt, updatedAt }`.
- `Post` — `{ content, activities: string[], account: ref<Account>, createdAt, updatedAt }`.
- `Chat` — `{ participants: ref<Account>[], messages: [{ sender: ref<Account>, content, createdAt }], readBy: Map<accountId, Date> }`.
- `PasswordReset` — `{ guid, email, validUntil }`.

```
[Account] 1 ---- * [Post]
[Account] N ---- N [Chat.participants]
[Chat]   1 ---- * (messages subdocuments)
[Post]   1 ---- * [Chat]   (chats can originate from posts)

PasswordReset: { guid, email, validUntil }
```

Notes
- Unique index on `Account.email`.
- `Chat.messages` stored as subdocuments; `readBy` tracks last read per participant.

## Testing & Quality

- Linting: `npm run lint` (Next.js ESLint config).
- Type safety: TypeScript strict mode; DTOs for API payloads.
- No automated tests included.

## Performance & Observability

- DB Connection Caching: Global Mongoose connection cache prevents reconnect churn across hot reloads.
- JWT Expiry: 7 days; middleware logs out on expiry. Keep tokens short‑lived for security.
- Logging: Server logs via `console.error`; no metrics/tracing configured.

## Limitations & Trade-offs

- No file uploads, images, or notifications.
- No pagination or search on posts/chats.
- Email delivery optional; if Mailgun is not configured, reset tokens are created but emails aren’t sent.
- No rate limiting or advanced abuse protections on APIs.
- Session is cookie‑backed JWT;

## Roadmap

- Add pagination and activity filters server‑side for the posts feed.
- Profile pages with avatars and basic bios.
- Message read receipts surfaced in UI; typing indicators.
- E2E tests for auth, posting, and chat flows.
- Observability: structured logging and request metrics.

## License (Source-Available)

This repository is provided as source‑available for portfolio review and local evaluation. You may:

- Read/browse the code and run it locally.

Restrictions:

- Not licensed for redistribution, commercial, or production use. Contact the author for other uses or a commercial license.
