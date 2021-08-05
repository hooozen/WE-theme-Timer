var VERSION = 'v1';

var images = [];
for (var i = 0; i < 28; i++) {
  images.push('./style/assets/images/bg-' + i + '.jpg');
}

// 缓存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll([
        './index.html',
        './script/main.js',
        './style/index.css',
      ].concat(images));
    })
  );
});

// 缓存更新
self.addEventListener('activate', event => {
  console.debug('enter active event: ', event);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            caches.delete(cacheName);
          }
        }));
    }));
});

// 监听 fetch 事件
self.addEventListener('fetch', event => {
  event.respondWith(
    // 检查缓存
    caches.open(VERSION).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (event.request.url.indexOf('http') !== 0) return;
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});