import{C as d,a as g,g as t}from"./Vis.es.5d3b4fb7.js";import"./three.b90fa353.js";import"./vis-three.78ccfae1.js";const n=new d({width:800,height:160}).draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(206, 42, 230)",e.font=" bold 72px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText("Hello World! 0",400,80)}).preview({top:"10%",left:"10%"}),a=new g().setDom(document.getElementById("app")).setSize().setStats(!0).registerResources({"example.canvas":n.get()}),i=t("AmbientLight"),r=a.dataSupportManager.reactiveConfig(t("CanvasTexture",{url:"example.canvas"})),l=t("SpriteMaterial",{map:r.vid}),s=t("Sprite",{material:l.vid,position:{y:15},scale:{x:25,y:5}}),o=t("Scene",{children:[i.vid,s.vid]});a.applyConfig(i,l,s,o);a.setScene(o.vid).play();let p=0;setInterval(()=>{n.clear().draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(206, 42, 230)",e.font=" bold 72px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText(`Hello World! ${p}`,400,80)}),p+=1,r.needsUpdate=!0},1e3);
