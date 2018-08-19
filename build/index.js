!function(){"use strict";var t="uniform mat4 projection;uniform mat4 view;uniform mat4 model;attribute vec2 vertexPosition;attribute vec2 vertexTexCoord;varying vec2 texCoord;void main(){gl_Position=projection*view*model*vec4(vertexPosition,0.0,1.0);texCoord=vertexTexCoord;}",e="precision mediump float;uniform sampler2D tex;varying vec2 texCoord;void main(){gl_FragColor=texture2D(tex,texCoord);}";class s{constructor(s){this.gl=s;const i=s.createShader(s.VERTEX_SHADER);s.shaderSource(i,t),s.compileShader(i);const r=s.createShader(s.FRAGMENT_SHADER);s.shaderSource(r,e),s.compileShader(r),this.program=s.createProgram(),s.attachShader(this.program,i),s.attachShader(this.program,r),s.linkProgram(this.program),this.projection=s.getUniformLocation(this.program,"projection"),this.view=s.getUniformLocation(this.program,"view"),this.model=s.getUniformLocation(this.program,"model"),this.vertexPosition=s.getAttribLocation(this.program,"vertexPosition"),this.vertexTexCoord=s.getAttribLocation(this.program,"vertexTexCoord")}use(t,e,s){this.gl.useProgram(this.program),this.gl.enableVertexAttribArray(this.vertexPosition),this.gl.enableVertexAttribArray(this.vertexTexCoord),this.gl.vertexAttribPointer(this.vertexPosition,2,this.gl.FLOAT,!1,16,0),this.gl.vertexAttribPointer(this.vertexTexCoord,2,this.gl.FLOAT,!1,16,8),this.gl.uniformMatrix4fv(this.projection,!1,t),this.gl.uniformMatrix4fv(this.view,!1,e),this.gl.uniformMatrix4fv(this.model,!1,s)}}class i{constructor(t,e){this.width=t,this.height=e;const i=document.createElement("canvas");i.width=t,i.height=e,document.body.appendChild(i),this.gl=i.getContext("webgl",{antialias:!1}),this.gl.enable(this.gl.DEPTH_TEST),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE),this.shader=new s(this.gl),this.projection=new Float32Array([2/(t-1),0,0,0,0,-2/(e-1),0,0,0,0,-1,0,-1,1,0,1]),this.view=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.texture=this.gl.createTexture(),this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,new Uint8Array([0,0,255,255])),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST);const r=new Image;r.src="build/texture.png",r.addEventListener("load",()=>{this.gl.bindTexture(this.gl.TEXTURE_2D,this.texture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST)})}clear(){this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}draw(t,e,s,i){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,s),this.shader.use(this.projection,this.view,t),this.gl.drawElements(this.gl.TRIANGLES,i,this.gl.UNSIGNED_SHORT,0)}}var r="\n\n 11111 111111111111111\n 222221222222222222222\n 222222222222222222222\n 222222222222222222222\n";const h=64,a=16,l=64;class n{constructor(t){this.renderer=t;const e=r.split("\n"),s=[],i=[];let n=0;for(let t=0;t<e.length;t++)for(let r=0;r<e[t].length;r++){const o=e[t][r];if(" "==o)continue;let g=0;switch(o){case"1":g=0;break;case"2":g=1}s.push(h*r,h*t,a*g/l,0,h*r,h*t+h,a*g/l,1,h*r+h,h*t,(a*g+a)/l,0,h*r+h,h*t+h,(a*g+a)/l,1),i.push(n,n+1,n+2,n+1,n+2,n+3),n+=4}this.vertices=new Float32Array(s),this.indices=new Uint16Array(i),this.vertexBuffer=t.gl.createBuffer(),t.gl.bindBuffer(t.gl.ARRAY_BUFFER,this.vertexBuffer),t.gl.bufferData(t.gl.ARRAY_BUFFER,this.vertices,t.gl.STATIC_DRAW),this.indexBuffer=t.gl.createBuffer(),t.gl.bindBuffer(t.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.gl.bufferData(t.gl.ELEMENT_ARRAY_BUFFER,this.indices,t.gl.STATIC_DRAW),this.model=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}draw(){this.renderer.draw(this.model,this.vertexBuffer,this.indexBuffer,this.indices.length)}}let o,g;const d=new Float32Array([0,0,0,0,0,1,0,1,1,0,1,0,1,1,1,1]),E=new Uint16Array([0,1,2,2,1,3]);class c{constructor(t,e,s,i,r,h,a,l){this.renderer=t,this.x=i,this.y=r,this.dx=a,this.dy=l,o||(o=t.gl.createBuffer(),t.gl.bindBuffer(t.gl.ARRAY_BUFFER,o),t.gl.bufferData(t.gl.ARRAY_BUFFER,d,t.gl.STATIC_DRAW)),g||(g=t.gl.createBuffer(),t.gl.bindBuffer(t.gl.ELEMENT_ARRAY_BUFFER,g),t.gl.bufferData(t.gl.ELEMENT_ARRAY_BUFFER,E,t.gl.STATIC_DRAW)),this.model=new Float32Array([e,0,0,0,0,s,0,0,0,0,1,0,0,0,h,1])}update(t){this.x+=this.dx*t,this.y+=this.dy*t,this.model[12]=this.x,this.model[13]=this.y}draw(){this.renderer.draw(this.model,o,g,6)}}class T extends c{constructor(t,e,s){super(t,16,16,e,s,.7,0,0),this.leftPressed=!1,this.rightPressed=!1,this.upPressed=!1,this.downPressed=!1,addEventListener("keydown",t=>{switch(t.keyCode){case 37:this.leftPressed=!0,t.preventDefault();break;case 39:this.rightPressed=!0,t.preventDefault();break;case 38:this.upPressed=!0,t.preventDefault();break;case 40:this.downPressed=!0,t.preventDefault()}}),addEventListener("keyup",t=>{switch(t.keyCode){case 37:this.leftPressed=!1,t.preventDefault();break;case 39:this.rightPressed=!1,t.preventDefault();break;case 38:this.upPressed=!1,t.preventDefault();break;case 40:this.downPressed=!1,t.preventDefault()}})}update(t){this.dx=0,this.dy=0,this.leftPressed&&(this.dx-=.05),this.rightPressed&&(this.dx+=.05),this.upPressed&&(this.dy-=.05),this.downPressed&&(this.dy+=.05),super.update(t)}}const u=800,R=600;const A=new class{constructor(){this.renderer=new i(u,R),this.map=new n(this.renderer),this.sprites=[],this.sprites.push(new c(this.renderer,100,50,50,100,0,0,0)),this.sprites.push(new c(this.renderer,10,10,600,100,0,0,0)),this.sprites.push(new c(this.renderer,200,10,100,120,.9,0,0)),this.sprites.push(new T(this.renderer,100,100)),this.sprites.push(new c(this.renderer,100,100,10,80,.5,0,0)),this.sprites.push(new c(this.renderer,30,70,450,350,0,0,0)),this.lastTimestamp=performance.now()}update(t){const e=t-this.lastTimestamp;this.sprites.forEach(t=>t.update(e)),this.lastTimestamp=t}render(){this.renderer.clear(),this.map.draw()}},f=t=>{requestAnimationFrame(f),A.update(t),A.render()};requestAnimationFrame(f)}();
