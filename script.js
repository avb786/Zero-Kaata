const divGrid = document.querySelector("#grid");
const divForReset = document.createElement("div");
divForReset.classList.add("wrapper");
const resetBtn = document.createElement("button");
resetBtn.innerHTML = "Reset";
divForReset.appendChild(resetBtn);
const itemArray = new Array(9);
itemArray.fill("empty");
let isCrossed = true;
let counter = 0;
const winsArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function createGridDivs() {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    let row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "center";
    row.id = `grid${i}`;
    for (let j = 0; j < 3; j++) {
      let column = document.createElement("div");
      column.id = `${++count}`;
      column.classList.add("box");
      column.setAttribute("data-tic", "game");
      column.addEventListener("click", isClickedOnDiv);
      row.appendChild(column);
    }
    divGrid.appendChild(row);
    divGrid.appendChild(divForReset);
  }
}

function isClickedOnDiv(event) {
  const divId = document.getElementById(event.target.id);
  if (isCrossed) {
    divId.classList.remove("box");
    divId.innerHTML = "<span>X</span>";
    divId.classList.add("box-click");
    divId.classList.add("cross");
    isCrossed = false;
    itemArray[event.target.id] = "X";
    checkWinnerLogic();
    divId.removeEventListener("click", isClickedOnDiv);
  } else {
    divId.classList.remove("box");
    divId.classList.add("box-click");
    divId.classList.add("zero");
    divId.innerHTML = "O";
    itemArray[event.target.id] = "<span>O</span>";
    isCrossed = true;
    itemArray[event.target.id] = "O";
    checkWinnerLogic();
    divId.removeEventListener("click", isClickedOnDiv);
  }
}

async function checkWinnerLogic() {
  let showAlert = false;
  let showDraw = false;
  counter++;
  for (const winsArr of winsArray) {
    if (
      itemArray[winsArr[0]] === itemArray[winsArr[1]] &&
      itemArray[winsArr[0]] === itemArray[winsArr[2]] &&
      itemArray[winsArr[0]] !== "empty"
    ) {
      if (itemArray[winsArr[0]] === "X") {
        showAlert = await removeListener();
        if (showAlert) {
          setTimeout(() => {
            showBox("X");
          }, 100);
        }
      } else if (itemArray[winsArr[0]] === "O") {
        showAlert = removeListener();
        if (showAlert) {
          setTimeout(() => {
            showBox("O");
          }, 100);
        }
      }
    } else {
      showDraw = true;
    }
  }
  if (showDraw) {
    if (counter == 9)
      setTimeout(() => {
        alert("Draw!");
      }, 100);
  }
}

async function removeListener() {
  const divs = document.querySelectorAll(`div[data-tic="game"]`);
  divs.forEach((eve) => {
    eve.removeEventListener("click", isClickedOnDiv);
  });
  return true;
}

function showBox(symbol) {
  if (symbol === "X") {
    alert("Congratulations! Player1 wins");
  } else {
    alert("Congratulations! Player2 wins");
  }
}

createGridDivs();
resetBtn.addEventListener("click", () => {
  isCrossed = true;
  counter = 0;
  itemArray.fill("empty");
  removeListener();
  while (divGrid.firstChild) {
    divGrid.firstChild.remove();
  }
  createGridDivs();
});
