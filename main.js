const SFX_PATH_BASE = 'assets/sfx';
const SFX = {
	feruerball: {
		text: 'Feuerball',
		samples: 1
	}
};

/**
 * Returns a random number between two bounds
 * @param {*} min 
 * @param {*} max 
 */
function getRandomNumber (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random sample path for the given SFX
 * @param {*} name 
 */
function getSFXPath (name) {
	if (!(name in SFX)) throw new Error(`Unknown SFX: ${name}`);
	return SFX_PATH_BASE + '/' + name + '/' + getRandomNumber(1, SFX[name].samples) + '.wav';
}

const audio = new Audio();
const main = document.querySelector('main');

// Register service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', async _ => {
		try {
			const registration = await navigator.serviceWorker.register('/soundboard/sw.js', {
				scope: '/soundboard/'
			});
			console.log(registration);
		} catch (err) {
			console.log(err.message);
		}
	})
}

// Create buttons
for (const [name, sfx] of Object.entries(SFX)) {
	const button = document.createElement('button');
	button.innerText = `${sfx.text} (${sfx.samples})`;
	button.addEventListener('click', _ => {
		audio.src = getSFXPath(name);
		console.log(audio.src);
		audio.play();
	});
	main.appendChild(button);
}
