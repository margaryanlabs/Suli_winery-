"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Lang = "en" | "ru" | "ka";

const COPY = {
  en: {
    nav: ["Heritage", "Edition", "Provenance", "Collection"],
    gateTitle: "Enter the house of SULI",
    gateBody: "Please confirm that you are of legal drinking age in your country.",
    gateButton: "I am of legal drinking age",
    kicker: "KAKHETI · GEORGIA · EDITION 001",
    title: "THE SOUL\nOF GEORGIA.",
    lead: "Eight thousand years of wine culture. One vineyard. One grape. One numbered object.",
    discover: "Discover Edition 001",
    reserve: "Request allocation",
    editionTitle: "777 bottles. Then never again.",
    editionBody: "SULI 001 is a small-batch Saperavi from Kakheti, presented in our sculptural matte-black bottle and individually numbered by hand.",
    filmTitle: "Earth. Clay. Time. Number.",
    acts: [
      ["01", "EARTH", "Mineral ground and the long Kakheti horizon."],
      ["02", "CLAY", "Qvevri rest below the cellar floor in darkness and silence."],
      ["03", "TIME", "The release follows the wine, never the marketing calendar."],
      ["04", "NUMBER", "One bottle. One mark. One owner. No second run."]
    ],
    originTitle: "Every bottle remembers where it came from.",
    originBody: "A discreet NFC mark and bottle code reveal vineyard, harvest, qvevri lot, bottling date and authenticity for your exact bottle.",
    collectionTitle: "A house of few releases.",
    products: [
      ["001", "SAPERAVI", "Dry red · Kakheti", "777 bottles"],
      ["002", "KISI QVEVRI", "Dry amber · Kakheti", "Coming next"],
      ["003", "CHACHA RESERVE", "Grape spirit · private release", "333 bottles"]
    ],
    formTitle: "Request Edition 001",
    formBody: "Private allocation for collectors, restaurants, hotels and gifting partners.",
    name: "Name",
    email: "Email",
    city: "City / market",
    send: "Request allocation",
    sent: "Request received",
    sentBody: "Thank you. Availability will be confirmed personally.",
    legal: "Please enjoy responsibly. For adults of legal drinking age only."
  },
  ru: {
    nav: ["Наследие", "Edition", "Происхождение", "Коллекция"],
    gateTitle: "Войти в дом SULI",
    gateBody: "Подтвердите, что вы достигли разрешённого возраста в вашей стране.",
    gateButton: "Я достиг(ла) разрешённого возраста",
    kicker: "КАХЕТИ · ГРУЗИЯ · EDITION 001",
    title: "ДУША\nГРУЗИИ.",
    lead: "Восемь тысяч лет винной культуры. Один виноградник. Один сорт. Один пронумерованный объект.",
    discover: "Открыть Edition 001",
    reserve: "Запросить резерв",
    editionTitle: "777 бутылок. И больше никогда.",
    editionBody: "SULI 001 — Саперави малой партии из Кахети в нашей скульптурной матово-чёрной бутылке. Каждый экземпляр получает собственный номер.",
    filmTitle: "Земля. Глина. Время. Номер.",
    acts: [
      ["01", "ЗЕМЛЯ", "Минеральная почва и длинный горизонт Кахети."],
      ["02", "ГЛИНА", "Квеври скрыты под полом марани — в темноте и тишине."],
      ["03", "ВРЕМЯ", "Релиз следует за вином, а не за маркетинговым календарём."],
      ["04", "НОМЕР", "Одна бутылка. Один знак. Один владелец. Без второго тиража."]
    ],
    originTitle: "Каждая бутылка помнит, откуда она пришла.",
    originBody: "NFC-метка и код бутылки открывают виноградник, урожай, партию квеври, дату розлива и подлинность именно вашего экземпляра.",
    collectionTitle: "Дом небольшого числа релизов.",
    products: [
      ["001", "SAPERAVI", "Сухое красное · Кахети", "777 бутылок"],
      ["002", "KISI QVEVRI", "Сухое янтарное · Кахети", "Скоро"],
      ["003", "CHACHA RESERVE", "Виноградный дистиллят · private release", "333 бутылки"]
    ],
    formTitle: "Запросить Edition 001",
    formBody: "Частный резерв для коллекционеров, ресторанов, отелей и подарочных партнёров.",
    name: "Имя",
    email: "Email",
    city: "Город / рынок",
    send: "Запросить резерв",
    sent: "Запрос получен",
    sentBody: "Спасибо. Наличие будет подтверждено лично.",
    legal: "Употребляйте ответственно. Только для совершеннолетних по законодательству вашей страны."
  },
  ka: {
    nav: ["მემკვიდრეობა", "Edition", "წარმოშობა", "კოლექცია"],
    gateTitle: "შედი SULI-ს სახლში",
    gateBody: "გთხოვთ დაადასტუროთ, რომ თქვენს ქვეყანაში კანონიერ ასაკს მიაღწიეთ.",
    gateButton: "მე კანონიერ ასაკს მივაღწიე",
    kicker: "კახეთი · საქართველო · EDITION 001",
    title: "საქართველოს\nსული.",
    lead: "ღვინის რვაათასწლიანი კულტურა. ერთი ვენახი. ერთი ჯიში. ერთი დანომრილი ობიექტი.",
    discover: "აღმოაჩინე Edition 001",
    reserve: "რეზერვის მოთხოვნა",
    editionTitle: "777 ბოთლი. და აღარასოდეს იგივე.",
    editionBody: "SULI 001 — მცირე პარტიის საფერავი კახეთიდან, ჩვენს მქრქალ შავ სკულპტურულ ბოთლში, ინდივიდუალური ნომრით.",
    filmTitle: "მიწა. თიხა. დრო. ნომერი.",
    acts: [
      ["01", "მიწა", "მინერალური ნიადაგი და კახეთის გრძელი ჰორიზონტი."],
      ["02", "თიხა", "ქვევრი მარნის იატაკქვეშაა — სიბნელესა და სიჩუმეში."],
      ["03", "დრო", "გამოშვება ღვინოს მიჰყვება და არა მარკეტინგულ კალენდარს."],
      ["04", "ნომერი", "ერთი ბოთლი. ერთი ნიშანი. ერთი მფლობელი. მეორე ტირაჟის გარეშე."]
    ],
    originTitle: "თითოეულ ბოთლს ახსოვს, საიდან მოვიდა.",
    originBody: "NFC ნიშანი და ბოთლის კოდი აჩვენებს ვენახს, მოსავალს, ქვევრის პარტიას, ჩამოსხმის თარიღსა და ავთენტურობას.",
    collectionTitle: "მცირე რაოდენობის გამოშვებების სახლი.",
    products: [
      ["001", "SAPERAVI", "მშრალი წითელი · კახეთი", "777 ბოთლი"],
      ["002", "KISI QVEVRI", "მშრალი ქარვისფერი · კახეთი", "მალე"],
      ["003", "CHACHA RESERVE", "ყურძნის დისტილატი · private release", "333 ბოთლი"]
    ],
    formTitle: "Edition 001-ის მოთხოვნა",
    formBody: "კერძო რეზერვი კოლექციონერებისთვის, რესტორნებისთვის, სასტუმროებისა და საჩუქრების პარტნიორებისთვის.",
    name: "სახელი",
    email: "Email",
    city: "ქალაქი / ბაზარი",
    send: "რეზერვის მოთხოვნა",
    sent: "მოთხოვნა მიღებულია",
    sentBody: "გმადლობთ. ხელმისაწვდომობა პირადად დადასტურდება.",
    legal: "მიირთვით პასუხისმგებლობით. მხოლოდ კანონიერ ასაკს მიღწეული პირებისთვის."
  }
} as const;

function Mark({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "mark small" : "mark"} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 3 53 15v34L32 61 11 49V15L32 3Z" />
      <path d="M42 17c-4-4-16-5-20 2-5 9 20 9 15 19-4 8-17 7-22 2" />
      <path d="M23 14 41 50M41 14 23 50" className="ghost" />
    </svg>
  );
}

function MountainScene() {
  return (
    <div className="mountains" aria-hidden="true">
      <div className="beam beam1" /><div className="beam beam2" />
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
        <path className="ridge back" d="M0 720 180 520 320 620 520 360 690 560 890 260 1040 500 1240 300 1410 510 1600 350V900H0Z" />
        <path className="ridge mid" d="M0 770 210 590 390 690 610 420 780 660 1030 360 1210 650 1390 470 1600 640V900H0Z" />
        <path className="ridge front" d="M0 840 250 690 420 780 680 600 860 800 1120 560 1300 760 1490 650 1600 720V900H0Z" />
      </svg>
      <div className="fog fog1" /><div className="fog fog2" /><div className="fog fog3" />
    </div>
  );
}

export default function SuliV5() {
  const [lang, setLang] = useState<Lang>("en");
  const [entered, setEntered] = useState(false);
  const [sent, setSent] = useState(false);
  const bottle = useRef<HTMLDivElement | null>(null);
  const t = useMemo(() => COPY[lang], [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    const move = (e: PointerEvent) => {
      const x = e.clientX / Math.max(innerWidth, 1) - .5;
      const y = e.clientY / Math.max(innerHeight, 1) - .5;
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      bottle.current?.style.setProperty("--ry", `${x * 10}deg`);
      bottle.current?.style.setProperty("--rx", `${-y * 5}deg`);
    };
    const scroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty("--progress", `${max > 0 ? scrollY / max : 0}`);
    };
    addEventListener("pointermove", move, { passive: true });
    addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => { removeEventListener("pointermove", move); removeEventListener("scroll", scroll); };
  }, [lang]);

  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <main className="suli5">
      <div className="noise" aria-hidden="true" /><div className="cursorLight" aria-hidden="true" />
      <div className="progress" aria-hidden="true"><i /></div>

      {!entered && (
        <section className="gate">
          <MountainScene />
          <div className="gateBottle"><img src="/suli-bottle.webp" alt="" /></div>
          <div className="gateContent">
            <Mark />
            <span>SULI · GEORGIA</span>
            <h1>{t.gateTitle}</h1>
            <p>{t.gateBody}</p>
            <button onClick={() => setEntered(true)}>{t.gateButton}<b>↗</b></button>
            <div className="langs">{(["en","ru","ka"] as Lang[]).map(l => <button key={l} onClick={() => setLang(l)} className={lang===l?"active":""}>{l.toUpperCase()}</button>)}</div>
          </div>
        </section>
      )}

      <header className="topbar">
        <a className="brand" href="#top"><Mark small/><span>SULI</span></a>
        <nav>{t.nav.map((n,i)=><a key={n} href={["#story","#edition","#origin","#collection"][i]}>{n}</a>)}</nav>
        <div className="langs headerLangs">{(["en","ru","ka"] as Lang[]).map(l => <button key={l} onClick={() => setLang(l)} className={lang===l?"active":""}>{l.toUpperCase()}</button>)}</div>
      </header>

      <section id="top" className="hero">
        <MountainScene />
        <div className="heroCopy">
          <span className="kicker">{t.kicker}</span>
          <h1>{t.title.split("\n").map(x=><em key={x}>{x}</em>)}</h1>
          <p>{t.lead}</p>
          <div className="actions"><a href="#edition">{t.discover}<b>↗</b></a><a className="ghostBtn" href="#reserve">{t.reserve}</a></div>
        </div>
        <div className="bottleStage" ref={bottle}>
          <div className="halo" />
          <img src="/suli-bottle.webp" alt="SULI Edition 001 Saperavi bottle" />
          <div className="bottleSheen" />
          <div className="bottleShadow" />
        </div>
        <div className="editionStamp"><span>EDITION</span><strong>001</strong><i>001 / 777</i></div>
        <div className="scrollCue">SCROLL <span /></div>
      </section>

      <section id="story" className="statement">
        <span>8,000 YEARS / ONE MODERN OBJECT</span>
        <h2>{lang==="ru"?"Не ещё одна винная этикетка.":lang==="ka"?"არა კიდევ ერთი ღვინის ეტიკეტი.":"Not another wine label."}</h2>
        <p>{lang==="ru"?"Мы не копируем прошлое. Мы переводим грузинскую винную культуру на современный визуальный язык — тишина, материал, происхождение и ограниченность.":lang==="ka"?"ჩვენ წარსულს არ ვაკოპირებთ. ქართულ ღვინის კულტურას თანამედროვე ენაზე ვთარგმნით — სიჩუმე, მასალა, წარმოშობა და შეზღუდული რაოდენობა.":"We do not imitate the past. We translate Georgian wine culture into a modern language of restraint, material, origin and scarcity."}</p>
      </section>

      <section id="edition" className="editionSection">
        <div className="stickyBottle"><img src="/suli-bottle.webp" alt="SULI bottle" /><div className="scanLine" /></div>
        <div className="editionCopy"><span>EDITION 001</span><h2>{t.editionTitle}</h2><p>{t.editionBody}</p><div className="facts">{[["777","BOTTLES"],["KAKHETI","ORIGIN"],["SAPERAVI","GRAPE"],["750 ML","FORMAT"]].map(x=><div key={x[0]}><strong>{x[0]}</strong><small>{x[1]}</small></div>)}</div></div>
      </section>

      <section className="film">
        <div className="filmHead"><span>A FILM IN FOUR ACTS</span><h2>{t.filmTitle}</h2></div>
        <div className="acts">{t.acts.map((a,i)=><article key={a[0]}><b>{a[0]}</b><div className={`actVisual act${i+1}`}><i/><i/><i/></div><h3>{a[1]}</h3><p>{a[2]}</p></article>)}</div>
      </section>

      <section id="origin" className="origin">
        <div className="originCopy"><span>PROVENANCE</span><h2>{t.originTitle}</h2><p>{t.originBody}</p><ul><li>VINEYARD / KAKHETI</li><li>HARVEST / 2026</li><li>QVEBRI LOT / Q-001</li><li>BOTTLED / 001 · 777</li></ul></div>
        <div className="certificate"><div className="certTop"><Mark/><span>CERTIFICATE OF ORIGIN</span></div><strong>041 / 777</strong><div className="certGrid"><span>EDITION <b>001</b></span><span>GRAPE <b>SAPERAVI</b></span><span>REGION <b>KAKHETI</b></span><span>COUNTRY <b>GEORGIA</b></span></div><div className="nfc">))) NFC</div></div>
      </section>

      <section id="collection" className="collection"><span>THE HOUSE OF SULI</span><h2>{t.collectionTitle}</h2><div className="productGrid">{t.products.map((p,i)=><article key={p[0]} className={i===0?"activeProduct":""}><div className="productNum">{p[0]}</div>{i===0?<img src="/suli-bottle.webp" alt="SULI Saperavi"/>:<div className="futureMark"><Mark/></div>}<h3>{p[1]}</h3><p>{p[2]}</p><small>{p[3]}</small></article>)}</div></section>

      <section id="reserve" className="reserve">
        <div><span>PRIVATE ALLOCATION</span><h2>{t.formTitle}</h2><p>{t.formBody}</p></div>
        {sent?<div className="sent"><Mark/><h3>{t.sent}</h3><p>{t.sentBody}</p></div>:<form onSubmit={submit}><label>{t.name}<input required/></label><label>{t.email}<input required type="email"/></label><label>{t.city}<input required/></label><button>{t.send}<b>↗</b></button></form>}
      </section>

      <footer><div className="brand"><Mark small/><span>SULI</span></div><span>GEORGIA · EDITION 001 · 001 / 777</span><small>{t.legal}</small></footer>

      <style jsx global>{`
        :root{--ink:#f4f4f0;--muted:#8d8d88;--line:rgba(255,255,255,.14);--mx:70vw;--my:30vh;--progress:0}.suli5{background:#030303;color:var(--ink);font-family:Arial,Helvetica,sans-serif;min-height:100vh;overflow:hidden}.suli5 *{box-sizing:border-box}.noise{position:fixed;inset:0;z-index:99;pointer-events:none;opacity:.055;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");mix-blend-mode:soft-light}.cursorLight{position:fixed;z-index:2;pointer-events:none;width:50vw;height:50vw;left:var(--mx);top:var(--my);transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(255,255,255,.055),transparent 62%)}.progress{position:fixed;z-index:120;left:0;top:0;width:100%;height:1px;background:#111}.progress i{display:block;height:100%;width:calc(var(--progress)*100%);background:#fff}.mark{width:54px;height:54px;fill:none;stroke:#f1f1ed;stroke-width:1.3}.mark.small{width:34px;height:34px}.mark .ghost{opacity:.18}.topbar{position:fixed;z-index:70;top:0;left:0;right:0;height:86px;display:flex;align-items:center;padding:0 4vw;border-bottom:1px solid rgba(255,255,255,.07);background:linear-gradient(#030303dd,#03030366,transparent);backdrop-filter:blur(10px)}.brand{display:flex;align-items:center;gap:15px;color:white;text-decoration:none}.brand span{font:400 22px/1 Georgia,serif;letter-spacing:.42em}.topbar nav{margin:auto;display:flex;gap:38px}.topbar nav a,.langs button{color:#a5a5a0;background:none;border:0;text-decoration:none;font-size:10px;letter-spacing:.22em;text-transform:uppercase;cursor:pointer}.topbar nav a:hover,.langs button.active{color:white}.langs{display:flex;gap:14px}.hero{height:100svh;min-height:780px;position:relative;display:grid;grid-template-columns:42% 34% 24%;align-items:center;padding:100px 5vw 40px;isolation:isolate}.mountains{position:absolute;inset:0;overflow:hidden;z-index:-3;background:radial-gradient(circle at 63% 42%,#222 0,#090909 28%,#020202 70%)}.mountains svg{position:absolute;inset:15% 0 0;width:100%;height:85%}.ridge{filter:drop-shadow(0 -4px 10px #000)}.ridge.back{fill:#1b1b1b;opacity:.45}.ridge.mid{fill:#0d0d0d;opacity:.85}.ridge.front{fill:#050505}.beam{position:absolute;width:30%;height:130%;top:-40%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);filter:blur(20px);transform:rotate(18deg)}.beam1{left:58%;animation:beam 11s ease-in-out infinite}.beam2{left:12%;opacity:.35;animation:beam 15s ease-in-out reverse infinite}.fog{position:absolute;border-radius:50%;filter:blur(70px);background:rgba(210,210,210,.08);animation:fog 14s ease-in-out infinite}.fog1{width:55%;height:18%;left:15%;bottom:12%}.fog2{width:40%;height:15%;right:0;bottom:28%;animation-delay:-4s}.fog3{width:28%;height:11%;left:45%;top:38%;animation-delay:-7s}.heroCopy{z-index:4;max-width:620px}.kicker,.statement>span,.filmHead span,.originCopy>span,.collection>span,.reserve>div>span,.editionCopy>span{display:block;font-size:10px;letter-spacing:.34em;color:#bdbdb8;margin-bottom:26px}.hero h1{font:400 clamp(64px,7vw,132px)/.82 Georgia,serif;letter-spacing:-.055em;margin:0}.hero h1 em{display:block;font-style:normal}.heroCopy p{max-width:470px;margin:30px 0;color:#aaa9a3;line-height:1.8;font-size:14px}.actions{display:flex;gap:12px;flex-wrap:wrap}.actions a,.reserve form button,.gateContent>button{border:1px solid rgba(255,255,255,.35);color:white;text-decoration:none;padding:17px 24px;font-size:10px;letter-spacing:.17em;text-transform:uppercase;background:rgba(255,255,255,.03);display:inline-flex;gap:24px;align-items:center;transition:.3s}.actions a:hover,.reserve form button:hover,.gateContent>button:hover{background:white;color:black}.actions .ghostBtn{border-color:transparent;color:#9d9d99}.bottleStage{z-index:3;position:relative;height:78vh;max-height:820px;display:flex;align-items:flex-end;justify-content:center;perspective:1200px;transform-style:preserve-3d}.bottleStage img{height:100%;max-width:100%;object-fit:contain;filter:contrast(1.12) brightness(.95) drop-shadow(0 35px 35px #000);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(30px);transition:transform .15s ease-out;mask-image:linear-gradient(to right,transparent 0,#000 10%,#000 90%,transparent 100%)}.halo{position:absolute;width:115%;height:65%;bottom:3%;border-radius:50%;background:radial-gradient(ellipse,rgba(255,255,255,.1),transparent 65%);filter:blur(18px)}.bottleSheen{position:absolute;pointer-events:none;width:28%;height:86%;left:28%;bottom:5%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);filter:blur(14px);transform:skewX(-5deg);animation:sheen 7s ease-in-out infinite}.bottleShadow{position:absolute;bottom:-2%;width:80%;height:10%;background:#000;filter:blur(20px);border-radius:50%}.editionStamp{z-index:4;align-self:center;border-left:1px solid #777;padding-left:22px;display:flex;flex-direction:column;gap:8px}.editionStamp span{font-size:10px;letter-spacing:.28em;color:#999}.editionStamp strong{font:400 64px/1 Georgia,serif}.editionStamp i{font-style:normal;font-size:11px;letter-spacing:.2em;color:#aaa}.scrollCue{position:absolute;right:4vw;bottom:44px;font-size:9px;letter-spacing:.3em;color:#777;writing-mode:vertical-rl}.scrollCue span{display:inline-block;height:80px;width:1px;background:linear-gradient(white,transparent);margin-top:15px}.statement{min-height:72vh;padding:12vw 9vw;display:flex;flex-direction:column;justify-content:center;border-top:1px solid var(--line)}.statement h2{font:400 clamp(52px,7vw,118px)/.9 Georgia,serif;max-width:1200px;margin:0 0 34px;letter-spacing:-.04em}.statement p{max-width:650px;color:#969692;line-height:1.9;font-size:15px;margin-left:auto}.editionSection{min-height:125vh;display:grid;grid-template-columns:52% 48%;border-top:1px solid var(--line);position:relative}.stickyBottle{height:100vh;position:sticky;top:0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle,#181818,#030303 60%)}.stickyBottle img{height:88%;max-width:75%;object-fit:contain;filter:contrast(1.12) drop-shadow(0 25px 30px #000)}.scanLine{position:absolute;left:15%;right:15%;height:1px;background:white;box-shadow:0 0 30px 5px rgba(255,255,255,.18);animation:scan 6s ease-in-out infinite}.editionCopy{padding:22vh 9vw 12vh 6vw}.editionCopy h2,.filmHead h2,.origin h2,.collection h2,.reserve h2{font:400 clamp(48px,5vw,92px)/.94 Georgia,serif;letter-spacing:-.04em;margin:0 0 30px}.editionCopy>p,.originCopy>p,.reserve>div>p{color:#969692;line-height:1.9;max-width:560px}.facts{display:grid;grid-template-columns:1fr 1fr;margin-top:70px;border-top:1px solid var(--line);border-left:1px solid var(--line)}.facts div{padding:28px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;flex-direction:column;gap:8px}.facts strong{font:400 28px Georgia,serif}.facts small{font-size:9px;letter-spacing:.2em;color:#777}.film{padding:12vw 5vw;border-top:1px solid var(--line)}.filmHead{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;margin-bottom:70px}.filmHead h2{max-width:900px}.acts{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line)}.acts article{background:#030303;padding:22px;min-height:480px;position:relative}.acts article>b{font:400 44px Georgia,serif;color:#4d4d4a}.actVisual{height:220px;margin:28px -22px 35px;position:relative;overflow:hidden;background:#080808}.actVisual i{position:absolute;display:block}.act1 i:nth-child(1){width:120%;height:120%;left:-10%;top:50%;background:linear-gradient(135deg,transparent 45%,#252525 46% 60%,transparent 61%);transform:rotate(-6deg)}.act1 i:nth-child(2){inset:0;background:radial-gradient(circle at 65% 30%,rgba(255,255,255,.13),transparent 35%)}.act2 i:nth-child(1){width:120px;height:150px;border:1px solid #777;border-radius:50% 50% 42% 42%;left:50%;top:50%;transform:translate(-50%,-45%)}.act2 i:nth-child(2){width:1px;height:100%;background:linear-gradient(transparent,#fff,transparent);left:50%;animation:scan 5s infinite}.act3 i:nth-child(1){width:130px;height:130px;border:1px solid #777;border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%)}.act3 i:nth-child(2){width:1px;height:100px;background:#aaa;left:50%;top:50%;transform-origin:top;animation:clock 8s linear infinite}.act4 i:nth-child(1){inset:25% 18%;border:1px solid #777}.act4 i:nth-child(2){inset:35% 30%;border:1px solid #333}.acts h3{font:400 28px Georgia,serif;letter-spacing:.08em}.acts p{color:#888;line-height:1.7;font-size:13px}.origin{padding:12vw 8vw;display:grid;grid-template-columns:1fr 1fr;gap:10vw;align-items:center;border-top:1px solid var(--line);background:radial-gradient(circle at 70% 50%,#111,transparent 35%)}.originCopy ul{list-style:none;padding:0;margin:50px 0 0;border-top:1px solid var(--line)}.originCopy li{padding:16px 0;border-bottom:1px solid var(--line);font-size:10px;letter-spacing:.18em;color:#aaa}.certificate{border:1px solid rgba(255,255,255,.28);padding:45px;position:relative;background:linear-gradient(145deg,#111,#050505);box-shadow:0 40px 80px #000}.certTop{display:flex;align-items:center;gap:20px;font-size:9px;letter-spacing:.25em}.certificate>strong{display:block;font:400 clamp(64px,7vw,110px) Georgia,serif;margin:55px 0 40px}.certGrid{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);border-left:1px solid var(--line)}.certGrid span{padding:18px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);font-size:8px;letter-spacing:.18em;color:#777;display:flex;flex-direction:column;gap:8px}.certGrid b{font-size:11px;color:#ddd}.nfc{margin-top:30px;font-size:10px;letter-spacing:.2em;color:#aaa}.collection{padding:12vw 5vw;border-top:1px solid var(--line)}.productGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);margin-top:65px}.productGrid article{background:#030303;padding:28px;min-height:620px;position:relative;text-align:center;overflow:hidden}.productGrid article img{height:420px;max-width:80%;object-fit:contain;filter:contrast(1.1) drop-shadow(0 25px 25px #000);transition:.5s}.productGrid article:hover img{transform:scale(1.04) translateY(-8px)}.productNum{position:absolute;left:22px;top:20px;font:400 44px Georgia,serif;color:#333}.futureMark{height:420px;display:flex;align-items:center;justify-content:center;opacity:.3}.productGrid h3{font:400 27px Georgia,serif;letter-spacing:.12em}.productGrid p,.productGrid small{color:#777;font-size:11px;letter-spacing:.08em}.reserve{padding:12vw 8vw;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:10vw}.reserve form{display:grid;gap:24px}.reserve label{font-size:9px;letter-spacing:.2em;color:#888}.reserve input{width:100%;margin-top:10px;border:0;border-bottom:1px solid #444;padding:14px 0;background:transparent;color:white;outline:none}.reserve input:focus{border-color:white}.reserve form button{justify-content:space-between;cursor:pointer;margin-top:20px}.sent{border:1px solid var(--line);padding:50px}.sent h3{font:400 42px Georgia,serif}.sent p{color:#888}footer{min-height:170px;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;padding:0 5vw;gap:30px}footer>span{font-size:9px;letter-spacing:.22em;color:#777;text-align:center}footer small{color:#555;text-align:right;line-height:1.6}.gate{position:fixed;z-index:200;inset:0;background:#020202;display:grid;place-items:center;overflow:hidden}.gate:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at center,transparent 0,#000 72%)}.gateBottle{position:absolute;height:95vh;left:11%;bottom:-15%;opacity:.3;filter:blur(1px)}.gateBottle img{height:100%}.gateContent{z-index:3;position:relative;text-align:center;max-width:760px;padding:30px}.gateContent>span{display:block;margin:22px 0;font-size:10px;letter-spacing:.32em;color:#999}.gateContent h1{font:400 clamp(52px,7vw,110px)/.9 Georgia,serif;margin:15px 0 25px}.gateContent p{color:#888;margin:0 auto 32px;max-width:480px;line-height:1.7}.gateContent>button{margin:auto}.gateContent .langs{justify-content:center;margin-top:30px}@keyframes fog{50%{transform:translate3d(8%,5%,0) scale(1.14)}}@keyframes beam{50%{transform:translateX(20%) rotate(22deg);opacity:.45}}@keyframes sheen{0%,100%{transform:translateX(-55%) skewX(-5deg);opacity:0}50%{transform:translateX(70%) skewX(-5deg);opacity:1}}@keyframes scan{0%,100%{top:14%;opacity:0}15%,85%{opacity:.8}50%{top:86%}}@keyframes clock{to{transform:rotate(360deg)}}@media(max-width:900px){.topbar{height:70px;padding:0 18px}.topbar nav{display:none}.brand span{font-size:18px}.headerLangs{margin-left:auto}.hero{min-height:900px;height:auto;grid-template-columns:1fr;padding:120px 22px 60px;display:block}.heroCopy{position:relative;z-index:6}.hero h1{font-size:64px}.heroCopy p{max-width:80%}.bottleStage{height:620px;margin-top:-30px;justify-content:flex-end}.bottleStage img{max-width:70%}.editionStamp{position:absolute;right:20px;bottom:120px}.scrollCue{display:none}.statement{padding:120px 24px}.statement h2{font-size:58px}.statement p{margin-left:0}.editionSection{grid-template-columns:1fr}.stickyBottle{height:85vh;position:relative}.editionCopy{padding:90px 24px}.film{padding:100px 22px}.filmHead{display:block}.acts{grid-template-columns:1fr 1fr}.origin{grid-template-columns:1fr;padding:100px 24px}.certificate{padding:28px}.productGrid{grid-template-columns:1fr}.productGrid article{min-height:560px}.reserve{grid-template-columns:1fr;padding:100px 24px}footer{grid-template-columns:1fr;text-align:left;padding:45px 22px}footer>span,footer small{text-align:left}.gateBottle{left:-30%;opacity:.22}.gateContent h1{font-size:60px}}@media(max-width:560px){.heroCopy p{max-width:100%}.bottleStage{height:530px}.bottleStage img{max-width:86%}.acts{grid-template-columns:1fr}.facts{grid-template-columns:1fr}.editionStamp strong{font-size:45px}.certificate>strong{font-size:58px}.productGrid article img,.futureMark{height:360px}}
        @media(prefers-reduced-motion:reduce){.fog,.beam,.bottleSheen,.scanLine,.actVisual i{animation:none!important}.bottleStage img{transition:none}}
      `}</style>
    </main>
  );
}
