const NOTE_SEQUENCE = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const FREQUENCY_RATIOS = [
	[ 1, 1 ],	// C : C	unison
	[ 16, 15 ],	// C : C#	minor second
	[ 9, 8 ],	// C : D	major second
	[ 6, 5 ],	// C : D#	minor third
	[ 5, 4 ],	// C : E	major third
	[ 4, 3 ],	// C : F	perfect fourth
	[ 24, 17 ],	// C : F#	tritone
	[ 3, 2 ],	// C : G	perfect fifth
	[ 8, 5 ],	// C : G#	minor sixth
	[ 5, 3 ],	// C : A	major sixth
	[ 7, 4 ],	// C : A#	minor seventh
	[ 15, 8 ]	// C : B	major seventh
];

// function testFrequencyRatios(i, j) {
// 	// e.g. C E F
// 	let [ r1, r2 ] = FREQUENCY_RATIOS[i];
// 	let [ r3, r4 ] = FREQUENCY_RATIOS[j];
// 	let first = r1 * r3;
// 	let second = r2 * r3;
// 	let third = r4 * r1;
// 	let ratios = simplify(first, second, third);
// 	let expected = FREQUENCY_RATIOS[j - i];
// 	let ratios2 = simplify(ratios[1], ratios[2]);
// 	if (expected[0] !== ratios2[0] || expected[1] !== ratios2[1]) {
// 		console.log('NOOP', i, j);
// 		console.log('  actual:  ', ratios2);
// 		console.log('  expected:', expected);
// 	}
// 	else {
// 		// console.log('YAHP', i, j);
// 	}
// }

// testFrequencyRatios(1, 2);
// for (let i = 0; i < FREQUENCY_RATIOS.length; i++) {
// 	for (let j = i; j < FREQUENCY_RATIOS.length; j++) {
// 		testFrequencyRatios(i, j);
// 	}
// }


// CE   5 4
// CF   4 3
// EF  16 15

// CEF  20 16 15

// CGA  

//

// CD 1 : 4
// DE 3 : 2
// CE 3 : 8

// 3 : 12 : 8
// CDE

function parseNote(noteString) {
	let octave = +noteString.slice(-1);
	let note = noteString.slice(0, -1);
	let noteOffset = 0;
	if (note.endsWith('b')) {
		note = note.slice(0, -1);
		noteOffset = -1;
	}
	if (note.endsWith('#')) {
		note = note.slice(0, -1);
		noteOffset = 1;
	}
	note = NOTE_SEQUENCE.indexOf(note) + noteOffset;
	if (note < 0) {
		note += NOTE_SEQUENCE.length;
		octave -= 1;
	}
	else if (note >= NOTE_SEQUENCE.length) {
		note -= NOTE_SEQUENCE.length;
		octave += 1;
	}
	let index = octave * NOTE_SEQUENCE.length + note - 9
	return {
		note,
		octave,
		index,
		string: noteString
	};
}

function findFrequencyRatio(note1, note2) {
	let diff = note2.index - note1.index;
	let freq1
	let freq2
	if (diff >= 0) {
		[ freq1, freq2 ] = FREQUENCY_RATIOS[diff%NOTE_SEQUENCE.length];
	}
	else {
		[ freq2, freq1 ] = FREQUENCY_RATIOS[Math.abs(diff)%NOTE_SEQUENCE.length]
	}
	if (diff >= 0) {
		freq1 *= 2**Math.floor(diff / NOTE_SEQUENCE.length);
	}
	else {
		freq2 *= 2**Math.floor(Math.abs(diff) / NOTE_SEQUENCE.length);
	}
	return simplify(freq1, freq2);
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

function calcRatios(...notes) {
	let ratios = notes.map(note => 1);
	for (let i = 1; i < notes.length; i++) {
		let [ freq1, freq2 ] = findFrequencyRatio(notes[0], notes[i]);
		for (let j = 0; j < notes.length; j++) {
			ratios[j] *= (j === i ? freq2 : freq1);
		}
	}
	// for (let i = 0; i < notes.length; i++) {
	// 	for (let j = i + 1; j < notes.length; j++) {
	// 		let [ freq1, freq2 ] = findFrequencyRatio(notes[i], notes[j]);
	// 		for (let k = 0; k < notes.length; k++) {
	// 			// ratios[j] *= (j === i ? freq2 : freq1);
	// 		}
	// 	}
	// }
	return simplify(...ratios);
}

module.exports = function findFrequencyRatio(...noteStrings) {
	let notes = noteStrings.map(parseNote);
	return calcRatios(...notes);
};