const input = document.getElementById('inputbox');
const buttons = document.querySelectorAll('button');
const operators = ["+", "-", "*", "/", "%"];
const maxLength = 15;
let currentExpression = "";
let isNewNumber = true;

const isValidInput = (value) => /[\d%\/*\-+.=]|AC|DEL/.test(value);

const handleNumberInput = (value) => {
    if (isNewNumber) {
        currentExpression = currentExpression === "Error" ? "" : currentExpression;
        isNewNumber = false;
    }
    
    // Prevent multiple decimals
    if (value === '.') {
        const parts = currentExpression.split(/[+\-*/%]/);
        if (parts[parts.length-1].includes('.')) return;
    }
    
    currentExpression += value;
};

const handleOperatorInput = (value) => {
    const lastChar = currentExpression.slice(-1);
    const secondLastChar = currentExpression.slice(-2, -1);
    
    // Prevent consecutive operators (except for negative numbers)
    if (operators.includes(lastChar)) {
        if (value === '-' && lastChar !== '-') {
            currentExpression += value; // Allow negative after operator
        } else {
            currentExpression = currentExpression.slice(0, -1) + value;
        }
    } else {
        currentExpression += value;
    }
    
    isNewNumber = true;
};

const calculateResult = () => {
    try {
        if (!currentExpression) return;
        
        // Handle percentage calculations
        let expression = currentExpression.replace(/%/g, '/100');
        
        // Prevent invalid expressions
        if (/[+\-*/%]{2,}/.test(expression) || 
            /^[*/%]/.test(expression) || 
            !/\d$/.test(expression)) {
            throw new Error("Invalid expression");
        }
        
        // Evaluate safely
        const result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) throw new Error("Division by zero");
        
        currentExpression = result.toString();
        isNewNumber = true;
    } catch (error) {
        currentExpression = error.message.includes("Division") 
            ? "Cannot divide by 0" 
            : "Invalid Input";
        setTimeout(() => {
            currentExpression = "";
            updateDisplay();
        }, 1000);
    }
};

const updateDisplay = () => {
    // Trim expression if exceeds max length
    if (currentExpression.length > maxLength) {
        currentExpression = currentExpression.slice(-maxLength);
    }
    
    input.value = currentExpression || "0";
    
    // Dynamic font sizing
    input.style.fontSize = currentExpression.length > 10 ? "24px" : "32px";
};

// Event listeners
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (!isValidInput(e.target.innerHTML)) return;
        
        const value = e.target.innerHTML;
        
        switch(value) {
            case '=':
                calculateResult();
                break;
            case 'AC':
                currentExpression = "";
                break;
            case 'DEL':
                currentExpression = currentExpression.slice(0, -1);
                isNewNumber = currentExpression === "" || 
                    operators.includes(currentExpression.slice(-1));
                break;
            default:
                if (currentExpression.length >= maxLength) return;
                
                if (/\d|\./.test(value)) {
                    handleNumberInput(value);
                } else if (operators.includes(value)) {
                    // Prevent starting with invalid operators
                    if (currentExpression === "" && !['-', '%'].includes(value)) {
                        return;
                    }
                    handleOperatorInput(value);
                }
        }
        
        updateDisplay();
    });
});