// TSQ Nav Dropdowns — v2 (robust selectors)
(function(){
  'use strict';

  const NAV_DROPDOWNS = {
    'Shop All': [
      { label: 'All Fragrances', href: '/collections/all-decants' },
      { label: 'New Arrivals', href: '/collections/all?sort_by=created-descending' },
      { label: 'Best Sellers', href: '/collections/all?sort_by=best-selling' },
      { label: 'Best Sellers', href: '/collections/all?sort_by=best-selling' },
    ],
    'Brands': [
      { label: 'Lattafa', href: '/collections/lattafa' },
      { label: 'Afnan', href: '/collections/afnan' },
      { label: 'Armaf', href: '/collections/armaf' },
      { label: 'Rasasi', href: '/collections/rasasi' },
      { label: 'Gissah', href: '/collections/gissah' },
      { label: 'Rayhaan', href: '/collections/rayhaan' },
      { label: 'Fragrance World', href: '/collections/fragrance-world' },
      { label: 'Swiss Arabian', href: '/collections/swiss-arabian' },
      { label: 'Maison Alhambra', href: '/collections/maison-alhambra' },
      { label: 'Khadlaj', href: '/collections/khadlaj' },
      { label: 'Ahmed Al Maghribi', href: '/collections/ahmed-al-maghribi' },
      { label: 'Reef', href: '/collections/reef' },
      { label: 'Arabian Oud', href: '/collections/arabian-oud' },
    ],
    'Decants': [
      { label: 'All Decants', href: '/collections/all-decants' },
      { label: '5ml Samples', href: '/collections/all-decants' },
      { label: '10ml Decants', href: '/collections/all-decants' },
    ],
    'Shop by Notes': [
      { label: 'Oud & Woody', href: '/collections/oud' },
      { label: 'Fresh & Aquatic', href: '/collections/fresh-aquatic' },
      { label: 'Oriental & Amber', href: '/collections/oriental-amber' },
      { label: 'Floral & Rose', href: '/collections/floral-rose' },
      { label: 'Sweet & Vanilla', href: '/collections/gourmand-sweet' },
    ],
    'Shop by Gender': [
      { label: "Men's Fragrances", href: '/collections/masculine' },
      { label: "Women's Fragrances", href: '/collections/feminine' },
      { label: 'Unisex', href: '/collections/unisex' },
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
        background: #1A1410;
        border: 1px solid rgba(201,169,110,0.3);
        border-top: 2px solid #C9A96E;
        box-shadow: 0 16px 48px rgba(0,0,0,0.75);
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
        font-size: 12px !important;
        letter-spacing: 0.08em !important;
        color: rgba(250,247,242,0.82) !important;
        text-decoration: none !important;
        text-transform: uppercase !important;
        background: transparent !important;
        transition: color 0.15s, background 0.15s !important;
      }
      .tsq-nav-dropdown a:hover {
        color: #C9A96E !important;
        background: rgba(201,169,110,0.07) !important;
      }
      .tsq-nav-chevron {
        font-size: 9px;
        opacity: 0.5;
        margin-left: 3px;
        display: inline-block;
        vertical-align: middle;
      }
    `;
    document.head.appendChild(style);
  }

  function buildPanel(items) {
    const div = document.createElement('div');
    div.className = 'tsq-nav-dropdown';
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

      item.appendChild(buildPanel(dropData));
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
