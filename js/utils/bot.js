import Board from './board.js'

export default class Bot {
  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth
    this.nodesMap = new Map()
  }

  getBestMove(board, dimension, maximizing = true, callback = () => {}, depth = 0) {
    // clear nodesMap if the function is called for a new move
    if (depth === 0) this.nodesMap.clear();

    //If the board state is a terminal one, return the heuristic value
    if (board.isTerminal() || depth === this.maxDepth ) {
      if (board.isTerminal().winner === 'x') {
        return 100 - depth;
      } else if (board.isTerminal().winner === 'o') {
        return -100 + depth;
      } 
      return 0;
    }

    if (maximizing) {
      //Initialize best to the lowest possible value
      let best = -100;

      //Loop through all empty cells
      board.availableMoves().forEach(key => {
        const child = new Board(dimension, [...board.state])

        child.insert('x', key)
        
        // Recursively calling getBestMove this time with the new board and minimizing turn and incrementing the depth
        const nodeValue = this.getBestMove(child, dimension, false, callback, depth + 1)

        // Updating best value
        best = Math.max(best, nodeValue)
        
        // If it's the main function call, not a recursive one, map each heuristic value with it's moves indices
        if(depth === 0) {
          //Comma separated indices if multiple moves have the same heuristic value
          const moves = this.nodesMap.has(nodeValue) ? `${this.nodesMap.get(nodeValue)},${key}` : key
          this.nodesMap.set(nodeValue, moves)
        }
      })

      // If it's the main call, return the index of the best move or a random index if multiple indices have the same value
      if (depth === 0) {
        let returnValue
        if (typeof this.nodesMap.get(best) == 'string') {
          const arr = this.nodesMap.get(best).split(',')
          const rand = Math.floor(Math.random() * arr.length)
          returnValue = arr[rand]
        } else returnValue = this.nodesMap.get(best)

        // run a callback after calculation and return the index
        callback(returnValue)
        return returnValue
      }

      // If not main call (recursive) return the heuristic value for next calculation
      return best
    }

    if(!maximizing) {
			let best = 100;

      board.availableMoves().forEach(key => {
				const child = new Board(dimension, [...board.state])

				child.insert('o', key)
			
				let nodeValue = this.getBestMove(child, dimension, true, callback, depth + 1)
				best = Math.min(best, nodeValue)
				
				if (depth == 0) {
					const moves = this.nodesMap.has(nodeValue) ? this.nodesMap.get(nodeValue) + ',' + key : key;
					this.nodesMap.set(nodeValue, moves);
				}
			})

      if (depth == 0) {
        let returnValue;
				if (typeof this.nodesMap.get(best) == 'string') {
					const arr = this.nodesMap.get(best).split(',');
					const rand = Math.floor(Math.random() * arr.length);
					returnValue = arr[rand];
				} else {
					returnValue = this.nodesMap.get(best);
				}

        callback(returnValue);
				return returnValue;
			}

      return best;
		}

    // console.log(maximizing)
    // console.log(callback)
    // console.log(depth)
  }
}