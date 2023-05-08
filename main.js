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

const printRows = (rows) => {
	for (const row of rows) {
		rowString = "";
		for (const [i, symbol] of row.entries()) {
			rowString += symbol;

			if (i !== row.length - 1) {
				rowString += " | ";
			}
		}
		console.log(rowString);
	}
};

const getWinnings = (rows, lines, bet) => {
	let winnings = 0;

	for (let row = 0; row < lines; row++) {
		const symbols = rows[row];
		let allSame = true;

		for (const symbol of symbols) {
			if (symbol !== symbols[0]) {
				allSame = false;
				break;
			}
		}

		if (allSame) {
			winnings += bet * SYMBOLS_VALUE[symbols[0]];
		}
	}

	return winnings;
};

const game = () => {
	let balance = deposit();

	while (true) {
		console.log(`You have a balance of $${balance}`);
		const numberOfLines = getNumberOfLines();
		const bet = getBetAmount(balance, numberOfLines);
		balance -= bet * numberOfLines;

		const reels = spin();
		const rows = transposeReels(reels);
		printRows(rows);
		const winnings = getWinnings(rows, numberOfLines, bet);
		balance += winnings;
		console.log(`You won $${winnings}`);
		console.log(`Your balance is $${balance}`);

		if (balance <= 0) {
			console.log("You ran out of money, start a new bet!");
			break;
		}

		const playAgain = prompt("Do you wanna play again (y/n) ? ");
		if (playAgain !== "y") break;
	}
};

game();
