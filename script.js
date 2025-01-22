function Player(marker) {
    return {marker}
}

const gameBoard = (function() {
    let board = [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_']
    ]
    function displayBoard() {
        for(let row of board) {
            console.log(row.join(' '))
        }
    }
    function getBoard() {
        return board
    }

    function resetBoard() {
        board = [
            ['_', '_', '_'],
            ['_', '_', '_'],
            ['_', '_', '_']
        ]
    }

    return {getBoard, displayBoard, resetBoard}
})()

const gameController = (function() {
    let board = gameBoard.getBoard()

    playerX = Player('X')
    playerO = Player('O')
    currentPlayer = playerX

    //main function that run the game
    function playRound(row, col) {
        if (idValidCell(row, col)) {
            makeMove(row, col)
            
            displayBoard()

            console.log('move succesful!')

            if(checkWin() || checkDraw()) {
                console.log('---------------------')
                console.log('start again!')
                console.log('pick a move')
                resetBoard()
            }
            
            switchPlayer()
            
            console.log('---------------------')
        } else {
            console.log('please ener valid play!')
        }
    }


    // ---- PRIVATE ----

    function displayBoard() {
        gameBoard.displayBoard()
    }

    function makeMove(row, col) {
        board[row - 1][col - 1] = currentPlayer.marker
    }

    function idValidCell(row, col) {
        if (board[row - 1][col - 1] === '_') {
            return true
        } else {
            return false
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === playerX ? playerO : playerX
    }

    function checkWin() {

        // check horizontal
        for (item of board) { 
            if (item[0] === item[1] && item[1] === item[2] && item[0] != '_') {
                console.log(`Game end: Player ${currentPlayer.marker} win (horizontal)`)
                return true
            } 
        }

        // check vertical
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != '_') {
                    console.log(`Game end: Player ${currentPlayer.marker} win (vertical)`)
                    return true
            }
        }

        // check in X line
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != '_' 
            || board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != '_') {
                console.log(`Game end: Player ${currentPlayer.marker} win (X line)`)
                return true
            }        
    }

    function checkDraw() {
        for (let row of board) {
            for (let col of row) {
                if (col === '_') {
                    return false
                }
            }
        }
        console.log('game end: its a draw')
        return true
    }

    function resetBoard() {
        gameBoard.resetBoard()
        board = gameBoard.getBoard()
    }

    return {playRound}
})()

gameController.playRound(1, 1)
gameController.playRound(1, 3)
gameController.playRound(2, 2)
gameController.playRound(2, 1)
gameController.playRound(3, 1)
gameController.playRound(1, 2)
gameController.playRound(3, 2)
gameController.playRound(3, 3)
gameController.playRound(2, 3)




