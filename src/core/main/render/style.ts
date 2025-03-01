import {
  createBoxMesh,
  createCylinderMesh,
  createPBSMetallicMaterial,
  createUiUnlitMaterial,
  createSprite,
  createStyle,
  createColor
} from "../../lib/styledUnit";

export const { StyledSpace, Color, Sprite, Material, Font, Mesh } = createStyle(
  {
    Color: {
      white: createColor([0.98, 0.98, 0.98, 1]),
      black: createColor([0.07, 0.08, 0.11, 1]),
      darkGray: createColor([0.17, 0.18, 0.21, 1]),
      red: createColor([1, 0, 0, 1]),
      blue: createColor([0, 0, 2, 1]),
      buttonNormal: createColor([1, 1, 1, 1]),
      buttonHighlight: createColor([2, 2, 2, 1]),
      buttonPress: createColor([0.75, 0.75, 0.75, 1]),
      buttonDisable: createColor([0.45, 0.45, 0.45, 1]),
    },
    Sprite: {
      circle: createSprite({
        url: "resdb:///427a01c03424b86b4b8ffba936e4eb6cbf4be4d6773fa1f45ec004cfb526d016.png",
        rect: [0, 0, 1, 1],
        borders: [0.5, 0.5, 0.5, 0.5],
        scale: 4,
        filterMode: "Anisotropic",
        wrapModeU: "Clamp",
        wrapModeV: "Clamp",
      }),
      resoIcon: createSprite({
        url: "resdb:///d8d97ca94b4f85e0cdba8f275ea7b5aa447a415b8a730505cf2c0e83214239ed.png",
        rect: [0, 0, 1, 1],
        borders: [0, 0, 0, 0],
        scale: 1,
        filterMode: "Anisotropic",
        wrapModeU: "Clamp",
        wrapModeV: "Clamp",
      }),
    },
    Material: {
      green: createPBSMetallicMaterial({
        albedoColor: [0.1, 0.5, 0.1, 1],
      }),
      red: createPBSMetallicMaterial({
        albedoColor: [0.5, 0.1, 0.1, 1],
      }),
      blue: createPBSMetallicMaterial({
        albedoColor: [0.1, 0.1, 0.5, 1],
      }),
      winRed: createPBSMetallicMaterial({
        albedoColor: [2.5, 0.1, 0.1, 1],
      }),
      winBlue: createPBSMetallicMaterial({
        albedoColor: [0.1, 0.1, 2.5, 1],
      }),
      brown: createPBSMetallicMaterial({
        albedoColor: [0.5, 0.3, 0.1, 1],
      }),
      gray: createPBSMetallicMaterial({
        albedoColor: [0.3, 0.3, 0.3, 1],
      }),
      purple: createPBSMetallicMaterial({
        albedoColor: [0.5, 0.1, 0.5, 1],
      }),
      white: createPBSMetallicMaterial({
        albedoColor: [0.1, 0.1, 0.1, 1],
      }),
      bg: createUiUnlitMaterial({
        offsetFactor: 10,
        offsetUnits: 100,
      }),
    },
    Font: {},
    Mesh: {
      hex: createCylinderMesh({
        height: 0.1,
        radius: 0.99,
        sides: 6,
        flatShading: true,
      }),
      block: createBoxMesh({
        size: [0.2, 0.2, 0.6],
      }),
    },
  },
);
