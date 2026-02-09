// Main Page configuration
        const PAGES = {
                'home': 'pages/learn/pipeline/index.html',
                'pipeline': 'pages/enterprise/pages/pipeline/index.html',
                'pipeline2': 'pages/learn/spipeline/index2.html',
                'qsharp': 'pages/name/QSharp.html',
                'rnr': 'pages/learn/resources.html',
                'hdf5': 'pages/enterprise/pages/data/hdf5.html',
                'data': 'pages/enterprise/pages/data/data.html',
                'datalakehouse': 'pages/enterprise/pages/data/bigdata/datalakehouse.html',
                'bigdatalinks': 'pages/enterprise/pages/sdata/bigdata/links.html',
                'tools-list': 'pages/learn/tools-list.html',
                'bmi': 'content/public/BMI/README.md',
                'dashboard-overview': 'pages/dashboard/overview.html',
                'users-list': 'pages/users/users-list.html',
                'settings-general': 'pages/settings/settings-general.html',
                'journals': 'pages/legacy/wiki-old/rss/iframe.html',
                'universities': 'pages/legacy/wiki-old/uni/iframe.html',
                'python': 'pages/learn/python.html',
        
// Enterprise Page configuration

// Learn Page configuration

// Quantum Page configuration
                'quantum-computing': 'content/research/quantum-computing.html',
                'data-resources': 'content/research/data-resources.html',
                'tools-catalog': 'content/research/tools-catalog.html',
                'deployment-pipeline': 'content/infrastructure/deployment-pipeline.html',
                'cloud-platforms': 'content/infrastructure/cloud-platforms.html',
                'architecture-docs': 'content/infrastructure/architecture-docs.html',
                'dx-netops': 'content/infrastructure/dx-netops.md',
                'universities': '../learn/resources/universities.html',
                'journals': '../learn/resources/journals.html',
                'publications': '../learn/resources/publications.html',
                'geofence': 'content/research/geofence.html',
                'dashboard': 'content/admin/dashboard.html',
                'mat-cs': '../learn/resources/mat-cs/mat-cs.md',
                'qsharp': '../learn/resources/QSharp.html',
                'users-management': 'content/admin/users-management.html',
                'settings': 'content/admin/settings.html'
        };

        const loadedPages = new Set();

        // Load navbar and sidebar
        Promise.all([
            fetch('assets/layout/navbar.html').then(r => r.text()),
            fetch('assets/layout/sidebar.html').then(r => r.text())
        ]).then(([navbar, sidebar]) => {
            document.getElementById('navbar').innerHTML = navbar;
            document.getElementById('sidebar').innerHTML = sidebar;
            initNavbar();
            initSidebar();
        }).catch(error => console.error('Error loading layout:', error));

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

        function navigateToPage(hash) {
            const pageId = (hash.substring(1) || 'quantum-computing').toLowerCase();
            
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
        }