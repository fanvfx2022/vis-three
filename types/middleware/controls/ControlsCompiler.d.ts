import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { ControlsAllConfig } from "./ControlsConfig";
export interface ControlsCompilerTarget extends CompilerTarget {
    [key: string]: ControlsAllConfig;
}
export interface ControlsCompilerParameters {
    target?: ControlsCompilerTarget;
    transformControls?: TransformControls;
    orbitControls?: OrbitControls;
}
export declare class ControlsCompiler extends Compiler {
    private target;
    private processorMap;
    private controlMap;
    constructor(parameters?: ControlsCompilerParameters);
    private getAssembly;
    set(vid: string, path: string[], key: string, value: any): this;
    setAll(vid: string): this;
    setTarget(target: ControlsCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    compileAll(): this;
    dispose(): this;
}
