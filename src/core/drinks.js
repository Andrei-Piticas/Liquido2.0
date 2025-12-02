// Drink entry management
import { createDrinkEntry, validateDrinkEntry } from '../data/models.js';

export class DrinkManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  addDrinkEntry({ drinkType, quantity, consumers, payers, notes = null, createdBy }) {
    // Create entry
    const entry = createDrinkEntry({
      drinkType,
      quantity,
      consumers,
      payers,
      notes,
      createdBy
    });

    // Validate
    const validation = validateDrinkEntry(entry);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Save entry
    this.dataManager.createDrinkEntry(entry);

    return { success: true, entry };
  }

  addQuickDrink(drinkType, quantity, consumerId, payerId) {
    return this.addDrinkEntry({
      drinkType,
      quantity,
      consumers: [consumerId],
      payers: [{ userId: payerId, quantity }],
      createdBy: consumerId
    });
  }

  addSplitPayment({ drinkType, quantity, consumers, payers, notes = null, createdBy }) {
    return this.addDrinkEntry({
      drinkType,
      quantity,
      consumers,
      payers,
      notes,
      createdBy
    });
  }

  updateEntry(entryId, updates) {
    const entry = this.dataManager.updateDrinkEntry(entryId, updates);
    if (entry) {
      return { success: true, entry };
    }
    return { success: false, error: 'Entry not found' };
  }

  deleteEntry(entryId) {
    const success = this.dataManager.deleteDrinkEntry(entryId);
    if (success) {
      return { success: true };
    }
    return { success: false, error: 'Entry not found' };
  }

  getEntries() {
    return this.dataManager.getAllDrinkEntries();
  }

  getEntry(entryId) {
    return this.dataManager.getDrinkEntry(entryId);
  }
}
