import { Game } from "../../game";
import { Canvas, HorizontalLayout } from "../../../unit/package/PrimitiveUix/main";
import { StyledTextUserName } from "../../../unit/package/GameEvent/main";
import { StyledImage, StyledText } from "../../../unit/package/StyledUix/main";
import { Slot } from "../../../unit/package/Primitive/main";
import { Sprite, Color, Material } from "../style";
import { Cell } from "../../game/map";
import { CellRender } from "./cell";
import { GameStateResult } from "../../game/type";

export const ResultScene = ({ game }: { game: Game }) => {
  const currentGameState = game.state as GameStateResult;
  const winner = game.getWinner();

  return (
    <>
    <Slot position={[0, 1.65, 0]}>
      <Canvas size={[1000, 250]}>
        <StyledImage nineSliceSizing="FixedSize" styledColor={Color.black} styledMaterial={Material.bg} styledSprite={Sprite.circle}>
          <HorizontalLayout
            horizontalAlign="Center"
            paddingBottom={5}
            paddingLeft={5}
            paddingRight={5}
            paddingTop={5}
            spacing={5}
          >
            <StyledImage styledSprite={Sprite.resoIcon} />
            <StyledTextUserName
              content="Winner ! : "
              horizontalAlign="Center"
              styledColor={Color.white}
              userID={winner}
              verticalAlign="Middle"
              verticalAutoSize
            />
            <StyledImage styledSprite={Sprite.resoIcon} />
          </HorizontalLayout>
        </StyledImage>
      </Canvas>
    </Slot>
    <Slot position={[0, 0, 1]} rotation={[0, -0.7071, 0, 0.7071]} scale={[0.3, 0.3, 0.3]}>
      {/* map */}
        {currentGameState.map.getHexArray().map((cell: Cell, index: number) => (
          <Slot key={index} name={`${cell.q}-${cell.r}`}>
            <CellRender cell={cell} key={index}/>
          </Slot>
        ))}    
    </Slot>
    </>
  );
};