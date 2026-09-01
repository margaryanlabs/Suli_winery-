"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Lang = "en" | "ru" | "ka";

const COPY = {
  en: {
    nav: ["Story", "Edition", "Origin", "Collection"],
    gate: "Enter SULI",
    gateBody: "Please confirm you are of legal drinking age in your country.",
    enter: "I am of legal drinking age",
    heroKicker: "KAKHETI · GEORGIA · EDITION 001",
    heroTitle: "THE SOUL OF GEORGIA",
    heroBody: "Eight thousand years of wine culture, reduced to one place, one grape and one numbered object.",
    discover: "Discover Edition 001",
    allocation: "Request allocation",
    scroll: "SCROLL TO UNFOLD",
    edition: "EDITION 001",
    editionTitle: "777 bottles. No second run.",
    editionBody: "Small-batch Saperavi from Kakheti. A matte-black sculptural bottle, hand-numbered and paired with a digital certificate of origin.",
    facts: [["777", "BOTTLES"], ["001", "FIRST RELEASE"], ["KAKHETI", "ORIGIN"], ["SAPERAVI", "GRAPE"]],
    filmKicker: "A FILM IN FOUR ACTS",
    filmTitle: "Earth. Clay. Time. Number.",
    acts: [
      ["01", "EARTH", "Mineral ground, dry wind and the long Kakheti horizon."],
      ["02", "CLAY", "Qvevri rest beneath the cellar floor, where wine moves in darkness."],
      ["03", "TIME", "The release follows the wine. The calendar follows the cellar."],
      ["04", "NUMBER", "One bottle. One mark. One owner. Never reproduced."]
    ],
    originKicker: "PROVENANCE",
    originTitle: "Every bottle remembers where it came from.",
    originBody: "NFC and bottle code reveal vineyard, harvest, qvevri lot, bottling date and authenticity record for the exact bottle in your hand.",
    cert: "DIGITAL CERTIFICATE",
    certRows: [["Bottle", "041 / 777"], ["Edition", "001"], ["Region", "Kakheti, Georgia"], ["Grape", "Saperavi"], ["Format", "750 ml"]],
    collectionKicker: "THE HOUSE OF SULI",
    collectionTitle: "Few releases. Strong identities.",
    products: [
      ["001", "SAPERAVI", "Dry red · Kakheti", "777 bottles"],
      ["002", "KISI QVEVRI", "Dry amber · Kakheti", "Coming next"],
      ["003", "CHACHA RESERVE", "Grape spirit · Oak rested", "333 bottles"]
    ],
    formTitle: "Request Edition 001",
    formBody: "Private allocations for collectors, restaurants, hotels and gifting partners.",
    name: "Name",
    email: "Email",
    market: "City / market",
    send: "Request allocation",
    sent: "Request received",
    sentBody: "Thank you. Availability will be confirmed personally.",
    legal: "Please enjoy responsibly. For adults of legal drinking age only."
  },
  ru: {
    nav: ["История", "Edition", "Происхождение", "Коллекция"],
    gate: "Войти в SULI",
    gateBody: "Подтвердите, что вы достигли разрешённого возраста в вашей стране.",
    enter: "Я достиг(ла) разрешённого возраста",
    heroKicker: "КАХЕТИ · ГРУЗИЯ · EDITION 001",
    heroTitle: "ДУША ГРУЗИИ",
    heroBody: "Восемь тысяч лет винной культуры, сведённые к одному месту, одному сорту и одному пронумерованному объекту.",
    discover: "Открыть Edition 001",
    allocation: "Запросить резерв",
    scroll: "ЛИСТАЙТЕ — ИСТОРИЯ РАСКРОЕТСЯ",
    edition: "EDITION 001",
    editionTitle: "777 бутылок. Без второго тиража.",
    editionBody: "Саперави малой партии из Кахети. Матово-чёрная скульптурная бутылка, ручная нумерация и цифровой сертификат происхождения.",
    facts: [["777", "БУТЫЛОК"], ["001", "ПЕРВЫЙ РЕЛИЗ"], ["КАХЕТИ", "РЕГИОН"], ["САПЕРАВИ", "СОРТ"]],
    filmKicker: "ИСТОРИЯ В ЧЕТЫРЁХ АКТАХ",
    filmTitle: "Земля. Глина. Время. Номер.",
    acts: [
      ["01", "ЗЕМЛЯ", "Минеральная почва, сухой ветер и длинный горизонт Кахети."],
      ["02", "ГЛИНА", "Квеври скрыты под полом марани, где вино живёт в темноте."],
      ["03", "ВРЕМЯ", "Релиз следует за вином. Календарь следует за погребом."],
      ["04", "НОМЕР", "Одна бутылка. Один знак. Один владелец. Без повторения."]
    ],
    originKicker: "ПРОИСХОЖДЕНИЕ",
    originTitle: "Каждая бутылка помнит, откуда она пришла.",
    originBody: "NFC и код бутылки открывают виноградник, урожай, партию квеври, дату розлива и запись подлинности именно вашего экземпляра.",
    cert: "ЦИФРОВОЙ СЕРТИФИКАТ",
    certRows: [["Бутылка", "041 / 777"], ["Edition", "001"], ["Регион", "Кахети, Грузия"], ["Сорт", "Саперави"], ["Объём", "750 ml"]],
    collectionKicker: "ДОМ SULI",
    collectionTitle: "Мало релизов. Сильный характер.",
    products: [
      ["001", "SAPERAVI", "Сухое красное · Кахети", "777 бутылок"],
      ["002", "KISI QVEVRI", "Сухое янтарное · Кахети", "Скоро"],
      ["003", "CHACHA RESERVE", "Виноградный дистиллят · выдержка", "333 бутылки"]
    ],
    formTitle: "Запросить Edition 001",
    formBody: "Частный резерв для коллекционеров, ресторанов, отелей и подарочных партнёров.",
    name: "Имя",
    email: "Email",
    market: "Город / рынок",
    send: "Запросить резерв",
    sent: "Запрос получен",
    sentBody: "Спасибо. Наличие будет подтверждено лично.",
    legal: "Употребляйте ответственно. Только для совершеннолетних по законодательству вашей страны."
  },
  ka: {
    nav: ["ისტორია", "Edition", "წარმოშობა", "კოლექცია"],
    gate: "შედი SULI-ში",
    gateBody: "გთხოვთ დაადასტუროთ, რომ თქვენს ქვეყანაში ალკოჰოლის მიღებისთვის კანონიერ ასაკს მიაღწიეთ.",
    enter: "მე კანონიერ ასაკს მივაღწიე",
    heroKicker: "კახეთი · საქართველო · EDITION 001",
    heroTitle: "საქართველოს სული",
    heroBody: "ღვინის რვაათასწლიანი კულტურა — ერთი ადგილი, ერთი ჯიში და ერთი დანომრილი ობიექტი.",
    discover: "აღმოაჩინე Edition 001",
    allocation: "რეზერვის მოთხოვნა",
    scroll: "ჩამოსქროლეთ — ამბავი გაიხსნება",
    edition: "EDITION 001",
    editionTitle: "777 ბოთლი. მეორე ტირაჟის გარეშე.",
    editionBody: "მცირე პარტიის საფერავი კახეთიდან. მქრქალი შავი სკულპტურული ბოთლი, ხელით დანომრილი და ციფრული წარმოშობის სერტიფიკატით.",
    facts: [["777", "ბოთლი"], ["001", "პირველი გამოშვება"], ["კახეთი", "წარმოშობა"], ["საფერავი", "ჯიში"]],
    filmKicker: "ამბავი ოთხ მოქმედებად",
    filmTitle: "მიწა. თიხა. დრო. ნომერი.",
    acts: [
      ["01", "მიწა", "მინერალური ნიადაგი, მშრალი ქარი და კახეთის გრძელი ჰორიზონტი."],
      ["02", "თიხა", "ქვევრი მარნის იატაკქვეშაა, სადაც ღვინო სიბნელეში ვითარდება."],
      ["03", "დრო", "გამოშვება ღვინოს მიჰყვება. კალენდარი — მარანს."],
      ["04", "ნომერი", "ერთი ბოთლი. ერთი ნიშანი. ერთი მფლობელი. გამეორების გარეშე."]
    ],
    originKicker: "წარმოშობა",
    originTitle: "თითოეულ ბოთლს ახსოვს, საიდან მოვიდა.",
    originBody: "NFC და ბოთლის კოდი აჩვენებს ვენახს, მოსავალს, ქვევრის პარტიას, ჩამოსხმის თარიღსა და ავთენტურობის ჩანაწერს.",
    cert: "ციფრული სერტიფიკატი",
    certRows: [["ბოთლი", "041 / 777"], ["Edition", "001"], ["რეგიონი", "კახეთი, საქართველო"], ["ჯიში", "საფერავი"], ["მოცულობა", "750 ml"]],
    collectionKicker: "SULI-ს სახლი",
    collectionTitle: "ცოტა გამოშვება. ძლიერი ხასიათი.",
    products: [
      ["001", "SAPERAVI", "მშრალი წითელი · კახეთი", "777 ბოთლი"],
      ["002", "KISI QVEVRI", "მშრალი ქარვისფერი · კახეთი", "მალე"],
      ["003", "CHACHA RESERVE", "ყურძნის სპირტი · მუხაში დაძველებული", "333 ბოთლი"]
    ],
    formTitle: "Edition 001-ის მოთხოვნა",
    formBody: "კერძო რეზერვი კოლექციონერებისთვის, რესტორნებისთვის, სასტუმროებისა და საჩუქრების პარტნიორებისთვის.",
    name: "სახელი",
    email: "Email",
    market: "ქალაქი / ბაზარი",
    send: "რეზერვის მოთხოვნა",
    sent: "მოთხოვნა მიღებულია",
    sentBody: "გმადლობთ. ხელმისაწვდომობა პირადად დადასტურდება.",
    legal: "მიირთვით პასუხისმგებლობით. მხოლოდ კანონიერ ასაკს მიღწეული პირებისთვის."
  }
} as const;

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`s4-mark ${compact ? "s4-mark--compact" : ""}`} aria-label="SULI">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="28" />
        <path d="M41 18c-3-3-7-5-12-4-6 1-10 5-10 10 0 7 7 9 13 11 6 2 11 4 11 10 0 5-5 9-11 9-6 0-11-3-14-7" />
        <path className="s4-mark__cut" d="M23 44 43 23" />
      </svg>
      {!compact && <span>SULI</span>}
    </div>
  );
}

function Bottle({ small = false }: { small?: boolean }) {
  return (
    <div className={`s4-bottle ${small ? "s4-bottle--small" : ""}`} aria-hidden="true">
      <div className="s4-bottle__cap"><i /><i /><i /></div>
      <div className="s4-bottle__neck" />
      <div className="s4-bottle__shoulder" />
      <div className="s4-bottle__body">
        <div className="s4-bottle__rim" />
        <div className="s4-bottle__shine" />
        <div className="s4-bottle__seal"><Mark compact /></div>
        <div className="s4-bottle__word">SULI</div>
        <div className="s4-bottle__wine">SAPERAVI</div>
        <div className="s4-bottle__meta">DRY RED WINE · 2026</div>
        <div className="s4-bottle__num">001 / 777</div>
        <div className="s4-bottle__terrain"><b /><b /><b /><b /><b /></div>
      </div>
      <div className="s4-bottle__shadow" />
    </div>
  );
}

export default function SuliV4() {
  const [lang, setLang] = useState<Lang>("en");
  const [ageOk, setAgeOk] = useState(false);
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const t = useMemo(() => COPY[lang], [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      const x = e.clientX / Math.max(window.innerWidth, 1);
      const y = e.clientY / Math.max(window.innerHeight, 1);
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      if (heroRef.current) {
        heroRef.current.style.setProperty("--ry", `${(x - .5) * 13}deg`);
        heroRef.current.style.setProperty("--rx", `${(.5 - y) * 5}deg`);
      }
    };
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
      document.documentElement.style.setProperty("--scroll", String(p));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="s4">
      <div className="s4-noise" />
      <div className="s4-cursor-light" />

      {!ageOk && (
        <div className="s4-gate">
          <div className="s4-gate__film" />
          <div className="s4-gate__card">
            <Mark />
            <span className="s4-eyebrow">SULI · GEORGIA · EDITION 001</span>
            <h1>{t.gate}</h1>
            <p>{t.gateBody}</p>
            <button onClick={() => setAgeOk(true)}>{t.enter}</button>
            <div className="s4-langs">
              {(["en", "ru", "ka"] as Lang[]).map(l => <button className={lang === l ? "active" : ""} key={l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>)}
            </div>
          </div>
        </div>
      )}

      <header className="s4-nav">
        <a href="#top"><Mark /></a>
        <nav>{t.nav.map((n, i) => <a key={n} href={["#story", "#edition", "#origin", "#collection"][i]}>{n}</a>)}</nav>
        <div className="s4-langs s4-langs--nav">{(["en", "ru", "ka"] as Lang[]).map(l => <button className={lang === l ? "active" : ""} key={l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>)}</div>
      </header>

      <section className="s4-hero" id="top" ref={heroRef}>
        <div className="s4-sky">
          <div className="s4-beam s4-beam--1" />
          <div className="s4-beam s4-beam--2" />
          <div className="s4-mountain s4-mountain--back" />
          <div className="s4-mountain s4-mountain--front" />
          <div className="s4-mist" />
        </div>
        <div className="s4-hero__copy">
          <span className="s4-eyebrow">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroBody}</p>
          <div className="s4-actions"><a href="#edition">{t.discover}</a><a className="ghost" href="#allocation">{t.allocation}</a></div>
        </div>
        <div className="s4-hero__object"><Bottle /></div>
        <aside className="s4-index"><b>01</b><span>02</span><span>03</span><span>04</span></aside>
        <div className="s4-hero__edition"><span>LIMITED EDITION</span><b>001 / 777</b></div>
        <div className="s4-scroll">{t.scroll}<i /></div>
      </section>

      <section className="s4-story" id="story">
        <div className="s4-story__number">8,000</div>
        <div className="s4-story__copy"><span className="s4-eyebrow">GEORGIAN WINE HERITAGE</span><h2>{lang === "ru" ? "До вина как индустрии — вино как ритуал." : lang === "ka" ? "ინდუსტრიამდე ღვინო რიტუალი იყო." : "Before wine was an industry, it was a ritual."}</h2><p>{lang === "ru" ? "SULI не наряжается в фольклор. Мы берём древнюю культуру квеври, местный сорт и конкретное место — и переводим их на современный визуальный язык." : lang === "ka" ? "SULI ფოლკლორის დეკორაციად არ იქცევა. ქვევრის ტრადიცია, ქართული ჯიში და კონკრეტული ადგილი თანამედროვე ენაზე გადმოგვაქვს." : "SULI does not dress heritage as folklore. We take qvevri culture, native grape and a specific place, then translate them into a contemporary visual language."}</p></div>
        <div className="s4-story__well"><div className="s4-qvevri" /><span>QVEVRI / KAKHETI</span></div>
      </section>

      <section className="s4-edition" id="edition">
        <div className="s4-edition__visual"><div className="s4-halo" /><Bottle /></div>
        <div className="s4-edition__copy"><span className="s4-eyebrow">{t.edition}</span><h2>{t.editionTitle}</h2><p>{t.editionBody}</p><div className="s4-facts">{t.facts.map(f => <div key={f[1]}><strong>{f[0]}</strong><span>{f[1]}</span></div>)}</div></div>
      </section>

      <section className="s4-film">
        <div className="s4-film__head"><span className="s4-eyebrow">{t.filmKicker}</span><h2>{t.filmTitle}</h2></div>
        <div className="s4-film__acts">{t.acts.map((a, i) => <article key={a[0]}><div className="s4-act__visual"><span>{a[0]}</span><i className={`scene scene-${i + 1}`} /></div><h3>{a[1]}</h3><p>{a[2]}</p></article>)}</div>
      </section>

      <section className="s4-origin" id="origin">
        <div className="s4-origin__copy"><span className="s4-eyebrow">{t.originKicker}</span><h2>{t.originTitle}</h2><p>{t.originBody}</p></div>
        <div className="s4-certificate"><div className="s4-certificate__top"><Mark /><span>{t.cert}</span><b>041 / 777</b></div>{t.certRows.map(r => <div className="s4-certrow" key={r[0]}><span>{r[0]}</span><strong>{r[1]}</strong></div>)}<div className="s4-qr"><i /><i /><i /><b>NFC</b></div></div>
      </section>

      <section className="s4-collection" id="collection">
        <div className="s4-collection__head"><span className="s4-eyebrow">{t.collectionKicker}</span><h2>{t.collectionTitle}</h2></div>
        <div className="s4-products">{t.products.map((p, i) => <article key={p[0]}><div className="s4-product__bottle"><Bottle small /></div><span>{p[0]}</span><h3>{p[1]}</h3><p>{p[2]}</p><small>{p[3]}</small><i className={`s4-product__line line-${i + 1}`} /></article>)}</div>
      </section>

      <section className="s4-allocation" id="allocation">
        <div><span className="s4-eyebrow">PRIVATE ALLOCATION</span><h2>{t.formTitle}</h2><p>{t.formBody}</p></div>
        <form onSubmit={submit}>{sent ? <div className="s4-sent"><Mark compact /><h3>{t.sent}</h3><p>{t.sentBody}</p></div> : <><input required placeholder={t.name} /><input required type="email" placeholder={t.email} /><input required placeholder={t.market} /><button>{t.send}<span>↗</span></button></>}</form>
      </section>

      <footer><Mark /><span>EDITION 001 · KAKHETI · GEORGIA</span><small>{t.legal}</small></footer>

      <style jsx global>{`
        :root{--bg:#050505;--paper:#f2f2ee;--muted:#8d8d89;--line:rgba(255,255,255,.13);--mx:70vw;--my:30vh;--rx:0deg;--ry:0deg;--scroll:0}
        *{box-sizing:border-box}html{background:var(--bg);scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--paper);font-family:Arial,Helvetica,sans-serif;overflow-x:hidden}.s4{min-height:100vh;background:#050505;color:#f2f2ee;position:relative}.s4 a{color:inherit;text-decoration:none}.s4 button,.s4 input{font:inherit}.s4-noise{position:fixed;inset:0;z-index:90;pointer-events:none;opacity:.045;mix-blend-mode:screen;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E")}.s4-cursor-light{position:fixed;z-index:2;pointer-events:none;width:600px;height:600px;left:0;top:0;transform:translate(calc(var(--mx) - 300px),calc(var(--my) - 300px));background:radial-gradient(circle,rgba(255,255,255,.065),transparent 66%);mix-blend-mode:screen}
        .s4-mark{display:flex;align-items:center;gap:16px;font-family:Georgia,serif;letter-spacing:.36em;font-size:17px}.s4-mark svg{width:43px;height:43px;fill:none;stroke:#f5f5f0;stroke-width:1.45}.s4-mark__cut{stroke-width:.75;opacity:.55}.s4-mark--compact svg{width:31px;height:31px}.s4-mark--compact span{display:none}
        .s4-nav{position:fixed;z-index:80;top:0;left:0;right:0;height:86px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 4vw;background:linear-gradient(180deg,rgba(5,5,5,.92),rgba(5,5,5,.56),transparent);border-bottom:1px solid rgba(255,255,255,.06);backdrop-filter:blur(7px)}.s4-nav nav{display:flex;gap:34px}.s4-nav nav a{font-size:10px;letter-spacing:.23em;text-transform:uppercase;color:#b8b8b4;transition:.3s}.s4-nav nav a:hover{color:white}.s4-langs{display:flex;gap:13px}.s4-langs button{border:0;background:none;color:#666;padding:2px;cursor:pointer;font-size:10px;letter-spacing:.12em}.s4-langs button.active{color:white}.s4-langs--nav{justify-self:end}
        .s4-eyebrow{font-size:9px;letter-spacing:.34em;text-transform:uppercase;color:#a2a29f}.s4-hero{height:100svh;min-height:720px;position:relative;overflow:hidden;display:grid;grid-template-columns:38% 34% 28%;align-items:center;padding:8vh 7vw 5vh;isolation:isolate}.s4-sky{position:absolute;inset:0;z-index:-2;background:radial-gradient(circle at 68% 34%,#1b1b1b 0,transparent 31%),linear-gradient(#050505,#080808 55%,#030303)}.s4-beam{position:absolute;width:18vw;height:110vh;top:-20vh;filter:blur(16px);opacity:.08;background:linear-gradient(180deg,white,transparent 72%);transform:rotate(16deg)}.s4-beam--1{right:19vw}.s4-beam--2{right:4vw;transform:rotate(27deg);opacity:.04}.s4-mountain{position:absolute;left:-5%;right:-5%;bottom:-4%;height:43%;clip-path:polygon(0 75%,9% 56%,18% 73%,28% 37%,39% 69%,49% 25%,59% 67%,72% 35%,82% 70%,91% 42%,100% 68%,100% 100%,0 100%)}.s4-mountain--back{background:#151515;opacity:.7;filter:blur(1px);transform:translateY(calc(var(--scroll)*18px))}.s4-mountain--front{height:34%;background:#080808;clip-path:polygon(0 65%,13% 35%,23% 68%,33% 30%,47% 72%,58% 43%,67% 66%,78% 30%,90% 61%,100% 39%,100% 100%,0 100%)}.s4-mist{position:absolute;left:15%;right:0;bottom:14%;height:30%;background:radial-gradient(ellipse,rgba(255,255,255,.055),transparent 62%);filter:blur(28px);animation:s4mist 9s ease-in-out infinite alternate}@keyframes s4mist{to{transform:translateX(-6%) scale(1.08);opacity:.65}}
        .s4-hero__copy{max-width:520px;z-index:5}.s4-hero__copy h1{font-family:Georgia,serif;font-weight:400;font-size:clamp(58px,6.4vw,112px);line-height:.88;letter-spacing:-.045em;margin:22px 0 30px;max-width:660px}.s4-hero__copy p{color:#aaa;font-size:15px;line-height:1.8;max-width:430px}.s4-actions{display:flex;align-items:center;gap:12px;margin-top:38px}.s4-actions a{border:1px solid rgba(255,255,255,.55);padding:17px 22px;font-size:9px;letter-spacing:.2em;text-transform:uppercase;transition:.35s}.s4-actions a:hover{background:white;color:black}.s4-actions .ghost{border-color:transparent;color:#989894}.s4-actions .ghost:hover{background:transparent;color:white}.s4-hero__object{height:76vh;display:flex;align-items:flex-end;justify-content:center;perspective:1300px;transform:translateY(4vh)}.s4-hero__object .s4-bottle{transform:rotateX(var(--rx)) rotateY(var(--ry)) translateY(calc(var(--scroll)*-18px));transition:transform .15s ease-out}.s4-index{position:absolute;right:4vw;top:42%;display:flex;flex-direction:column;gap:26px;font-size:9px;color:#555}.s4-index b{color:white}.s4-hero__edition{position:absolute;right:8vw;bottom:20%;border-left:1px solid white;padding-left:18px;display:flex;flex-direction:column;gap:7px}.s4-hero__edition span{font-size:8px;letter-spacing:.25em;color:#777}.s4-hero__edition b{font-family:Georgia,serif;font-size:20px;font-weight:400}.s4-scroll{position:absolute;left:7vw;bottom:4vh;font-size:8px;letter-spacing:.25em;color:#666;display:flex;align-items:center;gap:16px}.s4-scroll i{display:block;width:60px;height:1px;background:linear-gradient(90deg,#777,transparent)}
        .s4-bottle{position:relative;width:270px;height:690px;filter:drop-shadow(0 40px 34px rgba(0,0,0,.75));transform-style:preserve-3d}.s4-bottle__cap{position:absolute;left:50%;top:0;transform:translateX(-50%);width:82px;height:65px;border-radius:21px 21px 8px 8px;background:linear-gradient(90deg,#070707,#282828 43%,#0b0b0b 67%,#030303);box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}.s4-bottle__cap i{display:block;height:6px;border-top:1px solid rgba(255,255,255,.12);margin:8px 5px}.s4-bottle__neck{position:absolute;top:52px;left:50%;transform:translateX(-50%);width:70px;height:150px;background:linear-gradient(90deg,#080808,#242424 48%,#090909 73%,#020202);border-radius:0 0 13px 13px}.s4-bottle__shoulder{position:absolute;top:168px;left:50%;transform:translateX(-50%);width:212px;height:145px;background:radial-gradient(ellipse at 42% 10%,#2b2b2b,#101010 54%,#050505 80%);clip-path:polygon(34% 0,66% 0,100% 82%,100% 100%,0 100%,0 82%)}.s4-bottle__body{position:absolute;top:258px;left:50%;transform:translateX(-50%);width:212px;height:390px;border-radius:21px 21px 34px 34px;background:linear-gradient(98deg,#050505,#1a1a1a 24%,#292929 43%,#0d0d0d 63%,#020202 91%);box-shadow:inset 12px 0 22px rgba(255,255,255,.025),inset -12px 0 22px #000,0 1px 0 rgba(255,255,255,.14);overflow:hidden}.s4-bottle__rim{position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}.s4-bottle__shine{position:absolute;left:25%;top:-10%;width:28px;height:90%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);filter:blur(10px);transform:rotate(4deg)}.s4-bottle__seal{position:absolute;top:72px;left:50%;transform:translateX(-50%)}.s4-bottle__seal svg{width:37px;height:37px}.s4-bottle__word{position:absolute;top:128px;width:100%;text-align:center;font-family:Georgia,serif;font-size:26px;letter-spacing:.28em}.s4-bottle__wine{position:absolute;top:174px;width:100%;text-align:center;font-size:8px;letter-spacing:.28em}.s4-bottle__meta{position:absolute;top:198px;width:100%;text-align:center;font-size:5.8px;letter-spacing:.26em;color:#9a9a96}.s4-bottle__num{position:absolute;top:247px;width:100%;text-align:center;font-size:7px;letter-spacing:.28em;color:#aaa}.s4-bottle__terrain{position:absolute;left:-8%;right:-8%;bottom:-4px;height:108px;display:flex;align-items:flex-end;justify-content:center;gap:-2px;filter:drop-shadow(0 -8px 7px rgba(0,0,0,.55))}.s4-bottle__terrain b{display:block;width:58px;background:linear-gradient(140deg,#202020,#050505 58%);border:1px solid rgba(255,255,255,.07);transform:rotate(45deg);margin:-9px;height:79px}.s4-bottle__terrain b:nth-child(2){height:103px}.s4-bottle__terrain b:nth-child(3){height:71px}.s4-bottle__terrain b:nth-child(4){height:97px}.s4-bottle__terrain b:nth-child(5){height:68px}.s4-bottle__shadow{position:absolute;bottom:0;left:50%;transform:translate(-50%,48%);width:270px;height:44px;background:radial-gradient(ellipse,#000 0,rgba(0,0,0,.74) 36%,transparent 72%);filter:blur(7px)}.s4-bottle--small{width:95px;height:260px;transform:scale(.38);transform-origin:top center;margin-bottom:-155px}.s4-bottle--small+.x{display:none}
        .s4-story{min-height:100vh;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;padding:11vh 7vw;position:relative;overflow:hidden}.s4-story__number{font-family:Georgia,serif;font-size:clamp(110px,18vw,310px);line-height:.75;color:#0a0a0a;-webkit-text-stroke:1px rgba(255,255,255,.12);position:absolute;left:3vw;top:8vh}.s4-story__copy{grid-column:2;max-width:540px;z-index:2}.s4-story h2,.s4-edition h2,.s4-film h2,.s4-origin h2,.s4-collection h2,.s4-allocation h2{font-family:Georgia,serif;font-weight:400;font-size:clamp(45px,5vw,86px);line-height:1.02;letter-spacing:-.035em;margin:20px 0 28px}.s4-story p,.s4-edition p,.s4-origin p,.s4-allocation p,.s4-film p{color:#8f8f8b;line-height:1.85;font-size:14px}.s4-story__well{grid-column:3;justify-self:center;display:flex;flex-direction:column;align-items:center;gap:20px;color:#666;font-size:8px;letter-spacing:.25em}.s4-qvevri{width:220px;height:220px;border-radius:50%;background:radial-gradient(circle at 46% 44%,#050505 0 29%,#1a1a1a 31%,#080808 44%,#333 46%,#111 55%,#020202 78%);box-shadow:0 30px 80px #000,0 0 90px rgba(255,255,255,.04)}
        .s4-edition{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;border-top:1px solid var(--line);padding:9vh 8vw;background:radial-gradient(circle at 28% 50%,#111,transparent 32%)}.s4-edition__visual{height:78vh;display:flex;align-items:center;justify-content:center;position:relative}.s4-edition__visual .s4-bottle{transform:scale(.92)}.s4-halo{position:absolute;width:460px;height:460px;border-radius:50%;border:1px solid rgba(255,255,255,.13);box-shadow:0 0 100px rgba(255,255,255,.025),inset 0 0 90px rgba(255,255,255,.015)}.s4-edition__copy{max-width:600px}.s4-facts{display:grid;grid-template-columns:1fr 1fr;margin-top:48px;border-top:1px solid var(--line);border-left:1px solid var(--line)}.s4-facts div{padding:23px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;flex-direction:column;gap:9px}.s4-facts strong{font-family:Georgia,serif;font-size:24px;font-weight:400}.s4-facts span{font-size:7px;letter-spacing:.23em;color:#666}
        .s4-film{padding:12vh 6vw;border-top:1px solid var(--line);min-height:100vh}.s4-film__head{text-align:center;max-width:850px;margin:0 auto 9vh}.s4-film__acts{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.s4-film article{padding:0 24px 38px;border-right:1px solid var(--line)}.s4-film article:last-child{border-right:0}.s4-act__visual{height:43vh;min-height:330px;position:relative;overflow:hidden;margin-bottom:28px;background:#080808}.s4-act__visual>span{position:absolute;z-index:4;top:18px;left:18px;font-family:Georgia,serif;font-size:18px}.scene{position:absolute;inset:0;display:block;transition:transform .7s}.s4-film article:hover .scene{transform:scale(1.04)}.scene-1{background:linear-gradient(155deg,transparent 34%,#171717 35% 46%,transparent 47%),linear-gradient(30deg,#030303,#191919)}.scene-2{background:radial-gradient(ellipse at 50% 70%,#000 0 19%,#181818 20% 30%,#050505 31% 58%,transparent 59%),linear-gradient(#101010,#030303)}.scene-3{background:linear-gradient(90deg,transparent,rgba(255,255,255,.09) 50%,transparent),radial-gradient(circle at 65% 25%,#2b2b2b,#050505 45%)}.scene-4{background:linear-gradient(135deg,#020202,#1e1e1e 45%,#050505 46% 100%)}.s4-film h3{font-size:10px;letter-spacing:.3em;font-weight:500}.s4-film p{font-size:12px}
        .s4-origin{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:8vw;padding:10vh 8vw;border-top:1px solid var(--line);background:linear-gradient(115deg,#050505,#0b0b0b 54%,#050505)}.s4-origin__copy{max-width:570px}.s4-certificate{border:1px solid rgba(255,255,255,.25);padding:34px;max-width:520px;position:relative;box-shadow:0 35px 110px #000;background:linear-gradient(145deg,#0d0d0d,#040404)}.s4-certificate__top{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:18px;padding-bottom:28px;border-bottom:1px solid var(--line)}.s4-certificate__top span{font-size:8px;letter-spacing:.23em;color:#888}.s4-certificate__top b{font-family:Georgia,serif;font-size:22px;font-weight:400}.s4-certrow{display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.07);padding:15px 0;font-size:10px}.s4-certrow span{color:#696966}.s4-certrow strong{font-weight:400}.s4-qr{width:82px;height:82px;margin-top:30px;margin-left:auto;border:1px solid rgba(255,255,255,.25);position:relative;background:repeating-conic-gradient(#ddd 0 4deg,#090909 4deg 9deg)}.s4-qr i{position:absolute;width:18px;height:18px;border:5px solid #050505;background:white}.s4-qr i:nth-child(1){left:5px;top:5px}.s4-qr i:nth-child(2){right:5px;top:5px}.s4-qr i:nth-child(3){left:5px;bottom:5px}.s4-qr b{position:absolute;right:0;bottom:-20px;font-size:7px;letter-spacing:.2em;font-weight:400}
        .s4-collection{padding:11vh 6vw 14vh;border-top:1px solid var(--line)}.s4-collection__head{text-align:center;max-width:760px;margin:0 auto 8vh}.s4-products{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line)}.s4-products article{min-height:600px;position:relative;padding:44px;display:flex;flex-direction:column;align-items:center;text-align:center;border-right:1px solid var(--line);overflow:hidden}.s4-products article:last-child{border-right:0}.s4-product__bottle{height:320px;display:flex;justify-content:center;align-items:flex-start;filter:grayscale(1)}.s4-products article>span{font-size:8px;letter-spacing:.26em;color:#666}.s4-products h3{font-family:Georgia,serif;font-size:30px;font-weight:400;letter-spacing:.08em;margin:14px 0 10px}.s4-products p{font-size:10px;color:#777;letter-spacing:.08em}.s4-products small{margin-top:auto;font-size:8px;letter-spacing:.2em;color:#aaa}.s4-product__line{position:absolute;left:0;right:0;bottom:0;height:1px;background:white;transform:scaleX(.15);transition:.5s}.s4-products article:hover .s4-product__line{transform:scaleX(1)}
        .s4-allocation{min-height:78vh;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:8vw;align-items:center;padding:10vh 8vw}.s4-allocation>div{max-width:560px}.s4-allocation form{display:flex;flex-direction:column;border:1px solid var(--line);padding:42px;background:#080808}.s4-allocation input{height:58px;border:0;border-bottom:1px solid var(--line);background:transparent;color:white;outline:none;padding:0 4px;font-size:12px}.s4-allocation button{margin-top:30px;height:58px;border:1px solid white;background:white;color:black;text-transform:uppercase;letter-spacing:.17em;font-size:9px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;cursor:pointer}.s4-sent{text-align:center;padding:40px 0}.s4-sent .s4-mark{justify-content:center}.s4-sent h3{font-family:Georgia,serif;font-size:38px;font-weight:400;margin:24px 0 8px}.s4 footer{height:125px;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;padding:0 5vw;color:#666;font-size:8px;letter-spacing:.18em}.s4 footer>span{text-align:center}.s4 footer small{text-align:right;font-size:7px;letter-spacing:.08em}
        .s4-gate{position:fixed;z-index:999;inset:0;background:#030303;display:grid;place-items:center;overflow:hidden}.s4-gate__film{position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#181818,transparent 28%),linear-gradient(160deg,transparent 38%,rgba(255,255,255,.035),transparent 62%);animation:s4gate 6s ease-in-out infinite alternate}@keyframes s4gate{to{transform:scale(1.08) translateX(2%);filter:brightness(1.3)}}.s4-gate__card{width:min(720px,88vw);min-height:560px;border:1px solid rgba(255,255,255,.22);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:50px;position:relative;background:rgba(0,0,0,.46);backdrop-filter:blur(8px)}.s4-gate__card .s4-mark{margin-bottom:42px}.s4-gate__card h1{font-family:Georgia,serif;font-weight:400;font-size:clamp(48px,6vw,82px);margin:18px 0 10px}.s4-gate__card p{color:#8d8d89;max-width:420px;line-height:1.7}.s4-gate__card>button{margin:30px 0 26px;border:1px solid white;background:transparent;color:white;padding:17px 24px;text-transform:uppercase;letter-spacing:.18em;font-size:9px;cursor:pointer;transition:.3s}.s4-gate__card>button:hover{background:white;color:black}
        @media(max-width:1000px){.s4-nav{grid-template-columns:1fr auto}.s4-nav nav{display:none}.s4-hero{grid-template-columns:1fr;height:auto;min-height:100svh;padding:135px 7vw 55px}.s4-hero__copy{max-width:640px}.s4-hero__copy h1{font-size:clamp(58px,12vw,90px);max-width:600px}.s4-hero__object{height:62vh;min-height:620px;margin-top:10px;transform:none}.s4-hero__edition{right:6vw;bottom:13%}.s4-index{display:none}.s4-story{grid-template-columns:1fr;padding:12vh 8vw;gap:60px}.s4-story__copy,.s4-story__well{grid-column:1}.s4-story__well{justify-self:start}.s4-story__number{top:5vh}.s4-edition{grid-template-columns:1fr;padding:9vh 7vw}.s4-edition__visual{height:70vh}.s4-film__acts{grid-template-columns:1fr 1fr}.s4-film article:nth-child(2){border-right:0}.s4-film article:nth-child(-n+2){border-bottom:1px solid var(--line)}.s4-origin{grid-template-columns:1fr;padding:10vh 7vw}.s4-certificate{width:100%;max-width:none}.s4-products{grid-template-columns:1fr}.s4-products article{border-right:0;border-bottom:1px solid var(--line)}.s4-products article:last-child{border-bottom:0}.s4-allocation{grid-template-columns:1fr}.s4 footer{height:auto;padding:34px 6vw;grid-template-columns:1fr;gap:20px}.s4 footer>span,.s4 footer small{text-align:left}}
        @media(max-width:620px){.s4-nav{height:72px;padding:0 5vw}.s4-mark{font-size:14px;letter-spacing:.27em;gap:10px}.s4-mark svg{width:35px;height:35px}.s4-langs--nav{gap:8px}.s4-hero{padding:120px 6vw 40px}.s4-hero__copy h1{font-size:17vw;line-height:.9}.s4-hero__copy p{font-size:13px}.s4-actions{flex-direction:column;align-items:stretch}.s4-actions a{text-align:center}.s4-hero__object{height:530px;min-height:0;transform:scale(.76);transform-origin:center top;margin-bottom:-110px}.s4-hero__edition{bottom:7%;right:6vw}.s4-scroll{display:none}.s4-story h2,.s4-edition h2,.s4-film h2,.s4-origin h2,.s4-collection h2,.s4-allocation h2{font-size:12vw}.s4-story{min-height:auto;padding:110px 7vw}.s4-qvevri{width:170px;height:170px}.s4-edition{padding:90px 6vw}.s4-edition__visual{height:540px;overflow:hidden}.s4-edition__visual .s4-bottle{transform:scale(.72);transform-origin:center center}.s4-halo{width:330px;height:330px}.s4-facts{grid-template-columns:1fr 1fr}.s4-film{padding:90px 5vw}.s4-film__acts{grid-template-columns:1fr}.s4-film article{border-right:0;border-bottom:1px solid var(--line)}.s4-film article:last-child{border-bottom:0}.s4-act__visual{height:48vh}.s4-origin{padding:90px 6vw}.s4-certificate{padding:22px}.s4-certificate__top{grid-template-columns:auto 1fr}.s4-certificate__top b{grid-column:1/3}.s4-collection{padding:90px 5vw}.s4-products article{min-height:550px;padding:36px 20px}.s4-allocation{padding:90px 6vw}.s4-allocation form{padding:26px}.s4-gate__card{min-height:520px;padding:32px 20px}.s4-gate__card h1{font-size:14vw}}
      `}</style>
    </main>
  );
}
