import { config } from '../constants/index.js'
import Board from '../utils/board.js'
import Bot from '../utils/bot.js'
const dimension = 3
const myConfig = config

function boardClick(e) {
  if (e.target.children.length || myConfig.winner) return
  const target = e.target.id.replace('btn_' , '').split('')
  const img = document.createElement('img')
  let maximizing = 1
  img.setAttribute('src',  `./img/${myConfig.turn}.png`)
  e.target.appendChild(img)
  myConfig.boards.insert(myConfig.turn, Number(target[1]))
  const { winner } = myConfig.boards.isTerminal(myConfig.turn)
  myConfig.winner = winner
  myConfig.turn = myConfig.turn === 'x' ? 'o' : 'x'

  if (myConfig.winner && myConfig.winner !== 'draw') {
    return
  } else if (myConfig.withBot && myConfig.turn === 'o') {
    moveBOT(maximizing)
  }
}

function moveBOT(maximizing) {
  myConfig.bot.getBestMove(myConfig.boards, dimension, !maximizing, (best) => {
    const symbol = !maximizing ? 'x' : 'o'
    const buttons = document.querySelectorAll('#board button')
    let el = undefined
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('btn-bot')
      const target = buttons[i].id.replace('btn_', '').split('')
      if (parseInt(target[1]) === parseInt(best)) {
        buttons[i].classList.add('btn-bot')
        el = buttons[i]
        break;
      }
    }
    el.click()
    myConfig.boards.insert(symbol, parseInt(best))
    // addClass(htmlCells[best], symbol);
    // if(board.isTerminal()) {
    //     drawWinningLine(board.isTerminal());
    // }
    // playerTurn = 1; //Switch turns
    myConfig.turn = 'x'
    clearTimeout(myConfig.timerBOT)
  })
}

function renderBoard() {
  const el = document.getElementById('board')
  const sizeCol = []
  for (let i = 0; i < dimension; i++) {
    sizeCol.push('auto')
  }
  el.style.maxWidth = `${120 * dimension}px`
  el.style.gridTemplateColumns = sizeCol.join(' ')

  let row = 0
  for (let i = 0; i < myConfig.boards.state.length; i++) {
    const div = document.createElement('div')
    const buttons = document.createElement('button')
    if ((i + 1) % dimension === 0) row += 1
    div.setAttribute('id', `${row}${i}`)
    buttons.setAttribute('id', `btn_${row}${i}`)
    buttons.addEventListener('click', boardClick)
    div.appendChild(buttons)
    el.appendChild(div)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  myConfig.boards = new Board(dimension)
  // give param to difficulity
  myConfig.bot = new Bot(-1)
  renderBoard()
})
