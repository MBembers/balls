import { coords } from "./interfaces";

export class Pathfinder {
  searchMatrix: number[][];
  found: boolean = false;
  start: coords;
  end: coords;

  constructor(matrix: number[][]) {
    this.setMatrix(matrix);
  }

  setMatrix(matrix: number[][]) {
    this.searchMatrix = new Array(matrix.length);
    for (let i = 0; i < matrix.length; i++) {
      this.searchMatrix[i] = new Array(matrix[i].length);
      for (let j = 0; j < matrix[i].length; j++) {
        this.searchMatrix[i][j] = matrix[i][j] == 0 ? 0 : -1;
      }
    }
  }
  findShortestPath(start: coords, end: coords, matrix?: number[][]): coords[] {
    let currStep = 1;
    // start = start;
    this.end = end;
    this.found = false;
    if (matrix) this.setMatrix(matrix);

    // console.log("BALLS");
    // console.table(matrix);

    let ended = false;
    let toCheck: coords[] = [];

    if (
      (start.x === end.x && start.y === end.y) ||
      this.searchMatrix[end.y][end.x] !== 0
    )
      return [];

    if (start.y - 1 >= 0) toCheck.push({ x: start.x, y: start.y - 1 });
    if (start.x + 1 < this.searchMatrix[start.y].length)
      toCheck.push({ x: start.x + 1, y: start.y });
    if (start.y + 1 < this.searchMatrix.length)
      toCheck.push({ x: start.x, y: start.y + 1 });
    if (start.x - 1 >= 0) toCheck.push({ x: start.x - 1, y: start.y });

    while (ended == false) {
      let didChange = false;
      let newToCheck: coords[] = [];
      for (let checkCell of toCheck) {
        if (checkCell.x == this.end.x && checkCell.y == this.end.y) {
          ended = true;
          this.found = true;
        }
        if (
          this.searchMatrix[checkCell.y][checkCell.x] == 0 &&
          !(checkCell.y === start.y && checkCell.x === start.x)
        ) {
          this.searchMatrix[checkCell.y][checkCell.x] = currStep;
          didChange = true;

          if (checkCell.y - 1 >= 0)
            newToCheck.push({ x: checkCell.x, y: checkCell.y - 1 });
          if (checkCell.x + 1 < this.searchMatrix[checkCell.y].length)
            newToCheck.push({ x: checkCell.x + 1, y: checkCell.y });
          if (checkCell.y + 1 < this.searchMatrix.length)
            newToCheck.push({ x: checkCell.x, y: checkCell.y + 1 });
          if (checkCell.x - 1 >= 0)
            newToCheck.push({ x: checkCell.x - 1, y: checkCell.y });
        }
      }

      toCheck = [];
      toCheck = [...newToCheck];
      if (!didChange) ended = true;
      currStep++;
    }
    console.log("PATHS", this.found);
    // console.table(this.searchMatrix);
    if (this.found) {
      let currX = this.end.x;
      let currY = this.end.y;
      let path: coords[] = [];
      currStep = this.searchMatrix[currY][currX];
      console.table(this.searchMatrix);
      while (!(start.x == currX && start.y == currY)) {
        // console.log("start:", start.x, start.y);
        let stepped = false;
        console.log("curr:", currX, currY);
        console.log("start: ", start.x, start.y);
        path.push({ x: currX, y: currY });
        if (currY - 1 >= 0 && !stepped) {
          if (
            (this.searchMatrix[currY - 1][currX] === currStep - 1 &&
              currStep > 1) ||
            (start.x === currX && start.y === currY - 1)
          ) {
            currY--;
            stepped = true;
          }
        }
        if (currY + 1 < this.searchMatrix.length && !stepped) {
          if (
            (this.searchMatrix[currY + 1][currX] === currStep - 1 &&
              currStep > 1) ||
            (start.x === currX && start.y === currY + 1)
          ) {
            currY++;
            stepped = true;
          }
        }
        if (currX - 1 >= 0 && !stepped) {
          if (
            (this.searchMatrix[currY][currX - 1] === currStep - 1 &&
              currStep > 1) ||
            (start.x === currX - 1 && start.y === currY)
          ) {
            currX--;
            stepped = true;
          }
        }
        if (currX + 1 < this.searchMatrix[currY].length && !stepped) {
          if (
            (this.searchMatrix[currY][currX + 1] === currStep - 1 &&
              currStep > 1) ||
            (start.x === currX + 1 && start.y === currY)
          ) {
            currX++;
            stepped = true;
          }
        }
        currStep--;
      }
      return path;
    } else {
      return [];
    }
    return [];
  }
  // step(cell: coords, currStep: number) {
  //   if (cell == this.end) return;

  // }
  // check(checkCell: coords, toStep: coords[], currStep: number) {
  //   if (checkCell == this.end) this.found = true;
  //   if (this.searchMatrix[checkCell.y][checkCell.x] == 0) {
  //     this.searchMatrix[checkCell.y][checkCell.x] = currStep;
  //     toStep.push({ x: checkCell.x, y: checkCell.y });
  //   }
  // }
}
