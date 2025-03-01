import { Game } from "../../game";
import { InGameScene } from "./inGame";
import { LobbyScene } from "./lobby";
import { ResultScene } from "./result";


export const SceneRender = ({ game,effect }: {game:Game,effect:()=>void }) => {
  switch (game.state.mode) {
    case "lobby":
      return <LobbyScene game={game} />;
    case "inGame":
      return <InGameScene effect={effect} game={game} />;
    case "result":
      return <ResultScene game={game} />;
    default:
      return <></>;
  }
};