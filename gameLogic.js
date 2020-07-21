
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
    name: 'weapon1',
    power: 10,
    img: ''
}, {
    name: 'weapon1',
    power: 10,
    img: ''
}, {
    name: 'weapon1',
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
// function switchPlayer() {
//     if (currentPlayer === player[0]) {
//         currentPlayer = player[1];
//     } else {
//         currentPlayer = player[0];
//     }
// }
let currentPlayerRow = currentPlayer['location']['row']
let currentPlayerColumn = currentPlayer['location']['column']
function movePlayer(newRow, newColumn) {
    let currentPlayerRow = currentPlayer['location']['row']
    let currentPlayerColumn = currentPlayer['location']['column']

    let playerRow = newRow;
    let playerColumn = newColumn;

    let barrierCheck = checkBarriers(newRow, newColumn)
    let moveNow = validMove(playerRow, playerColumn)
    if (!barrierCheck && moveNow) {

        $(`[data-rows=${currentPlayerRow}][data-columns=${currentPlayerColumn}]`).removeClass(currentPlayer['name']);
        console.log(clearHighlighedSquare())
        clearHighlighedSquare();
        $(`[data-rows=${newRow}][data-columns=${newColumn}]`).addClass(currentPlayer['name']);
        console.log(newRow, newColumn)
        currentPlayer['location']['row'] = playerRow;
        currentPlayer['location']['column'] = playerColumn;
        traverseDirections(newRow, newColumn)
        // switchPlayer();
        // 
    } else {
        alert("Wrong Move")
    }

}

function validMove(squareRow, squareCol) {
    const playerCol = currentPlayer['location']['column']
    const playerRow = currentPlayer['location']['row']
    const direction = (squareRow === playerRow) ? 'column' : 'row';
    const columnChange = Math.abs(playerCol - squareCol);
    const rowChange = Math.abs(playerRow - squareRow);
    const validColumnChange = (direction === 'column') && (columnChange <= 3) && (rowChange === 0);
    const validRowChange = (direction === 'row') && (rowChange <= 3) && (columnChange === 0);
    let canMove = (validColumnChange || validRowChange);
    return canMove
}

// Select a new square
// Determine the number of squares the player will move through to get to the square
// Look at each square to see if it contains a barrier class
// If a barrier class is found
//     alert the user of a wrong move
//   End
//     Else Move to the next square
// Repeat step 3
function checkBarriers(squareRow, squareCol) {
    const playerCol = currentPlayer['location']['column'];
    const playerRow = currentPlayer['location']['row'];
    const direction = (squareRow === playerRow) ? 'column' : 'row';
    const columnChange = playerCol - squareCol;
    const rowChange = playerRow - squareRow;
    let thisSquare = ''
    if (direction === 'column') {
        if (columnChange <= 0) {
            for (let i = parseInt(playerCol, 10) + 1; i <= squareCol; i++) {
                thisSquare = $(`[data-rows=${playerRow}][data-columns=${i}]`).hasClass('figure')
                if (thisSquare) {
                    return true
                }
            }
        } else {
            for (let i = parseInt(playerCol, 10) - 1; i >= squareCol; i--) {
                thisSquare = $(`[data-rows=${playerRow}][data-columns=${i}]`).hasClass('figure')
                if (thisSquare) {
                    return true
                }
            }
        }
    } else {
        if (rowChange <= 0) {
            for (let i = parseInt(playerRow, 10) + 1; i <= squareRow; i++) {
                thisSquare = $(`[data-rows=${i}][data-columns=${playerCol}]`).hasClass('figure')
                if (thisSquare) {
                    return true
                }
            }
        } else {
            for (let i = parseInt(playerRow, 10) - 1; i >= squareRow; i--) {
                thisSquare = $(`[data-rows=${i}][data-columns=${playerCol}]`).hasClass('figure')
                if (thisSquare) {
                    return true
                }
            }
        }
    }
}


$('#gameBoard').on('click', function () {
    movePlayer(event.target.dataset.rows, event.target.dataset.columns)
})

// it's job is to traverse all 4 directions uptill 3 boxes away,
// if there is an obstacle, stop, if not, highlight the box, and if player found adjacent, start battle

// Function traverseSquare

// Function traverseSquare
function clearHighlighedSquare() {
    return $('.blue').removeClass('blue')
}
function traverseDirections(i, j) {
    let highlight = ''
    const figure = $('.square').hasClass('figure')
    let down = i + 3; up = i - 3; right = j - 3; left = j + 3;
    for (let x = i; x <= down; x++) {
        console.log(typeof (down))
        console.log(down)
        console.log(x, j)
        highlight = $(`[data-rows=${x}][data-columns=${j}]`).addClass('blue')
        console.log(highlight)
        // if (!figure) {
        //     continue; // Check what to do
        // }
        // if ($('.player')) {
        //     // startBattle()
        // }
    }
    for (let x = i; x >= up; x--) {

        if (!figure) {
            continue; // Check what to do
        }
        if ($('.player')) {
            // startBattle()
        }
        highlight = $(`[data-rows=${x}][data-columns=${j}]`).addClass('blue')
    }

    for (let x = j; x <= left; x++) {
        if (!figure) {
            continue;  // Check what to do
        }
        if ($('.player')) {
            // startBattle()
        }
        highlight = $(`[data-rows=${i}][data-columns=${x}]`)
        console.log(highlight)
    }
    for (let x = j; x >= right; x--) {
        if (!figure) {
            continue;  // Check what to do
        }
        if ($('.player')) {
            // startBattle()
        }
        highlight = $(`[data-rows=${i}][data-columns=${x}]`).addClass('blue')
    }

}

$(document).ready(function () {
    traverseDirections(currentPlayerRow, currentPlayerColumn);
})
