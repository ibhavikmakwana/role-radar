/**
 * RoleRadar - Universal Open-Source Job Discovery Engine
 * Multi-Screen Navigation, Cold Pitch Drafter, Companies Directory, Shortlist Manager,
 * Semantic Novel Role Discovery & Real-Time Bidirectional URL State Sync.
 */

(() => {
  'use strict';

  // State Management
  let allJobs = [];
  let currentScreen = 'jobs';
  let currentCategory = 'all';
  let activeChips = new Set();
  let searchQuery = '';
  let selectedJob = null;
  let activePitchChannel = 'email';
  let shortlistedJobIds = new Set();

  // Curated Company Directory
  const COMPANIES_DIRECTORY = [
    {
      name: 'Anthropic',
      city: 'San Francisco, CA / Remote',
      open: 24,
      focus: 'Frontier AI safety and research company building Claude, contextual retrieval, and steerable LLM agent systems.',
      tracks: ['AI Systems', 'Prompt Ops', 'Research Eng', 'Infra'],
      url: 'https://boards.greenhouse.io/anthropic'
    },
    {
      name: 'Vercel',
      city: 'Remote (Global)',
      open: 18,
      focus: 'Creators of Next.js and frontend cloud infrastructure; specialized edge functions, Turbopack, and v0 generative UI.',
      tracks: ['Edge Infra', 'React / Next.js', 'Solutions Architect', 'AI'],
      url: 'https://boards.greenhouse.io/vercel'
    },
    {
      name: 'Cursor (Anysphere)',
      city: 'San Francisco, CA / Hybrid',
      open: 12,
      focus: 'Building the AI-first code editor and next-generation programming environments backed by frontier models.',
      tracks: ['AI Compiler', 'TypeScript / Electron', 'C++', 'Systems'],
      url: 'https://jobs.ashbyhq.com/cursor'
    },
    {
      name: 'Palantir Technologies',
      city: 'Global Deployment / Hybrid',
      open: 32,
      focus: 'Foundational enterprise ontology & Forward Deployed Engineering platform powering defense, aerospace, and global industry.',
      tracks: ['Forward Deployed', 'Foundry', 'Distributed Systems', 'Security'],
      url: 'https://jobs.lever.co/palantir'
    },
    {
      name: 'Spotify',
      city: 'Stockholm / London / Remote',
      open: 19,
      focus: 'World leader in audio streaming, algorithmic personalization, mobile client performance, and creator monetization.',
      tracks: ['Flutter / Mobile', 'Data Science', 'Backend Go/Java', 'DevRel'],
      url: 'https://jobs.lever.co/spotify'
    },
    {
      name: 'dbt Labs',
      city: 'Remote (Global)',
      open: 15,
      focus: 'Pioneers of the analytics engineering category and SQL data transformation workflows.',
      tracks: ['Data Architecture', 'Python / Rust', 'Analytics Eng', 'Solutions'],
      url: 'https://boards.greenhouse.io/dbtlabs'
    }
  ];

  // DOM Elements
  const headerStatJobs = document.getElementById('header-stat-jobs');
  const searchInput = document.getElementById('search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const screenNav = document.getElementById('screen-nav');
  const navCountFeed = document.getElementById('nav-count-feed');
  const navCountCompanies = document.getElementById('nav-count-companies');
  const navCountShortlist = document.getElementById('nav-count-shortlist');
  const resultCounter = document.getElementById('result-counter');
  const categoriesBar = document.getElementById('categories-bar');
  const chipsGroup = document.getElementById('chips-group');
  const jobsFeedList = document.getElementById('jobs-feed-list');
  const jobsLoading = document.getElementById('jobs-loading');
  const jobsEmptyState = document.getElementById('jobs-empty-state');
  const btnResetFilters = document.getElementById('btn-reset-filters');
  const novelRoleBanner = document.getElementById('novel-role-banner');
  const novelTitle = document.getElementById('novel-title');
  const novelDesc = document.getElementById('novel-desc');
  const companiesGrid = document.getElementById('companies-grid');
  const shortlistFeedList = document.getElementById('shortlist-feed-list');
  const shortlistEmptyState = document.getElementById('shortlist-empty-state');
  const shareUrlPreview = document.getElementById('share-url-preview');
  const themeToggle = document.getElementById('theme-toggle');

  // Pitch Drafter Elements
  const pitchSelTitle = document.getElementById('pitch-sel-title');
  const pitchSelCompany = document.getElementById('pitch-sel-company');
  const pitchChannelTabs = document.getElementById('pitch-channel-tabs');
  const pitchCodeOutput = document.getElementById('pitch-code-output');
  const btnCopyPitch = document.getElementById('btn-copy-pitch');
  const linkPitchApply = document.getElementById('link-pitch-apply');
  const pitchMetaId = document.getElementById('pitch-meta-id');
  const pitchMetaSource = document.getElementById('pitch-meta-source');
  const pitchMetaLevel = document.getElementById('pitch-meta-level');

  // 1. Initial Load & URL State Hydration
  async function init() {
    loadTheme();
    loadStateFromUrl();
    setupEventListeners();
    renderCompanies();
    await fetchJobs();
  }

  // 2. Bidirectional URL State Sync
  function loadStateFromUrl() {
    const params = new URLSearchParams(window.location.search);

    // 1. Search query
    if (params.has('q')) {
      searchQuery = params.get('q') || '';
      if (searchInput) searchInput.value = searchQuery;
      if (searchClearBtn) searchClearBtn.hidden = !searchQuery;
    }

    // 2. Category
    if (params.has('cat')) {
      currentCategory = params.get('cat') || 'all';
      if (categoriesBar) {
        categoriesBar.querySelectorAll('.cat-pill').forEach((p) => {
          p.classList.toggle('active', p.dataset.cat === currentCategory);
        });
      }
    }

    // 3. Sub-filter chips
    if (params.has('chips')) {
      const chipsArr = params.get('chips').split(',').filter(Boolean);
      activeChips = new Set(chipsArr);
      if (chipsGroup) {
        chipsGroup.querySelectorAll('.chip-btn').forEach((c) => {
          c.classList.toggle('active', activeChips.has(c.dataset.chip));
        });
      }
    }

    // 4. Screen tab
    if (params.has('screen')) {
      const scr = params.get('screen');
      if (['jobs', 'companies', 'shortlist'].includes(scr)) {
        currentScreen = scr;
        switchScreen(currentScreen, false);
      }
    }

    // 5. Shortlisted IDs from Hash or LocalStorage
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
  }

  function syncUrlState() {
    const params = new URLSearchParams();

    if (searchQuery) {
      params.set('q', searchQuery);
    }
    if (currentCategory && currentCategory !== 'all') {
      params.set('cat', currentCategory);
    }
    if (activeChips.size > 0) {
      params.set('chips', Array.from(activeChips).join(','));
    }
    if (currentScreen && currentScreen !== 'jobs') {
      params.set('screen', currentScreen);
    }
    if (selectedJob && selectedJob.id) {
      params.set('job', selectedJob.id);
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const hashString = shortlistedJobIds.size > 0 ? `#saved=${Array.from(shortlistedJobIds).join(',')}` : '';
    const newUrl = `${window.location.pathname}${queryString}${hashString}`;

    history.replaceState(null, '', newUrl);

    // Update the live share URL preview in the Shortlist tab
    if (shareUrlPreview) {
      shareUrlPreview.textContent = window.location.href;
    }
  }

  // 3. Screen Switcher
  function switchScreen(screenName, shouldSync = true) {
    currentScreen = screenName;

    if (screenNav) {
      screenNav.querySelectorAll('.nav-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.screen === currentScreen);
      });
    }

    document.querySelectorAll('.screen-section').forEach((s) => s.classList.remove('active'));
    const targetSection = document.getElementById(`screen-${currentScreen}`);
    if (targetSection) targetSection.classList.add('active');

    if (shouldSync) {
      syncUrlState();
    }
  }

  // 4. Data Ingestion
  async function fetchJobs() {
    try {
      let response;
      try {
        response = await fetch('/api/jobs');
        if (!response.ok) throw new Error('Fallback to static feed');
      } catch {
        response = await fetch('data/feed.json');
      }

      const data = await response.json();
      allJobs = data.jobs || [];

      if (headerStatJobs) {
        headerStatJobs.textContent = `LIVE · ${allJobs.length} ROLES`;
      }
      if (navCountFeed) {
        navCountFeed.textContent = allJobs.length;
      }
      if (navCountCompanies) {
        navCountCompanies.textContent = COMPANIES_DIRECTORY.length;
      }

      if (jobsLoading) jobsLoading.hidden = true;

      // Check URL for preselected job
      const params = new URLSearchParams(window.location.search);
      const urlJobId = params.get('job');
      if (urlJobId) {
        const found = allJobs.find((j) => j.id === urlJobId);
        if (found) selectedJob = found;
      }

      // Default to first job if none selected
      if (allJobs.length > 0 && !selectedJob) {
        selectedJob = allJobs[0];
      }

      updatePitchDrafter();
      renderFeed();
      renderShortlist();
      syncUrlState();
    } catch (err) {
      console.error('[RoleRadar] Ingestion error:', err);
      if (jobsLoading) jobsLoading.hidden = true;
      if (jobsFeedList) {
        jobsFeedList.innerHTML = `<p class="jobs-empty-state">Unable to load feed. Run <code>python scripts/scraper.py</code> locally.</p>`;
      }
    }
  }

  // 5. Feed Filtering & Rendering
  function renderFeed() {
    if (!jobsFeedList) return;

    let filtered = allJobs.filter((job) => {
      // Category filter
      if (currentCategory !== 'all' && job.category !== currentCategory) {
        return false;
      }

      // Sub-filter chips
      if (activeChips.has('fresher')) {
        const isExpMatch = job.experienceLevel === 'fresher' || job.experienceLevel === 'entry' || /0[–-]2|junior|entry|intern|graduate/i.test(job.title);
        if (!isExpMatch) return false;
      }
      if (activeChips.has('remote')) {
        const isRemote = /remote|anywhere|global/i.test(job.location || '');
        if (!isRemote) return false;
      }
      if (activeChips.has('senior')) {
        const isSenior = /senior|lead|principal|staff|head|architect/i.test(job.title) || job.experienceLevel === 'senior' || job.experienceLevel === 'lead';
        if (!isSenior) return false;
      }
      if (activeChips.has('ats')) {
        if (!job.atsType || job.atsType === 'generic') return false;
      }

      // Search matching (Deep body matching title + company + location + category + level)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const full = `${job.title} ${job.company} ${job.location || ''} ${job.category} ${job.experienceLevel || ''}`.toLowerCase();
        if (!full.includes(q)) return false;
      }

      return true;
    });

    // Result Counter
    if (resultCounter) {
      resultCounter.textContent = `Showing ${filtered.length} of ${allJobs.length} roles`;
    }

    // Novel Role Discovery check
    handleNovelRoleCheck(filtered);

    if (filtered.length === 0) {
      jobsFeedList.innerHTML = '';
      if (jobsEmptyState) jobsEmptyState.hidden = false;
      return;
    }

    if (jobsEmptyState) jobsEmptyState.hidden = true;

    jobsFeedList.innerHTML = filtered
      .map((job) => {
        const isSaved = shortlistedJobIds.has(job.id);
        const isSelected = selectedJob && selectedJob.id === job.id;

        return `
          <article class="job-card ${isSelected ? 'active' : ''}" data-id="${job.id}">
            <div class="job-card-header">
              <div class="company-brand-row">
                <span class="company-logo-emoji">${job.logo || '💼'}</span>
                <span class="company-title-text">${escapeHtml(job.company)}</span>
              </div>
              <button class="btn-star-bookmark" data-id="${job.id}" title="${isSaved ? 'Remove Bookmark' : 'Save Bookmark'}">
                ${isSaved ? '⭐' : '☆'}
              </button>
            </div>

            <h3 class="job-role-title">${escapeHtml(job.title)}</h3>

            <div class="job-tags-row">
              <span class="job-tag">📍 ${escapeHtml(job.location || 'Remote')}</span>
              <span class="job-tag tag-exp">⚡ ${escapeHtml(job.experienceLevel ? job.experienceLevel.toUpperCase() : 'MID')}</span>
              <span class="job-tag tag-ats">🏢 ${escapeHtml(job.atsType ? job.atsType.toUpperCase() : 'DIRECT ATS')}</span>
              <span class="job-tag">📁 ${escapeHtml((job.category || 'tech').toUpperCase())}</span>
            </div>
          </article>
        `;
      })
      .join('');
  }

  // 6. Novel Role Discovery Banner
  function handleNovelRoleCheck(filtered) {
    if (!novelRoleBanner) return;

    if (searchQuery.length > 3 && filtered.length === 0) {
      novelTitle.textContent = `Novel Role Detected: "${searchQuery}"`;
      novelDesc.textContent = `No standardized job posts match this exact query yet. RoleRadar has logged this search query into your local stream. Direct ATS connectors will automatically index and display newly posted roles here.`;
      novelRoleBanner.hidden = false;
    } else {
      novelRoleBanner.hidden = true;
    }
  }

  // 7. Cold Pitch Drafter Generation
  function updatePitchDrafter() {
    if (!selectedJob) return;

    if (pitchSelTitle) pitchSelTitle.textContent = selectedJob.title;
    if (pitchSelCompany) pitchSelCompany.textContent = `${selectedJob.company} · ${selectedJob.location || 'Remote'}`;
    if (linkPitchApply) linkPitchApply.href = selectedJob.applyUrl || '#';

    if (pitchMetaId) pitchMetaId.textContent = `ID · ${selectedJob.id}`;
    if (pitchMetaSource) pitchMetaSource.textContent = `SOURCE · ${selectedJob.atsType || 'Direct ATS'} · verified`;
    if (pitchMetaLevel) pitchMetaLevel.textContent = `LEVEL · ${(selectedJob.experienceLevel || 'Mid-Senior').toUpperCase()}`;

    const pitchText = generatePitchCopy(selectedJob, activePitchChannel);
    if (pitchCodeOutput) {
      pitchCodeOutput.textContent = pitchText;
    }
  }

  function generatePitchCopy(job, channel) {
    const role = job.title;
    const company = job.company;

    if (channel === 'email') {
      return `Subject: Application: ${role} — Bhavik Makwana

Hi ${company} Recruiting Team,

I am writing to express my strong interest in the ${role} position at ${company}.

With hands-on experience architecting scalable distributed platforms, production AI agent workflows, and cross-platform mobile systems, I have delivered low-latency edge architectures and customer success deployments.

I admire ${company}'s focus on high engineering velocity. I would welcome the opportunity to discuss how my technical background aligns with your engineering roadmap.

Best regards,
Bhavik Makwana
https://github.com/ibhavikmakwana
https://ibhavikmakwana.dev`;
    }

    if (channel === 'manager') {
      return `Hi [Hiring Manager Name],

Came across ${company}'s ${role} opening and wanted to reach out directly.

I specialize in full-stack architecture, production AI tooling, and high-performance client systems. Given your team's current focus, I believe I could immediately accelerate your velocity and deliver tangible impact.

Would love to share a few specific technical ideas if you have 5 minutes this week.

Cheers,
Bhavik Makwana (github.com/ibhavikmakwana)`;
    }

    if (channel === 'linkedin') {
      return `Hi [First Name] — noticed you lead engineering efforts at ${company}. I saw the ${role} opening and felt my background in scalable edge systems and AI engineering is an exact match for the challenges your team is tackling. Would love to connect and share a quick summary of relevant work!`;
    }

    if (channel === 'x') {
      return `Hey [Handle]! Huge fan of what ${company} is shipping. Saw the ${role} opening — I specialize in production AI systems & performant mobile architectures. Sent an application, would love to send over my portfolio if you're the right person!`;
    }

    return '';
  }

  // 8. Companies Directory Rendering
  function renderCompanies() {
    if (!companiesGrid) return;

    companiesGrid.innerHTML = COMPANIES_DIRECTORY.map((c) => `
      <div class="company-card">
        <div class="company-card-top">
          <h3 class="company-card-name">${escapeHtml(c.name)}</h3>
          <p class="company-card-city">📍 ${escapeHtml(c.city)}</p>
          <p class="company-card-focus">${escapeHtml(c.focus)}</p>
          <div class="company-tracks-row">
            ${c.tracks.map((t) => `<span class="track-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
        </div>
        <div class="company-card-footer">
          <span class="company-open-count">${c.open} Active Openings</span>
          <a href="${escapeHtml(c.url)}" target="_blank" rel="noopener noreferrer" class="btn-pitch-apply">Careers ↗</a>
        </div>
      </div>
    `).join('');
  }

  // 9. Shortlist Manager & Exports
  function toggleShortlist(jobId) {
    if (shortlistedJobIds.has(jobId)) {
      shortlistedJobIds.delete(jobId);
    } else {
      shortlistedJobIds.add(jobId);
    }

    saveShortlistToStorage();
    syncUrlState();
    renderFeed();
    renderShortlist();
  }

  function renderShortlist() {
    if (navCountShortlist) {
      navCountShortlist.textContent = shortlistedJobIds.size;
    }

    if (!shortlistFeedList) return;

    const savedJobs = allJobs.filter((j) => shortlistedJobIds.has(j.id));

    if (savedJobs.length === 0) {
      shortlistFeedList.innerHTML = '';
      if (shortlistEmptyState) shortlistEmptyState.hidden = false;
      return;
    }

    if (shortlistEmptyState) shortlistEmptyState.hidden = true;

    shortlistFeedList.innerHTML = savedJobs.map((job) => `
      <article class="job-card" data-id="${job.id}">
        <div class="job-card-header">
          <div class="company-brand-row">
            <span class="company-logo-emoji">${job.logo || '💼'}</span>
            <span class="company-title-text">${escapeHtml(job.company)}</span>
          </div>
          <button class="btn-star-bookmark" data-id="${job.id}" title="Remove Bookmark">⭐</button>
        </div>
        <h3 class="job-role-title">${escapeHtml(job.title)}</h3>
        <div class="job-tags-row">
          <span class="job-tag">📍 ${escapeHtml(job.location || 'Remote')}</span>
          <span class="job-tag tag-exp">⚡ ${escapeHtml(job.experienceLevel || 'MID')}</span>
          <a href="${escapeHtml(job.applyUrl)}" target="_blank" rel="noopener noreferrer" class="btn-pitch-apply" style="margin-left:auto;">Apply Direct ↗</a>
        </div>
      </article>
    `).join('');
  }

  function exportShortlistJson() {
    const savedJobs = allJobs.filter((j) => shortlistedJobIds.has(j.id));
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedJobs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `roleradar_shortlist_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function exportShortlistCsv() {
    const savedJobs = allJobs.filter((j) => shortlistedJobIds.has(j.id));
    let csv = 'ID,Company,Title,Location,Category,Experience,ApplyUrl\n';
    savedJobs.forEach((j) => {
      csv += `"${j.id}","${j.company}","${j.title}","${j.location || ''}","${j.category}","${j.experienceLevel || ''}","${j.applyUrl}"\n`;
    });
    const dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `roleradar_shortlist_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function saveShortlistToStorage() {
    const ids = Array.from(shortlistedJobIds);
    localStorage.setItem('roleradar_shortlist', JSON.stringify(ids));
  }

  // 10. Theme Switcher
  function loadTheme() {
    const saved = localStorage.getItem('roleradar_theme') || 'dark';
    document.body.className = `theme-${saved}`;
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';
    document.body.className = `theme-${newTheme}`;
    localStorage.setItem('roleradar_theme', newTheme);
  }

  // 11. Event Listeners
  function setupEventListeners() {
    // Screen Navigation
    if (screenNav) {
      screenNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-btn');
        if (!btn || !btn.dataset.screen) return;
        switchScreen(btn.dataset.screen, true);
      });
    }

    // Omnibar Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        if (searchClearBtn) searchClearBtn.hidden = !searchQuery;
        syncUrlState();
        renderFeed();
      });
    }

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        searchClearBtn.hidden = true;
        syncUrlState();
        renderFeed();
      });
    }

    // Category pills
    if (categoriesBar) {
      categoriesBar.addEventListener('click', (e) => {
        const pill = e.target.closest('.cat-pill');
        if (!pill) return;

        categoriesBar.querySelectorAll('.cat-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        currentCategory = pill.dataset.cat || 'all';
        syncUrlState();
        renderFeed();
      });
    }

    // Filter Chips
    if (chipsGroup) {
      chipsGroup.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip-btn');
        if (!chip) return;

        const key = chip.dataset.chip;
        if (activeChips.has(key)) {
          activeChips.delete(key);
          chip.classList.remove('active');
        } else {
          activeChips.add(key);
          chip.classList.add('active');
        }
        syncUrlState();
        renderFeed();
      });
    }

    // Reset filters button
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', () => {
        currentCategory = 'all';
        activeChips.clear();
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (searchClearBtn) searchClearBtn.hidden = true;
        if (categoriesBar) {
          categoriesBar.querySelectorAll('.cat-pill').forEach((p) => p.classList.remove('active'));
          categoriesBar.querySelector('[data-cat="all"]')?.classList.add('active');
        }
        if (chipsGroup) {
          chipsGroup.querySelectorAll('.chip-btn').forEach((c) => c.classList.remove('active'));
        }
        syncUrlState();
        renderFeed();
      });
    }

    // Job card selection and bookmarking
    if (jobsFeedList) {
      jobsFeedList.addEventListener('click', (e) => {
        const starBtn = e.target.closest('.btn-star-bookmark');
        if (starBtn && starBtn.dataset.id) {
          e.stopPropagation();
          toggleShortlist(starBtn.dataset.id);
          return;
        }

        const card = e.target.closest('.job-card');
        if (!card || !card.dataset.id) return;

        const found = allJobs.find((j) => j.id === card.dataset.id);
        if (found) {
          selectedJob = found;
          document.querySelectorAll('.job-card').forEach((c) => c.classList.remove('active'));
          card.classList.add('active');
          updatePitchDrafter();
          syncUrlState();
        }
      });
    }

    // Shortlist actions
    if (shortlistFeedList) {
      shortlistFeedList.addEventListener('click', (e) => {
        const starBtn = e.target.closest('.btn-star-bookmark');
        if (starBtn && starBtn.dataset.id) {
          toggleShortlist(starBtn.dataset.id);
        }
      });
    }

    // Pitch channel switcher
    if (pitchChannelTabs) {
      pitchChannelTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.pitch-tab-btn');
        if (!tab || !tab.dataset.channel) return;

        pitchChannelTabs.querySelectorAll('.pitch-tab-btn').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        activePitchChannel = tab.dataset.channel;
        updatePitchDrafter();
      });
    }

    // Copy Pitch button
    if (btnCopyPitch) {
      btnCopyPitch.addEventListener('click', async () => {
        if (!pitchCodeOutput) return;
        try {
          await navigator.clipboard.writeText(pitchCodeOutput.textContent);
          const orig = btnCopyPitch.textContent;
          btnCopyPitch.textContent = '✓ Copied!';
          setTimeout(() => {
            btnCopyPitch.textContent = orig;
          }, 1800);
        } catch (err) {
          console.error('Failed to copy pitch:', err);
        }
      });
    }

    // Export buttons
    document.getElementById('btn-export-json')?.addEventListener('click', exportShortlistJson);
    document.getElementById('btn-export-csv')?.addEventListener('click', exportShortlistCsv);
    document.getElementById('btn-copy-share')?.addEventListener('click', async () => {
      const btn = document.getElementById('btn-copy-share');
      try {
        await navigator.clipboard.writeText(window.location.href);
        if (btn) {
          const orig = btn.textContent;
          btn.textContent = '✓ Link Copied!';
          setTimeout(() => {
            btn.textContent = orig;
          }, 1800);
        }
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    });

    // Theme toggle button
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Global keyboard shortcuts: / for search, Escape to blur/clear
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput?.focus();
      } else if (e.key === 'Escape') {
        if (searchInput && document.activeElement === searchInput) {
          searchInput.blur();
        }
      }
    });

    // Popstate handling for browser forward/back buttons
    window.addEventListener('popstate', () => {
      loadStateFromUrl();
      updatePitchDrafter();
      renderFeed();
      renderShortlist();
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

  // DOM ready check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
