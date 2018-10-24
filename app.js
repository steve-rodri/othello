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


function startGame(){
  renderBoard();
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

  console.log(choice.x +" "+ choice.y);
  console.log( isValidMove(choice.x, choice.y) );
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
          for (let i = 0; i < spaces.length; i++) {
            if (spaces[i].dataset.x === `${x}` && spaces[i].dataset.y === `${y}`) {
              spaces[i].appendChild(newDisc);
            }
          }
          }

    }
  }
}

function newGameDiscs(){
  board[3][3] = 1;
  board[3][4] = 0;
  board[4][3] = 0;
  board[4][4] = 1;
}

function discColor (){
  if (turn) {
    return "white";
  } else {
    return "black";
  }
}

function checkColor(x){
  switch (x) {
    case 0: return "black";
      break;
    case 1: return "white"
      break;
    default:
    break;
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
  const opposingDiscsOnPerimeter = findOpposingDiscs(x,y);//finds all opposite color discs around choice

  if (opposingDiscsOnPerimeter === []) { //returns false if there are no opposing discs
    return false;
  } else { //if there are 1 or multiple opposing discs in path, capped with a player disc

  }
}

function opposingDiscsInPath (x,y, opposingDiscsOnPerimeter){

  const opposingDiscsInPath = [];

  for (let i = 0; i < opposingDiscsOnPerimeter.length; i++) {

    const opposingDisc = opposingDiscsOnPerimeter[i]; //grabs an opposing disc
    const relationship = findRelationship(x, y, opposingDisc.x, opposingDisc.y); //finds relationship between opposing disk and choice
    const nextDiscInPath = checkNextDiscInPath(opposingDisc.x, opposingDisc.y, relationship.x, relationship.y); //finds next disc in direction of opposing disc

    if (nextDiscInPath.color === discColor()) { //if next disc in path equals player disc return true
      return false;
    } else if (nextDiscInPath.color === opposingDisc.color) { //if next disc equals opposing disc, check next disc in path direction
      discsInPath.push(nextDiscInPath);
    }
  }
}

function findOpposingDiscs(x, y) {
  let opposingDiscs = [];

  const surroundings = checkSurroundings(x,y);
  for (let i = 0; i < surroundings.length; i++) {
    const disc1 = surroundings[i];
    if (disc1.color !== discColor()) {
    //push into array, check surrounding. first function checks inital click second function checks 1 relation point on
    opposingDiscs.push(disc1);
    }
  }
  return opposingDiscs;

} //returns array of Opposing discs

function findRelationship(x,y,x2,y2){
    let xDiff = x - x2;
    let yDiff = y - y2;
  }
  return {x: xDiff, y: yDiff};
} //finds x,y relationship between opposing disc and origin

function checkSurroundings(x,y){ //checks all 8 sides of surroundings from origin
  const surroundingObjects = [];
    for (let xP = -1; xP < 2 ; xP++) {
      for (let yP = 1; yP > -2 ; yP--) {

          if ( !(xP === 0 && yP === 0) ) {
            if ( !(board[x - xP][y - yP] === 'x') ) {

            surroundingObjects.push(
                {
                color: `${checkColor(board[x - xP][y - yP])}`,
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

function checkNextDiscInPath(x,y,x2,y2){
  if ( !(board[x-x2][y-y2] === 'x') ) {
    const disc = {
      color: `${checkColor(board[x-x2][y-y2])}`,
      x: `${x-x2}`,
      y = `${y-y2}`
    };
    return disc;
  }
}
