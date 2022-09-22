const previousOperationText = document.querySelector('#previous-operation')
const currentOperationtext = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
constructor(previousOperationText, currentOperationtext){
    this.previousOperationText = previousOperationText;
    this.currentOperationtext = currentOperationtext;
    this.currentOperation = "";
}
//add digit to calculator to screen
addDigit(digit){
    //check if current operation already has a dot
    if(digit === '.' && this.currentOperationtext.innerText.includes('.')){
        return;
    }

    this.currentOperation = digit
    this.updateScreen()
}

//process all calculator operations
processOperation(operation){
    //check if current value is empty
    if(this.currentOperationtext.innerText === "" && operation !== "C"){
            //change operation
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation);
        }
        return;
    }

    // get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationtext.innerText;

    switch(operation){
        case "+":
            operationValue = previous + current;
            this.updateScreen(operationValue, operation, current, previous);
            break;

        case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operation, current, previous);
            break;

        case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue, operation, current, previous);
            break;

        case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous);
            break;

        case "DEL":
            this.processDelOperator(operationValue, operation, current, previous);
            break;

        case "CE":
            this.processClearOperator(operationValue, operation, current, previous);
            break;

        case "C":
            this.processClearAllOperation(operationValue, operation, current, previous);
            break;

        case "=":
            this.processEqualOperator(operationValue, operation, current, previous);
            break;
        default:
            return;
    }
}

//change value of the calculator screen
updateScreen(
    operationValue = null, 
    operation = null, 
    current = null, 
    previous = null
){
    console.log(operationValue, operation, current, previous)

    if(operationValue === null){
        this.currentOperationtext.innerText += this.currentOperation; 
    } else {
        //check if value is zero, if it is just add current value
        if(previous === 0){
            operationValue = current;
        }

        //add current value to previous
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationtext.innerText = "";
    }
  }
  changeOperation(operation){
    const mathOperations =["*", "/", "+", "-"]
    if(!mathOperations.includes(operation)){
        return;
    }
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  //delete the last digit
  processDelOperator(){
    this.currentOperationtext.innerText = this.currentOperationtext.innerText.slice(0, -1);
  }
  //erase current operation
  processClearOperator(){
    this.currentOperationtext.innerText = "";
  }

  //clear all operation
  processClearAllOperation(){
    this.currentOperationtext.innerText = "";
    this.previousOperationText.innerText = "";
  }

  //equal operation
  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationtext);

buttons.forEach((btn) => {
btn.addEventListener('click', (e) => {
    const value = e.target.innerText;

    if(+value >= 0 || value === '.'){
        calc.addDigit(value);
    } else {
        calc.processOperation(value)
    }
});
});