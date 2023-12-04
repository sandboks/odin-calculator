const operators = ["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"];
let a = 0;
let b = 0;
let currentOperator = "";
let currentDisplay = "0";

function GetAnswer(a, b, operator) {
    switch (operator) {
        case "ADD":
            return (a + b);
            break;
        case "SUBTRACT":
            return (a - b);
        case "MULTIPLY":
            return (a * b);
        case "DIVIDE":
            return (a / b);
    };
}

function operate() {
    let answer = GetAnswer(a, b, operator);
    a = answer;
    b = null;
    currentOperator = "";
    UpdateDisplay(answer);
}

function UpdateDisplay(s) {
    currentDisplay = s;
    alert("this is where the display should get updated!");
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
                alert("Haven't done this one yet!");
            });
    }
});

