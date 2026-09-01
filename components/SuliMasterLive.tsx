'use client';

import { useEffect } from 'react';
import SuliMaster from './SuliMaster';
import { goldBottle } from './suliAssets/gold';
import { silverBottle } from './suliAssets/silver';
import { copperBottle } from './suliAssets/copper';
import { obsidianBottle } from './suliAssets/obsidian';

const bottleAssets = [goldBottle, silverBottle, copperBottle, obsidianBottle] as const;

export default function SuliMasterLive() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.suli');
    if (!root) return;

    const getActiveIndex = () => {
      const hero = root.querySelector<HTMLElement>('.hero');
      if (!hero) return 0;
      if (hero.classList.contains('theme-silver')) return 1;
      if (hero.classList.contains('theme-copper')) return 2;
      if (hero.classList.contains('theme-obsidian')) return 3;
      return 0;
    };

    const setRealImage = (img: HTMLImageElement | null, src: string) => {
      if (!img) return;
      if (img.src !== src) img.src = src;
      img.style.filter = 'none';
      img.style.mixBlendMode = 'normal';
    };

    const applyAssets = () => {
      const active = getActiveIndex();
      setRealImage(root.querySelector<HTMLImageElement>('.hero-product img'), bottleAssets[active]);
      setRealImage(root.querySelector<HTMLImageElement>('.order-bottle img'), bottleAssets[active]);

      root.querySelectorAll<HTMLImageElement>('.product-card .card-image-wrap img').forEach((img, index) => {
        if (bottleAssets[index]) setRealImage(img, bottleAssets[index]);
      });
    };

    applyAssets();
    const observer = new MutationObserver(applyAssets);
    observer.observe(root, { subtree: true, attributes: true, attributeFilter: ['class', 'src'] });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SuliMaster />
      <style jsx global>{`
        .suli .bottle-overlay,
        .suli .card-medallion { display: none !important; }

        .suli .hero-product img,
        .suli .card-image-wrap img,
        .suli .order-bottle img {
          filter: none !important;
          mix-blend-mode: normal !important;
          transition: opacity .34s ease, transform .55s ease !important;
        }

        .suli .hero-product img {
          object-fit: cover !important;
          object-position: center 52% !important;
          mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 94%, transparent 100%),
                      linear-gradient(0deg, transparent 0%, #000 5%, #000 96%, transparent 100%) !important;
          mask-composite: intersect !important;
        }

        .suli .product-card .card-image-wrap img {
          object-position: center 50% !important;
        }

        .suli:has(.hero.theme-gold) .hero {
          background: radial-gradient(circle at 78% 38%, rgba(172,105,50,.42), transparent 30%),
                      radial-gradient(circle at 62% 80%, rgba(95,52,24,.58), transparent 42%),
                      linear-gradient(90deg,#070706 0%,#0c0906 52%,#170e08 100%) !important;
        }
        .suli:has(.hero.theme-silver) .hero {
          background: radial-gradient(circle at 78% 38%, rgba(188,203,218,.22), transparent 30%),
                      radial-gradient(circle at 62% 80%, rgba(53,65,77,.5), transparent 42%),
                      linear-gradient(90deg,#060707 0%,#090b0d 52%,#11161b 100%) !important;
        }
        .suli:has(.hero.theme-copper) .hero {
          background: radial-gradient(circle at 78% 38%, rgba(196,77,37,.43), transparent 31%),
                      radial-gradient(circle at 62% 80%, rgba(112,38,18,.64), transparent 43%),
                      linear-gradient(90deg,#080504 0%,#130805 52%,#231008 100%) !important;
        }
        .suli:has(.hero.theme-obsidian) .hero {
          background: radial-gradient(circle at 78% 38%, rgba(139,147,154,.18), transparent 29%),
                      radial-gradient(circle at 62% 80%, rgba(31,37,43,.66), transparent 43%),
                      linear-gradient(90deg,#050606 0%,#08090a 52%,#0d1012 100%) !important;
        }

        .suli .hero-product { animation: realBottleReveal .55s cubic-bezier(.2,.75,.25,1) both; }
        @keyframes realBottleReveal {
          from { opacity: 0; transform: translateY(10px) scale(.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
