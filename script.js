const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const decimalButton = document.getElementById("decimal");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Nice try, but dividing by zero breaks the universe.";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

let currentInput = "0";
let firstNumber = null;
let pendingOperator = null;
let shouldResetInput = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendDigit(digit) {
  if (shouldResetInput) {
    currentInput = digit;
    shouldResetInput = false;
  } else if (currentInput === "0") {
    currentInput = digit;
  } else {
    currentInput += digit;
  }
  updateDisplay();
}

function evaluate() {
  const secondNumber = parseFloat(currentInput);
  const result = operate(pendingOperator, firstNumber, secondNumber);

  if (typeof result === "number") {
    currentInput = roundResult(result).toString();
  } else {
    currentInput = result;
  }

  updateDisplay();
  return typeof result === "number" ? result : null;
}

function roundResult(number) {
  return Math.round(number * 100000) / 100000;
}

function handleOperator(operator) {
  const inputValue = parseFloat(currentInput);

  if (pendingOperator !== null && !shouldResetInput) {
    const result = evaluate();
    if (result === null) {
      pendingOperator = null;
      firstNumber = null;
      shouldResetInput = true;
      return;
    }
    firstNumber = result;
  } else {
    firstNumber = inputValue;
  }

  pendingOperator = operator;
  shouldResetInput = true;
}

function handleEquals() {
  if (pendingOperator === null || shouldResetInput) {
    return;
  }
  evaluate();
  pendingOperator = null;
  shouldResetInput = true;
}

function handleClear() {
  currentInput = "0";
  firstNumber = null;
  pendingOperator = null;
  shouldResetInput = false;
  updateDisplay();
}

function handleDecimal() {
  if (shouldResetInput) {
    currentInput = "0.";
    shouldResetInput = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

digitButtons.forEach(button => {
  button.addEventListener("click", () => {
    appendDigit(button.dataset.digit);
  });
});

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    handleOperator(button.dataset.operator);
  });
});

equalsButton.addEventListener("click", handleEquals);
clearButton.addEventListener("click", handleClear);
decimalButton.addEventListener("click", handleDecimal);
