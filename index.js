const FREQ_A4 = 440;
const FREQ_RATIO = 1.0594630943592953;
const NOTE_SEQUENCE = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const ALLOWED_ERROR = 0.01;

// const FREQ_RATIOS = [do re mi fa so la ti do
// C  D   E   F   G   A    B  C
// 1 9/8 5/4 4/3 3/2 5/3 15/8 2
// ]

// const DEBUG_NOTES = [ 4186.01, 3951.07, 3729.31, 3520.00, 3322.44, 3135.96, 2959.96, 2793.83, 2637.02, 2489.02, 2349.32, 2217.46, 2093.00, 1975.53, 1864.66, 1760.00, 1661.22, 1567.98, 1479.98, 1396.91, 1318.51, 1244.51, 1174.66, 1108.73, 1046.50, 987.767, 932.328, 880.000, 830.609, 783.991, 739.989, 698.456, 659.255, 622.254, 587.330, 554.365, 523.251, 493.883, 466.164, 440.000, 415.305, 391.995, 369.994, 349.228, 329.628, 311.127, 293.665, 277.183, 261.626, 246.942, 233.082, 220.000, 207.652, 195.998, 184.997, 174.614, 164.814, 155.563, 146.832, 138.591, 130.813, 123.471, 116.541, 110.000, 103.826, 97.9989, 92.4986, 87.3071, 82.4069, 77.7817, 73.4162, 69.2957, 65.4064, 61.7354, 58.2705, 55.0000, 51.9130, 48.9995, 46.2493, 43.6536, 41.2035, 38.8909, 36.7081, 34.6479, 32.7032, 30.8677, 29.1353, 27.5000 ];

function getFrequency(note) {
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
	let index = noteNumber + octaveNumber * NOTE_SEQUENCE.length - 9;
	return FREQ_A4 * (FREQ_RATIO**(index-48));
	// return DEBUG_NOTES[87 - index]
}

function processNotes(notes) {
	let noteStrings = notes.split(' ');
	let frequencies = noteStrings.map(getFrequency);
	let increments = frequencies.map(freq => freq);
	let allIncrementsEqual = false;
	for (let i = 0; i < 1000 && !allIncrementsEqual; i++) {
		allIncrementsEqual = true;
		let lowestIndex = 0;
		for (let j = 1; j < increments.length; j++) {
			if (increments[j] < increments[lowestIndex] * (1 - ALLOWED_ERROR) ||
				increments[j] > increments[lowestIndex] * (1 + ALLOWED_ERROR)) {
				allIncrementsEqual = false;
			}
			if (increments[j] < increments[lowestIndex]) {
				lowestIndex = j;
			}
		}
		if (!allIncrementsEqual) {
			increments[lowestIndex] += frequencies[lowestIndex];
		}
	}
	// console.log('increments', increments);
	// console.log(increments[0] / frequencies[0]);
	if (allIncrementsEqual) {
		let results = increments.map((amt, i) => Math.round(amt / frequencies[i]));
		console.log(results.join(' : '));
	}
	else {
		console.log('No repeating pattern found');
	}
}

const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function prompt() {
	rl.question('Gimme some notes (e.g. C#3 Ab6): ', response => {
		processNotes(response);
		prompt()
	});
}

prompt()