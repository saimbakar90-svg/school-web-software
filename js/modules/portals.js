/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Dedicated Multi-User Portals: Teacher, Student & Parent Portals
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_PORTALS = {
  // TEACHER PORTAL
  renderTeacherPortal() {
    const data = window.TPS_STATE.data;
    const teacher = data.staff.find(s => s.role === 'Teacher') || data.staff[2];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Teacher Academic Workspace</h2>
          <p>Welcome back, ${teacher.name} (${teacher.designation})</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-gold" onclick="window.TPS_APP.openAiAssistant('Generate an SLO-based lesson plan for Quadratic Equations')">
            AI Lesson Planner
          </button>
          <button class="btn btn-primary" onclick="window.TPS_APP.navigate('attendance')">
            Mark Class Attendance
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap primary">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Assigned Classes</div>
            <div class="stat-value">Grade 9 & 10</div>
            <div class="stat-trend positive"><span>Science Wing</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap gold">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Today's Periods</div>
            <div class="stat-value">4 Classes</div>
            <div class="stat-trend neutral"><span>Next: Period 2 (Maths)</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap success">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Homework Submissions</div>
            <div class="stat-value">28 / 32</div>
            <div class="stat-trend positive"><span>Exercise 2.3</span></div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px;">
        <div class="card">
          <div class="card-header">
            <h3>Today's Teaching Schedule</h3>
            <span class="badge badge-primary">Tuesday</span>
          </div>
          <div class="card-body" style="padding: 0;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Class & Section</th>
                  <th>Subject</th>
                  <th>Room</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Period 1 (08:00 - 08:45)</strong></td>
                  <td>Grade 9 Science A</td>
                  <td>Mathematics</td>
                  <td>Room 204</td>
                  <td><span class="badge badge-success">Completed</span></td>
                </tr>
                <tr>
                  <td><strong>Period 2 (08:45 - 09:30)</strong></td>
                  <td>Grade 10 Science</td>
                  <td>Mathematics</td>
                  <td>Room 208</td>
                  <td><button class="btn btn-sm btn-primary" onclick="window.TPS_APP.navigate('attendance')">Take Attendance</button></td>
                </tr>
                <tr>
                  <td><strong>Period 4 (10:45 - 11:30)</strong></td>
                  <td>Grade 9 Science B</td>
                  <td>Mathematics</td>
                  <td>Room 205</td>
                  <td><span class="badge badge-secondary">Upcoming</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>Quick Teacher Tools</h3>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn btn-secondary" style="justify-content: flex-start;" onclick="window.TPS_APP.navigate('homework')">
              📁 Manage & Upload Homework
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start;" onclick="window.TPS_APP.navigate('exams')">
              ✍️ Enter Mid-Term Examination Marks
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start;" onclick="window.TPS_APP.openAiAssistant('Generate a 20 mark quiz for Grade 9 Physics')">
              🤖 AI Exam Paper Generator
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start;" onclick="window.TPS_APP.navigate('leave')">
              📝 Apply for Leave
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // STUDENT PORTAL
  renderStudentPortal() {
    const data = window.TPS_STATE.data;
    const std = data.students[0]; // Muhammad Hamza Khan

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Student Learning Portal</h2>
          <p>Welcome, ${std.name} | ${std.class} (${std.section}) • Roll No: ${std.rollNo}</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-gold" onclick="window.TPS_APP.openAiAssistant('Explain the laws of refraction of light in simple terms')">
            Ask AI Study Tutor
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_STUDENTS.openIdCard('${std.id}')">
            View Smart ID Card
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap success">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Attendance Record</div>
            <div class="stat-value">${std.attendancePercent}%</div>
            <div class="stat-trend positive"><span>Eligible for Exams (>75%)</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap primary">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Last Exam Grade</div>
            <div class="stat-value">A+ (93.1%)</div>
            <div class="stat-trend positive"><span>1st Position in Class</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap warning">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Pending Assignments</div>
            <div class="stat-value">1 Due</div>
            <div class="stat-trend negative"><span>Maths Ex 2.3 (Due 9 Oct)</span></div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div class="card">
          <div class="card-header">
            <h3>Active Homework & Assignments</h3>
          </div>
          <div class="card-body">
            <div style="padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: var(--primary);">Quadratic Equations Exercise 2.3</strong>
                <span class="badge badge-warning">Due: 09 Oct</span>
              </div>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Assigned by: Sir Tariq Mahmood (Mathematics)</p>
              <button class="btn btn-sm btn-primary" style="margin-top: 10px;" onclick="window.TPS_APP.showToast('Assignment file submitted successfully for teacher review!', 'success')">
                Submit Solution PDF
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>My Examinations & Results</h3>
          </div>
          <div class="card-body">
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
              Your official Detailed Marks Certificate (DMC) for the completed First Term Examination is ready.
            </p>
            <button class="btn btn-gold" onclick="window.TPS_MODULE_EXAMS.printReportCard('${std.id}')">
              Download Official DMC (PDF)
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // PARENT PORTAL
  renderParentPortal() {
    const data = window.TPS_STATE.data;
    const std1 = data.students[0]; // Hamza
    const std2 = data.students[3]; // Fatima (Sibling)

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Parent & Guardian Portal</h2>
          <p>Supervising: Dr. Tariq Jamil Khan (Father of Hamza Khan & Fatima Tariq)</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_APP.navigate('ptm')">
            Book PTM Slot
          </button>
          <button class="btn btn-gold" onclick="window.TPS_APP.openAiAssistant('Summarize my children\\'s academic progress and fee status')">
            AI Parent Assistant
          </button>
        </div>
      </div>

      <!-- Sibling Switcher Cards -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
        <div class="card" style="border: 2px solid var(--primary); margin-bottom: 0;">
          <div class="card-body" style="display: flex; gap: 16px; align-items: center;">
            <img src="${std1.photo}" style="width: 60px; height: 60px; border-radius: var(--radius-full); object-fit: cover;">
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main);">${std1.name}</h4>
                <span class="badge badge-success">Fee Paid</span>
              </div>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${std1.class} (${std1.section}) • Roll #${std1.rollNo}</p>
              <div style="font-size: 12px; font-weight: 600; color: var(--primary); margin-top: 4px;">Attendance: ${std1.attendancePercent}% • 1st Position</div>
            </div>
          </div>
        </div>

        <div class="card" style="border: 1px solid var(--border-color); margin-bottom: 0;">
          <div class="card-body" style="display: flex; gap: 16px; align-items: center;">
            <img src="${std2.photo}" style="width: 60px; height: 60px; border-radius: var(--radius-full); object-fit: cover;">
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main);">${std2.name}</h4>
                <span class="badge badge-success">Fee Paid</span>
              </div>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${std2.class} (${std2.section}) • Roll #${std2.rollNo}</p>
              <div style="font-size: 12px; font-weight: 600; color: var(--primary); margin-top: 4px;">Attendance: ${std2.attendancePercent}% (Sibling Discount Applied)</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>Fee Vouchers & Payment Receipts</h3>
        </div>
        <div class="card-body" style="padding: 0;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Challan No</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${std1.name}</strong></td>
                <td style="font-family: monospace;">CH-2026-1001</td>
                <td>October 2026</td>
                <td>PKR 11,200</td>
                <td><span class="badge badge-success">Paid via Bank</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-sm btn-secondary" onclick="window.TPS_MODULE_FEES.printReceipt('CH-2026-1001')">Download Receipt</button>
                </td>
              </tr>
              <tr>
                <td><strong>${std2.name}</strong></td>
                <td style="font-family: monospace;">CH-2026-1004</td>
                <td>October 2026</td>
                <td>PKR 8,400</td>
                <td><span class="badge badge-success">Paid at Counter</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-sm btn-secondary" onclick="window.TPS_MODULE_FEES.printReceipt('CH-2026-1004')">Download Receipt</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
