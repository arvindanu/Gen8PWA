import type { CapacitorConfig } from '@capacitor/cli';

// GEN8 is a server-rendered Next.js app with IGDB API routes. The native shell
// therefore loads the deployed website instead of bundling a static export.
const webUrl = process.env.GEN8_WEB_URL || 'https://YOUR-GEN8-VERCEL-DOMAIN.vercel.app';

const config: CapacitorConfig = {
  appId: 'com.gen8.games',
  appName: 'GEN8',
  webDir: 'www',
  server: {
    url: webUrl,
    cleartext: false,
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
