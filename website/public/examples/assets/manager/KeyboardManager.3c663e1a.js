import{K as n}from"../Vis.es.7c5541b7.js";import"../three.b54e9ae7.js";import"../vis-three.36482fbe.js";const o=new n,r=[];for(let e=0;e<=9;e+=1)r.push(String.fromCharCode(e));for(let e=97;e<=122;e+=1)r.push(String.fromCharCode(e));const a=document.querySelector(".keyboard-message");let t="window";r.forEach(e=>{o.register({shortcutKey:[e],desp:`key ${e}`,keyup:c=>{a.innerHTML=`${t} touch '${e}'`}})});document.getElementById("app1").onclick=e=>{t="app1",console.log(t),o.watch(document.getElementById("app1"))};document.getElementById("app2").onclick=e=>{t="app2",o.watch(document.getElementById("app2"))};