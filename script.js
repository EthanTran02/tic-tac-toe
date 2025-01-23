function Player(marker) {
    return {marker}
}

const gameBoard = (function() {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    function displayBoard() {
        cells = document.getElementsByClassName('cell')
        Array.from(cells).forEach((item, index) => {
            const row = Math.floor(index / 3)
            const col = index % 3
            item.textContent = board[row][col]
        });      
    }

    function getBoard() {
        return board
    }

    function resetBoard() {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    return {getBoard, displayBoard, resetBoard}
})()

const gameController = (function() {
    let board = gameBoard.getBoard()

    playerX = Player('X')
    playerO = Player('O')
    currentPlayer = playerX

    // DOM add event listenter 

    const cells = Array.from(document.getElementsByClassName('cell'))
    const resetButton = document.getElementById('reset-button')
    let message = document.getElementById('message')
    
    cells.forEach((item, index) => {
        const row = Math.floor(index / 3)
        const col = index % 3
        item.addEventListener ('click', () =>{
            playRound(row + 1, col + 1)
            console.log(cells)
    })
    });

    resetButton.addEventListener('click', () => {
        resetBoard();
        gameBoard.displayBoard();
        currentPlayer = playerX
        message.innerText = `${currentPlayer.marker} turn`
        enableClick()
        resetButton.style.display = 'none'
    })

    message.innerText = `${currentPlayer.marker} turn`
    resetButton.style.display = 'none'

    // ---- PRIVATE ----

    //main function that run the game
    function playRound(row, col) {
        if (idValidCell(row, col)) {
            
            makeMove(row, col)
            displayBoard()

            if(checkWin()) {
                message.innerText = `${currentPlayer.marker} wins!`
                resetButton.style.display = 'block'
                disableClick()

            } else if (checkDraw()) {
                message.innerText = `It's a Tie!`
                resetButton.style.display = 'block'
                disableClick()
                
            } else {
                switchPlayer()
                message.innerText = `${currentPlayer.marker} turn`
            }
            
        } else {
            message.innerText = `invalid move, try again! ${currentPlayer.marker} turn`
        }
    }

    // helper function

    function disableClick() {
        cells.forEach(item => {
            item.style.pointerEvents = 'none'
        });
    }

    function enableClick() {
        cells.forEach(item => {
            item.style.pointerEvents = ''
        });
    }

    function displayBoard() {
        gameBoard.displayBoard()
    }

    function makeMove(row, col) {
        board[row - 1][col - 1] = currentPlayer.marker
    }

    function idValidCell(row, col) {
        if (board[row - 1][col - 1] === '') {
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
            if (item[0] === item[1] && item[1] === item[2] && item[0] != '') {
                return true
            } 
        }

        // check vertical
        for (let i = 0; i < board.length; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] != '') {
                    return true
            }
        }

        // check in X line
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != '' 
            || board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] != '') {
                return true
            }        
    }

    function checkDraw() {
        for (let row of board) {
            for (let col of row) {
                if (col === '') {
                    return false
                }
            }
        }
        return true
    }

    function resetBoard() {
        gameBoard.resetBoard()
        board = gameBoard.getBoard()
    }

    return {playRound}
})()
