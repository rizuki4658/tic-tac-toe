let boards = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const boardView = document.getElementById('board')
const scoreOne = document.getElementById('score_one')
const scoreTwo = document.getElementById('score_two')
  
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

function boardClick(e) {
  const target = e.target.id.split('')
  const img = document.createElement('img')
  img.setAttribute('src',  turn === 0 ? './img/x.png' : './img/o.png')
  e.target.appendChild(img)
  boards[target[0]][target[1]] = turn === 0 ? 'x' : 'o'
  steps[turn === 0 ? 'x' : 'o'] += 1

  if (steps.x === 5 || steps.y === 5) {
    resetBoard()
    drawModal()
  }

  winner = checkingBoard()

  if (winner) {
    scores[winner.toLocaleLowerCase()] += 1
    updateScore()
    winnerModal()
  }
}

function checkingBoard() {
  const horizon =  horizonCheck()
  const diagonalL = diagonalCheck()
  const diagonalR = diagonalCheck('right')
  const vertical = verticalCheck()

  if (horizon || diagonalL || diagonalR || vertical) return turn === 0 ? 'X' : 'O'

  turn = turn === 0 ? 1 : 0

  return undefined
}

function horizonCheck() {
  let result = []
  for (let i = 0; i < boards.length; i++) {
    const filter = [...boards[i]].filter(n => n === (turn === 0 ? 'x' : 'o'))
    if (filter.length >= boards[i].length) {
      result = filter
      break;
    }
  }

  return result.length ? true : false
}

function verticalCheck() {
  const columns = boards[0].length
  let result = false
  for (let i = 0; i < columns; i++) {
    let field = []
    for (let j = 0; j < boards.length; j++) {
      field.push(boards[j][i])
    }
    const filter = [...field].filter(n => n === (turn === 0 ? 'x' : 'o'))
    if (filter.length === columns) {
      result = true
      break
    }
  }

  return result
}

function diagonalCheck(type) {
  let field = []
  let count = 0
  let columns = undefined
  if (type === 'right') count = boards.length - 1

  for (let i = 0; i < boards.length; i++) {
    field.push(boards[i][count])

    if (!columns) columns = boards[i].length

    if (type === 'right') {
      count -= 1
    } else count += 1
  }
  const result = field.filter(n => n === (turn === 0 ? 'x' : 'o'))

  return result.length === columns ? true : false
}

function createBoard(boards) {
  scoreOne.innerText = scores.x
  scoreTwo.innerText = scores.o
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
}

function resetBoard() {
  for (let r = 0; r < boards.length; r++) {
    for (let c = 0; c < boards[r].length; c++) {
      const button = document.getElementById(`${r}${c}`)
      if (button.firstElementChild) button.removeChild(button.firstElementChild)
    }
  }
  boards = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  turn = 0
  steps.x = 0
  steps.y = 0
  winner = undefined
  clearTimeout(timerClear)
}

function resetGame() {
  scores.x = 0
  scores.o = 0
  scoreOne.classList.remove('lead')
  scoreTwo.classList.remove('lead')
}

function winnerModal() {
  const container = document.body
  const myModal = createModal({
    title: `Congratulations You Get Score!`,
    img: turn === 0 ? 'x.png' : 'o.png',
    description: 'You are the winner in this round!',
    btn_text: 'OKAY!'
  }, resetBoard)
  container.appendChild(myModal)
}

function drawModal() {
  const container = document.body
  const myModal = createModal({
    title: `Draw For This Round!`,
    img: 'dx.png',
    description: 'This round no one get score!',
    btn_text: 'OKAY!'
  }, resetBoard)
  container.appendChild(myModal)
}

function updateScore() {
  scoreOne.classList.remove('lead')
  scoreTwo.classList.remove('lead')
  scoreOne.innerText = scores.x
  scoreTwo.innerText = scores.o

  if (scores.x > scores.o && winner === 'X') {
    scoreOne.classList.add('lead')
  } else if (scores.o > scores.x && winner === 'O') {
    scoreTwo.classList.add('lead')
  }
}

function load () {
  createBoard(boards)
}

window.onload = load
