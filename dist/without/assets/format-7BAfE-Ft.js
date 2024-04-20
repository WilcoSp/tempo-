var x=Object.defineProperty;var a=(e,t)=>x(e,"name",{value:t,configurable:!0});var Y=/^([0-9]{4})-([0-1][0-9])(?:-([0-3][0-9]))?(?:[T ]?([0-2][0-9])(?::([0-5][0-9]))?(?::([0-5][0-9]))?)?(?:\.[0-9]+)?(Z|(?:\+|\-)[0-9]{2}:?[0-9]{2})?$/;function E(e){const t=e.match(Y);if(t){const n=Number(t[2]);if(n<1||n>12)return!1;if(typeof t[3]!==void 0){const r=Number(t[3]);if(r<1||r>31)return!1}if(typeof t[4]!==void 0){const r=Number(t[4]);if(r<0||r>23)return!1}return!0}return!1}a(E,"iso8601");function H(e){const t=e.match(Y);return t&&typeof t[4]>"u"?e+="T00:00:00":e}a(H,"normalize");function p(e){if(e||(e=new Date),e instanceof Date){const t=new Date(e);return t.setMilliseconds(0),t}if(e=e.trim(),E(e))return new Date(H(e));throw new Error(`Non ISO 8601 compliant date (${e}).`)}a(p,"date");var Z="1999-03-04T02:05:01.000Z",T=new Map,P=[["YYYY",{year:"numeric"}],["YY",{year:"2-digit"}],["MMMM",{month:"long"}],["MMM",{month:"short"}],["MM",{month:"2-digit"}],["M",{month:"numeric"}],["DD",{day:"2-digit"}],["D",{day:"numeric"}],["dddd",{weekday:"long"}],["ddd",{weekday:"short"}],["d",{weekday:"narrow"}],["mm",{minute:"2-digit"}],["m",{minute:"numeric"}],["ss",{second:"2-digit"}],["s",{second:"numeric"}],["ZZ",{timeZoneName:"long"}],["Z",{timeZoneName:"short"}]],$=[["HH",{hour:"2-digit"}],["H",{hour:"numeric"}]],S=[["hh",{hour:"2-digit"}],["h",{hour:"numeric"}],["a",{dayPeriod:"narrow"}],["A",{dayPeriod:"narrow"}]],k={DD:2,HH:2,MM:2,YY:2,YYYY:4,hh:2,mm:2,ss:2};function j(e){if(/^[+-]\d{2}:\d{2}/.test(e))return 6;if(/^[+-]\d{4}/.test(e))return 5;throw new Error("Invalid offset format")}a(j,"fixedLengthByOffset");var A=["MMMM","MMM","dddd","ddd"],d=new Map([...P,...$,...S].map(e=>[e[0],e])),N=new Map,L=["full","long","medium","short"],te=a(e=>String(e).padStart(2,"0"),"two"),ne=a(e=>String(e).padStart(2,"0"),"four");function v(e){return e.type==="literal"&&(e.value=e.value.normalize("NFKC")),e}a(v,"normStr");function R(e,t,n,r=!1,i=null){const s=_(e,t,n,r),f=p(e);function m({partName:u,partValue:g,token:o}){if(u==="literal")return g;const c=s[u];if(u==="hour"&&o==="H")return c.replace(/^0/,"")||"0";if(["mm","ss","MM"].includes(o)&&c.length===1)return`0${c}`;if(u==="dayPeriod"){const h=B(f.getUTCHours()<12?"am":"pm",n);return o==="A"?h.toUpperCase():h.toLowerCase()}return u==="timeZoneName"?i??F(-1*f.getTimezoneOffset(),o):c}return a(m,"value"),t.map(u=>({...u,value:m(u)}))}a(R,"fill");function _(e,t,n,r=!1){const i=p(e),s=t.filter(o=>o.hour12),f=t.filter(o=>!o.hour12),m=[],u=[];function g(o,c=!1){const h=`${n}-u-hc-${c?"h12":"h23"}`;if(m.push(...new Intl.DateTimeFormat(h,o.reduce((l,y)=>y.partName==="literal"?l:(r&&A.includes(y.token)&&u.push(y),Object.assign(l,y.option)),{timeZone:"UTC"})).formatToParts(i).map(v)),r&&u.length)for(const l of u){let y=[];switch(l.token){case"MMMM":y=new Intl.DateTimeFormat(h,{dateStyle:"long",timeZone:"UTC"}).formatToParts(i).map(v);break;case"MMM":y=new Intl.DateTimeFormat(h,{dateStyle:"medium",timeZone:"UTC"}).formatToParts(i).map(v);break}const w=y.find(M=>M.type===l.partName),b=m.findIndex(M=>M.type===l.partName);w&&b>-1&&(m[b]=w)}}return a(g,"addValues"),s.length&&g(s,!0),f.length&&g(f),m.reduce((o,c)=>(o[c.type]=c.value,o),{})}a(_,"createPartMap");function F(e,t="Z"){const n=String(Math.floor(Math.abs(e/60))).padStart(2,"0"),r=String(Math.abs(e%60)).padStart(2,"0"),i=e<0?"-":"+";return t==="ZZ"?`${i}${n}${r}`:`${i}${n}:${r}`}a(F,"minsToOffset");function z(e,t){V(e,t);const[n,r,i,s]=e.match(/([+-])([0-3][0-9]):?([0-6][0-9])/),f=Number(i)*60+Number(s);return r==="+"?f:-f}a(z,"offsetToMins");function V(e,t="Z"){if(!(r=>{switch(r){case"Z":return/^([+-])[0-3][0-9]:[0-6][0-9]$/.test(e);case"ZZ":return/^([+-])[0-3][0-9][0-6][0-9]$/.test(e)}})(t))throw new Error(`Invalid offset: ${e}`);return e}a(V,"validOffset");function re(e){return P.concat($).concat(S).sort((t,n)=>t[0].length>n[0].length?1:-1).reduce((t,n)=>t.replace(n[0],`\\${n[0]}`),e)}a(re,"escapeTokens");function K(e){return["numeric","2-digit"].includes(e.partValue)}a(K,"isNumeric");function oe(e){let t;for(const n of e){if(n.partName==="literal"&&!isNaN(parseFloat(n.partValue)))throw new Error(`Numbers in format (${n.partValue}).`);if(t&&t.partName!=="literal"&&n.partName!=="literal"&&!(t.token in k)&&!(n.token in k)&&!(K(t)&&n.token.toLowerCase()==="a"))throw new Error(`Illegal adjacent tokens (${t.token}, ${n.token})`);t=n}return e}a(oe,"validate");function q(e){return typeof e=="string"?e.includes("ZZ")?"ZZ":"Z":"time"in e&&e.time==="full"?"Z":"ZZ"}a(q,"getOffsetFormat");function B(e,t){const n=N.get(t);if(n&&n[e])return n[e];const r=new Date(Z);r.setUTCHours(e==="am"?5:20);const s=new Intl.DateTimeFormat(t,{timeStyle:"full",timeZone:"UTC",hour12:!0}).formatToParts(r).map(v).find(f=>f.type==="dayPeriod");if(s){const f=n||{};return N.set(t,Object.assign(f,{[e]:s.value})),s.value}return e}a(B,"ap");function G(e,t="+00:00"){const n=p(e),r=(()=>{switch(j(t)){case 5:return"ZZ";case 6:return"Z"}})(),i=z(t,r);return new Date(n.getTime()+i*1e3*60)}a(G,"applyOffset");function U(){return Intl.DateTimeFormat().resolvedOptions().timeZone}a(U,"deviceTZ");function D(e,t){const n=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZone:t,hourCycle:"h23"}).formatToParts(e).map(v),r={};return n.forEach(i=>{r[i.type]=i.value}),new Date(`${r.year}-${r.month}-${r.day}T${r.hour}:${r.minute}:${r.second}Z`)}a(D,"relativeTime");function I(e,t="UTC",n="device",r="Z"){var i;n=n==="device"?(i=U())!=null?i:"utc":n;const s=p(e),f=D(s,t),u=(D(s,n).getTime()-f.getTime())/1e3/60;return F(u,r)}a(I,"offset");function J(e,t){if(L.includes(e)||typeof e=="object")return O(e,t);let n=e,r=0;const i=a(o=>{if(o[2]||(o[2]=new RegExp(`(.)?(${o[0]})`,"g")),o[2].test(n)){let c=0;return n=n.replace(o[2],(h,l,y)=>l==="\\"?y:`${typeof l=="string"?l:""}{!${c++?r:r++}!}`),!!c}return!1},"testPattern");function s(o){const c=o.map(l=>l.partName),h=new Set(c);if(c.length>h.size)throw new Error("Cannot reuse format tokens.");return o}a(s,"validate");function f(o,[c,h,l]){const y=Object.keys(h)[0],w=h[y];return{option:h,partName:y,partValue:w,token:c,pattern:l,hour12:o}}a(f,"createPart");const m=P.filter(i).concat($.filter(i)).map(f.bind(null,!1)),u=s(m.concat(S.filter(i).map(f.bind(null,!0)))),g=/^\{!(\d+)!\}$/;return n.split(/(\{!\d+!\})/).map(o=>{const c=o.match(g);return c?u[Number(c[1])]:{option:{literal:o},partName:"literal",partValue:o,token:o,pattern:new RegExp(""),hour12:!1}}).filter(o=>!(o.partName==="literal"&&o.partValue===""))}a(J,"parts");function O(e,t){const n={timeZone:"UTC"};typeof e=="string"?n.dateStyle=e:("date"in e&&(n.dateStyle=e.date),"time"in e&&(n.timeStyle=e.time));const r=new Intl.DateTimeFormat(t,n),i=r.formatToParts(new Date(Z)).map(v),f=r.formatToParts(new Date("1999-04-05T23:05:01.000Z")).map(v).find(u=>u.type==="hour"),m=f&&f.value==="23"?24:12;return i.map(u=>{const g=u.type,o=Q(u.type,u.value,t,u.type==="hour"?m:void 0,n);if(o===void 0)return;const c=o[1][g];if(c)return o[2]||(o[2]=new RegExp(`${o[0]}`,"g")),{option:{[g]:c},partName:g,partValue:c,token:o[0],pattern:o[2],hour12:m===12}}).filter(u=>!!u)}a(O,"styleParts");function Q(e,t,n,r,i){const s=t.length,f=!isNaN(Number(t));let m;switch(e){case"year":return s===2?d.get("YY"):d.get("YYYY");case"month":if(f)return s===1?d.get("M"):d.get("MM");switch(m=C(n,e,t),m){case"long":return d.get("MMMM");default:return d.get("MMM")}case"day":return s===1?d.get("D"):d.get("DD");case"weekday":switch(m=C(n,e,t),m){case"narrow":return d.get("d");case"short":return d.get("ddd");default:return d.get("dddd")}case"hour":return r===12?s===1?d.get("h"):d.get("hh"):s===1?d.get("H"):d.get("HH");case"minute":return s===1?d.get("m"):d.get("mm");case"second":return s===1?d.get("s"):d.get("ss");case"dayPeriod":return/^[A-Z]+$/u.test(t)?d.get("A"):d.get("a");case"literal":return[t,{literal:t},new RegExp("")];case"timeZoneName":return i.timeStyle==="full"?d.get("Z"):d.get("ZZ");default:return}}a(Q,"guessPattern");function C(e,t,n){if(!T.has(e)){const i=new Date(Z),s=[3,8,9,7,6,4,3],f=["weekday","month","dayPeriod"],m=["long","short","narrow"],u={};for(let g=0;g<12;g++){i.setMonth(0+g),g in s&&i.setDate(s[g]),i.setUTCHours(8+g);for(const o of m){const c=new Intl.DateTimeFormat(e,f.reduce((h,l)=>Object.assign(h,{[l]:o}),{hour12:!0,timeZone:"UTC"})).formatToParts(i).map(v);if(o==="long"||o==="short"){const l=new Intl.DateTimeFormat(e,{dateStyle:o==="short"?"medium":"long",timeZone:"UTC"}).formatToParts(i).map(v).find(w=>w.type==="month"),y=c.findIndex(w=>w.type==="month");y>-1&&l&&(c[y]=l)}c.forEach(h=>{if(h.type==="literal")return;const l=h.type;u[l]=Object.assign(u[l]||{},{[h.value]:o})})}}T.set(e,u)}const r=T.get(e);return r?r[t][n]:void 0}a(C,"partStyle");function W(e,t="+00:00"){const n=t.slice(0,1)==="+";return G(e,t.replace(n?"+":"-",n?"-":"+"))}a(W,"removeOffset");function X(){return Intl.DateTimeFormat().resolvedOptions().locale}a(X,"deviceLocale");function ie(e,t="long",n="device",r=!1,i){let s,f;return typeof e=="object"&&!(e instanceof Date)&&({date:e,format:t,locale:n,genitive:r,partFilter:i,tz:s}=e),t==="ISO8601"?p(e).toISOString():(s&&(f=I(e,"utc",s,q(t))),s??(s=U()),(s==null?void 0:s.toLowerCase())!=="utc"&&(e=W(e,I(e,s,"utc"))),(!n||n==="device")&&(n=X()),R(e,J(t,n).filter(i??(()=>!0)),n,r,f).map(m=>m.value).join(""))}a(ie,"format");export{B as a,V as b,ne as c,p as d,re as e,ie as f,j as g,k as h,J as p,L as s,te as t,oe as v};