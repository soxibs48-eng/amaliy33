/**
 * ZERO DESIGN STUDIO — JAVASCRIPT CONTROLLER
 * Amaliy Ish 33 — Master ES6 Module (O'zbek tilida)
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

/* 1. Theme Toggle (Tungi / Kunduzgi Rejim) */
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
    toggleBtn.setAttribute('aria-label', `${theme === 'dark' ? 'Kunduzgi' : 'Tungi'} rejimga o'tish`);
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

/* 3. Mobil Menyusi (Mobile Drawer) */
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

/* 4. Loyihalarni Filtrlash */
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

/* 5. Loyiha Modal Lightbox (O'zbek tilida ma'lumotlar) */
const projectData = {
  '1': {
    title: 'Villa Monolith',
    location: 'Kioto, Yaponiya',
    year: '2025',
    category: 'Arxitektura / Ekologik',
    image: 'assets/project-1.jpg',
    lead: 'Qadimiy bambukzor o\'rmoni bilan mukammal uyg\'unlashgan monolitik beton va kuygan kedr (Yakisugi) villasi.',
    description: 'Daraxt ildizlari tizimini saqlab qolish maqsadida konsol poydevor ustiga qurilgan. Uch qavatli akustik shisha devorlar, passiv quyosh issiqlik massasi va yomg\'ir suvini qayta yig\'ish tizimi bilan ta\'minlangan.',
    specs: ['Yer maydoni: 1,840 m²', 'Konstruksiya: Uglerod bilan toblangan beton va yapon sarvi', 'Energiya reytingi: Net Zero Standarti (Nol energiya sarfi)']
  },
  '2': {
    title: 'The Travertine Sanctuary',
    location: 'Milan, Italiya',
    year: '2024',
    category: 'Interyer Arxitekturasi',
    image: 'assets/project-2.jpg',
    lead: 'Tabiiy Rim Navona travertini va massiv yong\'oq yog\'ochi uyg\'unligidagi 420 m² maydonli shinam pentxaus.',
    description: 'Har bir yuza taktil soflikni aks ettiradi. Maxsus quyilgan bronza furnituralardan tortib ko\'rinmas akustik panellargacha Milan dizayn markazida mutlaq sukunat va xotirjamlik maskanini yaratadi.',
    specs: ['Ichki maydon: 420 m²', 'Asosiy materiallar: Navona travertini, cho\'tkalangan jez, tutunli eman', 'Yoritish: Viabizzuno mualliflik me\'moriy chiroqlari']
  },
  '3': {
    title: 'Zero Flagship Pavilion',
    location: 'Seul, Janubiy Koreya',
    year: '2025',
    category: 'Fazoviy & Savdo Pavilyoni',
    image: 'assets/project-3.jpg',
    lead: 'Egilgan qizil tuproq monolitlari va kinetik yorug\'likdan tashkil topgan noyob brend tajriba ibodatxonasi.',
    description: 'Savdo maydonini madaniy ziyoratgohga aylantirgan inqilobiy yechim. Mehmonlar mahalliy loydan shakllantirilgan yerosti arkalari orqali quyosh nuri bilan to\'lgan baland atriumga chiqadilar.',
    specs: ['Qavatlar: 3 daraja (1,200 m²)', 'Uglerod balansi: -14% (Net Negative Carbon)', 'Mukofot: Red Dot Best of the Best 2025 g\'olibi']
  },
  '4': {
    title: 'Lumina Nordic Retreat',
    location: 'Oslo, Norvegiya',
    year: '2024',
    category: 'Arxitektura / Eko-shole',
    image: 'assets/project-4.jpg',
    lead: 'Oslofyordining moviy suvlari ustida muallaq turuvchi nol-emissiyali geotermal yog\'och qo\'rg\'on.',
    description: 'Yer tubidan olinuvchi geotermal isitish va quyoshga moslashuvchi avtomatlashgan jalyuzilar yordamida qishning eng sovuq kunlarida ham shahar elektr tarmog\'isiz to\'liq mustaqil ishlaydi.',
    specs: ['Joylashuv: Fjord qoyalari bo\'yi', 'Isitish: 100% geotermal issiqlik nasosi', 'Yog\'och: Sertifikatlangan PEFC Kebony qarag\'ayi']
  },
  '5': {
    title: 'Atelier Vague',
    location: 'Parij, Fransiya',
    year: '2023',
    category: 'Interyer / Ijodiy Studiya',
    image: 'assets/project-5.jpg',
    lead: 'Tarixiy Gosman davri binosining akustik kigiz arkalar va egilgan eman devorlari orqali yangilanishi.',
    description: 'Tarixiy ganchkorlik naqshlarini saqlab qolgan holda, ichki qismga yig\'ilishlar, audio yozuvlar va raqamli 3D proyeksiyalar uchun mo\'ljallangan zamonaviy yog\'och kapsulalar kiritildi.',
    specs: ['Umumiy maydon: 650 m²', 'Akustik izolyatsiya: STC 54', 'Jamoa: 45 nafar xalqaro ijodkorlar uchun']
  },
  '6': {
    title: 'Kanso Oasis Villa',
    location: 'Toshkent, O\'zbekiston',
    year: '2025',
    category: 'Arxitektura / Sharqona Zamonaviylik',
    image: 'assets/project-6.jpg',
    lead: 'Markaziy Osiyoning an\'anaviy ichki hovli (hovli) madaniyatini shisha kantileverlar bilan birlashtirgan voha villasi.',
    description: 'Qadimiy hovli soyasi va tabiiy suv havzasi orqali havoni tabiiy sovutish tizimi yaratildi. Bu issiq yoz faslida faol konditsioner quvvat sarfini 65% ga kamaytiradi.',
    specs: ['Hudud maydoni: 2,400 m²', 'Suv havzasi: 80 m² tabiiy bio-filtrli ko\'l', 'Iqlim nazorati: 65% gacha elektr tejovi']
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

/* 6. Taktil Materiallar Laboratoriyasi (Materiality Explorer) */
const materialData = {
  'travertine': {
    title: 'Navona Rim Travertini',
    spec: 'G\'OVAK CHO\'KINDI OHAKTOSH // TIVOLI KARYERLARI, ITALIYA',
    desc: 'Qadim zamonlardan buyon iliq asalrang jilosi va organik chiziqli qatlamlari bilan qadrlanadi. Xonadagi namlikni tabiiy muvozanatlash uchun g\'ovaklari to\'ldirilmasdan jilolanadi.',
    image: 'assets/material-travertine.jpg'
  },
  'wood': {
    title: 'Shou Sugi Ban (Yakisugi)',
    spec: 'KUYDIRILGAN YAPON KEDRI // OLOVDA TOBLANGAN HIMOYA QATLAMI',
    desc: 'Qadimiy yapon an\'anasi bo\'lib, yog\'och sirtini olov bilan kuydirish orqali uni chirish, yong\'in va hasharotlardan kimyoviy moddalarsiz tabiiy himoya qiladi va yaltiroq qora tus beradi.',
    image: 'assets/material-wood.jpg'
  },
  'brass': {
    title: 'Tabiiy Cho\'tkalangan Jez (Bronza)',
    spec: 'LAKLANMAGAN ME\'MORIY QOTISHMA // INSON TEGIShI BILAN PATINA OLADI',
    desc: 'Besh daqiqali yo\'naltirilgan satin cho\'tkasi bilan ishlov beriladi. Ustki qismi laklanmaydi, natijada tutqichlar o\'n yillar davomida uy hayoti bilan birga olijanob qorayib boradi.',
    image: 'assets/material-brass.jpg'
  },
  'concrete': {
    title: 'Bio-Kompozit Mikrotsement',
    spec: 'KAM UGLERODLI POTSSOLAN MATRITSASI // CHOKSIZ MONOLIT PARDOZ',
    desc: 'Standart sementga nisbatan uglerod ajralishini 55% ga kamaytiradi. Mineral bog\'lovchilar va maydalangan tabiiy kukunlardan tayyorlanib, mayin baxmaldek silliqlik bag\'ishlaydi.',
    image: 'assets/material-concrete.jpg'
  },
  'glass': {
    title: 'Qovurg\'ali Akustik Shisha',
    spec: 'TEMIRSIZ EGILGAN REEDED SHISHA // MAKSIMAL YORUGLIK VA MAXFIYLIK',
    desc: 'Vertikal chuqurchalarga ega me\'moriy shisha bo\'lib, kun yorug\'ligini xonaga chiroyli vertikal nurlar shaklida yoyadi va keraksiz shovqin to\'lqinlarini so'ndiradi.',
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

/* 7. Raqamlarni Jonli Hisoblash (Animated Counters) */
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

/* 8. Bog'lanish Formasi va Toast Bildirishnomasi */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const toast = document.getElementById('toastNotice');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="client_name"]')?.value || 'Hurmatli mehmon';

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
