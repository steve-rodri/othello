function checkVertically (x,y) {

let opposingDiscs = [];
  let loopLength = board.length - y;
  let i = y + 1;
  while (i < loopLength && board[x][i] != 'x') {
    switch (board[x][i]) {
      case 1:
        opposingDiscs.push(1)
        break;
      case 0:
        for (var i = 0; i < opposingDiscs.length; i++) {
          opposingDiscs[i] = 0;
        }
      default:

    }
    i += 1;
  }
}
