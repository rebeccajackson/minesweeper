document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
 cells: [
  {
  row: 0,
  col: 0,
  isMine: false,
  hidden: true
 },
 {
  row: 0,
  col: 1,
  isMine: false,
  hidden: true
 },
 {
  row: 0,
  col: 2,
  isMine: false,
  hidden: true
 },
 {
  row: 1,
  col: 0,
  isMine: true,
  hidden: true
 },
 {
  row: 1,
  col: 1,
  isMine: false,
  hidden: true
 },
 {
  row: 1,
  col: 2,
  isMine: true,
  hidden: true
 },
 {
  row: 2,
  col: 0,
  isMine: false,
  hidden: true
 },
 {
  row: 2,
  col: 1,
  isMine: false,
  hidden: true
 },
 {
  row: 2,
  col: 2,
  isMine: false,
  hidden: true
 }]
 
}


function startGame () {
  // Don't remove this function call: it makes the game work!
  for(var i = 0; i < board.cells.length; i++){ 
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  console.log(board.cells)
  lib.initBoard()
}

// Define this function to look for a win condition:
document.addEventListener("click", checkForWin);
document.addEventListener('contextmenu', checkForWin);
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () { 
  // for every cell...
  for(var i=0; i < board.cells.length; i++){
    //return if any win condition is false
    if(board.cells[i].isMine === true && board.cells[i].isMarked !== true){
      return
    } 
    if(board.cells[i].isMine !== true && board.cells[i].hidden === true){
      return
    }
    console.log(`i'm checking`)   
  }
  // if the cell is a mine and not marked
    // return false
  // if the cell is a not mine and is hidden
    // return false
  // outside for loop
  //return true

  lib.displayMessage('You win!')    
}


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 

//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)

// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let count = 0;
  for(var i = 0; i < surrounding.length; i++){
    if(surrounding[i].isMine === true){
     count++;
    }   
  }
  return count;
}
