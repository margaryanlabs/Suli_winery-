"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Lang = "en" | "ru" | "ka";

type Copy = {
  nav: string[];
  ageEyebrow: string;
  ageTitle: string;
  ageBody: string;
  ageEnter: string;
  kicker: string;
  heroTitleA: string;
  heroTitleB: string;
  heroBody: string;
  discover: string;
  reserve: string;
  editionLead: string;
  editionTitle: string;
  editionBody: string;
  originLead: string;
  originTitle: string;
  originBody: string;
  collectionLead: string;
  collectionTitle: string;
  future: string;
  formLead: string;
  formTitle: string;
  formBody: string;
  name: string;
  email: string;
  market: string;
  send: string;
  sent: string;
  sentBody: string;
  legal: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    nav: ["Edition", "Origin", "House", "Reserve"],
    ageEyebrow: "SULI · GEORGIA",
    ageTitle: "A Georgian object of wine.",
    ageBody: "Edition 001 is made for adults of legal drinking age in their country.",
    ageEnter: "Enter the house",
    kicker: "KAKHETI · GEORGIA · 001 / 777",
    heroTitleA: "THE SOUL",
    heroTitleB: "OF GEORGIA.",
    heroBody: "Eight thousand years of wine culture. Reduced to one vineyard, one grape and one numbered bottle.",
    discover: "Discover Edition 001",
    reserve: "Request allocation",
    editionLead: "EDITION 001 · SAPERAVI",
    editionTitle: "777 bottles. No second run.",
    editionBody: "A small-batch Saperavi from Kakheti. Matte-black glass. Hand-numbered release. A bottle designed to remain after the wine is gone.",
    originLead: "PROVENANCE / NOT MARKETING",
    originTitle: "Every bottle carries its origin.",
    originBody: "The exact vineyard, harvest, qvevri lot and bottling record follow each numbered bottle through its digital certificate.",
    collectionLead: "THE HOUSE OF SULI",
    collectionTitle: "Few releases. Distinct identities.",
    future: "NEXT RELEASE",
    formLead: "PRIVATE ALLOCATION",
    formTitle: "Request Edition 001",
    formBody: "For collectors, restaurants, hotels and gifting partners. Allocation is confirmed personally.",
    name: "Name",
    email: "Email",
    market: "City / market",
    send: "Request allocation",
    sent: "Request received.",
    sentBody: "We will confirm availability personally.",
    legal: "Please enjoy responsibly. For adults of legal drinking age only."
  },
  ru: {
    nav: ["Edition", "Происхождение", "Дом", "Резерв"],
    ageEyebrow: "SULI · ГРУЗИЯ",
    ageTitle: "Грузинский винный объект.",
    ageBody: "Edition 001 предназначен только для совершеннолетних по законодательству вашей страны.",
    ageEnter: "Войти в дом",
    kicker: "КАХЕТИ · ГРУЗИЯ · 001 / 777",
    heroTitleA: "ДУША",
    heroTitleB: "ГРУЗИИ.",
    heroBody: "Восемь тысяч лет винной культуры. Один виноградник, один сорт и одна пронумерованная бутылка.",
    discover: "Открыть Edition 001",
    reserve: "Запросить резерв",
    editionLead: "EDITION 001 · SAPERAVI",
    editionTitle: "777 бутылок. Второго тиража не будет.",
    editionBody: "Саперави малой партии из Кахети. Матовое чёрное стекло. Ручная нумерация. Бутылка, которую хочется оставить даже после вина.",
    originLead: "ПРОИСХОЖДЕНИЕ / НЕ МАРКЕТИНГ",
    originTitle: "Каждая бутылка несёт своё происхождение.",
    originBody: "Конкретный виноградник, урожай, партия квеври и дата розлива привязаны к номеру бутылки и её цифровому сертификату.",
    collectionLead: "ДОМ SULI",
    collectionTitle: "Мало релизов. Разные характеры.",
    future: "СЛЕДУЮЩИЙ РЕЛИЗ",
    formLead: "PRIVATE ALLOCATION",
    formTitle: "Запросить Edition 001",
    formBody: "Для коллекционеров, ресторанов, отелей и подарочных партнёров. Резерв подтверждается лично.",
    name: "Имя",
    email: "Email",
    market: "Город / рынок",
    send: "Запросить резерв",
    sent: "Запрос получен.",
    sentBody: "Наличие подтвердим лично.",
    legal: "Употребляйте ответственно. Только для совершеннолетних."
  },
  ka: {
    nav: ["Edition", "წარმოშობა", "სახლი", "რეზერვი"],
    ageEyebrow: "SULI · საქართველო",
    ageTitle: "ქართული ღვინის ობიექტი.",
    ageBody: "Edition 001 განკუთვნილია მხოლოდ კანონით ნებადართული ასაკის მქონე პირებისთვის.",
    ageEnter: "შედი სახლში",
    kicker: "კახეთი · საქართველო · 001 / 777",
    heroTitleA: "საქართველოს",
    heroTitleB: "სული.",
    heroBody: "ღვინის რვაათასწლიანი კულტურა. ერთი ვენახი, ერთი ჯიში და ერთი დანომრილი ბოთლი.",
    discover: "აღმოაჩინე Edition 001",
    reserve: "რეზერვის მოთხოვნა",
    editionLead: "EDITION 001 · SAPERAVI",
    editionTitle: "777 ბოთლი. მეორე ტირაჟის გარეშე.",
    editionBody: "მცირე პარტიის საფერავი კახეთიდან. მქრქალი შავი მინა. ხელით დანომრილი გამოშვება. ბოთლი, რომელიც ღვინის შემდეგაც რჩება.",
    originLead: "წარმოშობა / არა მარკეტინგი",
    originTitle: "თითოეულ ბოთლს თავისი წარმოშობა აქვს.",
    originBody: "კონკრეტული ვენახი, მოსავალი, ქვევრის პარტია და ჩამოსხმის ჩანაწერი მიბმულია ბოთლის ნომერსა და ციფრულ სერტიფიკატზე.",
    collectionLead: "SULI-ს სახლი",
    collectionTitle: "ცოტა გამოშვება. განსხვავებული ხასიათი.",
    future: "შემდეგი გამოშვება",
    formLead: "PRIVATE ALLOCATION",
    formTitle: "Edition 001-ის მოთხოვნა",
    formBody: "კოლექციონერებისთვის, რესტორნებისთვის, სასტუმროებისა და საჩუქრების პარტნიორებისთვის. რეზერვი პირადად დასტურდება.",
    name: "სახელი",
    email: "Email",
    market: "ქალაქი / ბაზარი",
    send: "რეზერვის მოთხოვნა",
    sent: "მოთხოვნა მიღებულია.",
    sentBody: "ხელმისაწვდომობას პირადად დაგიდასტურებთ.",
    legal: "მიირთვით პასუხისმგებლობით. მხოლოდ კანონიერ ასაკს მიღწეული პირებისთვის."
  }
};

function Seal({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "seal small" : "seal"} viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="31" />
      <circle cx="36" cy="36" r="24" className="sealGhost" />
      <path d="M48 23c-4-5-20-6-24 2-5 11 24 8 23 20-1 10-17 12-25 4" />
      <path d="M24 18 48 54M48 18 24 54" className="sealGhost" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand compact" : "brand"}>
      <Seal small={compact} />
      <b>SULI</b>
    </span>
  );
}

function LanguageSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="languageSwitch" aria-label="Language">
      {(["en", "ru", "ka"] as Lang[]).map((item) => (
        <button key={item} className={lang === item ? "active" : ""} onClick={() => setLang(item)}>
          {item === "ka" ? "GE" : item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function SuliV6() {
  const [lang, setLang] = useState<Lang>("en");
  const [entered, setEntered] = useState(false);
  const [sent, setSent] = useState(false);
  const heroBottle = useRef<HTMLDivElement | null>(null);
  const t = useMemo(() => COPY[lang], [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    const move = (event: PointerEvent) => {
      const nx = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const ny = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      document.documentElement.style.setProperty("--tilt-x", `${-ny * 3.5}deg`);
      document.documentElement.style.setProperty("--tilt-y", `${nx * 7}deg`);
    };
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--page-progress", `${progress}`);
      if (heroBottle.current) {
        const y = Math.min(window.scrollY * 0.08, 42);
        heroBottle.current.style.setProperty("--bottle-y", `${y}px`);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, [lang]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="suliSite">
      <div className="grain" aria-hidden="true" />
      <div className="cursorGlow" aria-hidden="true" />
      <div className="pageProgress" aria-hidden="true"><span /></div>

      {!entered && (
        <section className="ageGate">
          <div className="ageImage" aria-hidden="true"><img src="/suli-bottle.webp" alt="" /></div>
          <div className="ageShade" aria-hidden="true" />
          <div className="agePanel">
            <Brand />
            <span className="eyebrow">{t.ageEyebrow}</span>
            <h1>{t.ageTitle}</h1>
            <p>{t.ageBody}</p>
            <button className="primaryButton" onClick={() => setEntered(true)}>{t.ageEnter}<i>↗</i></button>
            <LanguageSwitch lang={lang} setLang={setLang} />
          </div>
        </section>
      )}

      <header className="siteHeader">
        <a href="#top" aria-label="SULI home"><Brand compact /></a>
        <nav>
          {t.nav.map((label, index) => (
            <a key={label} href={["#edition", "#origin", "#house", "#reserve"][index]}>{label}</a>
          ))}
        </nav>
        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="hero" id="top">
        <div className="heroWord" aria-hidden="true">SULI</div>
        <div className="heroMountains" aria-hidden="true">
          <i className="mountain m1" /><i className="mountain m2" /><i className="mountain m3" />
          <i className="fog f1" /><i className="fog f2" />
          <i className="lightBeam b1" /><i className="lightBeam b2" />
        </div>

        <div className="heroCopy">
          <span className="eyebrow">{t.kicker}</span>
          <h1><em>{t.heroTitleA}</em><em>{t.heroTitleB}</em></h1>
          <p>{t.heroBody}</p>
          <div className="heroActions">
            <a className="primaryButton" href="#edition">{t.discover}<i>↗</i></a>
            <a className="textButton" href="#reserve">{t.reserve}</a>
          </div>
        </div>

        <div className="heroBottle" ref={heroBottle}>
          <div className="bottleAura" aria-hidden="true" />
          <img src="/suli-bottle.webp" alt="SULI Edition 001 Saperavi" />
          <div className="bottleSweep" aria-hidden="true" />
        </div>

        <div className="heroNumber">
          <span>EDITION</span>
          <strong>001</strong>
          <small>001 / 777</small>
        </div>
        <div className="scrollMark" aria-hidden="true"><span>SCROLL</span><i /></div>
      </section>

      <section className="edition" id="edition">
        <div className="editionVisual">
          <div className="editionImage"><img src="/suli-bottle.webp" alt="SULI Saperavi Edition 001" /></div>
          <div className="scan" aria-hidden="true" />
          <span className="editionGhost" aria-hidden="true">001</span>
        </div>
        <div className="editionCopy">
          <span className="eyebrow">{t.editionLead}</span>
          <h2>{t.editionTitle}</h2>
          <p>{t.editionBody}</p>
          <div className="specGrid">
            <div><strong>777</strong><span>BOTTLES</span></div>
            <div><strong>KAKHETI</strong><span>ORIGIN</span></div>
            <div><strong>SAPERAVI</strong><span>GRAPE</span></div>
            <div><strong>750 ML</strong><span>FORMAT</span></div>
          </div>
        </div>
      </section>

      <section className="numberScene">
        <div className="numberBackdrop" aria-hidden="true">777</div>
        <div className="numberBottle"><img src="/suli-bottle.webp" alt="" /></div>
        <div className="numberCopy">
          <span>ONE RELEASE</span>
          <h2>001 <i>/</i> 777</h2>
          <p>{lang === "ru" ? "Каждая бутылка получает свой номер. Когда 777 закончились — Edition 001 становится историей." : lang === "ka" ? "თითოეულ ბოთლს თავისი ნომერი აქვს. 777-ის დასრულების შემდეგ Edition 001 ისტორიად რჩება." : "Every bottle receives its own number. When 777 are gone, Edition 001 becomes history."}</p>
        </div>
      </section>

      <section className="origin" id="origin">
        <div className="originText">
          <span className="eyebrow">{t.originLead}</span>
          <h2>{t.originTitle}</h2>
          <p>{t.originBody}</p>
          <div className="originRows">
            <span><b>VINEYARD</b><i>KAKHETI</i></span>
            <span><b>HARVEST</b><i>2026</i></span>
            <span><b>QVEBRI LOT</b><i>Q-001</i></span>
            <span><b>BOTTLE</b><i>041 / 777</i></span>
          </div>
        </div>
        <div className="certificate">
          <div className="certificateHead"><Seal /><span>CERTIFICATE<br/>OF ORIGIN</span></div>
          <div className="certificateNumber">041 <i>/</i> 777</div>
          <div className="certificateMeta">
            <span>EDITION <b>001</b></span>
            <span>GRAPE <b>SAPERAVI</b></span>
            <span>REGION <b>KAKHETI</b></span>
            <span>COUNTRY <b>GEORGIA</b></span>
          </div>
          <div className="certificateFoot"><span>))) NFC</span><span>AUTHENTICATED</span></div>
        </div>
      </section>

      <section className="house" id="house">
        <div className="houseHeader">
          <span className="eyebrow">{t.collectionLead}</span>
          <h2>{t.collectionTitle}</h2>
        </div>
        <div className="releaseGrid">
          <article className="release releaseLive">
            <span className="releaseIndex">01</span>
            <div className="releaseBottle"><img src="/suli-bottle.webp" alt="SULI Saperavi" /></div>
            <div className="releaseInfo"><b>SAPERAVI</b><span>DRY RED · KAKHETI</span><small>777 BOTTLES</small></div>
          </article>
          <article className="release futureRelease">
            <span className="releaseIndex">02</span>
            <div className="futureVisual"><i/><i/><i/></div>
            <div className="releaseInfo"><b>KISI QVEVRI</b><span>AMBER · KAKHETI</span><small>{t.future}</small></div>
          </article>
          <article className="release futureRelease">
            <span className="releaseIndex">03</span>
            <div className="futureVisual spirit"><i/><i/><i/></div>
            <div className="releaseInfo"><b>CHACHA RESERVE</b><span>GRAPE SPIRIT · PRIVATE RELEASE</span><small>{t.future}</small></div>
          </article>
        </div>
      </section>

      <section className="reserve" id="reserve">
        <div className="reserveCopy">
          <span className="eyebrow">{t.formLead}</span>
          <h2>{t.formTitle}</h2>
          <p>{t.formBody}</p>
        </div>
        {sent ? (
          <div className="sentState"><Seal/><h3>{t.sent}</h3><p>{t.sentBody}</p></div>
        ) : (
          <form onSubmit={submit}>
            <label>{t.name}<input required /></label>
            <label>{t.email}<input required type="email" /></label>
            <label>{t.market}<input required /></label>
            <button className="primaryButton" type="submit">{t.send}<i>↗</i></button>
          </form>
        )}
      </section>

      <footer>
        <Brand compact />
        <span>GEORGIA · EDITION 001 · 001 / 777</span>
        <small>{t.legal}</small>
      </footer>

      <style jsx global>{`
        :root{--bg:#050505;--paper:#f1f1ed;--muted:#92928d;--line:rgba(255,255,255,.13);--cursor-x:70vw;--cursor-y:25vh;--tilt-x:0deg;--tilt-y:0deg;--page-progress:0}.suliSite{min-height:100vh;background:var(--bg);color:var(--paper);font-family:Arial,Helvetica,sans-serif;overflow:hidden}.suliSite *{box-sizing:border-box}.grain{position:fixed;inset:0;z-index:200;pointer-events:none;opacity:.055;mix-blend-mode:soft-light;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E")}.cursorGlow{position:fixed;left:var(--cursor-x);top:var(--cursor-y);width:44vw;height:44vw;border-radius:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(255,255,255,.07),transparent 62%);filter:blur(16px);pointer-events:none;z-index:3}.pageProgress{position:fixed;left:0;right:0;top:0;height:1px;background:#101010;z-index:300}.pageProgress span{display:block;width:calc(var(--page-progress)*100%);height:100%;background:#fff}.seal{width:58px;height:58px;fill:none;stroke:#fff;stroke-width:1.2}.seal.small{width:36px;height:36px}.sealGhost{opacity:.16}.brand{display:inline-flex;align-items:center;gap:18px;color:#fff}.brand b{font:400 25px/1 Georgia,serif;letter-spacing:.42em}.brand.compact{gap:13px}.brand.compact b{font-size:20px}.siteHeader{height:84px;position:fixed;left:0;right:0;top:0;z-index:100;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 4vw;border-bottom:1px solid rgba(255,255,255,.08);background:linear-gradient(#050505e8,#05050599,transparent);backdrop-filter:blur(12px)}.siteHeader>a{text-decoration:none}.siteHeader nav{display:flex;gap:38px}.siteHeader nav a,.languageSwitch button{font:500 9px/1 Arial,sans-serif;letter-spacing:.25em;text-transform:uppercase;color:#8d8d88;text-decoration:none;background:none;border:0;cursor:pointer}.siteHeader nav a:hover,.languageSwitch button:hover,.languageSwitch button.active{color:#fff}.languageSwitch{justify-self:end;display:flex;gap:14px}.eyebrow{font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#a9a9a4}.primaryButton{display:inline-flex;align-items:center;justify-content:space-between;gap:40px;padding:17px 22px;border:1px solid rgba(255,255,255,.38);background:rgba(255,255,255,.02);color:#fff;text-decoration:none;text-transform:uppercase;font-size:9px;letter-spacing:.18em;transition:.35s;cursor:pointer}.primaryButton:hover{background:#fff;color:#050505}.primaryButton i{font-style:normal;font-size:15px}.textButton{display:inline-flex;align-items:center;color:#969691;text-decoration:none;text-transform:uppercase;font-size:9px;letter-spacing:.19em;padding:17px 10px}.textButton:hover{color:#fff}.ageGate{position:fixed;inset:0;z-index:500;background:#020202;display:grid;place-items:center;overflow:hidden}.ageImage{position:absolute;right:4%;top:-7%;bottom:-12%;width:48%;opacity:.45;transform:scale(1.05)}.ageImage img{width:100%;height:100%;object-fit:cover;object-position:center}.ageShade{position:absolute;inset:0;background:linear-gradient(90deg,#020202 24%,rgba(2,2,2,.78) 53%,rgba(2,2,2,.18)),radial-gradient(circle at 72% 44%,transparent,#020202 77%)}.agePanel{width:min(620px,86vw);position:relative;z-index:4;margin-right:28vw}.agePanel .eyebrow{display:block;margin:36px 0 24px}.agePanel h1{font:400 clamp(54px,6vw,105px)/.9 Georgia,serif;letter-spacing:-.05em;margin:0 0 28px}.agePanel p{max-width:490px;color:#969691;line-height:1.8;margin:0 0 30px}.agePanel .languageSwitch{justify-content:flex-start;margin-top:30px}.hero{height:100svh;min-height:760px;position:relative;isolation:isolate;padding:120px 4.5vw 48px;display:grid;grid-template-columns:46% 36% 18%;align-items:center}.heroWord{position:absolute;left:-1vw;right:0;top:50%;transform:translateY(-50%);font:400 clamp(180px,29vw,520px)/.7 Georgia,serif;letter-spacing:-.09em;color:rgba(255,255,255,.027);white-space:nowrap;z-index:-1}.heroMountains{position:absolute;inset:0;z-index:-3;overflow:hidden;background:radial-gradient(circle at 69% 45%,#171717 0,#080808 25%,#030303 70%)}.mountain{position:absolute;bottom:-18%;width:48%;height:75%;background:#0a0a0a;clip-path:polygon(0 100%,48% 0,100% 100%);filter:drop-shadow(0 -8px 24px #000)}.m1{left:4%;opacity:.5;transform:scale(.9)}.m2{left:35%;height:86%;background:#0d0d0d}.m3{right:-8%;height:69%;opacity:.72}.fog{position:absolute;border-radius:50%;filter:blur(75px);background:rgba(255,255,255,.065);animation:fogMove 13s ease-in-out infinite alternate}.f1{width:55%;height:12%;left:19%;bottom:15%}.f2{width:30%;height:11%;right:7%;bottom:35%;animation-delay:-5s}.lightBeam{position:absolute;top:-40%;width:17%;height:150%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.075),transparent);filter:blur(15px);transform:rotate(15deg);animation:beamMove 12s ease-in-out infinite}.b1{left:59%}.b2{left:24%;opacity:.25;animation-duration:17s;animation-direction:reverse}.heroCopy{z-index:10;max-width:660px}.heroCopy .eyebrow{display:block;margin-bottom:27px}.heroCopy h1{font:400 clamp(67px,7.4vw,138px)/.82 Georgia,serif;letter-spacing:-.058em;margin:0}.heroCopy h1 em{display:block;font-style:normal}.heroCopy p{max-width:470px;margin:32px 0;color:#a1a19d;font-size:14px;line-height:1.85}.heroActions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.heroBottle{height:84vh;max-height:880px;position:relative;z-index:8;display:flex;align-items:flex-end;justify-content:center;perspective:1400px;transform:translateY(var(--bottle-y,0px)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));transition:transform .18s ease-out}.heroBottle img{height:100%;width:100%;object-fit:cover;object-position:center;filter:contrast(1.12) brightness(1.03) drop-shadow(0 45px 45px #000);border-radius:2px;mix-blend-mode:screen}.bottleAura{position:absolute;left:2%;right:2%;bottom:5%;height:56%;border-radius:50%;background:radial-gradient(ellipse,rgba(255,255,255,.085),transparent 67%);filter:blur(25px)}.bottleSweep{position:absolute;inset:2% 7% 1%;overflow:hidden;mix-blend-mode:screen;pointer-events:none}.bottleSweep:after{content:"";position:absolute;top:-10%;bottom:-10%;width:19%;left:-22%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);filter:blur(13px);transform:skewX(-8deg);animation:sweep 7.5s ease-in-out infinite}.heroNumber{z-index:8;border-left:1px solid #777;padding-left:22px;display:flex;flex-direction:column;gap:8px}.heroNumber span{font-size:9px;letter-spacing:.3em;color:#92928d}.heroNumber strong{font:400 clamp(54px,5vw,82px)/1 Georgia,serif}.heroNumber small{font-size:10px;letter-spacing:.22em;color:#a8a8a3}.scrollMark{position:absolute;bottom:31px;right:4.5vw;display:flex;align-items:center;gap:13px;transform:rotate(90deg);transform-origin:right bottom;font-size:8px;letter-spacing:.34em;color:#666}.scrollMark i{width:74px;height:1px;background:linear-gradient(90deg,#777,transparent)}.edition{min-height:105svh;display:grid;grid-template-columns:55% 45%;border-top:1px solid var(--line);background:#030303}.editionVisual{min-height:105svh;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 45%,#181818,#030303 66%)}.editionImage{position:absolute;inset:-5% 11% -3%;overflow:hidden}.editionImage img{width:100%;height:100%;object-fit:cover;object-position:center;filter:contrast(1.14) brightness(.98);transform:scale(1.04)}.editionVisual:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#030303 0,transparent 25%,transparent 78%,#030303 100%),linear-gradient(0deg,#030303 0,transparent 17%,transparent 82%,#030303 100%)}.scan{position:absolute;left:18%;right:18%;height:1px;background:#fff;box-shadow:0 0 32px 5px rgba(255,255,255,.22);z-index:4;animation:scanLine 7s ease-in-out infinite}.editionGhost{position:absolute;left:-2%;bottom:-12%;font:400 28vw/.7 Georgia,serif;color:rgba(255,255,255,.025);z-index:2}.editionCopy{display:flex;flex-direction:column;justify-content:center;padding:8vw 8vw 8vw 6vw}.editionCopy .eyebrow{margin-bottom:25px}.editionCopy h2,.originText h2,.houseHeader h2,.reserveCopy h2{font:400 clamp(53px,5.6vw,104px)/.9 Georgia,serif;letter-spacing:-.05em;margin:0 0 30px}.editionCopy>p,.originText>p,.reserveCopy>p{color:#999994;line-height:1.9;max-width:570px;font-size:14px}.specGrid{display:grid;grid-template-columns:1fr 1fr;margin-top:62px;border-left:1px solid var(--line);border-top:1px solid var(--line)}.specGrid div{padding:25px 23px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;flex-direction:column;gap:8px}.specGrid strong{font:400 27px/1.1 Georgia,serif}.specGrid span{font-size:8px;letter-spacing:.24em;color:#6f6f6b}.numberScene{min-height:94svh;position:relative;overflow:hidden;border-top:1px solid var(--line);display:grid;grid-template-columns:43% 57%;align-items:center;padding:6vw;background:radial-gradient(circle at 34% 50%,#151515,#030303 49%)}.numberBackdrop{position:absolute;left:-3vw;right:0;top:50%;transform:translateY(-50%);font:400 34vw/.65 Georgia,serif;letter-spacing:-.1em;color:rgba(255,255,255,.025);white-space:nowrap}.numberBottle{height:82vh;position:relative;z-index:3;overflow:hidden}.numberBottle img{width:100%;height:100%;object-fit:cover;object-position:center;filter:contrast(1.13) brightness(.97);transform:scale(1.03)}.numberBottle:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#030303,transparent 20%,transparent 80%,#030303),linear-gradient(0deg,#030303,transparent 15%,transparent 85%,#030303)}.numberCopy{position:relative;z-index:4;padding-left:7vw}.numberCopy>span{font-size:9px;letter-spacing:.3em;color:#8f8f8a}.numberCopy h2{font:400 clamp(80px,12vw,210px)/.82 Georgia,serif;letter-spacing:-.07em;margin:25px 0}.numberCopy h2 i{font-style:normal;color:#484845;font-size:.58em}.numberCopy p{max-width:520px;color:#999994;line-height:1.9}.origin{min-height:92svh;padding:9vw 7vw;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:10vw;border-top:1px solid var(--line);background:radial-gradient(circle at 72% 47%,#101010,#030303 42%)}.originText .eyebrow{display:block;margin-bottom:27px}.originRows{margin-top:52px;border-top:1px solid var(--line)}.originRows>span{height:54px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}.originRows b{font-size:8px;letter-spacing:.22em;color:#777}.originRows i{font-style:normal;font-size:10px;letter-spacing:.15em}.certificate{padding:46px;border:1px solid rgba(255,255,255,.28);background:linear-gradient(145deg,#121212,#050505);box-shadow:0 55px 110px #000;position:relative;overflow:hidden}.certificate:before{content:"";position:absolute;width:55%;height:180%;top:-40%;left:-20%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.055),transparent);transform:rotate(15deg);animation:certificateLight 9s ease-in-out infinite}.certificateHead{position:relative;display:flex;align-items:center;gap:20px;font-size:8px;letter-spacing:.27em;line-height:1.7}.certificateNumber{position:relative;font:400 clamp(66px,7.6vw,128px)/1 Georgia,serif;letter-spacing:-.05em;margin:60px 0 45px}.certificateNumber i{font-style:normal;color:#4a4a47;font-size:.58em}.certificateMeta{position:relative;display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);border-left:1px solid var(--line)}.certificateMeta span{min-height:69px;padding:16px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;flex-direction:column;gap:8px;font-size:7px;letter-spacing:.2em;color:#686864}.certificateMeta b{font-size:10px;color:#e5e5e1}.certificateFoot{position:relative;margin-top:27px;display:flex;justify-content:space-between;font-size:8px;letter-spacing:.2em;color:#83837e}.house{padding:10vw 5vw;border-top:1px solid var(--line)}.houseHeader{display:grid;grid-template-columns:28% 72%;align-items:end;margin-bottom:65px}.houseHeader .eyebrow{align-self:start;padding-top:8px}.houseHeader h2{margin:0;max-width:1020px}.releaseGrid{display:grid;grid-template-columns:1.2fr .9fr .9fr;gap:1px;background:var(--line)}.release{min-height:650px;background:#030303;position:relative;overflow:hidden;padding:25px}.releaseIndex{position:absolute;left:23px;top:21px;z-index:5;font:400 44px/1 Georgia,serif;color:#30302e}.releaseBottle{height:470px;margin:-5px 5% 0;overflow:hidden;position:relative}.releaseBottle img{width:100%;height:100%;object-fit:cover;object-position:center;filter:contrast(1.1) brightness(.98);transition:transform .7s ease}.releaseLive:hover img{transform:scale(1.045)}.releaseBottle:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#030303 0,transparent 20%,transparent 82%,#030303 100%),linear-gradient(90deg,#030303 0,transparent 15%,transparent 85%,#030303)}.releaseInfo{position:absolute;left:25px;right:25px;bottom:27px;display:flex;flex-direction:column;gap:9px}.releaseInfo b{font:400 28px/1 Georgia,serif;letter-spacing:.12em}.releaseInfo span{font-size:8px;letter-spacing:.2em;color:#858580}.releaseInfo small{font-size:8px;letter-spacing:.2em;color:#565653}.futureVisual{position:absolute;inset:0;overflow:hidden;background:radial-gradient(circle at center,#111,#030303 62%)}.futureVisual i{position:absolute;display:block}.futureVisual i:nth-child(1){width:190px;height:280px;left:50%;top:45%;transform:translate(-50%,-50%);border:1px solid rgba(255,255,255,.14);border-radius:45% 45% 24% 24%}.futureVisual i:nth-child(2){width:1px;height:80%;left:50%;top:10%;background:linear-gradient(transparent,rgba(255,255,255,.28),transparent);animation:futureScan 7s ease-in-out infinite}.futureVisual i:nth-child(3){width:360px;height:360px;left:50%;top:44%;transform:translate(-50%,-50%);border:1px solid rgba(255,255,255,.035);border-radius:50%;animation:pulse 6s ease-in-out infinite}.futureVisual.spirit i:nth-child(1){width:150px;height:260px;border-radius:26% 26% 40% 40%}.futureVisual.spirit i:nth-child(3){width:290px;height:290px}.reserve{padding:11vw 8vw;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:11vw;align-items:start}.reserveCopy .eyebrow{display:block;margin-bottom:28px}.reserve form{display:grid;gap:25px}.reserve label{font-size:8px;letter-spacing:.23em;text-transform:uppercase;color:#70706c}.reserve input{display:block;width:100%;margin-top:8px;padding:16px 0;border:0;border-bottom:1px solid #3d3d3a;outline:none;background:transparent;color:#fff}.reserve input:focus{border-bottom-color:#fff}.reserve form .primaryButton{margin-top:18px;width:100%}.sentState{border:1px solid var(--line);padding:48px}.sentState h3{font:400 42px/1 Georgia,serif;margin:35px 0 18px}.sentState p{color:#8e8e89}footer{min-height:170px;border-top:1px solid var(--line);padding:0 5vw;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;gap:30px}footer>span{font-size:8px;letter-spacing:.23em;color:#6d6d69;text-align:center}footer small{color:#50504d;text-align:right;line-height:1.6}@keyframes fogMove{50%{transform:translate(7%,3%) scale(1.12)}}@keyframes beamMove{50%{transform:translateX(27%) rotate(19deg);opacity:.38}}@keyframes sweep{0%,100%{left:-22%;opacity:0}18%{opacity:.25}50%{left:102%;opacity:1}75%,100%{opacity:0}}@keyframes scanLine{0%,100%{top:12%;opacity:0}12%,85%{opacity:.85}50%{top:88%}}@keyframes certificateLight{0%,100%{transform:translateX(-30%) rotate(15deg);opacity:.1}50%{transform:translateX(180%) rotate(15deg);opacity:1}}@keyframes futureScan{0%,100%{transform:translateX(-80px);opacity:.1}50%{transform:translateX(80px);opacity:.8}}@keyframes pulse{50%{transform:translate(-50%,-50%) scale(1.12);opacity:.4}}@media(max-width:980px){.siteHeader{height:70px;padding:0 20px;grid-template-columns:1fr auto}.siteHeader nav{display:none}.brand.compact b{font-size:17px}.hero{height:auto;min-height:940px;padding:110px 22px 40px;grid-template-columns:1fr;display:block}.heroCopy{position:relative;z-index:12}.heroCopy h1{font-size:clamp(62px,18vw,102px)}.heroCopy p{max-width:80%}.heroBottle{height:620px;width:min(84vw,510px);margin:-38px auto 0;transform:translateY(var(--bottle-y,0px))}.heroBottle img{object-position:center}.heroNumber{position:absolute;right:22px;bottom:120px}.heroWord{font-size:64vw;top:62%}.scrollMark{display:none}.edition{grid-template-columns:1fr}.editionVisual{min-height:84svh}.editionCopy{padding:90px 24px}.numberScene{grid-template-columns:1fr;min-height:980px;padding:70px 22px}.numberBottle{height:570px}.numberCopy{padding:0;margin-top:-20px}.origin{grid-template-columns:1fr;padding:100px 24px;gap:70px}.house{padding:95px 20px}.houseHeader{grid-template-columns:1fr;gap:25px}.releaseGrid{grid-template-columns:1fr}.release{min-height:610px}.reserve{grid-template-columns:1fr;padding:100px 24px}footer{grid-template-columns:1fr;padding:45px 22px}footer>span,footer small{text-align:left}.ageImage{right:-30%;width:86%;opacity:.28}.agePanel{margin:0}.agePanel h1{font-size:62px}}@media(max-width:560px){.siteHeader .languageSwitch{gap:7px}.languageSwitch button{letter-spacing:.12em}.hero{min-height:870px}.heroCopy p{max-width:100%}.heroActions{align-items:stretch}.heroActions .primaryButton{width:100%}.heroBottle{height:515px;width:92vw;margin-top:-10px}.heroNumber{bottom:75px}.heroNumber strong{font-size:47px}.editionVisual{min-height:690px}.editionImage{inset:0 3%}.specGrid{grid-template-columns:1fr}.numberScene{min-height:860px}.numberBottle{height:500px}.numberCopy h2{font-size:90px}.certificate{padding:27px}.certificateNumber{font-size:62px}.certificateMeta{grid-template-columns:1fr}.release{min-height:560px}.releaseBottle{height:395px}.agePanel h1{font-size:50px}.ageImage{right:-56%;width:120%}}@media(prefers-reduced-motion:reduce){.fog,.lightBeam,.bottleSweep:after,.scan,.certificate:before,.futureVisual i{animation:none!important}.heroBottle{transition:none}}
      `}</style>
    </main>
  );
}
