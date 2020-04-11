
function createGameBoard() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            $('#gameBoard').append(`<div class="square" data-rows=${i} data-columns=${j}></div>`)
        }
    }
}
createGameBoard();
function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

const players = ["player", "player1"]
const weapons = ["weapon", "weapon1", "weapon2", "weapon3"]
let isOccupied = ""
function placeItem(item) {
    let row = randomNumber(1, 9);
    let col = randomNumber(1, 9);
    let selectedSquare = $(`[data-rows=${row}][data-columns=${col}]`);
    isOccupied = selectedSquare.hasClass('occupied') //return true or false

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

//Write a function to move Player
// Identify the Player and select the players
// Determine the current position
// Determine the distance/length
function movePlayer() {

    isOccupied = $('.square').not('.occupied', '.figure', '.player1')

    if (!isOccupied) {
        alert("There is an obstruction")
        return movePlayer()
    } else {
        $(isOccupied).click(function () {
            $('.player').animate({
                left: "-=60px",

            }).animate({
                right: "+=60px"
            })
            console.log("good")
        })
    }
}
movePlayer()