// MAI topic service worker
// HTML documents: network-first (daily updates arrive), cache as fallback.
// Other same-origin files (icons, manifest): cache-first with runtime update.
const CACHE = 'mai-topic-v1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isDocument = req.mode === 'navigate' || req.destination === 'document' ||
    url.pathname.endsWith('.html') || url.pathname.endsWith('/');

  if (isDocument) {
    // Network-first so a fresh daily edition shows up immediately.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put('./index.html', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Cache-first for icons / manifest / other static files, refreshed in background.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
