const readline = require('readline');
const findFrequencyRatios = require('./findFrequencyRatios');

function processNotes2(noteString) {
	let notes = noteString.split(' ').map(parseNote);
	let ratios = calcRatios(...notes);
	console.log(`  ${notes.map(note => note.string).join(' : ')}  =>  ${ratios.join(' : ')}`);
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function prompt() {
	rl.question('Gimme some notes (e.g. C#3 Ab6): ', response => {
		let noteStrings = response.split(' ');
		let ratios = findFrequencyRatios(...noteStrings);
		console.log(`  ${noteStrings.join(' : ')}  =>  ${ratios.join(' : ')}`);
		prompt()
	});
}

prompt()