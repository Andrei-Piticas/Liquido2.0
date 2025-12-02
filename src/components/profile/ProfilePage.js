// Profile page component
import { NavBar } from '../common/NavBar.js';
import { formatDate, getRarityColor } from '../../utils/formatting.js';

export class ProfilePage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const user = this.app.authManager.getCurrentUser();
    const stats = this.app.statsManager.getDetailedStats(user.id);
    const badges = this.app.badgeManager.getUserBadges(user.id);
    const allBadges = this.app.badgeManager.getAllBadges();

    return `
      ${new NavBar(this.app).render()}
      <div class="container">
        <div class="profile">
          <div class="profile-header">
            ${user.profilePicture ? `<img src="${user.profilePicture}" class="profile-avatar" alt="${user.username}">` : '<div class="profile-avatar-placeholder">👤</div>'}
            <div class="profile-info">
              <h1>${user.username}</h1>
              <p>${user.email}</p>
            </div>
          </div>

          <div class="profile-stats">
            <h2>Your Statistics</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-icon">☕</span>
                <span class="stat-value">${stats.totalDrinks.coffee}</span>
                <span class="stat-label">Coffees</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🍺</span>
                <span class="stat-value">${stats.totalDrinks.beer}</span>
                <span class="stat-label">Beers</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🥤</span>
                <span class="stat-value">${stats.totalDrinks.other}</span>
                <span class="stat-label">Other Drinks</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🎯</span>
                <span class="stat-value">${stats.totalDrinks.total}</span>
                <span class="stat-label">Total Drinks</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">💰</span>
                <span class="stat-value">${stats.totalPaid.total}</span>
                <span class="stat-label">Drinks Paid For</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">💵</span>
                <span class="stat-value">$${stats.totalSpent.toFixed(0)}</span>
                <span class="stat-label">Estimated Spent</span>
              </div>
            </div>

            ${stats.moneyComparisons.length > 0 ? `
              <div class="comparisons">
                <h3>That's enough to buy:</h3>
                <ul>
                  ${stats.moneyComparisons.map(c => `<li>${c}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            ${stats.volumeComparisons.length > 0 ? `
              <div class="comparisons">
                <h3>Volume consumed:</h3>
                <ul>
                  ${stats.volumeComparisons.map(c => `<li>${c}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>

          <div class="profile-badges">
            <h2>Badges (${badges.length}/${allBadges.length})</h2>
            <div class="badges-grid">
              ${allBadges.map(badge => {
                const earned = badges.find(b => b.id === badge.id);
                return this.renderBadge(badge, earned);
              }).join('')}
            </div>
          </div>

          <div class="profile-actions">
            <button class="btn btn-secondary" onclick="window.app.router.navigate('/stats')">View Detailed Stats</button>
            <button class="btn btn-secondary" onclick="document.getElementById('export-modal').style.display='block'">Export Data</button>
          </div>
        </div>
      </div>

      <div id="export-modal" class="modal" style="display: none;">
        <div class="modal-content">
          <h2>Export Data</h2>
          <p>Download all your drink tracking data as JSON</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" onclick="document.getElementById('export-modal').style.display='none'">Cancel</button>
            <button class="btn btn-primary" onclick="window.app.exportData()">Download</button>
          </div>
        </div>
      </div>
    `;
  }

  renderBadge(badge, earned) {
    const locked = !earned;
    const rarityColor = getRarityColor(badge.rarity);

    return `
      <div class="badge-card ${locked ? 'locked' : ''}" style="border-color: ${rarityColor}">
        <div class="badge-icon">${locked ? '🔒' : badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-description">${badge.description}</div>
        ${earned ? `<div class="badge-date">Unlocked ${formatDate(earned.awardedAt)}</div>` : ''}
        <div class="badge-rarity" style="color: ${rarityColor}">${badge.rarity}</div>
      </div>
    `;
  }

  mount() {
    // Mount navbar
    const navBar = new (require('../common/NavBar.js').NavBar)(this.app);
    if (navBar.mount) {
      navBar.mount();
    }

    // Add export functionality to window
    window.app.exportData = () => {
      const data = this.app.dataManager.export();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `drink-tracker-export-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      document.getElementById('export-modal').style.display = 'none';
      this.app.notificationManager.success('Dati esportati con successo!');
    };
  }
}
