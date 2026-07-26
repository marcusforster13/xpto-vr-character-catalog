"use client";

import { useMemo, useState } from "react";
import "./catalog.css";
import ThreeViewer from "./ThreeViewer";

type Character = { code: string; name: string; role: string; group: "Segurança" | "Militar" | "Resgate" | "Especialista"; image: string; color: string; body: string };
const characters: Character[] = [
  { code:"PM-01", name:"Polícia Militar", role:"Patrulhamento ostensivo e abordagem", group:"Segurança", image:"PM-01-policia-militar-generica.png", color:"#00d3e4", body:"Masculino" },
  { code:"PC-02", name:"Polícia Civil", role:"Investigação e perícia", group:"Segurança", image:"PC-02-policia-civil-generica.png", color:"#6a8cff", body:"Feminino" },
  { code:"PF-03", name:"Polícia Federal", role:"Crimes federais e fronteiras", group:"Segurança", image:"PF-03-policia-federal-generica.png", color:"#7589a8", body:"Masculino" },
  { code:"PRF-04", name:"Polícia Rodoviária Federal", role:"Fiscalização e segurança viária", group:"Segurança", image:"PRF-04-rodoviaria-federal-generica.png", color:"#f0ce36", body:"Feminino" },
  { code:"CB-05", name:"Corpo de Bombeiros", role:"Resgate e combate a incêndio", group:"Resgate", image:"CB-05-bombeiros-resgate-generico.png", color:"#ff4e48", body:"Masculino" },
  { code:"GM-06", name:"Guarda Municipal", role:"Segurança urbana municipal", group:"Segurança", image:"GM-06-guarda-municipal-generica.png", color:"#00a6c8", body:"Feminino" },
  { code:"FE-07", name:"Forças Especiais", role:"Operações de alto risco", group:"Militar", image:"FE-07-forcas-especiais-generico.png", color:"#828995", body:"Masculino" },
  { code:"EX-08", name:"Exército", role:"Operações militares terrestres", group:"Militar", image:"EX-08-exercito-generico.png", color:"#87956a", body:"Feminino" },
  { code:"MB-09", name:"Marinha", role:"Segurança e operações navais", group:"Militar", image:"MB-09-marinha-generica.png", color:"#4d79a8", body:"Masculino" },
  { code:"FA-10", name:"Aeronáutica", role:"Segurança e operações aéreas", group:"Militar", image:"FA-10-aeronautica-generica.png", color:"#7ca5c8", body:"Feminino" },
  { code:"PC-11", name:"Perícia Científica", role:"Análise de local de crime", group:"Especialista", image:"PC-11-pericia-cientifica-generica.png", color:"#e8eef4", body:"Masculino" },
  { code:"SP-12", name:"Segurança Executiva", role:"Proteção e escolta", group:"Especialista", image:"SP-12-seguranca-executiva-generica.png", color:"#8b91a0", body:"Feminino" },
  { code:"DC-13", name:"Defesa Civil", role:"Resposta a desastres", group:"Resgate", image:"DC-13-defesa-civil-generica.png", color:"#ff7b23", body:"Masculino" },
  { code:"SPr-14", name:"Segurança Penitenciária", role:"Contenção e revista", group:"Segurança", image:"SPr-14-seguranca-penitenciaria-generica.png", color:"#8799ad", body:"Feminino" }
];
const animations=["IDLE","WALK","RUN","RÁDIO","ABORDAGEM","REVISTA","SINAL","SOCORRO"];
const groups=["Todos","Segurança","Militar","Resgate","Especialista"] as const;
const xptoModels:Record<string,{url:string;file:string;label:string}> = {
  "PM-01":{url:"/models/PM-01-policia-militar.glb",file:"PM-01_POLICIA_MILITAR.GLB",label:"PM-01"},
  "PC-02":{url:"/models/PC-02-policia-civil.glb",file:"PC-02_POLICIA_CIVIL.GLB",label:"PC-02"},
  "PF-03":{url:"/models/PF-03-policia-federal.glb",file:"PF-03_POLICIA_FEDERAL.GLB",label:"PF-03"}
};

export default function Home(){
 const [selected,setSelected]=useState(characters[0]); const [group,setGroup]=useState<(typeof groups)[number]>("Todos"); const [query,setQuery]=useState(""); const [animation,setAnimation]=useState("IDLE");
 const filtered=useMemo(()=>characters.filter(c=>(group==="Todos"||c.group===group)&&`${c.code} ${c.name} ${c.role}`.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR"))),[group,query]);
 const modelData=xptoModels[selected.code];
 const modelUrl=modelData?.url??"https://threejs.org/examples/models/gltf/Soldier.glb";
 return <main className="site-shell">
  <header className="topbar"><a className="brand" href="#catalogo"><span className="brand-mark">XPTO</span><span className="brand-copy">CHARACTER SYSTEMS</span></a><nav><a href="#catalogo">CATÁLOGO</a><a href="#viewer">3D VIEWER</a><a href="#mocap">MOCAP LIB</a></nav><span className="system-status"><i/> SYSTEM ONLINE</span></header>
  <section className="hero" id="catalogo"><div className="hero-grid"/><div className="hero-copy"><p className="eyebrow">XPTO // BIBLIOTECA OPERACIONAL 3D</p><h1>PERSONAGENS PARA O<br/><em>CAMPO VIRTUAL</em></h1><p className="intro">Catálogo de agentes full rigged para treinamento em realidade virtual. Um rig humanoide compartilhado, equipamentos modulares e movimentos táticos.</p><div className="hero-actions"><a className="primary-action" href="#viewer">EXPLORAR PERSONAGENS →</a><span>14 MODELOS // 01 RIG CANÔNICO</span></div></div><div className="hero-readout"><span>COLEÇÃO // ALPHA-01</span><strong>14</strong><small>PERSONAGENS MAPEADOS</small><div className="readout-line"><i/></div><span>CONCEPT_READY 100%</span><span>RIG_PIPELINE 08%</span></div></section>
  <section className="control-strip"><div><label htmlFor="character-search">BUSCAR PERSONAGEM</label><input id="character-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="CÓDIGO, CORPORAÇÃO OU FUNÇÃO"/></div><div className="filter-list">{groups.map(item=><button key={item} className={item===group?"active":""} onClick={()=>setGroup(item)}>{item.toUpperCase()}</button>)}</div><span className="result-count">{String(filtered.length).padStart(2,"0")} RESULTADOS</span></section>
  <section className="catalog-layout" id="viewer">
   <aside className="character-list">{filtered.map(c=><button key={c.code} className={`character-card ${selected.code===c.code?"selected":""}`} onClick={()=>setSelected(c)} style={{"--accent":c.color} as React.CSSProperties}><span className="card-image"><img src={`/characters/${c.image}`} alt=""/></span><span className="card-info"><small>{c.code} // {c.group.toUpperCase()}</small><strong>{c.name}</strong><span>{c.role}</span></span><i/></button>)}</aside>
   <article className="viewer-panel" style={{"--accent":selected.color} as React.CSSProperties}><div className="viewer-header"><div><span>MODEL// {modelData?.file??"RIG_TEST_CORE.GLB"}</span><h2>{selected.name}</h2></div><span className="stage-badge">3D RIG // ONLINE</span></div><div className="model-stage"><div className="stage-grid"/><span className="corner tl"/><span className="corner tr"/><span className="corner bl"/><span className="corner br"/><ThreeViewer animation={animation} accent={selected.color} modelUrl={modelUrl} modelLabel={modelData?`${modelData.label} // MODELO XPTO`:"RIG HUMANOIDE DEMO // THREE.JS SOLDIER"}/><div className="model-overlay"><span>REALTIME // WEBGL</span><span>RIG: {modelData?`${modelData.label} IDLE`:"TEST_HUMANOID"}</span></div></div><div className="animation-bar" id="mocap"><span>ANIMAÇÃO</span><div>{animations.map(item=><button key={item} className={animation===item?"active":""} onClick={()=>setAnimation(item)}>{item}</button>)}</div><span className="animation-state">PREVIEW: {animation}</span></div></article>
   <aside className="spec-panel"><span className="panel-label">DADOS DO ASSET</span><dl><div><dt>CÓDIGO</dt><dd>{selected.code}</dd></div><div><dt>BIOTIPO BASE</dt><dd>{selected.body}</dd></div><div><dt>RIG</dt><dd>XPTO HUMANOID</dd></div><div><dt>FORMATO</dt><dd>GLB 2.0</dd></div><div><dt>LODs</dt><dd>0 / 1 / 2 / QUEST</dd></div><div><dt>TEXTURAS</dt><dd>PBR // KTX2</dd></div></dl><span className="panel-label">MÓDULOS PREVISTOS</span><ul><li><i/> CORPO E CABEÇA</li><li><i/> UNIFORME OPERACIONAL</li><li><i/> COLETE E CINTURÃO</li><li><i/> RÁDIO E BODYCAM</li><li><i/> ACESSÓRIOS DE FUNÇÃO</li></ul><button className="download-button" disabled>GLB EM PRODUÇÃO<small>DOWNLOAD LIBERADO APÓS RIG</small></button><p className="legal-note">Modelo genérico de treinamento. Sem brasões, patentes ou identificação institucional oficial.</p></aside>
  </section><footer><span>XPTO INC. // VR TRAINING SYSTEMS</span><span>COLLECTION BUILD 2026.07</span><span>RIO DE JANEIRO // BR</span></footer>
 </main>;
}





