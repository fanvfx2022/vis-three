import{C as c,T as d,a as v,g as t}from"../Vis.es.fa503373.js";import{g as s}from"../vue.esm.browser.min.816a6d7c.js";import"../three.b90fa353.js";import"../vis-three.78ccfae1.js";const r=new c({width:800,height:160}).preview({top:"5%",left:"5%"}),m=new d({},{canvasExtends:!0}),a=new v({textureDataSupport:m}).registerResources({"example.canvas":r.get()}),i=t("AmbientLight"),n=a.reactiveConfig(s.observable(t("CanvasTexture",{url:"example.canvas",canvasExtends:{number:0,text:"Hello World"}},!1))),o=t("SpriteMaterial",{map:n.vid}),p=t("Sprite",{material:o.vid,position:{y:15},scale:{x:25,y:5}}),l=t("Scene",{children:[i.vid,p.vid]});a.applyConfig(i,n,o,p,l);new s({el:"#app",data(){return{canvasTexture:n}},methods:{updateCanvas(){r.clear().draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(206, 42, 230)",e.font=" bold 72px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText(`${this.canvasTexture.canvasExtends.text} ${this.canvasTexture.canvasExtends.number} `,400,80)}),this.canvasTexture.needsUpdate=!0}},mounted(){this.updateCanvas(),a.setDom(document.getElementById("app")).setSize().setScene(l.vid).play()}});