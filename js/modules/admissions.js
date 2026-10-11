/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Admissions Management Module
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_ADMISSIONS = {
  render() {
    const admissions = window.TPS_STATE.data.admissions || [];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Admissions & Enrollment Funnel</h2>
          <p>Candidate testing, interview records, admission approvals & roll allocation</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-primary" onclick="window.TPS_MODULE_ADMISSIONS.openNewApplicationModal()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            New Admission Application
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
            Active Admissions Pipeline (Session 2026-2027)
          </h3>
          <span class="badge badge-primary">${admissions.length} Applicants</span>
        </div>
        <div class="card-body" style="padding: 0;">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Applicant</th>
                  <th>Father Name</th>
                  <th>Target Class</th>
                  <th>Test Score</th>
                  <th>Interview</th>
                  <th>Decision</th>
                  <th>Fee</th>
                  <th style="text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${admissions.map(a => `
                  <tr>
                    <td style="font-family: monospace; font-weight: 700; color: var(--primary);">${a.id}</td>
                    <td><strong>${a.applicantName}</strong></td>
                    <td>${a.fatherName}</td>
                    <td><span class="badge badge-primary">${a.applyingClass}</span></td>
                    <td><strong>${a.testScore}</strong></td>
                    <td><span class="badge badge-secondary">${a.interviewStatus}</span></td>
                    <td>
                      <span class="badge ${a.status === 'Approved' ? 'badge-success' : (a.status === 'Selected' ? 'badge-primary' : 'badge-warning')}">${a.status}</span>
                    </td>
                    <td>
                      <span class="badge ${a.feeStatus === 'Paid' ? 'badge-success' : 'badge-danger'}">${a.feeStatus}</span>
                    </td>
                    <td style="text-align: right; white-space: nowrap;">
                      <div style="display: inline-flex; gap: 5px; justify-content: flex-end;">
                        <button class="btn btn-xs btn-secondary" onclick="window.TPS_MODULE_ADMISSIONS.viewOfferLetter('${a.id}')" title="View Offer Letter">
                          Offer
                        </button>
                        ${a.status !== 'Approved' ? `
                          <button class="btn btn-xs btn-success" onclick="window.TPS_MODULE_ADMISSIONS.approveAdmission('${a.id}')" title="Approve Application">
                            Approve
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  openNewApplicationModal() {
    const html = `
      <form onsubmit="window.TPS_MODULE_ADMISSIONS.saveApplication(event)">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Applicant Full Name *</label>
            <input type="text" name="applicantName" class="form-control" required placeholder="Student Name">
          </div>
          <div class="form-group">
            <label class="form-label">Father / Guardian Name *</label>
            <input type="text" name="fatherName" class="form-control" required placeholder="Father Name">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Applying for Class *</label>
            <select name="applyingClass" class="form-control">
              <option value="Playgroup">Playgroup</option>
              <option value="Nursery">Nursery</option>
              <option value="Prep">Prep</option>
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 9">Grade 9 (Science)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Contact Mobile *</label>
            <input type="text" name="contact" class="form-control" required placeholder="0300-XXXXXXX">
          </div>
        </div>
        <div class="modal-footer" style="padding-right: 0; padding-left: 0; margin-top: 15px;">
          <button type="button" class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Register Application</button>
        </div>
      </form>
    `;
    window.TPS_APP.showGenericModal('New Admission Candidate Registration', html, '', 'modal-md');
  },

  saveApplication(e) {
    e.preventDefault();
    const form = e.target;
    const count = (window.TPS_STATE.data.admissions || []).length + 1;
    const newAdm = {
      id: `ADM-2026-00${count}`,
      applicantName: form.applicantName.value,
      fatherName: form.fatherName.value,
      applyingClass: form.applyingClass.value,
      contact: form.contact.value,
      appliedDate: new Date().toISOString().split('T')[0],
      testScore: 'Pending',
      interviewStatus: 'Scheduled',
      status: 'Pending',
      feeStatus: 'Unpaid',
      remarks: 'Application registered online'
    };

    window.TPS_STATE.data.admissions.unshift(newAdm);
    window.TPS_STATE.logAction('Admission Registered', `Registered application ${newAdm.id} for ${newAdm.applicantName}`);
    window.TPS_STATE.save();
    window.TPS_APP.closeModal();
    window.TPS_APP.showToast(`Application for ${newAdm.applicantName} registered successfully!`, 'success');
  },

  approveAdmission(id) {
    const a = window.TPS_STATE.data.admissions.find(item => item.id === id);
    if (!a) return;
    a.status = 'Approved';
    a.feeStatus = 'Paid';
    window.TPS_STATE.logAction('Admission Approved', `Approved admission for ${a.applicantName} in ${a.applyingClass}`);
    window.TPS_STATE.save();
    window.TPS_APP.showToast(`Admission for ${a.applicantName} confirmed and enrolled!`, 'success');
  },

  viewOfferLetter(id) {
    const a = window.TPS_STATE.data.admissions.find(item => item.id === id);
    if (!a) return;
    const school = window.TPS_STATE.data.settings;

    const html = `
      <div style="border: 2px solid ${school.primaryColor || '#1b2767'}; padding: 30px; background: #fff; max-width: 650px; margin: 0 auto;">
        <div style="text-align: center; border-bottom: 2px solid ${school.primaryColor || '#1b2767'}; padding-bottom: 12px; margin-bottom: 16px;">
          <img src="${school.logoUrl || 'assets/logo.png'}" style="width: 50px; height: 50px; margin-bottom: 4px; object-fit: contain;">
          <h3 style="color: ${school.primaryColor || '#1b2767'}; margin: 0;">${school.name}</h3>
          <span style="font-size: 11px; color: ${school.secondaryColor || '#6da534'}; font-weight: 700;">PROVISIONAL ADMISSION OFFER LETTER</span>
        </div>
        <p style="font-size: 13px; line-height: 1.6;">
          Dear <strong>${a.fatherName}</strong>,<br><br>
          We are pleased to inform you that following the entrance assessment, your child <strong>${a.applicantName}</strong> has been granted provisional admission to <strong>${a.applyingClass}</strong> for Session <strong>${school.activeSession}</strong> at ${school.name}.<br><br>
          Please deposit the admission challan before the stipulated deadline at the accounts counter to secure the enrollment seat.
        </p>
        <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
          <img src="${school.stampUrl || 'assets/stamp.png'}" style="height: 55px; object-fit: contain;">
          <div style="text-align: center;">
            <div style="font-weight: 700; color: ${school.primaryColor || '#1b2767'};">Office of the Principal</div>
            <div style="font-size: 11px; color: #64748b;">${school.name}</div>
          </div>
        </div>
      </div>
    `;

    window.TPS_APP.showGenericModal(`Admission Offer Letter — ${a.applicantName}`, html, `
      <button class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.print()">Print Offer Letter</button>
    `, 'modal-md');
  }
};
