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
	while(true) {
		const lines = prompt("Enter number of lines to bet on (1-3): ");
		const linesNumber = parseFloat(lines);

		if (isNaN(linesNumber) || linesNumber <= 0 || linesNumber > 3) {
			console.log("Invalid input, try again!");
		} else {
			return linesNumber;
		}
	}
}
 
const depositAmount = deposit();
const numberOfLines = getNumberOfLines();
console.log(numberOfLines);