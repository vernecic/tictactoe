// HUD
const playerDisplay = document.querySelector(".playerDisplay");
const result = document.querySelector(".result");
const menu = document.querySelector(".menu");
const welcome = document.querySelector(".welcome");
//btns
const btnStart = document.getElementById("start");
const btnRestart = document.getElementById("restart");

// players
const playerOne = document.getElementById("player1");
const playerTwo = document.getElementById("player2");

let Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const displayBoard = () => {
    let html = "";
    gameboard.forEach((field, i) => {
      html += `<div class="field">${field}</div>`;
    });
    document.querySelector(".gameboard").innerHTML = html;
  };

  const getBoard = () => gameboard;

  // tracker
  const updateBoard = (index, symbol) => {
    gameboard[index] = symbol;
  };
  // so we can use them later
  return {
    displayBoard,
    updateBoard,
    getBoard,
  };
})();

const playGame = (() => {
  let gameActive = false;
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const checkWinner = (board, symbol) => {
    for (let combo of winningCombos) {
      let [a, b, c] = combo;
      if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = (board) => {
    return !board.includes("");
  };

  const start = () => {
    // players objects
    const players = [
      {
        name: `${playerOne.value}`,
        symbol: "X",
      },
      {
        name: `${playerTwo.value}`,
        symbol: "O",
      },
    ];
    let curPlayer = 0;
    let gameActive = true;

    // display board
    Gameboard.displayBoard();

    // hud changes
    playerDisplay.classList.remove("hidden");
    result.classList.remove("hidden");
    welcome.classList.add("hidden");
    playerDisplay.textContent = `Current player: ${players[curPlayer].name} - ${players[curPlayer].symbol}`;
    menu.classList.add("hidden");
    result.textContent = "RESULT:";

    // event handling
    document.querySelectorAll(".field").forEach((field, i) => {
      field.addEventListener("click", () => {
        if (field.textContent === "" && gameActive) {
          const symbol = players[curPlayer].symbol;
          field.textContent = symbol;
          Gameboard.updateBoard(i, symbol);

          const board = Gameboard.getBoard();
          if (checkWinner(board, symbol)) {
            result.textContent = `RESULT: ${players[curPlayer].name} WINS!`;

            gameActive = false;
            btnRestart.classList.remove("hidden");
            return;
          }
          if (checkDraw(board)) {
            result.textContent = "RESULT: It's a draw!";
            gameActive = false;
            btnRestart.classList.remove("hidden");
            return;
          }
          curPlayer = curPlayer === 0 ? 1 : 0;
          playerDisplay.textContent = `Current player: ${players[curPlayer].name} - ${players[curPlayer].symbol}`;
        }
      });
    });
  };
  return {
    start,
  };
})();

btnStart.addEventListener("click", () => {
  if (playerOne.value !== "" && playerTwo.value !== "") {
    playGame.start();
  } else {
    alert("Enter a name");
  }
});
