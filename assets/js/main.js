async function loadPartial(mountId, url) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const res = await fetch(url);
  mount.outerHTML = await res.text();
}

function initNav() {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (!navToggle || !siteNav) return;

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });

    const linkPath = new URL(link.href).pathname;
    const currentPath = location.pathname === '/' ? '/index.html' : location.pathname;
    if (linkPath === currentPath) link.classList.add('active');
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.card, .case-card, .news-item').forEach((el) => observer.observe(el));
}

function initTagFilter() {
  const bar = document.querySelector('.tag-filter-bar');
  if (!bar) return;
  const pills = bar.querySelectorAll('.tag-pill');
  const cards = document.querySelectorAll('.case-card');

  bar.addEventListener('click', (e) => {
    const pill = e.target.closest('.tag-pill');
    if (!pill) return;
    pills.forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');

    const tag = pill.dataset.tag;
    cards.forEach((card) => {
      const matches = tag === 'all' || card.dataset.tags.split(' ').includes(tag);
      card.classList.toggle('is-hidden', !matches);
    });
  });
}

function initFooterYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

function renderNewsFeed(container, items) {
  container.innerHTML = items.map((item) => {
    const awardClass = item.type === 'Award' ? ' is-award' : '';
    return `
      <div class="news-item${awardClass}">
        <div class="news-date-badge${awardClass}"><span class="nd-month">${item.month}</span><span class="nd-year">${item.year}</span></div>
        <div class="news-item-body">
          <span class="news-item-type">${item.type}</span>
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </div>
      </div>
    `;
  }).join('');
}

function initNewsFeed() {
  if (typeof NEWS_ITEMS === 'undefined') return;
  const home = document.getElementById('newsFeedHome');
  if (home) renderNewsFeed(home, NEWS_ITEMS.slice(0, 8));
  const all = document.getElementById('newsFeedAll');
  if (all) renderNewsFeed(all, NEWS_ITEMS);
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadPartial('site-header', '/partials/header.html'),
    loadPartial('site-footer', '/partials/footer.html'),
  ]);
  initNav();
  initFooterYear();
  initNewsFeed();
  initScrollReveal();
  initTagFilter();
});
