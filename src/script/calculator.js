let calculation = [];
if (localStorage.getItem('calculation') !== null) {
    const storedCalculation = JSON.parse(localStorage.getItem('calculation'));
    if (Array.isArray(storedCalculation)) {
        calculation = storedCalculation;
    }
}

let newCalculation = {};

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const outputField = document.getElementById('output');
    const buttons = document.querySelectorAll('.cal_button');
    
    const histbtn = document.getElementById('history_btn');
    const advanceCal = document.getElementById('adv_btn');
    const advKeyHolder = document.getElementById('key_holder_adv');

    const histCloseBtn =  document.getElementById("hist_close");
    const historyHolder = document.getElementById("history_holder");
    
    histbtn.addEventListener("click",()=>{
        historyHolder.style.display = "flex"
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.body.style.overflow = 'hidden';
    })
    
    histCloseBtn.addEventListener('click', (e) => {
        historyHolder.style.display = "none"
        document.body.style.overflow = 'scroll';
    })
    
    let isRotated = false;
    advanceCal.addEventListener("click", (e) => {
        isRotated = !isRotated; // Toggle the rotation state
        const rotation = isRotated ? "rotate(180deg) translate(210%, -100%)" : "rotate(360deg) translate(-120%, 0%)";
        advanceCal.style.transform = `${rotation}`;    
        if(isRotated){
            advKeyHolder.style.display="block";
        }
        else{
            advKeyHolder.style.display="none ";
        }
    })

    
    
    // Add click event listener to all buttons
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => handleButtonClick(e, inputField, outputField));
    });
    
    
    updateHistoryList();
    
});

function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Clear the existing list

    calculation.forEach((calc, index) => {
        const listItem = document.createElement('li');

        const expressionSpan = document.createElement('span');
        expressionSpan.className = 'expression';
        expressionSpan.textContent = `Expression: ${calc.input}`;

        const resultSpan = document.createElement('span');
        resultSpan.className = 'result';
        resultSpan.textContent = `Result: ${calc.result}`;

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete_btn';
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            calculation.splice(index, 1);
            localStorage.setItem('calculation', JSON.stringify(calculation));
            updateHistoryList();
        });

        listItem.appendChild(expressionSpan);
        listItem.appendChild(resultSpan);
        listItem.appendChild(deleteBtn);

        historyList.appendChild(listItem);
    });
}

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
    input = input.replace("√", 'sqrt');
    input = input.replace("P", 'permutations');
    input = input.replace("C", 'combinations');
    input = input.replace("dy/dx", 'derivative');
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
        eval(`boom()`);
        updateHistoryList()
    } catch (error) {
        console.log(error);
        outputField.value = 'Error';
        eval(`sadboom()`);
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