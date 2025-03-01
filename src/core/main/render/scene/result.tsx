import { Game } from "../../game";
import { Canvas, HorizontalLayout } from "../../../unit/package/PrimitiveUix/main";
import { StyledImage, StyledText } from "../../../unit/package/StyledUix/main";
import { Slot } from "../../../unit/package/Primitive/main";
import { Sprite,Color, Material } from "../style";

export const ResultScene = ({ game }: { game: Game }) => {
  const winner = game.getWinner();
  return (
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
            <StyledImage styledSprite={Sprite.resoIcon}/>
            <StyledText 
              content={ "Winner ! : " + winner }
              horizontalAlign="Center"
              styledColor={Color.white}
              verticalAlign="Middle"
            />
            <StyledImage styledSprite={Sprite.resoIcon}/>
          </HorizontalLayout>
        </StyledImage>
      </Canvas>
    </Slot>
  );
};
