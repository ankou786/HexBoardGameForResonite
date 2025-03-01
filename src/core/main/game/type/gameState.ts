import { Player } from "./player";
import { StageMap } from "../map";

export type GameState = GameStateLobby | GameStateInGame | GameStateResult;

type GameStateCommon = {
  players: Player[];
};

export type GameStateLobby = GameStateCommon & {
  mode: "lobby";
};

export type GameStateInGame = GameStateCommon & {
  mode: "inGame";
  map: StageMap;
  currentPlayer: string;
};

export type GameStateResult = GameStateCommon & {
  mode: "result";
  winner: string;
};
