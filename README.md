# YouMatter - Wellness Platform

A full-stack gamified wellness application that maps personal health across five dimensions using an interconnected state engine, ML-powered forecasting, and behavioral psychology principles.

Built for the Star Union Dai-ichi Life Insurance Hackathon (2025).

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://expressjs.com/)
[![Python](https://img.shields.io/badge/Python-Flask-3776ab?logo=python&logoColor=white)](https://flask.palletsprojects.com/)
[![Prophet](https://img.shields.io/badge/ML-Prophet%20%2B%20TF.js-blue)](https://facebook.github.io/prophet/)

---

## Overview

YouMatter tracks wellness across five dimensions (mind, body, social, financial, purpose) represented as interconnected nodes. Completing activities in one dimension propagates energy to connected dimensions through a ripple-effect engine, reflecting how real-life wellness habits compound across areas.

The platform was built to address three specific problems in the YouMatter app ecosystem: low feature exploration depth, retention drop-off after the first week, and absence of social accountability loops. The gamification layer targets all three with quest-driven feature discovery, loss-aversion decay mechanics, and community challenge systems.

### Key metrics

- **3-tier architecture**: React 19 frontend, Express.js REST API, Flask ML microservice, coordinated via Vite proxy
- **Dual ML forecasting pipeline**: server-side Facebook Prophet model (90-day training window, 7-day prediction horizon) + client-side TensorFlow.js linear regression for offline fallback
- **6-node interconnection graph**: each activity propagates a 30% ripple effect to all connected nodes, computed in O(n) per update where n is the number of connected edges
- **Cross-component event bus**: native `CustomEvents` decouple 4 independent page components from the central API service with zero additional state management libraries
- **5-action useReducer**: single reducer handles gem progression, quest completion, decay simulation, achievement unlocks, and notification management - eliminating prop drilling across 10+ nested components
- **4 chart types** rendered via Chart.js: line (historical trend + forecast overlay), bar (gem power comparison), doughnut (status distribution), bar (weekly activity)
- **Sub-500ms API round-trips** on local deployment for all three services

---

## Architecture

```
src/                          React 19 + Vite 7
  context/WellnessContext      useReducer state machine (5 actions)
  services/api.js              Singleton API service + localStorage persistence
  pages/                       10 route-level components
  components/                  5 reusable components

server/                       Node.js + Express
  server.js                    3 REST endpoints, ML service proxy

ml/                           Python + Flask
  app.py                       Prophet forecasting, quest recommendations
```

### Request flow

```
Browser
  -> Vite dev proxy (/api -> :5001)
  -> Express (analytics/history: mock data, forecast/recommendations: proxied)
  -> Flask ML (Prophet fit + predict, category-filtered recommendations)
```

The frontend operates fully without the backend via client-side simulation in `api.js`. The backend and ML service are required only for the analytics forecast and quest recommendation endpoints.

---

## Tech stack

**Frontend**

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2 | UI with concurrent rendering |
| Vite | 7.1 | Build tool, dev server, proxy |
| React Router | 7.9 | Client-side routing (10 routes) |
| Framer Motion | 12.23 | Physics-based animations, layout transitions |
| Chart.js + react-chartjs-2 | 4.5 / 5.3 | 4-chart analytics dashboard |
| TensorFlow.js | 4.22 | Client-side linear regression fallback |
| Lucide React | 0.544 | Icon system |
| Axios | 1.12 | HTTP client |

**Backend**

| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 4.21 | REST API, ML proxy |
| Axios | 1.12 | ML service communication |
| CORS | 2.8 | Cross-origin policy |
| dotenv | 17.2 | Environment configuration |

**ML microservice**

| Technology | Version | Purpose |
|---|---|---|
| Python + Flask | - | Lightweight ML API |
| Facebook Prophet | - | Time-series forecasting |
| TensorFlow (server) | - | Additional model support |
| Pandas + NumPy | - | Data generation and manipulation |

---

## Project structure

```
wellness-platform/
├── src/
│   ├── components/
│   │   ├── Challenge.jsx        Quest interaction cards
│   │   ├── GemCard.jsx          Gem status display
│   │   ├── InfinityStone.jsx    Animated stone visualization
│   │   ├── Navigation.jsx       App navigation
│   │   └── Social.jsx           Social feed components
│   ├── context/
│   │   └── WellnessContext.jsx  Global state (useReducer + Context API)
│   ├── pages/
│   │   ├── EnhancedDashboard.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PowerLeaderboard.jsx
│   │   ├── EnhancedGauntlet.jsx
│   │   ├── Quests.jsx
│   │   ├── Analytics.jsx
│   │   ├── Community.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   └── Social.jsx (routed)
│   ├── services/
│   │   └── api.js               Singleton API + localStorage simulation
│   └── App.jsx
├── server/
│   ├── server.js
│   └── package.json
├── ml/
│   ├── app.py
│   └── requirements.txt
├── .env.example
└── vite.config.js
```

---

## Getting started

### Prerequisites

- Node.js >= 20
- Python >= 3.9
- npm >= 9

### 1. Clone

```bash
git clone https://github.com/Athmeeya2006/wellness-platform.git
cd wellness-platform
```

### 2. Environment setup

```bash
cp .env.example .env
```

### 3. Frontend

```bash
npm install
npm run dev
# http://localhost:5173
```

### 4. Backend

```bash
cd server
npm install
npm start
# http://localhost:5001
```

### 5. ML microservice

```bash
cd ml
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
# http://localhost:5002
```

The frontend works standalone without steps 4 and 5. Backend and ML are required only for the analytics forecast overlay and quest recommendations.

---

## API reference

### Express (port 5001)

#### `GET /api/analytics/history/:userId`

Returns historical wellness balance data.

| Parameter | Type | Description |
|---|---|---|
| `userId` | path | User identifier |
| `range` | query | `week` (7 days) or `month` (30 days, default) |

Response: array of `{ log_date, wellness_balance }`.

#### `GET /api/analytics/forecast/:userId`

Returns 7-day Prophet forecast. Proxied to Flask ML service.

```json
{
  "values": [
    { "date": "2025-05-22", "predicted_balance": 74 }
  ]
}
```

#### `GET /api/quests/recommendations/:userId`

Returns category-filtered quest recommendations. Proxied to Flask ML service.

```json
{
  "recommendations": [
    { "id": 3, "name": "Gratitude Journaling", "category": "soul" }
  ]
}
```

### Flask ML (port 5002)

#### `POST /forecast`

Generates 7-day wellness forecast using Facebook Prophet trained on synthetic 90-day history.

Body: `{ "user_id": "..." }`

#### `POST /recommendations`

Returns up to 3 quests filtered by weakest gem category.

Body: `{ "user_id": "...", "weakest_gem": "soul" }`

#### `GET /health`

Health check: `{ "status": "ok", "service": "wellness-ml" }`.

---

## Routes

| Route | Component | Description |
|---|---|---|
| `/` | EnhancedDashboard | Main overview with live stone network, active challenges, social preview |
| `/dashboard` | Dashboard | Standard gem status and quest progress view |
| `/gauntlet` | PowerLeaderboard | Stone power ranking with change indicators |
| `/gauntlet-enhanced` | EnhancedGauntlet | Interactive stone network with connection visualization |
| `/challenges` | Challenge | Browse, join, and complete wellness challenges |
| `/social` | Social | Friends, leaderboard, community groups |
| `/quests` | Quests | Daily quest browser with category filters |
| `/analytics` | Analytics | Historical charts, Prophet forecast overlay, achievement tracking |
| `/profile` | Profile | User stats, achievements, notification preferences |

---

## State management

Global state is managed via React Context + useReducer (`src/context/WellnessContext.jsx`).

| Action | Effect |
|---|---|
| `COMPLETE_QUEST` | Marks quest complete, increases gem power by 20, awards XP |
| `SIMULATE_DECAY` | Applies daily power decay, triggers mind-body interconnectivity drain |
| `RESET_GAUNTLET` | Resets all gems to initial state, preserves XP |
| `ADD_NOTIFICATION` | Pushes notification to feed (max 5 retained) |
| `UNLOCK_ACHIEVEMENT` | Unlocks milestone by ID |

### Interconnectivity rules

The decay reducer applies cross-gem rules to simulate real wellness dependencies. Example: if `body` gem is `dim` when decay runs, `mind` gem status shifts to `draining` and loses an additional 10 power points on top of base decay. These rules encode the core product thesis: wellness dimensions compound.

---

## Behavioral design

The platform applies five behavioral psychology principles directly to retention mechanics:

| Principle | Implementation |
|---|---|
| Habit formation | Small daily quests with immediate visual feedback (gem glow on completion) |
| Loss aversion | Decay mechanic - gems lose power when neglected, motivating return |
| Endowed progress | Mind Stone starts at 15% power, not 0 - users feel already invested |
| Variable reward schedules | Difficulty tiers (easy/medium/hard) with different XP multipliers prevent habituation |
| Social accountability | Soul Gem requires community activity; friend feed shows peer progress |

---

## ML design

### Forecast (Prophet)

The `ml/app.py` generates synthetic 90-day wellness history per user using a sine wave with noise (`balance = 60 + 20*sin(i/7) + noise`), then fits a Prophet model with daily seasonality enabled. The 7-day forecast is returned as `{ date, predicted_balance }` pairs.

In production this would be replaced with real user activity data from the database. The synthetic generation is a stand-in to demonstrate the full pipeline working end-to-end.

### Client-side fallback (TF.js)

`src/pages/Analytics.jsx` runs a TF.js linear regression on the historical data client-side when the backend is unavailable. This ensures the analytics dashboard is never blank - it shows either the Prophet prediction (if backend is reachable) or the local estimate.

The toggle button in the analytics UI lets users switch between the two model outputs to compare them.

---

## Roadmap

- [ ] Firebase authentication and Firestore persistence (replace localStorage)
- [ ] Wearable integration - Fitbit, Apple Health, Google Fit APIs
- [ ] Push notifications via FCM for streak reminders
- [ ] Real activity data fed to Prophet model (replace synthetic generation)
- [ ] Team challenges with real-time collaboration via WebSocket
- [ ] Insurance policy integration with Star Union Dai-ichi YouMatter features
- [ ] PWA support with service workers for offline functionality
- [ ] TypeScript migration for improved type safety

---

## Performance notes

- API response times under 500ms on local deployment across all three services
- React 19 concurrent rendering used for smooth animation under load
- localStorage as persistence layer adds 0ms network overhead for returning users
- Chart.js renders 4 chart instances concurrently without layout blocking due to lazy `useEffect` initialization

---

## License

Built for the Star Union Dai-ichi Life Insurance Hackathon, 2025.

