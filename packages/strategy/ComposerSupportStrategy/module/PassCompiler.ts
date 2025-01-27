import {
  EffectComposer,
  Pass,
} from "three/examples/jsm/postprocessing/EffectComposer";
import { PassConfigAllType } from "./PassConfig";
import SMAAPassProcessor from "./processor/SMAAPassProcessor";
import UnrealBloomPassProcessor from "./processor/UnrealBloomPassProcessor";
import SelectiveBloomPassProcessor from "./processor/SelectiveBloomPassProcessor";
import { Compiler, EngineSupport, MODULETYPE } from "@vis-three/middleware";
import { EffectComposerEngine } from "@vis-three/effect-composer-plugin";

export interface ComposerSupportEngine
  extends EngineSupport,
    EffectComposerEngine {}

export class PassCompiler extends Compiler<PassConfigAllType, Pass> {
  MODULE: MODULETYPE = MODULETYPE.PASS;

  private composer!: EffectComposer;

  constructor() {
    super();
  }

  useEngine(engine: ComposerSupportEngine): this {
    super.useEngine(engine);

    if (!engine.effectComposer) {
      console.warn(
        `engine need install effectComposer plugin that can use pass compiler.`
      );
      return this;
    }

    this.composer = engine.effectComposer;

    return this;
  }

  add(config: PassConfigAllType) {
    const pass = super.add(config);
    pass && this.composer.addPass(pass);
    return pass;
  }

  remove(config: PassConfigAllType): this {
    if (!this.map.has(config.vid)) {
      console.warn(`PassCompiler can not found this vid pass: ${config.vid}.`);
      return this;
    }

    const pass = this.map.get(config.vid)!;
    this.composer.removePass(pass);

    super.remove(config);
    return this;
  }
}

Compiler.processor(SMAAPassProcessor);
Compiler.processor(UnrealBloomPassProcessor);
Compiler.processor(SelectiveBloomPassProcessor);
