import { StageMap } from "./map";

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
  currentPlayer: Player;
};

export type GameStateResult = GameStateCommon & {
  mode: "result";
  winner: string;
};

export type Player = {
    id: string;
    name: string;
    color: "red" | "blue";
  };