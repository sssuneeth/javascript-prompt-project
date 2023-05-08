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
	while (true) {
		const depositAmount = parseFloat(input("Enter a deposit amount: "));
		if (isNaN(depositAmount) || depositAmount <= 0) {
			console.log("Invalid deposit ammount");
		} else {
			return depositAmount;
		}
	}
};

const getNumberOfLines = (): number => {
	while (true) {
		const lines = parseFloat(
			input("Enter number of lines you want to bet on (1-3): ")
		);
		if (isNaN(lines) || lines <= 0 || lines > 3) {
			console.log("Invalid number of lines");
		} else {
			return lines;
		}
	}
};

const getBet = (balance: number, lines: number): number => {
	while (true) {
		const bet = parseFloat(input("Enter a bet amount for per line: "));
		if (isNaN(bet) || bet * lines > balance) {
			console.log("Invalid bet amount");
		} else {
			return bet;
		}
	}
};

const spin = (): string[][] => {
	let symbols: string[] = [];
	// push all possible sybmols to array
	for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
		for (let i = 0; i < count; i++) {
			symbols.push(symbol);
		}
	}
	/**
	 * Reels is a nested arrow contains 3 symbols each ( total of 9 )
	 * @example
	 * [['A','B','A'],['B','C','A'],['C','A','B']]
	 * */
	let reels: string[][] = [];
	for (let i = 0; i < COLS; i++) {
		reels.push([]);
		let reelSymbols = [...symbols];

		for (let j = 0; j < ROWS; j++) {
			// get a random number from 0 - reelSybmols.length
			const randomIndex = Math.floor(Math.random() * reelSymbols.length);
			reels[i].push(reelSymbols[randomIndex]);
			// removes pushed symbol from array
			reelSymbols.splice(randomIndex, 1);
		}
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
		let rowString = "";
		for (const [i, sybmol] of row.entries()) {
			rowString += sybmol;

			if (i !== row.length - 1) {
				rowString += " | ";
			}
		}
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
const game = (): void => {
	let balance: number = deposit();
	while (true) {
		console.log(`You have a balance of $${balance} to bet`);
		const lines = getNumberOfLines();
		const bet = getBet(balance, lines);
		balance -= bet * lines;

		const reels = spin();
		const rows = transpose(reels);
		consoleReels(rows);
		const winnings = getWinnings(lines, rows, bet);
		balance += winnings;
		console.log(`You won $${winnings}`);
		console.log(`Your balance is $${balance}`);

		if (balance <= 0) {
			console.log(
				"You not have enough money to bet, deposit again to continue"
			);
			break;
		}

		const playAgain = input("Want to bet again? (y/n) ");
		if (playAgain !== "y") break;
	}
};

game();
