import{f,g as e,l as y,m as g}from"./Vis.es.5d3b4fb7.js";import{v as b}from"./v4.90f1a8cc.js";import"./three.b90fa353.js";import"./vis-three.78ccfae1.js";var z={router:"engine",children:["/Engine.html","/ModelingEngine.html","/DisplayEngine.html","/ModelingEngineSupport.html","/DisplayEngineSupport.html"],position:{x:-70,y:20,z:-30},rotation:{y:Math.PI/180*35}},C={router:"plugin",children:["/WebGLRendererPlugin.html","/CSS3DRendererPlugin.html","/AxesHelperPlugin.html","/GridHelperPlugin.html","/ObjectHelperPlugin.html","/ViewpointPlugin.html","/DisplayModePlugin.html","/SelectionPlugin.html","/StatsPlugin.html","/TransformControlsPlugin.html"],position:{x:-60,y:-20,z:-20},rotation:{y:Math.PI/180*25}},R={router:"support",children:["/GeometrySupport.html","/MaterialSupport.html","/CameraSupport.html","/MeshSupport.html","/SpriteSupport.html","/LineSupport.html","/PointsSupport.html","/LightSupport.html","/GroupSupport.html","/TextureSupport.html","/EventSupport.html","/PassSupport.html","/SceneSupport.html","/CSS3DSupport.html","/AnimationSupport.html"],position:{x:-15,y:0,z:15},rotation:{y:Math.PI/180*25}},L={router:"displayer",children:["/TextureDisplayer.html","/MaterialDisplayer.html"],position:{x:-70,y:-30,z:10},rotation:{y:Math.PI/180*35}},E={router:"convenient",children:["/History.html"],position:{x:-80,y:10},rotation:{y:Math.PI/180*25}},D={router:"manager",children:["/EventManager.html","/LoaderManager.html","/ResourceManager.html"],position:{x:45,z:5,y:-30},rotation:{y:Math.PI/180*-15}},I={router:"modifier",children:["/BooleanModifier.html"],position:{x:45,z:-10,y:20},rotation:{y:Math.PI/180*-25}},H={router:"helper",children:["/PointLightHelper.html","/SpotLightHelper.html","/directionalLight.html","/CameraHelper.html","/GroupHelper.html"],position:{x:20,z:15},rotation:{y:Math.PI/180*-25}},T={router:"loader",children:["/VideoLoader.html"],position:{x:15,y:20,z:10},rotation:{y:Math.PI/180*-25}},G={router:"develop",children:["/configure.html","/Vue3.html","/Vue2.html","/CanvasExtends.html","/Vue2-ConfigExtends.html"],position:{x:60,y:-10},rotation:{y:Math.PI/180*-30}},$={router:"core",children:["/ProxyBroadcast.html"],position:{x:20,y:-30,z:20},rotation:{y:Math.PI/180*-25}},j={router:"test",children:["/Pressure-canvas.html","/Pressure-css3D.html"],position:{x:60,y:10,z:20},rotation:{y:Math.PI/180*-30}},A={router:"library",children:["/EventLibrary.html"],position:{x:60,y:30,z:20},rotation:{y:Math.PI/180*-30}},V={router:"extends",children:[],position:{x:20,y:35,z:10},rotation:{y:Math.PI/180*-20}};const i=new f().install("CSS3DRenderer").complete().setDom(document.getElementById("app")).setSize();window.addEventListener("resize",()=>{i.setSize()});const v=e("AmbientLight"),S=e("SpotLight",{position:{y:15,x:50,z:50},intensity:2,distance:120}),x=e("MeshStandardMaterial",{color:"rgb(45, 0, 50)",roughness:.8}),P=e("BoxGeometry",{width:100,height:5,depth:40}),o=e("Mesh",{geometry:P.vid,material:x.vid}),a=e("Scene",{children:[v.vid,S.vid,o.vid]}),M=e("PerspectiveCamera",{far:500,position:{y:10,z:120}}),w=e("ScriptAnimation",{target:o.vid,attribute:".rotation.y",script:y.generateConfig("linearTime",{multiply:1})}),B=e("ScriptAnimation",{target:o.vid,attribute:".rotation.x",script:y.generateConfig("linearTime",{multiply:.5})});i.applyConfig(v,S,x,P,o,M,a,w,B);i.setScene(a.vid).setCamera(M.vid).play();const O=[z,C,R,L,E,D,I,H,T,G,$,j,A,V];O.forEach(t=>{var s,h,m,u,c;let l="";if(t.children&&t.children.length)for(let d of t.children)l+=`<a href="${t.router}${d}">${d.split("/").pop()}</a>`;const r=document.createElement("div");r.style.position="absoulte",r.id=t.router,r.className="module-box",r.innerHTML=`
        <h3>${t.router.toLocaleUpperCase()}</h3>
        <div class="children-box">
          ${l}
        </div>
      `,document.body.appendChild(r);const n=b(),p=e("CSS3DPlane",{vid:n,element:`index.${t.router}`,scale:{x:.1,y:.1,z:.1},position:{x:((s=t.position)==null?void 0:s.x)||0,y:((h=t.position)==null?void 0:h.y)||0,z:((m=t.position)==null?void 0:m.z)||0},rotation:{y:((u=t.rotation)==null?void 0:u.y)||0},pointerenter:[g.generateConfig("vector3To",{params:{target:n,attribute:".rotation",to:{y:0}}})],pointerleave:[g.generateConfig("vector3To",{params:{target:n,attribute:".rotation",to:{y:((c=t.rotation)==null?void 0:c.y)||0}}})]});i.registerResources({[`index.${t.router}`]:r}).applyConfig(p),a.children.push(p.vid),setTimeout(()=>{i.setSize()},0)});
