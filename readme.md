# GitFinder - GitHub Profile Search

A GitHub profile search application with a terminal/matrix theme, built with a clean **frontend–backend** separated architecture for better scalability and maintainability.

## 📁 Project Structure

```
GitFinder/
├── backend/                          ← Server-side (Node.js + Express)
│   ├── config/
│   │   ├── config.js                 # App configuration & env variables
│   │   └── db.js                     # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js         # User auth (register/login/me)
│   │   └── githubController.js       # GitHub profile & repo lookups
│   ├── middleware/
│   │   ├── auth.js                   # JWT authentication middleware
│   │   └── errorHandler.js           # Centralized error handling
│   ├── models/
│   │   ├── User.model.js             # App user schema
│   │   └── GitHubUser.model.js       # Cached GitHub user schema
│   ├── routes/
│   │   ├── auth.js                   # Auth route definitions
│   │   └── github.js                 # GitHub API route definitions
│   ├── utils/
│   │   └── githubHelper.js           # GitHub API helper functions
│   ├── server.js                     # Express entry point
│   ├── seedDB.js                     # Database seeder script
│   ├── debug.js                      # Debug launcher
│   ├── package.json                  # Backend dependencies & scripts
│   ├── .env                          # Environment config (git-ignored)
│   └── .env.example                  # Environment config template
│
├── frontend/                         ← Client-side (Vite + React + Tailwind v4)
│   ├── index.html                    # Vite entry HTML
│   ├── package.json                  # Frontend dependencies & scripts
│   ├── vite.config.js                # Vite config (React, Tailwind, API proxy)
│   ├── eslint.config.js              # ESLint config
│   └── src/
│       ├── main.jsx                  # React entry point
│       ├── index.css                 # Tailwind v4 @theme + custom styles
│       ├── App.jsx                   # Main App component
│       ├── components/
│       │   ├── Loader.jsx            # Loading animation
│       │   ├── StatCard.jsx          # Single stat display
│       │   ├── UserCard.jsx          # User profile + repo list
│       │   └── SearchBar.jsx         # Search input + suggestions
│       └── utils/
│           └── helpers.js            # formatValue, getLanguageColor, formatDate
│
├── .gitignore
└── readme.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- MongoDB (local or Atlas)
- GitHub Personal Access Token (optional, for higher rate limits)

### Quick Setup

1. **Clone the repo**
```bash
git clone <repository-url>
cd GitFinder
```

2. **Install dependencies** (both frontend and backend)
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Configure environment**
```bash
cd ../backend
cp .env.example .env
# Edit .env with your values
```

4. **Environment Variables** (`backend/.env`)
```env
PORT=3000                                    # Server port
GITHUB_TOKEN=your_github_token_here          # GitHub API token (optional)
MONGODB_URI=mongodb://localhost:27017/gitfinder  # MongoDB connection string
JWT_SECRET=your_jwt_secret_here              # JWT signing secret
NODE_ENV=development                         # Environment
```

5. **Development** (run both in separate terminals)
```bash
# Terminal 1 — Backend (port 3000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 5173, proxies API to backend)
cd frontend
npm run dev
```

6. **Production build**
```bash
# Build the frontend
cd frontend
npm run build

# Start the backend (serves built frontend from frontend/dist/)
cd ../backend
npm start
```

### Access the Application

| Mode | URL | Description |
|------|-----|-------------|
| **Dev (frontend)** | http://localhost:5173 | Vite dev server with HMR |
| **Dev (backend)** | http://localhost:3000 | API server |
| **Production** | http://localhost:3000 | Backend serves built frontend |

## 🏗️ Architecture Overview

### Backend (`backend/`)

| Layer | Directory | Purpose |
|-------|-----------|---------|
| **Config** | `config/` | Centralized settings, env vars, DB connection |
| **Controllers** | `controllers/` | Request handling & business logic |
| **Middleware** | `middleware/` | Auth, error handling, request processing |
| **Models** | `models/` | Mongoose schemas for User & GitHubUser |
| **Routes** | `routes/` | RESTful endpoint definitions |
| **Utils** | `utils/` | GitHub API helpers & shared utilities |

### Frontend (`frontend/`) — Vite + React

| File | Purpose |
|------|---------|  
| `vite.config.js` | Vite config — React plugin, Tailwind v4, API proxy |
| `src/index.css` | Tailwind v4 `@theme` — colors, shadows, fonts, animations |
| `src/main.jsx` | React entry point (StrictMode + CSS import) |
| `src/App.jsx` | Main App — state management, API calls, layout |
| `src/components/Loader.jsx` | Animated loading indicator |
| `src/components/StatCard.jsx` | Single stat card (repos, followers, etc.) |
| `src/components/UserCard.jsx` | User profile card + repository list |
| `src/components/SearchBar.jsx` | Terminal-style search input with suggestions |
| `src/utils/helpers.js` | `formatValue`, `getLanguageColor`, `formatDate` |

> **Dev mode:** Vite dev server (port 5173) proxies `/api` requests to the backend (port 3000).  
> **Production:** Backend serves the built `frontend/dist/` folder.

## 🔌 API Endpoints

### GitHub Routes (`/api/github`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/github/users/:username` | Public | Get GitHub user profile |
| GET | `/api/github/users/:username/repos` | Public | Get user repositories |
| GET | `/api/github/trending` | Public | Get trending searched users |
| GET | `/api/github/rate-limit` | Public | Check GitHub API rate limit |
| PUT | `/api/github/link` | Private | Link GitHub to account |
| POST | `/api/github/history` | Private | Add to search history |
| GET | `/api/github/history` | Private | Get search history |

### Auth Routes (`/api/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login & get JWT token |
| GET | `/api/auth/me` | Private | Get current user data |

## 🎯 Features

### 🔍 GitHub Integration
- **User Search**: Find any GitHub user by username
- **Profile Display**: Detailed user information and statistics
- **Repository Showcase**: Display user's recent repositories
- **Caching**: Searched profiles are cached in MongoDB
- **Trending**: Track most-searched users

### 🔐 Authentication
- **JWT-based auth**: Register, login, and protected routes
- **Search History**: Logged-in users can track search history
- **Account Linking**: Link GitHub username to app account

### 🎨 User Interface
- **Terminal Theme**: Matrix-inspired dark theme with neon green accents
- **Responsive Design**: Mobile-friendly and cross-browser compatible
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Interactive Elements**: Hover effects and visual feedback

### ⚡ Performance & Reliability
- **API Rate Limiting**: Proper handling of GitHub API limits
- **Error Resilience**: Graceful error handling and user feedback
- **Profile Caching**: MongoDB caching reduces redundant API calls

## 🛠️ Development Guidelines

### Adding New Features

1. **New API Endpoint**
```bash
# 1. Create controller in backend/controllers/
# 2. Create route in backend/routes/
# 3. Register route in backend/server.js
```

2. **New Frontend Component**
```bash
# Create a new file in frontend/src/components/MyComponent.jsx
# Import it in the parent component that needs it
import MyComponent from './components/MyComponent';
```

3. **New Configuration**
```bash
# Update backend/config/config.js
# Add new env variables to backend/.env.example
```

### Running Commands

```bash
# --- Backend (from backend/) ---
npm run dev       # Dev server with nodemon
npm start         # Production server
npm run seed      # Seed database

# --- Frontend (from frontend/) ---
npm run dev       # Vite dev server with HMR
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
```

## 📦 Tech Stack

### Backend
- **Node.js** (v14+) — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database & ODM
- **Axios** — HTTP client for GitHub API
- **JWT + bcryptjs** — Authentication
- **Dotenv** — Environment management

### Frontend
- **Vite 7** — Lightning-fast build tool with HMR
- **React 19** — Component-based UI
- **Tailwind CSS v4** — Utility-first styling (with `@tailwindcss/vite`)
- **Framer Motion** — Animation library
- **ESLint** — Code linting
- **Google Fonts** — JetBrains Mono & Space Grotesk

## 🛡️ Security Considerations

- Never commit `.env` files (enforced via `.gitignore`)
- Validate all user inputs
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens expire after 7 days
- Keep dependencies updated

## 🚀 Deployment

```bash
# Production .env
NODE_ENV=production
PORT=8080
GITHUB_TOKEN=production_token_here
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_secret
```

### Hosting Options
- **Heroku** / **Render** — Simple deployment with env vars
- **Vercel** — Serverless functions support
- **AWS** — EC2 or Elastic Beanstalk
- **DigitalOcean** — App Platform or Droplets

---

<p align="center">
  <strong>Built with ❤️ using Vite, React, Tailwind CSS, Node.js & Express</strong>
</p>