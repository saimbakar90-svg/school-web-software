/**
 * TALL PINES SCHOOL — SHEIKHUPURA
 * Library & Inventory Management Module
 * Developer Credit Watermark: Design by Saima Mushtaq (saimbakar90@gmail.com)
 */

window.TPS_MODULE_LIB_INV = {
  activeTab: 'library', // 'library', 'inventory'

  render() {
    const data = window.TPS_STATE.data;
    const books = data.library || [];
    const inventory = data.inventory || [];

    return `
      <div class="page-header-actions">
        <div class="page-title-group">
          <h2>Library & Institutional Assets</h2>
          <p>Book lending tracking, barcode/ISBN catalog & campus hardware inventory</p>
        </div>
        <div class="action-btns-group">
          <button class="btn btn-secondary" onclick="window.TPS_MODULE_LIB_INV.openIssueBookModal()">
            Issue Library Book
          </button>
          <button class="btn btn-primary" onclick="window.TPS_MODULE_LIB_INV.openAddBookModal()">
            Add New Title
          </button>
        </div>
      </div>

      <div class="card">
        <div class="tab-nav">
          <button class="tab-btn ${this.activeTab === 'library' ? 'active' : ''}" onclick="window.TPS_MODULE_LIB_INV.setTab('library')">Library Catalog & Lending</button>
          <button class="tab-btn ${this.activeTab === 'inventory' ? 'active' : ''}" onclick="window.TPS_MODULE_LIB_INV.setTab('inventory')">Campus Assets & Inventory</button>
        </div>

        <div class="card-body" style="padding: 0;">
          ${this.activeTab === 'library' ? this.renderLibrary(books) : this.renderInventory(inventory)}
        </div>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    window.TPS_APP.refresh();
  },

  renderLibrary(books) {
    return `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>ISBN / Code</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Shelf Location</th>
              <th>Available Copies</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${books.map(b => `
              <tr>
                <td style="font-family: monospace; font-weight: 700;">${b.isbn}</td>
                <td><strong>${b.title}</strong></td>
                <td>${b.author}</td>
                <td><span class="badge badge-primary">${b.category}</span></td>
                <td>Rack ${b.rack}</td>
                <td><strong>${b.available}</strong> / ${b.copies} Available</td>
                <td style="text-align: right;">
                  <button class="btn btn-sm btn-secondary" onclick="window.TPS_APP.showToast('Book issue slip created', 'success')">Issue</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderInventory(inventory) {
    return `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Cost (PKR)</th>
              <th>Location</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            ${inventory.map(inv => `
              <tr>
                <td style="font-family: monospace; font-weight: 700; color: var(--primary);">${inv.id}</td>
                <td><strong>${inv.name}</strong></td>
                <td><span class="badge badge-secondary">${inv.category}</span></td>
                <td><strong>${inv.qty}</strong> Units</td>
                <td>PKR ${inv.unitCost.toLocaleString()}</td>
                <td>${inv.location}</td>
                <td><span class="badge badge-success">${inv.condition}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  openAddBookModal() {
    window.TPS_APP.showToast('Library catalog form opened', 'info');
  },

  openIssueBookModal() {
    window.TPS_APP.showToast('Book issuance scanner ready', 'info');
  }
};
