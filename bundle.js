!function(){function t(t,s,i){let h;return i=i??1e-5,t===s?1:(h=Math.abs(t-s),0===t||0===s||q>h?i*q>h:i>h/(Math.abs(t)+Math.abs(s)))}function s(t,s){if(s)return t[0]=s[0],t[1]=s[1],t}function i(t,s,i){return t[0]=s[0]+i[0],t[1]=s[1]+i[1],t}function h(t,s,i){return t[0]=s[0]-i[0],t[1]=s[1]-i[1],t}function e(t,s,i){return t[0]=s[0]*i,t[1]=s[1]*i,t}function n(t,s){const i=s[0],h=s[1];let e=i*i+h*h;return e>0&&(e=1/Math.sqrt(e)),t[0]=s[0]*e,t[1]=s[1]*e,t}function r(t,s){return Math.hypot(s[0]-t[0],s[1]-t[1])}function o(t,s){const i=s[0]-t[0],h=s[1]-t[1];return i*i+h*h}function a(t,s,i=1){return t[0]=s[1],t[1]=s[0],i?t[1]=-t[1]:t[0]=-t[0],n(t,t)}function c(t){return[(16711680&t)>>16,(65280&t)>>8,255&t]}function u(t){return t=t??Math.random,"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(s=>{let i=16*t()|0;return("x"==s?i:3&i|8).toString(16)}))}function l(t,s){return`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${s})`}function f(t,s){let i=Math.sin(s),h=Math.cos(s);return t[0]=h,t[1]=i,t[2]=-i,t[3]=h,t[4]=0,t[5]=0,t}function d(t,s,i){let h=s[0],e=s[1];return t[0]=i[0]*h+i[2]*e+i[4],t[1]=i[1]*h+i[3]*e+i[5],t}function w(t,s){const i=o(t.position,s.position),h=t.t+s.t;return h*h>i}function p(t,s){const[i,h]=t.position,[e,n]=s.position,[r,o]=s.size;let a=i,c=h;e>i?a=e:i>e+r&&(a=e+r),n>h?c=n:h>n+o&&(c=n+o);let u=new J([i,h],[a,c]);return t.t*t.t>=u.i}function x(t){const s=t.h;let r=[0,0];const o=t.o(s),c=i([0,0],o,e(r,n(r,h(r,o,t.position)),G.u)),u=a([0,0],h(r,o,c));e(u,u,G.l);const l=i([0,0],c,u),f=new J(o,l);return new H(f.p,[G.u/2,G.l/2],s)}function m(t,i){if(t===i)return 0;if(!t.m)return 0;if(w(t,i)){let n=[0,0];s(t.position,t.g);const o=[(t.position[0]*i.t+i.position[1]*t.t)/(t.t+i.t),(t.position[1]*i.t+i.position[1]*t.t)/(t.t+i.t)];let a=[0,0];e(a,h(n,i.position,o),1/r(o,i.position));let c=2*(t.m[0]*a[0]+t.m[1]*a[1])/(t.M+i.M);return t.m=e(t.m,[t.m[0]-c*t.M*a[0]-c*i.M*a[0],t.m[1]-c*t.M*a[1]-c*i.M*a[1]],i.P),1}return 0}function g(t,s){return((t,s)=>{const n=h([0,0],t.position,s.position),r=[1,0,0,1,0,0];return f(r,-s.orientation),d(n,n,r),p(new N(i([0,0],n,s._),t.t),new R([0,0],e([0,0],s._,2)))})(t,s)?(t.m=[0,0],1):0}function v(t,s){const i=o(s.position,t.position);return 0!==i?G.S*(s.M/i):0}function M(t,s){let i,h,e;for(h of t){let t=-1/0;for(e of s.L){if(h===e)continue;let s=v(h,e);t>s||(t=s,i=e)}h.k=i}}function P(t,r){if(!t.k||!t.acceleration)return;const o=[0,0];s(t.g,t.position),e(t.acceleration,n(o,h(o,t.k.position,t.position)),v(t,t.k)),t.m||(t.m=[0,0]),i(t.m,t.m,e(o,t.acceleration,r)),i(t.position,t.position,e(o,t.m,r))}function b(t,s){let i=t.clone();return e(i.I.position,i.I.position,s),e(i.I.acceleration,i.I.acceleration,s),e(i.I.m,i.I.m,s),i}function y(t,s,i,h=1){t.fillStyle=l(i,h),t.beginPath(),t.arc(s.position[0],s.position[1],s.t,0,T),t.closePath(),t.fill()}function _(t,s,i,h=1){t.lineWidth=h,t.lineCap="round",t.strokeStyle=l(i,1),t.beginPath(),t.moveTo(s.start[0],s.start[1]),t.lineTo(s.end[0],s.end[1]),t.closePath(),t.stroke()}function S(t,s,r,o,u){if(0===G.u)return;_(t,r,u);let f=[0,0];t.save(),t.font="bold 16px sans-serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle";const d=t.measureText(s=`  ${s}  `);t.restore(),r.$(-G.l);let w=r.p,p=a([0,0],n(f,h(f,r.start,r.end))),x=i([0,0],w,e(f,p,G.l/1.5+d.width)),m=i([0,0],r.start,e(f,p,d.width)),g=i([0,0],r.end,e(f,p,d.width));t.fillStyle=l(c(15913899),1),t.beginPath(),t.moveTo(r.start[0],r.start[1]),t.lineTo(m[0],m[1]),t.lineTo(x[0],x[1]),t.lineTo(g[0],g[1]),t.lineTo(r.end[0],r.end[1]),t.closePath(),t.fill(),t.save();const v=new J(w,new J(m,g).p).p;t.translate(v[0],v[1]),t.rotate(.5*Math.PI+o),t.translate(-v[0],-v[1]),t.font="bold 18px sans-serif",t.fillStyle="black",t.textAlign="center",t.textBaseline="middle",t.fillText(s,v[0],v[1]),t.restore()}function L(t,s,i,h,{A:e,background:n,text:r}){t.font="normal 12px sans-serif",t.fillStyle=l(n,1),t.fillRect(h[0],h[1],100,20),t.fillStyle=l(e,1),t.fillRect(h[0],h[1],s,20),t.fillStyle=l(r,1),t.strokeStyle="black",t.lineWidth=2,t.strokeText(i,h[0]+108,h[1]+14),t.fillText(i,h[0]+108,h[1]+14)}function z(t,s,i){return t()*(i-s+1)+s}function k(t){return z(t,0,T)}function I(t){let s=Math.floor(z(t,20,100)),i=s;return{id:u(t),position:[0,0],t:s,M:i,B:[]}}function $(t,s){let i=s.filter((s=>s.id!==t.id));return((t,s)=>{const i=new N(t.position,t.t);for(let t of s)if(w(i,new N(t.position,t.t)))return 1;return 0})(t,i)||((t,s)=>{let i=3*t.t;for(let h of s)if(i>r(t.position,h.position)-h.t)return 1;return 0})(t,i)}function A(t,s,i){s.position=[z(t,i.position[0],i.size[0]),z(t,i.position[1],i.size[1])]}function B(t,s){const r=s[s.length-1],o=new N(r.position,r.t);r.h=k(t);const a=o.o(r.h);return i([0,0],a,e([0,0],n([0,0],h([0,0],a,r.position)),G.u)),r}function F(t,s,r){const o=G.F,a=((t,s,i,h)=>{const e=((t,s,i)=>{if(void 0!==i)return{position:[2*i.t,i.position[1]],t:i.t,M:i.M,B:[...i.B]};const h=I(t),e=z(t,0,h.t),n=z(t,0,h.t);return h.position=[2*h.t+e,2*h.t+n],h})(t,0,h),n=((t,s,i)=>{const h=I(t),e=h.t+G.u;return h.position=[z(t,i[0]-2*e,i[0]-e),z(t,e,i[1]-e)],h})(t,0,s);let r=e.position[0]+2*e.t,o=[];do{let i;do{i=I(t),A(t,i,new R([r,2*i.t],[Math.min(r+4*i.t,n.position[0]-n.t),s[1]-2*i.t]))}while($(i,[e,...o,n]));r=i.position[0]+2*i.t,o.push(i)}while(n.position[0]>r);return[e,...o,n]})(t,o,0,r),{spawnPlanet:c,C:u}=((t,s,r)=>{const o=s[0],a=new N(o.position,o.t);let c;const u=r??k(t);return c=a.o(u),i(c,c,e([0,0],n([0,0],h([0,0],c,o.position)),G.G)),{spawnPlanet:o,C:c}})(t,a,r?.h);return{number:s,size:o,spawn:u,bodies:a,spawnPlanet:c,goalPlanet:B(t,a)}}class C extends class{constructor(){this.T=[],this.q=[]}N(t){return this.T.push(t),{O:()=>this.J(t)}}once(t){this.q.push(t)}J(t){var s=this.T.indexOf(t);s>-1&&this.T.splice(s,1)}R(t){if(this.T.forEach((s=>s(t))),this.q.length>0){const s=this.q;this.q=[],s.forEach((s=>s(t)))}}D(t){return this.N((s=>t.R(s)))}}{constructor(t){super(),this.H=0,this.K=t,window.addEventListener("pointerdown",this.U.bind(this)),window.addEventListener("pointermove",this.U.bind(this)),window.addEventListener("pointerup",this.U.bind(this)),window.addEventListener("blur",this.W.bind(this))}W(){this.H=0}U(t){this.position=this.j(this.K,[t.clientX,t.clientY]),this.H=!!t.buttons,this.R(this.H)}j(t,s){let i=t.getBoundingClientRect();return[t.width/i.width*(s[0]-i.left),t.height/i.height*(s[1]-i.top)]}V(){return this.H}}const G={F:[1334,750],X:164,Y:"g",seed:"IPTS",Z:1e6,S:.8,tt:2e3,G:5,st:0,it:1400,ht:1,u:45,l:18,et:50,nt:125,rt:1e3,ot:[200,25,1334,725],ct:"HAR-INK-IPTS"},T=2*Math.PI,q=Math.pow(2,-1022);class N{constructor(t,s){this.position=t,this.t=s}o(t){return[this.position[0]+this.t*Math.cos(t),this.position[1]+this.t*Math.sin(t)]}}class O extends N{constructor(t,i,h=0,e,n,r){super(t,i),this.g=[0,0],s(this.g,this.position),this.M=h,this.m=e,this.acceleration=n,this.P=r??.8}ut(t){const s=t[0]-this.position[0],i=t[1]-this.position[1];return this.t*this.t>s*s+i*i}clone(){return new O(s([0,0],this.position),this.t,this.M,s([0,0],this.m),s([0,0],this.acceleration),this.P)}}class J{constructor(t,s){this.start=t,this.end=s}$(t){let s=this.end[0]-this.start[0],i=this.end[1]-this.start[1],h=Math.sqrt(s*s+i*i);return h>0&&(s/=h,i/=h),s*=h+t,i*=h+t,this.start[0]=this.start[0]+s,this.start[1]=this.start[1]+i,this}get p(){return[(this.start[0]+this.end[0])/2,(this.start[1]+this.end[1])/2]}get length(){return r(this.start,this.end)}get i(){return o(this.start,this.end)}}class R{constructor(t,s){this.position=t,this.size=s}static lt(t,s){return new R(t,h([0,0],s,t))}get min(){const t=this.position,s=i([0,0],this.position,this.size);return[Math.min(t[0],s[0]),Math.min(t[1],s[1])]}get max(){const t=this.position,s=i([0,0],this.position,this.size);return[Math.max(t[0],s[0]),Math.max(t[1],s[1])]}}class D extends O{constructor(t,s){super([10,10],G.G,G.st,[0,0],[0,0]),this.color=c(13016997),this.ft=0,this.dt=0,this.totalLaunches=0,this.holeLaunches=0,this.wt=3,this.xt=2*G.X,this.gt=2*G.X,this.vt=0,this.Mt=[],this.Pt=0,this.bt=0,this.yt=0,this._t=0,this.St=1,this.id=s??u(),this.Lt=t}zt(){this.kt()}step(){if(this.It&&this.yt++,this.yt>30&&(this.yt=0,this._t=0,this.dt=0,this.$t=s([0,0],this.position)),this.dt===this.wt&&this._t++,this._t>3*G.X&&(this.dt=Math.min(0,this.dt-1),this._t=0),this.vt?(this.gt>0||(this.vt=0,G.ht=1),this.gt--):(G.ht=1,this.xt>this.gt&&(this.gt+=.1)),this.k&&!p(this,new R([0,0],G.F))){this.bt=1;const s=n([0,0],h([0,0],this.position,this.k.position));(t=n([0,0],this.m))[0]*(i=s)[0]+t[1]*i[1]>0?this.Pt++:this.Pt=0}else this.Pt=0,this.bt=0;var t,i;this.Pt>G.rt&&(this.Pt=0,s(this.position,this.$t),this.m=[0,0])}At(){this.totalLaunches+=this.holeLaunches,this.holeLaunches=0}get Bt(){return~~(this.gt/this.xt*100)}get It(){return!(!t((s=this.position)[0],(i=this.g)[0],h)||!t(s[1],i[1],h));var s,i,h}get Ft(){return this.wt>this.dt}Ct(t){t??1?(this.Mt.push(s([0,0],this.position)),this.Mt.length>G.et&&this.Mt.shift()):this.Mt=[s([0,0],this.position),s([0,0],this.position)]}kt(){if(!this.Ft)return void(G.ht=1);const t=this.Lt.V();var i,e,o;!this.ft&&t?(this.Gt=[0,0],this.Tt=s([0,0],this.Lt.position),1>this.dt||(G.ht=.1,this.vt=1)):this.ft&&!t?this.qt():this.Lt.position&&this.Tt&&(e=this.Gt,o=n(this.Gt,h(this.Gt,this.Lt.position,this.Tt)),e[0]=-o[0],e[1]=-o[1],this.Nt=(i=r(this.Tt,this.Lt.position),Math.max(0,Math.min(100,i))/100)),this.ft=t}qt(){e(this.m,this.Gt,G.it*this.Nt*(this.vt?.5:1)),this.Tt=void 0,this.Gt=void 0,this.Nt=void 0,this.dt++,this.holeLaunches++,this.vt=0}clone(){let t=new D(this.Lt);return t.id=this.id,t.k=this.k?.clone(),t.position=s([0,0],this.position),t.g=s([0,0],this.g),t.m=s([0,0],this.m),t.acceleration=s([0,0],this.acceleration),t.ft=this.ft,t.Gt=s([0,0],this.Gt),t.Nt=this.Nt,t.totalLaunches=this.totalLaunches,t.holeLaunches=this.holeLaunches,t.dt=this.dt,t.Tt=s([0,0],this.Tt),t.wt=this.wt,t.gt=this.gt,t.Mt=this.Mt.map((t=>s([0,0],t))),t.bt=this.bt,t.Pt=this.Pt,t.St=this.St,t}}class E extends O{constructor(t,s,i,h,e,n,r,o,a){super(t,s,i*G.Z,e,n,r),this.color=c(9137564),this.id=h??u(),this.h=o,this.B=a??[]}get Ot(){return G.S*this.M}Jt(t,i){let o=[0,0];const c=a(o,n(o,h(o,this.position,t.position)),i??1);t.acceleration=[0,0],t.m=[0,0],s(t.m,e(o,c,Math.sqrt(this.Ot/r(t.position,this.position)))),this.B.push(t.id)}clone(){let t=new E(s([0,0],this.position),this.t,this.M,this.id,this.m,this.acceleration,this.P,this.h);return t.k=this.k,t.B=[...this.B],t}}class H{constructor(t,s,i){this.position=t??[0,0],this._=s??[1,1],this.orientation=i??0}}class K{constructor({size:t,I:s,L:i,Rt:h,spawnPlanet:e,goalPlanet:n}){this.Dt=[],this.size=t,this.I=s,this.L=i,this.Rt=h??1,this.spawnPlanet=e,this.goalPlanet=n}static Et(t){return new E(s([0,0],t.position),t.t,t.M,t.id,s([0,0],t.m),s([0,0],t.acceleration),t.P,t.h,t.B)}Ht(){const t=this.goalPlanet.o(this.goalPlanet.h);return i(t,t,e([0,0],n([0,0],h([0,0],t,this.goalPlanet.position)),G.u))}static Kt(t,i,h){s((h=h??new D(t)).position,i.spawn);const e=new K({Rt:i.number,size:i.size,I:h,L:i.bodies.map(K.Et),spawnPlanet:K.Et(i.spawnPlanet??i.bodies[0]),goalPlanet:K.Et(i.goalPlanet??i.bodies[i.bodies.length-1])});for(let t of e.L){const s=t.B.flatMap((t=>e.L.filter((s=>s.id===t))));for(let i of s)t.Jt(i)}return e}step(t){this.I.step(),((t,s)=>{M([s.I,...s.L],s);let i=[s.I,...s.L];for(let s of i)P(s,t*G.ht)})(t,this);const s=(t=>{let s=0,i=0,h=t.I,e=t.L;for(let t of e)s=m(h,t);let n=t.L.filter((t=>void 0!==t.h));for(let h of n)s=i=g(t.I,x(h));return{Ut:s,Wt:i}})(this);return this.I.Ct(),this.Dt=((t,s)=>{if(!t.I.Gt)return[];let i=t.I.clone();i.qt();let h=[];for(let e=0;G.nt>e;e++)M([i],t),P(i,s),m(i,i.k),h.push([i.position[0],i.position[1]]);return h})(this,t),s}clone(){let t=new K({size:s([0,0],this.size),I:this.I.clone(),L:this.L.map((t=>t.clone())),Rt:this.Rt,spawnPlanet:this.spawnPlanet.clone(),goalPlanet:this.goalPlanet.clone()});return t.Dt=[...this.Dt.map((t=>s([0,0],t)))],t}}class U{constructor(t,s){this.jt=0,this.K=t,this.Qt=document.createElement("canvas").getContext("2d"),this.Vt(),this.Xt=this.K.getContext("2d"),this.Yt=s,this.Zt=((t,s,i,h)=>{const e=document.createElement("canvas");e.id="bg",e.width=t,e.height=s;const n=e.getContext("2d"),r=[];for(;h>0;h--)r.push([i()*t,i()*s,1.2*i()]);n.fillStyle=l(c(2565956),1),n.fillRect(0,0,t,s);for(let t of r??[])n.beginPath(),n.arc(t[0],t[1],t[2],0,360),n.fillStyle=l(c(16512495),.8),n.fill();return e})(G.F[0],G.F[1],this.Yt,G.tt)}set ts(t){this.jt=t}Vt(){this.K.width=G.F[0],this.K.height=G.F[1],this.Qt.canvas.width=G.F[0],this.Qt.canvas.height=G.F[1]}ss(t,s){t.save();let r=[0,0];for(let o of s.L??[])if(y(t,o,o.color),void 0!==o.h){const a=o.o(o.h),u=i([0,0],a,e(r,n(r,h(r,a,o.position)),G.u));S(t,""+s.Rt,new J(a,u),o.h,c(13016997))}t.restore()}hs(t,s){t.save();for(let i=s.I.Mt.length-1;i>0;i--){const h=i/(s.I.Mt.length-1);y(t,new N(s.I.Mt[i],s.I.t),s.I.color,h)}if(s.I.Ft&&s.I.Gt&&s.I.Nt&&s.I.Tt){let r=[0,0];const o=s.I.Tt,a=i(r,o,e(r,s.I.Gt,200*s.I.Nt));((t,s,r)=>{y(t,new N(s.start,3),r);const o=n([0,0],h([0,0],s.end,s.start)),a=f([1,0,0,1,0,0],2.356194490192345),c=f([1,0,0,1,0,0],-2.356194490192345),u=d([0,0],o,a),l=d([0,0],o,c);e(u,u,10),e(l,l,10);const w=new J(s.end,i([0,0],s.end,u)),p=new J(s.end,i([0,0],s.end,l));_(t,s,r,3),_(t,w,r,3),_(t,p,r,3)})(t,new J(o,a),c(16512495)),this.es(t,s)}t.restore()}es(t,s){t.save();for(let i of s.Dt)y(t,new N(i,1),c(16512495));t.restore()}ns(t,s){t.save();const i=c(16512495),h={A:c(15913899),background:c(9137564),text:i};let e;t.font="normal 32px sans-serif",t.fillStyle=l(i,1),t.strokeStyle="black",t.lineWidth=4,t.textAlign="center",t.textBaseline="middle";let n=G.F[0]/2,r=24;const o=""+s.I.totalLaunches;if(e=t.measureText(o),t.strokeText(o,n,r),t.fillText(o,n,r),n+=e.width+24,s.I.holeLaunches>0){const i=`${s.I.holeLaunches>0?"+":""}${s.I.holeLaunches}`;t.strokeText(i,n,r),t.fillText(i,n,r)}t.restore(),t.save(),n=8,r=G.F[1]-28,L(t,s.I.Bt,"slo-mo",[n,r],h),r-=26,L(t,100-s.I.dt/s.I.wt*100,"launches",[n,r],h),r-=26;const a=~~(100-s.I.Pt/G.rt*100);100>a&&L(t,a,"respawn",[n,r],h),t.restore()}rs(t,s){t.save(),t.restore()}os(t){const s=this.Qt;s.save(),s.drawImage(this.Zt,0,0),this.ss(s,t),this.hs(s,t),this.ns(s,t),this.Xt.drawImage(this.Qt.canvas,0,0),s.restore()}}let W;class j{constructor(){this.cs=0,document.monetization&&("started"!==document.monetization.state&&"stopped"!==document.monetization.state?document.monetization.addEventListener("monetizationstart",this.us.bind(this)):(this.cs="started"===document.monetization.state,this.cs&&this.ls()))}us(){this.cs=1,this.ls()}ls(){}}(new class{constructor(){this.ts=60,this.isActive=0,this.fs=0,this.ds=0,this.ws=0,this.ps=0,this.xs=1,this.gs=void 0,this.vs=void 0,this.Ms=0,this.Ps=0,this.bs=document.getElementById(G.Y),this.ys=new C(this.bs),this._s=new j,this.Yt=(t=>{for(var s=0,i=2166136261;t.length>s;s++)i=Math.imul(i^t.charCodeAt(s),16777619);i+=i<<13,i^=i>>>7,i+=i<<3,i^=i>>>17,W=(i+=i<<5)>>>0;let h=()=>(2**31-1&(W=Math.imul(48271,W)))/2**31;return h(),h})(G.seed),this.Ss=new U(this.bs,this.Yt),window.addEventListener("focus",this.start.bind(this)),window.addEventListener("blur",this.stop.bind(this)),this.Ls()||this.zs(F(this.Yt,this.xs))}zs(t){this.xs=t.number,this.ks=t,this.currentState=K.Kt(this.ys,t,this.currentState?.I),this.Is=this.currentState}$s(){this.currentState.I.m=[0,0],this.currentState.I.acceleration=[0,0],this.zs(this.ks)}Ls(){const t=localStorage.getItem(G.ct);if(t)try{const s=JSON.parse(t);if(s)return W=s.seed,this.zs(s.level),this.currentState.I.totalLaunches=s.totalLaunches,this.currentState.I.holeLaunches=s.holeLaunches,1}catch{}return 0}As(){localStorage.setItem(G.ct,JSON.stringify({v:1,level:this.ks,seed:W,holeLaunches:this.currentState.I.holeLaunches,totalLaunches:this.currentState.I.totalLaunches}))}start(){void 0===this.Bs&&(this.Bs=requestAnimationFrame(this.Fs.bind(this)),this.isActive=1)}stop(){this.Bs&&cancelAnimationFrame(this.Bs),this.Bs=void 0,this.isActive=0}Cs(t){let s=.001*t;return this.fs=s-this.ws,this.ws=s,this.ds+=this.fs,this.ts=.9*this.ts+1/this.fs*(1-.9),this.Ss.ts=~~this.ts,1>this.ds||(this.ds=0),s}Gs(){this.vs=F(this.Yt,++this.xs,this.ks.goalPlanet),this.gs=(t=>{this.Ms=0,this.Ps=0,this.gs=void 0,this.vs=void 0,this.currentState.I.At(),this.currentState.I.position=s([0,0],t.spawn),this.currentState.I.St=1,G.u=45,this.zs(t)}).bind(this)}Ts(){this.currentState.step(1/G.X),this.Ms=this.currentState.I.It}qs(){G.u--,G.u>0||(this.Ps=1)}Ns(){this.currentState.L[this.currentState.L.length-1].position[0]>this.vs.spawnPlanet.position[0]?(this.currentState.I.position[0]=this.currentState.I.position[0]-3,this.currentState.I.Ct(0),this.currentState.L.forEach((t=>t.position[0]=~~(t.position[0]-3)))):this.gs(this.vs)}Fs(t){if(this.Bs=requestAnimationFrame(this.Fs.bind(this)),t=this.Cs(t),1>=this.fs){for(this.currentState.I.zt(),this.ps+=this.fs,this.ps+=this.fs;this.ps>=1/G.X;){if(this.Is=this.currentState.clone(),this.gs&&this.vs)this.Ms?this.Ps?this.Ns():this.qs():this.Ts();else{const{Wt:t}=this.currentState.step(1/G.X);t&&(this.currentState.I.St=0,s(this.currentState.I.m,[0,0]),this.Gs())}this.ps-=1/G.X,t+=this.fs}this.Ss.os((h=this.Is,((t,s)=>{let h=s.clone();return i(h.I.position,t.I.position,s.I.position),i(h.I.acceleration,t.I.acceleration,s.I.acceleration),i(h.I.m,t.I.m,s.I.m),h})(b(this.currentState,e=this.ps/this.fs),b(h,1-e)))),this.As()}var h,e}}).start()}();
//# sourceMappingURL=bundle.js.map
