// Navigation and sidebar functionality
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Handle dropdown toggles on mobile
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close menu when link is clicked
    const navItems = document.querySelectorAll('.dropdown-menu a, .nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Extract page ID and trigger navigation
            const hash = item.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                window.location.hash = hash;
            }
        });
    });
}

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
    
    sidebarToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            if (parent) {
                parent.classList.toggle('active');
            }
        });
    });

    // Handle sidebar link clicks
    const sidebarLinks = document.querySelectorAll('.sidebar-submenu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (hash && hash.startsWith('#')) {
                window.location.hash = hash;
                e.preventDefault();
            }
        });
    });
}

// Utility functions
function renderDataGrid(containerId, data, template) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = data.map(item => {
        if (typeof template === 'function') {
            return template(item);
        }
        return template;
    }).join('');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSidebar();
});

// Export utilities


function loadPageContent(pageId) {
            if (!PAGES.hasOwnProperty(pageId)) {
                console.warn('Page not found:', pageId);
                return Promise.reject('Page not found');
            }

            const pageElement = document.getElementById(pageId);
            if (!pageElement) {
                console.warn('Page element not found:', pageId);
                return Promise.reject('Element not found');
            }

            const filePath = PAGES[pageId];
            const isMarkdown = filePath.endsWith('.md');

            return fetch(filePath)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return response.text();
                })
                .then(content => {
                    if (isMarkdown) {
                        // Convert markdown to HTML
                        const html = marked.parse(content);
                        pageElement.innerHTML = `<div class="content-section">${html}</div>`;
                    } else {
                        pageElement.innerHTML = content;
                    }
                    loadedPages.add(pageId);
                    
                    // Render Mermaid diagrams after content is loaded
                    if (window.mermaid) {
                        setTimeout(() => {
                            try {
                                mermaid.run();
                            } catch (err) {
                                console.warn('Error rendering mermaid diagrams:', err);
                            }
                        }, 100);
                    }
                })
                .catch(error => {
                    console.error(`Error loading page ${pageId}:`, error);
                    pageElement.innerHTML = `<div class="content-section"><h1>Error Loading Page</h1><p>Could not load content: ${error}</p></div>`;
                });
        }
            
            if (!PAGES.hasOwnProperty(pageId)) {
                console.warn('Invalid page ID:', pageId);
                return;
            }

            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // Show and load target page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                
                // Load content if not already loaded
                if (!loadedPages.has(pageId)) {
                    loadPageContent(pageId);
                } else {
                    // Already loaded, just render mermaid if needed
                    if (window.mermaid) {
                        setTimeout(() => {
                            try {
                                mermaid.run();
                            } catch (err) {
                                console.warn('Error rendering mermaid:', err);
                            }
                        }, 100);
                    }
                }
            }
        

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            // Load initial page
            navigateToPage(window.location.hash);
            
            // Handle hash changes
            window.addEventListener('hashchange', () => {
                navigateToPage(window.location.hash);
            });
        });