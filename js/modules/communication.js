/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Communication Hub, Notices & PTM Management Module
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_COMMUNICATION = {
  activeTab: 'notices', // 'notices', 'whatsapp', 'ptm'

  render() {
    const data = window.TPS_STATE.data;
    const notices = data.notices || [];
    const ptms = data.ptm || [];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Communication Hub & Notice Board</h2>
          <p>Official circulars, WhatsApp/SMS notification templates & PTM scheduling</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_COMMUNICATION.setTab('whatsapp')">
            WhatsApp / SMS Gateway
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_COMMUNICATION.openNewNoticeModal()">
            Publish New Circular
          </button>
        </div>
      </div>

      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'notices' ? 'active' : ''}" onclick="window.TPS_MODULE_COMMUNICATION.setTab('notices')">School Notices & Circulars</button>
          <button class="tab-btn ${this.activeTab === 'whatsapp' ? 'active' : ''}" onclick="window.TPS_MODULE_COMMUNICATION.setTab('whatsapp')">SMS & WhatsApp Dispatch Hub</button>
          <button class="tab-btn ${this.activeTab === 'ptm' ? 'active' : ''}" onclick="window.TPS_MODULE_COMMUNICATION.setTab('ptm')">Parent-Teacher Meetings (PTM)</button>
        </div>

        <div class="card-body">
          ${this.activeTab === 'notices' ? this.renderNotices(notices) : ''}
          ${this.activeTab === 'whatsapp' ? this.renderWhatsAppTemplates() : ''}
          ${this.activeTab === 'ptm' ? this.renderPTM(ptms) : ''}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderNotices(notices) {
    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${notices.map(n => `
          <div style="padding: 20px; border: 1px solid var(--border-color); border-radius: 12px; background: #fff; border-left: 4px solid var(--primary);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main);">${n.title}</h4>
                <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
                  Audience: <strong>${n.target}</strong> • Published Date: <strong>${n.date}</strong>
                </div>
              </div>
              <span class="badge badge-gold">${n.badge}</span>
            </div>
            <p style="font-size: 13.5px; line-height: 1.6; color: #334155; margin-top: 10px;">${n.content}</p>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderWhatsAppTemplates() {
    return `
      <div style="max-width: 750px;">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">Instant Parent Notification Dispatch</h4>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
          Send formatted official notifications to parents via SMS gateway / WhatsApp Cloud API.
        </p>

        <div class="form-group">
          <label class="form-label">Notification Template</label>
          <select class="form-control" onchange="window.TPS_MODULE_COMMUNICATION.applyTemplate(this.value)">
            <option value="absence">Daily Student Absence Alert</option>
            <option value="fee">Fee Challan Due Reminder</option>
            <option value="exam">Mid-Term Date Sheet Announcement</option>
            <option value="ptm">PTM Schedule & Invitation</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Message Preview (Editable)</label>
          <textarea id="comm-msg-body" class="form-control" rows="5" style="font-family: inherit; font-size: 13px;">Dear Parent, your child was marked ABSENT today at Tall Pines School Sheikhupura. Please contact the front office if this was unplanned. Regards, Principal TPS.</textarea>
        </div>

        <button class="btn btn-primary" onclick="window.TPS_APP.showToast('Notification blast dispatched successfully to targeted recipients!', 'success')">
          Dispatch WhatsApp / SMS Broadcast
        </button>
      </div>
    `;
  },

  applyTemplate(type) {
    const textarea = document.getElementById('comm-msg-body');
    if (!textarea) return;
    const name = window.TPS_STATE.data.settings.name || 'School';
    if (type === 'absence') {
      textarea.value = `Dear Parent, your child was marked ABSENT today at ${name}. Please contact the front office if this was unplanned. Regards, Principal ${name}.`;
    } else if (type === 'fee') {
      textarea.value = `Dear Parent, this is a gentle reminder that the school fee voucher for October 2026 is payable by 15th October. Please ignore if already paid. Regards, Accounts Office ${name}.`;
    } else if (type === 'exam') {
      textarea.value = `Dear Parent, Mid-Term Examination 2026 commences on 20th October. Roll number slips and date sheets are now available on the portal. ${name}.`;
    } else if (type === 'ptm') {
      textarea.value = `Respected Parents, you are cordially invited to the Parent-Teacher Meeting on Saturday from 9:00 AM to 1:00 PM. Please book your preferred slot via the portal. ${name}.`;
    }
  },

  renderPTM(ptms) {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h4 style="font-size: 16px; font-weight: 700; color: var(--primary);">Scheduled Parent-Teacher Consultations</h4>
          <button class="btn btn-sm btn-primary" onclick="window.TPS_APP.showToast('PTM slot opened for booking', 'success')">Create New PTM Event</button>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Parent Name</th>
                <th>Student</th>
                <th>Teacher</th>
                <th>Date & Slot</th>
                <th>Status</th>
                <th>Discussion Focus</th>
              </tr>
            </thead>
            <tbody>
              ${ptms.map(p => `
                <tr>
                  <td><strong>${p.parentName}</strong></td>
                  <td>${p.studentName}</td>
                  <td>${p.teacherName}</td>
                  <td><strong>${p.date}</strong><br><small style="color: var(--text-muted);">${p.timeSlot}</small></td>
                  <td><span class="badge badge-success">${p.status}</span></td>
                  <td style="font-size: 12.5px; color: var(--text-muted);">${p.notes}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  openNewNoticeModal() {
    window.TPS_APP.showToast('Circular composer ready for publication', 'info');
  }
};
