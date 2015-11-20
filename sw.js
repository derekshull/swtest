var CACHE_NAME = 'my-site-cache-v1';

// The files we want to cache
var urlsToCache = [
  '/swtest/',
  '/swtest/styles.css',
  '/swtest/app.js'
];

// Set the callback for the install step
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME) //Open cache
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); //Cache the files into the cache.
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log("found something in cache...showing it now...");
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});
