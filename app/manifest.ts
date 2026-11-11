import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'GEN8 — Game Discovery',
    short_name: 'GEN8',
    description: 'Discover extraordinary games. Explore new worlds. Find your next obsession.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#000000',
    theme_color: '#080808',
    categories: ['entertainment', 'games'],
    icons: [
      { src: '/icons/gen8-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/gen8-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/gen8-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
