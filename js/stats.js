 async function loadDownloads() {
    try {
      const res = await fetch('https://api.npmjs.org/downloads/point/last-week/octopus-data');
      const data = await res.json();
      if (data.downloads) document.getElementById('downloads-count').textContent = data.downloads.toLocaleString();
    } catch { document.getElementById('downloads-count').textContent = '1.2k+'; }
  }
  loadDownloads();

  function copyInstall() {
    navigator.clipboard.writeText('npm i octopus-data');
    const btn = document.querySelector('.copy-btn');
    btn.textContent = '✓ COPIED';
    setTimeout(() => btn.textContent = 'COPY', 1800);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.feature, .package-card').forEach(el => observer.observe(el));

  const benchObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.bench-row').forEach((row, idx) => {
        setTimeout(() => {
          const bar = row.querySelector('.bench-bar');
          if (bar && row.dataset.width) bar.style.width = row.dataset.width + '%';
        }, idx * 100);
      });
      benchObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  const benchGrid = document.querySelector('.benchmark-grid');
  if (benchGrid) benchObserver.observe(benchGrid);

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }