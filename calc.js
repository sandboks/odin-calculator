const operators = ["+", "-", "*", "×", "x", "/", "÷"];
const specialInputs = ["Enter", "=", "c", ".", "±", "⌫",];
const roundingDecimalPlaces = 6;

let a = 0;
let b = null;
let currentOperator = "";
let currentDisplay = "0";
let displayingAnswer = false;

let customColor = "#ffffff";

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
        case "×":
            return (a * b);
        case "/":
        case "÷":
            return (a / b);
    };
}

function operate() {
    if (!HaveOperator() || b == null)
        return;
    
    let answer = GetAnswer(Number(a), Number(b), currentOperator);
    answer = Math.round(answer * Math.pow(10, roundingDecimalPlaces))/Math.pow(10, roundingDecimalPlaces);
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
        currentDisplay += "" + currentOperator;
        if (b != null)
            currentDisplay += "" + b;
    }
    //alert("this is where the display should get updated!");


    document.getElementById('displayText').textContent = currentDisplay;

    //alert(a);
}

function AssignOperator(x) {
    if (["x", "*"].includes(x))
        x = "×";
    if (["/", "÷"].includes(x))
        x = "÷";

    if (HaveOperator()) {
        if (b != null) { // if we already entered b, then perform the operation now and then assign the new operator
            operate();
            displayingAnswer = false;
        }
    }

    if ((a + "").slice(-1) == ".")
        a += "0";

    currentOperator = x;
    UpdateDisplay();
}

function AddDecimalPoint() {
    if (HaveOperator()) {
        if (b == null) {
            b = "0.";
        }
        else {
            if (Number(b) % 1 != 0 || (b + "").slice(-1) == ".")
            return;

            b += ".";
        }
    }
    else if (displayingAnswer) {
        a = "0.";
        displayingAnswer = false;
    }
    else {
        if (Number(a) % 1 != 0 || (a + "").slice(-1) == ".")
            return;

        a += ".";
    }
    UpdateDisplay();
}

function PlusMinus() {
    if (HaveOperator()) {
        if (b != null)
            b *= -1;
    }
    else {
        a *= -1;
    }
    UpdateDisplay();
}

function Backspace() {
    if (displayingAnswer)
        return;
    
    if (HaveOperator()) {
        if (b == null) {
            AssignOperator("");
        }
        else {
            b = ("" + b).slice(0, -1)
            if (b == "")
                b = null;
        }
    }
    else 
    {
        if ((a + "").length == 1)
            a = 0;
        else {
            a = ("" + a).slice(0, -1)
        }
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
                if ((a + "").includes(".")) {
                    a += x;
                }
                else {
                    a = (Number(a)*10) + Number(x);
                }
            }
            else {
                if (b == null)
                    b = x;
                else if ((b + "").includes(".")) {
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
            case "±":
                PlusMinus();
                break;
            case "⌫":
                Backspace();
                break;
        }
    }
    else {
        //alert("Not implemented: [" + x + "]");
        return;
    }
}

const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", (event) => {
    customColor = event.target.value;
    RecolorCalculator();
});

function RecolorCalculator() {
    //customColor
    //document.getElementsByClassName("operatorButton");

    document.querySelector(".calcSection").style.borderColor = customColor;

    document.querySelectorAll(".operatorButton").forEach(function(button) {
        //alert("test");
        button.style.backgroundColor = customColor;
    });

    //alert(customColor);
}

const darkModeSwitch = document.querySelector("#darkModeToggle");
darkModeSwitch.addEventListener("click", ToggleDarkMode)

function ToggleDarkMode() {
    let calculator = document.querySelector(".calcSection");
    let content = document.querySelector(".content");
    let buttonSection = document.querySelector(".buttonsSection");
    let display = document.querySelector(".displayRow");

    calculator.classList.toggle("calcSectionDark");
    content.classList.toggle("contentDark");
    buttonSection.classList.toggle("buttonDark");
    display.classList.toggle("displayRowDark");

    
    
}

// Change values when window is resized 
window.onresize = function() { 
    ScaleCalculatorToWindow();
};

function ScaleCalculatorToWindow() {
    document.getElementsByClassName("calcSection")[0].style.transform = "scale(" + 1 + ")";
    let calcSection = document.querySelector('.calcSection'); 
    let contentSection = document.querySelector('.content'); 
    let scale = Math.min((contentSection.offsetHeight / (calcSection.offsetHeight * 1.25)), (contentSection.offsetWidth / (calcSection.offsetWidth * 1.25)));
    //alert(scale);

    document.getElementsByClassName("calcSection")[0].style.transform = "scale(" + scale + ")";
}

// scale once the page is first loaded
ScaleCalculatorToWindow();