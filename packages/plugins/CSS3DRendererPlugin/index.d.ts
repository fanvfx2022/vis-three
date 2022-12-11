import { Engine, Plugin, RenderManagerEngine } from "@vis-three/core";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export interface CSS3DRendererEngine extends Engine {
    css3DRenderer: CSS3DRenderer;
}
export interface CSS3DAndRenderEngine extends CSS3DRendererEngine, RenderManagerEngine {
}
export declare const CSS3DRendererPlugin: Plugin<CSS3DRendererEngine>;
