import { Grid, rectangle, Direction } from "honeycomb-grid";
import { Cell } from "./cell";

export class StageMap {
  grid: Grid<Cell>;

  constructor() {
    this.grid = new Grid(Cell, rectangle({start: [0, 0],width: 12,height: 12,direction: Direction.NE}));
  }

  getHexArray() {
    return this.grid.toArray();
  }
}
