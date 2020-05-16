
function createGameBoard() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            $('#gameBoard').append(`<div class="square" data-rows=${i} data-columns=${j}>${i},${j}</div>`)
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
    isOccupied = selectedSquare.hasClass('occupied')
    if (isOccupied) {
        return placeItem(item);
    } else {
        item['location'] = { row: row, column: column }
        selectedSquare.addClass(item['name']).addClass('occupied');
    }
}

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
    let currentPlayerRow = currentPlayer['location']['row']
    let currentPlayerColumn = currentPlayer['location']['column']
    let playRow = newRow;
    let playerColumn = newColumn
    let moveNow = validMove(playRow, playerColumn)
    if (moveNow) {
        $(`[data-rows=${currentPlayerRow}][data-columns=${currentPlayerColumn}]`).removeClass(currentPlayer['name']);
        $(`[data-rows=${newRow}][data-columns=${newColumn}]`).addClass(currentPlayer['name']);
        currentPlayer['location']['row'] = playRow;
        currentPlayer['location']['column'] = playerColumn;
        switchPlayer();
    } else {
        alert("Wrong Move")
    }

}

function validMove(a, b) {
    const direct = currentPlayer['location']['column']
    const directRow = currentPlayer['location']['row']
    const direction = b === direct ? 'column' : 'row';
    const columnChange = Math.abs(direct - b);
    const rowChange = Math.abs(directRow - a);
    const validColumnChange = direction === 'column' && columnChange === 0 && rowChange <= 3;
    const validRowChange = direction === 'row' && columnChange <= 3 && rowChange === 0;
    let canMove = (validColumnChange || validRowChange);
    return canMove
}
// function limitQuare(newRow, newCol, rowDiff, colDiff) {
//     let isOccupied = "";
//     let selSquare = $('square')
//     console.log(selSquare)
//     let selectedSquare = $(`[data-rows=${newRow}][data-columns=${newCol}]`);
//     console.log(colDiff)
//     console.log(selectedSquare)
//     isOccupied = selectedSquare.hasClass('figure')
//     for (let i = 0; i < colDiff; i++) {
//         if (isOccupied) {
//             alert('Invalid')
//         } else {

//             console.log('great')
//         }
//     }
    // return limitQuare(newRow, newCol, rowDiff, colDiff)

    // if (isOccupied) {
    //     return placeItem(item);
    // } else {
    //     item['location'] = { row: row, column: column }
    //     selectedSquare.addClass(item['name']).addClass('occupied');
    // }
}

// Select a new square
// Determine the number of squares the player will move through to get to the square
// Look at each square to see if it contains a barrier class
//     If a barrier class is found
//     alert the user of a wrong move
//   End
//     Else Move to the next square
// Repeat step 3

$('#gameBoard').on('click', function () {
    movePlayer(event.target.dataset.rows, event.target.dataset.columns)
})
