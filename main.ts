const input = require("prompt-sync")();

interface SymbolValue {
	[key: string]: number;
}

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT: SymbolValue = {
	A: 4,
	B: 6,
	C: 8,
	D: 10,
};

const SYMBOLS_VALUE: SymbolValue = {
	A: 5,
	B: 4,
	C: 3,
	D: 2,
};

const deposit = (): number => {
	let deposit: number;
	do {
		deposit = parseFloat(input("Enter a deposit amount: "));
		if (Number.isNaN(deposit) || deposit <= 0) {
			console.log(
				"Please enter a valid positive number for your deposit."
			);
		}
	} while (Number.isNaN(deposit) || deposit <= 0);
	return deposit;
};

const getNumberOfLines = (): number => {
	const MIN_LINES = 1;
	const MAX_LINES = 3;

	while (true) {
		const lines = parseFloat(
			input(
				`Enter number of lines you want to bet on (${MIN_LINES}-${MAX_LINES}): `
			)
		);
		if (Number.isNaN(lines) || lines < MIN_LINES || lines > MAX_LINES) {
			console.log("Invalid number of lines");
		} else {
			return lines;
		}
	}
};

const getBetAmount = (balance: number, lines: number): number => {
	while (true) {
		const bet = parseFloat(input("Enter a bet amount for per line: "));
		if (Number.isNaN(bet) || bet <= 0) {
			console.log("Invalid bet amount");
		} else if (bet * lines > balance) {
			console.log("Bet amount exceeds your balance");
		} else {
			return bet;
		}
	}
};

const spin = (): string[][] => {
	// gets all possible sybmols to array
	const symbols: string[] = Object.entries(SYMBOLS_COUNT).flatMap(
		([symbol, count]) => Array(count).fill(symbol)
	);
	/**
	 * Reels is a nested arrow contains 3 symbols each ( total of 9 )
	 * @example
	 * [['A','B','A'],['B','C','A'],['C','A','B']]
	 * */
	const reels: string[][] = [];
	for (let i = 0; i < COLS; i++) {
		const reelSymbols = [...symbols];
		const reel: string[] = [];

		for (let j = 0; j < ROWS; j++) {
			const randomIndex = Math.floor(Math.random() * reelSymbols.length);
			reel.push(reelSymbols[randomIndex]);
			// removes pushed symbol from array
			reelSymbols.splice(randomIndex, 1);
		}
		reels.push(reel);
	}
	return reels;
};

// transpose array by switching its rows with its columns
const transpose = (reels: string[][]): string[][] => {
	let rows: string[][] = [];
	// gets first item from each elements in the array and store in new array
	for (let i = 0; i < ROWS; i++) {
		rows.push([]);
		for (let j = 0; j < COLS; j++) {
			rows[i].push(reels[j][i]);
		}
	}
	return rows;
};

// output reels in a fancy way
const consoleReels = (rows: string[][]): void => {
	for (const row of rows) {
		const rowString = row.join(" | ");
		console.log(rowString);
	}
};

const getWinnings = (lines: number, rows: string[][], bet: number): number => {
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

// game controller
const playGame = (): void => {
	let balance = deposit();
	while (balance > 0) {
		console.log(`You have a balance of $${balance} to bet`);
		const numberOfLines = getNumberOfLines();
		const betAmount = getBetAmount(balance, numberOfLines);
		balance -= betAmount * numberOfLines;

		const reels = spin();
		const rows = transpose(reels);
		consoleReels(rows);
		// determine winning amount
		const winnings = getWinnings(numberOfLines, rows, betAmount);
		balance += winnings;
		console.log(`You won $${winnings}`);
		console.log(`Your balance is $${balance}`);

		if (balance <= 0) {
			console.log(
				"You not have enough money to bet, deposit again to continue"
			);
			return;
		}

		const playAgain = input("Want to bet again? (y/n) ");
		if (playAgain !== "y") return;
	}
};

playGame();
