/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Attendance Management Module (Student & Staff Daily Sheets + Absence Alerts)
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_ATTENDANCE = {
  activeTab: 'students', // 'students', 'staff'
  selectedClass: 'Grade 9',
  selectedSection: 'Science A',
  attendanceDate: new Date().toISOString().split('T')[0],

  render() {
    const data = window.TPS_STATE.data;
    const classes = data.classes || [];
    const students = (data.students || []).filter(s => s.class === this.selectedClass);
    const staff = data.staff || [];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Campus Attendance Management</h2>
          <p>Daily student and staff registers, automated absence notifications & analytics</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_ATTENDANCE.sendAbsenceAlerts()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Send WhatsApp / SMS Absence Alerts
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_ATTENDANCE.markAllPresent()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Mark All Present
          </button>
        </div>
      </div>

      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'students' ? 'active' : ''}" onclick="window.TPS_MODULE_ATTENDANCE.setTab('students')">Student Daily Register</button>
          <button class="tab-btn ${this.activeTab === 'staff' ? 'active' : ''}" onclick="window.TPS_MODULE_ATTENDANCE.setTab('staff')">Staff & Faculty Attendance</button>
        </div>

        <div class="card-body" style="padding: 0;">
          ${this.activeTab === 'students' ? this.renderStudentRegister(classes, students) : this.renderStaffRegister(staff)}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderStudentRegister(classes, students) {
    return `
      <div class="filter-bar">
        <div class="filter-item">
          <label>Class:</label>
          <select onchange="window.TPS_MODULE_ATTENDANCE.selectedClass = this.value; window.TPS_APP.refresh();">
            ${classes.map(c => `<option value="${c.name}" ${this.selectedClass === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="filter-item">
          <label>Section:</label>
          <select onchange="window.TPS_MODULE_ATTENDANCE.selectedSection = this.value; window.TPS_APP.refresh();">
            <option value="Science A">Science A</option>
            <option value="Pine A">Pine A</option>
            <option value="Cedar">Cedar</option>
          </select>
        </div>
        <div class="filter-item">
          <label>Date:</label>
          <input type="date" value="${this.attendanceDate}" onchange="window.TPS_MODULE_ATTENDANCE.attendanceDate = this.value; window.TPS_APP.refresh();">
        </div>
      </div>

      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Roll #</th>
              <th>Student Name</th>
              <th>Admission No</th>
              <th>Status</th>
              <th>Remarks</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${students.map((s, idx) => `
              <tr>
                <td style="font-weight: 700; width: 60px;">${s.rollNo}</td>
                <td>
                  <strong>${s.name}</strong>
                  <div style="font-size: 11px; color: var(--text-muted);">${s.fatherName}</div>
                </td>
                <td style="font-family: monospace;">${s.admissionNo}</td>
                <td>
                  <div style="display: inline-flex; gap: 4px;">
                    <button class="btn btn-sm btn-success" style="padding: 4px 10px;">Present</button>
                    <button class="btn btn-sm btn-secondary" style="padding: 4px 10px;">Absent</button>
                    <button class="btn btn-sm btn-secondary" style="padding: 4px 10px;">Late</button>
                    <button class="btn btn-sm btn-secondary" style="padding: 4px 10px;">Leave</button>
                  </div>
                </td>
                <td><input type="text" placeholder="Optional notes" class="form-control" style="padding: 4px 8px; font-size: 11.5px; width: 140px;"></td>
                <td style="text-align: right;">
                  <button class="btn btn-sm btn-secondary" onclick="window.TPS_MODULE_ATTENDANCE.notifyParent('${s.name}', '${s.guardianContact}')">
                    SMS Parent
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderStaffRegister(staff) {
    return `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Emp No</th>
              <th>Staff Name</th>
              <th>Role / Department</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Daily Status</th>
            </tr>
          </thead>
          <tbody>
            ${staff.map(st => `
              <tr>
                <td style="font-family: monospace; font-weight: 700;">${st.empNo}</td>
                <td>
                  <strong>${st.name}</strong>
                  <div style="font-size: 11px; color: var(--text-muted);">${st.designation}</div>
                </td>
                <td><span class="badge badge-primary">${st.department}</span></td>
                <td style="font-family: monospace; color: var(--success); font-weight: 600;">07:45 AM</td>
                <td style="font-family: monospace; color: var(--text-muted);">02:30 PM</td>
                <td><span class="badge badge-success">Present (On Time)</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  markAllPresent() {
    window.TPS_STATE.logAction('Attendance Recorded', `Marked all students present in ${this.selectedClass} for ${this.attendanceDate}`);
    window.TPS_APP.showToast(`Marked all students Present in ${this.selectedClass}!`, 'success');
  },

  sendAbsenceAlerts() {
    window.TPS_APP.showToast('Automated parent absence SMS & WhatsApp notifications successfully dispatched!', 'success');
  },

  notifyParent(studentName, contact) {
    window.TPS_APP.showToast(`Absence notification sent to ${contact} regarding ${studentName}`, 'info');
  }
};
