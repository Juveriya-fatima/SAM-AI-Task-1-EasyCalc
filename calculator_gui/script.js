
const result = document.getElementById("result");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let resetScreen = false;

function updateDisplay() {
    result.value = currentInput;
}

function clearCalculator() {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    resetScreen = false;

    expression.textContent = "Ready to calculate";
    updateDisplay();
}

function deleteLast() {
    if (resetScreen) {
        currentInput = "0";
        resetScreen = false;
    } else if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }

    updateDisplay();
}

function addDecimal() {
    if (resetScreen) {
        currentInput = "0";
        resetScreen = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function changeSign() {
    if (currentInput !== "0") {
        currentInput = String(Number(currentInput) * -1);
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (selectedOperator === "%") {
        currentInput = String(Number(currentInput) / 100);
        updateDisplay();
        expression.textContent = "Percentage";
        resetScreen = true;
        return;
    }

    if (operator !== null && !resetScreen) {
        calculate();
    }

    firstNumber = Number(currentInput);
    operator = selectedOperator;
    resetScreen = true;

    expression.textContent = `${firstNumber} ${operator}`;
}

function calculate() {
    if (operator === null || firstNumber === null) {
        return;
    }

    const secondNumber = Number(currentInput);
    let answer;

    switch (operator) {
        case "+":
            answer = firstNumber + secondNumber;
            break;

        case "-":
            answer = firstNumber - secondNumber;
            break;

        case "*":
            answer = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                expression.textContent = "Cannot divide by zero";
                currentInput = "0";
                firstNumber = null;
                operator = null;
                resetScreen = true;
                updateDisplay();
                return;
            }

            answer = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    expression.textContent = `${firstNumber} ${operator} ${secondNumber} =`;

    // Avoid displaying unnecessary decimal digits.
    currentInput = String(Number(answer.toPrecision(10)));

    firstNumber = null;
    operator = null;
    resetScreen = true;

    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (action === "clear") {
            clearCalculator();
        } else if (action === "delete") {
            deleteLast();
        } else if (action === "decimal") {
            addDecimal();
        } else if (action === "sign") {
            changeSign();
        } else if (action === "calculate") {
            calculate();
        } else if (value === "+" || value === "-" ||
                   value === "*" || value === "/" || value === "%") {
            chooseOperator(value);
        } else if (value !== undefined) {
            if (resetScreen) {
                currentInput = value;
                resetScreen = false;
            } else if (currentInput === "0") {
                currentInput = value;
            } else {
                currentInput += value;
            }

            updateDisplay();
        }
    });
});

updateDisplay();