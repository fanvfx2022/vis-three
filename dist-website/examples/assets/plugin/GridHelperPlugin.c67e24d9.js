import"../common.006007ed.js";import{f as t}from"../Vis.es.74edd40b.js";import"../three.b54e9ae7.js";import"../vis-three.36482fbe.js";const o=new t().install("GridHelper",{range:200,spacing:50,axesColor:"red",cellColor:"yellow",opacity:1}).complete().setDom(document.getElementById("app")).setSize().play();let e=!0;document.getElementById("operate").onclick=l=>{e=!e,o.setGridHelper({show:e})};