
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

const weapons = [{
    name: 'weapon1',
    power: 10,
    img: ''
}, {
    name: 'weapon2',
    power: 10,
    img: ''
}, {
    name: 'weapon3',
    power: 10,
    img: ''
}, {
    name: 'weapon4',
    power: 10,
    img: ''
}]
const player = [{
    name: 'player1',
    lifepoint: 100,
    weapon: {
        name: 'weapon',
        power: 10,
        img: ''
    }, location: {
        row: 0,
        column: 0
    }
}, {
    name: 'player2',
    lifepoint: 100,
    weapon: {
        name: 'weapon',
        power: 10,
        img: ''
    }, location: {
        row: 0,
        column: 0
    }
}]
const barrier = { name: "figure" }
function placeItem(item) {
    let isOccupied = ""
    let row = randomNumber(1, 9);
    let column = randomNumber(1, 9);
    let selectedSquare = $(`[data-rows=${row}][data-columns=${column}]`);
    isOccupied = selectedSquare.hasClass('occupied') //return true or false

    if (isOccupied) {
        return placeItem(item);
    } else {
        item['location'] = { row: row, column: column }
        selectedSquare.addClass(item['name']).addClass('occupied');
    }
}
// function placeBarrier(item) {
//     let isOccupied = ""
//     let row = randomNumber(1, 9);
//     let col = randomNumber(1, 9);
//     let selectedSquare = $(`[data-rows=${row}][data-columns=${col}]`);
//     isOccupied = selectedSquare.hasClass('occupied') //return true or false

//     if (isOccupied) {
//         return placeBarrier(item);
//     } else {
//         selectedSquare.addClass(item['name']).addClass('occupied');
//     }
// }
function renderBarriers() {
    for (var i = 0; i < 12; i++) {
        placeItem(barrier);
    }
}
function renderPlayers() {
    for (var i = 0; i < player.length; i++) {
        placeItem(player[i]);
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

let currentPlayer = player[0]
function switchPlayer() {
    if (currentPlayer === player[0]) {
        currentPlayer = player[1];
    } else {
        currentPlayer = player[0];
    }
}

function movePlayer(newRow, newColumn) {
    let playerRow = newRow;
    let playerColumn = newColumn;
    let currentPlayerRow = currentPlayer['location']['row']
    let currentPlayerColumn = currentPlayer['location']['column']
    $(`[data-rows=${currentPlayerRow}][data-columns=${currentPlayerColumn}]`).removeClass(currentPlayer['name']);
    $(`[data-rows=${playerRow}][data-columns=${playerColumn}]`).addClass(currentPlayer['name']);
    currentPlayer['location']['row'] = playerRow;
    currentPlayer['location']['column'] = playerColumn;
    switchPlayer();
}

$('#gameBoard').on('click', function () {
    movePlayer(event.target.dataset.rows, event.target.dataset.columns)
})