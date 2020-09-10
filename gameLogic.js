let weapon1 = new Weapon('Fist', 10, 'img/brick.png');
let weapon2 = new Weapon('grenade', 60, 'img/grenade.png');
let weapon3 = new Weapon('sniper', 50, 'img/sniper.png');
let weapon4 = new Weapon('sword', 40, 'img/sword.png');
let weapon5 = new Weapon('bow', 30, 'img/bow.png');
const weaponry = [weapon1, weapon2, weapon3, weapon4, weapon5];

let position = {
    row: 0,
    column: 0
};
// INSTANTIATING THE PLAYER CLASS
let player1 = new Player('sonya', 100, 10, weapon1, position);
let player2 = new Player('lui-keng', 100, 10, weapon1, position);
const players = [player1, player2];
const barrier = {
    name: 'figure'
}

function createGameBoard() {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            $('#gameBoard').append(`<div class="square" data-rows=${i} data-columns=${j}></div>`)
        }
    }
}
createGameBoard();

// Function to Generate Game Board of 9 by 9
function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

//  Place items on the Board
function placeItem(item) {
    let isOccupied = ""
    let row = randomNumber(1, 9);
    let column = randomNumber(1, 9);
    let selectedSquare = $(`[data-rows=${row}][data-columns=${column}]`);
    isOccupied = selectedSquare.hasClass('occupied')
    if (isOccupied) {
        return placeItem(item);
    } else {
        item['position'] = {
            row: row,
            column: column
        }
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
    for (var i = 0; i < players.length; i++) {
        placeItem(players[i]);
    }
}
//Function to loop through the Weapon array
function renderWeapons() {
    for (var i = 0; i < weaponry.length; i++) {
        placeItem(weaponry[i]);
    }
}

renderBarriers();
renderPlayers();
renderWeapons();



// const weapons = [{
//     name: 'grenade',
//     power: 60,
//     img: 'img/grenade.png'
// }, {
//     name: 'sniper',
//     power: 50,
//     img: 'img/sniper.png'
// }, {
//     name: 'sword',
//     power: 40,
//     img: 'img/sword.png'
// }, {
//     name: 'bow',
//     power: 30,
//     img: 'img/bow.png'
// }]
// const player = [{
//     name: 'sonya',
//     lifepoint: 100,
//     attack: 10,
//     weapon: {
//         name: 'Fist',
//         power: 10,
//         img: 'img/brick.png'
//     },
//     location: {
//         row: 0,
//         column: 0
//     }
// }, {
//     name: 'lui-keng',
//     lifepoint: 100,
//     attack: 10,
//     weapon: {
//         name: 'Fist',
//         power: 10,
//         img: 'img/brick.png'
//     },
//     location: {
//         row: 0,
//         column: 0
//     }
// }]

//Switch player Function
let currentPlayer = players[0]

function switchPlayer() {
    if (currentPlayer === players[0]) {
        currentPlayer = players[1];
    } else {
        currentPlayer = players[0];
    }
}

let currentPlayerRow = currentPlayer['position']['row']
let currentPlayerColumn = currentPlayer['position']['column']

function movePlayer(newRow, newColumn) {
    let currentPlayerRow = currentPlayer['position']['row']
    let currentPlayerColumn = currentPlayer['position']['column']
    let playerRow = parseInt(newRow, 10);
    let playerColumn = parseInt(newColumn, 10);

    let barrierCheck = checkBarriers(parseInt(newRow, 10), parseInt(newColumn, 10))
    let moveNow = validMove(playerRow, playerColumn)
    if (!barrierCheck && moveNow) {
        pickWeapon(newRow, newColumn, weaponry)
        $(`[data-rows=${currentPlayerRow}][data-columns=${currentPlayerColumn}]`).removeClass(currentPlayer['name']);

        $(`[data-rows=${newRow}][data-columns=${newColumn}]`).addClass(currentPlayer['name']);
        currentPlayer['position']['row'] = playerRow;
        currentPlayer['position']['column'] = playerColumn;
        clearHighlighedSquare();

        switchPlayer();
        traverseDirections(parseInt(currentPlayer['position']['row'], 10), parseInt(currentPlayer['position']['column'], 10));
    } else {
        alert("Wrong Move")
    }

}
//Check player move if Valid
function validMove(squareRow, squareCol) {
    const playerCol = currentPlayer['position']['column']
    const playerRow = currentPlayer['position']['row']
    const direction = (squareRow === playerRow) ? 'column' : 'row';
    const columnChange = Math.abs(playerCol - squareCol);
    const rowChange = Math.abs(playerRow - squareRow);
    const validColumnChange = (direction === 'column') && (columnChange <= 3) && (rowChange === 0);
    const validRowChange = (direction === 'row') && (rowChange <= 3) && (columnChange === 0);
    let canMove = (validColumnChange || validRowChange);
    return canMove
}

// Barrier Check for Player Movement
function checkBarriers(squareRow, squareCol) {
    const playerCol = currentPlayer['position']['column'];
    const playerRow = currentPlayer['position']['row'];
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
// Pick New Weapon
const pickWeapon = (i, j, weaponry) => {

    for (let x = 0; x < weaponry.length; x++) {
        let selectWeaponSquare = $(`[data-rows=${i}][data-columns=${j}]`)
        let weaponPosition = selectWeaponSquare.hasClass(weaponry[x]['name']);
        if (weaponPosition) {
            let oldWeapon = currentPlayer['weapon'];
            currentPlayer['weapon'] = {
                name: weaponry[x]['name'],
                power: weaponry[x]['power'],
                img: weaponry[x]['img']
            };
            selectWeaponSquare.removeClass(weaponry[x]['name']);
            selectWeaponSquare.addClass(oldWeapon['name']);
            break;
        }
    }
}
// Select a Square on the Gameboard
$('#gameBoard').on('click', function () {
    movePlayer(event.target.dataset.rows, event.target.dataset.columns)
})
// Clear Highlighted Square Colour after Player has made a Valid move
function clearHighlighedSquare() {
    return $('.highlight-path').removeClass('highlight-path')
}

// Function traverseSquare
function traverseDirections(i, j) {
    playerInfo(players)
    let highlight = ''
    let figure;
    let selectPlayer;
    console.log(currentPlayer)
    //Check if the another player lies on the path of the current player
    let findPlayer = players.find(play => {
        return play['name'] !== currentPlayer['name']
    })
    console.log(findPlayer['name']);
    for (let x = i + 1; x <= i + 3; x++) {
        figure = $(`[data-rows=${x}][data-columns=${j}]`).hasClass('figure')
        if (figure) {
            break; // Check what to do
        }
        highlight = $(`[data-rows=${x}][data-columns=${j}]`).addClass('highlight-path')
        selectPlayer = $(`[data-rows=${x}][data-columns=${j}]`).hasClass(findPlayer['name']);
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
            window.location.href = "#fight-modal"
            fight(currentPlayer)
        }
    }
    for (let x = i - 1; x >= i - 3; x--) {

        figure = $(`[data-rows=${x}][data-columns=${j}]`).hasClass('figure')
        if (figure) {
            break; //Check what to do
        }
        highlight = $(`[data-rows=${x}][data-columns=${j}]`).addClass('highlight-path')
        selectPlayer = $(`[data-rows=${x}][data-columns=${j}]`).hasClass(findPlayer['name']);
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
            window.location.href = "#fight-modal"
            fight(currentPlayer)
        }
    }

    for (let x = j + 1; x <= j + 3; x++) {

        figure = $(`[data-rows=${i}][data-columns=${x}]`).hasClass('figure')
        if (figure) {
            break; //Check what to do
        }
        highlight = $(`[data-rows=${i}][data-columns=${x}]`).addClass('highlight-path')
        selectPlayer = $(`[data-rows=${i}][data-columns=${x}]`).hasClass(findPlayer['name']);
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
            window.location.href = "#fight-modal"
            fight(currentPlayer)
        }
    }
    for (let x = j - 1; x >= j - 3; x--) {
        // selectPlayer = checkPlayer(i, x)
        figure = $(`[data-rows=${i}][data-columns=${x}]`).hasClass('figure')
        if (figure) {
            break; //Check what to do
        }
        highlight = $(`[data-rows=${i}][data-columns=${x}]`).addClass('highlight-path')
        selectPlayer = $(`[data-rows=${i}][data-columns=${x}]`).hasClass(findPlayer['name']);
        if (selectPlayer) {
            console.log('I am Ready to Battle', selectPlayer)
            window.location.href = "#fight-modal"
            fight(currentPlayer)
        }
    }
}

$(document).ready(function () {
    traverseDirections(currentPlayerRow, currentPlayerColumn);
})

// DISPLAY PLAYERS INFO ON THE GAME BOARD
function playerInfo(type) {

    $('.player-one-name').text(type[0]['name']);
    $('.player-two-name').text(type[1]['name']);
    $('#player-one-lifepoint').text(type[0]['lifepoint']);
    $('#player-two-lifepoint').text(type[1]['lifepoint']);
    $('#player-one-weapon').text(type[0]['weapon']['name']);
    $('#player-two-weapon').text(type[1]['weapon']['name']);
    $('#player-one-attack-power').text(type[0]['weapon']['power']);
    $('#player-two-attack-power').text(type[1]['weapon']['power']);
    $('#attack-power-player1').text(type[0]['weapon']['power']);
    $('#attack-power-player2').text(type[1]['weapon']['power']);
}

function fight(playerIdentity) {
    console.log(playerIdentity)
    let playerName = currentPlayer['name']
    //Set Player's Lifepoints
    let playerOneLifepoint = 100;
    let playerTwoLifepoint = 100;
    //Set Player Action for either defend or attack
    let playerOneDefend = false;
    let playerTwoDefend = false;
    // If player name is currentPlayer
    // If currentPlayer is equal to player Sonya
    // Check if player want to attack, end the action with a Switch player command
    // Check if player want to defend, end the action with a switch player command


    $('#player1-attack').click(function () {
        // let playerIdentity = players.find(play => {
        //     return play['name'] === playerName
        // })
        console.log(playerIdentity)
        //In case the player decides to defend
        if (playerTwoDefend === true) {
            console.log('Player 2 defend:', playerIdentity)
            playerTwoLifepoint -= playerIdentity.weapon.power / 2;
            $('#player2-lifepoint').text(playerTwoLifepoint);
            playerTwoDefend = false;
            switchPlayer();
        } else {
            //In case the player chooses not to defend
            // console.log(playerIdentity.weapon.power)
            console.log('Player 2 didn\'t defend:', playerIdentity)
            playerTwoLifepoint -= playerIdentity.weapon.power;
            $('#player2-lifepoint').text(playerTwoLifepoint);
        }
        //When the opponent's player's life is less than or equal to 0 declare winner
        if (playerTwoLifepoint <= 0) {
            $('#avatar').append('<img style="width:20%; margin:0 auto; display:block;" src="img/Sonya.jpg" alt="Player-1 Poster" />')
            $('#winner').text(`${playerName} wins`);
            window.location.href = '#game-over'
        }
        playerIdentity['name'] = 'lui-keng';
        buttonControl(playerIdentity['name']);
        playerOneDefend = false;
        $('#defence-player1').text(playerOneDefend);
        switchPlayer();
    });

    //Player 1 decides to defend
    $('#player1-defend').click(function () {
        playerOneDefend = true;
        $('#defence-player1').text(playerOneDefend);
        console.log(playerIdentity['name'])
        playerIdentity['name'] = 'lui-keng'
        buttonControl(playerIdentity['name']);
        switchPlayer();
    });

    //Player 2 decides to Attack
    $('#player2-attack').click(function () {
        // let playerIdentity = players.find(play => {

        //     return play['name'] === playerName
        // })
        //In case the player decides to defend
        if (playerOneDefend === true) {

            console.log('Player 1 defend:', playerIdentity)
            playerOneLifepoint -= playerIdentity.weapon.power / 2;
            $('#player1-lifepoint').text(playerOneLifepoint);
            playerOneDefend = false;
        } else {
            //In case the player chooses not to defend

            console.log('Player 1 didn\'t defend:', playerIdentity)
            playerOneLifepoint -= playerIdentity.weapon.power;
            $('#player1-lifepoint').text(playerOneLifepoint);
        }
        //When the opponent's player's life is less than or equal to 0 declare winner
        if (playerOneLifepoint <= 0) {
            console.log("Player 2 wins");
            $('#avatar').append('<img style="width:20%; margin:0 auto; display:block;" src="img/Liu_Kang_mk11.png" alt="Player-2 Poster" />');
            $('#winner').text(`${playerName} wins`);
            window.location.href = '#game-over';
        }
        playerIdentity['name'] = 'sonya'
        console.log(playerIdentity['name'])
        buttonControl(playerIdentity['name'])
        playerTwoDefend = false;
        $('#defence-player2').text(playerTwoDefend);
        switchPlayer();

    });
    $('#player2-defend').click(function () {
        playerTwoDefend = true; //Player 2 decides to defend
        $('#defence-player2').text(playerTwoDefend);
        playerIdentity['name'] = 'sonya';
        buttonControl(playerIdentity['name'])
        switchPlayer();
    });
}


// Set the Button properties duriing Fight
function buttonControl(playerTitle) {
    if (playerTitle === 'sonya') {
        $('#player1-attack').css({
            opacity: 1,
            cursor: "auto"
        });
        $('#player1-defend').css({
            opacity: 1,
            cursor: "auto"
        });
        $('#player1-attack').prop('disabled', false)
        $('#player1-defend').prop('disabled', false)

        $('#player2-attack').css({
            opacity: ".5",
            cursor: "not-allowed"
        });
        $('#player2-defend').css({
            opacity: ".5",
            cursor: "not-allowed"
        });
        $('#player2-attack').prop('disabled', true)
        $('#player2-defend').prop('disabled', true)
    } else {
        $('#player1-attack').css({
            opacity: ".5",
            cursor: "not-allowed"
        });
        $('#player1-defend').css({
            opacity: ".5",
            cursor: "not-allowed"
        });
        $('#player1-attack').prop('disabled', true)
        $('#player1-defend').prop('disabled', true)

        $('#player2-attack').css({
            opacity: 1,
            cursor: "auto"
        });
        $('#player2-defend').css({
            opacity: 1,
            cursor: "auto"
        });
        $('#player2-attack').prop('disabled', false)
        $('#player2-defend').prop('disabled', false)
    }
}