/**
 * FRANCIS JORDAN HASNAWI — PORTFOLIO INTERACTIVE SCRIPT
 * Features:
 * 1. Theme Switcher (Warm Luminous Dusk <-> Editorial Light Mode)
 * 2. Project Category Filter Tabs
 * 3. Rich Case Study Modal System (with Multi-Image Gallery & Live/PDF Links)
 * 4. Copy Email Toast & Live Jakarta Time (WIB)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initInteractiveBackground();
  initNavigation();
  initProjectFilters();
  initModalSystem();
  initClipboardCopy();
  initJakartaClock();
});

/* ==========================================================================
   0. INTERACTIVE ANIMATED SILK AURORA WAVES & DATA CONSTELLATION CANVAS
   ========================================================================== */
function initInteractiveBackground() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Smooth mouse tracking for parallax & cursor spotlight
  const mouse = {
    x: width * 0.7,
    y: height * 0.35,
    targetX: width * 0.7,
    targetY: height * 0.35,
    active: false
  };

  window.addEventListener('mousemove', e => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Floating constellation data nodes
  const NODE_COUNT = Math.min(44, Math.floor((width * height) / 34000));
  const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    radius: Math.random() * 1.8 + 1.0,
    warm: Math.random() > 0.42
  }));

  let time = 0;

  function render() {
    time += 0.0085;

    // Smooth lerp mouse position
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    ctx.clearRect(0, 0, width, height);

    // Use 'screen' blending in dusk mode so colors glow cleanly instead of turning muddy!
    ctx.globalCompositeOperation = isLight ? 'source-over' : 'screen';

    // 1. Ambient Mouse Spotlight + Right Portrait Backlight
    const spotlightGrad = ctx.createRadialGradient(
      mouse.x,
      mouse.y,
      10,
      mouse.x,
      mouse.y,
      Math.max(width, height) * 0.45
    );
    if (isLight) {
      spotlightGrad.addColorStop(0, 'rgba(245, 158, 11, 0.11)');
      spotlightGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.06)');
      spotlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    } else {
      spotlightGrad.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
      spotlightGrad.addColorStop(0.45, 'rgba(99, 102, 241, 0.08)');
      spotlightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = spotlightGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Flowing Silk Aurora Wave Ribbons (Curved 3D-style waves)
    const waves = isLight
      ? [
          {
            yBase: height * 0.28,
            amp1: 68,
            amp2: 32,
            freq1: 0.0018,
            freq2: 0.0034,
            speed: 0.9,
            slope: -0.14,
            crestColor: 'rgba(217, 119, 6, 0.28)',
            fillTop: 'rgba(245, 158, 11, 0.12)',
            fillMid: 'rgba(251, 191, 36, 0.04)'
          },
          {
            yBase: height * 0.54,
            amp1: 55,
            amp2: 28,
            freq1: 0.0021,
            freq2: 0.0038,
            speed: -0.7,
            slope: 0.10,
            crestColor: 'rgba(2, 132, 199, 0.22)',
            fillTop: 'rgba(56, 189, 248, 0.10)',
            fillMid: 'rgba(99, 102, 241, 0.03)'
          },
          {
            yBase: height * 0.76,
            amp1: 48,
            amp2: 24,
            freq1: 0.0015,
            freq2: 0.0029,
            speed: 1.15,
            slope: -0.08,
            crestColor: 'rgba(217, 119, 6, 0.18)',
            fillTop: 'rgba(245, 158, 11, 0.08)',
            fillMid: 'rgba(245, 158, 11, 0.01)'
          }
        ]
      : [
          // Wave 1: Warm Bronze-Amber Diagonal Silk Wave (Upper right sweep)
          {
            yBase: height * 0.30,
            amp1: 78,
            amp2: 36,
            freq1: 0.0017,
            freq2: 0.0033,
            speed: 0.95,
            slope: -0.16,
            crestColor: 'rgba(245, 158, 11, 0.42)',
            fillTop: 'rgba(234, 88, 12, 0.19)',
            fillMid: 'rgba(180, 83, 9, 0.06)'
          },
          // Wave 2: Luminous Gold & Indigo Mid-Screen Ribbon
          {
            yBase: height * 0.52,
            amp1: 64,
            amp2: 30,
            freq1: 0.0020,
            freq2: 0.0036,
            speed: -0.75,
            slope: 0.11,
            crestColor: 'rgba(56, 189, 248, 0.34)',
            fillTop: 'rgba(99, 102, 241, 0.15)',
            fillMid: 'rgba(56, 189, 248, 0.05)'
          },
          // Wave 3: Deep Sapphire & Warm Amber Lower Wave
          {
            yBase: height * 0.75,
            amp1: 52,
            amp2: 26,
            freq1: 0.0015,
            freq2: 0.0028,
            speed: 1.1,
            slope: -0.09,
            crestColor: 'rgba(251, 191, 36, 0.28)',
            fillTop: 'rgba(217, 119, 6, 0.12)',
            fillMid: 'rgba(30, 64, 175, 0.05)'
          }
        ];

    const parallaxX = ((mouse.x - width * 0.5) / width) * 35;
    const parallaxY = ((mouse.y - height * 0.5) / height) * 25;

    waves.forEach((w, idx) => {
      ctx.beginPath();
      const step = 18;
      let minY = height;

      for (let x = 0; x <= width + step; x += step) {
        const normX = x - width * 0.5;
        const y =
          w.yBase +
          normX * w.slope +
          parallaxY * (idx + 1) * 0.35 +
          Math.sin(x * w.freq1 + time * w.speed + parallaxX * 0.02) * w.amp1 +
          Math.cos(x * w.freq2 - time * w.speed * 0.65) * w.amp2;

        if (y < minY) minY = y;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Draw glowing wave crest line
      ctx.strokeStyle = w.crestColor;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Complete ribbon path down to bottom for smooth silk gradient fill
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, Math.max(0, minY - 20), 0, height);
      grad.addColorStop(0, w.fillTop);
      grad.addColorStop(0.45, w.fillMid);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // 3. Floating Constellation Data Nodes & Delicate Network Lines
    ctx.globalCompositeOperation = 'source-over';
    const maxConnectDist = 145;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      // Wrap around screen edges smoothly
      if (n.x < -20) n.x = width + 20;
      if (n.x > width + 20) n.x = -20;
      if (n.y < -20) n.y = height + 20;
      if (n.y > height + 20) n.y = -20;

      // Connect nearby nodes with ultra-subtle data lines
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxConnectDist) {
          const alpha = (1 - dist / maxConnectDist) * (isLight ? 0.11 : 0.15);
          ctx.strokeStyle = isLight
            ? `rgba(100, 116, 139, ${alpha})`
            : `rgba(148, 163, 184, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }

      // Connect node to mouse cursor if nearby
      const mdx = n.x - mouse.x;
      const mdy = n.y - mouse.y;
      const mDist = Math.hypot(mdx, mdy);
      if (mDist < 185) {
        const mAlpha = (1 - mDist / 185) * (isLight ? 0.22 : 0.28);
        ctx.strokeStyle = `rgba(245, 158, 11, ${mAlpha})`;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }

      // Draw glowing node dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      if (n.warm) {
        ctx.fillStyle = isLight ? 'rgba(217, 119, 6, 0.35)' : 'rgba(251, 191, 36, 0.45)';
      } else {
        ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.30)' : 'rgba(56, 189, 248, 0.40)';
      }
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   1. THEME TOGGLE (WARM DUSK <-> EDITORIAL LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeBtn = document.getElementById('mobileThemeBtn');
  const themeLabel = document.getElementById('themeLabel');

  const savedTheme = localStorage.getItem('fj_portfolio_theme') || 'dusk';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('fj_portfolio_theme', theme);
    if (themeLabel) {
      themeLabel.textContent = theme === 'dusk' ? 'Light Mode' : 'Warm Dusk';
    }
  }

  function handleToggle() {
    const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dusk';
    const next = current === 'dusk' ? 'light' : 'dusk';
    applyTheme(next);
  }

  if (toggleBtn) toggleBtn.addEventListener('click', handleToggle);
  if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', handleToggle);
}

/* ==========================================================================
   2. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   3. PROJECT FILTER TABS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. CASE STUDY MODAL SYSTEM (WITH GALLERY SWITCHER)
   ========================================================================== */
const PROJECT_DATA = {
  'bank-loan': {
    kicker: 'TABLEAU BUSINESS INTELLIGENCE • CREDIT RISK',
    title: 'Portfolio Credit Risk & Delinquency Intelligence',
    images: [
      { src: 'assets/images/project-bank-loan.png', label: 'Executive Credit Risk Dashboard' }
    ],
    kpis: [
      { val: '$34.01B', lbl: 'Total Funded Volume' },
      { val: '12.58%', lbl: 'Portfolio Default Rate (NPL)' },
      { val: '2,260,668', lbl: 'Loan Accounts Analyzed' }
    ],
    overview:
      'Designed an interactive Tableau credit risk dashboard examining over 2.26 million loan accounts ($34.01 Billion total funded volume) spanning 2008 to 2018. Built to help risk analysts monitor Non-Performing Loans (NPL), pricing alignment, and borrower debt-to-income (DTI) vulnerability.',
    highlights: [
      '<strong>Risk vs Pricing Alignment:</strong> Demonstrated clear monotonic escalation in default rates from Grade A (5.04% NPL at 7.08% interest) up to Grade G (41.40% NPL at 28.13% interest).',
      '<strong>Geographic & Purpose Breakdown:</strong> Mapped state-level default hotspots across the US and identified Small Business loans as the highest-risk lending category.',
      '<strong>Underwriting Matrix:</strong> Combined Home Ownership x Verification Status against borrower DTI to guide stricter income verification policies.'
    ],
    actions: []
  },

  'bike-sales': {
    kicker: 'TABLEAU DATA VISUALIZATION • RETAIL ANALYTICS',
    title: 'Global Bike Retail Seasonal Demand & Profit Optimization',
    images: [
      { src: 'assets/images/project-bike-sales.png', label: 'Bike Retail e-Sales Dashboard' }
    ],
    kpis: [
      { val: '$85.27M', lbl: 'Total Revenue' },
      { val: '$32.22M', lbl: 'Total Gross Profit (37.79%)' },
      { val: '113,036', lbl: 'Transactions Cleaned' }
    ],
    overview:
      'Transformed 113,036 raw retail transaction rows into an executive Tableau dashboard to solve two core inventory problems: stockouts during peak demand and overstocking during off-peak months.',
    highlights: [
      '<strong>Seasonal Demand Discovery:</strong> Uncovered two distinct yearly revenue surges — early summer (May–June) and December holiday peaks ($9.09M revenue in December alone).',
      '<strong>Category Profitability:</strong> Road Bikes ($33.36M) and Mountain Bikes ($21.12M) drive total volume, while Accessories & Helmets deliver high repeat order frequency.',
      '<strong>Inventory Strategy:</strong> Formulated pre-season stocking recommendations for top markets (United States, Australia, United Kingdom) ahead of Q2 and Q4 peaks.'
    ],
    actions: []
  },

  'geforce': {
    kicker: 'PYTHON DATA PIPELINE • STATISTICAL EDA & 3D WEBGL',
    title: 'GeForce GPU Specification Pipeline & 3D Explorer',
    images: [
      { src: 'assets/images/project-geforce.png', label: 'Interactive 3D GPU Explorer' },
      { src: 'assets/images/project-geforce-scatter.png', label: 'Python EDA: Price vs TFLOPS' },
      { src: 'assets/images/project-geforce-corr.png', label: 'Python EDA: Correlation Matrix' }
    ],
    kpis: [
      { val: '46 GPUs', lbl: '5 NVIDIA Architectures' },
      { val: 'r = 0.88', lbl: 'CUDA Core / Price Correlation' },
      { val: 'FP32 TFLOPS', lbl: 'Engineered Compute Metric' }
    ],
    overview:
      'Built an end-to-end Python data pipeline (Pandas, NumPy, Seaborn, Matplotlib) to clean, standardize, and analyze 46 NVIDIA GeForce desktop GPUs across Turing, Ampere, Ada Lovelace, Pascal, and Maxwell architectures — paired with an interactive 3D hardware explorer.',
    highlights: [
      '<strong>Feature Engineering:</strong> Computed theoretical FP32 TFLOPS from CUDA cores and boost clock speeds, plus Performance-per-Dollar (TFLOPS/$) value ratios.',
      '<strong>Statistical Findings:</strong> Proved strong correlation between CUDA core count and launch MSRP (r = 0.88), while revealing diminishing returns above the $800 flagship tier.',
      '<strong>Interactive 3D Web App:</strong> Deployed a live 3D visual explorer allowing users to inspect GPU tiers, VRAM bandwidth, and generational leaps.'
    ],
    actions: [
      { label: 'Open Live 3D Website', url: 'https://geforce-3d-explorer.netlify.app/', primary: true }
    ]
  },

  'bnexus': {
    kicker: 'APPLIED AI • EDTECH PRODUCT FOR BINUSIANS',
    title: 'B-Nexus — AI Study Assistant & Active Recall Platform',
    images: [
      { src: 'assets/images/project-bnexus.png', label: 'B-Nexus Landing & Overview' },
      { src: 'assets/images/project-bnexus-app.png', label: 'Dashboard & Study Workspace' }
    ],
    kpis: [
      { val: 'PDF → Quiz', lbl: 'Automated Extraction' },
      { val: 'Flashcards', lbl: 'Active Recall Engine' },
      { val: 'Live App', lbl: 'Deployed on Vercel' }
    ],
    overview:
      'Designed an AI-powered learning companion tailored for BINUS University students to turn dense lecture slide decks and PDFs into structured study materials, interactive flashcards, and practice quizzes.',
    highlights: [
      '<strong>Document-to-Quiz Workflow:</strong> Students upload course materials and immediately generate multiple-choice quizzes and summary notes.',
      '<strong>Active Recall Flashcards:</strong> Built-in card flipping and mastery tracking to prepare for university midterms and finals.',
      '<strong>Clean Study Analytics:</strong> Tracks study streaks, completed modules, and quiz accuracy inside a distraction-free workspace.'
    ],
    actions: [
      { label: 'Open Live Website (Vercel)', url: 'https://ai-learning-assistant-fe-nine.vercel.app/', primary: true }
    ]
  },

  'growtopia': {
    kicker: 'ALGORITHMIC LOGIC • ECONOMIC & YIELD SIMULATOR',
    title: 'GrowMass — Production Chain & Farm Yield Calculator',
    images: [
      { src: 'assets/images/project-growtopia.png', label: 'GrowMass Planner & Simulator UI' }
    ],
    kpis: [
      { val: '800+ Items', lbl: 'Relational Recipe Tree' },
      { val: '3 Calculators', lbl: 'Massing, Farming & Science' },
      { val: 'ROI Math', lbl: 'Seed Loss & Profit Modeling' }
    ],
    overview:
      'Created a comprehensive mathematical planner and economic simulator for complex multi-step crafting trees. I formulated the underlying probability and yield equations, then used AI-assisted web development to build the interactive interface.',
    highlights: [
      '<strong>Multi-Step Recipe Resolution:</strong> Automatically calculates exact seed requirements, splicing steps, and block yields across 800+ items.',
      '<strong>Buy vs. Splice Optimization:</strong> Compares World Lock (WL) market costs at every branch of the crafting tree so players know whether to buy or craft intermediate ingredients.',
      '<strong>Harvester Fuel & Science Simulators:</strong> Models 10% seed loss prevention ROI and chemical synthesizer profit per harvest cycle.'
    ],
    actions: [
      { label: 'Open Live Website (Netlify)', url: 'https://growmass-planner.netlify.app/', primary: true }
    ]
  },

  'flavorcircle': {
    kicker: 'HUMAN-COMPUTER INTERACTION (HCI) • UI/UX PROTOTYPE',
    title: 'FlavorCircle — Campus Food Ordering & Foodie Community',
    images: [
      { src: 'assets/images/project-flavorcircle.png', label: 'FlavorCircle Campus Dining Platform' }
    ],
    kpis: [
      { val: '17 Pages', lbl: 'End-to-End Interactive Flow' },
      { val: '4 Campuses', lbl: 'Syahdan, Anggrek, Kijang, Alam Sutera' },
      { val: 'Live Cart', lbl: 'Slide-Over Checkout Simulation' }
    ],
    overview:
      'Developed as a Human-Computer Interaction (HCI) group project at BINUS University. FlavorCircle connects students with affordable campus-area food stalls, verified student reviews, and group delivery ordering.',
    highlights: [
      '<strong>Complete 17-Screen Prototype:</strong> Covers onboarding, campus location switching, stall discovery, dietary filtering, group orders, and live order tracking.',
      '<strong>Interactive Shopping Cart:</strong> Features real-time item quantity updates, promo code calculation, and delivery fee breakdown.',
      '<strong>Student-Centric UX:</strong> Designed around real student pain points — short break times between classes and finding budget-friendly meals near campus.'
    ],
    actions: [
      { label: 'Launch Interactive Prototype', url: 'FlavorCircle/index.html', primary: true }
    ]
  },

  'pentaho-research': {
    kicker: 'DATA ENGINEERING & IEEE RESEARCH • BINUS UNIVERSITY',
    title: 'Comparative Analysis of Low-Code (Pentaho PDI) vs Code-First ETL Pipelines',
    images: [
      { src: 'assets/images/project-pentaho.png', label: 'Actual Pentaho Spoon ETL Pipeline' }
    ],
    kpis: [
      { val: '184–212', lbl: 'Countries Normalized' },
      { val: 'Star Schema', lbl: 'Fact & Dimension Tables' },
      { val: 'IEEE Paper', lbl: 'Co-Authored Research' }
    ],
    overview:
      'Co-authored an academic paper in IEEE format investigating the trade-offs between visual low-code ETL tools (Pentaho Data Integration / Spoon) and code-first Python pipelines when harmonizing multi-decade global macroeconomic datasets (Global Income, Global Inflation, and Global Peace Index).',
    highlights: [
      '<strong>End-to-End Pentaho ETL Design:</strong> Built visual transformation flows using CSV Input, Select Values, Row Normalizer (pivoting year columns 1980–2024), Filter Rows, Sort Rows, and Merge Join steps.',
      '<strong>Dimensional Data Warehousing:</strong> Populated structured Star-Schema tables including <code>FACT_TABLE</code>, <code>DIM_COUNTRY</code>, <code>Dim_Time</code>, and <code>Fact_Economic_Peace</code>.',
      '<strong>Empirical Findings:</strong> Demonstrated how Pentaho excels at visual lineage, rapid schema inspection, and modular team debugging, while comparing execution overhead against script-based pipelines.'
    ],
    actions: [
      { label: 'Read IEEE Research Paper (PDF)', url: 'assets/IEEE_Pentaho_Research_Paper.pdf', primary: true },
      { label: 'View Pentaho Group Presentation (PDF)', url: 'assets/Pentaho_DE_Group_Project.pdf', primary: false }
    ]
  }
};

function initModalSystem() {
  const modalOverlay = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modalOverlay || !modalBody) return;

  function openModal(projectId) {
    const data = PROJECT_DATA[projectId];
    if (!data) return;

    const hasMultipleImages = data.images && data.images.length > 1;
    const galleryButtonsHtml = hasMultipleImages
      ? `<div class="modal-gallery-strip">
          ${data.images
            .map(
              (img, idx) =>
                `<button type="button" class="modal-thumb-btn ${idx === 0 ? 'active' : ''}" data-img-src="${img.src}">
                  ${img.label}
                </button>`
            )
            .join('')}
        </div>`
      : '';

    const kpisHtml = (data.kpis || [])
      .map(
        k => `
        <div class="modal-kpi-card">
          <span class="modal-kpi-val">${k.val}</span>
          <span class="modal-kpi-lbl">${k.lbl}</span>
        </div>`
      )
      .join('');

    const highlightsHtml = (data.highlights || [])
      .map(item => `<li>${item}</li>`)
      .join('');

    const actionsHtml =
      data.actions && data.actions.length > 0
        ? `<div class="modal-actions-bar">
            ${data.actions
              .map(
                act =>
                  `<a href="${act.url}" target="_blank" rel="noopener noreferrer" class="btn ${
                    act.primary ? 'btn-primary' : 'btn-secondary'
                  }">
                    <span>${act.label}</span>
                  </a>`
              )
              .join('')}
          </div>`
        : '';

    modalBody.innerHTML = `
      <div class="modal-kicker">${data.kicker}</div>
      <h3 class="modal-title">${data.title}</h3>
      
      <div class="modal-hero-img-wrap">
        <img src="${data.images[0].src}" alt="${data.title}" class="modal-hero-img" id="modalMainImg">
      </div>
      ${galleryButtonsHtml}

      <div class="modal-kpi-grid">
        ${kpisHtml}
      </div>

      <h4 class="modal-section-heading">Project Overview</h4>
      <p class="modal-text">${data.overview}</p>

      <h4 class="modal-section-heading">Key Analytical & Technical Highlights</h4>
      <ul class="modal-bullet-list">
        ${highlightsHtml}
      </ul>

      ${actionsHtml}
    `;

    // Bind gallery thumbnail switching if multiple images exist
    const thumbBtns = modalBody.querySelectorAll('.modal-thumb-btn');
    const mainImg = document.getElementById('modalMainImg');
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        thumbBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const newSrc = btn.getAttribute('data-img-src');
        if (mainImg && newSrc) {
          mainImg.src = newSrc;
        }
      });
    });

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. CLIPBOARD EMAIL COPY
   ========================================================================== */
function initClipboardCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const toast = document.getElementById('toast');

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', () => {
    const email = emailText.textContent.trim();
    navigator.clipboard.writeText(email).then(() => {
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
      }
    });
  });
}

/* ==========================================================================
   6. LIVE JAKARTA CLOCK (WIB / UTC+7)
   ========================================================================== */
function initJakartaClock() {
  const clockEl = document.getElementById('liveJakartaTime');
  if (!clockEl) return;

  function updateClock() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      clockEl.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
    } catch (e) {
      clockEl.textContent = 'UTC+7';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}
