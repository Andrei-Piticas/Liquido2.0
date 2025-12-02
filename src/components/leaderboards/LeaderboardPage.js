// Leaderboard page component
import { NavBar } from '../common/NavBar.js';

export class LeaderboardPage {
  constructor(app) {
    this.app = app;
    this.activeTab = 'coffee';
  }

  render() {
    return `
      ${new NavBar(this.app).render()}
      <div class="container">
        <div class="leaderboards">
          <h1>🏆 Classifiche</h1>
          
          <div class="tabs">
            <button class="tab-btn active" data-tab="coffee">☕ Caffè</button>
            <button class="tab-btn" data-tab="beer">🍺 Birra</button>
            <button class="tab-btn" data-tab="other">🥤 Altro</button>
            <button class="tab-btn" data-tab="total">🎯 Totale</button>
            <button class="tab-btn" data-tab="payment">💰 Più Generosi</button>
            <button class="tab-btn" data-tab="freeloader">🤑 Scrocconi</button>
          </div>

          <div id="leaderboard-content"></div>
        </div>
      </div>
    `;
  }

  mount() {
    // Mount navbar
    const navBar = new (require('../common/NavBar.js').NavBar)(this.app);
    if (navBar.mount) {
      navBar.mount();
    }

    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeTab = tab.getAttribute('data-tab');
        this.renderLeaderboard();
      });
    });

    this.renderLeaderboard();
  }

  renderLeaderboard() {
    const container = document.getElementById('leaderboard-content');
    const currentUser = this.app.authManager.getCurrentUser();

    let leaderboard;
    let title;

    switch (this.activeTab) {
      case 'coffee':
      case 'beer':
      case 'other':
        leaderboard = this.app.leaderboardManager.getConsumptionLeaderboard(this.activeTab);
        title = `Top ${this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1)} Consumers`;
        break;
      case 'total':
        leaderboard = this.app.leaderboardManager.getConsumptionLeaderboard(null);
        title = 'Top Overall Consumers';
        break;
      case 'payment':
        leaderboard = this.app.leaderboardManager.getPaymentLeaderboard();
        title = 'Most Generous';
        break;
      case 'freeloader':
        leaderboard = this.app.leaderboardManager.getFreeloaderLeaderboard();
        title = 'Biggest Freeloaders';
        break;
    }

    if (leaderboard.length === 0) {
      container.innerHTML = `
        <div class="leaderboard-section">
          <h2>${title}</h2>
          <p class="empty-state">No data yet!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="leaderboard-section">
        <h2>${title}</h2>
        <div class="leaderboard-list">
          ${leaderboard.map((entry, index) => this.renderLeaderboardEntry(entry, index, currentUser.id)).join('')}
        </div>
      </div>
    `;
  }

  renderLeaderboardEntry(entry, index, currentUserId) {
    const isCurrentUser = entry.userId === currentUserId;
    const rank = index + 1;
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';

    let value;
    if (this.activeTab === 'payment') {
      value = `${entry.totalPaid} drinks (${entry.percentage}%)`;
    } else if (this.activeTab === 'freeloader') {
      value = `${entry.totalConsumed} consumed / ${entry.totalPaid} paid (${entry.percentage}%)`;
    } else {
      value = `${entry.consumption} drinks`;
    }

    return `
      <div class="leaderboard-entry ${isCurrentUser ? 'current-user' : ''}">
        <div class="entry-rank">${medal || rank}</div>
        ${entry.profilePicture ? `<img src="${entry.profilePicture}" class="entry-avatar" alt="${entry.username}">` : '<div class="entry-avatar-placeholder">👤</div>'}
        <div class="entry-info">
          <div class="entry-name">${entry.username}${isCurrentUser ? ' (You)' : ''}</div>
          <div class="entry-value">${value}</div>
        </div>
      </div>
    `;
  }
}
