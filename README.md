# Othello

[Wireframe](https://imgur.com/a/wGR3cnV)

### Description

2-Player

Othello (or Reversi) is a strategy board game for two players, played on an 8×8 uncheckered board. There are sixty-four identical game pieces called discs, which are light on one side and dark on the other. Players take turns placing disks on the board with their assigned color facing up.

### Objective

The player with the most pieces of their kind on the board after all valid moves have been completed wins the game. In order to achieve this, players can take over other pieces by outflanking them.

![alt text](https://d2vlcm61l7u1fs.cloudfront.net/media%2Fa10%2Fa1031ab9-ee04-496a-ad60-908501728fc7%2FphpA6e6bg.png "Outflanking")


### Rules

  * Black always moves first.

  * If on your turn you can not outflank and flip at least one opposing disc, your turn is forfeited and your opponent moves again. However if a move is available to you, you may not forfeit your turn.

  * A disc may outflank any number of discs in one or more rows in any number of directions at the same time - horizontally vertically or diagonally

  * You may not skip over your own color disc to outflank an opposing disc.

  * Discs may only be outflanked as a direct result of a move and must fall in the direct line of the disc placed down.

  * All discs outflanked in any one move must be flipped, even if it is to the player's advantage not to flip them at all.

  * Once a disc is placed on a square, it can never be moved to another square later in the game.

  * When it is no longer possible for either player to move, the game is over. Discs are counted and the player with the majority of his or her color discs on the board is the winner.


### Specifications

  * On page load, the User will see an empty 8x8 board with 4 pieces in the center (black, white, black, white)

  * In order to make a move, User will click on a corresponding space on the board.

  * The only spaces they can click are ones that will outflank the opponent, If there are no valid moves, User2 takes another turn, or the game is over.

  * When a valid move is attempted
  the board will flip over the pieces that were outflanked to the corresponding players color.


### MVP

* Outflanking works
* Game is playable.
