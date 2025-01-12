let calculation = [];
if (localStorage.getItem('calculation') !== null) {
    const storedCalculation = JSON.parse(localStorage.getItem('calculation'));
    if (Array.isArray(storedCalculation)) {
        calculation = storedCalculation;
        console.log('calculation', calculation);
    }
}

let newCalculation = {};

document.addEventListener('DOMContentLoaded', () => {

    const inputField = document.getElementById('input');
    const outputField = document.getElementById('output');
    const buttons = document.querySelectorAll('.cal-btn');

    const histbtn = document.getElementById('history_btn');


    // Add click event listener to all buttons
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => handleButtonClick(e, inputField, outputField));
    });
    

    
});

function handleButtonClick(event, inputField, outputField) {
    const buttonText = event.target.textContent;

    // Handle Clear (C)
    if (buttonText === 'C') {
        clearFields(inputField, outputField);
        return;
    }

    // Handle Delete (del)
    if (buttonText === 'del') {
        deleteLastCharacter(inputField);
        return;
    }

    // Handle Equal (=)
    if (buttonText === '=') {
        calculateResult(inputField, outputField);
        return;
    }

    // Otherwise, add the clicked button's value to the input field
    appendToInput(inputField, buttonText);
}

function calculate(input) {
    input = input.replace("×", '*');
    return math.evaluate(input);

}

function saveCalculation(str, result) {
    newCalculation = {
        input: str,
        result: result
    };

    if (!calculation.some(cal => cal.input === str)) {
        calculation.push(newCalculation);
        localStorage.setItem('calculation', JSON.stringify(calculation));
    }
}


function hasCalculation() {
    return localStorage.getItem('calculation') !== null;
}

function clearFields(inputField, outputField) {
    inputField.value = '';
    outputField.value = '';
}

function deleteLastCharacter(inputField) {
    inputField.value = inputField.value.slice(0, -1);
}

function appendToInput(inputField, text) {
    inputField.value += text;
}

function calculateResult(inputField, outputField) {
    try {
        const result = calculate(inputField.value);
        outputField.value = result;
        saveCalculation(inputField.value, result);
        // eval(`boom()`);
    } catch (error) {
        console.log(error);
        outputField.value = 'Error';
        // eval(`sadboom()`);
    }
}

function clearHistory() {
    calculation = {};
    localStorage.removeItem("calculation");
}

function logHistory() {
    console.log(JSON.parse(localStorage.getItem('calculation')));
}

window.logHistory = logHistory;
window.clearHistory = clearHistory;