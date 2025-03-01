import { StageMap } from "./map";

export type GameState = GameStateLobby | GameStateInGame | GameStateResult;

type GameStateCommon = {
  players: Player[];
};

export type GameStateLobby = GameStateCommon & {
  mode: "lobby";
  message?: string;
};

export type GameStateInGame = GameStateCommon & {
  mode: "inGame";
  map: StageMap;
  currentPlayer: Player;
  round: number;
};

export type GameStateResult = GameStateCommon & {
  mode: "result";
  map: StageMap;
  winner: string;
};

export type Player = {
    id: string;
    name: string;
    color: "red" | "blue";
  };