const routes = {
  home: {
    title: "Home",
    file: "Components/Pages/home.html"
  },
  dashboard: {
    title: "Dashboard",
    file: "Components/Pages/dashboard.html"
  },
  "cloud-projects": {
    title: "Cloud Projects",
    file: "Components/Pages/stack/modals/cloud.html"
  },
  enterprise: {
    title: "Enterprise",
    file: "Components/Pages/Wiki/Pages/enterprise.html"
  },
  pipeline: {
    title: "Pipeline",
    file: "Components/Pages/pipeline/tabs.html"
  },
  "ai-automation": {
    title: "AI & Automation",
    file: "Components/Pages/Wiki/Pages/ai-automation.html"
  },
  security: {
    title: "Security",
    file: "Components/Pages/stack/modals/devops.html"
  },
  architecture: {
    title: "Architecture",
    file: "Components/Pages/stack/modals/arch.html"
  },
  devtools: {
    title: "DevTools",
    file: "Components/Pages/stack/modals/dev.html"
  },
  wiki: {
    title: "Wiki",
    file: "Components/Pages/Wiki/index.html"
  }
};

function setActive(route) {
  document.querySelectorAll('.nav-menu a, .navbar-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.route === route);
  });
}

function setupNavMenuListeners() {
  document.querySelectorAll('.nav-menu a, .navbar-links a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      renderContent(a.dataset.route);
    });
  });
}

function renderContent(route) {
  const main = document.getElementById('main-content');
  fetch(routes[route].file)
    .then(response => response.text())
    .then(html => {
      main.innerHTML = html;
      setActive(route);
    });
}

function loadNavMenu() {
  fetch('Components/Layout/nav-menu.html')
    .then(response => response.text())
    .then(html => {
      const navMenu = document.getElementById('nav-menu-placeholder');
      navMenu.innerHTML = html;
      navMenu.style.display = 'none'; // Hide on load
      navMenu.style.position = 'absolute';
      navMenu.style.top = '64px'; // Adjust as needed for navbar height
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.zIndex = '9999'; // Overlay above main content
      setupNavMenuListeners();

      // Add outside click handler after nav-menu is loaded
      setTimeout(() => {
        document.addEventListener('mousedown', function outsideNavMenuClick(event) {
          // Only run if nav-menu is visible
          if (navMenu.style.display !== 'none') {
            // If click is outside nav-menu and logo
            const logo = document.getElementById('logo-link');
            if (!navMenu.contains(event.target) && (!logo || !logo.contains(event.target))) {
              navMenu.style.display = 'none';
            }
          }
        });
      }, 0);
    });
}

function loadFooter() {
  fetch('Components/Layout/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('Components/Layout/nav.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('nav-placeholder').innerHTML = html;
      setupNavMenuListeners();
      // Add logo click handler to toggle nav-menu
      const logo = document.getElementById('logo-link');
      if (logo) {
        logo.addEventListener('click', (e) => {
          e.preventDefault();
          const navMenu = document.getElementById('nav-menu-placeholder');
          if (navMenu) {
            navMenu.style.display = (navMenu.style.display === 'none' || navMenu.style.display === '') ? 'block' : 'none';
          }
        });
      }
    });
  loadNavMenu();
  renderContent('home');
  loadFooter();
});
