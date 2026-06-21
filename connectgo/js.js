import {Square, cellsUpdate} from "./square.js";
const board = document.getElementById("board");

let lastCell = null;
let sidePicker = document.getElementById("side-picker");
function markLastMove(cell) {
    if (lastCell) {
        lastCell.classList.remove("last-move");
    }

    cell.classList.add("last-move");
    lastCell = cell;
}
document.addEventListener("keypress", (e) => {
    if (e.key === "Space" || e.code === "Space") {
        sidePicker.value = sidePicker.value == "black" ? "white" : "black";
    }
});
let cells = [];
for (let row = 0; row < 19; row++) {
    cells[row] = [];
    for (let col = 0; col < 19; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cells[row][col] = new Square(row, col, false, false);

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

        // Single click = black stone OR remove stone
        cell.addEventListener("click", () => {
            const stone = cell.querySelector(".stone");
            const square = cells[row][col];
            const col = sidePicker.value;
            if (stone) {
                stone.remove();
                square.setColor(0,false);
                if (cell === lastCell) {
                    cell.classList.remove("last-move");
                    lastCell = null;
                }

                return;
            }

            const s = document.createElement("div");
            square.setColor(col === "black" ? 1 : 2,false);
            cellsUpdate(cells,square);
            s.className = `stone ${col}`;
            cell.appendChild(s);

            markLastMove(cell);
        });
        board.appendChild(cell);
    }
}
