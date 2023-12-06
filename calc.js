const operators = ["+", "-", "*", "/"];
const specialInputs = ["Enter", "=", "c", "."];
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
    
    let answer = GetAnswer(Number(a), Number(b), currentOperator);
    a = answer;
    b = null;
    currentOperator = "";
    displayingAnswer = true;
    UpdateDisplay();
}

function Clear() {
    a = 0;
    b = null;
    currentOperator = "";
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

    //alert(a);
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

function AddDecimalPoint() {
    if (b == null) {
        if (Number(a) % 1 != 0 || (a + "").slice(-1) == ".")
            return;
    
        a += ".";
    }
    else {
        if (Number(b) % 1 != 0 || (b + "").slice(-1) == ".")
            return;
    
        b += ".";
    }
    UpdateDisplay();
}

// UI logic

// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll('button');

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
    button.addEventListener("click",  () => {
        ProcessInput(button.textContent);
    });
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
            if (!HaveOperator()) { // we're still on "a"
                if (a.includes(".")) {
                    a += x;
                }
                else {
                    a = (Number(a)*10) + Number(x);
                }
            }
            else {
                if (b != null && b.includes(".")) {
                    b += x;
                }
                else {
                    b = (Number(b)*10) + Number(x);
                }
            }
        }
        
        UpdateDisplay();
    }
    else if (operators.includes(x)) {
        if (displayingAnswer)
            displayingAnswer = false;
        
        AssignOperator(x);
    }
    else if (specialInputs.includes(x)) {
        switch (x) {
            case "Enter":
            case "=":
                operate();
                break;
            case "c":
                Clear();
                break;
            case ".":
                AddDecimalPoint();
                break;
        }
    }
    else {
        alert("Not implemented: [" + x + "]");
        return;
    }
}

// Change values when window is resized 
window.onresize = function() { 
    //alert("resize");     
    // Setting the current height & width 
    // to the elements 
    //height.innerHTML = window.innerHeight; 
    //width.innerHTML = window.innerWidth; 
};