// HUD
const playerDisplay = document.querySelector(".playerDisplay");
const result = document.querySelector(".result");
const menu = document.querySelector(".menu");
const welcome = document.querySelector(".welcome");
//btns
const btnStart = document.getElementById("start");

// players
const playerOne = document.getElementById("player1");
const playerTwo = document.getElementById("player2");

let Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const displayBoard = () => {
    let html = "";
    gameboard.forEach((field) => {
      html += `<div class="field">${field}</div>`;
    });
    document.querySelector(".gameboard").innerHTML = html;
  };

  return {
    displayBoard,
  };
})();

const playGame = (() => {
  let gameActive = false;

  const start = () => {
    let players = [
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
    gameActive = true;
    Gameboard.displayBoard();
    playerDisplay.classList.remove("hidden");
    result.classList.remove("hidden");
    welcome.classList.add("hidden");
    playerDisplay.textContent = `Current player: ${players[curPlayer].name} - ${players[curPlayer].symbol}`;
    menu.classList.add("hidden");
    document.querySelectorAll(".field").forEach((field, i) => {
      field.addEventListener("click", () => {
        if (field.textContent === "") {
          if (curPlayer === 0) {
            field.textContent = "X";
            curPlayer = 1;
            playerDisplay.textContent = `Current player: ${players[curPlayer].name} - ${players[curPlayer].symbol}`;
          } else if (curPlayer === 1) {
            field.textContent = "O";
            curPlayer = 0;
            playerDisplay.textContent = `Current player: ${players[curPlayer].name} - ${players[curPlayer].symbol}`;
          }
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
