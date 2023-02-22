class Bot {
  diagonal;
  vertical;
  horizontal;
  #historyPattern;

  constructor({
    boards
  }) {
    this.boards = boards;
    this.#historyPattern = ['horizontal', 'vertical', 'diagonal']

    this.newBoard.bind(this)
    this.splitBoard.bind(this)
    this.#horizonGenerate.bind(this)
    this.#diagonalGenerate.bind(this)
    this.#verticalGenerate.bind(this)
  }

  newBoard(boards) {
    this.boards = boards
    this.splitBoard()
  }
  #sufflePath(array) {
    let currentIndex = array.length
    let randomIndex = undefined
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [
        array[currentIndex],
        array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ]
    }
    return array
  }
  #diagonalGenerate() {
    const fieldL = []
    const fieldR = []
    let countL = 0
    let countR = this.boards.length - 1
    for (let i = 0; i < this.boards.length; i++) {
      fieldL.push(this.boards[i][countL])
      fieldR.push(this.boards[i][countR])
      countL += 1
      countR -= 1
    }
    return [fieldL, fieldR]
  }
  #verticalGenerate() {
    const columns = boards[0].length
    const fieldResult = []
    for (let i = 0; i < columns; i++) {
      let field = []
      for (let j = 0; j < boards.length; j++) {
        field.push(boards[j][i])
      }
      fieldResult.push(field)
    }
    return fieldResult
  }
  #horizonGenerate() {
    return this.boards
  }
  splitBoard() {
    this.diagonal = this.#diagonalGenerate()
    this.vertical = this.#verticalGenerate()
    this.horizontal = this.#horizonGenerate()
  }
  playerMoved() {
    const result = {
      diagonal: [],
      vertical: [],
      horizontal: []
    }
    for (let i = 0; i < this.#historyPattern.length; i++) {
      for (let  j= 0;  j < this[`${this.#historyPattern[i]}`].length; j++) {
        const filter = [...this[`${this.#historyPattern[i]}`][j]].filter(n => n === 'x')
        if (filter.length >= 1 &&  filter.length < this[`${this.#historyPattern[i]}`][j].length) {
          const col = [...this[`${this.#historyPattern[i]}`][j]].findIndex(n => n !== 'x' && n !== 'o')
          result[this.#historyPattern[i]].push({
            row: j,
            col
          })
        }
      }
    }
    return result
  }
  possiblityBotWin() {
    this.#historyPattern = this.#sufflePath(this.#historyPattern)
    this.splitBoard()
    console.log(this.diagonal)
    console.log(this.vertical)
    console.log(this.horizontal)
    const moves = this.playerMoved()
    // console.log(moves)
  }
}
