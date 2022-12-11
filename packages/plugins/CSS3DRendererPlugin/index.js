import { ENGINE_EVENT, } from "@vis-three/core";
import { RENDER_EVENT, } from "@vis-three/core/plugin/RenderManagerPlugin/RenderManager";
import { CSS3DObject, CSS3DRenderer, } from "three/examples/jsm/renderers/CSS3DRenderer";
export const CSS3DRendererPlugin = function () {
    let setDomFun;
    let setSizeFun;
    let setSceneFun;
    let renderFun;
    let cacheRender;
    return {
        name: "CSS3DRendererPlugin",
        install(engine) {
            const css3DRenderer = new CSS3DRenderer();
            engine.css3DRenderer = css3DRenderer;
            const domElement = css3DRenderer.domElement;
            domElement.classList.add("vis-css3D");
            domElement.style.position = "absolute";
            domElement.style.top = "0";
            domElement.style.left = "0";
            setDomFun = (event) => {
                event.dom.appendChild(css3DRenderer.domElement);
            };
            setSizeFun = (event) => {
                css3DRenderer.setSize(event.width, event.height);
            };
            setSceneFun = (event) => {
                const oldScene = event.oldScene;
                oldScene.traverse((object) => {
                    if (object instanceof CSS3DObject) {
                        object.element.style.display = "none";
                    }
                });
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            cacheRender = engine.render.bind(engine);
            engine.render = function () {
                cacheRender();
                this.css3DRenderer.render(this.scene, this.camera);
                return this;
            };
        },
        dispose(engine) {
            engine.render = cacheRender;
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.removeEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
        },
        installDeps: {
            RendererManagerPlugin(engine) {
                renderFun = (event) => {
                    engine.css3DRenderer.render(engine.scene, engine.camera);
                };
                engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
            },
        },
        disposeDeps: {
            RendererManagerPlugin(engine) {
                engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
            },
        },
    };
};
