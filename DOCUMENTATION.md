# DevForge - Next-Gen Learning Platform

DevForge is a premium, AI-powered coding learning platform built with Next.js 15, TypeScript, Firebase, and Tailwind CSS. It features immersive experiences, personalized student dashboards, problem-solving environments, and role-based administration.

## Table of Contents
1. [Installation Guide](#installation-guide)
2. [Environment Setup](#environment-setup)
3. [Firebase Setup](#firebase-setup)
4. [Deployment Guide](#deployment-guide)
5. [User Guides](#user-guides)
6. [Project Architecture](#project-architecture)

---

## Installation Guide
Prerequisites: Node.js 18+ and npm.

```bash
# Clone the repository
git clone <repository-url>
cd code

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Setup
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup
1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password & Google).
3. Enable **Cloud Firestore**.
4. Set up **Firebase Security Rules** (use the `firestore.rules` file in this repository).

## Deployment Guide
This project is optimized for **Firebase Hosting**.

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## User Guides
### Student Usage
- **Dashboard:** Track XP, level, streak, and recent activity.
- **Problems:** Access categorized coding problems, use the editor, and submit solutions.
- **Profile:** Manage personal stats and learning history.

### Admin Usage
- **Access:** Admin dashboard requires an account with the 'admin' role in Firestore.
- **Management:** Manage users, problems, contests, and view site analytics.

## Project Architecture
- **Framework:** Next.js 15 (App Router).
- **Styling:** Tailwind CSS + Framer Motion.
- **State Management:** React Context (Auth, Theme, Toast).
- **Database:** Cloud Firestore.
- **Structure:**
  - `src/app`: Pages and Layouts.
  - `src/components`: UI components & Dashboard modules.
  - `src/context`: Global providers.
  - `src/lib`: External services (Firebase, API).
  - `src/types`: TypeScript interfaces.
