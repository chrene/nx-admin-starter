NxAdminStarter

Full-stack starter for B2B admin apps using Nx, Angular, NestJS, Prisma, and Postgres.

⸻

Workflow

1. Clone & install

git clone <repo-url>
cd admin-starter
pnpm install

2. Start database

docker compose up -d admin-starter-db

Database runs on localhost:5432 with credentials from .env.

3. Prisma (generate, migrate, seed)

pnpm prisma:generate
pnpm prisma:migrate

Default login: admin@example.com / admin123

4. Run apps

pnpm dev # runs API and Web together

    •	API → http://localhost:3333/api
    •	Web → http://localhost:4200

5. Build & test

pnpm build
pnpm test

⸻

Features
• 🔐 JWT Auth (access & refresh tokens)
• 👥 Role-based access control (Admin/Manager/Viewer)
• 👤 User management CRUD
• 💳 Stripe billing stubs
• ✉️ Email via SMTP (Mailhog for dev)
• 📊 Angular admin dashboard
• 📦 Nx monorepo with libs for clean separation
• 🚀 Docker & GitHub Actions CI ready

⸻

Project structure

apps/ # thin shells for api + web
libs/api/_ # NestJS feature modules (auth, users, billing...)
libs/web/_ # Angular feature modules (dashboard, users...)
prisma/ # schema & seed

⸻

Quick start

# one-liner

pnpm install && docker compose up -d admin-db && pnpm prisma:migrate && pnpm dev

Login → http://localhost:4200 with admin@example.com / admin123

⸻

Next steps
• Add more Angular feature libs for your product entities.
• Implement Stripe webhook handling.
• Add audit logging and reporting.
• Deploy via Dockerfiles (Dockerfile.api / Dockerfile.web).
