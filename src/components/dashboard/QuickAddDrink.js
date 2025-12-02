// Quick add drink component
import { validateQuantity } from '../../utils/validation.js';

export class QuickAddDrink {
  constructor(app) {
    this.app = app;
    this.splitMode = false;
  }

  render() {
    return `
      <div class="quick-add-card">
        <h2>Aggiungi Bevuta</h2>
        <div class="drink-type-buttons">
          <button class="drink-btn" data-drink="coffee">
            <span class="drink-icon">☕</span>
            <span>Caffè</span>
          </button>
          <button class="drink-btn" data-drink="beer">
            <span class="drink-icon">🍺</span>
            <span>Birra</span>
          </button>
          <button class="drink-btn" data-drink="other">
            <span class="drink-icon">🥤</span>
            <span>Altro</span>
          </button>
        </div>
        <div id="drink-form-container"></div>
      </div>
    `;
  }

  mount() {
    const buttons = document.querySelectorAll('.drink-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const drinkType = btn.getAttribute('data-drink');
        this.showDrinkForm(drinkType);
      });
    });
  }

  showDrinkForm(drinkType) {
    const container = document.getElementById('drink-form-container');
    const users = this.app.dataManager.getAllUsers().filter(u => u.status === 'approved');
    const currentUser = this.app.authManager.getCurrentUser();

    container.innerHTML = `
      <form id="add-drink-form" class="drink-form">
        <input type="hidden" id="drink-type" value="${drinkType}">
        
        <div class="form-group">
          <label for="quantity">Quantità</label>
          <input type="number" id="quantity" min="1" max="100" value="1" required>
        </div>

        <div class="form-group">
          <label>Chi ha bevuto?</label>
          <div class="user-checkboxes">
            ${users.map(u => `
              <label class="checkbox-label">
                <input type="checkbox" name="consumers" value="${u.id}" ${u.id === currentUser.id ? 'checked' : ''}>
                ${u.username}
              </label>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" id="split-mode">
            Pagamento Diviso
          </label>
        </div>

        <div id="payer-section">
          <div class="form-group">
            <label for="payer">Chi ha pagato?</label>
            <select id="payer" required>
              <option value="">Seleziona</option>
              ${users.map(u => `
                <option value="${u.id}" ${u.id === currentUser.id ? 'selected' : ''}>${u.username}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div id="split-payers-section" style="display: none;"></div>

        <div class="form-group">
          <label for="notes">Note (opzionale)</label>
          <input type="text" id="notes" placeholder="Aggiungi una nota...">
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="document.getElementById('drink-form-container').innerHTML = ''">Annulla</button>
          <button type="submit" class="btn btn-primary">Aggiungi</button>
        </div>
      </form>
    `;

    const form = document.getElementById('add-drink-form');
    const splitCheckbox = document.getElementById('split-mode');
    
    form.addEventListener('submit', (e) => this.handleSubmit(e));
    splitCheckbox.addEventListener('change', (e) => this.toggleSplitMode(e.target.checked));
  }

  toggleSplitMode(enabled) {
    this.splitMode = enabled;
    const payerSection = document.getElementById('payer-section');
    const splitSection = document.getElementById('split-payers-section');

    if (enabled) {
      payerSection.style.display = 'none';
      splitSection.style.display = 'block';
      this.renderSplitPayers();
    } else {
      payerSection.style.display = 'block';
      splitSection.style.display = 'none';
    }
  }

  renderSplitPayers() {
    const users = this.app.dataManager.getAllUsers().filter(u => u.status === 'approved');
    const splitSection = document.getElementById('split-payers-section');

    splitSection.innerHTML = `
      <div class="form-group">
        <label>Dividi pagamento tra:</label>
        ${users.map(u => `
          <div class="split-payer">
            <label>${u.username}</label>
            <input type="number" class="split-quantity" data-user-id="${u.id}" min="0" value="0" placeholder="0">
          </div>
        `).join('')}
      </div>
    `;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const drinkType = document.getElementById('drink-type').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const notes = document.getElementById('notes').value || null;
    const currentUser = this.app.authManager.getCurrentUser();

    // Get consumers
    const consumerCheckboxes = document.querySelectorAll('input[name="consumers"]:checked');
    const consumers = Array.from(consumerCheckboxes).map(cb => cb.value);

    if (consumers.length === 0) {
      this.app.notificationManager.error('Seleziona almeno una persona');
      return;
    }

    // Get payers
    let payers;
    if (this.splitMode) {
      const splitInputs = document.querySelectorAll('.split-quantity');
      payers = Array.from(splitInputs)
        .map(input => ({
          userId: input.getAttribute('data-user-id'),
          quantity: parseInt(input.value) || 0
        }))
        .filter(p => p.quantity > 0);

      const totalPaid = payers.reduce((sum, p) => sum + p.quantity, 0);
      if (totalPaid !== quantity) {
        this.app.notificationManager.error(`I pagamenti devono sommare a ${quantity}`);
        return;
      }
    } else {
      const payerId = document.getElementById('payer').value;
      if (!payerId) {
        this.app.notificationManager.error('Seleziona chi ha pagato');
        return;
      }
      payers = [{ userId: payerId, quantity }];
    }

    // Add drink entry
    const result = this.app.drinkManager.addDrinkEntry({
      drinkType,
      quantity,
      consumers,
      payers,
      notes,
      createdBy: currentUser.id
    });

    if (result.success) {
      this.app.notificationManager.success('Bevuta aggiunta!');
      
      // Check for new badges
      consumers.forEach(consumerId => {
        const newBadges = this.app.badgeManager.checkAndAwardBadges(consumerId);
        newBadges.forEach(badge => {
          this.app.notificationManager.badge(badge.name, badge.icon);
        });
      });

      // Clear form
      document.getElementById('drink-form-container').innerHTML = '';
      
      // Refresh page to show updated stats
      this.app.router.handleRoute();
    } else {
      this.app.notificationManager.error(result.error);
    }
  }
}
