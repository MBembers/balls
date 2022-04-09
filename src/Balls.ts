import * as consts from "./consts";
import { Pathfinder } from "./Pathfinder";
import { coords } from "./interfaces";
export default class Balls {
  board: number[][];
  tableDOM: HTMLTableElement;
  cells: HTMLTableCellElement[][];
  colsnum: number = 9;
  rowsnum: number = 9;
  isSelected: boolean = false;
  selectedCell: HTMLTableCellElement;
  selectedCoords: coords;
  pathfinder: Pathfinder;
  query: number[] = [];
  points: number = 0;
  gameover: boolean = false;

  constructor(tid: string) {
    this.tableDOM = document.getElementById(tid) as HTMLTableElement;
    this.createEmpty();
    this.pathfinder = new Pathfinder(this.board);
    this.listeners();
    this.render();
    this.generateQuery(3);
    this.addFromQuery(3);
    this.generateQuery(3);
  }
  createEmpty() {
    this.points = 0;
    this.board = [];
    this.cells = [];
    for (let i = 0; i < this.rowsnum; i++) {
      this.board.push(new Array(this.colsnum - 1));
      this.cells.push(new Array(this.colsnum - 1));
      let row = document.createElement("tr");
      row.id = "r" + i;
      for (let j = 0; j < this.colsnum; j++) {
        this.board[i][j] = 0;
        let cell = document.createElement("td");
        cell.id = i + "c" + j;
        this.cells[i][j] = cell;
        row.appendChild(cell);
      }
      this.tableDOM.appendChild(row);
    }
  }
  render() {
    document.getElementById("points").innerText = String(this.points);
    for (let i = 0; i < this.rowsnum; i++) {
      for (let j = 0; j < this.colsnum; j++) {
        this.cells[i][j].className =
          "cell " + consts.colorsArr[this.board[i][j]];
      }
    }
  }
  clear() {
    for (let i = 0; i < this.rowsnum; i++) {
      for (let j = 0; j < this.colsnum; j++) {
        this.board[i][j] = 0;
      }
    }
  }
  isFull(): boolean {
    for (let i = 0; i < this.rowsnum; i++) {
      for (let j = 0; j < this.colsnum; j++) {
        if (this.board[i][j] == 0) return false;
      }
    }
    this.gameover = true;
    return true;
  }
  generateQuery(num: number) {
    let queryTable = document.getElementById("query");
    queryTable.innerHTML = "";
    let tr = document.createElement("tr");
    for (let i = 0; i < num; i++) {
      let color: number =
        Math.floor(Math.random() * (consts.colorsArr.length - 1)) + 1;
      this.query.push(color);
      let td = document.createElement("td");
      td.classList.add(consts.colorsArr[color]);
      td.classList.add("cell");
      tr.appendChild(td);
    }
    queryTable.appendChild(tr);
  }
  addFromQuery(num: number) {
    for (let i = 0; i < num; i++) {
      if (this.isFull()) return;
      let color: number = this.query.shift();
      let y = Math.floor(Math.random() * this.rowsnum);
      let x = Math.floor(Math.random() * this.colsnum);
      while (this.board[y][x] != 0) {
        y = Math.floor(Math.random() * this.rowsnum);
        x = Math.floor(Math.random() * this.colsnum);
      }
      this.board[y][x] = color;
    }
    this.render();
  }
  checkBoard() {
    let toClear: coords[] = [];
    for (let i = 0; i < this.board.length; i++) {
      let numX = -1;
      let countX = 0;
      let numY = -1;
      let countY = 0;
      for (let j = 0; j < this.board.length; j++) {
        let currX = this.board[i][j];
        let currY = this.board[j][i];
        if (currX !== 0) {
          if (currX !== numX) {
            numX = currX;
            countX = 1;
          } else {
            countX++;
            if (countX >= 5) {
              for (let k = 0; k < countX; k++) {
                if (!toClear.some((e) => e.y === i && e.x === j - k))
                  toClear.push({ y: i, x: j - k });
              }
            }
          }
        } else {
          numX = -1;
          countX = 0;
        }

        if (currY !== 0) {
          if (currY !== numY) {
            numY = currY;
            countY = 1;
          } else {
            countY++;
            if (countY >= 5) {
              for (let k = 0; k < countY; k++) {
                if (!toClear.some((e) => e.y === j - k && e.x === i))
                  toClear.push({ y: j - k, x: i });
              }
            }
          }
        } else {
          numY = -1;
          countY = 0;
        }
      }
    }

    for (let i = 0; i < this.board.length * 2; i++) {
      let count = 0;
      let num = -1;
      for (let j = 0; j <= i; j++) {
        let y = i - j;
        if (j < this.board.length && y < this.board.length) {
          let curr = this.board[y][j];
          if (curr !== 0) {
            if (curr !== num) {
              num = curr;
              count = 1;
            } else {
              count++;
              if (count >= 5) {
                for (let k = 0; k < count; k++) {
                  if (!toClear.some((e) => e.y === y + k && e.x === j - k))
                    toClear.push({ y: y + k, x: j - k });
                }
              }
            }
          } else {
            num = -1;
            count = 0;
          }
        }
      }
    }

    for (let i = 0; i < this.board.length * 2; i++) {
      let count = 0;
      let num = -1;
      for (let j = this.board.length - 1; j >= this.board.length - 1 - i; j--) {
        let y = i - (this.board.length - 1 - j);
        if (
          j < this.board.length &&
          j >= 0 &&
          y < this.board.length &&
          y >= 0
        ) {
          let curr = this.board[y][j];
          if (curr !== 0) {
            if (curr !== num) {
              num = curr;
              count = 1;
            } else {
              count++;
              if (count >= 5) {
                for (let k = 0; k < count; k++) {
                  if (!toClear.some((e) => e.y === y + k && e.x === j + k))
                    toClear.push({ y: y + k, x: j + k });
                }
              }
            }
          } else {
            num = -1;
            count = 0;
          }
        }
      }
    }

    this.points += toClear.length;
    for (let coords of toClear) {
      this.board[coords.y][coords.x] = 0;
    }
    this.render();

    if (toClear.length > 0) return true;
    return false;
  }
  listeners() {
    document.getElementById("generate").addEventListener("click", () => {
      this.generateQuery(3);
      this.addFromQuery(3);
      this.render();
    });
    document.getElementById("clear").addEventListener("click", () => {
      this.clear();
      this.render();
    });
    document.getElementById("find").addEventListener("click", () => {
      this.checkBoard();
    });
    for (let i = 0; i < this.rowsnum; i++) {
      for (let j = 0; j < this.colsnum; j++) {
        let cell = this.cells[i][j];
        cell.addEventListener("click", () => {
          if (this.board[i][j] !== 0) {
            if (this.isSelected) {
              this.selectedCell.classList.remove("selected");
              if (this.selectedCell == cell) {
                this.isSelected = false;
                this.selectedCell = null;
              } else {
                cell.classList.add("selected");
                this.selectedCell = cell;
                this.selectedCoords = { x: j, y: i };
              }
            } else {
              cell.classList.add("selected");
              this.isSelected = true;
              this.selectedCell = cell;
              this.selectedCoords = { x: j, y: i };
            }
          } else {
            if (this.isSelected) {
              let path: coords[] = this.pathfinder.findShortestPath(
                this.selectedCoords,
                { x: j, y: i },
                this.board
              );
              if (path.length > 0) {
                this.board[i][j] =
                  this.board[this.selectedCoords.y][this.selectedCoords.x];
                this.board[this.selectedCoords.y][this.selectedCoords.x] = 0;
                this.isSelected = false;
                if (!this.checkBoard()) {
                  this.addFromQuery(3);
                  this.generateQuery(3);
                }
                this.checkBoard();
                this.render();
              }
            }
          }
        });
        cell.addEventListener("mouseenter", () => {
          for (let row of this.cells)
            for (let c of row) c.classList.remove("path");
          if (this.isSelected) {
            let path: coords[] = this.pathfinder.findShortestPath(
              this.selectedCoords,
              { x: j, y: i },
              this.board
            );
            for (let cellCoords of path) {
              this.cells[cellCoords.y][cellCoords.x].classList.add("path");
            }
          }
        });
      }
    }
  }
}
