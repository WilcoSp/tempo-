import{d,r as m,c as i,f as p,o as l,a as f,w as n,b as v,e as _,g as a,h as g,F as h,i as w,t as r,v as k,W as x}from"./index-CgZb_po2.js";const y=["value"],D=d({__name:"FormatComp",setup(B){const o=["en-US","nl","de","es"],t=m(o[0]),c=new Date,u=i(()=>p(c,{date:"long"},t.value));return(F,s)=>(l(),f(x,null,{heading:n(()=>[v("Format original")]),default:n(()=>[_(a("select",{name:"locale","onUpdate:modelValue":s[0]||(s[0]=e=>t.value=e),style:{width:"5rem"}},[(l(),g(h,null,w(o,e=>a("option",{value:e,key:e},r(e),9,y)),64))],512),[[k,t.value]]),a("p",null,"result: "+r(u.value),1)]),_:1}))}});export{D as default};