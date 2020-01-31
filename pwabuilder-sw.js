self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open("pwabuilder-offline").then(function (cache) {
            return cache.addAll([
                'index.html',
                'list.html',
                'detail.html',
                'manifest.json',
                'js/detail.js',
                'js/index.js',
                'js/list.js',
                'css/master.css',
                'images/icons/icon-72x72.png',
                'images/icons/icon-96x96.png',
                'images/icons/icon-128x128.png',
                'images/icons/icon-144x144.png',
                'images/icons/icon-152x152.png',
                'images/icons/icon-192x192.png',
                'images/icons/icon-384x384.png',
                'images/icons/icon-512x512.png'
            ]);
        }).catch(function(err){console.error(err)})
    );
});

self.addEventListener("fetch", function (event) {
    var updateCache = function (request) {
        return caches.open("pwabuilder-offline").then(function (cache) {
            return fetch(request).then(function (response) {
                // console.log("[PWA Builder] add page to offline " + response.url);
                return cache.put(request, response);
            });
        })
    };

    event.waitUntil(updateCache(event.request));

    event.respondWith(
        fetch(event.request).catch(function (error) {
            // console.log("[PWA Builder] network request failed. Serving content from cache: " + error);

            return caches.open("pwabuilder-offline").then(function (cache) {
                return cache.match(event.request).then(function (matching) {
                    var report = !matching || matching.status == 404 ? Promise.reject("no-match") : matching;
                    return report;
                });
            });
        })
    );
});

self.addEventListener("push", function (event) {
    // console.log("[PWA Builder] Push received");
    // console.log(`[PWA Builder] Push has this data: "${event.data.text()}"`);
    // console.log(`[PWA Builder] ${event.data.text()}`);

    const title = "Marcelo Montlvão";
    const options = {
        body: "Obrigado por visitar!",
        icon: "imgs/perfil.png", //"/assets/apple-icon-60x60.png"
        vibrate: [800, 100, 500],
        badge: "assets/favicon-16x16.png"
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    // console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://marcelo-rm.github.io/portifolio')
    );
});