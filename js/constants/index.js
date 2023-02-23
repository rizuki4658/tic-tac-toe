export const config = {
  boards: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  scores: {
    x: 0,
    o: 0
  },
  steps: {
    x: 0,
    o: 0
  },
  turn: 'x',
  winner: null,
  timerClear: undefined,
  withBot: true,
  timerBOT: undefined,
  bot: undefined
}

const boardView = document.getElementById('board')
const scoreOne = document.getElementById('score_one')
const scoreTwo = document.getElementById('score_two')
const btnNewGame = document.getElementById('new_game')
const btnResetGame = document.getElementById('reset_game')
  
const buttons = document.createElement('button')
