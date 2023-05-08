const prompt = require("prompt-sync")();

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

const balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBetAmount(balance, numberOfLines);

console.log(bet);