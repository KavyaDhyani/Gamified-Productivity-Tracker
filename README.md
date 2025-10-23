# 🎮 Gamified Productivity Tracker

A full-stack MERN application that transforms productivity tracking into an engaging, game-like experience. Track your focus sessions, earn XP, level up, unlock achievements, and maintain streaks while monitoring your productivity across different categories.

## 🌐 Live Demo

**🔗 Live Link:** `https://gamified-productivity-tracker.vercel.app`

**Deployment:**
- Frontend: Deployed on [Vercel](https://vercel.com)
- Backend: Deployed on [Render](https://render.com)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Gamification System](#-gamification-system)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Functionality
- **Focus Timer**: Pomodoro-style timer with circular progress visualization
- **Session Tracking**: Track focus sessions across multiple categories (Work, Study, Exercise, Reading, Other)
- **Analytics Dashboard**: Visual charts showing productivity patterns
- **Session History**: Complete history of all past focus sessions

### 🎮 Gamification Elements
- **XP System**: Earn 10 XP per minute of focus time
- **Level Progression**: Level up based on total XP earned
- **Achievements**: Unlock 5 unique achievements based on milestones
- **Streak Tracking**: Build and maintain daily focus streaks with fire icons
- **Progress Visualization**: Animated XP bar and achievement cards

### 🎨 User Experience
- **Theme**: Follows browser/system default theme preference
- **Real-time Validation**: Instant feedback on form inputs
- **Toast Notifications**: Non-intrusive success/error messages
- **Responsive Design**: Seamless experience across all devices
- **Smooth Animations**: Polished transitions and hover effects

### 🔐 Authentication
- **Secure JWT Auth**: Cookie-based authentication with httpOnly cookies
- **Password Hashing**: bcrypt encryption for user passwords
- **Protected Routes**: Client and server-side route protection

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React 19 with Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: TailwindCSS v4
- **Charts**: Recharts
- **HTTP Client**: Axios

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, cookie-parser, CORS

---

## 📁 Project Structure

```
Gamified Productivity Tracker/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js            # Redux store configuration
│   │   ├── components/
│   │   │   ├── AchievementBadge.jsx # Achievement card component
│   │   │   ├── Badge.jsx           # Simple badge component
│   │   │   ├── ChartCard.jsx       # Chart wrapper component
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── SessionCard.jsx     # Session display card
│   │   │   ├── ThemeProvider.jsx   # Dark mode provider
│   │   │   ├── TimerCircle.jsx     # Circular timer component
│   │   │   ├── ToastProvider.jsx   # Toast notification system
│   │   │   └── XPBar.jsx           # XP progress bar
│   │   ├── features/
│   │   │   ├── authSlice.js        # Authentication Redux slice
│   │   │   └── sessionSlice.js     # Session Redux slice
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Main dashboard page
│   │   │   ├── Landing.jsx         # Landing page
│   │   │   ├── PastSessions.jsx    # Session history page
│   │   │   ├── Signin.jsx          # Sign in page
│   │   │   └── Signup.jsx          # Sign up page
│   │   ├── utils/
│   │   │   └── gamification.js     # Gamification utilities
│   │   ├── App.jsx                 # Main app component
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # App entry point
│   ├── CODE_DOCUMENTATION.md       # Comprehensive code guide
│   ├── CLEANUP_SUMMARY.md          # Code cleanup report
│   ├── package.json
│   ├── tailwind.config.js          # Tailwind configuration
│   └── vite.config.js              # Vite configuration
│
└── server/                          # Backend Node.js application
    ├── config/
    │   └── db.js                   # MongoDB connection
    ├── controllers/
    │   ├── auth.controller.js      # Authentication logic
    │   └── session.controller.js   # Session management logic
    ├── middleware/
    │   └── auth.middleware.js      # JWT verification middleware
    ├── models/
    │   ├── User.js                 # User schema
    │   └── Session.js              # Session schema
    ├── routes/
    │   ├── auth.routes.js          # Authentication routes
    │   └── session.routes.js       # Session routes
    ├── .env                        # Environment variables
    ├── .gitignore
    ├── index.js                    # Server entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Gamified Productivity Tracker"
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the development servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on `http://localhost:8080`

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 🔐 Environment Variables

### Server (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `8080` |
| `DB_URL` | MongoDB connection string | `mongodb://localhost:27017/productivity` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key_here` |

### Client

The client uses Vite's environment variable system. Create `.env` in the client directory if needed:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL (optional) | `http://localhost:8080` |

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Sign In
```http
POST /auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get Current User
```http
GET /auth/me
Cookie: token=<jwt_token>
```

#### Sign Out
```http
POST /auth/signout
Cookie: token=<jwt_token>
```

### Session Endpoints

#### Start Session
```http
POST /session/start
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "category": "work"
}
```

#### End Session
```http
POST /session/end
Cookie: token=<jwt_token>
```

#### Get Past Sessions
```http
GET /session/
Cookie: token=<jwt_token>
```

#### Get Stats
```http
GET /session/stats
Cookie: token=<jwt_token>
```

**Response:**
```json
[
  {
    "_id": "work",
    "count": 15,
    "totalMinutes": 450
  },
  {
    "_id": "study",
    "count": 8,
    "totalMinutes": 240
  }
]
```

---

## 🎮 Gamification System

### XP & Levels

**XP Formula:**
```
XP = Total Focus Minutes × 10
```

**Level Formula:**
```
Level = floor(√(XP / 100)) + 1
```

**XP for Next Level:**
```
XP Needed = Level² × 100
```

**Example Progression:**
- Level 1: 0 - 100 XP
- Level 2: 100 - 400 XP
- Level 3: 400 - 900 XP
- Level 4: 900 - 1600 XP
- Level 5: 1600 - 2500 XP

### Achievements

| Icon | Achievement | Requirement |
|------|-------------|-------------|
| 🎯 | **First Steps** | Complete 1 session |
| 🌟 | **Getting Started** | Complete 10 sessions |
| 💎 | **Dedicated** | Complete 50 sessions |
| ⏰ | **Time Master** | Focus for 10 hours (600 minutes) |
| 👑 | **Focus Legend** | Focus for 100 hours (6000 minutes) |

### Streak System

Build consecutive daily streaks by completing at least one session per day.

**Streak Icons:**
- ⭐ **0-2 days**: Starting out
- 🔥 **3-6 days**: Getting hot
- 🔥🔥 **7-29 days**: On fire
- 🔥🔥🔥 **30+ days**: Legendary

---

## 📊 Features Breakdown

### Dashboard
- **XP Progress Bar**: Visual representation of level progress
- **Stat Cards**: Weekly focus time, current streak, total sessions, total time
- **Achievement Grid**: 5 achievement cards with unlock status and progress
- **Timer Modal**: Click to open timer controls
- **Analytics Charts**:
  - Sessions by Category (Bar Chart)
  - Time by Category (Bar Chart)

### Timer
- **Circular Progress Ring**: Visual countdown (resets every hour)
- **Category Selection**: Choose from 5 categories
- **Controls**: Start, Pause/Resume, End
- **Real-time Updates**: Live elapsed time display

### Session History
- **Complete List**: All past sessions with details
- **Category Icons**: Visual category identification
- **Duration Badges**: Gradient-styled time display
- **Timestamps**: Formatted start/end times (no seconds)

### Authentication
- **Real-time Validation**: Instant feedback on inputs
- **Progress Indicator**: Signup form completion bar
- **Secure**: JWT tokens in httpOnly cookies
- **Error Handling**: Clear error messages via toasts

---



## 🏗️ Building for Production

### Client Build
```bash
cd client
npm run build
```
Output: `client/dist/`

### Server Production
```bash
cd server
node index.js
```


---

## 🧪 Testing

### Run Client Tests
```bash
cd client
npm run test
```

### Run Server Tests
```bash
cd server
npm test
```
---


## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Social features (friends, leaderboards)
- [ ] Custom achievement creation
- [ ] Pomodoro timer presets
- [ ] Export data to CSV/PDF
- [ ] Integration with calendar apps
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Notification system
- [ ] Weekly/Monthly reports

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Kavya Dhyani**

---


