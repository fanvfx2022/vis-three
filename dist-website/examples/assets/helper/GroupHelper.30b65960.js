import"../common.006007ed.js";import{aa as o,M as n,g as a,m as r,G as d}from"../three.fec063a1.js";import{M as i,G as m}from"../Vis.es.d8d395f3.js";import"../vis-three.59b4e7ed.js";const p=document.getElementById("app"),c=new i().setDom(p).setSize().setStats(!0).play(),e=c.scene;e.add(new o("white",1));const t=new n(new a(10,10,10),new r({color:"rgb(255, 105, 100)"}));t.position.set(-15,15,-15);const s=new d;s.add(t);const g=new m(s);e.add(s);e.add(g);