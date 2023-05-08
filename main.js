const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
	A: 2,
	B: 4,
	C: 6,
	D: 8,
};

const SYMBOLS_VALUE = {
	A: 5,
	B: 4,
	C: 3,
	D: 2,
};

const deposit = () => {
	while (true) {
		const depositAmount = prompt("Enter a deposit ammount: ");
		const depositAmountNumber = parseFloat(depositAmount);

		if (isNaN(depositAmountNumber) || depositAmountNumber <= 0) {
			console.log("Enter a valid ammount. try again.");
		} else {
			return depositAmountNumber;
		}
	}
};

const getNumberOfLines = () => {
	while (true) {
		const lines = prompt("Enter number of lines to bet on (1-3): ");
		const linesNumber = parseFloat(lines);

		if (isNaN(linesNumber) || linesNumber <= 0 || linesNumber > 3) {
			console.log("Invalid input, try again!");
		} else {
			return linesNumber;
		}
	}
};

const getBetAmount = (balance, lines) => {
	while (true) {
		const betPerLine = prompt("Enter bet ammount for per line: ");
		const betNumber = parseFloat(betPerLine);

		if (isNaN(betNumber) || betNumber < 0 || betNumber > balance / lines) {
			console.log("Invalid bet, try again!");
		} else {
			return betNumber;
		}
	}
};

const spin = () => {
	const symbols = [];
	for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
		for (let i = 0; i < count; i++) {
			symbols.push(symbol);
		}
	}

	const reels = [];
	for (let i = 0; i < COLS; i++) {
		reels.push([]);
		const reelSymbols = [...symbols];
		for (let j = 0; j < ROWS; j++) {
			const selectedIndex = Math.floor(
				Math.random() * reelSymbols.length
			);
			const selectedSymbol = reelSymbols[selectedIndex];
			reels[i].push(selectedSymbol);
			reelSymbols.splice(selectedIndex, 1);
		}
	}
	return reels;
};

const transposeReels = (reels) => {
	const rows = [];

	for (let i = 0; i < ROWS; i++) {
		rows.push([]);
		for (let j = 0; j < COLS; j++) {
			rows[i].push(reels[j][i]);
		}
	}
	return rows;
};

const reels = spin();
const transposedReels = transposeReels(reels);

// const balance = deposit();
// const numberOfLines = getNumberOfLines();
// const bet = getBetAmount(balance, numberOfLines);
