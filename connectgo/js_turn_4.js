import {Square, turnCheck, cellsUpdate, makeAlliance, alliances} from "./square4.js";
// import {Piece, flipPieces} from "./piece.js";
const board = document.getElementById("board");
const colors = ["black", "white", "red", "blue"];
const textBorderThings = new Map([
    ["black","red"],
    ["white","black"],
    ["red","blue"],
    ["blue","white"]
])
let lastCell = null;
let sturn = 0; // 0 = black, 1 = red 2 = white 3 = blue
function updateTurnMarker(turn,v=false) {
    let turnMarker = document.getElementById('turnmarker');
    let c = colors[sturn];
    turnMarker.innerHTML =
        `<span style='color:${textBorderThings.get(c)};background:${c};padding:4px;border:1px solid ${textBorderThings.get(c)};font:monospace;'>${c.charAt(0).toUpperCase()+c.slice(1)}'s ${v ? "victory" : "turn"}</span>`;
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

    stone.className = `stone ${colors[color-1]}`;
    cellsUpdate(cells,event.detail.cell);
});
let victory = false;
for (let row = 0; row < 19; row++) {
    cells[row] = [];
    for (let col = 0; col < 19; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cells[row][col] = new Square(col, row, 0);

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
            square.setColor(sturn+1);
            markLastMove(cell);
            const win = turnCheck(cells);
            if (win) {
                victory = true;
            } else {
                sturn = sturn === 3 ? 0 : sturn+1;
            }
            updateTurnMarker(victory ? (sturn - 1) % 4 : sturn % 4, victory);
        });
        board.appendChild(cell);
    }
}
updateTurnMarker(sturn);
