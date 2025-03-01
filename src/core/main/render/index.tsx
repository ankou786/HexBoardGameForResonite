import { useCallback, useEffect, useRef, useState } from "react";
import { Slot } from "../../unit/package/Primitive/main";
import { Game } from "../game";
import { FunctionEnv } from "../../../lib/miragex/common/interactionEvent";
import { Canvas, VerticalLayout, HorizontalLayout, LayoutElement } from "../../unit/package/PrimitiveUix/main";
import { StyledButton, StyledImage, StyledText } from "../../unit/package/StyledUix/main";
import { SceneRender } from "./scene";
import { StyledSpace, Sprite, Color, Material } from "./style";
import { StyledTextUserName } from "../../unit/package/GameEvent/main";

export const Main = () => {
  const [, setTime] = useState(0);
  const effect = useCallback(() => {
    setTime(performance.now());
  }, []);

  const gameRef = useRef<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    gameRef.current = new Game();
    setGameMode(gameRef.current.state.mode);
    setIsLoading(false);
  }, []);

  const [redPlayer, setRedPlayer] = useState<string>("No player");
  const [bluePlayer, setBluePlayer] = useState<string>("No player");
  const [gameMode, setGameMode] = useState<string>("lobby");

  const joinPlayer = useCallback(async (env: FunctionEnv) => {
    gameRef.current?.addPlayer(env.userId);
    updatePlayers();
    effect();
  }, []);

  const leavePlayer = useCallback((env: FunctionEnv) => {
    gameRef.current?.removePlayer(env.userId);
    updatePlayers();
    effect();
  }, []);

  const startGame = useCallback(() => {
    gameRef.current?.startGame();
    if (gameRef.current) {
      setGameMode(gameRef.current.state.mode);
      effect();
    }
  }, [gameRef.current]);

  const resetGame = useCallback(() => {
    gameRef.current?.resetGame();
    if (gameRef.current) {
      setGameMode(gameRef.current.state.mode);
      setRedPlayer("No player");
      setBluePlayer("No player");
      effect();
    }
  }, []);

  const updatePlayers = useCallback(() => {
    if (gameRef.current) {
      const redPlayer = gameRef.current.getPlayers("red");
      const bluePlayer = gameRef.current.getPlayers("blue");

      if (redPlayer) {
        setRedPlayer(redPlayer);
      }
      if (bluePlayer) {
        setBluePlayer(bluePlayer);
      }
    }
    effect();
  }, []);

  if (isLoading) {
    console.log("Loading...");
    return <></>;
  }

  if (!gameRef.current) {
    console.error("Game is not created");
    return <></>;
  }

  return (
    <StyledSpace>
      <Slot position={[0, 1, 0]}>
        <Canvas>
          <StyledImage nineSliceSizing="FixedSize" styledColor={Color.black} styledMaterial={Material.bg} styledSprite={Sprite.circle}>
            <VerticalLayout
              horizontalAlign="Center"
              paddingBottom={5}
              paddingLeft={5}
              paddingRight={5}
              paddingTop={5}
              spacing={5}
            >
              <HorizontalLayout>
                <LayoutElement minWidth={380}>
                  <StyledText
                    content="Player Red : "
                    horizontalAlign="Center"
                    styledColor={Color.red}
                    verticalAlign="Middle"
                    verticalAutoSize
                  />
                </LayoutElement>
                <LayoutElement minWidth={500}>
                  <StyledTextUserName
                    content={redPlayer === "No player" ? "No player" : ""}
                    horizontalAlign="Center"
                    styledColor={Color.white}
                    userID={redPlayer}
                    verticalAlign="Middle"
                    verticalAutoSize
                  />
                </LayoutElement>
              </HorizontalLayout>
              <HorizontalLayout>
                <LayoutElement minWidth={380}>
                  <StyledText
                    content="Player Blue : "
                    horizontalAlign="Center"
                    styledColor={Color.blue}
                    verticalAlign="Middle"
                    verticalAutoSize
                  />
                </LayoutElement>
                <LayoutElement minWidth={500}>
                  <StyledTextUserName
                    content={bluePlayer === "No player" ? "No player" : ""}
                    horizontalAlign="Center"
                    styledColor={Color.white}
                    userID={bluePlayer}
                    verticalAlign="Middle"
                    verticalAutoSize
                  />
                </LayoutElement>
              </HorizontalLayout>
              <StyledButton
                enabled={gameMode === "lobby"}
                nineSliceSizing="FixedSize"
                onClick={joinPlayer}
                styledColor={Color.darkGray}
                styledDisableColor={Color.buttonDisable}
                styledHighlightColor={Color.buttonHighlight}
                styledNormalColor={Color.buttonNormal}
                styledPressColor={Color.buttonPress}
                styledSprite={Sprite.circle}
              >
                <StyledText
                  content="Join"
                  horizontalAlign="Center"
                  styledColor={Color.white}
                  verticalAlign="Middle"
                />
              </StyledButton>
              <StyledButton
                enabled={gameMode === "lobby"}
                nineSliceSizing="FixedSize"
                onClick={leavePlayer}
                styledColor={Color.darkGray}
                styledDisableColor={Color.buttonDisable}
                styledHighlightColor={Color.buttonHighlight}
                styledNormalColor={Color.buttonNormal}
                styledPressColor={Color.buttonPress}
                styledSprite={Sprite.circle}
              >
                <StyledText
                  content="Leave"
                  horizontalAlign="Center"
                  styledColor={Color.white}
                  verticalAlign="Middle"
                />
              </StyledButton>
              <StyledButton
                enabled={gameMode === "lobby"}
                nineSliceSizing="FixedSize"
                onClick={startGame}
                styledColor={Color.darkGray}
                styledDisableColor={Color.buttonDisable}
                styledHighlightColor={Color.buttonHighlight}
                styledNormalColor={Color.buttonNormal}
                styledPressColor={Color.buttonPress}
                styledSprite={Sprite.circle}
              >
                <StyledText
                  content="Start"
                  horizontalAlign="Center"
                  styledColor={Color.white}
                  verticalAlign="Middle"
                />
              </StyledButton>
              <StyledButton
                nineSliceSizing="FixedSize"
                onClick={resetGame}
                styledColor={Color.darkGray}
                styledDisableColor={Color.buttonDisable}
                styledHighlightColor={Color.buttonHighlight}
                styledNormalColor={Color.buttonNormal}
                styledPressColor={Color.buttonPress}
                styledSprite={Sprite.circle}
              >
                <StyledText
                  content="Reset"
                  horizontalAlign="Center"
                  styledColor={Color.white}
                  verticalAlign="Middle"
                />
              </StyledButton>
            </VerticalLayout>
          </StyledImage>
        </Canvas>
      </Slot>
      <SceneRender effect={effect} game={gameRef.current} />
    </StyledSpace>
  );
};