/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Settings, Branding Customization, Security & Backup Module
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_SETTINGS = {
  activeTab: 'branding', // 'branding', 'roles', 'ai', 'backup', 'audit'

  render() {
    const data = window.TPS_STATE.data;
    const settings = data.settings || {};

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>System Administration & Institutional Settings</h2>
          <p>School branding, dynamic color themes, AI credentials, roles & database backup</p>
        </div>
      </div>

      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'branding' ? 'active' : ''}" onclick="window.TPS_MODULE_SETTINGS.setTab('branding')">Branding & Visual Identity</button>
          <button class="tab-btn ${this.activeTab === 'roles' ? 'active' : ''}" onclick="window.TPS_MODULE_SETTINGS.setTab('roles')">Roles & User Permissions</button>
          <button class="tab-btn ${this.activeTab === 'ai' ? 'active' : ''}" onclick="window.TPS_MODULE_SETTINGS.setTab('ai')">AI Assistant & API Config</button>
          <button class="tab-btn ${this.activeTab === 'backup' ? 'active' : ''}" onclick="window.TPS_MODULE_SETTINGS.setTab('backup')">Database Backup & Recovery</button>
          <button class="tab-btn ${this.activeTab === 'audit' ? 'active' : ''}" onclick="window.TPS_MODULE_SETTINGS.setTab('audit')">Security Audit Log</button>
        </div>

        <div class="card-body">
          ${this.activeTab === 'branding' ? this.renderBrandingTab(settings) : ''}
          ${this.activeTab === 'roles' ? this.renderRolesTab(data.users) : ''}
          ${this.activeTab === 'ai' ? this.renderAiTab(settings) : ''}
          ${this.activeTab === 'backup' ? this.renderBackupTab() : ''}
          ${this.activeTab === 'audit' ? this.renderAuditTab(data.auditLogs) : ''}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderBrandingTab(s) {
    const colorPresets = window.TPS_BRANDING.colorPresets;
    const schoolPresets = window.TPS_BRANDING.schoolPresets;

    return `
      <div style="max-width: 800px;">
        <!-- Institutional Theme Presets Section -->
        <div style="margin-bottom: 24px; padding: 16px; background: #fafbfc; border-radius: 12px; border: 1px solid var(--border-color);">
          <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">Institutional Color Theme Presets (1-Click Switch)</h4>
          <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Instantly changes headers, sidebar gradients, buttons, badges and print borders.</p>
          <div class="theme-palette-grid" style="margin-bottom: 0;">
            ${colorPresets.map(p => `
              <div class="theme-palette-card ${s.primaryColor === p.primary ? 'active' : ''}" 
                   onclick="window.TPS_BRANDING.setThemeColors('${p.primary}', '${p.secondary}'); window.TPS_APP.showToast('Theme updated to ${p.name}', 'success'); window.TPS_APP.refresh();">
                <div class="palette-dots">
                  <span class="palette-dot" style="background: ${p.primary};"></span>
                  <span class="palette-dot sec" style="background: ${p.secondary};"></span>
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 12.5px; color: var(--text-main);">${p.name}</div>
                  <div style="font-size: 10.5px; color: var(--text-muted);">${p.subtitle}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quick School Presets -->
        <div style="margin-bottom: 24px;">
          <h5 style="font-size: 13px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">Quick School Sample Presets:</h5>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${schoolPresets.map((p, idx) => `
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.TPS_APP.loadSchoolPreset(${idx})">
                🏫 ${p.name}
              </button>
            `).join('')}
          </div>
        </div>

      <form onsubmit="window.TPS_MODULE_SETTINGS.saveBrandingSettings(event)">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 16px;">School Identity & Document Branding</h4>
        
        <div style="display: flex; gap: 24px; align-items: center; margin-bottom: 24px; padding: 16px; background: #fafbfc; border-radius: 12px; border: 1px solid var(--border-color); flex-wrap: wrap;">
          <img id="preview-logo-img" src="${s.logoUrl || 'assets/logo.png'}" style="width: 72px; height: 72px; border-radius: 12px; object-fit: contain; background: #fff; padding: 4px; border: 2px solid var(--secondary);">
          <div>
            <label class="form-label">School Logo (Used in Header, Documents & ID Cards)</label>
            <input type="file" accept="image/*" onchange="window.TPS_MODULE_SETTINGS.onLogoUpload(event)" style="font-size: 12px;">
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">PNG, JPG, SVG or WEBP recommended. High-resolution seal.</p>
          </div>
        </div>

        <div style="display: flex; gap: 24px; align-items: center; margin-bottom: 24px; padding: 16px; background: #fafbfc; border-radius: 12px; border: 1px solid var(--border-color);">
          <img id="preview-stamp-img" src="${s.stampUrl}" style="width: 72px; height: 72px; border-radius: 12px; object-fit: contain; border: 2px solid #cbd5e1;">
          <div>
            <label class="form-label">Principal / Official Stamp (Used on Official Documents & Certificates)</label>
            <input type="file" accept="image/*" onchange="window.TPS_MODULE_SETTINGS.onStampUpload(event)" style="font-size: 12px;">
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Official round rubber stamp seal.</p>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Official School Name *</label>
            <input type="text" name="name" class="form-control" required value="${s.name}">
          </div>
          <div class="form-group">
            <label class="form-label">School Motto / Tagline *</label>
            <input type="text" name="tagline" class="form-control" required value="${s.tagline}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Primary Brand Theme Color *</label>
            <div style="display: flex; gap: 10px; align-items: center;">
              <input type="color" name="primaryColor" value="${s.primaryColor}" style="width: 44px; height: 38px; border: none; cursor: pointer; border-radius: 6px;">
              <span style="font-family: monospace; font-size: 13px;">${s.primaryColor}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Secondary / Accent Color *</label>
            <div style="display: flex; gap: 10px; align-items: center;">
              <input type="color" name="secondaryColor" value="${s.secondaryColor}" style="width: 44px; height: 38px; border: none; cursor: pointer; border-radius: 6px;">
              <span style="font-family: monospace; font-size: 13px;">${s.secondaryColor}</span>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Campus Physical Address (Sheikhupura) *</label>
          <input type="text" name="address" class="form-control" required value="${s.address}">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Official Telephone / Mobile Numbers *</label>
            <input type="text" name="phone" class="form-control" required value="${s.phone}">
          </div>
          <div class="form-group">
            <label class="form-label">Official Institutional Email *</label>
            <input type="email" name="email" class="form-control" required value="${s.email}">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Website URL</label>
            <input type="text" name="website" class="form-control" value="${s.website}">
          </div>
          <div class="form-group">
            <label class="form-label">Government Registration No</label>
            <input type="text" name="regNo" class="form-control" value="${s.regNo}">
          </div>
        </div>

        <button type="submit" class="btn btn-primary" style="margin-top: 10px;">
          Save Branding & Update Application
        </button>
      </form>
    </div>
    `;
  },

  onLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    window.TPS_BRANDING.handleImageUpload(file, (dataUrl) => {
      window.TPS_STATE.data.settings.logoUrl = dataUrl;
      const preview = document.getElementById('preview-logo-img');
      if (preview) preview.src = dataUrl;
      window.TPS_BRANDING.applyCurrentBranding();
      window.TPS_APP.showToast('School logo uploaded successfully!', 'success');
    });
  },

  onStampUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    window.TPS_BRANDING.handleImageUpload(file, (dataUrl) => {
      window.TPS_STATE.data.settings.stampUrl = dataUrl;
      const preview = document.getElementById('preview-stamp-img');
      if (preview) preview.src = dataUrl;
      window.TPS_APP.showToast('Official seal stamp updated successfully!', 'success');
    });
  },

  saveBrandingSettings(e) {
    e.preventDefault();
    const form = e.target;
    window.TPS_BRANDING.saveBranding({
      name: form.name.value,
      tagline: form.tagline.value,
      primaryColor: form.primaryColor.value,
      secondaryColor: form.secondaryColor.value,
      address: form.address.value,
      phone: form.phone.value,
      email: form.email.value,
      website: form.website.value,
      regNo: form.regNo.value
    });
    window.TPS_APP.showToast('Branding settings saved & applied across the application!', 'success');
  },

  renderRolesTab(users) {
    return `
      <div>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">Active User Roles & Role-Based Access Control</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>User Account</th>
                <th>Role</th>
                <th>Email</th>
                <th>Access Level</th>
                <th style="text-align: right;">Simulate Session</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <div class="user-avatar" style="width: 32px; height: 32px; font-size: 12px;">${u.avatar}</div>
                      <div>
                        <strong>${u.name}</strong>
                        <div style="font-size: 11px; color: var(--text-muted); font-family: monospace;">@${u.username}</div>
                      </div>
                    </div>
                  </td>
                  <td><span class="badge badge-primary">${u.role}</span></td>
                  <td>${u.email}</td>
                  <td style="font-size: 12px; color: var(--text-muted);">
                    ${u.role.includes('Admin') || u.role === 'Principal' ? 'Full Access' : (u.role === 'Accountant' ? 'Fees & Accounts' : 'Role Restricted')}
                  </td>
                  <td style="text-align: right;">
                    <button class="btn btn-sm btn-secondary" onclick="window.TPS_STATE.setCurrentUser('${u.id}'); window.TPS_APP.showToast('Switched session to ${u.name} (${u.role})', 'info');">
                      Login As ${u.role.split(' ')[0]}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderAiTab(s) {
    const ai = s.aiConfig || {};
    return `
      <form onsubmit="window.TPS_MODULE_SETTINGS.saveAiConfig(event)" style="max-width: 680px;">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">AI Model Integration & Secure API Keys</h4>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
          Configured with Google Gemini 3.8 Flash model. You can update your API key or switch engines below.
        </p>

        <div class="form-group">
          <label class="form-label">AI Engine Provider</label>
          <select name="provider" class="form-control" onchange="window.TPS_MODULE_SETTINGS.onAiProviderChange(this.value)">
            <option value="gemini" ${ai.provider === 'gemini' ? 'selected' : ''}>Google Gemini API (Gemini 3.8 Flash — Active & Recommended)</option>
            <option value="openai" ${ai.provider === 'openai' ? 'selected' : ''}>OpenAI API (GPT-4o / GPT-4o-mini)</option>
            <option value="local-intelligent" ${ai.provider === 'local-intelligent' ? 'selected' : ''}>Local School Contextual Engine (Offline & Zero-Latency)</option>
          </select>
        </div>

        <div class="form-group" id="ai-apikey-group" style="display: ${ai.provider === 'local-intelligent' ? 'none' : 'block'};">
          <label class="form-label">Custom Gemini API Key (Optional)</label>
          <input type="password" name="apiKey" class="form-control" placeholder="•••••••••••••••• (Encrypted Institutional Key Active)" value="${ai.apiKey || ''}">
          <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Institutional AI Brain active and secured. Leave blank to use built-in encrypted brain.</p>
        </div>

        <button type="submit" class="btn btn-primary" style="margin-top: 10px;">
          Save AI Preferences
        </button>
      </form>
    `;
  },

  onAiProviderChange(val) {
    const grp = document.getElementById('ai-apikey-group');
    if (grp) grp.style.display = val === 'local-intelligent' ? 'none' : 'block';
  },

  saveAiConfig(e) {
    e.preventDefault();
    const form = e.target;
    const provider = form.provider.value;
    const key = form.apiKey ? form.apiKey.value.trim() : '';
    window.TPS_STATE.data.settings.aiConfig = {
      provider,
      apiKey: key,
      modelName: provider === 'gemini' ? 'gemini-flash-latest' : 'gpt-4o-mini',
      temperature: 0.7
    };
    window.TPS_STATE.save();
    window.TPS_APP.showToast('AI engine settings updated successfully!', 'success');
  },

  renderBackupTab() {
    return `
      <div style="max-width: 650px;">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">Institutional Database Backup & Restoration</h4>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
          Export the complete school relational dataset (students, fees, vouchers, attendance, exams, inventory) to a secure JSON file, or restore from an existing backup.
        </p>

        <div style="display: flex; gap: 16px; margin-bottom: 24px;">
          <button class="btn btn-primary" onclick="window.TPS_MODULE_SETTINGS.downloadBackup()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Database Backup (JSON)
          </button>
          <button class="btn btn-danger" onclick="window.TPS_MODULE_SETTINGS.confirmReset()">
            Reset to Default Seed Data
          </button>
        </div>

        <div style="padding: 20px; border: 1.5px dashed var(--border-color); border-radius: 12px; background: #fafbfc;">
          <label class="form-label">Restore from Backup JSON File</label>
          <input type="file" accept=".json" onchange="window.TPS_MODULE_SETTINGS.onRestoreFile(event)" style="font-size: 12.5px;">
        </div>
      </div>
    `;
  },

  downloadBackup() {
    const jsonStr = window.TPS_STATE.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TPS_Database_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.TPS_APP.showToast('Institutional database backup downloaded!', 'success');
  },

  onRestoreFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const ok = window.TPS_STATE.importJSON(evt.target.result);
      if (ok) {
        window.TPS_APP.showToast('Database restored successfully from backup file!', 'success');
        window.TPS_APP.refresh();
      } else {
        window.TPS_APP.showToast('Failed to parse backup JSON. Invalid file structure.', 'danger');
      }
    };
    reader.readAsText(file);
  },

  confirmReset() {
    if (confirm('Are you sure you want to reset all data to default seed records? All custom entries will be restored to initial state.')) {
      window.TPS_STATE.reset();
      window.TPS_APP.showToast('Database reset to initial school seed records.', 'info');
      window.TPS_APP.refresh();
    }
  },

  renderAuditTab(logs) {
    return `
      <div>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">Security & Operational Audit Trail</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Authorized User</th>
                <th>Action</th>
                <th>Operation Details</th>
              </tr>
            </thead>
            <tbody>
              ${(logs || []).map(l => `
                <tr>
                  <td style="font-family: monospace; font-size: 11.5px;">${l.timestamp}</td>
                  <td><strong>${l.user}</strong></td>
                  <td><span class="badge badge-primary">${l.action}</span></td>
                  <td style="font-size: 12.5px;">${l.detail}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
