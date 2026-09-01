'use client';

import { useMemo, useState, type CSSProperties, type MouseEvent } from 'react';

type Lang = 'ru' | 'en' | 'ka';
type ProductId = 'gold' | 'silver' | 'copper' | 'obsidian';

type Product = {
  id: ProductId;
  name: string;
  subtitle: Record<Lang, string>;
  accent: string;
  accentSoft: string;
  glow: string;
  haze: string;
  filter: string;
  image: string;
  price: number;
};

const BOTTLE = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3HoFPSIfr8HaTS2uAE1uxoDnLl0/5b74e954-6897-498a-af36-fe011c96ebd2.webp';

const products: Product[] = [
  {
    id: 'gold',
    name: 'SAPERAVI',
    subtitle: { ru: 'СИЛА И ГЛУБИНА', en: 'POWER & DEPTH', ka: 'ძალა და სიღრმე' },
    accent: '#b98752',
    accentSoft: '#e1b77e',
    glow: 'rgba(174, 104, 45, .36)',
    haze: 'rgba(105, 55, 25, .56)',
    filter: 'sepia(.14) saturate(1.16) contrast(1.06) brightness(.9)',
    image: BOTTLE,
    price: 89,
  },
  {
    id: 'silver',
    name: 'QVEVRI',
    subtitle: { ru: 'ТРАДИЦИЯ КВЕВРИ', en: 'QVEVRI TRADITION', ka: 'ქვევრის ტრადიცია' },
    accent: '#c3c6c8',
    accentSoft: '#f0f1f2',
    glow: 'rgba(181, 196, 211, .25)',
    haze: 'rgba(54, 66, 78, .58)',
    filter: 'grayscale(1) saturate(.35) contrast(1.16) brightness(.86)',
    image: BOTTLE,
    price: 94,
  },
  {
    id: 'copper',
    name: 'IBERIULI',
    subtitle: { ru: 'ЭНЕРГИЯ СОЛНЦА', en: 'SOLAR ENERGY', ka: 'მზის ენერგია' },
    accent: '#a85a38',
    accentSoft: '#d58b66',
    glow: 'rgba(173, 70, 34, .4)',
    haze: 'rgba(111, 39, 20, .64)',
    filter: 'sepia(.48) saturate(1.38) hue-rotate(-13deg) contrast(1.07) brightness(.84)',
    image: BOTTLE,
    price: 98,
  },
  {
    id: 'obsidian',
    name: 'KARTLI',
    subtitle: { ru: 'СДЕРЖАННОСТЬ И СТИЛЬ', en: 'RESTRAINT & STYLE', ka: 'თავშეკავება და სტილი' },
    accent: '#9da0a2',
    accentSoft: '#e6e7e8',
    glow: 'rgba(151, 157, 163, .22)',
    haze: 'rgba(35, 39, 43, .7)',
    filter: 'grayscale(.86) saturate(.28) contrast(1.27) brightness(.7)',
    image: BOTTLE,
    price: 102,
  },
];

const copy = {
  ru: {
    nav: ['КОЛЛЕКЦИЯ', 'О НАС', 'ТЕРРУАР', 'ПРОИЗВОДСТВО', 'КОНТАКТЫ'],
    eyebrow: 'СИЛА ЗЕМЛИ. ХАРАКТЕР ВРЕМЕНИ.',
    intro: 'Премиальные вина и чача, созданные в сердце Грузии. Традиции, передающиеся из поколения в поколение, в каждой капле.',
    collection: 'ОТКРЫТЬ КОЛЛЕКЦИЮ',
    film: 'СМОТРЕТЬ ФИЛЬМ',
    rotate: 'ПОВЕРНУТЬ',
    more: 'ПОДРОБНЕЕ',
    storyKicker: 'ГРУЗИНСКАЯ ЗЕМЛЯ. ЖИВАЯ ИСТОРИЯ.',
    storyTitle: 'РОЖДЕНО ГОРАМИ\nСОЗДАНО ВРЕМЕНЕМ',
    storyBody: 'В каждой бутылке SULI — история грузинской земли, солнца, труда и настоящей страсти к ремеслу.',
    storyCta: 'УЗНАТЬ НАШУ ИСТОРИЮ',
    metrics: ['ЛЕТ ТРАДИЦИЙ', 'ОГРАНИЧЕННЫЙ\nТИРАЖ', 'НАТУРАЛЬНЫЕ\nИНГРЕДИЕНТЫ', 'СОЗДАНО\nВ ГРУЗИИ'],
    order: 'ЗАКАЗ И ДОСТАВКА',
    benefits: ['Быстрая доставка по всему миру', 'Надежная упаковка премиум-класса', 'Гарантия подлинности каждой бутылки', 'Поддержка 24/7'],
    selected: 'ВЫБРАНО',
    bottle: 'бут.',
    add: 'ДОБАВИТЬ В КОРЗИНУ',
    yourOrder: 'ВАШ ЗАКАЗ',
    total: 'Итого:',
    checkout: 'ОФОРМИТЬ ЗАКАЗ',
    continue: 'ПРОДОЛЖИТЬ ПОКУПКИ',
  },
  en: {
    nav: ['COLLECTION', 'ABOUT', 'TERROIR', 'MAKING', 'CONTACTS'],
    eyebrow: 'THE FORCE OF EARTH. THE CHARACTER OF TIME.',
    intro: 'Premium Georgian wine and chacha shaped in the heart of Georgia. A living tradition carried from one generation to the next.',
    collection: 'OPEN COLLECTION',
    film: 'WATCH THE FILM',
    rotate: 'ROTATE',
    more: 'DISCOVER',
    storyKicker: 'GEORGIAN EARTH. A LIVING STORY.',
    storyTitle: 'BORN BY MOUNTAINS\nSHAPED BY TIME',
    storyBody: 'Every bottle of SULI carries Georgian land, sun, craft and a devotion to making something that lasts.',
    storyCta: 'OUR STORY',
    metrics: ['YEARS OF TRADITION', 'LIMITED\nRELEASE', 'NATURAL\nINGREDIENTS', 'MADE IN\nGEORGIA'],
    order: 'ORDER & DELIVERY',
    benefits: ['Fast worldwide delivery', 'Premium protective packaging', 'Authenticity guaranteed for every bottle', 'Support 24/7'],
    selected: 'SELECTED',
    bottle: 'btl.',
    add: 'ADD TO CART',
    yourOrder: 'YOUR ORDER',
    total: 'Total:',
    checkout: 'CHECKOUT',
    continue: 'CONTINUE SHOPPING',
  },
  ka: {
    nav: ['კოლექცია', 'ჩვენ შესახებ', 'ტერუარი', 'წარმოება', 'კონტაქტი'],
    eyebrow: 'მიწის ძალა. დროის ხასიათი.',
    intro: 'პრემიუმ ქართული ღვინო და ჭაჭა, შექმნილი საქართველოს გულში. ტრადიცია, რომელიც თაობიდან თაობას გადაეცემა.',
    collection: 'კოლექციის ნახვა',
    film: 'ფილმის ნახვა',
    rotate: 'მობრუნება',
    more: 'გაიგე მეტი',
    storyKicker: 'ქართული მიწა. ცოცხალი ისტორია.',
    storyTitle: 'მთებით დაბადებული\nდროით შექმნილი',
    storyBody: 'SULI-ის თითოეულ ბოთლშია ქართული მიწის, მზის, შრომისა და ნამდვილი ხელობის ისტორია.',
    storyCta: 'ჩვენი ისტორია',
    metrics: ['წლის ტრადიცია', 'შეზღუდული\nტირაჟი', '100% ბუნებრივი\nინგრედიენტები', 'შექმნილია\nსაქართველოში'],
    order: 'შეკვეთა და მიწოდება',
    benefits: ['სწრაფი მიწოდება მთელ მსოფლიოში', 'პრემიუმ კლასის დაცული შეფუთვა', 'თითოეული ბოთლის ავთენტურობის გარანტია', 'მხარდაჭერა 24/7'],
    selected: 'არჩეულია',
    bottle: 'ბოთ.',
    add: 'კალათაში დამატება',
    yourOrder: 'თქვენი შეკვეთა',
    total: 'ჯამი:',
    checkout: 'შეკვეთის გაფორმება',
    continue: 'შოპინგის გაგრძელება',
  },
} satisfies Record<Lang, Record<string, unknown>>;

function Mark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="1" opacity=".55" />
      <path d="M21 44 32 13l11 31M24 36h16M27 27h10M19 21c7 2 10 7 13 12 3-5 6-10 13-12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 13v38" stroke="currentColor" strokeWidth=".8" opacity=".65" />
    </svg>
  );
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function SuliMaster() {
  const [lang, setLang] = useState<Lang>('ru');
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<Record<ProductId, number>>({ gold: 1, silver: 2, copper: 0, obsidian: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const t = copy[lang];
  const product = products[active];
  const total = useMemo(() => products.reduce((sum, item) => sum + item.price * cart[item.id], 0), [cart]);

  const themeStyle = {
    '--accent': product.accent,
    '--accent-soft': product.accentSoft,
    '--glow': product.glow,
    '--haze': product.haze,
    '--tilt-x': `${tilt.x}deg`,
    '--tilt-y': `${tilt.y}deg`,
  } as CSSProperties;

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const r = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - r.left) / r.width - 0.5;
    const py = (event.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 3.5, y: px * 4.2 });
  };

  const addCurrent = () => {
    setCart((prev) => ({ ...prev, [product.id]: prev[product.id] + quantity }));
  };

  return (
    <main className="suli" style={themeStyle}>
      <header className="topbar">
        <a className="brand" href="#hero" aria-label="SULI home">
          <span className="brand-mark"><Mark size={34} /></span>
          <span>SULI</span>
        </a>
        <nav className="nav">
          <a href="#collection">{(t.nav as string[])[0]}⌄</a>
          <a href="#story">{(t.nav as string[])[1]}</a>
          <a href="#story">{(t.nav as string[])[2]}</a>
          <a href="#order">{(t.nav as string[])[3]}</a>
          <a href="#footer">{(t.nav as string[])[4]}</a>
        </nav>
        <div className="tools">
          <div className="language" aria-label="Language">
            {(['ru', 'en', 'ka'] as Lang[]).map((item) => (
              <button key={item} className={lang === item ? 'active' : ''} onClick={() => setLang(item)}>{item.toUpperCase()}</button>
            ))}
          </div>
          <span className="divider" />
          <span className="cart-icon">⌁</span>
          <span className="cart-count">{Object.values(cart).reduce((a, b) => a + b, 0)}</span>
        </div>
      </header>

      <section id="hero" className={`hero theme-${product.id}`} onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
        <div className="hero-atmosphere" />
        <div className="hero-rock rock-a" />
        <div className="hero-rock rock-b" />
        <div className="hero-rock rock-c" />

        <div className="hero-copy">
          <div className="eyebrow"><Mark size={48} /><span>{t.eyebrow as string}</span></div>
          <h1>SULI</h1>
          <p>{t.intro as string}</p>
          <div className="hero-actions">
            <a className="primary" href="#collection">{t.collection as string}<Arrow /></a>
            <button className="secondary"><span className="play">▶</span>{t.film as string}</button>
          </div>
          <div className="pager-small"><span>0{active + 1}</span><span>/ 04</span><i /></div>
        </div>

        <div className="hero-product" key={product.id}>
          <div className="product-halo" />
          <img
            src={product.image}
            alt={`SULI ${product.name}`}
            draggable={false}
            style={{ filter: product.filter }}
          />
          <div className="bottle-overlay">
            <span className="coin" />
            <strong>SULI</strong>
            <small>{product.name}</small>
            <em>001 / 777</em>
          </div>
          <div className="rotate"><span>360°</span><small>{t.rotate as string}</small></div>
        </div>

        <div className="hero-index" aria-label="Bottle themes">
          {products.map((item, index) => (
            <button key={item.id} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
              <span /><b>0{index + 1}</b>
            </button>
          ))}
        </div>
      </section>

      <section id="collection" className="collection">
        <button className="side-arrow left" onClick={() => setActive((active + products.length - 1) % products.length)} aria-label="Previous">‹</button>
        <div className="product-grid">
          {products.map((item, index) => (
            <button
              key={item.id}
              className={`product-card ${active === index ? 'active' : ''}`}
              onClick={() => setActive(index)}
              style={{ '--card-accent': item.accent } as CSSProperties}
            >
              <div className="card-head">
                <strong>{item.name}</strong>
                <span>{item.subtitle[lang]}</span>
              </div>
              <div className="card-image-wrap">
                <div className="card-smoke" />
                <img src={item.image} alt="" style={{ filter: item.filter }} />
                <span className="card-medallion" />
              </div>
              <div className="card-footer"><span>{t.more as string}</span><i>＋</i></div>
            </button>
          ))}
        </div>
        <button className="side-arrow right" onClick={() => setActive((active + 1) % products.length)} aria-label="Next">›</button>
      </section>

      <section id="story" className="story">
        <div className="mountain-layer mountain-back" />
        <div className="mountain-layer mountain-mid" />
        <div className="mountain-layer mountain-front" />
        <div className="story-light" />
        <div className="story-copy">
          <span>{t.storyKicker as string}</span>
          <h2>{(t.storyTitle as string).split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{t.storyBody as string}</p>
          <a href="#order">{t.storyCta as string}<Arrow /></a>
        </div>
        <div className="metrics">
          <div><Mark size={38} /><strong>1500+</strong><span>{((t.metrics as string[])[0]).replace('\n', ' ')}</span></div>
          <div><Mark size={38} /><strong>77</strong><span>{((t.metrics as string[])[1]).replace('\n', ' ')}</span></div>
          <div><Mark size={38} /><strong>100%</strong><span>{((t.metrics as string[])[2]).replace('\n', ' ')}</span></div>
          <div><Mark size={38} /><strong>⌂</strong><span>{((t.metrics as string[])[3]).replace('\n', ' ')}</span></div>
        </div>
      </section>

      <section id="order" className="order">
        <div className="benefits">
          <h3>{t.order as string}</h3>
          {(t.benefits as string[]).map((benefit, index) => (
            <div className="benefit" key={benefit}><span>{['▱', '◇', '♙', '?'][index]}</span><p>{benefit}</p></div>
          ))}
        </div>

        <div className="order-product">
          <div className="order-bottle"><img src={product.image} alt="" style={{ filter: product.filter }} /></div>
          <div className="order-info">
            <span>{t.selected as string}</span>
            <h3>{product.name}</h3>
            <small>DRY RED WINE · 2023</small>
            <p>{product.subtitle[lang]}. 001 / 777. GEORGIA.</p>
            <strong>${product.price}</strong>
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>＋</button>
            </div>
            <button className="add" onClick={addCurrent}>{t.add as string}</button>
          </div>
        </div>

        <div className="checkout-box">
          <h3>{t.yourOrder as string}</h3>
          <div className="checkout-items">
            {products.filter((item) => cart[item.id] > 0).map((item) => (
              <div key={item.id}><span>{item.name}</span><small>{cart[item.id]} {t.bottle as string}</small><strong>${item.price * cart[item.id]}</strong></div>
            ))}
          </div>
          <div className="checkout-total"><span>{t.total as string}</span><strong>${total}</strong></div>
          <button className="checkout">{t.checkout as string}</button>
          <button className="continue">{t.continue as string}</button>
        </div>
      </section>

      <footer id="footer" className="footer">
        <div className="brand"><span className="brand-mark"><Mark size={34} /></span><span>SULI</span></div>
        <p>GEORGIA · KAKHETI · EDITION 001 / 777</p>
        <p>© 2026 SULI</p>
      </footer>

      <style jsx>{`
        .suli{--accent:#b98752;--accent-soft:#e1b77e;--glow:rgba(174,104,45,.36);--haze:rgba(105,55,25,.56);min-height:100vh;background:#070706;color:#eee9e1;font-family:Arial,Helvetica,sans-serif;letter-spacing:.06em;transition:background 900ms ease,color 600ms ease}
        .suli *{box-sizing:border-box}.suli a{color:inherit;text-decoration:none}.suli button{font-family:inherit}.topbar{height:70px;position:relative;z-index:30;display:grid;grid-template-columns:220px 1fr 245px;align-items:center;padding:0 34px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(6,6,5,.9);backdrop-filter:blur(18px)}
        .brand{display:flex;align-items:center;gap:12px;font-family:Georgia,'Times New Roman',serif;font-size:25px;letter-spacing:.22em}.brand-mark{color:var(--accent-soft);display:grid;place-items:center;transition:color 700ms ease}.nav{display:flex;justify-content:center;gap:42px;font-size:10px;color:rgba(244,238,229,.68);letter-spacing:.17em}.nav a{transition:color .25s}.nav a:hover{color:var(--accent-soft)}.tools{display:flex;justify-content:flex-end;align-items:center;gap:12px;font-size:10px}.language{display:flex;gap:7px}.language button{border:0;background:none;color:#777;padding:3px;cursor:pointer;font-size:9px}.language button.active{color:var(--accent-soft)}.divider{height:24px;width:1px;background:rgba(255,255,255,.15);margin:0 4px}.cart-icon{font-size:18px;transform:rotate(-8deg)}
        .hero{position:relative;height:min(780px,calc(100vh - 70px));min-height:650px;overflow:hidden;background:radial-gradient(circle at 78% 42%,var(--glow) 0%,transparent 27%),radial-gradient(circle at 60% 85%,var(--haze),transparent 38%),linear-gradient(90deg,#080807 0%,#080807 35%,#0d0c0a 70%,#060606 100%);transition:background 1s ease}
        .hero:after{content:'';position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(90deg,rgba(3,3,3,.92) 0%,rgba(4,4,3,.78) 30%,rgba(0,0,0,.08) 57%,rgba(0,0,0,.15) 100%),linear-gradient(0deg,rgba(0,0,0,.5),transparent 28%,transparent 78%,rgba(0,0,0,.22))}
        .hero-atmosphere{position:absolute;inset:-20%;z-index:0;background:radial-gradient(ellipse at 75% 32%,var(--glow),transparent 26%),radial-gradient(ellipse at 72% 62%,var(--haze),transparent 36%);filter:blur(40px);animation:breathe 8s ease-in-out infinite alternate;transition:background 1s ease}
        .hero-rock{position:absolute;z-index:1;background:linear-gradient(135deg,#171613 0%,#030303 48%,#1c1b18 78%,#050505 100%);filter:drop-shadow(0 30px 30px rgba(0,0,0,.8));opacity:.92;transition:filter 1s ease}.rock-a{width:39vw;height:76%;right:11%;bottom:-16%;clip-path:polygon(47% 0,100% 85%,74% 100%,22% 93%,0 54%)}.rock-b{width:22vw;height:47%;right:0;bottom:2%;clip-path:polygon(45% 0,100% 74%,82% 100%,5% 90%,0 44%);opacity:.72}.rock-c{width:21vw;height:34%;right:39%;bottom:-4%;clip-path:polygon(50% 0,100% 82%,76% 100%,0 88%,7% 42%);opacity:.55}
        .hero-copy{position:relative;z-index:8;width:53%;height:100%;padding:76px 0 0 5.8vw}.eyebrow{display:flex;align-items:center;gap:18px;color:var(--accent-soft);transition:color .8s}.eyebrow span{font-size:11px;color:rgba(245,240,232,.65);letter-spacing:.18em}.hero h1{font-family:Georgia,'Times New Roman',serif;font-size:clamp(92px,10vw,154px);font-weight:400;letter-spacing:.18em;line-height:.86;margin:36px 0 31px;background:linear-gradient(110deg,var(--accent-soft),#fff3e2 42%,var(--accent) 80%);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 2px 12px var(--glow));transition:filter .8s}.hero-copy>p{max-width:490px;font-size:12px;line-height:1.9;color:rgba(239,234,226,.58);letter-spacing:.02em}.hero-actions{display:flex;align-items:center;gap:18px;margin-top:32px}.primary,.secondary{height:48px;border:1px solid color-mix(in srgb,var(--accent) 58%,transparent);display:flex;align-items:center;justify-content:center;gap:22px;padding:0 26px;font-size:9px;letter-spacing:.13em;cursor:pointer;transition:.3s}.primary{background:linear-gradient(90deg,color-mix(in srgb,var(--accent) 86%,#47301e),var(--accent));color:#100d09;min-width:206px}.primary:hover{filter:brightness(1.12)}.secondary{background:rgba(0,0,0,.25);color:#ddd;min-width:190px}.play{height:28px;width:28px;border:1px solid var(--accent);border-radius:50%;display:grid;place-items:center;font-size:8px;color:var(--accent-soft)}.pager-small{position:absolute;bottom:66px;left:5.8vw;display:flex;align-items:center;gap:10px;font-size:9px;color:var(--accent-soft)}.pager-small i{display:block;width:74px;height:1px;background:linear-gradient(90deg,var(--accent),rgba(255,255,255,.12));margin-left:6px}
        .hero-product{position:absolute;z-index:7;right:9.5%;top:-4%;width:44%;height:104%;display:flex;justify-content:center;align-items:center;perspective:1200px;animation:reveal .65s ease both}.hero-product img{width:min(77%,535px);height:94%;object-fit:cover;object-position:50% 52%;border-radius:1px;mask-image:linear-gradient(90deg,transparent 0%,#000 17%,#000 87%,transparent 100%),linear-gradient(0deg,transparent 0%,#000 10%,#000 92%,transparent 100%);mask-composite:intersect;mix-blend-mode:screen;opacity:.96;transform:rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(1.03);transform-origin:center;transition:transform .25s ease,filter .8s ease}.product-halo{position:absolute;width:60%;height:70%;border-radius:50%;background:var(--glow);filter:blur(70px);opacity:.75;transition:background .8s}.bottle-overlay{position:absolute;top:41%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;color:var(--accent-soft);text-shadow:0 2px 20px #000;pointer-events:none}.bottle-overlay .coin{height:38px;width:38px;border-radius:50%;border:1px solid var(--accent);box-shadow:inset 0 0 0 4px rgba(0,0,0,.35),0 0 15px var(--glow);margin-bottom:15px;background:radial-gradient(circle,var(--accent-soft),var(--accent) 62%,#271a10 64%)}.bottle-overlay strong{font-family:Georgia,serif;font-size:28px;font-weight:400;letter-spacing:.22em}.bottle-overlay small{font-size:8px;letter-spacing:.24em;margin-top:8px}.bottle-overlay em{font-size:7px;font-style:normal;margin-top:25px;letter-spacing:.19em}.rotate{position:absolute;right:1%;bottom:18%;display:flex;flex-direction:column;align-items:center;color:var(--accent-soft)}.rotate span{height:48px;width:48px;border:1px solid var(--accent);border-radius:50%;display:grid;place-items:center;font-size:10px}.rotate small{font-size:7px;margin-top:8px;letter-spacing:.12em;color:#aaa}.hero-index{position:absolute;right:5.1%;top:31%;z-index:10;display:flex;flex-direction:column;gap:20px}.hero-index:before{content:'';position:absolute;left:7px;top:13px;bottom:13px;width:1px;background:linear-gradient(var(--accent),rgba(255,255,255,.12))}.hero-index button{position:relative;z-index:1;border:0;background:none;color:#777;display:flex;align-items:center;gap:13px;cursor:pointer}.hero-index span{width:15px;height:15px;border:1px solid #666;border-radius:50%;background:#0b0b0b;transition:.3s}.hero-index b{font-size:9px;font-weight:400}.hero-index button.active{color:var(--accent-soft)}.hero-index button.active span{border:4px solid var(--accent);box-shadow:0 0 0 3px rgba(0,0,0,.8),0 0 18px var(--glow)}
        .collection{position:relative;z-index:12;margin-top:-82px;min-height:500px;padding:0 7.5vw 38px;background:linear-gradient(180deg,rgba(6,6,5,.3),#070706 48%);border-top:1px solid rgba(255,255,255,.12)}.product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;max-width:1320px;margin:auto;border-left:1px solid rgba(255,255,255,.12)}.product-card{position:relative;height:430px;padding:0;border:0;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(14,13,12,.68),rgba(6,6,6,.97));color:#ddd;cursor:pointer;overflow:hidden;transition:transform .45s,background .45s,box-shadow .45s}.product-card:hover{transform:translateY(-7px);z-index:2}.product-card.active{outline:1px solid var(--card-accent);outline-offset:-1px;background:linear-gradient(180deg,color-mix(in srgb,var(--card-accent) 12%,#0d0c0b),#070706);box-shadow:0 0 42px color-mix(in srgb,var(--card-accent) 13%,transparent)}.card-head{position:absolute;z-index:4;top:22px;left:10px;right:10px;text-align:center}.card-head strong{display:block;font-family:Georgia,serif;font-weight:400;font-size:16px;letter-spacing:.15em;color:color-mix(in srgb,var(--card-accent) 80%,#ddd)}.card-head span{display:block;font-size:8px;margin-top:7px;color:#8b8986;letter-spacing:.12em}.card-image-wrap{position:absolute;inset:58px 10px 44px;overflow:hidden}.card-image-wrap img{width:100%;height:100%;object-fit:cover;object-position:50% 50%;mask-image:linear-gradient(180deg,transparent,#000 10%,#000 88%,transparent);mix-blend-mode:screen;transition:filter .5s,transform .5s}.product-card:hover img{transform:scale(1.035)}.card-smoke{position:absolute;inset:15% 0;background:radial-gradient(circle at 50% 60%,color-mix(in srgb,var(--card-accent) 22%,transparent),transparent 52%);filter:blur(22px)}.card-medallion{position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);width:24px;height:24px;border-radius:50%;border:1px solid var(--card-accent);box-shadow:0 0 16px color-mix(in srgb,var(--card-accent) 40%,transparent)}.card-footer{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);display:flex;align-items:center;gap:11px;font-size:7px;color:#a09c97;letter-spacing:.12em}.card-footer i{font-style:normal;height:24px;width:24px;border:1px solid var(--card-accent);border-radius:50%;display:grid;place-items:center;color:var(--card-accent)}.side-arrow{position:absolute;top:45%;z-index:10;height:43px;width:43px;border-radius:50%;border:1px solid rgba(255,255,255,.24);background:rgba(7,7,7,.62);color:var(--accent-soft);font-size:24px;cursor:pointer}.side-arrow.left{left:2.8vw}.side-arrow.right{right:2.8vw}
        .story{position:relative;min-height:560px;overflow:hidden;background:#080706;border-top:1px solid rgba(255,255,255,.08)}.mountain-layer{position:absolute;left:-5%;right:-5%;bottom:-1px;transform-origin:bottom;background:linear-gradient(145deg,#171715,#050505 55%,#1f1d19);filter:drop-shadow(0 -2px 18px rgba(0,0,0,.45));transition:background .8s}.mountain-back{height:78%;opacity:.45;clip-path:polygon(0 77%,9% 61%,18% 72%,27% 42%,36% 62%,45% 31%,55% 58%,65% 35%,73% 54%,82% 27%,92% 55%,100% 43%,100% 100%,0 100%)}.mountain-mid{height:61%;opacity:.72;clip-path:polygon(0 73%,9% 54%,19% 71%,29% 36%,40% 72%,52% 46%,62% 67%,70% 32%,79% 71%,90% 43%,100% 61%,100% 100%,0 100%)}.mountain-front{height:42%;opacity:.94;clip-path:polygon(0 68%,12% 48%,23% 71%,35% 38%,48% 69%,60% 47%,71% 72%,84% 35%,100% 61%,100% 100%,0 100%)}.story-light{position:absolute;inset:0;background:radial-gradient(ellipse at 60% 25%,var(--glow),transparent 22%),linear-gradient(100deg,#070706 6%,transparent 55%);transition:background .8s}.story-copy{position:relative;z-index:4;padding:72px 0 70px 5.8vw;width:42%}.story-copy>span{font-size:8px;color:#8e8b86}.story h2{font-family:Georgia,serif;font-size:42px;font-weight:400;line-height:1.12;letter-spacing:.08em;margin:24px 0;color:var(--accent-soft);text-shadow:0 0 20px rgba(0,0,0,.8)}.story h2 span{display:block}.story-copy p{max-width:430px;font-size:11px;line-height:1.85;color:#95918b;letter-spacing:.02em}.story-copy a{display:flex;width:215px;height:43px;border:1px solid color-mix(in srgb,var(--accent) 60%,transparent);align-items:center;justify-content:space-around;font-size:8px;margin-top:30px;color:var(--accent-soft)}.metrics{position:absolute;z-index:5;right:5.8vw;bottom:66px;width:50%;display:grid;grid-template-columns:repeat(4,1fr)}.metrics>div{min-height:118px;border-left:1px solid rgba(255,255,255,.13);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;color:var(--accent-soft);text-align:center}.metrics svg{margin-bottom:10px}.metrics strong{font-family:Georgia,serif;font-size:28px;font-weight:400}.metrics span{font-size:7px;color:#aaa;line-height:1.4;margin-top:8px;max-width:110px}
        .order{min-height:520px;display:grid;grid-template-columns:1fr 1.1fr 1.25fr;background:linear-gradient(90deg,#090909,#100e0c 50%,#080808);border-top:1px solid rgba(255,255,255,.09)}.benefits{padding:48px 42px 40px 5.8vw;border-right:1px solid rgba(255,255,255,.08)}.order h3{font-family:Georgia,serif;font-weight:400;letter-spacing:.12em;font-size:18px;margin:0 0 32px}.benefit{display:flex;gap:14px;align-items:center;margin:22px 0;color:#8d8983}.benefit>span{width:26px;color:var(--accent);font-size:20px;text-align:center}.benefit p{margin:0;font-size:9px;line-height:1.4}.order-product{display:grid;grid-template-columns:45% 55%;border-right:1px solid rgba(255,255,255,.08);padding:34px 26px}.order-bottle{overflow:hidden;display:flex;align-items:center;justify-content:center}.order-bottle img{width:100%;height:410px;object-fit:cover;object-position:50% 50%;mask-image:linear-gradient(180deg,transparent,#000 9%,#000 90%,transparent);mix-blend-mode:screen}.order-info{padding:34px 8px}.order-info>span{font-size:7px;color:#777}.order-info h3{color:var(--accent-soft);font-size:20px;margin:12px 0 6px}.order-info small{font-size:8px;color:#a19b94}.order-info p{font-size:9px;color:#8c8883;line-height:1.6;margin:18px 0}.order-info>strong{font-family:Georgia,serif;font-size:27px;font-weight:400;color:var(--accent-soft)}.quantity{display:flex;height:32px;width:100px;border:1px solid rgba(255,255,255,.13);margin:17px 0}.quantity button,.quantity span{flex:1;border:0;background:none;color:#aaa;display:grid;place-items:center}.quantity button{cursor:pointer}.add{height:43px;width:100%;border:1px solid color-mix(in srgb,var(--accent) 55%,transparent);background:transparent;color:var(--accent-soft);font-size:8px;letter-spacing:.12em;cursor:pointer}.checkout-box{margin:37px 5.8vw 37px 38px;padding:28px;border:1px solid rgba(255,255,255,.12);align-self:start;background:rgba(8,8,8,.55)}.checkout-box h3{font-size:16px}.checkout-items>div{display:grid;grid-template-columns:1fr 55px 55px;gap:10px;margin:14px 0;font-size:8px;color:#8c8985}.checkout-items strong{text-align:right;color:#aaa}.checkout-total{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.12);padding:20px 0;margin-top:19px;font-size:11px}.checkout-total strong{font-family:Georgia,serif;font-size:20px;color:var(--accent-soft);font-weight:400}.checkout{width:100%;height:45px;background:linear-gradient(90deg,var(--accent),var(--accent-soft));border:0;color:#17110c;letter-spacing:.15em;font-size:9px;cursor:pointer}.continue{width:100%;height:34px;background:none;border:0;color:#706d68;font-size:7px;letter-spacing:.12em;cursor:pointer}.footer{height:120px;display:flex;align-items:center;justify-content:space-between;padding:0 5.8vw;border-top:1px solid rgba(255,255,255,.08);background:#050505;color:#777}.footer p{font-size:8px;letter-spacing:.14em}
        @keyframes breathe{from{transform:scale(.95) translate3d(-1%,0,0);opacity:.5}to{transform:scale(1.06) translate3d(2%,-1%,0);opacity:.9}}@keyframes reveal{from{opacity:0;transform:scale(.985)}to{opacity:1;transform:scale(1)}}
        @media(max-width:1100px){.topbar{grid-template-columns:170px 1fr 180px;padding:0 22px}.nav{gap:20px}.hero-copy{padding-left:4vw}.hero h1{font-size:105px}.hero-product{right:5%;width:48%}.hero-index{right:2.2%}.collection{padding-left:5vw;padding-right:5vw}.story-copy{padding-left:5vw}.metrics{right:4vw;width:52%}.order{grid-template-columns:.9fr 1.15fr 1.2fr}.benefits{padding-left:5vw}.checkout-box{margin-left:25px;margin-right:3vw}}
        @media(max-width:820px){.topbar{height:62px;grid-template-columns:1fr auto;padding:0 18px}.brand{font-size:20px}.nav{display:none}.tools{grid-column:2}.divider,.cart-icon,.cart-count{display:none}.hero{height:auto;min-height:900px;padding-bottom:60px}.hero-copy{width:100%;height:auto;padding:58px 22px 0;position:relative}.eyebrow span{font-size:8px}.hero h1{font-size:clamp(68px,23vw,112px);margin:28px 0 20px;letter-spacing:.13em}.hero-copy>p{max-width:420px;font-size:10px}.hero-actions{gap:9px}.primary,.secondary{height:44px;min-width:0;padding:0 15px;font-size:7px}.pager-small{display:none}.hero-product{position:relative;top:auto;right:auto;width:100%;height:510px;margin-top:8px}.hero-product img{width:100%;height:100%;object-fit:cover;mask-image:linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent),linear-gradient(180deg,transparent,#000 8%,#000 94%,transparent);mask-composite:intersect}.bottle-overlay{top:43%}.hero-index{right:17px;top:520px}.rotate{right:17px;bottom:10%}.hero-rock{display:none}.collection{margin-top:0;padding:24px 0 34px;overflow:hidden}.product-grid{grid-template-columns:repeat(4,68vw);gap:8px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 16vw;border:0;scrollbar-width:none}.product-card{height:430px;scroll-snap-align:center;border:1px solid rgba(255,255,255,.11)}.side-arrow{display:none}.story{min-height:720px}.story-copy{width:100%;padding:60px 22px}.story h2{font-size:36px}.metrics{left:22px;right:22px;bottom:45px;width:auto;grid-template-columns:repeat(2,1fr);gap:10px}.metrics>div{min-height:94px;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.25)}.order{grid-template-columns:1fr}.benefits{padding:44px 22px;border-right:0;border-bottom:1px solid rgba(255,255,255,.08)}.order-product{border-right:0;border-bottom:1px solid rgba(255,255,255,.08);padding:18px}.order-bottle img{height:360px}.checkout-box{margin:28px 22px}.footer{height:auto;min-height:150px;padding:28px 22px;flex-direction:column;align-items:flex-start;gap:15px}.footer p{margin:0}}
        @media(prefers-reduced-motion:reduce){.hero-atmosphere{animation:none}.hero-product{animation:none}.hero-product img{transition:none}.product-card{transition:none}}
      `}</style>
    </main>
  );
}
