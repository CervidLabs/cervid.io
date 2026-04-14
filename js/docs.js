// Navegación entre páginas y menú responsive
const links = document.querySelectorAll('.sidebar-link');
const pages = document.querySelectorAll('.page');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  links.forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  const link = document.querySelector(`[data-page="${pageId}"]`);
  if (link) link.classList.add('active');
  history.replaceState(null, '', '#' + pageId);
  // Scroll al inicio del contenido
  document.querySelector('.main').scrollTop = 0;
  window.scrollTo(0, 0);
  // Cerrar sidebar en móvil después de navegar
  if (window.innerWidth <= 800) {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// Manejo de hash inicial
const hash = window.location.hash.replace('#', '');
if (hash) showPage(hash);
else showPage('intro'); // página por defecto

// Mobile sidebar toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  });
}
if (sidebarClose) {
  sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
}
if (overlay) {
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
}

// Cerrar sidebar al redimensionar a escritorio
window.addEventListener('resize', () => {
  if (window.innerWidth > 800) {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
});

// (Opcional) precargar todas las páginas de contenido desde el HTML original,
// pero como el HTML ya las incluye todas, no es necesario.
// Para mantener la documentación completa, asegúrate de que el archivo HTML
// contenga todas las secciones (Intro, Install, Quickstart, Reading, DataFrame, etc.)
// Tal como estaban en el original, solo que ahora son responsive.