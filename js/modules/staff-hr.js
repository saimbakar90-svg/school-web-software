/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Staff, HR & Payroll Management Module
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_STAFF = {
  activeTab: 'directory', // 'directory', 'payroll', 'leaves'

  render() {
    const data = window.TPS_STATE.data;
    const staff = data.staff || [];
    const totalPayroll = staff.reduce((sum, s) => sum + (s.basicSalary + s.allowances), 0);

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Staff, Faculty & HR Management</h2>
          <p>Employee profiles, monthly payroll generation & leave management</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_STAFF.setTab('payroll')">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            Monthly Payroll
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_STAFF.openAddStaffModal()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Employee
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap primary">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Total Staff Strength</div>
            <div class="stat-value">${staff.length} Members</div>
            <div class="stat-trend positive"><span>All Active</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap gold">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Monthly Gross Payroll</div>
            <div class="stat-value">PKR ${(totalPayroll / 1000).toFixed(1)}k</div>
            <div class="stat-trend neutral"><span>October 2026</span></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'directory' ? 'active' : ''}" onclick="window.TPS_MODULE_STAFF.setTab('directory')">Staff Directory</button>
          <button class="tab-btn ${this.activeTab === 'payroll' ? 'active' : ''}" onclick="window.TPS_MODULE_STAFF.setTab('payroll')">Monthly Payroll & Payslips</button>
          <button class="tab-btn ${this.activeTab === 'leaves' ? 'active' : ''}" onclick="window.TPS_MODULE_STAFF.setTab('leaves')">Leave Requests</button>
        </div>

        <div class="card-body" style="padding: 0;">
          ${this.activeTab === 'directory' ? this.renderDirectory(staff) : ''}
          ${this.activeTab === 'payroll' ? this.renderPayroll(staff) : ''}
          ${this.activeTab === 'leaves' ? this.renderLeaves() : ''}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderDirectory(staff) {
    return `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Emp No</th>
              <th>Full Name</th>
              <th>Department / Role</th>
              <th>Designation</th>
              <th>Qualification</th>
              <th>Contact Phone</th>
              <th>Status</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${staff.map(st => `
              <tr>
                <td style="font-family: monospace; font-weight: 700; color: var(--primary);">${st.empNo}</td>
                <td><strong>${st.name}</strong></td>
                <td><span class="badge badge-primary">${st.department}</span></td>
                <td>${st.designation}</td>
                <td style="font-size: 12px; color: var(--text-muted);">${st.qualification}</td>
                <td>${st.phone}</td>
                <td><span class="badge badge-success">${st.status}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-sm btn-secondary" onclick="window.TPS_MODULE_STAFF.generatePayslip('${st.id}')">
                    Payslip
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderPayroll(staff) {
    return `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Emp No</th>
              <th>Employee Name</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${staff.map(st => {
              const net = st.basicSalary + st.allowances;
              return `
                <tr>
                  <td style="font-family: monospace;">${st.empNo}</td>
                  <td><strong>${st.name}</strong></td>
                  <td>PKR ${st.basicSalary.toLocaleString()}</td>
                  <td>PKR ${st.allowances.toLocaleString()}</td>
                  <td>PKR 0</td>
                  <td><strong style="color: var(--primary);">PKR ${net.toLocaleString()}</strong></td>
                  <td style="text-align: right;">
                    <button class="btn btn-sm btn-gold" onclick="window.TPS_MODULE_STAFF.generatePayslip('${st.id}')">
                      Print Payslip
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderLeaves() {
    return `
      <div style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h4 style="font-size: 16px; font-weight: 700; color: var(--primary);">Faculty & Staff Leave Applications</h4>
          <button class="btn btn-sm btn-primary" onclick="window.TPS_APP.showToast('Leave request recorded for review', 'success')">New Application</button>
        </div>
        <div style="padding: 16px; background: #fafbfc; border: 1px solid var(--border-color); border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>Sir Tariq Mahmood (Senior Master - Mathematics)</strong>
              <div style="font-size: 12px; color: var(--text-muted);">Casual Leave: 12 Oct 2026 (1 Day) — Reason: Family engagement</div>
            </div>
            <span class="badge badge-success">Approved by Principal</span>
          </div>
        </div>
      </div>
    `;
  },

  generatePayslip(staffId) {
    const st = window.TPS_STATE.data.staff.find(item => item.id === staffId);
    if (!st) return;
    const school = window.TPS_STATE.data.settings;
    const net = st.basicSalary + st.allowances;

    const html = `
      <div style="border: 2px solid ${school.primaryColor || '#1b2767'}; padding: 24px; background: #fff; max-width: 600px; margin: 0 auto; box-shadow: var(--shadow-md);">
        <div style="text-align: center; border-bottom: 2px solid ${school.primaryColor || '#1b2767'}; padding-bottom: 12px; margin-bottom: 16px;">
          <img src="${school.logoUrl || 'assets/logo.png'}" style="width: 48px; height: 48px; margin: 0 auto 6px; object-fit: contain;">
          <h3 style="color: ${school.primaryColor || '#1b2767'}; font-size: 18px; font-weight: 800; margin: 0;">${school.name}</h3>
          <span style="font-size: 11px; color: #64748b;">OFFICIAL SALARY PAYSLIP — ${school.activeSession || '2026-2027'}</span>
        </div>

        <table style="width: 100%; font-size: 12.5px; line-height: 1.8; margin-bottom: 16px;">
          <tr><td><strong>Employee Name:</strong></td><td>${st.name}</td><td><strong>Emp ID:</strong></td><td style="font-family: monospace;">${st.empNo}</td></tr>
          <tr><td><strong>Designation:</strong></td><td>${st.designation}</td><td><strong>Department:</strong></td><td>${st.department}</td></tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px;">
          <thead>
            <tr style="background: ${school.primaryColor || '#1b2767'}; color: #fff;">
              <th style="padding: 6px; text-align: left;">Earnings Head</th>
              <th style="padding: 6px; text-align: right;">Amount (PKR)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Basic Salary</td><td style="padding: 6px; border: 1px solid #cbd5e1; text-align: right;">${st.basicSalary.toLocaleString()}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Medical & Transport Allowance</td><td style="padding: 6px; border: 1px solid #cbd5e1; text-align: right;">${st.allowances.toLocaleString()}</td></tr>
            <tr style="background: #f1f5f9; font-weight: 700;"><td style="padding: 6px; border: 1px solid #cbd5e1;">Net Payable Salary:</td><td style="padding: 6px; border: 1px solid #cbd5e1; text-align: right; color: #1b2767; font-size: 14px;">PKR ${net.toLocaleString()}</td></tr>
          </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; border-top: 1px dashed #cbd5e1; padding-top: 12px;">
          <div style="text-align: center;">
            <img src="${school.stampUrl}" style="height: 55px;">
            <div style="font-size: 9px; color: #64748b;">Bursar Signature & Stamp</div>
          </div>
          <div style="text-align: center;">
            <div style="border-top: 1px solid #0f172a; padding-top: 4px; font-size: 11px; width: 140px;">Employee Signature</div>
          </div>
        </div>
      </div>
    `;

    window.TPS_APP.showGenericModal(`Salary Payslip — ${st.name}`, html, `
      <button class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.print()">Print Official Payslip</button>
    `, 'modal-md');
  },

  openAddStaffModal() {
    window.TPS_APP.showToast('Faculty registration form ready!', 'info');
  }
};
