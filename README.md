# DevForge — Next-Gen Competitive Coding & Learning Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-7.9.1-2D3748?style=for-the-badge&logo=prisma" alt="Prisma 7" />
  <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase Auth" />
  <img src="https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</p>

DevForge is a full-stack, enterprise-grade competitive programming and student learning platform engineered with **Next.js 16 (App Router & Turbopack)**, **React 19**, **Firebase Authentication**, **Prisma 7 ORM**, and **PostgreSQL**.

The system features real-time leaderboard analytics, contest enrollment with unique user constraints, code submission persistence, and server-side token authentication.

---

## 🚀 Architectural Overview

DevForge implements a hybrid security and data synchronization pattern:

```
[ Client Browser ]
        │
        ├── 1. Firebase Authentication (Google / Email & Password)
        │       │
        │       ▼
        ├── 2. Obtains Firebase ID Token
        │       │
        │       ▼
        ├── 3. Sends API Requests with `Authorization: Bearer <ID_Token>`
        │       │
        │       ▼
[ Next.js Server Route Handlers ]
        │
        ├── 4. Server-Side Token Verification via Firebase Identity Toolkit REST API
        │       │
        │       ▼ Resolves Authenticated UID & Email
        ├── 5. Prisma 7 ORM (Driver Adapter `@prisma/adapter-pg`)
        │       │
        │       ▼
[ PostgreSQL Database (`devForge`) ]
        └── Syncs Users, Contest Registrations, Problems & Submissions
```

---

## ✨ Key Features

### 🔐 1. Server-Verified Authentication Sync
- **Client Auth**: Firebase Authentication for seamless Google OAuth and Email/Password flows.
- **Server Verification**: Secure server-side Firebase ID token verification (`verifyToken.ts`) using Google Identity Toolkit API.
- **PostgreSQL Upsert**: Automatic synchronization into PostgreSQL `User` table upon sign-in with onboarding detail preservation (`branch`, `year`, `rollNumber`, `bio`).

### 🏆 2. Contest & Event Management
- Real-time contest listings with status tracking (`upcoming`, `active`, `past`).
- One-click contest registration backed by PostgreSQL `EventRegistration` join table.
- **Duplicate Prevention**: Enforces `@@unique([userId, eventId])` constraint to prevent double enrollment.

### 💻 3. Problems Hub & Anti-Exploit XP Engine
- Comprehensive problem catalog categorized by difficulty (`Easy`, `Medium`, `Hard`) and topics (`Arrays`, `Strings`, `DP`, `Math`).
- Code submission persistence in PostgreSQL with execution metrics (`runtimeMs`, `memoryKb`, `passedTests`).
- **First-Accepted Solution Rule**: `User.problemsSolved` (+1) and `User.xp` (+50) are awarded **only on the user's first accepted solution** per problem. Subsequent submissions record the code entry but award **0 duplicate XP**.

### 📊 4. Live Leaderboard & Profile Analytics
- Real-time leaderboard querying top engineering students by overall XP.
- Profile dashboard displaying problem-solving history, XP growth, and college rank.

### 🎨 5. Glassmorphism Design System
- Modern dark-mode UI built with Vanilla CSS variables, Lucide icons, Framer Motion micro-animations, and Three.js 3D backgrounds.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.10 (App Router, Turbopack, Cache Components) |
| **Frontend** | React 19.2.4, TypeScript, Tailwind CSS v4, Lucide React |
| **Database** | PostgreSQL 16 (`devForge`) |
| **ORM** | Prisma 7.9.1 (`@prisma/client`, `@prisma/adapter-pg`, `pg`) |
| **Authentication** | Firebase Auth v12 (Client SDK) + Firebase Identity Toolkit REST API (Server Validation) |
| **3D & Visuals** | Three.js, React Three Fiber, Framer Motion |

---

## 📁 Repository Structure

```
portal-main/
├── prisma/
│   ├── migrations/             # PostgreSQL database migrations
│   └── schema.prisma           # Prisma schema definition (User, Problem, Submission, Event, EventRegistration)
├── public/                     # Static media and icons
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/sync/      # POST /api/auth/sync (User upsert handler)
│   │   │   ├── contests/       # GET /api/contests, POST /api/contests/register
│   │   │   ├── leaderboard/    # GET /api/leaderboard
│   │   │   ├── problems/       # GET /api/problems
│   │   │   └── submissions/    # POST/GET /api/submissions (Submission & XP Engine)
│   │   ├── dashboard/          # Dashboard routes (contests, problems, leaderboard, profile)
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── onboarding/         # Onboarding page
│   │   ├── globals.css         # Core CSS tokens & styles
│   │   └── layout.tsx          # Root Application Layout
│   ├── components/             # Reusable UI components (GlassCard, Button, Input, Navbars)
│   ├── context/
│   │   └── AuthContext.tsx     # Client Auth Context & Firebase State Listener
│   ├── lib/
│   │   ├── auth/verifyToken.ts # Server-side Firebase ID token verification
│   │   ├── db/prisma.ts        # Prisma Client singleton with PrismaPg adapter
│   │   ├── db/service.ts       # Database service functions (syncUserDB)
│   │   └── firebase.ts         # Firebase initialization
│   └── types/                  # TypeScript interface definitions
├── firestore.rules             # Cloud Firestore Security Rules
├── next.config.ts              # Next.js 16 configuration
├── package.json                # Project dependencies
└── tsconfig.json               # TypeScript configuration
```

---

## 📋 Database Schema

```prisma
model User {
  id                  String              @id @default(cuid())
  uid                 String              @unique
  email               String              @unique
  displayName         String
  username            String              @unique
  rollNumber          String?
  branch              String
  year                String
  role                String              @default("student")
  xp                  Int                 @default(0)
  level               Int                 @default(1)
  problemsSolved      Int                 @default(0)
  createdAt           DateTime            @default(now())
  updatedAt           DateTime            @updatedAt
  lastLoginAt         DateTime?
  submissions         Submission[]
  eventRegistrations  EventRegistration[]
}

model Problem {
  id               String       @id @default(cuid())
  title            String
  slug             String       @unique
  description      String
  difficulty       String
  category         String
  tags             String[]
  xpReward         Int          @default(0)
  acceptanceRate   Float        @default(0)
  totalSubmissions Int          @default(0)
  totalAccepted    Int          @default(0)
  submissions      Submission[]
}

model Submission {
  id          String   @id @default(cuid())
  userId      String
  problemId   String
  code        String
  language    String
  status      String
  runtimeMs   Int      @default(0)
  memoryKb    Int      @default(0)
  xpEarned    Int      @default(0)
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  problem     Problem  @relation(fields: [problemId], references: [id], onDelete: Cascade)
}

model Event {
  id              String              @id @default(cuid())
  title           String
  type            String
  description     String
  date            DateTime
  location        String
  registeredCount Int                 @default(0)
  registrations   EventRegistration[]
}

model EventRegistration {
  id        String   @id @default(cuid())
  userId    String
  eventId   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  event     Event    @relation(fields: [eventId], references: [id], onDelete: Cascade)

  @@unique([userId, eventId])
}
```

---

## ⚡ Getting Started (Local Development)

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **PostgreSQL**: `v15.x` or higher running locally (or hosted via Neon/Supabase)
- **Firebase Project**: Firebase account with Authentication enabled

### 2. Clone & Install Dependencies
```bash
git clone https://github.com/SwathiPanjala91/DevForge.git
cd DevForge
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/devForge"

# Firebase Client Credentials
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_PROJECT_ID.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_PROJECT_ID.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
```

### 4. Database Setup & Prisma Generation
```bash
# Push schema to local PostgreSQL database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 5. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Run the end-to-end database verification script:
```bash
node scratch/verify_all.js
```
Or verify production build compilation:
```bash
npm run build
```

---

## 📡 API Reference Summary

| Endpoint | Method | Header | Description |
|---|---|---|---|
| `/api/auth/sync` | `POST` | `Bearer <token>` | Syncs authenticated Firebase user to PostgreSQL |
| `/api/contests` | `GET` | Optional `Bearer <token>` | Fetches contest schedule & user registration state |
| `/api/contests/register` | `POST` | `Bearer <token>` | Enrolls user in contest & increments registration count |
| `/api/problems` | `GET` | Optional `Bearer <token>` | Fetches problem list & user solved/attempted status |
| `/api/submissions` | `POST` | `Bearer <token>` | Stores code submission & calculates XP rewards |
| `/api/submissions` | `GET` | `Bearer <token>` | Retrieves submission history for authenticated user |
| `/api/leaderboard` | `GET` | None | Returns top 50 student leaderboard rankings |

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
