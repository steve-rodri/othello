console.log("I work");

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

  //add disc to board if player can, display win message or switch turn
  // if (playerCanChoose(choice.x, choice.y)) {
  // updateBoard(choice.x, choice.y, clickedSpace);
  //   if () {
  //      displayWin();
  //      updateScore();
  //      setTimeout(resetGame, 1000);
  //   //if board is full, display tie, reset game
  // } else if (boardIsFull()) {
  //     displayTie();
  //     setTimeout(resetGame, 1000);
  //   } else {
  //     switchTurn();
  //     console.log('switched turn');
  //   }
  // }
}

function updateBoardEl(){
  const boardEl = document.querySelector('#board');
  const spaces = document.querySelectorAll('.space');

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
      console.log(board[x][y]);
        if (board[x][y] === 0) {

          let newDisc = document.createElement('div');
          newDisc.className = "disc";
          newDisc.dataset.x = `${x}`;
          newDisc.dataset.y = `${y}`;
          debugger;
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
          debugger;
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
  console.log(board);
}

function discType (){
  if (turn) {
    return "white";
  }
    return "black";
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

// function playerCanChoose(x,y){
//   return checkSpaceEmpty(x,y) && canOutFlank(x,y)
//
// function checkSpaceEmpty(x,y){
//   if ( board[x][y] === undefined || board[x][y] === null ) {
//     console.log("space is empty");
//     return true;
//   } else {
//     console.log("space is NOT empty");
//     return false;
//   }
// }
//
// function canOutFlank(x,y){
//
// }
