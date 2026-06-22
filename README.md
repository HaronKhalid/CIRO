# CIRO — Crisis Intelligence Response Operations

> **C**risis **I**ntelligence **R**esponse **O**perations — A cross-platform (Web + iOS + Android) situational-awareness and crisis-intelligence application built with Next.js 16 and Capacitor 8.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
  - [Web (Development)](#web-development)
  - [iOS (Native)](#ios-native)
  - [Android (Native)](#android-native)
- [Building for Production](#building-for-production)
- [Configuration](#configuration)
- [CI/CD](#cicd)
- [Important Notes on Next.js Version](#important-notes-on-nextjs-version)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CIRO (Crisis Intelligence Response Operations) is a real-time, cross-platform situational-awareness platform designed to surface, map, and respond to crisis events. It runs as a **Progressive Web App** in the browser and as a **native application on iOS and Android**, both powered by the same Next.js codebase wrapped in Capacitor.

The application leverages geospatial intelligence (Google Maps) to visualise crisis events, provide response coordination, and deliver intelligence feeds to operators and first responders across all major platforms — all from a single TypeScript codebase.

---

## Key Features

- **Cross-Platform** — Runs as a web app and as native iOS/Android applications via Capacitor.
- **Geospatial Intelligence** — Integration with the Google Maps JavaScript API for real-time crisis mapping and location tracking.
- **Static-First Architecture** — Built as a statically exported Next.js site for maximum portability and offline capability inside native shells.
- **Type-Safe** — Fully written in TypeScript (70.8% of the codebase) with strict type checking.
- **Responsive UI** — Built with Tailwind CSS v4 for a mobile-first, adaptive interface.
- **Native Shell** — Swift (iOS) and Java (Android) native layers for full device-level access (camera, GPS, push notifications, etc.) via Capacitor plugins.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Web Framework | [Next.js](https://nextjs.org) | 16.2.6 |
| UI Library | [React](https://react.dev) | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| CSS Processing | PostCSS + @tailwindcss/postcss | ^4 |
| Native Bridge | [Capacitor](https://capacitorjs.com) | ^8.3.4 |
| Native iOS | Swift | (Xcode) |
| Native Android | Java | (Android Studio) |
| Geospatial | Google Maps JS API | (via `@types/google.maps ^3.64.1`) |
| Linting | ESLint | ^9 |
| Package Manager | npm | — |

---

## Project Structure

```
CIRO/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD pipelines
├── android/                # Capacitor-generated Android (Java) native project
│   └── app/
│       └── src/            # Android source (Java)
├── ios/                    # Capacitor-generated iOS (Swift) native project
│   └── App/
│       └── App/            # Swift source files
├── public/                 # Static assets served as-is
├── src/                    # Next.js application source (TypeScript)
│   └── app/                # App Router pages and layouts
├── .gitignore
├── AGENTS.md               # AI agent development instructions
├── CLAUDE.md               # Claude Code project instructions
├── capacitor.config.ts     # Capacitor configuration (app ID, web output dir)
├── eslint.config.mjs       # ESLint flat config
├── next.config.ts          # Next.js configuration (static export)
├── package.json
├── package-lock.json
├── postcss.config.mjs      # PostCSS + Tailwind config
└── tsconfig.json           # TypeScript compiler config
```

### Language Breakdown

```
TypeScript   ████████████████████  70.8%   (web app — pages, components, logic)
Swift        █████                 18.0%   (iOS native layer)
Java         ██                     6.2%   (Android native layer)
JavaScript    █                     2.7%   (config files)
CSS           █                     2.3%   (global styles)
```

---

## Prerequisites

Ensure you have the following installed before proceeding:

**For web development:**
- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later (comes with Node.js)

**For iOS development (macOS only):**
- macOS with [Xcode](https://developer.apple.com/xcode/) 15+
- [CocoaPods](https://cocoapods.org/) (`sudo gem install cocoapods`)
- Apple Developer account (for device deployment / App Store)

**For Android development:**
- [Android Studio](https://developer.android.com/studio) (Hedgehog or later)
- Android SDK with API Level 21+ target
- Java Development Kit (JDK) 17+

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HaronKhalid/CIRO.git
cd CIRO
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and configure the required API keys:

```env
# Google Maps JavaScript API key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Add any other environment-specific variables below
```

> **Tip:** Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/). Enable the **Maps JavaScript API** and, optionally, the **Geocoding API** and **Places API** for full functionality.

---

## Running the App

### Web (Development)

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files under `src/`.

### iOS (Native)

> Requires macOS and Xcode.

1. **Build the Next.js static output:**
   ```bash
   npm run build
   ```
   This produces the static site in the `out/` directory (as configured by `webDir: 'out'` in `capacitor.config.ts`).

2. **Sync web assets into the iOS project:**
   ```bash
   npx cap sync ios
   ```

3. **Open in Xcode:**
   ```bash
   npx cap open ios
   ```

4. Select a simulator or connected device and press **Run** (▶) in Xcode.

### Android (Native)

1. **Build the Next.js static output:**
   ```bash
   npm run build
   ```

2. **Sync web assets into the Android project:**
   ```bash
   npx cap sync android
   ```

3. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

4. Select an emulator or connected device and press **Run** in Android Studio.

---

## Building for Production

### Web (Static Export)

```bash
npm run build
```

This runs `next build` and produces a fully static site in `out/` (configured with `output: "export"` and `trailingSlash: true` in `next.config.ts`). The output can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, S3, etc.).

### Native (iOS & Android)

After building the web output, sync and build via Capacitor:

```bash
# Build web output
npm run build

# Sync both platforms
npx cap sync

# Open native IDEs for release builds
npx cap open ios       # then Archive in Xcode for App Store
npx cap open android   # then Generate Signed Bundle in Android Studio
```

---

## Configuration

### `capacitor.config.ts`

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.haron.ciro',      // Reverse-domain bundle ID
  appName: 'ciro',              // Display name
  webDir: 'out'                 // Points to Next.js static export directory
};

export default config;
```

### `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  output: "export",             // Enables static HTML export (required for Capacitor)
  trailingSlash: true,          // Ensures correct routing in static hosts
  images: {
    unoptimized: true,          // Required for static export (no server-side image opt.)
  },
};
```

> **Why `output: "export"`?**  
> Capacitor wraps a fully static web bundle. Next.js Server Components and SSR are not available at runtime in the native shell — the app must be a self-contained static site.

---

## CI/CD

The repository ships GitHub Actions workflows under `.github/workflows/`. These typically handle:

- **Lint & Type Check** — Runs `npm run lint` and `tsc --noEmit` on every push and pull request.
- **Build verification** — Runs `npm run build` to ensure the static export succeeds.
- **Native sync check** — Optionally verifies `npx cap sync` completes without errors.

To run checks locally before pushing:

```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit

# Full build
npm run build
```

---

## Important Notes on Next.js Version

> ⚠️ This project uses **Next.js 16.2.6** (React 19). This is a bleeding-edge version with **breaking changes** compared to Next.js 13/14/15.

As noted in `AGENTS.md`:

> *"This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices."*

Key differences to be aware of:
- Some App Router APIs, server actions, and component behaviours differ from earlier versions.
- Always consult the bundled documentation at `node_modules/next/dist/docs/` rather than relying on older online resources.
- React 19 changes (new `use()` hook, Actions, improved `Suspense`, etc.) may affect component patterns.

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes, ensuring `npm run lint` and `npm run build` pass cleanly.
4. Commit with a descriptive message: `git commit -m "feat: add real-time alert feed component"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Open a Pull Request against `main`.

Please ensure all TypeScript is strongly typed and all new components are responsive (mobile-first with Tailwind CSS).

---

## License

This project is currently unlicensed. Please contact the repository owner [@HaronKhalid](https://github.com/HaronKhalid) for usage permissions.

---

<div align="center">
  Built by <a href="https://github.com/HaronKhalid">HaronKhalid</a> · Powered by Next.js & Capacitor
</div>
