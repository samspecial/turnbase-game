
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
function placeBarrier() {
    let row = randomNumber(1, 9);
    let col = randomNumber(1, 9);
    let selectedSquare = $(`[data-rows=${row}][data-columns=${col}]`);
    let isOccupied = selectedSquare.hasClass('occupied') //return true or false

    if (isOccupied) {
        return placeBarrier();
    } else {
        selectedSquare.addClass('figure').addClass('occupied');
    }
}
function renderBarriers() {
    for (var i = 0; i < 12; i++) {
        placeBarrier();
    }
}
renderBarriers();


function placePlayer() {
    let row = randomNumber(1, 9);
    let col = randomNumber(1, 9);
    let selectedSquare = $(`[data-rows=${row}][data-columns=${col}]`);
    let isOccupied = selectedSquare.hasClass('occupied') //return true or false

    if (isOccupied) {
        return placePlayer();
    } else {
        selectedSquare.addClass('player').addClass('occupied');
    }
}
function renderPlayers() {
    for (var i = 0; i < 2; i++) {
        placePlayer();
    }
}
renderPlayers();


function placeWeapons() {
    let row = randomNumber(1, 9);
    let col = randomNumber(1, 9);
    let selectedSquare = $(`[data-rows=${row}][data-columns=${col}]`);
    let isOccupied = selectedSquare.hasClass('occupied') //return true or false

    if (isOccupied) {
        return placeWeapons();
    } else {
        selectedSquare.addClass('weapon').addClass('occupied');
    }
}
function renderWeapons() {
    for (var i = 0; i < 4; i++) {
        placeWeapons();
    }
}
renderWeapons();