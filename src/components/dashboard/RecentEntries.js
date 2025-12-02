// Recent drink entries component
import { formatDateTime, getDrinkIcon } from '../../utils/formatting.js';

export class RecentEntries {
  constructor(app) {
    this.app = app;
  }

  render() {
    const entries = this.app.drinkManager.getEntries()
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 10);

    if (entries.length === 0) {
      return `
        <div class="recent-entries">
          <h2>Bevute Recenti</h2>
          <p class="empty-state">Nessuna bevuta ancora. Aggiungi la prima qui sopra!</p>
        </div>
      `;
    }

    return `
      <div class="recent-entries">
        <h2>Bevute Recenti</h2>
        <div class="entries-list">
          ${entries.map(entry => this.renderEntry(entry)).join('')}
        </div>
      </div>
    `;
  }

  renderEntry(entry) {
    const consumers = entry.consumers.map(id => {
      const user = this.app.dataManager.getUser(id);
      return user ? user.username : 'Unknown';
    }).join(', ');

    const payers = entry.payers.map(p => {
      const user = this.app.dataManager.getUser(p.userId);
      const username = user ? user.username : 'Unknown';
      return entry.payers.length > 1 ? `${username} (${p.quantity})` : username;
    }).join(', ');

    return `
      <div class="entry-card">
        <div class="entry-icon">${getDrinkIcon(entry.drinkType)}</div>
        <div class="entry-details">
          <div class="entry-header">
            <span class="entry-quantity">${entry.quantity}x ${entry.drinkType}</span>
            <span class="entry-time">${formatDateTime(entry.timestamp)}</span>
          </div>
          <div class="entry-info">
            <div>👥 ${consumers}</div>
            <div>💰 ${payers}</div>
            ${entry.notes ? `<div class="entry-notes">📝 ${entry.notes}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }
}
