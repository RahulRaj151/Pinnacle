// DOM Elements
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-action="calculate"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const clearButton = document.querySelector('[data-action="clear"]');

// Calculator class to handle all calculator operations
class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    // Clear all values and reset calculator
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    // Delete the last digit
    delete() {
        if (this.shouldResetScreen) return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
    }

    // Append a number to the current operand
    appendNumber(number) {
        // If we should reset the screen, replace current operand with new number
        if (this.shouldResetScreen) {
            this.currentOperand = number.toString();
            this.shouldResetScreen = false;
            return;
        }
        
        // Don't allow multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Replace 0 with number unless it's a decimal point
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    // Choose an operation
    chooseOperation(operation) {
        // Don't allow operation if current operand is empty
        if (this.currentOperand === '') return;
        
        // If we already have a previous operand, perform the calculation
        if (this.previousOperand !== '') {
            this.calculate();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    // Perform calculation based on operation
    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        // Don't calculate if either operand is not a number
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                // Check for division by zero
                if (current === 0) {
                    this.currentOperand = 'Error';
                    this.previousOperand = '';
                    this.operation = undefined;
                    this.shouldResetScreen = true;
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Round the result to avoid floating point issues
        this.currentOperand = this.roundResult(computation);
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    // Round the result to avoid floating point issues
    roundResult(number) {
        // Convert to string to check decimal places
        const stringNumber = number.toString();
        
        // If it's an integer or has few decimal places, return as is
        if (!stringNumber.includes('.') || stringNumber.split('.')[1].length <= 10) {
            return stringNumber;
        }
        
        // Otherwise round to 10 decimal places
        return number.toFixed(10).replace(/\.?0+$/, '');
    }

    // Format number for display
    getDisplayNumber(number) {
        if (number === 'Error') return 'Error';
        
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Update the display
    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

// Create calculator instance
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Event listeners for operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Event listener for equals button
equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// Event listener for delete button
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    // Numbers 0-9
    if (/^[0-9]$/.test(event.key)) {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    
    // Decimal point
    if (event.key === '.') {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    
    // Operations
    if (event.key === '+' || event.key === '-') {
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    }
    
    if (event.key === '*') {
        calculator.chooseOperation('×');
        calculator.updateDisplay();
    }
    
    if (event.key === '/') {
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    }
    
    // Calculate (Enter or =)
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault(); // Prevent form submission if in a form
        calculator.calculate();
        calculator.updateDisplay();
    }
    
    // Delete (Backspace)
    if (event.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    
    // Clear (Escape)
    if (event.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
});

// Initialize display
calculator.updateDisplay();