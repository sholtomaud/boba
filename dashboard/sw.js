// Offline support without a build plugin. Requests go to the network first,
// so users always get the latest deploy; every successful same-origin GET is
// cached, and the cache answers when the network is unavailable.
const CACHE = 'doomsday-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// A page's first load happens before this worker can intercept anything, so
// the page sends the URLs it loaded (see main.ts) to be cached here.
self.addEventListener('message', (event) => {
  if (!Array.isArray(event.data)) return;
  const urls = [self.registration.scope, ...event.data].filter((url) =>
    url.startsWith(self.location.origin)
  );
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => Promise.allSettled(urls.map((url) => cache.add(url))))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin))
    return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          );
        }
        return response;
      })
      .catch(async () => {
        // Match on the URL alone: the cached copy may have been requested
        // with different headers (e.g. by cache.add above).
        const cached = await caches.match(request, { ignoreVary: true });
        if (cached) return cached;
        // Any route of the single-page app is served by the app shell.
        if (request.mode === 'navigate') {
          const shell = await caches.match(self.registration.scope);
          if (shell) return shell;
        }
        return Response.error();
      })
  );
});
