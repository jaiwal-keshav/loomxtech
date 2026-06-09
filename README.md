# LoomX Technologies — Website

> **From Idea to App, We Make It Happen.**
> Product-minded engineering, human-centered design and scalable systems for startups and growing businesses.

A modern, fast, dark-themed marketing site + lead/blog backend for **LoomX Technologies**
(Chhatrapati Sambhajinagar & Pune).

## Tech Stack

| Layer      | Tech                                                        |
|------------|-------------------------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion, React Router   |
| Backend    | Spring Boot 3 (Java 17), Spring Security + JWT, Spring Data JPA |
| Database   | MySQL 9.x                                                   |

## Features

- Animated, responsive dark/neon UI
- Pages: Home, Services, Why Us, About, Blog, Contact, Book Consultation, Book Service
- Lead capture: consultations, service requests, contact messages (stored in MySQL)
- Admin panel (`/admin`, JWT-protected): dashboard, view leads, full blog CRUD
- Public blog rendered from admin-authored Markdown

---

## Prerequisites

- **Java 17+** (JDK 22 works too)
- **Node.js 18+**
- **MySQL 9.x** running locally (default: `127.0.0.1:3306`, user `root`, password `root`)
  - The app auto-creates the `loomx_db` database on first run.

---

## Running locally

### 1. Backend (Spring Boot)

```bash
cd backend
# Using IntelliJ: open backend/pom.xml as a Maven project, then run LoomxApplication.
# Or from the terminal using the bundled Maven wrapper (no global Maven needed):
./mvnw spring-boot:run      # macOS/Linux
mvnw.cmd spring-boot:run    # Windows
```

Backend starts on **http://localhost:8080**.

On first run it seeds a default admin and a sample blog post:

| Field    | Value        |
|----------|--------------|
| Username | `admin`      |
| Password | `Admin@123`  |

> Change these via env vars `ADMIN_USERNAME` / `ADMIN_PASSWORD` (and `JWT_SECRET`) in production.

#### Configurable env vars (optional)

| Variable        | Default                                  |
|-----------------|------------------------------------------|
| `DB_URL`        | `jdbc:mysql://127.0.0.1:3306/loomx_db?...`|
| `DB_USERNAME`   | `root`                                   |
| `DB_PASSWORD`   | `root`                                   |
| `SERVER_PORT`   | `8080`                                   |
| `JWT_SECRET`    | (dev default — change in prod)           |
| `CORS_ORIGINS`  | `http://localhost:5173,http://localhost:3000` |

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend starts on **http://localhost:5173**. The Vite dev server proxies `/api`
to the backend, so no extra config is needed.

- Public site: http://localhost:5173
- Admin panel: http://localhost:5173/admin (login with the seeded admin)

### 3. Production build (frontend)

```bash
cd frontend
npm run build      # outputs to frontend/dist
npm run preview    # preview the production build
```

For production, set `VITE_API_URL` to the backend's public URL (see `.env.example`).

---

## API Overview

**Public**
- `POST /api/consultations` — book a consultation
- `POST /api/service-requests` — request a service
- `POST /api/contact` — contact message
- `GET  /api/blog` — list published posts
- `GET  /api/blog/{slug}` — single post
- `POST /api/auth/login` — admin login → JWT

**Admin** (require `Authorization: Bearer <token>`)
- `GET /api/admin/summary`
- `GET /api/admin/consultations` · `/service-requests` · `/contacts`
- `GET/POST/PUT/DELETE /api/admin/blog` — blog management

---

## Project structure

```
loomxTechnologies/
├── backend/    # Spring Boot + MySQL
└── frontend/   # React + Vite + Tailwind
```

> **Docker:** intentionally deferred — to be added later.

## Customization

- Company info, services, and content: `frontend/src/data/site.js`
- Theme colors & animations: `frontend/tailwind.config.js`
- Replace placeholder email/phone/address in `site.js` with real values.

---

© LoomX Technologies
