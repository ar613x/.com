class Square {
    constructor(x, y, occ, b) {
        this.x = x;
        this.y = y;
        this.occ = occ;
        this.b = b;
    }
    setColor(c) {
        switch (c) {
            case 0:
                this.occ = false;
                this.b = false;
                break;
            case 1:
                this.occ = true;
                this.b = true;
                break;
            case 2:
                this.occ = true;
                this.b = false;
                break;
        }
        let event = new CustomEvent('updateCell', {
            bubbles: true,
            detail: {
                id: `${this.y},${this.x}`,
                color: c,
            }
        });
        document.dispatchEvent(event);
    }
    flip() {
        if (this.occ) {
            switch (this.b) {
                case true:
                    this.setColor(2);
                    break;
                case false:
                    this.setColor(1);
                    break;
            }
        }
    }
    getColor() {
        let c = 0;
        if (this.occ) {
            c = 1;
            if (!this.b) {
                c = 2;
            }
        }
        return c;
    }
    neighbors(cells,d=false,h=true,v=true,d1=false) {
        let n = [];

        const safe = (x, y) => {
            if (x < 0 || y < 0 || x > 18 || y > 18) return null;
            return cells[y][x];
        };

        if (h) {
            n = n.concat([safe(this.x - 1, this.y), safe(this.x + 1, this.y)]);
        }
        if (v) {
            n = n.concat([safe(this.x, this.y - 1), safe(this.x, this.y + 1)]);
        }
        if (d) {
            n = n.concat([safe(this.x + 1, this.y - 1), safe(this.x - 1, this.y + 1)]);
        }
        if (d1) {
            n = n.concat([safe(this.x - 1, this.y - 1), safe(this.x + 1, this.y + 1)]);
        }

        return n.filter(i => i && i.occ);
    }
    sames(n,di=false) {
        for (let i = n.length - 1; i >= 0; i--) {
            if (!di) {
                if (n[i].getColor() !== this.getColor()) {
                    n.splice(i, 1);
                }
            } else {
                if (n[i].getColor() === this.getColor()) {
                    n.splice(i, 1);
                }
            }
        }
        return n;
    }
    group(cells) {
        let n = new Set([this]);
        cells[this.y][this.x] = null;
        for (let j of n) {
            j.sames(j.neighbors(cells,false,true,true,false)).forEach(k => n.add(k));
            for (let k of j.sames(j.neighbors(cells,false,true,true,false))) {
                cells[k.y][k.x] = null;
            }
            if (n.size > 400) {
                break;
            }
        }
        return Array.from(n);
    }
    winGroup(cells, dir) {
        let n = new Set([this]);
        for (let j of n) {
            j.sames(j.neighbors(cells,dir=="d",dir=="h",dir=="v",dir=="d1")).forEach(k => n.add(k));
            if (n.size > 50) {
                break;
            }
        }
        return n;
    }
}
function clone(arr) {
    let newArr = arr.map(row =>
    row.map(c => c ? c : null)
    );
    return newArr;
}
function allGroups(cells) {
    let groups = [];
    let newCells = clone(cells);
    for (let j of newCells) {
        for (let i of j) {
            if (!i) {
                continue;
            }
            groups.push(i.group(newCells));
        }    
    }
    return groups
}
function groupSurrounded(cells,group) {
    for (let i of group) {
        if (i.neighbors(cells,false,true,true,false).length !== 4-[i.x,18-i.x,i.y,18-i.y].filter(j => j === 18).length) {
            return false;
        }
    }
    return true;
}
function groupColor(group) {
    return group[0].getColor();
}
function turnFlipCheck(cells) {
    let groups = allGroups(cells);
    let cols = [];
    let flips = [];
    for (let i of groups) {
        if (groupSurrounded(cells,i)) {
            for (let j of i) {
                flips.push(j);
            }
            cols.push(groupColor(i));
        }
    }
    for (let i of flips) {
        i.flip();
    }
}
function win(cells,cell) {
    let w = false;
    for (let dir of ["h","v","d","d1"]) {
        if (cell.winGroup(cells,dir).size >= 5) {
            w = true;
            break;
        }
    }
    return w;
}
function moveWinCheck(cells) {
    for (let row of cells) {
        for (let i of row) {
            if (!i) {
                continue;
            }
            if (win(cells,i)) {
                return true;
                break;
            }
        }
    }
    return false;
}
function boardFull(cells) {
    for (let row of cells) {
        for (let i of row) {
            if (!i || !i.occ) {
                return false;
            }
        }
    }
    return true;
}
function turnCheck(cells) {
    turnFlipCheck(cells);
    if (moveWinCheck(cells)) {
        return 1;
    }
    if (boardFull(cells)) {
        return 2;
    }
    return 0;
}
export { Square, turnCheck };
