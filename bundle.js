!function(){function t(t,s,i){return t+i*(s-t)}function s(t,s,i){let h;return i=i??1e-5,t===s?1:(h=Math.abs(t-s),0===t||0===s||F>h?i*F>h:i>h/(Math.abs(t)+Math.abs(s)))}function i(t,s){if(s)return t[0]=s[0],t[1]=s[1],t}function h(t,s,i){return t[0]=s[0]+i[0],t[1]=s[1]+i[1],t}function e(t,s,i){return t[0]=s[0]-i[0],t[1]=s[1]-i[1],t}function n(t,s,i){return t[0]=s[0]*i,t[1]=s[1]*i,t}function r(t,s){const i=s[0],h=s[1];let e=i*i+h*h;return e>0&&(e=1/Math.sqrt(e)),t[0]=s[0]*e,t[1]=s[1]*e,t}function o(t,s){return t[0]*s[0]+t[1]*s[1]}function a(t,s){return Math.hypot(s[0]-t[0],s[1]-t[1])}function c(t,s){const i=s[0]-t[0],h=s[1]-t[1];return i*i+h*h}function u(t,s,i=1){return t[0]=s[1],t[1]=s[0],i?t[1]=-t[1]:t[0]=-t[0],r(t,t)}function l(t){const s=t.t;let i=[0,0];const o=t.i(s),a=h([0,0],o,n(i,r(i,e(i,o,t.position)),U.h)),c=u([0,0],e(i,o,a));n(c,c,U.o);const l=h([0,0],a,c),f=new J(o,l);return new D(f.u,[U.h/2,U.o/2],s)}function f(t,s){let i=Math.sin(s),h=Math.cos(s);return t[0]=h,t[1]=i,t[2]=-i,t[3]=h,t[4]=0,t[5]=0,t}function d(t,s,i){let h=s[0],e=s[1];return t[0]=i[0]*h+i[2]*e+i[4],t[1]=i[1]*h+i[3]*e+i[5],t}function w(t,s){const i=c(t.position,s.position),h=t.l+s.l;return h*h>i}function p(t,s){const[i,h]=t.position,[e,n]=s.position,[r,o]=s.size;let a=i,c=h;e>i?a=e:i>e+r&&(a=e+r),n>h?c=n:h>n+o&&(c=n+o);let u=new J([i,h],[a,c]);return t.l*t.l>=u.p}function x(t,s,a){if(t===s)return 0;if(!t.M)return 0;if(w(t,s)){if(a)return 1;let c=[0,0];const u=r([0,0],e(c,t.position,s.position));i(t.position,h([0,0],s.position,n(c,u,t.l+s.l)));const l=o(u,e([0,0],s.M??[0,0],t.M));if(l>=0){const e=n([0,0],u,2*l/(t.m=s.m));i(t.M,n([0,0],h(c,t.M,n(c,e,s.m)),s.g))}return 1}return 0}function M(t,s){return t.S?0:((t,s)=>{const i=e([0,0],t.position,s.position),r=[1,0,0,1,0,0];return f(r,-s.orientation),d(i,i,r),p(new K(h([0,0],i,s.T),t.l),new Y([0,0],n([0,0],s.T,2)))})(t,s)?(t.M=[0,0],1):0}function m(t,s){const i=c(t.position,s.position);return 0!==i?U.P*(s.m/i):0}function g(t,s){let i,h,e;for(h of t){let t=-1/0;for(e of s.R){if(h===e)continue;let s=m(h,e);t>s||(t=s,i=e)}h.A&&void 0!==h.L||(h.L=i)}}function S(t,s){if(!t.L||!t.acceleration)return;const o=[0,0];i(t._,t.position),n(t.acceleration,r(o,e(o,t.L.position,t.position)),m(t,t.L)),t.M||(t.M=[0,0]),h(t.M,t.M,n(o,t.acceleration,s)),h(t.position,t.position,n(o,t.M,s))}function v(t,s){let i=t.clone();return n(i.k.position,i.k.position,s),n(i.k.acceleration,i.k.acceleration,s),n(i.k.M,i.k.M,s),i}function b(t){return[(16711680&t)>>16,(65280&t)>>8,255&t]}function T(t,s,i){[t[i],t[s]]=[t[s],t[i]]}function P(t){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(s=>{let i=16*t.random()|0;return("x"==s?i:3&i|8).toString(16)}))}function R(t,s){return`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${s})`}function A(t,s,i,h){t.save(),t.translate(s.position[0],s.position[1]),t.rotate(h),t.translate(-s.position[0],-s.position[1]),t.beginPath(),t.arc(s.position[0],s.position[1],s.l,0,B),t.closePath(),t.fillStyle=i,t.fill(),t.restore()}function L(t,s,i,h=1){t.fillStyle=R(i,h),t.beginPath(),t.arc(s.position[0],s.position[1],s.l,0,B),t.closePath(),t.fill()}function y(t,s,i,h=1){t.lineWidth=h,t.lineCap="round",t.strokeStyle=R(i,1),t.beginPath(),t.moveTo(s.start[0],s.start[1]),t.lineTo(s.end[0],s.end[1]),t.closePath(),t.stroke()}function _(t,s,i,o,a){if(0===U.h)return;y(t,i,a);let c=[0,0];t.save(),t.font="bold 16px sans-serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle";const l=t.measureText(s=`  ${s}  `);t.restore(),i.I(-U.o);let f=i.u,d=u([0,0],r(c,e(c,i.start,i.end))),w=h([0,0],f,n(c,d,U.o/1.5+l.width)),p=h([0,0],i.start,n(c,d,l.width)),x=h([0,0],i.end,n(c,d,l.width));t.fillStyle=R(b(V[1]),1),t.beginPath(),t.moveTo(i.start[0],i.start[1]),t.lineTo(p[0],p[1]),t.lineTo(w[0],w[1]),t.lineTo(x[0],x[1]),t.lineTo(i.end[0],i.end[1]),t.closePath(),t.fill(),t.save();const M=new J(f,new J(p,x).u).u;t.translate(M[0],M[1]),t.rotate(.5*Math.PI+o),t.translate(-M[0],-M[1]),t.font="bold 18px sans-serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle",t.fillText(s,M[0],M[1]),t.restore()}function E(t,s,i,h,{C:e,background:n,text:r}){t.font="normal 12px sans-serif",t.fillStyle=R(n,1),t.fillRect(h[0],h[1],100,20),t.fillStyle=R(e,1),t.fillRect(h[0],h[1],s,20),t.fillStyle=R(r,1),t.strokeStyle="black",t.lineWidth=2,t.strokeText(i,h[0]+108,h[1]+14),t.fillText(i,h[0]+108,h[1]+14)}function k(t){let s=t.G(55,100),i=t.G(2,Z.length),h=[];const e=[...Z];t.O(e);for(let t=0;i>t;t++)h.push(e[t]);return{id:P(t),position:[0,0],l:s,N:h,rotation:t.$(),B:[],F:0,K:0,g:.8}}function I(t,s,i){const o=k(t);o.l=t.H(20,35),o.K=1,o.N=[V[2],V[4]].map((t=>b(t)));const a=r([0,0],e([0,0],o.position,i.position));return n(a,a,i.l+6*o.l),o.position=h([0,0],a,i.position),o}function C(t,s){let i=s.filter((s=>s.id!==t.id));return((t,s)=>{const i=new K(t.position,t.l);for(let t of s)if(w(i,new K(t.position,t.l)))return 1;return 0})(t,i)||((t,s)=>{let i=3*t.l;for(let h of s)if(i>a(t.position,h.position)-h.l)return 1;return 0})(t,i)}function G(t,s,i){s.position=[t.H(i.position[0],i.size[0]),t.H(i.position[1],i.size[1])]}function O(t,s,i,h){const e=a(t.position,s.position)+2*t.l,n=new K(s.position,e);for(let t of i)if(w(new K(t.position,t.l),n))return{U:0};const r=[];for(let t of h)w(new K(t.position,t.l),n)||r.push(t);return{U:1,q:r}}function z(t,s){const i=s[s.length-1],o=new K(i.position,i.l);i.t=t.$();const a=o.i(i.t);return h([0,0],a,n([0,0],r([0,0],e([0,0],a,i.position)),U.h)),i}function N(s,i,o,a,c){let u=`${U.seed}-${i}`;s.D(u);const l=U.J,{Y:f,j:d,bodies:w}=((s,i,e,r,o,a)=>{const c=((t,s,i)=>{if(void 0!==i)return{id:P(t),N:[...i.N],rotation:i.rotation,position:[2*i.l,i.position[1]],l:i.l,B:[],F:0,K:0};const h=k(t),e=t.H(0,h.l),n=t.H(0,h.l);return h.position=[2*h.l+e,2*h.l+n],h})(s,0,a),u=((t,s,i)=>{const h=k(t),e=h.l+U.h;return h.position=[t.H(i[0]-2*e,i[0]-e),t.H(e,i[1]-e)],h})(s,0,i);let l=c.position[0]+2*c.l,f=[];do{let h,n;do{h=k(s);const t=new Y([l,2*h.l],[Math.min(l+4*h.l,u.position[0]-u.l),i[1]-2*h.l]);G(s,h,t)}while(C(h,[c,...f,u]));if(s.random()<t(t(.15,.4,o/20),.4,Math.min(e,50)/50)){n=I(s,0,h);let t=O(n,h,[c,u],f.filter((t=>t.id===h.id)));t.U?(f=t.q,h.B=[n.id]):n=void 0}else o=Math.min(20,++o);n?(o=0,l=h.position[0]+Math.abs(h.position[0]-n.position[0])+2*n.l,f.push(h,n)):(l=h.position[0]+2*h.l,f.push(h))}while(u.position[0]>l);if(s.random()<t(t(.1,.5,r/10),.5,Math.min(e,100)/100)){r=0;let t=((t,s)=>{const i=t.H(105,175),e=n([0,0],s,.5);return h(e,e,[t.H(0,i),t.H(0,i)]),{id:P(t),position:e,rotation:t.$(),l:i,B:[],N:[V[2],V[1],V[0]].map((t=>b(t))),F:1,K:0}})(s,i),e=((t,s,i)=>{const h={U:0};if(C(t,s))return h;let e=[];for(let s of i)!C(t,[s])&&e.push(s);return 0===e.length?h:{U:1,q:e}})(t,[c,u],f);if(e.U)return{j:o,Y:r,bodies:[c,...e.q,t,u]}}return{j:o,Y:r=Math.min(10,++r),bodies:[c,...f,u]}})(s,l,i,o,a,c),{spawnPlanet:p,V:x}=((t,s,i)=>{const o=s[0],a=new K(o.position,o.l);let c;const u=i??t.$();return c=a.i(u),h(c,c,n([0,0],r([0,0],e([0,0],c,o.position)),U.W)),{spawnPlanet:o,V:c}})(s,w,c?.t);return{number:i,X:u,Y:f,j:d,size:l,spawn:x,bodies:w,spawnPlanet:p,goalPlanet:z(s,w)}}class $ extends class{constructor(){this.Z=[],this.tt=[]}st(t){return this.Z.push(t),{it:()=>this.ht(t)}}once(t){this.tt.push(t)}ht(t){var s=this.Z.indexOf(t);s>-1&&this.Z.splice(s,1)}et(t){if(this.Z.forEach((s=>s(t))),this.tt.length>0){const s=this.tt;this.tt=[],s.forEach((s=>s(t)))}}nt(t){return this.st((s=>t.et(s)))}}{constructor(t){super(),this.rt=0,this.ot=t,window.addEventListener("pointerdown",this.ct.bind(this)),window.addEventListener("pointermove",this.ct.bind(this)),window.addEventListener("pointerup",this.ct.bind(this)),window.addEventListener("blur",this.ut.bind(this))}ut(){this.rt=0}ct(t){this.position=this.lt(this.ot,[t.clientX,t.clientY]),this.rt=!!t.buttons,this.et(this.rt)}lt(t,s){let i=t.getBoundingClientRect();return[t.width/i.width*(s[0]-i.left),t.height/i.height*(s[1]-i.top)]}ft(){return this.rt}}const B=2*Math.PI,F=Math.pow(2,-1022);class K{constructor(t,s){this.position=t,this.l=s}i(t){return[this.position[0]+this.l*Math.cos(t),this.position[1]+this.l*Math.sin(t)]}}class H extends K{constructor(t,s,h=0,e,n,r,o,a){super(t,s),this._=[0,0],i(this._,this.position),this.m=h,this.M=e,this.acceleration=n,this.g=r??.8,this.dt=o??0,this.A=a??0}clone(){return new H(i([0,0],this.position),this.l,this.m,i([0,0],this.M),i([0,0],this.acceleration),this.g,this.dt,this.A)}}const U={J:[1920,1080],wt:164,xt:"g",seed:"HAR-INK-IPTS",Mt:3e3,P:.8,gt:2e3,W:5,St:0,vt:1300,bt:1,h:45,o:18,Tt:50,Pt:125,Rt:1e3,At:[200,25,1334,725],Lt:"HAR-INK-IPTS-",muted:0,yt:2};class q extends H{constructor(t,s,i,h,e,n,r,o,a,c,u,l){super(t,s,s*s*Math.PI*U.Mt,n,r,o,u,l),this.id=i,this.t=a,this.B=c??[],this.F=u??0,this.K=l??0,this.N=h,this.rotation=e}_t(t,s){let h=[0,0];const r=u([0,0],(o=h,c=e(h,t.position,this.position),o[0]=Math.abs(c[0]),o[1]=Math.abs(c[1]),o),s);var o,c;t.L=this,t.acceleration=[0,0],t.M=[0,0],i(t.M,n(h,r,Math.sqrt(U.P*this.m/a(t.position,this.position))))}clone(){let t=new q(i([0,0],this.position),this.l,this.id,[...this.N],this.rotation,this.M,this.acceleration,this.g,this.t,[...this.B],this.F);return t.L=this.L,t}}class D{constructor(t,s,i){this.position=t??[0,0],this.T=s??[1,1],this.orientation=i??0}}class J{constructor(t,s){this.start=t,this.end=s}I(t){let s=this.end[0]-this.start[0],i=this.end[1]-this.start[1],h=Math.sqrt(s*s+i*i);return h>0&&(s/=h,i/=h),s*=h+t,i*=h+t,this.start[0]=this.start[0]+s,this.start[1]=this.start[1]+i,this}get u(){return[(this.start[0]+this.end[0])/2,(this.start[1]+this.end[1])/2]}get length(){return a(this.start,this.end)}get p(){return c(this.start,this.end)}}class Y{constructor(t,s){this.position=t,this.size=s}static Et(t,s){return new Y(t,e([0,0],s,t))}get min(){const t=this.position,s=h([0,0],this.position,this.size);return[Math.min(t[0],s[0]),Math.min(t[1],s[1])]}get max(){const t=this.position,s=h([0,0],this.position,this.size);return[Math.max(t[0],s[0]),Math.max(t[1],s[1])]}}class j{constructor({size:t,k:s,R:i,kt:h,spawnPlanet:e,goalPlanet:n}){this.It=[],this.Ct=0,this.size=t,this.k=s,this.R=i,this.kt=h??1,this.spawnPlanet=e,this.goalPlanet=n}static Gt(t){return new q(i([0,0],t.position),t.l,t.id,t.N,t.rotation,i([0,0],t.M),i([0,0],t.acceleration),t.g,t.t,t.B,t.F,t.K)}Ot(){const t=this.goalPlanet.i(this.goalPlanet.t);return h(t,t,n([0,0],r([0,0],e([0,0],t,this.goalPlanet.position)),U.h))}static zt(t,s){i(s.position,t.spawn);const h=new j({kt:t.number,size:t.size,k:s,R:t.bodies.map(j.Gt),spawnPlanet:j.Gt(t.spawnPlanet??t.bodies[0]),goalPlanet:j.Gt(t.goalPlanet??t.bodies[t.bodies.length-1])});for(let t of h.R)try{for(let s of t.B){const i=h.R.find((t=>t.id===s));i&&t._t(i)}}catch{}return h}step(t){this.k.step(),((t,s)=>{g([s.k,...s.R],s),S(s.k,t*U.bt);for(let i of s.R)S(i,t*U.bt)})(t,this);const s=(t=>{let s=0,i=0,h=0,e=t.k,n=t.R;for(let t of n)x(e,t,t.F)&&(s=1,t.F&&(h=1));let r=t.R.filter((t=>void 0!==t.t));for(let h of r)i=M(t.k,l(h)),i&&(s=1);return{Nt:s,$t:i,Bt:h}})(this);return this.k.Ft(),this.It=((t,s)=>{if(!t.k.Kt)return[];let i=t.k.clone();i.Ht();let h=[];for(let e=0;U.Pt>e&&(g([i],t),S(i,s),!x(i,i.L,i.L.dt)||!i.L.dt);e++)h.push([i.position[0],i.position[1]]);return h})(this,t),s}clone(){let t=new j({size:i([0,0],this.size),k:this.k.clone(),R:this.R.map((t=>t.clone())),kt:this.kt,spawnPlanet:this.spawnPlanet.clone(),goalPlanet:this.goalPlanet.clone()});return t.It=[...this.It.map((t=>i([0,0],t)))],t.Ct=this.Ct,t}}const V=[16512495,15913899,13016997,9137564,4803966,2565956];class W{constructor(t,s){this.ot=t,this.Ut=document.createElement("canvas").getContext("2d"),this.qt(),this.Dt=this.ot.getContext("2d"),this.Jt=s,this.Yt=((t,s,i,h)=>{const e=document.createElement("canvas");e.id="bg",e.width=t,e.height=s;const n=e.getContext("2d"),r=[];for(;h>0;h--)r.push([i.random()*t,i.random()*s,1.2*i.random()]);n.fillStyle=R(b(V[5]),1),n.fillRect(0,0,t,s);for(let t of r??[])n.beginPath(),n.arc(t[0],t[1],t[2],0,360),n.fillStyle=R(b(V[0]),.8),n.fill();return e})(U.J[0],U.J[1],this.Jt,U.gt)}qt(){this.ot.width=U.J[0],this.ot.height=U.J[1],this.Ut.canvas.width=U.J[0],this.Ut.canvas.height=U.J[1]}jt(t,s){let i=[0,0];t.save();for(let o of s.R??[]){let a;if(o.F)a=t.createRadialGradient(o.position[0],o.position[1],o.l,o.position[0],o.position[1],0),a.addColorStop(0,R(o.N[0],1)),a.addColorStop(.4,R(o.N[1],1)),a.addColorStop(.8,R(o.N[2],1));else{a=t.createLinearGradient(o.position[0]-o.l,o.position[1]-o.l,o.position[0]+o.l,o.position[1]+o.l);for(let t=0;o.N.length>t;t++)a.addColorStop(t/o.N.length,R(o.N[t],1))}if(A(t,o,a,o.rotation),void 0!==o.t){const a=o.i(o.t),c=h([0,0],a,n(i,r(i,e(i,a,o.position)),U.h));_(t,""+s.kt,new J(a,c),o.t,b(V[2]))}t.restore()}}Vt(t,s){t.save();for(let i=s.k.Wt.length-1;i>0;i--){const h=i/(s.k.Wt.length-1);L(t,new K(s.k.Wt[i],s.k.l),s.k.color,h)}if(s.k.Qt&&s.k.Kt&&s.k.Xt&&s.k.Zt){let i=[0,0];const o=s.k.Zt,a=h(i,o,n(i,s.k.Kt,200*s.k.Xt));((t,s,i)=>{L(t,new K(s.start,3),i);const o=r([0,0],e([0,0],s.end,s.start)),a=f([1,0,0,1,0,0],2.356194490192345),c=f([1,0,0,1,0,0],-2.356194490192345),u=d([0,0],o,a),l=d([0,0],o,c);n(u,u,10),n(l,l,10);const w=new J(s.end,h([0,0],s.end,u)),p=new J(s.end,h([0,0],s.end,l));y(t,s,i,3),y(t,w,i,3),y(t,p,i,3)})(t,new J(o,a),b(V[0])),this.ts(t,s)}t.restore()}ts(t,s){t.save();for(let i of s.It)L(t,new K(i,1),b(V[0]));t.restore()}ss(t,s){t.save();const i=b(V[0]),h={C:b(V[1]),background:b(V[3]),text:i};let e;t.font="normal 32px sans-serif",t.fillStyle=R(i,1),t.strokeStyle="black",t.lineWidth=4,t.textAlign="center",t.textBaseline="middle";let n=U.J[0]/2,r=24;const o=""+s.k.totalLaunches;if(e=t.measureText(o),t.strokeText(o,n,r),t.fillText(o,n,r),n+=e.width+24,s.k.holeLaunches>0){const i=`${s.k.holeLaunches>0?"+":""}${s.k.holeLaunches}`;t.strokeText(i,n,r),t.fillText(i,n,r)}t.restore(),t.save(),n=8,r=U.J[1]-28,E(t,s.k.hs,"slo-mo",[n,r],h),r-=26,E(t,100-s.k.es/s.k.ns*100,"launches",[n,r],h),r-=26;const a=~~(100-s.k.rs/U.Rt*100);100>a&&E(t,a,"respawn",[n,r],h),t.restore()}os(t,s){t.save(),t.restore()}cs(t,s){const i=n([0,0],U.J,.5);t.save();const h=t.createLinearGradient(i[0]-200,i[1]-200,i[0]+200,i[1]+200);h.addColorStop(0,R(b(V[0]),1)),h.addColorStop(.25,R(b(V[1]),1)),h.addColorStop(.65,R(b(V[2]),1)),h.addColorStop(1,R(b(V[3]),1)),A(t,new K(i,400),h,B),t.translate(.5,.5),t.font="bold 38px sans-serif",t.fillStyle=R(b(V[5]),1),t.strokeStyle="black",t.lineWidth=4,t.textAlign="center",t.textBaseline="middle";let e=i[0],r=i[1]-74;t.fillText("INTERPLANETARY TRANSPORT SYSTEM",e,r),r+=44,t.font="italic 32px sans-serif",t.fillText("A JS13K GAME BY",e,r),r+=44,t.font="bold 32px sans-serif",t.fillText("RIK HARINK",e,r),r+=88,t.fillText("CONTROLS MOUSE/TOUCH",e,r),r+=24,t.font="bold 16px sans-serif",t.fillText("M TO MUTE, R TO RESET CURRENT HOLE",e,r),r+=44,t.font="italic 24px sans-serif",t.fillText("CLICK TO START",e,r),t.fillStyle=R(s.k.color,1),t.font="bold 24px sans-serif",t.fillText("https://github.com/rikharink/js13k-2021-space/",e,U.J[1]-24),t.restore()}us(t,s){const i=this.Dt;i.save(),i.drawImage(this.Yt,0,0),s?this.cs(i,t):(this.jt(i,t),this.Vt(i,t),this.ss(i,t)),i.restore()}}class Q{constructor(t){this.D(t)}D(t){this.ls=this.fs(t),this.random()}fs(t){for(var s=0,i=2166136261;t.length>s;s++)i=Math.imul(i^t.charCodeAt(s),16777619);return i+=i<<13,i^=i>>>7,i+=i<<3,i^=i>>>17,(i+=i<<5)>>>0}random(){return this.ls=Math.imul(48271,this.ls),(2**31-1&this.ls)/2**31}get ds(){return this.ls}set ds(t){this.ls=t}H(t,s){return this.random()*(s-t+1)+t}G(t,s){return Math.floor(this.H(Math.ceil(t),Math.floor(s)))}ws(t){return()=>this.G(1,t)}O(t){for(let s=0;t.length-2>s;s++)T(t,s,this.G(s,t.length-1))}ps(t){return t[this.G(0,t.length)]}xs(){return(t=>{let[s,i,h]=t,e=s;return e=(e<<8)+i,e=(e<<8)+h,e})([this.G(0,255),this.G(0,255),this.G(0,255)])}$(){return this.H(0,B)}}class X{constructor(){this.Ms=0,document.monetization&&("started"!==document.monetization.state&&"stopped"!==document.monetization.state?document.monetization.addEventListener("monetizationstart",this.gs.bind(this)):(this.Ms="started"===document.monetization.state,this.Ms&&this.Ss()))}gs(){this.Ms=1,this.Ss()}Ss(){}}const Z=[V[2],V[3],V[4]].map((t=>b(t)));let tt,st,it;st=.6;class ht extends H{constructor(t,s){super([10,10],U.W,U.St,[0,0],[0,0]),this.color=b(V[0]),this.vs=0,this.es=0,this.totalLaunches=0,this.holeLaunches=0,this.ns=3,this.bs=4*U.wt,this.Ts=4*U.wt,this.Ps=0,this.Wt=[],this.rs=0,this.Rs=0,this.As=0,this.S=0,this.Ls=0,this.ys=0,this._s=0,this.id=s,this.Es=t}ks(){this.Is()}step(){if(this.Cs&&this.Ls++,this.Ls>30&&(this.Ls=0,this.ys=0,this.es=0,this.Gs=i([0,0],this.position),this.As=0,this.Ts=this.bs),this.es===this.ns&&this.ys++,this.ys>3*U.wt&&(this.es=Math.min(0,this.es-1),this.ys=0),this.Ps?(this.Ts>0||(this.Ps=0,U.bt=1),this.Ts--):(U.bt=1,this.bs>this.Ts&&(this.Ts+=.1)),this.L&&!p(this,new Y([0,0],U.J))){this.Rs=1;const t=r([0,0],e([0,0],this.position,this.L.position));o(r([0,0],this.M),t)>0?this.rs++:this.rs=0}else this.rs=0,this.Rs=0;this.rs>U.Rt&&(this.rs=0,i(this.position,this.Gs),this.M=[0,0])}Os(){this.totalLaunches+=this.holeLaunches,this.holeLaunches=0}get hs(){return~~(this.Ts/this.bs*100)}get Cs(){return!(!s((t=this.position)[0],(i=this._)[0],h)||!s(t[1],i[1],h));var t,i,h}get Qt(){return this.ns>this.es}Ft(t){t??1?(this.Wt.push(i([0,0],this.position)),this.Wt.length>U.Tt&&this.Wt.shift()):this.Wt=[i([0,0],this.position),i([0,0],this.position)]}Is(){if(!this._s)return;if(!this.Qt)return void(U.bt=1);const t=this.Es.ft();var s,h,n;!this.vs&&t?(this.Kt=[0,0],this.Zt=i([0,0],this.Es.position),1>this.es||(U.bt=.1,this.Ps=1)):this.vs&&!t?(this.Ht(),tt&&!U.muted&&tt(...[.8,,250,.01,,.01,,.2,-.2,-4,-50,-.32,.01,,,,.09,.98,.04,.06])):this.Es.position&&this.Zt&&(h=this.Kt,n=r(this.Kt,e(this.Kt,this.Es.position,this.Zt)),h[0]=-n[0],h[1]=-n[1],this.Xt=(s=a(this.Zt,this.Es.position),Math.max(0,Math.min(100,s))/100)),this.vs=t}Ht(){n(this.M,this.Kt,U.vt*this.Xt*(this.Ps?.5:1)),this.Zt=void 0,this.Kt=void 0,this.Xt=void 0,this.es++,this.holeLaunches++,this.Ps=0,this.As=1}clone(){let t=new ht(this.Es,this.id);return t.L=this.L?.clone(),t.position=i([0,0],this.position),t._=i([0,0],this._),t.M=i([0,0],this.M),t.acceleration=i([0,0],this.acceleration),t.vs=this.vs,t.Kt=i([0,0],this.Kt),t.Xt=this.Xt,t.totalLaunches=this.totalLaunches,t.holeLaunches=this.holeLaunches,t.es=this.es,t.Zt=i([0,0],this.Zt),t.ns=this.ns,t.Ts=this.Ts,t.Wt=this.Wt.map((t=>i([0,0],t))),t.Rs=this.Rs,t.rs=this.rs,t._s=this._s,t.As=this.As,t.S=this.S,t}}let et=new class{constructor(){this.zs=60,this.isActive=0,this.Ns=0,this.$s=0,this.Bs=0,this.Fs=0,this.Ks=1,this.Hs=void 0,this.Us=void 0,this.qs=0,this.Ds=0,this.Ct=0,this.Js=1,this.Ys=document.getElementById(U.xt),this.js=new $(this.Ys),this.Vs=new X,this.Jt=new Q(U.seed),this.Ws=new W(this.Ys,this.Jt),window.addEventListener("focus",this.start.bind(this)),window.addEventListener("blur",this.stop.bind(this)),this.Qs()||this.Xs(N(this.Jt,this.Ks,0,0)),this.currentState.k._s=!this.Js,document.addEventListener("pointerup",this.Zs.bind(this))}Zs(){this.Js=0,this.currentState.k._s=1,this.ti(),tt||(it=new(window.AudioContext||webkitAudioContext),tt=(t=1,s=.05,i=220,h=0,e=0,n=.1,r=0,o=1,a=0,c=0,u=0,l=0,f=0,d=0,w=0,p=0,x=0,M=1,m=0,g=0)=>{let S,v,b=Math,T=44100,P=2*b.PI,R=a*=500*P/T/T,A=i*=(1-s+2*s*b.random(s=[]))*P/T,L=0,y=0,_=0,E=1,k=0,I=0,C=0;for(c*=500*P/T**3,w*=P/T,u*=P/T,l*=T,f=T*f|0,v=(h=T*h+9)+(m*=T)+(e*=T)+(n*=T)+(x*=T)|0;v>_;s[_++]=C)++I%(100*p|0)||(C=r?r>1?r>2?r>3?b.sin((L%P)**3):b.max(b.min(b.tan(L),1),-1):1-(2*L/P%2+2)%2:1-4*b.abs(b.round(L/P)-L/P):b.sin(L),C=(f?1-g+g*b.sin(P*_/f):1)*(C>0?1:-1)*b.abs(C)**o*t*.6*(h>_?_/h:h+m>_?1-(_-h)/m*(1-M):h+m+e>_?M:v-x>_?(v-_-x)/n*M:0),C=x?C/2+(x>_?0:(v-x>_?1:(v-_)/x)*s[_-x|0]/2):C),S=(i+=a+=c)*b.cos(w*y++),L+=S-S*d*(1-1e9*(b.sin(_)+1)%2),E&&++E>l&&(i+=u,A+=u,E=0),!f||++k%f||(i=A,a=R,E=E||1);return(t=it.createBuffer(1,v,T)).getChannelData(0).set(s),(i=it.createBufferSource()).buffer=t,i.connect(it.destination),i.start(),i})}reset(){localStorage.removeItem(U.Lt+"STATE"),this.currentState=void 0,this.Js=1,this.Jt=new Q(U.seed),this.Ks=1,this.Xs(N(this.Jt,this.Ks,0,0))}Xs(t){this.Jt.D(t.X),this.Ks=t.number,this.si=t;const s=this.currentState?.k??new ht(this.js,P(this.Jt));this.currentState=j.zt(t,s),this.ii=this.currentState}hi(){this.currentState.k.M=[0,0],this.currentState.k.acceleration=[0,0],i(this.currentState.k.position,this.currentState.k.Gs)}Qs(){try{const t=localStorage.getItem(U.Lt+"STATE");if(t){const s=JSON.parse(t);if(s)return s.v!==U.yt?0:(this.Js=s.Js,this.Xs(s.level),this.currentState.k.totalLaunches=s.totalLaunches,this.currentState.k.holeLaunches=s.holeLaunches,s.position&&(this.currentState.k.position=s.position),this.currentState.k._s=!s.Js,1)}}catch(t){}return 0}ti(){localStorage.setItem(U.Lt+"STATE",JSON.stringify({v:U.yt,level:this.si,holeLaunches:this.currentState.k.holeLaunches,totalLaunches:this.currentState.k.totalLaunches,position:this.currentState.k.Gs,Js:this.Js}))}start(){void 0===this.ei&&(this.ei=requestAnimationFrame(this.ni.bind(this)),this.isActive=1)}stop(){this.ei&&cancelAnimationFrame(this.ei),this.ei=void 0,this.isActive=0,this.Js=1}ri(t){let s=.001*t;return this.Ns=s-this.Bs,this.Bs=s,this.$s+=this.Ns,this.zs=.9*this.zs+1/this.Ns*(1-.9),1>this.$s||(this.$s=0),s}oi(){this.Us=N(this.Jt,++this.Ks,this.si.Y,this.si.j,this.si.goalPlanet),this.Hs=(t=>{this.qs=0,this.Ds=0,this.Hs=void 0,this.Us=void 0,this.currentState.k.Os(),this.currentState.k.position=i([0,0],t.spawn),this.currentState.k._s=1,U.h=45,this.Xs(t)}).bind(this)}ai(){}ci(){this.currentState.k.S=1,this.currentState.step(1/U.wt),this.qs=this.currentState.k.Cs}ui(){U.h--,U.h>0||(this.Ds=1)}li(){this.currentState.R[this.currentState.R.length-1].position[0]>this.Us.spawnPlanet.position[0]?(this.currentState.k.position[0]=this.currentState.k.position[0]-3,this.currentState.k.Ft(0),this.currentState.R.forEach((t=>t.position[0]=~~(t.position[0]-3)))):this.Hs(this.Us)}ni(t){if(this.ei=requestAnimationFrame(this.ni.bind(this)),t=this.ri(t),1>=this.Ns){if(!this.Js)for(this.currentState.k.ks(),this.Fs+=this.Ns,this.Fs+=this.Ns;this.Fs>=1/U.wt;){if(this.ii=this.currentState.clone(),this.Hs&&this.Us)this.qs?this.Ds?this.li():(this.currentState.k.S=0,this.ui()):this.ci();else{const{$t:s,Bt:h,Nt:e}=this.currentState.step(1/U.wt);if(s)tt&&!U.muted&&tt(...[.8,,158,,.2,.55,1,1.53,.7,3,-104,.08,.09,,,.1,,.77,.09,.19]),this.currentState.k._s=0,i(this.currentState.k.M,[0,0]),this.ti(),this.oi();else if(h)tt&&!U.muted&&tt(...[.6,,438,,.04,.4,2,1.78,,6.8,,,,.3,-6.2,.5,.04,.8,.05]),this.hi();else if(e){const s=t-this.Ct;this.currentState.k.As&&s>.05&&(this.Ct=t,tt&&!U.muted&&tt(...[,.15,261.6256,.03,,.08,,1.2,-.2,-.1,-50,,-.01,-.2,,,,1.1,,.17]))}}this.Fs-=1/U.wt,t+=this.Ns}this.Ws.us((s=this.ii,((t,s)=>{let i=s.clone();return h(i.k.position,t.k.position,s.k.position),h(i.k.acceleration,t.k.acceleration,s.k.acceleration),h(i.k.M,t.k.M,s.k.M),i})(v(this.currentState,e=this.Fs/this.Ns),v(s,1-e))),this.Js)}var s,e}};et.start(),setInterval((()=>{et.ti()}),1e4),window.addEventListener("unload",(()=>{et.ti()})),window.addEventListener("keypress",(t=>{"r"===t.key?et.hi():"m"===t.key&&(U.muted=!U.muted)}))}();
//# sourceMappingURL=bundle.js.map
