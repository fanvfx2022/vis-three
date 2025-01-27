import { Engine, EngineOptions } from "@vis-three/core";
import {
  LoaderManager,
  LoaderManagerPlugin,
  LoadUnit,
} from "@vis-three/loader-manager-plugin";
import {
  PointerManager,
  PointerManagerEngine,
  PointerManagerPlugin,
} from "@vis-three/pointer-manager-plugin";
import {
  EventManager,
  EventManagerEngine,
  EventManagerPlugin,
} from "@vis-three/event-manager-plugin";
import {
  RenderManager,
  RenderManagerEngine,
  RenderManagerPlugin,
} from "@vis-three/render-manager-plugin";
import {
  DataSupportEngine,
  DataSupportManager,
  DataSupportManagerParameters,
  DataSupportManagerPlugin,
  LoadOptions,
} from "../plugin/DataSupportManagerPlugin";
import { MODULETYPE } from "../constants";
import {
  MappedEvent,
  ResourceManager,
  ResourceManagerEngine,
  ResourceManagerPlugin,
} from "../plugin/ResourceManagerPlugin";
import { SymbolConfig } from "../common";
import { LoaderDataSupportStrategy } from "../strategy/LoaderDataSuportStrategy";
import {
  LoaderMappingEngine,
  LoaderMappingStrategy,
} from "../strategy/LoaderMappingStrategy";
import {
  CompilerManager,
  CompilerManagerEngine,
  CompilerManagerPlugin,
} from "../plugin/CompilerManagerPlugin";
import { Scene } from "three";
import { SceneCompiler } from "../scene";
import { CameraCompiler } from "../camera";
import { CompilerSupportStrategy } from "../strategy/CompilerSupportStrategy";

export type EngineSupportParameters = DataSupportManagerParameters;

export interface EngineSupportLoadOptions extends LoadOptions {
  assets?: string[];
}

export class EngineSupport
  extends Engine
  implements
    PointerManagerEngine,
    EventManagerEngine,
    RenderManagerEngine,
    DataSupportEngine,
    CompilerManagerEngine,
    LoaderMappingEngine
{
  declare loaderManager: LoaderManager;
  declare eventManager: EventManager;
  declare renderManager: RenderManager;
  declare play: () => void;
  declare stop: () => void;
  declare render: (delta: number) => this;
  declare pointerManager: PointerManager;
  declare resourceManager: ResourceManager;
  declare registerResources: (
    resourceMap: Record<string, unknown>
  ) => ResourceManagerEngine;
  declare dataSupportManager: DataSupportManager;
  declare applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
  declare getConfigBySymbol: (vid: string) => SymbolConfig | null;
  declare removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
  declare toJSON: () => string;
  declare exportConfig: () => LoadOptions;
  declare compilerManager: CompilerManager;
  declare getObjectSymbol: (object: any) => string | null;
  declare getObjectBySymbol: (vid: string) => any;
  declare loadResources: (
    urlList: LoadUnit[],
    callback: (err: Error | undefined, event?: MappedEvent | undefined) => void
  ) => this;
  declare loadResourcesAsync: (urlList: LoadUnit[]) => Promise<MappedEvent>;

  constructor(
    parameters: EngineSupportParameters = {},
    resources: { [key: string]: any } = {}
  ) {
    super();
    this.install(LoaderManagerPlugin())
      .install(PointerManagerPlugin())
      .install(EventManagerPlugin())
      .install(RenderManagerPlugin())
      .install(ResourceManagerPlugin({ resources }))
      .install(DataSupportManagerPlugin(parameters))
      .install(CompilerManagerPlugin());

    this.exec(LoaderDataSupportStrategy())
      .exec(LoaderMappingStrategy())
      .exec(CompilerSupportStrategy());
  }

  private loadLifeCycle(config: Omit<EngineSupportLoadOptions, "assets">) {
    const dataSupportManager = this.dataSupportManager;

    // 生成贴图
    config.texture && dataSupportManager.load({ texture: config.texture });

    // 生成材质
    config.material && dataSupportManager.load({ material: config.material });

    // 其他
    delete config.texture;
    delete config.material;

    dataSupportManager.load(config);
  }

  private removeLifeCycle(config: EngineSupportLoadOptions) {
    const dataSupportManager = this.dataSupportManager;
    const texture = config[MODULETYPE.TEXTURE] || [];
    const material = config[MODULETYPE.MATERIAL] || [];
    const assets = config.assets || [];

    delete config.texture;
    delete config.material;
    delete config.assets;

    // 先删物体
    dataSupportManager.remove(config);
    // 再删材质
    dataSupportManager.remove({ [MODULETYPE.MATERIAL]: material });
    // 再删贴图
    dataSupportManager.remove({ [MODULETYPE.TEXTURE]: texture });
    // 再清空外部资源缓存
    const resourceManager = this.resourceManager;
    const loaderManager = this.loaderManager;
    assets.forEach((url) => {
      resourceManager.remove(url);
      loaderManager.remove(url);
    });
  }

  loadConfig(
    config: EngineSupportLoadOptions,
    callback?: (event?: MappedEvent) => void
  ): this {
    const renderFlag = this.renderManager.hasRendering();

    if (renderFlag) {
      this.renderManager.stop();
    }

    // 导入外部资源
    if (config.assets && config.assets.length) {
      const mappedFun = (event: MappedEvent) => {
        delete config.assets;
        this.loadLifeCycle(config);

        this.resourceManager.removeEventListener("mapped", mappedFun);
        callback && callback(event);
        if (renderFlag) {
          this.renderManager.play();
        } else {
          this.renderManager.render();
        }
      };

      this.resourceManager.addEventListener<MappedEvent>("mapped", mappedFun);
      this.loaderManager.reset().load(config.assets);
    } else {
      this.loadLifeCycle(config);
      callback && callback();

      if (renderFlag) {
        this.renderManager.play();
      } else {
        this.renderManager.render();
      }
    }

    return this;
  }

  loadConfigAsync(
    config: EngineSupportLoadOptions
  ): Promise<MappedEvent | undefined> {
    return new Promise((resolve, reject) => {
      const renderFlag = this.renderManager!.hasRendering();

      if (renderFlag) {
        this.renderManager.stop();
      }
      // 导入外部资源
      if (config.assets && config.assets.length) {
        const mappedFun = (event: MappedEvent) => {
          delete config.assets;
          this.loadLifeCycle(config);

          this.resourceManager.removeEventListener("mapped", mappedFun);
          if (renderFlag) {
            this.renderManager.play();
          } else {
            this.renderManager.render();
          }
          resolve(event);
        };

        this.resourceManager.addEventListener<MappedEvent>("mapped", mappedFun);
        this.loaderManager.reset().load(config.assets);
      } else {
        this.loadLifeCycle(config);
        if (renderFlag) {
          this.renderManager.play();
        } else {
          this.renderManager.render();
        }
        resolve(undefined);
      }
    });
  }

  removeConfig(config: EngineSupportLoadOptions) {
    this.removeLifeCycle(config);
  }

  getObjectConfig<O, C extends SymbolConfig>(object: O): C | null {
    const symbol = this.getObjectSymbol(object);

    if (symbol) {
      return this.getConfigBySymbol(symbol) as C | null;
    } else {
      return null;
    }
  }

  setCameraBySymbol(camera: string) {
    const compiler = this.compilerManager.getCompiler<CameraCompiler>(
      MODULETYPE.CAMERA
    )!;
    if (compiler.map.has(camera)) {
      this.setCamera(compiler.map.get(camera)!);
    } else {
      console.warn("can not found camera", camera);
    }
    return this;
  }

  setSceneBySymbol(scene: string): this {
    const compiler = this.compilerManager.getCompiler<SceneCompiler>(
      MODULETYPE.SCENE
    )!;
    if (compiler.map.has(scene)) {
      this.setScene(compiler.map.get(scene)!);
    } else {
      console.warn("can not found scene", scene);
    }
    return this;
  }
}

export const defineEngineSupport = function (options: EngineOptions) {
  const engine = new EngineSupport();

  if (options.plugins) {
    options.plugins.forEach((plugin) => {
      engine.install(plugin);
    });
  }

  if (options.strategy) {
    options.strategy.forEach((strategy) => {
      engine.exec(strategy);
    });
  }

  return engine;
};
