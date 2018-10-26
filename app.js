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

function startGame(){
  // createStartPanel();
  createSpaces();
  newGameDiscs();
  createTurnDiv();
  updateBoardEl();
  document.addEventListener('click', updateChoice);
}

function updateChoice(e){
  //set choice to dataset values of clicked element
    const clickedSpace = e.target;
    const choice = {
      x: parseInt( clickedSpace.dataset.x ),
      y: parseInt( clickedSpace.dataset.y )
    };
  boardChangesUpdate();

  flipDiscs(choice.x, choice.y);
  if (changesToBoard()) { //player chooses, if they make changes to the board, switch turn
    updateBoardEl();
    switchTurn();
    if (!canMakeMove()) {//if opposition can not make move, switch turn back to player
      console.log('opposing player cannot make move');
      switchTurn();
      if (!canMakeMove()) { //if player cannot make a second move, game is over.
        displayGameOverMessage();
      }
    }
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

function displayGameOverMessage(){
  const aside = document.querySelector('aside');
  const board = document.querySelector('#board');
  const gameOverBox = document.createElement('div');
  const gameOverCondition = document.createElement('h3');
  const gameWinner = document.createElement('h1');
  const gameOverScoreBoard = document.createElement('div');
  const gameOverScoreTitle = document.createElement('h3');
  const gameOverScoreBlack = document.createElement('h2');
  const gameOverScoreWhite = document.createElement('h2');

  gameOverBox.className = "gameOver";
  gameWinner.id = "gameWinner";
  gameOverScoreBoard.className = "scoreboard";
  gameOverScoreBlack.id = "scoreBlack";
  gameOverScoreWhite.id = "scoreWhite";
  debugger;
  gameOverCondition.innerHTML = 'neither player can make a move';
  gameWinner.innerHTML = `${winner()}`;

  const piecesOnBoard = countPieces();
  const blackPieces = piecesOnBoard.black;
  const whitePieces = piecesOnBoard.white;

  gameOverScoreTitle.innerText = "Score";
  gameOverScoreBlack.innerHTML = `Black - ${blackPieces}`;
  gameOverScoreWhite.innerHTML = `White - ${whitePieces}`;

  gameOverScoreBoard.appendChild(gameOverScoreTitle);
  gameOverScoreBoard.appendChild(gameOverScoreBlack);
  gameOverScoreBoard.appendChild(gameOverScoreWhite);
  gameOverBox.appendChild(gameOverScoreBoard);
  gameOverBox.appendChild(gameOverCondition);
  gameOverBox.appendChild(gameWinner);
  gameOverBox.appendChild(gameOverScoreBoard);


  const turnBox = aside.firstElementChild;
  aside.removeChild(turnBox);
  aside.appendChild(gameOverBox);
}

function canMakeMove(){

  const possibleMoves = [];
  for (let y = 0; y < board.length; y++) {//loop through board
    for (let x = 0; x < board.length; x++) {
      if (board [y][x] === 'x') { // if board space is empty

        const opposingDiscs = checkDisc(x, y); //find all opposing discs with player disc at end
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
    if (possibleMoves.length !== 0) {
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
        default:
      }
    }
  }
  return {
    black: countBlack,
    white: countWhite
  }
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
  const aside = document.querySelector('aside');
  aside.innerHTML = `
  <div class = "details">
    <h1>Othello</h1>

    <h4>Description</h4>

    <h5>2-Player</h5>

    <p>Othello (or Reversi) is a strategy board game for two players, played on an 8×8 uncheckered board. There are sixty-four identical game pieces called discs, which are light on one side and dark on the other. Players take turns placing disks on the board with their assigned color facing up.</p>

    <h4>Objective</h4>

    <p>The player with the most pieces of their kind on the board after all valid moves have been completed wins the game. In order to achieve this, players can take over other pieces by outflanking them.</p>

    <h4>Rules</h4>
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
    </div>
  <button id="start"></button>
  `
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

function changeColor(){
  const turn = document.querySelector('#turnColor');
  turn.innerText = `${turnColor()}`;
  turn.style.color = `${turnColor()}`;

}

function createTurnDiv(){
  const aside = document.querySelector('aside');
  const turnDiv = document.createElement('div');
  const title = document.createElement('h2');
  const turn = document.createElement('h3');
  turnDiv.className = 'turnBox';
  title.id = 'turnTitle';
  turn.id = 'turnColor';

  title.innerText = "Turn:";
  turn.innerText = `${turnColor()}`;

  turnDiv.appendChild(title);
  turnDiv.appendChild(turn);
  aside.appendChild(turnDiv);


}

function opposition(){
  switch (turn) {
    case 1: return 0;
      break;
    case 0: return 1;
    default:
  }
}

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
  //check if 8
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

startGame();
