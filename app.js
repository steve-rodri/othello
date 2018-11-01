//Global bindings

let board = [
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"]
]
let boardChanges = [
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"]
]
let turn = 0;
let players = 1;

// Functions determining number of Players

function onePlayer(){
  players = 1;
}

function twoPlayer(){
  players = 2;
}

function gameIs1Player(){
  return players === 1;
}

//Functions affecting the DOM

function updateChoice(e){
  //set choice to dataset values of clicked element
    const clickedSpace = e.target;
    const choice = {
      x: parseInt( clickedSpace.dataset.x ),
      y: parseInt( clickedSpace.dataset.y )
    };

  boardChangesUpdate();

  flipDiscs(choice.x, choice.y);

  mainLogic();

}



function addPlayerButton(){
  const rootEl = document.querySelector('#root');
  const playerButtonDiv = document.createElement('div');
  const playerButton = document.createElement('button');
  playerButtonDiv.className = "playerButtonBox";
  playerButton.id = "playerButton";
  playerButton.innerHTML = "2 Players";
  playerButtonDiv.appendChild(playerButton);
  rootEl.appendChild(playerButtonDiv);

  playerButton.addEventListener('click', changeTo2Players);
}

function changeTo2Players(){
  players = 2;
  const playerButton = document.querySelector('#playerButton');
  playerButton.innerHTML = "Play Computer";

  playerButton.removeEventListener('click', changeTo2Players);
  playerButton.addEventListener('click', changeTo1Player);
}

function changeTo1Player(){
  players = 1;
  const playerButton = document.querySelector('#playerButton');
  playerButton.innerHTML = "2 Players";

  playerButton.removeEventListener('click', changeTo1Player);
  playerButton.addEventListener('click', changeTo2Players);
}

function createBoard(){
  const rootEl = document.querySelector('#root');
  const board = document.createElement('div');
  board.id = "board";

  rootEl.appendChild(board);

  createSpaces();
}

function clearBoard(){
  const spaces = document.querySelectorAll('.space');
  for (var i = 0; i < spaces.length; i++) {
    while (spaces[i].firstChild) {
    spaces[i].removeChild(spaces[i].firstChild);
    }
  }
}

function updateBoardEl(){
  const boardEl = document.querySelector('#board');
  const spaces = document.querySelectorAll('.space');

  clearBoard();

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {

        if (board[y][x] === 0) {

          let newDisc = document.createElement('div');
          newDisc.className = "disc";
          newDisc.dataset.x = `${x}`;
          newDisc.dataset.y = `${y}`;
          newDisc.style.backgroundColor = "black";
          newDisc.style.borderBottom = "4px solid rgba(255,255,255,.2)";
          newDisc.style.borderRight = "3px solid rgba(255,255,255,.2)";
          for (var i = 0; i < spaces.length; i++) {
            if (spaces[i].dataset.x === `${x}` && spaces[i].dataset.y === `${y}`) {
              spaces[i].appendChild(newDisc);
            }
          }

        } else if (board[y][x] === 1) {

          let newDisc = document.createElement('div');
          newDisc.className = "disc";
          newDisc.dataset.x = `${x}`;
          newDisc.dataset.y = `${y}`;
          newDisc.style.backgroundColor = "white";
          newDisc.style.borderBottom = "4px solid rgba(0,0,0,.2)";
          newDisc.style.borderRight = "3px solid rgba(0,0,0,.2)";
          for (let i = 0; i < spaces.length; i++) {
            if (spaces[i].dataset.x === `${x}` && spaces[i].dataset.y === `${y}`) {
              spaces[i].appendChild(newDisc);
            }
          }
          }

    }
  }
}

function createStartPanel(){
  const rootEl = document.querySelector('#root');
  const aside = document.createElement('aside');
  aside.innerHTML = `

  <h1>Othello</h1>

  <nav>
    <a id="descriptionLink" href="#">Description</a>
    <a id= "rulesLink" href="#">Rules</a>
  </nav>

  <div class = "details">
  </div>
  `;
  rootEl.insertBefore(aside, rootEl.firstChild);
  displayDescription();
}

function removeStartPanelContents(){
  const aside = document.querySelector('aside');
  while (aside.firstChild) {
    aside.removeChild(aside.firstChild);
  }

}

function hideStartPanel(){
  const aside = document.querySelector('aside');
  aside.style.display = "none";
}


function displayBoard(){
  const board = document.querySelector('#board');
  board.style.display = "grid";
}

function displayDescription(){
  const details = document.querySelector('.details');
  details.innerHTML =
  `
  <div>
    <p>
      <strong>Othello</strong> (<span>or Reversi</span>) is a strategy
      board game for two players, played on an 8×8 uncheckered board. There
      are sixty-four identical game pieces called discs, which are light on
      one side and dark on the other. Players take turns placing disks on
      the board with their assigned color facing up.
    </p>
  </div>
  <div>
    <h4>Objective</h4>
    <p>
      The player with the most pieces of their kind on the board after
      all valid moves have been completed wins the game. In order to achieve
      this, players can take over other pieces by <span>"outflanking"</span>
      them.
    </p>
  </div>
  `;
  removeDescriptionListener();
  addRulesListener();
  displayStartButton();
  addStartButtonListener();
}

function displayRules(){
  const details = document.querySelector('.details');
  details.innerHTML =
  `
    <ul>
      <li>Black always moves first.</li>
      <li>If on your turn you can not outflank and flip at least one opposing disc, your turn is forfeited and your opponent moves again. However if a move is available to you, you may not forfeit your turn.</li>
      <li>A disc may outflank any number of discs in one or more rows in any number of directions at the same time - horizontally vertically or diagonally</li>
      <li>You may not skip over your own color disc to outflank an opposing disc.</li>
      <li>Discs may only be outflanked as a direct result of a move and must fall in the direct line of the disc placed down.</li>
      <li>All discs outflanked in any one move must be flipped, even if it is to the player's advantage not to flip them at all.</li>
      <li>Once a disc is placed on a square, it can never be moved to another square later in the game.</li>
      <li>When it is no longer possible for either player to move, the game is over. Discs are counted and the player with the majority of his or her color discs on the board is the winner.</li>
    </ul>
  `
  removeRulesListener();
  addDescriptionListener();
  removeStartButton();
}

function displayStartButton(){
  const startPanel = document.querySelector('aside');
  const start = document.createElement('div');
  const startButton = document.createElement('button');
  start.className = "start"
  startButton.id = "startButton";
  startButton.innerHTML = "Start Game!";
  start.appendChild(startButton);
  startPanel.appendChild(start);
}

function removeStartButton(){
  const start = document.querySelector('.start');
  const startPanel = document.querySelector('aside');

  startPanel.removeChild(start);
}

function createSpaces(){
  const boardEl = document.querySelector("#board");
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8 ; x++) {
      let newSpace = document.createElement('div');
      newSpace.className = "space";
      newSpace.dataset.x = `${x}`;
      newSpace.dataset.y = `${y}`;
      boardEl.appendChild(newSpace);
    }
  }
}

function createTurnDiv(){
  const rootEl = document.querySelector('#root');
  const turnDiv = document.createElement('div');
  const turn = document.createElement('h3');
  turnDiv.className = 'turnBox';
  turn.id = 'turnColor';

  turn.innerText = `${turnColor()}`;

  turnDiv.appendChild(turn);
  rootEl.appendChild(turnDiv);


}

function changeColor(){
  const turn = document.querySelector('#turnColor');
  turn.innerText = `${turnColor()}`;
  turn.style.color = `${turnColor()}`;

}

function displayGameOverMessage(){
  const rootEl = document.querySelector('#root');
  const board = document.querySelector('#board');
  const gameOverBox = document.createElement('div');
  const gameWinner = document.createElement('h1');
  const gameOverScoreBoard = document.createElement('div');
  const gameOverScoreBlack = document.createElement('h2');
  const gameOverScoreWhite = document.createElement('h2');

  gameOverBox.className = "gameOver";
  gameWinner.id = "gameWinner";
  gameOverScoreBoard.className = "scoreboard";
  gameOverScoreBlack.id = "scoreBlack";
  gameOverScoreWhite.id = "scoreWhite";
  gameWinner.innerHTML = `${winner()}`;

  const piecesOnBoard = countPieces();
  const blackPieces = piecesOnBoard.black;
  const whitePieces = piecesOnBoard.white;

  gameOverScoreBlack.innerHTML = `Black - ${blackPieces}`;
  gameOverScoreWhite.innerHTML = `White - ${whitePieces}`;

  gameOverScoreBoard.appendChild(gameOverScoreBlack);
  gameOverScoreBoard.appendChild(gameOverScoreWhite);
  gameOverBox.appendChild(gameOverScoreBoard);
  gameOverBox.appendChild(gameWinner);
  gameOverBox.appendChild(gameOverScoreBoard);

  const turnBox = document.querySelector('.turnBox');
  rootEl.removeChild(turnBox);
  rootEl.appendChild(gameOverBox);
}

function removeGameOverMessage(){
  const gameOver = document.querySelector('.gameOver');
  const rootEl = document.querySelector('#root');
  rootEl.removeChild(gameOver);
}

//Event Listeners

function addStartButtonListener(){
  const startButton = document.querySelector('#startButton');
  startButton.addEventListener('click', startGame);
}

function addDescriptionListener(){
  const description = document.querySelector('#descriptionLink');
  description.addEventListener('click', displayDescription);
}

function removeDescriptionListener(){
  const description = document.querySelector('#descriptionLink');
  description.removeEventListener('click', displayDescription);
}

function addRulesListener(){
  const rules = document.querySelector('#rulesLink');
  rules.addEventListener('click', displayRules);
}

function removeRulesListener(){
  const rules = document.querySelector('#rulesLink');
  rules.removeEventListener('click', displayRules);
}

function addSpaceListeners(){
  const spaces = document.querySelectorAll('.space');
  for (var i = 0; i < spaces.length; i++) {
    const space = spaces[i];
    space.addEventListener('click', updateChoice);
  }
}

//Game Logic - Helper Functions

function possibleMoves(){
  const possibleMoves = [];
  for (let y = 0; y < board.length; y++) {//loop through board
    for (let x = 0; x < board.length; x++) {
      if (board [y][x] === 'x') { // if board space is empty

        //find all opposing discs with player disc at end - returns multi
        const opposingDiscs = checkDisc(x, y); // returns multi-dimensional array
        for (let a = 0; a < opposingDiscs.length; a++) {
          let layer1 = opposingDiscs[a];
          for (let b = 0; b < layer1.length; b++) {
            let layer2 = opposingDiscs[a][b];

              if (layer2.length !== 0) {
                possibleMoves.push(
                  {
                    x: x,
                    y: y
                  }
                );
              }
            }
          }
        }
      }
    }
  return possibleMoves;
}

function canMakeMove(){
  const possibleMovesArray = possibleMoves();
  if (possibleMovesArray.length !== 0) {
    return true;
  } else {
    return false;
  }
}

function flipDiscs(x, y){
  if ( board[y][x] === 'x' ) { //if the origin is a blank space and not a disc

    const opposingDiscs = checkDisc(x, y); //find all opposing discs with player disc at end

    for (let a = 0; a < opposingDiscs.length; a++) {
      let layer1 = opposingDiscs[a]; // accessing elements in checkDisc array

      for (let b = 0; b < layer1.length; b++) {
        let layer2 = opposingDiscs[a][b]; //accessing elements in 4 sub arrays (H, V, DBS, DFS)

        for (let c = 0; c < layer2.length; c++) {
          let disc = opposingDiscs[a][b][c]; //accessing elements in 8 sub arrays (U, D, L, R, BSU, BSD, FSU, FSD)

          //flip disc
          board[y][x] = turn;
          board[disc.y][disc.x] = turn;
        }
      }
    }
  }
}

function changesToBoard(){
  let sumChanges = 0;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      let previousState = boardChanges[y][x];
      let currentState = board[y][x];
      if (!(previousState === currentState)) {
        sumChanges +=1;
      }
    }
  }
  return sumChanges > 0;
}

function boardChangesUpdate(){
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      boardChanges[y][x] = board[y][x];
    }
  }
}

function countPieces(){
  let countBlack = 0;
  let countWhite = 0;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      switch (board[y][x]) {
        case 0:
          countBlack += 1;
          break;
        case 1:
          countWhite += 1;
          break;
      }
    }
  }
  return {
    black: countBlack,
    white: countWhite
  }
}

function winner(){
  const piecesOnBoard = countPieces();
  const blackPieces = piecesOnBoard.black;
  const whitePieces = piecesOnBoard.white;

  if (blackPieces > whitePieces) {
    return "Black Wins!";
  } else if (whitePieces > blackPieces) {
    return "White Wins!";
  } else if (blackPieces === whitePieces) {
    return "Tie!";
  }
}

function newGameDiscs(){
  board[3][3] = 1;
  board[3][4] = 0;
  board[4][3] = 0;
  board[4][4] = 1;
}

function switchTurn(){
  switch (turn) {
    case 1:
    turn = 0;
      break;
    case 0:
    turn = 1;
      break;
    default:
  }
  changeColor();
}

function turnColor(){
  switch (turn) {
    case 0: return "Black";
      break;
    case 1: return "White";
    default:

  }
}

function opposition(){
  switch (turn) {
    case 1: return 0;
      break;
    case 0: return 1;
    default:
  }
}

function CPUChoice(){
  let possibleMovesArray = possibleMoves();
  possibleMovesArray = shuffle(possibleMovesArray);
  return possibleMovesArray[ Math.floor( Math.random() * possibleMovesArray.length) ]
}

//Logic for checking disc location

function checkDisc(x,y){
  const opposingDiscs = [];
  const vertical = checkVertical(x,y);
  const horizontal = checkHorizontal(x,y);
  const backslash = checkDiagonalBackSlash(x,y);
  const forwardslash = checkDiagonalForwardSlash(x,y);

  if (vertical.length !== 0) {
    opposingDiscs.push(vertical);
  }
  if (horizontal.length !== 0) {
    opposingDiscs.push(horizontal);
  }
  if (backslash.length !== 0) {
    opposingDiscs.push(backslash);
  }
  if (forwardslash.length !== 0) {
    opposingDiscs.push(forwardslash);
  }
  return opposingDiscs;
}

function checkVertical(x,y){
  const opposingDiscs = [];
  if (checkDown(x,y)) {
    opposingDiscs.push(checkDown(x,y));
  }
  if (checkUp(x,y)) {
    opposingDiscs.push(checkUp(x,y));
  }
  return opposingDiscs;
}

function checkDown(x,y){
  let opposingDiscs = [];
  let i = y + 1;

  while (i < board.length) {

    switch (board[i][x]) {

      case "x":
        return null;
        break;

      case opposition():
        opposingDiscs.push(
          {
            x: x,
            y: i
          }
        )
        break;

      case turn:
        if (opposingDiscs.length !== 0) {
          return opposingDiscs;
        }
        return null;
        break;
      }
    i += 1;
  }
}

function checkUp(x,y){
  let opposingDiscs = [];
  let i = y - 1;

  while (i >= 0) {

    switch (board[i][x]) {

      case "x":
        return null;
        break;

      case opposition():
        opposingDiscs.push(
          {
            x: x,
            y: i
          }
        )
        break;

      case turn:
        if (opposingDiscs.length !== 0) {
            return opposingDiscs;
        }
        return null;
        break;
      }
    i -= 1;
  }
}

function checkHorizontal(x,y){
  const opposingDiscs = [];
  if (checkLeft(x,y)) {
    opposingDiscs.push(checkLeft(x,y));
  }
  if (checkRight(x,y)) {
    opposingDiscs.push(checkRight(x,y));
  }
  return opposingDiscs;
}

function checkLeft(x,y){
  let opposingDiscs = [];
  let i = x - 1;

  while (i >= 0) {

    switch (board[y][i]) {

      case "x":
        return null;
        break;

      case opposition():
        opposingDiscs.push(
          {
            x: i,
            y: y
          }
        )
        break;

      case turn:
        if (opposingDiscs.length !== 0) {
          return opposingDiscs;
        }
        return null;
        break;
      }
    i -= 1;
  }
}

function checkRight(x,y){
  let opposingDiscs = [];
  let i = x + 1;

  while (i < board.length) {

    switch (board[y][i]) {

      case "x":
        return null;
        break;

      case opposition():
        opposingDiscs.push(
          {
            x: i,
            y: y
          }
        )
        break;

      case turn:
        if (opposingDiscs.length !== 0) {
          return opposingDiscs;
        }
        return null;
        break;
      }
    i += 1;
  }
}

function checkDiagonalBackSlash(x,y){
  const opposingDiscs = [];
  if (checkDiagonalBackSlashUp(x,y)) {
    opposingDiscs.push(checkDiagonalBackSlashUp(x,y));
  }
  if (checkDiagonalBackSlashDown(x,y)) {
    opposingDiscs.push(checkDiagonalBackSlashDown(x,y));
  }
  return opposingDiscs;
}

function checkDiagonalBackSlashUp(x,y){
  let opposingDiscs = [];
  let x2 = x + 1;
  let y2 = y - 1;

  while (x2 < board.length && y2 >= 0) {

    switch (board[y2][x2]) {

      case "x":
        return null;
        break;

      case opposition():
        opposingDiscs.push(
          {
            x: x2,
            y: y2
          }
        )
        break;

      case turn:
        if (opposingDiscs.length !== 0) {
          return opposingDiscs;
        }
        return null;
        break;
      }
    x2 += 1;
    y2 -= 1;
  }
}

function checkDiagonalBackSlashDown(x,y){
  let opposingDiscs = [];
  let x2 = x - 1;
  let y2 = y + 1;

  while (x2 >= 0 && y2 < board.length) {

    switch (board[y2][x2]) {

      case "x":
        return null;
        break;

      case opposition():
        opposingDiscs.push(
          {
            x: x2,
            y: y2
          }
        )
        break;

      case turn:
        if (opposingDiscs.length !== 0) {
          return opposingDiscs;
        }
        return null;
        break;
      }
    x2 -= 1;
    y2 += 1;
  }
}

function checkDiagonalForwardSlash(x,y){
  const opposingDiscs = [];
  if (checkDiagonalForwardSlashUp(x,y)) {
    opposingDiscs.push(checkDiagonalForwardSlashUp(x,y));
  }
  if (checkDiagonalForwardSlashDown(x,y)) {
    opposingDiscs.push(checkDiagonalForwardSlashDown(x,y));
  }
  return opposingDiscs;
}

function checkDiagonalForwardSlashUp(x,y){
  let opposingDiscs = [];
  let x2 = x - 1;
  let y2 = y - 1;

  while (x2 >= 0 && y2 >= 0) {

    switch (board[y2][x2]) {

      case "x":
        return null;
        break;

      case opposition():
        opposingDiscs.push(
          {
            x: x2,
            y: y2
          }
        )
        break;

      case turn:
        if (opposingDiscs.length !== 0) {
          return opposingDiscs;
        }
        return null;
        break;
      }
    x2 -= 1;
    y2 -= 1;
  }
}

function checkDiagonalForwardSlashDown(x,y){
  let opposingDiscs = [];
  let x2 = x + 1;
  let y2 = y + 1;

  while (x2 < board.length && y2 < board.length) {

    switch (board[y2][x2]) {

      case "x":
        return null;
        break;

      case opposition():
        opposingDiscs.push(
          {
            x: x2,
            y: y2
          }
        )
        break;

      case turn:
        if (opposingDiscs.length !== 0) {
          return opposingDiscs;
        }
        return null;
        break;
      }
    x2 += 1;
    y2 += 1;
  }
}

//Fisher-Yates Shuffle
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Main Logic and Calls

function mainLogic(){
  if (changesToBoard()) { //player chooses, if they make changes to the board, switch turn
    updateBoardEl();
    switchTurn(); //switch turn to opponent

 switch (players) {
   case 1:
   //versus computer
   let cpuChoice = null;

   while (turn === 1 && canMakeMove()) { //while it is the computers turn and it can make a move
     cpuChoice = CPUChoice(); //returns object with x and y coordinates of turn choice
     flipDiscs(cpuChoice.x, cpuChoice.y); //flips disk based on coordinates
     updateBoardEl(); //updates Board on page
     switchTurn(); //switch turn back to players

     if (!canMakeMove()) { //if player cannot make a move, switch back to computer
       console.log("player cannot make move");
       switchTurn(); //switch turn back to computer
       }
    } //while loop breaks if computer cannot make move after player has had opportunity
   console.log("computer cannot make move")

   if (!canMakeMove()) {//if opposition can not make move, switch turn back to player
    console.log('double check');
    switchTurn();
    if (!canMakeMove()) { //if player cannot make a second move, game is over.
      console.log('nobody can make a move')
      displayGameOverMessage();
      setTimeout(newGame, 7000);
      }
    }
   break;
   //versus player
   case 2:
   if (!canMakeMove()) {//if opposition can not make move, switch turn back to player
    console.log('opposing player cannot make move');
    switchTurn();
    if (!canMakeMove()) { //if player cannot make a second move, game is over.
      console.log('nobody can make a move')
      displayGameOverMessage();
      setTimeout(newGame, 7000);
      }
    }
     break;
   }
  }
}

function createBoard(){
  const rootEl = document.querySelector('#root');
  const board = document.createElement('div');
  board.id = "board";

  rootEl.appendChild(board);

  createSpaces();
  displayBoard();
}

function runGame(){
  createStartPanel();
}

function startGame(){
  // removeStartPanelContents();
  hideStartPanel();
  createTurnDiv();
  createBoard();
  newGameDiscs();
  updateBoardEl();
  addSpaceListeners();
  addPlayerButton();
}

function newGame(){
  removeGameOverMessage();
  turn = 0;
  board = [
    ["x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x"],
    ["x","x","x","x","x","x","x","x"]
  ]
  clearBoard();
  newGameDiscs();
  updateBoardEl()
  createTurnDiv();
}

runGame();
