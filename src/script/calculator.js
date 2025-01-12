
document.addEventListener('DOMContentLoaded', () => {

    const inputField = document.getElementById('input');
    const outputField = document.getElementById('output');
    const buttons = document.querySelectorAll('.cal-btn');

    // Add click event listener to all buttons
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => handleButtonClick(e, inputField, outputField));
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
            outputField.value = math.evaluate(inputField.value);
            eval(`boom()`);
        } catch (error) {
            outputField.value = 'Error';
            eval(`sadboom()`);
        }
    }
});
