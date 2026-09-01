"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ru" | "ka";

const copy = {
  en: {
    nav: ["Story", "Edition", "Origin", "Collection"],
    heroKicker: "KAKHETI · GEORGIA · RELEASE 001",
    heroTitle: ["THE SOUL", "OF GEORGIA."],
    heroBody: "Eight thousand years of wine culture, distilled into a numbered object of earth, grape and time.",
    heroCta: "Discover Edition 001",
    heroSecond: "Request allocation",
    scroll: "SCROLL TO ENTER",
    bottleMeta: "SAPERAVI · DRY RED · 2026",
    storyKicker: "THE HOUSE OF SULI",
    storyTitle: "Not another wine label. A Georgian object with a memory.",
    storyBody: "SULI means “soul”. We build each release around one place, one grape and one finite edition. Ancient Georgian winemaking is treated with modern restraint — no folklore costume, no excess, no repetition.",
    editionKicker: "EDITION 001",
    editionTitle: "777 bottles. Then never again.",
    editionBody: "The first SULI release is a small-batch Saperavi from Kakheti. Each matte-black bottle is individually numbered and paired with a digital certificate of origin.",
    facts: [["777", "TOTAL BOTTLES"], ["041", "BOTTLE SHOWN"], ["KAKHETI", "ORIGIN"], ["SAPERAVI", "GRAPE"]],
    actsKicker: "A FILM IN FOUR ACTS",
    actsTitle: "From earth to object.",
    acts: [
      ["01", "Stone", "Dry wind, mineral ground and the long horizon of Kakheti."],
      ["02", "Clay", "Qvevri rest beneath the cellar floor, where fermentation happens in darkness."],
      ["03", "Time", "The release follows the wine — never a marketing calendar."],
      ["04", "Number", "A matte bottle, a metal seal and one number that belongs to one owner."]
    ],
    originKicker: "ORIGIN",
    originTitle: "A wine should tell you exactly where it came from.",
    originBody: "Tap the discreet NFC mark or scan the bottle code to reveal the vineyard, harvest, qvevri lot, bottling date and authenticity record of your specific bottle.",
    cert: "CERTIFICATE OF ORIGIN",
    certRows: [["Bottle", "041 / 777"], ["Release", "Edition 001"], ["Region", "Kakheti, Georgia"], ["Grape", "Saperavi"], ["Format", "750 ml"]],
    collectionKicker: "THE COLLECTION",
    collectionTitle: "A house of few releases.",
    products: [
      ["001", "Saperavi", "Dry red · Kakheti", "777 bottles", "AVAILABLE BY ALLOCATION"],
      ["002", "Kisi Qvevri", "Dry amber · Kakheti", "Next release", "COMING NEXT"],
      ["003", "Chacha Reserve", "Grape spirit · Oak rested", "333 bottles", "PRIVATE RELEASE"]
    ],
    allocationKicker: "PRIVATE ALLOCATION",
    allocationTitle: "Request a bottle from Edition 001.",
    allocationBody: "For private clients, selected restaurants, hotels and gifting partners. No payment is taken here — availability is confirmed personally.",
    name: "Name",
    email: "Email",
    market: "City / market",
    submit: "Request allocation",
    submitted: "Request received",
    submittedBody: "Thank you. This prototype records no payment; sales workflow will be connected next.",
    footer: "THE SPIRIT OF GEORGIA",
    legal: "Please enjoy responsibly. For adults of legal drinking age only.",
    gateKicker: "SULI · GEORGIA",
    gateTitle: "Enter the house of SULI",
    gateBody: "Please confirm that you are of legal drinking age in your country.",
    gateEnter: "I am of legal drinking age",
    gateExit: "Exit"
  },
  ru: {
    nav: ["История", "Edition", "Происхождение", "Коллекция"],
    heroKicker: "КАХЕТИ · ГРУЗИЯ · РЕЛИЗ 001",
    heroTitle: ["ДУША", "ГРУЗИИ."],
    heroBody: "Восемь тысяч лет винной культуры, собранные в одном пронумерованном объекте из земли, винограда и времени.",
    heroCta: "Открыть Edition 001",
    heroSecond: "Запросить резерв",
    scroll: "ЛИСТАЙТЕ ДАЛЬШЕ",
    bottleMeta: "САПЕРАВИ · СУХОЕ КРАСНОЕ · 2026",
    storyKicker: "ДОМ SULI",
    storyTitle: "Не ещё одна винная этикетка. Грузинский объект с памятью.",
    storyBody: "SULI означает «душа». Каждый релиз строится вокруг одного места, одного сорта и конечного тиража. Древнее грузинское виноделие переводится на современный язык — без туристического фольклора, лишнего декора и повторов.",
    editionKicker: "EDITION 001",
    editionTitle: "777 бутылок. И больше никогда.",
    editionBody: "Первый релиз SULI — Саперави малой партии из Кахети. Каждая матово-чёрная бутылка получает индивидуальный номер и цифровой сертификат происхождения.",
    facts: [["777", "ВСЕГО БУТЫЛОК"], ["041", "НОМЕР НА ВИЗУАЛЕ"], ["КАХЕТИ", "ПРОИСХОЖДЕНИЕ"], ["САПЕРАВИ", "СОРТ"]],
    actsKicker: "ИСТОРИЯ В ЧЕТЫРЁХ АКТАХ",
    actsTitle: "От земли — к объекту.",
    acts: [
      ["01", "Камень", "Сухой ветер, минеральная земля и длинный горизонт Кахети."],
      ["02", "Глина", "Квеври находятся под полом марани, где ферментация проходит в темноте."],
      ["03", "Время", "Дата релиза следует за вином, а не за маркетинговым календарём."],
      ["04", "Номер", "Матовая бутылка, металлический знак и один номер для одного владельца."]
    ],
    originKicker: "ПРОИСХОЖДЕНИЕ",
    originTitle: "Вино должно точно рассказывать, откуда оно пришло.",
    originBody: "Коснитесь NFC-метки или отсканируйте код: виноградник, урожай, партия квеври, дата розлива и подтверждение подлинности именно вашей бутылки.",
    cert: "СЕРТИФИКАТ ПРОИСХОЖДЕНИЯ",
    certRows: [["Бутылка", "041 / 777"], ["Релиз", "Edition 001"], ["Регион", "Кахети, Грузия"], ["Сорт", "Саперави"], ["Объём", "750 ml"]],
    collectionKicker: "КОЛЛЕКЦИЯ",
    collectionTitle: "Дом небольшого числа релизов.",
    products: [
      ["001", "Saperavi", "Сухое красное · Кахети", "777 бутылок", "ПО РЕЗЕРВУ"],
      ["002", "Kisi Qvevri", "Сухое янтарное · Кахети", "Следующий релиз", "СКОРО"],
      ["003", "Chacha Reserve", "Виноградный дистиллят · выдержка", "333 бутылки", "ЗАКРЫТЫЙ РЕЛИЗ"]
    ],
    allocationKicker: "ЧАСТНЫЙ РЕЗЕРВ",
    allocationTitle: "Запросите бутылку Edition 001.",
    allocationBody: "Для частных клиентов, выбранных ресторанов, отелей и корпоративных подарков. Оплата здесь не списывается — наличие подтверждается лично.",
    name: "Имя",
    email: "Email",
    market: "Город / рынок",
    submit: "Запросить резерв",
    submitted: "Запрос получен",
    submittedBody: "Спасибо. В прототипе оплата не списывается; следующим шагом подключим реальный sales workflow.",
    footer: "ДУША ГРУЗИИ",
    legal: "Употребляйте ответственно. Только для совершеннолетних по законодательству вашей страны.",
    gateKicker: "SULI · ГРУЗИЯ",
    gateTitle: "Войти в дом SULI",
    gateBody: "Подтвердите, что вы достигли разрешённого возраста для употребления алкоголя в вашей стране.",
    gateEnter: "Я достиг(ла) разрешённого возраста",
    gateExit: "Выйти"
  },
  ka: {
    nav: ["ისტორია", "Edition", "წარმოშობა", "კოლექცია"],
    heroKicker: "კახეთი · საქართველო · გამოშვება 001",
    heroTitle: ["საქართველოს", "სული."],
    heroBody: "ღვინის რვაათასწლიანი კულტურა — მიწის, ყურძნისა და დროის ერთ დანომრილ ობიექტში.",
    heroCta: "აღმოაჩინე Edition 001",
    heroSecond: "რეზერვის მოთხოვნა",
    scroll: "ჩამოსქროლეთ",
    bottleMeta: "საფერავი · მშრალი წითელი · 2026",
    storyKicker: "SULI-ს სახლი",
    storyTitle: "არა კიდევ ერთი ღვინის ეტიკეტი. ქართული ობიექტი, რომელსაც მეხსიერება აქვს.",
    storyBody: "SULI ნიშნავს სულს. ყოველი გამოშვება იქმნება ერთი ადგილის, ერთი ჯიშისა და შეზღუდული რაოდენობის გარშემო. უძველესი ქართული მეღვინეობა გადმოგვაქვს თანამედროვე, თავშეკავებულ ენაზე.",
    editionKicker: "EDITION 001",
    editionTitle: "777 ბოთლი. და აღარასოდეს იგივე.",
    editionBody: "SULI-ს პირველი გამოშვება — მცირე პარტიის საფერავი კახეთიდან. თითოეულ მქრქალ შავ ბოთლს აქვს ინდივიდუალური ნომერი და წარმოშობის ციფრული სერტიფიკატი.",
    facts: [["777", "სულ ბოთლი"], ["041", "ნაჩვენები ბოთლი"], ["კახეთი", "წარმოშობა"], ["საფერავი", "ჯიში"]],
    actsKicker: "ამბავი ოთხ მოქმედებად",
    actsTitle: "მიწიდან — ობიექტამდე.",
    acts: [
      ["01", "ქვა", "მშრალი ქარი, მინერალური მიწა და კახეთის გრძელი ჰორიზონტი."],
      ["02", "თიხა", "ქვევრი მარნის იატაკქვეშაა, სადაც დუღილი სიბნელეში მიმდინარეობს."],
      ["03", "დრო", "გამოშვების დრო ღვინოს მიჰყვება და არა მარკეტინგულ კალენდარს."],
      ["04", "ნომერი", "მქრქალი ბოთლი, მეტალის ნიშანი და ერთი ნომერი ერთი მფლობელისთვის."]
    ],
    originKicker: "წარმოშობა",
    originTitle: "ღვინო ზუსტად უნდა გეუბნებოდეს, საიდან მოვიდა.",
    originBody: "შეეხეთ NFC ნიშნულს ან დაასკანირეთ კოდი და ნახეთ ვენახი, მოსავალი, ქვევრის პარტია, ჩამოსხმის თარიღი და კონკრეტული ბოთლის ავთენტურობა.",
    cert: "წარმოშობის სერტიფიკატი",
    certRows: [["ბოთლი", "041 / 777"], ["გამოშვება", "Edition 001"], ["რეგიონი", "კახეთი, საქართველო"], ["ჯიში", "საფერავი"], ["მოცულობა", "750 ml"]],
    collectionKicker: "კოლექცია",
    collectionTitle: "რამდენიმე გააზრებული გამოშვების სახლი.",
    products: [
      ["001", "Saperavi", "მშრალი წითელი · კახეთი", "777 ბოთლი", "რეზერვით"],
      ["002", "Kisi Qvevri", "მშრალი ქარვისფერი · კახეთი", "შემდეგი გამოშვება", "მალე"],
      ["003", "Chacha Reserve", "ყურძნის დისტილატი · მუხა", "333 ბოთლი", "დახურული გამოშვება"]
    ],
    allocationKicker: "პირადი რეზერვი",
    allocationTitle: "მოითხოვეთ Edition 001-ის ბოთლი.",
    allocationBody: "კერძო კლიენტებისთვის, შერჩეული რესტორნებისთვის, სასტუმროებისა და საჩუქრების პარტნიორებისთვის. აქ თანხა არ ჩამოიჭრება — ხელმისაწვდომობა პირადად დადასტურდება.",
    name: "სახელი",
    email: "Email",
    market: "ქალაქი / ბაზარი",
    submit: "რეზერვის მოთხოვნა",
    submitted: "მოთხოვნა მიღებულია",
    submittedBody: "გმადლობთ. პროტოტიპში გადახდა არ ხდება; შემდეგ ეტაპზე რეალურ გაყიდვების პროცესს დავაკავშირებთ.",
    footer: "საქართველოს სული",
    legal: "მიირთვით პასუხისმგებლობით. მხოლოდ კანონით განსაზღვრული სრულწლოვანი მომხმარებლებისთვის.",
    gateKicker: "SULI · საქართველო",
    gateTitle: "შედით SULI-ს სამყაროში",
    gateBody: "დაადასტურეთ, რომ თქვენს ქვეყანაში ალკოჰოლის მოხმარებისთვის კანონით განსაზღვრულ ასაკს მიაღწიეთ.",
    gateEnter: "მე ვარ კანონით დაშვებული ასაკის",
    gateExit: "გასვლა"
  }
} as const;

const sectionIds = ["story", "edition", "origin", "collection"] as const;

function Bottle({ small = false }: { small?: boolean }) {
  return (
    <div className={`s3-bottle ${small ? "s3-bottle--small" : ""}`} aria-label="SULI matte black bottle concept">
      <div className="s3-bottle__cork" />
      <div className="s3-bottle__neck"><span>SULI</span></div>
      <div className="s3-bottle__shoulder" />
      <div className="s3-bottle__body">
        <i className="s3-bottle__shine" />
        <i className="s3-bottle__grain" />
        <div className="s3-bottle__seal">S</div>
        <div className="s3-bottle__word">SULI</div>
        <div className="s3-bottle__geo">საქართველო</div>
        <div className="s3-bottle__edition">EDITION 001</div>
        <div className="s3-bottle__num">041 / 777</div>
      </div>
      <div className="s3-bottle__shadow" />
    </div>
  );
}

export default function SuliV3() {
  const [lang, setLang] = useState<Lang>("en");
  const [ageOpen, setAgeOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    try {
      const ok = window.localStorage.getItem("suli-age-confirmed");
      if (!ok) setAgeOpen(true);
    } catch {
      setAgeOpen(true);
    }
  }, []);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--s3-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--s3-y", `${e.clientY}px`);
      const heroBottle = document.querySelector<HTMLElement>(".s3-hero__bottle");
      if (!heroBottle) return;
      const rx = ((e.clientY / Math.max(window.innerHeight, 1)) - 0.5) * -5;
      const ry = ((e.clientX / Math.max(window.innerWidth, 1)) - 0.5) * 10;
      heroBottle.style.transform = `translate3d(0,0,0) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const langLabel = useMemo(() => ({ en: "EN", ru: "RU", ka: "KA" }[lang]), [lang]);

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function confirmAge() {
    try { window.localStorage.setItem("suli-age-confirmed", "1"); } catch {}
    setAgeOpen(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="s3">
      <div className="s3-progress"><span style={{ width: `${Math.min(progress, 100)}%` }} /></div>
      <div className="s3-cursorlight" />
      <div className="s3-noise" />

      <header className="s3-nav">
        <button className="s3-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="SULI home">
          <b>SULI</b><span>სული</span>
        </button>
        <nav>
          {t.nav.map((item, i) => <button key={item} onClick={() => go(sectionIds[i])}>{item}</button>)}
        </nav>
        <div className="s3-lang" aria-label={`Language ${langLabel}`}>
          {(["en", "ru", "ka"] as Lang[]).map((l) => <button key={l} className={lang === l ? "is-active" : ""} onClick={() => setLang(l)}>{l === "ka" ? "ქარ" : l.toUpperCase()}</button>)}
        </div>
      </header>

      <section className="s3-hero" id="top">
        <div className="s3-hero__terrain s3-hero__terrain--one" />
        <div className="s3-hero__terrain s3-hero__terrain--two" />
        <div className="s3-hero__sun" />
        <div className="s3-hero__copy">
          <span className="s3-kicker">{t.heroKicker}</span>
          <h1><span>{t.heroTitle[0]}</span><span>{t.heroTitle[1]}</span></h1>
          <p>{t.heroBody}</p>
          <div className="s3-actions">
            <button className="s3-btn s3-btn--solid" onClick={() => go("edition")}>{t.heroCta}</button>
            <button className="s3-btn" onClick={() => go("allocation")}>{t.heroSecond}</button>
          </div>
        </div>
        <div className="s3-hero__bottle"><Bottle /></div>
        <div className="s3-hero__side"><span>41.6168° N</span><i /><span>45.9221° E</span></div>
        <div className="s3-scroll"><span>{t.scroll}</span><i /></div>
      </section>

      <section className="s3-story" id="story">
        <div className="s3-sectionhead">
          <span className="s3-kicker">{t.storyKicker}</span>
          <h2>{t.storyTitle}</h2>
        </div>
        <div className="s3-story__grid">
          <p>{t.storyBody}</p>
          <div className="s3-story__stamp"><b>S</b><span>GEORGIA<br/>MMXXVI</span></div>
          <blockquote>“SULI” <small>სული · soul</small></blockquote>
        </div>
      </section>

      <section className="s3-edition" id="edition">
        <div className="s3-edition__visual">
          <div className="s3-halo" />
          <Bottle small />
          <div className="s3-big-number">001<small>OF 777</small></div>
        </div>
        <div className="s3-edition__copy">
          <span className="s3-kicker">{t.editionKicker}</span>
          <h2>{t.editionTitle}</h2>
          <p>{t.editionBody}</p>
          <div className="s3-facts">
            {t.facts.map(([v, l]) => <div key={l}><strong>{v}</strong><span>{l}</span></div>)}
          </div>
        </div>
      </section>

      <section className="s3-acts">
        <div className="s3-sectionhead s3-sectionhead--center">
          <span className="s3-kicker">{t.actsKicker}</span>
          <h2>{t.actsTitle}</h2>
        </div>
        <div className="s3-acts__grid">
          {t.acts.map(([n, title, body], i) => (
            <article key={n} className={`s3-act s3-act--${i + 1}`}>
              <span>{n}</span><h3>{title}</h3><p>{body}</p><i />
            </article>
          ))}
        </div>
      </section>

      <section className="s3-origin" id="origin">
        <div className="s3-origin__copy">
          <span className="s3-kicker">{t.originKicker}</span>
          <h2>{t.originTitle}</h2>
          <p>{t.originBody}</p>
          <div className="s3-nfc"><span>NFC</span><i>↗</i></div>
        </div>
        <div className="s3-cert">
          <div className="s3-cert__top"><span>{t.cert}</span><b>S</b></div>
          {t.certRows.map(([a,b]) => <div className="s3-cert__row" key={a}><span>{a}</span><strong>{b}</strong></div>)}
          <div className="s3-cert__code" aria-hidden="true">{Array.from({length: 36}, (_,i)=><i key={i} />)}</div>
          <small>SULI / ORIGIN RECORD / 001-041</small>
        </div>
      </section>

      <section className="s3-collection" id="collection">
        <div className="s3-sectionhead">
          <span className="s3-kicker">{t.collectionKicker}</span>
          <h2>{t.collectionTitle}</h2>
        </div>
        <div className="s3-products">
          {t.products.map(([num, name, kind, qty, status], i) => (
            <article className={`s3-product s3-product--${i + 1}`} key={num}>
              <div className="s3-product__num">{num}</div>
              <div className="s3-product__mini"><div className="s3-mini-bottle"><span>S</span></div></div>
              <div className="s3-product__text"><span>{status}</span><h3>{name}</h3><p>{kind}</p><strong>{qty}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="s3-allocation" id="allocation">
        <div className="s3-allocation__intro">
          <span className="s3-kicker">{t.allocationKicker}</span>
          <h2>{t.allocationTitle}</h2>
          <p>{t.allocationBody}</p>
        </div>
        {submitted ? (
          <div className="s3-thanks"><span>✓</span><h3>{t.submitted}</h3><p>{t.submittedBody}</p></div>
        ) : (
          <form className="s3-form" onSubmit={onSubmit}>
            <label><span>{t.name}</span><input required name="name" autoComplete="name" /></label>
            <label><span>{t.email}</span><input required type="email" name="email" autoComplete="email" /></label>
            <label><span>{t.market}</span><input required name="market" /></label>
            <button className="s3-btn s3-btn--solid" type="submit">{t.submit}<i>↗</i></button>
          </form>
        )}
      </section>

      <footer className="s3-footer">
        <div><b>SULI</b><span>სული</span></div>
        <strong>{t.footer}</strong>
        <small>{t.legal}</small>
      </footer>

      {ageOpen && (
        <div className="s3-gate" role="dialog" aria-modal="true">
          <div className="s3-gate__glow" />
          <div className="s3-gate__card">
            <div className="s3-gate__mark">S</div>
            <span className="s3-kicker">{t.gateKicker}</span>
            <h2>{t.gateTitle}</h2>
            <p>{t.gateBody}</p>
            <button className="s3-btn s3-btn--solid" onClick={confirmAge}>{t.gateEnter}</button>
            <button className="s3-gate__exit" onClick={() => { try { window.location.href = "https://www.google.com"; } catch {} }}>{t.gateExit}</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root{--s3-bg:#090908;--s3-paper:#d7d0c3;--s3-muted:#8f8a81;--s3-bronze:#b4946a;--s3-line:rgba(220,210,193,.13);--s3-x:75vw;--s3-y:30vh;color-scheme:dark}
        *{box-sizing:border-box}html{scroll-behavior:smooth;background:var(--s3-bg)}body{margin:0;background:var(--s3-bg);color:var(--s3-paper);overflow-x:hidden}.s3 button,.s3 input{font:inherit}.s3 button{color:inherit}.s3{position:relative;min-height:100vh;background:radial-gradient(900px 500px at 78% 3%,rgba(121,90,53,.1),transparent 65%),#090908;color:#d7d0c3;font-family:Manrope,Arial,sans-serif;letter-spacing:-.01em}.s3 h1,.s3 h2,.s3 h3,.s3 blockquote{font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;margin:0}.s3 p{color:#969188;line-height:1.75}.s3 button{background:none;border:0;cursor:pointer}.s3-progress{position:fixed;z-index:1000;left:0;right:0;top:0;height:2px;background:rgba(255,255,255,.025)}.s3-progress span{display:block;height:100%;background:linear-gradient(90deg,#6d4e31,#d5b486);box-shadow:0 0 18px rgba(213,180,134,.34)}.s3-cursorlight{position:fixed;z-index:40;inset:0;pointer-events:none;background:radial-gradient(500px circle at var(--s3-x) var(--s3-y),rgba(187,144,86,.055),transparent 60%);mix-blend-mode:screen}.s3-noise{position:fixed;z-index:39;inset:0;opacity:.045;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");mix-blend-mode:soft-light}.s3-nav{position:fixed;z-index:100;top:0;left:0;right:0;height:84px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 44px;border-bottom:1px solid rgba(255,255,255,.05);background:linear-gradient(180deg,rgba(7,7,6,.82),rgba(7,7,6,.28),transparent);backdrop-filter:blur(10px)}.s3-mark{justify-self:start;display:flex;align-items:baseline;gap:9px;padding:8px 0}.s3-mark b{font-family:"Cormorant Garamond",serif;font-size:27px;letter-spacing:.18em;font-weight:500}.s3-mark span{font-size:10px;color:#9d8c75}.s3-nav nav{display:flex;gap:30px}.s3-nav nav button,.s3-lang button{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#8c8880;transition:.25s}.s3-nav nav button:hover,.s3-lang button:hover,.s3-lang .is-active{color:#e2dbcf}.s3-lang{justify-self:end;display:flex;gap:5px;border:1px solid rgba(255,255,255,.08);padding:4px}.s3-lang button{padding:7px 8px;font-size:9px}.s3-lang .is-active{background:rgba(255,255,255,.08)}.s3-hero{position:relative;height:100svh;min-height:760px;overflow:hidden;display:grid;grid-template-columns:1.08fr .92fr;align-items:center;padding:120px 7vw 80px;border-bottom:1px solid var(--s3-line)}.s3-hero:before{content:"SULI";position:absolute;left:2vw;bottom:-7vw;font-family:"Cormorant Garamond",serif;font-size:27vw;line-height:.7;letter-spacing:-.055em;color:rgba(255,255,255,.018);white-space:nowrap}.s3-hero__copy{position:relative;z-index:6;max-width:760px}.s3-kicker{display:block;font-size:10px;letter-spacing:.28em;color:#a88c68;text-transform:uppercase;margin-bottom:24px}.s3-hero h1{font-size:clamp(74px,9.5vw,166px);line-height:.72;letter-spacing:-.055em}.s3-hero h1 span{display:block}.s3-hero h1 span:last-child{margin-left:8vw;font-style:italic;color:#c9c0b4}.s3-hero__copy>p{max-width:520px;margin:42px 0 34px;font-size:15px}.s3-actions{display:flex;gap:10px;flex-wrap:wrap}.s3-btn{border:1px solid rgba(255,255,255,.16)!important;min-height:50px;padding:0 22px!important;font-size:10px!important;letter-spacing:.16em;text-transform:uppercase;transition:.3s;background:rgba(255,255,255,.01)!important}.s3-btn:hover{border-color:rgba(213,180,134,.6)!important;transform:translateY(-2px)}.s3-btn--solid{background:#d2c4b0!important;color:#12110f!important;border-color:#d2c4b0!important}.s3-hero__bottle{position:relative;z-index:5;justify-self:center;perspective:1200px;transition:transform .18s ease-out;will-change:transform}.s3-hero__sun{position:absolute;z-index:1;right:8vw;top:17vh;width:38vw;height:38vw;border-radius:50%;background:radial-gradient(circle at 47% 45%,rgba(174,126,68,.19),rgba(85,54,29,.065) 45%,transparent 71%);filter:blur(.2px)}.s3-hero__terrain{position:absolute;z-index:2;left:-5%;right:-5%;bottom:-1px;height:24vh;background:#0c0b09;clip-path:polygon(0 66%,9% 48%,16% 55%,25% 31%,35% 48%,44% 28%,54% 51%,65% 23%,77% 50%,86% 33%,100% 61%,100% 100%,0 100%)}.s3-hero__terrain--one{opacity:.55;bottom:6vh;filter:blur(2px);background:#19140f}.s3-hero__terrain--two{z-index:3;height:18vh}.s3-hero__side{position:absolute;right:24px;top:50%;z-index:6;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:12px;color:#68645f;font-size:8px;letter-spacing:.18em;writing-mode:vertical-rl}.s3-hero__side i{height:70px;width:1px;background:#4f4b45}.s3-scroll{position:absolute;z-index:6;left:7vw;bottom:32px;display:flex;align-items:center;gap:14px;color:#6f6a63;font-size:8px;letter-spacing:.2em}.s3-scroll i{width:60px;height:1px;background:#5d554a;position:relative}.s3-scroll i:after{content:"";position:absolute;right:0;top:-2px;border-left:5px solid #5d554a;border-top:2px solid transparent;border-bottom:2px solid transparent}.s3-bottle{position:relative;width:260px;height:650px;filter:drop-shadow(0 38px 38px rgba(0,0,0,.65));transform-style:preserve-3d}.s3-bottle--small{transform:scale(.82);transform-origin:center bottom}.s3-bottle__cork{position:absolute;z-index:4;top:0;left:50%;transform:translateX(-50%);width:66px;height:42px;border-radius:5px 5px 2px 2px;background:linear-gradient(90deg,#1b1815,#30271e 48%,#171511);border:1px solid #3a3026}.s3-bottle__neck{position:absolute;z-index:3;top:34px;left:50%;transform:translateX(-50%);width:72px;height:150px;background:linear-gradient(90deg,#090908,#25221e 42%,#11100f 64%,#050505);border-radius:4px 4px 15px 15px;box-shadow:inset -8px 0 18px #000}.s3-bottle__neck span{position:absolute;top:50px;left:50%;transform:translateX(-50%) rotate(-90deg);font-size:7px;letter-spacing:.4em;color:#6f665a}.s3-bottle__shoulder{position:absolute;z-index:2;top:155px;left:50%;transform:translateX(-50%);width:214px;height:82px;border-radius:48% 48% 10% 10%/82% 82% 18% 18%;background:linear-gradient(90deg,#070706 1%,#1c1a18 33%,#2d2924 48%,#11100e 66%,#050505 97%)}.s3-bottle__body{position:absolute;z-index:3;top:205px;left:50%;transform:translateX(-50%);width:218px;height:414px;border-radius:22px 22px 27px 27px/15px 15px 30px 30px;background:linear-gradient(95deg,#050505 1%,#161513 23%,#2d2925 43%,#181714 56%,#090908 80%,#030303);border:1px solid rgba(255,255,255,.055);box-shadow:inset 24px 0 38px rgba(255,255,255,.015),inset -28px 0 36px rgba(0,0,0,.7)}.s3-bottle__shine{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(102deg,transparent 17%,rgba(255,245,224,.075) 31%,rgba(255,255,255,.015) 44%,transparent 55%);mix-blend-mode:screen}.s3-bottle__grain{position:absolute;inset:0;border-radius:inherit;opacity:.18;background-image:radial-gradient(rgba(255,255,255,.12) .55px,transparent .55px);background-size:3px 3px;mask-image:linear-gradient(90deg,transparent,#000 30%,#000 70%,transparent)}.s3-bottle__seal{position:absolute;top:116px;left:50%;transform:translateX(-50%);width:54px;height:54px;border-radius:50%;display:grid;place-items:center;font-family:"Cormorant Garamond",serif;font-size:24px;color:#1d170f;background:radial-gradient(circle at 35% 30%,#e1c69b,#9c7445 60%,#634729);box-shadow:0 7px 17px rgba(0,0,0,.55),inset 0 0 0 2px rgba(255,255,255,.18)}.s3-bottle__word{position:absolute;top:190px;width:100%;text-align:center;font-family:"Cormorant Garamond",serif;font-size:25px;letter-spacing:.34em;padding-left:.34em;color:#bbb1a2}.s3-bottle__geo{position:absolute;top:230px;width:100%;text-align:center;font-size:8px;letter-spacing:.12em;color:#726b62}.s3-bottle__edition,.s3-bottle__num{position:absolute;left:0;right:0;text-align:center;font-size:7px;letter-spacing:.25em;color:#5f5a53}.s3-bottle__edition{bottom:52px}.s3-bottle__num{bottom:28px;color:#a58966}.s3-bottle__shadow{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:250px;height:34px;border-radius:50%;background:rgba(0,0,0,.7);filter:blur(13px)}.s3-story,.s3-collection{padding:150px 7vw}.s3-sectionhead{max-width:980px}.s3-sectionhead h2{font-size:clamp(54px,7vw,112px);line-height:.92;letter-spacing:-.045em}.s3-story__grid{display:grid;grid-template-columns:1.2fr .55fr 1fr;gap:5vw;align-items:end;margin-top:110px;padding-top:55px;border-top:1px solid var(--s3-line)}.s3-story__grid>p{max-width:520px;margin:0;font-size:17px}.s3-story__stamp{justify-self:center;width:138px;height:138px;border:1px solid #3b3329;border-radius:50%;display:grid;place-items:center;position:relative}.s3-story__stamp:after{content:"";position:absolute;inset:9px;border:1px solid rgba(180,148,106,.22);border-radius:50%}.s3-story__stamp b{font-family:"Cormorant Garamond",serif;font-size:54px;font-weight:400;color:#b4946a}.s3-story__stamp span{position:absolute;bottom:-42px;text-align:center;font-size:7px;line-height:1.7;letter-spacing:.2em;color:#716a61}.s3-story blockquote{font-size:clamp(40px,5vw,78px);line-height:.8;text-align:right;color:#b7aea1}.s3-story blockquote small{display:block;font-family:Manrope,sans-serif;margin-top:23px;font-size:9px;letter-spacing:.18em;color:#746f67}.s3-edition{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;background:#0d0c0a;border-top:1px solid var(--s3-line);border-bottom:1px solid var(--s3-line);overflow:hidden}.s3-edition__visual{position:relative;height:100%;min-height:900px;display:grid;place-items:center;border-right:1px solid var(--s3-line);background:radial-gradient(circle at 50% 42%,rgba(142,104,60,.12),transparent 35%),linear-gradient(145deg,#0d0c0a,#080807)}.s3-halo{position:absolute;width:580px;height:580px;border:1px solid rgba(180,148,106,.15);border-radius:50%;box-shadow:0 0 0 80px rgba(180,148,106,.012),0 0 0 160px rgba(180,148,106,.008)}.s3-big-number{position:absolute;left:5vw;bottom:46px;font-family:"Cormorant Garamond",serif;font-size:clamp(80px,11vw,190px);line-height:.7;color:rgba(255,255,255,.035);letter-spacing:-.05em}.s3-big-number small{font-family:Manrope,sans-serif;font-size:8px;letter-spacing:.2em;color:#8b7254;margin-left:20px}.s3-edition__copy{padding:9vw}.s3-edition__copy h2{font-size:clamp(54px,6vw,104px);line-height:.88;letter-spacing:-.045em;max-width:760px}.s3-edition__copy>p{max-width:600px;font-size:16px;margin:40px 0 55px}.s3-facts{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--s3-line);border-left:1px solid var(--s3-line)}.s3-facts div{padding:26px 24px;border-right:1px solid var(--s3-line);border-bottom:1px solid var(--s3-line)}.s3-facts strong{display:block;font-family:"Cormorant Garamond",serif;font-size:30px;font-weight:400;color:#c7b69e}.s3-facts span{display:block;font-size:7px;letter-spacing:.18em;color:#6f6961;margin-top:7px}.s3-acts{padding:160px 7vw;background:#080807}.s3-sectionhead--center{margin:0 auto;text-align:center}.s3-acts__grid{margin-top:95px;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--s3-line);border-left:1px solid var(--s3-line)}.s3-act{position:relative;min-height:430px;padding:36px 30px;border-right:1px solid var(--s3-line);border-bottom:1px solid var(--s3-line);overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.018),transparent)}.s3-act>span{font-size:9px;letter-spacing:.2em;color:#987d5c}.s3-act h3{font-size:56px;margin-top:120px}.s3-act p{font-size:13px;max-width:260px}.s3-act i{position:absolute;right:-70px;bottom:-70px;width:190px;height:190px;border:1px solid rgba(180,148,106,.08);border-radius:50%}.s3-act--2{background:radial-gradient(circle at 80% 90%,rgba(109,69,33,.12),transparent 44%)}.s3-act--3{background:radial-gradient(circle at 50% 30%,rgba(180,148,106,.055),transparent 36%)}.s3-origin{padding:150px 7vw;display:grid;grid-template-columns:1.1fr .9fr;gap:10vw;align-items:center;background:linear-gradient(120deg,#0b0a09,#11100d)}.s3-origin__copy h2{font-size:clamp(56px,6.5vw,110px);line-height:.88;letter-spacing:-.045em}.s3-origin__copy>p{max-width:620px;font-size:16px;margin:38px 0}.s3-nfc{width:78px;height:78px;border:1px solid #5d4d3b;border-radius:50%;display:grid;place-items:center;position:relative;color:#a78a67;font-size:9px;letter-spacing:.16em}.s3-nfc i{position:absolute;right:-34px;font-style:normal;color:#62584d}.s3-cert{border:1px solid rgba(213,196,174,.16);background:#11100e;padding:34px;box-shadow:0 30px 100px rgba(0,0,0,.36);transform:rotate(1.4deg)}.s3-cert__top{display:flex;justify-content:space-between;align-items:center;padding-bottom:25px;border-bottom:1px solid var(--s3-line);font-size:8px;letter-spacing:.23em;color:#847b70}.s3-cert__top b{display:grid;place-items:center;width:36px;height:36px;border:1px solid #746046;border-radius:50%;font-family:"Cormorant Garamond",serif;font-size:20px;color:#b59772}.s3-cert__row{display:flex;justify-content:space-between;gap:20px;padding:15px 0;border-bottom:1px solid rgba(255,255,255,.055)}.s3-cert__row span{font-size:9px;color:#6f6962}.s3-cert__row strong{font-size:10px;font-weight:500;letter-spacing:.08em;color:#c7c0b5}.s3-cert__code{margin-top:24px;width:112px;height:112px;padding:8px;border:1px solid #342f29;display:grid;grid-template-columns:repeat(6,1fr);gap:2px}.s3-cert__code i{background:#aaa094;opacity:.15}.s3-cert__code i:nth-child(3n),.s3-cert__code i:nth-child(5n+1),.s3-cert__code i:nth-child(7n+2){opacity:.82}.s3-cert>small{display:block;margin-top:14px;font-size:7px;letter-spacing:.18em;color:#5f5952}.s3-collection{background:#090908}.s3-products{display:grid;grid-template-columns:repeat(3,1fr);margin-top:90px;border-left:1px solid var(--s3-line);border-top:1px solid var(--s3-line)}.s3-product{position:relative;min-height:610px;border-right:1px solid var(--s3-line);border-bottom:1px solid var(--s3-line);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.01),rgba(255,255,255,.018))}.s3-product__num{position:absolute;left:25px;top:20px;font-family:"Cormorant Garamond",serif;font-size:96px;color:rgba(255,255,255,.035)}.s3-product__mini{position:absolute;inset:30px 30px 180px;display:grid;place-items:center}.s3-mini-bottle{width:88px;height:300px;border-radius:16px 16px 21px 21px;background:linear-gradient(95deg,#080807,#302b24 45%,#0b0a09 76%);position:relative;box-shadow:0 30px 50px rgba(0,0,0,.5)}.s3-mini-bottle:before{content:"";position:absolute;left:50%;top:-90px;transform:translateX(-50%);width:32px;height:105px;background:linear-gradient(90deg,#080807,#211d18,#090908);border-radius:3px 3px 8px 8px}.s3-mini-bottle:after{content:"";position:absolute;top:-12px;left:50%;transform:translateX(-50%);width:88px;height:45px;border-radius:50% 50% 10% 10%;background:linear-gradient(90deg,#090908,#28231d,#090908)}.s3-mini-bottle span{position:absolute;top:78px;left:50%;transform:translateX(-50%);display:grid;place-items:center;width:29px;height:29px;border-radius:50%;background:#a7875f;color:#17120d;font-family:"Cormorant Garamond",serif}.s3-product--2 .s3-mini-bottle{background:linear-gradient(95deg,#181611,#484034 45%,#14120f 76%)}.s3-product--3 .s3-mini-bottle{width:106px;height:250px;border-radius:20px 20px 27px 27px}.s3-product__text{position:relative;z-index:3;padding:26px 28px 34px;border-top:1px solid var(--s3-line);background:rgba(8,8,7,.75);backdrop-filter:blur(8px)}.s3-product__text>span{font-size:7px;letter-spacing:.18em;color:#a2835e}.s3-product__text h3{font-size:43px;margin-top:8px}.s3-product__text p{font-size:11px;margin:5px 0 12px}.s3-product__text strong{font-size:9px;font-weight:500;letter-spacing:.1em;color:#777067}.s3-allocation{padding:160px 7vw;display:grid;grid-template-columns:1fr 1fr;gap:10vw;align-items:start;background:#d1c7b8;color:#15130f}.s3-allocation .s3-kicker{color:#735c41}.s3-allocation__intro h2{font-size:clamp(58px,6vw,106px);line-height:.86;letter-spacing:-.05em}.s3-allocation__intro p{color:#5b554d;max-width:570px;font-size:15px;margin-top:36px}.s3-form{padding-top:28px}.s3-form label{display:block;border-bottom:1px solid rgba(20,18,15,.25);padding:20px 0}.s3-form label span{display:block;font-size:8px;letter-spacing:.17em;text-transform:uppercase;color:#6b645a}.s3-form input{width:100%;border:0;outline:0;background:transparent;color:#17140f;padding:12px 0 4px;font-family:"Cormorant Garamond",serif;font-size:27px}.s3-form .s3-btn{margin-top:28px;display:flex;align-items:center;justify-content:space-between;width:100%;background:#15130f!important;color:#d7cebf!important;border-color:#15130f!important}.s3-thanks{border:1px solid rgba(20,18,15,.2);padding:45px}.s3-thanks>span{display:grid;place-items:center;width:54px;height:54px;border:1px solid rgba(20,18,15,.35);border-radius:50%;font-size:20px}.s3-thanks h3{font-size:52px;margin-top:55px}.s3-thanks p{color:#5b554d}.s3-footer{min-height:280px;padding:60px 7vw;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:end;border-top:1px solid var(--s3-line);background:#080807}.s3-footer>div b{display:block;font-family:"Cormorant Garamond",serif;font-size:68px;letter-spacing:.12em;font-weight:400}.s3-footer>div span{color:#796b59;font-size:10px}.s3-footer>strong{justify-self:center;font-size:9px;letter-spacing:.23em;color:#8c8276;font-weight:400}.s3-footer>small{justify-self:end;max-width:270px;text-align:right;font-size:8px;line-height:1.7;color:#625e58}.s3-gate{position:fixed;z-index:9999;inset:0;display:grid;place-items:center;background:#080807;overflow:hidden}.s3-gate__glow{position:absolute;width:80vw;height:80vw;border-radius:50%;background:radial-gradient(circle,rgba(143,100,53,.16),transparent 58%);top:-55vw;left:50%;transform:translateX(-50%)}.s3-gate__card{position:relative;z-index:2;width:min(560px,calc(100vw - 40px));padding:70px 60px;border:1px solid rgba(255,255,255,.11);background:rgba(13,12,10,.86);backdrop-filter:blur(25px);text-align:center;box-shadow:0 50px 130px rgba(0,0,0,.55)}.s3-gate__mark{margin:0 auto 45px;display:grid;place-items:center;width:72px;height:72px;border:1px solid #776044;border-radius:50%;font-family:"Cormorant Garamond",serif;font-size:34px;color:#b6966e}.s3-gate h2{font-size:59px;line-height:.9}.s3-gate p{font-size:13px;max-width:380px;margin:28px auto}.s3-gate .s3-btn{margin-top:14px}.s3-gate__exit{display:block!important;margin:18px auto 0!important;color:#68635c!important;font-size:9px!important;letter-spacing:.14em;text-transform:uppercase}.s3-gate__exit:hover{color:#b1aaa0!important}
        @media(max-width:1050px){.s3-nav{padding:0 24px}.s3-nav nav{display:none}.s3-hero{grid-template-columns:1fr;padding-left:6vw;padding-right:6vw}.s3-hero__copy{z-index:7}.s3-hero h1{font-size:clamp(72px,14vw,130px)}.s3-hero h1 span:last-child{margin-left:0}.s3-hero__copy>p{max-width:430px}.s3-hero__bottle{position:absolute;right:5vw;bottom:3vh;opacity:.72;transform:scale(.82)!important}.s3-story__grid{grid-template-columns:1fr 1fr}.s3-story blockquote{grid-column:1/-1;margin-top:70px}.s3-edition{grid-template-columns:1fr}.s3-edition__visual{min-height:760px;border-right:0;border-bottom:1px solid var(--s3-line)}.s3-edition__copy{padding:100px 7vw}.s3-acts__grid{grid-template-columns:1fr 1fr}.s3-origin{grid-template-columns:1fr;gap:90px}.s3-cert{max-width:650px}.s3-products{grid-template-columns:1fr}.s3-product{min-height:520px}.s3-allocation{grid-template-columns:1fr;gap:60px}.s3-footer{grid-template-columns:1fr;gap:45px}.s3-footer>strong,.s3-footer>small{justify-self:start;text-align:left}}
        @media(max-width:650px){.s3-nav{height:70px;padding:0 15px}.s3-mark b{font-size:23px}.s3-lang{gap:2px}.s3-lang button{padding:6px 5px;font-size:8px}.s3-hero{min-height:720px;padding:104px 20px 60px;align-items:start}.s3-hero__copy{margin-top:9vh}.s3-hero h1{font-size:17vw;line-height:.78}.s3-hero__copy>p{font-size:13px;line-height:1.6;margin:26px 0}.s3-btn{min-height:45px;padding:0 14px!important;font-size:8px!important}.s3-hero__bottle{right:-52px;bottom:-70px;transform:scale(.59)!important;opacity:.52}.s3-hero__sun{width:110vw;height:110vw;right:-45vw;top:27vh}.s3-hero__side{display:none}.s3-scroll{left:20px}.s3-story,.s3-collection,.s3-acts,.s3-origin{padding:100px 20px}.s3-sectionhead h2,.s3-origin__copy h2{font-size:14.2vw}.s3-story__grid{grid-template-columns:1fr;gap:70px;margin-top:60px}.s3-story__grid>p{font-size:14px}.s3-story__stamp{justify-self:start}.s3-story blockquote{grid-column:auto;text-align:left;margin-top:25px;font-size:16vw}.s3-edition__visual{min-height:660px}.s3-edition__visual .s3-bottle{transform:scale(.65)!important}.s3-halo{width:330px;height:330px}.s3-edition__copy{padding:85px 20px}.s3-edition__copy h2{font-size:14vw}.s3-edition__copy>p{font-size:14px;margin:28px 0 40px}.s3-facts{grid-template-columns:1fr 1fr}.s3-facts div{padding:18px 14px}.s3-facts strong{font-size:22px}.s3-acts__grid{grid-template-columns:1fr;margin-top:55px}.s3-act{min-height:300px}.s3-act h3{margin-top:65px}.s3-origin{gap:65px}.s3-origin__copy>p{font-size:14px}.s3-cert{padding:22px;transform:none}.s3-products{margin-top:55px}.s3-product{min-height:470px}.s3-product__text h3{font-size:38px}.s3-allocation{padding:95px 20px}.s3-allocation__intro h2{font-size:14vw}.s3-form input{font-size:23px}.s3-footer{padding:55px 20px;min-height:330px}.s3-footer>div b{font-size:54px}.s3-gate__card{padding:55px 24px}.s3-gate h2{font-size:48px}.s3-cursorlight{display:none}}
        @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.s3-hero__bottle,.s3-btn{transition:none!important}.s3-cursorlight{display:none}}
      `}</style>
    </main>
  );
}
