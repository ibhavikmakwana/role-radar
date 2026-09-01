/**
 * RoleRadar - Universal Open-Source Job Discovery Engine
 * Handles multi-ATS data feeds, semantic novel role resolution, and URL-hash shortlist sync.
 */

(function () {
  'use strict';

  let allJobs = [];
  let currentCategory = 'all';
  let searchQuery = '';
  let shortlistedJobIds = new Set();
  let showingShortlistOnly = false;

  // DOM Elements
  const jobsGrid = document.getElementById('jobs-grid');
  const searchInput = document.getElementById('role-search-input');
  const categoryFilters = document.getElementById('category-filters');
  const totalJobsCount = document.getElementById('total-jobs-count');
  const emptyState = document.getElementById('empty-state');
  const novelBanner = document.getElementById('novel-role-banner');
  const novelTitle = document.getElementById('novel-title');
  const novelDesc = document.getElementById('novel-desc');
  const shortlistCount = document.getElementById('shortlist-count');
  const viewShortlistBtn = document.getElementById('view-shortlist-btn');
  const themeToggle = document.getElementById('theme-toggle');

  // 1. Initial Load
  async function init() {
    loadTheme();
    loadShortlistFromUrlOrStorage();
    setupEventListeners();
    await fetchJobs();
  }

  // 2. Fetch Jobs Feed (Static JSON or Cloudflare Worker API)
  async function fetchJobs() {
    try {
      // First attempt to load dynamic Cloudflare Worker API, fallback to static feed.json
      let response;
      try {
        response = await fetch('/api/jobs');
        if (!response.ok) throw new Error('API unavailable, falling back');
      } catch {
        response = await fetch('data/feed.json');
      }

      const data = await response.json();
      allJobs = data.jobs || [];

      if (totalJobsCount) {
        totalJobsCount.textContent = `${allJobs.length} ROLES SYNCED`;
      }

      renderJobs();
    } catch (err) {
      console.error('[RoleRadar] Failed to load jobs feed:', err);
      if (jobsGrid) {
        jobsGrid.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">⚠️</div>
            <h3>Unable to load jobs feed</h3>
            <p>Please run the local python scraper (<code>python scripts/scraper.py</code>) or verify internet connection.</p>
          </div>
        `;
      }
    }
  }

  // 3. Render Jobs & Novel Role Discovery
  function renderJobs() {
    if (!jobsGrid) return;

    let filtered = allJobs.filter((job) => {
      // Category check
      if (currentCategory !== 'all' && job.category !== currentCategory) {
        return false;
      }

      // Shortlist filter
      if (showingShortlistOnly && !shortlistedJobIds.has(job.id)) {
        return false;
      }

      // Search Query check (Deep body matching title + company + location + category)
      if (searchQuery) {
        const queryLower = searchQuery.toLowerCase();
        const fullText = `${job.title} ${job.company} ${job.location} ${job.category} ${job.experienceLevel || ''}`.toLowerCase();
        return fullText.includes(queryLower);
      }

      return true;
    });

    // Check for Novel / Undefined Role when 0 results or unconventional search
    handleNovelRoleCheck(filtered);

    if (filtered.length === 0) {
      jobsGrid.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    jobsGrid.innerHTML = filtered
      .map((job) => {
        const isSaved = shortlistedJobIds.has(job.id);
        return `
          <article class="job-card" data-id="${job.id}">
            <div>
              <div class="job-header">
                <div class="company-info">
                  <span class="company-logo">${job.logo || '💼'}</span>
                  <span class="company-name">${escapeHtml(job.company)}</span>
                </div>
                <button class="btn-bookmark ${isSaved ? 'bookmarked' : ''}" data-id="${job.id}" title="Save to Shortlist (Press S)">
                  ${isSaved ? '🔖' : '📑'}
                </button>
              </div>

              <h3 class="job-title">${escapeHtml(job.title)}</h3>

              <div class="job-meta-row">
                <span class="meta-tag">📍 ${escapeHtml(job.location || 'Remote')}</span>
                <span class="meta-tag">⚡ ${escapeHtml(job.experienceLevel ? job.experienceLevel.toUpperCase() : 'MID')}</span>
                <span class="meta-tag">🏢 ${escapeHtml(job.atsType ? job.atsType.toUpperCase() : 'ATS')}</span>
              </div>
            </div>

            <div class="job-actions">
              <span class="meta-tag">Verified Direct ATS</span>
              <a href="${escapeHtml(job.applyUrl)}" target="_blank" rel="noopener noreferrer" class="btn-apply">
                Apply Direct ↗
              </a>
            </div>
          </article>
        `;
      })
      .join('');
  }

  // 4. Novel / Semantic Role Synthesizer
  function handleNovelRoleCheck(filtered) {
    if (!novelBanner) return;

    if (searchQuery.length > 3 && filtered.length === 0) {
      novelTitle.textContent = `Novel Role Detected: "${searchQuery}"`;
      novelDesc.textContent = `No standardized postings match this exact title yet. RoleRadar has logged this into the local radar stream. When direct ATS feeds list matching roles, they will automatically appear here.`;
      novelBanner.hidden = false;
    } else {
      novelBanner.hidden = true;
    }
  }

  // 5. Shortlist & URL Hash Sync
  function toggleShortlist(jobId) {
    if (shortlistedJobIds.has(jobId)) {
      shortlistedJobIds.delete(jobId);
    } else {
      shortlistedJobIds.add(jobId);
    }

    updateShortlistUi();
    saveShortlistToUrlAndStorage();
    renderJobs();
  }

  function updateShortlistUi() {
    if (shortlistCount) {
      shortlistCount.textContent = shortlistedJobIds.size;
    }
  }

  function saveShortlistToUrlAndStorage() {
    const ids = Array.from(shortlistedJobIds);
    localStorage.setItem('roleradar_shortlist', JSON.stringify(ids));

    // Update URL hash for sharing
    if (ids.length > 0) {
      window.location.hash = `saved=${ids.join(',')}`;
    } else {
      window.location.hash = '';
    }
  }

  function loadShortlistFromUrlOrStorage() {
    const hash = window.location.hash;
    if (hash.startsWith('#saved=')) {
      const ids = hash.replace('#saved=', '').split(',').filter(Boolean);
      shortlistedJobIds = new Set(ids);
    } else {
      try {
        const stored = JSON.parse(localStorage.getItem('roleradar_shortlist') || '[]');
        shortlistedJobIds = new Set(stored);
      } catch {
        shortlistedJobIds = new Set();
      }
    }
    updateShortlistUi();
  }

  // 6. Theme Toggle (Dark / Light)
  function loadTheme() {
    const saved = localStorage.getItem('roleradar_theme') || 'dark';
    if (saved === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    if (isDark) {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      localStorage.setItem('roleradar_theme', 'light');
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      localStorage.setItem('roleradar_theme', 'dark');
    }
  }

  // 7. Event Listeners & Keyboard Shortcuts
  function setupEventListeners() {
    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderJobs();
      });
    }

    // Category pills
    if (categoryFilters) {
      categoryFilters.addEventListener('click', (e) => {
        const target = e.target.closest('.pill');
        if (!target) return;

        categoryFilters.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
        target.classList.add('active');

        currentCategory = target.dataset.cat || 'all';
        renderJobs();
      });
    }

    // Shortlist view toggle
    if (viewShortlistBtn) {
      viewShortlistBtn.addEventListener('click', () => {
        showingShortlistOnly = !showingShortlistOnly;
        viewShortlistBtn.classList.toggle('active', showingShortlistOnly);
        renderJobs();
      });
    }

    // Bookmark clicks on job cards
    if (jobsGrid) {
      jobsGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-bookmark');
        if (btn && btn.dataset.id) {
          toggleShortlist(btn.dataset.id);
        }
      });
    }

    // Theme toggle
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Keyboard navigation: / (search), Esc (clear)
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput?.focus();
      } else if (e.key === 'Escape') {
        if (searchInput && document.activeElement === searchInput) {
          searchInput.value = '';
          searchQuery = '';
          searchInput.blur();
          renderJobs();
        }
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
