import"../common.006007ed.js";import{M as n,g as r,m as i,aa as d,o as m,O as c}from"../three.fec063a1.js";import{M as p,i as s}from"../Vis.es.d8d395f3.js";import"../vis-three.59b4e7ed.js";const a=document.getElementById("app"),h=new p().setDom(a).setSize().setStats(!0).play(),e=h.scene;e.add(new n(new r(10,10,10),new i({color:"rgb(255, 105, 70)"})));e.add(new d("white",1));const t=new m(45,a.offsetWidth/a.offsetHeight,5,200);e.add(t);t.position.set(-40,20,0);t.lookAt(0,0,0);const g=new s(t);e.add(g);const o=new c(-50,50,50,-50,5,200);e.add(o);o.position.set(40,20,0);o.lookAt(0,0,0);const l=new s(o);e.add(l);