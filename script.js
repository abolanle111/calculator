class Calculator{
    constructor(previousTextElement, currentTextElement){
        this.previousTextElement =previousTextElement
        this.currentTextElement = currentTextElement
        this.clear()
        // this.chooseOperation()
    }

    clear() {
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.current === '') return
        if(this.previous !== ''){
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    compute() {
        let computation 
        const prev = parseFloat(this.previous)
        const current = parseFloat(this.current)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '%':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentTextElement.innerText = 
        this.getDisplayNumber(this.current)
        if(this.operation != null){
        this.previousTextElement.innerText = 
        `${this.getDisplayNumber(this.previous)} ${this.operation}`
        }
        else{
        this.previousTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousTextElement, currentTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});
equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})