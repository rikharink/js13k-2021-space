!function(){function t(t,s){return t[0]=s[0],t[1]=s[1],t}function s(t,s,i){return t[0]=s[0]+i[0],t[1]=s[1]+i[1],t}function i(t,s,i){return t[0]=s[0]-i[0],t[1]=s[1]-i[1],t}function h(t,s,i){return t[0]=s[0]*i,t[1]=s[1]*i,t}function e(t,s){const i=s[0],h=s[1];let e=i*i+h*h;return e>0&&(e=1/Math.sqrt(e)),t[0]=s[0]*e,t[1]=s[1]*e,t}function n(t,s){const i=t.position[0]-s.position[0],h=t.position[1]-s.position[1],e=t.t+s.t;return e*e>i*i+h*h}function r(t){return[(16711680&t)>>16,(65280&t)>>8,255&t]}function o(t,s){return`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${s})`}function c(t,s){const i=((t,s)=>{const i=s[0]-t[0],h=s[1]-t[1];return i*i+h*h})(s.position,t.position);return 0!==i?x*(s.i/i):0}function u(t,s){let i=t.clone();return h(i.h.position,i.h.position,s),h(i.h.acceleration,i.h.acceleration,s),h(i.h.o,i.h.o,s),i.u(),i}function a(t,s,i){t.fillStyle=o(i,1),t.beginPath(),t.arc(s.position[0],s.position[1],s.t,0,6.283185307179586),t.closePath(),t.fill()}function l(t,s,i,h){t.lineWidth=1,t.lineCap="round",t.strokeStyle=o(h,1),t.beginPath(),t.moveTo(s[0],s[1]),t.lineTo(i[0],i[1]),t.closePath(),t.stroke()}class d{constructor(t){this.l=0,this.p=t,window.addEventListener("pointerdown",this.m.bind(this)),window.addEventListener("pointermove",this.m.bind(this)),window.addEventListener("pointerup",this.m.bind(this)),window.addEventListener("blur",this.v.bind(this))}v(){this.l=0}m(t){this.position=this.M(this.p,[t.clientX,t.clientY]),this.l=!!t.buttons}M(t,s){let i=t.getBoundingClientRect();return[t.width/i.width*(s[0]-i.left),t.height/i.height*(s[1]-i.top)]}_(){return this.l}}const x=1;class f{constructor(t,s,i=0,h=[0,0],e=[0,0]){this.position=t,this.t=s,this.i=i,this.o=h,this.acceleration=e}g(t){return n(this,t)}P(t){const s=t[0]-this.position[0],i=t[1]-this.position[1];return this.t*this.t>s*s+i*i}}class w extends f{constructor(s){super([10,10],5,0),this.color=r(13016997),this.S=.9,this.o=[0,0],this.acceleration=[0,0],this.F=0,this.A=0,this.B=t([0,0],this.position),this.I=s}$(){this.q()}q(){const t=this.I._();var s,n,r;!this.F&&t?(this.L=[0,0],this.T=this.I.position):this.F&&!t?(this.A++,h(this.o,this.L,1200*this.k),this.T=void 0,this.L=void 0,this.k=void 0):this.I.position&&this.T&&(n=this.L,r=e(this.L,i(this.L,this.I.position,this.T)),n[0]=-r[0],n[1]=-r[1],this.k=(s=((t,s)=>Math.hypot(s[0]-t[0],s[1]-t[1]))(this.T,this.I.position),Math.max(0,Math.min(100,s))/100)),this.F=t}clone(){let s=new w(this.I);return s.position=t([0,0],this.position),s.o=t([0,0],this.o),s.acceleration=t([0,0],this.acceleration),s.F=this.F,s.L=this.L?t([0,0],this.L):void 0,s.k=this.k,s.T=this.T?t([0,0],this.T):void 0,s}}class p extends f{constructor(t,s,i,h,e,n){super(t,s,1e6*i,e,n),this.color=r(9137564),this.id=h??((t=Math.random)=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(s=>{let i=16*t()|0;return("x"==s?i:3&i|8).toString(16)})))()}get C(){return x*this.i}D(t){return Math.sqrt(this.C/t)}clone(){return new p(t([0,0],this.position),this.t,this.i,this.id,this.o,this.acceleration)}}class m{constructor({size:t,h:s,V:i}){this.size=t,this.h=s,this.V=i}static W(s,i){let h=new w(s);return t(h.position,i.j),new m({size:i.size,h,V:i.G.map((t=>new p(t.position,t.t,t.i,t.id)))})}u(){let t,s=-1/0;for(let i of this.V){let h=c(this.h,i);s>h||(s=h,t=i)}return t}step(r){this.h.$(),this.H=this.u(),(n=>{((n,r)=>{const o=[0,0];t(r.h.B,r.h.position),h(r.h.acceleration,e(o,i(o,r.H.position,r.h.position)),c(r.h,r.H)),s(r.h.o,r.h.o,h(o,r.h.acceleration,n)),s(r.h.position,r.h.position,h(o,r.h.o,n))})(n,this)})(r),((s,i)=>{const e=i.h,r=i.H;if(n(e,r)){t(e.position,e.B);const s=[(e.position[0]*r.t+r.position[1]*e.t)/(e.t+r.t),(e.position[1]*r.t+r.position[1]*e.t)/(e.t+r.t)];let i=Math.sqrt(Math.pow(r.position[0]-s[0],2)+Math.pow(r.position[1]-s[1],2)),n=(r.position[0]-s[0])/i,o=(r.position[1]-s[1])/i,c=2*(e.o[0]*n+e.o[1]*o)/(e.i+r.i);e.o=h(e.o,[e.o[0]-c*e.i*n-c*r.i*n,e.o[1]-c*e.i*o-c*r.i*o],e.S)}})(0,this)}clone(){let s=new m({size:t([0,0],this.size),h:this.h.clone(),V:this.V.map((t=>t.clone()))});return s.H=this.H?.clone(),s}}class v{constructor(t,s){this.J=0,this.p=t,this.K=document.createElement("canvas").getContext("2d"),this.N(),this.O=this.p.getContext("2d"),this.R=s,this.U=((t,s,i,h)=>{const e=document.createElement("canvas");e.id="bg",e.width=t,e.height=750;const n=e.getContext("2d"),c=[];for(;h>0;h--)c.push([i()*t,750*i(),1.2*i()]);n.fillStyle=o(r(2565956),1),n.fillRect(0,0,t,750);for(let t of c??[])n.beginPath(),n.arc(t[0],t[1],t[2],0,360),n.fillStyle=o(r(16512495),.8),n.fill();return e})(1334,0,this.R,2e3)}set X(t){this.J=t}N(){this.p.width=1334,this.p.height=750,this.K.canvas.width=1334,this.K.canvas.height=750}Y(t,s){for(let i of s.V??[])a(t,i,i.color)}Z(t,i){if(a(t,i.h,i.h.color),i.h.L&&i.h.k){let e=[0,0],n=s(e,i.h.position,h(e,i.h.L,75*i.h.k));l(t,i.h.position,n,r(13016997))}}tt(t,s){s.H&&l(t,s.h.position,s.H.position,r(15913899)),t.fillStyle=o(r(16512495),1),t.fillRect(10,10,45,13),t.fillStyle=o(r(2565956),1),t.fillText("FPS: "+this.J,12,20)}st(t){const s=this.K;s.drawImage(this.U,0,0),this.Y(s,t),this.Z(s,t),this.tt(s,t),this.O.drawImage(this.K.canvas,0,0)}}class M{constructor(){this.it=0,document.monetization&&("started"!==document.monetization.state&&"stopped"!==document.monetization.state?document.monetization.addEventListener("monetizationstart",this.ht.bind(this)):this.it="started"===document.monetization.state)}ht(){this.it=1}}var _={size:[1920,1080],j:[719,300],G:[{position:[640,320],t:75,i:75}]};(new class{constructor(){this.X=60,this.isActive=0,this.et=0,this.nt=0,this.rt=0,this.ot=0,this.ct=document.getElementById("g"),this.ut=new d(this.ct),this.at=new M,this.R=(()=>{for(var t=0,s=2166136261;4>t;t++)s=Math.imul(s^"IPTS".charCodeAt(t),16777619);s+=s<<13,s^=s>>>7,s+=s<<3,s^=s>>>17;let i=(s+=s<<5)>>>0,h=()=>(2**31-1&(i=Math.imul(48271,i)))/2**31;return h(),h})(),this.lt=new v(this.ct,this.R),window.addEventListener("focus",this.start.bind(this)),window.addEventListener("blur",this.stop.bind(this)),this.dt(_)}dt(t){this.xt=m.W(this.ut,t)}start(){this.ft=requestAnimationFrame(this.wt.bind(this)),this.isActive=1}stop(){this.ft&&cancelAnimationFrame(this.ft),this.isActive=0}vt(t){let s=.001*t;return this.et=s-this.rt,this.rt=s,this.nt+=this.et,s}Mt(t){this.rt=t,this.nt+=this.et,this.X=.9*this.X+1/this.et*(1-.9),this.lt.X=~~this.X,1>this.nt||(this.nt=0)}wt(t){if(this.ft=requestAnimationFrame(this.wt.bind(this)),t=this.vt(t),this.Mt(t),1>=this.et){for(this.ot+=this.et,this.ot+=this.et;this.ot>=1/164;)this._t=this.xt.clone(),this.xt.step(1/164),this.ot-=1/164,t+=this.et;this.lt.st((i=this._t,((t,i)=>{let h=i.clone();return s(h.h.position,t.h.position,i.h.position),s(h.h.acceleration,t.h.acceleration,i.h.acceleration),s(h.h.o,t.h.o,i.h.o),h.u(),h})(u(this.xt,h=this.ot/this.et),u(i,1-h))))}var i,h}}).start()}();
//# sourceMappingURL=bundle.js.map
