import {Square, cellsUpdate} from "./square.js";
const board = document.getElementById("board");

let lastCell = null;

function markLastMove(cell) {
    if (lastCell) {
        lastCell.classList.remove("last-move");
    }

    cell.classList.add("last-move");
    lastCell = cell;
}
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
            square.setColor(1,false);
            cellsUpdate(cells,square);
            s.className = "stone black";
            cell.appendChild(s);

            markLastMove(cell);
        });

        // Right click = white stone
        cell.addEventListener("contextmenu", (ev) => {
            ev.preventDefault();
            const square = cells[row][col];
            if (cell.querySelector(".stone")) return;

            const s = document.createElement("div");
            square.setColor(2,false);
            cellsUpdate(cells,square);
            s.className = "stone white";
            cell.appendChild(s);

            markLastMove(cell);
        });
        board.appendChild(cell);
    }
}
