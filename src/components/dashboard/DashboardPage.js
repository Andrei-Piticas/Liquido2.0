// Dashboard page - main drink entry interface
import { NavBar } from '../common/NavBar.js';
import { QuickAddDrink } from './QuickAddDrink.js';
import { RecentEntries } from './RecentEntries.js';

export class DashboardPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const user = this.app.authManager.getCurrentUser();
    const stats = this.app.statsManager.getUserStats(user.id);

    return `
      ${new NavBar(this.app).render()}
      <div class="container">
        <div class="dashboard">
          <div class="welcome-section">
            <h1>Benvenuto, ${user.username}! 👋</h1>
            <div class="quick-stats">
              <div class="stat-card">
                <span class="stat-icon">☕</span>
                <span class="stat-value">${stats.totalDrinks.coffee}</span>
                <span class="stat-label">Caffè</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🍺</span>
                <span class="stat-value">${stats.totalDrinks.beer}</span>
                <span class="stat-label">Birre</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🥤</span>
                <span class="stat-value">${stats.totalDrinks.other}</span>
                <span class="stat-label">Altro</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">💰</span>
                <span class="stat-value">${stats.totalPaid.total}</span>
                <span class="stat-label">Pagato</span>
              </div>
            </div>
          </div>
          
          <div id="quick-add-section"></div>
          <div id="recent-entries-section"></div>
        </div>
      </div>
    `;
  }

  mount() {
    // Mount sub-components
    const quickAddSection = document.getElementById('quick-add-section');
    const quickAdd = new QuickAddDrink(this.app);
    quickAddSection.innerHTML = quickAdd.render();
    quickAdd.mount();

    const recentSection = document.getElementById('recent-entries-section');
    const recent = new RecentEntries(this.app);
    recentSection.innerHTML = recent.render();
  }
}
