# 🧠⚡💎 YouMatter — Wellness Gauntlet 💎⚡🧠

**A gamified wellness platform that transforms your health journey into an epic quest to master the Infinity Stones of Well-Being.**

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.3-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://expressjs.com/)
[![Python](https://img.shields.io/badge/Python-Flask-3776ab?logo=python&logoColor=white)](https://flask.palletsprojects.com/)
[![Prophet](https://img.shields.io/badge/ML-Prophet-blue)](https://facebook.github.io/prophet/)

*Built for the Star Union Dai-ichi Life Insurance Hackathon — solving user engagement challenges through gamification and behavioral psychology.*

---

## 📋 Table of Contents

- [Overview](#overview)
- [Core Concept](#core-concept)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Pages & Components](#pages--components)
- [Behavioral Psychology](#behavioral-psychology)
- [Innovation Tracks](#innovation-tracks)
- [Demo Flow](#demo-flow)
- [Future Roadmap](#future-roadmap)
- [License](#license)

---

## 🌟 Overview

**YouMatter Wellness Gauntlet** is a full-stack web application that reimagines personal wellness as an interconnected, gamified experience inspired by the Infinity Stones universe. Traditional wellness apps struggle with user engagement — users download, try for a week, and abandon. YouMatter solves this with:

- **Gamification mechanics** that make wellness feel like an adventure, not a chore
- **Interconnected gem systems** that mirror how real-life wellness domains affect each other
- **Social accountability** through community features, leaderboards, and team challenges
- **ML-powered insights** with forecasting and personalized quest recommendations

The platform increases **DAU/MAU** by creating engagement loops, drives **feature discovery** via quest systems, and improves **retention** through loss-aversion and interconnectivity mechanics.

---

## 💎 Core Concept

Users embark on a quest to master **Five Wellness Gems** (or six Infinity Stones in the extended system), each representing a critical dimension of well-being:

| Gem | Domain | Description |
|-----|--------|-------------|
| 🧠 **Mind Gem** | Mental Health | Clarity, focus, meditation, mindfulness |
| 💪 **Body Gem** | Physical Health | Exercise, nutrition, energy, movement |
| ❤️ **Soul Gem** | Social & Emotional | Relationships, community, empathy |
| 💰 **Wealth Gem** | Financial Wellness | Budgeting, saving, financial literacy |
| 🎯 **Purpose Gem** | Personal Growth | Goal-setting, skill-building, reflection |

### The Interconnectivity System

What sets YouMatter apart is the **gem interconnectivity engine** — gems affect each other, just like real wellness:

- Neglecting **physical activity** drains **mental clarity**
- Lack of **social connection** weakens **physical energy**
- Missing a sense of **purpose** affects **financial focus**
- The **Soul Gem** acts as a foundation influencing all other gems

This creates a self-reinforcing loop: improve one area, and connected areas get an energy boost (ripple effect). Neglect one, and others start to decay.

---

## 🎮 Key Features

### ✨ Gamification Engine
- **Quest System** — Daily and weekly challenges that power up individual gems
- **Progressive Unlock** — Only the Mind Stone is unlocked initially; complete quests to unlock the full gauntlet
- **XP & Leveling** — Earn experience points across activities and level up your profile
- **Streak Tracking** — Consecutive-day activity streaks with multiplier bonuses
- **Achievement System** — Unlock milestones like *First Light*, *Triple Threat*, and *Perfect Balance*

### 🌌 Visual States & Feedback
- **Bright** — Gem is powered and active (high energy)
- **Dim** — Gem is inactive and needs attention
- **Draining** — Interconnected decay effects pulling energy away
- **Locked** — Not yet unlocked by the user

### 🤝 Social & Community
- Friend system with real-time online/offline status
- Community groups and team challenges
- Global and group-based leaderboards
- Live notification feed of friend activities
- Mutual challenge tracking

### 📊 Analytics & ML
- Historical wellness balance charts (7-day / 30-day)
- **Facebook Prophet**-powered 7-day wellness forecasting
- ML-driven personalized quest recommendations based on weakest gem
- Stone energy and progress tracking over time

### 🔐 Authentication
- Simulated login system (accepts any `@gmail.com` account)
- User profile with avatar, XP, streak, and dominant stone

---

## 🏗 Architecture

The application follows a **three-tier architecture**:

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)               │
│                    http://localhost:5173                  │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │Dashboard │  │ Gauntlet │  │  Quests  │  │Social  │  │
│  │  Page    │  │   Page   │  │   Page   │  │ Page   │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘  │
│        │              │             │            │       │
│        └──────────────┴─────────────┴────────────┘       │
│                         │                                │
│              ┌─────────────────────┐                     │
│              │  WellnessContext    │                     │
│              │  (useReducer)       │                     │
│              └─────────────────────┘                     │
│                         │                                │
│              ┌─────────────────────┐                     │
│              │  API Service Layer  │                     │
│              │  (Singleton Class)  │                     │
│              └─────────────────────┘                     │
└─────────────────────┬───────────────────────────────────┘
                      │ Vite Proxy (/api → :5001)
┌─────────────────────▼───────────────────────────────────┐
│               BACKEND (Node.js + Express)                │
│               http://localhost:5001                       │
│                                                          │
│  GET  /api/analytics/history/:userId                     │
│  GET  /api/analytics/forecast/:userId  ──┐               │
│  GET  /api/quests/recommendations/:userId│               │
└──────────────────────────────────────────┼───────────────┘
                                           │ HTTP (axios)
┌──────────────────────────────────────────▼───────────────┐
│             ML MICROSERVICE (Python + Flask)              │
│             http://localhost:5002                         │
│                                                          │
│  POST  /forecast          → Prophet time-series model    │
│  POST  /recommendations   → Category-based filtering    │
└──────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with concurrent rendering |
| **Vite 5** | Build tool and dev server |
| **React Router v6** | Client-side routing |
| **Framer Motion** | Physics-based animations and transitions |
| **Chart.js + react-chartjs-2** | Wellness analytics visualizations |
| **Lucide React** | Icon system |
| **Axios** | HTTP client for API calls |
| **CSS3** | Custom styling with animations, gradients, backdrop filters |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | REST API server |
| **Axios** | HTTP client for ML service communication |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |
| **Nodemon** | Development hot-reloading |

### ML Microservice
| Technology | Purpose |
|------------|---------|
| **Python + Flask** | Lightweight ML API server |
| **Facebook Prophet** | Time-series wellness forecasting |
| **Pandas + NumPy** | Data manipulation and generation |
| **cmdstanpy** | Statistical modeling backend for Prophet |
| **python-dotenv** | Environment variable management |

---

## 📁 Project Structure

```
You-Matter-Wellness/
├── public/                          # Static assets
│   └── vite.svg                     # Favicon
├── src/                             # Frontend source code
│   ├── assets/                      # Static assets (SVGs, images)
│   ├── components/                  # Reusable UI components
│   │   ├── Challenge.jsx/css        #   Quest/challenge interaction cards
│   │   ├── GemCard.jsx/css          #   Individual gem display cards
│   │   ├── InfinityStone.jsx/css    #   Animated stone visualization
│   │   ├── Navigation.jsx/css       #   App navigation bar
│   │   └── Social.jsx/css           #   Social feed & friend components
│   ├── context/
│   │   └── WellnessContext.jsx      # Global state (useReducer + Context API)
│   ├── pages/                       # Route-level page components
│   │   ├── Login.jsx/css            #   Authentication page
│   │   ├── Dashboard.jsx/css        #   Main overview dashboard
│   │   ├── EnhancedDashboard.jsx    #   Advanced dashboard with analytics
│   │   ├── Gauntlet.jsx/css         #   Basic gauntlet view
│   │   ├── EnhancedGauntlet.jsx/css #   Full gauntlet with connections
│   │   ├── SimpleGauntlet.jsx/css   #   Simplified gauntlet view
│   │   ├── PowerLeaderboard.jsx/css #   Leaderboard & ranking page
│   │   ├── Quests.jsx/css           #   Quest browser & management
│   │   ├── Analytics.jsx/css        #   Charts, forecasts, insights
│   │   ├── Community.jsx/css        #   Community groups & events
│   │   └── Profile.jsx/css          #   User profile & achievements
│   ├── services/
│   │   └── api.js                   # Singleton API service (client-side simulation + HTTP)
│   ├── App.jsx                      # Root component with routing
│   ├── App.css                      # Global app styles
│   ├── index.css                    # Base CSS reset and variables
│   └── main.jsx                     # React entry point
├── server/                          # Node.js backend
│   ├── server.js                    # Express API server
│   ├── package.json                 # Backend dependencies
│   └── .env                         # Backend environment variables
├── ml/                              # Python ML microservice
│   ├── app.py                       # Flask API with Prophet forecasting
│   ├── requirements.txt             # Python dependencies
│   └── .env                         # ML service environment variables
├── .env                             # Frontend environment variables
├── .gitignore                       # Git ignore rules
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Frontend dependencies
├── vite.config.js                   # Vite dev server + proxy config
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **Python** ≥ 3.9
- **npm** ≥ 9.x
- **pip** (Python package manager)

### 1. Clone the Repository

```bash
git clone https://github.com/Athmeeya2006/You-Matter-Wellness.git
cd You-Matter-Wellness
```

### 2. Start the Frontend

```bash
npm install
npm run dev
```
The frontend will be available at **http://localhost:5173**.

### 3. Start the Backend

```bash
cd server
npm install
npm start           # or: npm run dev (for hot-reload with nodemon)
```
The backend API will be available at **http://localhost:5001**.

### 4. Start the ML Microservice

```bash
cd ml
python -m venv venv

# Activate the virtual environment:
source venv/bin/activate        # macOS / Linux
venv\Scripts\activate           # Windows

pip install -r requirements.txt
python app.py
```
The ML service will be available at **http://localhost:5002**.

> **Note:** The frontend works independently with its built-in client-side simulation (`api.js`). The backend and ML services are required only for the analytics/forecast and quest recommendation features.

---

## 🔧 Environment Variables

### Frontend (`.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:5001/api` | Backend API base URL |
| `VITE_USE_REAL_API` | `true` | Toggle between real API and client-side simulation |
| `VITE_FORECAST_API` | `http://localhost:5001/api/analytics/forecast` | Forecast endpoint URL |
| `VITE_RECOMMEND_API` | `http://localhost:5001/api/quests/recommendations` | Recommendations endpoint URL |

### Backend (`server/.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5001` | Express server port |
| `ML_SERVICE_URL` | `http://localhost:5002` | Python ML microservice URL |

### ML Service (`ml/.env`)
| Variable | Default | Description |
|----------|---------|-------------|
| `FLASK_PORT` | `5002` | Flask server port |
| `FLASK_DEBUG` | `true` | Enable Flask debug mode |
| `FLASK_HOST` | `0.0.0.0` | Flask host binding |

---

## 📡 API Reference

### Backend API (Express — port 5001)

#### `GET /api/analytics/history/:userId`
Returns historical wellness balance data.

| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | path | User identifier |
| `range` | query | `week` (7 days) or `month` (30 days, default) |

**Response:** Array of `{ log_date, wellness_balance }` objects.

---

#### `GET /api/analytics/forecast/:userId`
Returns 7-day wellness balance predictions (proxied to ML service).

**Response:**
```json
{
  "values": [
    { "date": "2026-05-04", "predicted_balance": 72 },
    ...
  ]
}
```

---

#### `GET /api/quests/recommendations/:userId`
Returns personalized quest recommendations based on weakest gem (proxied to ML service).

**Response:**
```json
{
  "recommendations": [
    { "id": 3, "name": "Gratitude Journaling", "description": "...", "category": "soul" }
  ]
}
```

---

### ML API (Flask — port 5002)

#### `POST /forecast`
Generates a 7-day wellness forecast using Facebook Prophet.

**Request Body:** `{ "user_id": "..." }`  
**Response:** Array of `{ date, predicted_balance }` objects.

#### `POST /recommendations`
Returns filtered quest recommendations.

**Request Body:** `{ "user_id": "...", "weakest_gem": "soul" }`  
**Response:** Array of quest objects filtered by category.

---

## 🖥 Pages & Components

### Pages (Routes)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Enhanced Dashboard | Main overview with gem statuses, balance meter, and quick actions |
| `/dashboard` | Dashboard | Standard dashboard view |
| `/gauntlet` | Power Leaderboard | Gem rankings and competitive leaderboard |
| `/gauntlet-enhanced` | Enhanced Gauntlet | Full interactive gauntlet with connections and ripple effects |
| `/gauntlet-original` | Gauntlet | Original gauntlet visualization |
| `/challenges` | Challenges | Browse, join, and complete wellness challenges |
| `/social` | Social | Friends, groups, and community feed |
| `/quests` | Quests | Daily quests with ML-powered recommendations |
| `/analytics` | Analytics | Charts, forecasts, and wellness insights |

### Core Components

| Component | Description |
|-----------|-------------|
| `Navigation` | Responsive top navigation bar with user info and route links |
| `GemCard` | Displays individual gem status, power level, and quest progress |
| `InfinityStone` | Animated SVG stone with glow, pulse, and particle effects |
| `Challenge` | Challenge card with join/complete actions, stone impact previews, and progress bars |
| `Social` | Social feed with friends list, status indicators, and group cards |

### State Management

Global state is managed via **React Context + useReducer** (`WellnessContext.jsx`):

| Action | Description |
|--------|-------------|
| `COMPLETE_QUEST` | Marks a quest complete, increases gem power (+20), awards XP |
| `SIMULATE_DECAY` | Applies daily decay and interconnectivity drain rules |
| `RESET_GAUNTLET` | Resets all gems to initial state (preserves XP) |
| `ADD_NOTIFICATION` | Pushes a notification to the feed (max 5 kept) |
| `UNLOCK_ACHIEVEMENT` | Unlocks a milestone achievement |

---

## 🧠 Behavioral Psychology

YouMatter integrates proven behavioral psychology principles:

| Principle | Implementation |
|-----------|---------------|
| **Habit Formation** | Small daily quests with immediate visual rewards (gem glow-up) |
| **Loss Aversion** | Decay mechanics — gems lose power when neglected, motivating daily return |
| **Social Accountability** | Soul Gem requires community engagement; friend activities visible in feed |
| **Variable Reward Schedules** | Different quest difficulties and XP multipliers prevent habituation |
| **Progress Visualization** | Balance meter, energy bars, and achievement badges provide constant feedback |
| **Endowed Progress** | Mind Stone starts unlocked and partially lit — users feel they've already begun |
| **Interconnectivity** | Teaches real wellness principles: physical health affects mental clarity, etc. |

---

## 🏆 Innovation Tracks

### Track 1: Behavioral Psychology ✅
- Habit loops with small rewards and immediate feedback
- Loss aversion through decay and interconnected draining
- Social proof via leaderboards and friend activity feeds
- Cognitive reframing — wellness tasks become "quests" and "challenges"

### Track 2: Emerging Technology ✅
- ML-powered forecasting with Facebook Prophet
- Real-time state management and ecosystem simulation
- Physics-based animations with Framer Motion
- Responsive, mobile-first progressive web design

### Track 3: Social Impact ✅
- Holistic approach covering mental, physical, social, financial, and purpose-driven wellness
- Community groups create peer accountability
- Interconnectivity system educates users on how wellness domains relate
- Inclusive design with accessibility considerations

---

## 🎯 Demo Flow

### Quick Demo (5 minutes)

1. **Login** — Use any `@gmail.com` email (e.g., `demo@gmail.com`, any password)
2. **Dashboard** — Observe the gem status cards, balance meter, and notifications
3. **Gauntlet** — Navigate to `/gauntlet-enhanced` to see interactive stones with connections
4. **Complete a Quest** — Click a quest button to power up a gem and watch the ripple effect
5. **Simulate Decay** — Trigger daily decay to see interconnectivity in action
6. **Analytics** — View wellness charts and ML-powered 7-day forecast

### Full Demo (15 minutes)

Includes the quick demo plus:
- Explore the **Challenges** page — join a challenge and observe multi-stone impacts
- Visit the **Social** page — see friends, leaderboards, and groups
- Check the **Quests** page — view ML-driven recommendations
- Demonstrate **data persistence** — refresh the page, progress is preserved via localStorage
- Show **responsive design** — resize the browser to mobile/tablet breakpoints

---

## 🚀 Future Roadmap

- [ ] **Firebase Integration** — Real user accounts, auth, and Firestore data persistence
- [ ] **AI Personalization** — Fine-tuned ML models for user-specific quest recommendations
- [ ] **Wearable Integration** — Connect with Fitbit, Apple Health, and Google Fit APIs
- [ ] **Push Notifications** — FCM-based reminders for streak maintenance
- [ ] **Team Challenges** — Multiplayer quests with real-time collaboration
- [ ] **Insurance Integration** — Connect with YouMatter's policy servicing features (SUDLIC)
- [ ] **PWA Support** — Service workers for offline functionality and home-screen installation
- [ ] **AR/VR Wellness** — Immersive meditation and exercise experiences

---

## 📄 License

This project was built for the **Star Union Dai-ichi Life Insurance Hackathon**.

---

*Solving engagement challenges through gamification and behavioral psychology.*

**Made with ❤️ by Team YouMatter**

