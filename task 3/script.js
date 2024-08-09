const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let previousInput = '';
let operator = null;
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (button.classList.contains('number')) {
            handleNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.id === 'clear') {
            clearDisplay();
        } else if (button.id === 'backspace') {
            deleteLastDigit();
        } else if (button.id === 'percent') {
            convertToPercent();
        } else if (button.id === 'equals') {
            calculate();
        } else if (button.id === 'decimal') {
            addDecimal();
        }
    });
});
function handleNumber(value) {
    if (currentInput === '0') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay(currentInput);
}
function handleOperator(value) {
    if (currentInput !== '') {
        if (previousInput !== '') {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }
}
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay('0');
}
function deleteLastDigit() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay(currentInput);
}
function convertToPercent() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}
function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current !== 0) {
                result = prev / current;
            } else {
                alert("Cannot divide by zero");
                return;
            }
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.innerText = value.length > 15 ? value.slice(0, 15) : value; 
}
