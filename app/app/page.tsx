"use client";

import {useEffect,useMemo,useState} from "react";

type Lang="en"|"ru"|"ka";
const BOTTLE="https://raw.githubusercontent.com/margaryanlabs/Suli_winery-/main/public/suli-bottle.webp";
const COPY={
 en:{gate:"Enter SULI",legal:"I am of legal drinking age",hero:"THE SOUL OF GEORGIA",lead:"Eight thousand years of wine culture. One numbered object.",discover:"Discover Edition 001",edition:"777 bottles. No second run.",origin:"Bottle 041 / 777",reserve:"Request allocation",facts:["KAKHETI","SAPERAVI","QVEVRI","750 ML"]},
 ru:{gate:"Войти в SULI",legal:"Мне разрешён алкоголь по возрасту",hero:"ДУША ГРУЗИИ",lead:"Восемь тысяч лет винной культуры. Один пронумерованный объект.",discover:"Открыть Edition 001",edition:"777 бутылок. Без второго тиража.",origin:"Бутылка 041 / 777",reserve:"Запросить резерв",facts:["КАХЕТИ","САПЕРАВИ","КВЕВРИ","750 МЛ"]},
 ka:{gate:"შედი SULI-ში",legal:"კანონიერ ასაკს მივაღწიე",hero:"საქართველოს სული",lead:"ღვინის რვაათასწლიანი კულტურა. ერთი დანომრილი ობიექტი.",discover:"აღმოაჩინე Edition 001",edition:"777 ბოთლი. მეორე ტირაჟის გარეშე.",origin:"ბოთლი 041 / 777",reserve:"რეზერვის მოთხოვნა",facts:["კახეთი","საფერავი","ქვევრი","750 მლ"]}
} as const;

function Logo(){return <div className="logo"><span className="sigil">S</span><b>SULI</b></div>}

export default function Page(){
 const [lang,setLang]=useState<Lang>("en");
 const [entered,setEntered]=useState(false);
 const t=useMemo(()=>COPY[lang],[lang]);
 useEffect(()=>{const move=(e:PointerEvent)=>{document.documentElement.style.setProperty("--mx",`${e.clientX}px`);document.documentElement.style.setProperty("--my",`${e.clientY}px`);};addEventListener("pointermove",move,{passive:true});return()=>removeEventListener("pointermove",move)},[]);
 return <main>
  <div className="grain"/><div className="cursorGlow"/>
  {!entered&&<section className="gate"><div className="gateFog"/><img src={BOTTLE} alt=""/><div className="gateCard"><Logo/><small>SULI · GEORGIA · EDITION 001</small><h1>{t.gate}</h1><button onClick={()=>setEntered(true)}>{t.legal}<span>↗</span></button><div className="langs">{(["en","ru","ka"] as Lang[]).map(l=><button key={l} onClick={()=>setLang(l)} className={lang===l?"on":""}>{l.toUpperCase()}</button>)}</div></div></section>}
  <header><Logo/><nav><a href="#edition">Edition</a><a href="#origin">Origin</a><a href="#reserve">Private allocation</a></nav><div className="langs">{(["en","ru","ka"] as Lang[]).map(l=><button key={l} onClick={()=>setLang(l)} className={lang===l?"on":""}>{l.toUpperCase()}</button>)}</div></header>
  <section className="hero">
   <div className="mountains"><i/><i/><i/></div><div className="fog fog1"/><div className="fog fog2"/><div className="beam"/>
   <div className="heroType"><span>KAKHETI · GEORGIA · 2026</span><h1>{t.hero}</h1><p>{t.lead}</p><a href="#edition">{t.discover}<b>↗</b></a></div>
   <div className="wordmark">SULI</div>
   <div className="bottle"><div className="halo"/><img src={BOTTLE} alt="SULI Edition 001 bottle"/><div className="sheen"/></div>
   <div className="number"><small>EDITION</small><strong>001</strong><em>001 / 777</em></div>
  </section>
  <section id="edition" className="edition">
   <div className="editionBottle"><img src={BOTTLE} alt="SULI Saperavi"/><div className="scan"/></div>
   <div className="copy"><span>EDITION 001</span><h2>{t.edition}</h2><p>SULI 001 is a small-batch Georgian wine conceived as a collectible object: matte black glass, exact origin, numbered release and no repeat production.</p><div className="facts">{t.facts.map((f,i)=><div key={f}><b>{["001/777","2026","001","SULI"][i]}</b><small>{f}</small></div>)}</div></div>
  </section>
  <section className="manifest"><div>EARTH</div><div>CLAY</div><div>TIME</div><div>NUMBER</div></section>
  <section id="origin" className="origin"><div><span>PROVENANCE</span><h2>{t.origin}</h2><p>Vineyard, harvest, qvevri lot, bottling date and authenticity belong to the exact bottle in your hand.</p></div><div className="certificate"><Logo/><strong>041 / 777</strong><ul><li>KAKHETI / GEORGIA</li><li>HARVEST / 2026</li><li>QVEBRI LOT / Q-001</li><li>NFC / VERIFIED</li></ul></div></section>
  <section id="reserve" className="reserve"><span>PRIVATE ALLOCATION</span><h2>{t.reserve}</h2><p>Collectors · restaurants · hotels · private gifting</p><a href="mailto:hello@suli.ge">hello@suli.ge <b>↗</b></a></section>
  <footer><Logo/><span>GEORGIA · EDITION 001 · 777 BOTTLES</span><small>EN / RU / KA</small></footer>
 </main>
}
