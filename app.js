console.log("I work");


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
  //   updateBoard(choice.x, choice.y, clickedSpace);
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
