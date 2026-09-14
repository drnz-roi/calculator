const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit");

let currentInput = "0";

function updateDisplay() {
  display.textContent = currentInput;
}

function appendDigit(digit) {
  if (currentInput === "0") {
    currentInput = digit;
  } else {
    currentInput += digit;
  }
  updateDisplay();
}

digitButtons.forEach(button => {
  button.addEventListener("click", () => {
    appendDigit(button.dataset.digit);
  });
});
