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
	[ 5, 6 ],	// C : A	major sixth
	[ 7, 8 ],	// C : A#	minor seventh
	[ 15, 16 ]	// C : B	major seventh
];

function parseNote(noteString) {
	let octave = +noteString.slice(-1);
	let note = noteString.slice(0, -1);
	let noteOffset = 0;
	if (note.endsWith('b')) {
		note = note.slice(0, -1);
		noteOffset = -1;
		if (note.startsWith('A')) {
			octave -= 1;
		}
	}
	if (note.endsWith('#')) {
		note = note.slice(0, -1);
		noteOffset = 1;
	}
	note = NOTE_SEQUENCE.indexOf(note) + noteOffset;
	if (note < 0) {
		note += NOTE_SEQUENCE.length;
	}
	else if (note >= NOTE_SEQUENCE.length) {
		note -= NOTE_SEQUENCE.length;
	}
	let index = octave * NOTE_SEQUENCE.length + note - 9
	console.log(noteString, index);
	return {
		note,
		octave,
		index,
		string: noteString
	};
}

function findFrequencyRatio(note1, note2) {
	let diff = note2.index - note1.index;
	console.log('note diff', diff);
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
	for (let i = 2; i < Math.max(...args); i++) {
		let isDivisble = true;
		for (let j = 0; j < args.length; j++) {
			if (args[j] % i !== 0) {
				isDivisble = false;
			}
		}
		if (isDivisble) {
			args = args.map(n => Math.round(n / i));
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
	return simplify(...ratios);
}

module.exports = function findFrequencyRatio(...noteStrings) {
	let notes = noteStrings.map(parseNote);
	return calcRatios(...notes);
};