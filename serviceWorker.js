let cacheName = "pwa-app-native";
let filesToCache = 
["./", "./index.html", "./pages.html","./manifest.json", 
"./css/pages.css",
"./css/site.css",
"./css/pages.css"
]; //removed "./js/main.js"

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});