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
let turn = 0;

function runGame(){
  renderBoard();
  // addScoreboard();
  document.addEventListener('click', updateChoice);
}

function updateChoice(e){
  //set choice to dataset values of clicked element
  const clickedSpace = e.target;
  const choice = {
    x: parseInt( clickedSpace.dataset.x ),
    y: parseInt( clickedSpace.dataset.y )
  };

  console.log(choice.x +" "+ choice.y);
  checkSurroundings(choice.x, choice.y);
}

function updateBoardEl(){
  const boardEl = document.querySelector('#board');
  const spaces = document.querySelectorAll('.space');

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
        if (board[x][y] === 0) {

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

        } else if (board[x][y] === 1) {

          let newDisc = document.createElement('div');
          newDisc.className = "disc";
          newDisc.dataset.x = `${x}`;
          newDisc.dataset.y = `${y}`;
          newDisc.style.backgroundColor = "white";
          for (var i = 0; i < spaces.length; i++) {
            if (spaces[i].dataset.x === `${x}` && spaces[i].dataset.y === `${y}`) {
              spaces[i].appendChild(newDisc);
            }
          }

        }
    }
  }
}

function startGame(){
  newGameDiscs();
  updateBoardEl();
}

function newGameDiscs(){
  board[3][3] = 1;
  board[3][4] = 0;
  board[4][3] = 0;
  board[4][4] = 1;
}

function discColor (disc){
  if (disc === 1) {
    return "white";
  } else if (disc === 0) {
    return "black";
  }
}

function renderBoard(){
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

function isValidMove(x, y){

  const surroundingDiscs = checkSurroundings(x, y); //array of discs on all sides in immediate vicinity

    for (let i = 0; i < surroundingDiscs.length; i++) {
      let disc = surroundingDiscs[i];

      if (disc.color === discColor(!turn)) { //color of surrounding Disc is opposite of playerDisc

        if (disc.y === y && (disc.x === x - 1 || disc.x === x + 1)) {
          checkHorizontally(disc.x, disc.y);
        } else if (disc.x === x && (disc.y === y - 1 || disc.y === y + 1)) {
          checkVertical(disc.x, disc.y);
        } else if ((disc.x === x - 1 && disc.y === y - 1) || (disc.x === x + 1 && disc.y === y + 1)) {
          checkDiagonalRight(disc.x, disc.y);
        } else if ((disc.x === x - 1 && disc.y === y - 1) || (disc.x === x + 1 && disc.y === y + 1)) {
          checkDiagonalLeft(disc.x, disc.y);
        }
      }
    }
}

function checkSurroundings(x,y){
  const surroundingObjects = [];
    for (let xP = -1; xP < 2 ; xP++) {
      for (let yP = 1; yP > -2 ; yP--) {

          if ( !(xP === 0 && yP === 0) ) {
            if ( !(board[x - xP][y - yP] === 'x') ) {

            surroundingObjects.push({
                color: `${discColor(board[x - xP][y - yP])}`,
                x: `${x - xP}`,
                y: `${y - yP}`
                }
              );
            }
          }
        }
      }
  console.log(surroundingObjects);
  return surroundingObjects;
}

// function checkHorizontally(x, y){
//
//   //check to the right
//   for (let i = x + 1; i < board.length; i++) {
//     if ( board[i][y] === turn ) { //check if piece is equal to player piece
//       return true;
//     } else if (board[i][y] !== turn) {
//       return false;
//     }
//   }
//
//   //check to the left
//   for (let i = x - 1; i >= 0; i--) {
//     if (board[x][y] === board[i][y]) {
//
//     }
//   }
// }
//
// function checkVertically(x,y) {
//
// }
//
// function checkDiagonalRight(x, y){
//
// }
//
// function checkDiagonalLeft(x, y){
//
// }
