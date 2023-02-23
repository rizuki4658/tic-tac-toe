export default class Board {
  constructor(dimension, state) {
    this.dimension = dimension
    this.state = state ? state : []
    this.creatingBoard.bind(this)
    this.isEmpty.bind(this)
    if (!state) this.creatingBoard.call(this)
  }

  creatingBoard() {
    for (let i = 0; i < (this.dimension * this.dimension); i++) {
      this.state.push('')
    }
  }

  isEmpty() {
    return this.state.every(cell => !cell);
  }
  isFull() {
    return this.state.every(cell => cell);
  }
  insert(symbol, position) {
    const indexes = this.state.map((_, key) => key)
    const symbols = ['x', 'o']
    if(!indexes.includes(position)) throw new Error(`Cell ${position} does not exist!`)

    if (!symbols.includes(symbol)) throw new Error('The symbol can only be x or o!')

    if (this.state[position]) return false

    this.state[position] = symbol

    return true
  }
  boardDimension() {
    const result = []
    let i = -1
    this.state.forEach((n, key) => {
      if (key  % this.dimension === 0) {
        i++;
        result[i] = []
      }
      result[i].push(key)
    })
    return result
  }
  horizontalBoard() {
    return this.boardDimension()
  }
  verticalBoard() {
    const boards = this.boardDimension()
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
  diagonalBoard() {
    const boards = this.boardDimension()
    const fieldL = []
    const fieldR = []
    let countL = 0
    let countR = boards.length - 1
    for (let i = 0; i < boards.length; i++) {
      fieldL.push(boards[i][countL])
      fieldR.push(boards[i][countR])
      countL += 1
      countR -= 1
    }
    return [fieldL, fieldR]
  }
  availableMoves() {
    const moves = [];
    this.state.forEach((cell, index) => {
      if(!cell) moves.push(index)
    })

    return moves
  }
  isTerminal(symbol) {
    //Return False if board in empty
    if (this.isEmpty()) return false;

    let winner
    const diagonal = this.diagonalBoard()
    diagonal.forEach((n, i) => {
      const filter = [...n].filter(j => this.state[j] === symbol)
      if (filter.length === this.dimension) {
        winner = { winner: symbol, direction: 'D', row: i }
        return winner
      }
    })
    
    const vertical = this.verticalBoard()
    vertical.forEach((n, i) => {
      const filter = [...n].filter(j => this.state[j] === symbol)
      if (filter.length === this.dimension) {
        winner = { winner: symbol, direction: 'V', row: i }
        return winner
      }
    })

    const horizon = this.horizontalBoard()
    horizon.forEach((n, i) => {
      const filter = [...n].filter(j => this.state[j] === symbol)
      if (filter.length === this.dimension) {
        winner = { winner: symbol, direction: 'H', row: i }
        return winner
      }
    })

    if (winner) return winner

    if (this.isFull()) return {'winner': 'draw'}

    return false;
  }

}
