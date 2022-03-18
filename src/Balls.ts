import * as consts from "./consts";
export default class Balls {
  board: number[][];
  tableDOM: HTMLTableElement;
  cells: HTMLTableCellElement[][];
  colsnum: number = 9;
  rowsnum: number = 9;
  isSelected: boolean = false;
  selectedCell: HTMLTableCellElement;

  constructor(tid: string) {
    this.tableDOM = document.getElementById(tid) as HTMLTableElement;
    this.createEmpty();
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
  }
  render() {
    // this.board[5][5] = 3;
    console.table(this.board);
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
      console.log("color, y, x:", color, y, x);
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
    for (let i = 0; i < this.rowsnum; i++) {
      for (let j = 0; j < this.colsnum; j++) {
        let cell = this.cells[i][j];
        cell.addEventListener("click", (e) => {
          if (this.isSelected) {
            this.selectedCell.classList.remove("selected");
            if (this.selectedCell == cell) {
              this.isSelected = false;
              this.selectedCell = null;
            } else {
              cell.classList.add("selected");
              this.selectedCell = cell;
            }
          } else {
            this.isSelected = true;
            this.selectedCell = cell;
            cell.classList.add("selected");
          }
        });
      }
    }
  }
}
