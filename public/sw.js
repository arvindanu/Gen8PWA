/* GEN8 service worker: network-first documents ensure website deployments show
   up immediately. API responses are never cached because IGDB data is live. */
const CACHE_NAME = 'gen8-static-v1';
const STATIC_ASSETS = ['/offline.html', '/icons/gen8-192.png', '/icons/gen8-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () => {
      const cached = await caches.match('/offline.html');
      return cached || new Response('You are offline. Reconnect to load GEN8.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
    }));
    return;
  }

  if (url.pathname.startsWith('/_next/static/') || /\.(?:css|js|woff2?)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request).then((response) => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        });
        return cached || network;
      }),
    );
  }
});
