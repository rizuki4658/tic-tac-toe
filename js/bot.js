class Bot {
  #diagonal;
  #vertical;
  #horizontal;

  constructor({
    boards
  }) {
    this.boards = boards;

    this.newBoard.bind(this)
    this.#splitBoard.bind(this)
    this.#horizonGenerate.bind(this)
    this.#diagonalGenerate.bind(this)
    this.#verticalGenerate.bind(this)
  }

  newBoard(boards) {
    this.boards = boards
    this.#splitBoard()
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
    return {
      left: fieldL,
      right: fieldR
    }
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
  #splitBoard() {
    this.#diagonal = this.#diagonalGenerate()
    this.#vertical = this.#verticalGenerate()
    this.#horizontal = this.#horizonGenerate()
    return ({
      a: this.#diagonal,
      b: this.#vertical,
      c: this.#horizontal
    })
  }
}
