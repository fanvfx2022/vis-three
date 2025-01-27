import { Event, Mesh, Object3D } from "three";
import { MODULETYPE } from "../constants";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export interface SolidObject3D extends Object3D<Event> {
  material: Mesh["material"];
  geometry: Mesh["geometry"];
}

export type BasicSolidObjectCompiler = SolidObjectCompiler<
  SolidObjectConfig,
  SolidObject3D
>;
export abstract class SolidObjectCompiler<
  C extends SolidObjectConfig,
  O extends SolidObject3D
> extends ObjectCompiler<C, O> {
  MODULE: MODULETYPE = MODULETYPE.MESH;

  constructor() {
    super();
  }
}
