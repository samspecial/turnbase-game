
function createGameBoard() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            $('#gameBoard').append(`<div class="square" data-rows=${i} data-columns=${j}> ${i}, ${j}</div>`)
        }
    }
}
createGameBoard();
function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

const players = ["player", "player1"]
const weapons = ["weapon", "weapon1", "weapon2", "weapon3"]

function placeItem(item) {
    let row = randomNumber(1, 9);
    let col = randomNumber(1, 9);
    let selectedSquare = $(`[data-rows=${row}][data-columns=${col}]`);
    let isOccupied = selectedSquare.hasClass('occupied') //return true or false

    if (isOccupied) {
        return placeItem(item);
    } else {
        selectedSquare.addClass(item).addClass('occupied');
    }
}
function renderBarriers() {
    for (var i = 0; i < 12; i++) {
        placeItem('figure');
    }
}
function renderPlayers() {
    for (var i = 0; i < players.length; i++) {
        placeItem(players[i]);
    }
}
function renderWeapons() {
    for (var i = 0; i < weapons.length; i++) {
        placeItem(weapons[i]);
    }
}
renderBarriers();
renderPlayers();
renderWeapons();