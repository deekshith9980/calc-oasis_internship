class Calculator{
    constructor(prevele,curele){
        this.prevele = prevele;
        this.curele = curele;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.opr = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    append(num){
        if(num === '.' && this.currentOperand.includes('.')){
            return ;
        }
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    chooseopr(opr){
        if(this.currentOperand === ''){
            return ;
        }
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.opr = opr;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let res;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)){
            return ;
        }
        switch(this.opr){
            case '+': 
                res = prev + curr;
                break;
            case '-':
                res = prev - curr;
                break;
            case 'x':
                res = prev * curr;
                break;
            case '/':
                res = prev / curr;
                break;
            case '%':
                res = prev % curr;
                break;
            default:
                return ;                      
        }
        this.currentOperand = res.toString();
        this.opr = undefined;
        this.previousOperand = '';
    }

    getDisplay(num){
        const floatNumber = parseFloat(num);
        if(isNaN(floatNumber)){
            return '';
        }
        return num.toLocaleString('en');
    }

    update(){
        this.curele.innerText = this.getDisplay(this.currentOperand);
        if(this.opr!== undefined){
            this.prevele.innerText = `${this.getDisplay(this.previousOperand)} ${this.opr}`;
        }
        else {
            this.prevele.innerText = '';
        }
        
    }
}



const numbers = document.querySelectorAll('[number]');
const operations = document.querySelectorAll('[operation]');
const equalsbut = document.querySelector('[equals]');
const clearbut = document.querySelector('[clear]');
const prevele = document.querySelector('[previous]');
const curele = document.querySelector('[current]');
const delbut = document.querySelector('[delete]');


const calculator = new Calculator(prevele,curele)

numbers.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.append(button.innerText);
        calculator.update();
    })
})

operations.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseopr(button.innerText);
        calculator.update();
    })
})

equalsbut.addEventListener('click', () =>{
    calculator.compute();
    calculator.update();
})

clearbut.addEventListener('click', () =>{
    calculator.clear();
    calculator.update();
})

delbut.addEventListener('click', () =>{
    calculator.delete();
    calculator.update();
})



