const board = [
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"],
  ["x","x","x","x","x","x","x","x"]
]
const boardChanges = [
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

  checkDisc(choice.x, choice.y);


  if (changesToBoard()) {
    switchTurn();
    changeColor();
  }
  // } else if (!changesToBoard() && playerCannotMove()) {
  //   switchTurn();
  //   changeColor();
  //   if (playerCannotMove()) {
  //     const piecesOnBoard = countPieces();
  //     console.log(`${piecesOnBoard.white} white pieces`);
  //     console.log(`${piecesOnBoard.black} black pieces`);
  //   }
  // }
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

  title.innerText = "Turn";
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

  if (board[y][x] !== 'x') {
    return false;
  } else {

    checkVertical(x,y),
    checkHorizontal(x,y),
    checkDiagonalBackSlash(x,y),
    checkDiagonalForwardSlash(x,y)
    updateBoardEl();

  }
}

function checkVertical(x,y){
  return checkUp(x,y) || checkDown(x,y);
}

function checkDown(x,y){
  let opposingDiscs = [];
  let i = y + 1;
  while (i < board.length - 1) {

    switch (board[i][x]) {

      case "x":
      return false;
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
        if (opposingDiscs.length === 0) {
          break;
        } else {
          board[y][x] = turn;
          //flip discs
          for (let w = 0; w < opposingDiscs.length; w++) {
            let disc = opposingDiscs[w];
            board[disc.y][disc.x] = turn;
          }
        }
        break;

        default:
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
      return false;
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
        if (opposingDiscs.length === 0) {
          break;
        } else {
          board[y][x] = turn;
          //flip discs
          for (let w = 0; w < opposingDiscs.length; w++) {
            let disc = opposingDiscs[w];
            board[disc.y][disc.x] = turn;
          }
        }
        break;

        default:
        break;
    }

    i -= 1;
  }
}

function checkHorizontal(x,y){
  return checkLeft(x,y) || checkRight(x,y);
}

function checkLeft(x,y){
  let opposingDiscs = [];
  let i = x - 1;
  while (i >= 0) {

    switch (board[y][i]) {

      case "x":
      return false;
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
        if (opposingDiscs.length === 0) {
          return false;
        } else {
          board[y][x] = turn;
          //flip discs
          for (let w = 0; w < opposingDiscs.length; w++) {
            let disc = opposingDiscs[w];
            board[disc.y][disc.x] = turn;
          }
        }
        break;

        default:
        break;
    }

    i -= 1;
  }
}

function checkRight(x,y){
  let opposingDiscs = [];
  let i = x + 1;
  while (i < board.length - 1) {

    switch (board[y][i]) {

      case "x":
      return false;
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
        if (opposingDiscs.length === 0) {
          return false;
        } else {
          board[y][x] = turn;
          //flip discs
          for (let w = 0; w < opposingDiscs.length; w++) {
            let disc = opposingDiscs[w];
            board[disc.y][disc.x] = turn;
          }
        }
        break;

        default:
        break;
    }

    i += 1;
  }
}

function checkDiagonalBackSlash(x,y){
  return checkDiagonalBackSlashUp(x,y) || checkDiagonalBackSlashDown(x,y);
}

function checkDiagonalBackSlashUp(x,y){
  let opposingDiscs = [];
  let x2 = x + 1;
  let y2 = y - 1;
  while (x2 < board.length - 1 && y2 >= 0) {

    switch (board[y2][x2]) {

      case "x":
      return false;
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
        if (opposingDiscs.length === 0) {
          return false;
        } else {
          board[y][x] = turn;
          //flip discs
          for (let w = 0; w < opposingDiscs.length; w++) {
            let disc = opposingDiscs[w];
            board[disc.y][disc.x] = turn;
          }
        }
        break;

        default:
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
  while (x2 >= 0 && y2 < board.length - 1) {

    switch (board[y2][x2]) {

      case "x":
      return false;
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
        if (opposingDiscs.length === 0) {
          break;
        } else {
          board[y][x] = turn;
          //flip discs
          for (let w = 0; w < opposingDiscs.length; w++) {
            let disc = opposingDiscs[w];
            board[disc.y][disc.x] = turn;
          }
        }
        break;

        default:
        break;
    }

    x2 -= 1;
    y2 += 1;
  }
}

function checkDiagonalForwardSlash(x,y){
  return checkDiagonalForwardSlashUp(x,y) || checkDiagonalForwardSlashDown(x,y);
}

function checkDiagonalForwardSlashUp(x,y){
  let opposingDiscs = [];
  let x2 = x - 1;
  let y2 = y - 1;
  while (x2 >= 0 && y2 >= 0) {

    switch (board[y2][x2]) {

      case "x":
      return false;
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
        if (opposingDiscs.length === 0) {
          return false;
        } else {
          board[y][x] = turn;
          //flip discs
          for (let w = 0; w < opposingDiscs.length; w++) {
            let disc = opposingDiscs[w];
            board[disc.y][disc.x] = turn;
          }
        }
        break;

        default:
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
  while (x2 < board.length - 1 && y2 < board.length -1) {

    switch (board[y2][x2]) {

      case "x":
      return false;
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
        if (opposingDiscs.length === 0) {
          return false;
        } else {
          board[y][x] = turn;
          //flip discs
          for (let w = 0; w < opposingDiscs.length; w++) {
            let disc = opposingDiscs[w];
            board[disc.y][disc.x] = turn;
          }
        }
        break;

        default:
        break;
    }

    x2 += 1;
    y2 += 1;
  }
}

startGame();
