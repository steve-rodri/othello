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
  createSpaces();
  newGameDiscs();
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
  };
  console.log(turn);
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
    case 1: turn = 0;
      break;
    case 0: turn = 1;
      break;
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
