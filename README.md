# Equippd — Faith. Community. Growth.

A React Native mobile app built with Expo Router for the Equippd community. Features Bible study groups, notes, music discovery, and more.

## Tech Stack

- **Framework:** Expo SDK 51 with Expo Router (file-based navigation)
- **Language:** TypeScript (strict mode)
- **Backend:** Firebase (Auth + Firestore)
- **UI:** React Native with custom dark theme

## Features

- 🔐 **Authentication** — Email/password sign up & sign in via Firebase Auth
- 📖 **Bible Study Groups** — Join groups and browse study content
- 📝 **Notes** — Create, edit, and delete personal study notes
- 🎵 **Music** — Curated faith-centered music discovery
- 🛍️ **Shop** — Coming soon: Equippd apparel and resources
- ⚙️ **Settings** — Profile and account management

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- A Firebase project with Auth and Firestore enabled

### Installation

```bash
# Clone the repo
git clone https://github.com/christoph-codes/equippdlife.git
cd equippdlife

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env
# Fill in your Firebase config values in .env
```

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password** authentication
3. Create a **Firestore** database
4. Copy your Firebase config into `.env`
5. Deploy Firestore security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Running the App

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

### Seeding Firestore

To create the default "The Fellas" group in Firestore:

```bash
FIREBASE_PROJECT_ID=your-project-id npx ts-node scripts/seedFirestore.ts
```

> **Note:** The app also auto-seeds the default group on first load via `seedDefaultGroup()`.

## Project Structure

```
equippdlife/
├── app/                        # Expo Router pages
│   ├── _layout.tsx             # Root layout (auth gate)
│   ├── index.tsx               # Entry redirect
│   ├── login.tsx               # Login screen
│   ├── signup.tsx              # Signup screen
│   └── (app)/                  # Authenticated tab layout
│       ├── _layout.tsx         # Tab navigator
│       ├── dashboard.tsx       # Home dashboard
│       ├── groups.tsx          # Groups list
│       ├── music.tsx           # Music discovery
│       ├── shop.tsx            # Shop (coming soon)
│       ├── settings.tsx        # User settings
│       ├── groups/
│       │   └── [groupSlug]/
│       │       ├── index.tsx   # Group detail
│       │       └── studies/
│       │           ├── index.tsx        # Studies list
│       │           └── [studySlug].tsx  # Study detail
│       └── notes/
│           └── [noteId].tsx    # Note editor
├── src/
│   ├── components/             # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Content loader utilities
│   ├── services/               # Firebase service functions
│   ├── theme/                  # Design tokens
│   └── types/                  # TypeScript interfaces
├── content/
│   └── studies/
│       └── the-fellas/         # MDX study content (reference)
├── scripts/
│   └── seedFirestore.ts        # Firestore seed script
├── assets/                     # App icons and splash
├── firestore.rules             # Firestore security rules
├── app.json                    # Expo config
└── babel.config.js             # Babel config
```

## Theme

The app uses a dark theme with a gold accent:

| Token | Value |
|-------|-------|
| Background | `#0A0A0A` |
| Surface | `#141414` |
| Primary (Gold) | `#C8A96A` |
| Text | `#F5F5F5` |
| Text Secondary | `#9B9B9B` |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |

## Firestore Data Model

```
users/{uid}
  - uid: string
  - displayName: string
  - email: string
  - createdAt: Timestamp
  - updatedAt: Timestamp

groups/{groupId}
  - name: string
  - slug: string
  - description: string
  - organization: string
  - createdAt: Timestamp
  - updatedAt: Timestamp
  members/{userId}
    - userId: string
    - role: 'member' | 'leader' | 'admin'
    - joinedAt: Timestamp

notes/{noteId}
  - userId: string
  - groupSlug: string
  - studySlug: string
  - title: string
  - body: string
  - createdAt: Timestamp
  - updatedAt: Timestamp
```

## License

Private — All rights reserved by Equippd.
