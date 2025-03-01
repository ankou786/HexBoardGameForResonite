
import { GameState,GameStateInGame } from "./type";
import { StageMap } from "./map";
import { Cell } from "./map/cell";
import { customLine } from "./map/traverse";
import { HexCoordinates} from "honeycomb-grid";
//import e from "express";
export class Game {
  state: GameState;

  constructor() {
    console.debug("Game created");
    this.state = {
      mode: "lobby",
      players: [],
    };
  }

  addPlayer(playerId: string) {
    if (this.state.players.length >= 2) {
      return;
    }

    if (this.state.players.some((player) => player.id === playerId)) {
      return;
    }

    // if (this.state.players.length === 1) {
    //   playerId = "U-ankouHS";
    // }

    const playerColor: "red" | "blue" = this.state.players.length === 0 ? "red" : "blue";
    const player = {
      id: playerId,
      name: playerId,
      color: playerColor,
    };

    this.state.players.push(player);
  }

  removePlayer(playerId: string) {
    this.state.players = this.state.players.filter(
      (player) => player.id !== playerId,
    );
  }

  startGame() {
    if (this.state.mode !== "lobby" || this.state.players.length < 2) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.state.players.length);
    const currentPlayerId = this.state.players[randomIndex]?.id || "";

    this.state = {
      mode: "inGame",
      players: this.state.players,
      map: new StageMap(),
      currentPlayer: currentPlayerId
    };
    
    for (let q = 0; q <= 11; q++) {
      const redCell = this.state.map.grid.getHex([0, q]);
      if (!redCell) {
        continue;
      }

      redCell.cellState = {
        type: "red",
      };

      const blueCell = this.state.map.grid.getHex([q, -q]);
      if (!blueCell) {
        continue;
      }

      blueCell.cellState = {
        type: "blue",
      };
    }

    for (let q = 0; q <= 10; q++) {
      const redCell = this.state.map.grid.getHex([11, -q]);
      if (!redCell) {
        continue;
      }

      redCell.cellState = {
        type: "red",
      };

      const blueCell = this.state.map.grid.getHex([10-q, q+1]);
      if (!blueCell) {
        continue;
      }

      blueCell.cellState = {
        type: "blue",
      };
    }
  }

  resetGame() {
    this.state = {
      mode: "lobby",
      players: [],
    };
  }

  getPlayers(color: "red" | "blue") {
    const players = this.state.players.filter((player) => player.color === color);
    if (players.length !== 1) {
      return "No player";
    }
    const playerName = players[0]?.name
    return playerName;
  }

  getWinner() {
    if (this.state.mode !== "result") { 
      return ;  
    }
    return this.state.winner; 
  }

  setCellState(cell:Cell, playerId: string) {
  //setCellState(cell:Cell, playerId: string, color: "red" | "blue") {
    if (this.state.mode !== "inGame") {
      return;
    }

    if (!cell) {
      return;
    }

    if (this.state.currentPlayer !== playerId) {
      return;
    }

    const player = this.state.players.find((player) => player.id === playerId);
    if (!player) {
      return;
    }

    cell.cellState = {
      type: player.color,
    };
    // cell.cellState = {
    //   type: color
    // };
  }
  //changePlayer(color: "red" | "blue") {
  changePlayer() {
    if (this.state.mode !== "inGame") {
      return;
    }

    const currentPlayer = this.state.players.find(
      (player) => player.id !== (this.state as GameStateInGame).currentPlayer
    );
    if (!currentPlayer) {
      return;
    }

    //this.checkWin (currentPlayer?.color);
    this.checkWin (currentPlayer.color);
    if (currentPlayer) {
      (this.state as GameStateInGame).currentPlayer = currentPlayer.id;
    }
    console.log("currentPlayer: " + (this.state as GameStateInGame).currentPlayer);
  }

  checkWin (color: "red" | "blue" | undefined) {
    if (this.state.mode !== "inGame") {
      return;
    }
    if(color === undefined){
      return;
    }
    let srcCell: HexCoordinates;
    let dstCell: HexCoordinates;

    if (color === "red") {
      srcCell = [0, 0];
      dstCell = [11, 0];
    } else {
      srcCell = [1, -1];
      dstCell = [9, 2];
    }
    const traverser = this.state.map.grid.traverse(
      customLine({ start: srcCell , stop: dstCell , grid: this.state.map.grid, color: color}),
    );
    console.log(traverser.toArray());
    if (traverser.toArray().length > 2) {
      console.log(color + " win");
      const winner = this.state.players.find(
        (player) => player.color === color
      );
      //const winner = "U-ankou";
      console.log(winner);
      if (winner) {
        this.state = {
          mode: "result",
          players: this.state.players,
          winner: winner.id,
        }
      }
    }
  }

}
