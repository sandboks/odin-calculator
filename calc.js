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
  // and for each one we add a 'click' listener
    button.addEventListener('click', () => {
        //alert(button.id);
        // assign the player's input from the button
        for (let i = 0; i < choices.length; i++) {
            if (choices[i] === button.id.toUpperCase()) {
                playerInput = i
            }
        }

        // trigger playing a round of the game
        playRound(playerInput, getComputerChoice())
    });
});