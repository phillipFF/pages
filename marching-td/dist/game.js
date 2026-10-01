"use strict";(()=>{function Hc(){return{accumulatorMs:0,paused:!1}}function kc(i,e,t,n){if(i.paused||e<=0)return;i.accumulatorMs+=e;let r=t*5;for(i.accumulatorMs>r&&(i.accumulatorMs=r);i.accumulatorMs>=t;)i.accumulatorMs-=t,n()}function Gc(i,e){return e<=0?0:i.accumulatorMs/e}function Vc(i){let e=()=>i(document.visibilityState!=="hidden");document.addEventListener("visibilitychange",e),e()}var St={width:13.5,height:24},Xd=[[.6,14.6],[2.6,14.2],[4.6,13.2],[6.6,12.4],[7.8,11.2],[7.2,9.8],[5,9],[2.6,8.4],[1.4,7],[2,5.6],[4.2,5],[6.4,4.2],[7.4,2.8]],Wc=Xd.map(([i,e])=>[i*1.5,e*1.5]),Sr={startingGold:175,incomePerSecond:15,unitBounty:15,buildingBounty:60},Xc=["tank","warrior","archer","swarm"],nn={tank:{cost:75,hp:1300,speed:1.05,damage:20,cooldown:1.2,range:1.9,threat:3},warrior:{cost:55,hp:260,speed:1.4,damage:85,cooldown:1,range:1.9,threat:0},archer:{cost:55,hp:150,speed:1.2,damage:70,cooldown:1,range:3.8,threat:0},swarm:{cost:50,hp:40,speed:2.4,damage:30,cooldown:.8,range:1.7,threat:0}},wr=3,At={hp:150,damage:53,cooldown:1,range:.9,speed:1.2,aggro:4.5,leash:6,postSpread:2.4,postLane:.75},rn={hp:1e3,damage:105,cooldown:1.4,range:4.5,spawnEvery:5,maxTroops:5,buildTime:1.5},An={hp:2e3,damage:120,cooldown:1.4,range:4.5,spawnEvery:5,maxTroops:5},Yc=[{f:.18,side:-1},{f:.34,side:1},{f:.5,side:-1},{f:.66,side:1},{f:.82,side:-1}],Ma=[{f:.26,side:1},{f:.42,side:-1},{f:.58,side:1},{f:.74,side:-1},{f:.9,side:1}],Eo=1.35,Oi={firstBuildAt:6,buildEvery:7,buildAheadMin:3.5,maxLiveTowers:5,paceTarget:.55},Sa=90;var jc=16;function qc(i,e,t,n,r){let a=r*r,s=a*r;return .5*(2*e+(-i+t)*r+(2*i-5*e+4*t-n)*a+(-i+3*e-3*t+n)*s)}function Zc(i=Wc){let e=[],t=[],n=i.length;for(let l=0;l<n-1;l++){let c=i[Math.max(0,l-1)],h=i[l],u=i[l+1],d=i[Math.min(n-1,l+2)];for(let p=0;p<jc;p++){let f=p/jc;e.push(qc(c[0],h[0],u[0],d[0],f)),t.push(qc(c[1],h[1],u[1],d[1],f))}}e.push(i[n-1][0]),t.push(i[n-1][1]);let r=new Float64Array(e.length);for(let l=1;l<e.length;l++)r[l]=r[l-1]+Math.hypot(e[l]-e[l-1],t[l]-t[l-1]);let a=r[r.length-1];function s(l){let c=Math.max(0,Math.min(a,l)),h=0,u=r.length-1;for(;u-h>1;){let g=h+u>>1;r[g]<=c?h=g:u=g}let d=r[u]-r[h]||1,p=(c-r[h])/d,f=e[u]-e[h],x=t[u]-t[h],m=Math.hypot(f,x)||1;return{x:e[h]+f*p,y:t[h]+x*p,tx:f/m,ty:x/m}}function o(l,c){let h={s:0,d:1/0};for(let u=1;u<e.length;u++){let d=e[u-1],p=t[u-1],f=e[u]-d,x=t[u]-p,m=f*f+x*x||1,g=Math.max(0,Math.min(1,((l-d)*f+(c-p)*x)/m)),_=Math.hypot(d+f*g-l,p+x*g-c);_<h.d&&(h={s:r[u-1]+(r[u]-r[u-1])*g,d:_})}return h}return{length:a,xs:Float64Array.from(e),ys:Float64Array.from(t),at:s,nearest:o}}function Yd(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var Wt=(i,e,t,n)=>Math.hypot(i-t,e-n);function Kc(i={}){let e=Yd(i.seed??20260928),t=Zc(),n=[],r=[],a=[],s=1,o=0,l=Sr.startingGold*1e3,c=!1,h=!1,u=0,d=Oi.firstBuildAt,p=new Set,f=new Set,x=[];function m(A){let y=A.f*t.length,M=t.at(y),I=Math.max(.6,Math.min(St.width-.6,M.x-M.ty*Eo*A.side)),C=Math.max(.6,Math.min(St.height-.6,M.y+M.tx*Eo*A.side));return{s:y,x:I,y:C}}function g(A,y){let{s:M,x:I,y:C}=m(A),T={id:s++,kind:"tower",x:I,y:C,s:M,hp:rn.hp,maxHp:rn.hp,cooldown:rn.cooldown,spawnTimer:rn.spawnEvery,rising:y,alive:!0};return r.push(T),T}for(let A of Yc)g(A,0);let _=t.at(t.length),v={id:s++,kind:"hq",x:_.x,y:_.y,s:t.length,hp:An.hp,maxHp:An.hp,cooldown:An.cooldown,spawnTimer:An.spawnEvery,rising:0,alive:!0};r.push(v);let b=A=>n.filter(y=>y.alive&&y.side===A),P=()=>r.filter(A=>A.alive&&A.kind==="tower"),E=A=>r.find(y=>y.id===A&&y.alive);function D(A,y,M){l+=A*1e3,a.push({type:"gold",amount:A,x:y,y:M})}function F(A,y){A.hp-=y,a.push({type:"hit",id:A.id,amount:y,x:A.x,y:A.y,building:!1}),A.hp<=0&&A.alive&&(A.alive=!1,a.push({type:"death",id:A.id,kind:A.kind,x:A.x,y:A.y}),A.side==="enemy"&&D(Sr.unitBounty,A.x,A.y))}function k(A,y){A.hp-=y,a.push({type:"hit",id:A.id,amount:y,x:A.x,y:A.y,building:!0}),A.hp<=0&&A.alive&&(A.alive=!1,a.push({type:"destroyed",id:A.id,kind:A.kind,x:A.x,y:A.y}),A.kind==="tower"?D(Sr.buildingBounty,A.x,A.y):W(!0))}function W(A){if(!c){if(c=!0,h=A,A)for(let y of n)y.alive&&y.side==="enemy"&&(y.alive=!1,a.push({type:"death",id:y.id,kind:y.kind,x:y.x,y:y.y}));a.push({type:"end",won:A})}}function X(A,y,M){let I,C=1/0;for(let T of n){if(!T.alive||T.side!=="player")continue;let L=Wt(A,y,T.x,T.y);if(L>M)continue;let S=L-nn[T.kind].threat;S<C&&(C=S,I=T)}return I}function V(A,y,M){let I,C=M;for(let T of n){if(!T.alive||T.side!=="enemy")continue;let L=Wt(A,y,T.x,T.y);L<=C&&(C=L,I=T)}return I}function $(A,y,M){let I,C=M;for(let T of r){if(!T.alive)continue;let L=Wt(A,y,T.x,T.y);L<=C&&(C=L,I=T)}return I}function Y(A){let y=nn[A.kind];A.cooldown=Math.max(0,A.cooldown-.05);let M=V(A.x,A.y,y.range),I=$(A.x,A.y,y.range),C=A.kind==="archer"?M??I:A.kind==="warrior"?I??M:M?I?Wt(A.x,A.y,M.x,M.y)<=Wt(A.x,A.y,I.x,I.y)?M:I:M:I;if(C){A.target=C.id,A.cooldown<=0&&(A.cooldown=y.cooldown,A.kind==="archer"?a.push({type:"shoot",from:A.id,to:C.id,kind:"arrow",x0:A.x,y0:A.y,x1:C.x,y1:C.y}):a.push({type:"swing",from:A.id,to:C.id}),"rising"in C?k(C,y.damage):F(C,y.damage));return}A.target=0;let T=t.length-1.2,L=Math.min(T,A.s+y.speed*.05);if((A.kind==="warrior"||A.kind==="archer")&&L>A.s){let S=n.some(N=>N.alive&&N.side==="player"&&N.kind==="tank"&&N.s<A.s),U=n.some(N=>N.alive&&N.side==="player"&&N.kind==="tank"&&N.s>=A.s);if(S&&!U){let N=t.at(L),Q=N.x-N.ty*A.lane,H=N.y+N.tx*A.lane,J=K=>(K.kind==="hq"?An.range:rn.range)+.3;r.some(K=>K.alive&&K.rising<=0&&Wt(Q,H,K.x,K.y)<=J(K)&&Wt(A.x,A.y,K.x,K.y)>J(K)-.05)&&(L=A.s)}}L>A.s&&(A.s=L),ee(A)}function ee(A){let y=t.at(A.s);A.x=y.x-y.ty*A.lane,A.y=y.y+y.tx*A.lane}function Z(A){A.cooldown=Math.max(0,A.cooldown-.05);let y=E(A.home),M=y?y.x:A.x,I=y?y.y:A.y,C=X(A.x,A.y,y?At.aggro:99),T=y?A.postX:A.x,L=y?A.postY:A.y;if(C&&(!y||Wt(C.x,C.y,M,I)<=At.leash)){if(A.target=C.id,Wt(A.x,A.y,C.x,C.y)<=At.range){f.add(A.id),A.cooldown<=0&&(A.cooldown=At.cooldown,a.push({type:"swing",from:A.id,to:C.id}),F(C,At.damage));return}let Q=Math.atan2(A.y-C.y,A.x-C.x)+(A.id%5-2)*.45;T=C.x+Math.cos(Q)*At.range*.85,L=C.y+Math.sin(Q)*At.range*.85}else if(A.target=0,Wt(A.x,A.y,T,L)<.45)return;let S=Wt(A.x,A.y,T,L)||1,U=Math.min(S,At.speed*.05);A.x+=(T-A.x)/S*U,A.y+=(L-A.y)/S*U}function oe(){let A=b("enemy"),y=A.map(()=>0),M=A.map(()=>0),I=.8;for(let T=0;T<A.length;T++)for(let L=T+1;L<A.length;L++){let S=A[L].x-A[T].x,U=A[L].y-A[T].y,N=Math.hypot(S,U);if(N>=I)continue;if(N<1e-4){let pe=(A[T].id*7+A[L].id*13)%360*(Math.PI/180);S=Math.cos(pe),U=Math.sin(pe),N=1}let Q=(I-Math.min(N,I))*.5,H=f.has(A[T].id),J=f.has(A[L].id),K=H&&J||H?0:J?1:.5,ie=H&&J||J?0:H?1:.5;y[T]-=S/N*Q*K,M[T]-=U/N*Q*K,y[L]+=S/N*Q*ie,M[L]+=U/N*Q*ie}let C=At.speed*.05*.25;A.forEach((T,L)=>{let S=Math.hypot(y[L],M[L]),U=S>C?C/S:1;T.x=Math.max(.2,Math.min(St.width-.2,T.x+y[L]*U)),T.y=Math.max(.2,Math.min(St.height-.2,T.y+M[L]*U))})}function le(A){if(A.rising>0){A.rising=Math.max(0,A.rising-.05);return}let y=A.kind==="hq"?An:rn;A.cooldown=Math.max(0,A.cooldown-.05);let M=X(A.x,A.y,y.range);M&&A.cooldown<=0&&(A.cooldown=y.cooldown,a.push({type:"shoot",from:A.id,to:M.id,kind:"bolt",x0:A.x,y0:A.y,x1:M.x,y1:M.y}),F(M,y.damage)),A.spawnTimer=Math.max(0,A.spawnTimer-.05),A.spawnTimer<=0&&b("player").length>0&&Se(A)<y.maxTroops&&(A.spawnTimer=y.spawnEvery,Ae(A))}function Se(A){let y=0;for(let M of n)M.alive&&M.side==="enemy"&&M.home===A.id&&y++;return y}function Ae(A){let y=e()*Math.PI*2,M=t.at(Math.max(.5,Math.min(t.length-1.5,A.s+(e()*2-1)*At.postSpread))),I=(e()*2-1)*At.postLane,C={id:s++,side:"enemy",kind:"troop",x:A.x+Math.cos(y)*.6,y:A.y+Math.sin(y)*.6,s:0,lane:0,hp:At.hp,maxHp:At.hp,cooldown:At.cooldown,home:A.id,target:0,alive:!0,postX:M.x-M.ty*I,postY:M.y+M.tx*I,px:0,py:0};C.px=C.x,C.py=C.y,n.push(C),a.push({type:"spawn",id:C.id,kind:"troop",x:C.x,y:C.y})}function ae(){if(x.length<6)return 1;let A=Math.min(10,x.length-1),y=(x[x.length-1]-x[x.length-1-A])/A;return Math.max(.5,Math.min(1.5,y/Oi.paceTarget))}function de(A){if(!(A<d||b("player").length<2)&&(d=A+Oi.buildEvery/ae(),!(P().length>=Oi.maxLiveTowers)))for(let M=0;M<Ma.length;M++){if(p.has(M))continue;let I=m(Ma[M]);if(I.s<u+Oi.buildAheadMin||r.some(T=>T.alive&&Wt(T.x,T.y,I.x,I.y)<1.8)||r.some(T=>!T.alive&&Wt(T.x,T.y,I.x,I.y)<2.4))continue;p.add(M);let C=g(Ma[M],rn.buildTime);a.push({type:"build",id:C.id,x:C.x,y:C.y});return}}function ye(){if(c)return;o++;let A=o/20;for(let y of n)y.px=y.x,y.py=y.y;l+=Math.round(Sr.incomePerSecond*1e3/20),o%20===0&&x.push(u),f.clear(),de(A);for(let y of r)y.alive&&!c&&le(y);for(let y of n)!y.alive||c||(y.side==="player"?Y(y):Z(y));oe(),u=0;for(let y of n)y.alive&&y.side==="player"&&y.s>u&&(u=y.s);if(o%100===0)for(let y=n.length-1;y>=0;y--)n[y].alive||n.splice(y,1);!c&&A>=Sa&&W(!1)}function ve(A){if(c)return{ok:!1,reason:"ended"};let y=nn[A];if(l<y.cost*1e3)return{ok:!1,reason:"gold"};l-=y.cost*1e3;let M=A==="swarm"?wr:1,I=0;for(let C=0;C<M;C++){let T={id:s++,side:"player",kind:A,x:0,y:0,s:M>1?(M-1-C)*.2:0,lane:M>1?(C-(M-1)/2)*.28+(e()-.5)*.08:(e()-.5)*.6,hp:y.hp,maxHp:y.hp,cooldown:0,home:0,target:0,alive:!0,postX:0,postY:0,px:0,py:0};ee(T),T.px=T.x,T.py=T.y,n.push(T),a.push({type:"spawn",id:T.id,kind:A,x:T.x,y:T.y}),I||(I=T.id)}return{ok:!0,id:I}}return{path:t,units:n,buildings:r,get tick(){return o},get seconds(){return o/20},get gold(){return Math.floor(l/1e3)},get ended(){return c},get won(){return h},get front(){return u},step:ye,spawn:ve,canAfford:A=>!c&&l>=nn[A].cost*1e3,drainEvents:()=>a.splice(0,a.length)}}var Ao={lora_player_idle_front:{file:"./art/sheets/lora_player_idle_front.webp",frame:192,columns:4,frames:16,duration:1.033333,anchorX:.5,anchorY:.7764,worldHeight:1.921233,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_AcademyLora.prefab"},lora_player_idle_back:{file:"./art/sheets/lora_player_idle_back.webp",frame:192,columns:4,frames:16,duration:1.033333,anchorX:.5,anchorY:.7764,worldHeight:1.921233,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_AcademyLora.prefab"},lora_player_walk_front:{file:"./art/sheets/lora_player_walk_front.webp",frame:192,columns:4,frames:16,duration:2.566667,anchorX:.5,anchorY:.7764,worldHeight:1.921233,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_AcademyLora.prefab"},lora_player_walk_back:{file:"./art/sheets/lora_player_walk_back.webp",frame:192,columns:4,frames:16,duration:2.566667,anchorX:.5,anchorY:.7764,worldHeight:1.921233,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_AcademyLora.prefab"},lora_player_attack_front:{file:"./art/sheets/lora_player_attack_front.webp",frame:192,columns:4,frames:16,duration:1,anchorX:.5,anchorY:.7764,worldHeight:1.921233,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_AcademyLora.prefab"},lora_player_attack_back:{file:"./art/sheets/lora_player_attack_back.webp",frame:192,columns:4,frames:16,duration:1,anchorX:.5,anchorY:.7764,worldHeight:1.921233,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_AcademyLora.prefab"},lora_player_death_front:{file:"./art/sheets/lora_player_death_front.webp",frame:192,columns:4,frames:16,duration:1.666667,anchorX:.5,anchorY:.7764,worldHeight:1.921233,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_AcademyLora.prefab"},lora_player_death_back:{file:"./art/sheets/lora_player_death_back.webp",frame:192,columns:4,frames:16,duration:1.666667,anchorX:.5,anchorY:.7764,worldHeight:1.921233,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_AcademyLora.prefab"},raider_player_idle_front:{file:"./art/sheets/raider_player_idle_front.webp",frame:192,columns:4,frames:16,duration:1.466667,anchorX:.5,anchorY:.654958,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_OutlawPirate.prefab"},raider_player_idle_back:{file:"./art/sheets/raider_player_idle_back.webp",frame:192,columns:4,frames:16,duration:1.466667,anchorX:.5,anchorY:.654958,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_OutlawPirate.prefab"},raider_player_walk_front:{file:"./art/sheets/raider_player_walk_front.webp",frame:192,columns:4,frames:16,duration:1.000001,anchorX:.5,anchorY:.654958,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_OutlawPirate.prefab"},raider_player_walk_back:{file:"./art/sheets/raider_player_walk_back.webp",frame:192,columns:4,frames:16,duration:1.000001,anchorX:.5,anchorY:.654958,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_OutlawPirate.prefab"},raider_player_attack_front:{file:"./art/sheets/raider_player_attack_front.webp",frame:192,columns:4,frames:16,duration:1.066667,anchorX:.5,anchorY:.654958,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_OutlawPirate.prefab"},raider_player_attack_back:{file:"./art/sheets/raider_player_attack_back.webp",frame:192,columns:4,frames:16,duration:1.066667,anchorX:.5,anchorY:.654958,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_OutlawPirate.prefab"},raider_player_death_front:{file:"./art/sheets/raider_player_death_front.webp",frame:192,columns:4,frames:16,duration:1.766667,anchorX:.5,anchorY:.654958,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_OutlawPirate.prefab"},raider_player_death_back:{file:"./art/sheets/raider_player_death_back.webp",frame:192,columns:4,frames:16,duration:1.766667,anchorX:.5,anchorY:.654958,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_OutlawPirate.prefab"},ladystriker_player_idle_front:{file:"./art/sheets/ladystriker_player_idle_front.webp",frame:192,columns:4,frames:16,duration:3.166667,anchorX:.5,anchorY:.684507,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownLadyStriker.prefab"},ladystriker_player_idle_back:{file:"./art/sheets/ladystriker_player_idle_back.webp",frame:192,columns:4,frames:16,duration:3.166667,anchorX:.5,anchorY:.684507,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownLadyStriker.prefab"},ladystriker_player_walk_front:{file:"./art/sheets/ladystriker_player_walk_front.webp",frame:192,columns:4,frames:16,duration:.800001,anchorX:.5,anchorY:.684507,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownLadyStriker.prefab"},ladystriker_player_walk_back:{file:"./art/sheets/ladystriker_player_walk_back.webp",frame:192,columns:4,frames:16,duration:.800001,anchorX:.5,anchorY:.684507,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownLadyStriker.prefab"},ladystriker_player_attack_front:{file:"./art/sheets/ladystriker_player_attack_front.webp",frame:192,columns:4,frames:16,duration:1.2,anchorX:.5,anchorY:.684507,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownLadyStriker.prefab"},ladystriker_player_attack_back:{file:"./art/sheets/ladystriker_player_attack_back.webp",frame:192,columns:4,frames:16,duration:1.2,anchorX:.5,anchorY:.684507,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownLadyStriker.prefab"},ladystriker_player_death_front:{file:"./art/sheets/ladystriker_player_death_front.webp",frame:192,columns:4,frames:16,duration:1.666667,anchorX:.5,anchorY:.684507,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownLadyStriker.prefab"},ladystriker_player_death_back:{file:"./art/sheets/ladystriker_player_death_back.webp",frame:192,columns:4,frames:16,duration:1.666667,anchorX:.5,anchorY:.684507,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownLadyStriker.prefab"},sirhoya_enemy_idle_front:{file:"./art/sheets/sirhoya_enemy_idle_front.webp",frame:192,columns:4,frames:16,duration:2.666667,anchorX:.5,anchorY:.694271,worldHeight:1.488624,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownSirHoya.prefab"},sirhoya_enemy_idle_back:{file:"./art/sheets/sirhoya_enemy_idle_back.webp",frame:192,columns:4,frames:16,duration:2.666667,anchorX:.5,anchorY:.694271,worldHeight:1.488624,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownSirHoya.prefab"},sirhoya_enemy_walk_front:{file:"./art/sheets/sirhoya_enemy_walk_front.webp",frame:192,columns:4,frames:16,duration:.8,anchorX:.5,anchorY:.694271,worldHeight:1.488624,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownSirHoya.prefab"},sirhoya_enemy_walk_back:{file:"./art/sheets/sirhoya_enemy_walk_back.webp",frame:192,columns:4,frames:16,duration:.8,anchorX:.5,anchorY:.694271,worldHeight:1.488624,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownSirHoya.prefab"},sirhoya_enemy_attack_front:{file:"./art/sheets/sirhoya_enemy_attack_front.webp",frame:192,columns:4,frames:16,duration:1.666667,anchorX:.5,anchorY:.694271,worldHeight:1.488624,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownSirHoya.prefab"},sirhoya_enemy_attack_back:{file:"./art/sheets/sirhoya_enemy_attack_back.webp",frame:192,columns:4,frames:16,duration:1.666667,anchorX:.5,anchorY:.694271,worldHeight:1.488624,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownSirHoya.prefab"},sirhoya_enemy_death_front:{file:"./art/sheets/sirhoya_enemy_death_front.webp",frame:192,columns:4,frames:16,duration:2.6,anchorX:.5,anchorY:.694271,worldHeight:1.488624,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownSirHoya.prefab"},sirhoya_enemy_death_back:{file:"./art/sheets/sirhoya_enemy_death_back.webp",frame:192,columns:4,frames:16,duration:2.6,anchorX:.5,anchorY:.694271,worldHeight:1.488624,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownSirHoya.prefab"},tower_enemy:{file:"./art/sheets/tower_enemy.webp",frame:192,columns:4,frames:16,duration:0,anchorX:.5,anchorY:.682971,worldHeight:2.219917,bearingSheet:!0,muzzleY:1.427489,source:"Assets/_LoadableRes/Art/Prefabs/Buildings/PFB_Hex_DefenseTower.prefab"},base_enemy:{file:"./art/sheets/base_enemy.webp",frame:256,columns:4,frames:16,duration:0,anchorX:.5,anchorY:.686291,worldHeight:2.742859,bearingSheet:!0,muzzleY:1.605614,source:"Assets/_LoadableRes/Art/Prefabs/Buildings/PFB_Hex_MainTower.prefab"},base_player:{file:"./art/sheets/base_player.webp",frame:256,columns:4,frames:16,duration:0,anchorX:.5,anchorY:.686291,worldHeight:2.742859,bearingSheet:!0,muzzleY:1.605614,source:"Assets/_LoadableRes/Art/Prefabs/Buildings/PFB_Hex_MainTower.prefab"},rubble_enemy:{file:"./art/sheets/rubble_enemy.webp",frame:192,columns:1,frames:1,duration:0,anchorX:.5,anchorY:.60342,worldHeight:1.459725,source:"Assets/_LoadableRes/Art/Prefabs/Buildings/PFB_Hex_Rubble.prefab"},proj_arrow_player:{file:"./art/sheets/proj_arrow_player.webp",frame:128,columns:4,frames:8,duration:.4,anchorX:.5,anchorY:.5,worldHeight:2.4,premultiplied:!0,loop:!0,headingScreenRight:!0,source:"Assets/_LoadableRes/Art/Prefabs/Projectiles/PFB_Hex_Proj_LadyStriker.prefab"},proj_siegebolt_enemy:{file:"./art/sheets/proj_siegebolt_enemy.webp",frame:128,columns:4,frames:8,duration:.4,anchorX:.5,anchorY:.5,worldHeight:1.134,premultiplied:!0,loop:!0,headingScreenRight:!0,source:"Assets/_LoadableRes/Art/Prefabs/Projectiles/PFB_Hex_Proj_SiegeBolt.prefab"},vfx_spawn_blue:{file:"./art/sheets/vfx_spawn_blue.webp",frame:160,columns:4,frames:16,duration:1,anchorX:.5,anchorY:.573473,worldHeight:2,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Effects/FX_Effects_HS_Magic_Spawn_Blue.prefab"},vfx_spawn_red:{file:"./art/sheets/vfx_spawn_red.webp",frame:160,columns:4,frames:16,duration:1,anchorX:.5,anchorY:.573473,worldHeight:2,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Effects/FX_Effects_HS_Magic_Spawn_Red.prefab"},vfx_hit_arrow:{file:"./art/sheets/vfx_hit_arrow.webp",frame:160,columns:4,frames:16,duration:.5,anchorX:.5,anchorY:.573473,worldHeight:1.8,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Art/VFX/Combat/Stock/FX_HS_Hit_orange_arrow.prefab"},vfx_hit_sword:{file:"./art/sheets/vfx_hit_sword.webp",frame:160,columns:4,frames:16,duration:.5,anchorX:.5,anchorY:.573473,worldHeight:1.8,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Art/VFX/Combat/Stock/FX_HS_Sword_hit.prefab"},vfx_hit_blue:{file:"./art/sheets/vfx_hit_blue.webp",frame:160,columns:4,frames:16,duration:.6,anchorX:.5,anchorY:.573473,worldHeight:1.8,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Effects/FX_Effects_HS_Attack_Blue.prefab"},vfx_hit_red:{file:"./art/sheets/vfx_hit_red.webp",frame:160,columns:4,frames:16,duration:.6,anchorX:.5,anchorY:.573473,worldHeight:1.8,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Effects/FX_Effects_HS_Attack_Red.prefab"},vfx_siege_impact:{file:"./art/sheets/vfx_siege_impact.webp",frame:160,columns:4,frames:16,duration:.8,anchorX:.5,anchorY:.573473,worldHeight:3,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Art/VFX/Combat/FX_Combat_SiegeBolt_Impact.prefab"},vfx_siege_muzzle:{file:"./art/sheets/vfx_siege_muzzle.webp",frame:160,columns:4,frames:16,duration:.4,anchorX:.5,anchorY:.573473,worldHeight:1.4,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Art/VFX/Combat/FX_Combat_SiegeBolt_Muzzle.prefab"},vfx_flash_arrow:{file:"./art/sheets/vfx_flash_arrow.webp",frame:160,columns:4,frames:16,duration:.4,anchorX:.5,anchorY:.573473,worldHeight:1.4,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Art/VFX/Combat/Stock/FX_HS_Flash_orange_arrow.prefab"},vfx_death:{file:"./art/sheets/vfx_death.webp",frame:160,columns:4,frames:16,duration:1.2,anchorX:.5,anchorY:.573473,worldHeight:2.6,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Effects/FX_Effects_JMO_Explosion_Smoke_2_Solo_HDR.prefab"},vfx_burst:{file:"./art/sheets/vfx_burst.webp",frame:160,columns:4,frames:16,duration:1,anchorX:.5,anchorY:.573473,worldHeight:2,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Art/VFX/FX_Effects_burst.prefab"},vfx_flash_gunna:{file:"./art/sheets/vfx_flash_gunna.webp",frame:160,columns:4,frames:16,duration:.4,anchorX:.5,anchorY:.573473,worldHeight:1.4,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Art/VFX/Combat/Stock/FX_HS_Flash_16_fire.prefab"},vfx_hit_gunna:{file:"./art/sheets/vfx_hit_gunna.webp",frame:160,columns:4,frames:16,duration:.5,anchorX:.5,anchorY:.573473,worldHeight:2.4,premultiplied:!0,loop:!1,source:"Assets/_LoadableRes/Art/VFX/Combat/Stock/FX_HS_Hit_16_fire.prefab"},crownguard_player_idle_front:{file:"./art/sheets/crownguard_player_idle_front.webp",frame:192,columns:4,frames:32,duration:4.166667,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_player_idle_back:{file:"./art/sheets/crownguard_player_idle_back.webp",frame:192,columns:4,frames:32,duration:4.166667,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_player_walk_front:{file:"./art/sheets/crownguard_player_walk_front.webp",frame:192,columns:4,frames:20,duration:1.000001,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_player_walk_back:{file:"./art/sheets/crownguard_player_walk_back.webp",frame:192,columns:4,frames:20,duration:1.000001,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_player_attack_front:{file:"./art/sheets/crownguard_player_attack_front.webp",frame:192,columns:4,frames:32,duration:2.033334,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_player_attack_back:{file:"./art/sheets/crownguard_player_attack_back.webp",frame:192,columns:4,frames:32,duration:2.033334,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_player_death_front:{file:"./art/sheets/crownguard_player_death_front.webp",frame:192,columns:4,frames:16,duration:.666667,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_player_death_back:{file:"./art/sheets/crownguard_player_death_back.webp",frame:192,columns:4,frames:16,duration:.666667,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_enemy_idle_front:{file:"./art/sheets/crownguard_enemy_idle_front.webp",frame:192,columns:4,frames:32,duration:4.166667,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_enemy_idle_back:{file:"./art/sheets/crownguard_enemy_idle_back.webp",frame:192,columns:4,frames:32,duration:4.166667,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_enemy_walk_front:{file:"./art/sheets/crownguard_enemy_walk_front.webp",frame:192,columns:4,frames:20,duration:1.000001,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_enemy_walk_back:{file:"./art/sheets/crownguard_enemy_walk_back.webp",frame:192,columns:4,frames:20,duration:1.000001,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_enemy_attack_front:{file:"./art/sheets/crownguard_enemy_attack_front.webp",frame:192,columns:4,frames:32,duration:2.033334,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_enemy_attack_back:{file:"./art/sheets/crownguard_enemy_attack_back.webp",frame:192,columns:4,frames:32,duration:2.033334,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_enemy_death_front:{file:"./art/sheets/crownguard_enemy_death_front.webp",frame:192,columns:4,frames:16,duration:.666667,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},crownguard_enemy_death_back:{file:"./art/sheets/crownguard_enemy_death_back.webp",frame:192,columns:4,frames:16,duration:.666667,anchorX:.5,anchorY:.669744,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_CrownGuard.prefab"},pip_player_idle_front:{file:"./art/sheets/pip_player_idle_front.webp",frame:192,columns:4,frames:28,duration:1.333333,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_player_idle_back:{file:"./art/sheets/pip_player_idle_back.webp",frame:192,columns:4,frames:28,duration:1.333333,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_player_walk_front:{file:"./art/sheets/pip_player_walk_front.webp",frame:192,columns:4,frames:28,duration:1.333333,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_player_walk_back:{file:"./art/sheets/pip_player_walk_back.webp",frame:192,columns:4,frames:28,duration:1.333333,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_player_attack_front:{file:"./art/sheets/pip_player_attack_front.webp",frame:192,columns:4,frames:12,duration:.55,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_player_attack_back:{file:"./art/sheets/pip_player_attack_back.webp",frame:192,columns:4,frames:12,duration:.55,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_player_death_front:{file:"./art/sheets/pip_player_death_front.webp",frame:192,columns:4,frames:20,duration:1,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_player_death_back:{file:"./art/sheets/pip_player_death_back.webp",frame:192,columns:4,frames:20,duration:1,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_enemy_idle_front:{file:"./art/sheets/pip_enemy_idle_front.webp",frame:192,columns:4,frames:28,duration:1.333333,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_enemy_idle_back:{file:"./art/sheets/pip_enemy_idle_back.webp",frame:192,columns:4,frames:28,duration:1.333333,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_enemy_walk_front:{file:"./art/sheets/pip_enemy_walk_front.webp",frame:192,columns:4,frames:28,duration:1.333333,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_enemy_walk_back:{file:"./art/sheets/pip_enemy_walk_back.webp",frame:192,columns:4,frames:28,duration:1.333333,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!0,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_enemy_attack_front:{file:"./art/sheets/pip_enemy_attack_front.webp",frame:192,columns:4,frames:12,duration:.55,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_enemy_attack_back:{file:"./art/sheets/pip_enemy_attack_back.webp",frame:192,columns:4,frames:12,duration:.55,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_enemy_death_front:{file:"./art/sheets/pip_enemy_death_front.webp",frame:192,columns:4,frames:20,duration:1,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"},pip_enemy_death_back:{file:"./art/sheets/pip_enemy_death_back.webp",frame:192,columns:4,frames:20,duration:1,anchorX:.5,anchorY:.676201,worldHeight:1.44,loop:!1,hitPointY:.3,source:"Assets/_LoadableRes/Art/Prefabs/Units/PFB_Hex_Unit_SentinelPip.prefab"}};function jd(i,e,t,n){i.globalCompositeOperation="lighter";let r=Math.min(1,e/.25),a=e<.35?1:Math.max(0,1-(e-.35)/.35);if(a>0){let s=r*112,o=16*(1-Math.max(0,e-.2)*1.1)+3,l=i.createLinearGradient(64-o,0,64+o,0);l.addColorStop(0,`${n}00`),l.addColorStop(.35,n),l.addColorStop(.5,t),l.addColorStop(.65,n),l.addColorStop(1,`${n}00`),i.globalAlpha=a,i.fillStyle=l,i.fillRect(64-o,0,o*2,s),i.globalAlpha=1,i.globalCompositeOperation="destination-out";let c=i.createLinearGradient(0,0,0,128*.55);c.addColorStop(0,"rgba(0,0,0,1)"),c.addColorStop(.35,"rgba(0,0,0,0.75)"),c.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=c,i.fillRect(64-o-2,0,o*2+4,128*.55),i.globalCompositeOperation="lighter"}if(e>=.2){let s=(e-.2)/.8,o=1-s;i.globalAlpha=o,i.strokeStyle=n,i.lineWidth=7*(1-s)+1,i.beginPath(),i.ellipse(64,112,10+s*40,(10+s*40)*.42,0,0,Math.PI*2),i.stroke(),i.fillStyle=t,i.globalAlpha=o*.5,i.beginPath(),i.ellipse(64,112,18*(1-s)+4,(18*(1-s)+4)*.42,0,0,Math.PI*2),i.fill(),i.globalAlpha=o,i.fillStyle=t;for(let l=0;l<7;l++){let c=l/7*Math.PI*2+.4,h=8+s*44;i.beginPath(),i.arc(64+Math.cos(c)*h,112+Math.sin(c)*h*.42-s*10,2.2*(1-s)+.6,0,Math.PI*2),i.fill()}i.globalAlpha=1}i.globalCompositeOperation="source-over"}function Jc(i,e){let t=document.createElement("canvas");t.width=512,t.height=128*Math.ceil(12/4);let n=t.getContext("2d");for(let r=0;r<12;r++)n.save(),n.translate(r%4*128,Math.floor(r/4)*128),n.beginPath(),n.rect(0,0,128,128),n.clip(),jd(n,r/11,i,e),n.restore();return{image:t,frame:128,columns:4,frames:12,duration:.4,anchorX:64/128,anchorY:112/128,worldHeight:2.4,loop:!1}}function $c(){return new Map([["vfx_portal_blue",Jc("#e6f4ff","#3d9bff")],["vfx_portal_red",Jc("#ffe9e4","#ff5a4a")]])}var qd="#3380ff",eh={idle:{duration:1.2,loop:!0},walk:{duration:.5,loop:!0},attack:{duration:.6,loop:!1},death:{duration:1,loop:!1}};function Ro(i,e){let t=e*Math.PI*2;switch(i){case"walk":return{legs:[Math.sin(t)*.7,Math.sin(t+Math.PI)*.7,Math.sin(t+Math.PI)*.7,Math.sin(t)*.7],bob:Math.abs(Math.sin(t))*3,lunge:0,headDip:Math.sin(t*2)*1.5,jaw:0,tail:Math.sin(t)*.25,fall:0};case"attack":{let n=e<.3?-e/.3*3:e<.55?-3+(e-.3)/.25*13:10*(1-(e-.55)/.45),r=e>.25&&e<.6?Math.sin((e-.25)/.35*Math.PI):0;return{legs:[-.5*r,.3*r,.4*r,-.2*r],bob:0,lunge:n,headDip:4*r,jaw:r,tail:.4,fall:0}}case"death":{let n=Math.min(1,e*1.8);return{legs:[1.3*n,-1.2*n,1.1*n,-1.3*n],bob:0,lunge:-3*Math.sin(Math.min(1,e*3)*Math.PI),headDip:9*n,jaw:.35*n,tail:-.5*n,fall:n}}default:return{legs:[0,0,0,0],bob:Math.sin(t)*.8,lunge:0,headDip:0,jaw:0,tail:Math.sin(t*2)*.35,fall:0}}}function wa(i,e,t,n,r){i.save(),i.translate(e,t),i.rotate(n),i.fillStyle=r,i.beginPath(),i.roundRect(-3,0,6,21,3),i.fill(),i.fillStyle="#4a4f57",i.beginPath(),i.ellipse(-1,21,4.2,2.6,0,0,Math.PI*2),i.fill(),i.restore()}function th(i,e,t){let n=-32-e.bob;e.fall>0&&(i.translate(0,e.fall*16),i.rotate(-e.fall*.22),i.scale(1,1-e.fall*.18)),i.translate(-e.lunge,0),wa(i,-15,n+8,e.legs[1],"#56606b"),wa(i,17,n+8,e.legs[3],"#56606b"),i.save(),i.translate(24,n-3),i.rotate(-.5+e.tail);let r=i.createLinearGradient(0,0,22,-8);r.addColorStop(0,"#6f7a86"),r.addColorStop(1,"#d3d9df"),i.fillStyle=r,i.beginPath(),i.ellipse(12,0,14,5.5,.1,0,Math.PI*2),i.fill(),i.restore();let a=i.createLinearGradient(0,n-14,0,n+12);a.addColorStop(0,t?"#6c7682":"#8792a0"),a.addColorStop(.55,"#65707d"),a.addColorStop(1,"#c4ccd4"),i.fillStyle=a,i.beginPath(),i.ellipse(2,n,26,13,0,0,Math.PI*2),i.fill(),i.fillStyle=t?"#5e6874":"#7a8592",i.beginPath(),i.ellipse(-16,n-3,12,12,-.3,0,Math.PI*2),i.fill(),wa(i,-17,n+8,e.legs[0],"#7d8894"),wa(i,15,n+8,e.legs[2],"#7d8894");let s=-30,o=n-12+e.headDip-(t?3:0);i.fillStyle=qd,i.beginPath(),i.ellipse(-21,n-6+e.headDip*.4,5,9,.35,0,Math.PI*2),i.fill(),i.fillStyle="#7d8691";for(let[c,h]of[[s+6,.25],[s+1,-.15]])i.save(),i.translate(c,o-8),i.rotate(h),i.beginPath(),i.moveTo(-4,2),i.lineTo(0,-10),i.lineTo(4,2),i.closePath(),i.fill(),i.restore();let l=i.createRadialGradient(s-2,o-4,2,s,o,13);l.addColorStop(0,"#a9b3be"),l.addColorStop(1,"#6b7683"),i.fillStyle=l,i.beginPath(),i.ellipse(s,o,11.5,10,0,0,Math.PI*2),i.fill(),t?(i.fillStyle="#7f8893",i.beginPath(),i.ellipse(s-7,o+2,6,4,.2,0,Math.PI*2),i.fill()):(i.fillStyle="#d9dee4",i.beginPath(),i.ellipse(s-11,o+3,9,5,.1,0,Math.PI*2),i.fill(),e.jaw>.05&&(i.fillStyle="#b8434a",i.beginPath(),i.moveTo(s-6,o+5),i.lineTo(s-19,o+5+e.jaw*7),i.lineTo(s-17,o+3),i.closePath(),i.fill(),i.fillStyle="#cfd5db",i.beginPath(),i.ellipse(s-11,o+7+e.jaw*4,8,3,.35*e.jaw,0,Math.PI*2),i.fill()),i.fillStyle="#23262b",i.beginPath(),i.ellipse(s-19,o+2,2.6,2.2,0,0,Math.PI*2),i.fill(),i.fillStyle=e.fall>.5?"#3a3d42":"#ffcf4a",i.beginPath(),i.ellipse(s-4,o-2,2.6,2,-.2,0,Math.PI*2),i.fill(),i.fillStyle="#1b1d21",i.beginPath(),i.arc(s-4.6,o-2,1.1,0,Math.PI*2),i.fill())}function Qc(i,e){let t=document.createElement("canvas");t.width=512,t.height=128*Math.ceil(16/4);let n=t.getContext("2d"),{duration:r,loop:a}=eh[i];for(let s=0;s<16;s++){let o=a?s/16:s/15;n.save(),n.translate(s%4*128+64,Math.floor(s/4)*128+104),e&&n.scale(-1,1),th(n,Ro(i,o),e),n.restore()}return{image:t,frame:128,columns:4,frames:16,duration:r,anchorX:64/128,anchorY:104/128,worldHeight:1.1,loop:a,hitPointY:.25}}function nh(){let i=new Map;for(let e of Object.keys(eh))i.set(`wolf_player_${e}_front`,Qc(e,!1)),i.set(`wolf_player_${e}_back`,Qc(e,!0));return i}function ih(){let i=document.createElement("canvas");i.width=304,i.height=456;let e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,456);t.addColorStop(0,"#1d3a6b"),t.addColorStop(.6,"#2f6fae"),t.addColorStop(1,"#7fb6de"),e.fillStyle=t,e.fillRect(0,0,304,456);let n=e.createRadialGradient(200,110,10,200,110,90);n.addColorStop(0,"#fff8dc"),n.addColorStop(.45,"#fff2b8"),n.addColorStop(.5,"#fff2b800"),e.fillStyle=n,e.fillRect(0,0,304,456);let r=Ro("idle",0),a=Ro("attack",.45);for(let[s,o,l,c]of[[100,250,1.35,r],[228,275,1.25,r],[158,400,1.9,a]])e.save(),e.translate(s,o),e.scale(l,l),th(e,c,!1),e.restore();return i.toDataURL("image/png")}var rh="./art/";function Co(i){return new Promise((e,t)=>{let n=new Image;n.onload=()=>e(n),n.onerror=()=>t(new Error(`image failed: ${i}`)),n.src=i})}async function ah(i){let e=Object.keys(Ao),t=e.length+2,n=0,r=l=>(n++,i?.(n/t),l),a=new Map,[s,o]=await Promise.all([Co(`${rh}env/soft_shadow.png`).then(r),Co(`${rh}ui/coin.png`).then(r),...e.map(async l=>{let{file:c,source:h,...u}=Ao[l];a.set(l,{...u,image:r(await Co(c))})})]);for(let[l,c]of nh())a.has(l)||a.set(l,c);for(let[l,c]of $c())a.set(l,c);return{sheets:a,shadow:s,coin:o}}var Lh=0,dl=1,Ih=2;var pl=1,Uh=2,yn=3,ln=0,Bt=1,bn=2,ei=0,sa=1,ml=2,fl=3,gl=4,Dh=5,or=100,Nh=101,Fh=102,Oh=103,Bh=104,zh=200,Hh=201,kh=202,Gh=203,Vh=204,Wh=205,Xh=206,Yh=207,jh=208,qh=209,Zh=210,Kh=211,Jh=212,$h=213,Qh=214,Fs=0,Os=1,lr=2,oa=3,Bs=4,zs=5,Hs=6,ks=7,eu=0,tu=1,nu=2,Bn=0,iu=1,ru=2,au=3,su=4,ou=5,lu=6,cu=7;var _l=300,Si=301,wi=302,Gs=303,Vs=304,la=306,Ji=1e3,$i=1001,Ja=1002,Jt=1003,hu=1004;var ca=1005;var ft=1006,Ws=1007;var Ti=1008;var Mn=1009,vl=1010,xl=1011,cr=1012,Xs=1013,ti=1014,Sn=1015,hr=1016,Ys=1017,js=1018,ur=1020,yl=35902,uu=1021,du=1022,pn=1023,pu=1024,mu=1025,Qi=1026,ui=1027,bl=1028,qs=1029,fu=1030,Ml=1031;var Sl=1033,Zs=33776,Ks=33777,Js=33778,$s=33779,wl=35840,Tl=35841,El=35842,Al=35843,Rl=36196,Cl=37492,Pl=37496,Ll=37808,Il=37809,Ul=37810,Dl=37811,Nl=37812,Fl=37813,Ol=37814,Bl=37815,zl=37816,Hl=37817,kl=37818,Gl=37819,Vl=37820,Wl=37821,Qs=36492,Xl=36494,Yl=36495,gu=36283,jl=36284,ql=36285,Zl=36286;var Ur=2300,$a=2301,Za=2302,il=2400,rl=2401,al=2402;var _u=3201;var vu=0,xu=1,Ei="",Dt="srgb",di="srgb-linear",Dr="linear",it="srgb";var hi=7680;var yu=512,bu=513,Mu=514,Kl=515,Su=516,wu=517,Tu=518,Eu=519,sl=35044,eo=35048;var Jl="300 es",pi=2e3,Nr=2001,Fn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}},It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ka=Math.PI/180,Qa=180/Math.PI;function dr(){let i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(It[255&i]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]+"-"+It[255&e]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[63&t|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[255&n]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]).toLowerCase()}function Ye(i,e,t){return Math.max(e,Math.min(t,i))}function Zd(i,e){return(i%e+e)%e}function Po(i,e,t){return(1-t)*i+t*e}function Er(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ht(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}var ce=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*n-s*r+e.x,this.y=a*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Fe=class i{constructor(e,t,n,r,a,s,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,l,c)}set(e,t,n,r,a,s,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=a,h[5]=l,h[6]=n,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],f=n[8],x=r[0],m=r[3],g=r[6],_=r[1],v=r[4],b=r[7],P=r[2],E=r[5],D=r[8];return a[0]=s*x+o*_+l*P,a[3]=s*m+o*v+l*E,a[6]=s*g+o*b+l*D,a[1]=c*x+h*_+u*P,a[4]=c*m+h*v+u*E,a[7]=c*g+h*b+u*D,a[2]=d*x+p*_+f*P,a[5]=d*m+p*v+f*E,a[8]=d*g+p*b+f*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*s*h-t*o*c-n*a*h+n*o*l+r*a*c-r*s*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*s-o*c,d=o*l-h*a,p=c*a-s*l,f=t*u+n*d+r*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/f;return e[0]=u*x,e[1]=(r*c-h*n)*x,e[2]=(o*n-r*s)*x,e[3]=d*x,e[4]=(h*t-r*l)*x,e[5]=(r*a-o*t)*x,e[6]=p*x,e[7]=(n*l-c*t)*x,e[8]=(s*t-n*a)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,s,o){let l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*s+c*o)+s+e,-r*c,r*l,-r*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Lo.makeScale(e,t)),this}rotate(e){return this.premultiply(Lo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Lo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Lo=new Fe;function $l(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Au(){let i=Fr("canvas");return i.style.display="block",i}var sh={};function Ai(i){i in sh||(sh[i]=!0,console.warn(i))}function Ru(i,e,t){return new Promise((function(n,r){setTimeout((function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}),t)}))}function Cu(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Pu(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=1-e[14])}var oh=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lh=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Kd(){let i={enabled:!0,workingColorSpace:di,spaces:{},convert:function(r,a,s){return this.enabled!==!1&&a!==s&&a&&s&&(this.spaces[a].transfer===it&&(r.r=Dn(r.r),r.g=Dn(r.g),r.b=Dn(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===it&&(r.r=Ki(r.r),r.g=Ki(r.g),r.b=Ki(r.b))),r},fromWorkingColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},toWorkingColorSpace:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?Dr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[di]:{primaries:e,whitePoint:n,transfer:Dr,toXYZ:oh,fromXYZ:lh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:e,whitePoint:n,transfer:it,toXYZ:oh,fromXYZ:lh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}}),i}var Je=Kd();function Dn(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Ki(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}var Bi,es=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Bi===void 0&&(Bi=Fr("canvas")),Bi.width=e.width,Bi.height=e.height;let n=Bi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Bi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Fr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=255*Dn(a[s]/255);return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*Dn(t[n]/255)):t[n]=Dn(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Jd=0,Or=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=dr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(Io(r[s].image)):a.push(Io(r[s]))}else a=Io(r);n.url=a}return t||(e.images[this.uuid]=n),n}};function Io(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?es.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var $d=0,Pt=class i extends Fn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=1001,r=1001,a=1006,s=1008,o=1023,l=Mn,c=i.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=dr(),this.name="",this.source=new Or(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_l)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ji:e.x=e.x-Math.floor(e.x);break;case $i:e.x=e.x<0?0:1;break;case Ja:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Ji:e.y=e.y-Math.floor(e.y);break;case $i:e.y=e.y<0?0:1;break;case Ja:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Pt.DEFAULT_IMAGE=null,Pt.DEFAULT_MAPPING=_l,Pt.DEFAULT_ANISOTROPY=1;var lt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],f=l[9],x=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(f-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(f+m)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(c+1)/2,b=(p+1)/2,P=(g+1)/2,E=(h+d)/4,D=(u+x)/4,F=(f+m)/4;return v>b&&v>P?v<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(v),r=E/n,a=D/n):b>P?b<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(b),n=E/r,a=F/r):P<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(P),n=D/a,r=F/a),this.set(n,r,a,t),this}let _=Math.sqrt((m-f)*(m-f)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(m-f)/_,this.y=(u-x)/_,this.z=(d-h)/_,this.w=Math.acos((c+p+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ts=class extends Fn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);let r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ft,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let a=new Pt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];let s=n.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Or(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vn=class extends ts{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Br=class extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var ns=class extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var cn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,s,o){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3],d=a[s+0],p=a[s+1],f=a[s+2],x=a[s+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=p,e[t+2]=f,void(e[t+3]=x);if(u!==x||l!==d||c!==p||h!==f){let m=1-o,g=l*d+c*p+h*f+u*x,_=g>=0?1:-1,v=1-g*g;if(v>Number.EPSILON){let P=Math.sqrt(v),E=Math.atan2(P,g*_);m=Math.sin(m*E)/P,o=Math.sin(o*E)/P}let b=o*_;if(l=l*m+d*b,c=c*m+p*b,h=h*m+f*b,u=u*m+x*b,m===1-o){let P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,a,s){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=a[s],d=a[s+1],p=a[s+2],f=a[s+3];return e[t]=o*f+h*u+l*p-c*d,e[t+1]=l*f+h*d+c*u-o*p,e[t+2]=c*f+h*p+o*d-l*u,e[t+3]=h*f-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),u=o(a/2),d=l(n/2),p=l(r/2),f=l(a/2);switch(s){case"XYZ":this._x=d*h*u+c*p*f,this._y=c*p*u-d*h*f,this._z=c*h*f+d*p*u,this._w=c*h*u-d*p*f;break;case"YXZ":this._x=d*h*u+c*p*f,this._y=c*p*u-d*h*f,this._z=c*h*f-d*p*u,this._w=c*h*u+d*p*f;break;case"ZXY":this._x=d*h*u-c*p*f,this._y=c*p*u+d*h*f,this._z=c*h*f+d*p*u,this._w=c*h*u-d*p*f;break;case"ZYX":this._x=d*h*u-c*p*f,this._y=c*p*u+d*h*f,this._z=c*h*f-d*p*u,this._w=c*h*u+d*p*f;break;case"YZX":this._x=d*h*u+c*p*f,this._y=c*p*u+d*h*f,this._z=c*h*f-d*p*u,this._w=c*h*u-d*p*f;break;case"XZY":this._x=d*h*u-c*p*f,this._y=c*p*u-d*h*f,this._z=c*h*f+d*p*u,this._w=c*h*u+d*p*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],a=t[8],s=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(a-c)*p,this._z=(s-r)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(a+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(a-c)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(s-r)/p,this._x=(a+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,a=e._z,s=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+s*o+r*c-a*l,this._y=r*h+s*l+a*o-n*c,this._z=a*h+s*c+n*l-r*o,this._w=s*h-n*o-r*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,a=this._z,s=this._w,o=s*e._w+n*e._x+r*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=n,this._y=r,this._z=a,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*s+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=s*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=a*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ch.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ch.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*s,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,a=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*r-o*n),h=2*(o*t-a*r),u=2*(a*n-s*t);return this.x=t+l*c+s*u-o*h,this.y=n+l*h+o*c-a*u,this.z=r+l*u+a*h-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,a=e.z,s=t.x,o=t.y,l=t.z;return this.x=r*l-a*o,this.y=a*s-n*l,this.z=n*o-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Uo.copy(this).projectOnVector(e),this.sub(Uo)}reflect(e){return this.sub(Uo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Uo=new R,ch=new cn,hn=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,an):an.fromBufferAttribute(a,s),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ta.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ta.copy(n.boundingBox)),Ta.applyMatrix4(e.matrixWorld),this.union(Ta)}let r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ar),Ea.subVectors(this.max,Ar),zi.subVectors(e.a,Ar),Hi.subVectors(e.b,Ar),ki.subVectors(e.c,Ar),Vn.subVectors(Hi,zi),Wn.subVectors(ki,Hi),si.subVectors(zi,ki);let t=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-si.z,si.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,si.z,0,-si.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-si.y,si.x,0];return!!Do(t,zi,Hi,ki,Ea)&&(t=[1,0,0,0,1,0,0,0,1],!!Do(t,zi,Hi,ki,Ea)&&(Aa.crossVectors(Vn,Wn),t=[Aa.x,Aa.y,Aa.z],Do(t,zi,Hi,ki,Ea)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(an).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Rn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Rn=[new R,new R,new R,new R,new R,new R,new R,new R],an=new R,Ta=new hn,zi=new R,Hi=new R,ki=new R,Vn=new R,Wn=new R,si=new R,Ar=new R,Ea=new R,Aa=new R,oi=new R;function Do(i,e,t,n,r){for(let a=0,s=i.length-3;a<=s;a+=3){oi.fromArray(i,a);let o=r.x*Math.abs(oi.x)+r.y*Math.abs(oi.y)+r.z*Math.abs(oi.z),l=e.dot(oi),c=t.dot(oi),h=n.dot(oi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Qd=new hn,Rr=new R,No=new R,un=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Qd.setFromPoints(e).getCenter(n);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);let t=Rr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Rr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(No.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add(No)),this.expandByPoint(Rr.copy(e.center).sub(No))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Cn=new R,Fo=new R,Ra=new R,Xn=new R,Oo=new R,Ca=new R,Bo=new R,mi=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Cn.copy(this.origin).addScaledVector(this.direction,t),Cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Fo.copy(e).add(t).multiplyScalar(.5),Ra.copy(t).sub(e).normalize(),Xn.copy(this.origin).sub(Fo);let a=.5*e.distanceTo(t),s=-this.direction.dot(Ra),o=Xn.dot(this.direction),l=-Xn.dot(Ra),c=Xn.lengthSq(),h=Math.abs(1-s*s),u,d,p,f;if(h>0)if(u=s*l-o,d=s*o-l,f=a*h,u>=0)if(d>=-f)if(d<=f){let x=1/h;u*=x,d*=x,p=u*(u+s*d+2*o)+d*(s*u+d+2*l)+c}else d=a,u=Math.max(0,-(s*d+o)),p=-u*u+d*(d+2*l)+c;else d=-a,u=Math.max(0,-(s*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-f?(u=Math.max(0,-(-s*a+o)),d=u>0?-a:Math.min(Math.max(-a,-l),a),p=-u*u+d*(d+2*l)+c):d<=f?(u=0,d=Math.min(Math.max(-a,-l),a),p=d*(d+2*l)+c):(u=Math.max(0,-(s*a+o)),d=u>0?a:Math.min(Math.max(-a,-l),a),p=-u*u+d*(d+2*l)+c);else d=s>0?-a:a,u=Math.max(0,-(s*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Fo).addScaledVector(Ra,d),p}intersectSphere(e,t){Cn.subVectors(e.center,this.origin);let n=Cn.dot(this.direction),r=Cn.dot(Cn)-n*n,a=e.radius*e.radius;if(r>a)return null;let s=Math.sqrt(a-r),o=n-s,l=n+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,s,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(a=(e.min.y-d.y)*h,s=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,s=(e.min.y-d.y)*h),n>s||a>r?null:((a>n||isNaN(n))&&(n=a),(s<r||isNaN(r))&&(r=s),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>r?null:((o>n||n!=n)&&(n=o),(l<r||r!=r)&&(r=l),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,Cn)!==null}intersectTriangle(e,t,n,r,a){Oo.subVectors(t,e),Ca.subVectors(n,e),Bo.crossVectors(Oo,Ca);let s,o=this.direction.dot(Bo);if(o>0){if(r)return null;s=1}else{if(!(o<0))return null;s=-1,o=-o}Xn.subVectors(this.origin,e);let l=s*this.direction.dot(Ca.crossVectors(Xn,Ca));if(l<0)return null;let c=s*this.direction.dot(Oo.cross(Xn));if(c<0||l+c>o)return null;let h=-s*Xn.dot(Bo);return h<0?null:this.at(h/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ze=class i{constructor(e,t,n,r,a,s,o,l,c,h,u,d,p,f,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,l,c,h,u,d,p,f,x,m)}set(e,t,n,r,a,s,o,l,c,h,u,d,p,f,x,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=a,g[5]=s,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=p,g[7]=f,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Gi.setFromMatrixColumn(e,0).length(),a=1/Gi.setFromMatrixColumn(e,1).length(),s=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,a=e.z,s=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(a),u=Math.sin(a);if(e.order==="XYZ"){let d=s*h,p=s*u,f=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+f*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=f+p*c,t[10]=s*l}else if(e.order==="YXZ"){let d=l*h,p=l*u,f=c*h,x=c*u;t[0]=d+x*o,t[4]=f*o-p,t[8]=s*c,t[1]=s*u,t[5]=s*h,t[9]=-o,t[2]=p*o-f,t[6]=x+d*o,t[10]=s*l}else if(e.order==="ZXY"){let d=l*h,p=l*u,f=c*h,x=c*u;t[0]=d-x*o,t[4]=-s*u,t[8]=f+p*o,t[1]=p+f*o,t[5]=s*h,t[9]=x-d*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){let d=s*h,p=s*u,f=o*h,x=o*u;t[0]=l*h,t[4]=f*c-p,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=p*c-f,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){let d=s*l,p=s*c,f=o*l,x=o*c;t[0]=l*h,t[4]=x-d*u,t[8]=f*u+p,t[1]=u,t[5]=s*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+f,t[10]=d-x*u}else if(e.order==="XZY"){let d=s*l,p=s*c,f=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=s*h,t[9]=p*u-f,t[2]=f*u-p,t[6]=o*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ep,e,tp)}lookAt(e,t,n){let r=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Yn.crossVectors(n,Xt),Yn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Yn.crossVectors(n,Xt)),Yn.normalize(),Pa.crossVectors(Xt,Yn),r[0]=Yn.x,r[4]=Pa.x,r[8]=Xt.x,r[1]=Yn.y,r[5]=Pa.y,r[9]=Xt.y,r[2]=Yn.z,r[6]=Pa.z,r[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],f=n[2],x=n[6],m=n[10],g=n[14],_=n[3],v=n[7],b=n[11],P=n[15],E=r[0],D=r[4],F=r[8],k=r[12],W=r[1],X=r[5],V=r[9],$=r[13],Y=r[2],ee=r[6],Z=r[10],oe=r[14],le=r[3],Se=r[7],Ae=r[11],ae=r[15];return a[0]=s*E+o*W+l*Y+c*le,a[4]=s*D+o*X+l*ee+c*Se,a[8]=s*F+o*V+l*Z+c*Ae,a[12]=s*k+o*$+l*oe+c*ae,a[1]=h*E+u*W+d*Y+p*le,a[5]=h*D+u*X+d*ee+p*Se,a[9]=h*F+u*V+d*Z+p*Ae,a[13]=h*k+u*$+d*oe+p*ae,a[2]=f*E+x*W+m*Y+g*le,a[6]=f*D+x*X+m*ee+g*Se,a[10]=f*F+x*V+m*Z+g*Ae,a[14]=f*k+x*$+m*oe+g*ae,a[3]=_*E+v*W+b*Y+P*le,a[7]=_*D+v*X+b*ee+P*Se,a[11]=_*F+v*V+b*Z+P*Ae,a[15]=_*k+v*$+b*oe+P*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],s=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14];return e[3]*(+a*l*u-r*c*u-a*o*d+n*c*d+r*o*p-n*l*p)+e[7]*(+t*l*p-t*c*d+a*s*d-r*s*p+r*c*h-a*l*h)+e[11]*(+t*c*u-t*o*p-a*s*u+n*s*p+a*o*h-n*c*h)+e[15]*(-r*o*h-t*l*u+t*o*d+r*s*u-n*s*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],f=e[12],x=e[13],m=e[14],g=e[15],_=u*m*c-x*d*c+x*l*p-o*m*p-u*l*g+o*d*g,v=f*d*c-h*m*c-f*l*p+s*m*p+h*l*g-s*d*g,b=h*x*c-f*u*c+f*o*p-s*x*p-h*o*g+s*u*g,P=f*u*l-h*x*l-f*o*d+s*x*d+h*o*m-s*u*m,E=t*_+n*v+r*b+a*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/E;return e[0]=_*D,e[1]=(x*d*a-u*m*a-x*r*p+n*m*p+u*r*g-n*d*g)*D,e[2]=(o*m*a-x*l*a+x*r*c-n*m*c-o*r*g+n*l*g)*D,e[3]=(u*l*a-o*d*a-u*r*c+n*d*c+o*r*p-n*l*p)*D,e[4]=v*D,e[5]=(h*m*a-f*d*a+f*r*p-t*m*p-h*r*g+t*d*g)*D,e[6]=(f*l*a-s*m*a-f*r*c+t*m*c+s*r*g-t*l*g)*D,e[7]=(s*d*a-h*l*a+h*r*c-t*d*c-s*r*p+t*l*p)*D,e[8]=b*D,e[9]=(f*u*a-h*x*a-f*n*p+t*x*p+h*n*g-t*u*g)*D,e[10]=(s*x*a-f*o*a+f*n*c-t*x*c-s*n*g+t*o*g)*D,e[11]=(h*o*a-s*u*a-h*n*c+t*u*c+s*n*p-t*o*p)*D,e[12]=P*D,e[13]=(h*x*r-f*u*r+f*n*d-t*x*d-h*n*m+t*u*m)*D,e[14]=(f*o*r-s*x*r-f*n*l+t*x*l+s*n*m-t*o*m)*D,e[15]=(s*u*r-h*o*r+h*n*l-t*u*l-s*n*d+t*o*d)*D,this}scale(e){let t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),a=1-n,s=e.x,o=e.y,l=e.z,c=a*s,h=a*o;return this.set(c*s+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*s,0,c*l-r*o,h*l+r*s,a*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,s){return this.set(1,n,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,a=t._x,s=t._y,o=t._z,l=t._w,c=a+a,h=s+s,u=o+o,d=a*c,p=a*h,f=a*u,x=s*h,m=s*u,g=o*u,_=l*c,v=l*h,b=l*u,P=n.x,E=n.y,D=n.z;return r[0]=(1-(x+g))*P,r[1]=(p+b)*P,r[2]=(f-v)*P,r[3]=0,r[4]=(p-b)*E,r[5]=(1-(d+g))*E,r[6]=(m+_)*E,r[7]=0,r[8]=(f+v)*D,r[9]=(m-_)*D,r[10]=(1-(d+x))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,a=Gi.set(r[0],r[1],r[2]).length(),s=Gi.set(r[4],r[5],r[6]).length(),o=Gi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],sn.copy(this);let l=1/a,c=1/s,h=1/o;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=c,sn.elements[5]*=c,sn.elements[6]*=c,sn.elements[8]*=h,sn.elements[9]*=h,sn.elements[10]*=h,t.setFromRotationMatrix(sn),n.x=a,n.y=s,n.z=o,this}makePerspective(e,t,n,r,a,s,o=2e3){let l=this.elements,c=2*a/(t-e),h=2*a/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r),p,f;if(o===pi)p=-(s+a)/(s-a),f=-2*s*a/(s-a);else{if(o!==Nr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-s/(s-a),f=-s*a/(s-a)}return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,a,s,o=2e3){let l=this.elements,c=1/(t-e),h=1/(n-r),u=1/(s-a),d=(t+e)*c,p=(n+r)*h,f,x;if(o===pi)f=(s+a)*u,x=-2*u;else{if(o!==Nr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);f=a*u,x=-1*u}return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Gi=new R,sn=new ze,ep=new R(0,0,0),tp=new R(1,1,1),Yn=new R,Pa=new R,Xt=new R,hh=new ze,uh=new cn,dn=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,a=r[0],s=r[4],o=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ye(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return hh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return uh.setFromEuler(this),this.setFromQuaternion(uh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};dn.DEFAULT_ORDER="XYZ";var zr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},np=0,dh=new R,Vi=new cn,Pn=new ze,La=new R,Cr=new R,ip=new R,rp=new cn,ph=new R(1,0,0),mh=new R(0,1,0),fh=new R(0,0,1),gh={type:"added"},ap={type:"removed"},Wi={type:"childadded",child:null},zo={type:"childremoved",child:null},Ot=class i extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=dr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new dn,n=new cn,r=new R(1,1,1);t._onChange((function(){n.setFromEuler(t,!1)})),n._onChange((function(){t.setFromQuaternion(n,void 0,!1)})),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ze},normalMatrix:{value:new Fe}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(ph,e)}rotateY(e){return this.rotateOnAxis(mh,e)}rotateZ(e){return this.rotateOnAxis(fh,e)}translateOnAxis(e,t){return dh.copy(e).applyQuaternion(this.quaternion),this.position.add(dh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ph,e)}translateY(e){return this.translateOnAxis(mh,e)}translateZ(e){return this.translateOnAxis(fh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?La.copy(e):La.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(Cr,La,this.up):Pn.lookAt(La,Cr,this.up),this.quaternion.setFromRotationMatrix(Pn),r&&(Pn.extractRotation(r.matrixWorld),Vi.setFromRotationMatrix(Pn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gh),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ap),zo.child=e,this.dispatchEvent(zo),zo.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gh),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,e,ip),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,rp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map((o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()}))),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];a(e.shapes,u)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(a(e.animations,l))}}if(t){let o=s(e.geometries),l=s(e.materials),c=s(e.textures),h=s(e.images),u=s(e.shapes),d=s(e.skeletons),p=s(e.animations),f=s(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),f.length>0&&(n.nodes=f)}return n.object=r,n;function s(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Ot.DEFAULT_UP=new R(0,1,0),Ot.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var on=new R,Ln=new R,Ho=new R,In=new R,Xi=new R,Yi=new R,_h=new R,ko=new R,Go=new R,Vo=new R,Wo=new lt,Xo=new lt,Yo=new lt,Un=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),on.subVectors(e,t),r.cross(on);let a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){on.subVectors(r,t),Ln.subVectors(n,t),Ho.subVectors(e,t);let s=on.dot(on),o=on.dot(Ln),l=on.dot(Ho),c=Ln.dot(Ln),h=Ln.dot(Ho),u=s*c-o*o;if(u===0)return a.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,f=(s*h-o*l)*d;return a.set(1-p-f,f,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,In)!==null&&In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,n,r,a,s,o,l){return this.getBarycoord(e,t,n,r,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,In.x),l.addScaledVector(s,In.y),l.addScaledVector(o,In.z),l)}static getInterpolatedAttribute(e,t,n,r,a,s){return Wo.setScalar(0),Xo.setScalar(0),Yo.setScalar(0),Wo.fromBufferAttribute(e,t),Xo.fromBufferAttribute(e,n),Yo.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(Wo,a.x),s.addScaledVector(Xo,a.y),s.addScaledVector(Yo,a.z),s}static isFrontFacing(e,t,n,r){return on.subVectors(n,t),Ln.subVectors(e,t),on.cross(Ln).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),.5*on.cross(Ln).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,a=this.c,s,o;Xi.subVectors(r,n),Yi.subVectors(a,n),ko.subVectors(e,n);let l=Xi.dot(ko),c=Yi.dot(ko);if(l<=0&&c<=0)return t.copy(n);Go.subVectors(e,r);let h=Xi.dot(Go),u=Yi.dot(Go);if(h>=0&&u<=h)return t.copy(r);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return s=l/(l-h),t.copy(n).addScaledVector(Xi,s);Vo.subVectors(e,a);let p=Xi.dot(Vo),f=Yi.dot(Vo);if(f>=0&&p<=f)return t.copy(a);let x=p*c-l*f;if(x<=0&&c>=0&&f<=0)return o=c/(c-f),t.copy(n).addScaledVector(Yi,o);let m=h*f-p*u;if(m<=0&&u-h>=0&&p-f>=0)return _h.subVectors(a,r),o=(u-h)/(u-h+(p-f)),t.copy(r).addScaledVector(_h,o);let g=1/(m+x+d);return s=x*g,o=d*g,t.copy(n).addScaledVector(Xi,s).addScaledVector(Yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Lu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Ia={h:0,s:0,l:0};function jo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}var Ue=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Je.workingColorSpace){if(e=Zd(e,1),t=Ye(t,0,1),n=Ye(n,0,1),t===0)this.r=this.g=this.b=n;else{let a=n<=.5?n*(1+t):n+t-n*t,s=2*n-a;this.r=jo(s,a,e+1/3),this.g=jo(s,a,e),this.b=jo(s,a,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=Dt){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){let n=Lu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=Ki(e.r),this.g=Ki(e.g),this.b=Ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return Je.fromWorkingColorSpace(Ut.copy(this),e),65536*Math.round(Ye(255*Ut.r,0,255))+256*Math.round(Ye(255*Ut.g,0,255))+Math.round(Ye(255*Ut.b,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(Ut.copy(this),t);let n=Ut.r,r=Ut.g,a=Ut.b,s=Math.max(n,r,a),o=Math.min(n,r,a),l,c,h=(o+s)/2;if(o===s)l=0,c=0;else{let u=s-o;switch(c=h<=.5?u/(s+o):u/(2-s-o),s){case n:l=(r-a)/u+(r<a?6:0);break;case r:l=(a-n)/u+2;break;case a:l=(n-r)/u+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=Dt){Je.fromWorkingColorSpace(Ut.copy(this),e);let t=Ut.r,n=Ut.g,r=Ut.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(Ia);let n=Po(jn.h,Ia.h,t),r=Po(jn.s,Ia.s,t),a=Po(jn.l,Ia.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ut=new Ue;Ue.NAMES=Lu;var sp=0,Jn=class extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=dr(),this.name="",this.type="Material",this.blending=1,this.side=ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hi,this.stencilZFail=hi,this.stencilZPass=hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function r(a){let s=[];for(let o in a){let l=a[o];delete l.metadata,s.push(l)}return s}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==ln&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let a=r(e.textures),s=r(e.images);a.length>0&&(n.textures=a),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},On=class extends Jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},mg=op();function op(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let a=new Uint32Array(2048),s=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(8388608&c)==0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,a[l]=c|h}for(let l=1024;l<2048;++l)a[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)s[l]=l<<23;s[31]=1199570944,s[32]=2147483648;for(let l=33;l<63;++l)s[l]=2147483648+(l-32<<23);s[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:a,exponentTable:s,offsetTable:o}}var xt=new R,Ua=new ce,yt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=sl,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ua.fromBufferAttribute(this,t),Ua.applyMatrix3(e),this.setXY(t,Ua.x,Ua.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Er(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Er(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Er(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Er(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Er(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),r=Ht(r,this.array),a=Ht(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sl&&(e.usage=this.usage),e}};var Hr=class extends yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var kr=class extends yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ce=class extends yt{constructor(e,t,n){super(new Float32Array(e),t,n)}},lp=0,Zt=new ze,qo=new Ot,ji=new R,Yt=new hn,Pr=new hn,Rt=new R,Qe=class i extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=dr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($l(e)?kr:Hr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let a=new Fe().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,n){return Zt.makeTranslation(e,t,n),this.applyMatrix4(Zt),this}scale(e,t,n){return Zt.makeScale(e,t,n),this.applyMatrix4(Zt),this}lookAt(e){return qo.lookAt(e),qo.updateMatrix(),this.applyMatrix4(qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,a=e.length;r<a;r++){let s=e[r];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ce(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let a=t[n];Yt.setFromBufferAttribute(a),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,Yt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,Yt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(Yt.min),this.boundingBox.expandByPoint(Yt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new R,1/0);if(e){let n=this.boundingSphere.center;if(Yt.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){let o=t[a];Pr.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(Yt.min,Pr.min),Yt.expandByPoint(Rt),Rt.addVectors(Yt.max,Pr.max),Yt.expandByPoint(Rt)):(Yt.expandByPoint(Pr.min),Yt.expandByPoint(Pr.max))}Yt.getCenter(n);let r=0;for(let a=0,s=e.count;a<s;a++)Rt.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(Rt));if(t)for(let a=0,s=t.length;a<s;a++){let o=t[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Rt.fromBufferAttribute(o,c),l&&(ji.fromBufferAttribute(e,c),Rt.add(ji)),r=Math.max(r,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yt(new Float32Array(4*n.count),4));let s=this.getAttribute("tangent"),o=[],l=[];for(let F=0;F<n.count;F++)o[F]=new R,l[F]=new R;let c=new R,h=new R,u=new R,d=new ce,p=new ce,f=new ce,x=new R,m=new R;function g(F,k,W){c.fromBufferAttribute(n,F),h.fromBufferAttribute(n,k),u.fromBufferAttribute(n,W),d.fromBufferAttribute(a,F),p.fromBufferAttribute(a,k),f.fromBufferAttribute(a,W),h.sub(c),u.sub(c),p.sub(d),f.sub(d);let X=1/(p.x*f.y-f.x*p.y);isFinite(X)&&(x.copy(h).multiplyScalar(f.y).addScaledVector(u,-p.y).multiplyScalar(X),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-f.x).multiplyScalar(X),o[F].add(x),o[k].add(x),o[W].add(x),l[F].add(m),l[k].add(m),l[W].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let F=0,k=_.length;F<k;++F){let W=_[F],X=W.start;for(let V=X,$=X+W.count;V<$;V+=3)g(e.getX(V+0),e.getX(V+1),e.getX(V+2))}let v=new R,b=new R,P=new R,E=new R;function D(F){P.fromBufferAttribute(r,F),E.copy(P);let k=o[F];v.copy(k),v.sub(P.multiplyScalar(P.dot(k))).normalize(),b.crossVectors(E,k);let W=b.dot(l[F])<0?-1:1;s.setXYZW(F,v.x,v.y,v.z,W)}for(let F=0,k=_.length;F<k;++F){let W=_[F],X=W.start;for(let V=X,$=X+W.count;V<$;V+=3)D(e.getX(V+0)),D(e.getX(V+1)),D(e.getX(V+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new yt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let r=new R,a=new R,s=new R,o=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let d=0,p=e.count;d<p;d+=3){let f=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),a.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),h.subVectors(s,a),u.subVectors(r,a),h.cross(u),o.fromBufferAttribute(n,f),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),h.subVectors(s,a),u.subVectors(r,a),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,f=0;for(let x=0,m=l.length;x<m;x++){p=o.isInterleavedBufferAttribute?l[x]*o.data.stride+o.offset:l[x]*h;for(let g=0;g<h;g++)d[f++]=c[p++]}return new yt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=e(r[o],n);t.setAttribute(o,l)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let h=0,u=c.length;h<u;h++){let d=e(c[h],n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,l=s.length;o<l;o++){let c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let a=e.morphAttributes;for(let c in a){let h=[],u=a[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let c=0,h=s.length;c<h;c++){let u=s[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},vh=new ze,li=new mi,Da=new un,xh=new R,Na=new R,Fa=new R,Oa=new R,Zo=new R,Ba=new R,yh=new R,za=new R,Ke=class extends Ot{constructor(e=new Qe,t=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){let s=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=r}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(a&&o){Ba.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let h=o[l],u=a[l];h!==0&&(Zo.fromBufferAttribute(u,e),s?Ba.addScaledVector(Zo,h):Ba.addScaledVector(Zo.sub(t),h))}t.add(Ba)}return t}raycast(e,t){let n=this.geometry,r=this.material,a=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Da.copy(n.boundingSphere),Da.applyMatrix4(a),li.copy(e.ray).recast(e.near),Da.containsPoint(li.origin)===!1&&(li.intersectSphere(Da,xh)===null||li.origin.distanceToSquared(xh)>(e.far-e.near)**2))return;vh.copy(a).invert(),li.copy(e.ray).applyMatrix4(vh),n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,li)}}_computeIntersections(e,t,n){let r,a=this.geometry,s=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,u=a.attributes.normal,d=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let f=0,x=d.length;f<x;f++){let m=d[f],g=s[m.materialIndex];for(let _=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));_<v;_+=3)r=Ha(this,g,e,n,c,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}else for(let f=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);f<x;f+=3)r=Ha(this,s,e,n,c,h,u,o.getX(f),o.getX(f+1),o.getX(f+2)),r&&(r.faceIndex=Math.floor(f/3),t.push(r));else if(l!==void 0)if(Array.isArray(s))for(let f=0,x=d.length;f<x;f++){let m=d[f],g=s[m.materialIndex];for(let _=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));_<v;_+=3)r=Ha(this,g,e,n,c,h,u,_,_+1,_+2),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}else for(let f=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);f<x;f+=3)r=Ha(this,s,e,n,c,h,u,f,f+1,f+2),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}};function Ha(i,e,t,n,r,a,s,o,l,c){i.getVertexPosition(o,Na),i.getVertexPosition(l,Fa),i.getVertexPosition(c,Oa);let h=(function(u,d,p,f,x,m,g,_){let v;if(v=d.side===Bt?f.intersectTriangle(g,m,x,!0,_):f.intersectTriangle(x,m,g,d.side===ln,_),v===null)return null;za.copy(_),za.applyMatrix4(u.matrixWorld);let b=p.ray.origin.distanceTo(za);return b<p.near||b>p.far?null:{distance:b,point:za.clone(),object:u}})(i,e,t,n,Na,Fa,Oa,yh);if(h){let u=new R;Un.getBarycoord(yh,Na,Fa,Oa,u),r&&(h.uv=Un.getInterpolatedAttribute(r,o,l,c,u,new ce)),a&&(h.uv1=Un.getInterpolatedAttribute(a,o,l,c,u,new ce)),s&&(h.normal=Un.getInterpolatedAttribute(s,o,l,c,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new R,materialIndex:0};Un.getNormal(Na,Fa,Oa,d.normal),h.face=d,h.barycoord=u}return h}var fi=class i extends Qe{constructor(e=1,t=1,n=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:s};let o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);let l=[],c=[],h=[],u=[],d=0,p=0;function f(x,m,g,_,v,b,P,E,D,F,k){let W=b/D,X=P/F,V=b/2,$=P/2,Y=E/2,ee=D+1,Z=F+1,oe=0,le=0,Se=new R;for(let Ae=0;Ae<Z;Ae++){let ae=Ae*X-$;for(let de=0;de<ee;de++){let ye=de*W-V;Se[x]=ye*_,Se[m]=ae*v,Se[g]=Y,c.push(Se.x,Se.y,Se.z),Se[x]=0,Se[m]=0,Se[g]=E>0?1:-1,h.push(Se.x,Se.y,Se.z),u.push(de/D),u.push(1-Ae/F),oe+=1}}for(let Ae=0;Ae<F;Ae++)for(let ae=0;ae<D;ae++){let de=d+ae+ee*Ae,ye=d+ae+ee*(Ae+1),ve=d+(ae+1)+ee*(Ae+1),A=d+(ae+1)+ee*Ae;l.push(de,ye,A),l.push(ye,ve,A),le+=6}o.addGroup(p,le,k),p+=le,d+=oe}f("z","y","x",-1,-1,n,t,e,s,a,0),f("z","y","x",1,-1,n,t,-e,s,a,1),f("x","z","y",1,1,e,n,t,r,s,2),f("x","z","y",1,-1,e,n,-t,r,s,3),f("x","y","z",1,-1,e,t,n,r,a,4),f("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(l),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ri(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Nt(i){let e={};for(let t=0;t<i.length;t++){let n=Ri(i[t]);for(let r in n)e[r]=n[r]}return e}function Ql(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}var Iu={clone:Ri,merge:Nt},gt=class extends Jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ri(e.uniforms),this.uniformsGroups=(function(t){let n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},er=class extends Ot{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=pi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},qn=new R,bh=new ce,Mh=new ce,kt=class extends er{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Qa*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Ka*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Qa*Math.atan(Math.tan(.5*Ka*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qn.x,qn.y).multiplyScalar(-e/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qn.x,qn.y).multiplyScalar(-e/qn.z)}getViewSize(e,t){return this.getViewBounds(e,bh,Mh),t.subVectors(Mh,bh)}setViewOffset(e,t,n,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Ka*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let l=s.fullWidth,c=s.fullHeight;a+=s.offsetX*r/l,t-=s.offsetY*n/c,r*=s.width/l,n*=s.height/c}let o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},qi=-90,is=class extends Ot{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new kt(qi,1,e,t);r.layers=this.layers,this.add(r);let a=new kt(qi,1,e,t);a.layers=this.layers,this.add(a);let s=new kt(qi,1,e,t);s.layers=this.layers,this.add(s);let o=new kt(qi,1,e,t);o.layers=this.layers,this.add(o);let l=new kt(qi,1,e,t);l.layers=this.layers,this.add(l);let c=new kt(qi,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,a,s,o,l]=t;for(let c of t)this.remove(c);if(e===pi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==Nr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,s,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,s),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},Gr=class extends Pt{constructor(e,t,n,r,a,s,o,l,c,h){super(e=e!==void 0?e:[],t=t!==void 0?t:Si,n,r,a,s,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},rs=class extends vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Gr(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fi(5,5,5),a=new gt({name:"CubemapFromEquirect",uniforms:Ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:0});a.uniforms.tEquirect.value=t;let s=new Ke(r,a),o=t.minFilter;return t.minFilter===Ti&&(t.minFilter=ft),new is(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,n,r){let a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(a)}};var Vr=class extends Ot{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var fg=new R;var gg=new R,_g=new R,vg=new R,xg=new ce,yg=new ce,bg=new ze,Mg=new R,Sg=new R,wg=new R,Tg=new ce,Eg=new ce,Ag=new ce;var Rg=new R,Cg=new R;var Pg=new R,Lg=new lt,Ig=new lt,Ug=new R,Dg=new ze,Ng=new R,Fg=new un,Og=new ze,Bg=new mi;var $n=class extends Pt{constructor(e=null,t=1,n=1,r,a,s,o,l,c=1003,h=1003,u,d){super(null,s,o,l,c,h,r,a,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},zg=new ze,Hg=new ze;var tr=class extends yt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},kg=new ze,Gg=new ze;var Vg=new hn,Wg=new ze,Xg=new Ke,Yg=new un;var Ko=new R,cp=new R,hp=new Fe,_n=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ko.subVectors(n,t).cross(cp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ko),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||hp.getNormalMatrix(e),r=this.coplanarPoint(Ko).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ci=new un,ka=new R,gi=class{constructor(e=new _n,t=new _n,n=new _n,r=new _n,a=new _n,s=new _n){this.planes=[e,t,n,r,a,s]}set(e,t,n,r,a,s){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){let n=this.planes,r=e.elements,a=r[0],s=r[1],o=r[2],l=r[3],c=r[4],h=r[5],u=r[6],d=r[7],p=r[8],f=r[9],x=r[10],m=r[11],g=r[12],_=r[13],v=r[14],b=r[15];if(n[0].setComponents(l-a,d-c,m-p,b-g).normalize(),n[1].setComponents(l+a,d+c,m+p,b+g).normalize(),n[2].setComponents(l+s,d+h,m+f,b+_).normalize(),n[3].setComponents(l-s,d-h,m-f,b-_).normalize(),n[4].setComponents(l-o,d-u,m-x,b-v).normalize(),t===pi)n[5].setComponents(l+o,d+u,m+x,b+v).normalize();else{if(t!==Nr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(o,u,x,v).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(e){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ka.x=r.normal.x>0?e.max.x:e.min.x,ka.y=r.normal.y>0?e.max.y:e.min.y,ka.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ka)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ol=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,r){let a=this.pool,s=this.list;this.index>=a.length&&a.push({start:-1,count:-1,z:-1,index:-1});let o=a[this.index];s.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=r}reset(){this.list.length=0,this.index=0}},jg=new ze,qg=new Ue(1,1,1),Zg=new gi,Kg=new hn,Jg=new un,$g=new R,Qg=new R,e0=new R,t0=new ol,n0=new Ke;var i0=new R,r0=new R,a0=new ze,s0=new mi,o0=new un,l0=new R,c0=new R;var h0=new R,u0=new R;var d0=new ze,p0=new mi,m0=new un,f0=new R;var wt=class extends Ot{constructor(){super(),this.isGroup=!0,this.type="Group"}};var Wr=class extends Pt{constructor(e,t,n,r,a,s,o,l,c){super(e,t,n,r,a,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Xr=class extends Pt{constructor(e,t,n,r,a,s,o,l,c,h=1026){if(h!==Qi&&h!==ui)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Qi&&(n=ti),n===void 0&&h===ui&&(n=1020),super(null,r,a,s,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Jt,this.minFilter=l!==void 0?l:Jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},jt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)n=this.getPoint(s/e),a+=n.distanceTo(r),t.push(a),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),r=0,a=n.length,s;s=t||e*n[a-1];let o,l=0,c=a-1;for(;l<=c;)if(r=Math.floor(l+(c-l)/2),o=n[r]-s,o<0)l=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,n[r]===s)return r/(a-1);let h=n[r];return(r+(s-h)/(n[r+1]-h))/(a-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);let s=this.getPoint(r),o=this.getPoint(a),l=t||(s.isVector2?new ce:new R);return l.copy(o).sub(s).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new R,r=[],a=[],s=[],o=new R,l=new ze;for(let p=0;p<=e;p++){let f=p/e;r[p]=this.getTangentAt(f,new R)}a[0]=new R,s[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),a[0].crossVectors(r[0],o),s[0].crossVectors(r[0],a[0]);for(let p=1;p<=e;p++){if(a[p]=a[p-1].clone(),s[p]=s[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();let f=Math.acos(Ye(r[p-1].dot(r[p]),-1,1));a[p].applyMatrix4(l.makeRotationAxis(o,f))}s[p].crossVectors(r[p],a[p])}if(t===!0){let p=Math.acos(Ye(a[0].dot(a[e]),-1,1));p/=e,r[0].dot(o.crossVectors(a[0],a[e]))>0&&(p=-p);for(let f=1;f<=e;f++)a[f].applyMatrix4(l.makeRotationAxis(r[f],p*f)),s[f].crossVectors(r[f],a[f])}return{tangents:r,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},nr=class extends jt{constructor(e=0,t=0,n=1,r=1,a=0,s=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ce){let n=t,r=2*Math.PI,a=this.aEndAngle-this.aStartAngle,s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(a=s?0:r),this.aClockwise!==!0||s||(a===r?a=-r:a-=r);let o=this.aStartAngle+e*a,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},as=class extends nr{constructor(e,t,n,r,a,s){super(e,t,n,n,r,a,s),this.isArcCurve=!0,this.type="ArcCurve"}};function ec(){let i=0,e=0,t=0,n=0;function r(a,s,o,l){i=a,e=o,t=-3*a+3*s-2*o-l,n=2*a-2*s+o+l}return{initCatmullRom:function(a,s,o,l,c){r(s,o,c*(o-a),c*(l-s))},initNonuniformCatmullRom:function(a,s,o,l,c,h,u){let d=(s-a)/c-(o-a)/(c+h)+(o-s)/h,p=(o-s)/h-(l-s)/(h+u)+(l-o)/u;d*=h,p*=h,r(s,o,d,p)},calc:function(a){let s=a*a;return i+e*a+t*s+n*(s*a)}}}var Ga=new R,Jo=new ec,$o=new ec,Qo=new ec,ss=class extends jt{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new R){let n=t,r=this.points,a=r.length,s=(a-(this.closed?0:1))*e,o,l,c=Math.floor(s),h=s-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/a)+1)*a:h===0&&c===a-1&&(c=a-2,h=1),this.closed||c>0?o=r[(c-1)%a]:(Ga.subVectors(r[0],r[1]).add(r[0]),o=Ga);let u=r[c%a],d=r[(c+1)%a];if(this.closed||c+2<a?l=r[(c+2)%a]:(Ga.subVectors(r[a-1],r[a-2]).add(r[a-1]),l=Ga),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,f=Math.pow(o.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(l),p);x<1e-4&&(x=1),f<1e-4&&(f=x),m<1e-4&&(m=x),Jo.initNonuniformCatmullRom(o.x,u.x,d.x,l.x,f,x,m),$o.initNonuniformCatmullRom(o.y,u.y,d.y,l.y,f,x,m),Qo.initNonuniformCatmullRom(o.z,u.z,d.z,l.z,f,x,m)}else this.curveType==="catmullrom"&&(Jo.initCatmullRom(o.x,u.x,d.x,l.x,this.tension),$o.initCatmullRom(o.y,u.y,d.y,l.y,this.tension),Qo.initCatmullRom(o.z,u.z,d.z,l.z,this.tension));return n.set(Jo.calc(h),$o.calc(h),Qo.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Sh(i,e,t,n,r){let a=.5*(n-e),s=.5*(r-t),o=i*i;return(2*t-2*n+a+s)*(i*o)+(-3*t+3*n-2*a-s)*o+a*i+t}function Lr(i,e,t,n){return(function(r,a){let s=1-r;return s*s*a})(i,e)+(function(r,a){return 2*(1-r)*r*a})(i,t)+(function(r,a){return r*r*a})(i,n)}function Ir(i,e,t,n,r){return(function(a,s){let o=1-a;return o*o*o*s})(i,e)+(function(a,s){let o=1-a;return 3*o*o*a*s})(i,t)+(function(a,s){return 3*(1-a)*a*a*s})(i,n)+(function(a,s){return a*a*a*s})(i,r)}var Yr=class extends jt{constructor(e=new ce,t=new ce,n=new ce,r=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ce){let n=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return n.set(Ir(e,r.x,a.x,s.x,o.x),Ir(e,r.y,a.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},os=class extends jt{constructor(e=new R,t=new R,n=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new R){let n=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return n.set(Ir(e,r.x,a.x,s.x,o.x),Ir(e,r.y,a.y,s.y,o.y),Ir(e,r.z,a.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},jr=class extends jt{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ls=class extends jt{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qr=class extends jt{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){let n=t,r=this.v0,a=this.v1,s=this.v2;return n.set(Lr(e,r.x,a.x,s.x),Lr(e,r.y,a.y,s.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zr=class extends jt{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,r=this.v0,a=this.v1,s=this.v2;return n.set(Lr(e,r.x,a.x,s.x),Lr(e,r.y,a.y,s.y),Lr(e,r.z,a.z,s.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Kr=class extends jt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){let n=t,r=this.points,a=(r.length-1)*e,s=Math.floor(a),o=a-s,l=r[s===0?s:s-1],c=r[s],h=r[s>r.length-2?r.length-1:s+1],u=r[s>r.length-3?r.length-1:s+2];return n.set(Sh(o,l.x,c.x,h.x,u.x),Sh(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new ce().fromArray(r))}return this}},cs=Object.freeze({__proto__:null,ArcCurve:as,CatmullRomCurve3:ss,CubicBezierCurve:Yr,CubicBezierCurve3:os,EllipseCurve:nr,LineCurve:jr,LineCurve3:ls,QuadraticBezierCurve:qr,QuadraticBezierCurve3:Zr,SplineCurve:Kr}),hs=class extends jt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new cs[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),a=0;for(;a<r.length;){if(r[a]>=n){let s=r[a]-n,o=this.curves[a],l=o.getLength(),c=l===0?0:1-s/l;return o.getPointAt(c,t)}a++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,a=this.curves;r<a.length;r++){let s=a[r],o=s.isEllipseCurve?2*e:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,l=s.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new cs[r.type]().fromJSON(r))}return this}},ir=class extends hs{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new jr(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let a=new qr(this.currentPoint.clone(),new ce(e,t),new ce(n,r));return this.curves.push(a),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,a,s){let o=new Yr(this.currentPoint.clone(),new ce(e,t),new ce(n,r),new ce(a,s));return this.curves.push(o),this.currentPoint.set(a,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Kr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,a,s){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,a,s),this}absarc(e,t,n,r,a,s){return this.absellipse(e,t,n,n,r,a,s),this}ellipse(e,t,n,r,a,s,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,a,s,o,l),this}absellipse(e,t,n,r,a,s,o,l){let c=new nr(e,t,n,r,a,s,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Jr=class i extends Qe{constructor(e=[new ce(0,-.5),new ce(.5,0),new ce(0,.5)],t=12,n=0,r=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Ye(r,0,2*Math.PI);let a=[],s=[],o=[],l=[],c=[],h=1/t,u=new R,d=new ce,p=new R,f=new R,x=new R,m=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,p.x=1*g,p.y=-m,p.z=0*g,x.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,p.x=1*g,p.y=-m,p.z=0*g,f.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),l.push(p.x,p.y,p.z),x.copy(f)}for(let _=0;_<=t;_++){let v=n+_*h*r,b=Math.sin(v),P=Math.cos(v);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*b,u.y=e[E].y,u.z=e[E].x*P,s.push(u.x,u.y,u.z),d.x=_/t,d.y=E/(e.length-1),o.push(d.x,d.y);let D=l[3*E+0]*b,F=l[3*E+1],k=l[3*E+0]*P;c.push(D,F,k)}}for(let _=0;_<t;_++)for(let v=0;v<e.length-1;v++){let b=v+_*e.length,P=b,E=b+e.length,D=b+e.length+1,F=b+1;a.push(P,E,F),a.push(D,F,E)}this.setIndex(a),this.setAttribute("position",new Ce(s,3)),this.setAttribute("uv",new Ce(o,2)),this.setAttribute("normal",new Ce(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},us=class i extends Jr{constructor(e=1,t=1,n=4,r=8){let a=new ir;a.absarc(0,-t/2,e,1.5*Math.PI,0),a.absarc(0,t/2,e,0,.5*Math.PI),super(a.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:r}}static fromJSON(e){return new i(e.radius,e.length,e.capSegments,e.radialSegments)}},ds=class i extends Qe{constructor(e=1,t=32,n=0,r=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let a=[],s=[],o=[],l=[],c=new R,h=new ce;s.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),s.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(s[d]/e+1)/2,h.y=(s[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)a.push(u,u+1,0);this.setIndex(a),this.setAttribute("position",new Ce(s,3)),this.setAttribute("normal",new Ce(o,3)),this.setAttribute("uv",new Ce(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},_i=class i extends Qe{constructor(e=1,t=1,n=1,r=32,a=1,s=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),a=Math.floor(a);let h=[],u=[],d=[],p=[],f=0,x=[],m=n/2,g=0;function _(v){let b=f,P=new ce,E=new R,D=0,F=v===!0?e:t,k=v===!0?1:-1;for(let X=1;X<=r;X++)u.push(0,m*k,0),d.push(0,k,0),p.push(.5,.5),f++;let W=f;for(let X=0;X<=r;X++){let V=X/r*l+o,$=Math.cos(V),Y=Math.sin(V);E.x=F*Y,E.y=m*k,E.z=F*$,u.push(E.x,E.y,E.z),d.push(0,k,0),P.x=.5*$+.5,P.y=.5*Y*k+.5,p.push(P.x,P.y),f++}for(let X=0;X<r;X++){let V=b+X,$=W+X;v===!0?h.push($,$+1,V):h.push($+1,$,V),D+=3}c.addGroup(g,D,v===!0?1:2),g+=D}(function(){let v=new R,b=new R,P=0,E=(t-e)/n;for(let D=0;D<=a;D++){let F=[],k=D/a,W=k*(t-e)+e;for(let X=0;X<=r;X++){let V=X/r,$=V*l+o,Y=Math.sin($),ee=Math.cos($);b.x=W*Y,b.y=-k*n+m,b.z=W*ee,u.push(b.x,b.y,b.z),v.set(Y,E,ee).normalize(),d.push(v.x,v.y,v.z),p.push(V,1-k),F.push(f++)}x.push(F)}for(let D=0;D<r;D++)for(let F=0;F<a;F++){let k=x[F][D],W=x[F+1][D],X=x[F+1][D+1],V=x[F][D+1];(e>0||F!==0)&&(h.push(k,W,V),P+=3),(t>0||F!==a-1)&&(h.push(W,X,V),P+=3)}c.addGroup(g,P,0),g+=P})(),s===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ce(u,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},rr=class i extends _i{constructor(e=1,t=1,n=32,r=1,a=!1,s=0,o=2*Math.PI){super(0,e,t,n,r,a,s,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:s,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Qn=class i extends Qe{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let a=[],s=[];function o(d,p,f,x){let m=x+1,g=[];for(let _=0;_<=m;_++){g[_]=[];let v=d.clone().lerp(f,_/m),b=p.clone().lerp(f,_/m),P=m-_;for(let E=0;E<=P;E++)g[_][E]=E===0&&_===m?v:v.clone().lerp(b,E/P)}for(let _=0;_<m;_++)for(let v=0;v<2*(m-_)-1;v++){let b=Math.floor(v/2);v%2==0?(l(g[_][b+1]),l(g[_+1][b]),l(g[_][b])):(l(g[_][b+1]),l(g[_+1][b+1]),l(g[_+1][b]))}}function l(d){a.push(d.x,d.y,d.z)}function c(d,p){let f=3*d;p.x=e[f+0],p.y=e[f+1],p.z=e[f+2]}function h(d,p,f,x){x<0&&d.x===1&&(s[p]=d.x-1),f.x===0&&f.z===0&&(s[p]=x/2/Math.PI+.5)}function u(d){return Math.atan2(d.z,-d.x)}(function(d){let p=new R,f=new R,x=new R;for(let m=0;m<t.length;m+=3)c(t[m+0],p),c(t[m+1],f),c(t[m+2],x),o(p,f,x,d)})(r),(function(d){let p=new R;for(let f=0;f<a.length;f+=3)p.x=a[f+0],p.y=a[f+1],p.z=a[f+2],p.normalize().multiplyScalar(d),a[f+0]=p.x,a[f+1]=p.y,a[f+2]=p.z})(n),(function(){let d=new R;for(let f=0;f<a.length;f+=3){d.x=a[f+0],d.y=a[f+1],d.z=a[f+2];let x=u(d)/2/Math.PI+.5,m=(p=d,Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))/Math.PI+.5);s.push(x,1-m)}var p;(function(){let f=new R,x=new R,m=new R,g=new R,_=new ce,v=new ce,b=new ce;for(let P=0,E=0;P<a.length;P+=9,E+=6){f.set(a[P+0],a[P+1],a[P+2]),x.set(a[P+3],a[P+4],a[P+5]),m.set(a[P+6],a[P+7],a[P+8]),_.set(s[E+0],s[E+1]),v.set(s[E+2],s[E+3]),b.set(s[E+4],s[E+5]),g.copy(f).add(x).add(m).divideScalar(3);let D=u(g);h(_,E+0,f,D),h(v,E+2,x,D),h(b,E+4,m,D)}})(),(function(){for(let f=0;f<s.length;f+=6){let x=s[f+0],m=s[f+2],g=s[f+4],_=Math.max(x,m,g),v=Math.min(x,m,g);_>.9&&v<.1&&(x<.2&&(s[f+0]+=1),m<.2&&(s[f+2]+=1),g<.2&&(s[f+4]+=1))}})()})(),this.setAttribute("position",new Ce(a,3)),this.setAttribute("normal",new Ce(a.slice(),3)),this.setAttribute("uv",new Ce(s,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}},vi=class i extends Qn{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Va=new R,Wa=new R,el=new R,Xa=new Un,ps=class extends Qe{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),a=Math.cos(Ka*t),s=e.getIndex(),o=e.getAttribute("position"),l=s?s.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let f=0;f<l;f+=3){s?(c[0]=s.getX(f),c[1]=s.getX(f+1),c[2]=s.getX(f+2)):(c[0]=f,c[1]=f+1,c[2]=f+2);let{a:x,b:m,c:g}=Xa;if(x.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),Xa.getNormal(el),u[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,u[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,u[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let v=(_+1)%3,b=u[_],P=u[v],E=Xa[h[_]],D=Xa[h[v]],F=`${b}_${P}`,k=`${P}_${b}`;k in d&&d[k]?(el.dot(d[k].normal)<=a&&(p.push(E.x,E.y,E.z),p.push(D.x,D.y,D.z)),d[k]=null):F in d||(d[F]={index0:c[_],index1:c[v],normal:el.clone()})}}for(let f in d)if(d[f]){let{index0:x,index1:m}=d[f];Va.fromBufferAttribute(o,x),Wa.fromBufferAttribute(o,m),p.push(Va.x,Va.y,Va.z),p.push(Wa.x,Wa.y,Wa.z)}this.setAttribute("position",new Ce(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},$r=class extends ir{constructor(e){super(e),this.uuid=dr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let r=e.holes[t];this.holes.push(new ir().fromJSON(r))}return this}},up=function(i,e,t=2){let n=e&&e.length,r=n?e[0]*t:i.length,a=wh(i,0,r,t,!0),s=[];if(!a||a.next===a.prev)return s;let o,l,c,h,u,d,p;if(n&&(a=(function(f,x,m,g){let _=[],v,b,P,E,D;for(v=0,b=x.length;v<b;v++)P=x[v]*g,E=v<b-1?x[v+1]*g:f.length,D=wh(f,P,E,g,!1),D===D.next&&(D.steiner=!0),_.push(xp(D));for(_.sort(gp),v=0;v<_.length;v++)m=_p(_[v],m);return m})(i,e,a,t)),i.length>80*t){o=c=i[0],l=h=i[1];for(let f=t;f<r;f+=t)u=i[f],d=i[f+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);p=Math.max(c-o,h-l),p=p!==0?32767/p:0}return Qr(a,s,t,o,l,p,0),s};function wh(i,e,t,n,r){let a,s;if(r===(function(o,l,c,h){let u=0;for(let d=l,p=c-h;d<c;d+=h)u+=(o[p]-o[d])*(o[d+1]+o[p+1]),p=d;return u})(i,e,t,n)>0)for(a=e;a<t;a+=n)s=Th(a,i[a],i[a+1],s);else for(a=t-n;a>=e;a-=n)s=Th(a,i[a],i[a+1],s);return s&&to(s,s.next)&&(ta(s),s=s.next),s}function xi(i,e){if(!i)return i;e||(e=i);let t,n=i;do if(t=!1,n.steiner||!to(n,n.next)&&ut(n.prev,n,n.next)!==0)n=n.next;else{if(ta(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function Qr(i,e,t,n,r,a,s){if(!i)return;!s&&a&&(function(h,u,d,p){let f=h;do f.z===0&&(f.z=ll(f.x,f.y,u,d,p)),f.prevZ=f.prev,f.nextZ=f.next,f=f.next;while(f!==h);f.prevZ.nextZ=null,f.prevZ=null,(function(x){let m,g,_,v,b,P,E,D,F=1;do{for(g=x,x=null,b=null,P=0;g;){for(P++,_=g,E=0,m=0;m<F&&(E++,_=_.nextZ,_);m++);for(D=F;E>0||D>0&&_;)E!==0&&(D===0||!_||g.z<=_.z)?(v=g,g=g.nextZ,E--):(v=_,_=_.nextZ,D--),b?b.nextZ=v:x=v,v.prevZ=b,b=v;g=_}b.nextZ=null,F*=2}while(P>1)})(f)})(i,n,r,a);let o,l,c=i;for(;i.prev!==i.next;)if(o=i.prev,l=i.next,a?pp(i,n,r,a):dp(i))e.push(o.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),ta(i),i=l.next,c=l.next;else if((i=l)===c){s?s===1?Qr(i=mp(xi(i),e,t),e,t,n,r,a,2):s===2&&fp(i,e,t,n,r,a):Qr(xi(i),e,t,n,r,a,1);break}}function dp(i){let e=i.prev,t=i,n=i.next;if(ut(e,t,n)>=0)return!1;let r=e.x,a=t.x,s=n.x,o=e.y,l=t.y,c=n.y,h=r<a?r<s?r:s:a<s?a:s,u=o<l?o<c?o:c:l<c?l:c,d=r>a?r>s?r:s:a>s?a:s,p=o>l?o>c?o:c:l>c?l:c,f=n.next;for(;f!==e;){if(f.x>=h&&f.x<=d&&f.y>=u&&f.y<=p&&Zi(r,o,a,l,s,c,f.x,f.y)&&ut(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function pp(i,e,t,n){let r=i.prev,a=i,s=i.next;if(ut(r,a,s)>=0)return!1;let o=r.x,l=a.x,c=s.x,h=r.y,u=a.y,d=s.y,p=o<l?o<c?o:c:l<c?l:c,f=h<u?h<d?h:d:u<d?u:d,x=o>l?o>c?o:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,g=ll(p,f,e,t,n),_=ll(x,m,e,t,n),v=i.prevZ,b=i.nextZ;for(;v&&v.z>=g&&b&&b.z<=_;){if(v.x>=p&&v.x<=x&&v.y>=f&&v.y<=m&&v!==r&&v!==s&&Zi(o,h,l,u,c,d,v.x,v.y)&&ut(v.prev,v,v.next)>=0||(v=v.prevZ,b.x>=p&&b.x<=x&&b.y>=f&&b.y<=m&&b!==r&&b!==s&&Zi(o,h,l,u,c,d,b.x,b.y)&&ut(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;v&&v.z>=g;){if(v.x>=p&&v.x<=x&&v.y>=f&&v.y<=m&&v!==r&&v!==s&&Zi(o,h,l,u,c,d,v.x,v.y)&&ut(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;b&&b.z<=_;){if(b.x>=p&&b.x<=x&&b.y>=f&&b.y<=m&&b!==r&&b!==s&&Zi(o,h,l,u,c,d,b.x,b.y)&&ut(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function mp(i,e,t){let n=i;do{let r=n.prev,a=n.next.next;!to(r,a)&&Uu(r,n,n.next,a)&&ea(r,a)&&ea(a,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(a.i/t|0),ta(n),ta(n.next),n=i=a),n=n.next}while(n!==i);return xi(n)}function fp(i,e,t,n,r,a){let s=i;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&yp(s,o)){let l=Du(s,o);return s=xi(s,s.next),l=xi(l,l.next),Qr(s,e,t,n,r,a,0),void Qr(l,e,t,n,r,a,0)}o=o.next}s=s.next}while(s!==i)}function gp(i,e){return i.x-e.x}function _p(i,e){let t=(function(r,a){let s,o=a,l=-1/0,c=r.x,h=r.y;do{if(h<=o.y&&h>=o.next.y&&o.next.y!==o.y){let m=o.x+(h-o.y)*(o.next.x-o.x)/(o.next.y-o.y);if(m<=c&&m>l&&(l=m,s=o.x<o.next.x?o:o.next,m===c))return s}o=o.next}while(o!==a);if(!s)return null;let u=s,d=s.x,p=s.y,f,x=1/0;o=s;do c>=o.x&&o.x>=d&&c!==o.x&&Zi(h<p?c:l,h,d,p,h<p?l:c,h,o.x,o.y)&&(f=Math.abs(h-o.y)/(c-o.x),ea(o,r)&&(f<x||f===x&&(o.x>s.x||o.x===s.x&&vp(s,o)))&&(s=o,x=f)),o=o.next;while(o!==u);return s})(i,e);if(!t)return e;let n=Du(t,i);return xi(n,n.next),xi(t,t.next)}function vp(i,e){return ut(i.prev,i,e.prev)<0&&ut(e.next,i,i.next)<0}function ll(i,e,t,n,r){return(i=1431655765&((i=858993459&((i=252645135&((i=16711935&((i=(i-t)*r|0)|i<<8))|i<<4))|i<<2))|i<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function xp(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Zi(i,e,t,n,r,a,s,o){return(r-s)*(e-o)>=(i-s)*(a-o)&&(i-s)*(n-o)>=(t-s)*(e-o)&&(t-s)*(a-o)>=(r-s)*(n-o)}function yp(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!(function(t,n){let r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==n.i&&r.next.i!==n.i&&Uu(r,r.next,t,n))return!0;r=r.next}while(r!==t);return!1})(i,e)&&(ea(i,e)&&ea(e,i)&&(function(t,n){let r=t,a=!1,s=(t.x+n.x)/2,o=(t.y+n.y)/2;do r.y>o!=r.next.y>o&&r.next.y!==r.y&&s<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(a=!a),r=r.next;while(r!==t);return a})(i,e)&&(ut(i.prev,i,e.prev)||ut(i,e.prev,e))||to(i,e)&&ut(i.prev,i,i.next)>0&&ut(e.prev,e,e.next)>0)}function ut(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function to(i,e){return i.x===e.x&&i.y===e.y}function Uu(i,e,t,n){let r=ja(ut(i,e,t)),a=ja(ut(i,e,n)),s=ja(ut(t,n,i)),o=ja(ut(t,n,e));return r!==a&&s!==o||!(r!==0||!Ya(i,t,e))||!(a!==0||!Ya(i,n,e))||!(s!==0||!Ya(t,i,n))||!(o!==0||!Ya(t,e,n))}function Ya(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ja(i){return i>0?1:i<0?-1:0}function ea(i,e){return ut(i.prev,i,i.next)<0?ut(i,e,i.next)>=0&&ut(i,i.prev,e)>=0:ut(i,e,i.prev)<0||ut(i,i.next,e)<0}function Du(i,e){let t=new cl(i.i,i.x,i.y),n=new cl(e.i,e.x,e.y),r=i.next,a=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,a.next=n,n.prev=a,n}function Th(i,e,t,n){let r=new cl(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function ta(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function cl(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}var Nn=class i{static area(e){let t=e.length,n=0;for(let r=t-1,a=0;a<t;r=a++)n+=e[r].x*e[a].y-e[a].x*e[r].y;return .5*n}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],r=[],a=[];Eh(e),Ah(n,e);let s=e.length;t.forEach(Eh);for(let l=0;l<t.length;l++)r.push(s),s+=t[l].length,Ah(n,t[l]);let o=up(n,r);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}};function Eh(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Ah(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var ms=class i extends Qe{constructor(e=new $r([new ce(.5,.5),new ce(-.5,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],a=[];for(let o=0,l=e.length;o<l;o++)s(e[o]);function s(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,f=t.bevelSize!==void 0?t.bevelSize:p-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:bp,v,b,P,E,D,F=!1;g&&(v=g.getSpacedPoints(h),F=!0,d=!1,b=g.computeFrenetFrames(h,!1),P=new R,E=new R,D=new R),d||(m=0,p=0,f=0,x=0);let k=o.extractPoints(c),W=k.shape,X=k.holes;if(!Nn.isClockWise(W)){W=W.reverse();for(let C=0,T=X.length;C<T;C++){let L=X[C];Nn.isClockWise(L)&&(X[C]=L.reverse())}}let V=Nn.triangulateShape(W,X),$=W;for(let C=0,T=X.length;C<T;C++){let L=X[C];W=W.concat(L)}function Y(C,T,L){return T||console.error("THREE.ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(T,L)}let ee=W.length,Z=V.length;function oe(C,T,L){let S,U,N,Q=C.x-T.x,H=C.y-T.y,J=L.x-C.x,K=L.y-C.y,ie=Q*Q+H*H,pe=Q*K-H*J;if(Math.abs(pe)>Number.EPSILON){let _e=Math.sqrt(ie),Ee=Math.sqrt(J*J+K*K),Ie=T.x-H/_e,je=T.y+Q/_e,Pe=((L.x-K/Ee-Ie)*K-(L.y+J/Ee-je)*J)/(Q*K-H*J);S=Ie+Q*Pe-C.x,U=je+H*Pe-C.y;let Me=S*S+U*U;if(Me<=2)return new ce(S,U);N=Math.sqrt(Me/2)}else{let _e=!1;Q>Number.EPSILON?J>Number.EPSILON&&(_e=!0):Q<-Number.EPSILON?J<-Number.EPSILON&&(_e=!0):Math.sign(H)===Math.sign(K)&&(_e=!0),_e?(S=-H,U=Q,N=Math.sqrt(ie)):(S=Q,U=H,N=Math.sqrt(ie/2))}return new ce(S/N,U/N)}let le=[];for(let C=0,T=$.length,L=T-1,S=C+1;C<T;C++,L++,S++)L===T&&(L=0),S===T&&(S=0),le[C]=oe($[C],$[L],$[S]);let Se=[],Ae,ae=le.concat();for(let C=0,T=X.length;C<T;C++){let L=X[C];Ae=[];for(let S=0,U=L.length,N=U-1,Q=S+1;S<U;S++,N++,Q++)N===U&&(N=0),Q===U&&(Q=0),Ae[S]=oe(L[S],L[N],L[Q]);Se.push(Ae),ae=ae.concat(Ae)}for(let C=0;C<m;C++){let T=C/m,L=p*Math.cos(T*Math.PI/2),S=f*Math.sin(T*Math.PI/2)+x;for(let U=0,N=$.length;U<N;U++){let Q=Y($[U],le[U],S);ve(Q.x,Q.y,-L)}for(let U=0,N=X.length;U<N;U++){let Q=X[U];Ae=Se[U];for(let H=0,J=Q.length;H<J;H++){let K=Y(Q[H],Ae[H],S);ve(K.x,K.y,-L)}}}let de=f+x;for(let C=0;C<ee;C++){let T=d?Y(W[C],ae[C],de):W[C];F?(E.copy(b.normals[0]).multiplyScalar(T.x),P.copy(b.binormals[0]).multiplyScalar(T.y),D.copy(v[0]).add(E).add(P),ve(D.x,D.y,D.z)):ve(T.x,T.y,0)}for(let C=1;C<=h;C++)for(let T=0;T<ee;T++){let L=d?Y(W[T],ae[T],de):W[T];F?(E.copy(b.normals[C]).multiplyScalar(L.x),P.copy(b.binormals[C]).multiplyScalar(L.y),D.copy(v[C]).add(E).add(P),ve(D.x,D.y,D.z)):ve(L.x,L.y,u/h*C)}for(let C=m-1;C>=0;C--){let T=C/m,L=p*Math.cos(T*Math.PI/2),S=f*Math.sin(T*Math.PI/2)+x;for(let U=0,N=$.length;U<N;U++){let Q=Y($[U],le[U],S);ve(Q.x,Q.y,u+L)}for(let U=0,N=X.length;U<N;U++){let Q=X[U];Ae=Se[U];for(let H=0,J=Q.length;H<J;H++){let K=Y(Q[H],Ae[H],S);F?ve(K.x,K.y+v[h-1].y,v[h-1].x+L):ve(K.x,K.y,u+L)}}}function ye(C,T){let L=C.length;for(;--L>=0;){let S=L,U=L-1;U<0&&(U=C.length-1);for(let N=0,Q=h+2*m;N<Q;N++){let H=ee*N,J=ee*(N+1);y(T+S+H,T+U+H,T+U+J,T+S+J)}}}function ve(C,T,L){l.push(C),l.push(T),l.push(L)}function A(C,T,L){M(C),M(T),M(L);let S=r.length/3,U=_.generateTopUV(n,r,S-3,S-2,S-1);I(U[0]),I(U[1]),I(U[2])}function y(C,T,L,S){M(C),M(T),M(S),M(T),M(L),M(S);let U=r.length/3,N=_.generateSideWallUV(n,r,U-6,U-3,U-2,U-1);I(N[0]),I(N[1]),I(N[3]),I(N[1]),I(N[2]),I(N[3])}function M(C){r.push(l[3*C+0]),r.push(l[3*C+1]),r.push(l[3*C+2])}function I(C){a.push(C.x),a.push(C.y)}(function(){let C=r.length/3;if(d){let T=0,L=ee*T;for(let S=0;S<Z;S++){let U=V[S];A(U[2]+L,U[1]+L,U[0]+L)}T=h+2*m,L=ee*T;for(let S=0;S<Z;S++){let U=V[S];A(U[0]+L,U[1]+L,U[2]+L)}}else{for(let T=0;T<Z;T++){let L=V[T];A(L[2],L[1],L[0])}for(let T=0;T<Z;T++){let L=V[T];A(L[0]+ee*h,L[1]+ee*h,L[2]+ee*h)}}n.addGroup(C,r.length/3-C,0)})(),(function(){let C=r.length/3,T=0;ye($,T),T+=$.length;for(let L=0,S=X.length;L<S;L++){let U=X[L];ye(U,T),T+=U.length}n.addGroup(C,r.length/3-C,1)})()}this.setAttribute("position",new Ce(r,3)),this.setAttribute("uv",new Ce(a,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n,r){if(r.shapes=[],Array.isArray(t))for(let a=0,s=t.length;a<s;a++){let o=t[a];r.shapes.push(o.uuid)}else r.shapes.push(t.uuid);return r.options=Object.assign({},n),n.extrudePath!==void 0&&(r.options.extrudePath=n.extrudePath.toJSON()),r})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let a=0,s=e.shapes.length;a<s;a++){let o=t[e.shapes[a]];n.push(o)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new cs[r.type]().fromJSON(r)),new i(n,e.options)}},bp={generateTopUV:function(i,e,t,n,r){let a=e[3*t],s=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*r],h=e[3*r+1];return[new ce(a,s),new ce(o,l),new ce(c,h)]},generateSideWallUV:function(i,e,t,n,r,a){let s=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*r],p=e[3*r+1],f=e[3*r+2],x=e[3*a],m=e[3*a+1],g=e[3*a+2];return Math.abs(o-h)<Math.abs(s-c)?[new ce(s,1-l),new ce(c,1-u),new ce(d,1-f),new ce(x,1-g)]:[new ce(o,1-l),new ce(h,1-u),new ce(p,1-f),new ce(m,1-g)]}},yi=class i extends Qn{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},fs=class i extends Qn{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},xn=class i extends Qe{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let a=e/2,s=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,u=e/o,d=t/l,p=[],f=[],x=[],m=[];for(let g=0;g<h;g++){let _=g*d-s;for(let v=0;v<c;v++){let b=v*u-a;f.push(b,-_,0),x.push(0,0,1),m.push(v/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){let v=_+c*g,b=_+c*(g+1),P=_+1+c*(g+1),E=_+1+c*g;p.push(v,b,E),p.push(b,P,E)}this.setIndex(p),this.setAttribute("position",new Ce(f,3)),this.setAttribute("normal",new Ce(x,3)),this.setAttribute("uv",new Ce(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},gs=class i extends Qe{constructor(e=.5,t=1,n=32,r=1,a=0,s=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:a,thetaLength:s},n=Math.max(3,n);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/(r=Math.max(1,r)),p=new R,f=new ce;for(let x=0;x<=r;x++){for(let m=0;m<=n;m++){let g=a+m/n*s;p.x=u*Math.cos(g),p.y=u*Math.sin(g),l.push(p.x,p.y,p.z),c.push(0,0,1),f.x=(p.x/t+1)/2,f.y=(p.y/t+1)/2,h.push(f.x,f.y)}u+=d}for(let x=0;x<r;x++){let m=x*(n+1);for(let g=0;g<n;g++){let _=g+m,v=_,b=_+n+1,P=_+n+2,E=_+1;o.push(v,b,E),o.push(b,P,E)}}this.setIndex(o),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(c,3)),this.setAttribute("uv",new Ce(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},_s=class i extends Qe{constructor(e=new $r([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],r=[],a=[],s=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let u=r.length/3,d=h.extractPoints(t),p=d.shape,f=d.holes;Nn.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,g=f.length;m<g;m++){let _=f[m];Nn.isClockWise(_)===!0&&(f[m]=_.reverse())}let x=Nn.triangulateShape(p,f);for(let m=0,g=f.length;m<g;m++){let _=f[m];p=p.concat(_)}for(let m=0,g=p.length;m<g;m++){let _=p[m];r.push(_.x,_.y,0),a.push(0,0,1),s.push(_.x,_.y)}for(let m=0,g=x.length;m<g;m++){let _=x[m],v=_[0]+u,b=_[1]+u,P=_[2]+u;n.push(v,b,P),l+=3}}this.setIndex(n),this.setAttribute("position",new Ce(r,3)),this.setAttribute("normal",new Ce(a,3)),this.setAttribute("uv",new Ce(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,n){if(n.shapes=[],Array.isArray(t))for(let r=0,a=t.length;r<a;r++){let s=t[r];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n})(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let s=t[e.shapes[r]];n.push(s)}return new i(n,e.curveSegments)}},vs=class i extends Qe{constructor(e=1,t=32,n=16,r=0,a=2*Math.PI,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(s+o,Math.PI),c=0,h=[],u=new R,d=new R,p=[],f=[],x=[],m=[];for(let g=0;g<=n;g++){let _=[],v=g/n,b=0;g===0&&s===0?b=.5/t:g===n&&l===Math.PI&&(b=-.5/t);for(let P=0;P<=t;P++){let E=P/t;u.x=-e*Math.cos(r+E*a)*Math.sin(s+v*o),u.y=e*Math.cos(s+v*o),u.z=e*Math.sin(r+E*a)*Math.sin(s+v*o),f.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(E+b,1-v),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let v=h[g][_+1],b=h[g][_],P=h[g+1][_],E=h[g+1][_+1];(g!==0||s>0)&&p.push(v,b,E),(g!==n-1||l<Math.PI)&&p.push(b,P,E)}this.setIndex(p),this.setAttribute("position",new Ce(f,3)),this.setAttribute("normal",new Ce(x,3)),this.setAttribute("uv",new Ce(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},xs=class i extends Qn{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},ys=class i extends Qe{constructor(e=1,t=.4,n=12,r=48,a=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:a},n=Math.floor(n),r=Math.floor(r);let s=[],o=[],l=[],c=[],h=new R,u=new R,d=new R;for(let p=0;p<=n;p++)for(let f=0;f<=r;f++){let x=f/r*a,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(f/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let f=1;f<=r;f++){let x=(r+1)*p+f-1,m=(r+1)*(p-1)+f-1,g=(r+1)*(p-1)+f,_=(r+1)*p+f;s.push(x,m,_),s.push(m,g,_)}this.setIndex(s),this.setAttribute("position",new Ce(o,3)),this.setAttribute("normal",new Ce(l,3)),this.setAttribute("uv",new Ce(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},bs=class i extends Qe{constructor(e=1,t=.4,n=64,r=8,a=2,s=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:a,q:s},n=Math.floor(n),r=Math.floor(r);let o=[],l=[],c=[],h=[],u=new R,d=new R,p=new R,f=new R,x=new R,m=new R,g=new R;for(let v=0;v<=n;++v){let b=v/n*a*Math.PI*2;_(b,a,s,e,p),_(b+.01,a,s,e,f),m.subVectors(f,p),g.addVectors(f,p),x.crossVectors(m,g),g.crossVectors(x,m),x.normalize(),g.normalize();for(let P=0;P<=r;++P){let E=P/r*Math.PI*2,D=-t*Math.cos(E),F=t*Math.sin(E);u.x=p.x+(D*g.x+F*x.x),u.y=p.y+(D*g.y+F*x.y),u.z=p.z+(D*g.z+F*x.z),l.push(u.x,u.y,u.z),d.subVectors(u,p).normalize(),c.push(d.x,d.y,d.z),h.push(v/n),h.push(P/r)}}for(let v=1;v<=n;v++)for(let b=1;b<=r;b++){let P=(r+1)*(v-1)+(b-1),E=(r+1)*v+(b-1),D=(r+1)*v+b,F=(r+1)*(v-1)+b;o.push(P,E,F),o.push(E,D,F)}function _(v,b,P,E,D){let F=Math.cos(v),k=Math.sin(v),W=P/b*v,X=Math.cos(W);D.x=E*(2+X)*.5*F,D.y=E*(2+X)*k*.5,D.z=E*Math.sin(W)*.5}this.setIndex(o),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(c,3)),this.setAttribute("uv",new Ce(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Ms=class i extends Qe{constructor(e=new Zr(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,r=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:a};let s=e.computeFrenetFrames(t,a);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let o=new R,l=new R,c=new ce,h=new R,u=[],d=[],p=[],f=[];function x(m){h=e.getPointAt(m/t,h);let g=s.normals[m],_=s.binormals[m];for(let v=0;v<=r;v++){let b=v/r*Math.PI*2,P=Math.sin(b),E=-Math.cos(b);l.x=E*g.x+P*_.x,l.y=E*g.y+P*_.y,l.z=E*g.z+P*_.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}(function(){for(let m=0;m<t;m++)x(m);x(a===!1?t:0),(function(){for(let m=0;m<=t;m++)for(let g=0;g<=r;g++)c.x=m/t,c.y=g/r,p.push(c.x,c.y)})(),(function(){for(let m=1;m<=t;m++)for(let g=1;g<=r;g++){let _=(r+1)*(m-1)+(g-1),v=(r+1)*m+(g-1),b=(r+1)*m+g,P=(r+1)*(m-1)+g;f.push(_,v,P),f.push(v,b,P)}})()})(),this.setIndex(f),this.setAttribute("position",new Ce(u,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new cs[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Ss=class extends Qe{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new R,a=new R;if(e.index!==null){let s=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],d=u.start;for(let p=d,f=d+u.count;p<f;p+=3)for(let x=0;x<3;x++){let m=o.getX(p+x),g=o.getX(p+(x+1)%3);r.fromBufferAttribute(s,m),a.fromBufferAttribute(s,g),Rh(r,a,n)===!0&&(t.push(r.x,r.y,r.z),t.push(a.x,a.y,a.z))}}}else{let s=e.attributes.position;for(let o=0,l=s.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;r.fromBufferAttribute(s,h),a.fromBufferAttribute(s,u),Rh(r,a,n)===!0&&(t.push(r.x,r.y,r.z),t.push(a.x,a.y,a.z))}}this.setAttribute("position",new Ce(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Rh(i,e,t){let n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)!==!0&&t.has(r)!==!0&&(t.add(n),t.add(r),!0)}var g0=Object.freeze({__proto__:null,BoxGeometry:fi,CapsuleGeometry:us,CircleGeometry:ds,ConeGeometry:rr,CylinderGeometry:_i,DodecahedronGeometry:vi,EdgesGeometry:ps,ExtrudeGeometry:ms,IcosahedronGeometry:yi,LatheGeometry:Jr,OctahedronGeometry:fs,PlaneGeometry:xn,PolyhedronGeometry:Qn,RingGeometry:gs,ShapeGeometry:_s,SphereGeometry:vs,TetrahedronGeometry:xs,TorusGeometry:ys,TorusKnotGeometry:bs,TubeGeometry:Ms,WireframeGeometry:Ss});var ar=class extends Jn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ws=class extends Jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ts=class extends Jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function qa(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Mp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var bi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],a=t[n-1];t:{e:{let s;n:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<a)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(a=r,r=t[++n],e<r)break e}s=t.length;break n}if(e>=a)break t;{let o=t[1];e<o&&(n=2,a=o);for(let l=n-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=a,a=t[--n-1],e>=a)break e}s=n,n=0}}for(;n<s;){let o=n+s>>>1;e<t[o]?s=o:n=o+1}if(r=t[n],a=t[n-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,a,r)}return this.interpolate_(n,a,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,a=e*r;for(let s=0;s!==r;++s)t[s]=n[a+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Es=class extends bi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:il,endingEnd:il}}intervalChanged_(e,t,n){let r=this.parameterPositions,a=e-2,s=e+1,o=r[a],l=r[s];if(o===void 0)switch(this.getSettings_().endingStart){case rl:a=e,o=2*t-n;break;case al:a=r.length-2,o=t+r[a]-r[a+1];break;default:a=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case rl:s=e,l=2*n-t;break;case al:s=1,l=n+r[1]-r[0];break;default:s=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=a*h,this._offsetNext=s*h}interpolate_(e,t,n,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,f=(n-t)/(r-t),x=f*f,m=x*f,g=-d*m+2*d*x-d*f,_=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*f+1,v=(-1-p)*m+(1.5+p)*x+.5*f,b=p*m-p*x;for(let P=0;P!==o;++P)a[P]=g*s[h+P]+_*s[c+P]+v*s[l+P]+b*s[u+P];return a}},As=class extends bi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),u=1-h;for(let d=0;d!==o;++d)a[d]=s[c+d]*u+s[l+d]*h;return a}},Rs=class extends bi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Kt=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qa(t,this.TimeBufferType),this.values=qa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:qa(e.times,Array),values:qa(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Rs(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new As(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Es(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ur:t=this.InterpolantFactoryMethodDiscrete;break;case $a:t=this.InterpolantFactoryMethodLinear;break;case Za:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ur;case this.InterpolantFactoryMethodLinear:return $a;case this.InterpolantFactoryMethodSmooth:return Za}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,a=0,s=r-1;for(;a!==r&&n[a]<e;)++a;for(;s!==-1&&n[s]>t;)--s;if(++s,a!==0||s!==r){a>=s&&(s=Math.max(s,1),a=s-1);let o=this.getValueSize();this.times=n.slice(a,s),this.values=this.values.slice(a*o,s*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,a=n.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let o=0;o!==a;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(s!==null&&s>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,s),e=!1;break}s=l}if(r!==void 0&&Mp(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Za,a=e.length-1,s=1;for(let o=1;o<a;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(r)l=!0;else{let h=o*n,u=h-n,d=h+n;for(let p=0;p!==n;++p){let f=t[h+p];if(f!==t[u+p]||f!==t[d+p]){l=!0;break}}}if(l){if(o!==s){e[s]=e[o];let h=o*n,u=s*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++s}}if(a>0){e[s]=e[a];for(let o=a*n,l=s*n,c=0;c!==n;++c)t[l+c]=t[o+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};Kt.prototype.TimeBufferType=Float32Array,Kt.prototype.ValueBufferType=Float32Array,Kt.prototype.DefaultInterpolation=$a;var Zn=class extends Kt{constructor(e,t,n){super(e,t,n)}};Zn.prototype.ValueTypeName="bool",Zn.prototype.ValueBufferType=Array,Zn.prototype.DefaultInterpolation=Ur,Zn.prototype.InterpolantFactoryMethodLinear=void 0,Zn.prototype.InterpolantFactoryMethodSmooth=void 0;var Cs=class extends Kt{};Cs.prototype.ValueTypeName="color";var Ps=class extends Kt{};Ps.prototype.ValueTypeName="number";var Ls=class extends bi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)cn.slerpFlat(a,0,s,c-o,s,c,l);return a}},na=class extends Kt{InterpolantFactoryMethodLinear(e){return new Ls(this.times,this.values,this.getValueSize(),e)}};na.prototype.ValueTypeName="quaternion",na.prototype.InterpolantFactoryMethodSmooth=void 0;var Kn=class extends Kt{constructor(e,t,n){super(e,t,n)}};Kn.prototype.ValueTypeName="string",Kn.prototype.ValueBufferType=Array,Kn.prototype.DefaultInterpolation=Ur,Kn.prototype.InterpolantFactoryMethodLinear=void 0,Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var Is=class extends Kt{};Is.prototype.ValueTypeName="vector";var Us=class{constructor(e,t,n){let r=this,a,s=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){l++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,l),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,l),o===l&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return a?a(h):h},this.setURLModifier=function(h){return a=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],f=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return f}return null}}},Nu=new Us,Ds=class{constructor(e){this.manager=e!==void 0?e:Nu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise((function(r,a){n.load(e,r,t,a)}))}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ds.DEFAULT_MATERIAL_NAME="__DEFAULT";var ia=class extends Ot{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};var tl=new ze,Ch=new R,Ph=new R,hl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gi,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ch.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ch),Ph.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ph),t.updateMatrixWorld(),tl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(tl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var _0=new ze,v0=new R,x0=new R;var Mi=class extends er{constructor(e=-1,t=1,n=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,a=n-e,s=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ul=class extends hl{constructor(){super(new Mi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ra=class extends ia{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ot.DEFAULT_UP),this.updateMatrix(),this.target=new Ot,this.shadow=new ul}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},aa=class extends ia{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var sr=class extends Qe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var y0=new ze,b0=new ze,M0=new ze;var Ns=class extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}};var S0=new R,w0=new cn,T0=new R,E0=new R;var A0=new R,R0=new cn,C0=new R,P0=new R;var tc="\\[\\]\\.:\\/",Sp=new RegExp("["+tc+"]","g"),nl="[^"+tc+"]",wp="[^"+tc.replace("\\.","")+"]",Tp=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",nl)+/(WCOD+)?/.source.replace("WCOD",wp)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nl)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nl)+"$"),Ep=["material","materials","bones","map"],ot=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Sp,"")}static parseTrackName(e){let t=Tp.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let a=n.nodeName.substring(r+1);Ep.indexOf(a)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=a)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(a){for(let s=0;s<a.length;s++){let o=a[s];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,a=n.length;r!==a;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,a=n.length;r!==a;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,a=n.length;r!==a;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,a=n.length;r!==a;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,a=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let s=e[r];if(s===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=a}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ot.Composite=class{constructor(i,e,t){let n=t||ot.parseTrackName(e);this._targetGroup=i,this._bindings=i.subscribe_(e,n)}getValue(i,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(i,e)}setValue(i,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=t.length;n!==r;++n)t[n].setValue(i,e)}bind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].bind()}unbind(){let i=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=i.length;e!==t;++e)i[e].unbind()}},ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray],ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var L0=new Float32Array(1);var I0=new ze;var U0=new ce;var D0=new R,N0=new R;var F0=new R;var O0=new R,B0=new ze,z0=new ze;var H0=new R,k0=new Ue,G0=new Ue;var V0=new R,W0=new R,X0=new R;var Y0=new R,j0=new er;var q0=new hn;var Z0=new R;function nc(i,e,t,n){let r=(function(a){switch(a){case Mn:case vl:return{byteLength:1,components:1};case cr:case xl:case hr:return{byteLength:2,components:1};case Ys:case js:return{byteLength:2,components:4};case ti:case Xs:case Sn:return{byteLength:4,components:1};case yl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)})(n);switch(t){case 1021:case 1024:return i*e;case 1025:return i*e*2;case bl:case qs:return i*e/r.components*r.byteLength;case 1030:case 1031:return i*e*2/r.components*r.byteLength;case 1022:return i*e*3/r.components*r.byteLength;case pn:case 1033:return i*e*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"171"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="171");function ad(){let i=null,e=!1,t=null,n=null;function r(a,s){t(a,s),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function Rp(i){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let a=e.get(t);return void((!a||a.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let r=e.get(t);if(r===void 0)e.set(t,(function(a,s){let o=a.array,l=a.usage,c=o.byteLength,h=i.createBuffer(),u;if(i.bindBuffer(s,h),i.bufferData(s,o,l),a.onUploadCallback(),o instanceof Float32Array)u=i.FLOAT;else if(o instanceof Uint16Array)u=a.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=i.SHORT;else if(o instanceof Uint32Array)u=i.UNSIGNED_INT;else if(o instanceof Int32Array)u=i.INT;else if(o instanceof Int8Array)u=i.BYTE;else if(o instanceof Uint8Array)u=i.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=i.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:a.version,size:c}})(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(a,s,o){let l=s.array,c=s.updateRanges;if(i.bindBuffer(o,a),c.length===0)i.bufferSubData(o,0,l);else{c.sort(((u,d)=>u.start-d.start));let h=0;for(let u=1;u<c.length;u++){let d=c[h],p=c[u];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++h,c[h]=p)}c.length=h+1;for(let u=0,d=c.length;u<d;u++){let p=c[u];i.bufferSubData(o,p.start*l.BYTES_PER_ELEMENT,l,p.start,p.count)}s.clearUpdateRanges()}s.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}var ke={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},me={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},wn={basic:{uniforms:Nt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Nt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ue(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Nt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Nt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Nt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ue(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Nt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Nt([me.points,me.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Nt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Nt([me.common,me.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Nt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Nt([me.sprite,me.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Nt([me.common,me.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Nt([me.lights,me.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};wn.physical={uniforms:Nt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var no={r:0,b:0,g:0},Ci=new dn,Cp=new ze;function Pp(i,e,t,n,r,a,s){let o=new Ue(0),l,c,h=a===!0?0:1,u=null,d=0,p=null;function f(m){let g=m.isScene===!0?m.background:null;return g&&g.isTexture&&(g=(m.backgroundBlurriness>0?t:e).get(g)),g}function x(m,g){m.getRGB(no,Ql(i)),n.buffers.color.setClear(no.r,no.g,no.b,g,s)}return{getClearColor:function(){return o},setClearColor:function(m,g=1){o.set(m),h=g,x(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(m){h=m,x(o,h)},render:function(m){let g=!1,_=f(m);_===null?x(o,h):_&&_.isColor&&(x(_,1),g=!0);let v=i.xr.getEnvironmentBlendMode();v==="additive"?n.buffers.color.setClear(0,0,0,1,s):v==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(m,g){let _=f(g);_&&(_.isCubeTexture||_.mapping===la)?(c===void 0&&(c=new Ke(new fi(1,1,1),new gt({name:"BackgroundCubeMaterial",uniforms:Ri(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(v,b,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),Ci.copy(g.backgroundRotation),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),c.material.uniforms.envMap.value=_,c.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Cp.makeRotationFromEuler(Ci)),c.material.toneMapped=Je.getTransfer(_.colorSpace)!==it,u===_&&d===_.version&&p===i.toneMapping||(c.material.needsUpdate=!0,u=_,d=_.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ke(new xn(2,2),new gt({name:"BackgroundMaterial",uniforms:Ri(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.toneMapped=Je.getTransfer(_.colorSpace)!==it,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&d===_.version&&p===i.toneMapping||(l.material.needsUpdate=!0,u=_,d=_.version,p=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))},dispose:function(){c!==void 0&&(c.geometry.dispose(),c.material.dispose()),l!==void 0&&(l.geometry.dispose(),l.material.dispose())}}}function Lp(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null),a=r,s=!1;function o(g){return i.bindVertexArray(g)}function l(g){return i.deleteVertexArray(g)}function c(g){let _=[],v=[],b=[];for(let P=0;P<t;P++)_[P]=0,v[P]=0,b[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:v,attributeDivisors:b,object:g,attributes:{},index:null}}function h(){let g=a.newAttributes;for(let _=0,v=g.length;_<v;_++)g[_]=0}function u(g){d(g,0)}function d(g,_){let v=a.newAttributes,b=a.enabledAttributes,P=a.attributeDivisors;v[g]=1,b[g]===0&&(i.enableVertexAttribArray(g),b[g]=1),P[g]!==_&&(i.vertexAttribDivisor(g,_),P[g]=_)}function p(){let g=a.newAttributes,_=a.enabledAttributes;for(let v=0,b=_.length;v<b;v++)_[v]!==g[v]&&(i.disableVertexAttribArray(v),_[v]=0)}function f(g,_,v,b,P,E,D){D===!0?i.vertexAttribIPointer(g,_,v,P,E):i.vertexAttribPointer(g,_,v,b,P,E)}function x(){m(),s=!0,a!==r&&(a=r,o(a.object))}function m(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(g,_,v,b,P){let E=!1,D=(function(F,k,W){let X=W.wireframe===!0,V=n[F.id];V===void 0&&(V={},n[F.id]=V);let $=V[k.id];$===void 0&&($={},V[k.id]=$);let Y=$[X];return Y===void 0&&(Y=c(i.createVertexArray()),$[X]=Y),Y})(b,v,_);a!==D&&(a=D,o(a.object)),E=(function(F,k,W,X){let V=a.attributes,$=k.attributes,Y=0,ee=W.getAttributes();for(let Z in ee)if(ee[Z].location>=0){let oe=V[Z],le=$[Z];if(le===void 0&&(Z==="instanceMatrix"&&F.instanceMatrix&&(le=F.instanceMatrix),Z==="instanceColor"&&F.instanceColor&&(le=F.instanceColor)),oe===void 0||oe.attribute!==le||le&&oe.data!==le.data)return!0;Y++}return a.attributesNum!==Y||a.index!==X})(g,b,v,P),E&&(function(F,k,W,X){let V={},$=k.attributes,Y=0,ee=W.getAttributes();for(let Z in ee)if(ee[Z].location>=0){let oe=$[Z];oe===void 0&&(Z==="instanceMatrix"&&F.instanceMatrix&&(oe=F.instanceMatrix),Z==="instanceColor"&&F.instanceColor&&(oe=F.instanceColor));let le={};le.attribute=oe,oe&&oe.data&&(le.data=oe.data),V[Z]=le,Y++}a.attributes=V,a.attributesNum=Y,a.index=X})(g,b,v,P),P!==null&&e.update(P,i.ELEMENT_ARRAY_BUFFER),(E||s)&&(s=!1,(function(F,k,W,X){h();let V=X.attributes,$=W.getAttributes(),Y=k.defaultAttributeValues;for(let ee in $){let Z=$[ee];if(Z.location>=0){let oe=V[ee];if(oe===void 0&&(ee==="instanceMatrix"&&F.instanceMatrix&&(oe=F.instanceMatrix),ee==="instanceColor"&&F.instanceColor&&(oe=F.instanceColor)),oe!==void 0){let le=oe.normalized,Se=oe.itemSize,Ae=e.get(oe);if(Ae===void 0)continue;let ae=Ae.buffer,de=Ae.type,ye=Ae.bytesPerElement,ve=de===i.INT||de===i.UNSIGNED_INT||oe.gpuType===Xs;if(oe.isInterleavedBufferAttribute){let A=oe.data,y=A.stride,M=oe.offset;if(A.isInstancedInterleavedBuffer){for(let I=0;I<Z.locationSize;I++)d(Z.location+I,A.meshPerAttribute);F.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=A.meshPerAttribute*A.count)}else for(let I=0;I<Z.locationSize;I++)u(Z.location+I);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let I=0;I<Z.locationSize;I++)f(Z.location+I,Se/Z.locationSize,de,le,y*ye,(M+Se/Z.locationSize*I)*ye,ve)}else{if(oe.isInstancedBufferAttribute){for(let A=0;A<Z.locationSize;A++)d(Z.location+A,oe.meshPerAttribute);F.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let A=0;A<Z.locationSize;A++)u(Z.location+A);i.bindBuffer(i.ARRAY_BUFFER,ae);for(let A=0;A<Z.locationSize;A++)f(Z.location+A,Se/Z.locationSize,de,le,Se*ye,Se/Z.locationSize*A*ye,ve)}}else if(Y!==void 0){let le=Y[ee];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(Z.location,le);break;case 3:i.vertexAttrib3fv(Z.location,le);break;case 4:i.vertexAttrib4fv(Z.location,le);break;default:i.vertexAttrib1fv(Z.location,le)}}}}p()})(g,_,v,b),P!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))},reset:x,resetDefaultState:m,dispose:function(){x();for(let g in n){let _=n[g];for(let v in _){let b=_[v];for(let P in b)l(b[P].object),delete b[P];delete _[v]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let v in _){let b=_[v];for(let P in b)l(b[P].object),delete b[P];delete _[v]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let _ in n){let v=n[_];if(v[g.id]===void 0)continue;let b=v[g.id];for(let P in b)l(b[P].object),delete b[P];delete v[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function Ip(i,e,t){let n;function r(a,s,o){o!==0&&(i.drawArraysInstanced(n,a,s,o),t.update(s,n,o))}this.setMode=function(a){n=a},this.render=function(a,s){i.drawArrays(n,a,s),t.update(s,n,1)},this.renderInstances=r,this.renderMultiDraw=function(a,s,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,a,0,s,0,o);let l=0;for(let c=0;c<o;c++)l+=s[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(a,s,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<a.length;h++)r(a[h],s[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,a,0,s,0,l,0,o);let h=0;for(let u=0;u<o;u++)h+=s[u]*l[u];t.update(h,n,1)}}}function Up(i,e,t,n){let r;function a(d){if(d==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let s=t.precision!==void 0?t.precision:"highp",o=a(s);o!==s&&(console.warn("THREE.WebGLRenderer:",s,"not supported, using",o,"instead."),s=o);let l=t.logarithmicDepthBuffer===!0,c=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:a,textureFormatReadable:function(d){return d===pn||n.convert(d)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let p=d===hr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==Mn&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Sn&&!p)},precision:s,logarithmicDepthBuffer:l,reverseDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function Dp(i){let e=this,t=null,n=0,r=!1,a=!1,s=new _n,o=new Fe,l={value:null,needsUpdate:!1};function c(h,u,d,p){let f=h!==null?h.length:0,x=null;if(f!==0){if(x=l.value,p!==!0||x===null){let m=d+4*f,g=u.matrixWorldInverse;o.getNormalMatrix(g),(x===null||x.length<m)&&(x=new Float32Array(m));for(let _=0,v=d;_!==f;++_,v+=4)s.copy(h[_]).applyMatrix4(g,o),s.normal.toArray(x,v),x[v+3]=s.constant}l.value=x,l.needsUpdate=!0}return e.numPlanes=f,e.numIntersection=0,x}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||r;return r=u,n=h.length,d},this.beginShadows=function(){a=!0,c(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,u){t=c(h,u,0)},this.setState=function(h,u,d){let p=h.clippingPlanes,f=h.clipIntersection,x=h.clipShadows,m=i.get(h);if(!r||p===null||p.length===0||a&&!x)a?c(null):(function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0})();else{let g=a?0:n,_=4*g,v=m.clippingState||null;l.value=v,v=c(p,u,_,d);for(let b=0;b!==_;++b)v[b]=t[b];m.clippingState=v,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=g}}}function Np(i){let e=new WeakMap;function t(r,a){return a===Gs?r.mapping=Si:a===Vs&&(r.mapping=wi),r}function n(r){let a=r.target;a.removeEventListener("dispose",n);let s=e.get(a);s!==void 0&&(e.delete(a),s.dispose())}return{get:function(r){if(r&&r.isTexture){let a=r.mapping;if(a===Gs||a===Vs){if(e.has(r))return t(e.get(r).texture,r.mapping);{let s=r.image;if(s&&s.height>0){let o=new rs(s.height);return o.fromEquirectangularTexture(i,r),e.set(r,o),r.addEventListener("dispose",n),t(o.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}var Fu=[.125,.215,.35,.446,.526,.582],ha=20,ic=new Mi,Ou=new Ue,rc=null,ac=0,sc=0,oc=!1,Li=(1+Math.sqrt(5))/2,pr=1/Li,Bu=[new R(-Li,pr,0),new R(Li,pr,0),new R(-pr,0,Li),new R(pr,0,Li),new R(0,Li,-pr),new R(0,Li,pr),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],ao=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){rc=this._renderer.getRenderTarget(),ac=this._renderer.getActiveCubeFace(),sc=this._renderer.getActiveMipmapLevel(),oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(rc,ac,sc),this._renderer.xr.enabled=oc,e.scissorTest=!1,io(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Si||e.mapping===wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rc=this._renderer.getRenderTarget(),ac=this._renderer.getActiveCubeFace(),sc=this._renderer.getActiveMipmapLevel(),oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ft,minFilter:ft,generateMipmaps:!1,type:hr,format:pn,colorSpace:di,depthBuffer:!1},r=zu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zu(e,t,n);let{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=(function(s){let o=[],l=[],c=[],h=s,u=s-4+1+Fu.length;for(let d=0;d<u;d++){let p=Math.pow(2,h);l.push(p);let f=1/p;d>s-4?f=Fu[d-s+4-1]:d===0&&(f=0),c.push(f);let x=1/(p-2),m=-x,g=1+x,_=[m,m,g,m,g,g,m,m,g,g,m,g],v=6,b=6,P=3,E=2,D=1,F=new Float32Array(P*b*v),k=new Float32Array(E*b*v),W=new Float32Array(D*b*v);for(let V=0;V<v;V++){let $=V%3*2/3-1,Y=V>2?0:-1,ee=[$,Y,0,$+2/3,Y,0,$+2/3,Y+1,0,$,Y,0,$+2/3,Y+1,0,$,Y+1,0];F.set(ee,P*b*V),k.set(_,E*b*V);let Z=[V,V,V,V,V,V];W.set(Z,D*b*V)}let X=new Qe;X.setAttribute("position",new yt(F,P)),X.setAttribute("uv",new yt(k,E)),X.setAttribute("faceIndex",new yt(W,D)),o.push(X),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}})(a)),this._blurMaterial=(function(s,o,l){let c=new Float32Array(ha),h=new R(0,1,0);return new gt({name:"SphericalGaussianBlur",defines:{n:ha,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})})(a,e,t)}return r}_compileMaterial(e){let t=new Ke(this._lodPlanes[0],e);this._renderer.compile(t,ic)}_sceneToCubeUV(e,t,n,r){let a=new kt(90,1,t,n),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,h=l.toneMapping;l.getClearColor(Ou),l.toneMapping=Bn,l.autoClear=!1;let u=new On({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),d=new Ke(new fi,u),p=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,p=!0):(u.color.copy(Ou),p=!0);for(let x=0;x<6;x++){let m=x%3;m===0?(a.up.set(0,s[x],0),a.lookAt(o[x],0,0)):m===1?(a.up.set(0,0,s[x]),a.lookAt(0,o[x],0)):(a.up.set(0,s[x],0),a.lookAt(0,0,o[x]));let g=this._cubeSize;io(r,m*g,x>2?g:0,g,g),l.setRenderTarget(r),p&&l.render(d,a),l.render(e,a)}d.geometry.dispose(),d.material.dispose(),l.toneMapping=h,l.autoClear=c,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Si||e.mapping===wi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hu());let a=r?this._cubemapMaterial:this._equirectMaterial,s=new Ke(this._lodPlanes[0],a);a.uniforms.envMap.value=e;let o=this._cubeSize;io(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(s,ic)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let a=1;a<r;a++){let s=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=Bu[(r-a-1)%Bu.length];this._blur(e,a-1,a,s,o)}t.autoClear=n}_blur(e,t,n,r,a){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,r,"latitudinal",a),this._halfBlur(s,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,s,o){let l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new Ke(this._lodPlanes[r],c),u=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(a)?Math.PI/(2*d):2*Math.PI/39,f=a/p,x=isFinite(a)?1+Math.floor(3*f):ha;x>ha&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${x} samples when the maximum is set to 20`);let m=[],g=0;for(let b=0;b<ha;++b){let P=b/f,E=Math.exp(-P*P/2);m.push(E),b===0?g+=E:b<x&&(g+=2*E)}for(let b=0;b<m.length;b++)m[b]=m[b]/g;u.envMap.value=e.texture,u.samples.value=x,u.weights.value=m,u.latitudinal.value=s==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=p,u.mipInt.value=_-n;let v=this._sizeLods[r];io(t,3*v*(r>_-4?r-_+4:0),4*(this._cubeSize-v),3*v,2*v),l.setRenderTarget(t),l.render(h,ic)}};function zu(i,e,t){let n=new vn(i,e,t);return n.texture.mapping=la,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function io(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Hu(){return new gt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function ku(){return new gt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function _c(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Fp(i){let e=new WeakMap,t=null;function n(r){let a=r.target;a.removeEventListener("dispose",n);let s=e.get(a);s!==void 0&&(e.delete(a),s.dispose())}return{get:function(r){if(r&&r.isTexture){let a=r.mapping,s=a===Gs||a===Vs,o=a===Si||a===wi;if(s||o){let l=e.get(r),c=l!==void 0?l.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new ao(i)),l=s?t.fromEquirectangular(r,l):t.fromCubemap(r,l),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),l.texture;if(l!==void 0)return l.texture;{let h=r.image;return s&&h&&h.height>0||o&&h&&(function(u){let d=0,p=6;for(let f=0;f<p;f++)u[f]!==void 0&&d++;return d===p})(h)?(t===null&&(t=new ao(i)),l=s?t.fromEquirectangular(r):t.fromCubemap(r),l.texture.pmremVersion=r.pmremVersion,e.set(r,l),r.addEventListener("dispose",n),l.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function Op(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Ai("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Bp(i,e,t,n){let r={},a=new WeakMap;function s(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let u in c.attributes)e.remove(c.attributes[u]);c.removeEventListener("dispose",s),delete r[c.id];let h=a.get(c);h&&(e.remove(h),a.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,u=l.attributes.position,d=0;if(h!==null){let x=h.array;d=h.version;for(let m=0,g=x.length;m<g;m+=3){let _=x[m+0],v=x[m+1],b=x[m+2];c.push(_,v,v,b,b,_)}}else{if(u===void 0)return;{let x=u.array;d=u.version;for(let m=0,g=x.length/3-1;m<g;m+=3){let _=m+0,v=m+1,b=m+2;c.push(_,v,v,b,b,_)}}}let p=new($l(c)?kr:Hr)(c,1);p.version=d;let f=a.get(l);f&&e.remove(f),a.set(l,p)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",s),r[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)e.update(c[h],i.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=a.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return a.get(l)}}}function zp(i,e,t){let n,r,a;function s(o,l,c){c!==0&&(i.drawElementsInstanced(n,l,r,o*a,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){r=o.type,a=o.bytesPerElement},this.render=function(o,l){i.drawElements(n,l,r,o*a),t.update(l,n,1)},this.renderInstances=s,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,r,o,0,c);let h=0;for(let u=0;u<c;u++)h+=l[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)s(o[d]/a,l[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,l,0,r,o,0,h,0,c);let d=0;for(let p=0;p<c;p++)d+=l[p]*h[p];t.update(d,n,1)}}}function Hp(i){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function kp(i,e,t){let n=new WeakMap,r=new lt;return{update:function(a,s,o){let l=a.morphTargetInfluences,c=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,h=c!==void 0?c.length:0,u=n.get(s);if(u===void 0||u.count!==h){let k=function(){D.dispose(),n.delete(s),s.removeEventListener("dispose",k)};var d=k;u!==void 0&&u.texture.dispose();let p=s.morphAttributes.position!==void 0,f=s.morphAttributes.normal!==void 0,x=s.morphAttributes.color!==void 0,m=s.morphAttributes.position||[],g=s.morphAttributes.normal||[],_=s.morphAttributes.color||[],v=0;p===!0&&(v=1),f===!0&&(v=2),x===!0&&(v=3);let b=s.attributes.position.count*v,P=1;b>e.maxTextureSize&&(P=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let E=new Float32Array(b*P*4*h),D=new Br(E,b,P,h);D.type=Sn,D.needsUpdate=!0;let F=4*v;for(let W=0;W<h;W++){let X=m[W],V=g[W],$=_[W],Y=b*P*4*W;for(let ee=0;ee<X.count;ee++){let Z=ee*F;p===!0&&(r.fromBufferAttribute(X,ee),E[Y+Z+0]=r.x,E[Y+Z+1]=r.y,E[Y+Z+2]=r.z,E[Y+Z+3]=0),f===!0&&(r.fromBufferAttribute(V,ee),E[Y+Z+4]=r.x,E[Y+Z+5]=r.y,E[Y+Z+6]=r.z,E[Y+Z+7]=0),x===!0&&(r.fromBufferAttribute($,ee),E[Y+Z+8]=r.x,E[Y+Z+9]=r.y,E[Y+Z+10]=r.z,E[Y+Z+11]=$.itemSize===4?r.w:1)}}u={count:h,texture:D,size:new ce(b,P)},n.set(s,u),s.addEventListener("dispose",k)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let f=s.morphTargetsRelative?1:1-p;o.getUniforms().setValue(i,"morphTargetBaseInfluence",f),o.getUniforms().setValue(i,"morphTargetInfluences",l)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}}}function Gp(i,e,t,n){let r=new WeakMap;function a(s){let o=s.target;o.removeEventListener("dispose",a),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(s){let o=n.render.frame,l=s.geometry,c=e.get(s,l);if(r.get(c)!==o&&(e.update(c),r.set(c,o)),s.isInstancedMesh&&(s.hasEventListener("dispose",a)===!1&&s.addEventListener("dispose",a),r.get(s)!==o&&(t.update(s.instanceMatrix,i.ARRAY_BUFFER),s.instanceColor!==null&&t.update(s.instanceColor,i.ARRAY_BUFFER),r.set(s,o))),s.isSkinnedMesh){let h=s.skeleton;r.get(h)!==o&&(h.update(),r.set(h,o))}return c},dispose:function(){r=new WeakMap}}}var sd=new Pt,Gu=new Xr(1,1),od=new Br,ld=new ns,cd=new Gr,Vu=[],Wu=[],Xu=new Float32Array(16),Yu=new Float32Array(9),ju=new Float32Array(4);function fr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,a=Vu[r];if(a===void 0&&(a=new Float32Array(r),Vu[r]=a),e!==0){n.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(a,o)}return a}function Tt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function oo(i,e){let t=Wu[e];t===void 0&&(t=new Int32Array(e),Wu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Vp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Wp(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function Xp(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function Yp(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function jp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(Tt(t,n))return;ju.set(n),i.uniformMatrix2fv(this.addr,!1,ju),Et(t,n)}}function qp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(Tt(t,n))return;Yu.set(n),i.uniformMatrix3fv(this.addr,!1,Yu),Et(t,n)}}function Zp(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(Tt(t,n))return;Xu.set(n),i.uniformMatrix4fv(this.addr,!1,Xu),Et(t,n)}}function Kp(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Jp(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function $p(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function Qp(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function em(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function tm(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function nm(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function im(i,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function rm(i,e,t){let n=this.cache,r=t.allocateTextureUnit(),a;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(Gu.compareFunction=Kl,a=Gu):a=sd,t.setTexture2D(e||a,r)}function am(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||ld,r)}function sm(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||cd,r)}function om(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||od,r)}function lm(i,e){i.uniform1fv(this.addr,e)}function cm(i,e){let t=fr(e,this.size,2);i.uniform2fv(this.addr,t)}function hm(i,e){let t=fr(e,this.size,3);i.uniform3fv(this.addr,t)}function um(i,e){let t=fr(e,this.size,4);i.uniform4fv(this.addr,t)}function dm(i,e){let t=fr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function pm(i,e){let t=fr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function mm(i,e){let t=fr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function fm(i,e){i.uniform1iv(this.addr,e)}function gm(i,e){i.uniform2iv(this.addr,e)}function _m(i,e){i.uniform3iv(this.addr,e)}function vm(i,e){i.uniform4iv(this.addr,e)}function xm(i,e){i.uniform1uiv(this.addr,e)}function ym(i,e){i.uniform2uiv(this.addr,e)}function bm(i,e){i.uniform3uiv(this.addr,e)}function Mm(i,e){i.uniform4uiv(this.addr,e)}function Sm(i,e,t){let n=this.cache,r=e.length,a=oo(t,r);Tt(n,a)||(i.uniform1iv(this.addr,a),Et(n,a));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||sd,a[s])}function wm(i,e,t){let n=this.cache,r=e.length,a=oo(t,r);Tt(n,a)||(i.uniform1iv(this.addr,a),Et(n,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||ld,a[s])}function Tm(i,e,t){let n=this.cache,r=e.length,a=oo(t,r);Tt(n,a)||(i.uniform1iv(this.addr,a),Et(n,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||cd,a[s])}function Em(i,e,t){let n=this.cache,r=e.length,a=oo(t,r);Tt(n,a)||(i.uniform1iv(this.addr,a),Et(n,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||od,a[s])}var cc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=(function(r){switch(r){case 5126:return Vp;case 35664:return Wp;case 35665:return Xp;case 35666:return Yp;case 35674:return jp;case 35675:return qp;case 35676:return Zp;case 5124:case 35670:return Kp;case 35667:case 35671:return Jp;case 35668:case 35672:return $p;case 35669:case 35673:return Qp;case 5125:return em;case 36294:return tm;case 36295:return nm;case 36296:return im;case 35678:case 36198:case 36298:case 36306:case 35682:return rm;case 35679:case 36299:case 36307:return am;case 35680:case 36300:case 36308:case 36293:return sm;case 36289:case 36303:case 36311:case 36292:return om}})(t.type)}},hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(r){switch(r){case 5126:return lm;case 35664:return cm;case 35665:return hm;case 35666:return um;case 35674:return dm;case 35675:return pm;case 35676:return mm;case 5124:case 35670:return fm;case 35667:case 35671:return gm;case 35668:case 35672:return _m;case 35669:case 35673:return vm;case 5125:return xm;case 36294:return ym;case 36295:return bm;case 36296:return Mm;case 35678:case 36198:case 36298:case 36306:case 35682:return Sm;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Tm;case 36289:case 36303:case 36311:case 36292:return Em}})(t.type)}},uc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let a=0,s=r.length;a!==s;++a){let o=r[a];o.setValue(e,t[o.id],n)}}},lc=/(\w+)(\])?(\[|\.)?/g;function qu(i,e){i.seq.push(e),i.map[e.id]=e}function Am(i,e,t){let n=i.name,r=n.length;for(lc.lastIndex=0;;){let a=lc.exec(n),s=lc.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o|=0),c===void 0||c==="["&&s+2===r){qu(t,c===void 0?new cc(o,i,e):new hc(o,i,e));break}{let h=t.map[o];h===void 0&&(h=new uc(o),qu(t,h)),t=h}}}var mr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let a=e.getActiveUniform(t,r);Am(a,e.getUniformLocation(t,a.name),this)}}setValue(e,t,n,r){let a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,s=t.length;a!==s;++a){let o=t[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,a=e.length;r!==a;++r){let s=e[r];s.id in t&&n.push(s)}return n}};function Zu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Rm=37297,Cm=0,Ku=new Fe;function Ju(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let s=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+(function(o,l){let c=o.split(`
`),h=[],u=Math.max(l-6,0),d=Math.min(l+6,c.length);for(let p=u;p<d;p++){let f=p+1;h.push(`${f===l?">":" "} ${f}: ${c[p]}`)}return h.join(`
`)})(i.getShaderSource(e),s)}return r}function Pm(i,e){let t=(function(n){Je._getMatrix(Ku,Je.workingColorSpace,n);let r=`mat3( ${Ku.elements.map((a=>a.toFixed(4)))} )`;switch(Je.getTransfer(n)){case Dr:return[r,"LinearTransferOETF"];case it:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[r,"LinearTransferOETF"]}})(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Lm(i,e){let t;switch(e){case iu:t="Linear";break;case ru:t="Reinhard";break;case au:t="Cineon";break;case su:t="ACESFilmic";break;case lu:t="AgX";break;case cu:t="Neutral";break;case ou:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ro=new R;function Im(){return Je.getLuminanceCoefficients(ro),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${ro.x.toFixed(4)}, ${ro.y.toFixed(4)}, ${ro.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ua(i){return i!==""}function $u(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Um=/^[ \t]*#include +<([\w\d./]+)>/gm;function dc(i){return i.replace(Um,Nm)}var Dm=new Map;function Nm(i,e){let t=ke[e];if(t===void 0){let n=Dm.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return dc(t)}var Fm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ed(i){return i.replace(Fm,Om)}function Om(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function td(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Bm(i,e,t,n){let r=i.getContext(),a=t.defines,s=t.vertexShader,o=t.fragmentShader,l=(function(X){let V="SHADOWMAP_TYPE_BASIC";return X.shadowMapType===pl?V="SHADOWMAP_TYPE_PCF":X.shadowMapType===Uh?V="SHADOWMAP_TYPE_PCF_SOFT":X.shadowMapType===yn&&(V="SHADOWMAP_TYPE_VSM"),V})(t),c=(function(X){let V="ENVMAP_TYPE_CUBE";if(X.envMap)switch(X.envMapMode){case Si:case wi:V="ENVMAP_TYPE_CUBE";break;case la:V="ENVMAP_TYPE_CUBE_UV"}return V})(t),h=(function(X){let V="ENVMAP_MODE_REFLECTION";return X.envMap&&X.envMapMode===wi&&(V="ENVMAP_MODE_REFRACTION"),V})(t),u=(function(X){let V="ENVMAP_BLENDING_NONE";if(X.envMap)switch(X.combine){case eu:V="ENVMAP_BLENDING_MULTIPLY";break;case tu:V="ENVMAP_BLENDING_MIX";break;case nu:V="ENVMAP_BLENDING_ADD"}return V})(t),d=(function(X){let V=X.envMapCubeUVHeight;if(V===null)return null;let $=Math.log2(V)-2,Y=1/V;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Y,maxMip:$}})(t),p=(function(X){return[X.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",X.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ua).join(`
`)})(t),f=(function(X){let V=[];for(let $ in X){let Y=X[$];Y!==!1&&V.push("#define "+$+" "+Y)}return V.join(`
`)})(a),x=r.createProgram(),m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(ua).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(ua).join(`
`),g.length>0&&(g+=`
`)):(m=[td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ua).join(`
`),g=[td(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?ke.tonemapping_pars_fragment:"",t.toneMapping!==Bn?Lm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,Pm("linearToOutputTexel",t.outputColorSpace),Im(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ua).join(`
`)),s=dc(s),s=$u(s,t),s=Qu(s,t),o=dc(o),o=$u(o,t),o=Qu(o,t),s=ed(s),o=ed(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Jl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let v=_+m+s,b=_+g+o,P=Zu(r,r.VERTEX_SHADER,v),E=Zu(r,r.FRAGMENT_SHADER,b);function D(X){if(i.debug.checkShaderErrors){let V=r.getProgramInfoLog(x).trim(),$=r.getShaderInfoLog(P).trim(),Y=r.getShaderInfoLog(E).trim(),ee=!0,Z=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ee=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,P,E);else{let oe=Ju(r,P,"vertex"),le=Ju(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+V+`
`+oe+`
`+le)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):$!==""&&Y!==""||(Z=!1);Z&&(X.diagnostics={runnable:ee,programLog:V,vertexShader:{log:$,prefix:m},fragmentShader:{log:Y,prefix:g}})}r.deleteShader(P),r.deleteShader(E),F=new mr(r,x),k=(function(V,$){let Y={},ee=V.getProgramParameter($,V.ACTIVE_ATTRIBUTES);for(let Z=0;Z<ee;Z++){let oe=V.getActiveAttrib($,Z),le=oe.name,Se=1;oe.type===V.FLOAT_MAT2&&(Se=2),oe.type===V.FLOAT_MAT3&&(Se=3),oe.type===V.FLOAT_MAT4&&(Se=4),Y[le]={type:oe.type,location:V.getAttribLocation($,le),locationSize:Se}}return Y})(r,x)}let F,k;r.attachShader(x,P),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x),this.getUniforms=function(){return F===void 0&&D(this),F},this.getAttributes=function(){return k===void 0&&D(this),k};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=r.getProgramParameter(x,Rm)),W},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cm++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=P,this.fragmentShader=E,this}var zm=0,pc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new mc(e),t.set(e,n)),n}},mc=class{constructor(e){this.id=zm++,this.code=e,this.usedTimes=0}};function Hm(i,e,t,n,r,a,s){let o=new zr,l=new pc,c=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures,p=r.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(m){return c.add(m),m===0?"uv":`uv${m}`}return{getParameters:function(m,g,_,v,b){let P=v.fog,E=b.geometry,D=m.isMeshStandardMaterial?v.environment:null,F=(m.isMeshStandardMaterial?t:e).get(m.envMap||D),k=F&&F.mapping===la?F.image.height:null,W=f[m.type];m.precision!==null&&(p=r.getMaxPrecision(m.precision),p!==m.precision&&console.warn("THREE.WebGLProgram.getParameters:",m.precision,"not supported, using",p,"instead."));let X=E.morphAttributes.position||E.morphAttributes.normal||E.morphAttributes.color,V=X!==void 0?X.length:0,$,Y,ee,Z,oe=0;if(E.morphAttributes.position!==void 0&&(oe=1),E.morphAttributes.normal!==void 0&&(oe=2),E.morphAttributes.color!==void 0&&(oe=3),W){let ri=wn[W];$=ri.vertexShader,Y=ri.fragmentShader}else $=m.vertexShader,Y=m.fragmentShader,l.update(m),ee=l.getVertexShaderID(m),Z=l.getFragmentShaderID(m);let le=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),Ae=b.isInstancedMesh===!0,ae=b.isBatchedMesh===!0,de=!!m.map,ye=!!m.matcap,ve=!!F,A=!!m.aoMap,y=!!m.lightMap,M=!!m.bumpMap,I=!!m.normalMap,C=!!m.displacementMap,T=!!m.emissiveMap,L=!!m.metalnessMap,S=!!m.roughnessMap,U=m.anisotropy>0,N=m.clearcoat>0,Q=m.dispersion>0,H=m.iridescence>0,J=m.sheen>0,K=m.transmission>0,ie=U&&!!m.anisotropyMap,pe=N&&!!m.clearcoatMap,_e=N&&!!m.clearcoatNormalMap,Ee=N&&!!m.clearcoatRoughnessMap,Ie=H&&!!m.iridescenceMap,je=H&&!!m.iridescenceThicknessMap,Pe=J&&!!m.sheenColorMap,Me=J&&!!m.sheenRoughnessMap,Ge=!!m.specularMap,et=!!m.specularColorMap,$e=!!m.specularIntensityMap,we=K&&!!m.transmissionMap,Ve=K&&!!m.thicknessMap,tt=!!m.gradientMap,Hn=!!m.alphaMap,ii=m.alphaTest>0,Vt=!!m.alphaHash,zt=!!m.extensions,Tn=Bn;m.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(Tn=i.toneMapping));let z={shaderID:W,shaderType:m.type,shaderName:m.name,vertexShader:$,fragmentShader:Y,defines:m.defines,customVertexShaderID:ee,customFragmentShaderID:Z,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:p,batching:ae,batchingColor:ae&&b._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&b.instanceColor!==null,instancingMorph:Ae&&b.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?i.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:di,alphaToCoverage:!!m.alphaToCoverage,map:de,matcap:ye,envMap:ve,envMapMode:ve&&F.mapping,envMapCubeUVHeight:k,aoMap:A,lightMap:y,bumpMap:M,normalMap:I,displacementMap:d&&C,emissiveMap:T,normalMapObjectSpace:I&&m.normalMapType===xu,normalMapTangentSpace:I&&m.normalMapType===vu,metalnessMap:L,roughnessMap:S,anisotropy:U,anisotropyMap:ie,clearcoat:N,clearcoatMap:pe,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ee,dispersion:Q,iridescence:H,iridescenceMap:Ie,iridescenceThicknessMap:je,sheen:J,sheenColorMap:Pe,sheenRoughnessMap:Me,specularMap:Ge,specularColorMap:et,specularIntensityMap:$e,transmission:K,transmissionMap:we,thicknessMap:Ve,gradientMap:tt,opaque:m.transparent===!1&&m.blending===sa&&m.alphaToCoverage===!1,alphaMap:Hn,alphaTest:ii,alphaHash:Vt,combine:m.combine,mapUv:de&&x(m.map.channel),aoMapUv:A&&x(m.aoMap.channel),lightMapUv:y&&x(m.lightMap.channel),bumpMapUv:M&&x(m.bumpMap.channel),normalMapUv:I&&x(m.normalMap.channel),displacementMapUv:C&&x(m.displacementMap.channel),emissiveMapUv:T&&x(m.emissiveMap.channel),metalnessMapUv:L&&x(m.metalnessMap.channel),roughnessMapUv:S&&x(m.roughnessMap.channel),anisotropyMapUv:ie&&x(m.anisotropyMap.channel),clearcoatMapUv:pe&&x(m.clearcoatMap.channel),clearcoatNormalMapUv:_e&&x(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&x(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&x(m.iridescenceMap.channel),iridescenceThicknessMapUv:je&&x(m.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&x(m.sheenColorMap.channel),sheenRoughnessMapUv:Me&&x(m.sheenRoughnessMap.channel),specularMapUv:Ge&&x(m.specularMap.channel),specularColorMapUv:et&&x(m.specularColorMap.channel),specularIntensityMapUv:$e&&x(m.specularIntensityMap.channel),transmissionMapUv:we&&x(m.transmissionMap.channel),thicknessMapUv:Ve&&x(m.thicknessMap.channel),alphaMapUv:Hn&&x(m.alphaMap.channel),vertexTangents:!!E.attributes.tangent&&(I||U),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!E.attributes.color&&E.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!E.attributes.uv&&(de||Hn),fog:!!P,useFog:m.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:m.flatShading===!0,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Se,skinning:b.isSkinnedMesh===!0,morphTargets:E.morphAttributes.position!==void 0,morphNormals:E.morphAttributes.normal!==void 0,morphColors:E.morphAttributes.color!==void 0,morphTargetsCount:V,morphTextureStride:oe,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:m.dithering,shadowMapEnabled:i.shadowMap.enabled&&_.length>0,shadowMapType:i.shadowMap.type,toneMapping:Tn,decodeVideoTexture:de&&m.map.isVideoTexture===!0&&Je.getTransfer(m.map.colorSpace)===it,decodeVideoTextureEmissive:T&&m.emissiveMap.isVideoTexture===!0&&Je.getTransfer(m.emissiveMap.colorSpace)===it,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===bn,flipSided:m.side===Bt,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:zt&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&m.extensions.multiDraw===!0||ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return z.vertexUv1s=c.has(1),z.vertexUv2s=c.has(2),z.vertexUv3s=c.has(3),c.clear(),z},getProgramCacheKey:function(m){let g=[];if(m.shaderID?g.push(m.shaderID):(g.push(m.customVertexShaderID),g.push(m.customFragmentShaderID)),m.defines!==void 0)for(let _ in m.defines)g.push(_),g.push(m.defines[_]);return m.isRawShaderMaterial===!1&&((function(_,v){_.push(v.precision),_.push(v.outputColorSpace),_.push(v.envMapMode),_.push(v.envMapCubeUVHeight),_.push(v.mapUv),_.push(v.alphaMapUv),_.push(v.lightMapUv),_.push(v.aoMapUv),_.push(v.bumpMapUv),_.push(v.normalMapUv),_.push(v.displacementMapUv),_.push(v.emissiveMapUv),_.push(v.metalnessMapUv),_.push(v.roughnessMapUv),_.push(v.anisotropyMapUv),_.push(v.clearcoatMapUv),_.push(v.clearcoatNormalMapUv),_.push(v.clearcoatRoughnessMapUv),_.push(v.iridescenceMapUv),_.push(v.iridescenceThicknessMapUv),_.push(v.sheenColorMapUv),_.push(v.sheenRoughnessMapUv),_.push(v.specularMapUv),_.push(v.specularColorMapUv),_.push(v.specularIntensityMapUv),_.push(v.transmissionMapUv),_.push(v.thicknessMapUv),_.push(v.combine),_.push(v.fogExp2),_.push(v.sizeAttenuation),_.push(v.morphTargetsCount),_.push(v.morphAttributeCount),_.push(v.numDirLights),_.push(v.numPointLights),_.push(v.numSpotLights),_.push(v.numSpotLightMaps),_.push(v.numHemiLights),_.push(v.numRectAreaLights),_.push(v.numDirLightShadows),_.push(v.numPointLightShadows),_.push(v.numSpotLightShadows),_.push(v.numSpotLightShadowsWithMaps),_.push(v.numLightProbes),_.push(v.shadowMapType),_.push(v.toneMapping),_.push(v.numClippingPlanes),_.push(v.numClipIntersection),_.push(v.depthPacking)})(g,m),(function(_,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),_.push(o.mask)})(g,m),g.push(i.outputColorSpace)),g.push(m.customProgramCacheKey),g.join()},getUniforms:function(m){let g=f[m.type],_;if(g){let v=wn[g];_=Iu.clone(v.uniforms)}else _=m.uniforms;return _},acquireProgram:function(m,g){let _;for(let v=0,b=h.length;v<b;v++){let P=h[v];if(P.cacheKey===g){_=P,++_.usedTimes;break}}return _===void 0&&(_=new Bm(i,g,m,a),h.push(_)),_},releaseProgram:function(m){if(--m.usedTimes==0){let g=h.indexOf(m);h[g]=h[h.length-1],h.pop(),m.destroy()}},releaseShaderCache:function(m){l.remove(m)},programs:h,dispose:function(){l.dispose()}}}function km(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function Gm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function nd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function id(){let i=[],e=0,t=[],n=[],r=[];function a(s,o,l,c,h,u){let d=i[e];return d===void 0?(d={id:s.id,object:s,geometry:o,material:l,groupOrder:c,renderOrder:s.renderOrder,z:h,group:u},i[e]=d):(d.id=s.id,d.object=s,d.geometry=o,d.material=l,d.groupOrder=c,d.renderOrder=s.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(s,o,l,c,h,u){let d=a(s,o,l,c,h,u);l.transmission>0?n.push(d):l.transparent===!0?r.push(d):t.push(d)},unshift:function(s,o,l,c,h,u){let d=a(s,o,l,c,h,u);l.transmission>0?n.unshift(d):l.transparent===!0?r.unshift(d):t.unshift(d)},finish:function(){for(let s=e,o=i.length;s<o;s++){let l=i[s];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(s,o){t.length>1&&t.sort(s||Gm),n.length>1&&n.sort(o||nd),r.length>1&&r.sort(o||nd)}}}function Vm(){let i=new WeakMap;return{get:function(e,t){let n=i.get(e),r;return n===void 0?(r=new id,i.set(e,[r])):t>=n.length?(r=new id,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function Wm(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Ue};break;case"SpotLight":t={position:new R,direction:new R,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new R,halfWidth:new R,halfHeight:new R}}return i[e.id]=t,t}}}var Xm=0;function Ym(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jm(i){let e=new Wm,t=(function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}})(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new R);let r=new R,a=new ze,s=new ze;return{setup:function(o){let l=0,c=0,h=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let u=0,d=0,p=0,f=0,x=0,m=0,g=0,_=0,v=0,b=0,P=0;o.sort(Ym);for(let D=0,F=o.length;D<F;D++){let k=o[D],W=k.color,X=k.intensity,V=k.distance,$=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)l+=W.r*X,c+=W.g*X,h+=W.b*X;else if(k.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(k.sh.coefficients[Y],X);P++}else if(k.isDirectionalLight){let Y=e.get(k);if(Y.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){let ee=k.shadow,Z=t.get(k);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,n.directionalShadow[u]=Z,n.directionalShadowMap[u]=$,n.directionalShadowMatrix[u]=k.shadow.matrix,m++}n.directional[u]=Y,u++}else if(k.isSpotLight){let Y=e.get(k);Y.position.setFromMatrixPosition(k.matrixWorld),Y.color.copy(W).multiplyScalar(X),Y.distance=V,Y.coneCos=Math.cos(k.angle),Y.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),Y.decay=k.decay,n.spot[p]=Y;let ee=k.shadow;if(k.map&&(n.spotLightMap[v]=k.map,v++,ee.updateMatrices(k),k.castShadow&&b++),n.spotLightMatrix[p]=ee.matrix,k.castShadow){let Z=t.get(k);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,n.spotShadow[p]=Z,n.spotShadowMap[p]=$,_++}p++}else if(k.isRectAreaLight){let Y=e.get(k);Y.color.copy(W).multiplyScalar(X),Y.halfWidth.set(.5*k.width,0,0),Y.halfHeight.set(0,.5*k.height,0),n.rectArea[f]=Y,f++}else if(k.isPointLight){let Y=e.get(k);if(Y.color.copy(k.color).multiplyScalar(k.intensity),Y.distance=k.distance,Y.decay=k.decay,k.castShadow){let ee=k.shadow,Z=t.get(k);Z.shadowIntensity=ee.intensity,Z.shadowBias=ee.bias,Z.shadowNormalBias=ee.normalBias,Z.shadowRadius=ee.radius,Z.shadowMapSize=ee.mapSize,Z.shadowCameraNear=ee.camera.near,Z.shadowCameraFar=ee.camera.far,n.pointShadow[d]=Z,n.pointShadowMap[d]=$,n.pointShadowMatrix[d]=k.shadow.matrix,g++}n.point[d]=Y,d++}else if(k.isHemisphereLight){let Y=e.get(k);Y.skyColor.copy(k.color).multiplyScalar(X),Y.groundColor.copy(k.groundColor).multiplyScalar(X),n.hemi[x]=Y,x++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let E=n.hash;E.directionalLength===u&&E.pointLength===d&&E.spotLength===p&&E.rectAreaLength===f&&E.hemiLength===x&&E.numDirectionalShadows===m&&E.numPointShadows===g&&E.numSpotShadows===_&&E.numSpotMaps===v&&E.numLightProbes===P||(n.directional.length=u,n.spot.length=p,n.rectArea.length=f,n.point.length=d,n.hemi.length=x,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+v-b,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=P,E.directionalLength=u,E.pointLength=d,E.spotLength=p,E.rectAreaLength=f,E.hemiLength=x,E.numDirectionalShadows=m,E.numPointShadows=g,E.numSpotShadows=_,E.numSpotMaps=v,E.numLightProbes=P,n.version=Xm++)},setupView:function(o,l){let c=0,h=0,u=0,d=0,p=0,f=l.matrixWorldInverse;for(let x=0,m=o.length;x<m;x++){let g=o[x];if(g.isDirectionalLight){let _=n.directional[c];_.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(f),c++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(g.matrixWorld),r.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(f),u++}else if(g.isRectAreaLight){let _=n.rectArea[d];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),s.identity(),a.copy(g.matrixWorld),a.premultiply(f),s.extractRotation(a),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(s),_.halfHeight.applyMatrix4(s),d++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),h++}else if(g.isHemisphereLight){let _=n.hemi[p];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(f),p++}}},state:n}}function rd(i){let e=new jm(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(a){r.camera=a,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)}}}function qm(i){let e=new WeakMap;return{get:function(t,n=0){let r=e.get(t),a;return r===void 0?(a=new rd(i),e.set(t,[a])):n>=r.length?(a=new rd(i),r.push(a)):a=r[n],a},dispose:function(){e=new WeakMap}}}function Zm(i,e,t){let n=new gi,r=new ce,a=new ce,s=new lt,o=new ws({depthPacking:_u}),l=new Ts,c={},h=t.maxTextureSize,u={[ln]:Bt,[Bt]:ln,[bn]:bn},d=new gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let f=new Qe;f.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ke(f,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pl;let g=this.type;function _(E,D){let F=e.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new vn(r.x,r.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(D,null,F,d,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(D,null,F,p,x,null)}function v(E,D,F,k){let W=null,X=F.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(X!==void 0)W=X;else if(W=F.isPointLight===!0?l:o,i.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){let V=W.uuid,$=D.uuid,Y=c[V];Y===void 0&&(Y={},c[V]=Y);let ee=Y[$];ee===void 0&&(ee=W.clone(),Y[$]=ee,D.addEventListener("dispose",P)),W=ee}return W.visible=D.visible,W.wireframe=D.wireframe,W.side=k===yn?D.shadowSide!==null?D.shadowSide:D.side:D.shadowSide!==null?D.shadowSide:u[D.side],W.alphaMap=D.alphaMap,W.alphaTest=D.alphaTest,W.map=D.map,W.clipShadows=D.clipShadows,W.clippingPlanes=D.clippingPlanes,W.clipIntersection=D.clipIntersection,W.displacementMap=D.displacementMap,W.displacementScale=D.displacementScale,W.displacementBias=D.displacementBias,W.wireframeLinewidth=D.wireframeLinewidth,W.linewidth=D.linewidth,F.isPointLight===!0&&W.isMeshDistanceMaterial===!0&&(i.properties.get(W).light=F),W}function b(E,D,F,k,W){if(E.visible===!1)return;if(E.layers.test(D.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&W===yn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,E.matrixWorld);let V=e.update(E),$=E.material;if(Array.isArray($)){let Y=V.groups;for(let ee=0,Z=Y.length;ee<Z;ee++){let oe=Y[ee],le=$[oe.materialIndex];if(le&&le.visible){let Se=v(E,le,k,W);E.onBeforeShadow(i,E,D,F,V,Se,oe),i.renderBufferDirect(F,null,V,Se,E,oe),E.onAfterShadow(i,E,D,F,V,Se,oe)}}}else if($.visible){let Y=v(E,$,k,W);E.onBeforeShadow(i,E,D,F,V,Y,null),i.renderBufferDirect(F,null,V,Y,E,null),E.onAfterShadow(i,E,D,F,V,Y,null)}}let X=E.children;for(let V=0,$=X.length;V<$;V++)b(X[V],D,F,k,W)}function P(E){E.target.removeEventListener("dispose",P);for(let D in c){let F=c[D],k=E.target.uuid;k in F&&(F[k].dispose(),delete F[k])}}this.render=function(E,D,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let k=i.getRenderTarget(),W=i.getActiveCubeFace(),X=i.getActiveMipmapLevel(),V=i.state;V.setBlending(ei),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let $=g!==yn&&this.type===yn,Y=g===yn&&this.type!==yn;for(let ee=0,Z=E.length;ee<Z;ee++){let oe=E[ee],le=oe.shadow;if(le===void 0){console.warn("THREE.WebGLShadowMap:",oe,"has no shadow.");continue}if(le.autoUpdate===!1&&le.needsUpdate===!1)continue;r.copy(le.mapSize);let Se=le.getFrameExtents();if(r.multiply(Se),a.copy(le.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/Se.x),r.x=a.x*Se.x,le.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/Se.y),r.y=a.y*Se.y,le.mapSize.y=a.y)),le.map===null||$===!0||Y===!0){let ae=this.type!==yn?{minFilter:Jt,magFilter:Jt}:{};le.map!==null&&le.map.dispose(),le.map=new vn(r.x,r.y,ae),le.map.texture.name=oe.name+".shadowMap",le.camera.updateProjectionMatrix()}i.setRenderTarget(le.map),i.clear();let Ae=le.getViewportCount();for(let ae=0;ae<Ae;ae++){let de=le.getViewport(ae);s.set(a.x*de.x,a.y*de.y,a.x*de.z,a.y*de.w),V.viewport(s),le.updateMatrices(oe,ae),n=le.getFrustum(),b(D,F,le.camera,oe,this.type)}le.isPointLightShadow!==!0&&this.type===yn&&_(le,F),le.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(k,W,X)}}var Km={[Fs]:Os,[lr]:Hs,[Bs]:ks,[oa]:zs,[Os]:Fs,[Hs]:lr,[ks]:Bs,[zs]:oa};function Jm(i,e){let t=new function(){let S=!1,U=new lt,N=null,Q=new lt(0,0,0,0);return{setMask:function(H){N===H||S||(i.colorMask(H,H,H,H),N=H)},setLocked:function(H){S=H},setClear:function(H,J,K,ie,pe){pe===!0&&(H*=ie,J*=ie,K*=ie),U.set(H,J,K,ie),Q.equals(U)===!1&&(i.clearColor(H,J,K,ie),Q.copy(U))},reset:function(){S=!1,N=null,Q.set(-1,0,0,0)}}},n=new function(){let S=!1,U=!1,N=null,Q=null,H=null;return{setReversed:function(J){if(U!==J){let K=e.get("EXT_clip_control");U?K.clipControlEXT(K.LOWER_LEFT_EXT,K.ZERO_TO_ONE_EXT):K.clipControlEXT(K.LOWER_LEFT_EXT,K.NEGATIVE_ONE_TO_ONE_EXT);let ie=H;H=null,this.setClear(ie)}U=J},getReversed:function(){return U},setTest:function(J){J?ve(i.DEPTH_TEST):A(i.DEPTH_TEST)},setMask:function(J){N===J||S||(i.depthMask(J),N=J)},setFunc:function(J){if(U&&(J=Km[J]),Q!==J){switch(J){case Fs:i.depthFunc(i.NEVER);break;case Os:i.depthFunc(i.ALWAYS);break;case lr:i.depthFunc(i.LESS);break;case oa:i.depthFunc(i.LEQUAL);break;case Bs:i.depthFunc(i.EQUAL);break;case zs:i.depthFunc(i.GEQUAL);break;case Hs:i.depthFunc(i.GREATER);break;case ks:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=J}},setLocked:function(J){S=J},setClear:function(J){H!==J&&(U&&(J=1-J),i.clearDepth(J),H=J)},reset:function(){S=!1,N=null,Q=null,H=null,U=!1}}},r=new function(){let S=!1,U=null,N=null,Q=null,H=null,J=null,K=null,ie=null,pe=null;return{setTest:function(_e){S||(_e?ve(i.STENCIL_TEST):A(i.STENCIL_TEST))},setMask:function(_e){U===_e||S||(i.stencilMask(_e),U=_e)},setFunc:function(_e,Ee,Ie){N===_e&&Q===Ee&&H===Ie||(i.stencilFunc(_e,Ee,Ie),N=_e,Q=Ee,H=Ie)},setOp:function(_e,Ee,Ie){J===_e&&K===Ee&&ie===Ie||(i.stencilOp(_e,Ee,Ie),J=_e,K=Ee,ie=Ie)},setLocked:function(_e){S=_e},setClear:function(_e){pe!==_e&&(i.clearStencil(_e),pe=_e)},reset:function(){S=!1,U=null,N=null,Q=null,H=null,J=null,K=null,ie=null,pe=null}}},a=new WeakMap,s=new WeakMap,o={},l={},c=new WeakMap,h=[],u=null,d=!1,p=null,f=null,x=null,m=null,g=null,_=null,v=null,b=new Ue(0,0,0),P=0,E=!1,D=null,F=null,k=null,W=null,X=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,Y=0,ee=i.getParameter(i.VERSION);ee.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(ee)[1]),$=Y>=1):ee.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),$=Y>=2);let Z=null,oe={},le=i.getParameter(i.SCISSOR_BOX),Se=i.getParameter(i.VIEWPORT),Ae=new lt().fromArray(le),ae=new lt().fromArray(Se);function de(S,U,N,Q){let H=new Uint8Array(4),J=i.createTexture();i.bindTexture(S,J),i.texParameteri(S,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(S,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let K=0;K<N;K++)S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY?i.texImage3D(U,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,H):i.texImage2D(U+K,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,H);return J}let ye={};function ve(S){o[S]!==!0&&(i.enable(S),o[S]=!0)}function A(S){o[S]!==!1&&(i.disable(S),o[S]=!1)}ye[i.TEXTURE_2D]=de(i.TEXTURE_2D,i.TEXTURE_2D,1),ye[i.TEXTURE_CUBE_MAP]=de(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[i.TEXTURE_2D_ARRAY]=de(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ye[i.TEXTURE_3D]=de(i.TEXTURE_3D,i.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),r.setClear(0),ve(i.DEPTH_TEST),n.setFunc(oa),C(!1),T(dl),ve(i.CULL_FACE),I(ei);let y={[or]:i.FUNC_ADD,[Nh]:i.FUNC_SUBTRACT,[Fh]:i.FUNC_REVERSE_SUBTRACT};y[Oh]=i.MIN,y[Bh]=i.MAX;let M={[zh]:i.ZERO,[Hh]:i.ONE,[kh]:i.SRC_COLOR,[Vh]:i.SRC_ALPHA,[Zh]:i.SRC_ALPHA_SATURATE,[jh]:i.DST_COLOR,[Xh]:i.DST_ALPHA,[Gh]:i.ONE_MINUS_SRC_COLOR,[Wh]:i.ONE_MINUS_SRC_ALPHA,[qh]:i.ONE_MINUS_DST_COLOR,[Yh]:i.ONE_MINUS_DST_ALPHA,[Kh]:i.CONSTANT_COLOR,[Jh]:i.ONE_MINUS_CONSTANT_COLOR,[$h]:i.CONSTANT_ALPHA,[Qh]:i.ONE_MINUS_CONSTANT_ALPHA};function I(S,U,N,Q,H,J,K,ie,pe,_e){if(S!==ei){if(d===!1&&(ve(i.BLEND),d=!0),S===Dh)H=H||U,J=J||N,K=K||Q,U===f&&H===g||(i.blendEquationSeparate(y[U],y[H]),f=U,g=H),N===x&&Q===m&&J===_&&K===v||(i.blendFuncSeparate(M[N],M[Q],M[J],M[K]),x=N,m=Q,_=J,v=K),ie.equals(b)!==!1&&pe===P||(i.blendColor(ie.r,ie.g,ie.b,pe),b.copy(ie),P=pe),p=S,E=!1;else if(S!==p||_e!==E){if(f===or&&g===or||(i.blendEquation(i.FUNC_ADD),f=or,g=or),_e)switch(S){case sa:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ml:i.blendFunc(i.ONE,i.ONE);break;case fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}else switch(S){case sa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ml:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case fl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S)}x=null,m=null,_=null,v=null,b.set(0,0,0),P=0,p=S,E=_e}}else d===!0&&(A(i.BLEND),d=!1)}function C(S){D!==S&&(S?i.frontFace(i.CW):i.frontFace(i.CCW),D=S)}function T(S){S!==Lh?(ve(i.CULL_FACE),S!==F&&(S===dl?i.cullFace(i.BACK):S===Ih?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):A(i.CULL_FACE),F=S}function L(S,U,N){S?(ve(i.POLYGON_OFFSET_FILL),W===U&&X===N||(i.polygonOffset(U,N),W=U,X=N)):A(i.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:r},enable:ve,disable:A,bindFramebuffer:function(S,U){return l[S]!==U&&(i.bindFramebuffer(S,U),l[S]=U,S===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=U),S===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=U),!0)},drawBuffers:function(S,U){let N=h,Q=!1;if(S){N=c.get(U),N===void 0&&(N=[],c.set(U,N));let H=S.textures;if(N.length!==H.length||N[0]!==i.COLOR_ATTACHMENT0){for(let J=0,K=H.length;J<K;J++)N[J]=i.COLOR_ATTACHMENT0+J;N.length=H.length,Q=!0}}else N[0]!==i.BACK&&(N[0]=i.BACK,Q=!0);Q&&i.drawBuffers(N)},useProgram:function(S){return u!==S&&(i.useProgram(S),u=S,!0)},setBlending:I,setMaterial:function(S,U){S.side===bn?A(i.CULL_FACE):ve(i.CULL_FACE);let N=S.side===Bt;U&&(N=!N),C(N),S.blending===sa&&S.transparent===!1?I(ei):I(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),n.setFunc(S.depthFunc),n.setTest(S.depthTest),n.setMask(S.depthWrite),t.setMask(S.colorWrite);let Q=S.stencilWrite;r.setTest(Q),Q&&(r.setMask(S.stencilWriteMask),r.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),r.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),L(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?ve(i.SAMPLE_ALPHA_TO_COVERAGE):A(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:C,setCullFace:T,setLineWidth:function(S){S!==k&&($&&i.lineWidth(S),k=S)},setPolygonOffset:L,setScissorTest:function(S){S?ve(i.SCISSOR_TEST):A(i.SCISSOR_TEST)},activeTexture:function(S){S===void 0&&(S=i.TEXTURE0+V-1),Z!==S&&(i.activeTexture(S),Z=S)},bindTexture:function(S,U,N){N===void 0&&(N=Z===null?i.TEXTURE0+V-1:Z);let Q=oe[N];Q===void 0&&(Q={type:void 0,texture:void 0},oe[N]=Q),Q.type===S&&Q.texture===U||(Z!==N&&(i.activeTexture(N),Z=N),i.bindTexture(S,U||ye[S]),Q.type=S,Q.texture=U)},unbindTexture:function(){let S=oe[Z];S!==void 0&&S.type!==void 0&&(i.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexImage3D:function(){try{i.compressedTexImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage2D:function(){try{i.texImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texImage3D:function(){try{i.texImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},updateUBOMapping:function(S,U){let N=s.get(U);N===void 0&&(N=new WeakMap,s.set(U,N));let Q=N.get(S);Q===void 0&&(Q=i.getUniformBlockIndex(U,S.name),N.set(S,Q))},uniformBlockBinding:function(S,U){let N=s.get(U).get(S);a.get(U)!==N&&(i.uniformBlockBinding(U,N,S.__bindingPointIndex),a.set(U,N))},texStorage2D:function(){try{i.texStorage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texStorage3D:function(){try{i.texStorage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage2D:function(){try{i.texSubImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},texSubImage3D:function(){try{i.texSubImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(S){console.error("THREE.WebGLState:",S)}},scissor:function(S){Ae.equals(S)===!1&&(i.scissor(S.x,S.y,S.z,S.w),Ae.copy(S))},viewport:function(S){ae.equals(S)===!1&&(i.viewport(S.x,S.y,S.z,S.w),ae.copy(S))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),n.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),o={},Z=null,oe={},l={},c=new WeakMap,h=[],u=null,d=!1,p=null,f=null,x=null,m=null,g=null,_=null,v=null,b=new Ue(0,0,0),P=0,E=!1,D=null,F=null,k=null,W=null,X=null,Ae.set(0,0,i.canvas.width,i.canvas.height),ae.set(0,0,i.canvas.width,i.canvas.height),t.reset(),n.reset(),r.reset()}}}function $m(i,e,t,n,r,a,s){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ce,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(y,M){return p?new OffscreenCanvas(y,M):Fr("canvas")}function x(y,M,I){let C=1,T=A(y);if((T.width>I||T.height>I)&&(C=I/Math.max(T.width,T.height)),C<1){if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){let L=Math.floor(C*T.width),S=Math.floor(C*T.height);u===void 0&&(u=f(L,S));let U=M?f(L,S):u;return U.width=L,U.height=S,U.getContext("2d").drawImage(y,0,0,L,S),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+L+"x"+S+")."),U}return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),y}return y}function m(y){return y.generateMipmaps}function g(y){i.generateMipmap(y)}function _(y){return y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?i.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(y,M,I,C,T=!1){if(y!==null){if(i[y]!==void 0)return i[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let L=M;if(M===i.RED&&(I===i.FLOAT&&(L=i.R32F),I===i.HALF_FLOAT&&(L=i.R16F),I===i.UNSIGNED_BYTE&&(L=i.R8)),M===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(L=i.R8UI),I===i.UNSIGNED_SHORT&&(L=i.R16UI),I===i.UNSIGNED_INT&&(L=i.R32UI),I===i.BYTE&&(L=i.R8I),I===i.SHORT&&(L=i.R16I),I===i.INT&&(L=i.R32I)),M===i.RG&&(I===i.FLOAT&&(L=i.RG32F),I===i.HALF_FLOAT&&(L=i.RG16F),I===i.UNSIGNED_BYTE&&(L=i.RG8)),M===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(L=i.RG8UI),I===i.UNSIGNED_SHORT&&(L=i.RG16UI),I===i.UNSIGNED_INT&&(L=i.RG32UI),I===i.BYTE&&(L=i.RG8I),I===i.SHORT&&(L=i.RG16I),I===i.INT&&(L=i.RG32I)),M===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(L=i.RGB8UI),I===i.UNSIGNED_SHORT&&(L=i.RGB16UI),I===i.UNSIGNED_INT&&(L=i.RGB32UI),I===i.BYTE&&(L=i.RGB8I),I===i.SHORT&&(L=i.RGB16I),I===i.INT&&(L=i.RGB32I)),M===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(L=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(L=i.RGBA16UI),I===i.UNSIGNED_INT&&(L=i.RGBA32UI),I===i.BYTE&&(L=i.RGBA8I),I===i.SHORT&&(L=i.RGBA16I),I===i.INT&&(L=i.RGBA32I)),M===i.RGB&&I===i.UNSIGNED_INT_5_9_9_9_REV&&(L=i.RGB9_E5),M===i.RGBA){let S=T?Dr:Je.getTransfer(C);I===i.FLOAT&&(L=i.RGBA32F),I===i.HALF_FLOAT&&(L=i.RGBA16F),I===i.UNSIGNED_BYTE&&(L=S===it?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(L=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(L=i.RGB5_A1)}return L!==i.R16F&&L!==i.R32F&&L!==i.RG16F&&L!==i.RG32F&&L!==i.RGBA16F&&L!==i.RGBA32F||e.get("EXT_color_buffer_float"),L}function b(y,M){let I;return y?M===null||M===ti||M===ur?I=i.DEPTH24_STENCIL8:M===Sn?I=i.DEPTH32F_STENCIL8:M===cr&&(I=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ti||M===ur?I=i.DEPTH_COMPONENT24:M===Sn?I=i.DEPTH_COMPONENT32F:M===cr&&(I=i.DEPTH_COMPONENT16),I}function P(y,M){return m(y)===!0||y.isFramebufferTexture&&y.minFilter!==Jt&&y.minFilter!==ft?Math.log2(Math.max(M.width,M.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?M.mipmaps.length:1}function E(y){let M=y.target;M.removeEventListener("dispose",E),(function(I){let C=n.get(I);if(C.__webglInit===void 0)return;let T=I.source,L=d.get(T);if(L){let S=L[C.__cacheKey];S.usedTimes--,S.usedTimes===0&&F(I),Object.keys(L).length===0&&d.delete(T)}n.remove(I)})(M),M.isVideoTexture&&h.delete(M)}function D(y){let M=y.target;M.removeEventListener("dispose",D),(function(I){let C=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let L=0;L<6;L++){if(Array.isArray(C.__webglFramebuffer[L]))for(let S=0;S<C.__webglFramebuffer[L].length;S++)i.deleteFramebuffer(C.__webglFramebuffer[L][S]);else i.deleteFramebuffer(C.__webglFramebuffer[L]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[L])}else{if(Array.isArray(C.__webglFramebuffer))for(let L=0;L<C.__webglFramebuffer.length;L++)i.deleteFramebuffer(C.__webglFramebuffer[L]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let L=0;L<C.__webglColorRenderbuffer.length;L++)C.__webglColorRenderbuffer[L]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[L]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}let T=I.textures;for(let L=0,S=T.length;L<S;L++){let U=n.get(T[L]);U.__webglTexture&&(i.deleteTexture(U.__webglTexture),s.memory.textures--),n.remove(T[L])}n.remove(I)})(M)}function F(y){let M=n.get(y);i.deleteTexture(M.__webglTexture);let I=y.source;delete d.get(I)[M.__cacheKey],s.memory.textures--}let k=0;function W(y,M){let I=n.get(y);if(y.isVideoTexture&&(function(C){let T=s.render.frame;h.get(C)!==T&&(h.set(C,T),C.update())})(y),y.isRenderTargetTexture===!1&&y.version>0&&I.__version!==y.version){let C=y.image;if(C===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(C.complete!==!1)return void Z(I,y,M);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+M)}let X={[Ji]:i.REPEAT,[$i]:i.CLAMP_TO_EDGE,[Ja]:i.MIRRORED_REPEAT},V={[Jt]:i.NEAREST,[hu]:i.NEAREST_MIPMAP_NEAREST,[ca]:i.NEAREST_MIPMAP_LINEAR,[ft]:i.LINEAR,[Ws]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},$={[yu]:i.NEVER,[Eu]:i.ALWAYS,[bu]:i.LESS,[Kl]:i.LEQUAL,[Mu]:i.EQUAL,[Tu]:i.GEQUAL,[Su]:i.GREATER,[wu]:i.NOTEQUAL};function Y(y,M){if(M.type!==Sn||e.has("OES_texture_float_linear")!==!1||M.magFilter!==ft&&M.magFilter!==Ws&&M.magFilter!==ca&&M.magFilter!==Ti&&M.minFilter!==ft&&M.minFilter!==Ws&&M.minFilter!==ca&&M.minFilter!==Ti||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(y,i.TEXTURE_WRAP_S,X[M.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,X[M.wrapT]),y!==i.TEXTURE_3D&&y!==i.TEXTURE_2D_ARRAY||i.texParameteri(y,i.TEXTURE_WRAP_R,X[M.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,V[M.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,V[M.minFilter]),M.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,$[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Jt||M.minFilter!==ca&&M.minFilter!==Ti||M.type===Sn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(y,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function ee(y,M){let I=!1;y.__webglInit===void 0&&(y.__webglInit=!0,M.addEventListener("dispose",E));let C=M.source,T=d.get(C);T===void 0&&(T={},d.set(C,T));let L=(function(S){let U=[];return U.push(S.wrapS),U.push(S.wrapT),U.push(S.wrapR||0),U.push(S.magFilter),U.push(S.minFilter),U.push(S.anisotropy),U.push(S.internalFormat),U.push(S.format),U.push(S.type),U.push(S.generateMipmaps),U.push(S.premultiplyAlpha),U.push(S.flipY),U.push(S.unpackAlignment),U.push(S.colorSpace),U.join()})(M);if(L!==y.__cacheKey){T[L]===void 0&&(T[L]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,I=!0),T[L].usedTimes++;let S=T[y.__cacheKey];S!==void 0&&(T[y.__cacheKey].usedTimes--,S.usedTimes===0&&F(M)),y.__cacheKey=L,y.__webglTexture=T[L].texture}return I}function Z(y,M,I){let C=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(C=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(C=i.TEXTURE_3D);let T=ee(y,M),L=M.source;t.bindTexture(C,y.__webglTexture,i.TEXTURE0+I);let S=n.get(L);if(L.version!==S.__version||T===!0){t.activeTexture(i.TEXTURE0+I);let U=Je.getPrimaries(Je.workingColorSpace),N=M.colorSpace===Ei?null:Je.getPrimaries(M.colorSpace),Q=M.colorSpace===Ei||U===N?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let H=x(M.image,!1,r.maxTextureSize);H=ve(M,H);let J=a.convert(M.format,M.colorSpace),K=a.convert(M.type),ie,pe=v(M.internalFormat,J,K,M.colorSpace,M.isVideoTexture);Y(C,M);let _e=M.mipmaps,Ee=M.isVideoTexture!==!0,Ie=S.__version===void 0||T===!0,je=L.dataReady,Pe=P(M,H);if(M.isDepthTexture)pe=b(M.format===ui,M.type),Ie&&(Ee?t.texStorage2D(i.TEXTURE_2D,1,pe,H.width,H.height):t.texImage2D(i.TEXTURE_2D,0,pe,H.width,H.height,0,J,K,null));else if(M.isDataTexture)if(_e.length>0){Ee&&Ie&&t.texStorage2D(i.TEXTURE_2D,Pe,pe,_e[0].width,_e[0].height);for(let Me=0,Ge=_e.length;Me<Ge;Me++)ie=_e[Me],Ee?je&&t.texSubImage2D(i.TEXTURE_2D,Me,0,0,ie.width,ie.height,J,K,ie.data):t.texImage2D(i.TEXTURE_2D,Me,pe,ie.width,ie.height,0,J,K,ie.data);M.generateMipmaps=!1}else Ee?(Ie&&t.texStorage2D(i.TEXTURE_2D,Pe,pe,H.width,H.height),je&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,H.width,H.height,J,K,H.data)):t.texImage2D(i.TEXTURE_2D,0,pe,H.width,H.height,0,J,K,H.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ee&&Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,pe,_e[0].width,_e[0].height,H.depth);for(let Me=0,Ge=_e.length;Me<Ge;Me++)if(ie=_e[Me],M.format!==pn)if(J!==null)if(Ee){if(je)if(M.layerUpdates.size>0){let et=nc(ie.width,ie.height,M.format,M.type);for(let $e of M.layerUpdates){let we=ie.data.subarray($e*et/ie.data.BYTES_PER_ELEMENT,($e+1)*et/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Me,0,0,$e,ie.width,ie.height,1,J,we)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Me,0,0,0,ie.width,ie.height,H.depth,J,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Me,pe,ie.width,ie.height,H.depth,0,ie.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ee?je&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Me,0,0,0,ie.width,ie.height,H.depth,J,K,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Me,pe,ie.width,ie.height,H.depth,0,J,K,ie.data)}else{Ee&&Ie&&t.texStorage2D(i.TEXTURE_2D,Pe,pe,_e[0].width,_e[0].height);for(let Me=0,Ge=_e.length;Me<Ge;Me++)ie=_e[Me],M.format!==pn?J!==null?Ee?je&&t.compressedTexSubImage2D(i.TEXTURE_2D,Me,0,0,ie.width,ie.height,J,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,Me,pe,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ee?je&&t.texSubImage2D(i.TEXTURE_2D,Me,0,0,ie.width,ie.height,J,K,ie.data):t.texImage2D(i.TEXTURE_2D,Me,pe,ie.width,ie.height,0,J,K,ie.data)}else if(M.isDataArrayTexture)if(Ee){if(Ie&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,pe,H.width,H.height,H.depth),je)if(M.layerUpdates.size>0){let Me=nc(H.width,H.height,M.format,M.type);for(let Ge of M.layerUpdates){let et=H.data.subarray(Ge*Me/H.data.BYTES_PER_ELEMENT,(Ge+1)*Me/H.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ge,H.width,H.height,1,J,K,et)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,J,K,H.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,pe,H.width,H.height,H.depth,0,J,K,H.data);else if(M.isData3DTexture)Ee?(Ie&&t.texStorage3D(i.TEXTURE_3D,Pe,pe,H.width,H.height,H.depth),je&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,J,K,H.data)):t.texImage3D(i.TEXTURE_3D,0,pe,H.width,H.height,H.depth,0,J,K,H.data);else if(M.isFramebufferTexture){if(Ie)if(Ee)t.texStorage2D(i.TEXTURE_2D,Pe,pe,H.width,H.height);else{let Me=H.width,Ge=H.height;for(let et=0;et<Pe;et++)t.texImage2D(i.TEXTURE_2D,et,pe,Me,Ge,0,J,K,null),Me>>=1,Ge>>=1}}else if(_e.length>0){if(Ee&&Ie){let Me=A(_e[0]);t.texStorage2D(i.TEXTURE_2D,Pe,pe,Me.width,Me.height)}for(let Me=0,Ge=_e.length;Me<Ge;Me++)ie=_e[Me],Ee?je&&t.texSubImage2D(i.TEXTURE_2D,Me,0,0,J,K,ie):t.texImage2D(i.TEXTURE_2D,Me,pe,J,K,ie);M.generateMipmaps=!1}else if(Ee){if(Ie){let Me=A(H);t.texStorage2D(i.TEXTURE_2D,Pe,pe,Me.width,Me.height)}je&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,J,K,H)}else t.texImage2D(i.TEXTURE_2D,0,pe,J,K,H);m(M)&&g(C),S.__version=L.version,M.onUpdate&&M.onUpdate(M)}y.__version=M.version}function oe(y,M,I,C,T,L){let S=a.convert(I.format,I.colorSpace),U=a.convert(I.type),N=v(I.internalFormat,S,U,I.colorSpace),Q=n.get(M),H=n.get(I);if(H.__renderTarget=M,!Q.__hasExternalTextures){let J=Math.max(1,M.width>>L),K=Math.max(1,M.height>>L);T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY?t.texImage3D(T,L,N,J,K,M.depth,0,S,U,null):t.texImage2D(T,L,N,J,K,0,S,U,null)}t.bindFramebuffer(i.FRAMEBUFFER,y),ye(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,C,T,H.__webglTexture,0,de(M)):(T===i.TEXTURE_2D||T>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&T<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,C,T,H.__webglTexture,L),t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(y,M,I){if(i.bindRenderbuffer(i.RENDERBUFFER,y),M.depthBuffer){let C=M.depthTexture,T=C&&C.isDepthTexture?C.type:null,L=b(M.stencilBuffer,T),S=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,U=de(M);ye(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,U,L,M.width,M.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,U,L,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,L,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,S,i.RENDERBUFFER,y)}else{let C=M.textures;for(let T=0;T<C.length;T++){let L=C[T],S=a.convert(L.format,L.colorSpace),U=a.convert(L.type),N=v(L.internalFormat,S,U,L.colorSpace),Q=de(M);I&&ye(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,N,M.width,M.height):ye(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,N,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,N,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Se(y){let M=n.get(y),I=y.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==y.depthTexture){let C=y.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),C){let T=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,C.removeEventListener("dispose",T)};C.addEventListener("dispose",T),M.__depthDisposeCallback=T}M.__boundDepthTexture=C}if(y.depthTexture&&!M.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");(function(C,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!T.depthTexture||!T.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let L=n.get(T.depthTexture);L.__renderTarget=T,L.__webglTexture&&T.depthTexture.image.width===T.width&&T.depthTexture.image.height===T.height||(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),W(T.depthTexture,0);let S=L.__webglTexture,U=de(T);if(T.depthTexture.format===Qi)ye(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,S,0,U):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,S,0);else{if(T.depthTexture.format!==ui)throw new Error("Unknown depthTexture format");ye(T)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,S,0,U):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,S,0)}})(M.__webglFramebuffer,y)}else if(I){M.__webglDepthbuffer=[];for(let C=0;C<6;C++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[C]),M.__webglDepthbuffer[C]===void 0)M.__webglDepthbuffer[C]=i.createRenderbuffer(),le(M.__webglDepthbuffer[C],y,!1);else{let T=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,L=M.__webglDepthbuffer[C];i.bindRenderbuffer(i.RENDERBUFFER,L),i.framebufferRenderbuffer(i.FRAMEBUFFER,T,i.RENDERBUFFER,L)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),le(M.__webglDepthbuffer,y,!1);else{let C=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,T=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,T),i.framebufferRenderbuffer(i.FRAMEBUFFER,C,i.RENDERBUFFER,T)}t.bindFramebuffer(i.FRAMEBUFFER,null)}let Ae=[],ae=[];function de(y){return Math.min(r.maxSamples,y.samples)}function ye(y){let M=n.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ve(y,M){let I=y.colorSpace,C=y.format,T=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||I!==di&&I!==Ei&&(Je.getTransfer(I)===it?C===pn&&T===Mn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),M}function A(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=function(){let y=k;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),k+=1,y},this.resetTextureUnits=function(){k=0},this.setTexture2D=W,this.setTexture2DArray=function(y,M){let I=n.get(y);y.version>0&&I.__version!==y.version?Z(I,y,M):t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+M)},this.setTexture3D=function(y,M){let I=n.get(y);y.version>0&&I.__version!==y.version?Z(I,y,M):t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+M)},this.setTextureCube=function(y,M){let I=n.get(y);y.version>0&&I.__version!==y.version?(function(C,T,L){if(T.image.length!==6)return;let S=ee(C,T),U=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+L);let N=n.get(U);if(U.version!==N.__version||S===!0){t.activeTexture(i.TEXTURE0+L);let Q=Je.getPrimaries(Je.workingColorSpace),H=T.colorSpace===Ei?null:Je.getPrimaries(T.colorSpace),J=T.colorSpace===Ei||Q===H?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let K=T.isCompressedTexture||T.image[0].isCompressedTexture,ie=T.image[0]&&T.image[0].isDataTexture,pe=[];for(let we=0;we<6;we++)pe[we]=K||ie?ie?T.image[we].image:T.image[we]:x(T.image[we],!0,r.maxCubemapSize),pe[we]=ve(T,pe[we]);let _e=pe[0],Ee=a.convert(T.format,T.colorSpace),Ie=a.convert(T.type),je=v(T.internalFormat,Ee,Ie,T.colorSpace),Pe=T.isVideoTexture!==!0,Me=N.__version===void 0||S===!0,Ge=U.dataReady,et,$e=P(T,_e);if(Y(i.TEXTURE_CUBE_MAP,T),K){Pe&&Me&&t.texStorage2D(i.TEXTURE_CUBE_MAP,$e,je,_e.width,_e.height);for(let we=0;we<6;we++){et=pe[we].mipmaps;for(let Ve=0;Ve<et.length;Ve++){let tt=et[Ve];T.format!==pn?Ee!==null?Pe?Ge&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ve,0,0,tt.width,tt.height,Ee,tt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ve,je,tt.width,tt.height,0,tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ve,0,0,tt.width,tt.height,Ee,Ie,tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ve,je,tt.width,tt.height,0,Ee,Ie,tt.data)}}}else{if(et=T.mipmaps,Pe&&Me){et.length>0&&$e++;let we=A(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,$e,je,we.width,we.height)}for(let we=0;we<6;we++)if(ie){Pe?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,pe[we].width,pe[we].height,Ee,Ie,pe[we].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,je,pe[we].width,pe[we].height,0,Ee,Ie,pe[we].data);for(let Ve=0;Ve<et.length;Ve++){let tt=et[Ve].image[we].image;Pe?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ve+1,0,0,tt.width,tt.height,Ee,Ie,tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ve+1,je,tt.width,tt.height,0,Ee,Ie,tt.data)}}else{Pe?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,0,0,Ee,Ie,pe[we]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,je,Ee,Ie,pe[we]);for(let Ve=0;Ve<et.length;Ve++){let tt=et[Ve];Pe?Ge&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ve+1,0,0,Ee,Ie,tt.image[we]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,Ve+1,je,Ee,Ie,tt.image[we])}}}m(T)&&g(i.TEXTURE_CUBE_MAP),N.__version=U.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version})(I,y,M):t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+M)},this.rebindTextures=function(y,M,I){let C=n.get(y);M!==void 0&&oe(C.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&Se(y)},this.setupRenderTarget=function(y){let M=y.texture,I=n.get(y),C=n.get(M);y.addEventListener("dispose",D);let T=y.textures,L=y.isWebGLCubeRenderTarget===!0,S=T.length>1;if(S||(C.__webglTexture===void 0&&(C.__webglTexture=i.createTexture()),C.__version=M.version,s.memory.textures++),L){I.__webglFramebuffer=[];for(let U=0;U<6;U++)if(M.mipmaps&&M.mipmaps.length>0){I.__webglFramebuffer[U]=[];for(let N=0;N<M.mipmaps.length;N++)I.__webglFramebuffer[U][N]=i.createFramebuffer()}else I.__webglFramebuffer[U]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){I.__webglFramebuffer=[];for(let U=0;U<M.mipmaps.length;U++)I.__webglFramebuffer[U]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(S)for(let U=0,N=T.length;U<N;U++){let Q=n.get(T[U]);Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture(),s.memory.textures++)}if(y.samples>0&&ye(y)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let U=0;U<T.length;U++){let N=T[U];I.__webglColorRenderbuffer[U]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[U]);let Q=a.convert(N.format,N.colorSpace),H=a.convert(N.type),J=v(N.internalFormat,Q,H,N.colorSpace,y.isXRRenderTarget===!0),K=de(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,K,J,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+U,i.RENDERBUFFER,I.__webglColorRenderbuffer[U])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),le(I.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(L){t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture),Y(i.TEXTURE_CUBE_MAP,M);for(let U=0;U<6;U++)if(M.mipmaps&&M.mipmaps.length>0)for(let N=0;N<M.mipmaps.length;N++)oe(I.__webglFramebuffer[U][N],y,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+U,N);else oe(I.__webglFramebuffer[U],y,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+U,0);m(M)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(S){for(let U=0,N=T.length;U<N;U++){let Q=T[U],H=n.get(Q);t.bindTexture(i.TEXTURE_2D,H.__webglTexture),Y(i.TEXTURE_2D,Q),oe(I.__webglFramebuffer,y,Q,i.COLOR_ATTACHMENT0+U,i.TEXTURE_2D,0),m(Q)&&g(i.TEXTURE_2D)}t.unbindTexture()}else{let U=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(U=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(U,C.__webglTexture),Y(U,M),M.mipmaps&&M.mipmaps.length>0)for(let N=0;N<M.mipmaps.length;N++)oe(I.__webglFramebuffer[N],y,M,i.COLOR_ATTACHMENT0,U,N);else oe(I.__webglFramebuffer,y,M,i.COLOR_ATTACHMENT0,U,0);m(M)&&g(U),t.unbindTexture()}y.depthBuffer&&Se(y)},this.updateRenderTargetMipmap=function(y){let M=y.textures;for(let I=0,C=M.length;I<C;I++){let T=M[I];if(m(T)){let L=_(y),S=n.get(T).__webglTexture;t.bindTexture(L,S),g(L),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(y){if(y.samples>0){if(ye(y)===!1){let M=y.textures,I=y.width,C=y.height,T=i.COLOR_BUFFER_BIT,L=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,S=n.get(y),U=M.length>1;if(U)for(let N=0;N<M.length;N++)t.bindFramebuffer(i.FRAMEBUFFER,S.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+N,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+N,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,S.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,S.__webglFramebuffer);for(let N=0;N<M.length;N++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(T|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(T|=i.STENCIL_BUFFER_BIT)),U){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,S.__webglColorRenderbuffer[N]);let Q=n.get(M[N]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Q,0)}i.blitFramebuffer(0,0,I,C,0,0,I,C,T,i.NEAREST),l===!0&&(Ae.length=0,ae.length=0,Ae.push(i.COLOR_ATTACHMENT0+N),y.depthBuffer&&y.resolveDepthBuffer===!1&&(Ae.push(L),ae.push(L),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ae)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ae))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),U)for(let N=0;N<M.length;N++){t.bindFramebuffer(i.FRAMEBUFFER,S.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+N,i.RENDERBUFFER,S.__webglColorRenderbuffer[N]);let Q=n.get(M[N]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+N,i.TEXTURE_2D,Q,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,S.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){let M=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}},this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=ye}function Qm(i,e){return{convert:function(t,n=Ei){let r,a=Je.getTransfer(n);if(t===Mn)return i.UNSIGNED_BYTE;if(t===Ys)return i.UNSIGNED_SHORT_4_4_4_4;if(t===js)return i.UNSIGNED_SHORT_5_5_5_1;if(t===yl)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===vl)return i.BYTE;if(t===xl)return i.SHORT;if(t===cr)return i.UNSIGNED_SHORT;if(t===Xs)return i.INT;if(t===ti)return i.UNSIGNED_INT;if(t===Sn)return i.FLOAT;if(t===hr)return i.HALF_FLOAT;if(t===uu)return i.ALPHA;if(t===du)return i.RGB;if(t===pn)return i.RGBA;if(t===pu)return i.LUMINANCE;if(t===mu)return i.LUMINANCE_ALPHA;if(t===Qi)return i.DEPTH_COMPONENT;if(t===ui)return i.DEPTH_STENCIL;if(t===bl)return i.RED;if(t===qs)return i.RED_INTEGER;if(t===fu)return i.RG;if(t===Ml)return i.RG_INTEGER;if(t===Sl)return i.RGBA_INTEGER;if(t===Zs||t===Ks||t===Js||t===$s)if(a===it){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Zs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Zs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Ks)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===$s)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===wl||t===Tl||t===El||t===Al){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===wl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Tl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===El)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Al)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Rl||t===Cl||t===Pl){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===Rl||t===Cl)return a===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Pl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===Ll||t===Il||t===Ul||t===Dl||t===Nl||t===Fl||t===Ol||t===Bl||t===zl||t===Hl||t===kl||t===Gl||t===Vl||t===Wl){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Ll)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Il)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Ul)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Dl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Nl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Fl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Ol)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Bl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===zl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Hl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===kl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Gl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Vl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Wl)return a===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Qs||t===Xl||t===Yl){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Qs)return a===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===Xl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Yl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===gu||t===jl||t===ql||t===Zl){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Qs)return r.COMPRESSED_RED_RGTC1_EXT;if(t===jl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===ql)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Zl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===ur?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}var ef={type:"move"},da=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,s=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),g=this._getHandJoint(c,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,f=.005;c.inputState.pinching&&d>p+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ef)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new wt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},fc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let r=new Pt;e.properties.get(r).__webglTexture=t.texture,t.depthNear==n.depthNear&&t.depthFar==n.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new gt({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ke(new xn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},gc=class extends Fn{constructor(e,t){super();let n=this,r=null,a=1,s=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,f=null,x=new fc,m=t.getContextAttributes(),g=null,_=null,v=[],b=[],P=new ce,E=null,D=new kt;D.viewport=new lt;let F=new kt;F.viewport=new lt;let k=[D,F],W=new Ns,X=null,V=null;function $(ae){let de=b.indexOf(ae.inputSource);if(de===-1)return;let ye=v[de];ye!==void 0&&(ye.update(ae.inputSource,ae.frame,c||s),ye.dispatchEvent({type:ae.type,data:ae.inputSource}))}function Y(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",ee);for(let ae=0;ae<v.length;ae++){let de=b[ae];de!==null&&(b[ae]=null,v[ae].disconnect(de))}X=null,V=null,x.reset(),e.setRenderTarget(g),p=null,d=null,u=null,r=null,_=null,Ae.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}function ee(ae){for(let de=0;de<ae.removed.length;de++){let ye=ae.removed[de],ve=b.indexOf(ye);ve>=0&&(b[ve]=null,v[ve].disconnect(ye))}for(let de=0;de<ae.added.length;de++){let ye=ae.added[de],ve=b.indexOf(ye);if(ve===-1){for(let y=0;y<v.length;y++){if(y>=b.length){b.push(ye),ve=y;break}if(b[y]===null){b[y]=ye,ve=y;break}}if(ve===-1)break}let A=v[ve];A&&A.connect(ye)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let de=v[ae];return de===void 0&&(de=new da,v[ae]=de),de.getTargetRaySpace()},this.getControllerGrip=function(ae){let de=v[ae];return de===void 0&&(de=new da,v[ae]=de),de.getGripSpace()},this.getHand=function(ae){let de=v[ae];return de===void 0&&(de=new da,v[ae]=de),de.getHandSpace()},this.setFramebufferScaleFactor=function(ae){a=ae,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ae){o=ae,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(ae){c=ae},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return f},this.getSession=function(){return r},this.setSession=async function(ae){if(r=ae,r!==null){if(g=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",ee),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0){let de={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,de),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new vn(p.framebufferWidth,p.framebufferHeight,{format:pn,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let de=null,ye=null,ve=null;m.depth&&(ve=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=m.stencil?ui:Qi,ye=m.stencil?ur:ti);let A={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:a};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(A),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new vn(d.textureWidth,d.textureHeight,{format:pn,type:Mn,depthTexture:new Xr(d.textureWidth,d.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await r.requestReferenceSpace(o),Ae.setContext(r),Ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};let Z=new R,oe=new R;function le(ae,de){de===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(de.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(r===null)return;let de=ae.near,ye=ae.far;x.texture!==null&&(x.depthNear>0&&(de=x.depthNear),x.depthFar>0&&(ye=x.depthFar)),W.near=F.near=D.near=de,W.far=F.far=D.far=ye,X===W.near&&V===W.far||(r.updateRenderState({depthNear:W.near,depthFar:W.far}),X=W.near,V=W.far),D.layers.mask=2|ae.layers.mask,F.layers.mask=4|ae.layers.mask,W.layers.mask=D.layers.mask|F.layers.mask;let ve=ae.parent,A=W.cameras;le(W,ve);for(let y=0;y<A.length;y++)le(A[y],ve);A.length===2?(function(y,M,I){Z.setFromMatrixPosition(M.matrixWorld),oe.setFromMatrixPosition(I.matrixWorld);let C=Z.distanceTo(oe),T=M.projectionMatrix.elements,L=I.projectionMatrix.elements,S=T[14]/(T[10]-1),U=T[14]/(T[10]+1),N=(T[9]+1)/T[5],Q=(T[9]-1)/T[5],H=(T[8]-1)/T[0],J=(L[8]+1)/L[0],K=S*H,ie=S*J,pe=C/(-H+J),_e=pe*-H;if(M.matrixWorld.decompose(y.position,y.quaternion,y.scale),y.translateX(_e),y.translateZ(pe),y.matrixWorld.compose(y.position,y.quaternion,y.scale),y.matrixWorldInverse.copy(y.matrixWorld).invert(),T[10]===-1)y.projectionMatrix.copy(M.projectionMatrix),y.projectionMatrixInverse.copy(M.projectionMatrixInverse);else{let Ee=S+pe,Ie=U+pe,je=K-_e,Pe=ie+(C-_e),Me=N*U/Ie*Ee,Ge=Q*U/Ie*Ee;y.projectionMatrix.makePerspective(je,Pe,Me,Ge,Ee,Ie),y.projectionMatrixInverse.copy(y.projectionMatrix).invert()}})(W,D,F):W.projectionMatrix.copy(D.projectionMatrix),(function(y,M,I){I===null?y.matrix.copy(M.matrixWorld):(y.matrix.copy(I.matrixWorld),y.matrix.invert(),y.matrix.multiply(M.matrixWorld)),y.matrix.decompose(y.position,y.quaternion,y.scale),y.updateMatrixWorld(!0),y.projectionMatrix.copy(M.projectionMatrix),y.projectionMatrixInverse.copy(M.projectionMatrixInverse),y.isPerspectiveCamera&&(y.fov=2*Qa*Math.atan(1/y.projectionMatrix.elements[5]),y.zoom=1)})(ae,W,ve)},this.getCamera=function(){return W},this.getFoveation=function(){if(d!==null||p!==null)return l},this.setFoveation=function(ae){l=ae,d!==null&&(d.fixedFoveation=ae),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ae)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(W)};let Se=null,Ae=new ad;Ae.setAnimationLoop((function(ae,de){if(h=de.getViewerPose(c||s),f=de,h!==null){let ye=h.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let ve=!1;ye.length!==W.cameras.length&&(W.cameras.length=0,ve=!0);for(let y=0;y<ye.length;y++){let M=ye[y],I=null;if(p!==null)I=p.getViewport(M);else{let T=u.getViewSubImage(d,M);I=T.viewport,y===0&&(e.setRenderTargetTextures(_,T.colorTexture,d.ignoreDepthValues?void 0:T.depthStencilTexture),e.setRenderTarget(_))}let C=k[y];C===void 0&&(C=new kt,C.layers.enable(y),C.viewport=new lt,k[y]=C),C.matrix.fromArray(M.transform.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale),C.projectionMatrix.fromArray(M.projectionMatrix),C.projectionMatrixInverse.copy(C.projectionMatrix).invert(),C.viewport.set(I.x,I.y,I.width,I.height),y===0&&(W.matrix.copy(C.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),ve===!0&&W.cameras.push(C)}let A=r.enabledFeatures;if(A&&A.includes("depth-sensing")){let y=u.getDepthInformation(ye[0]);y&&y.isValid&&y.texture&&x.init(e,y,r.renderState)}}for(let ye=0;ye<v.length;ye++){let ve=b[ye],A=v[ye];ve!==null&&A!==void 0&&A.update(ve,de,c||s)}Se&&Se(ae,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),f=null})),this.setAnimationLoop=function(ae){Se=ae},this.dispose=function(){}}},Pi=new dn,tf=new ze;function nf(i,e){function t(r,a){r.matrixAutoUpdate===!0&&r.updateMatrix(),a.value.copy(r.matrix)}function n(r,a){r.opacity.value=a.opacity,a.color&&r.diffuse.value.copy(a.color),a.emissive&&r.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(r.map.value=a.map,t(a.map,r.mapTransform)),a.alphaMap&&(r.alphaMap.value=a.alphaMap,t(a.alphaMap,r.alphaMapTransform)),a.bumpMap&&(r.bumpMap.value=a.bumpMap,t(a.bumpMap,r.bumpMapTransform),r.bumpScale.value=a.bumpScale,a.side===Bt&&(r.bumpScale.value*=-1)),a.normalMap&&(r.normalMap.value=a.normalMap,t(a.normalMap,r.normalMapTransform),r.normalScale.value.copy(a.normalScale),a.side===Bt&&r.normalScale.value.negate()),a.displacementMap&&(r.displacementMap.value=a.displacementMap,t(a.displacementMap,r.displacementMapTransform),r.displacementScale.value=a.displacementScale,r.displacementBias.value=a.displacementBias),a.emissiveMap&&(r.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,r.emissiveMapTransform)),a.specularMap&&(r.specularMap.value=a.specularMap,t(a.specularMap,r.specularMapTransform)),a.alphaTest>0&&(r.alphaTest.value=a.alphaTest);let s=e.get(a),o=s.envMap,l=s.envMapRotation;o&&(r.envMap.value=o,Pi.copy(l),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),r.envMapRotation.value.setFromMatrix4(tf.makeRotationFromEuler(Pi)),r.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=a.reflectivity,r.ior.value=a.ior,r.refractionRatio.value=a.refractionRatio),a.lightMap&&(r.lightMap.value=a.lightMap,r.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,r.lightMapTransform)),a.aoMap&&(r.aoMap.value=a.aoMap,r.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,a){a.color.getRGB(r.fogColor.value,Ql(i)),a.isFog?(r.fogNear.value=a.near,r.fogFar.value=a.far):a.isFogExp2&&(r.fogDensity.value=a.density)},refreshMaterialUniforms:function(r,a,s,o,l){a.isMeshBasicMaterial||a.isMeshLambertMaterial?n(r,a):a.isMeshToonMaterial?(n(r,a),(function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)})(r,a)):a.isMeshPhongMaterial?(n(r,a),(function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)})(r,a)):a.isMeshStandardMaterial?(n(r,a),(function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)})(r,a),a.isMeshPhysicalMaterial&&(function(c,h,u){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Bt&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=u.texture,c.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))})(r,a,l)):a.isMeshMatcapMaterial?(n(r,a),(function(c,h){h.matcap&&(c.matcap.value=h.matcap)})(r,a)):a.isMeshDepthMaterial?n(r,a):a.isMeshDistanceMaterial?(n(r,a),(function(c,h){let u=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(u.matrixWorld),c.nearDistance.value=u.shadow.camera.near,c.farDistance.value=u.shadow.camera.far})(r,a)):a.isMeshNormalMaterial?n(r,a):a.isLineBasicMaterial?((function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))})(r,a),a.isLineDashedMaterial&&(function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale})(r,a)):a.isPointsMaterial?(function(c,h,u,d){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*u,c.scale.value=.5*d,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,a,s,o):a.isSpriteMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)})(r,a):a.isShadowMaterial?(r.color.value.copy(a.color),r.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function rf(i,e,t,n){let r={},a={},s=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,d,p,f){let x=u.value,m=d+"_"+p;if(f[m]===void 0)return f[m]=typeof x=="number"||typeof x=="boolean"?x:x.clone(),!0;{let g=f[m];if(typeof x=="number"||typeof x=="boolean"){if(g!==x)return f[m]=x,!0}else if(g.equals(x)===!1)return g.copy(x),!0}return!1}function c(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=s.indexOf(d.__bindingPointIndex);s.splice(p,1),i.deleteBuffer(r[d.id]),delete r[d.id],delete a[d.id]}return{bind:function(u,d){let p=d.program;n.uniformBlockBinding(u,p)},update:function(u,d){let p=r[u.id];p===void 0&&((function(m){let g=m.uniforms,_=0,v=16;for(let P=0,E=g.length;P<E;P++){let D=Array.isArray(g[P])?g[P]:[g[P]];for(let F=0,k=D.length;F<k;F++){let W=D[F],X=Array.isArray(W.value)?W.value:[W.value];for(let V=0,$=X.length;V<$;V++){let Y=c(X[V]),ee=_%v,Z=ee%Y.boundary,oe=ee+Z;_+=Z,oe!==0&&v-oe<Y.storage&&(_+=v-oe),W.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=_,_+=Y.storage}}}let b=_%v;b>0&&(_+=v-b),m.__size=_,m.__cache={}})(u),p=(function(m){let g=(function(){for(let P=0;P<o;P++)if(s.indexOf(P)===-1)return s.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();m.__bindingPointIndex=g;let _=i.createBuffer(),v=m.__size,b=m.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,v,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,g,_),_})(u),r[u.id]=p,u.addEventListener("dispose",h));let f=d.program;n.updateUBOMapping(u,f);let x=e.render.frame;a[u.id]!==x&&((function(m){let g=r[m.id],_=m.uniforms,v=m.__cache;i.bindBuffer(i.UNIFORM_BUFFER,g);for(let b=0,P=_.length;b<P;b++){let E=Array.isArray(_[b])?_[b]:[_[b]];for(let D=0,F=E.length;D<F;D++){let k=E[D];if(l(k,b,D,v)===!0){let W=k.__offset,X=Array.isArray(k.value)?k.value:[k.value],V=0;for(let $=0;$<X.length;$++){let Y=X[$],ee=c(Y);typeof Y=="number"||typeof Y=="boolean"?(k.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,W+V,k.__data)):Y.isMatrix3?(k.__data[0]=Y.elements[0],k.__data[1]=Y.elements[1],k.__data[2]=Y.elements[2],k.__data[3]=0,k.__data[4]=Y.elements[3],k.__data[5]=Y.elements[4],k.__data[6]=Y.elements[5],k.__data[7]=0,k.__data[8]=Y.elements[6],k.__data[9]=Y.elements[7],k.__data[10]=Y.elements[8],k.__data[11]=0):(Y.toArray(k.__data,V),V+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)})(u),a[u.id]=x)},dispose:function(){for(let u in r)i.deleteBuffer(r[u]);s=[],r={},a={}}}}var so=class{constructor(e={}){let{canvas:t=Au(),context:n=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=s;let f=new Uint32Array(4),x=new Int32Array(4),m=null,g=null,_=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dt,this.toneMapping=Bn,this.toneMappingExposure=1;let b=this,P=!1,E=0,D=0,F=null,k=-1,W=null,X=new lt,V=new lt,$=null,Y=new Ue(0),ee=0,Z=t.width,oe=t.height,le=1,Se=null,Ae=null,ae=new lt(0,0,Z,oe),de=new lt(0,0,Z,oe),ye=!1,ve=new gi,A=!1,y=!1,M=new ze,I=new ze,C=new R,T=new lt,L={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},S=!1;function U(){return F===null?le:1}let N,Q,H,J,K,ie,pe,_e,Ee,Ie,je,Pe,Me,Ge,et,$e,we,Ve,tt,Hn,ii,Vt,zt,Tn,z=n;function ri(w,G){return t.getContext(w,G)}try{let w={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"171"}`),t.addEventListener("webglcontextlost",Di,!1),t.addEventListener("webglcontextrestored",_a,!1),t.addEventListener("webglcontextcreationerror",va,!1),z===null){let G="webgl2";if(z=ri(G,w),z===null)throw ri(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}function ga(){N=new Op(z),N.init(),Vt=new Qm(z,N),Q=new Up(z,N,e,Vt),H=new Jm(z,N),Q.reverseDepthBuffer&&d&&H.buffers.depth.setReversed(!0),J=new Hp(z),K=new km,ie=new $m(z,N,H,K,Q,Vt,J),pe=new Np(b),_e=new Fp(b),Ee=new Rp(z),zt=new Lp(z,Ee),Ie=new Bp(z,Ee,J,zt),je=new Gp(z,Ie,Ee,J),tt=new kp(z,Q,ie),$e=new Dp(K),Pe=new Hm(b,pe,_e,N,Q,zt,$e),Me=new nf(b,K),Ge=new Vm,et=new qm(N),Ve=new Pp(b,pe,_e,H,je,p,l),we=new Zm(b,je,Q),Tn=new rf(z,J,Q,H),Hn=new Ip(z,N,J),ii=new zp(z,N,J),J.programs=Pe.programs,b.capabilities=Q,b.extensions=N,b.properties=K,b.renderLists=Ge,b.shadowMap=we,b.state=H,b.info=J}ga();let dt=new gc(b,z);function Di(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function _a(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;let w=J.autoReset,G=we.enabled,q=we.autoUpdate,te=we.needsUpdate,j=we.type;ga(),J.autoReset=w,we.enabled=G,we.autoUpdate=q,we.needsUpdate=te,we.type=j}function va(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function xa(w){let G=w.target;G.removeEventListener("dispose",xa),(function(q){(function(te){let j=K.get(te).programs;j!==void 0&&(j.forEach((function(re){Pe.releaseProgram(re)})),te.isShaderMaterial&&Pe.releaseShaderCache(te))})(q),K.remove(q)})(G)}function ya(w,G,q){w.transparent===!0&&w.side===bn&&w.forceSinglePass===!1?(w.side=Bt,w.needsUpdate=!0,Xe(w,G,q),w.side=ln,w.needsUpdate=!0,Xe(w,G,q),w.side=bn):Xe(w,G,q)}this.xr=dt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let w=N.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=N.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(w){w!==void 0&&(le=w,this.setSize(Z,oe,!1))},this.getSize=function(w){return w.set(Z,oe)},this.setSize=function(w,G,q=!0){dt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(Z=w,oe=G,t.width=Math.floor(w*le),t.height=Math.floor(G*le),q===!0&&(t.style.width=w+"px",t.style.height=G+"px"),this.setViewport(0,0,w,G))},this.getDrawingBufferSize=function(w){return w.set(Z*le,oe*le).floor()},this.setDrawingBufferSize=function(w,G,q){Z=w,oe=G,le=q,t.width=Math.floor(w*q),t.height=Math.floor(G*q),this.setViewport(0,0,w,G)},this.getCurrentViewport=function(w){return w.copy(X)},this.getViewport=function(w){return w.copy(ae)},this.setViewport=function(w,G,q,te){w.isVector4?ae.set(w.x,w.y,w.z,w.w):ae.set(w,G,q,te),H.viewport(X.copy(ae).multiplyScalar(le).round())},this.getScissor=function(w){return w.copy(de)},this.setScissor=function(w,G,q,te){w.isVector4?de.set(w.x,w.y,w.z,w.w):de.set(w,G,q,te),H.scissor(V.copy(de).multiplyScalar(le).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(w){H.setScissorTest(ye=w)},this.setOpaqueSort=function(w){Se=w},this.setTransparentSort=function(w){Ae=w},this.getClearColor=function(w){return w.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor.apply(Ve,arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha.apply(Ve,arguments)},this.clear=function(w=!0,G=!0,q=!0){let te=0;if(w){let j=!1;if(F!==null){let re=F.texture.format;j=re===Sl||re===Ml||re===qs}if(j){let re=F.texture.type,fe=re===Mn||re===ti||re===cr||re===ur||re===Ys||re===js,be=Ve.getClearColor(),Re=Ve.getClearAlpha(),De=be.r,Le=be.g,Ne=be.b;fe?(f[0]=De,f[1]=Le,f[2]=Ne,f[3]=Re,z.clearBufferuiv(z.COLOR,0,f)):(x[0]=De,x[1]=Le,x[2]=Ne,x[3]=Re,z.clearBufferiv(z.COLOR,0,x))}else te|=z.COLOR_BUFFER_BIT}G&&(te|=z.DEPTH_BUFFER_BIT),q&&(te|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Di,!1),t.removeEventListener("webglcontextrestored",_a,!1),t.removeEventListener("webglcontextcreationerror",va,!1),Ve.dispose(),Ge.dispose(),et.dispose(),K.dispose(),pe.dispose(),_e.dispose(),je.dispose(),zt.dispose(),Tn.dispose(),Pe.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",ne),dt.removeEventListener("sessionend",B),O.stop()},this.renderBufferDirect=function(w,G,q,te,j,re){G===null&&(G=L);let fe=j.isMesh&&j.matrixWorld.determinant()<0,be=(function(rt,pt,Ft,We,Be){pt.isScene!==!0&&(pt=L),ie.resetTextureUnits();let Qt=pt.fog,bo=We.isMeshStandardMaterial?pt.environment:null,ba=F===null?b.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:di,kn=(We.isMeshStandardMaterial?_e:pe).get(We.envMap||bo),mn=We.vertexColors===!0&&!!Ft.attributes.color&&Ft.attributes.color.itemSize===4,Ni=!!Ft.attributes.tangent&&(!!We.normalMap||We.anisotropy>0),En=!!Ft.morphAttributes.position,Mo=!!Ft.morphAttributes.normal,Fi=!!Ft.morphAttributes.color,Fc=Bn;We.toneMapped&&(F!==null&&F.isXRRenderTarget!==!0||(Fc=b.toneMapping));let Oc=Ft.morphAttributes.position||Ft.morphAttributes.normal||Ft.morphAttributes.color,Gd=Oc!==void 0?Oc.length:0,qe=K.get(We),Vd=g.state.lights;if(A===!0&&(y===!0||rt!==W)){let qt=rt===W&&We.id===k;$e.setState(We,rt,qt)}let en=!1;We.version===qe.__version?qe.needsLights&&qe.lightsStateVersion!==Vd.state.version||qe.outputColorSpace!==ba||Be.isBatchedMesh&&qe.batching===!1?en=!0:Be.isBatchedMesh||qe.batching!==!0?Be.isBatchedMesh&&qe.batchingColor===!0&&Be.colorTexture===null||Be.isBatchedMesh&&qe.batchingColor===!1&&Be.colorTexture!==null||Be.isInstancedMesh&&qe.instancing===!1?en=!0:Be.isInstancedMesh||qe.instancing!==!0?Be.isSkinnedMesh&&qe.skinning===!1?en=!0:Be.isSkinnedMesh||qe.skinning!==!0?Be.isInstancedMesh&&qe.instancingColor===!0&&Be.instanceColor===null||Be.isInstancedMesh&&qe.instancingColor===!1&&Be.instanceColor!==null||Be.isInstancedMesh&&qe.instancingMorph===!0&&Be.morphTexture===null||Be.isInstancedMesh&&qe.instancingMorph===!1&&Be.morphTexture!==null||qe.envMap!==kn||We.fog===!0&&qe.fog!==Qt?en=!0:qe.numClippingPlanes===void 0||qe.numClippingPlanes===$e.numPlanes&&qe.numIntersection===$e.numIntersection?(qe.vertexAlphas!==mn||qe.vertexTangents!==Ni||qe.morphTargets!==En||qe.morphNormals!==Mo||qe.morphColors!==Fi||qe.toneMapping!==Fc||qe.morphTargetsCount!==Gd)&&(en=!0):en=!0:en=!0:en=!0:en=!0:(en=!0,qe.__version=We.version);let ai=qe.currentProgram;en===!0&&(ai=Xe(We,pt,Be));let Bc=!1,Mr=!1,So=!1,mt=ai.getUniforms(),Gn=qe.uniforms;if(H.useProgram(ai.program)&&(Bc=!0,Mr=!0,So=!0),We.id!==k&&(k=We.id,Mr=!0),Bc||W!==rt){H.buffers.depth.getReversed()?(M.copy(rt.projectionMatrix),Cu(M),Pu(M),mt.setValue(z,"projectionMatrix",M)):mt.setValue(z,"projectionMatrix",rt.projectionMatrix),mt.setValue(z,"viewMatrix",rt.matrixWorldInverse);let qt=mt.map.cameraPosition;qt!==void 0&&qt.setValue(z,C.setFromMatrixPosition(rt.matrixWorld)),Q.logarithmicDepthBuffer&&mt.setValue(z,"logDepthBufFC",2/(Math.log(rt.far+1)/Math.LN2)),(We.isMeshPhongMaterial||We.isMeshToonMaterial||We.isMeshLambertMaterial||We.isMeshBasicMaterial||We.isMeshStandardMaterial||We.isShaderMaterial)&&mt.setValue(z,"isOrthographic",rt.isOrthographicCamera===!0),W!==rt&&(W=rt,Mr=!0,So=!0)}if(Be.isSkinnedMesh){mt.setOptional(z,Be,"bindMatrix"),mt.setOptional(z,Be,"bindMatrixInverse");let qt=Be.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),mt.setValue(z,"boneTexture",qt.boneTexture,ie))}Be.isBatchedMesh&&(mt.setOptional(z,Be,"batchingTexture"),mt.setValue(z,"batchingTexture",Be._matricesTexture,ie),mt.setOptional(z,Be,"batchingIdTexture"),mt.setValue(z,"batchingIdTexture",Be._indirectTexture,ie),mt.setOptional(z,Be,"batchingColorTexture"),Be._colorsTexture!==null&&mt.setValue(z,"batchingColorTexture",Be._colorsTexture,ie));let wo=Ft.morphAttributes;wo.position===void 0&&wo.normal===void 0&&wo.color===void 0||tt.update(Be,Ft,ai),(Mr||qe.receiveShadow!==Be.receiveShadow)&&(qe.receiveShadow=Be.receiveShadow,mt.setValue(z,"receiveShadow",Be.receiveShadow)),We.isMeshGouraudMaterial&&We.envMap!==null&&(Gn.envMap.value=kn,Gn.flipEnvMap.value=kn.isCubeTexture&&kn.isRenderTargetTexture===!1?-1:1),We.isMeshStandardMaterial&&We.envMap===null&&pt.environment!==null&&(Gn.envMapIntensity.value=pt.environmentIntensity),Mr&&(mt.setValue(z,"toneMappingExposure",b.toneMappingExposure),qe.needsLights&&(tn=So,(fn=Gn).ambientLightColor.needsUpdate=tn,fn.lightProbe.needsUpdate=tn,fn.directionalLights.needsUpdate=tn,fn.directionalLightShadows.needsUpdate=tn,fn.pointLights.needsUpdate=tn,fn.pointLightShadows.needsUpdate=tn,fn.spotLights.needsUpdate=tn,fn.spotLightShadows.needsUpdate=tn,fn.rectAreaLights.needsUpdate=tn,fn.hemisphereLights.needsUpdate=tn),Qt&&We.fog===!0&&Me.refreshFogUniforms(Gn,Qt),Me.refreshMaterialUniforms(Gn,We,le,oe,g.state.transmissionRenderTarget[rt.id]),mr.upload(z,Oe(qe),Gn,ie));var fn,tn;if(We.isShaderMaterial&&We.uniformsNeedUpdate===!0&&(mr.upload(z,Oe(qe),Gn,ie),We.uniformsNeedUpdate=!1),We.isSpriteMaterial&&mt.setValue(z,"center",Be.center),mt.setValue(z,"modelViewMatrix",Be.modelViewMatrix),mt.setValue(z,"normalMatrix",Be.normalMatrix),mt.setValue(z,"modelMatrix",Be.matrixWorld),We.isShaderMaterial||We.isRawShaderMaterial){let qt=We.uniformsGroups;for(let To=0,Wd=qt.length;To<Wd;To++){let zc=qt[To];Tn.update(zc,ai),Tn.bind(zc,ai)}}return ai})(w,G,q,te,j);H.setMaterial(te,fe);let Re=q.index,De=1;if(te.wireframe===!0){if(Re=Ie.getWireframeAttribute(q),Re===void 0)return;De=2}let Le=q.drawRange,Ne=q.attributes.position,He=Le.start*De,nt=(Le.start+Le.count)*De;re!==null&&(He=Math.max(He,re.start*De),nt=Math.min(nt,(re.start+re.count)*De)),Re!==null?(He=Math.max(He,0),nt=Math.min(nt,Re.count)):Ne!=null&&(He=Math.max(He,0),nt=Math.min(nt,Ne.count));let Ze=nt-He;if(Ze<0||Ze===1/0)return;let st;zt.setup(j,te,be,q,Re);let ct=Hn;if(Re!==null&&(st=Ee.get(Re),ct=ii,ct.setIndex(st)),j.isMesh)te.wireframe===!0?(H.setLineWidth(te.wireframeLinewidth*U()),ct.setMode(z.LINES)):ct.setMode(z.TRIANGLES);else if(j.isLine){let rt=te.linewidth;rt===void 0&&(rt=1),H.setLineWidth(rt*U()),j.isLineSegments?ct.setMode(z.LINES):j.isLineLoop?ct.setMode(z.LINE_LOOP):ct.setMode(z.LINE_STRIP)}else j.isPoints?ct.setMode(z.POINTS):j.isSprite&&ct.setMode(z.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)ct.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(N.get("WEBGL_multi_draw"))ct.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let rt=j._multiDrawStarts,pt=j._multiDrawCounts,Ft=j._multiDrawCount,We=Re?Ee.get(Re).bytesPerElement:1,Be=K.get(te).currentProgram.getUniforms();for(let Qt=0;Qt<Ft;Qt++)Be.setValue(z,"_gl_DrawID",Qt),ct.render(rt[Qt]/We,pt[Qt])}else if(j.isInstancedMesh)ct.renderInstances(He,Ze,j.count);else if(q.isInstancedBufferGeometry){let rt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,pt=Math.min(q.instanceCount,rt);ct.renderInstances(He,Ze,pt)}else ct.render(He,Ze)},this.compile=function(w,G,q=null){q===null&&(q=w),g=et.get(q),g.init(G),v.push(g),q.traverseVisible((function(j){j.isLight&&j.layers.test(G.layers)&&(g.pushLight(j),j.castShadow&&g.pushShadow(j))})),w!==q&&w.traverseVisible((function(j){j.isLight&&j.layers.test(G.layers)&&(g.pushLight(j),j.castShadow&&g.pushShadow(j))})),g.setupLights();let te=new Set;return w.traverse((function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let re=j.material;if(re)if(Array.isArray(re))for(let fe=0;fe<re.length;fe++){let be=re[fe];ya(be,q,j),te.add(be)}else ya(re,q,j),te.add(re)})),v.pop(),g=null,te},this.compileAsync=function(w,G,q=null){let te=this.compile(w,G,q);return new Promise((j=>{function re(){te.forEach((function(fe){K.get(fe).currentProgram.isReady()&&te.delete(fe)})),te.size!==0?setTimeout(re,10):j(w)}N.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)}))};let he=null;function ne(){O.stop()}function B(){O.start()}let O=new ad;function se(w,G,q,te){if(w.visible===!1)return;if(w.layers.test(G.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(G);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||ve.intersectsSprite(w)){te&&T.setFromMatrixPosition(w.matrixWorld).applyMatrix4(I);let re=je.update(w),fe=w.material;fe.visible&&m.push(w,re,fe,q,T.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||ve.intersectsObject(w))){let re=je.update(w),fe=w.material;if(te&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),T.copy(w.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),T.copy(re.boundingSphere.center)),T.applyMatrix4(w.matrixWorld).applyMatrix4(I)),Array.isArray(fe)){let be=re.groups;for(let Re=0,De=be.length;Re<De;Re++){let Le=be[Re],Ne=fe[Le.materialIndex];Ne&&Ne.visible&&m.push(w,re,Ne,q,T.z,Le)}}else fe.visible&&m.push(w,re,fe,q,T.z,null)}}let j=w.children;for(let re=0,fe=j.length;re<fe;re++)se(j[re],G,q,te)}function ue(w,G,q,te){let j=w.opaque,re=w.transmissive,fe=w.transparent;g.setupLightsView(q),A===!0&&$e.setGlobalState(b.clippingPlanes,q),te&&H.viewport(X.copy(te)),j.length>0&&ge(j,G,q),re.length>0&&ge(re,G,q),fe.length>0&&ge(fe,G,q),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function xe(w,G,q,te){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[te.id]===void 0&&(g.state.transmissionRenderTarget[te.id]=new vn(1,1,{generateMipmaps:!0,type:N.has("EXT_color_buffer_half_float")||N.has("EXT_color_buffer_float")?hr:Mn,minFilter:Ti,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));let j=g.state.transmissionRenderTarget[te.id],re=te.viewport||X;j.setSize(re.z,re.w);let fe=b.getRenderTarget();b.setRenderTarget(j),b.getClearColor(Y),ee=b.getClearAlpha(),ee<1&&b.setClearColor(16777215,.5),b.clear(),S&&Ve.render(q);let be=b.toneMapping;b.toneMapping=Bn;let Re=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),g.setupLightsView(te),A===!0&&$e.setGlobalState(b.clippingPlanes,te),ge(w,q,te),ie.updateMultisampleRenderTarget(j),ie.updateRenderTargetMipmap(j),N.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let Le=0,Ne=G.length;Le<Ne;Le++){let He=G[Le],nt=He.object,Ze=He.geometry,st=He.material,ct=He.group;if(st.side===bn&&nt.layers.test(te.layers)){let rt=st.side;st.side=Bt,st.needsUpdate=!0,Te(nt,q,te,Ze,st,ct),st.side=rt,st.needsUpdate=!0,De=!0}}De===!0&&(ie.updateMultisampleRenderTarget(j),ie.updateRenderTargetMipmap(j))}b.setRenderTarget(fe),b.setClearColor(Y,ee),Re!==void 0&&(te.viewport=Re),b.toneMapping=be}function ge(w,G,q){let te=G.isScene===!0?G.overrideMaterial:null;for(let j=0,re=w.length;j<re;j++){let fe=w[j],be=fe.object,Re=fe.geometry,De=te===null?fe.material:te,Le=fe.group;be.layers.test(q.layers)&&Te(be,G,q,Re,De,Le)}}function Te(w,G,q,te,j,re){w.onBeforeRender(b,G,q,te,j,re),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),j.onBeforeRender(b,G,q,te,w,re),j.transparent===!0&&j.side===bn&&j.forceSinglePass===!1?(j.side=Bt,j.needsUpdate=!0,b.renderBufferDirect(q,G,te,j,w,re),j.side=ln,j.needsUpdate=!0,b.renderBufferDirect(q,G,te,j,w,re),j.side=bn):b.renderBufferDirect(q,G,te,j,w,re),w.onAfterRender(b,G,q,te,j,re)}function Xe(w,G,q){G.isScene!==!0&&(G=L);let te=K.get(w),j=g.state.lights,re=g.state.shadowsArray,fe=j.state.version,be=Pe.getParameters(w,j.state,re,G,q),Re=Pe.getProgramCacheKey(be),De=te.programs;te.environment=w.isMeshStandardMaterial?G.environment:null,te.fog=G.fog,te.envMap=(w.isMeshStandardMaterial?_e:pe).get(w.envMap||te.environment),te.envMapRotation=te.environment!==null&&w.envMap===null?G.environmentRotation:w.envMapRotation,De===void 0&&(w.addEventListener("dispose",xa),De=new Map,te.programs=De);let Le=De.get(Re);if(Le!==void 0){if(te.currentProgram===Le&&te.lightsStateVersion===fe)return Mt(w,be),Le}else be.uniforms=Pe.getUniforms(w),w.onBeforeCompile(be,b),Le=Pe.acquireProgram(be,Re),De.set(Re,Le),te.uniforms=be.uniforms;let Ne=te.uniforms;return(w.isShaderMaterial||w.isRawShaderMaterial)&&w.clipping!==!0||(Ne.clippingPlanes=$e.uniform),Mt(w,be),te.needsLights=(function(He){return He.isMeshLambertMaterial||He.isMeshToonMaterial||He.isMeshPhongMaterial||He.isMeshStandardMaterial||He.isShadowMaterial||He.isShaderMaterial&&He.lights===!0})(w),te.lightsStateVersion=fe,te.needsLights&&(Ne.ambientLightColor.value=j.state.ambient,Ne.lightProbe.value=j.state.probe,Ne.directionalLights.value=j.state.directional,Ne.directionalLightShadows.value=j.state.directionalShadow,Ne.spotLights.value=j.state.spot,Ne.spotLightShadows.value=j.state.spotShadow,Ne.rectAreaLights.value=j.state.rectArea,Ne.ltc_1.value=j.state.rectAreaLTC1,Ne.ltc_2.value=j.state.rectAreaLTC2,Ne.pointLights.value=j.state.point,Ne.pointLightShadows.value=j.state.pointShadow,Ne.hemisphereLights.value=j.state.hemi,Ne.directionalShadowMap.value=j.state.directionalShadowMap,Ne.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ne.spotShadowMap.value=j.state.spotShadowMap,Ne.spotLightMatrix.value=j.state.spotLightMatrix,Ne.spotLightMap.value=j.state.spotLightMap,Ne.pointShadowMap.value=j.state.pointShadowMap,Ne.pointShadowMatrix.value=j.state.pointShadowMatrix),te.currentProgram=Le,te.uniformsList=null,Le}function Oe(w){if(w.uniformsList===null){let G=w.currentProgram.getUniforms();w.uniformsList=mr.seqWithValue(G.seq,w.uniforms)}return w.uniformsList}function Mt(w,G){let q=K.get(w);q.outputColorSpace=G.outputColorSpace,q.batching=G.batching,q.batchingColor=G.batchingColor,q.instancing=G.instancing,q.instancingColor=G.instancingColor,q.instancingMorph=G.instancingMorph,q.skinning=G.skinning,q.morphTargets=G.morphTargets,q.morphNormals=G.morphNormals,q.morphColors=G.morphColors,q.morphTargetsCount=G.morphTargetsCount,q.numClippingPlanes=G.numClippingPlanes,q.numIntersection=G.numClipIntersection,q.vertexAlphas=G.vertexAlphas,q.vertexTangents=G.vertexTangents,q.toneMapping=G.toneMapping}O.setAnimationLoop((function(w){he&&he(w)})),typeof self<"u"&&O.setContext(self),this.setAnimationLoop=function(w){he=w,dt.setAnimationLoop(w),w===null?O.stop():O.start()},dt.addEventListener("sessionstart",ne),dt.addEventListener("sessionend",B),this.render=function(w,G){if(G!==void 0&&G.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(P===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(G),G=dt.getCamera()),w.isScene===!0&&w.onBeforeRender(b,w,G,F),g=et.get(w,v.length),g.init(G),v.push(g),I.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ve.setFromProjectionMatrix(I),y=this.localClippingEnabled,A=$e.init(this.clippingPlanes,y),m=Ge.get(w,_.length),m.init(),_.push(m),dt.enabled===!0&&dt.isPresenting===!0){let re=b.xr.getDepthSensingMesh();re!==null&&se(re,G,-1/0,b.sortObjects)}se(w,G,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(Se,Ae),S=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,S&&Ve.addToRenderList(m,w),this.info.render.frame++,A===!0&&$e.beginShadows();let q=g.state.shadowsArray;we.render(q,w,G),A===!0&&$e.endShadows(),this.info.autoReset===!0&&this.info.reset();let te=m.opaque,j=m.transmissive;if(g.setupLights(),G.isArrayCamera){let re=G.cameras;if(j.length>0)for(let fe=0,be=re.length;fe<be;fe++)xe(te,j,w,re[fe]);S&&Ve.render(w);for(let fe=0,be=re.length;fe<be;fe++){let Re=re[fe];ue(m,w,Re,Re.viewport)}}else j.length>0&&xe(te,j,w,G),S&&Ve.render(w),ue(m,w,G);F!==null&&(ie.updateMultisampleRenderTarget(F),ie.updateRenderTargetMipmap(F)),w.isScene===!0&&w.onAfterRender(b,w,G),zt.resetDefaultState(),k=-1,W=null,v.pop(),v.length>0?(g=v[v.length-1],A===!0&&$e.setGlobalState(b.clippingPlanes,g.state.camera)):g=null,_.pop(),m=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(w,G,q){K.get(w.texture).__webglTexture=G,K.get(w.depthTexture).__webglTexture=q;let te=K.get(w);te.__hasExternalTextures=!0,te.__autoAllocateDepthBuffer=q===void 0,te.__autoAllocateDepthBuffer||N.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,G){let q=K.get(w);q.__webglFramebuffer=G,q.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(w,G=0,q=0){F=w,E=G,D=q;let te=!0,j=null,re=!1,fe=!1;if(w){let be=K.get(w);if(be.__useDefaultFramebuffer!==void 0)H.bindFramebuffer(z.FRAMEBUFFER,null),te=!1;else if(be.__webglFramebuffer===void 0)ie.setupRenderTarget(w);else if(be.__hasExternalTextures)ie.rebindTextures(w,K.get(w.texture).__webglTexture,K.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Le=w.depthTexture;if(be.__boundDepthTexture!==Le){if(Le!==null&&K.has(Le)&&(w.width!==Le.image.width||w.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(w)}}let Re=w.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(fe=!0);let De=K.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(j=Array.isArray(De[G])?De[G][q]:De[G],re=!0):j=w.samples>0&&ie.useMultisampledRTT(w)===!1?K.get(w).__webglMultisampledFramebuffer:Array.isArray(De)?De[q]:De,X.copy(w.viewport),V.copy(w.scissor),$=w.scissorTest}else X.copy(ae).multiplyScalar(le).floor(),V.copy(de).multiplyScalar(le).floor(),$=ye;if(H.bindFramebuffer(z.FRAMEBUFFER,j)&&te&&H.drawBuffers(w,j),H.viewport(X),H.scissor(V),H.setScissorTest($),re){let be=K.get(w.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+G,be.__webglTexture,q)}else if(fe){let be=K.get(w.texture),Re=G||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,be.__webglTexture,q||0,Re)}k=-1},this.readRenderTargetPixels=function(w,G,q,te,j,re,fe){if(!w||!w.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=K.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&fe!==void 0&&(be=be[fe]),be){H.bindFramebuffer(z.FRAMEBUFFER,be);try{let Re=w.texture,De=Re.format,Le=Re.type;if(!Q.textureFormatReadable(De))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(Le))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");G>=0&&G<=w.width-te&&q>=0&&q<=w.height-j&&z.readPixels(G,q,te,j,Vt.convert(De),Vt.convert(Le),re)}finally{let Re=F!==null?K.get(F).__webglFramebuffer:null;H.bindFramebuffer(z.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(w,G,q,te,j,re,fe){if(!w||!w.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=K.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&fe!==void 0&&(be=be[fe]),be){let Re=w.texture,De=Re.format,Le=Re.type;if(!Q.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Q.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=w.width-te&&q>=0&&q<=w.height-j){H.bindFramebuffer(z.FRAMEBUFFER,be);let Ne=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Ne),z.bufferData(z.PIXEL_PACK_BUFFER,re.byteLength,z.STREAM_READ),z.readPixels(G,q,te,j,Vt.convert(De),Vt.convert(Le),0);let He=F!==null?K.get(F).__webglFramebuffer:null;H.bindFramebuffer(z.FRAMEBUFFER,He);let nt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Ru(z,nt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Ne),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,re),z.deleteBuffer(Ne),z.deleteSync(nt),re}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,G=null,q=0){w.isTexture!==!0&&(Ai("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,w=arguments[1]);let te=Math.pow(2,-q),j=Math.floor(w.image.width*te),re=Math.floor(w.image.height*te),fe=G!==null?G.x:0,be=G!==null?G.y:0;ie.setTexture2D(w,0),z.copyTexSubImage2D(z.TEXTURE_2D,q,0,0,fe,be,j,re),H.unbindTexture()};let ht=z.createFramebuffer(),Ct=z.createFramebuffer();this.copyTextureToTexture=function(w,G,q=null,te=null,j=0,re=null){let fe,be,Re,De,Le,Ne,He,nt,Ze;w.isTexture!==!0&&(Ai("WebGLRenderer: copyTextureToTexture function signature has changed."),te=arguments[0]||null,w=arguments[1],G=arguments[2],re=arguments[3]||0,q=null),re===null&&(j!==0?(Ai("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=j,j=0):re=0);let st=w.isCompressedTexture?w.mipmaps[re]:w.image;if(q!==null)fe=q.max.x-q.min.x,be=q.max.y-q.min.y,Re=q.isBox3?q.max.z-q.min.z:1,De=q.min.x,Le=q.min.y,Ne=q.isBox3?q.min.z:0;else{let mn=Math.pow(2,-j);fe=Math.floor(st.width*mn),be=Math.floor(st.height*mn),Re=w.isDataArrayTexture?st.depth:w.isData3DTexture?Math.floor(st.depth*mn):1,De=0,Le=0,Ne=0}te!==null?(He=te.x,nt=te.y,Ze=te.z):(He=0,nt=0,Ze=0);let ct=Vt.convert(G.format),rt=Vt.convert(G.type),pt;G.isData3DTexture?(ie.setTexture3D(G,0),pt=z.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(ie.setTexture2DArray(G,0),pt=z.TEXTURE_2D_ARRAY):(ie.setTexture2D(G,0),pt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,G.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,G.unpackAlignment);let Ft=z.getParameter(z.UNPACK_ROW_LENGTH),We=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Be=z.getParameter(z.UNPACK_SKIP_PIXELS),Qt=z.getParameter(z.UNPACK_SKIP_ROWS),bo=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,st.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,st.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,De),z.pixelStorei(z.UNPACK_SKIP_ROWS,Le),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ne);let ba=w.isDataArrayTexture||w.isData3DTexture,kn=G.isDataArrayTexture||G.isData3DTexture;if(w.isDepthTexture){let mn=K.get(w),Ni=K.get(G),En=K.get(mn.__renderTarget),Mo=K.get(Ni.__renderTarget);H.bindFramebuffer(z.READ_FRAMEBUFFER,En.__webglFramebuffer),H.bindFramebuffer(z.DRAW_FRAMEBUFFER,Mo.__webglFramebuffer);for(let Fi=0;Fi<Re;Fi++)ba&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,K.get(w).__webglTexture,j,Ne+Fi),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,K.get(G).__webglTexture,re,Ze+Fi)),z.blitFramebuffer(De,Le,fe,be,He,nt,fe,be,z.DEPTH_BUFFER_BIT,z.NEAREST);H.bindFramebuffer(z.READ_FRAMEBUFFER,null),H.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(j!==0||w.isRenderTargetTexture||K.has(w)){let mn=K.get(w),Ni=K.get(G);H.bindFramebuffer(z.READ_FRAMEBUFFER,ht),H.bindFramebuffer(z.DRAW_FRAMEBUFFER,Ct);for(let En=0;En<Re;En++)ba?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,mn.__webglTexture,j,Ne+En):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,mn.__webglTexture,j),kn?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ni.__webglTexture,re,Ze+En):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ni.__webglTexture,re),j!==0?z.blitFramebuffer(De,Le,fe,be,He,nt,fe,be,z.COLOR_BUFFER_BIT,z.NEAREST):kn?z.copyTexSubImage3D(pt,re,He,nt,Ze+En,De,Le,fe,be):z.copyTexSubImage2D(pt,re,He,nt,De,Le,fe,be);H.bindFramebuffer(z.READ_FRAMEBUFFER,null),H.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else kn?w.isDataTexture||w.isData3DTexture?z.texSubImage3D(pt,re,He,nt,Ze,fe,be,Re,ct,rt,st.data):G.isCompressedArrayTexture?z.compressedTexSubImage3D(pt,re,He,nt,Ze,fe,be,Re,ct,st.data):z.texSubImage3D(pt,re,He,nt,Ze,fe,be,Re,ct,rt,st):w.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,re,He,nt,fe,be,ct,rt,st.data):w.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,re,He,nt,st.width,st.height,ct,st.data):z.texSubImage2D(z.TEXTURE_2D,re,He,nt,fe,be,ct,rt,st);z.pixelStorei(z.UNPACK_ROW_LENGTH,Ft),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,We),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Be),z.pixelStorei(z.UNPACK_SKIP_ROWS,Qt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,bo),re===0&&G.generateMipmaps&&z.generateMipmap(pt),H.unbindTexture()},this.copyTextureToTexture3D=function(w,G,q=null,te=null,j=0){return w.isTexture!==!0&&(Ai("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,te=arguments[1]||null,w=arguments[2],G=arguments[3],j=arguments[4]||0),Ai('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,G,q,te,j)},this.initRenderTarget=function(w){K.get(w).__webglFramebuffer===void 0&&ie.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?ie.setTextureCube(w,0):w.isData3DTexture?ie.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?ie.setTexture2DArray(w,0):ie.setTexture2D(w,0),H.unbindTexture()},this.resetState=function(){E=0,D=0,F=null,H.reset(),zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}};var vc=`
  vec3 camRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 camUp = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vec3 camForward = -vec3(viewMatrix[0][2], viewMatrix[1][2], viewMatrix[2][2]);
`,hd=`
  attribute vec3 iPos;
  attribute vec2 iSize;
  attribute vec2 iAnchor;
  attribute vec4 iUv;
  attribute vec4 iTint;
  attribute float iRot;
  uniform float uGrounded;
  uniform float uBias;
  varying vec2 vUv;
  varying vec4 vTint;
  #ifdef OUTLINE
  varying vec4 vFrame;
  #endif
  void main() {
    float rowFrac = position.y < 0.25 ? 0.0 : (position.y < 0.75 ? iAnchor.y : 1.0);
    vec2 frac = vec2(position.x + 0.5, rowFrac);
    vUv = iUv.xy + frac * iUv.zw;
    #ifdef OUTLINE
    vFrame = iUv;
    #endif
    vTint = iTint;
    vec2 local = (frac - iAnchor) * iSize;
    float c = cos(iRot);
    float s = sin(iRot);
    vec2 offset = vec2(c * local.x - s * local.y, s * local.x + c * local.y);
    ${vc}
    vec3 world = iPos + camRight * offset.x + camUp * offset.y;
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
    // A card is flat, so every pixel would sit at the anchor's depth and the near half of the hex
    // (closer than the foot) would bury a building's front to the waist. Rows above the anchor keep
    // the anchor depth; rows below it (the baked front footprint) take the ground's depth under them.
    vec3 depthPoint = iPos;
    if (uGrounded > 0.5 && rowFrac < iAnchor.y) depthPoint = world - camForward * ((world.y - iPos.y) / camForward.y);
    vec4 depthClip = projectionMatrix * viewMatrix * vec4(depthPoint - camForward * uBias, 1.0);
    gl_Position.z = depthClip.z / depthClip.w * gl_Position.w;
  }
`,ud=`
  uniform sampler2D map;
  uniform float uAlphaTest;
  uniform vec2 uTexel;
  varying vec2 vUv;
  varying vec4 vTint;
  #ifdef OUTLINE
  varying vec4 vFrame;
  #endif
  void main() {
    vec4 color = texture2D(map, vUv) * vTint;
    #ifdef PREMULTIPLIED
    // Baked effect sheets already hold the black-pass (premultiplied) colour and the material blends
    // ONE / ONE_MINUS_SRC_ALPHA, so only a per-card fade scales the colour; multiplying by the texel
    // alpha again would darken every glow.
    color.rgb *= vTint.a;
    #endif
    #ifdef OUTLINE
    // Two source texels outside the opaque body (cardinal plus diagonal). The crop keeps a few
    // pixels of padding, so the stroke stays inside the card instead of borrowing the next frame.
    vec2 lo = vFrame.xy;
    vec2 hi = vFrame.xy + vFrame.zw;
    float cover = 0.0;
    cover = max(cover, texture2D(map, clamp(vUv + vec2(uTexel.x, 0.0), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv - vec2(uTexel.x, 0.0), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(0.0, uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv - vec2(0.0, uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(2.0 * uTexel.x, 0.0), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv - vec2(2.0 * uTexel.x, 0.0), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(0.0, 2.0 * uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv - vec2(0.0, 2.0 * uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(uTexel.x, uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(-uTexel.x, uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(uTexel.x, -uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv - vec2(uTexel.x, uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(2.0 * uTexel.x, 2.0 * uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(-2.0 * uTexel.x, 2.0 * uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv + vec2(2.0 * uTexel.x, -2.0 * uTexel.y), lo, hi)).a);
    cover = max(cover, texture2D(map, clamp(vUv - vec2(2.0 * uTexel.x, 2.0 * uTexel.y), lo, hi)).a);
    if (color.a < 0.35 && cover > 0.5) color = vec4(0.06, 0.05, 0.04, 1.0);
    #endif
    if (color.a < uAlphaTest) discard;
    gl_FragColor = color;
    #include <colorspace_fragment>
  }
`,dd=`
  uniform vec3 uPos;
  uniform vec2 uSize;
  uniform float uAlpha;
  varying vec2 vUv;
  varying float vAlpha;
  void main() {
    vUv = uv;
    vAlpha = uAlpha;
    // Flip Z so the ground quad faces the camera. The unflipped winding points down and is culled.
    vec3 world = uPos + vec3(position.x * uSize.x, 0.0, -position.y * uSize.y);
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`,pd=`
  varying vec2 vUv;
  varying float vAlpha;
  void main() {
    // Procedural disc, not soft_shadow.png. That mask's dark core sits inside the billboard,
    // so only a faint fringe could show beside the feet, and at full-board size it reads as nothing.
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    float aa = max(fwidth(r), 0.012);
    float disc = 1.0 - smoothstep(0.72 - aa, 0.98 + aa, r);
    if (disc <= 0.004) discard;
    gl_FragColor = vec4(0.0, 0.0, 0.0, disc * vAlpha);
    #include <colorspace_fragment>
  }
`,md=`
  attribute vec3 iPos;
  attribute vec3 iSize;
  attribute vec3 iColor;
  varying vec3 vColor;
  void main() {
    vColor = iColor;
    ${vc}
    // iSize.z shifts the quad along the camera's right axis (fill anchored to the bar's left edge).
    vec3 world = iPos + camRight * (iSize.z + position.x * iSize.x) + camUp * (position.y * iSize.y);
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`,fd=`
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
    #include <colorspace_fragment>
  }
`,af=`
  attribute vec3 iPos;
  attribute vec2 iSize;
  attribute vec3 iColor;
  varying vec3 vColor;
  varying vec2 vLocal;
  varying float vProgress;
  void main() {
    vColor = iColor;
    vLocal = position.xy;
    vProgress = iSize.y;
    ${vc}
    vec3 world = iPos + camRight * (position.x * iSize.x) + camUp * (position.y * iSize.x);
    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`;var gd=`
varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,_d=`
precision highp float;
varying vec3 vWorld;
uniform float uTime;
uniform vec2 uIslandCenter;
uniform vec2 uIslandHalfSize;
uniform float uCornerRadius;
uniform vec2 uWaterSize;
uniform vec3 uCameraPos;

const float EDGE_NOISE_SCALE = 0.94;
const float EDGE_NOISE_AMP = 1.15;
const float BEACH_SAND_WIDTH = 2.8;
const float WET_SAND_WIDTH = 4.18;
const float SHORE_FADE_WIDTH = 7.6;
const float TIDE_AMPLITUDE = 1.0;
const float TIDE_SPEED = 0.6;
const float WAVE_CREST_SPACING = 1.85;
const float WAVE_CREST_SPEED = 0.75;
const float WAVE_CREST_INTENSITY = 0.328;
const float COAST_FOAM_INTENSITY = 0.726;
const float COAST_FOAM_WIDTH = 0.2;
const float COAST_FOAM_NOISE_SCALE = 59.11;
const float SHORE_INTENSITY = 0.648;
const float CENTER_BRIGHT_POWER = 2.03;
const float SMOOTHNESS = 0.016;
const float SPECULAR_INTENSITY = 0.04;
const float HIGHLIGHT_INTENSITY = 0.034;
const float WAVE_LINE_INTENSITY = 0.382;
const float FOAM_NOISE_SCALE = 605.0;

const vec3 DEEP_COLOR = vec3(0.0, 0.45243356, 0.7830189);
const vec3 SHALLOW_COLOR = vec3(0.0, 1.0, 0.80870605);
const vec3 SHORE_COLOR = vec3(1.0, 0.9292453, 0.7122642);
const vec3 SAND_COLOR = vec3(1.0, 0.9967699, 0.9858491);
const vec3 WET_SAND_COLOR = vec3(0.8962264, 0.81451935, 0.6468049);
const vec3 FOAM_COLOR = vec3(1.18, 1.22, 1.26);
const vec3 LIGHT_COLOR = vec3(1.0, 0.98, 0.93);
const vec3 AMBIENT_COLOR = vec3(0.86039764);
const vec3 LIGHT_DIR = normalize(vec3(-0.42, 1.0, 0.73));

float simpleNoise(vec2 uv) {
  vec3 p3 = fract(vec3(uv.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float valueNoise(vec2 uv) {
  vec2 i = floor(uv);
  vec2 f = fract(uv);
  f = f * f * (3.0 - 2.0 * f);
  float a = simpleNoise(i);
  float b = simpleNoise(i + vec2(1.0, 0.0));
  float c = simpleNoise(i + vec2(0.0, 1.0));
  float d = simpleNoise(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 uv) {
  float sum = valueNoise(uv) * 0.5;
  uv = uv * 2.03 + 17.3;
  sum += valueNoise(uv) * 0.25;
  uv = uv * 2.01 + 41.7;
  sum += valueNoise(uv) * 0.125;
  return sum / 0.875;
}

void main() {
  vec2 worldUV = vWorld.xz;

  // Two scrolling noise fields stand in for the normal maps.
  vec2 uv1 = worldUV * 0.1 + uTime * vec2(-0.15, 0.0);
  vec2 uv2 = worldUV * 0.03 + uTime * vec2(0.0, 0.1);
  float e = 0.35;
  // Forward differences (3 noise taps per field instead of 4) scaled to match the central difference.
  float c1 = fbm(uv1);
  float c2 = fbm(uv2);
  vec2 g1 = 2.0 * vec2(fbm(uv1 + vec2(e, 0.0)) - c1, fbm(uv1 + vec2(0.0, e)) - c1);
  vec2 g2 = 2.0 * vec2(fbm(uv2 + vec2(e, 0.0)) - c2, fbm(uv2 + vec2(0.0, e)) - c2);
  vec3 normalTS = normalize(vec3(-(g1 * 0.13 * 3.0 + g2 * 0.57 * 3.0), 1.0));
  vec3 normalWS = normalize(vec3(normalTS.x, normalTS.z, normalTS.y));

  vec3 L = LIGHT_DIR;
  vec3 V = normalize(uCameraPos - vWorld);
  vec3 H = normalize(L + V);

  // Bright center, darker edge.
  vec2 waterUV = (worldUV - uIslandCenter) / uWaterSize + 0.5;
  vec2 centerUV = waterUV - 0.5;
  float centerDistance = length(centerUV * vec2(0.85, 1.15));
  float centerBlend = pow(clamp(1.0 - centerDistance * 1.45, 0.0, 1.0), CENTER_BRIGHT_POWER);

  float NdotL = clamp(dot(normalWS, L), 0.0, 1.0);
  vec3 waterColor = mix(DEEP_COLOR, SHALLOW_COLOR, centerBlend);

  // Rounded-rect island SDF with a noisy coastline.
  vec2 islandQ = abs(worldUV - uIslandCenter) - max(uIslandHalfSize - uCornerRadius, vec2(0.0));
  float islandD = length(max(islandQ, vec2(0.0))) + min(max(islandQ.x, islandQ.y), 0.0) - uCornerRadius;
  islandD += (fbm(worldUV * EDGE_NOISE_SCALE + 3.1) - 0.5) * 2.0 * EDGE_NOISE_AMP;
  float coastScallop = smoothstep(0.3, 0.72, fbm(worldUV * COAST_FOAM_NOISE_SCALE + uTime * 0.15));

  float waterline = BEACH_SAND_WIDTH + sin(uTime * TIDE_SPEED) * TIDE_AMPLITUDE;
  float sandT = 1.0 - smoothstep(waterline - 0.25, waterline + 0.45, islandD);
  float landT = clamp(sandT, 0.0, 1.0);
  float wetT = smoothstep(waterline - WET_SAND_WIDTH, waterline, islandD);
  float subT = smoothstep(waterline + 0.2, waterline + 1.2, islandD)
    * (1.0 - smoothstep(waterline + 1.2, waterline + SHORE_FADE_WIDTH, islandD));

  waterColor = mix(waterColor, SHORE_COLOR, subT * SHORE_INTENSITY);
  vec3 sandColor = mix(SAND_COLOR, WET_SAND_COLOR, clamp(wetT, 0.0, 1.0));
  vec3 baseColor = mix(waterColor, sandColor, landT);

  // Surf on the waterline and crests rolling in.
  float foamBand = 1.0 - smoothstep(0.0, COAST_FOAM_WIDTH, abs(islandD - waterline - 0.1));
  float crestCoord = (islandD - waterline) / WAVE_CREST_SPACING + uTime * WAVE_CREST_SPEED;
  float crest = pow(clamp(1.0 - abs(fract(crestCoord) * 2.0 - 1.0), 0.0, 1.0), 6.0);
  float crestFade = smoothstep(0.3, 1.4, islandD - waterline)
    * (1.0 - smoothstep(1.4, SHORE_FADE_WIDTH + 2.0, islandD - waterline));
  float coastFoam = clamp(foamBand * (0.22 + 0.78 * coastScallop)
    + crest * crestFade * WAVE_CREST_INTENSITY * (0.4 + 0.6 * coastScallop), 0.0, 1.0);
  coastFoam *= COAST_FOAM_INTENSITY;

  NdotL = mix(NdotL, clamp(L.y, 0.0, 1.0), landT);
  vec3 lighting = mix(AMBIENT_COLOR, LIGHT_COLOR, 0.35 + NdotL * 0.45);
  vec3 diffuse = baseColor * lighting;

  // Blinn-Phong sparkle and wave lines, water only.
  float NdotH = clamp(dot(normalWS, H), 0.0, 1.0);
  float specPow = exp2(SMOOTHNESS * 11.0 + 1.0);
  float spec = pow(NdotH, specPow) * SPECULAR_INTENSITY;
  float normalSlope = clamp(length(normalTS.xy), 0.0, 1.0);
  float waveNoise = fbm(worldUV * (FOAM_NOISE_SCALE * 0.45 * 0.02) + uTime * vec2(0.06, 0.04));
  float waveRidge = 1.0 - abs(normalTS.x * 0.82 + normalTS.y * 0.34 + (waveNoise - 0.5) * 0.28);
  float waveLines = pow(clamp(waveRidge, 0.0, 1.0), 7.0) * smoothstep(0.05, 0.34, normalSlope);
  float directionalHighlight = pow(NdotH, max(specPow * 0.35, 4.0)) * smoothstep(0.04, 0.35, normalSlope);
  spec += directionalHighlight * HIGHLIGHT_INTENSITY * 0.18;
  spec += waveLines * (0.18 + directionalHighlight * 0.82) * WAVE_LINE_INTENSITY * 0.55;
  spec *= 1.0 - landT;

  vec3 color = diffuse + spec * LIGHT_COLOR;
  color = mix(color, FOAM_COLOR, clamp(coastFoam, 0.0, 1.0));
  gl_FragColor = vec4(color, 1.0);
}
`;function sf(){let i=new sr,e=new Float32Array([-.5,0,0,.5,0,0,.5,.5,0,-.5,.5,0,-.5,.5,0,.5,.5,0,.5,1,0,-.5,1,0]);return i.setAttribute("position",new yt(e,3)),i.setIndex([0,1,2,0,2,3,4,5,6,4,6,7]),i}function vd(i,e){i._maxInstanceCount=e}function of(){let i=new sr;return i.setAttribute("position",new yt(new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),3)),i.setAttribute("uv",new yt(new Float32Array([0,0,1,0,1,1,0,1]),2)),i.setIndex([0,1,2,0,2,3]),i}var lf=.03,Ii=class{mesh;geometry=sf();material;blended;capacity=0;count=0;pos;size;anchor;uv;tint;rot;order=[];scratch=new Float32Array(0);constructor(e,t){let n=t.grounded;this.blended=!n||!t.msaa;let r=e.image,a={};t.premultiplied&&(a.PREMULTIPLIED=""),t.outline&&(a.OUTLINE=""),this.material=new gt({vertexShader:hd,fragmentShader:ud,uniforms:{map:{value:e},uGrounded:{value:t.grounded?1:0},uBias:{value:lf},uAlphaTest:{value:n&&t.msaa?.02:this.blended?.004:.5},uTexel:{value:new ce(1/Math.max(1,r?.width??1),1/Math.max(1,r?.height??1))}},defines:a,transparent:this.blended,depthTest:t.depthTest,depthWrite:n,alphaToCoverage:n&&t.msaa,premultipliedAlpha:t.premultiplied}),this.grow(32),this.mesh=new Ke(this.geometry,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=t.renderOrder,this.mesh.visible=!1}grow(e){let t=(r,a)=>(r&&a.set(r),a);this.pos=t(this.pos,new Float32Array(e*3)),this.size=t(this.size,new Float32Array(e*2)),this.anchor=t(this.anchor,new Float32Array(e*2)),this.uv=t(this.uv,new Float32Array(e*4)),this.tint=t(this.tint,new Float32Array(e*4)),this.rot=t(this.rot,new Float32Array(e)),this.capacity=e;let n=(r,a)=>{let s=new tr(r,a);return s.setUsage(eo),s};this.geometry.setAttribute("iPos",n(this.pos,3)),this.geometry.setAttribute("iSize",n(this.size,2)),this.geometry.setAttribute("iAnchor",n(this.anchor,2)),this.geometry.setAttribute("iUv",n(this.uv,4)),this.geometry.setAttribute("iTint",n(this.tint,4)),this.geometry.setAttribute("iRot",n(this.rot,1)),vd(this.geometry,e)}begin(){this.count=0}push(e,t,n,r,a,s,o,l,c,h,u,d,p,f,x,m){this.count===this.capacity&&this.grow(this.capacity*2);let g=this.count++;this.pos[g*3]=e,this.pos[g*3+1]=t,this.pos[g*3+2]=n,this.size[g*2]=r,this.size[g*2+1]=a,this.anchor[g*2]=s,this.anchor[g*2+1]=o,this.uv[g*4]=l,this.uv[g*4+1]=c,this.uv[g*4+2]=h,this.uv[g*4+3]=u,this.tint[g*4]=d,this.tint[g*4+1]=p,this.tint[g*4+2]=f,this.tint[g*4+3]=x,this.rot[g]=m}end(){if(this.mesh.visible=this.count>0,this.count!==0){this.blended&&this.count>1&&this.sortFarToNear(),this.geometry.instanceCount=this.count;for(let e of["iPos","iSize","iAnchor","iUv","iTint","iRot"]){let t=this.geometry.getAttribute(e);t.needsUpdate=!0,t.updateRanges.length=0,t.updateRanges.push({start:0,count:this.count*t.itemSize})}}}sortFarToNear(){let e=this.count,t=this.order;t.length=e;for(let a=0;a<e;a++)t[a]=a;let n=this.pos;t.sort((a,s)=>n[s*3+2]-n[a*3+2]);let r=!0;for(let a=0;a<e;a++)if(t[a]!==a){r=!1;break}r||(this.permute(this.pos,3),this.permute(this.size,2),this.permute(this.anchor,2),this.permute(this.uv,4),this.permute(this.tint,4),this.permute(this.rot,1))}permute(e,t){let n=this.count*t;this.scratch.length<n&&(this.scratch=new Float32Array(n));let r=this.scratch;for(let a=0;a<this.count;a++){let s=this.order[a]*t,o=a*t;for(let l=0;l<t;l++)r[o+l]=e[s+l]}e.set(r.subarray(0,n))}},lo=class{mesh;geometry;material;pool=[];count=0;constructor(e,t){this.geometry=new Qe,this.geometry.setAttribute("position",new yt(new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),3)),this.geometry.setAttribute("uv",new yt(new Float32Array([0,0,1,0,1,1,0,1]),2)),this.geometry.setIndex([0,1,2,0,2,3]),this.material=new gt({vertexShader:dd,fragmentShader:pd,uniforms:{uPos:{value:new R},uSize:{value:new ce},uAlpha:{value:1}},transparent:!0,depthWrite:!0,depthTest:!0,depthFunc:lr,side:ln}),this.mesh=new wt,this.mesh.frustumCulled=!1,this.mesh.renderOrder=t,this.mesh.visible=!1}begin(){this.count=0}push(e,t,n,r,a,s){let o=this.pool[this.count];if(!o){let c=new Ke(this.geometry,this.material);c.frustumCulled=!1,c.renderOrder=this.mesh.renderOrder,c.userData={x:0,y:0,z:0,w:1,d:1,a:1},c.onBeforeRender=()=>{let h=c.userData,u=this.material.uniforms;u.uPos.value.set(h.x,h.y,h.z),u.uSize.value.set(h.w,h.d),u.uAlpha.value=h.a},o=c,this.pool.push(c),this.mesh.add(c)}let l=o.userData;l.x=e,l.y=t,l.z=n,l.w=r,l.d=a,l.a=s,o.visible=!0,this.count++}end(){for(let e=this.count;e<this.pool.length;e++)this.pool[e].visible=!1;this.mesh.visible=this.count>0}},co=class{mesh;geometry=of();capacity=0;count=0;pos;size;color;constructor(e){let t=new gt({vertexShader:md,fragmentShader:fd,transparent:!0,depthTest:!1,depthWrite:!1});this.grow(64),this.mesh=new Ke(this.geometry,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=e,this.mesh.visible=!1}grow(e){let t=(r,a)=>{let s=new Float32Array(a);return r&&s.set(r),s};this.pos=t(this.pos,e*3),this.size=t(this.size,e*3),this.color=t(this.color,e*3),this.capacity=e;let n=(r,a)=>{let s=new tr(r,a);return s.setUsage(eo),s};this.geometry.setAttribute("iPos",n(this.pos,3)),this.geometry.setAttribute("iSize",n(this.size,3)),this.geometry.setAttribute("iColor",n(this.color,3)),vd(this.geometry,e)}begin(){this.count=0}push(e,t,n,r,a,s,o){this.count===this.capacity&&this.grow(this.capacity*2);let l=this.count++;this.pos[l*3]=e,this.pos[l*3+1]=t,this.pos[l*3+2]=n,this.size[l*3]=a,this.size[l*3+1]=s,this.size[l*3+2]=r,this.color[l*3]=o.r,this.color[l*3+1]=o.g,this.color[l*3+2]=o.b}end(){if(this.mesh.visible=this.count>0,this.count!==0){this.geometry.instanceCount=this.count;for(let e of["iPos","iSize","iColor"]){let t=this.geometry.getAttribute(e);t.needsUpdate=!0,t.updateRanges.length=0,t.updateRanges.push({start:0,count:this.count*t.itemSize})}}}};var cf=_d.replace("const vec3 SAND_COLOR = vec3(1.0, 0.9967699, 0.9858491);","const vec3 SAND_COLOR = vec3(0.9, 0.82, 0.66);").replace("const vec3 WET_SAND_COLOR = vec3(0.8962264, 0.81451935, 0.6468049);","const vec3 WET_SAND_COLOR = vec3(0.78, 0.67, 0.5);");function xd(i){let e=new gt({vertexShader:gd,fragmentShader:cf,uniforms:{uTime:{value:0},uIslandCenter:{value:new ce(i.centerX,i.centerZ)},uIslandHalfSize:{value:new ce(i.halfX,i.halfZ)},uCornerRadius:{value:i.cornerRadius},uWaterSize:{value:new ce(90,160)},uCameraPos:{value:new R}}}),t=new Ke(new xn(240,240),e);return t.rotation.x=-Math.PI/2,t.position.set(i.centerX,-.06,i.centerZ),{mesh:t,update(n,r){e.uniforms.uTime.value=n,e.uniforms.uCameraPos.value.copy(r.position)}}}function xc(i,e,t){let n=Math.abs(e-i.centerX)-Math.max(i.halfX-i.cornerRadius,0),r=Math.abs(t-i.centerZ)-Math.max(i.halfZ-i.cornerRadius,0),a=Math.max(n,0),s=Math.max(r,0);return Math.hypot(a,s)+Math.min(Math.max(n,r),0)-i.cornerRadius}var hf=[7915600,6270524,9426522,7127621],uf=8014366,yd=[9213603,7305864,10134704],df=[6268995,4887094,4095790],pf=8375115;function mf(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function ho(i,e){return e[Math.floor(i()*e.length)]}function gr(i){return new ar({color:i,flatShading:!0})}function bd(i,e){if(!i)return null;let t=new Ke(new xn(e*2,e*2),new On({map:i,transparent:!0,opacity:.35,depthWrite:!1}));return t.rotation.x=-Math.PI/2,t.position.y=.01,t}function ff(i,e){let t=new wt,n=.85+i()*.5,r=new Ke(new _i(.12,.2,1.3,6),gr(uf));r.position.y=.65,t.add(r);for(let s=0;s<3;s++){let o=new Ke(new yi(.62+i()*.3,0),gr(ho(i,hf)));o.position.set((i()-.5)*.7,1.35+i()*.6,(i()-.5)*.7),o.rotation.set(i()*3,i()*3,i()*3),t.add(o)}let a=bd(e,1.1);return a&&t.add(a),t.scale.setScalar(n),t.rotation.y=i()*Math.PI*2,t}function gf(i,e){let t=new wt,n=new Ke(new vi(.45,0),gr(ho(i,yd)));n.scale.set(.8+i()*.8,.5+i()*.4,.8+i()*.6),n.rotation.set(i()*.6,i()*Math.PI*2,i()*.6),n.position.y=.2,t.add(n);let r=bd(e,.7);return r&&t.add(r),t}function _f(i){let e=new Ke(new vi(.16+i()*.12,0),gr(ho(i,yd)));return e.scale.y=.6,e.rotation.y=i()*Math.PI*2,e.position.y=.08,e}function vf(i){let e=new wt,t=1+Math.floor(i()*2);for(let n=0;n<t;n++){let r=new Ke(new yi(.3+i()*.2,0),gr(ho(i,df)));r.scale.y=.7,r.position.set((i()-.5)*.4,.2,(i()-.5)*.4),r.rotation.y=i()*Math.PI*2,e.add(r)}return e}function xf(i){let e=new wt,t=gr(pf);for(let n=0;n<3;n++){let r=new Ke(new rr(.06,.3+i()*.2,4),t);r.position.set((i()-.5)*.25,.15,(i()-.5)*.25),r.rotation.set((i()-.5)*.7,i()*Math.PI,(i()-.5)*.7),e.add(r)}return e}var yf=[{count:16,insetX:1,insetZ:.6,jitter:.9,seed:4101,build:ff},{count:14,insetX:.5,insetZ:.2,jitter:.9,seed:4102,build:gf},{count:20,insetX:2.6,insetZ:.8,jitter:.9,seed:4103,build:i=>_f(i)},{count:56,insetX:1.8,insetZ:.1,jitter:.8,seed:4106,build:i=>vf(i)},{count:70,insetX:3.3,insetZ:1.5,jitter:1.6,seed:4104,build:i=>xf(i)}];function bf(i,e){let t=Math.cos(e),n=Math.sin(e),r=0,a=Math.hypot(i.halfX,i.halfZ)+1;for(let o=0;o<24;o++){let l=(r+a)/2;xc(i,i.centerX+t*l,i.centerZ+n*l)<0?r=l:a=l}let s=(r+a)/2;return{x:i.centerX+t*s,z:i.centerZ+n*s}}function Md(i,e,t){return Mf(Sf(i,e,t),t)}function Mf(i,e){i.updateMatrixWorld(!0);let t=[],n=[],r=[],a=[],s=[],o=new Fe,l=new R,c=new R;i.traverse(u=>{let d=u;if(!d.isMesh)return;let p=d.material,f=d.geometry.index?d.geometry.toNonIndexed():d.geometry,x=f.getAttribute("position");if(p instanceof On){let _=f.getAttribute("uv");for(let v=0;v<x.count;v++)l.fromBufferAttribute(x,v).applyMatrix4(d.matrixWorld),a.push(l.x,l.y,l.z),s.push(_.getX(v),_.getY(v));return}let m=p.color,g=f.getAttribute("normal");o.getNormalMatrix(d.matrixWorld);for(let _=0;_<x.count;_++)l.fromBufferAttribute(x,_).applyMatrix4(d.matrixWorld),c.fromBufferAttribute(g,_).applyMatrix3(o).normalize(),t.push(l.x,l.y,l.z),n.push(c.x,c.y,c.z),r.push(m.r,m.g,m.b)});let h=new wt;if(t.length){let u=new Qe;u.setAttribute("position",new Ce(t,3)),u.setAttribute("normal",new Ce(n,3)),u.setAttribute("color",new Ce(r,3)),h.add(new Ke(u,new ar({vertexColors:!0,flatShading:!0})))}if(a.length&&e){let u=new Qe;u.setAttribute("position",new Ce(a,3)),u.setAttribute("uv",new Ce(s,2));let d=new Ke(u,new On({map:e,transparent:!0,opacity:.35,depthWrite:!1}));d.renderOrder=-1000001,h.add(d)}return h}function Sf(i,e,t){let n=new wt;for(let r of yf){let a=mf(r.seed),s={centerX:i.centerX,centerZ:i.centerZ,halfX:i.halfX-r.insetX,halfZ:i.halfZ-r.insetZ,cornerRadius:Math.min(i.cornerRadius,i.halfX-r.insetX)},o=0,l=0;for(;o<r.count&&l<r.count*6;){l+=1;let c=bf(s,a()*Math.PI*2),h=Math.atan2(c.z-i.centerZ,c.x-i.centerX),u=(a()-.5)*2*r.jitter,d=c.x+Math.cos(h)*u,p=c.z+Math.sin(h)*u;if(xc(i,d,p)>1.2||e(d,p))continue;let f=r.build(a,t);f.position.set(d,0,p),n.add(f),o+=1}}return n}var $t=.22,bt=20,wf=4,Sd=1,Tf=`
  varying vec2 vUv;
  varying vec2 vWorld;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,Ef=`
  uniform sampler2D fog;
  uniform float uTime;
  uniform vec2 uGrid;
  uniform float uEdge;
  varying vec2 vUv;
  varying vec2 vWorld;
  uniform sampler2D uNoise;
  // Smooth tiling value noise from a texture: sin-based hashes lose precision at larger coordinates
  // and quantise into visible blocks.
  float noise(vec2 p) { return texture2D(uNoise, p / 16.0).r; }
  void main() {
    // Warp the lookup with slow noise so fog boundaries curl like mist instead of following the grid.
    vec2 warp = vec2(noise(vWorld * 0.6 + uTime * 0.07), noise(vWorld * 0.6 + 17.0 - uTime * 0.06)) - 0.5;
    vec4 f = texture2D(fog, vUv + warp * (2.2 / uGrid));
    float visible = f.r;
    float explored = f.g;
    // Drifting cloud texture so the fog reads as haze rather than a flat mask.
    float cloud = noise(vWorld * 0.35 + vec2(uTime * 0.05, uTime * 0.03)) * 0.6 + noise(vWorld * 0.9 - uTime * 0.04) * 0.4;
    float shroud = mix(0.9, 0.52, explored) + (cloud - 0.5) * 0.08;
    float alpha = clamp(shroud, 0.0, 1.0) * (1.0 - visible);
    // Thin out toward the overlay's border (distance to the nearest edge, in sim units), with a noisy rim.
    vec2 fromEdge = min(vUv, 1.0 - vUv) * uGrid * 0.3;
    float edge = min(fromEdge.x, fromEdge.y) + (cloud - 0.5) * 1.5;
    alpha *= smoothstep(0.0, uEdge, edge);
    vec3 color = mix(vec3(0.02, 0.025, 0.04), vec3(0.08, 0.09, 0.13), explored);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;function Af(){let t=new Float32Array(256),n=1234567;for(let l=0;l<t.length;l++)n=Math.imul(n,1103515245)+12345>>>0,t[l]=n/4294967296;let r=(l,c)=>t[(c+16)%16*16+(l+16)%16],a=l=>l*l*(3-2*l),s=new Uint8Array(16384*4);for(let l=0;l<128;l++)for(let c=0;c<128;c++){let h=c/128*16,u=l/128*16,d=Math.floor(h),p=Math.floor(u),f=a(h-d),x=a(u-p),m=r(d,p)*(1-f)+r(d+1,p)*f,g=r(d,p+1)*(1-f)+r(d+1,p+1)*f,_=Math.round((m*(1-x)+g*x)*255),v=(l*128+c)*4;s[v]=s[v+1]=s[v+2]=_,s[v+3]=255}let o=new $n(s,128,128);return o.wrapS=o.wrapT=Ji,o.magFilter=ft,o.minFilter=ft,o.needsUpdate=!0,o}function wd(i,e){let t=Math.ceil((i.width+bt*2)/$t),n=Math.ceil((i.height+bt*2)/$t),r=new Float32Array(t*n),a=new Float32Array(t*n),s=new Float32Array(t*n),o=new Float32Array(t*n),l=new Uint8Array(t*n*4),c=new $n(l,t,n);c.magFilter=ft,c.minFilter=ft,c.needsUpdate=!0;let h=[[-bt,-bt],[i.width+bt,-bt],[i.width+bt,i.height+bt],[-bt,i.height+bt]],u=[],d=[];for(let[_,v]of h){let b=e(_,v);u.push(b.x,.006,b.z),d.push((_+bt)/(t*$t),(v+bt)/(n*$t))}let p=new Qe;p.setAttribute("position",new Ce(u,3)),p.setAttribute("uv",new Ce(d,2)),p.setIndex([0,1,2,0,2,3,0,2,1,0,3,2]);let f=new gt({vertexShader:Tf,fragmentShader:Ef,uniforms:{fog:{value:c},uNoise:{value:Af()},uTime:{value:0},uGrid:{value:new ce(t,n)},uEdge:{value:wf}},transparent:!0,depthWrite:!1,depthTest:!1}),x=new Ke(p,f);x.renderOrder=100;let m=(_,v)=>{let b=Math.floor((_+bt)/$t),P=Math.floor((v+bt)/$t);return b<0||P<0||b>=t||P>=n?-1:P*t+b};function g(_,v){r.fill(0);for(let P of _){let E=P.radius+Sd,D=Math.max(0,Math.floor((P.x-E+bt)/$t)),F=Math.min(t-1,Math.ceil((P.x+E+bt)/$t)),k=Math.max(0,Math.floor((P.y-E+bt)/$t)),W=Math.min(n-1,Math.ceil((P.y+E+bt)/$t));for(let X=k;X<=W;X++){let V=(X+.5)*$t-bt;for(let $=D;$<=F;$++){let Y=($+.5)*$t-bt,ee=Math.hypot(Y-P.x,V-P.y);if(ee>=E)continue;let Z=ee<=P.radius?1:1-(ee-P.radius)/Sd,oe=X*t+$;Z>r[oe]&&(r[oe]=Z),Z>a[oe]&&(a[oe]=Z)}}}let b=(P,E)=>{for(let D=0;D<n;D++)for(let F=0;F<t;F++){let k=0,W=0;for(let X=-3;X<=3;X++){let V=F+X;V>=0&&V<t&&(k+=P[D*t+V],W++)}s[D*t+F]=k/W}for(let D=0;D<n;D++)for(let F=0;F<t;F++){let k=0,W=0;for(let X=-3;X<=3;X++){let V=D+X;V>=0&&V<n&&(k+=s[V*t+F],W++)}E[D*t+F]=k/W}};b(r,o);for(let P=0;P<r.length;P++)l[P*4]=Math.round(Math.min(1,o[P]*1.15)*255);b(a,o);for(let P=0;P<r.length;P++)l[P*4+1]=Math.round(Math.min(1,o[P]*1.15)*255),l[P*4+3]=255;c.needsUpdate=!0,f.uniforms.uTime.value=v}return{mesh:x,update:g,visible:(_,v)=>{let b=m(_,v);return b<0?0:r[b]},explored:(_,v)=>{let b=m(_,v);return b>=0&&a[b]>.5}}}var Gt=1.75,at=0,Td=.96,Lt=1.7,_r=1.26,Rf=.72,Ed=.7,uo=.3,Cf=1.5,Ui=54*Math.PI/180,Pf=.22,Lf=10,If=20,yc=1e6,Uf=.95,Df=.45,ma=Math.round(128*1.5),po=Math.round(228*1.5),Ad=3,vr=2,mo={hero:{width:.9*Lt,height:.12*Lt},elite:{width:1.2*Lt,height:.16*Lt},hq:{width:2.2*Lt,height:.2*Lt},inset:.025*Lt,revealSeconds:3},Nf={tank:{kind:"crownguard",side:"player",scale:1.2,walkRate:1.2,standIn:{kind:"lora",side:"player",scale:1.2,hover:{period:1.4,lift:.16,bob:.07},collapse:!0}},swarm:{kind:"pip",side:"player",scale:.9,hover:{period:1.6,lift:.3,bob:.08},standIn:{kind:"wolf",side:"player",scale:1.4,walkRate:1.4}},warrior:{kind:"raider",side:"player",scale:1,walkRate:1},archer:{kind:"ladystriker",side:"player",scale:1,walkRate:1.4},troop:{kind:"sirhoya",side:"enemy",scale:1,walkRate:1.18}};function _t(i,e){return{x:(St.width-i)*Gt,z:(St.height-e)*Gt}}function bc(i,e){return{x:St.width-i/Gt,y:St.height-e/Gt}}function Rd(i,e=1.70158){return i-=1,i*i*((e+1)*i+e)+1}function zn(i){return i<0?0:i>1?1:i}function Ff(i,e){return(Math.atan2(i,e)*180/Math.PI+360)%360}function Mc(i){let e=new Pt(i);return e.colorSpace=Dt,e.magFilter=ft,e.minFilter=ft,e.needsUpdate=!0,e}var Of=`
  varying vec2 vUv;
  varying vec2 vWorld;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,Bf=`
  uniform sampler2D field;
  uniform float uFront;
  uniform float uHalf;
  uniform float uShoulder;
  uniform float uMaxDist;
  varying vec2 vUv;
  varying vec2 vWorld;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  void main() {
    vec4 f = texture2D(field, vUv);
    float d = f.r * uMaxDist + (noise(vWorld * 1.3) - 0.5) * 0.22;
    float alpha = 1.0 - smoothstep(uHalf, uHalf + uShoulder, d);
    if (alpha <= 0.001) discard;
    float edge = smoothstep(uHalf * 0.45, uHalf, d);
    // Linear values (colorspace_fragment converts to sRGB): packed earth a shade darker than the sand.
    vec3 color = mix(vec3(0.52, 0.40, 0.24), vec3(0.36, 0.26, 0.15), edge);
    // Taken ground: the worn border picks up the player's blue, like Harbor Rush's captured tiles.
    float taken = 1.0 - smoothstep(uFront - 0.004, uFront + 0.004, f.g);
    float band = smoothstep(uHalf * 0.62, uHalf * 0.9, d) * (1.0 - smoothstep(uHalf * 1.02, uHalf * 1.25, d));
    color = mix(color, vec3(0.24, 0.54, 0.77), band * taken * 0.85);
    color *= 0.94 + noise(vWorld * 9.0) * 0.08 + hash(floor(vWorld * 24.0)) * 0.05;
    gl_FragColor = vec4(color, alpha * 0.96);
    #include <colorspace_fragment>
  }
`;function zf(){let e=document.createElement("canvas");e.width=704,e.height=128;let t=e.getContext("2d");t.font='900 44px "Segoe UI", sans-serif',t.textAlign="center",t.textBaseline="middle",t.lineWidth=8,t.lineJoin="round",t.strokeStyle="#1b1b26";let n=["#ffe36b","#ff7b6b"];for(let a=0;a<2;a++){t.fillStyle=n[a];for(let s=0;s<11;s++){let o=s===10?"+":String(s),l=s*64+64/2,c=a*64+64/2+2;t.strokeText(o,l,c),t.fillText(o,l,c)}}let r=new Wr(e);return r.colorSpace=Dt,r.minFilter=ft,r.generateMipmaps=!1,{texture:r,size:.55,advance:.3}}function Cd(i,e,t){let n=new so({canvas:i,antialias:!0,alpha:!1});n.setPixelRatio(Math.min(Cf,window.devicePixelRatio||1));let r=!!n.getContext().getContextAttributes()?.antialias,a=new Vr;a.background=new Ue("#173044");let s=new R(St.width*Gt/2,0,St.height*Gt/2),o=St.width*Gt/2+Td,l=St.height*Gt/2+Td,c=new Mi(-10,10,10,-10,.1,200),h=60;a.add(new aa(16777215,.72));let u=new ra(16774368,1.1);u.position.set(-4,18,7),a.add(u);let d=performance.now(),p=()=>(performance.now()-d)/1e3,f=Mc(e.shadow),x={centerX:s.x,centerZ:s.z,halfX:o+3.3,halfZ:l+1.8,cornerRadius:7.9},m=xd(x);m.mesh.renderOrder=1,a.add(m.mesh);let g=W();a.add(g.mesh);let _=wd(St,_t);a.add(_.mesh);let v={tank:4,warrior:4,archer:5,swarm:3.4},b=5.5,P=new Map,E=(he,ne)=>{let B=bc(he,ne);return _.visible(B.x,B.y)>=.4};function D(he){let ne=[],B=t.path.at(0);ne.push({x:B.x,y:B.y,radius:b});for(let O of t.units)O.alive&&O.side==="player"&&ne.push({x:O.x,y:O.y,radius:v[O.kind]});if(t.ended&&t.won)for(let O of t.buildings)ne.push({x:O.x,y:O.y,radius:6});_.update(ne,he)}let F=t.buildings.map(he=>_t(he.x,he.y)),k=(he,ne)=>{let B=bc(he,ne);return t.path.nearest(B.x,B.y).d*Gt<2.4?!0:F.some(O=>(O.x-he)**2+(O.z-ne)**2<2.2**2)};a.add(Md(x,k,f));function W(){let he=new Uint8Array(ma*po*4),ne=St.width*Gt+vr*2,B=St.height*Gt+vr*2,O=t.path.length,se=t.path.at(0),ue=t.path.at(O);for(let w=0;w<po;w++)for(let G=0;G<ma;G++){let q=bc(-vr+(G+.5)/ma*ne,-vr+(w+.5)/po*B),te=t.path.nearest(q.x,q.y),j=Math.min(te.d*Gt,Math.hypot(q.x-se.x,q.y-se.y)*Gt-.5,Math.hypot(q.x-ue.x,q.y-ue.y)*Gt-.9),re=(w*ma+G)*4;he[re]=Math.round(zn(j/Ad)*255),he[re+1]=Math.round(zn(te.s/O)*255),he[re+3]=255}let xe=new $n(he,ma,po);xe.magFilter=ft,xe.minFilter=ft,xe.needsUpdate=!0;let ge=new gt({vertexShader:Of,fragmentShader:Bf,uniforms:{field:{value:xe},uFront:{value:0},uHalf:{value:Uf},uShoulder:{value:Df},uMaxDist:{value:Ad}},transparent:!0,depthWrite:!1}),Te=new Qe,Xe=-vr,Oe=-vr,Mt=Xe+ne,ht=Oe+B;Te.setAttribute("position",new Ce([Xe,.004,Oe,Mt,.004,Oe,Mt,.004,ht,Xe,.004,ht],3)),Te.setAttribute("uv",new Ce([0,0,1,0,1,1,0,1],2)),Te.setIndex([0,2,1,0,3,2]);let Ct=new Ke(Te,ge);return Ct.renderOrder=2,{mesh:Ct,material:ge}}let X=new wt,V=new wt;a.add(X,V);let $=new Map,Y=new Map,ee=new lo(f,-1e6);X.add(ee.mesh);let Z=new co(yc);V.add(Z.mesh);let oe={background:new Ue(1315866),player:new Ue(4253264),enemy:new Ue(15876148),timer:new Ue(16756768),full:new Ue(7040888)},le=zf(),Se=new Ii(le.texture,{grounded:!1,premultiplied:!1,depthTest:!1,msaa:r,renderOrder:yc+1});V.add(Se.mesh);let Ae=Mc(e.coin),ae=new Ii(Ae,{grounded:!1,premultiplied:!1,depthTest:!1,msaa:r,renderOrder:yc+2}),de=new Ii(Ae,{grounded:!0,premultiplied:!1,depthTest:!0,msaa:r,renderOrder:0});V.add(ae.mesh),X.add(de.mesh);let ye=new Ue(16777215),ve=new Map,A=new Map,y=new Map,M=new Map,I=new Map,C=[],T=[],L=[],S=[],U=-1,N={top:0,bottom:0},Q=he=>e.sheets.get(he),H=Object.fromEntries(Object.entries(Nf).map(([he,ne])=>[he,ne.standIn&&!e.sheets.has(`${ne.kind}_${ne.side}_walk_front`)?ne.standIn:ne]));function J(he,ne){let B=Y.get(he);if(!B){let O=$.get(he);O||(O=Mc(he.image),$.set(he,O)),B=new Ii(O,{grounded:ne==="actor",premultiplied:!!he.premultiplied,depthTest:!0,msaa:r,renderOrder:ne==="actor"?0:ne==="shot"?Lf:If}),X.add(B.mesh),Y.set(he,B)}return B}function K(he,ne,B,O,se,ue,xe,ge=null,Te=1,Xe=0,Oe=!1){let Mt=Math.ceil(ne.frames/ne.columns),ht=Math.max(0,Math.min(ne.frames-1,B)),Ct=ht%ne.columns,w=Math.floor(ht/ne.columns),G=ne.worldHeight*Lt*xe,q=ge??ye,te=ne.anchorX??.5,j=Ct/ne.columns,re=1/ne.columns;he.push(O,se,ue,G,G,Oe?1-te:te,1-ne.anchorY,Oe?j+re:j,1-(w+1)/Mt,Oe?-re:re,1/Mt,q.r,q.g,q.b,Te,Xe)}function ie(he,ne){if(he.frames<=1||he.duration<=0)return 0;let B=he.loop!==!1?ne%he.duration/he.duration:Math.min(.9999,ne/he.duration);return Math.floor(B*he.frames)}function pe(he,ne,B,O,se,ue=1,xe,ge={}){let Te=Q(he);Te&&C.push({sheet:Te,kind:ne,start:p()+(ge.delay??0),x:B,y:O,z:se,scale:ue*Ed,tint:xe===void 0?null:new Ue(xe),mirror:!!ge.mirror,fade:ge.fade??0,collapse:!!ge.collapse})}function _e(he){let ne=(p()-he)/Pf;return ne>=1?1:Rd(zn(ne))}function Ee(he,ne,B,O,se,ue){let{width:xe,height:ge}=mo[he],Te=xe-mo.inset*2,Xe=Math.max(.001,Te*zn(se));Z.push(ne,B,O,0,xe,ge,oe.background),Z.push(ne,B,O,-Te/2+Xe/2,Xe,ge-mo.inset*2,oe[ue])}function Ie(he,ne,B,O){let se=he.kind==="hq"?An:rn,ue=0;for(let Oe of t.units)Oe.alive&&Oe.side==="enemy"&&Oe.home===he.id&&ue++;let xe=ue>=se.maxTroops,ge=1.5,Te=.16,Xe=xe?1:1-he.spawnTimer/se.spawnEvery;Z.push(ne,B,O,0,ge,Te,oe.background),Z.push(ne,B,O,-(ge-.06)/2+(ge-.06)*zn(Xe)/2,(ge-.06)*zn(Xe),Te-.06,xe?oe.full:oe.timer),!xe&&t.units.some(Oe=>Oe.alive&&Oe.side==="player")&&je(String(Math.max(1,Math.ceil(he.spawnTimer))),!1,ne,B+.42,O,1)}function je(he,ne,B,O,se,ue){let xe=B-(he.length-1)*le.advance/2;for(let ge=0;ge<he.length;ge++){let Te=he[ge]==="+"?10:he.charCodeAt(ge)-48;Te<0||Te>10||(Se.push(xe,O,se,le.size,le.size,.5,.5,Te/11,ne?0:.5,1/11,.5,1,1,1,ue,0),xe-=le.advance)}}let Pe=(()=>{let ne=1/0,B=-1/0,O=1/0,se=-1/0,ue=(ge,Te,Xe)=>{for(let[Oe,Mt]of[[-Xe,-Xe],[Xe,Xe]]){let ht=_t(Math.max(0,Math.min(St.width,ge+Oe)),Math.max(0,Math.min(St.height,Te+Mt)));ne=Math.min(ne,ht.x),B=Math.max(B,ht.x),O=Math.min(O,ht.z),se=Math.max(se,ht.z)}};for(let ge=0;ge<t.path.xs.length;ge+=4)ue(t.path.xs[ge],t.path.ys[ge],2.1);for(let ge of t.buildings)ue(ge.x,ge.y,ge.kind==="hq"?1.2:.8);let xe=t.path.at(0);return ue(xe.x-xe.tx*.9,xe.y-xe.ty*.9+.9,1),{x:(ne+B)/2,z:(O+se)/2,halfX:(B-ne)/2,halfZ:(se-O)/2}})(),Me=NaN,Ge=NaN,et=0,$e=0,we=-1,Ve=3;function tt(he,ne){if(Number.isNaN(Me))return;let B=i.clientWidth||window.innerWidth,O=(c.right-c.left)/Math.max(1,B);Me+=he*O,Ge+=ne*O/Math.sin(Ui),we=p()+Ve}function Hn(){let he=t.buildings.find(B=>B.kind==="hq");if(t.ended&&t.won&&he)return _t(he.x,he.y);let ne=t.path.at(t.front>0?t.front+2.5:3);return _t(ne.x,ne.y)}function ii(he=!1){let ne=i.clientWidth||window.innerWidth,B=Math.max(1,i.clientHeight||window.innerHeight),O=ne/B,se=Math.min(.4,N.top/B),ue=Math.min(.4,N.bottom/B),xe=1-se-ue,Te=Math.max((Pe.halfZ*Math.sin(Ui)+1.2)/xe,Pe.halfX/O)*Rf/(1+(1.5-1)*.6);c.left=-Te*O,c.right=Te*O,c.top=Te,c.bottom=-Te,c.updateProjectionMatrix();let Xe=Hn(),Oe=p(),Mt=Math.min(.1,Math.max(0,Oe-et));if(he||Number.isNaN(Me))Me=Xe.x,Ge=Xe.z;else if(!(Oe<we)){let j=1-Math.exp(-2.2*Mt);Me+=(Xe.x-Me)*j,Ge+=(Xe.z-Ge)*j}et=Oe;let ht=Te*O,Ct=xe*Te/Math.sin(Ui),w=(j,re,fe)=>re>fe?(re+fe)/2:Math.max(re,Math.min(fe,j));Me=w(Me,Pe.x-Pe.halfX+ht,Pe.x+Pe.halfX-ht),Ge=w(Ge,Pe.z-Pe.halfZ+Ct-.6,Pe.z+Pe.halfZ-Ct+1.2);let G=(Te*2*se-Te*2*ue)/2;$e=Math.max(0,$e-Mt*1.8);let q=$e>0?{x:(Math.random()-.5)*$e,z:(Math.random()-.5)*$e}:{x:0,z:0},te=new R(Me+q.x,0,Ge+q.z+G/Math.sin(Ui));c.position.set(te.x,Math.sin(Ui)*h,te.z-Math.cos(Ui)*h),c.lookAt(te)}function Vt(he){he&&(N=he);let ne=i.clientWidth||window.innerWidth,B=i.clientHeight||window.innerHeight;n.setSize(ne,B,!1),ii()}let zt=new R;function Tn(he,ne){let B=_t(he,ne);return c.updateMatrixWorld(),zt.set(B.x,at,B.z).project(c),{x:(zt.x*.5+.5)*(i.clientWidth||1),y:(-zt.y*.5+.5)*(i.clientHeight||1)}}let z=null;function ri(he){let ne=p();for(let B of he)switch(B.type){case"spawn":{let O=H[B.kind];I.set(B.id,O.side);let se=_t(B.x,B.y);pe(O.side==="player"?"vfx_portal_blue":"vfx_portal_red","vfx",se.x,at+.02,se.z,O.side==="player"?1.6:1);break}case"build":{let O=_t(B.x,B.y);pe("vfx_spawn_red","vfx",O.x,at+.02,O.z,1.2,16731469);break}case"swing":{let O=ve.get(B.from);O&&(O.attackAt=ne);let se=t.units.find(xe=>xe.id===B.from);if(se?.kind==="swarm"){let xe=_t(se.x,se.y);pe("vfx_flash_gunna","vfx",xe.x,at+uo*Lt+.3,xe.z,.8)}let ue=se?.kind==="swarm"?"vfx_hit_gunna":I.get(B.from)==="enemy"?"vfx_hit_sword":I.get(B.from)==="player"?"vfx_hit_blue":"vfx_hit_red";z={from:B.from,to:B.to,shot:null,melee:ue};break}case"shoot":{let O=ve.get(B.from);O&&(O.attackAt=ne);let se=_t(B.x0,B.y0),ue=_t(B.x1,B.y1),xe=t.buildings.find(Oe=>Oe.id===B.from),ge=at+uo*Lt;if(xe){y.set(B.from,{x:ue.x,z:ue.z});let Oe=Q(xe.kind==="hq"?"base_enemy":"tower_enemy");ge=at+(Oe?.muzzleY??1.4)*Lt*_r,pe("vfx_siege_muzzle","vfx",se.x,ge,se.z,.8)}else pe("vfx_flash_arrow","vfx",se.x,ge,se.z);let Te=B.kind==="arrow",Xe={sheet:Q(Te?"proj_arrow_player":"proj_siegebolt_enemy"),start:ne,duration:Math.max(.12,Math.hypot(ue.x-se.x,ue.z-se.z)/(Te?16:13)),x0:se.x,y0:ge,z0:se.z,x1:ue.x,y1:at+uo*Lt,z1:ue.z,impact:Te?"vfx_hit_arrow":"vfx_siege_impact",impactScale:Te?1:.55,hit:null};T.push(Xe),z={from:B.from,to:B.to,shot:Xe,melee:""};break}case"hit":{M.set(B.id,ne+mo.revealSeconds);let O=!B.building&&I.get(B.id)==="player";if(z&&z.to===B.id&&z.shot)z.shot.hit={amount:B.amount,taken:O};else{let se=_t(B.x,B.y);pe(z?.to===B.id?z.melee:"vfx_hit_red","vfx",se.x,at+uo*Lt,se.z,B.building?1.3:1),L.push({text:String(B.amount),taken:O,start:ne,x:se.x,z:se.z})}z=null;break}case"death":{let O=H[B.kind],se=_t(B.x,B.y),ue=ve.get(B.id),xe=ue?.facing??(O.side==="player"?"back":"front"),ge=!!O.collapse;pe(`${O.kind}_${O.side}_death_${xe}`,"actor",se.x,at+.02,se.z,O.scale/Ed,void 0,{mirror:ue?.mirror??!1,fade:ge?.9:.45,collapse:ge}),pe("vfx_death","vfx",se.x,at+.02,se.z),ge&&pe("vfx_death","vfx",se.x,at+.02,se.z,1.4,void 0,{delay:1.2});break}case"destroyed":{let O=_t(B.x,B.y),se=B.kind==="hq",ue=se?1.6:1;pe("vfx_siege_impact","vfx",O.x,at+1.1*ue,O.z,2.2*ue),pe("vfx_burst","vfx",O.x,at+.02,O.z,2.4*ue),pe("vfx_burst","vfx",O.x,at+.4,O.z,1.7*ue,void 0,{delay:.14});for(let xe=0;xe<6;xe++){let ge=xe/6*Math.PI*2+Math.random()*.5,Te=(.6+Math.random()*.9)*ue;pe("vfx_death","vfx",O.x+Math.cos(ge)*Te,at+.15+xe*.22,O.z+Math.sin(ge)*Te*.7,(1.4+Math.random()*.8)*ue,void 0,{delay:.05+xe*.11})}if(pe("vfx_death","vfx",O.x-.3,at+1.4*ue,O.z,2.3*ue,void 0,{delay:.85}),pe("vfx_death","vfx",O.x+.4,at+2*ue,O.z+.2,2.6*ue,void 0,{delay:1.3}),!se)for(let xe=0;xe<14;xe++){let ge=Math.random()*Math.PI*2,Te=1.5+Math.random()*2.5;S.push({start:ne+Math.random()*.2,x:O.x,z:O.z,vx:Math.cos(ge)*Te,vz:Math.sin(ge)*Te*.8,vy:4+Math.random()*3,pile:!0,fade:!0})}if($e=Math.max($e,se?.9:.5),se){U=ne;for(let xe=0;xe<70;xe++){let ge=Math.random()*Math.PI*2,Te=1.2+Math.random()*3.2;S.push({start:ne+Math.random()*.5,x:O.x,z:O.z,vx:Math.cos(ge)*Te,vz:Math.sin(ge)*Te*.8-1.2,vy:4+Math.random()*4,pile:!0})}}break}case"gold":{let O=_t(B.x,B.y);S.push({start:ne,x:O.x,z:O.z,vx:0,vz:0,vy:0,pile:!1}),L.push({text:`+${B.amount}`,taken:!1,start:ne+.15,x:O.x,z:O.z+.2});break}case"end":break}}function ga(he){let ne=Q("rubble_enemy");for(let O of t.buildings){let se=_t(O.x,O.y),ue=O.kind==="hq",xe=_.visible(O.x,O.y)>=.5;xe&&P.set(O.id,{alive:O.alive});let ge=P.get(O.id);if(!ge)continue;let Te=xe?O.alive:ge.alive,Xe=null;if(!Te){ne&&K(J(ne,"actor"),ne,0,se.x,at+.02,se.z,_r*.7*(ue?1.5:1),Xe);continue}let Oe=Q(ue?"base_enemy":"tower_enemy");if(!Oe)continue;if(!xe){K(J(Oe,"actor"),Oe,dt(Oe,O,se),se.x,at+.02,se.z,_r*(ue?1.25:1),Xe);continue}A.has(O.id)||A.set(O.id,he);let Mt=O.rising>0?Rd(zn(1-O.rising/rn.buildTime))*.9+.1:_e(A.get(O.id)),ht=_r*(ue?1.25:1)*Mt;K(J(Oe,"actor"),Oe,dt(Oe,O,se),se.x,at+.02,se.z,ht);let Ct=(ue?1.15:.75)*_r*Mt*(ue?1.25:1);ee.push(se.x,at+.015,se.z,Ct*2*Lt*.6,Ct*1.4*Lt*.6,.4);let w=at+Oe.worldHeight*Lt*ht*Oe.anchorY+.15;ue?Ee("hq",se.x,w,se.z,O.hp/O.maxHp,"enemy"):(M.get(O.id)??0)>he&&Ee("elite",se.x,w,se.z,O.hp/O.maxHp,"enemy"),O.rising<=0&&Ie(O,se.x,w+.42,se.z)}let B=Q("base_player");if(B){let O=t.path.at(0),se=_t(O.x-O.tx*.9,O.y-O.ty*.9+.9);K(J(B,"actor"),B,0,se.x,at+.02,se.z,_r),ee.push(se.x,at+.015,se.z,1.8,1.3,.4)}}function dt(he,ne,B){if(!he.bearingSheet)return 0;let O=y.get(ne.id),se=O?Ff(O.x-B.x,O.z-B.z):180;return Math.round(se/(360/he.frames))%he.frames}let Di=1;function _a(he){let ne=new Set;for(let B of t.units){if(!B.alive)continue;ne.add(B.id);let O=H[B.kind];I.has(B.id)||I.set(B.id,O.side);let se=_t(B.px+(B.x-B.px)*Di,B.py+(B.y-B.py)*Di),ue=ve.get(B.id);if(!ue){let Ze=O.side==="player";ue={key:"",facing:Ze?"back":"front",mirror:!1,headX:Ze?1:-1,headY:Ze?1:-1,lastX:se.x,lastZ:se.z,born:he,lastMove:-1,attackAt:-1},ve.set(B.id,ue)}let xe=_t(B.x,B.y),ge=_t(B.px,B.py),Te=xe.x-ge.x,Xe=xe.z-ge.z,Oe=B.kind==="troop"?At.speed:nn[B.kind].speed,Mt=Math.hypot(B.x-B.px,B.y-B.py)>Oe*.05*.3;Mt&&(ue.lastMove=he),ue.lastX=se.x,ue.lastZ=se.z;let ht=B.target?t.units.find(Ze=>Ze.id===B.target&&Ze.alive)??t.buildings.find(Ze=>Ze.id===B.target&&Ze.alive):void 0,Ct=0,w=0;if(ht&&he-ue.attackAt<1.5){let Ze=_t(ht.x,ht.y);Ct=-(Ze.x-se.x),w=Ze.z-se.z}else Mt&&(Ct=-Te,w=Xe);let G=Math.hypot(Ct,w);if(G>1e-4){let Ze=ht?.3:.06;ue.headX+=(Ct/G-ue.headX)*Ze,ue.headY+=(w/G-ue.headY)*Ze}Math.abs(ue.headY)>.3&&(ue.facing=ue.headY>0?"back":"front"),Math.abs(ue.headX)>.3&&(ue.mirror=ue.facing==="back"?ue.headX<0:ue.headX>0);let q=Q(`${O.kind}_${O.side}_attack_${ue.facing}`),j=he-ue.lastMove<.15?O.walkClip??"walk":"idle",re=ue.born,fe=B.kind==="troop"?At.cooldown:nn[B.kind].cooldown,be=q&&fe>0?Math.max(1,q.duration/fe):1;q&&ue.attackAt>=0&&(he-ue.attackAt)*be<q.duration&&(j="attack",re=ue.attackAt);let Re=Q(`${O.kind}_${O.side}_${j}_${ue.facing}`);if(!Re||O.side==="enemy"&&_.visible(B.x,B.y)<.5)continue;let De=_e(ue.born),Le=0,Ne=1;if(O.hover){let Ze=((he-ue.born)/O.hover.period+B.id*.37)*Math.PI*2;Le=(O.hover.lift+Math.sin(Ze)*O.hover.bob)*Math.min(1,(he-ue.born)/.4),Ne=1+Math.sin(Ze*2+.6)*.015}let He=j==="attack"?be:j==="walk"?O.walkRate??1:1;K(J(Re,"actor"),Re,ie(Re,(he-re)*He),se.x,at+.02+Le,se.z,O.scale*De*Ne,null,1,0,ue.mirror);let nt=.5*O.scale*De*(1-Le*.5);ee.push(se.x,at+.012,se.z,nt*2,nt*1.4,.45-Le*.6),(M.get(B.id)??0)>he&&Ee("hero",se.x,at+Re.worldHeight*Lt*O.scale*Re.anchorY+.1,se.z,B.hp/B.maxHp,O.side)}for(let B of ve.keys())ne.has(B)||ve.delete(B)}function va(he){let ne=Math.sin(Ui);for(let B=T.length-1;B>=0;B--){let O=T[B],se=(he-O.start)/O.duration;if(se>=1){T.splice(B,1),pe(O.impact,"vfx",O.x1,O.y1,O.z1,O.impactScale),O.hit&&L.push({text:String(O.hit.amount),taken:O.hit.taken,start:he,x:O.x1,z:O.z1});continue}if(!O.sheet)continue;let ue=O.x0+(O.x1-O.x0)*se,xe=O.z0+(O.z1-O.z0)*se,ge=O.y0+(O.y1-O.y0)*se+Math.sin(Math.PI*se)*.6,Te=O.sheet.headingScreenRight?Math.atan2((O.z1-O.z0)*ne,-(O.x1-O.x0)):0;E(ue,xe)&&K(J(O.sheet,"shot"),O.sheet,ie(O.sheet,he),ue,ge,xe,1,null,1,Te)}}function xa(he){for(let ne=C.length-1;ne>=0;ne--){let B=C[ne],O=he-B.start;if(O<0)continue;let se=B.sheet.duration+B.fade;if(O>=se){C.splice(ne,1);continue}let ue=B.fade>0&&O>B.sheet.duration?1-(O-B.sheet.duration)/B.fade:1,xe=B.y,ge=0,Te=1;if(B.collapse){let Xe=zn((O/se-.4)/.6),Oe=Xe*Xe*(3-2*Xe);ge=(B.mirror?1:-1)*Oe*.5,xe-=Oe*.35,Te=1-Oe*.25}E(B.x,B.z)&&K(J(B.sheet,B.kind),B.sheet,ie(B.sheet,O),B.x,xe,B.z,B.scale*Te,B.tint,ue,ge,B.mirror)}for(let ne=L.length-1;ne>=0;ne--){let B=L[ne],O=(he-B.start)/.8;if(!(O<0)){if(O>=1){L.splice(ne,1);continue}E(B.x,B.z)&&je(B.text,B.taken,B.x,1.2+O*1.1,B.z,O<.6?1:1-(O-.6)/.4)}}for(let ne=S.length-1;ne>=0;ne--){let B=S[ne],O=he-B.start;if(O<0)continue;if(!B.pile){let Te=O/.9;if(Te>=1){S.splice(ne,1);continue}if(!E(B.x,B.z))continue;ae.push(B.x,1.3+Te*1.4,B.z,.55,.55,.5,.5,0,0,1,1,1,1,1,1-Te*Te,0);continue}let se=B.vy*2/9.8,ue=Math.min(O,se),xe=Math.max(0,B.vy*ue-4.9*ue*ue),ge=1;if(B.fade&&(ge=1-zn((O-se-.35)/.4),ge<=0)){S.splice(ne,1);continue}de.push(B.x+B.vx*ue,at+.05+xe,B.z+B.vz*ue,.5,.5,.5,.1,0,0,1,1,1,1,1,ge,0)}}function ya(he=1){let ne=p();Di=Math.max(0,Math.min(1,he)),ii(),m.update(ne,c),g.material.uniforms.uFront.value=t.front>0?(t.front+.2)/t.path.length:-1;for(let B of Y.values())B.begin();ee.begin(),Z.begin(),Se.begin(),ae.begin(),de.begin(),D(ne),ga(ne),_a(ne),va(ne),xa(ne);for(let B of Y.values())B.end();ee.end(),Z.end(),Se.end(),ae.end(),de.end(),n.render(a,c)}return{resize:Vt,onEvents:ri,render:ya,payoffTime:()=>U<0?-1:p()-U,dragBy:tt,project:Tn}}var Pd="./art/audio/",wc={bgm:{file:"bgm_combat.mp3",volume:.375},spawn_lora:{file:"spawn_lora.mp3",volume:1},spawn_raider:{file:"spawn_raider.mp3",volume:.5},spawn_ladystriker:{file:"spawn_ladystriker.mp3",volume:1},spawn_enemy:{file:"spawn_enemy.mp3",volume:.6,cooldownMs:250},spawn_swarm:{file:"spawn_enemy.mp3",volume:.8,cooldownMs:250},attack:{file:"attack.mp3",volume:.4,pitchVar:.08,cooldownMs:70,voices:10},destroyed:{file:"building_destroy.mp3",volume:.9,cooldownMs:80},reward:{file:"reward.mp3",volume:.45,cooldownMs:120,voices:4},buy:{file:"buy.mp3",volume:.7},button:{file:"button.mp3",volume:.8,pitchVar:.05},win:{file:"win.mp3",volume:1},lose:{file:"lose.mp3",volume:1}},Hf={tank:"spawn_lora",warrior:"spawn_raider",archer:"spawn_ladystriker",swarm:"spawn_swarm",troop:"spawn_enemy"};function Ld(){let i=new Map,e=new Map,t=new Audio(Pd+wc.bgm.file);t.loop=!0,t.volume=wc.bgm.volume;let n=!1;function r(a){if(!n||a==="bgm")return;let s=wc[a],o=performance.now();if(s.cooldownMs&&o-(e.get(a)??-1/0)<s.cooldownMs)return;e.set(a,o);let l=i.get(a);l||i.set(a,l=[]);let c=l.find(h=>h.paused||h.ended);if(!c){if(l.length>=(s.voices??3))return;c=new Audio(Pd+s.file),l.push(c)}c.volume=s.volume,c.playbackRate=s.pitchVar?1+(Math.random()*2-1)*s.pitchVar:1,c.currentTime=0,c.play().catch(()=>{})}return{unlock(){n||(n=!0,t.play().catch(()=>{}))},play:r,stopMusic(){t.pause()},onEvents(a){for(let s of a)switch(s.type){case"spawn":{let o=Hf[s.kind];o&&r(o);break}case"swing":case"shoot":r("attack");break;case"destroyed":r("destroyed");break;case"gold":r("reward");break;case"end":t.pause(),r(s.won?"win":"lose");break}}}}var Id="https://example.com/store",xr=document.querySelector("canvas"),fa=document.querySelector("#gold"),kf=fa.querySelector("span"),Rc=document.querySelector("#timer"),Gf=Rc.querySelector("span"),Vf=document.querySelector("#hud"),Tc=document.querySelector("#bar"),go=document.querySelector("#arrow"),_o=document.querySelector("#glow"),Cc=document.querySelector("#toast"),yr=document.querySelector("#end"),Dc=document.querySelector("#loading"),vo=document.querySelector("#countdown"),Wf=Dc.querySelector("span"),ni=new Map;for(let i of document.querySelectorAll(".card"))ni.set(i.dataset.kind,i);for(let[i,e]of ni){let t=nn[i];e.querySelector(".cost b").textContent=`${t.cost}`,e.querySelector('[data-stat="hp"]').textContent=i==="swarm"?`${wr}\xD7${t.hp}`:`${t.hp}`,e.querySelector('[data-stat="damage"]').textContent=`${t.damage}`,e.querySelector('[data-stat="move"]').textContent=`${Math.round(t.speed*100)}`,e.title=`${t.hp} HP \xB7 ${t.damage} damage${i==="swarm"?` each, ${wr} per tap`:""} \xB7 move ${Math.round(t.speed*100)}`}{let i=ni.get("swarm").querySelector(".art");i.onerror=()=>{i.onerror=null,i.src=ih(),ni.get("swarm").querySelector(".role").textContent="WOLVES"},i.src="./art/ui/cards/pip.webp"}var Pc=new URLSearchParams(location.search),Lc=Number(Pc.get("seek")??0),Ud=(Pc.has("autoplay")||Lc>0)&&!Pc.has("idle"),Dd=["tank","warrior","archer"],Nd=["tank","swarm","warrior","archer"],vt=Kc(),Ic=Hc(),br=Ld(),Uc=0,Nc=0,xo=0,Fd=vt.gold,Od=["The right troop order breaks any defense","Lead with a tank: it soaks the tower fire","Warriors wreck barracks. Archers pick off troops","Pips are fast and fierce, but fragile","Destroy barracks to stop the enemy troops"],Ec=document.querySelector("#hook"),Ac=0;setInterval(()=>{Ec.classList.add("out"),setTimeout(()=>{Ac=(Ac+1)%Od.length,Ec.textContent=Od[Ac],Ec.classList.remove("out")},450)},1e4);var Bd=0,zd=1/0;Vc(i=>{Ic.paused=!i});function yo(i,e){i.classList.remove(e),i.offsetWidth,i.classList.add(e)}function Xf(i){let e=i.querySelector(".window").getBoundingClientRect(),t=e.left+e.width/2,n=e.top+e.height/2;for(let r=0;r<10;r++){let a=r/10*Math.PI*2+Math.random()*.4,s=38+Math.random()*22,o=document.createElement("div");o.className="spark",o.style.left=`${t}px`,o.style.top=`${n}px`,o.style.setProperty("--dx",`${Math.cos(a)*s}px`),o.style.setProperty("--dy",`${Math.sin(a)*s*1.3}px`),document.body.append(o),o.addEventListener("animationend",()=>o.remove())}}function Yf(i){let e=fa.getBoundingClientRect(),t=document.createElement("div");t.className="gain outline",t.textContent=`+${i}`,t.style.left=`${e.right+6+Math.random()*10}px`,t.style.top=`${e.top+4}px`,document.body.append(t),t.addEventListener("animationend",()=>t.remove())}function jf(i,e){let t=i.querySelector(".cost").getBoundingClientRect(),n=document.createElement("div");n.className="spend outline",n.textContent=`\u2212${e}`,n.style.left=`${t.left+t.width/2}px`,n.style.top=`${t.top-8}px`,document.body.append(n),n.addEventListener("animationend",()=>n.remove())}function kd(i){let e=ni.get(i),t=vt.spawn(i);if(!t.ok){t.reason==="gold"&&(qf("Not enough gold yet"),yo(e,"denied"));return}yo(e,"fired"),Xf(e),jf(e,nn[i].cost),br.play("buy"),Uc++,Nc=0}function qf(i){Cc.textContent=i,Cc.classList.add("show"),xo=1.2}function Zf(){let i=window;i.ExitApi?i.ExitApi.exit():i.mraid?i.mraid.open(Id):window.open(Id,"_blank")}function Hd(){let i=Nd[Bd%Nd.length];vt.canAfford(i)&&(kd(i),Bd++)}function Kf(){if(!vt.ended){if(Uc<Dd.length)return Dd[Uc];if(!(Nc<3))return Xc.find(i=>vt.canAfford(i))}}function Jf(i){let e=Math.max(0,Math.ceil(i));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}async function $f(){let i=await ah(o=>{Wf.style.width=`${Math.round(o*100)}%`});Dc.hidden=!0;let e=Cd(xr,i,vt),t=()=>{let o=(window.innerWidth-24)/370,l=window.innerHeight*.34/187;Tc.style.zoom=`${Math.max(1,Math.min(2,o,l))}`,e.resize({top:Vf.getBoundingClientRect().bottom+30,bottom:window.innerHeight-Tc.getBoundingClientRect().top+8})};t(),window.addEventListener("resize",t);for(let[o,l]of ni)l.addEventListener("pointerdown",c=>{c.preventDefault(),br.unlock(),kd(o)});window.addEventListener("pointerdown",()=>br.unlock());let n=null;xr.addEventListener("pointerdown",o=>{n={id:o.pointerId,x:o.clientX,y:o.clientY},xr.setPointerCapture(o.pointerId)}),xr.addEventListener("pointermove",o=>{!n||o.pointerId!==n.id||(e.dragBy(o.clientX-n.x,o.clientY-n.y),n.x=o.clientX,n.y=o.clientY)});let r=o=>{n&&o.pointerId===n.id&&(n=null)};xr.addEventListener("pointerup",r),xr.addEventListener("pointercancel",r),document.querySelector("#retry").addEventListener("click",()=>{br.play("button"),location.reload()}),document.querySelector("#cta").addEventListener("click",()=>{br.play("button"),Zf()});for(let o=0;o<Lc*(1e3/50)&&!vt.ended;o++){Ud&&Hd(),vt.step();let l=o>=Lc*(1e3/50)-10;e.onEvents(vt.drainEvents().filter(c=>l||c.type==="destroyed"))}let a=performance.now();function s(o){let l=Math.min(100,o-a);a=o,vt.ended||(kc(Ic,l,50,()=>{Ud&&Hd(),vt.step()}),Nc+=l/1e3);let c=vt.drainEvents();for(let f of c)f.type==="gold"&&Yf(f.amount);e.onEvents(c),br.onEvents(c),e.render(vt.ended?1:Gc(Ic,50));let h=vt.gold;kf.textContent=`${h}`,h>Fd+5&&(fa.classList.remove("bump"),fa.offsetWidth,fa.classList.add("bump")),Fd=h;let u=Sa-vt.seconds;Gf.textContent=Jf(u),Rc.classList.toggle("low",u<=20);let d=Math.ceil(u);!vt.ended&&d!==zd&&(d<=20&&d>5&&d%5===0&&yo(Rc,"pulse"),d<=5&&d>0&&(vo.textContent=`${d}`,vo.hidden=!1,yo(vo,"tick")),zd=d),vt.ended&&(vo.hidden=!0);let p=Kf();for(let[f,x]of ni)x.setAttribute("aria-disabled",vt.canAfford(f)?"false":"true"),x.classList.toggle("hint",f===p);if(p){let f=ni.get(p).getBoundingClientRect();go.style.left=`${f.left+f.width/2}px`,go.style.top=`${f.top-58}px`,_o.style.left=`${f.left+f.width/2}px`,_o.style.top=`${f.top+f.height/2}px`,go.hidden=_o.hidden=!1}else go.hidden=_o.hidden=!0;xo>0&&(xo-=l/1e3,xo<=0&&Cc.classList.remove("show")),vt.ended&&yr.hidden&&(!vt.won||e.payoffTime()>2.2)&&(vt.won||(yr.classList.add("defeat"),yr.querySelector("h2").textContent="DEFEAT",yr.querySelector("p").textContent="Time's up and the HQ still stands. Pick the right order and break through!",yr.querySelector(".shot").src="./art/ui/postgame/level_defeat.webp"),yr.hidden=!1,Tc.hidden=!0),requestAnimationFrame(s)}requestAnimationFrame(s)}$f().catch(i=>{console.error(i),Dc.textContent="Failed to load"});})();
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
