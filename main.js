const SFX_PATH_BASE = 'assets/sfx';
const SFX = {
	feuerball: {
		text: 'Feuerball',
		samples: 1
	},
	ruelps: {
		text: 'Rülps',
		samples: 1
	},
	homo: {
		text: 'Homo',
		samples: 1
	},
	kackteil: {
		text: 'Kackteil',
		samples: 1
	},
	fuehlnichts: {
		text: 'Ich fühl nichts',
		samples: 1
	},
	zweiliter: {
		text: '2 liter Muschi',
		samples: 1
	},
	geldgeben: {
		text: 'Gib Geld',
		samples: 1
	},
	bierweg: {
		text: 'Bleib vom Bier weg',
		samples: 1
	},
	meinplatz: {
		text: 'Mein Platz',
		samples: 1
	},
	homo2: {
		text: 'Was fürn Homo',
		samples: 1
	},
	nichtgefickt: {
		text: 'Gefickt wird nicht',
		samples: 1
	},
	unfall: {
		text: 'Da haben wir den Unfall',
		samples: 1
	},
	sonescheisse: {
		text: 'Sone Scheiße',
		samples: 1
	},
	kommdoch: {
		text: 'Komm doch Junge',
		samples: 1
	},
	homo3: {
		text: 'Homo!',
		samples: 1
	},
	sogehtdas: {
		text: 'In die Fresse ballern',
		samples: 1
	},
	mongo: {
		text: 'Verrückter Mongo',
		samples: 1
	},
	gehtnicht: {
		text: 'Junge das geht nicht',
		samples: 1
	},
	geldalle: {
		text: 'Einkaufen, Geld alle',
		samples: 1
	},
	freibier: {
		text: 'Freibier!',
		samples: 1
	},
	fingervonnuggets: {
		text: 'Lass deine Finger von meinen Nuggets',
		samples: 1
	},
	wievielbier: {
		text: 'Wie viel Bier ist das?',
		samples: 1
	},
	lastkraftwagen: {
		text: 'Lastkraftwagenfahrer',
		samples: 1
	},
	wasserskiYorick: {
		text: 'Wasserskifahren mit Yorick',
		samples: 1
	},
	sicherwache: {
		text: 'Sicher auf Wache?',
		samples: 1
	},
	dulallst: {
		text: 'Du weißt wie doll du lallst?',
		samples: 1
	},
	maybritthass: {
		text: 'Maybritt ich hasse dich',
		samples: 1
	},
	jajaja: {
		text: 'Jajaja',
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
	button.innerText = `${sfx.text}`;
	button.addEventListener('click', _ => {
		audio.src = getSFXPath(name);
		console.log(audio.src);
		audio.play();
	});
	main.appendChild(button);
}
