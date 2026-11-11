# GEN8 — Game Discovery Platform

A Next.js App Router + React + TypeScript gaming discovery platform using IGDB through secure server-side API routes.

## Requirements
- Node.js 20.9+
- A Twitch developer application configured as **Confidential**
- Twitch Client ID and Client Secret

## Setup

```bash
npm install
cp .env.example .env.local
```

Add your credentials to `.env.local`:

```env
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
```

Then run:

```bash
npm run dev
```

Open http://localhost:3000.

## Features
- Cinematic black / garnet discovery home
- IGDB-backed discovery, search, genre/platform/year/rating filters and sorting
- Trending based on IGDB popularity primitives (IGDB visits), with hype sorting fallback
- Upcoming and recently released game feeds
- Dynamic game detail pages, available screenshots, YouTube videos and metadata
- Local persistent wishlist (no account required)
- Surprise Me random game reveal
- Responsive sidebar/mobile navigation and reduced-motion support

## IGDB setup
1. Create a Twitch account and enable two-factor authentication.
2. Register a Twitch application in the developer console. Use the **Confidential** client type.
3. Generate a client secret and place both credentials in `.env.local`.
4. Restart the dev server after changing environment variables.

The app requests an app access token using the client-credentials grant. The token and client secret are only used on the server. IGDB image URLs are derived from returned image IDs.

## Notes / data limitations
- IGDB is not a live player-count or real-time trend service. The Trending page uses the IGDB Visits popularity primitive when available; if that endpoint is unavailable, it falls back to IGDB `hypes`.
- Game platform IDs and genre IDs are fetched from IGDB and filters are passed to the API query.
- Trailer embedding is shown only when IGDB supplies a video ID. IGDB's video IDs generally point to YouTube.
- Release dates and ratings are shown only when returned by IGDB. Upcoming games are filtered by future Unix release dates.
- Wishlist is stored in this browser's localStorage and does not sync between devices.
- IGDB API access is subject to Twitch/IGDB rate limits and terms. This starter uses Next.js revalidation for data requests; review caching and rate limits before high-traffic deployment.

## Checks
```bash
npm run lint
npm run build
```

## PWA installation

GEN8 includes a web app manifest, install icons, and a service worker. Deploy the site over HTTPS, then use your browser's **Install app** / **Add to Home Screen** action. Navigation is network-first and `/api/*` is never cached, so new website deployments and current IGDB data are used instead of stale API responses. The offline page is only a fallback when the network is unavailable.

## Android app (Capacitor)

The Android app is a Capacitor WebView wrapper around the deployed GEN8 website. This is intentional: GEN8 uses Next.js server routes for IGDB, so a static export would break its data APIs. Because the wrapper loads the live website, normal Vercel deployments become visible in the installed app without rebuilding or reinstalling the APK. Users need an internet connection.

### Configure GitHub Actions

1. Push this project to GitHub.
2. Open **Settings → Secrets and variables → Actions → Variables** in the repository.
3. Add a repository variable named `GEN8_WEB_URL` with your actual production HTTPS URL (your GEN8 Vercel deployment domain).
4. Push to `main`, or run **Actions → Build GEN8 Android App → Run workflow**.
5. Download the `GEN8-Android-builds` artifact from the completed workflow. It contains a debug APK for direct testing and an unsigned release AAB.

The workflow generates the Android project on GitHub, applies the GEN8 garnet gamepad app icon from `resources/icon.png` (the same mark used by the current sidebar logo), and builds the Android artifacts. The AAB is unsigned; Play Store publishing requires signing credentials and a signed release workflow.

### Build locally

```bash
npm install
# PowerShell: $env:GEN8_WEB_URL="https://your-gen8-domain.vercel.app"
# macOS/Linux: export GEN8_WEB_URL="https://your-gen8-domain.vercel.app"
npx cap add android
npx cap sync android
npx capacitor-assets generate --android
npx cap open android
```

Do not commit Twitch credentials. Keep `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET` in Vercel environment variables for the hosted website; the native wrapper does not need them.
