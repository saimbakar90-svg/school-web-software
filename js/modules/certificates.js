/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Official Document & Certificate Generator with Letterhead System
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_CERTIFICATES = {
  activeTab: 'generator', // 'generator', 'letterhead'
  selectedCertType: 'Character Certificate',
  selectedStudentId: 'STD-1001',

  render() {
    const data = window.TPS_STATE.data;
    const students = data.students || [];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Official Documents & Letterhead Designer</h2>
          <p>Institutional verification letters, leaving certificates, and A4 letterhead branding</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_CERTIFICATES.setTab('letterhead')">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            Letterhead Designer
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_CERTIFICATES.generatePreview()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print Generated Certificate
          </button>
        </div>
      </div>

      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'generator' ? 'active' : ''}" onclick="window.TPS_MODULE_CERTIFICATES.setTab('generator')">Certificate Generator</button>
          <button class="tab-btn ${this.activeTab === 'letterhead' ? 'active' : ''}" onclick="window.TPS_MODULE_CERTIFICATES.setTab('letterhead')">Official Letterhead System</button>
        </div>

        <div class="card-body">
          ${this.activeTab === 'generator' ? this.renderGenerator(students) : this.renderLetterheadDesigner()}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderGenerator(students) {
    const s = students.find(item => item.id === this.selectedStudentId) || students[0];

    return `
      <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px;">
        <!-- Controls Column -->
        <div>
          <div class="form-group">
            <label class="form-label">Select Certificate / Document Type *</label>
            <select class="form-control" onchange="window.TPS_MODULE_CERTIFICATES.onCertTypeChange(this.value)">
              <option value="Character Certificate" ${this.selectedCertType === 'Character Certificate' ? 'selected' : ''}>Character Certificate</option>
              <option value="Bonafide Certificate" ${this.selectedCertType === 'Bonafide Certificate' ? 'selected' : ''}>Bonafide Student Certificate</option>
              <option value="School Leaving Certificate" ${this.selectedCertType === 'School Leaving Certificate' ? 'selected' : ''}>School Leaving Certificate (SLC)</option>
              <option value="Student Verification Letter" ${this.selectedCertType === 'Student Verification Letter' ? 'selected' : ''}>Student Verification Letter</option>
              <option value="Experience Certificate" ${this.selectedCertType === 'Experience Certificate' ? 'selected' : ''}>Staff Experience Certificate</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Select Student *</label>
            <select class="form-control" onchange="window.TPS_MODULE_CERTIFICATES.onStudentChange(this.value)">
              ${students.map(std => `
                <option value="${std.id}" ${std.id === this.selectedStudentId ? 'selected' : ''}>${std.name} (${std.class} - ${std.admissionNo})</option>
              `).join('')}
            </select>
          </div>

          <div style="padding: 16px; background: var(--bg-card-muted); border-radius: 8px; font-size: 12.5px; line-height: 1.6; margin-top: 15px;">
            <strong style="color: var(--primary);">Document Settings:</strong>
            <p>• Automatically pulls B-Form, Father Name, Admission Date, and Conduct records.</p>
            <p>• Formatted on Official A4 School Letterhead with Institutional Crest and Principal Stamp.</p>
          </div>

          <button class="btn btn-primary" style="width: 100%; margin-top: 20px;" onclick="window.TPS_MODULE_CERTIFICATES.generatePreview()">
            Print Official Document
          </button>
        </div>

        <!-- Live A4 Letterhead Preview -->
        <div style="border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; background: #fafbfc; overflow: auto; max-height: 700px;">
          ${this.buildCertificateHtml(s)}
        </div>
      </div>
    `;
  },

  onCertTypeChange(type) {
    this.selectedCertType = type;
    window.TPS_APP.refresh();
  },

  onStudentChange(sid) {
    this.selectedStudentId = sid;
    window.TPS_APP.refresh();
  },

  buildCertificateHtml(s) {
    const school = window.TPS_STATE.data.settings;
    const refNo = `TPS/CERT/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

    let bodyText = '';
    if (this.selectedCertType === 'Character Certificate') {
      bodyText = `
        <p style="margin-bottom: 16px;">This is to certify that <strong>${s.name}</strong>, Son/Daughter of <strong>${s.fatherName}</strong>, bearing B-Form / CNIC No. <strong>${s.bForm}</strong> and School Admission No. <strong>${s.admissionNo}</strong>, has been a bonafide student of <strong>${school.name}</strong> in <strong>${s.class} (${s.section})</strong> for Session <strong>${s.session}</strong>.</p>
        <p style="margin-bottom: 16px;">During his/her tenure at this institution, he/she maintained exemplary discipline, demonstrated commendable academic perseverance, and bore an excellent moral character. He/she actively participated in curricular and co-curricular programs.</p>
        <p style="margin-bottom: 16px;">To the best of our institutional knowledge, there is nothing contrary to his/her credit that would impede his/her pursuit of future academic endeavors.</p>
        <p>We wish him/her every success in all future undertakings.</p>
      `;
    } else if (this.selectedCertType === 'Bonafide Certificate') {
      bodyText = `
        <p style="margin-bottom: 16px;">This is to verify and certify that <strong>${s.name}</strong>, Son/Daughter of <strong>${s.fatherName}</strong>, resident of <strong>${s.address}</strong>, is a regular bonafide student of this institution currently enrolled in <strong>${s.class} (${s.section})</strong> under Admission Number <strong>${s.admissionNo}</strong>.</p>
        <p style="margin-bottom: 16px;">This certificate is issued upon the request of the guardian for official verification purposes, fee concession evaluation, or passport/visa documentation.</p>
      `;
    } else if (this.selectedCertType === 'School Leaving Certificate') {
      bodyText = `
        <p style="margin-bottom: 16px;">This is to certify that <strong>${s.name}</strong> was admitted to <strong>${school.name}</strong> on <strong>${s.admissionDate}</strong> and leaves the school on <strong>${today}</strong> having successfully passed/completed studies up to <strong>${s.class}</strong>.</p>
        <p style="margin-bottom: 16px;">All institutional dues, library books, and laboratory equipment clearances have been settled up to date. His/her attendance was regular (${s.attendancePercent}%).</p>
        <p style="margin-bottom: 16px;">Reason for leaving: <em>Transfer of guardian / completion of course</em>.</p>
      `;
    } else {
      bodyText = `
        <p style="margin-bottom: 16px;">This official communication serves to verify that <strong>${s.name}</strong> (B-Form: ${s.bForm}) is an active enrolled student of <strong>${school.name}</strong> with good academic standing.</p>
      `;
    }

    return `
      <div id="official-letterhead-doc" style="background: #ffffff; border: 1px solid #cbd5e1; padding: 40px; border-radius: 4px; box-shadow: var(--shadow-sm); min-height: 600px; position: relative;">
        <!-- Watermark Background -->
        <img src="${school.logoUrl}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 280px; opacity: ${school.letterhead.watermarkOpacity || 0.05}; pointer-events: none;">

        <!-- Official Letterhead Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2.5px solid ${school.primaryColor || '#1b2767'}; padding-bottom: 16px; margin-bottom: 24px;">
          <img src="${school.logoUrl}" style="width: 80px; height: 80px; object-fit: contain;">
          <div style="text-align: center; flex: 1; padding: 0 15px;">
            <h1 style="color: ${school.primaryColor || '#1b2767'}; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; margin: 0;">${school.name}</h1>
            <div style="color: ${school.secondaryColor || '#6da534'}; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-top: 2px;">${school.tagline || school.campus || ''}</div>
            <div style="font-size: 9.5px; color: #475569; margin-top: 4px;">${school.address}</div>
            <div style="font-size: 9px; color: #64748b; margin-top: 2px;">Ph: ${school.phone} | Web: ${school.website}</div>
          </div>
          <div style="width: 80px;"></div>
        </div>

        <!-- Meta Ref & Date -->
        <div style="display: flex; justify-content: space-between; font-size: 11px; color: #475569; margin-bottom: 24px;">
          <div><strong>Ref:</strong> ${refNo}</div>
          <div><strong>Date:</strong> ${today}</div>
        </div>

        <!-- Title -->
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 15px; font-weight: 800; color: #1b2767; text-transform: uppercase; border-bottom: 2px solid #1b2767; padding-bottom: 3px;">
            ${this.selectedCertType}
          </span>
        </div>

        <!-- Content Area -->
        <div style="font-size: 13px; line-height: 1.8; color: #1e293b; text-align: justify; margin-bottom: 40px;">
          ${bodyText}
        </div>

        <!-- Signatures & Stamp -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 60px; padding-top: 20px;">
          <div style="text-align: center; width: 160px;">
            <div style="border-top: 1px solid #1e293b; padding-top: 4px; font-size: 11px; font-weight: 600;">Office Incharge</div>
          </div>
          <div style="text-align: center;">
            <img src="${school.stampUrl}" style="height: 70px;">
            <div style="font-size: 9px; color: #64748b;">Official Institutional Seal</div>
          </div>
          <div style="text-align: center; width: 200px;">
            <div style="font-size: 12px; font-weight: 700; color: #1b2767;">${school.letterhead.principalName}</div>
            <div style="border-top: 1px solid #1e293b; padding-top: 4px; font-size: 11px; font-weight: 600;">${school.letterhead.principalTitle}</div>
          </div>
        </div>

        <!-- Letterhead Footer -->
        <div style="border-top: 1px solid #e2e8f0; margin-top: 40px; padding-top: 8px; font-size: 8.5px; color: #94a3b8; display: flex; justify-content: space-between;">
          <span>${school.regNo} — Validated System Generated Document</span>
          <span>Sheikhupura Campus • Pakistan</span>
        </div>
      </div>
    `;
  },

  renderLetterheadDesigner() {
    const s = window.TPS_STATE.data.settings;
    return `
      <div style="max-width: 700px;">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 16px;">Configure Official A4 Letterhead Settings</h4>
        <form onsubmit="window.TPS_MODULE_CERTIFICATES.saveLetterhead(event)">
          <div class="form-group">
            <label class="form-label">Principal / Head of Institution Name</label>
            <input type="text" name="principalName" class="form-control" value="${s.letterhead.principalName}">
          </div>
          <div class="form-group">
            <label class="form-label">Principal Designation / Title</label>
            <input type="text" name="principalTitle" class="form-control" value="${s.letterhead.principalTitle}">
          </div>
          <div class="form-group">
            <label class="form-label">Background Watermark Opacity (0.01 to 0.15)</label>
            <input type="number" step="0.01" min="0" max="0.2" name="watermarkOpacity" class="form-control" value="${s.letterhead.watermarkOpacity}">
          </div>
          <button type="submit" class="btn btn-primary" style="margin-top: 10px;">Save Letterhead Template</button>
        </form>
      </div>
    `;
  },

  saveLetterhead(e) {
    e.preventDefault();
    const form = e.target;
    window.TPS_STATE.data.settings.letterhead.principalName = form.principalName.value;
    window.TPS_STATE.data.settings.letterhead.principalTitle = form.principalTitle.value;
    window.TPS_STATE.data.settings.letterhead.watermarkOpacity = parseFloat(form.watermarkOpacity.value);
    window.TPS_STATE.save();
    window.TPS_APP.showToast('Letterhead template preferences saved!', 'success');
  },

  generatePreview() {
    window.print();
  }
};
