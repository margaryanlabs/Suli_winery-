"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "en" | "ru" | "ka";

type Copy = {
  nav: { story: string; collection: string; origin: string; allocation: string };
  hero: { eyebrow: string; title: string; subtitle: string; cta: string; scroll: string };
  edition: { eyebrow: string; title: string; body: string; bottle: string; vintage: string; origin: string; grape: string };
  heritage: { eyebrow: string; title: string; body: string; stat1: string; stat1Label: string; stat2: string; stat2Label: string };
  ritual: { eyebrow: string; title: string; body: string; qvevri: string; qvevriBody: string; hand: string; handBody: string; time: string; timeBody: string };
  collection: { eyebrow: string; title: string; subtitle: string; reserve: string; details: string; products: { name: string; kind: string; notes: string; release: string }[] };
  provenance: { eyebrow: string; title: string; body: string; points: string[]; certificate: string; certificateSub: string };
  allocation: { eyebrow: string; title: string; body: string; name: string; email: string; market: string; button: string; note: string };
  footer: { line: string; legal: string; age: string };
  gate: { eyebrow: string; title: string; body: string; enter: string; leave: string };
};

const COPY: Record<Lang, Copy> = {
  en: {
    nav: { story: "Story", collection: "Collection", origin: "Origin", allocation: "Allocation" },
    hero: {
      eyebrow: "KAKHETI · GEORGIA · EDITION 001",
      title: "THE SPIRIT\nOF GEORGIA.",
      subtitle: "An ancient winemaking culture, distilled into one numbered object.",
      cta: "Discover Edition 001",
      scroll: "Scroll to enter"
    },
    edition: {
      eyebrow: "FIRST RELEASE",
      title: "777 bottles.\nNever reproduced.",
      body: "SULI Edition 001 is a small-batch Saperavi shaped by earth, clay and time. Every bottle carries an individual number and a digital certificate of origin.",
      bottle: "Bottle",
      vintage: "Vintage",
      origin: "Origin",
      grape: "Grape"
    },
    heritage: {
      eyebrow: "8,000 YEARS IN THE MAKING",
      title: "Before wine was an industry,\nit was a Georgian ritual.",
      body: "Georgia is one of the oldest known wine cultures on earth. SULI does not imitate the past. It translates it — with qvevri fermentation, native grapes and a modern, uncompromising visual language.",
      stat1: "8,000+",
      stat1Label: "years of Georgian wine culture",
      stat2: "01",
      stat2Label: "origin, documented bottle by bottle"
    },
    ritual: {
      eyebrow: "THE RITUAL",
      title: "Earth. Grape. Time.",
      body: "Nothing unnecessary between vineyard and glass.",
      qvevri: "Qvevri",
      qvevriBody: "Clay vessels buried in the earth create a stable, quiet environment for fermentation and maturation.",
      hand: "Selection",
      handBody: "Small lots, hand-selected fruit and restrained intervention preserve texture, structure and place.",
      time: "Patience",
      timeBody: "The release date follows the wine — never a marketing calendar."
    },
    collection: {
      eyebrow: "THE HOUSE OF SULI",
      title: "A small collection,\nnot a catalogue.",
      subtitle: "Each release has a reason to exist, a finite quantity and its own material language.",
      reserve: "Request allocation",
      details: "View release",
      products: [
        { name: "Saperavi · 001", kind: "Dry red · Kakheti", notes: "Black cherry · wild herbs · clay", release: "777 bottles" },
        { name: "Kisi Qvevri · 002", kind: "Dry amber · Kakheti", notes: "Quince · tea · mountain flowers", release: "Coming next" },
        { name: "Chacha Reserve · 003", kind: "Grape spirit · Oak rested", notes: "Grape skin · walnut · warm spice", release: "333 bottles" }
      ]
    },
    provenance: {
      eyebrow: "PROVENANCE",
      title: "Every bottle has a memory.",
      body: "Tap the discreet NFC mark or scan the bottle code to reveal the story of your specific release. No crypto language. Just verifiable origin.",
      points: ["Bottle number and release", "Vineyard and harvest", "Vinification and qvevri lot", "Bottling date and authenticity"],
      certificate: "BOTTLE 041 / 777",
      certificateSub: "Edition 001 · Kakheti · Georgia"
    },
    allocation: {
      eyebrow: "PRIVATE RELEASE",
      title: "Request your bottle.",
      body: "Edition 001 is offered in limited allocations to private clients, selected restaurants and hospitality partners.",
      name: "Name",
      email: "Email",
      market: "City / market",
      button: "Request allocation",
      note: "No payment is taken here. We will confirm availability personally."
    },
    footer: { line: "SULI — THE SPIRIT OF GEORGIA", legal: "Please enjoy responsibly.", age: "For adults of legal drinking age only." },
    gate: { eyebrow: "SULI · GEORGIA", title: "Enter the house of SULI", body: "Please confirm that you are of legal drinking age in your country.", enter: "I am of legal drinking age", leave: "Exit" }
  },
  ru: {
    nav: { story: "История", collection: "Коллекция", origin: "Происхождение", allocation: "Резерв" },
    hero: {
      eyebrow: "КАХЕТИ · ГРУЗИЯ · EDITION 001",
      title: "ДУША\nГРУЗИИ.",
      subtitle: "Древняя культура вина, превращённая в один пронумерованный объект.",
      cta: "Открыть Edition 001",
      scroll: "Листайте дальше"
    },
    edition: {
      eyebrow: "ПЕРВЫЙ РЕЛИЗ",
      title: "777 бутылок.\nБез повторного тиража.",
      body: "SULI Edition 001 — малый тираж Саперави, сформированный землёй, глиной и временем. У каждой бутылки свой номер и цифровой сертификат происхождения.",
      bottle: "Бутылка",
      vintage: "Урожай",
      origin: "Регион",
      grape: "Сорт"
    },
    heritage: {
      eyebrow: "8 000 ЛЕТ ИСТОРИИ",
      title: "До того как вино стало индустрией,\nв Грузии оно было ритуалом.",
      body: "Грузия — одна из древнейших винных культур мира. SULI не копирует прошлое. Мы переводим его на современный язык: квеври, местные сорта и бескомпромиссная визуальная эстетика.",
      stat1: "8 000+",
      stat1Label: "лет грузинской винной культуры",
      stat2: "01",
      stat2Label: "происхождение, подтверждённое для каждой бутылки"
    },
    ritual: {
      eyebrow: "РИТУАЛ",
      title: "Земля. Виноград. Время.",
      body: "Ничего лишнего между виноградником и бокалом.",
      qvevri: "Квеври",
      qvevriBody: "Глиняные сосуды, погружённые в землю, создают спокойную среду для ферментации и созревания.",
      hand: "Отбор",
      handBody: "Малые партии, ручной отбор и минимальное вмешательство сохраняют структуру и характер места.",
      time: "Терпение",
      timeBody: "Дата релиза определяется вином, а не маркетинговым календарём."
    },
    collection: {
      eyebrow: "ДОМ SULI",
      title: "Небольшая коллекция,\nа не каталог.",
      subtitle: "У каждого релиза есть причина существовать, конечный тираж и собственный материальный характер.",
      reserve: "Запросить резерв",
      details: "Открыть релиз",
      products: [
        { name: "Saperavi · 001", kind: "Сухое красное · Кахети", notes: "Чёрная вишня · травы · глина", release: "777 бутылок" },
        { name: "Kisi Qvevri · 002", kind: "Сухое янтарное · Кахети", notes: "Айва · чай · горные цветы", release: "Следующий релиз" },
        { name: "Chacha Reserve · 003", kind: "Виноградный дистиллят · выдержка", notes: "Виноградная кожица · орех · специи", release: "333 бутылки" }
      ]
    },
    provenance: {
      eyebrow: "ПРОИСХОЖДЕНИЕ",
      title: "У каждой бутылки есть память.",
      body: "Коснитесь NFC-метки или отсканируйте код бутылки — и откроется история именно вашего экземпляра. Без Web3-жаргона. Только проверяемое происхождение.",
      points: ["Номер бутылки и релиза", "Виноградник и урожай", "Винификация и партия квеври", "Дата розлива и подлинность"],
      certificate: "БУТЫЛКА 041 / 777",
      certificateSub: "Edition 001 · Кахети · Грузия"
    },
    allocation: {
      eyebrow: "ЗАКРЫТЫЙ РЕЛИЗ",
      title: "Запросите свою бутылку.",
      body: "Edition 001 распределяется ограниченными квотами среди частных клиентов, выбранных ресторанов и отелей.",
      name: "Имя",
      email: "Email",
      market: "Город / рынок",
      button: "Запросить резерв",
      note: "Оплата на сайте не списывается. Мы лично подтвердим наличие."
    },
    footer: { line: "SULI — ДУША ГРУЗИИ", legal: "Употребляйте ответственно.", age: "Только для совершеннолетних по законодательству вашей страны." },
    gate: { eyebrow: "SULI · ГРУЗИЯ", title: "Войти в дом SULI", body: "Подтвердите, что вы достигли возраста, разрешённого для употребления алкоголя в вашей стране.", enter: "Я достиг(ла) разрешённого возраста", leave: "Выйти" }
  },
  ka: {
    nav: { story: "ისტორია", collection: "კოლექცია", origin: "წარმოშობა", allocation: "რეზერვი" },
    hero: {
      eyebrow: "კახეთი · საქართველო · EDITION 001",
      title: "საქართველოს\nსული.",
      subtitle: "უძველესი მეღვინეობის კულტურა — ერთ დანომრილ ობიექტში.",
      cta: "აღმოაჩინე Edition 001",
      scroll: "გააგრძელე სქროლი"
    },
    edition: {
      eyebrow: "პირველი გამოშვება",
      title: "777 ბოთლი.\nგამეორების გარეშე.",
      body: "SULI Edition 001 არის მცირე ტირაჟის საფერავი, შექმნილი მიწის, თიხისა და დროის გავლენით. თითოეულ ბოთლს აქვს ინდივიდუალური ნომერი და წარმოშობის ციფრული სერტიფიკატი.",
      bottle: "ბოთლი",
      vintage: "მოსავალი",
      origin: "წარმოშობა",
      grape: "ჯიში"
    },
    heritage: {
      eyebrow: "8 000-წლიანი ისტორია",
      title: "სანამ ღვინო ინდუსტრიად იქცეოდა,\nსაქართველოში ის რიტუალი იყო.",
      body: "საქართველო ღვინის ერთ-ერთი უძველესი კულტურაა. SULI წარსულს არ იმეორებს — ის მას თანამედროვე ენაზე თარგმნის: ქვევრი, ქართული ჯიშები და მკაფიო, თავშეკავებული დიზაინი.",
      stat1: "8 000+",
      stat1Label: "წელი ქართული ღვინის კულტურისა",
      stat2: "01",
      stat2Label: "წარმოშობა, დადასტურებული თითოეული ბოთლისთვის"
    },
    ritual: {
      eyebrow: "რიტუალი",
      title: "მიწა. ყურძენი. დრო.",
      body: "არაფერი ზედმეტი ვენახსა და ჭიქას შორის.",
      qvevri: "ქვევრი",
      qvevriBody: "მიწაში ჩაფლული თიხის ჭურჭელი ქმნის მშვიდ გარემოს დუღილისა და დაძველებისთვის.",
      hand: "შერჩევა",
      handBody: "მცირე პარტიები, ხელით შერჩეული ყურძენი და მინიმალური ჩარევა ინარჩუნებს ღვინის სტრუქტურასა და ადგილის ხასიათს.",
      time: "მოთმინება",
      timeBody: "გამოშვების დროს განსაზღვრავს ღვინო და არა მარკეტინგული კალენდარი."
    },
    collection: {
      eyebrow: "SULI-ს სახლი",
      title: "მცირე კოლექცია,\nარა კატალოგი.",
      subtitle: "თითოეულ გამოშვებას აქვს თავისი მიზეზი, შეზღუდული რაოდენობა და გამორჩეული მატერიალური ენა.",
      reserve: "რეზერვის მოთხოვნა",
      details: "გამოშვების ნახვა",
      products: [
        { name: "Saperavi · 001", kind: "მშრალი წითელი · კახეთი", notes: "შავი ალუბალი · ველური მცენარეები · თიხა", release: "777 ბოთლი" },
        { name: "Kisi Qvevri · 002", kind: "მშრალი ქარვისფერი · კახეთი", notes: "კომში · ჩაი · მთის ყვავილები", release: "შემდეგი გამოშვება" },
        { name: "Chacha Reserve · 003", kind: "ყურძნის დისტილატი · მუხა", notes: "ყურძნის კანი · კაკალი · სანელებლები", release: "333 ბოთლი" }
      ]
    },
    provenance: {
      eyebrow: "წარმოშობა",
      title: "თითოეულ ბოთლს თავისი მეხსიერება აქვს.",
      body: "შეეხე NFC ნიშნულს ან დაასკანერე კოდი და ნახე კონკრეტულად შენი ბოთლის ისტორია. ტექნოლოგიური ჟარგონის გარეშე — მხოლოდ გადამოწმებადი წარმოშობა.",
      points: ["ბოთლისა და გამოშვების ნომერი", "ვენახი და მოსავალი", "ღვინის დაყენება და ქვევრის პარტია", "ჩამოსხმის თარიღი და ავთენტურობა"],
      certificate: "ბოთლი 041 / 777",
      certificateSub: "Edition 001 · კახეთი · საქართველო"
    },
    allocation: {
      eyebrow: "პირადი გამოშვება",
      title: "მოითხოვე შენი ბოთლი.",
      body: "Edition 001 შეზღუდული კვოტებით გადაეცემა კერძო კლიენტებს, შერჩეულ რესტორნებსა და სასტუმროებს.",
      name: "სახელი",
      email: "ელფოსტა",
      market: "ქალაქი / ბაზარი",
      button: "რეზერვის მოთხოვნა",
      note: "აქ თანხა არ ჩამოგეჭრებათ. ხელმისაწვდომობას პირადად დაგიდასტურებთ."
    },
    footer: { line: "SULI — საქართველოს სული", legal: "მიირთვით პასუხისმგებლობით.", age: "მხოლოდ კანონით ნებადართული ასაკის პირებისთვის." },
    gate: { eyebrow: "SULI · საქართველო", title: "შედი SULI-ს სახლში", body: "დაადასტურე, რომ შენს ქვეყანაში ალკოჰოლის მოხმარებისთვის კანონით ნებადართული ასაკის ხარ.", enter: "ვარ კანონით ნებადართული ასაკის", leave: "გასვლა" }
  }
};

function Bottle({ small = false, variant = "bronze" }: { small?: boolean; variant?: "bronze" | "silver" | "smoke" }) {
  return (
    <div className={`bottle ${small ? "bottle--small" : ""} bottle--${variant}`} aria-label="SULI matte black bottle visual">
      <div className="bottle__cap"><span /></div>
      <div className="bottle__neck"><div className="bottle__neck-mark">SULI</div></div>
      <div className="bottle__shoulder" />
      <div className="bottle__body">
        <div className="bottle__grain" />
        <div className="bottle__vine" />
        <div className="bottle__medallion"><span>S</span></div>
        <div className="bottle__wordmark">SULI</div>
        <div className="bottle__meta">GEORGIA · 001</div>
        <div className="bottle__number">041 / 777</div>
      </div>
      <div className="bottle__shadow" />
    </div>
  );
}

function Chevron() {
  return <span className="chevron" aria-hidden="true">↘</span>;
}

export default function SuliExperience() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [sent, setSent] = useState(false);
  const t = COPY[lang];

  useEffect(() => {
    const stored = window.localStorage.getItem("suli-age-confirmed");
    setAccepted(stored === "yes");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const langs = useMemo(() => (["en", "ru", "ka"] as Lang[]), []);

  const accept = () => {
    window.localStorage.setItem("suli-age-confirmed", "yes");
    setAccepted(true);
  };

  const cycleLang = () => {
    const index = langs.indexOf(lang);
    setLang(langs[(index + 1) % langs.length]);
  };

  return (
    <main className="site-shell">
      {accepted === false && (
        <div className="age-gate">
          <div className="age-gate__grain" />
          <div className="age-gate__mark">S</div>
          <div className="age-gate__panel">
            <span className="eyebrow">{t.gate.eyebrow}</span>
            <h1>{t.gate.title}</h1>
            <p>{t.gate.body}</p>
            <div className="age-gate__actions">
              <button className="button button--light" onClick={accept}>{t.gate.enter}<Chevron /></button>
              <a className="text-link" href="https://www.google.com">{t.gate.leave}</a>
            </div>
          </div>
          <div className="age-gate__langs">
            {langs.map((item) => <button key={item} onClick={() => setLang(item)} className={item === lang ? "active" : ""}>{item.toUpperCase()}</button>)}
          </div>
        </div>
      )}

      <header className="topbar">
        <a className="logo" href="#top" aria-label="SULI home"><span className="logo__sigil">S</span><span>SULI</span></a>
        <nav className="desktop-nav">
          <a href="#story">{t.nav.story}</a>
          <a href="#collection">{t.nav.collection}</a>
          <a href="#origin">{t.nav.origin}</a>
          <a href="#allocation">{t.nav.allocation}</a>
        </nav>
        <div className="topbar__right">
          <button className="lang-switch" onClick={cycleLang} aria-label="Change language">{lang.toUpperCase()}</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><span /><span /></button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#story" onClick={() => setMenuOpen(false)}>{t.nav.story}</a>
            <a href="#collection" onClick={() => setMenuOpen(false)}>{t.nav.collection}</a>
            <a href="#origin" onClick={() => setMenuOpen(false)}>{t.nav.origin}</a>
            <a href="#allocation" onClick={() => setMenuOpen(false)}>{t.nav.allocation}</a>
            <div className="mobile-menu__langs">{langs.map(item => <button key={item} className={item === lang ? "active" : ""} onClick={() => setLang(item)}>{item.toUpperCase()}</button>)}</div>
          </div>
        )}
      </header>

      <section id="top" className="hero section-dark">
        <div className="hero__aurora" />
        <div className="hero__mountains mountain-one" />
        <div className="hero__mountains mountain-two" />
        <div className="hero__mist" />
        <div className="hero__copy">
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1>{t.hero.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h1>
          <p>{t.hero.subtitle}</p>
          <a className="button button--outline" href="#edition">{t.hero.cta}<Chevron /></a>
        </div>
        <div className="hero__bottle"><Bottle /></div>
        <div className="hero__edition"><span>001</span><small>OF 777</small></div>
        <div className="hero__scroll"><span className="scroll-line" />{t.hero.scroll}</div>
      </section>

      <section id="edition" className="edition section-stone">
        <div className="section-index">01</div>
        <div className="edition__visual reveal-frame">
          <div className="stone-orbit stone-orbit--one" />
          <div className="stone-orbit stone-orbit--two" />
          <Bottle />
        </div>
        <div className="edition__copy">
          <span className="eyebrow">{t.edition.eyebrow}</span>
          <h2>{t.edition.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2>
          <p>{t.edition.body}</p>
          <dl className="spec-grid">
            <div><dt>{t.edition.bottle}</dt><dd>041 / 777</dd></div>
            <div><dt>{t.edition.vintage}</dt><dd>2026</dd></div>
            <div><dt>{t.edition.origin}</dt><dd>Kakheti</dd></div>
            <div><dt>{t.edition.grape}</dt><dd>Saperavi</dd></div>
          </dl>
        </div>
      </section>

      <section id="story" className="heritage section-ivory">
        <div className="section-index">02</div>
        <div className="heritage__header">
          <span className="eyebrow eyebrow--dark">{t.heritage.eyebrow}</span>
          <h2>{t.heritage.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2>
        </div>
        <div className="heritage__body">
          <div className="heritage__landscape">
            <div className="sun-disc" />
            <div className="ridge ridge--a" />
            <div className="ridge ridge--b" />
            <div className="vine-lines" />
            <span className="landscape-caption">41.6168° N · 45.9221° E</span>
          </div>
          <div className="heritage__text">
            <p>{t.heritage.body}</p>
            <div className="heritage__stats">
              <div><strong>{t.heritage.stat1}</strong><span>{t.heritage.stat1Label}</span></div>
              <div><strong>{t.heritage.stat2}</strong><span>{t.heritage.stat2Label}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ritual section-dark">
        <div className="section-index">03</div>
        <div className="ritual__intro">
          <span className="eyebrow">{t.ritual.eyebrow}</span>
          <h2>{t.ritual.title}</h2>
          <p>{t.ritual.body}</p>
        </div>
        <div className="ritual__grid">
          <article className="ritual-card ritual-card--qvevri"><span className="ritual-card__num">I</span><div className="qvevri-icon"><div /></div><h3>{t.ritual.qvevri}</h3><p>{t.ritual.qvevriBody}</p></article>
          <article className="ritual-card ritual-card--selection"><span className="ritual-card__num">II</span><div className="grape-icon"><i /><i /><i /><i /><i /></div><h3>{t.ritual.hand}</h3><p>{t.ritual.handBody}</p></article>
          <article className="ritual-card ritual-card--time"><span className="ritual-card__num">III</span><div className="time-icon"><span>26</span></div><h3>{t.ritual.time}</h3><p>{t.ritual.timeBody}</p></article>
        </div>
      </section>

      <section id="collection" className="collection section-stone">
        <div className="section-index">04</div>
        <div className="collection__heading"><span className="eyebrow">{t.collection.eyebrow}</span><h2>{t.collection.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h2><p>{t.collection.subtitle}</p></div>
        <div className="product-grid">
          {t.collection.products.map((product, index) => (
            <article className="product-card" key={product.name}>
              <div className="product-card__visual"><div className="product-card__halo" /><Bottle small variant={index === 0 ? "bronze" : index === 1 ? "silver" : "smoke"} /><span className="product-card__release">{product.release}</span></div>
              <div className="product-card__copy"><span className="eyebrow">0{index + 1}</span><h3>{product.name}</h3><p>{product.kind}</p><p className="product-card__notes">{product.notes}</p><a href="#allocation" className="text-link text-link--bright">{index === 1 ? t.collection.details : t.collection.reserve}<Chevron /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section id="origin" className="provenance section-ivory">
        <div className="section-index">05</div>
        <div className="provenance__copy">
          <span className="eyebrow eyebrow--dark">{t.provenance.eyebrow}</span>
          <h2>{t.provenance.title}</h2>
          <p>{t.provenance.body}</p>
          <ul>{t.provenance.points.map(point => <li key={point}><span>+</span>{point}</li>)}</ul>
        </div>
        <div className="certificate-wrap">
          <div className="certificate">
            <div className="certificate__top"><span>SULI</span><span>ORIGIN / 001</span></div>
            <div className="certificate__sigil">S</div>
            <div className="certificate__number">{t.provenance.certificate}</div>
            <div className="certificate__sub">{t.provenance.certificateSub}</div>
            <div className="certificate__code"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="certificate__footer"><span>NFC VERIFIED</span><span>2026</span></div>
          </div>
        </div>
      </section>

      <section id="allocation" className="allocation section-dark">
        <div className="allocation__bottle"><Bottle /></div>
        <div className="allocation__panel">
          <span className="eyebrow">{t.allocation.eyebrow}</span>
          <h2>{t.allocation.title}</h2>
          <p>{t.allocation.body}</p>
          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <label><span>{t.allocation.name}</span><input name="name" required autoComplete="name" /></label>
              <label><span>{t.allocation.email}</span><input name="email" required type="email" autoComplete="email" /></label>
              <label><span>{t.allocation.market}</span><input name="market" autoComplete="address-level2" /></label>
              <button className="button button--light" type="submit">{t.allocation.button}<Chevron /></button>
              <small>{t.allocation.note}</small>
            </form>
          ) : (
            <div className="sent-state"><span>✓</span><strong>SULI</strong><p>{lang === "ru" ? "Запрос сохранён. На следующем этапе подключим реальную отправку в CRM/email." : lang === "ka" ? "მოთხოვნა შენახულია. შემდეგ ეტაპზე დავაკავშირებთ CRM/email გაგზავნას." : "Request saved. We will connect live CRM/email delivery in the next build."}</p></div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer__logo"><span className="logo__sigil">S</span><strong>SULI</strong></div>
        <div className="footer__line">{t.footer.line}</div>
        <div className="footer__meta"><span>TBILISI · KAKHETI · GEORGIA</span><span>{t.footer.legal} {t.footer.age}</span><span>© 2026 SULI</span></div>
      </footer>
    </main>
  );
}
