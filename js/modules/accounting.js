/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Accounting & Expense Management Module
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_ACCOUNTING = {
  render() {
    const data = window.TPS_STATE.data;
    const expenses = data.expenses || [];
    const feeIncome = (data.feeVouchers || []).filter(v => v.status === 'Paid').reduce((s, v) => s + v.netPayable, 0);
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const netSurplus = feeIncome - totalExpenses;

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>School Financials & Expense Management</h2>
          <p>Institutional operational expenditures, vouchers & cash flow reconciliation</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-primary" onclick="window.TPS_MODULE_ACCOUNTING.openNewExpenseModal()">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Record Expense Voucher
          </button>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap success">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Fee Inflow (Revenue)</div>
            <div class="stat-value">PKR ${feeIncome.toLocaleString()}</div>
            <div class="stat-trend positive"><span>October Month</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap danger">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Total Expenditures</div>
            <div class="stat-value">PKR ${totalExpenses.toLocaleString()}</div>
            <div class="stat-trend negative"><span>Approved Vouchers</span></div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrap primary">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
          <div class="stat-info">
            <div class="stat-label">Net Operating Balance</div>
            <div class="stat-value">PKR ${netSurplus.toLocaleString()}</div>
            <div class="stat-trend positive"><span>Campus Surplus</span></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            Recent Expense Vouchers & Invoices
          </h3>
          <span class="badge badge-primary">${expenses.length} Records</span>
        </div>
        <div class="card-body" style="padding: 0;">
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Voucher ID</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Paid To / Vendor</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${expenses.map(e => `
                  <tr>
                    <td style="font-family: monospace; font-weight: 700; color: var(--primary);">${e.id}</td>
                    <td>${e.date}</td>
                    <td><span class="badge badge-secondary">${e.category}</span></td>
                    <td style="max-width: 250px;">${e.description}</td>
                    <td>${e.paidTo}</td>
                    <td><strong style="color: var(--danger);">PKR ${e.amount.toLocaleString()}</strong></td>
                    <td><span class="badge badge-success">${e.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  openNewExpenseModal() {
    const html = `
      <form onsubmit="window.TPS_MODULE_ACCOUNTING.saveExpense(event)">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Expense Category *</label>
            <select name="category" class="form-control" required>
              <option value="Utility Bills">Utility Bills (Electricity / Gas / Water)</option>
              <option value="Stationery & Printing">Stationery & Examination Printing</option>
              <option value="Maintenance & Upkeep">Campus Maintenance & Repairs</option>
              <option value="Sports & Activities">Sports & Co-curricular Activities</option>
              <option value="Lab & IT Expenses">Computer Lab & Science Lab Consumables</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Amount (PKR) *</label>
            <input type="number" name="amount" class="form-control" required placeholder="e.g. 25000">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Vendor / Paid To *</label>
          <input type="text" name="paidTo" class="form-control" required placeholder="Vendor or Payee Name">
        </div>

        <div class="form-group">
          <label class="form-label">Expense Description / Notes *</label>
          <input type="text" name="description" class="form-control" required placeholder="Purpose of payment">
        </div>

        <div class="modal-footer" style="padding-right: 0; padding-left: 0; margin-top: 15px;">
          <button type="button" class="btn btn-secondary" onclick="window.TPS_APP.closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Authorize & Record Voucher</button>
        </div>
      </form>
    `;
    window.TPS_APP.showGenericModal('Record Expense Voucher', html, '', 'modal-md');
  },

  saveExpense(e) {
    e.preventDefault();
    const form = e.target;
    const count = (window.TPS_STATE.data.expenses || []).length + 1;
    const newExp = {
      id: `EXP-10${count}`,
      date: new Date().toISOString().split('T')[0],
      category: form.category.value,
      amount: parseInt(form.amount.value, 10),
      paidTo: form.paidTo.value,
      description: form.description.value,
      status: 'Approved'
    };

    window.TPS_STATE.data.expenses.unshift(newExp);
    window.TPS_STATE.logAction('Expense Recorded', `Recorded expenditure of PKR ${newExp.amount} for ${newExp.category}`);
    window.TPS_STATE.save();
    window.TPS_APP.closeModal();
    window.TPS_APP.showToast(`Expense voucher ${newExp.id} recorded successfully!`, 'success');
  }
};
