document.addEventListener('DOMContentLoaded', startGame)

//global variables
const board = [];
var board_size = 3;
const jaws = new Audio('./sounds/jaws_boat.wav')
jaws.loop = false;
const restartGame = document.getElementsByClassName('reset');


//Function to generate the board
function create2DBoard(cols, rows) {
  board.cells = [];
  for(var i = 0; i < cols; i++) {
    for(var j = 0; j < rows; j++) {
      var index = i * rows + j;
      board.cells[index] = [];
      board.cells[index].col = i;
      board.cells[index].row = j;
      board.cells[index].hidden = true;
      if(Math.random() < 0.3) {
        board.cells[index].isMine = true;
      } else {
        board.cells[index].isMine = false;
      } 
    } 
  }
  return board;  
}

function startGame () {
  create2DBoard(board_size, board_size);
  for(var i = 0; i < board.cells.length; i++){ 
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()
}

//onclick button that resets the board and starts new game
function resetBoard() {
  var elem = document.getElementsByClassName('board')[0];
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
  startGame();
}

//onclick button that sets the board size
function toggleSize(){
  var elem = document.getElementsByClassName('board')[0];
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
  if(board_size === 3){
      board_size = 4;
  } else if(board_size === 4){
    board_size = 6;
  } else if(board_size === 6){
    board_size = 3;
  }
  resetBoard();
}

//Event listeners
document.addEventListener("click", checkForWin);
document.addEventListener('contextmenu', checkForWin);
document.querySelector(".reset").addEventListener('click', resetBoard);

function checkForWin () { 
  for(var i=0; i < board.cells.length; i++){
    if(board.cells[i].isMine && board.cells[i].isMarked !== true){
      return
    } 
    if(board.cells[i].isMine !== true && board.cells[i].hidden){
      return
    }
    //console.log(`i'm checking`)   
  }
  lib.displayMessage('You win!')   
  //jaws.play(); 
}

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