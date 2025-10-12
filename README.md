This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# s2c / Niheal

Full‑stack app with a Next.js frontend and an Express + PostgreSQL backend. This README explains how to set up the database, configure environment variables, install dependencies, and run both servers locally on Windows using a bash shell.

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ (bundled with Node)
- PostgreSQL 14+ (with `psql` CLI on PATH)
- Git (optional)

## Repository structure

- `front-end/` — Next.js 15 app (React 19)
- `back-end/` — Express API server, Passport auth, PostgreSQL (`pg`)
- `dbSetup.sql` — One‑time SQL to create tables and seed coefficients/data
- `package.json` (root) — convenience scripts, concurrently

## 1) Database setup

You can use the provided SQL script to create schema and seed data. The comments in `dbSetup.sql` show a flow; here is a condensed set of steps.

- Start `psql` as a superuser and create an application role and database:

```bash
psql -U postgres -d postgres
```
Then in psql:
```sql
CREATE USER amdg WITH PASSWORD '12345' CREATEDB;
CREATE DATABASE niheal OWNER amdg;
\q
```

- Connect as the app user and run the setup script:

```bash
psql -U amdg -d niheal
```
In psql, run:
```sql
\i 'dbSetup.sql'
```
Notes:
- If `\i 'dbSetup.sql'` cannot find the file, provide the absolute path to `dbSetup.sql` in your workspace (e.g., `D:/.../s2clagi/dbSetup.sql`).
- You can re‑run the script; it uses IF NOT EXISTS and safe inserts.

## 2) Backend configuration

The backend reads environment variables from `back-end/.env` via `dotenv`.

1) Copy the example and adjust values:
```bash
cp back-end/.env.example back-end/.env
```
2) Choose ONE of the following:
- Set `DATABASE_URL` (easiest), e.g.
  - `DATABASE_URL=postgresql://postgres.hklqevfohnifnkvrisdv:Td4EnnpceLBZEwl4@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres`
- Or set discrete values: `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`

3) SSL: Set `DB_SSL=true` only if your Postgres requires SSL (managed providers). For local dev, keep `false`.

The backend server listens on port 4000 by default. CORS is configured to allow `http://localhost:3000` and `http://localhost:3001` and uses cookie‑based sessions for auth.

## 3) Install dependencies

From the repo root:
```bash
npm install
npm install --prefix back-end
npm install --prefix front-end
```

## 4) Run in development

- Option A: run both servers together from the root using concurrently:
```bash
npm run dev
```
This runs:
- Frontend: Next.js dev server at `http://localhost:3000`
- Backend: Express server at `http://localhost:4000`

- Option B: run separately in two terminals:
```bash
# Terminal 1 (backend)
npm run dev --prefix back-end

# Terminal 2 (frontend)
npm run dev --prefix front-end
```

## 5) Quick health checks

- Backend API ping:
```bash
curl -i http://localhost:4000/api/
```
- Frontend should load at:
```
http://localhost:3000
```
- Frontend–backend base URL is defined in `front-end/src/lib/api.js` as `http://localhost:4000` and uses credentials (cookies). Ensure ports align.

## 6) Common tasks

- Register and Login: use the frontend UI. The backend endpoints are under `/api/*` and require cookies for auth.
- Uploads: profile pictures are stored under `back-end/uploads/`. The backend serves them at `/uploads/*`.
- Profiles: update via `/api/profile` (PUT). The backend joins `users` and `profiles` when reading.
- Risk tests: available tests via `/api/risk-tests`; calculations at `/api/calculate-ascvd`, `/api/calculate-cancer`, `/api/calculate-kfre`; history at `/api/test-history`.

## 7) Troubleshooting

- psql cannot connect:
  - Ensure PostgreSQL service is running.
  - Verify credentials and port in `.env`.
- `\i 'dbSetup.sql'` fails with path error:
  - Use an absolute Windows path like `D:/path/to/s2clagi/dbSetup.sql`.
- CORS or auth issues in browser:
  - Confirm frontend runs at `http://localhost:3000` and backend at `http://localhost:4000`.
  - Cookies require sameSite Lax and credentials include; avoid different hostnames.
- Build issues after package installs:
  - Delete `node_modules` and `package-lock.json` in affected app and reinstall.

## 8) Production notes (high level)

- Set strong session secret and secure cookies behind HTTPS.
- Provide a managed Postgres connection string and set `DB_SSL=true` if required.
- Serve frontend via `next build && next start` and run backend with a process manager (PM2/systemd) behind a reverse proxy.

---

Happy hacking! If you get stuck, share the error and your `.env` (without secrets) for help.

