var curLetter;

window.onload = function () {
    change_turn();
    document.getElementsByTagName("table")[0].addEventListener("click", click_event);
}

function click_event(event) {
    let target = event.target;

    if (target.innerHTML == "") {
        target.innerHTML = curLetter;

        change_turn();
        let table = document.getElementsByTagName("table")[0];
        check_for_win(table);

        if (empty_slots(table) == false) {
            win_game("Draw");
        }
    }
}

function win_game(player) {
    if (player == "Draw") {
        document.getElementById("turn_indicator").innerHTML = "The game ended in a draw!";
    } else {
        document.getElementById("turn_indicator").innerHTML = player + " has won!";
    }
    document.getElementsByTagName("table")[0].removeEventListener("click", click_event);
}

function check_for_win(table) {
    let cells = table.getElementsByTagName("td");

    for (let i = 0; i < cells.length / 3; i++) {
        // Check vertical first
        if (cells[i].innerHTML != "" &&
            cells[i].innerHTML == cells[i + 3].innerHTML &&
            cells[i + 3].innerHTML == cells[i + 6].innerHTML) {
            win_game(cells[i].innerHTML);


            // Check horizontal
        } else if (cells[i * 3].innerHTML != "" &&
            cells[i * 3].innerHTML == cells[i * 3 + 1].innerHTML &&
            cells[i * 3 + 1].innerHTML == cells[i * 3 + 2].innerHTML) {

            win_game(cells[i * 3].innerHTML);
        }
    }

    if (cells[0].innerHTML != "" &&
        cells[0].innerHTML == cells[4].innerHTML &&
        cells[4].innerHTML == cells[8].innerHTML) {
        win_game(cells[0].innerHTML)
    }
    if (cells[6].innerHTML != "" &&
        cells[6].innerHTML == cells[4].innerHTML &&
        cells[4].innerHTML == cells[2].innerHTML) {
        win_game(cells[6].innerHTML)
    }
}

function change_turn(player) {
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
    let cells = table.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == "") {
            return true;
        }
    }
    return false;
}