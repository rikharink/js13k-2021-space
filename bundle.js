!function(){function t(t,s,i=1e-5){let h;return t===s?1:(h=Math.abs(t-s),0===t||0===s||P>h?i*P>h:i>h/(Math.abs(t)+Math.abs(s)))}function s(t,s){if(s)return t[0]=s[0],t[1]=s[1],t}function i(t,s,i){return t[0]=s[0]+i[0],t[1]=s[1]+i[1],t}function h(t,s,i){return t[0]=s[0]-i[0],t[1]=s[1]-i[1],t}function e(t,s,i){return t[0]=s[0]*i,t[1]=s[1]*i,t}function n(t,s){const i=s[0],h=s[1];let e=i*i+h*h;return e>0&&(e=1/Math.sqrt(e)),t[0]=s[0]*e,t[1]=s[1]*e,t}function r(t,s){return Math.hypot(s[0]-t[0],s[1]-t[1])}function o(t,s){const i=s[0]-t[0],h=s[1]-t[1];return i*i+h*h}function u(t,s,i=1){return t[0]=s[1],t[1]=s[0],i?t[1]=-t[1]:t[0]=-t[0],n(t,t)}function c(t){return[(16711680&t)>>16,(65280&t)>>8,255&t]}function a(t=Math.random){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(s=>{let i=16*t()|0;return("x"==s?i:3&i|8).toString(16)}))}function l(t,s){return`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${s})`}function f(t,s){let i=Math.sin(s),h=Math.cos(s);return t[0]=h,t[1]=i,t[2]=-i,t[3]=h,t[4]=0,t[5]=0,t}function d(t,s,i){let h=s[0],e=s[1];return t[0]=i[0]*h+i[2]*e+i[4],t[1]=i[1]*h+i[3]*e+i[5],t}function x(t,s){const[i,h]=t.position,[e,n]=s.position,[r,o]=s.size;let u=i,c=h;e>i?u=e:i>e+r&&(u=e+r),n>h?c=n:h>n+o&&(c=n+o);let a=new B([i,h],[u,c]);return t.t*t.t>=a.i}function p(t){const s=t.h;let r=[0,0];const o=t.o(s),c=i([0,0],o,e(r,n(r,h(r,o,t.position)),k.u)),a=u([0,0],h(r,o,c));e(a,a,k.l);const l=i([0,0],c,a),f=new B(o,l);return new L(f.p,[k.u/2,k.l/2],s)}function w(t,i){if(t===i)return 0;if(((t,s)=>{const i=t.position[0]-s.position[0],h=t.position[1]-s.position[1],e=t.t+s.t;return e*e>i*i+h*h})(t,i)){let n=[0,0];s(t.position,t.m);const o=[(t.position[0]*i.t+i.position[1]*t.t)/(t.t+i.t),(t.position[1]*i.t+i.position[1]*t.t)/(t.t+i.t)];let u=[0,0];e(u,h(n,i.position,o),1/r(o,i.position));let c=2*(t.g[0]*u[0]+t.g[1]*u[1])/(t.v+i.v);return t.g=e(t.g,[t.g[0]-c*t.v*u[0]-c*i.v*u[0],t.g[1]-c*t.v*u[1]-c*i.v*u[1]],i.M),1}return 0}function m(t,s){const i=o(s.position,t.position);return 0!==i?k._*(s.v/i):0}function g(t,s){let i,h,e;for(h of t){let t=-1/0;for(e of s.S){if(h===e)continue;let s=m(h,e);t>s||(t=s,i=e)}h.k=i}}function v(t,r){if(!t.k||!t.acceleration)return;const o=[0,0];s(t.m,t.position),e(t.acceleration,n(o,h(o,t.k.position,t.position)),m(t,t.k)),t.g||(t.g=[0,0]),i(t.g,t.g,e(o,t.acceleration,r)),i(t.position,t.position,e(o,t.g,r))}function M(t,s){let i=t.clone();return e(i.P.position,i.P.position,s),e(i.P.acceleration,i.P.acceleration,s),e(i.P.g,i.P.g,s),i}function _(t,s,i,h=1){t.fillStyle=l(i,h),t.beginPath(),t.arc(s.position[0],s.position[1],s.t,0,6.283185307179586),t.closePath(),t.fill()}function b(t,s,i,h=1){t.lineWidth=h,t.lineCap="round",t.strokeStyle=l(i,1),t.beginPath(),t.moveTo(s.start[0],s.start[1]),t.lineTo(s.end[0],s.end[1]),t.closePath(),t.stroke()}function y(t,s,r){b(t,s,r);let o=[0,0];s.$(-k.l);let a=i([0,0],s.p,e(o,u([0,0],n(o,h(o,s.start,s.end))),k.l));t.fillStyle=l(c(15913899),1),t.beginPath(),t.moveTo(s.start[0],s.start[1]),t.lineTo(a[0],a[1]),t.lineTo(s.end[0],s.end[1]),t.closePath(),t.fill()}function z(t,s,i,h,{A:e,background:n,text:r}){t.font="normal 12px sans-serif",t.fillStyle=l(n,1),t.fillRect(h[0],h[1],100,20),t.fillStyle=l(e,1),t.fillRect(h[0],h[1],s,20),t.fillStyle=l(r,1),t.strokeStyle="black",t.lineWidth=2,t.strokeText(i,h[0]+108,h[1]+14),t.fillText(i,h[0]+108,h[1]+14)}class S extends class{constructor(){this.B=[],this.C=[]}F(t){return this.B.push(t),{I:()=>this.L(t)}}once(t){this.C.push(t)}L(t){var s=this.B.indexOf(t);s>-1&&this.B.splice(s,1)}q(t){if(this.B.forEach((s=>s(t))),this.C.length>0){const s=this.C;this.C=[],s.forEach((s=>s(t)))}}G(t){return this.F((s=>t.q(s)))}}{constructor(t){super(),this.T=0,this.O=t,window.addEventListener("pointerdown",this.U.bind(this),{passive:0}),window.addEventListener("pointermove",this.U.bind(this),{passive:0}),window.addEventListener("pointerup",this.U.bind(this),{passive:0}),window.addEventListener("blur",this.V.bind(this))}V(){this.T=0}U(t){this.position=this.W(this.O,[t.clientX,t.clientY]),this.T=!!t.buttons,this.q(this.T),t.preventDefault()}W(t,s){let i=t.getBoundingClientRect();return[t.width/i.width*(s[0]-i.left),t.height/i.height*(s[1]-i.top)]}j(){return this.T}}const k={D:[1334,750],H:164,J:"g",seed:"IPTS",K:1e6,_:1,N:2e3,R:0,X:1400,Y:1,u:45,l:18,Z:50,tt:125,st:1e3},P=Math.pow(2,-1022);class ${constructor(t,s){this.position=t,this.t=s}o(t){return[this.position[0]+this.t*Math.cos(t),this.position[1]+this.t*Math.sin(t)]}}class A extends ${constructor(t,i,h=0,e,n,r=.8){super(t,i),this.m=[0,0],s(this.m,this.position),this.v=h,this.g=e,this.acceleration=n,this.M=r}it(t){const s=t[0]-this.position[0],i=t[1]-this.position[1];return this.t*this.t>s*s+i*i}clone(){return new A(s([0,0],this.position),this.t,this.v,s([0,0],this.g),s([0,0],this.acceleration),this.M)}}class B{constructor(t,s){this.start=t,this.end=s}$(t){let s=this.end[0]-this.start[0],i=this.end[1]-this.start[1],h=Math.sqrt(s*s+i*i);return h>0&&(s/=h,i/=h),s*=h+t,i*=h+t,this.start[0]=this.start[0]+s,this.start[1]=this.start[1]+i,this}get p(){return[(this.start[0]+this.end[0])/2,(this.start[1]+this.end[1])/2]}get length(){return r(this.start,this.end)}get i(){return o(this.start,this.end)}}class C{constructor(t,s){this.position=t,this.size=s}static ht(t,s){return new C(t,h([0,0],s,t))}get min(){const t=this.position,s=i([0,0],this.position,this.size);return[Math.min(t[0],s[0]),Math.min(t[1],s[1])]}get max(){const t=this.position,s=i([0,0],this.position,this.size);return[Math.max(t[0],s[0]),Math.max(t[1],s[1])]}}class F extends A{constructor(t,s){super([10,10],5,k.R,[0,0],[0,0]),this.color=c(13016997),this.et=0,this.nt=0,this.rt=0,this.ot=0,this.ut=2,this.ct=2*k.H,this.at=2*k.H,this.lt=0,this.ft=[],this.dt=0,this.xt=0,this.wt=0,this.id=s??a(),this.gt=t}vt(){this.Mt()}step(){if(this._t&&this.wt++,this.wt>30&&(this.wt=0,this.nt=0,this.bt=s([0,0],this.position)),this.lt?(this.at>0||(this.lt=0,k.Y=1),this.at--):(k.Y=1,this.ct>this.at&&(this.at+=.1)),x(this,new C([0,0],k.D)))this.dt=0,this.xt=0;else{this.xt=1;const s=n([0,0],h([0,0],this.position,this.k.position));(t=n([0,0],this.g))[0]*(i=s)[0]+t[1]*i[1]>0?this.dt++:this.dt=0}var t,i;this.dt>k.st&&(this.dt=0,s(this.position,this.bt),this.g=[0,0])}yt(){this.rt+=this.ot,this.ot=0}get zt(){return~~(this.at/this.ct*100)}get _t(){return!(!t((s=this.position)[0],(i=this.m)[0],h)||!t(s[1],i[1],h));var s,i,h}get St(){return this.ut>this.nt}kt(){this.ft.push(s([0,0],this.position)),this.ft.length>k.Z&&this.ft.shift()}Mt(){if(!this.St)return void(k.Y=1);const t=this.gt.j();var i,e,o;!this.et&&t?(this.Pt=[0,0],this.$t=s([0,0],this.gt.position),1>this.nt||(k.Y=.1,this.lt=1)):this.et&&!t?this.At():this.gt.position&&this.$t&&(e=this.Pt,o=n(this.Pt,h(this.Pt,this.gt.position,this.$t)),e[0]=-o[0],e[1]=-o[1],this.Bt=(i=r(this.$t,this.gt.position),Math.max(0,Math.min(100,i))/100)),this.et=t}At(){e(this.g,this.Pt,k.X*this.Bt*(this.lt?.5:1)),this.$t=void 0,this.Pt=void 0,this.Bt=void 0,this.nt++,this.ot++,this.lt=0}clone(){let t=new F(this.gt);return t.id=this.id,t.k=this.k?.clone(),t.position=s([0,0],this.position),t.m=s([0,0],this.m),t.g=s([0,0],this.g),t.acceleration=s([0,0],this.acceleration),t.et=this.et,t.Pt=s([0,0],this.Pt),t.Bt=this.Bt,t.rt=this.rt,t.ot=this.ot,t.nt=this.nt,t.$t=s([0,0],this.$t),t.ut=this.ut,t.at=this.at,t.ft=this.ft.map((t=>s([0,0],t))),t.xt=this.xt,t.dt=this.dt,t}}class I extends A{constructor(t,s,i,h,e,n,r,o){super(t,s,i*k.K,e,n,r),this.color=c(9137564),this.id=h??a(),this.h=o}get Ct(){return k._*this.v}Ft(t){return Math.sqrt(this.Ct/t)}clone(){let t=new I(s([0,0],this.position),this.t,this.v,this.id,this.g,this.acceleration,this.M,this.h);return t.k=this.k,t}}class L{constructor(t,s,i){this.position=t??[0,0],this.It=s??[1,1],this.orientation=i??0}}class q{constructor({size:t,P:s,S:i}){this.Lt=[],this.size=t,this.P=s,this.S=i}static qt(t,i){let h=new F(t);return s(h.position,i.Gt),new q({size:i.size,P:h,S:i.Tt.map((t=>new I(s([0,0],t.position),t.t,t.v,t.id,s([0,0],t.g),s([0,0],t.acceleration),t.M,t.h)))})}step(t){this.P.step(),((t,s)=>{g([s.P,...s.S],s);let i=[s.P,...s.S];for(let s of i)v(s,t*k.Y)})(t,this);const s=(t=>{let s=0,n=0,r=[t.P,...t.S];for(let t of r)for(let i of r)s=w(t,i);let o=t.S.filter((t=>void 0!==t.h));for(let r of o)s=n=((t,s)=>{const n=h([0,0],t.position,s.position),r=[1,0,0,1,0,0];return f(r,-s.orientation),d(n,n,r),x(new $(i([0,0],n,s.It),t.t),new C([0,0],e([0,0],s.It,2)))})(u=t.P,p(r))?(u.g=[0,0],1):0;var u;return{Et:s,Ot:n}})(this);return this.P.kt(),this.Lt=((t,s)=>{if(!t.P.Pt)return[];let i=t.P.clone();i.At();let h=[];for(let e=0;k.tt>e;e++)g([i],t),v(i,s),w(i,i.k),h.push([i.position[0],i.position[1]]);return h})(this,t),s}clone(){let t=new q({size:s([0,0],this.size),P:this.P.clone(),S:this.S.map((t=>t.clone()))});return t.Lt=[...this.Lt.map((t=>s([0,0],t)))],t}}class G{constructor(t,s){this.Ut=0,this.O=t,this.Vt=document.createElement("canvas").getContext("2d"),this.Wt(),this.jt=this.O.getContext("2d"),this.Dt=s,this.Ht=((t,s,i,h)=>{const e=document.createElement("canvas");e.id="bg",e.width=t,e.height=s;const n=e.getContext("2d"),r=[];for(;h>0;h--)r.push([i()*t,i()*s,1.2*i()]);n.fillStyle=l(c(2565956),1),n.fillRect(0,0,t,s);for(let t of r??[])n.beginPath(),n.arc(t[0],t[1],t[2],0,360),n.fillStyle=l(c(16512495),.8),n.fill();return e})(k.D[0],k.D[1],this.Dt,k.N)}set Jt(t){this.Ut=t}Wt(){this.O.width=k.D[0],this.O.height=k.D[1],this.Vt.canvas.width=k.D[0],this.Vt.canvas.height=k.D[1]}Kt(t,s){let r=[0,0];for(let o of s.S??[])if(_(t,o,o.color),void 0!==o.h){const s=o.o(o.h),u=i([0,0],s,e(r,n(r,h(r,s,o.position)),k.u));y(t,new B(s,u),c(13016997))}}Nt(t,s){for(let i=s.P.ft.length-1;i>0;i--){const h=i/(s.P.ft.length-1);_(t,new $(s.P.ft[i],s.P.t),s.P.color,h)}if(s.P.St&&s.P.Pt&&s.P.Bt&&s.P.$t){let r=[0,0];const o=s.P.$t,u=i(r,o,e(r,s.P.Pt,200*s.P.Bt));((t,s,r)=>{_(t,new $(s.start,3),r);const o=n([0,0],h([0,0],s.end,s.start)),u=f([1,0,0,1,0,0],2.356194490192345),c=f([1,0,0,1,0,0],-2.356194490192345),a=d([0,0],o,u),l=d([0,0],o,c);e(a,a,10),e(l,l,10);const x=new B(s.end,i([0,0],s.end,a)),p=new B(s.end,i([0,0],s.end,l));b(t,s,r,3),b(t,x,r,3),b(t,p,r,3)})(t,new B(o,u),c(16512495)),this.Qt(t,s)}}Qt(t,s){for(let i of s.Lt)_(t,new $(i,1),c(16512495))}Rt(t,s){const i=c(16512495),h={A:c(15913899),background:c(9137564),text:i};t.font="normal 32px sans-serif",t.fillStyle=l(i,1);const e=""+s.P.rt;if(t.strokeStyle="black",t.lineWidth=4,t.strokeText(e,8,32),t.fillText(e,8,32),s.P.ot>0){const i=t.measureText(e),h=`${s.P.ot>0?"+":""}${s.P.ot}`;t.strokeText(h,i.width+24,32),t.fillText(h,i.width+24,32)}let n=k.D[1]-28;z(t,s.P.zt,"slo-mo",[8,n],h),n-=26,z(t,100-s.P.nt/s.P.ut*100,"launches",[8,n],h),n-=26;const r=~~(100-s.P.dt/k.st*100);100>r&&z(t,r,"respawn",[8,n],h)}Xt(t){const s=this.Vt;s.drawImage(this.Ht,0,0),this.Kt(s,t),this.Nt(s,t),this.Rt(s,t),this.jt.drawImage(this.Vt.canvas,0,0)}}class T{constructor(){this.Yt=0,document.monetization&&("started"!==document.monetization.state&&"stopped"!==document.monetization.state?document.monetization.addEventListener("monetizationstart",this.Zt.bind(this)):(this.Yt="started"===document.monetization.state,this.Yt&&this.ts()))}Zt(){this.Yt=1,this.ts()}ts(){}}var E={size:[1920,1080],Gt:[155,246],Tt:[{position:[200,320],t:75,v:75},{position:[600,520],t:75,v:75},{position:[950,120],t:100,v:100,h:0}]};(new class{constructor(){this.Jt=60,this.isActive=0,this.ss=0,this.hs=0,this.es=0,this.ns=0,this.rs=document.getElementById(k.J),this.os=new S(this.rs),this.os.once((()=>this.us=new AudioContext).bind(this)),this.cs=new T,this.Dt=(t=>{for(var s=0,i=2166136261;t.length>s;s++)i=Math.imul(i^t.charCodeAt(s),16777619);i+=i<<13,i^=i>>>7,i+=i<<3,i^=i>>>17;let h=(i+=i<<5)>>>0,e=()=>(2**31-1&(h=Math.imul(48271,h)))/2**31;return e(),e})(k.seed),this.ls=new G(this.rs,this.Dt),window.addEventListener("focus",this.start.bind(this)),window.addEventListener("blur",this.stop.bind(this)),this.fs(E)}fs(t){this.currentState=q.qt(this.os,t),this.ds=this.currentState}start(){void 0===this.xs&&(this.xs=requestAnimationFrame(this.ps.bind(this)),this.isActive=1)}stop(){this.xs&&cancelAnimationFrame(this.xs),this.xs=void 0,this.isActive=0}ws(t){let s=.001*t;return this.ss=s-this.es,this.es=s,this.hs+=this.ss,this.Jt=.9*this.Jt+1/this.ss*(1-.9),this.ls.Jt=~~this.Jt,1>this.hs||(this.hs=0),s}ps(t){if(this.xs=requestAnimationFrame(this.ps.bind(this)),t=this.ws(t),1>=this.ss){for(this.currentState.P.vt(),this.ns+=this.ss,this.ns+=this.ss;this.ns>=1/k.H;)this.ds=this.currentState.clone(),this.currentState.step(1/k.H).Ot&&(this.currentState.P.yt(),this.currentState.P.position=s([0,0],E.Gt)),this.ns-=1/k.H,t+=this.ss;this.ls.Xt((h=this.ds,((t,s)=>{let h=s.clone();return i(h.P.position,t.P.position,s.P.position),i(h.P.acceleration,t.P.acceleration,s.P.acceleration),i(h.P.g,t.P.g,s.P.g),h})(M(this.currentState,e=this.ns/this.ss),M(h,1-e))))}var h,e}}).start()}();
//# sourceMappingURL=bundle.js.map
