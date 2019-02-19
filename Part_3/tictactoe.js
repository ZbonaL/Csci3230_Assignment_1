var curLetter;
var won = false;

window.onload = function () {
    var table = document.getElementsByTagName("table")[0];
    change_turn();

    document.getElementsByTagName("table")[0].addEventListener("click", function (event) {
        let target = event.target;

        if (target.innerHTML == "" && won != true) {
            target.innerHTML = curLetter;

            change_turn();
            checkForWin(table);
        }
    });
}

function win_game(player) {
    document.getElementById("turn_indicator").innerHTML = player + " has won!";
    won = true;
}

function checkForWin(table) {
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