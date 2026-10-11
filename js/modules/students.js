/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Student Management Module
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_STUDENTS = {
  selectedClass: 'All',
  searchQuery: '',

  render() {
    const data = window.TPS_STATE.data;
    let students = data.students || [];

    if (this.selectedClass !== 'All') {
      students = students.filter(s => s.class === this.selectedClass);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      students = students.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.admissionNo.toLowerCase().includes(q) ||
        s.fatherName.toLowerCase().includes(q) ||
        s.bForm.toLowerCase().includes(q)
      );
    }

    const classes = data.classes || [];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Student Information Management</h2>
          <p>Complete directory of enrolled students at <span class="dynamic-school-name">${window.TPS_STATE.data.settings.name}</span></p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_STUDENTS.exportCSV()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export to Excel/CSV
          </button>
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_STUDENTS.printDirectory()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print Directory
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_STUDENTS.openAddModal()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Enroll New Student
          </button>
        </div>
      </div>

      <!-- Filter & Search Toolbar -->
      <div class="card" style="margin-bottom: 20px;">
        <div class="filter-bar">
          <div class="filter-item">
            <label>Filter by Class:</label>
            <select onchange="window.TPS_MODULE_STUDENTS.filterClass(this.value)">
              <option value="All" ${this.selectedClass === 'All' ? 'selected' : ''}>All Classes</option>
              ${classes.map(c => `<option value="${c.name}" ${this.selectedClass === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="filter-item" style="flex: 1; max-width: 380px;">
            <input type="text" placeholder="Search by Student Name, B-Form, Admission No, Father..." 
                   value="${this.searchQuery}" 
                   oninput="window.TPS_MODULE_STUDENTS.search(this.value)"
                   class="form-control" style="padding: 6px 12px; font-size: 12.5px;">
          </div>
          <span style="font-size: 12.5px; color: var(--text-muted); margin-left: auto;">
            Showing <strong>${students.length}</strong> student profile(s)
          </span>
        </div>
      </div>

      <!-- Student Directory Table -->
      <div class="card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Admission / Roll</th>
                <th>B-Form ID</th>
                <th>Father / Guardian</th>
                <th>Class & Section</th>
                <th>Attendance</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${students.length === 0 ? `
                <tr><td colspan="8" style="text-align: center; padding: 30px; color: var(--text-muted);">No student records found matching filter.</td></tr>
              ` : students.map(s => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${s.photo || 'assets/logo.png'}" alt="${s.name}" style="width: 40px; height: 40px; border-radius: var(--radius-full); object-fit: cover; border: 1px solid var(--border-color);">
                      <div>
                        <div style="font-weight: 600; color: var(--text-main); font-size: 13.5px;">${s.name}</div>
                        <span style="font-size: 11px; color: var(--text-muted);">${s.gender} • Blood: ${s.bloodGroup || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style="font-weight: 600; font-size: 12.5px;">${s.admissionNo}</div>
                    <span style="font-size: 11px; color: var(--text-muted);">Roll #${s.rollNo}</span>
                  </td>
                  <td style="font-family: monospace; font-size: 12px; color: #475569;">${s.bForm}</td>
                  <td>
                    <div style="font-weight: 500;">${s.fatherName}</div>
                    <span style="font-size: 11px; color: var(--text-muted);">${s.guardianContact}</span>
                  </td>
                  <td>
                    <span class="badge badge-primary">${s.class}</span>
                    <span style="font-size: 11.5px; color: var(--text-muted); margin-left: 4px;">${s.section}</span>
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <span style="font-weight: 700; font-size: 12.5px; color: ${s.attendancePercent >= 90 ? 'var(--success)' : 'var(--warning)'};">${s.attendancePercent}%</span>
                    </div>
                  </td>
                  <td>
                    <span class="badge ${s.status === 'Active' ? 'badge-success' : 'badge-secondary'}">${s.status}</span>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 6px;">
                      <button class="btn btn-sm btn-secondary" title="View 360 Profile" onclick="window.TPS_MODULE_STUDENTS.viewProfile('${s.id}')">
                        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View
                      </button>
                      <button class="btn btn-sm btn-gold" title="Generate ID Card" onclick="window.TPS_MODULE_STUDENTS.openIdCard('${s.id}')">
                        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="13" y2="12"></line></svg>
                        ID Card
                      </button>
                      <button class="btn btn-sm btn-secondary" title="Edit Student" onclick="window.TPS_MODULE_STUDENTS.openEditModal('${s.id}')">
                        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  filterClass(cls) {
    this.selectedClass = cls;
    window.TPS_APP.refresh();
  },

  search(q) {
    this.searchQuery = q;
    window.TPS_APP.refresh();
  },

  viewProfile(id) {
    const s = window.TPS_STATE.data.students.find(item => item.id === id);
    if (!s) return;

    // Sibling search
    const siblings = (s.siblingIds || []).map(sid => window.TPS_STATE.data.students.find(x => x.id === sid)).filter(Boolean);

    const bodyHtml = `
      <div style="display: flex; gap: 20px; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 20px;">
        <img src="${s.photo || 'assets/logo.png'}" style="width: 80px; height: 80px; border-radius: var(--radius-lg); object-fit: cover; border: 2px solid var(--secondary);">
        <div>
          <h3 style="font-size: 20px; color: var(--text-main); font-weight: 700;">${s.name}</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
            Admission: <strong>${s.admissionNo}</strong> | Roll No: <strong>${s.rollNo}</strong> | Session: <strong>${s.session}</strong>
          </p>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <span class="badge badge-primary">${s.class} - ${s.section}</span>
            <span class="badge badge-success">${s.status}</span>
            <span class="badge badge-gold">Attendance: ${s.attendancePercent}%</span>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px;">
        <div style="padding: 12px; background: var(--bg-card-muted); border-radius: 8px;">
          <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: var(--primary);">Personal & Guardian Information</h4>
          <p><strong>B-Form / ID:</strong> ${s.bForm}</p>
          <p><strong>Date of Birth:</strong> ${s.dob} (${s.gender})</p>
          <p><strong>Father Name:</strong> ${s.fatherName}</p>
          <p><strong>Mother Name:</strong> ${s.motherName}</p>
          <p><strong>Guardian Phone:</strong> ${s.guardianContact}</p>
          <p><strong>Emergency Contact:</strong> ${s.emergencyContact}</p>
          <p><strong>Home Address:</strong> ${s.address}</p>
        </div>

        <div style="padding: 12px; background: var(--bg-card-muted); border-radius: 8px;">
          <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: var(--primary);">Academic & Medical Profile</h4>
          <p><strong>Admission Date:</strong> ${s.admissionDate}</p>
          <p><strong>Previous Institution:</strong> ${s.previousSchool}</p>
          <p><strong>Blood Group:</strong> ${s.bloodGroup || 'N/A'}</p>
          <p><strong>Medical Notes:</strong> ${s.medicalInfo}</p>
          <p><strong>Family / Siblings Linked:</strong> ${siblings.length ? siblings.map(sb => `${sb.name} (${sb.class})`).join(', ') : 'None'}</p>
        </div>
      </div>
    `;

    window.TPS_APP.showGenericModal(`Student 360° Profile — ${s.name}`, bodyHtml, `
      <button class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Close</button>
      <button class="btn btn-gold" onclick="window.TPS_MODULE_STUDENTS.openIdCard('${s.id}')">Generate ID Card</button>
      <button class="btn btn-primary" onclick="window.TPS_MODULE_STUDENTS.generateCertificate('${s.id}')">Generate Certificate</button>
    `, 'modal-lg');
  },

  openIdCard(id) {
    const s = window.TPS_STATE.data.students.find(item => item.id === id);
    if (!s) return;
    const school = window.TPS_STATE.data.settings;

    const qrData = `STUDENT_ID:${s.id}|ADM:${s.admissionNo}|NAME:${s.name}|CLASS:${s.class}|SEC:${s.section}|EMG:${s.emergencyContact}|TPS_SKP`;

    const bodyHtml = `
      <div style="text-align: center; margin-bottom: 16px;">
        <p style="font-size: 13px; color: var(--text-muted);">Standard ISO CR-80 High Definition Printable Student ID Card</p>
      </div>

      <div style="display: flex; justify-content: center;">
        <div id="printable-id-card" style="width: 360px; border-radius: 12px; overflow: hidden; border: 2px solid ${school.primaryColor || '#1b2767'}; background: #fff; box-shadow: var(--shadow-lg);">
          <!-- ID Header -->
          <div style="background: linear-gradient(135deg, ${school.primaryColor || '#1b2767'} 0%, #061f16 100%); padding: 12px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 2px solid ${school.secondaryColor || '#6da534'};">
            <img src="${school.logoUrl || 'assets/logo.png'}" style="width: 44px; height: 44px; border-radius: 6px; background: #fff; padding: 2px; object-fit: contain;">
            <div>
              <h4 style="color: #fff; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; margin: 0; line-height: 1.1;">${school.name}</h4>
              <span style="color: #fde68a; font-size: 10px; font-weight: 700; text-transform: uppercase;">${school.campus || school.tagline || 'CAMPUS'}</span>
            </div>
          </div>

          <!-- ID Body -->
          <div style="padding: 16px; display: flex; gap: 14px; align-items: center;">
            <img src="${s.photo || 'assets/logo.png'}" style="width: 90px; height: 110px; object-fit: cover; border-radius: 8px; border: 1.5px solid #cbd5e1;">
            <div style="flex: 1; font-size: 11.5px; line-height: 1.5;">
              <h3 style="font-size: 15px; font-weight: 700; color: #1b2767; margin-bottom: 4px;">${s.name}</h3>
              <p><strong>Roll No:</strong> ${s.rollNo} | <strong>Class:</strong> ${s.class} (${s.section})</p>
              <p><strong>Adm No:</strong> ${s.admissionNo}</p>
              <p><strong>Father:</strong> ${s.fatherName}</p>
              <p><strong>Emergency:</strong> ${s.emergencyContact}</p>
              <p><strong>Blood:</strong> ${s.bloodGroup || 'O+'}</p>
            </div>
          </div>

          <!-- ID Footer & Dynamic QR Code -->
          <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;">
            <div style="font-size: 9.5px; color: #64748b;">
              <div>Valid for Session: <strong>${s.session}</strong></div>
              <div>Official Verification Barcode</div>
            </div>
            <div style="text-align: right;">
              <canvas id="idcard-qr-canvas" width="60" height="60" style="border: 1px solid #e2e8f0; background: #fff; border-radius: 4px;"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    window.TPS_APP.showGenericModal(`Student Smart ID Card — ${s.name}`, bodyHtml, `
      <button class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.TPS_MODULE_STUDENTS.printIdCard()">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Print ID Card
      </button>
    `, 'modal-md');

    // Draw Simulated Clean Matrix QR Code onto the canvas
    setTimeout(() => {
      this.drawCleanQr(document.getElementById('idcard-qr-canvas'), qrData);
    }, 50);
  },

  drawCleanQr(canvas, dataString) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Simple deterministic pseudo-QR pattern for high-fidelity scanning aesthetics
    const cells = 15;
    const cellSize = size / cells;
    ctx.fillStyle = '#1b2767';

    // 3 Corner Finder Patterns
    const drawFinder = (startX, startY) => {
      ctx.fillRect(startX * cellSize, startY * cellSize, 4 * cellSize, 4 * cellSize);
      ctx.clearRect((startX + 0.8) * cellSize, (startY + 0.8) * cellSize, 2.4 * cellSize, 2.4 * cellSize);
      ctx.fillRect((startX + 1.3) * cellSize, (startY + 1.3) * cellSize, 1.4 * cellSize, 1.4 * cellSize);
    };

    drawFinder(1, 1);
    drawFinder(10, 1);
    drawFinder(1, 10);

    // Data dots based on hash of string
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        if ((r < 6 && c < 6) || (r < 6 && c > 8) || (r > 8 && c < 6)) continue;
        const charCode = dataString.charCodeAt((r * cells + c) % dataString.length);
        if ((charCode * (r + 1) * (c + 1)) % 3 === 0) {
          ctx.fillRect(c * cellSize + 0.5, r * cellSize + 0.5, cellSize - 1, cellSize - 1);
        }
      }
    }
  },

  printIdCard() {
    window.print();
  },

  openAddModal() {
    const classes = window.TPS_STATE.data.classes || [];
    const html = `
      <form id="form-add-student" onsubmit="window.TPS_MODULE_STUDENTS.saveStudent(event)">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" name="name" class="form-control" required placeholder="e.g. Danial Ahmad">
          </div>
          <div class="form-group">
            <label class="form-label">Gender *</label>
            <select name="gender" class="form-control" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Date of Birth *</label>
            <input type="date" name="dob" class="form-control" required value="2012-01-01">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">B-Form / ID Number *</label>
            <input type="text" name="bForm" class="form-control" required placeholder="35401-XXXXXXX-X">
          </div>
          <div class="form-group">
            <label class="form-label">Class *</label>
            <select name="class" class="form-control" required>
              ${classes.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Section *</label>
            <input type="text" name="section" class="form-control" required value="Pine A">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Father Name *</label>
            <input type="text" name="fatherName" class="form-control" required placeholder="Father / Guardian full name">
          </div>
          <div class="form-group">
            <label class="form-label">Guardian Contact Number *</label>
            <input type="text" name="guardianContact" class="form-control" required placeholder="0300-XXXXXXX">
          </div>
          <div class="form-group">
            <label class="form-label">Emergency Phone</label>
            <input type="text" name="emergencyContact" class="form-control" placeholder="0321-XXXXXXX">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Home Address (Sheikhupura) *</label>
          <input type="text" name="address" class="form-control" required placeholder="House #, Street, Colony, Sheikhupura">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Previous School Attended</label>
            <input type="text" name="previousSchool" class="form-control" placeholder="e.g. Army Public School SKP">
          </div>
          <div class="form-group">
            <label class="form-label">Medical / Allergy Notes</label>
            <input type="text" name="medicalInfo" class="form-control" placeholder="e.g. Normal health, allergic to dust">
          </div>
        </div>

        <div class="modal-footer" style="padding-right: 0; padding-left: 0; margin-top: 15px;">
          <button type="button" class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Enroll & Generate Roll No</button>
        </div>
      </form>
    `;
    window.TPS_APP.showGenericModal(`Enroll New Student — ${window.TPS_STATE.data.settings.name}`, html, '', 'modal-lg');
  },

  saveStudent(e) {
    e.preventDefault();
    const form = e.target;
    const count = (window.TPS_STATE.data.students || []).length + 1;
    const newStudent = {
      id: 'STD-' + (1000 + count),
      admissionNo: `TPS/2026/0${140 + count}`,
      rollNo: String(count).padStart(2, '0'),
      name: form.name.value,
      gender: form.gender.value,
      dob: form.dob.value,
      bForm: form.bForm.value,
      fatherName: form.fatherName.value,
      motherName: 'Mother',
      guardianContact: form.guardianContact.value,
      emergencyContact: form.emergencyContact.value || form.guardianContact.value,
      address: form.address.value,
      class: form.class.value,
      section: form.section.value,
      session: window.TPS_STATE.data.settings.activeSession,
      admissionDate: new Date().toISOString().split('T')[0],
      previousSchool: form.previousSchool.value || 'None',
      medicalInfo: form.medicalInfo.value || 'None',
      bloodGroup: 'B+',
      status: 'Active',
      siblingIds: [],
      attendancePercent: 100.0,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    window.TPS_STATE.data.students.push(newStudent);
    window.TPS_STATE.logAction('Student Enrolled', `Enrolled new student: ${newStudent.name} (${newStudent.admissionNo}) in ${newStudent.class}`);
    window.TPS_STATE.save();
    window.TPS_APP.closeModal();
    window.TPS_APP.showToast(`Student ${newStudent.name} successfully enrolled!`, 'success');
  },

  openEditModal(id) {
    const s = window.TPS_STATE.data.students.find(item => item.id === id);
    if (!s) return;
    const classes = window.TPS_STATE.data.classes || [];

    const html = `
      <form id="form-edit-student" onsubmit="window.TPS_MODULE_STUDENTS.updateStudent(event, '${s.id}')">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" name="name" class="form-control" required value="${s.name}">
          </div>
          <div class="form-group">
            <label class="form-label">Roll Number</label>
            <input type="text" name="rollNo" class="form-control" required value="${s.rollNo}">
          </div>
          <div class="form-group">
            <label class="form-label">Class</label>
            <select name="class" class="form-control">
              ${classes.map(c => `<option value="${c.name}" ${s.class === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Section</label>
            <input type="text" name="section" class="form-control" required value="${s.section}">
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select name="status" class="form-control">
              <option value="Active" ${s.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${s.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
              <option value="Graduated" ${s.status === 'Graduated' ? 'selected' : ''}>Graduated</option>
              <option value="Left School" ${s.status === 'Left School' ? 'selected' : ''}>Left School</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Guardian Contact</label>
            <input type="text" name="guardianContact" class="form-control" required value="${s.guardianContact}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Address</label>
          <input type="text" name="address" class="form-control" required value="${s.address}">
        </div>
        <div class="modal-footer" style="padding-right: 0; padding-left: 0; margin-top: 15px;">
          <button type="button" class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>
      </form>
    `;
    window.TPS_APP.showGenericModal(`Edit Student — ${s.name}`, html, '', 'modal-lg');
  },

  updateStudent(e, id) {
    e.preventDefault();
    const s = window.TPS_STATE.data.students.find(item => item.id === id);
    if (!s) return;
    const form = e.target;
    s.name = form.name.value;
    s.rollNo = form.rollNo.value;
    s.class = form.class.value;
    s.section = form.section.value;
    s.status = form.status.value;
    s.guardianContact = form.guardianContact.value;
    s.address = form.address.value;

    window.TPS_STATE.logAction('Student Updated', `Updated profile of ${s.name} (${s.admissionNo})`);
    window.TPS_STATE.save();
    window.TPS_APP.closeModal();
    window.TPS_APP.showToast('Student profile updated successfully!', 'success');
  },

  exportCSV() {
    const students = window.TPS_STATE.data.students || [];
    let csv = 'Admission No,Roll No,Full Name,Gender,B-Form,Father Name,Class,Section,Contact,Status\n';
    students.forEach(s => {
      csv += `"${s.admissionNo}","${s.rollNo}","${s.name}","${s.gender}","${s.bForm}","${s.fatherName}","${s.class}","${s.section}","${s.guardianContact}","${s.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tall_Pines_Students_${Date.now()}.csv`;
    a.click();
    window.TPS_APP.showToast('Student list exported to CSV successfully!', 'info');
  },

  printDirectory() {
    window.print();
  },

  generateCertificate(id) {
    window.TPS_APP.closeModal();
    window.TPS_APP.navigate('certificates');
  }
};
