/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Main Application Controller, Router & UI Orchestrator
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

class SchoolERPApp {
  constructor() {
    this.currentRoute = 'dashboard';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.navigate(this.currentRoute);
    window.TPS_STATE.subscribe(() => {
      this.refreshHeaderUser();
    });
  }

  setupEventListeners() {
    // Keyboard shortcut for Global Search (Ctrl + K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
      }
    });

    // Close modal on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  navigate(route) {
    this.currentRoute = route;

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.route === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const mainContainer = document.getElementById('content-area');
    if (!mainContainer) return;

    let contentHtml = '';
    let postRenderHook = null;

    switch (route) {
      case 'dashboard':
        contentHtml = window.TPS_MODULE_DASHBOARD.render();
        postRenderHook = () => window.TPS_MODULE_DASHBOARD.postRender();
        break;
      case 'students':
        contentHtml = window.TPS_MODULE_STUDENTS.render();
        break;
      case 'admissions':
        contentHtml = window.TPS_MODULE_ADMISSIONS.render();
        break;
      case 'academics':
        contentHtml = window.TPS_MODULE_ACADEMICS.render();
        break;
      case 'attendance':
        contentHtml = window.TPS_MODULE_ATTENDANCE.render();
        break;
      case 'fees':
        contentHtml = window.TPS_MODULE_FEES.render();
        break;
      case 'exams':
        contentHtml = window.TPS_MODULE_EXAMS.render();
        break;
      case 'portal-teacher':
        contentHtml = window.TPS_MODULE_PORTALS.renderTeacherPortal();
        break;
      case 'portal-student':
        contentHtml = window.TPS_MODULE_PORTALS.renderStudentPortal();
        break;
      case 'portal-parent':
        contentHtml = window.TPS_MODULE_PORTALS.renderParentPortal();
        break;
      case 'staff':
        contentHtml = window.TPS_MODULE_STAFF.render();
        break;
      case 'communication':
      case 'notices':
        contentHtml = window.TPS_MODULE_COMMUNICATION.render();
        break;
      case 'accounting':
        contentHtml = window.TPS_MODULE_ACCOUNTING.render();
        break;
      case 'library':
        contentHtml = window.TPS_MODULE_LIB_INV.render();
        break;
      case 'certificates':
        contentHtml = window.TPS_MODULE_CERTIFICATES.render();
        break;
      case 'reports':
        contentHtml = window.TPS_MODULE_REPORTS.render();
        break;
      case 'settings':
        contentHtml = window.TPS_MODULE_SETTINGS.render();
        break;
      default:
        contentHtml = window.TPS_MODULE_DASHBOARD.render();
        postRenderHook = () => window.TPS_MODULE_DASHBOARD.postRender();
    }

    mainContainer.innerHTML = contentHtml;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (postRenderHook) {
      postRenderHook();
    }
  }

  refresh() {
    this.navigate(this.currentRoute);
  }

  refreshHeaderUser() {
    const user = window.TPS_STATE.currentUser;
    const nameEl = document.getElementById('header-user-name');
    const roleEl = document.getElementById('header-user-role');
    const avatarEl = document.getElementById('header-user-avatar');

    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role;
    if (avatarEl) avatarEl.textContent = user.avatar;
  }

  toggleSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar) return;
    const willOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');
    if (willOpen) {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('active');
    } else {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('active');
    }
  }

  // ==========================================
  // ENGLISH <-> URDU LANGUAGE TOGGLING
  // ==========================================
  toggleLanguage() {
    const current = window.TPS_STATE.currentLanguage;
    const newLang = current === 'en' ? 'ur' : 'en';
    window.TPS_STATE.currentLanguage = newLang;

    const htmlRoot = document.documentElement;
    const btn = document.getElementById('lang-switch-btn');

    if (newLang === 'ur') {
      htmlRoot.setAttribute('dir', 'rtl');
      htmlRoot.setAttribute('lang', 'ur');
      if (btn) btn.innerHTML = `<span>English</span>`;
      this.showToast('اردو زبان اور دائیں سے بائیں (RTL) موڈ فعال ہو گیا ہے۔', 'info');
    } else {
      htmlRoot.setAttribute('dir', 'ltr');
      htmlRoot.setAttribute('lang', 'en');
      if (btn) btn.innerHTML = `<span>اردو (Urdu)</span>`;
      this.showToast('Switched to English interface.', 'info');
    }

    this.refresh();
  }

  // ==========================================
  // THEME COLOR CUSTOMIZER MODAL
  // ==========================================
  openThemeModal() {
    const s = window.TPS_STATE.data.settings;
    const presets = window.TPS_BRANDING.colorPresets;

    const html = `
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">Institutional Color Presets</h4>
        <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 14px;">
          Choose an expertly curated institutional palette or define your custom colors.
        </p>
        <div class="theme-palette-grid">
          ${presets.map(p => `
            <div class="theme-palette-card ${s.primaryColor === p.primary ? 'active' : ''}" 
                 onclick="window.TPS_BRANDING.setThemeColors('${p.primary}', '${p.secondary}'); window.TPS_APP.showToast('Theme set to ${p.name}', 'success'); window.TPS_APP.closeModal();">
              <div class="palette-dots">
                <span class="palette-dot" style="background: ${p.primary};"></span>
                <span class="palette-dot sec" style="background: ${p.secondary};"></span>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 13px; color: var(--text-main);">${p.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${p.subtitle}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-color); padding-top: 18px;">
        <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">Custom Color Palette</h4>
        <form onsubmit="window.TPS_APP.applyCustomTheme(event)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Primary Brand Color</label>
              <div style="display: flex; gap: 10px; align-items: center;">
                <input type="color" id="theme-custom-primary" value="${s.primaryColor || '#0e4d34'}" style="width: 44px; height: 38px; border: none; cursor: pointer; border-radius: 6px;">
                <input type="text" id="theme-custom-primary-text" class="form-control" value="${s.primaryColor || '#0e4d34'}" oninput="document.getElementById('theme-custom-primary').value = this.value">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Secondary / Accent Color</label>
              <div style="display: flex; gap: 10px; align-items: center;">
                <input type="color" id="theme-custom-secondary" value="${s.secondaryColor || '#c99326'}" style="width: 44px; height: 38px; border: none; cursor: pointer; border-radius: 6px;">
                <input type="text" id="theme-custom-secondary-text" class="form-control" value="${s.secondaryColor || '#c99326'}" oninput="document.getElementById('theme-custom-secondary').value = this.value">
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px;">
            <button type="button" class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Cancel</button>
            <button type="submit" class="btn btn-primary">Apply & Save Theme Colors</button>
          </div>
        </form>
      </div>
    `;

    this.showGenericModal('Theme & Color Customizer (رنگ تبدیل کریں)', html, '', 'modal-lg');

    const pPicker = document.getElementById('theme-custom-primary');
    const pText = document.getElementById('theme-custom-primary-text');
    if (pPicker && pText) pPicker.oninput = (e) => pText.value = e.target.value;

    const sPicker = document.getElementById('theme-custom-secondary');
    const sText = document.getElementById('theme-custom-secondary-text');
    if (sPicker && sText) sPicker.oninput = (e) => sText.value = e.target.value;
  }

  applyCustomTheme(e) {
    e.preventDefault();
    const primary = document.getElementById('theme-custom-primary').value;
    const secondary = document.getElementById('theme-custom-secondary').value;
    window.TPS_BRANDING.setThemeColors(primary, secondary);
    this.closeModal();
    this.showToast('Custom theme colors saved successfully!', 'success');
  }

  // ==========================================
  // QUICK SCHOOL BRANDING CUSTOMIZER MODAL
  // ==========================================
  openBrandingModal() {
    const s = window.TPS_STATE.data.settings;
    const presets = window.TPS_BRANDING.schoolPresets;

    const html = `
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">Quick School Presets</h4>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
          ${presets.map((p, idx) => `
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.TPS_APP.loadSchoolPreset(${idx})">
              🏫 ${p.name}
            </button>
          `).join('')}
        </div>
      </div>

      <form onsubmit="window.TPS_APP.handleBrandingSubmit(event)" style="border-top: 1px solid var(--border-color); padding-top: 18px;">
        <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 18px; padding: 14px; background: var(--bg-card-muted); border-radius: 10px; flex-wrap: wrap;">
          <img id="quick-logo-preview" src="${s.logoUrl || 'assets/logo.png'}" style="width: 56px; height: 56px; border-radius: 8px; object-fit: contain; background: #fff; padding: 4px; border: 1.5px solid var(--secondary);">
          <div>
            <label class="form-label" style="margin-bottom: 2px;">School Crest / Logo</label>
            <input type="file" accept="image/*" onchange="window.TPS_APP.onQuickLogoUpload(event)" style="font-size: 12px;">
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">Changes logo on Header, Sidebar, Challans, DMC & Certificates</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">School Name *</label>
            <input type="text" id="brand-school-name" class="form-control" required value="${s.name}">
          </div>
          <div class="form-group">
            <label class="form-label">Campus / Tagline *</label>
            <input type="text" id="brand-school-campus" class="form-control" required value="${s.campus || s.tagline}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Address (Campus Location) *</label>
          <input type="text" id="brand-school-address" class="form-control" required value="${s.address}">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Phone Numbers *</label>
            <input type="text" id="brand-school-phone" class="form-control" required value="${s.phone}">
          </div>
          <div class="form-group">
            <label class="form-label">Official Email *</label>
            <input type="email" id="brand-school-email" class="form-control" required value="${s.email}">
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
          <button type="button" class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Branding & Apply Everywhere</button>
        </div>
      </form>
    `;

    this.showGenericModal('Custom School Identity & Logo (لوگو اور سکول کا نام تبدیل کریں)', html, '', 'modal-lg');
  }

  loadSchoolPreset(idx) {
    const p = window.TPS_BRANDING.schoolPresets[idx];
    if (!p) return;
    const n = document.getElementById('brand-school-name');
    const c = document.getElementById('brand-school-campus');
    const a = document.getElementById('brand-school-address');
    const ph = document.getElementById('brand-school-phone');
    const em = document.getElementById('brand-school-email');
    if (n) n.value = p.name;
    if (c) c.value = p.campus;
    if (a) a.value = p.address;
    if (ph) ph.value = p.phone;
    if (em) em.value = p.email;
    this.showToast(`Loaded ${p.name} details! Click Save to apply.`, 'info');
  }

  onQuickLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    window.TPS_BRANDING.handleImageUpload(file, (dataUrl) => {
      window.TPS_STATE.data.settings.logoUrl = dataUrl;
      const preview = document.getElementById('quick-logo-preview');
      if (preview) preview.src = dataUrl;
      window.TPS_BRANDING.applyCurrentBranding();
      this.showToast('New logo loaded and updated!', 'success');
    });
  }

  handleBrandingSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('brand-school-name').value;
    const campus = document.getElementById('brand-school-campus').value;
    const address = document.getElementById('brand-school-address').value;
    const phone = document.getElementById('brand-school-phone').value;
    const email = document.getElementById('brand-school-email').value;

    window.TPS_BRANDING.saveBranding({
      name,
      campus,
      tagline: campus,
      address,
      phone,
      email
    });
    this.closeModal();
    this.refresh();
    this.showToast('School branding updated successfully across all documents!', 'success');
  }

  // ==========================================
  // ROLE SWITCHER MODAL
  // ==========================================
  openRoleSwitcher() {
    const users = window.TPS_STATE.data.users || [];
    const html = `
      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
        Instantly simulate and experience the system through any staff, teacher, student, or parent account.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        ${users.map(u => `
          <div style="padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.2s;" 
               class="hover-role-card"
               onclick="window.TPS_STATE.setCurrentUser('${u.id}'); window.TPS_APP.closeModal(); window.TPS_APP.showToast('Active session changed to ${u.name}', 'success'); window.TPS_APP.refresh();">
            <div class="user-avatar" style="width: 34px; height: 34px; font-size: 12px;">${u.avatar}</div>
            <div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main);">${u.name}</div>
              <span class="badge badge-primary" style="font-size: 10px;">${u.role}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    this.showGenericModal('Switch System User & Role', html, '', 'modal-md');
  }

  // ==========================================
  // AI SCHOOL ASSISTANT MODAL (GEMINI + MIC)
  // ==========================================
  openAiAssistant(initialQuery = '') {
    const s = window.TPS_STATE.data.settings;
    const aiConfig = s.aiConfig || {};

    const html = `
      <div class="ai-panel-chat">
        <!-- AI Top Bar with Active Provider & Language Selector -->
        <div class="ai-top-status-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-success" style="display: inline-flex; align-items: center; gap: 5px;">
              <span class="ai-pulse-dot"></span> Gemini AI Active (Live)
            </span>
            <span style="color: var(--text-muted); font-size: 11px;">Language: <strong id="ai-active-voice-label">${window.TPS_AI.voiceLang === 'ur-PK' ? 'Urdu (اردو)' : 'English (US)'}</strong></span>
          </div>
          <div style="display: flex; gap: 6px; align-items: center;">
            <button type="button" class="ai-lang-pill ${window.TPS_AI.voiceLang === 'en-US' ? 'active' : ''}" id="ai-voice-en-pill" onclick="window.TPS_APP.setAiVoiceLang('en-US')">
              🇬🇧 English
            </button>
            <button type="button" class="ai-lang-pill ${window.TPS_AI.voiceLang === 'ur-PK' ? 'active' : ''}" id="ai-voice-ur-pill" onclick="window.TPS_APP.setAiVoiceLang('ur-PK')">
              🇵🇰 Urdu (اردو)
            </button>
            <button type="button" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 3px 8px;" onclick="window.TPS_APP.toggleAiKeyDrawer()" title="View or change Gemini API Key">
              ⚙️ API Key
            </button>
          </div>
        </div>

        <!-- Quick API Key Edit Drawer (Hidden by default) -->
        <div id="ai-key-drawer" style="display: none; padding: 12px 16px; background: #fffbeb; border-bottom: 1px solid #fef3c7;">
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
            <span style="font-size: 12px; font-weight: 700; color: #92400e;">Gemini API Key:</span>
            <input type="text" id="drawer-gemini-key" class="form-control" style="flex: 1; min-width: 200px; font-size: 12px; padding: 4px 8px;" value="${aiConfig.apiKey || ''}">
            <button type="button" class="btn btn-primary btn-sm" onclick="window.TPS_APP.saveAiKeyFromDrawer()">Save Key</button>
          </div>
        </div>

        <!-- Prominent Microphone Voice Hero Card -->
        <div class="ai-voice-hero-card">
          <div class="ai-mic-hero-wrap">
            <button type="button" class="ai-mic-hero-btn" id="ai-mic-hero-btn" onclick="window.TPS_APP.toggleAiVoiceRecording()" title="Click Microphone to Speak">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
            <div class="ai-mic-rings" id="ai-mic-rings"></div>
          </div>
          <div class="ai-voice-hero-info">
            <h4 id="ai-mic-hero-title">🎙️ Click Microphone & Speak</h4>
            <p id="ai-mic-hero-sub">Speak in English or Urdu. Your question will be transcribed and answered live.</p>
          </div>
        </div>

        <div id="ai-voice-status" class="ai-voice-status-bar" style="display: none;"></div>

        <!-- Chat Messages Container -->
        <div class="ai-chat-messages" id="ai-messages-container">
          <div class="ai-message ai">
            <div class="ai-avatar">🤖</div>
            <div class="ai-bubble">
              Welcome! I am the official <strong>AI Institutional Assistant</strong> for <strong>${s.name}</strong> connected live to Google Gemini AI.<br><br>
              I have verified real-time access to student admissions, daily attendance, fee vouchers & defaulters, exams, and staff records.<br>
              🎤 <strong>Click the microphone to speak, select a quick topic below, or type any question!</strong>
            </div>
          </div>
        </div>

        <!-- 1-Click English Prompt Chips -->
        <div class="voice-prompts-banner">
          <div class="voice-chips-title">Quick Instant Questions:</div>
          <div class="voice-prompt-chips">
            <span class="prompt-chip" onclick="window.TPS_APP.sendAiChip('What is the total number of students enrolled across all classes?')">👥 Total Enrolled Students</span>
            <span class="prompt-chip" onclick="window.TPS_APP.sendAiChip('Which student vouchers are currently unpaid fee defaulters?')">💰 Fee Defaulters & Balance</span>
            <span class="prompt-chip" onclick="window.TPS_APP.sendAiChip('What is the overall school attendance rate and who has low attendance?')">📊 Attendance Analytics</span>
            <span class="prompt-chip" onclick="window.TPS_APP.sendAiChip('Show the active teachers and staff members in the school')">👩‍🏫 Faculty Directory</span>
            <span class="prompt-chip" onclick="window.TPS_APP.sendAiChip('Provide a comprehensive monthly administrative summary for the Principal')">📋 Executive Brief</span>
            <span class="prompt-chip" onclick="window.TPS_APP.sendAiChip('Generate a Grade 9 Mathematics lesson plan on Quadratic Equations')">📘 Lesson Plan Generator</span>
          </div>
        </div>

        <!-- Chat Input Bar -->
        <form class="ai-chat-input-bar" onsubmit="window.TPS_APP.handleAiSubmit(event)">
          <div class="ai-voice-controls">
            <button type="button" class="ai-mic-btn" id="ai-mic-toggle-btn" onclick="window.TPS_APP.toggleAiVoiceRecording()" title="Click Microphone to Speak">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
          </div>

          <input type="text" id="ai-chat-input" class="form-control" style="flex: 1;" placeholder="Ask or speak: total students, fee balance, attendance, exam dates, lesson plans..." required>
          
          <button type="submit" class="btn btn-primary" style="flex-shrink: 0;">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Send
          </button>
        </form>
      </div>
    `;

    this.showGenericModal(`AI Institutional Voice Assistant — ${s.name}`, html, '', 'modal-lg');

    if (initialQuery) {
      setTimeout(() => {
        this.sendAiChip(initialQuery);
      }, 200);
    }
  }

  setAiVoiceLang(lang) {
    window.TPS_AI.voiceLang = lang;
    const urPill = document.getElementById('ai-voice-ur-pill');
    const enPill = document.getElementById('ai-voice-en-pill');
    const label = document.getElementById('ai-active-voice-label');

    if (urPill && enPill) {
      if (lang === 'ur-PK') {
        urPill.classList.add('active');
        enPill.classList.remove('active');
        if (label) label.textContent = 'Urdu (اردو)';
      } else {
        enPill.classList.add('active');
        urPill.classList.remove('active');
        if (label) label.textContent = 'English (US)';
      }
    }
  }

  toggleAiVoiceRecording() {
    const input = document.getElementById('ai-chat-input');
    const micBtn = document.getElementById('ai-mic-toggle-btn');
    const heroBtn = document.getElementById('ai-mic-hero-btn');
    const heroRings = document.getElementById('ai-mic-rings');
    const heroTitle = document.getElementById('ai-mic-hero-title');
    const heroSub = document.getElementById('ai-mic-hero-sub');
    const statusBar = document.getElementById('ai-voice-status');

    window.TPS_AI.toggleVoiceRecognition(
      input,
      (statusText, state) => {
        if (statusBar) {
          if (state === 'recording') {
            statusBar.style.display = 'flex';
            statusBar.innerHTML = `🎙️ ${statusText}`;
            if (micBtn) micBtn.classList.add('recording');
            if (heroBtn) heroBtn.classList.add('recording');
            if (heroRings) heroRings.classList.add('active');
            if (heroTitle) heroTitle.innerHTML = '🔴 Listening... Please speak now';
            if (heroSub) heroSub.innerHTML = 'Recording your question live...';
          } else if (state === 'error') {
            statusBar.style.display = 'flex';
            statusBar.innerHTML = `⚠️ ${statusText}`;
            if (micBtn) micBtn.classList.remove('recording');
            if (heroBtn) heroBtn.classList.remove('recording');
            if (heroRings) heroRings.classList.remove('active');
            if (heroTitle) heroTitle.innerHTML = '🎙️ Click Mic to Try Again';
            if (heroSub) heroSub.innerHTML = statusText;
          } else {
            statusBar.style.display = 'none';
            if (micBtn) micBtn.classList.remove('recording');
            if (heroBtn) heroBtn.classList.remove('recording');
            if (heroRings) heroRings.classList.remove('active');
            if (heroTitle) heroTitle.innerHTML = '🎙️ Click Microphone & Speak';
            if (heroSub) heroSub.innerHTML = 'Speak in English or Urdu. Your question will be answered live.';
          }
        }
      },
      (finalText) => {
        if (finalText && finalText.trim()) {
          input.value = finalText.trim();
          this.wasVoiceTriggered = true;
          // Auto-submit voice query after recognition ends
          const form = input.closest('form');
          if (form) {
            form.dispatchEvent(new Event('submit', { cancelable: true }));
          }
        }
      }
    );
  }

  toggleAiKeyDrawer() {
    const drawer = document.getElementById('ai-key-drawer');
    if (drawer) {
      drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
    }
  }

  saveAiKeyFromDrawer() {
    const input = document.getElementById('drawer-gemini-key');
    if (!input) return;
    const key = input.value.trim();
    const current = window.TPS_STATE.data.settings.aiConfig || {};
    window.TPS_STATE.data.settings.aiConfig = {
      ...current,
      provider: 'gemini',
      apiKey: key,
      modelName: 'gemini-flash-latest'
    };
    window.TPS_STATE.save();
    this.toggleAiKeyDrawer();
    this.showToast('Gemini API Key updated successfully!', 'success');
  }

  toggleAiAudio(btn) {
    if (window.TPS_AI.isPlayingAudio) {
      window.TPS_AI.stopSpeaking();
      btn.innerHTML = `
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        <span style="font-size: 11px; margin-left: 4px; font-weight: 600;">Listen Aloud</span>
      `;
      btn.classList.remove('playing');
      return;
    }

    const bubble = btn.closest('.ai-bubble');
    if (!bubble) return;
    const clone = bubble.cloneNode(true);
    const audioControls = clone.querySelectorAll('.ai-audio-action-wrap, button');
    audioControls.forEach(c => c.remove());
    const text = clone.innerText.trim();

    const isUrdu = /[\u0600-\u06FF]/.test(text);
    btn.innerHTML = `
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12"></rect></svg>
      <span style="font-size: 11px; margin-left: 4px; font-weight: 600;">Stop</span>
    `;
    btn.classList.add('playing');

    window.TPS_AI.speakText(
      text,
      isUrdu ? 'ur-PK' : 'en-US',
      () => {
        btn.classList.add('playing');
      },
      () => {
        btn.innerHTML = `
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          <span style="font-size: 11px; margin-left: 4px; font-weight: 600;">Listen Aloud</span>
        `;
        btn.classList.remove('playing');
      }
    );
  }

  sendAiChip(text) {
    const input = document.getElementById('ai-chat-input');
    if (input) {
      input.value = text;
      const form = input.closest('form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  }

  async handleAiSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('ai-chat-input');
    const container = document.getElementById('ai-messages-container');
    if (!input || !container) return;

    const query = input.value.trim();
    if (!query) return;

    const isVoice = this.wasVoiceTriggered;
    this.wasVoiceTriggered = false;

    // Append user message
    const isUrduQuery = /[\u0600-\u06FF]/.test(query);
    container.innerHTML += `
      <div class="ai-message user">
        <div class="ai-avatar">👤</div>
        <div class="ai-bubble ${isUrduQuery ? 'ai-bubble-urdu' : ''}">${this.escapeHtml(query)}</div>
      </div>
    `;
    input.value = '';
    container.scrollTop = container.scrollHeight;

    // Show loading indicator
    const loadingId = 'ai-load-' + Date.now();
    container.innerHTML += `
      <div class="ai-message ai" id="${loadingId}">
        <div class="ai-avatar">🤖</div>
        <div class="ai-bubble" style="color: var(--text-muted); font-style: italic;">
          Querying Google Gemini AI with live institutional metrics...
        </div>
      </div>
    `;
    container.scrollTop = container.scrollHeight;

    const role = window.TPS_STATE.currentUser.role;
    const response = await window.TPS_AI.processQuery(query, role);

    const loadEl = document.getElementById(loadingId);
    if (loadEl) loadEl.remove();

    // Format markdown output into clean html paragraphs/lists
    const formatted = response.reply
      .replace(/\n\n/g, '<br><br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/• (.*?)(<br>|$)/g, '<li>$1</li>');

    const isUrduReply = /[\u0600-\u06FF]/.test(response.reply);
    const bubbleId = 'ai-resp-' + Date.now();

    container.innerHTML += `
      <div class="ai-message ai">
        <div class="ai-avatar">🤖</div>
        <div class="ai-bubble ${isUrduReply ? 'ai-bubble-urdu' : ''}" id="${bubbleId}">
          ${formatted}
          <div class="ai-audio-action-wrap">
            <button type="button" class="ai-audio-action-btn" onclick="window.TPS_APP.toggleAiAudio(this)" title="Read aloud (Listen)">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              <span style="font-size: 11px; margin-left: 4px; font-weight: 600;">Listen Aloud</span>
            </button>
          </div>
        </div>
      </div>
    `;
    container.scrollTop = container.scrollHeight;

    // Auto play audio if user asked via microphone voice
    if (isVoice) {
      const bubbleEl = document.getElementById(bubbleId);
      if (bubbleEl) {
        const audioBtn = bubbleEl.querySelector('.ai-audio-action-btn');
        if (audioBtn) {
          setTimeout(() => {
            this.toggleAiAudio(audioBtn);
          }, 300);
        }
      }
    }
  }

  // ==========================================
  // GLOBAL SEARCH MODAL
  // ==========================================
  handleGlobalSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const students = window.TPS_STATE.data.students || [];
    const staff = window.TPS_STATE.data.staff || [];
    const fees = window.TPS_STATE.data.feeVouchers || [];

    const matchedStudents = students.filter(s => s.name.toLowerCase().includes(q) || s.admissionNo.toLowerCase().includes(q) || s.bForm.includes(q));
    const matchedStaff = staff.filter(s => s.name.toLowerCase().includes(q) || s.designation.toLowerCase().includes(q));
    const matchedFees = fees.filter(f => f.challanNo.toLowerCase().includes(q) || f.studentName.toLowerCase().includes(q));

    let html = `<div style="max-height: 400px; overflow-y: auto;">`;
    if (matchedStudents.length) {
      html += `<h4 style="font-size: 13px; font-weight: 700; color: var(--primary); margin: 8px 0;">Students (${matchedStudents.length})</h4>`;
      matchedStudents.forEach(s => {
        html += `
          <div style="padding: 10px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div><strong>${s.name}</strong> (${s.class} - ${s.section})<br><small style="color: var(--text-muted);">Adm: ${s.admissionNo} | B-Form: ${s.bForm}</small></div>
            <button class="btn btn-sm btn-secondary" onclick="window.TPS_APP.closeModal(); window.TPS_MODULE_STUDENTS.viewProfile('${s.id}')">View Profile</button>
          </div>
        `;
      });
    }

    if (matchedFees.length) {
      html += `<h4 style="font-size: 13px; font-weight: 700; color: var(--primary); margin: 12px 0 8px;">Fee Vouchers (${matchedFees.length})</h4>`;
      matchedFees.forEach(f => {
        html += `
          <div style="padding: 10px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div><strong>${f.challanNo}</strong> - ${f.studentName}<br><small>Due: PKR ${f.netPayable} (${f.status})</small></div>
            <button class="btn btn-sm btn-gold" onclick="window.TPS_APP.closeModal(); window.TPS_MODULE_FEES.printChallan('${f.challanNo}')">Challan</button>
          </div>
        `;
      });
    }

    if (!matchedStudents.length && !matchedStaff.length && !matchedFees.length) {
      html += `<p style="padding: 20px; text-align: center; color: var(--text-muted);">No records found matching "${this.escapeHtml(q)}".</p>`;
    }
    html += `</div>`;

    this.showGenericModal(`Search Results for "${query}"`, html, '', 'modal-md');
  }

  // ==========================================
  // MODAL CONTROLLER
  // ==========================================
  showGenericModal(title, bodyHtml, footerHtml = '', sizeClass = 'modal-md') {
    const overlay = document.getElementById('generic-modal-overlay');
    const titleEl = document.getElementById('generic-modal-title');
    const bodyEl = document.getElementById('generic-modal-body');
    const footerEl = document.getElementById('generic-modal-footer');
    const dialogEl = document.getElementById('generic-modal-dialog');

    if (!overlay) return;

    if (dialogEl) {
      dialogEl.className = `modal-dialog ${sizeClass}`;
    }
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.innerHTML = bodyHtml;

    if (footerEl) {
      if (footerHtml) {
        footerEl.innerHTML = footerHtml;
        footerEl.style.display = 'flex';
      } else {
        footerEl.innerHTML = '';
        footerEl.style.display = 'none';
      }
    }

    overlay.classList.add('active');
  }

  closeModal() {
    const overlay = document.getElementById('generic-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-msg">${message}</div>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.TPS_APP = new SchoolERPApp();
});
