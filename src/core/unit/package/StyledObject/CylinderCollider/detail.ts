import {
  DetailBase,
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/miragex/unit/common";

const detail = {
  code: "StyledObject/CylinderCollider",
  propsConfig: {
    enabled: UnitProp.Boolean(true),
    height: UnitProp.Float(1),
    radius: UnitProp.Float(0.5),
    Mass: UnitProp.Float(1),
    CharacterCollider: UnitProp.Boolean(false),
  },
  children: "multi",
} as const satisfies DetailBase;

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
