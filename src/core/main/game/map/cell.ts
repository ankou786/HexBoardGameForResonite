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
  isBlocked: boolean = false;

  get tuple() {
    return [this.q, this.r] as [number, number];
  }

  get point() {
    return [this.x, 0, this.y] as [number, number, number];
  }
}
