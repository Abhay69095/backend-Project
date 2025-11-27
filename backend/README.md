# Auth & RBAC Backend (Node.js + Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET).
2. Install:
   npm install
3. Start dev:
   npm run dev
4. Seed an admin user:
   npm run seed:admin
   (creates admin@demo.com with password Admin@123)

## Endpoints
- POST /api/auth/register
  body: { name, email, password, role? }
- POST /api/auth/login
  body: { email, password }
- GET /api/profile
  headers: Authorization: Bearer <token>
- GET /api/admin/users
  headers: Authorization: Bearer <admin-token>

## Notes
- JWT token returned at login/register: send as `Authorization: Bearer <token>`.
- Role-based middleware: `permit('admin')` protects admin-only routes.
- Extend this by connecting your CRUD entity routes and applying `authenticate` and `permit` as required.

Security & scalability suggestions:
- Use HTTPS in production.
- Use short-lived access tokens + refresh tokens stored as httpOnly cookies.
- Rate-limit critical endpoints.
- Store JWT secret in a secure vault.
- Add request-logging & centralized structured logging (e.g., Winston).
- For scaling: separate auth service (microservice), store sessions/refresh tokens in Redis, and add load-balancer and autoscaling.

Swagger UI is available at: `/api-docs`.

