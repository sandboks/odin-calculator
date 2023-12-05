const operators = ["+", "-", "*", "/"];
let a = 0;
let b = null;
let currentOperator = "";
let currentDisplay = "0";
let displayingAnswer = false;

function HaveOperator() {
    return currentOperator != "";
}

function GetAnswer(a, b, operator) {
    switch (operator) {
        case "+":
            return (a + b);
            break;
        case "-":
            return (a - b);
        case "*":
            return (a * b);
        case "/":
            return (a / b);
    };
}

function operate() {
    if (!HaveOperator() || b == null)
        return;
    
    let answer = GetAnswer(a, b, currentOperator);
    a = answer;
    b = null;
    currentOperator = "";
    displayingAnswer = true;
    UpdateDisplay();
}

function UpdateDisplay() {
    currentDisplay = a;
    if (HaveOperator()) {
        currentDisplay += " " + currentOperator;
        if (b != null)
            currentDisplay += " " + b;
    }
    //alert("this is where the display should get updated!");


    document.getElementById('displayText').textContent = currentDisplay;
}

function AssignOperator(x) {
    if (HaveOperator()) {
        if (b != null) { // if we already entered b, then perform the operation now and then assign the new operator
            operate();
        }
    }
    currentOperator = x;
    UpdateDisplay();
}

// UI logic

// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll('button');

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
    switch(button.id.toUpperCase()) {
        case "ROCK":
            button.addEventListener("click",  () => {
                alert("Rock bby");
            });
            break;
        default:
            button.addEventListener("click",  () => {
                ProcessInput(button.textContent);
                
                //
            });
    }
});

document.addEventListener("keypress", function(event){
    var x = event.key;
    
    ProcessInput(x);
});

function ProcessInput(x) {
    if (!isNaN(x)) {
        // NUMBER INPUT
        if (displayingAnswer) {
            a = Number(x);
            displayingAnswer = false;
        }
        else {
            if (!HaveOperator()) {
                a = (Number(a)*10) + Number(x);
            }
            else {
                b = (Number(b)*10) + Number(x);
            }
        }
        
        UpdateDisplay();
    }
    else if (operators.includes(x)) {
        if (displayingAnswer)
            displayingAnswer = false;
        
        AssignOperator(x);
    }
    else if (x == "Enter" || x == "=") {
        operate();
    }
    else {
        alert("Not implemented: [" + x + "]");
        return;
    }
}