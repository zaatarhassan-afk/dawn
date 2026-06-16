// TSQ Nav Dropdowns — v3 light theme
(function(){
  'use strict';

  const NAV_DROPDOWNS = {
    'Shop All': [
      { label: 'All Fragrances',     href: '/collections/all-decants' },
      { label: 'New Arrivals',       href: '/collections/all-decants?sort_by=created-descending' },
      { label: 'Best Sellers',       href: '/collections/all-decants?sort_by=best-selling' },
    ],
    'Brands': [
      { label: 'Afnan',              href: '/collections/afnan' },
      { label: 'Ahmed Al Maghribi',  href: '/collections/ahmed-al-maghribi' },
      { label: 'Armaf',              href: '/collections/armaf' },
      { label: 'Arabian Oud',        href: '/collections/arabian-oud' },
      { label: 'Fragrance World',    href: '/collections/fragrance-world' },
      { label: 'Gissah',             href: '/collections/gissah' },
      { label: 'Khadlaj',            href: '/collections/khadlaj' },
      { label: 'Lattafa',            href: '/collections/lattafa' },
      { label: 'Maison Alhambra',    href: '/collections/maison-alhambra' },
      { label: 'Rasasi',             href: '/collections/rasasi' },
      { label: 'Rayhaan',            href: '/collections/rayhaan' },
      { label: 'Reef',               href: '/collections/reef' },
      { label: 'Swiss Arabian',      href: '/collections/swiss-arabian' },
    ],
    'Shop by Notes': [
      { label: 'Oud & Woody',        href: '/collections/oud' },
      { label: 'Floral & Rose',      href: '/collections/floral-rose' },
      { label: 'Fresh & Aquatic',    href: '/collections/fresh-aquatic' },
      { label: 'Oriental & Amber',   href: '/collections/oriental-amber' },
      { label: 'Gourmand & Sweet',   href: '/collections/gourmand-sweet' },
      { label: 'White Musk',         href: '/collections/musk-clean' },
      { label: 'Woody & Spicy',      href: '/collections/woody-spicy' },
      { label: 'Tobacco & Incense',  href: '/collections/tobacco-incense' },
    ],
    'Shop by Gender': [
      { label: "Men's",              href: '/collections/masculine' },
      { label: "Women's",            href: '/collections/feminine' },
      { label: 'Unisex',             href: '/collections/unisex' },
    ],
    'Decants': [
      { label: 'All Decants',        href: '/collections/all-decants' },
      { label: '5ml Samples',        href: '/collections/5ml-decants' },
      { label: '10ml Decants',       href: '/collections/10ml-decants' },
    ],
  };

  if(!document.getElementById('tsq-dropdown-css')) {
    const style = document.createElement('style');
    style.id = 'tsq-dropdown-css';
    style.textContent = `
      .tsq-nav-parent { position: relative !important; }
      .tsq-nav-dropdown {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-4px);
        min-width: 210px;
        background: #FAF8F3;
        border: 1px solid rgba(198,161,91,0.3);
        border-top: 2px solid #C6A15B;
        box-shadow: 0 12px 40px rgba(9,8,7,0.12);
        padding: 6px 0;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.18s ease, visibility 0.18s ease, transform 0.18s ease;
        z-index: 9999;
        white-space: nowrap;
      }
      .tsq-nav-parent:hover .tsq-nav-dropdown,
      .tsq-nav-parent:focus-within .tsq-nav-dropdown {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateX(-50%) translateY(0);
      }
      .tsq-nav-dropdown a {
        display: block !important;
        padding: 9px 20px !important;
        font-family: 'Manrope', sans-serif !important;
        font-size: 11px !important;
        letter-spacing: 0.08em !important;
        color: rgba(9,8,7,0.72) !important;
        text-decoration: none !important;
        text-transform: uppercase !important;
        background: transparent !important;
        transition: color 0.15s, background 0.15s !important;
        border-bottom: 1px solid rgba(9,8,7,0.06) !important;
      }
      .tsq-nav-dropdown a:last-child { border-bottom: none !important; }
      .tsq-nav-dropdown a:hover {
        color: #C6A15B !important;
        background: rgba(198,161,91,0.07) !important;
      }
      .tsq-nav-dropdown--brands {
        min-width: 340px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 6px 0;
        left: 0;
        transform: translateY(-4px);
      }
      .tsq-nav-parent:hover .tsq-nav-dropdown--brands,
      .tsq-nav-parent:focus-within .tsq-nav-dropdown--brands {
        transform: translateY(0);
      }
      .tsq-nav-chevron {
        font-size: 9px;
        opacity: 0.45;
        margin-left: 3px;
        display: inline-block;
        vertical-align: middle;
      }
    `;
    document.head.appendChild(style);
  }

  function buildPanel(label, items) {
    const div = document.createElement('div');
    div.className = label === 'Brands' ? 'tsq-nav-dropdown tsq-nav-dropdown--brands' : 'tsq-nav-dropdown';
    items.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      div.appendChild(a);
    });
    return div;
  }

  function attach() {
    const selectors = [
      '.header__menu-item',
      '.header__inline-menu > ul > li',
      'header nav > ul > li',
      '.site-nav > li',
      '.nav-links > li',
      'nav[role="navigation"] > ul > li',
      '.navigation > ul > li',
    ];

    let navItems = [];
    for(const sel of selectors) {
      navItems = Array.from(document.querySelectorAll(sel));
      if(navItems.length > 0) break;
    }

    if(navItems.length === 0) {
      navItems = Array.from(document.querySelectorAll('header a')).map(a => a.parentElement);
    }

    navItems.forEach(item => {
      if(!item || item.dataset.tsqDone) return;
      const link = item.querySelector('a') || item;
      const label = (link.textContent || '').trim().replace(/\s*▾\s*$/, '');
      const dropData = NAV_DROPDOWNS[label];
      if(!dropData) return;

      item.dataset.tsqDone = '1';
      item.classList.add('tsq-nav-parent');
      item.style.position = 'relative';

      const chevron = document.createElement('span');
      chevron.className = 'tsq-nav-chevron';
      chevron.textContent = '▾';
      link.appendChild(chevron);

      item.appendChild(buildPanel(label, dropData));
    });
  }

  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
  setTimeout(attach, 800);
  setTimeout(attach, 2000);
})();
