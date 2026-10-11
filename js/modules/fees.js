/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Fee Management Module (Pakistani School 3-Copy Challans, Defaulters & Reconciliation)
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_FEES = {
  activeTab: 'vouchers', // 'vouchers', 'defaulters', 'structure', 'reconciliation'

  render() {
    const data = window.TPS_STATE.data;
    const vouchers = data.feeVouchers || [];
    const collected = vouchers.filter(v => v.status === 'Paid').reduce((sum, v) => sum + v.netPayable, 0);
    const pending = vouchers.filter(v => v.status !== 'Paid').reduce((sum, v) => sum + v.netPayable, 0);
    const defaulters = vouchers.filter(v => v.status === 'Defaulter');

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Fee Billing & Accounts Management</h2>
          <p>Fee structures, 3-copy bank challans, payments & defaulters recovery</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_FEES.exportLedger()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Fee Ledger
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_FEES.openGenerateChallanModal()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Generate Monthly Challans
          </button>
        </div>
      </div>

      <!-- Financial KPI Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap success">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Total Realized Collection</div>
            <div class="stat-value">PKR ${collected.toLocaleString()}</div>
            <div class="stat-trend positive"><span>${vouchers.filter(v => v.status === 'Paid').length} Paid Vouchers</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap warning">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Pending Dues (October)</div>
            <div class="stat-value">PKR ${pending.toLocaleString()}</div>
            <div class="stat-trend negative"><span>Due by 15th October</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap danger">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Defaulter Accounts</div>
            <div class="stat-value">${defaulters.length}</div>
            <div class="stat-trend negative"><span>Arrears Overdue</span></div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'vouchers' ? 'active' : ''}" onclick="window.TPS_MODULE_FEES.setTab('vouchers')">Active Fee Vouchers</button>
          <button class="tab-btn ${this.activeTab === 'defaulters' ? 'active' : ''}" onclick="window.TPS_MODULE_FEES.setTab('defaulters')">Fee Defaulters & Arrears (${defaulters.length})</button>
          <button class="tab-btn ${this.activeTab === 'structure' ? 'active' : ''}" onclick="window.TPS_MODULE_FEES.setTab('structure')">Tuition & Fee Structure</button>
        </div>

        <div class="card-body" style="padding: 0;">
          ${this.activeTab === 'vouchers' ? this.renderVouchersTable(vouchers) : ''}
          ${this.activeTab === 'defaulters' ? this.renderDefaultersTable(defaulters) : ''}
          ${this.activeTab === 'structure' ? this.renderStructure() : ''}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderVouchersTable(vouchers) {
    return `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Challan No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Billing Month</th>
              <th>Tuition Fee</th>
              <th>Discounts / Arrears</th>
              <th>Net Payable</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${vouchers.map(v => `
              <tr>
                <td style="font-family: monospace; font-weight: 700; color: var(--primary);">${v.challanNo}</td>
                <td>
                  <strong>${v.studentName}</strong>
                  <div style="font-size: 11px; color: var(--text-muted);">${v.studentId}</div>
                </td>
                <td><span class="badge badge-primary">${v.class}</span></td>
                <td>${v.month}</td>
                <td>PKR ${v.tuitionFee.toLocaleString()}</td>
                <td style="font-size: 12px;">
                  ${v.discountSibling ? `<span style="color: var(--success);">-PKR ${v.discountSibling} (Sibling)</span><br>` : ''}
                  ${v.arrears ? `<span style="color: var(--danger);">+PKR ${v.arrears} (Arrears)</span>` : '<span style="color: var(--text-muted);">No Arrears</span>'}
                </td>
                <td><strong style="color: var(--text-main); font-size: 14px;">PKR ${v.netPayable.toLocaleString()}</strong></td>
                <td style="font-size: 12.5px;">${v.dueDate}</td>
                <td>
                  <span class="badge ${v.status === 'Paid' ? 'badge-success' : (v.status === 'Defaulter' ? 'badge-danger' : 'badge-warning')}">${v.status}</span>
                </td>
                <td style="text-align: right;">
                  <div style="display: inline-flex; gap: 6px;">
                    <button class="btn btn-sm btn-gold" title="Print 3-Copy Bank Challan" onclick="window.TPS_MODULE_FEES.printChallan('${v.challanNo}')">
                      <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                      Challan
                    </button>
                    ${v.status !== 'Paid' ? `
                      <button class="btn btn-sm btn-success" title="Collect Payment" onclick="window.TPS_MODULE_FEES.openCollectModal('${v.challanNo}')">
                        Pay
                      </button>
                    ` : `
                      <button class="btn btn-sm btn-secondary" title="View Receipt" onclick="window.TPS_MODULE_FEES.printReceipt('${v.challanNo}')">
                        Receipt
                      </button>
                    `}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderDefaultersTable(defaulters) {
    return `
      <div style="padding: 16px 20px; background: #fff5f5; border-bottom: 1px solid #fed7d7; display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 13px; color: #9b2c2c; font-weight: 600;">
          ⚠️ <strong>${defaulters.length} student(s)</strong> have overdue fee vouchers. Automated SMS reminders can be dispatched immediately.
        </span>
        <button class="btn btn-sm btn-danger" onclick="window.TPS_MODULE_FEES.sendBulkDefaulterSMS()">
          Send Bulk WhatsApp / SMS Notices
        </button>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Challan No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Overdue Arrears</th>
              <th>Total Net Due</th>
              <th>Guardian Contact</th>
              <th style="text-align: right;">Recovery Action</th>
            </tr>
          </thead>
          <tbody>
            ${defaulters.map(d => `
              <tr>
                <td style="font-family: monospace; font-weight: 700; color: var(--danger);">${d.challanNo}</td>
                <td><strong>${d.studentName}</strong></td>
                <td><span class="badge badge-primary">${d.class}</span></td>
                <td style="color: var(--danger); font-weight: 700;">PKR ${d.arrears.toLocaleString()}</td>
                <td style="font-size: 14px; font-weight: 700;">PKR ${d.netPayable.toLocaleString()}</td>
                <td>0322-8192033</td>
                <td style="text-align: right;">
                  <button class="btn btn-sm btn-secondary" onclick="window.TPS_MODULE_FEES.sendSingleReminder('${d.studentName}', '0322-8192033', '${d.netPayable}')">
                    Send WhatsApp Reminder
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderStructure() {
    return `
      <div style="padding: 24px;">
        <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 12px; color: var(--primary);">Standard Monthly Tuition & Approved Charges (Session 2026-27)</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
            <h5 style="font-weight: 700;">Playgroup & Nursery to Prep</h5>
            <div style="font-size: 20px; font-weight: 800; color: var(--primary); margin: 6px 0;">PKR 8,500 / mo</div>
            <p style="font-size: 12px; color: var(--text-muted);">Includes learning kit, activity charges and daycare access.</p>
          </div>
          <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
            <h5 style="font-weight: 700;">Primary School (Grade 1 to 5)</h5>
            <div style="font-size: 20px; font-weight: 800; color: var(--primary); margin: 6px 0;">PKR 9,500 / mo</div>
            <p style="font-size: 12px; color: var(--text-muted);">Includes robotics, computer lab, sports and library fees.</p>
          </div>
          <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
            <h5 style="font-weight: 700;">Middle School (Grade 6 to 8)</h5>
            <div style="font-size: 20px; font-weight: 800; color: var(--primary); margin: 6px 0;">PKR 11,000 / mo</div>
            <p style="font-size: 12px; color: var(--text-muted);">Science lab charges, arts and educational excursions.</p>
          </div>
          <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px;">
            <h5 style="font-weight: 700;">Secondary Matric / O-Levels (Grade 9 & 10)</h5>
            <div style="font-size: 20px; font-weight: 800; color: var(--primary); margin: 6px 0;">PKR 12,500 / mo</div>
            <p style="font-size: 12px; color: var(--text-muted);">Includes board registration prep, science practicals and tests.</p>
          </div>
        </div>
      </div>
    `;
  },

  printChallan(challanNo) {
    const v = window.TPS_STATE.data.feeVouchers.find(item => item.challanNo === challanNo);
    if (!v) return;
    const school = window.TPS_STATE.data.settings;

    const renderCopy = (copyTitle) => `
      <div class="challan-copy" style="border: 1.5px dashed #475569; padding: 12px; background: #fff; border-radius: 6px; font-size: 11px;">
        <div style="text-align: center; background: ${school.primaryColor || '#1b2767'}; color: #fff; padding: 3px; font-weight: 700; font-size: 10px; border-radius: 3px; margin-bottom: 8px; text-transform: uppercase;">
          ${copyTitle}
        </div>
        <div style="text-align: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; margin-bottom: 8px;">
          <img src="${school.logoUrl || 'assets/logo.png'}" style="width: 32px; height: 32px; margin: 0 auto; display: block; object-fit: contain;">
          <h4 style="font-size: 11px; font-weight: 800; color: ${school.primaryColor || '#1b2767'}; margin: 4px 0 1px;">${school.name}</h4>
          <span style="font-size: 9px; color: #64748b;">${school.campus || school.tagline || 'CAMPUS'}</span>
          <div style="font-size: 8.5px; color: #334155; margin-top: 3px;">Bank: Meezan Bank Ltd (SKP Branch) | A/C: 0102-01928374-01</div>
        </div>
        
        <table style="width: 100%; font-size: 10px; margin-bottom: 8px;">
          <tr><td><strong>Challan No:</strong></td><td style="font-family: monospace; font-weight: 700;">${v.challanNo}</td></tr>
          <tr><td><strong>Student:</strong></td><td>${v.studentName}</td></tr>
          <tr><td><strong>Class/Sec:</strong></td><td>${v.class} (${v.section})</td></tr>
          <tr><td><strong>Month:</strong></td><td>${v.month}</td></tr>
          <tr><td><strong>Due Date:</strong></td><td style="color: #b91c1c; font-weight: 700;">${v.dueDate}</td></tr>
        </table>

        <table style="width: 100%; border-collapse: collapse; font-size: 9.5px; margin-bottom: 8px;">
          <tr style="background: #f1f5f9;"><th style="border: 1px solid #cbd5e1; padding: 3px; text-align: left;">Particulars</th><th style="border: 1px solid #cbd5e1; padding: 3px; text-align: right;">Amount</th></tr>
          <tr><td style="border: 1px solid #cbd5e1; padding: 3px;">Tuition Fee</td><td style="border: 1px solid #cbd5e1; padding: 3px; text-align: right;">${v.tuitionFee}</td></tr>
          <tr><td style="border: 1px solid #cbd5e1; padding: 3px;">Science / Lab / Exam Fee</td><td style="border: 1px solid #cbd5e1; padding: 3px; text-align: right;">${v.labExamFee}</td></tr>
          ${v.discountSibling ? `<tr><td style="border: 1px solid #cbd5e1; padding: 3px; color: #15803d;">Sibling Discount</td><td style="border: 1px solid #cbd5e1; padding: 3px; text-align: right; color: #15803d;">-${v.discountSibling}</td></tr>` : ''}
          ${v.arrears ? `<tr><td style="border: 1px solid #cbd5e1; padding: 3px; color: #b91c1c;">Previous Arrears</td><td style="border: 1px solid #cbd5e1; padding: 3px; text-align: right; color: #b91c1c;">+${v.arrears}</td></tr>` : ''}
          <tr style="background: #e2e8f0; font-weight: 700;"><td style="border: 1px solid #cbd5e1; padding: 4px;">Net Payable:</td><td style="border: 1px solid #cbd5e1; padding: 4px; text-align: right;">PKR ${v.netPayable.toLocaleString()}</td></tr>
        </table>

        <div style="font-size: 8px; color: #64748b; line-height: 1.2;">
          * Late fee PKR 500 applies after due date.<br>
          * Non-transferable fee challan.
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 18px; font-size: 8px;">
          <span>Cashier Stamp: _______</span>
          <span>Authorized Sign: _______</span>
        </div>
      </div>
    `;

    const html = `
      <div style="text-align: center; margin-bottom: 12px;">
        <p style="font-size: 13px; color: var(--text-muted);">Pakistani Bank Standard 3-Copy Fee Voucher (Print Ready)</p>
      </div>

      <div class="fee-challan-3part" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
        ${renderCopy('Bank Copy')}
        ${renderCopy('School Accounts Copy')}
        ${renderCopy('Student / Parent Copy')}
      </div>
    `;

    window.TPS_APP.showGenericModal(`3-Copy Fee Voucher — ${v.challanNo}`, html, `
      <button class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.print()">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Print 3-Copy Voucher
      </button>
    `, 'modal-xl');
  },

  openCollectModal(challanNo) {
    const v = window.TPS_STATE.data.feeVouchers.find(item => item.challanNo === challanNo);
    if (!v) return;

    const html = `
      <form onsubmit="window.TPS_MODULE_FEES.confirmPayment(event, '${v.challanNo}')">
        <div style="padding: 12px; background: var(--bg-card-muted); border-radius: 8px; margin-bottom: 16px;">
          <h4 style="font-weight: 700; color: var(--primary);">${v.studentName} (${v.class} - ${v.section})</h4>
          <p style="font-size: 13px; color: var(--text-muted);">Challan: <strong>${v.challanNo}</strong> | Month: <strong>${v.month}</strong></p>
          <div style="font-size: 20px; font-weight: 800; color: var(--text-main); margin-top: 6px;">Total Payable: PKR ${v.netPayable.toLocaleString()}</div>
        </div>

        <div class="form-group">
          <label class="form-label">Payment Mode *</label>
          <select name="paymentMode" class="form-control" required>
            <option value="Cash (School Counter)">Cash (School Accounts Counter)</option>
            <option value="Bank Transfer (Meezan Bank)">Bank Transfer (Meezan Bank Ltd)</option>
            <option value="Online / Raast / EasyPaisa">Online / Raast / Mobile Banking</option>
            <option value="Cheque / Pay Order">Cheque / Pay Order</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Receipt / Transaction Reference Number</label>
          <input type="text" name="refNo" class="form-control" value="REC-SKP-${Math.floor(1000 + Math.random() * 9000)}">
        </div>

        <div class="modal-footer" style="padding-right: 0; padding-left: 0; margin-top: 15px;">
          <button type="button" class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-success">Record Payment & Generate Receipt</button>
        </div>
      </form>
    `;
    window.TPS_APP.showGenericModal(`Collect Fee Payment — ${v.challanNo}`, html, '', 'modal-md');
  },

  confirmPayment(e, challanNo) {
    e.preventDefault();
    const form = e.target;
    const v = window.TPS_STATE.data.feeVouchers.find(item => item.challanNo === challanNo);
    if (!v) return;

    v.status = 'Paid';
    v.paidDate = new Date().toISOString().split('T')[0];
    v.paymentMode = form.paymentMode.value;
    v.receiptNo = form.refNo.value;

    window.TPS_STATE.logAction('Fee Payment Received', `Received PKR ${v.netPayable} for ${v.studentName} via ${v.paymentMode}`);
    window.TPS_STATE.save();
    window.TPS_APP.closeModal();
    window.TPS_APP.showToast(`Payment of PKR ${v.netPayable.toLocaleString()} recorded successfully!`, 'success');
  },

  printReceipt(challanNo) {
    const v = window.TPS_STATE.data.feeVouchers.find(item => item.challanNo === challanNo);
    if (!v) return;
    const school = window.TPS_STATE.data.settings;

    const html = `
      <div style="border: 2px solid ${school.primaryColor || '#1b2767'}; padding: 24px; border-radius: 12px; background: #fff; max-width: 500px; margin: 0 auto; box-shadow: var(--shadow-md);">
        <div style="text-align: center; border-bottom: 2px solid ${school.primaryColor || '#1b2767'}; padding-bottom: 12px; margin-bottom: 16px;">
          <img src="${school.logoUrl || 'assets/logo.png'}" style="width: 48px; height: 48px; margin: 0 auto 6px; object-fit: contain;">
          <h3 style="color: ${school.primaryColor || '#1b2767'}; font-size: 16px; font-weight: 800; margin: 0;">${school.name} — ${school.campus || school.tagline || ''}</h3>
          <span style="font-size: 11px; color: #64748b;">OFFICIAL FEE PAYMENT RECEIPT</span>
        </div>

        <table style="width: 100%; font-size: 13px; line-height: 2;">
          <tr><td><strong>Receipt No:</strong></td><td style="font-family: monospace; font-weight: 700;">${v.receiptNo}</td></tr>
          <tr><td><strong>Challan No:</strong></td><td>${v.challanNo}</td></tr>
          <tr><td><strong>Student Name:</strong></td><td>${v.studentName}</td></tr>
          <tr><td><strong>Class / Section:</strong></td><td>${v.class} (${v.section})</td></tr>
          <tr><td><strong>Billing Month:</strong></td><td>${v.month}</td></tr>
          <tr><td><strong>Payment Mode:</strong></td><td>${v.paymentMode}</td></tr>
          <tr><td><strong>Payment Date:</strong></td><td>${v.paidDate}</td></tr>
          <tr style="border-top: 1px solid #e2e8f0;"><td style="font-size: 16px; font-weight: 800; color: #1b2767;">Amount Paid:</td><td style="font-size: 16px; font-weight: 800; color: #1b2767;">PKR ${v.netPayable.toLocaleString()}</td></tr>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
          <div style="text-align: center;">
            <img src="${school.stampUrl}" style="height: 55px; opacity: 0.85;">
            <div style="font-size: 10px; color: #64748b;">School Accounts Seal</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; font-weight: 600;">Malik Tanveer Ahmad</div>
            <div style="font-size: 10px; color: #64748b;">Bursar / Accounts Officer</div>
          </div>
        </div>
      </div>
    `;

    window.TPS_APP.showGenericModal(`Payment Receipt — ${v.receiptNo}`, html, `
      <button class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.print()">Print Official Receipt</button>
    `, 'modal-md');
  },

  sendBulkDefaulterSMS() {
    window.TPS_APP.showToast('Automated SMS & WhatsApp reminders dispatched to all defaulters!', 'success');
  },

  sendSingleReminder(name, phone, amount) {
    window.TPS_APP.showToast(`Reminder sent to ${name}'s guardian (${phone}) for PKR ${amount}!`, 'info');
  },

  openGenerateChallanModal() {
    window.TPS_APP.showToast('Generated fee challans for all enrolled students for Session 2026-27!', 'success');
  },

  exportLedger() {
    const vouchers = window.TPS_STATE.data.feeVouchers || [];
    let csv = 'Challan No,Student ID,Student Name,Class,Month,Tuition Fee,Net Payable,Status,Paid Date\n';
    vouchers.forEach(v => {
      csv += `"${v.challanNo}","${v.studentId}","${v.studentName}","${v.class}","${v.month}","${v.tuitionFee}","${v.netPayable}","${v.status}","${v.paidDate || ''}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tall_Pines_Fee_Ledger_${Date.now()}.csv`;
    a.click();
    window.TPS_APP.showToast('Fee Ledger exported to CSV!', 'info');
  }
};
