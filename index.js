const boards = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const boardView = document.getElementById('board')
const buttons = document.createElement('button')
let turn = 0
let field = []
let winner = null
let timerClear = undefined

function boardClick(e) {
  const target = e.target.id.split('')
  const img = document.createElement('img')
  img.setAttribute('src',  turn === 0 ? './img/x.png' : './img/o.png')
  e.target.appendChild(img)
  field[target[0]][target[1]] = turn === 0 ? 'x' : 'o'

  winner = checkingBoard()

  if (winner) {
    timerClear = setTimeout(() => {
      alert(`TAI ${winner}`)
      resetBoard()
    }, 1000)
  }
}

function checkingBoard() {
  const horizon =  horizonCheck()
  
  if (horizon) return turn === 0 ? 'X' : 'O'

  turn = turn === 0 ? 1 : 0

  return undefined
}

function horizonCheck() {
  let result = []
  for (let i = 0; i < field.length; i++) {
    const filter = [...field[i]].filter(n => n === (turn === 0 ? 'x' : 'o'))
    if (filter.length >= field[i].length) {
      result = filter
      break;
    }
  }

  return result.length ? true : false
}

function createBoard(boards) {
  for (let r = 0; r < boards.length; r++) {
    const row = document.createElement('tr')
    for (let c = 0; c < boards[r].length; c++) {
      const column = document.createElement('td')
      const div = document.createElement('div')
      const buttons = document.createElement('button')
      buttons.setAttribute('id', `${r}${c}`)
      buttons.addEventListener('click', boardClick)
      div.appendChild(buttons)
      column.append(div) 
      row.appendChild(column)
    }
    boardView.appendChild(row)
  }
  field = boards
}

function resetBoard() {
  for (let r = 0; r < boards.length; r++) {
    for (let c = 0; c < boards[r].length; c++) {
      const button = document.getElementById(`${r}${c}`)
      if (button.firstElementChild) button.removeChild(button.firstElementChild)
    }
  }
  field = boards
  turn = 0
  clearTimeout(timerClear)
}

function test () {
  createBoard(boards)
  console.log(field)
}

window.onload = test
