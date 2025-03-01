import { FunctionEnv } from "../../../../../lib/miragex/common/interactionEvent";
import {
  DetailBase,
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/miragex/unit/common";

const detail = {
  code: "GameEvent/TouchButton",
  propsConfig: {
    enabled: UnitProp.Boolean(true),
    onClick: UnitProp.Function((_env: FunctionEnv) => {}),
  },
  children: "multi",
} as const satisfies DetailBase;

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
