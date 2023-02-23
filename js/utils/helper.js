import { createModal } from './modal.js'

export function winnerModal(winner) {
  const container = document.body
  const myModal = createModal({
    title: `Congratulations You Get Score!`,
    img: `${winner}.png`,
    description: 'You are the winner in this round!',
    btn_text: 'OKAY!'
  })
  container.appendChild(myModal)
}

export function drawModal() {
  const container = document.body
  const myModal = createModal({
    title: `Draw For This Round!`,
    img: 'draw.png',
    description: 'This round no one get score!',
    btn_text: 'OKAY!'
  })
  container.appendChild(myModal)
}

export function updateScore(scores, winner) {
  const scoreOne = document.getElementById('score_one')
  const scoreTwo = document.getElementById('score_two')
  scoreOne.innerText = scores.x
  scoreTwo.innerText = scores.o
  
  if (scores.x > scores.o && winner === 'x') {
    scoreOne.classList.add('lead')
    scoreTwo.classList.remove('lead')
  } else if (scores.o > scores.x && winner === 'o') {
    scoreTwo.classList.add('lead')
    scoreOne.classList.remove('lead')
  } else {
    scoreOne.classList.remove('lead')
    scoreTwo.classList.remove('lead')
  }
}

export function resetBoard(config) {
  const buttons = document.querySelectorAll('#board button')
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].firstElementChild) buttons[i].removeChild(buttons[i].firstElementChild)
  }
  config.winner = false
  config.turn = 'x'
  return config
}

export function resetGame() {
  resetBoard()
  scores.x = 0
  scores.o = 0
  scoreOne.innerText = scores.x
  scoreTwo.innerText = scores.o
  scoreOne.classList.remove('lead')
  scoreTwo.classList.remove('lead')
}