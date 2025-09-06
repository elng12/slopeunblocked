const CACHE_NAME = 'slope-unblocked-v1.0.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache installation failed:', error);
      })
  );
  self.skipWaiting();
});

// Fetch event - network-first for navigation, cache-first for others
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle http(s) GET requests
  if (request.method !== 'GET') {
    return;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  const isSameOrigin = url.origin === self.location.origin;

  // Strategy: Network-first for navigation requests (e.g., HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache the response only if same-origin
          if (isSameOrigin) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, fall back to the cache for the main page
          return caches.match('/index.html');
        })
    );
    return; // End execution for navigate requests
  }

  // Strategy: Cache-first for all other requests (assets, etc.)
  event.respondWith(
    caches.match(request)
      .then(response => {
        // Return from cache if found
        if (response) {
          return response;
        }

        // Otherwise, fetch from network, optionally cache, and return
        return fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.ok && isSameOrigin) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
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

// Background sync for analytics or user data
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Implement background sync logic here
  return Promise.resolve();
}

// Push notification support
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-32x32.svg',
    badge: '/icons/icon-32x32.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Play Now',
        icon: '/icons/icon-32x32.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-32x32.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Slope Unblocked', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});