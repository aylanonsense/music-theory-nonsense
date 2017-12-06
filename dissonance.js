const findFrequencyRatios = require('./findFrequencyRatios');

let notes = [ 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4' ];

function measureDissonance(...notes) {
	let ratios = findFrequencyRatios(...notes);
	let ratiosWithoutKey = findFrequencyRatios(...(notes.slice(1)));
	return { notes: notes, dissonance: ratios[0], ratios, ratiosWithoutKey };
	// console.log(`${notes.join(' : ')}   ${'*'.repeat(ratios[0])}`);
}

function printResults(r) {
	r.sort((a,b) => a.dissonance - b.dissonance);
	r.forEach(({ notes, dissonance, ratios, ratiosWithoutKey }) => console.log(`${notes.slice(1).map(n => n.slice(0,-1)).join('')}   =>   ${ratios.join(' : ')}      /      ${ratiosWithoutKey.join(' : ')}`));
	console.log('');
}

let results = [];
for (let i = 0; i < notes.length; i++) {
	results.push(measureDissonance(notes[0], notes[i]));
}
printResults(results)

results = [];
for (let i = 0; i < notes.length; i++) {
	for (let j = i + 1; j < notes.length; j++) {
		results.push(measureDissonance(notes[0], notes[i], notes[j]));
	}
}
printResults(results)

results = [];
for (let i = 0; i < notes.length; i++) {
	for (let j = i + 1; j < notes.length; j++) {
		for (let k = j + 1; k < notes.length; k++) {
			results.push(measureDissonance(notes[0], notes[i], notes[j], notes[k]));
		}
	}
}
printResults(results)
