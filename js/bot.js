class Bot {
  diagonal;
  vertical;
  horizontal;
  #historyPattern;
  #chooseByDuplicated

  constructor({
    boards
  }) {
    this.boards = boards;
    this.#historyPattern = ['horizontal', 'vertical', 'diagonal']
    this.#chooseByDuplicated = false

    this.newBoard.bind(this)
    this.move.bind(this)
    this.#splitBoard.bind(this)
    this.#horizonGenerate.bind(this)
    this.#diagonalGenerate.bind(this)
    this.#verticalGenerate.bind(this)
    this.#possiblityBotWin.bind(this)
  }

  newBoard(boards) {
    this.boards = boards
    this.#splitBoard()
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
  #splitBoard() {
    this.diagonal = this.#diagonalGenerate()
    this.vertical = this.#verticalGenerate()
    this.horizontal = this.#horizonGenerate()
  }
  #playerMoved() {
    let result = {}
    for (let i = 0; i < this.#historyPattern.length; i++) {
      for (let  j= 0;  j < this[this.#historyPattern[i]].length; j++) {
        const filter = [...this[this.#historyPattern[i]][j]].filter(n => n === 'x')
        if (filter.length === ([...this[this.#historyPattern[i]][j]].length - 1)) {
          const col = [...this[`${this.#historyPattern[i]}`][j]].findIndex(n => n !== 'x' && n !== 'o')
          result = {
            row: j,
            col,
            type: this.#historyPattern[i]
          }
          return result
        }
      }
    }
    return null
  }
  #resultBoard(column) {
    for (let i = 0; i < this.boards.length; i++) {
      let col = this.boards[i].indexOf(column)
      if (col >= 0) {
        return {
          row: i,
          col
        }
      }
    }
  }
  #possiblityBotWin() {
    this.#splitBoard()
    this.#chooseByDuplicated = !this.#chooseByDuplicated
    this.#historyPattern = this.#sufflePath(this.#historyPattern)
    const dangerPlayerMove = this.#playerMoved()

    const schema = []
    if (dangerPlayerMove) {
      const forceMove = this[dangerPlayerMove.type][dangerPlayerMove.row][dangerPlayerMove.col]
      return this.#resultBoard(forceMove)
    }

    for (let i = 0; i < this.#historyPattern.length; i++) {
      for (let j = 0; j < this[this.#historyPattern[i]].length; j++) {
        const field = [...this[this.#historyPattern[i]][j]].filter(n => n !== 'x' && n !== 'o')
        if (field.length) {
          for (let k = 0; k < field.length; k++) {
            schema.push(field[k])
          }
        }
      }
    }

    let column
    console.log(schema, 'TAI')
    const uniques = this.#sufflePath([...schema])
    column = uniques[0]

    return this.#resultBoard(column)
  }
  move() {
    const num = this.#possiblityBotWin()
    return num
  }
}
