# WelZone - Mental Wellness Counseling Platform

A full-stack mental wellness counseling platform built with **Spring Boot**, **React**, and **MySQL**. Users can browse wellness courses, track daily moods, book counseling sessions, chat with counselors, read curated blogs, and give feedback.

## Live Demo

| Tier  | URL |
|-------|-----|
| Frontend | `https://welzone.vercel.app` |
| Backend API | deployed on Koyeb (see setup below) |

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Chart.js, React Router, Axios |
| Backend  | Java 21, Spring Boot 3.3, Spring Security, JWT (jjwt) |
| Database | MySQL (schema + seed auto-applied on startup) |
| Realtime | Spring WebSocket |

## Features

- User & counselor registration/login with JWT authentication
- Mental wellness course catalog with enrollment tracking
- Daily mood tracker with analytics charts
- Session booking system with available slots
- Blog platform with reading-time tracking
- In-session chat (WebSocket) and feedback/comments
- Audit logging for course & feedback activity

## Architecture

```
project_frontend/   React + Vite SPA  -> served on Vercel (free, always-on)
WelZoneApp/         Spring Boot REST API -> served on Koyeb free tier (Docker)
MySQL               Managed database on Aiven free tier (1 GB)
```

The backend is fully env-driven, so credentials never live in the repo:

```
MYSQLHOST, MYSQLPORT, MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD
CORS_ALLOWED_ORIGINS     (comma-separated frontend origins)
```

`spring.sql.init` automatically executes `schema.sql` and `seed.sql` on first startup, so no manual database setup is needed.

## Run Locally

### Backend (WelZoneApp)

```bash
cd WelZoneApp
mvn spring-boot:run
```

Default connection: `localhost:3306/welzoneapp` (user/pass `root`). Configure via env vars if needed.

### Frontend (project_frontend)

```bash
cd project_frontend
npm install
npm run dev
```

The app reads `VITE_API_URL` (default `http://localhost:8080`) at build time (see `src/config.js`).

## Free Deployment Guide

All three tiers run on no-expiry free plans - no credit card required.

1. **Database - Aiven Free MySQL** ([aiven.io](https://aiven.io))
   Create a free MySQL service (1 GB). Copy the host, port, database name, and user/password credentials from the connection tab.

2. **Backend - Koyeb Free Web Service** ([koyeb.com](https://koyeb.com))
   - Create a new Web Service connected to this GitHub repo
   - Dockerfile detected automatically; set **Builder = Dockerfile**, Root directory = `WelZoneApp`
   - Add the env vars from Aiven (`MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`) plus `CORS_ALLOWED_ORIGINS=https://welzone.vercel.app`
   - Health check path: `/courses`
   - Free instance wakes in 1-5s after idle (kept awake by the included GitHub Actions workflow - set the `KOYEB_BACKEND_URL` repo secret)

3. **Frontend - Vercel** ([vercel.com](https://vercel.com))
   - Import this repo; framework = **Vite / React`, Root directory = `project_frontend`
   - Add build-time env var `VITE_API_URL = https://<your-koyeb-backend-url>`
   - Deploy; your site is live at `https://welzone.vercel.app`

## Repository Layout

```
├── WelZoneApp/            Spring Boot backend (Dockerfile, Railway-ready)
├── project_frontend/      React + Vite frontend (Dockerfile, Railway-ready)
└── .github/workflows/     Backend keep-alive so the free tier stays warm
```