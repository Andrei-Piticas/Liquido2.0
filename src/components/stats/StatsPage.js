// Statistics page component
import { NavBar } from '../common/NavBar.js';

export class StatsPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const globalStats = this.app.statsManager.getDetailedStats();
    const trendData = this.app.statsManager.getTrendData('week');
    const peak = this.app.statsManager.getPeakConsumption('week');

    return `
      ${new NavBar(this.app).render()}
      <div class="container">
        <div class="stats-page">
          <h1>📊 Statistics</h1>

          <div class="stats-section">
            <h2>Global Statistics</h2>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-icon">👥</span>
                <span class="stat-value">${globalStats.totalUsers}</span>
                <span class="stat-label">Active Users</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">📝</span>
                <span class="stat-value">${globalStats.totalEntries}</span>
                <span class="stat-label">Total Entries</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">☕</span>
                <span class="stat-value">${globalStats.totalDrinks.coffee}</span>
                <span class="stat-label">Total Coffees</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🍺</span>
                <span class="stat-value">${globalStats.totalDrinks.beer}</span>
                <span class="stat-label">Total Beers</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">🥤</span>
                <span class="stat-value">${globalStats.totalDrinks.other}</span>
                <span class="stat-label">Other Drinks</span>
              </div>
              <div class="stat-card">
                <span class="stat-icon">💵</span>
                <span class="stat-value">$${globalStats.totalSpent.toFixed(0)}</span>
                <span class="stat-label">Total Spent</span>
              </div>
            </div>
          </div>

          ${globalStats.moneyComparisons.length > 0 ? `
            <div class="stats-section">
              <h2>💰 Money Comparisons</h2>
              <p>The group has spent enough to buy:</p>
              <ul class="comparisons-list">
                ${globalStats.moneyComparisons.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${globalStats.volumeComparisons.length > 0 ? `
            <div class="stats-section">
              <h2>🌊 Volume Comparisons</h2>
              <p>The group has consumed:</p>
              <ul class="comparisons-list">
                ${globalStats.volumeComparisons.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${peak ? `
            <div class="stats-section">
              <h2>📈 Peak Consumption</h2>
              <p>Highest consumption day this week: <strong>${peak.date}</strong></p>
              <div class="peak-stats">
                <span>☕ ${peak.coffee} coffees</span>
                <span>🍺 ${peak.beer} beers</span>
                <span>🥤 ${peak.other} other drinks</span>
              </div>
            </div>
          ` : ''}

          ${trendData.length > 0 ? `
            <div class="stats-section">
              <h2>📊 Weekly Trends</h2>
              <div class="trend-chart">
                ${trendData.map(day => `
                  <div class="trend-day">
                    <div class="trend-date">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div class="trend-bars">
                      <div class="trend-bar coffee" style="height: ${Math.min(day.coffee * 10, 100)}px" title="Coffee: ${day.coffee}"></div>
                      <div class="trend-bar beer" style="height: ${Math.min(day.beer * 10, 100)}px" title="Beer: ${day.beer}"></div>
                      <div class="trend-bar other" style="height: ${Math.min(day.other * 10, 100)}px" title="Other: ${day.other}"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="trend-legend">
                <span><span class="legend-color coffee"></span> Coffee</span>
                <span><span class="legend-color beer"></span> Beer</span>
                <span><span class="legend-color other"></span> Other</span>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}
