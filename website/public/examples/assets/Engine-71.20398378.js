import{E as s}from"./Vis.es.5d3b4fb7.js";import{a2 as n,q as r,M as i,i as o,o as l}from"./three.b90fa353.js";import"./vis-three.78ccfae1.js";const t=new s().install("WebGLRenderer",{antialias:!0,alpha:!0}).install("RenderManager").install("Stats").install("EffectComposer",{WebGLMultisampleRenderTarget:!0}).install("OrbitControls").install("PointerManager").install("EventManager").install("TransformControls").complete().setDom(document.getElementById("app")).setStats(!0).setScene(new n),e=new r;e.position.set(50,50,50);t.addEventListener("setSize",a=>{e.aspect=a.width/a.height,e.updateProjectionMatrix()});const m=new i(new o(30,30,30),new l);t.scene.add(m);t.setCamera(e).setSize().play();
