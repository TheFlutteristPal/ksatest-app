
const CACHE_NAME = 'ksatest-cache-v1';
const OFFLINE_URL = '/offline';
const ROOT_URL = '/'; // Cache the main page as well

// URLs to cache on install
const urlsToCache = [
  OFFLINE_URL,
  ROOT_URL,
  // Add other critical static assets if necessary, e.g., global CSS, main JS bundles.
  // However, Next.js handles hashed asset URLs, so caching them by static name can be tricky.
  // Focusing on offline fallback and root page for simplicity in a basic SW.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Failed to cache resources during install:', err);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          // Check if we received a valid response
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const cache = await caches.open(CACHE_NAME);
            // Cache the fetched resource if it's the root URL
            if (event.request.url === self.location.origin + ROOT_URL) {
              cache.put(event.request, networkResponse.clone());
            }
          }
          return networkResponse;
        } catch (error) {
          console.log('Network request Failed. Serving offline page ' + error);
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  } else {
    // For non-navigation requests (assets like CSS, JS, images),
    // try cache first, then network.
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request)
            .then((fetchResponse) => {
              // Optionally cache new assets on the fly
              // if (fetchResponse && fetchResponse.status === 200 && event.request.method === 'GET') {
              //   const cache = await caches.open(CACHE_NAME);
              //   cache.put(event.request, fetchResponse.clone());
              // }
              return fetchResponse;
            })
            .catch(() => {
              // If an asset is not found and it's an image, you could return a placeholder
              if (event.request.destination === 'image') {
                // return caches.match('/placeholder-image.png'); // Example
              }
              return new Response('', {status: 404, statusText: 'Not Found'});
            });
        })
    );
  }
});
