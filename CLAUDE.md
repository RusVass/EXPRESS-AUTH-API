# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # start with nodemon (auto-reload)
npm start      # start without auto-reload
```

No test runner or linter is configured.

## Environment

Copy `.env` and set:
- `PORT` — default `5000`
- `JWT_SECRET` — used for signing/verifying JWTs
- `CLIENT_URL` — CORS origin, default `http://localhost:5173`

## Architecture

The project uses **ES modules** (`"type": "module"` in package.json) and **Express 5**.

Request flow: `server.js` → `src/app.js` (middleware chain) → routes → controllers → services → in-memory data store.

### Layers

- **Routes** (`src/routes/`) — wire HTTP methods to controller functions; `userRoutes.js` applies `authMiddleware` to protected endpoints.
- **Controllers** (`src/controllers/`) — thin handlers wrapped in `catchAsync`; delegate all logic to services and return JSON responses.
- **Services** (`src/services/`) — business logic. Throw plain `Error` objects with a `statusCode` property for domain errors; `errorMiddleware` reads that property to set the HTTP status.
- **Data** (`src/data/users.js`) — exports a mutable in-memory array. **No database.** Data is lost on restart.
- **Middleware** (`src/middlewares/`):
  - `authMiddleware` — validates `Authorization: Bearer <token>` and attaches the decoded JWT payload to `req.user`.
  - `errorMiddleware` — global error handler; reads `error.statusCode` (falls back to 500).
  - `loggerMiddleware` — logs method + URL with timestamp.
- **Utils** (`src/utils/`):
  - `catchAsync` — wraps async controllers so thrown errors are forwarded to `next()`.
  - `jwt` — thin wrappers around `jsonwebtoken` sign/verify using `env.jwtSecret`; tokens expire in 1 hour.

### API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Create account (`name`, `email`, `password`) |
| POST | `/api/auth/login` | No | Returns JWT token |
| GET | `/api/users` | No | List all users (safe fields only) |
| GET | `/api/users/profile` | Bearer token | Current user's profile via `req.user.userId` |

### Error handling convention

Services signal errors by attaching `statusCode` to the thrown `Error`:
```js
const error = new Error("User already exists");
error.statusCode = 409;
throw error;
```
`catchAsync` forwards these to `errorMiddleware`, which reads `.statusCode` and responds with the appropriate HTTP status.
