import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Shell } from '@/components/shell';
import { PwaRegister } from '@/components/pwa-register';

export const metadata: Metadata = {
  title: 'GEN8 — Enter Your Next World',
  description: 'Discover extraordinary games. Explore new worlds. Find your next obsession.',
  applicationName: 'GEN8',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'GEN8' },
  icons: {
    icon: [
      { url: '/icons/gen8-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/gen8-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/gen8-192.png', sizes: '192x192', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
