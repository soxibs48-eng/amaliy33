/**
 * ZERO DESIGN STUDIO — JAVASCRIPT CONTROLLER
 * Amaliy Ish 33 — Master ES6 Module
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileDrawer();
  initPortfolioFilter();
  initProjectModal();
  initMaterialityExplorer();
  initCounters();
  initContactForm();
});

/* 1. Theme Toggle (Light / Dark Mode) */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('zero-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('zero-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    toggleBtn.innerHTML = theme === 'dark' 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`);
  }
}

/* 2. Header Scroll Elevation */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* 3. Mobile Drawer Navigation */
function initMobileDrawer() {
  const burgerBtn = document.getElementById('burgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  if (!burgerBtn || !drawer) return;

  const toggleDrawer = (open) => {
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burgerBtn.addEventListener('click', () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));

  drawer.querySelectorAll('.drawer-links a').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });
}

/* 4. Portfolio Filter */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* 5. Project Lightbox Modal */
const projectData = {
  '1': {
    title: 'Villa Monolith',
    location: 'Kyoto, Japan',
    year: '2025',
    category: 'Architecture / Sustainable',
    image: 'assets/project-1.jpg',
    lead: 'Minimalist concrete and charred cedar residence seamlessly embedded within an ancient bamboo sanctuary.',
    description: 'Designed as a dialogue between architectural permanence and organic transience, Villa Monolith sits gently on a cantilevered foundation to preserve tree root networks. Features triple-glazed acoustic curtain walls, passive solar thermal massing, and rainwater harvesting cisterns.',
    specs: ['Site Area: 1,840 m²', 'Structure: Carbon-Cured Concrete & Japanese Cypress', 'Energy Rating: Net Zero Standard']
  },
  '2': {
    title: 'The Travertine Sanctuary',
    location: 'Milan, Italy',
    year: '2024',
    category: 'Interior Architecture',
    image: 'assets/project-2.jpg',
    lead: 'A 420m² penthouse renovation balancing raw Roman travertine with monolithic walnut volumes.',
    description: 'Every surface in the Travertine Sanctuary is custom-detailed to honor authentic materiality. From custom bronze door hardware to invisible acoustic baffles, this interior offers an oasis of pure silence amid Milan’s vibrant design district.',
    specs: ['Area: 420 m²', 'Materials: Navona Travertine, Brushed Brass, Smoked Oak', 'Lighting: Custom Viabizzuno architectural fixtures']
  },
  '3': {
    title: 'Zero Flagship Pavilion',
    location: 'Seoul, South Korea',
    year: '2025',
    category: 'Spatial & Retail',
    image: 'assets/project-3.jpg',
    lead: 'An experiential flagship store featuring curved rammed-earth monoliths and interactive kinetic lighting.',
    description: 'A revolutionary retail experience that reimagines commerce as a cultural sanctuary. Visitors flow through subterranean curved galleries of locally sourced clay before emerging into a sun-filled atrium.',
    specs: ['Floors: 3 Levels (1,200 m²)', 'Carbon Footprint: -14% (Net Negative Carbon)', 'Honors: Red Dot Best of the Best 2025']
  },
  '4': {
    title: 'Lumina Nordic Retreat',
    location: 'Oslo, Norway',
    year: '2024',
    category: 'Architecture / Eco',
    image: 'assets/project-4.jpg',
    lead: 'A zero-emission alpine pavilion cantilevered over the icy waters of the Oslofjord.',
    description: 'Harnessing ground-source geothermal heating and intelligent sun-tracking louvers, Lumina remains completely off-grid throughout harsh Scandinavian winters while maximizing cinematic water views.',
    specs: ['Site: Coastal Fjord Ridge', 'Heating: 100% Geothermal Heat Pump', 'Timber: Certified PEFC Kebony pine']
  },
  '5': {
    title: 'Atelier Vague',
    location: 'Paris, France',
    year: '2023',
    category: 'Interior / Creative Studio',
    image: 'assets/project-5.jpg',
    lead: 'Haussmannian building revitalized into an acoustic-first creative studio with fluid oak partition walls.',
    description: 'Restoring historical moldings while inserting modern curvilinear timber pods that function as acoustic meeting chambers, recording studios, and digital projection spaces.',
    specs: ['Space: 650 m²', 'Acoustic Rating: STC 54', 'Collaborators: 45 Global Artists']
  },
  '6': {
    title: 'Kanso Oasis Villa',
    location: 'Tashkent, Uzbekistan',
    year: '2025',
    category: 'Architecture / Desert Modernism',
    image: 'assets/project-6.jpg',
    lead: 'Modern oasis residence merging Central Asian courtyard heritage with monumental glass cantilevers.',
    description: 'Reinterpreting traditional Uzbek inner courtyard (hovli) microclimate cooling through modern reflecting pools, deep overhangs, and thermal terracotta masonry for year-round energy efficiency.',
    specs: ['Plot: 2,400 m²', 'Water Feature: 80 m² natural bio-filter pool', 'Climate Control: 65% reduction in cooling energy']
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!modalOverlay || !closeBtn) return;

  const openModal = (id) => {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalImg').alt = data.title;
    document.getElementById('modalLocation').textContent = `${data.location} • ${data.year}`;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalLead').textContent = data.lead;
    document.getElementById('modalDesc').textContent = data.description;

    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = '';
    data.specs.forEach(spec => {
      const li = document.createElement('li');
      li.textContent = spec;
      specsList.appendChild(li);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openModal(id);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

/* 6. Materiality Explorer */
const materialData = {
  'travertine': {
    title: 'Navona Roman Travertine',
    spec: 'POROUS SEDIMENTARY LIMESTONE // QUARRIED IN TIVOLI, ITALY',
    desc: 'Celebrated since antiquity for its warm honey undertones and organic linear veining. Unfilled and honed to maintain tactile authenticity while breathing naturally with indoor humidity.',
    image: 'assets/material-travertine.jpg'
  },
  'wood': {
    title: 'Shou Sugi Ban (Yakisugi)',
    spec: 'CARBONIZED JAPANESE CEDAR // FIRE-PRESERVED ARCHITECTURAL CLADDING',
    desc: 'An ancient Japanese charring method that renders cedar naturally resistant to rot, fire, and pests without artificial chemicals, yielding a deep, shimmering obsidian black patina.',
    image: 'assets/material-wood.jpg'
  },
  'brass': {
    title: 'Living Brushed Brass',
    spec: 'UNLACQUERED ARCHITECTURAL ALLOY // AGES WITH HUMAN TOUCH',
    desc: 'Finished with a bespoke directional satin brush. Left unsealed so each handle and trim subtly evolves over decades, reflecting the natural life of the home.',
    image: 'assets/material-brass.jpg'
  },
  'concrete': {
    title: 'Bio-Composite Microcement',
    spec: 'LOW-CARBON POZZOLANIC MATRIX // SEAMLESS MONOLITHIC FINISH',
    desc: 'Engineered with mineral binders and recycled pozzolans to reduce embodied emissions by 55% compared to standard Portland cement, delivering an ultra-smooth velvety touch.',
    image: 'assets/material-concrete.jpg'
  },
  'glass': {
    title: 'Reeded Acoustic Glass',
    spec: 'LOW-IRON FLUTED GLAZING // PRIVACY WITH MAXIMUM LUMEN TRANSMISSION',
    desc: 'Precision-grooved architectural glass that softly diffuses daylight into painterly vertical bands of light while attenuating unwanted acoustic vibrations.',
    image: 'assets/material-glass.jpg'
  }
};

function initMaterialityExplorer() {
  const swatchBtns = document.querySelectorAll('.material-swatch-btn');
  const viewerImg = document.getElementById('materialImg');
  const viewerTitle = document.getElementById('materialTitle');
  const viewerSpec = document.getElementById('materialSpec');
  const viewerDesc = document.getElementById('materialDesc');
  if (!swatchBtns.length || !viewerImg) return;

  swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const matKey = btn.getAttribute('data-material');
      const data = materialData[matKey];
      if (!data) return;

      viewerImg.style.opacity = '0.3';
      setTimeout(() => {
        viewerImg.src = data.image;
        viewerTitle.textContent = data.title;
        viewerSpec.textContent = data.spec;
        viewerDesc.textContent = data.desc;
        viewerImg.style.opacity = '1';
      }, 180);
    });
  });
}

/* 7. Numbers Counter Animation on Scroll */
function initCounters() {
  const counters = document.querySelectorAll('.metric-number');
  if (!counters.length) return;

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1800;
          const stepTime = Math.abs(Math.floor(duration / (target || 1)));

          const timer = setInterval(() => {
            current += 1;
            counter.textContent = current + suffix;
            if (current >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            }
          }, Math.max(stepTime, 20));
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) observer.observe(metricsSection);
}

/* 8. Contact Form Handling & Toast Feedback */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const toast = document.getElementById('toastNotice');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="client_name"]')?.value || 'Guest';
    const email = form.querySelector('[name="client_email"]')?.value || '';

    // Show Toast
    if (toast) {
      toast.querySelector('.toast-text').textContent = `Tashakkur, ${name}! So'rovingiz qabul qilindi. Tez orada bog'lanamiz.`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }

    form.reset();
  });
}
