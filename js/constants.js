let boards = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const boardView = document.getElementById('board')
const scoreOne = document.getElementById('score_one')
const scoreTwo = document.getElementById('score_two')
const btnNewGame = document.getElementById('new_game')
const btnResetGame = document.getElementById('reset_game')
  
const buttons = document.createElement('button')
const scores = {
  x: 0,
  o: 0
}
const steps = {
  x: 0,
  o: 0
}
let turn = 0
let winner = null
let timerClear = undefined
// let myBOT = undefined
let withBot = false
let timerBOT = undefined
