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

  constructor(tid: string) {
    this.tableDOM = document.getElementById(tid) as HTMLTableElement;
    this.createEmpty();
    this.pathfinder = new Pathfinder(this.board);
    this.listeners();
    this.render();
  }
  createEmpty() {
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
    this.board[0][0] = 1;
  }
  render() {
    // this.board[5][5] = 3;
    // console.table(this.board);
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
    return true;
  }
  generateRandomBalls(num: number) {
    for (let i = 0; i < num; i++) {
      if (this.isFull()) return;
      this.board.forEach((row) => {
        if (!row.includes(0)) return;
      });
      let color: number =
        Math.floor(Math.random() * (consts.colorsArr.length - 1)) + 1;
      let y = Math.floor(Math.random() * this.rowsnum);
      let x = Math.floor(Math.random() * this.colsnum);
      while (this.board[y][x] != 0) {
        y = Math.floor(Math.random() * this.rowsnum);
        x = Math.floor(Math.random() * this.colsnum);
      }
      // console.log("color, y, x:", color, y, x);
      this.board[y][x] = color;
    }
  }
  listeners() {
    document.getElementById("generate").addEventListener("click", () => {
      this.generateRandomBalls(3);
      this.render();
    });
    document.getElementById("clear").addEventListener("click", () => {
      this.clear();
      this.render();
    });
    document.getElementById("find").addEventListener("click", () => {
      this.pathfinder.findShortestPath(
        { x: 0, y: 0 },
        { x: 8, y: 8 },
        this.board
      );
    });
    for (let i = 0; i < this.rowsnum; i++) {
      for (let j = 0; j < this.colsnum; j++) {
        let cell = this.cells[i][j];
        cell.addEventListener("click", (e) => {
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
          }
        });
        // cell.addEventListener("mouseleave", () => {
        //   for (let row of this.cells)
        //     for (let c of row) c.classList.remove("path");
        // });
        cell.addEventListener("mouseenter", () => {
          for (let row of this.cells)
            for (let c of row) c.classList.remove("path");

          // console.log(j, i);
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
