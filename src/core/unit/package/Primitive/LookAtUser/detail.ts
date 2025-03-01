import {
  DetailBase,
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/miragex/unit/common";

const detail = {
  code: "Primitive/LookAtUser",
  propsConfig: {
    enabled: UnitProp.Boolean(true),
    targetAtLocalUser: UnitProp.Boolean(true),
    invert: UnitProp.Boolean(false),
    sourcePositionOffset: UnitProp.Float3([0, 0, 0]),
    rotationOffset: UnitProp.FloatQ([0, 0, 0, 1]),
    axis: UnitProp.Float3([0, 0, 0]),
  },
  children: "multi",
} as const satisfies DetailBase;

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
