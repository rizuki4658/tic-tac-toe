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
    this.#splitBoard.bind(this)
    this.#horizonGenerate.bind(this)
    this.#diagonalGenerate.bind(this)
    this.#verticalGenerate.bind(this)
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
  playerMoved() {
    const available = []
    for (let i = 0; i < this.horizontal.length; i++) {
      if (this.horizontal[i].includes('x')) available.push(this.horizontal[i]);
    }
    for (let i = 0; i < this.vertical.length; i++) {
      if (this.vertical[i].includes('x')) available.push(this.vertical[i]);
    }
    for (let i = 0; i < this.diagonal.length; i++) {
      if (this.diagonal[i].includes('x')) available.push(this.diagonal[i]);
    }
    let column = undefined
    let filter = []
    const shuffle = this.#sufflePath(available)
    for (let i = 0; i < shuffle.length; i++) {
      filter = [...shuffle[i]].filter(n => n === 'x' && n !== 'o')
      if (filter.length === shuffle[i].length - 1) {
        if (shuffle[i][shuffle[i].length - 1] !== 'o') {
          column = shuffle[i][shuffle[i].length - 1]
        }
      }
    }
    return column
  }
  #resultBoard(column) {
    if (!column) return undefined
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
  #generateColumn(schema) {
    for (let i = 0; i < schema.length; i++) {
      const filter = [...schema[i]].filter(n => n === 'o')
      if (filter === schema[i].length - 1) {
        return schema[i][schema[i].length - 1]
      } else if (filter.length === 1) {
        for (let j = 0; j < filter.length; j++) {
          if (filter[j + 1] && (filter[j + 1] !== 'o' && filter[j + 1] !== 'x')) {
            return filter[j + 1]
          }
        }
      } else {
        for (let k = 0; k < schema[i].length; k++) {
          if (schema[i][k] !== 'o' && schema[i][k] !== 'x') {
            return schema[i][k]
          }
        }
      }
    }
  }
  findAvailableMoves() {
    const available = []
    this.#splitBoard()
    for (let i = 0; i < this.horizontal.length; i++) {
      if (!this.horizontal[i].includes('x')) available.push(this.horizontal[i]);
    }
    for (let i = 0; i < this.vertical.length; i++) {
      if (!this.vertical[i].includes('x')) available.push(this.vertical[i]);
    }
    for (let i = 0; i < this.diagonal.length; i++) {
      if (!this.diagonal[i].includes('x')) available.push(this.diagonal[i]);
    }
    const possible = available.map(items => {
      return items.map(() => 'o')
    })
    return {
      possible,
      available
    }
  }
  schema(moves) {
    return this.#sufflePath([...moves.available])
  }
  forceMove(column) {
    return this.#resultBoard(column)
  }
  move(schema) {
    this.#historyPattern = this.#sufflePath(this.#historyPattern)

    let column = this.#generateColumn(schema)

    return this.#resultBoard(column)
  }
}
