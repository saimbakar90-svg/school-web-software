/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Examination & Results Module (Report Cards, DMCs & Date Sheets)
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_EXAMS = {
  activeTab: 'results', // 'results', 'datesheet', 'marksentry'

  render() {
    const data = window.TPS_STATE.data;
    const exams = data.exams || [];
    const results = data.results || [];
    const students = data.students || [];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Examinations & Academic Assessment</h2>
          <p>Exam scheduling, marks recording, and official Detailed Marks Certificates (DMC)</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_EXAMS.printDateSheet()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Date Sheet (Mid-Term)
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_EXAMS.openMarksEntryModal()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Enter Exam Marks
          </button>
        </div>
      </div>

      <!-- Examination Overview Card -->
      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'results' ? 'active' : ''}" onclick="window.TPS_MODULE_EXAMS.setTab('results')">Published Results & Report Cards</button>
          <button class="tab-btn ${this.activeTab === 'datesheet' ? 'active' : ''}" onclick="window.TPS_MODULE_EXAMS.setTab('datesheet')">Mid-Term Examination Date Sheet</button>
          <button class="tab-btn ${this.activeTab === 'grading' ? 'active' : ''}" onclick="window.TPS_MODULE_EXAMS.setTab('grading')">Grading Criteria & Weightage</button>
        </div>

        <div class="card-body" style="padding: 0;">
          ${this.activeTab === 'results' ? this.renderResultsTable(results, students) : ''}
          ${this.activeTab === 'datesheet' ? this.renderDateSheet() : ''}
          ${this.activeTab === 'grading' ? this.renderGradingCriteria() : ''}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderResultsTable(results, students) {
    return `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class / Section</th>
              <th>Exam Title</th>
              <th>Total Marks</th>
              <th>Obtained Marks</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Position</th>
              <th style="text-align: right;">Official DMC</th>
            </tr>
          </thead>
          <tbody>
            ${results.map(r => {
              const std = students.find(s => s.id === r.studentId) || { name: 'Student' };
              return `
                <tr>
                  <td>
                    <strong>${std.name}</strong>
                    <div style="font-size: 11px; color: var(--text-muted);">${r.studentId}</div>
                  </td>
                  <td><span class="badge badge-primary">${r.class} - ${r.section}</span></td>
                  <td>First Term Examination 2026</td>
                  <td>${r.totalMarks}</td>
                  <td><strong style="color: var(--primary);">${r.obtainedMarks}</strong></td>
                  <td><strong>${r.percentage}%</strong></td>
                  <td><span class="badge badge-success">${r.grade}</span></td>
                  <td><span class="badge badge-gold">${r.classPosition}</span></td>
                  <td style="text-align: right;">
                    <button class="btn btn-sm btn-primary" onclick="window.TPS_MODULE_EXAMS.printReportCard('${r.studentId}')">
                      <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                      Print Report Card (DMC)
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

  renderDateSheet() {
    return `
      <div style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h4 style="font-size: 16px; font-weight: 700; color: var(--primary);">Official Date Sheet — Mid-Term Examinations October 2026</h4>
            <span style="font-size: 12px; color: var(--text-muted);">Session 2026-2027 • Reporting Time: 08:30 AM Sharp</span>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="window.print()">Print Date Sheet</button>
        </div>

        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date & Day</th>
                <th>Time</th>
                <th>Grade 9 (Science)</th>
                <th>Grade 10 (Science)</th>
                <th>Middle Wings (Grades 6-8)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>20-Oct-2026 (Mon)</strong></td>
                <td>09:00 AM - 12:00 PM</td>
                <td>English Compulsory</td>
                <td>Urdu Literature</td>
                <td>Mathematics</td>
              </tr>
              <tr>
                <td><strong>22-Oct-2026 (Wed)</strong></td>
                <td>09:00 AM - 12:00 PM</td>
                <td>Mathematics</td>
                <td>Physics</td>
                <td>General Science</td>
              </tr>
              <tr>
                <td><strong>24-Oct-2026 (Fri)</strong></td>
                <td>08:30 AM - 11:30 AM</td>
                <td>Physics</td>
                <td>Chemistry</td>
                <td>English Compulsory</td>
              </tr>
              <tr>
                <td><strong>27-Oct-2026 (Mon)</strong></td>
                <td>09:00 AM - 12:00 PM</td>
                <td>Chemistry / Computer</td>
                <td>Biology / Computer</td>
                <td>Islamiyat & Ethics</td>
              </tr>
              <tr>
                <td><strong>29-Oct-2026 (Wed)</strong></td>
                <td>09:00 AM - 12:00 PM</td>
                <td>Biology / Computer</td>
                <td>English Compulsory</td>
                <td>Urdu Compulsory</td>
              </tr>
              <tr>
                <td><strong>31-Oct-2026 (Fri)</strong></td>
                <td>08:30 AM - 11:00 AM</td>
                <td>Islamiyat & Pak Studies</td>
                <td>Pak Studies & Islamiyat</td>
                <td>History & Geography</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderGradingCriteria() {
    return `
      <div style="padding: 24px;">
        <h4 style="font-size: 16px; font-weight: 700; color: var(--primary); margin-bottom: 12px;">BISE & Institutional Grading Schema</h4>
        <div class="table-responsive" style="max-width: 600px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Percentage Range</th>
                <th>Grade</th>
                <th>GPA</th>
                <th>Evaluation / Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>90% - 100%</td><td><span class="badge badge-success">A+</span></td><td>4.00</td><td>Exceptional / Distinction</td></tr>
              <tr><td>80% - 89%</td><td><span class="badge badge-success">A</span></td><td>3.70</td><td>Excellent</td></tr>
              <tr><td>70% - 79%</td><td><span class="badge badge-primary">B</span></td><td>3.00</td><td>Very Good</td></tr>
              <tr><td>60% - 69%</td><td><span class="badge badge-gold">C</span></td><td>2.00</td><td>Good / Satisfactory</td></tr>
              <tr><td>50% - 59%</td><td><span class="badge badge-warning">D</span></td><td>1.00</td><td>Fair (Passing)</td></tr>
              <tr><td>Below 50%</td><td><span class="badge badge-danger">F</span></td><td>0.00</td><td>Fail (Academic Probation)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  printReportCard(studentId) {
    const res = window.TPS_STATE.data.results.find(r => r.studentId === studentId);
    if (!res) return;
    const std = window.TPS_STATE.data.students.find(s => s.id === studentId);
    const school = window.TPS_STATE.data.settings;

    const html = `
      <div style="border: 3px double ${school.primaryColor || '#1b2767'}; padding: 24px; background: #fff; max-width: 800px; margin: 0 auto; box-shadow: var(--shadow-md);">
        <!-- Official Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2.5px solid ${school.primaryColor || '#1b2767'}; padding-bottom: 16px; margin-bottom: 20px;">
          <img src="${school.logoUrl || 'assets/logo.png'}" style="width: 75px; height: 75px; object-fit: contain;">
          <div style="text-align: center; flex: 1; padding: 0 15px;">
            <h2 style="color: ${school.primaryColor || '#1b2767'}; font-size: 20px; font-weight: 800; margin: 0; letter-spacing: 0.5px;">${school.name}</h2>
            <div style="color: ${school.secondaryColor || '#6da534'}; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-top: 2px;">${school.tagline || school.campus || ''}</div>
            <div style="font-size: 9.5px; color: #475569; margin-top: 4px;">${school.address}</div>
            <div style="font-size: 13px; font-weight: 700; color: ${school.primaryColor || '#1b2767'}; margin-top: 8px; text-decoration: underline;">DETAILED MARKS CERTIFICATE (DMC) & PROGRESS REPORT</div>
          </div>
          <img src="${std.photo || 'assets/logo.png'}" style="width: 70px; height: 85px; border-radius: 6px; border: 1.5px solid #cbd5e1; object-fit: cover;">
        </div>

        <!-- Student Meta Table -->
        <table style="width: 100%; font-size: 12px; margin-bottom: 16px; border-collapse: collapse;">
          <tr>
            <td style="padding: 4px;"><strong>Student Name:</strong> ${std.name}</td>
            <td style="padding: 4px;"><strong>Admission No:</strong> ${std.admissionNo}</td>
            <td style="padding: 4px;"><strong>Roll No:</strong> ${std.rollNo}</td>
          </tr>
          <tr>
            <td style="padding: 4px;"><strong>Father's Name:</strong> ${std.fatherName}</td>
            <td style="padding: 4px;"><strong>Class & Section:</strong> ${std.class} (${std.section})</td>
            <td style="padding: 4px;"><strong>Session:</strong> ${std.session}</td>
          </tr>
        </table>

        <!-- Scores Table -->
        <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 16px;">
          <thead>
            <tr style="background: #1b2767; color: #fff;">
              <th style="padding: 8px; border: 1px solid #1b2767; text-align: left;">Subject</th>
              <th style="padding: 8px; border: 1px solid #1b2767; text-align: center;">Total Marks</th>
              <th style="padding: 8px; border: 1px solid #1b2767; text-align: center;">Passing Marks</th>
              <th style="padding: 8px; border: 1px solid #1b2767; text-align: center;">Obtained Marks</th>
              <th style="padding: 8px; border: 1px solid #1b2767; text-align: center;">Grade</th>
            </tr>
          </thead>
          <tbody>
            ${res.scores.map(s => `
              <tr>
                <td style="padding: 7px; border: 1px solid #cbd5e1; font-weight: 600;">${s.subject}</td>
                <td style="padding: 7px; border: 1px solid #cbd5e1; text-align: center;">${s.totalMarks}</td>
                <td style="padding: 7px; border: 1px solid #cbd5e1; text-align: center;">${s.passMarks}</td>
                <td style="padding: 7px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #1b2767;">${s.obtained}</td>
                <td style="padding: 7px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">${s.grade}</td>
              </tr>
            `).join('')}
            <tr style="background: #f1f5f9; font-weight: 700; font-size: 12.5px;">
              <td style="padding: 8px; border: 1px solid #cbd5e1;">Grand Total:</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">${res.totalMarks}</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">-</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; color: #1b2767;">${res.obtainedMarks}</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center;">${res.grade}</td>
            </tr>
          </tbody>
        </table>

        <!-- Result Highlights -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #fafbfc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; text-align: center; margin-bottom: 16px;">
          <div><span style="font-size: 10.5px; color: #64748b;">Percentage</span><div style="font-size: 16px; font-weight: 800; color: #1b2767;">${res.percentage}%</div></div>
          <div><span style="font-size: 10.5px; color: #64748b;">Overall Grade</span><div style="font-size: 16px; font-weight: 800; color: #1b2767;">${res.grade}</div></div>
          <div><span style="font-size: 10.5px; color: #64748b;">GPA Score</span><div style="font-size: 16px; font-weight: 800; color: #1b2767;">${res.gpa.toFixed(2)}</div></div>
          <div><span style="font-size: 10.5px; color: #64748b;">Class Merit</span><div style="font-size: 16px; font-weight: 800; color: #6da534;">${res.classPosition}</div></div>
        </div>

        <!-- Remarks -->
        <div style="font-size: 11.5px; line-height: 1.5; margin-bottom: 24px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          <p><strong>Class Teacher Remarks:</strong> ${res.classTeacherRemarks}</p>
          <p style="margin-top: 4px;"><strong>Principal's Assessment:</strong> ${res.principalRemarks}</p>
        </div>

        <!-- Signatures & Stamp -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="text-align: center; width: 140px;">
            <div style="border-top: 1px solid #0f172a; padding-top: 4px; font-size: 11px; font-weight: 600;">Class Teacher</div>
          </div>
          <div style="text-align: center;">
            <img src="${school.stampUrl}" style="height: 65px;">
            <div style="font-size: 9px; color: #64748b;">Institutional Seal</div>
          </div>
          <div style="text-align: center; width: 160px;">
            <div style="font-size: 12px; font-weight: 700; color: #1b2767;">${school.letterhead.principalName}</div>
            <div style="border-top: 1px solid #0f172a; padding-top: 4px; font-size: 11px; font-weight: 600;">Head of Institution</div>
          </div>
        </div>
      </div>
    `;

    window.TPS_APP.showGenericModal(`Detailed Marks Certificate — ${std.name}`, html, `
      <button class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.print()">Print Official DMC</button>
    `, 'modal-xl');
  },

  openMarksEntryModal() {
    window.TPS_APP.showToast('Examination marks entry sheet ready for Grade 9 Science!', 'info');
  },

  printDateSheet() {
    this.setTab('datesheet');
  }
};
