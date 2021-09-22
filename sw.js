const cacheWhitelist = ['v1'];
const filesToCache = [
	'/soundboard/index.html',
	'/soundboard/main.js',
	'/soundboard/assets/css/main.css',
	'/soundboard/assets/sfx/feuerball/1.wav',
'/soundboard/assets/sfx/bierweg/1.wav',
'/soundboard/assets/sfx/dulallst/1.wav',
'/soundboard/assets/sfx/feuerball/1.wav',
'/soundboard/assets/sfx/fingervonnuggets/1.wav',
'/soundboard/assets/sfx/freibier/1.wav',
'/soundboard/assets/sfx/fuehlnichts/1.wav',
'/soundboard/assets/sfx/gehtnicht/1.wav',
'/soundboard/assets/sfx/geldalle/1.wav',
'/soundboard/assets/sfx/geldgeben/1.wav',
'/soundboard/assets/sfx/homo/1.wav',
'/soundboard/assets/sfx/homo2/1.wav',
'/soundboard/assets/sfx/homo3/1.wav',
'/soundboard/assets/sfx/jajaja/1.wav',
'/soundboard/assets/sfx/kackteil/1.wav',
'/soundboard/assets/sfx/kommdoch/1.wav',
'/soundboard/assets/sfx/lastkraftwagen/1.wav',
'/soundboard/assets/sfx/maybritthass/1.wav',
'/soundboard/assets/sfx/meinplatz/1.wav',
'/soundboard/assets/sfx/mongo/1.wav',
'/soundboard/assets/sfx/nichtgefickt/1.wav',
'/soundboard/assets/sfx/ruelps/1.wav',
'/soundboard/assets/sfx/sicherwache/1.wav',
'/soundboard/assets/sfx/sogehtdas/1.wav',
'/soundboard/assets/sfx/sonescheisse/1.wav',
'/soundboard/assets/sfx/unfall/1.wav',
'/soundboard/assets/sfx/wasserskiYorick/1.wav',
'/soundboard/assets/sfx/wievielbier/1.wav',
'/soundboard/assets/sfx/zweiliter/1.wav'
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
