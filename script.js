const display = document.querySelector('.calculator__display');

let firstNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;

function calculate(a, operator, b) {
    a = Number(a);
    b = Number(b);
    
    if (operator === 'add') {
        return a + b;
    }
    if (operator === 'subtract') {
        return a - b;
    }
    if (operator === 'multiply') {
        return a * b;
    }
    if (operator === 'divide') {
        if (b === 0) {
            return 0;
        }
        return a / b;
    }
    return b;
}

function addClickListeners() {
    const buttons = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', handleClick);
    }
}

function handleClick(event) {
    const buttonAction = event.target.dataset.action;
    const buttonValue = event.target.textContent;
    let currentDisplay = display.textContent;
    
    const allOperators = document.querySelectorAll('.key--operator');
    for (let i = 0; i < allOperators.length; i++) {
        allOperators[i].classList.remove('is-depressed');
    }
    
    if (buttonAction === undefined && buttonValue !== 'C') {
        if (waitingForSecondNumber === true || currentDisplay === '0') {
            display.textContent = String(buttonValue);
            waitingForSecondNumber = false;
        } else {
            display.textContent = String(currentDisplay + buttonValue);
        }
        return;
    }
    
    if (buttonAction === 'add' || buttonAction === 'subtract' || buttonAction === 'multiply' || buttonAction === 'divide') {
        if (firstNumber !== null && currentOperator !== null && waitingForSecondNumber === false) {
            const result = calculate(firstNumber, currentOperator, currentDisplay);
            display.textContent = String(result);
            firstNumber = result;
        } else {
            firstNumber = currentDisplay;
        }
        currentOperator = buttonAction;
        waitingForSecondNumber = true;
        event.target.classList.add('is-depressed');
        return;
    }
    
    if (buttonAction === 'decimal') {
        if (currentDisplay.includes('.') === false) {
            display.textContent = String(currentDisplay + '.');
        }
        return;
    }
    
    if (buttonAction === 'clear') {
        display.textContent = '0';
        firstNumber = null;
        currentOperator = null;
        waitingForSecondNumber = false;
        return;
    }
    
    if (buttonAction === 'calculate') {
        if (firstNumber !== null && currentOperator !== null && waitingForSecondNumber === false) {
            const result = calculate(firstNumber, currentOperator, currentDisplay);
            display.textContent = String(result);
            firstNumber = result;
            currentOperator = null;
            waitingForSecondNumber = true;
        }
        const allOperatorsAgain = document.querySelectorAll('.key--operator');
        for (let i = 0; i < allOperatorsAgain.length; i++) {
            allOperatorsAgain[i].classList.remove('is-depressed');
        }
        return;
    }
}

addClickListeners();