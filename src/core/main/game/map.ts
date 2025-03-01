import { Grid, rectangle, Direction } from "honeycomb-grid";

import { Hex } from "honeycomb-grid";

export type CellState = {
  type: "blank" | "red" | "blue" | "winRed" | "winBlue";
};

export class Cell extends Hex {
  cellState: CellState = { type: "blank" };

  get tuple() {
    return [this.q, this.r] as [number, number];
  }

  get point() {
    return [this.x, 0, this.y] as [number, number, number];
  }
}

export class StageMap {
  grid: Grid<Cell>;

  constructor() {
    this.grid = new Grid(Cell, rectangle({start: [0, 0],width: 12,height: 12,direction: Direction.NE}));
  }

  getHexArray() {
    return this.grid.toArray();
  }
}
