import{M as d,B as o}from"./Vis.es.5d3b4fb7.js";import{p as c,M as n,i as p,o as m,J as l,l as w,f as g,h as u}from"./three.b90fa353.js";import"./vis-three.78ccfae1.js";const s=new d().setDom(document.getElementById("app")).setSize().setStats(!0).play(),t=s.scene,i=new c("rgb(255, 255, 255)",1,300,0);i.position.y=30;t.add(i);const a=new n(new p(20,10,10),new m({map:new l().load("/examples/public/texture/Bricks_Color.jpg")}));t.add(a);const e=new n(new w(7),new g({wireframe:!0,color:"rgb(155, 155, 0)",transparent:!0,opacity:.5}));e.position.x=-5;e.updateMatrix();t.add(e);const r=new n(new u(3,3,15,16),e.material);r.position.x=5;r.updateMatrix();t.add(r);const M=new o({source:a,target:e}),f=new o({source:a,target:r,mode:"union"});s.renderManager.addEventListener("render",()=>{M.render(),f.render()});
