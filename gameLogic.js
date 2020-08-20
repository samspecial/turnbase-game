// import { Player } from './player'
// const me = new Player('bayo', { name: 'Sam', power: 20 }, { row: 0, column: 0 }, 100)
// console.log(me)

// Function to Generate Game Board of 9 by 9
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
    name: 'grenade',
    power: 60,
    img: ''
}, {
    name: 'sniper',
    power: 50,
    img: ''
}, {
    name: 'sword',
    power: 40,
    img: ''
}, {
    name: 'bow',
    power: 30,
    img: ''
}]
const player = [{
    name: 'sonya',
    lifepoint: 100,
    attack: 10,
    weapon: {
        name: 'Fist',
        power: 10,
        img: ''
    },
    location: {
        row: 0,
        column: 0
    }
}, {
    name: 'lui-keng',
    lifepoint: 100,
    attack: 10,
    weapon: {
        name: 'Fist',
        power: 10,
        img: ''
    },
    location: {
        row: 0,
        column: 0
    }
}]
const barrier = { name: "figure" }

//Place items on the Board
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
//Function to loop through the barriers
function renderBarriers() {
    for (var i = 0; i < 12; i++) {
        placeItem(barrier);
    }
}

//Function to loop through the player array
function renderPlayers() {
    for (var i = 0; i < player.length; i++) {
        placeItem(player[i]);
    }
}
//Function to loop through the Weapon array
function renderWeapons() {
    for (var i = 0; i < weapons.length; i++) {
        placeItem(weapons[i]);
    }
}


renderBarriers();
renderPlayers();
renderWeapons();
//Switch player Function
let currentPlayer = player[0]
function switchPlayer() {
    if (currentPlayer === player[0]) {
        currentPlayer = player[1];
    } else {
        currentPlayer = player[0];
    }
}



let currentPlayerRow = currentPlayer['location']['row']
let currentPlayerColumn = currentPlayer['location']['column']
function movePlayer(newRow, newColumn) {
    let currentPlayerRow = currentPlayer['location']['row']
    let currentPlayerColumn = currentPlayer['location']['column']
    console.log(currentPlayer)
    let playerRow = parseInt(newRow, 10);
    let playerColumn = parseInt(newColumn, 10);

    let barrierCheck = checkBarriers(parseInt(newRow, 10), parseInt(newColumn, 10))
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
//Check player move if Valid
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
    console.log(direction)
    console.log(squareRow + squareCol)
    const columnChange = playerCol - squareCol;
    console.log(columnChange)
    const rowChange = playerRow - squareRow;
    let thisSquare = ''
    if (direction === 'column') {
        if (columnChange <= 0) {
            for (let i = parseInt(playerCol, 10) + 1; i <= squareCol; i++) {
                console.log(typeof (squareCol))
                console.log(typeof (playerCol))
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

const pickWeapon = (i, j, weapons) => {
    for (let x = 0; x < weapons.length; x++) {
        let selectWeaponSquare = $(`[data-rows=${i}][data-columns=${j}]`)
        let weaponPosition = selectWeaponSquare.hasClass(weapons[x]['name']);
        if (weaponPosition) {
            let oldWeapon = currentPlayer['weapon']
            currentPlayer['weapon'] = { name: weapons[x]['name'], power: weapons[x]['power'], img: weapons[x]['img'] }
            selectWeaponSquare.removeClass(weapons[x]['name'])
            console.log(currentPlayer['weapon'])
            selectWeaponSquare.addClass(currentPlayer['weapon']['name'])
        }
    }

}

$('#gameBoard').on('click', function () {
    movePlayer(event.target.dataset.rows, event.target.dataset.columns)
})

function clearHighlighedSquare() {
    return $('.highlight-path').removeClass('highlight-path')
}

// Function traverseSquare
function traverseDirections(i, j) {
    playerInfo(player)
    let highlight = ''
    let figure;
    let selectPlayer;
    //Check if the another player lies on the path of the current player
    function checkPlayer(a, b) {
        let playerCheckResult;
        for (let y = 0; y < player.length; y++) {

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
            window.location.href = "#fight-modal"
            fight()
        }
        highlight = $(`[data-rows=${x}][data-columns=${j}]`).addClass('highlight-path')
    }
    for (let x = i - 1; x >= i - 3; x--) {
        selectPlayer = checkPlayer(x, j)
        figure = $(`[data-rows=${x}][data-columns=${j}]`).hasClass('figure')
        if (figure) {
            break;//Check what to do
        }
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
            window.location.href = "#fight-modal"
            fight()
        }
        highlight = $(`[data-rows=${x}][data-columns=${j}]`).addClass('highlight-path')
    }

    for (let x = j + 1; x <= j + 3; x++) {
        selectPlayer = checkPlayer(i, x)
        figure = $(`[data-rows=${i}][data-columns=${x}]`).hasClass('figure')
        if (figure) {
            break;//Check what to do
        }
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
            window.location.href = "#fight-modal"
            fight()
        }
        highlight = $(`[data-rows=${i}][data-columns=${x}]`).addClass('highlight-path')
    }

    for (let x = j - 1; x >= j - 3; x--) {
        selectPlayer = checkPlayer(i, x)
        figure = $(`[data-rows=${i}][data-columns=${x}]`).hasClass('figure')
        if (figure) {
            break;//Check what to do
        }
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
            window.location.href = "#fight-modal"
            fight()
        }
        highlight = $(`[data-rows=${i}][data-columns=${x}]`).addClass('highlight-path')
    }

}

$(document).ready(function () {
    traverseDirections(currentPlayerRow, currentPlayerColumn);
})

// DISPLAY PLAYERS INFO ON THE GAME BOARD
// PLAYER ONE COLOUR = BLACK
// PLAYER TWO COLOR = PINK

function playerInfo(type) {

    $('#player-one-name').text(type[0]['name']);
    $('#player-two-name').text(type[1]['name']);
    $('#player-one-lifepoint').text(type[0]['lifepoint']);
    $('#player-two-lifepoint').text(type[1]['lifepoint']);
    $('#player-one-weapon').text(type[0]['weapon']['name']);
    $('#player-two-weapon').text(type[1]['weapon']['name']);
    $('#player-one-attack-power').text(type[0]['weapon']['power']);
    $('#player-two-attack-power').text(type[1]['weapon']['power']);

}

function fight() {

    let playerName = currentPlayer['name']
    //Set Player's Lifepoints
    let playerOneLifepoint = 100;
    let playerTwoLifepoint = 100;
    //Set Player Action for either defend or attack
    let playerOneDefend = false;
    let playerTwoDefend = false;
    $('#player1-attack').click(function () {

        console.log(player)

        //In case the player decides to defend
        if (playerTwoDefend === true) {

            playerTwoLifepoint -= currentPlayer.attack / 2;
            $('#player2-lifepoint').text(playerTwoLifepoint);
            playerTwoDefend = false;
        } else {
            //In case the player chooses not to defend
            console.log(currentPlayer.attack)
            playerTwoLifepoint -= currentPlayer.attack;
            $('#player2-lifepoint').text(playerTwoLifepoint);
        }
        //When the opponent's player's life is less than or equal to 0 declare winner
        if (playerTwoLifepoint <= 0) {
            console.log("Player 1 wins");
        }
        playerName = 'lui-keng'
        console.log(playerName)
        playerOneDefend = false;
        $('#defence-player1').text(playerOneDefend);

    });

    //Player 1 decides to defend
    $('#player1-defend').click(function () {
        playerOneDefend = true;
        $('#defence-player1').text(playerOneDefend);
        playerName = 'lui-keng'

    });
    //Player 2 decides to Attack
    $('#player2-attack').click(function () {
        console.log(currentPlayer)

        //In case the player decides to defend
        if (playerOneDefend === true) {
            console.log(currentPlayer.attack)
            playerOneLifepoint -= currentPlayer.attack / 2;
            $('#player1-lifepoint').text(playerOneLifepoint);
            playerOneDefend = false;
        } else {
            //In case the player chooses not to defend
            console.log(currentPlayer.attack)
            playerOneLifepoint -= currentPlayer.attack;
            $('#player1-lifepoint').text(playerOneLifepoint);
        }
        //When the opponent's player's life is less than or equal to 0 declare winner
        if (playerOneLifepoint <= 0) {
            console.log("Player 2 wins");

        }
        playerName = 'sonya'
        console.log(playerName)
        playerOneDefend = false;
        $('#defence-player2').text(playerOneDefend);

    });
    $('#player2-defend').click(function () {
        playerTwoDefend = true; //Player 2 decides to defend
        $('#defence-player2').text(playerTwoDefend);
        playerName = 'sonya'

    });

}