import { CONFIGTYPE } from "../constants/CONFIGTYPE";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface Object3DConfig extends ObjectConfig {}

export const getObject3DConfig = function (): Object3DConfig {
  return Object.assign(getObjectConfig(), {
    type: CONFIGTYPE.OBJECT3D,
  });
};
