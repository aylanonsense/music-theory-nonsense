const findFrequencyRatios = require('./findFrequencyRatios');
const assert = require('assert');

function test(notes, expectedRatios) {
	let actualRatios = findFrequencyRatios(...notes);
	let successful = true;
	console.log(`Testing ${notes.join(' : ')}  =>  ${expectedRatios.join(' : ')}`);
	if (actualRatios.length !== expectedRatios.length) {
		successful = false;
	}
	else {
		for (let i = 0; i < actualRatios.length; i++) {
			if (actualRatios[i] !== expectedRatios[i]) {
				successful = false;
			}
		}
	}
	if (!successful) {
		console.log('  Failure!');
		console.log(`    Expected: ${expectedRatios.join(' : ')}`);
		console.log(`    Actual:   ${actualRatios.join(' : ')}`);
	}
}


// keep in mind, octaves start on C, e.g. F3 G3 A3 B3 -> C4 <- D4 E4

// test wrapping
// test([ 'C3', 'C#3' ], [ 16, 15 ]);
// test([ 'F#6', 'G6' ], [ 16, 15 ]);
// test([ 'G5', 'G#5' ], [ 16, 15 ]);
// test([ 'G#2', 'A2' ], [ 16, 15 ]);
// test([ 'C3', 'C#4' ], [ 32, 15 ]);
// test([ 'F#6', 'G7' ], [ 32, 15 ]);
// test([ 'G5', 'G#6' ], [ 32, 15 ]);
// test([ 'G#2', 'A3' ], [ 32, 15 ]);

// C3 chromatic scale
// test([ 'C3', 'C3' ],	[ 1, 1 ]);
// test([ 'C3', 'C#3' ],	[ 16, 15 ]);
// test([ 'C3', 'Db3' ],	[ 16, 15 ]);
// test([ 'C3', 'D3' ],	[ 9, 8 ]);
// test([ 'C3', 'D#3' ],	[ 6, 5 ]);
// test([ 'C3', 'Eb3' ],	[ 6, 5 ]);
// test([ 'C3', 'E3' ],	[ 5, 4 ]);
// test([ 'C3', 'Fb3' ],	[ 5, 4 ]);
// test([ 'C3', 'E#3' ],	[ 4, 3 ]);
// test([ 'C3', 'F3' ],	[ 4, 3 ]);
// test([ 'C3', 'F#3' ],	[ 24, 17 ]);
// test([ 'C3', 'Gb3' ],	[ 24, 17 ]);
// test([ 'C3', 'G3' ],	[ 3, 2 ]);

// test([ 'C3', 'G#3' ],	[ 8, 5 ]);
// test([ 'C3', 'Ab3' ],	[ 8, 5 ]);
test([ 'C3', 'A3' ],	[ 5, 3 ]);
// test([ 'C3', 'A#3' ],	[ 7, 4 ]);
// test([ 'C3', 'Bb3' ],	[ 7, 4 ]);
// test([ 'C3', 'B3' ],	[ 15, 8 ]);
// test([ 'C3', 'Cb4' ],	[ 15, 8 ]);

// test([ 'C3', 'B#4' ],	[ 2, 1 ]);
// test([ 'C3', 'C4' ],	[ 2, 1 ]);

// // Fb5 (a.k.a. E5) chromatic scale
// test([ 'E5', 'E5' ],	[ 1, 1 ]);
// test([ 'E5', 'F5' ],	[ 16, 15 ]);
// test([ 'E5', 'F#5' ],	[ 9, 8 ]);
// test([ 'E5', 'G5' ],	[ 6, 5 ]);
// test([ 'E5', 'G#5' ],	[ 5, 4 ]);
// test([ 'E5', 'A5' ],	[ 4, 3 ]);
// test([ 'E5', 'A#5' ],	[ 24, 17 ]);
// test([ 'E5', 'B5' ],	[ 3, 2 ]);
// test([ 'E5', 'C6' ],	[ 8, 5 ]);
// test([ 'E5', 'C#6' ],	[ 5, 6 ]);
// test([ 'E5', 'D6' ],	[ 7, 8 ]);
// test([ 'E5', 'D#6' ],	[ 15, 16 ]);
// test([ 'E5', 'E6' ],	[ 2, 1 ]);


