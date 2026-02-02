/* ===================================
   TSURUMI SANAE - Portfolio Script
   =================================== */

const data = {
  profile: {
    name: "TSURUMI_SANAE",
    tagline: "9人兄弟出身の映像脚本家",
    bio: [
      "大阪府在住",
      "1996年生まれ",
      "映像制作/撮影/編集/モーション/アニメーション"
    ],
    image: "https://prd.storage.lit.link/images/creators/b159c4ec-56cc-4a15-aaec-6b25bc0b76fa/cb3a121c-1ebd-4f71-8c70-688a3ea3b2ae.jpeg",
    background: "https://prd.resource-api.lit.link/v1/images/resized?image_url=images/unsplash/Taiwan Modern/medium/emile-seguin-R9OueKOtGGU-unsplash-min.jpg&width=2000"
  },
  links: [
    {
      type: "instagram",
      title: "Instagram",
      text: "TSURUMI_SANAE",
      url: "https://www.instagram.com/s.tsurumi.s/"
    },
    {
      type: "youtube",
      title: "和歌山クラフトビール nom craft様",
      youtubeId: "enesJk6RKaY",
      url: "https://youtu.be/enesJk6RKaY",
      category: "Commercial"
    },
    {
      type: "youtube",
      title: "和歌山クラフトビール ORYZAE BREWING様",
      youtubeId: "z72PLlzQGPs",
      url: "https://youtu.be/z72PLlzQGPs",
      category: "Commercial"
    },
    {
      type: "youtube",
      title: "越前市役所様 YouTube情報発信番組",
      youtubeId: "Pf3pNdLtwwA",
      url: "https://youtu.be/Pf3pNdLtwwA",
      category: "Government"
    },
    {
      type: "youtube",
      title: "arinkaya様 店舗映像",
      youtubeId: "D4MRLGmvcAg",
      url: "https://youtu.be/D4MRLGmvcAg",
      category: "Commercial"
    },
    {
      type: "youtube",
      title: "未来創造ラボ様 モーション映像",
      youtubeId: "5XSb8o5ysZk",
      url: "https://youtu.be/5XSb8o5ysZk",
      category: "Motion Graphics"
    },
    {
      type: "youtube",
      title: "お笑いライブOP アニメーション",
      youtubeId: "wypgiMjcFt8",
      url: "https://youtu.be/wypgiMjcFt8",
      category: "Animation"
    },
    {
      type: "youtube",
      title: "DMC様 Dance Digest",
      youtubeId: "Nf1hny_cV5I",
      url: "https://youtu.be/Nf1hny_cV5I",
      category: "Event"
    },
    {
      type: "youtube",
      title: "樟蔭高等学校様 体育祭OP",
      youtubeId: "syxpBXVNMA0",
      url: "https://youtu.be/syxpBXVNMA0",
      category: "Event"
    },
    {
      type: "youtube",
      title: "北野ホテル様 撮って出し映像",
      youtubeId: "2rieM4h9OYY",
      url: "https://youtu.be/2rieM4h9OYY",
      category: "Wedding"
    },
    {
      type: "youtube",
      title: "結婚式 OP",
      youtubeId: "7jSby24eum0",
      url: "https://youtu.be/7jSby24eum0",
      category: "Wedding"
    }
  ]
};

// DOM Elements
const cursorGlow = document.getElementById('cursorGlow');
const heroTagline = document.getElementById('heroTagline');
const worksGrid = document.getElementById('worksGrid');
const aboutImage = document.getElementById('aboutImage');
const aboutBio = document.getElementById('aboutBio');
const projectCount = document.getElementById('projectCount');
const videoModal = document.getElementById('videoModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalVideo = document.getElementById('modalVideo');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  renderHero();
  renderWorks();
  renderAbout();
  initModal();
  initScrollAnimations();
});

// Cursor Glow Effect
function initCursorGlow() {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// Render Hero Section
function renderHero() {
  heroTagline.textContent = data.profile.tagline;
}

// Render Works Grid
function renderWorks() {
  // Filter for youtube and app types
  const works = data.links.filter(link => ['youtube', 'app'].includes(link.type));
  projectCount.textContent = works.length + '+';

  worksGrid.innerHTML = works.map(work => {
    if (work.type === 'youtube') {
      const thumbnail = `https://img.youtube.com/vi/${work.youtubeId}/maxresdefault.jpg`;
      const fallbackThumbnail = `https://img.youtube.com/vi/${work.youtubeId}/hqdefault.jpg`;
      return `
        <article class="work-card video-card" data-youtube-id="${work.youtubeId}">
            <div class="work-thumbnail">
            <img 
                src="${thumbnail}" 
                alt="${work.title}"
                loading="lazy"
                onerror="this.src='${fallbackThumbnail}'"
            >
            <div class="work-play">
                <i class="fas fa-play"></i>
            </div>
            </div>
            <div class="work-info">
            <span class="work-category">${work.category || 'Video'}</span>
            <h3 class="work-title">${work.title}</h3>
            </div>
        </article>
        `;
    } else if (work.type === 'app') {
      // App Card
      return `
        <a href="${work.url}" target="_blank" class="work-card app-card" style="text-decoration: none; color: inherit;">
            <div class="work-thumbnail" style="background: linear-gradient(135deg, #1e293b, #0f172a); display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-laptop-code" style="font-size: 3rem; color: #38bdf8;"></i>
                <div class="work-play">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </div>
            <div class="work-info">
            <span class="work-category">${work.category || 'App'}</span>
            <h3 class="work-title">${work.title}</h3>
            </div>
        </a>
        `;
    }
  }).join('');

  // Add click listeners only for video cards
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const youtubeId = card.dataset.youtubeId;
      openVideoModal(youtubeId);
    });
  });
}

// Render About Section
function renderAbout() {
  aboutImage.src = data.profile.image;
  aboutImage.alt = data.profile.name;

  aboutBio.innerHTML = `
    <p><strong>${data.profile.tagline}</strong></p>
    ${data.profile.bio.map(line => `<p>${line}</p>`).join('')}
  `;
}

// Video Modal
function initModal() {
  modalBackdrop.addEventListener('click', closeVideoModal);
  modalClose.addEventListener('click', closeVideoModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });
}

function openVideoModal(youtubeId) {
  modalVideo.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
    ></iframe>
  `;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  modalVideo.innerHTML = '';
  document.body.style.overflow = '';
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animate work cards
  document.querySelectorAll('.work-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate about section
  const aboutElements = document.querySelectorAll('.about-image-wrapper, .about-content');
  aboutElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
    observer.observe(el);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
