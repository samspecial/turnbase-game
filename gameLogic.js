
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
    power: 60,
    img: ''
}, {
    name: 'weapon2',
    power: 50,
    img: ''
}, {
    name: 'weapon3',
    power: 40,
    img: ''
}, {
    name: 'weapon4',
    power: 30,
    img: ''
}]
const player = [{
    name: 'player1',
    lifepoint: 100,
    weapon: {
        name: 'weapon',
        power: 10,
        img: ''
    },
    location: {
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
    },
    location: {
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

// DISPLAY PLAYERS INFO ON THE GAME BOARD
// PLAYER ONE COLOUR = BLACK
// PLAYER TWO COLOR = PINK

function playerInfo(type) {
    let playerName;
    let playerPoint;
    let playerWeapon;
    function selectElement(selectorAll) {
        let selectElement = document.getElementsByClassName(selectorAll)

        if (selectElement.length > 0) {
            for (let i = 0; i < selectElement.length; i++) {
                console.log(selectElement[i])
                return selectElement[i]
            }
        }
    }
    // selectElement()
    let name = selectElement('name'), life = selectElement('lifePoint'), weapon = selectElement('weapon')
    console.log(name)
    for (x = 0; x < type.length; x++) {
        playerName += type[x]['name']
    }
    return playerName;
    name.textContent = playerName
}

let currentPlayerRow = currentPlayer['location']['row']
let currentPlayerColumn = currentPlayer['location']['column']
function movePlayer(newRow, newColumn) {
    let currentPlayerRow = currentPlayer['location']['row']
    let currentPlayerColumn = currentPlayer['location']['column']
    console.log(currentPlayer)
    let playerRow = newRow;
    let playerColumn = newColumn;

    let barrierCheck = checkBarriers(newRow, newColumn)
    let moveNow = validMove(playerRow, playerColumn)
    if (!barrierCheck && moveNow) {
        pickWeapon(newRow, newColumn, weapons)
        $(`[data-rows=${currentPlayerRow}][data-columns=${currentPlayerColumn}]`).removeClass(currentPlayer['name']);

        $(`[data-rows=${newRow}][data-columns=${newColumn}]`).addClass(currentPlayer['name']);
        currentPlayer['location']['row'] = playerRow;
        currentPlayer['location']['column'] = playerColumn;
        clearHighlighedSquare();

        switchPlayer();
        traverseDirections(parseInt(currentPlayer['location']['row'], 10), parseInt(currentPlayer['location']['column'], 10))
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
// Select a square by passing the value of i and j
// Check for a class of weapon on the square
// If present, remove the weapon on the player
// Add the weapon in the square to the player

const pickWeapon = (i, j, weapons, weapon) => {
    for (x = 0; x < weapons.length; x++) {
        let selectWeaponSquare = $(`[data-rows=${i}][data-columns=${j}]`)
        let weaponPosition = selectWeaponSquare.hasClass(weapons[x]['name']);
        if (weaponPosition) {
            oldWeapon = currentPlayer['weapon']
            console.log(oldWeapon)
            currentPlayer['weapon'] = { name: weapons[x]['name'], power: weapons[x]['power'], img: weapons[x]['img'] }
            selectWeaponSquare.removeClass(weapons[x]['name'])
            selectWeaponSquare.addClass(oldWeapon['name'])
            console.log(currentPlayer)
        }
    }
}

// const pickWeapon = (i, j, weapons, weapon) => {
//     for (x = 0; x < weapons.length; x++) {
//         let selectWeaponSquare = $(`[data-rows=${i}][data-columns=${j}]`)
//         let weaponPosition = selectWeaponSquare.hasClass(weapons[x]['name']);
//         if (weaponPosition) {
//             oldWeapon = currentPlayer['weapon'];
//             currentPlayer['weapon'] = { name: weapons[x]['name'], power: weapons[x]['power'], img: weapons[x]['img'] }
//             selectWeaponSquare.removeClass(weapons[x]['name'])
//             selectWeaponSquare.addClass(oldWeapon['name'])
//             console.log('player, weapon', currentPlayer, oldWeapon)
//         }
//     }
// }

$('#gameBoard').on('click', function () {
    movePlayer(event.target.dataset.rows, event.target.dataset.columns)
})

function clearHighlighedSquare() {
    return $('.blue').removeClass('blue')
}

// Function traverseSquare
function traverseDirections(i, j) {
    playerInfo(player)
    let highlight = ''
    let figure;
    let selectPlayer;
    function checkPlayer(a, b) {
        for (y = 0; y < player.length; y++) {
            playerCheckResult = $(`[data-rows=${a}][data-columns=${b}]`).hasClass(player[y]['name'])
        }
        return playerCheckResult
    }
    for (let x = i + 1; x <= i + 3; x++) {
        selectPlayer = checkPlayer(x, j)
        figure = $(`[data-rows=${x}][data-columns=${j}]`).hasClass('figure')
        if (figure) {
            break; // Check what to do
        }
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
        }
        highlight = $(`[data-rows=${x}][data-columns=${j}]`).addClass('blue')
    }
    for (let x = i - 1; x >= i - 3; x--) {
        selectPlayer = checkPlayer(x, j)
        figure = $(`[data-rows=${x}][data-columns=${j}]`).hasClass('figure')
        if (figure) {
            break;
        }
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
        }
        highlight = $(`[data-rows=${x}][data-columns=${j}]`).addClass('blue')
    }

    for (let x = j + 1; x <= j + 3; x++) {
        selectPlayer = checkPlayer(i, x)
        figure = $(`[data-rows=${i}][data-columns=${x}]`).hasClass('figure')
        if (figure) {
            break;
        }
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
        }
        highlight = $(`[data-rows=${i}][data-columns=${x}]`).addClass('blue')
    }
    for (let x = j - 1; x >= j - 3; x--) {
        selectPlayer = checkPlayer(i, x)
        figure = $(`[data-rows=${i}][data-columns=${x}]`).hasClass('figure')
        if (figure) {
            break;
        }
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
        }
        highlight = $(`[data-rows=${i}][data-columns=${x}]`).addClass('blue')
    }

}

$(document).ready(function () {
    traverseDirections(currentPlayerRow, currentPlayerColumn);
})

