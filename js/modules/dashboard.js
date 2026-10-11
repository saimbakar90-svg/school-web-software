/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Dashboard Module (Admin / Principal Dashboard & Real-Time Analytics)
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_DASHBOARD = {
  render() {
    const data = window.TPS_STATE.data;
    const students = data.students || [];
    const staff = data.staff || [];
    const fees = data.feeVouchers || [];
    const admissions = data.admissions || [];

    const totalStudents = students.length;
    const maleStudents = students.filter(s => s.gender === 'Male').length;
    const femaleStudents = students.filter(s => s.gender === 'Female').length;
    const totalTeachers = staff.filter(s => s.role === 'Teacher').length;
    const totalStaff = staff.length;

    const feesCollected = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.netPayable, 0);
    const feesPending = fees.filter(f => f.status !== 'Paid').reduce((sum, f) => sum + f.netPayable, 0);
    const newAdmissions = admissions.filter(a => a.status === 'Approved').length;
    const pendingAdmissions = admissions.filter(a => a.status === 'Pending').length;

    const avgAttendance = (students.reduce((sum, s) => sum + s.attendancePercent, 0) / (students.length || 1)).toFixed(1);

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Institutional Overview & Analytics</h2>
          <p>Real-time campus statistics for session ${data.settings.activeSession} — Sheikhupura Campus</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_APP.openModal('modal-filter')">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filter Analytics
          </button>
          <button class="btn btn-gold" onclick="window.TPS_APP.openAiAssistant('Show low attendance students and pending fee defaulters')">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            Review AI Actions
          </button>
          <button class="btn btn-primary" onclick="window.TPS_APP.navigate('admissions')">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            New Admission
          </button>
        </div>
      </div>

      <!-- Primary Stats Grid (Requirement #3) -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap primary">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Total Students</div>
            <div class="stat-value">${totalStudents}</div>
            <div class="stat-trend positive">
              <span>${maleStudents} Boys</span> • <span>${femaleStudents} Girls</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap gold">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Faculty & Staff</div>
            <div class="stat-value">${totalStaff}</div>
            <div class="stat-trend neutral">
              <span>${totalTeachers} Teaching Staff</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap success">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Attendance Today</div>
            <div class="stat-value">${avgAttendance}%</div>
            <div class="stat-trend positive">
              <span>${students.filter(s => s.attendancePercent >= 90).length} Regular (>90%)</span>
            </div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap info">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Fees Collected (PKR)</div>
            <div class="stat-value">${(feesCollected / 1000).toFixed(1)}k</div>
            <div class="stat-trend ${feesPending > 0 ? 'negative' : 'positive'}">
              <span>Pending: PKR ${(feesPending / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary Stats Row -->
      <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <div class="stat-card" style="padding: 14px 18px;">
          <div>
            <span style="font-size: 11.5px; color: var(--text-muted);">New Admissions</span>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--text-main);">${newAdmissions} Approved</h4>
          </div>
        </div>
        <div class="stat-card" style="padding: 14px 18px;">
          <div>
            <span style="font-size: 11.5px; color: var(--text-muted);">Pending Admissions</span>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--warning);">${pendingAdmissions} In Review</h4>
          </div>
        </div>
        <div class="stat-card" style="padding: 14px 18px;">
          <div>
            <span style="font-size: 11.5px; color: var(--text-muted);">Upcoming Exams</span>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--primary);">Mid-Term (20 Oct)</h4>
          </div>
        </div>
        <div class="stat-card" style="padding: 14px 18px;">
          <div>
            <span style="font-size: 11.5px; color: var(--text-muted);">Active Academic Session</span>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--text-main);">${data.settings.activeSession}</h4>
          </div>
        </div>
      </div>

      <!-- Charts Section (Interactive Canvas Charts) -->
      <div class="charts-grid">
        <div class="card">
          <div class="card-header">
            <h3>
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              Monthly Admissions & Enrollment Trends
            </h3>
            <span class="badge badge-primary">Session 2026-27</span>
          </div>
          <div class="card-body">
            <div class="chart-wrapper">
              <canvas id="chart-admissions"></canvas>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
              Fee Collection vs Outstanding Receivables
            </h3>
            <span class="badge badge-gold">PKR Breakdown</span>
          </div>
          <div class="card-body">
            <div class="chart-wrapper">
              <canvas id="chart-fees"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities & Important Notices -->
      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px;">
        <div class="card">
          <div class="card-header">
            <h3>
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Recent Campus Activities & Audit Log
            </h3>
            <button class="btn btn-sm btn-secondary" onclick="window.TPS_APP.navigate('settings')">View All</button>
          </div>
          <div class="card-body" style="padding: 0;">
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  ${(data.auditLogs || []).slice(0, 5).map(log => `
                    <tr>
                      <td style="font-size: 11.5px; color: var(--text-muted);">${log.timestamp.split(' ')[1]}</td>
                      <td style="font-weight: 600;">${log.user}</td>
                      <td><span class="badge badge-primary">${log.action}</span></td>
                      <td style="font-size: 12.5px; color: var(--text-muted);">${log.detail}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Compact AI Action Advisory Widget (Positioned on the side) -->
          <div class="card" style="background: linear-gradient(135deg, #1b2767 0%, #15385b 100%); color: #fff; margin-bottom: 0; border-radius: 12px; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 4px 14px rgba(27,39,103,0.15); overflow: hidden;">
            <div class="card-body" style="padding: 14px 18px;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="width: 28px; height: 28px; border-radius: 7px; background: rgba(201, 147, 38, 0.25); display: flex; align-items: center; justify-content: center; color: #fde68a; flex-shrink: 0;">
                    <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                  </div>
                  <div>
                    <h5 style="font-size: 13.5px; font-weight: 700; color: #fff; margin: 0;">AI Action Advisory</h5>
                  </div>
                </div>
                <button class="btn btn-xs btn-gold" style="font-size: 11px; padding: 4px 10px; font-weight: 600; white-space: nowrap;" onclick="window.TPS_APP.openAiAssistant('Show low attendance students and pending fee defaulters')">
                  Review AI Actions
                </button>
              </div>
              <p style="font-size: 12px; color: rgba(255,255,255,0.85); line-height: 1.45; margin: 0;">
                Fees: <strong>PKR ${(feesCollected / 1000).toFixed(1)}k</strong> • <strong>${fees.filter(f => f.status === 'Defaulter').length} Defaulters</strong> • Attendance: <strong>${avgAttendance}%</strong>
              </p>
            </div>
          </div>

          <!-- Official Circulars & Notices -->
          <div class="card">
            <div class="card-header">
              <h3>
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                Official Circulars & Notices
              </h3>
              <button class="btn btn-sm btn-secondary" onclick="window.TPS_APP.navigate('notices')">Manage</button>
            </div>
            <div class="card-body" style="padding: 16px;">
              ${(data.notices || []).map(n => `
                <div style="padding: 12px; border-radius: 8px; background: var(--bg-card-muted); margin-bottom: 10px; border-left: 3px solid var(--primary);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <strong style="font-size: 13px; color: var(--text-main);">${n.title}</strong>
                    <span class="badge badge-gold" style="font-size: 10px;">${n.badge}</span>
                  </div>
                  <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">${n.content.substring(0, 85)}...</p>
                  <div style="display: flex; justify-content: space-between; font-size: 10.5px; color: var(--text-light); margin-top: 6px;">
                    <span>Target: ${n.target}</span>
                    <span>${n.date}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  postRender() {
    this.renderCharts();
  },

  renderCharts() {
    // Canvas-based lightweight custom charts (Zero external dependency requirement)
    this.renderAdmissionsChart();
    this.renderFeesChart();
  },

  renderAdmissionsChart() {
    const canvas = document.getElementById('chart-admissions');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = 240;

    ctx.clearRect(0, 0, width, height);

    const labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const values = [45, 62, 58, 30, 85, 70, 92];
    const maxVal = 100;
    const padding = 40;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    const stepX = chartW / (labels.length - 1);

    // Draw Grid Lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Outfit, sans-serif';
      ctx.fillText(Math.round(maxVal - (maxVal / 4) * i), 10, y + 4);
    }

    // Draw Smooth Line & Gradient Fill
    ctx.beginPath();
    values.forEach((v, idx) => {
      const x = padding + idx * stepX;
      const y = padding + chartH - (v / maxVal) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    // Fill under curve
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(16, 76, 53, 0.25)');
    gradient.addColorStop(1, 'rgba(16, 76, 53, 0.0)');
    ctx.lineTo(padding + (labels.length - 1) * stepX, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Main Stroke
    ctx.beginPath();
    values.forEach((v, idx) => {
      const x = padding + idx * stepX;
      const y = padding + chartH - (v / maxVal) * chartH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#1b2767';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Data Dots & Labels
    values.forEach((v, idx) => {
      const x = padding + idx * stepX;
      const y = padding + chartH - (v / maxVal) * chartH;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#6da534';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '11px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[idx], x, height - 12);
    });
  },

  renderFeesChart() {
    const canvas = document.getElementById('chart-fees');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = 240;

    ctx.clearRect(0, 0, width, height);

    const categories = ['Grade 1-3', 'Grade 4-6', 'Grade 7-8', 'Grade 9-10'];
    const collected = [65000, 84000, 72000, 110000];
    const pending = [8500, 12000, 9500, 27400];
    const maxVal = 130000;

    const padding = 45;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    const barWidth = 24;
    const groupStep = chartW / categories.length;

    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = padding + (chartH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    categories.forEach((cat, idx) => {
      const groupX = padding + idx * groupStep + (groupStep - barWidth * 2 - 8) / 2;

      // Collected Bar (Green)
      const colH = (collected[idx] / maxVal) * chartH;
      const colY = height - padding - colH;
      ctx.fillStyle = '#1b2767';
      ctx.beginPath();
      ctx.roundRect(groupX, colY, barWidth, colH, [4, 4, 0, 0]);
      ctx.fill();

      // Pending Bar (Amber/Red)
      const penH = (pending[idx] / maxVal) * chartH;
      const penY = height - padding - penH;
      ctx.fillStyle = '#6da534';
      ctx.beginPath();
      ctx.roundRect(groupX + barWidth + 6, penY, barWidth, penH, [4, 4, 0, 0]);
      ctx.fill();

      // Label
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cat, groupX + barWidth + 3, height - 12);
    });

    // Legend
    ctx.fillStyle = '#1b2767';
    ctx.fillRect(width - 180, 15, 12, 12);
    ctx.fillStyle = '#475569';
    ctx.font = '11px Outfit, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Collected', width - 162, 25);

    ctx.fillStyle = '#6da534';
    ctx.fillRect(width - 95, 15, 12, 12);
    ctx.fillStyle = '#475569';
    ctx.fillText('Pending', width - 78, 25);
  }
};
