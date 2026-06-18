const board = document.getElementById("board");

const pieceList = [];

class Piece {
    constructor(x, y, element) {
        pieceList.push(this);
        this.x = x;
        this.y = y;
        this.element = element;
    }

    static pieceAt(x, y) {
        for (const piece of pieceList) {
            if (piece.x == x && piece.y == y) {
                return piece;
            }
        }
    }

    getColor() {
        return this.element.className == "stone black" ? "black" : "white";
    }

    setColor(color) {
        this.element.className = (color == "black" ? "stone black" : "stone white");
    }

    getNeighbors(sameColor=false) {
        const right = Piece.pieceAt(this.x+1, this.y);
        const left = Piece.pieceAt(this.x-1, this.y);
        const up = Piece.pieceAt(this.x, this.y-1);
        const down = Piece.pieceAt(this.x, this.y+1);
        const neighbors = [right, left, up, down];
        for (const neighbor of neighbors) {
            if (!neighbor) neighbors.splice(neighbors.indexOf(neighbor),1);
            if (sameColor && (neighbor.getColor() != this.getColor())) neighbors.splice(neighbors.indexOf(neighbor),1);
        }
        return neighbors;
    }

    isSurrounded() {
        return this.getNeighbors().length == 4;
    }

    findGroup(foundPieces=[]) {
        // initializing list
        const groupList = [];
        if (!foundPieces) groupList.push(this);

        // add new neighbors
        const neighbors = this.getNeighbors(true);
        neighbors.filter((piece) => {!(piece in foundPieces)});
        for (const neighbor of neighbors) groupList.push(neighbor);

        // count new pieces as found
        for (const piece of groupList) foundPieces.push(piece);

        // add unfound pieces from new neigbors
        for (const neighbor of neighbors) {
            const newNewPieces = neighbor.findGroup(foundPieces);
            for (const newPiece of newNewPieces) {
                groupList.push(newPiece);
                foundPieces.push(newPiece);
            }
        }

        // return new pieces or Group object
        if (foundPieces) return groupList;
        return new Group(groupList);
    }

    flipColor() {
        if (this.getColor() == "white") this.setColor("black");
        else this.setColor("white");
    }

}

class Group {
    constructor(pieces) {
        this.pieces = pieces;
    }

    isSurrounded() {
        for (const piece of this.pieces) {
            if (!piece.isSurrounded()) return false;
        } return true;
    }
}

function flipPieces(secondTime) {
    const needFlipping = [];
    for (const piece of pieceList) {
        if (piece.findGroup().isSurrounded()) {
            if (secondTime) pieceList.splice(pieceList.indexOf(piece),1);
            else needFlipping.push(piece);
        }
    }
    for (const piece of needFlipping) piece.flipColor();
    if (!secondTime) flipPieces(true);
}
export {Piece, Group, flipPieces};
