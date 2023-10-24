# Picross (JavaScript Edition)

## What is Picross?
Picross or Nanogram is logic game where the user has to determine which tiles to be marked as "filled in" and which to marked as "skipped" by the numbers
on the side and top tiles.

## Technical Details
This game is written JavaScript, HTML, and SCSS (Sassy CSS). It utilizes both JQuery and Bootstrap 5.0.

## Rules
All squares must be clicked on. Either blue(filled in) or grey(skipped).
To fill in a square, use the left click.
To skip a square, use the right-click.
At the beginning of row and column will have numbers on it. For example: "<b>2 2</b>".
This means that somewhere on row, there are <b>2</b> "sets" of <b>2</b> consective "filled in" squares.
Each "set" must have at least one square marked as "skipped" between them.

The objective of the game is to mark all the squares as either "filled in" or "skipped". Once all squares have been marked, the timer will stop, a message will appear and the game will end.

## How to play
1. Either download the source code or clone the Git repositoy to your local machine. 
2. Run the index.html file
3. Have fun!