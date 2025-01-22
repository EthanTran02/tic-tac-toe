// const DisplayController = (() => {
//     // 1. Get DOM Elements:
//     const gameBoardElement = document.getElementById("game-board"); // Or your container ID
//     const cellElements = document.querySelectorAll(".cell"); // Assuming you use a class "cell" for each square
//     const messageElement = document.getElementById("message"); // To display messages (e.g., whose turn, winner)
//     const resetButton = document.getElementById("reset-button"); // A button to start a new game
  
//     // 2. Helper Functions (private):
  
//     // Update a specific cell's display
//     const _updateCellDisplay = (row, col, symbol) => {
//       // Find the corresponding cell element and update its text content with the 'symbol'
//       // You might need to map (row, col) to the correct index in cellElements
//       const cellIndex = row * 3 + col; // Assuming 3x3 board and row-major order
//       cellElements[cellIndex].textContent = symbol;
//     };
  
//     // Update the message element (e.g., "Player X's turn")
//     const _updateMessage = (message) => {
//       messageElement.textContent = message;
//     };
  
//     // Clear all cells (for a new game)
//     const _clearCells = () => {
//       cellElements.forEach(cell => cell.textContent = "");
//     };
  
//     // 3. Event Handlers:
  
//     // Handle clicks on game board cells
//     const _handleCellClick = (event) => {
//       const cell = event.target;
//       // Get the row and col from the clicked cell (you might need data attributes in your HTML)
//       const row = parseInt(cell.dataset.row);
//       const col = parseInt(cell.dataset.col);
  
//       // Call GameController.playRound() and get the result
//       const result = GameController.playRound(row, col);
  
//       // Update the display based on the result:
//       if (result === "Move successful") {
//         _updateCellDisplay(row, col, GameController.getCurrentPlayer().symbol); // Get updated symbol
//         _updateMessage(`Player ${GameController.getCurrentPlayer().symbol}'s turn`);
//       } else if (result.includes("wins")) { // Check for winner message
//         _updateMessage(result);
//         disableCellClicks(); // Prevent further moves
//       } else if (result === "It's a draw!") {
//         _updateMessage(result);
//         disableCellClicks();
//       } else {
//           _updateMessage(result); // e.g., "Invalid move"
//       }
//     };
  
//     // Handle clicks on the reset button
//     const _handleResetClick = () => {
//       GameController.resetGame(); // Reset the game logic
//       _clearCells();              // Clear the display
//       enableCellClicks();         // Re-enable clicks
//       _updateMessage(`Player ${GameController.getCurrentPlayer().symbol}'s turn`); // Initial message
//     };
    
//     // Disable clicks on cells (after game over)
//     const disableCellClicks = () => {
//       cellElements.forEach(cell => cell.removeEventListener("click", _handleCellClick));
//     };
  
//     // Enable clicks on cells (for a new game)
//     const enableCellClicks = () => {
//         cellElements.forEach(cell => cell.addEventListener("click", _handleCellClick, { once: true }));
//     };
  
//     // 4. Initialize:
  
//     const init = () => {
//       // Attach event listeners to cells and reset button
//       enableCellClicks() // Add event listeners for cell clicks
  
//       resetButton.addEventListener("click", _handleResetClick);
  
//       // Initial message
//       _updateMessage(`Player ${GameController.getCurrentPlayer().symbol}'s turn`);
//     };
  
//     // 5. Public Interface (Expose what's needed):
//     return {
//       init
//     };
//   })();
  
//   // Start everything:
//   DisplayController.init();




//   ---------------------------------------------------------------------------------------------





// const DisplayController = (() => {
//     // Private:
//     const boardContainer = document.getElementById("game-board"); // Or use querySelector
//     const messageDiv = document.getElementById("message"); // Display game messages
  
//     const _renderBoard = () => {
//       // Get the board state from GameBoard module
//       const board = GameBoard.getBoard(); 
  
//       // Clear the board container (in case of re-render)
//       boardContainer.innerHTML = ""; 
  
//       // Create the visual representation of the board
//       for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//           const cell = document.createElement("div");
//           cell.classList.add("cell"); // Add CSS class for styling
//           cell.textContent = board[i][j]; // Display X, O, or empty
  
//           // Add event listener for clicks
//           cell.addEventListener("click", () => {
//             // Handle the click (see _handleClick below)
//             _handleClick(i, j);
//           });
  
//           boardContainer.appendChild(cell);
//         }
//       }
//     };
  
//     const _handleClick = (row, col) => {
//       // 1. Call GameController.playRound() to try to make a move
//       const result = GameController.playRound(row, col);
//       // 2. If the move was successful, update the display:
//       if (result === "Move successful") {
//           _renderBoard(); // Re-render the board to show the change
//           _updateMessage();
//       }
//       // 3. if the move is invalid, provide feedback
//       if (result === "Invalid move") {
//           // Optionally, display a message to the user (e.g., "Cell already taken")
//           messageDiv.textContent = "Invalid move. Try again.";
//       }
//       // 4. if the move was successful and end the game
//       if (result === `${GameController.getCurrentPlayer().symbol} wins!` || result === "It's a draw!") {
//           // display the message to the user
//           _updateMessage(result);
//           // disable further moves, show "New Game" button, etc.
//       }
//     };
  
//     const _updateMessage = (optionalMessage) => {
//       // Update the message div with the current player's turn or the game result
//       if (optionalMessage) {
//         messageDiv.textContent = optionalMessage;
//       } else {
//         messageDiv.textContent = `It's ${GameController.getCurrentPlayer().symbol}'s turn`;
//       }
//     };
      
//     // Public:
//     const init = () => {
//       _renderBoard();
//       _updateMessage();
//       // Attach event listeners or other initialization tasks if needed
//     };
    
//     const reset = () => {
//       // reset the message and re-render the board
//     }
      
  
//     return {
//       init,
//       reset
//     };
//   })();
  
//   // To initialize the display and event handling:
//   DisplayController.init();