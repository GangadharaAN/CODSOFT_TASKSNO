const display = document.getElementById("display");
const previous = document.getElementById("previous");

let currentNumber = "";
let firstNumber = null;
let operator = null;


function addNumber(number) {

    if (currentNumber === "Error") {
        currentNumber = "";
    }
    if (currentNumber === "0" && number === "0") {
        return;
    }

    if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber = currentNumber + number;
    }

    display.textContent = currentNumber;
}


function addDecimal() {

    if (currentNumber === "Error") {
        currentNumber = "";
    }

    if (currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "") {
        currentNumber = "0.";
    } else {
        currentNumber = currentNumber + ".";
    }

    display.textContent = currentNumber;
}

function chooseOperator(selectedOperator) {


    if (currentNumber === "" && firstNumber === null) {
        return;
    }

    if (currentNumber === "" && firstNumber !== null) {
        operator = selectedOperator;
        previous.textContent =
            firstNumber + " " + getOperatorSymbol(selectedOperator);
        return;
    }

    firstNumber = parseFloat(currentNumber);

    operator = selectedOperator;
    previous.textContent =
        firstNumber + " " + getOperatorSymbol(selectedOperator);
    currentNumber = "";

    display.textContent = "0";
}

function calculate() {

    if (
        firstNumber === null ||
        operator === null ||
        currentNumber === ""
    ) {
        return;
    }

    const secondNumber = parseFloat(currentNumber);

    let result;

    if (operator === "+") {

        result = firstNumber + secondNumber;

    }
    else if (operator === "-") {

        result = firstNumber - secondNumber;

    }
    else if (operator === "*") {

        result = firstNumber * secondNumber;

    }
    else if (operator === "/") {

        if (secondNumber === 0) {

            display.textContent = "Error";

            currentNumber = "Error";
            firstNumber = null;
            operator = null;

            previous.textContent = "";

            return;
        }

        result = firstNumber / secondNumber;

    }
    else if (operator === "%") {

        result = firstNumber % secondNumber;

    }
    result = Math.round(result * 100000000) / 100000000;
    display.textContent = result;

    currentNumber = result.toString();

    firstNumber = null;
    operator = null;

    previous.textContent = "";
}

function clearCalculator() {

    currentNumber = "";
    firstNumber = null;
    operator = null;

    display.textContent = "0";
    previous.textContent = "";
}


function deleteNumber() {

    if (currentNumber === "Error") {

        currentNumber = "";

    } else {

        currentNumber =
            currentNumber.slice(0, -1);
    }

    if (currentNumber === "") {

        display.textContent = "0";

    } else {

        display.textContent = currentNumber;
    }
}


function getOperatorSymbol(operator) {

    if (operator === "*") {
        return "×";
    }

    if (operator === "/") {
        return "÷";
    }

    if (operator === "-") {
        return "−";
    }

    return operator;
}


document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (key >= "0" && key <= "9") {

        addNumber(key);

    }
    else if (key === ".") {

        addDecimal();

    }
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {

        chooseOperator(key);

    }

    else if (key === "Enter" || key === "=") {

        calculate();

    }
    else if (key === "Backspace") {

        deleteNumber();

    }
    else if (key === "Escape") {

        clearCalculator();

    }

});

