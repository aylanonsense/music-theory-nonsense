const NOTE_SEQUENCE = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const FREQ_A4 = 1; //440;
const FREQ_RATIO = 1.0594630943592953;

function getNoteIndex(note) {
	let noteString = note.slice(0, -1);
	let noteOffset = 0;
	if (noteString.endsWith('b')) {
		noteString = noteString.slice(0, -1);
		noteOffset = -1;
	}
	if (noteString.endsWith('#')) {
		noteString = noteString.slice(0, -1);
		noteOffset = 1;
	}
	let noteNumber = NOTE_SEQUENCE.indexOf(noteString) + noteOffset;
	let octaveNumber = +note.slice(-1);
	return noteNumber + octaveNumber * NOTE_SEQUENCE.length - 9;
}

function getFrequency(note) {
	return FREQ_A4 * (FREQ_RATIO**(getNoteIndex(note)-48));
}

function createWaveform(freq) {
	return t => Math.cos(t * freq * 2 * Math.PI);
}

function createCompositeWaveform(...freqs) {
	let waveforms = freqs.map(createWaveform);
	return t => {
		return waveforms.reduce((sum, wave) => sum + wave(t), 0);
	};
}

function sketchWaveform(waveform) {
	for (let t = 0; t < 200; t++) {
		let n = waveform(t / 100);
		console.log(' '.repeat(20 + 5 * n) + '*' + ' '.repeat(20) + ' <- ' + n + '  /  ' + t);
	}
}

function findFrequencyRatios(...notes) {
	let freqs = notes.map(getFrequency);
	let maxFreq = Math.max(...freqs);
	let minFreq = Math.min(...freqs);
	freqs = freqs.map(f => f / minFreq);
	let waveform = createCompositeWaveform(...freqs);
	let numCrests = null;
	let minError = null;
	// see if the pattern repeats after n crests
	for (let n = 1; n < 20; n++) {
		let offset = n / maxFreq;
		// sample the wave
		for (let i = 1; i < 1000 * n; i++) {
			// collect error
			let totalError = 0;
			for (let j = 0; j < 10; j++) {
				let err = Math.abs(waveform(offset * n / 100) - waveform(j * offset + offset * n / 100));
				totalError += err;
			}
			totalError /= n;
			if (minError === null || totalError < minError - 0.01) {
				numCrests = n;
				minError = totalError;
			}
		}
	}
	// console.log(numCrests, freqs, maxFreq, minFreq);
	return {
		ratios: simplify(...(freqs.map(f => Math.round(100 * numCrests / f) / 100))),
		error: minError
	};
}

function simplify(...args) {
	for (let i = 2; i <= Math.max(...args); i++) {
		let isDivisble = true;
		for (let j = 0; j < args.length; j++) {
			if (args[j] % i !== 0) {
				isDivisble = false;
			}
		}
		if (isDivisble) {
			args = args.map(n => Math.round(n / i));
			i = 1;
		}
	}
	return args;
}

module.exports = findFrequencyRatios;
