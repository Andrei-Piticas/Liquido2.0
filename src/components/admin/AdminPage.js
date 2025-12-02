// Admin page component
import { NavBar } from '../common/NavBar.js';
import { formatDateTime } from '../../utils/formatting.js';

export class AdminPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const pendingUsers = this.app.dataManager.getPendingUsers();
    const allUsers = this.app.dataManager.getAllUsers();
    const recentEntries = this.app.drinkManager.getEntries()
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20);

    return `
      ${new NavBar(this.app).render()}
      <div class="container">
        <div class="admin-page">
          <h1>⚙️ Admin Dashboard</h1>

          <div class="admin-section">
            <h2>Pending Approvals (${pendingUsers.length})</h2>
            ${pendingUsers.length === 0 ? '<p class="empty-state">No pending users</p>' : `
              <div class="pending-users-list">
                ${pendingUsers.map(user => this.renderPendingUser(user)).join('')}
              </div>
            `}
          </div>

          <div class="admin-section">
            <h2>All Users (${allUsers.length})</h2>
            <div class="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Drinks</th>
                    <th>Paid</th>
                    <th>Admin</th>
                  </tr>
                </thead>
                <tbody>
                  ${allUsers.map(user => this.renderUserRow(user)).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="admin-section">
            <h2>Recent Entries</h2>
            <div class="entries-table">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Consumers</th>
                    <th>Payers</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentEntries.map(entry => this.renderEntryRow(entry)).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderPendingUser(user) {
    return `
      <div class="pending-user-card">
        ${user.profilePicture ? `<img src="${user.profilePicture}" class="user-avatar" alt="${user.username}">` : '<div class="user-avatar-placeholder">👤</div>'}
        <div class="user-info">
          <div class="user-name">${user.username}</div>
          <div class="user-email">${user.email}</div>
          <div class="user-date">Registered: ${formatDateTime(user.createdAt)}</div>
        </div>
        <div class="user-actions">
          <button class="btn btn-success btn-sm" onclick="window.app.approveUser('${user.id}')">Approve</button>
          <button class="btn btn-danger btn-sm" onclick="window.app.rejectUser('${user.id}')">Reject</button>
        </div>
      </div>
    `;
  }

  renderUserRow(user) {
    const stats = this.app.dataManager.getUserStats(user.id);
    return `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td><span class="status-badge status-${user.status}">${user.status}</span></td>
        <td>${stats.totalDrinks.total}</td>
        <td>${stats.totalPaid.total}</td>
        <td>${user.isAdmin ? '✅' : '❌'}</td>
      </tr>
    `;
  }

  renderEntryRow(entry) {
    const consumers = entry.consumers.map(id => {
      const user = this.app.dataManager.getUser(id);
      return user ? user.username : 'Unknown';
    }).join(', ');

    const payers = entry.payers.map(p => {
      const user = this.app.dataManager.getUser(p.userId);
      return user ? user.username : 'Unknown';
    }).join(', ');

    return `
      <tr>
        <td>${formatDateTime(entry.timestamp)}</td>
        <td>${entry.drinkType}</td>
        <td>${entry.quantity}</td>
        <td>${consumers}</td>
        <td>${payers}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="window.app.deleteEntry('${entry.id}')">Delete</button>
        </td>
      </tr>
    `;
  }

  mount() {
    // Mount navbar
    const navBar = new (require('../common/NavBar.js').NavBar)(this.app);
    if (navBar.mount) {
      navBar.mount();
    }

    window.app.approveUser = (userId) => {
      const result = this.app.authManager.approveUser(userId);
      if (result.success) {
        this.app.notificationManager.success('Utente approvato!');
        this.app.router.handleRoute();
      } else {
        this.app.notificationManager.error(result.error);
      }
    };

    window.app.rejectUser = (userId) => {
      if (confirm('Sei sicuro di voler rifiutare questo utente?')) {
        const result = this.app.authManager.rejectUser(userId);
        if (result.success) {
          this.app.notificationManager.success('Utente rifiutato');
          this.app.router.handleRoute();
        } else {
          this.app.notificationManager.error(result.error);
        }
      }
    };

    window.app.deleteEntry = (entryId) => {
      if (confirm('Sei sicuro di voler eliminare questa bevuta? Le statistiche verranno ricalcolate.')) {
        const result = this.app.drinkManager.deleteEntry(entryId);
        if (result.success) {
          this.app.notificationManager.success('Bevuta eliminata');
          this.app.router.handleRoute();
        } else {
          this.app.notificationManager.error(result.error);
        }
      }
    };
  }
}
