
import { GameState,GameStateInGame } from "./type";
import { StageMap } from "./map";
import { Cell } from "./map";
import { customLine } from "./traverse";
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
    if (this.state.mode !== "lobby") {
      return;
    }
    if (this.state.players.length >= 2) {
      this.state.message = "The game is full";
      return;
    }

    if (this.state.players.some((player) => player.id === playerId)) {
      this.state.message = "You are already in the game";
      return;
    }

    // if (this.state.players.length === 1) {
    //   playerId = "U-ankouHS aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
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
    if (this.state.mode !== "lobby") return 
    
    if(this.state.players.length < 2) {
      this.state.message = "Not enough players";
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.state.players.length);
    const currentPlayer = this.state.players[randomIndex];
    if (!currentPlayer) return

    this.state = {
      mode: "inGame",
      players: this.state.players,
      map: new StageMap(),
      currentPlayer: currentPlayer
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
    if (this.state.mode !== "inGame") {
      return;
    }

    if (!cell) {
      return;
    }

    const player = this.state.players.find((player) => player.id === playerId);
    if (!player) {
      return;
    }
    //console.log("player: " + player.color);

    cell.cellState = {
      type: player.color,
    };
  }

  changePlayer() {
    if (this.state.mode !== "inGame") {
      return;
    }
    const currentPlayer = this.state.players.find(
      (player) => player.id === (this.state as GameStateInGame).currentPlayer.id
    );
    if (!currentPlayer) {
      return;
    }
    //console.log("change player: " + currentPlayer.color);
    this.checkWin (currentPlayer.color);
    if (this.state.mode === "inGame") {
      const nextPlayer = this.state.players.find(
        (player) => player.id !== (this.state as GameStateInGame).currentPlayer.id
      );
      if (nextPlayer) {
        (this.state as GameStateInGame).currentPlayer = nextPlayer;
      }
    }
  }

  checkWin (color: "red" | "blue" | undefined) {
    if (this.state.mode !== "inGame") {
      return;
    }
    const map = this.state.map;
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
    //console.log("check win: " + srcCell, color);
    const traverser = map.grid.traverse(
      customLine({ start: srcCell , stop: dstCell , grid: map.grid, color: color}),
    );
    //console.log(traverser.toArray());
    const traversedCells = traverser.toArray();
    if (traversedCells.length > 2) {
      //console.log(color + " win");
      const winner = this.state.players.find(
        (player) => player.color === color
      );
      traversedCells.forEach((cell) => {
        const mapCell = map.grid.getHex(cell);
        if (mapCell) {
          mapCell.cellState = {
            type: color === "red" ? "winRed" : "winBlue",
          };
        }
      });
      if (winner) {
        this.state = {
          mode: "result",
          players: this.state.players,
          map: this.state.map,
          winner: winner.id,
        }
      }
    }
  }

}
