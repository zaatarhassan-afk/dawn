// The Scent Quarter — Nav Dropdowns v5
// Uses ACTUAL existing collection handles (verified against store)
(function() {
  'use strict';

  var MENUS = {
    'Shop All': [
      { label: 'All Products',  url: '/collections/all' },
      { label: 'All Decants',   url: '/collections/all-decants' },
      { label: 'New Arrivals',  url: '/collections/all?sort_by=created-descending' },
      { label: 'Best Sellers',  url: '/collections/all?sort_by=best-selling' },
    ],
    'Brands': [
      { label: 'Afnan',           url: '/collections/afnan' },
      { label: 'Armaf',           url: '/collections/armaf' },
      { label: 'Gissah',          url: '/collections/gissah' },
      { label: 'Iibaar',          url: '/collections/iibaar' },
      { label: 'Lattafa',         url: '/collections/lattafa' },
      { label: 'Maison Asrar',    url: '/collections/maison-asrar' },
      { label: 'Milestone',       url: '/collections/milestone' },
      { label: 'Rasasi',          url: '/collections/rasasi' },
      { label: 'Reef',            url: '/collections/reef' },
      { label: 'Swiss Arabian',   url: '/collections/swiss-arabian' },
      { label: '— All Houses',    url: '/pages/brands' },
    ],
    'Decants': [
      { label: 'All Decants',     url: '/collections/all-decants' },
      { label: '5ml Decants',     url: '/collections/decants-5ml' },
      { label: '10ml Decants',    url: '/collections/decants-10ml' },
    ],
    'Shop by Notes': [
      { label: 'Oud & Woody',     url: '/collections/oud' },
      { label: 'Fresh & Aquatic', url: '/collections/fresh-aquatic' },
      { label: 'Oriental & Amber',url: '/collections/oriental-amber' },
      { label: 'Floral & Rose',   url: '/collections/floral-rose' },
      { label: 'Gourmand & Sweet',url: '/collections/gourmand-sweet' },
    ],
    'Shop by Gender': [
      { label: "Men's Fragrances",   url: '/collections/masculine' },
      { label: "Women's Fragrances", url: '/collections/feminine' },
      { label: 'Unisex',             url: '/collections/unisex' },
    ],
  };

  function buildDropdowns() {
    var items = document.querySelectorAll(
      '.header__menu-item, nav > ul > li, [class*="nav__item"], [class*="menu__item"], .header__navigation li'
    );
    items.forEach(function(item) {
      var a = item.querySelector(':scope > a');
      if (!a || item.querySelector('.tsq-dropdown')) return;
      var label = a.textContent.trim();
      var menu = MENUS[label];
      if (!menu) return;

      item.style.position = 'relative';
      var dd = document.createElement('div');
      dd.className = 'tsq-dropdown';
      dd.innerHTML = menu.map(function(m) {
        return '<a href="' + m.url + '">' + m.label + '</a>';
      }).join('');
      item.appendChild(dd);

      a.addEventListener('click', function(e) {
        var isOpen = dd.classList.contains('open');
        document.querySelectorAll('.tsq-dropdown.open').forEach(function(d) {
          d.classList.remove('open');
        });
        if (!isOpen) {
          e.preventDefault();
          dd.classList.add('open');
        }
      });
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.header__menu-item, nav > ul > li, [class*="nav__item"]')) {
        document.querySelectorAll('.tsq-dropdown.open').forEach(function(d) {
          d.classList.remove('open');
        });
      }
    }, { capture: true });
  }

  buildDropdowns();
  setTimeout(buildDropdowns, 500);
  setTimeout(buildDropdowns, 1500);
  setTimeout(buildDropdowns, 3000);
})();
