let boards = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const boardView = document.getElementById('board')
const buttons = document.createElement('button')
let turn = 0
let winner = null
let timerClear = undefined

function boardClick(e) {
  const target = e.target.id.split('')
  const img = document.createElement('img')
  img.setAttribute('src',  turn === 0 ? './img/x.png' : './img/o.png')
  e.target.appendChild(img)
  boards[target[0]][target[1]] = turn === 0 ? 'x' : 'o'

  winner = checkingBoard()

  if (winner) {
    // timerClear = setTimeout(() => {
      winnerModal()
      // resetBoard()
    // }, 500)
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
  clearTimeout(timerClear)
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

function load () {
  createBoard(boards)
}

window.onload = load
