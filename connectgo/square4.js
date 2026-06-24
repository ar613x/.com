let alliances = new Map([
    [0,[]],
    [1,[1]],
    [2,[2]],
    [3,[3]],
    [4,[4]]
]);
function makeAlliance(all1,all2) {
    let all1S = new Set(all1);
    let all2S = new Set(all2);
    for (let [i,o] of alliances) {
        let allOS = new Set(o);
        if (all1S.size === allOS.size && o.every(n => all1S.has(n))) {
            alliances.set(i,o.concat(all2));
            continue;
        }
        if (all2S.size === allOS.size && o.every(n => all2S.has(n))) {
            alliances.set(i,o.concat(all1));
            continue;
        }
    }
}
class Square {
    constructor(x,y,col) {
        this.x = x;
        this.y = y;
        this.col = col;
    }
    setColor(newCol) {
        this.col = newCol;
        let event = new CustomEvent('updateCell',{
            bubbles: true,
            detail: {
                id: `${this.y},${this.x}`,
                color: newCol,
                cell: this
            }
        });
        document.dispatchEvent(event);
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
        return n.filter(i => i && i.col);
    }
    sames(n,di=false) {
        let alliance = alliances.get(this.col) ?? [];
        for (let i = n.length - 1; i >= 0; i--) {
            if (!di) {
                if (!alliance.includes(n[i].col)) {
                    n.splice(i, 1);
                }
            } else {
                if (alliance.includes(n[i].col)) {
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
            if (!i || !i.col) {
                continue;
            }
            groups.push(i.group(newCells));
        }    
    }
    return groups
}
function groupColor(group) {
    return group[0].col;
}
function groupSurrounded(cells,group) {
    let newCol = groupColor(group);
    for (let i of group) {
        if (i.neighbors(cells,false,true,true,false).length !== 4-[i.x,18-i.x,i.y,18-i.y].filter(j => j === 18).length) {
            return [false];
        }
        for (let j of i.neighbors(cells,false,true,true,false)) {
            if (j.color !== newCol) {
                if (newCol === i.col) {
                    newCol = j.col;
                } else {
                    return [false];
                }
            }
        }
    }
    return [true,newCol];
}
function turnFlipCheck(cells) {
    let groups = allGroups(cells);
    let flips = new Map();
    for (let i of groups) {
        let surround = groupSurrounded(cells,i);
        if (surround[0]) {
            for (let j of i) {
                flips.set(j,surround[1]);
            }
        }
    }
    for (let [i,o] of flips) {
        i.setColor(o);
    }
}
function win(cells,cell) {
    let w = false;
    for (let dir of ["h","v","d","d1"]) {
        if (cell.winGroup(cells,dir).size >= 6) {
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
function turnCheck(cells) {
    turnFlipCheck(cells);
    if (moveWinCheck(cells)) {
        return true;
    }
    return false;
}
function cellsUpdate(cells,cell) {
    cells[cell.y][cell.x] = cell;
}
export { Square, turnCheck, cellsUpdate, makeAlliance, alliances };
