//import { useState } from "react";
import { Slot,LookAtUser } from "../../../unit/package/Primitive/main";
import { Canvas} from "../../../unit/package/PrimitiveUix/main";
import { Game } from "../../game";
import { GameStateInGame } from "../../game/type";
import { Cell } from "../../game/map/cell";
import { CellRender } from "./cell";
import { TouchButton } from "../../../unit/package/GameEvent/main";
import { FunctionEnv } from "../../../../lib/miragex/common/interactionEvent";
import { Sprite,Color, Material } from "../style";
import { StyledImage, StyledText } from "../../../unit/package/StyledUix/main";
export const InGameScene = ({ game }: { game: Game }) => {
  const gameState = game.state as GameStateInGame;
  //const [isToggled, setIsToggled] = useState(false);

  const handleHexClick = (cell: Cell, env: FunctionEnv) => {
    if (cell.cellState.type !== "blank") return; 
    if (gameState.currentPlayer !== env.userId) return;

    game.setCellState(cell, env.userId);
    game.changePlayer();

    // Debug
    // const color = isToggled ? "red" : "blue";
    // game.setCellState(cell, isToggled ? "U-test" : "U-ankou",color );
    //setIsToggled(!isToggled);
    //game.changePlayer(color);
  };

  return (
    <>
    <Slot position={[0, 3, 3]}>
      <LookAtUser invert>
        <Canvas size={[1000, 250]}>
          <StyledImage nineSliceSizing="FixedSize" styledColor={Color.black} styledMaterial={Material.bg} styledSprite={Sprite.circle}>
              <StyledText 
                content={ "Player Turn : " + gameState.currentPlayer }
                horizontalAlign="Center"
                styledColor={Color.white}
                verticalAlign="Middle"
              />
          </StyledImage>
        </Canvas>
      </LookAtUser>
    </Slot> 
    <Slot position={[0, 0, 1]} rotation={[0, -0.7071, 0, 0.7071]} scale={[0.3, 0.3, 0.3]}>
      {/* map */}
        {gameState.map.getHexArray().map((cell: Cell, index: number) => (
          <Slot key={index} name={`${cell.q}-${cell.r}`}>
            <TouchButton onClick={(env: FunctionEnv) => handleHexClick(cell, env)}>
              <CellRender cell={cell} key={index}/>
            </TouchButton>
          </Slot>
        ))}    
    </Slot>
    </>
  );
};
