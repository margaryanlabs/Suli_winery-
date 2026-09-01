"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Lang = "en" | "ru" | "ka";

const TEXT = {
  en: {
    eyebrow: "A FILM IN FOUR ACTS",
    title: "From earth to object.",
    sub: "Scroll slowly. SULI is meant to unfold, not simply load.",
    acts: [
      ["I", "Stone", "Kakheti begins with mineral ground, dry wind and a horizon that has shaped wine for generations."],
      ["II", "Clay", "Qvevri disappear beneath the cellar floor. Fermentation happens inside the earth, in darkness and silence."],
      ["III", "Time", "SULI is released when the wine is ready. The calendar follows the cellar — never the other way around."],
      ["IV", "Number", "A matte-black bottle, a small metal seal and one individual number. The final act belongs to its owner."]
    ]
  },
  ru: {
    eyebrow: "ИСТОРИЯ В ЧЕТЫРЁХ АКТАХ",
    title: "От земли — к объекту.",
    sub: "Листайте медленно. SULI должен раскрываться, а не просто загружаться.",
    acts: [
      ["I", "Камень", "Кахети начинается с минеральной земли, сухого ветра и горизонта, который веками формировал характер вина."],
      ["II", "Глина", "Квеври уходят под пол погреба. Ферментация проходит внутри земли — в темноте и тишине."],
      ["III", "Время", "SULI выходит тогда, когда готово вино. Календарь следует за погребом, а не наоборот."],
      ["IV", "Номер", "Матово-чёрная бутылка, небольшой металлический знак и один индивидуальный номер. Финальный акт принадлежит владельцу."]
    ]
  },
  ka: {
    eyebrow: "ამბავი ოთხ მოქმედებად",
    title: "მიწიდან — ობიექტამდე.",
    sub: "ნელა ჩამოსქროლეთ. SULI თანდათან უნდა გაიხსნას.",
    acts: [
      ["I", "ქვა", "კახეთი იწყება მინერალური მიწით, მშრალი ქარით და ჰორიზონტით, რომელმაც ღვინის ხასიათი თაობების განმავლობაში შექმნა."],
      ["II", "თიხა", "ქვევრი მარნის იატაკქვეშ იმალება. დუღილი მიწაში, სიბნელესა და სიჩუმეში მიმდინარეობს."],
      ["III", "დრო", "SULI მაშინ გამოდის, როცა ღვინო მზად არის. კალენდარი მარანს მიჰყვება — და არა პირიქით."],
      ["IV", "ნომერი", "მქრქალი შავი ბოთლი, მცირე მეტალის ნიშანი და ერთი ინდივიდუალური ნომერი. ბოლო მოქმედება მის მფლობელს ეკუთვნის."]
    ]
  }
} as const;

function SculpturalBottle() {
  return (
    <div className="v2-bottle" aria-hidden="true">
      <div className="v2-bottle__cap">SULI</div>
      <div className="v2-bottle__neck" />
      <div className="v2-bottle__shoulder" />
      <div className="v2-bottle__body">
        <div className="v2-bottle__light" />
        <div className="v2-bottle__texture" />
        <div className="v2-bottle__seal">S</div>
        <div className="v2-bottle__name">SULI</div>
        <div className="v2-bottle__meta">GEORGIA · EDITION 001</div>
        <div className="v2-bottle__number">041 / 777</div>
      </div>
      <div className="v2-bottle__shadow" />
    </div>
  );
}

function Chapter({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section className="v2-cinema" aria-label="SULI cinematic story">
      <div className="v2-cinema__head v2-reveal">
        <span>{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.sub}</p>
      </div>
      <div className="v2-cinema__stage">
        <div className="v2-cinema__sticky">
          <div className="v2-cinema__orb" />
          <div className="v2-cinema__ridge v2-cinema__ridge--back" />
          <div className="v2-cinema__ridge v2-cinema__ridge--front" />
          <div className="v2-cinema__dust" />
          <div className="v2-cinema__bottle"><SculpturalBottle /></div>
          <div className="v2-cinema__brand">SULI<small>EDITION 001</small></div>
          <div className="v2-cinema__coords">41.6168° N · 45.9221° E</div>
        </div>
        <div className="v2-cinema__acts">
          {t.acts.map((act, index) => (
            <article className="v2-act v2-reveal" key={act[1]}>
              <span>{act[0]} / 0{index + 1}</span>
              <h3>{act[1]}</h3>
              <p>{act[2]}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="v2-edition-band" aria-hidden="true"><strong>001</strong><i>OF</i><strong>777</strong></div>
    </section>
  );
}

export default function CinematicLayer() {
  const [lang, setLang] = useState<Lang>("en");
  const [progress, setProgress] = useState(0);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const [act, setAct] = useState("01");
  const pointerRef = useRef<HTMLDivElement | null>(null);

  const actLabel = useMemo(() => ({ en: "CHAPTER", ru: "ГЛАВА", ka: "თავი" }[lang]), [lang]);

  useEffect(() => {
    const syncLanguage = () => {
      const next = document.documentElement.lang as Lang;
      if (["en", "ru", "ka"].includes(next)) setLang(next);
    };
    syncLanguage();
    const observer = new MutationObserver(syncLanguage);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const collection = document.querySelector("#collection");
    const parent = collection?.parentElement;
    if (!collection || !parent) return;
    const mount = document.createElement("div");
    mount.id = "suli-cinematic-v2";
    parent.insertBefore(mount, collection);
    setPortalNode(mount);
    return () => mount.remove();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("v2-visible"));
    }, { threshold: 0.12 });

    const revealTargets = [
      ".hero__copy", ".hero__bottle", ".edition__copy", ".heritage__header", ".heritage__text",
      ".ritual__intro", ".product-card", ".provenance__copy", ".allocation__panel", ".v2-reveal"
    ].flatMap((selector) => Array.from(document.querySelectorAll(selector)));
    revealTargets.forEach((node) => {
      node.classList.add("v2-reveal");
      revealObserver.observe(node);
    });

    const sections = ["#top", "#edition", "#story", ".ritual", ".v2-cinema", "#collection", "#origin", "#allocation"];
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = sections.findIndex((selector) => visible.target.matches(selector));
      if (index >= 0) setAct(String(index + 1).padStart(2, "0"));
    }, { threshold: [0.2, 0.5, 0.8] });
    sections.forEach((selector) => document.querySelectorAll(selector).forEach((node) => sectionObserver.observe(node)));

    return () => {
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [portalNode]);

  useEffect(() => {
    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${event.clientX - 210}px, ${event.clientY - 210}px, 0)`;
      }
      document.documentElement.style.setProperty("--suli-mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--suli-my", `${event.clientY}px`);
      const hero = document.querySelector<HTMLElement>(".hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
        const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
        const y = (event.clientY - rect.top) / Math.max(rect.height, 1);
        hero.style.setProperty("--v2-ry", `${(x - .5) * 12}deg`);
        hero.style.setProperty("--v2-rx", `${(.5 - y) * 5}deg`);
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div className="v2-layer">
      <div className="v2-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <div className="v2-pointer" ref={pointerRef} aria-hidden="true" />
      <aside className="v2-rail" aria-hidden="true"><span>SULI / GEORGIA</span><i /><b>{actLabel} {act}</b></aside>
      <div className="v2-grain" aria-hidden="true" />
      {portalNode && createPortal(<Chapter lang={lang} />, portalNode)}
      <style jsx global>{`
        :root { --suli-mx: 70vw; --suli-my: 40vh; }
        .v2-layer { position: fixed; inset: 0; z-index: 21; pointer-events: none; }
        .v2-progress { position: fixed; z-index: 1001; left: 0; right: 0; top: 0; height: 2px; background: rgba(255,255,255,.035); }
        .v2-progress span { display:block; height:100%; background:linear-gradient(90deg,#7f5c38,#d6bc8d); box-shadow:0 0 18px rgba(214,188,141,.38); transition:width .07s linear; }
        .v2-pointer { position:fixed; width:420px; height:420px; left:0; top:0; border-radius:50%; background:radial-gradient(circle,rgba(201,158,100,.075),transparent 66%); mix-blend-mode:screen; will-change:transform; }
        .v2-grain { position:fixed; inset:0; opacity:.045; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E"); mix-blend-mode:soft-light; }
        .v2-rail { position:fixed; z-index:40; right:17px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; align-items:center; gap:13px; color:rgba(255,255,255,.28); mix-blend-mode:difference; }
        .v2-rail span { writing-mode:vertical-rl; font-size:7px; letter-spacing:.24em; }
        .v2-rail i { width:1px; height:56px; background:currentColor; }
        .v2-rail b { font-size:6px; font-weight:400; letter-spacing:.16em; writing-mode:vertical-rl; }
        .v2-reveal { opacity:0; transform:translate3d(0,28px,0); transition:opacity 1s cubic-bezier(.2,.65,.2,1),transform 1.15s cubic-bezier(.2,.65,.2,1); }
        .v2-reveal.v2-visible { opacity:1; transform:translate3d(0,0,0); }
        .hero { --v2-rx:0deg; --v2-ry:0deg; }
        .hero::after { content:""; position:absolute; inset:0; z-index:1; pointer-events:none; background:radial-gradient(circle 240px at var(--suli-mx) var(--suli-my),rgba(208,166,108,.08),transparent 75%); mix-blend-mode:screen; }
        .hero__bottle { perspective:1100px; transform-style:preserve-3d; }
        .hero__bottle > .bottle { transform:rotateX(var(--v2-rx)) rotateY(var(--v2-ry)); transition:transform .55s cubic-bezier(.2,.7,.2,1),filter .55s ease; filter:drop-shadow(0 36px 42px rgba(0,0,0,.5)); }
        .hero__bottle .bottle__body::after { content:""; position:absolute; inset:0; border-radius:inherit; background:linear-gradient(100deg,transparent 18%,rgba(255,255,255,.03) 31%,rgba(255,255,255,.13) 39%,transparent 49%); transform:translateX(-82%); animation:v2Sweep 7.2s ease-in-out infinite; pointer-events:none; }
        @keyframes v2Sweep { 0%,18%{transform:translateX(-82%);opacity:0} 35%{opacity:.7} 52%{transform:translateX(94%);opacity:0} 100%{transform:translateX(94%);opacity:0} }
        #suli-cinematic-v2 { position:relative; z-index:2; }
        .v2-cinema { position:relative; overflow:clip; padding:130px 0 0; color:#eee7dc; background:radial-gradient(circle at 18% 8%,rgba(151,104,57,.12),transparent 27%),#080807; border-top:1px solid rgba(255,255,255,.1); }
        .v2-cinema__head { padding:0 7vw 90px; display:grid; grid-template-columns:.65fr 1.3fr .7fr; align-items:end; gap:50px; }
        .v2-cinema__head>span { font-size:8px; letter-spacing:.22em; color:#bb9a6d; }
        .v2-cinema__head h2 { margin:0; font-family:var(--serif); font-weight:400; font-size:clamp(64px,7.6vw,132px); line-height:.82; letter-spacing:-.045em; }
        .v2-cinema__head p { margin:0; max-width:380px; color:rgba(255,255,255,.48); font-size:12px; line-height:1.9; }
        .v2-cinema__stage { position:relative; min-height:370vh; border-top:1px solid rgba(255,255,255,.09); }
        .v2-cinema__sticky { position:sticky; top:0; height:100vh; overflow:hidden; display:grid; place-items:center; background:radial-gradient(circle at 50% 40%,rgba(103,75,46,.22),transparent 29%),linear-gradient(180deg,#0b0a09 0%,#090806 62%,#15100c 100%); }
        .v2-cinema__sticky::after { content:""; position:absolute; inset:0; opacity:.15; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.22'/%3E%3C/svg%3E"); mix-blend-mode:soft-light; }
        .v2-cinema__orb { position:absolute; width:min(34vw,520px); aspect-ratio:1; border-radius:50%; left:50%; top:17%; transform:translateX(-50%); background:radial-gradient(circle at 43% 40%,#d7b981,#8b6945 43%,#201810 72%); opacity:.34; box-shadow:0 0 110px rgba(172,126,70,.16); }
        .v2-cinema__ridge { position:absolute; left:-8%; right:-8%; bottom:-6%; height:48%; clip-path:polygon(0 78%,8% 61%,17% 70%,26% 44%,37% 58%,49% 23%,60% 49%,71% 36%,81% 57%,90% 41%,100% 66%,100% 100%,0 100%); }
        .v2-cinema__ridge--back { background:#272016; opacity:.78; transform:scaleY(.82); transform-origin:bottom; bottom:9%; filter:blur(1.5px); }
        .v2-cinema__ridge--front { background:linear-gradient(180deg,#17130f,#080706 78%); }
        .v2-cinema__dust { position:absolute; inset:0; background:radial-gradient(circle at 50% 75%,rgba(199,147,90,.13),transparent 28%); animation:v2Breathe 7s ease-in-out infinite alternate; }
        @keyframes v2Breathe { from{transform:scale(1);opacity:.45} to{transform:scale(1.09);opacity:.85} }
        .v2-cinema__bottle { position:relative; z-index:3; transform:translateY(7vh) scale(1.05); filter:drop-shadow(0 42px 60px rgba(0,0,0,.58)); }
        .v2-cinema__brand { position:absolute; z-index:4; left:6vw; bottom:7vh; font-family:var(--serif); font-size:clamp(38px,5vw,82px); line-height:.72; color:rgba(255,255,255,.14); letter-spacing:.04em; }
        .v2-cinema__brand small { display:block; margin-top:16px; font-family:var(--sans); font-size:8px; letter-spacing:.25em; color:rgba(255,255,255,.34); }
        .v2-cinema__coords { position:absolute; z-index:4; right:6vw; bottom:7vh; font-size:7px; letter-spacing:.22em; color:rgba(255,255,255,.28); }
        .v2-cinema__acts { position:absolute; inset:0; z-index:6; display:flex; flex-direction:column; align-items:flex-end; padding:34vh 7vw 48vh; pointer-events:none; }
        .v2-act { width:min(34vw,520px); min-height:72vh; display:flex; flex-direction:column; justify-content:center; text-shadow:0 2px 22px rgba(0,0,0,.72); }
        .v2-act>span { font-size:8px; letter-spacing:.22em; color:#c9aa7c; margin-bottom:24px; }
        .v2-act h3 { margin:0 0 24px; font-family:var(--serif); font-weight:400; font-size:clamp(58px,6vw,105px); line-height:.84; }
        .v2-act p { max-width:430px; margin:0; color:rgba(255,255,255,.62); font-size:13px; line-height:1.85; }
        .v2-edition-band { min-height:310px; display:flex; align-items:center; justify-content:center; gap:2.8vw; overflow:hidden; border-top:1px solid rgba(255,255,255,.09); border-bottom:1px solid rgba(255,255,255,.09); background:#0a0908; }
        .v2-edition-band strong { font-family:var(--serif); font-weight:400; font-size:clamp(120px,22vw,370px); line-height:.65; color:rgba(255,255,255,.065); letter-spacing:-.07em; }
        .v2-edition-band i { font-style:normal; font-size:9px; letter-spacing:.28em; color:#c9aa7c; }
        .v2-bottle { position:relative; width:226px; height:650px; transform-style:preserve-3d; }
        .v2-bottle__cap { position:absolute; top:0; left:78px; width:70px; height:66px; border-radius:5px 5px 2px 2px; display:flex; align-items:flex-start; justify-content:center; padding-top:12px; color:rgba(219,197,161,.62); font-size:6px; letter-spacing:.22em; background:linear-gradient(90deg,#080808,#191816 45%,#080808); border-top:1px solid rgba(198,158,104,.38); }
        .v2-bottle__neck { position:absolute; top:54px; left:76px; width:74px; height:112px; background:linear-gradient(90deg,#090909,#1b1a18 44%,#0a0a09); border-radius:0 0 8px 8px; }
        .v2-bottle__shoulder { position:absolute; top:145px; left:30px; width:166px; height:88px; border-radius:49% 49% 8% 8%/80% 80% 20% 20%; background:linear-gradient(90deg,#090909,#201e1b 42%,#0a0a09); }
        .v2-bottle__body { position:absolute; top:194px; left:28px; width:170px; height:430px; overflow:hidden; border-radius:18px 18px 32px 32px; background:linear-gradient(92deg,#070707 0%,#121110 24%,#25221e 45%,#11100f 66%,#050505 100%); box-shadow:inset 12px 0 28px rgba(255,255,255,.018),inset -18px 0 28px rgba(0,0,0,.72); }
        .v2-bottle__light { position:absolute; width:32px; height:130%; left:31%; top:-15%; transform:rotate(9deg); filter:blur(11px); background:linear-gradient(180deg,transparent,rgba(255,255,255,.12),transparent); opacity:.42; }
        .v2-bottle__texture { position:absolute; inset:58% 0 0; opacity:.32; background:repeating-radial-gradient(ellipse at 42% 100%,transparent 0 9px,rgba(191,153,99,.2) 10px 11px,transparent 12px 17px); }
        .v2-bottle__seal { position:absolute; top:95px; left:50%; transform:translateX(-50%); width:42px; height:42px; border-radius:50%; display:grid; place-items:center; font-family:var(--serif); font-size:23px; font-style:italic; color:#1b140d; background:radial-gradient(circle at 35% 30%,#d2b27e,#8b6840 72%); box-shadow:0 3px 16px rgba(186,142,82,.22); }
        .v2-bottle__name { position:absolute; top:153px; width:100%; text-align:center; font-family:var(--serif); font-size:26px; letter-spacing:.24em; color:#dfd5c5; padding-left:.24em; }
        .v2-bottle__meta { position:absolute; top:193px; width:100%; text-align:center; font-size:5px; letter-spacing:.2em; color:rgba(223,213,197,.52); }
        .v2-bottle__number { position:absolute; bottom:42px; width:100%; text-align:center; font-size:7px; letter-spacing:.16em; color:#b38b58; }
        .v2-bottle__shadow { position:absolute; left:10px; right:10px; bottom:-4px; height:24px; border-radius:50%; background:rgba(0,0,0,.8); filter:blur(13px); }
        @media(max-width:1050px){ .v2-cinema__head{grid-template-columns:1fr;gap:24px}.v2-cinema__head p{max-width:520px}.v2-act{width:min(46vw,520px)}.v2-cinema__bottle{transform:translate(-15vw,7vh) scale(.96)} }
        @media(max-width:700px){ .v2-pointer,.v2-rail{display:none}.v2-cinema{padding-top:90px}.v2-cinema__head{padding:0 22px 64px}.v2-cinema__head h2{font-size:clamp(58px,17vw,88px)}.v2-cinema__stage{min-height:330vh}.v2-cinema__sticky{height:100svh;align-items:end}.v2-cinema__orb{width:80vw;top:15%}.v2-cinema__bottle{transform:translate(-20vw,7vh) scale(.7);transform-origin:bottom center}.v2-cinema__brand{left:22px;top:94px;bottom:auto;font-size:42px}.v2-cinema__coords{display:none}.v2-cinema__acts{padding:32vh 22px 40vh}.v2-act{width:58vw;min-height:68vh}.v2-act h3{font-size:54px}.v2-act p{font-size:11px;line-height:1.75}.v2-edition-band{min-height:180px}.v2-edition-band strong{font-size:30vw}.hero::after{display:none} }
        @media(prefers-reduced-motion:reduce){ .v2-reveal{opacity:1!important;transform:none!important}.v2-bottle__light,.v2-cinema__dust,.hero__bottle .bottle__body::after{animation:none!important}.hero__bottle>.bottle{transform:none!important} }
      `}</style>
    </div>
  );
}
