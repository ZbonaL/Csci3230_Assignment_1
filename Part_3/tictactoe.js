var curLetter;

window.onload = function () {
    change_turn(); // Start the game with X's turn
    document.getElementsByTagName("table")[0].addEventListener("click", click_event); // Add the event listener to start
}

function click_event(event) {
    let target = event.target;

    // If the element isnt already selected
    if (target.innerHTML == "") {
        // Place the letter
        target.innerHTML = curLetter;

        // Change turns
        change_turn();
        
        let table = document.getElementsByTagName("table")[0];

        // Check to see if anyone won
        let won = check_for_win(table);

        // If there are no empty slots in the table and no one has won yet
        // Declare a draw
        if (empty_slots(table) == false &&  won == false) {
            win_game("Draw");
        }
    }
}

function win_game(player) {
    // Depending on the output of the game, change the div and remove the event listener
    if (player == "Draw") {
        document.getElementById("turn_indicator").innerHTML = "The game ended in a draw!";
    } else {
        document.getElementById("turn_indicator").innerHTML = player + " has won!";
    }
    document.getElementsByTagName("table")[0].removeEventListener("click", click_event);
}

function check_for_win(table) {
    let cells = table.getElementsByTagName("td");

    // Check the vertical and horizontal rows in the table for the same letter
    for (let i = 0; i < cells.length / 3; i++) {
        // Check vertical first
        if (cells[i].innerHTML != "" &&
            cells[i].innerHTML == cells[i + 3].innerHTML &&
            cells[i + 3].innerHTML == cells[i + 6].innerHTML) {

            win_game(cells[i].innerHTML);
            return true;


        // Check horizontal
        } else if (cells[i * 3].innerHTML != "" &&
            cells[i * 3].innerHTML == cells[i * 3 + 1].innerHTML &&
            cells[i * 3 + 1].innerHTML == cells[i * 3 + 2].innerHTML) {

            win_game(cells[i * 3].innerHTML);
            return true;
        }
    }

    // Check both diagonals for the win
    if (cells[0].innerHTML != "" &&
        cells[0].innerHTML == cells[4].innerHTML &&
        cells[4].innerHTML == cells[8].innerHTML) {

        win_game(cells[0].innerHTML);
        return true;
    }
    if (cells[6].innerHTML != "" &&
        cells[6].innerHTML == cells[4].innerHTML &&
        cells[4].innerHTML == cells[2].innerHTML) {

        win_game(cells[6].innerHTML);
        return true;
    }

    return false;
}

function change_turn() {
    // Swaps the turn from X -> O and Y -> O
    if (curLetter == "") {
        curLetter = "X";
    } else if (curLetter == 'X') {
        curLetter = "O";
    } else {
        curLetter = "X";
    }
    document.getElementById("turn_indicator").innerHTML = curLetter + "'s Turn";
}

function empty_slots(table) {
    // Checks if all the elements in the table are empty
    let cells = table.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == "") {
            return true;
        }
    }
    return false;
}