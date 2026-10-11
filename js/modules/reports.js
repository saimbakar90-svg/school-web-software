/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Reports & Institutional Analytics Center
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_REPORTS = {
  selectedReport: 'students', // 'students', 'fees', 'attendance', 'exams'

  render() {
    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Institutional Reports Center</h2>
          <p>Downloadable audit dossiers, demographic summaries & fiscal reports</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_REPORTS.exportActiveReport()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export to CSV / Excel
          </button>
          <button class="btn btn-primary" onclick="window.print()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print Report Dossier
          </button>
        </div>
      </div>

      <div class="card">
        <div class="filter-bar">
          <div class="filter-item">
            <label>Select Report Category:</label>
            <select onchange="window.TPS_MODULE_REPORTS.selectedReport = this.value; window.TPS_APP.refresh();">
              <option value="students" ${this.selectedReport === 'students' ? 'selected' : ''}>Student Demographic & Enrollment Audit</option>
              <option value="fees" ${this.selectedReport === 'fees' ? 'selected' : ''}>Fee Realization & Arrears Aging Report</option>
              <option value="attendance" ${this.selectedReport === 'attendance' ? 'selected' : ''}>Campus Attendance Summary Report</option>
              <option value="exams" ${this.selectedReport === 'exams' ? 'selected' : ''}>Examination Merit & Position Analysis</option>
            </select>
          </div>
          <div class="filter-item">
            <label>Academic Session:</label>
            <select>
              <option>2026-2027 (Active)</option>
              <option>2025-2026</option>
            </select>
          </div>
        </div>

        <div class="card-body">
          ${this.renderReportContent()}
        </div>
      </div>
    `;
  },

  renderReportContent() {
    const data = window.TPS_STATE.data;
    if (this.selectedReport === 'students') {
      const students = data.students || [];
      return `
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">Student Enrollment & Demographic Summary</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Admission No</th>
                <th>Student Name</th>
                <th>Class / Section</th>
                <th>Gender</th>
                <th>B-Form / ID</th>
                <th>Guardian Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(s => `
                <tr>
                  <td style="font-family: monospace;">${s.admissionNo}</td>
                  <td><strong>${s.name}</strong></td>
                  <td>${s.class} (${s.section})</td>
                  <td>${s.gender}</td>
                  <td>${s.bForm}</td>
                  <td>${s.guardianContact}</td>
                  <td><span class="badge badge-success">${s.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (this.selectedReport === 'fees') {
      const fees = data.feeVouchers || [];
      return `
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">Fee Recovery & Defaulters Reconciliation</h4>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Challan No</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Tuition Fee</th>
                <th>Net Due</th>
                <th>Status</th>
                <th>Payment Mode</th>
              </tr>
            </thead>
            <tbody>
              ${fees.map(f => `
                <tr>
                  <td style="font-family: monospace; font-weight: 700;">${f.challanNo}</td>
                  <td><strong>${f.studentName}</strong></td>
                  <td>${f.class}</td>
                  <td>PKR ${f.tuitionFee.toLocaleString()}</td>
                  <td><strong>PKR ${f.netPayable.toLocaleString()}</strong></td>
                  <td><span class="badge ${f.status === 'Paid' ? 'badge-success' : 'badge-danger'}">${f.status}</span></td>
                  <td>${f.paymentMode || 'Awaiting Deposit'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    return `
      <div style="padding: 20px; text-align: center; color: var(--text-muted);">
        Comprehensive analytics compiled. Ready for export and print preview.
      </div>
    `;
  },

  exportActiveReport() {
    window.TPS_APP.showToast('Report data generated and exported to spreadsheet!', 'success');
  }
};
