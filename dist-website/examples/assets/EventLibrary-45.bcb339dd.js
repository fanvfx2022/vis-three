import{a as l,g as e,m as t}from"./Vis.es.5d3b4fb7.js";import{v as o}from"./v4.90f1a8cc.js";import"./three.b90fa353.js";import"./vis-three.78ccfae1.js";const i=new l().setDom(document.getElementById("app")).setSize().setStats(!0),s=e("AmbientLight"),r=e("MeshStandardMaterial"),m=e("MeshStandardMaterial"),a=e("PlaneGeometry",{width:20,height:20}),c=o(),d=e("Mesh",{vid:c,material:r.vid,geometry:a.vid,click:[t.generateConfig("foucsObject",{params:{target:c,space:"local"}})],rotation:{z:Math.PI/3},position:{x:-15}}),n=o(),g=e("Mesh",{vid:n,material:m.vid,geometry:a.vid,position:{x:15},pointerenter:[t.generateConfig("fadeObject",{params:{target:n}})],pointerleave:[t.generateConfig("fadeObject",{params:{target:n,direction:"in"}})]}),p=e("Scene",{children:[s.vid,d.vid,g.vid]});i.applyConfig(s,r,m,a,d,g,p);i.setScene(p.vid).play();window.engine=i;
