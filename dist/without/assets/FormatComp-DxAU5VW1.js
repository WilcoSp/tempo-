import{d as u,r as d,c as i,o as l,a as p,w as n,b as f,e as v,f as a,g as _,F as g,h,t as r,v as w,W as k}from"./index-DrJtoW0o.js";import{f as x}from"./index-2l451JDA.js";const y=["value"],S=u({__name:"FormatComp",setup(B){const o=["en-US","nl","de","es"],t=d(o[0]),c=new Date,m=i(()=>x(c,{date:"long"},t.value));return(F,s)=>(l(),p(k,null,{heading:n(()=>[f("Format original")]),default:n(()=>[v(a("select",{name:"locale","onUpdate:modelValue":s[0]||(s[0]=e=>t.value=e),style:{width:"5rem"}},[(l(),_(g,null,h(o,e=>a("option",{value:e,key:e},r(e),9,y)),64))],512),[[w,t.value]]),a("p",null,"result: "+r(m.value),1)]),_:1}))}});export{S as default};
