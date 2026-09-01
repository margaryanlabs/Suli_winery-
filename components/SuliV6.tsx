"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Lang = "en" | "ru" | "ka";

const COPY = {
  en: {
    nav: ["House", "Edition", "Origin", "Collection"],
    gateTitle: "Enter the house of SULI",
    gateText: "A numbered Georgian wine house. Please confirm legal drinking age.",
    gateButton: "Enter SULI",
    kicker: "KAKHETI · GEORGIA · EDITION 001",
    heroA: "BORN OF",
    heroB: "STONE.",
    heroText: "Eight thousand years of wine culture, translated into one modern object.",
    discover: "Discover 001",
    reserve: "Request allocation",
    manifesto: "Not another wine label.",
    manifestoText: "SULI is built like a house of objects: few releases, exact origin, numbered bottles, no visual noise.",
    editionTitle: "777 bottles. No second run.",
    editionText: "A small-batch Saperavi from Kakheti in a sculptural matte-black bottle. Each bottle is individually numbered and paired with provenance.",
    originTitle: "The bottle knows where it came from.",
    originText: "Vineyard, harvest, qvevri lot, bottling date and authenticity are tied to the exact bottle in your hand.",
    collectionTitle: "Three identities. One house.",
    formTitle: "Request Edition 001",
    formText: "Private allocation for collectors, restaurants, hotels and gifting partners.",
    name: "Name",
    email: "Email",
    market: "City / market",
    send: "Request allocation",
    sent: "Request received",
    sentText: "Availability will be confirmed personally.",
    legal: "Please enjoy responsibly. For adults of legal drinking age only."
  },
  ru: {
    nav: ["Дом", "Edition", "Происхождение", "Коллекция"],
    gateTitle: "Войти в дом SULI",
    gateText: "Нумерованный грузинский винный дом. Подтвердите разрешённый возраст.",
    gateButton: "Войти в SULI",
    kicker: "КАХЕТИ · ГРУЗИЯ · EDITION 001",
    heroA: "РОЖДЕНО",
    heroB: "КАМНЕМ.",
    heroText: "Восемь тысяч лет винной культуры, переведённые в один современный объект.",
    discover: "Открыть 001",
    reserve: "Запросить резерв",
    manifesto: "Не ещё одна винная этикетка.",
    manifestoText: "SULI строится как дом объектов: мало релизов, точное происхождение, пронумерованные бутылки и никакого визуального шума.",
    editionTitle: "777 бутылок. Без второго тиража.",
    editionText: "Саперави малой партии из Кахети в скульптурной матово-чёрной бутылке. Каждый экземпляр получает номер и подтверждение происхождения.",
    originTitle: "Бутылка знает, откуда она пришла.",
    originText: "Виноградник, урожай, партия квеври, дата розлива и подлинность привязаны именно к вашему экземпляру.",
    collectionTitle: "Три характера. Один дом.",
    formTitle: "Запросить Edition 001",
    formText: "Частный резерв для коллекционеров, ресторанов, отелей и подарочных партнёров.",
    name: "Имя",
    email: "Email",
    market: "Город / рынок",
    send: "Запросить резерв",
    sent: "Запрос получен",
    sentText: "Наличие будет подтверждено лично.",
    legal: "Употребляйте ответственно. Только для совершеннолетних по законодательству вашей страны."
  },
  ka: {
    nav: ["სახლი", "Edition", "წარმოშობა", "კოლექცია"],
    gateTitle: "შედი SULI-ს სახლში",
    gateText: "დანომრილი ქართული ღვინის სახლი. დაადასტურეთ კანონით ნებადართული ასაკი.",
    gateButton: "შედი SULI-ში",
    kicker: "კახეთი · საქართველო · EDITION 001",
    heroA: "ქვისგან",
    heroB: "დაბადებული.",
    heroText: "ღვინის რვაათასწლიანი კულტურა — ერთ თანამედროვე ობიექტში.",
    discover: "აღმოაჩინე 001",
    reserve: "რეზერვის მოთხოვნა",
    manifesto: "არა კიდევ ერთი ღვინის ეტიკეტი.",
    manifestoText: "SULI იქმნება როგორც ობიექტების სახლი: მცირე გამოშვებები, ზუსტი წარმოშობა, დანომრილი ბოთლები და ზედმეტი ხმაურის გარეშე.",
    editionTitle: "777 ბოთლი. მეორე ტირაჟის გარეშე.",
    editionText: "მცირე პარტიის საფერავი კახეთიდან, სკულპტურულ მქრქალ შავ ბოთლში. თითოეულ ბოთლს აქვს საკუთარი ნომერი და წარმოშობის ჩანაწერი.",
    originTitle: "ბოთლმა იცის, საიდან მოვიდა.",
    originText: "ვენახი, მოსავალი, ქვევრის პარტია, ჩამოსხმის თარიღი და ავთენტურობა მიბმულია კონკრეტულ ბოთლზე.",
    collectionTitle: "სამი ხასიათი. ერთი სახლი.",
    formTitle: "Edition 001-ის მოთხოვნა",
    formText: "კერძო რეზერვი კოლექციონერებისთვის, რესტორნებისთვის, სასტუმროებისა და საჩუქრების პარტნიორებისთვის.",
    name: "სახელი",
    email: "Email",
    market: "ქალაქი / ბაზარი",
    send: "რეზერვის მოთხოვნა",
    sent: "მოთხოვნა მიღებულია",
    sentText: "ხელმისაწვდომობა პირადად დადასტურდება.",
    legal: "მიირთვით პასუხისმგებლობით. მხოლოდ კანონიერ ასაკს მიღწეული პირებისთვის."
  }
} as const;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "suliLogo compact" : "suliLogo"}>
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <path d="M36 4 60 18 54 54 36 68 18 54 12 18 36 4Z" />
        <path d="M46 20c-7-7-22-4-22 5 0 10 23 8 23 19 0 9-14 13-24 5" />
        <path d="M25 17 47 55M47 17 25 55" className="ghost" />
      </svg>
      <span>SULI</span>
    </div>
  );
}

function Atmosphere() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random(), r: .3 + Math.random() * 1.1,
      vx: (Math.random() - .5) * .00015, vy: -.00008 - Math.random() * .00018,
      a: .05 + Math.random() * .2
    }));
    const resize = () => {
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -.03) p.y = 1.03;
        if (p.x < -.03) p.x = 1.03;
        if (p.x > 1.03) p.x = -.03;
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); draw(); addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="atmosphere" aria-hidden="true" />;
}

export default function SuliV6() {
  const [lang, setLang] = useState<Lang>("en");
  const [entered, setEntered] = useState(false);
  const [sent, setSent] = useState(false);
  const bottle = useRef<HTMLDivElement | null>(null);
  const t = useMemo(() => COPY[lang], [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / Math.max(innerWidth, 1) - .5;
      const ny = e.clientY / Math.max(innerHeight, 1) - .5;
      document.documentElement.style.setProperty("--px", `${e.clientX}px`);
      document.documentElement.style.setProperty("--py", `${e.clientY}px`);
      bottle.current?.style.setProperty("--ry", `${nx * 12}deg`);
      bottle.current?.style.setProperty("--rx", `${-ny * 7}deg`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty("--scrollp", `${max ? scrollY / max : 0}`);
      document.documentElement.style.setProperty("--heroY", `${Math.min(scrollY * .16, 120)}px`);
    };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const io = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle("in", e.isIntersecting)), { threshold: .16 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => { removeEventListener("pointermove", onMove); removeEventListener("scroll", onScroll); io.disconnect(); };
  }, [lang]);

  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <main className="v6">
      <Atmosphere />
      <div className="filmGrain" />
      <div className="pointerGlow" />
      <div className="topProgress"><i /></div>

      {!entered && (
        <section className="ageGate">
          <div className="gateLight" />
          <img className="gateBottle" src="/suli-bottle.webp" alt="" />
          <div className="gatePanel">
            <Logo />
            <span>GEORGIA · EDITION 001</span>
            <h1>{t.gateTitle}</h1>
            <p>{t.gateText}</p>
            <button onClick={() => setEntered(true)}>{t.gateButton}<b>↗</b></button>
            <div className="langRow">{(["en","ru","ka"] as Lang[]).map(l => <button key={l} onClick={() => setLang(l)} className={lang === l ? "active" : ""}>{l.toUpperCase()}</button>)}</div>
          </div>
        </section>
      )}

      <header className="navBar">
        <a href="#home"><Logo compact /></a>
        <nav>{t.nav.map((n,i)=><a key={n} href={["#house","#edition","#origin","#collection"][i]}>{n}</a>)}</nav>
        <div className="navRight"><span>001 / 777</span><div className="langRow">{(["en","ru","ka"] as Lang[]).map(l => <button key={l} onClick={() => setLang(l)} className={lang === l ? "active" : ""}>{l.toUpperCase()}</button>)}</div></div>
      </header>

      <section className="hero" id="home">
        <div className="heroBackdrop"><div className="mount m1"/><div className="mount m2"/><div className="mount m3"/><div className="fog f1"/><div className="fog f2"/><div className="godray r1"/><div className="godray r2"/></div>
        <div className="heroWord" aria-hidden="true">SULI</div>
        <div className="heroMeta left"><span>EST. 2026</span><b>KAKHETI</b><span>41.6° N</span></div>
        <div className="heroCopy">
          <span>{t.kicker}</span>
          <h1><em>{t.heroA}</em><em>{t.heroB}</em></h1>
          <p>{t.heroText}</p>
          <div className="heroActions"><a href="#edition">{t.discover}<b>↗</b></a><a href="#reserve" className="quiet">{t.reserve}</a></div>
        </div>
        <div className="heroBottle" ref={bottle}>
          <div className="bottleAura"/><img src="/suli-bottle.webp" alt="SULI Edition 001 Saperavi"/><div className="sheen"/><div className="baseGlow"/>
        </div>
        <div className="heroMeta right"><span>EDITION</span><strong>001</strong><b>001 / 777</b></div>
        <div className="heroStrip"><div><span>HERITAGE</span><b>8,000 YEARS</b></div><div><span>ORIGIN</span><b>KAKHETI</b></div><div><span>GRAPE</span><b>SAPERAVI</b></div><div><span>FORMAT</span><b>750 ML</b></div></div>
      </section>

      <section id="house" className="manifesto reveal">
        <span>THE HOUSE OF SULI</span>
        <h2>{t.manifesto}</h2>
        <p>{t.manifestoText}</p>
        <div className="monogramHuge"><Logo /></div>
      </section>

      <section id="edition" className="edition">
        <div className="editionBottle"><div className="halo2"/><img src="/suli-bottle.webp" alt="SULI bottle"/><div className="scan"/></div>
        <div className="editionCopy reveal"><span>EDITION 001</span><h2>{t.editionTitle}</h2><p>{t.editionText}</p><div className="big777">777</div><div className="editionFacts"><div><span>ORIGIN</span><b>KAKHETI</b></div><div><span>GRAPE</span><b>SAPERAVI</b></div><div><span>HARVEST</span><b>2026</b></div><div><span>NUMBER</span><b>041 / 777</b></div></div></div>
      </section>

      <section className="chapters">
        {["EARTH","CLAY","TIME","NUMBER"].map((x,i)=><article className="chapter reveal" key={x}><span>0{i+1}</span><div className={`chapterVisual cv${i+1}`}><i/><i/><i/></div><h3>{x}</h3><p>{["Mineral ground. Dry wind. Long horizon.","Qvevri below stone floors, wine moving in darkness.","No marketing calendar. The cellar decides.","One object, one mark, one owner."][i]}</p></article>)}
      </section>

      <section id="origin" className="origin reveal">
        <div className="originCopy"><span>PROVENANCE</span><h2>{t.originTitle}</h2><p>{t.originText}</p><div className="originLines"><b>VINEYARD / KAKHETI</b><b>HARVEST / 2026</b><b>QVEBRI LOT / Q-001</b><b>BOTTLED / 041 · 777</b></div></div>
        <div className="passport"><div className="passportHead"><Logo compact/><span>CERTIFICATE OF ORIGIN</span></div><strong>041 / 777</strong><div className="passportGrid"><span>EDITION<b>001</b></span><span>GRAPE<b>SAPERAVI</b></span><span>REGION<b>KAKHETI</b></span><span>COUNTRY<b>GEORGIA</b></span></div><div className="nfc">))) NFC · VERIFIED OBJECT</div></div>
      </section>

      <section id="collection" className="collection reveal">
        <span>THE COLLECTION</span><h2>{t.collectionTitle}</h2>
        <div className="cards">
          <article className="product p1"><div className="num">001</div><img src="/suli-bottle.webp" alt="SULI Saperavi"/><h3>SAPERAVI</h3><p>Dry red · Kakheti</p><small>777 BOTTLES</small></article>
          <article className="product p2"><div className="num">002</div><div className="abstractBottle whiteBottle"><Logo /></div><h3>KISI QVEVRI</h3><p>Dry amber · Kakheti</p><small>COMING NEXT</small></article>
          <article className="product p3"><div className="num">003</div><div className="abstractBottle chacha"><Logo /></div><h3>CHACHA RESERVE</h3><p>Private grape spirit release</p><small>333 BOTTLES</small></article>
        </div>
      </section>

      <section id="reserve" className="reserve reveal">
        <div><span>PRIVATE ALLOCATION</span><h2>{t.formTitle}</h2><p>{t.formText}</p></div>
        {sent ? <div className="sent"><Logo/><h3>{t.sent}</h3><p>{t.sentText}</p></div> : <form onSubmit={submit}><label>{t.name}<input required/></label><label>{t.email}<input required type="email"/></label><label>{t.market}<input required/></label><button>{t.send}<b>↗</b></button></form>}
      </section>

      <footer><Logo compact/><span>GEORGIA · EDITION 001 · 001 / 777</span><small>{t.legal}</small></footer>

      <style jsx global>{`
        :root{--paper:#f3f3ef;--dim:#8d8d88;--line:rgba(255,255,255,.14);--px:70vw;--py:25vh;--scrollp:0;--heroY:0px}.v6{background:#020202;color:var(--paper);font-family:Arial,Helvetica,sans-serif;overflow:hidden;min-height:100vh}.v6 *{box-sizing:border-box}.atmosphere{position:fixed;inset:0;z-index:40;pointer-events:none;mix-blend-mode:screen;opacity:.6}.filmGrain{position:fixed;inset:-50%;z-index:50;pointer-events:none;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:grain .32s steps(2) infinite}.pointerGlow{position:fixed;z-index:3;pointer-events:none;width:58vw;height:58vw;left:var(--px);top:var(--py);transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(255,255,255,.055),rgba(255,255,255,.018) 27%,transparent 67%)}.topProgress{position:fixed;top:0;left:0;right:0;height:1px;z-index:90;background:#111}.topProgress i{display:block;height:100%;background:white;width:calc(var(--scrollp)*100%)}.navBar{height:82px;position:fixed;top:0;left:0;right:0;z-index:80;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 3.4vw;border-bottom:1px solid rgba(255,255,255,.07);background:linear-gradient(#020202ef,#0202029d,transparent);backdrop-filter:blur(12px)}.navBar>a{text-decoration:none}.navBar nav{display:flex;gap:36px}.navBar nav a,.langRow button,.navRight>span{color:#a5a5a0;text-decoration:none;background:none;border:0;font-size:9px;letter-spacing:.22em;text-transform:uppercase}.navBar nav a:hover,.langRow button.active{color:#fff}.navRight{display:flex;justify-content:flex-end;align-items:center;gap:26px}.langRow{display:flex;gap:10px}.langRow button{cursor:pointer}.suliLogo{display:flex;align-items:center;gap:18px}.suliLogo svg{width:54px;height:54px;fill:none;stroke:white;stroke-width:1.15}.suliLogo svg .ghost{opacity:.15}.suliLogo span{font:400 27px/1 Georgia,serif;letter-spacing:.44em;color:white}.suliLogo.compact svg{width:32px;height:32px}.suliLogo.compact span{font-size:19px}.hero{height:100svh;min-height:780px;position:relative;isolation:isolate;display:grid;grid-template-columns:1fr 1.08fr .58fr;align-items:center;padding:100px 5vw 92px}.heroBackdrop{position:absolute;inset:0;z-index:-5;overflow:hidden;background:radial-gradient(circle at 57% 42%,#292929 0,#0b0b0b 24%,#020202 66%)}.mount{position:absolute;bottom:11%;filter:drop-shadow(0 -10px 26px #000);opacity:.92}.m1{left:-8%;width:56%;height:49%;background:linear-gradient(135deg,transparent 45%,#131313 46%);clip-path:polygon(0 100%,28% 50%,41% 68%,62% 14%,75% 57%,100% 100%)}.m2{left:38%;width:48%;height:58%;background:linear-gradient(145deg,#1e1e1e,#060606 65%);clip-path:polygon(0 100%,24% 61%,40% 75%,63% 7%,77% 54%,100% 100%)}.m3{right:-8%;width:46%;height:48%;background:#070707;clip-path:polygon(0 100%,25% 57%,43% 72%,70% 19%,100% 100%)}.fog{position:absolute;border-radius:50%;filter:blur(62px);background:rgba(255,255,255,.075);animation:fog 13s ease-in-out infinite}.f1{width:65%;height:18%;left:8%;bottom:9%}.f2{width:45%;height:14%;right:-5%;bottom:27%;animation-delay:-4s}.godray{position:absolute;width:26%;height:145%;top:-42%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.09),transparent);filter:blur(18px);transform:rotate(16deg);animation:ray 12s ease-in-out infinite}.r1{left:55%}.r2{left:17%;opacity:.34;animation-duration:17s;animation-direction:reverse}.heroWord{position:absolute;z-index:-1;left:50%;top:52%;transform:translate(-50%,-50%);font:400 clamp(160px,24vw,420px)/.7 Georgia,serif;letter-spacing:-.09em;color:rgba(255,255,255,.035);white-space:nowrap}.heroCopy{z-index:5;max-width:620px;transform:translateY(calc(var(--heroY)*-.12))}.heroCopy>span,.manifesto>span,.editionCopy>span,.originCopy>span,.collection>span,.reserve>div>span{display:block;font-size:9px;letter-spacing:.33em;color:#c4c4bf;margin-bottom:26px}.hero h1{font:400 clamp(72px,7.4vw,140px)/.8 Georgia,serif;letter-spacing:-.062em;margin:0}.hero h1 em{display:block;font-style:normal}.heroCopy p{max-width:470px;color:#a2a29d;line-height:1.8;margin:30px 0;font-size:14px}.heroActions{display:flex;gap:14px;flex-wrap:wrap}.heroActions a,.reserve form button,.gatePanel>button{padding:17px 23px;border:1px solid rgba(255,255,255,.32);color:white;text-decoration:none;background:rgba(255,255,255,.025);font-size:9px;letter-spacing:.19em;text-transform:uppercase;display:inline-flex;align-items:center;gap:24px;transition:.3s}.heroActions a:hover,.reserve form button:hover,.gatePanel>button:hover{background:white;color:black}.heroActions .quiet{border-color:transparent;color:#999}.heroBottle{height:80vh;max-height:860px;position:relative;display:flex;align-items:flex-end;justify-content:center;z-index:4;perspective:1500px;transform:translateY(var(--heroY))}.heroBottle img{height:100%;max-width:100%;object-fit:contain;filter:contrast(1.16) brightness(.98) drop-shadow(0 40px 46px #000);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(45px);transition:transform .14s ease-out}.bottleAura{position:absolute;width:90%;height:68%;bottom:3%;border-radius:50%;background:radial-gradient(ellipse,rgba(255,255,255,.11),rgba(255,255,255,.02) 36%,transparent 69%);filter:blur(18px)}.sheen{position:absolute;left:34%;bottom:7%;width:18%;height:84%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);filter:blur(13px);animation:sweep 6.5s ease-in-out infinite}.baseGlow{position:absolute;bottom:2%;width:62%;height:5%;border-radius:50%;background:rgba(255,255,255,.12);filter:blur(26px)}.heroMeta{z-index:5;display:flex;flex-direction:column;gap:8px;font-size:8px;letter-spacing:.28em;color:#777}.heroMeta.left{position:absolute;left:3.5vw;bottom:145px}.heroMeta.right{align-self:center;border-left:1px solid #666;padding-left:20px}.heroMeta.right strong{font:400 72px/1 Georgia,serif;color:#eee;letter-spacing:-.05em}.heroMeta.right b{color:#aaa}.heroStrip{position:absolute;left:0;right:0;bottom:0;height:92px;border-top:1px solid rgba(255,255,255,.12);display:grid;grid-template-columns:repeat(4,1fr);background:rgba(2,2,2,.62);backdrop-filter:blur(10px)}.heroStrip div{padding:20px 3vw;border-right:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center}.heroStrip span{font-size:8px;letter-spacing:.23em;color:#666}.heroStrip b{font:400 16px Georgia,serif;letter-spacing:.08em}.manifesto{min-height:88vh;padding:13vw 8vw;position:relative;border-top:1px solid var(--line);display:flex;flex-direction:column;justify-content:center}.manifesto h2,.edition h2,.origin h2,.collection h2,.reserve h2{font:400 clamp(60px,8vw,150px)/.86 Georgia,serif;letter-spacing:-.055em;margin:0 0 36px;max-width:1200px}.manifesto p{max-width:680px;color:#999;line-height:1.9;font-size:15px;margin-left:auto}.monogramHuge{position:absolute;right:7vw;top:8vw;opacity:.08;transform:scale(3.2)}.edition{min-height:130vh;display:grid;grid-template-columns:52% 48%;border-top:1px solid var(--line)}.editionBottle{height:100vh;position:sticky;top:0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 52% 45%,#1c1c1c,#060606 48%,#020202 72%)}.editionBottle img{height:88%;max-width:80%;object-fit:contain;filter:contrast(1.15) drop-shadow(0 32px 36px #000);z-index:2}.halo2{position:absolute;width:70%;height:70%;border:1px solid rgba(255,255,255,.09);border-radius:50%;box-shadow:0 0 80px rgba(255,255,255,.04)}.scan{position:absolute;left:13%;right:13%;height:1px;background:white;box-shadow:0 0 30px 6px rgba(255,255,255,.14);animation:scan 6s ease-in-out infinite;z-index:3}.editionCopy{padding:22vh 8vw 13vh 6vw}.editionCopy>p,.originCopy>p,.reserve>div>p{max-width:590px;color:#959590;line-height:1.9;font-size:14px}.big777{font:400 clamp(120px,16vw,300px)/.72 Georgia,serif;color:rgba(255,255,255,.06);letter-spacing:-.08em;margin:80px 0 55px}.editionFacts{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);border-left:1px solid var(--line)}.editionFacts div{padding:24px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:20px}.editionFacts span{font-size:8px;letter-spacing:.18em;color:#666}.editionFacts b{font:400 15px Georgia,serif}.chapters{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border-top:1px solid var(--line)}.chapter{min-height:610px;background:#020202;padding:24px;position:relative}.chapter>span{font:400 52px Georgia,serif;color:#3e3e3b}.chapterVisual{height:310px;margin:30px -24px 36px;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 50%,#151515,#050505 60%)}.chapterVisual i{position:absolute;display:block}.cv1 i:nth-child(1){inset:0;background:linear-gradient(145deg,transparent 42%,#242424 43% 62%,transparent 63%);transform:scale(1.35)}.cv1 i:nth-child(2){width:110%;height:30%;left:-5%;bottom:8%;background:rgba(255,255,255,.035);filter:blur(20px)}.cv2 i:nth-child(1){width:130px;height:175px;border:1px solid #777;border-radius:50% 50% 42% 42%;left:50%;top:50%;transform:translate(-50%,-48%)}.cv2 i:nth-child(2){width:1px;height:100%;left:50%;background:linear-gradient(transparent,#ddd,transparent);animation:scan 5s infinite}.cv3 i:nth-child(1){width:160px;height:160px;border:1px solid #777;border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%)}.cv3 i:nth-child(2){width:1px;height:110px;background:#bbb;left:50%;top:50%;transform-origin:top;animation:clock 9s linear infinite}.cv4 i:nth-child(1){inset:20% 14%;border:1px solid #6d6d6a}.cv4 i:nth-child(2){inset:30% 25%;border:1px solid #252525}.chapter h3{font:400 32px Georgia,serif;letter-spacing:.12em;margin:0 0 16px}.chapter p{color:#858580;line-height:1.75;font-size:12px}.origin{min-height:100vh;padding:11vw 8vw;display:grid;grid-template-columns:1fr 1fr;gap:10vw;align-items:center;border-top:1px solid var(--line);background:radial-gradient(circle at 72% 48%,#151515,transparent 32%)}.originLines{margin-top:50px;border-top:1px solid var(--line)}.originLines b{display:block;padding:15px 0;border-bottom:1px solid var(--line);font-size:9px;letter-spacing:.18em;color:#9a9a95}.passport{border:1px solid rgba(255,255,255,.3);padding:44px;background:linear-gradient(145deg,#111,#050505);box-shadow:0 40px 100px #000;transform:perspective(1000px) rotateY(-5deg)}.passportHead{display:flex;align-items:center;justify-content:space-between;font-size:8px;letter-spacing:.22em;color:#aaa}.passport>strong{display:block;font:400 clamp(72px,8vw,130px) Georgia,serif;margin:60px 0 42px}.passportGrid{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);border-left:1px solid var(--line)}.passportGrid span{padding:17px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);font-size:7px;letter-spacing:.18em;color:#666;display:flex;flex-direction:column;gap:8px}.passportGrid b{color:#ddd;font-size:10px}.nfc{margin-top:26px;color:#8c8c88;font-size:9px;letter-spacing:.18em}.collection{padding:12vw 5vw;border-top:1px solid var(--line)}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);margin-top:70px}.product{min-height:700px;background:#020202;position:relative;padding:28px;text-align:center;overflow:hidden;transition:.4s}.product:hover{background:#070707}.product .num{position:absolute;top:22px;left:24px;font:400 52px Georgia,serif;color:#353532}.product img{height:490px;max-width:85%;object-fit:contain;margin-top:20px;filter:contrast(1.12) drop-shadow(0 30px 30px #000);transition:.55s}.product:hover img{transform:scale(1.045) translateY(-8px)}.product h3{font:400 30px Georgia,serif;letter-spacing:.13em;margin:18px 0 8px}.product p,.product small{color:#777;font-size:10px;letter-spacing:.08em}.abstractBottle{height:490px;width:190px;margin:20px auto 0;border:1px solid #3c3c3a;border-radius:70px 70px 35px 35px  / 170px 170px 40px 40px;display:flex;align-items:center;justify-content:center;position:relative;background:linear-gradient(90deg,#080808,#1a1a1a 42%,#090909 72%);box-shadow:0 28px 30px #000}.abstractBottle:before{content:"";position:absolute;width:76px;height:160px;top:-70px;border:1px solid #3a3a38;border-bottom:0;border-radius:15px 15px 0 0;background:#0d0d0d}.abstractBottle.whiteBottle{background:linear-gradient(90deg,#171717,#bfbfbb 45%,#252525 72%)}.abstractBottle.chacha{width:230px;border-radius:40% 40% 28% 28% / 24% 24% 18% 18%}.abstractBottle .suliLogo span{display:none}.reserve{padding:12vw 8vw;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:11vw}.reserve form{display:grid;gap:24px}.reserve label{font-size:8px;letter-spacing:.19em;color:#777}.reserve input{width:100%;margin-top:8px;padding:15px 0;background:transparent;color:white;border:0;border-bottom:1px solid #40403e;outline:none}.reserve input:focus{border-color:white}.reserve form button{cursor:pointer;justify-content:space-between;margin-top:20px}.sent{border:1px solid var(--line);padding:50px}.sent h3{font:400 42px Georgia,serif}.sent p{color:#888}footer{min-height:165px;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;padding:0 4vw;gap:30px}footer>span{font-size:8px;letter-spacing:.21em;color:#777;text-align:center}footer small{color:#555;text-align:right;line-height:1.6}.ageGate{position:fixed;inset:0;z-index:200;background:#010101;display:grid;place-items:center;overflow:hidden}.gateLight{position:absolute;width:42vw;height:130vh;top:-20vh;left:10%;transform:rotate(18deg);background:linear-gradient(90deg,transparent,rgba(255,255,255,.09),transparent);filter:blur(22px)}.gateBottle{position:absolute;height:104vh;left:7%;bottom:-16%;opacity:.5;filter:contrast(1.1)}.gatePanel{position:relative;z-index:3;text-align:center;max-width:760px;padding:35px}.gatePanel .suliLogo{justify-content:center}.gatePanel>span{display:block;margin:24px 0 18px;font-size:9px;letter-spacing:.31em;color:#8a8a86}.gatePanel h1{font:400 clamp(56px,7vw,116px)/.86 Georgia,serif;letter-spacing:-.045em;margin:0 0 25px}.gatePanel p{max-width:480px;margin:0 auto 30px;color:#8d8d88;line-height:1.75}.gatePanel>button{margin:auto}.gatePanel .langRow{justify-content:center;margin-top:28px}.reveal{opacity:.3;transform:translateY(40px);transition:opacity .9s ease,transform .9s ease}.reveal.in{opacity:1;transform:none}@keyframes grain{0%{transform:translate(0)}25%{transform:translate(2%,-2%)}50%{transform:translate(-2%,1%)}75%{transform:translate(1%,2%)}100%{transform:translate(-1%,-1%)}}@keyframes fog{50%{transform:translate3d(7%,5%,0) scale(1.15)}}@keyframes ray{50%{transform:translateX(18%) rotate(20deg);opacity:.55}}@keyframes sweep{0%,100%{transform:translateX(-70%);opacity:0}50%{transform:translateX(100%);opacity:1}}@keyframes scan{0%,100%{top:12%;opacity:0}15%,85%{opacity:.8}50%{top:88%}}@keyframes clock{to{transform:rotate(360deg)}}@media(max-width:1000px){.navBar{height:70px;padding:0 18px;grid-template-columns:1fr 1fr}.navBar nav{display:none}.navRight>span{display:none}.hero{height:auto;min-height:980px;display:block;padding:120px 22px 100px}.heroCopy{position:relative;z-index:7;max-width:90%}.hero h1{font-size:68px}.heroBottle{height:610px;margin-top:-40px;justify-content:flex-end}.heroBottle img{max-width:72%}.heroMeta.left{display:none}.heroMeta.right{position:absolute;right:22px;bottom:180px}.heroMeta.right strong{font-size:48px}.heroStrip{height:auto;grid-template-columns:1fr 1fr}.heroStrip div{min-height:62px}.heroWord{font-size:42vw}.manifesto{padding:120px 24px}.manifesto h2,.edition h2,.origin h2,.collection h2,.reserve h2{font-size:58px}.manifesto p{margin-left:0}.edition{grid-template-columns:1fr}.editionBottle{height:82vh;position:relative}.editionCopy{padding:90px 24px}.chapters{grid-template-columns:1fr 1fr}.origin{grid-template-columns:1fr;padding:100px 24px}.passport{transform:none}.cards{grid-template-columns:1fr}.reserve{grid-template-columns:1fr;padding:100px 24px}footer{grid-template-columns:1fr;padding:45px 22px}footer>span,footer small{text-align:left}.gateBottle{left:-32%;opacity:.28}}@media(max-width:560px){.hero{min-height:930px}.hero h1{font-size:56px}.heroBottle{height:540px}.heroBottle img{max-width:88%}.heroStrip{grid-template-columns:1fr 1fr}.heroStrip div{padding:16px 18px}.heroStrip b{font-size:13px}.chapters{grid-template-columns:1fr}.chapter{min-height:520px}.chapterVisual{height:260px}.editionFacts{grid-template-columns:1fr}.passport{padding:25px}.passport>strong{font-size:58px}.product{min-height:610px}.product img,.abstractBottle{height:410px}.gatePanel h1{font-size:54px}}@media(prefers-reduced-motion:reduce){.filmGrain,.fog,.godray,.sheen,.scan,.cv2 i,.cv3 i{animation:none!important}.reveal{opacity:1;transform:none}.heroBottle img{transition:none}}
      `}</style>
    </main>
  );
}
