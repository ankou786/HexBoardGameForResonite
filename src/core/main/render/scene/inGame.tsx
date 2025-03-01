import { useCallback} from "react";
import { Slot,LookAtUser } from "../../../unit/package/Primitive/main";
import { Canvas} from "../../../unit/package/PrimitiveUix/main";
import { Game } from "../../game";
import { GameStateInGame } from "../../game/type";
import { Cell } from "../../game/map";
import { CellRender } from "./cell";
import { TouchButton, StyledTextUserName } from "../../../unit/package/GameEvent/main";
import { FunctionEnv } from "../../../../lib/miragex/common/interactionEvent";
import { Sprite,Color, Material } from "../style";
import { StyledImage, StyledText } from "../../../unit/package/StyledUix/main";

export const InGameScene = ({ game,effect }: {game:Game,effect:()=>void }) => {
  const currentGameState = game.state as GameStateInGame;

  const handleHexClick = useCallback((cell: Cell, env: FunctionEnv) => {
    if (currentGameState.currentPlayer.id !== env.userId) {
      console.log("not your turn:",currentGameState.currentPlayer, env.userId);
      return;
    }
    game.setCellState(cell, env.userId);
    effect();
  }, []);

  return (
    <>
    <Slot position={[0, 3, 3]}>
      <LookAtUser invert>
        <Canvas size={[1000, 250]}>
          <StyledImage nineSliceSizing="FixedSize" styledColor={Color.black} styledMaterial={Material.bg} styledSprite={Sprite.circle}>
              <StyledTextUserName
                content="Player Turn : "
                horizontalAlign="Center"
                horizontalAutoSize
                styledColor={Color.white}
                userID={currentGameState.currentPlayer.name}
                verticalAlign="Middle"
                verticalAutoSize                
              />
          </StyledImage>
        </Canvas>
      </LookAtUser>
    </Slot> 
    <Slot position={[0, 0, 1]} rotation={[0, -0.7071, 0, 0.7071]} scale={[0.3, 0.3, 0.3]}>
      {/* map */}
        {currentGameState.map.getHexArray().map((cell: Cell, index: number) => (
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
