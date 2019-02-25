// const assetsCached = [
//     'index.html',
//     'restaurant.html',
//     'css/',
//     'css/',
// ];

// Second step: INSTALL Service Workers
let cacheName = 'firstCached';
// self.addEventListener('install', event => {
//     event.waitUntill(
//         caches.open(cacheName)
//         .then(casheObj => {
//             cashe.addAll(assetsCached);
//         })
//     );
// });

// Third step: Activate Service Workers
self.addEventListener('activate', event => {
    //Git rid of old cashe if it's not the same as the current cashe
    event.waitUntill(
        caches.keys().then(cacheNamesArr => {
            return Promise.all(
                cacheNamesArr.map(currentCache => {
                    if(currentCache !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});

// Second step: INSTALL Service Workers
// Show the cached files on offline mode
self.addEventListener('fetch', event => {
    //First check if there is a connection then return the live site
    // If there isn't any connection then render the cached app
    event.respondWith(
        fetch(event.request)
        .then(response => {
            // Clone the response
            const resClone = response.clone();
            // Open the cache
            caches
                .open(cacheName)
                .then(cacheObj => {
                    // Add response to cache
                    cacheObj.put(event.request, resClone);
                });
                return response;
        }).catch(err => caches.match(event.request).then(response => response))
    );
});



