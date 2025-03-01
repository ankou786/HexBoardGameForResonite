import { Grid, rectangle, Direction } from "honeycomb-grid";

import { Hex } from "honeycomb-grid";

export type CellState = BlankCell | RedCell | BlueCell;

export type BlankCell = {
  type: "blank";
};

export type RedCell = {
  type: "red";
};

export type BlueCell = {
  type: "blue";
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
