!function(){function t(t){return[(16711680&t)>>16,(65280&t)>>8,255&t]}function s(t,s){return`rgba(${t[0]}, ${t[1]}, ${t[2]}, ${s})`}function i(t,i,h){t.fillStyle=s(h,1),t.beginPath(),t.arc(i.t[0],i.t[1],i.i,0,6.283185307179586),t.closePath(),t.fill()}function h(t,s,i){return t[0]=s[0]+i[0],t[1]=s[1]+i[1],t}function e(t,s,i){return t[0]=s[0]-i[0],t[1]=s[1]-i[1],t}function r(t,s,i){return t[0]=s[0]*i,t[1]=s[1]*i,t}function n(t,s){const i=s[0],h=s[1];let e=i*i+h*h;return e>0&&(e=1/Math.sqrt(e)),t[0]=s[0]*e,t[1]=s[1]*e,t}class o{constructor(t){this.h=0,this.o=t,window.addEventListener("pointerdown",this.u.bind(this)),window.addEventListener("pointermove",this.u.bind(this)),window.addEventListener("pointerup",this.u.bind(this)),window.addEventListener("blur",this.l.bind(this))}get position(){return this.p}l(){this.h=0}u(t){this.p=this.g(this.o,[t.clientX,t.clientY]),this.h=!!t.buttons}g(t,s){let i=t.getBoundingClientRect();return[t.width/i.width*(s[0]-i.left),t.height/i.height*(s[1]-i.top)]}isActive(){return this.h}}class u{constructor({width:t,height:s,m:i,S:h,v:e=200,F:r}){for(this._=[],this.A=i,this.P=h;e>0;e--)this._.push([r()*t,r()*s,1.2*r()])}M(t,s){this.A.M(t,s)}get m(){return this.A}get S(){return this.P}get $(){return this._}}class c{constructor(s){this.I=0,this.o=s,this.o.width=1280,this.o.height=720,this.k=this.o.getContext("2d"),this.q=t(2565956)}set O(t){this.T=t}set W(t){this.I=t}j(){this.T&&this.B(this.T)}C(){const i=this.k;for(let h of this.T?.$??[])i.beginPath(),i.arc(h[0],h[1],h[2],0,360),i.fillStyle=s(t(16512495),.8),i.fill()}B(h){const e=this.k;e.fillStyle=s(this.q,1),e.fillRect(0,0,this.o.width,this.o.height),this.C();for(let t of h.S??[])i(e,t,t.color);i(e,h.m,h.m.color),h.m.D&&((t,i,h,e)=>{t.lineWidth=1,t.lineCap="round",t.strokeStyle=s(e,1),t.beginPath(),t.moveTo(i[0],i[1]),t.lineTo(h[0],h[1]),t.closePath(),t.stroke()})(e,h.m.t,h.m.D.t,t(15913899)),e.fillStyle=s(t(16512495),1),e.fillRect(10,10,45,13),e.fillStyle=s(t(2565956),1),e.fillText("FPS: "+this.I,12,20)}}class a{constructor(t,s){this.G=t,this.H=s}get t(){return this.G}get i(){return this.H}J(t){return((t,s)=>{const i=t.t[0]-s.t[0],h=t.t[1]-s.t[1],e=t.i+s.i;return e*e>i*i+h*h})(this,t)}K(t){const s=t[0]-this.G[0],i=t[1]-this.G[1];return this.H*this.H>s*s+i*i}}class l extends a{constructor(s,i,h){super(s,i),this.L=((t=Math.random)=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(s=>{let i=16*t()|0;return("x"==s?i:3&i|8).toString(16)})))(),this.color=t(9137564),this.N=1e6*h}get id(){return this.L}get R(){return this.N}}class x extends a{constructor(s){super([10,10],5),this.U=[0,0],this.V=[0,0],this.X=[0,0],this.Y=0,this.Z=s,this.color=t(13016997)}set O(t){this.T=t}get isActive(){return this.Y}tt(){let t,s=-1/0;for(let i of this.T.S){let h=this.st(i);s>h||(s=h,t=i)}return t}get D(){return this.it}M(t,s){this.ht(),this.et(s)}ht(){const t=this.Z.isActive();var s,i;!this.Y&&t?this.rt=this.Z.position:this.Y&&!t?this.rt=void 0:this.Z.position&&this.rt&&(s=this.X,i=n(this.X,e(this.X,this.Z.position,this.rt)),s[0]=-i[0],s[1]=-i[1]),this.Y=t}et(t){this.it=this.tt();let s=[0,0];const i=h(s,this.G,h(s,r(s,this.U,t),r(s,this.V,t*t*.5))),e=this.nt(),n=h(s,this.U,r(s,h(s,this.V,e),.5*t));this.G=i,this.V=e,this.U=n}st(t){const s=((t,s)=>{const i=s[0]-t[0],h=s[1]-t[1];return i*i+h*h})(t.t,this.t);return 0!==s?t.R/s:0}nt(){const t=[0,0],s=this.st(this.it);return r(t,n(t,e(t,this.it.t,this.t)),s)}}(new class{constructor(){this.W=60,this.ot=0,this.ut=0,this.ct=0,this.at=0,this.lt=(()=>{for(var t=0,s=2166136261;31>t;t++)s=Math.imul(s^"InterPlanetary Transport System".charCodeAt(t),16777619);s+=s<<13,s^=s>>>7,s+=s<<3,s^=s>>>17;let i=(s+=s<<5)>>>0,h=()=>(2**31-1&(i=Math.imul(48271,i)))/2**31;return h(),h})(),this.o=document.getElementById("g"),this.xt=new o(this.o),this.dt=new c(this.o),this.A=new x(this.xt),this.O=new u({F:this.lt,width:this.o.offsetWidth,height:this.o.offsetHeight,m:this.A,v:2e3,S:[new l([640,360],75,75)]}),window.addEventListener("focus",this.start.bind(this)),window.addEventListener("blur",this.stop.bind(this))}set O(t){this.ft=t,this.A.O=t,this.dt.O=t}get canvas(){return this.o}start(){this.wt=requestAnimationFrame(this.gt.bind(this))}stop(){this.wt&&cancelAnimationFrame(this.wt)}St(t){return this.ot=(t*=.001)-this.ct,this.ct=t,this.ut+=this.ot,t}yt(t){this.ct=t,this.ut+=this.ot,this.W=.9*this.W+1/this.ot*(1-.9),this.dt.W=~~this.W,1>this.ut||(this.ut=0)}gt(t){if(this.wt=requestAnimationFrame(this.gt.bind(this)),t=this.St(t),this.yt(t),1e3>=this.ot){for(this.at+=this.ot;this.at>=1/164;)this.ft.M(t,1/164),this.at-=1/164;this.dt.j()}}}).start()}();
//# sourceMappingURL=bundle.js.map
