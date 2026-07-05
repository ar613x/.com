import {Square, turnCheck} from "./square.js";
// import {Piece, flipPieces} from "./piece.js";
const board = document.getElementById("board");
window.setSquare = (x,y,col) => {
    document.dispatchEvent(new CustomEvent("updateCell",{detail: {id: `${y},${x}`,color: col}}))
};
let lastCell = null;
let sturn = 0; // 0 = black, 1 = white
function updateTurnMarker(turn,v=false) {
    let turnMarker = document.getElementById('turnmarker')
    if (turn === 0) {
        turnMarker.innerHTML =
            `<span style='color:white;background:black;padding:4px;font-family:monospace;'>Black's ${v ? "victory" : "turn"}</span>`;
    } else if (turn === 1) {
        turnMarker.innerHTML =
            `<span style='color:black;background:white;padding:4px;border:1px solid black;font:monospace;'>White's ${v ? "victory" : "turn"}</span>`;
    }
}
function markLastMove(cell) {
    if (lastCell) {
        lastCell.classList.remove("last-move");
    }

    cell.classList.add("last-move");
    lastCell = cell;
}

let cells = [];
window.board = cells;
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

    stone.className = color === 1 ? "stone black" : "stone white";
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
            if (sturn == 0) {
                square.setColor(1);
                sturn += 1;
            } else {
                square.setColor(2);
                sturn -= 1;
            }
            markLastMove(cell);
            const win = turnCheck(cells);
            if (win === 1) {
                victory = true;
            } else if (win === 2) {
                victory = true;
                let counts = [0, 0];
                for (let row of cells) {
                    for (let i of row) {
                        if (i.occ) {
                            counts[i.color-1] += 1;
                        }
                    }
                }
                if (counts[0] > counts[1]) {
                    sturn = 0;
                } else {
                    sturn = 1;
                }
            }
            updateTurnMarker(victory ? 1-sturn : sturn,victory);
        });
        board.appendChild(cell);
    }
}
updateTurnMarker(sturn);
