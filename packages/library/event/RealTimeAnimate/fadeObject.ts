import { Tween } from "@tweenjs/tween.js";
import {
  BasicEventConfig,
  EngineSupport,
  EventGenerator,
  MaterialConfig,
  MeshConfig,
  ObjectEvent,
  RenderEvent,
} from "@vis-three/middleware";
import { Material } from "three";
import { timingFunction, TIMINGFUNCTION } from "./common";

export interface FadeObject extends BasicEventConfig {
  params: {
    target: string;
    direction: "in" | "out";
    delay: number;
    duration: number;
    timingFunction: TIMINGFUNCTION;
    visible: boolean;
  };
}

export const config: FadeObject = {
  name: "fadeObject",
  params: {
    target: "",
    direction: "out",
    delay: 0,
    duration: 300,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
    visible: true,
  },
};

export const generator: EventGenerator<FadeObject> = function (
  engine: EngineSupport,
  config: FadeObject
): (event?: ObjectEvent) => void {
  const params = config.params;
  const target = engine.getObjectBySymbol(params.target)!;

  // TODO: css3D
  if (!target) {
    console.warn(
      `real time animation fadeObject: can not found vid object: ${params.target}`
    );
    return () => {};
  }

  const objectConfig = engine.getObjectConfig(target) as MeshConfig;

  if (!objectConfig.material) {
    console.warn(
      `real time animation fadeObject: target can not support fade: ${params.target}`
    );
    return () => {};
  }

  const materialList: Material[] = [];
  const materialConfigList: MaterialConfig[] = [];

  const materialSymbolList = Array.isArray(objectConfig.material)
    ? ([] as string[]).concat(objectConfig.material)
    : [objectConfig.material];

  for (const vid of materialSymbolList) {
    const material = engine.getObjectBySymbol(vid);
    const materialConfig = engine.getConfigBySymbol(vid) as MaterialConfig;

    if (!(material instanceof Material)) {
      console.error(
        `real time animation fadeObject: object config material is not instanceof Material: ${vid}`
      );
      continue;
    }

    if (!materialConfig) {
      console.error(
        `real time animation fadeObject: object config material can not found config: ${vid}`
      );
      continue;
    }

    materialList.push(material);
    materialConfigList.push(materialConfig);
  }

  // 防止重复触发
  let animating = false;

  return () => {
    if (animating) {
      return;
    }

    animating = true;

    const renderManager = engine.renderManager!;

    objectConfig.visible = true;

    materialList.forEach((material, i, arr) => {
      material.visible = true;
      material.transparent = true;
      material.opacity = params.direction === "in" ? 0 : 1;
      material.needsUpdate = true;

      const tween = new Tween(material)
        .to({
          opacity: params.direction === "in" ? 1 : 0,
        })
        .duration(params.duration)
        .delay(params.delay)
        .easing(timingFunction[params.timingFunction])
        .start();

      const renderFun = (event: RenderEvent) => {
        tween.update();
      };

      renderManager.addEventListener<RenderEvent>("render", renderFun);

      tween.onComplete(() => {
        renderManager.removeEventListener<RenderEvent>("render", renderFun);
        if (params.direction === "out" && params.visible) {
          materialConfigList[i].visible = false;
          objectConfig.visible = false;
        } else if (params.direction === "in" && params.visible) {
          materialConfigList[i].visible = true;
          objectConfig.visible = true;
        }

        materialConfigList[i].opacity = params.direction === "in" ? 1 : 0;

        animating = false;
      });
    });
  };
};
