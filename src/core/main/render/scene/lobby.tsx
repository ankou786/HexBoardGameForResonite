import { Game } from "../../game";
import { Canvas } from "../../../unit/package/PrimitiveUix/main";
import { StyledImage, StyledText } from "../../../unit/package/StyledUix/main";
import { Slot } from "../../../unit/package/Primitive/main";
import { Sprite, Color, Material } from "../style";
import { GameStateLobby } from "../../game/type";

export const LobbyScene = ({ game }: {game:Game }) => {
  const currentGameState = game.state as GameStateLobby;
  //console.log("message:", currentGameState.message);
  return (
    <>
      {currentGameState.message && (
        <Slot position={[0, 1.65, 0]}>
          <Canvas size={[1000, 250]}>
            <StyledImage nineSliceSizing="FixedSize" styledColor={Color.black} styledMaterial={Material.bg} styledSprite={Sprite.circle}>
              <StyledText
                content={currentGameState.message}
                horizontalAlign="Center"
                styledColor={Color.white}
                verticalAlign="Middle"
              />
            </StyledImage>
          </Canvas>
        </Slot>
      )}
    </>
  )
};
