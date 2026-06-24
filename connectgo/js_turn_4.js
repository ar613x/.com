import {Square, turnCheck, cellsUpdate, makeAlliance, alliances} from "./square4.js";
// import {Piece, flipPieces} from "./piece.js";
const board = document.getElementById("board");
const colorNames = ["", "black", "white", "red", "blue"];
let turn = 0;
let lastCell = null;
let sturn = 0; // 0 = black, 1 = red 2 = white 3 = blue
function updateTurnMarker(turn,v=false) {
    let turnMarker = document.getElementById('turnmarker')
    if (turn === 0) {
        turnMarker.innerHTML =
            `<span style='color:red;background:black;padding:4px;border:1px solid red;font-family:monospace;'>Black's ${v ? "victory" : "turn"}</span>`;
    } else if (turn === 1) {
        turnMarker.innerHTML =
            `<span style='color:blue;background:red;padding:4px;border:1px solid blue;font-family:monospace;'>Red's ${v ? "victory" : "turn"}</span>`;
    }
    else if (turn === 2) {
        turnMarker.innerHTML =
            `<span style='color:black;background:white;padding:4px;border:1px solid black;font-family:monospace;'>White's ${v ? "victory" : "turn"}</span>`;
    }
    else if (turn === 3) {
        turnMarker.innerHTML =
            `<span style='color:white;background:blue;padding:4px;border:1px solid white;font-family:monospace;'>Blue's ${v ? "victory" : "turn"}</span>`;
    }
}
function markLastMove(cell) {
    if (lastCell) {
        lastCell.classList.remove("last-move-4p");
    }

    cell.classList.add("last-move-4p");
    lastCell = cell;
}

let cells = [];
document.addEventListener("updateCell", (event) => {
    const cell = document.getElementById(event.detail.id);
    if (!cell) return;

    let stone = cell.querySelector(".stone");
    const color = event.detail.color;

    if (color === 0) {
        if (stone) cell.removeChild(stone);
        return;
    }

    if (!stone) {
        stone = document.createElement("div");
        stone.classList.add("stone");
        cell.appendChild(stone);
    }

    stone.className = `stone ${colorNames[color]}`;
    cellsUpdate(cells,event.detail.cell);
});
let victory = false;
for (let row = 0; row < 19; row++) {
    cells[row] = [];
    for (let col = 0; col < 19; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cells[row][col] = new Square(col, row, false, false);

        cell.id = `${row},${col}`;
        // Outline the center 7×7 area
        if (row >= 6 && row <= 12) {
            if (col === 6) cell.classList.add("center-left");
            if (col === 12) cell.classList.add("center-right");
        }

        if (col >= 6 && col <= 12) {
            if (row === 6) cell.classList.add("center-top");
            if (row === 12) cell.classList.add("center-bottom");
        }
        
        // Outline the center 3×3 area
        if (row >= 8 && row <= 10) {
            if (col === 8) cell.classList.add("center-left");
            if (col === 10) cell.classList.add("center-right");
        }

        if (col >= 8 && col <= 10) {
            if (row === 8) cell.classList.add("center-top");
            if (row === 10) cell.classList.add("center-bottom");
        }
        cell.addEventListener("click", () => {
            const stone = cell.querySelector(".stone");
            let square = cells[row][col];

            if (stone || victory) {
                return;
            }
            if (sturn % 4 == 0) {
                square.setColor(1);
                sturn += 1;
            } else if (sturn % 4 == 1) {
                square.setColor(2);
                sturn += 1;
            }
            else if (sturn % 4 == 2) {
                square.setColor(3);
                sturn += 1;
            }
            else if (sturn % 4 == 3) {
                square.setColor(4);
                sturn += 1
            }
            markLastMove(cell);
            const win = turnCheck(cells);
            if (win) {
                console.log(`Victory for ${sturn ? "black" : "white"}.`);
                victory = true;
            }
            else {
                console.log(`Turn number ${sturn}. Next player: ${sturn % 4 == 0 ? "black" : sturn % 4 == 1 ? "red" : sturn % 4 == 2 ? "white" : "blue"}`);
                victory = false;
            }
            updateTurnMarker(victory ? (sturn - 1) % 4 : sturn % 4, victory);
        });
        board.appendChild(cell);
    }
}
updateTurnMarker(sturn);
