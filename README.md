# Media Watchlist

A React SPA for tracking movies and TV shows you want to watch. Search TMDB, build your list, manage your account — all in one place.

Connects to [media-watchlist-api](https://github.com/chrispoulter/media-watchlist-api) for data and authentication.

## Tech Stack

- **[Vite 8](https://vite.dev/)** + **[React 19](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)** for styling
- **[shadcn/ui](https://ui.shadcn.com/)** component library (New York style, Radix UI primitives)
- **[TanStack Query v5](https://tanstack.com/query/latest)** for server state
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** for forms and validation
- **[better-auth](https://better-auth.com/)** for authentication (cookie-based sessions)
- **[React Router v7](https://reactrouter.com/)** for client-side routing
- **[Axios](https://axios-http.com/)** for API requests
- **[Sonner](https://sonner.emilkowal.ski/)** for toast notifications

## Features

### Authentication
- Register with email, password, first name, last name, and date of birth
- Register / sign in with Google OAuth
- Sign in with email and password (remember me option)
- Two-factor authentication (TOTP) at sign-in
- Forgot password / reset password via email link

### Watchlist
- Search TMDB for movies and TV shows with debounced input and type filter (All / Movies / TV)
- Add titles to your watchlist directly from search results
- View your full watchlist as a poster grid
- Remove titles from your watchlist

### Profile
- Update name and date of birth
- Change email address
- Change password (revokes other sessions)
- Enable / disable TOTP two-factor authentication with QR code setup flow
- Delete account

## Prerequisites

- **Node 22+**
- **media-watchlist-api** running (see its README for setup)

## Getting Started

```bash
# 1. Copy environment file and set the API URL
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`. API requests are proxied to `VITE_API_URL` during development.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Base URL of the media-watchlist-api | `http://localhost:3000` |

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |

## Docker

### Development

The frontend docker-compose uses an external Docker network shared with the API stack. Create the network first if it doesn't exist:

```bash
docker network create media-watchlist-network
```

Then start the frontend dev container:

```bash
docker compose up
```

The dev server runs on port `5173` with volume mounts for hot-reload.

### Production

The multi-stage `Dockerfile` builds a static site served by nginx. Pass the API URL at build time:

```bash
docker build --target production \
  --build-arg VITE_API_URL=https://your-api.example.com \
  -t media-watchlist-frontend .
```

The nginx config includes `try_files $uri /index.html` for SPA routing and aggressive caching for static assets.

## CI/CD

Two GitHub Actions workflows are included:

| Workflow | Trigger | Steps |
|---|---|---|
| `ci-dev.yml` | Push to any branch except `main`; PRs to `main` | Type check → lint → format check |
| `ci-release.yml` | Push to `main` | Type check → lint → format check → build → deploy to Render |

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `VITE_API_URL` | Production API base URL |
| `RENDER_API_KEY` | Render API key for triggering deploys |
| `RENDER_SERVICE_ID` | Render static site service ID |

## Project Structure

```
src/
├── lib/
│   ├── auth-client.ts      # better-auth client singleton
│   ├── api.ts              # axios instance (withCredentials: true)
│   └── utils.ts            # shadcn cn() helper
├── types/index.ts          # shared TypeScript types
├── components/
│   ├── ui/                 # shadcn/ui generated components
│   ├── layout/             # RootLayout, Header, UserMenu
│   ├── auth/               # RequireAuth, RequireGuest route guards
│   └── shared/             # LoadingSpinner, ErrorMessage, MediaCard
├── pages/
│   ├── auth/               # Login, Register, TwoFactor, ForgotPassword, ResetPassword
│   ├── WatchlistPage.tsx
│   ├── SearchPage.tsx
│   └── profile/
│       └── ProfilePage.tsx # Tabs: Profile / Security / Danger Zone
└── features/
    ├── auth/               # Zod schemas + form components
    ├── profile/            # Profile update forms, 2FA settings, delete dialog
    ├── watchlist/          # React Query hooks, grid, item cards
    └── search/             # Debounced search bar, result cards
```
