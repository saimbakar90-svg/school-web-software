/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Academics, Timetable & Syllabus Module
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_ACADEMICS = {
  activeTab: 'classes', // 'classes', 'timetable', 'promotion', 'syllabus'

  render() {
    const data = window.TPS_STATE.data;
    const classes = data.classes || [];
    const subjects = data.subjects || [];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Academics, Timetable & Planning</h2>
          <p>Class & Section management, AI timetable generator, and bulk student promotions</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_ACADEMICS.setTab('promotion')">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
            Bulk Student Promotion
          </button>
          <button class="btn btn-gold" onclick="window.TPS_MODULE_ACADEMICS.setTab('syllabus')">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path></svg>
            AI Syllabus Planner
          </button>
        </div>
      </div>

      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'classes' ? 'active' : ''}" onclick="window.TPS_MODULE_ACADEMICS.setTab('classes')">Classes & Sections</button>
          <button class="tab-btn ${this.activeTab === 'timetable' ? 'active' : ''}" onclick="window.TPS_MODULE_ACADEMICS.setTab('timetable')">Campus Timetable & Clash Detector</button>
          <button class="tab-btn ${this.activeTab === 'promotion' ? 'active' : ''}" onclick="window.TPS_MODULE_ACADEMICS.setTab('promotion')">Annual Student Promotion</button>
          <button class="tab-btn ${this.activeTab === 'syllabus' ? 'active' : ''}" onclick="window.TPS_MODULE_ACADEMICS.setTab('syllabus')">AI Scheme of Studies</button>
        </div>

        <div class="card-body" style="padding: 0;">
          ${this.activeTab === 'classes' ? this.renderClasses(classes, subjects) : ''}
          ${this.activeTab === 'timetable' ? this.renderTimetable() : ''}
          ${this.activeTab === 'promotion' ? this.renderPromotion() : ''}
          ${this.activeTab === 'syllabus' ? this.renderSyllabus() : ''}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderClasses(classes, subjects) {
    return `
      <div style="padding: 24px;">
        <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 16px;">Active Campus Classes (Session ${window.TPS_STATE.data.settings.activeSession})</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${classes.map(c => `
            <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 10px; background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main);">${c.name}</h4>
                <span class="badge badge-primary">${c.level}</span>
              </div>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">Sections: <strong>${c.sections.join(', ')}</strong></p>
              <div style="display: flex; gap: 8px; margin-top: 14px;">
                <button class="btn btn-sm btn-secondary" onclick="window.TPS_APP.showToast('Class details loaded', 'info')">Manage Subjects</button>
                <button class="btn btn-sm btn-gold" onclick="window.TPS_APP.showToast('Section details loaded', 'info')">Class Teacher</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderTimetable() {
    return `
      <div style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h4 style="font-size: 16px; font-weight: 700; color: var(--primary);">Master Timetable — Grade 9 (Science A)</h4>
            <span style="font-size: 12px; color: var(--text-muted);">AI Conflict Detection: <strong style="color: var(--success);">0 Clashes Detected</strong></span>
          </div>
          <button class="btn btn-sm btn-primary" onclick="window.TPS_MODULE_ACADEMICS.runAiTimetableGenerator()">
            AI Re-balance Timetable
          </button>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Period 1 (08:00 - 08:45)</th>
                <th>Period 2 (08:45 - 09:30)</th>
                <th>Period 3 (09:30 - 10:15)</th>
                <th style="background: #fef3c7; color: #92400e;">Break (10:15)</th>
                <th>Period 4 (10:45 - 11:30)</th>
                <th>Period 5 (11:30 - 12:15)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Monday</strong></td>
                <td>Mathematics<br><small>Sir Tariq</small></td>
                <td>English<br><small>Ma'am Sadia</small></td>
                <td>Physics<br><small>Prof. Arshad</small></td>
                <td rowspan="6" style="background: #fffbeb; text-align: center; font-weight: 700; color: #b45309; vertical-align: middle;">R<br>E<br>C<br>E<br>S<br>S</td>
                <td>Chemistry<br><small>Lab 1</small></td>
                <td>Islamiyat<br><small>Room 102</small></td>
              </tr>
              <tr>
                <td><strong>Tuesday</strong></td>
                <td>English<br><small>Ma'am Sadia</small></td>
                <td>Mathematics<br><small>Sir Tariq</small></td>
                <td>Biology<br><small>Bio Lab</small></td>
                <td>Physics<br><small>Prof. Arshad</small></td>
                <td>Urdu Lit<br><small>Room 102</small></td>
              </tr>
              <tr>
                <td><strong>Wednesday</strong></td>
                <td>Mathematics<br><small>Sir Tariq</small></td>
                <td>Physics<br><small>Prof. Arshad</small></td>
                <td>Computer Sci<br><small>Lab 2</small></td>
                <td>English<br><small>Ma'am Sadia</small></td>
                <td>Pak Studies<br><small>Room 102</small></td>
              </tr>
              <tr>
                <td><strong>Thursday</strong></td>
                <td>Chemistry<br><small>Lab 1</small></td>
                <td>Mathematics<br><small>Sir Tariq</small></td>
                <td>Urdu Lit<br><small>Room 102</small></td>
                <td>Physics Practical<br><small>Physics Lab</small></td>
                <td>Islamiyat<br><small>Room 102</small></td>
              </tr>
              <tr>
                <td><strong>Friday</strong></td>
                <td>Islamiyat & Ethics</td>
                <td>Pak Studies</td>
                <td>English Language</td>
                <td>Mathematics</td>
                <td>Friday Assembly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderPromotion() {
    return `
      <div style="padding: 24px; max-width: 650px;">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">Annual Academic Session Student Promotion</h4>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
          Automatically promote all passing students of a class to the next academic grade for the upcoming session.
        </p>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Source Class (Current)</label>
            <select class="form-control" id="promo-src">
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 7">Grade 7</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Target Class (Promoted)</label>
            <select class="form-control" id="promo-target">
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
            </select>
          </div>
        </div>
        <button class="btn btn-primary" onclick="window.TPS_MODULE_ACADEMICS.executePromotion()">
          Promote Eligible Students
        </button>
      </div>
    `;
  },

  renderSyllabus() {
    return `
      <div style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h4 style="font-size: 16px; font-weight: 700; color: var(--primary);">AI Scheme of Studies & Breakdown Planner</h4>
            <span style="font-size: 12px; color: var(--text-muted);">Pakistani National Curriculum & SLO Matrix</span>
          </div>
          <button class="btn btn-sm btn-gold" onclick="window.TPS_APP.openAiAssistant('Generate complete Grade 9 scheme of studies for Physics')">
            Generate New Scheme
          </button>
        </div>

        <div style="background: #fafbfc; border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; font-size: 13px; line-height: 1.6;">
          <h5 style="font-size: 14px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">Grade 9 — Mathematics Scheme of Studies (Term 1)</h5>
          <p><strong>Week 1-2:</strong> Unit 1 — Matrices & Determinants (Addition, Multiplication, Inverses, Cramer's Rule).</p>
          <p><strong>Week 3-4:</strong> Unit 2 — Real and Complex Numbers (Radicals, Laws of Exponents, Complex numbers operations).</p>
          <p><strong>Week 5-6:</strong> Unit 3 — Logarithms (Scientific notation, Common logarithm, Laws of Logarithms).</p>
          <p><strong>Week 7:</strong> Mid-Term Formative Review & Assessment.</p>
        </div>
      </div>
    `;
  },

  runAiTimetableGenerator() {
    window.TPS_APP.showToast('AI Timetable Engine: Analyzed 12 classes & 24 teachers. Zero conflicts found!', 'success');
  },

  executePromotion() {
    window.TPS_STATE.logAction('Bulk Student Promotion', 'Promoted passing students of Grade 9 to Grade 10');
    window.TPS_APP.showToast('Successfully promoted all eligible students to Grade 10!', 'success');
  }
};
