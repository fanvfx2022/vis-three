import{C as l,a,g as n}from"./Vis.es.5d3b4fb7.js";import"./three.b90fa353.js";import"./vis-three.78ccfae1.js";new l({width:256,height:256}).draw(e=>{e.textBaseline="middle",e.textAlign="center",e.fillStyle="rgb(206, 42, 230)",e.font=" bold 54px \u5FAE\u8F6F\u96C5\u9ED1",e.fillText("CSS3D",128,128)}).preview();const t=new a().install("CSS3DRenderer").complete().setDom(document.getElementById("app")).setStats(!0).registerResources({"examples.css3DObject":document.getElementById("element1")}),s=n("PointLight",{position:{x:30,y:50},distance:100}),i=n("CSS3DPlane",{element:"examples.css3DObject",position:{x:50,y:10},rotation:{y:-(Math.PI/180)*15},scale:{x:.3,y:.3,z:.3}}),o=n("Scene",{children:[s.vid,i.vid]});t.applyConfig(s,i,o);t.setScene(o.vid).play();setTimeout(()=>{t.setSize()},0);console.log(t);window.engine=t;
