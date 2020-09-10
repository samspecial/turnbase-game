// INSTANTIATING THE WEAPON CLASS
let weapon = new Weapon('Fist', 10, 'img/brick.png');
let weapon1 = new Weapon('grenade', 60, 'img/grenade.png');
let weapon2 = new Weapon('sniper', 50, 'img/sniper.png');
let weapon3 = new Weapon('sword', 40, 'img/sword.png');
let weapon4 = new Weapon('bow', 30, 'img/bow.png');
const weaponss = [weapon, weapon1, weapon2, weapon3, weapon4];

let position = { row: 0, column: 0 };
// INSTANTIATING THE PLAYER CLASS
let player1 = new Player('sonya', 100, 10, weapon, position);
let player2 = new Player('lui-keng', 100, 10, weapon, position);
const players = [player1, player2];


