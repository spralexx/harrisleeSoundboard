const cacheWhitelist = ['v1'];
const filesToCache = [
	'/soundboard/index.html',
	'/soundboard/main.js',
	'/soundboard/assets/css/main.css',
	'/soundboard/assets/sfx/allo/1.wav',
	'/soundboard/assets/sfx/allo/2.wav',
	'/soundboard/assets/sfx/allo/3.wav',
	// '/soundboard/assets/sfx/',
];

// On installation, add assets to cache
self.addEventListener('install', event => {
	console.log('[Service worker] Install');
	event.waitUntil(
		caches.open('v1').then(cache => cache.addAll(filesToCache))
	)
});

// Intercept requests to use cache when possible
self.addEventListener('fetch', event => {
	console.log('[Service worker] Fetch');
	event.respondWith(
		caches.match(event.request).then(response => response || fetch(event.request))
	)
});

// On update, remove old unused caches
self.addEventListener('activate', event => {
	console.log('[Service worker] Activate');
	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys.map(key => {
				if (!cacheWhitelist.includes(key)) {
					return caches.delete(key);
				}
			})
		))
	)
});
