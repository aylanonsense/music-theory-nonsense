const findFrequencyRatios = require('./perceptual');
const assert = require('assert');

let numTests = 0;
let numFailures = 0;
function test(notes, expectedRatios, skipReverse) {
	console.log(`Testing ${notes.join(' : ')}  =>  ${expectedRatios.join(' : ')}`);
	let actualRatios = findFrequencyRatios(...notes).ratios;
	let successful = true;
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
	numTests += 1;
	if (!successful) {
		numFailures += 1;
		console.log('  Failure!');
		console.log(`    Expected: ${expectedRatios.join(' : ')}`);
		console.log(`    Actual:   ${actualRatios.join(' : ')}`);
	}
	else if (!skipReverse) {
		test(notes.reverse(), expectedRatios.reverse(), true);
	}
}

// C3 chromatic scale
test([ 'C3', 'C3' ], [ 1, 1 ]);
test([ 'C3', 'C#3' ], [ 16, 15 ]);
test([ 'C3', 'D3' ], [ 9, 8 ]);
test([ 'C3', 'D#3' ], [ 6, 5 ]);
test([ 'C3', 'E3' ], [ 5, 4 ]);
test([ 'C3', 'F3' ], [ 4, 3 ]);
test([ 'C3', 'F#3' ], [ 24, 17 ]);
test([ 'C3', 'G3' ], [ 3, 2 ]);
test([ 'C3', 'G#3' ], [ 8, 5 ]);
test([ 'C3', 'A3' ], [ 5, 3 ]);
test([ 'C3', 'A#3' ], [ 7, 4 ]);
test([ 'C3', 'B3' ], [ 15, 8 ]);
test([ 'C3', 'C4' ], [ 2, 1 ]);

// // C3 redundancies
// test([ 'C3', 'Db3' ], [ 16, 15 ]);
// test([ 'C3', 'Eb3' ], [ 6, 5 ]);
// test([ 'C3', 'Fb3' ], [ 5, 4 ]);
// test([ 'C3', 'E#3' ], [ 4, 3 ]);
// test([ 'C3', 'Gb3' ], [ 24, 17 ]);
// test([ 'C3', 'Ab3' ], [ 8, 5 ]);
// test([ 'C3', 'Bb3' ], [ 7, 4 ]);
// test([ 'C3', 'B#3' ], [ 2, 1 ]);
// test([ 'C3', 'Cb4' ], [ 15, 8 ]);

// // Fb5 (aka E5) chromatic scale
// test([ 'Fb5', 'E5' ], [ 1, 1 ]);
// test([ 'Fb5', 'F5' ], [ 16, 15 ]);
// test([ 'Fb5', 'F#5' ], [ 9, 8 ]);
// test([ 'Fb5', 'G5' ], [ 6, 5 ]);
// test([ 'Fb5', 'G#5' ], [ 5, 4 ]);
// test([ 'Fb5', 'A5' ], [ 4, 3 ]);
// test([ 'Fb5', 'A#5' ], [ 24, 17 ]);
// test([ 'Fb5', 'B5' ], [ 3, 2 ]);
// test([ 'Fb5', 'C6' ], [ 8, 5 ]);
// test([ 'Fb5', 'C#6' ], [ 5, 3 ]);
// test([ 'Fb5', 'D6' ], [ 7, 4 ]);
// test([ 'Fb5', 'D#6' ], [ 15, 8 ]);
// test([ 'Fb5', 'E6' ], [ 2, 1 ]);

// // Fb5 redundancies
// test([ 'Fb5', 'Fb5' ], [ 1, 1 ]);
// test([ 'Fb5', 'E#5' ], [ 16, 15 ]);
// test([ 'Fb5', 'Gb5' ], [ 9, 8 ]);
// test([ 'Fb5', 'Ab5' ], [ 5, 4 ]);
// test([ 'Fb5', 'Bb5' ], [ 24, 17 ]);
// test([ 'Fb5', 'B#5' ], [ 8, 5 ]);
// test([ 'Fb5', 'Cb6' ], [ 3, 2 ]);
// test([ 'Fb5', 'Db6' ], [ 5, 3 ]);
// test([ 'Fb5', 'Eb6' ], [ 15, 8 ]);
// test([ 'Fb5', 'Fb6' ], [ 2, 1 ]);

// // test octaves
// test([ 'G#3', 'G#4', 'G#5', 'G#6' ], [ 8, 4, 2, 1 ]);
// test([ 'G#5', 'G#3', 'G#4', 'G#0' ], [ 1, 4, 2, 32 ]);

console.log(`\n${numFailures} failures / ${numTests} tests`);
