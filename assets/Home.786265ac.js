import{L as x,r as V,o as h,E as s,G as d,H as e,v as t,J as r,N as _,U as k,aF as g,F as w,M as H,aG as f,aH as B}from"./index.4c39f74e.js";import{I as i,_ as N,z as $,V as b,y as p,a6 as D}from"./heading.4e27d137.js";import{a as F,_ as G}from"./_plugin-vue_export-helper.b9de9329.js";import{V as I}from"./VContainer.ddd21cfd.js";const L={id:"CourierGrid"},M={class:"d-flex align-center justify-center h-100"},T={__name:"Home",setup(j){const m={courier:{info:{},stats:{tier:0,xp:0,body:1,wit:1,social:1},flavour:{}},parcels:[],journal:[]},n=x(),l=V([]);async function c(){l.value=await i.couriers.toArray()}async function v(o){await i.couriers.delete(o),c()}async function C(){let o=await i.couriers.add(m);n.push("/courier/"+o)}return h(()=>{c()}),(o,u)=>(s(),d(I,null,{default:e(()=>[t(N,{h:"1"},{default:e(()=>[r("Select your Courier")]),_:1}),_("div",L,[(s(!0),k(w,null,g(l.value,a=>(s(),d(p,{onClick:y=>H(n).push("/courier/"+a.id),key:a.id},{title:e(()=>[r(f(a.courier.info.name),1)]),subtitle:e(()=>[r("Tier "+f(a.courier.stats.tier),1)]),append:e(()=>[t(G,{onDelete:y=>v(a.id),variant:"plain",onClick:u[0]||(u[0]=B(()=>{},["stop"]))},null,8,["onDelete"])]),loader:e(()=>[t(D,{"model-value":a.courier.stats.xp*20,color:"warning"},null,8,["model-value"])]),_:2},1032,["onClick"]))),128)),t(p,{color:"success",onClick:C},{default:e(()=>[t($,{class:"h-100"},{default:e(()=>[_("div",M,[t(b,{icon:"mdi-plus",size:"large"})])]),_:1})]),_:1})])]),_:1}))}},J=F(T,[["__scopeId","data-v-d2a77f02"]]);export{J as default};