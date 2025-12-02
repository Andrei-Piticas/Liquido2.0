// LocalStorage wrapper for data persistence

const STORAGE_KEY = 'drink-tracker-data';

export class DataManager {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
    
    return {
      users: [],
      drinkEntries: [],
      userStats: {},
      badges: this.getDefaultBadges()
    };
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      return true;
    } catch (error) {
      console.error('Failed to save data:', error);
      return false;
    }
  }

  // User management
  createUser(userData) {
    this.data.users.push(userData);
    this.save();
    return userData;
  }

  getUser(userId) {
    return this.data.users.find(u => u.id === userId);
  }

  getUserByEmail(email) {
    return this.data.users.find(u => u.email === email);
  }

  updateUser(userId, updates) {
    const user = this.getUser(userId);
    if (user) {
      Object.assign(user, updates);
      this.save();
      return user;
    }
    return null;
  }

  getAllUsers() {
    return this.data.users;
  }

  getPendingUsers() {
    return this.data.users.filter(u => u.status === 'pending');
  }

  // Drink entry management
  createDrinkEntry(entryData) {
    this.data.drinkEntries.push(entryData);
    this.updateStatsForEntry(entryData);
    this.save();
    return entryData;
  }

  getDrinkEntry(entryId) {
    return this.data.drinkEntries.find(e => e.id === entryId);
  }

  updateDrinkEntry(entryId, updates) {
    const entry = this.getDrinkEntry(entryId);
    if (entry) {
      Object.assign(entry, updates);
      this.recalculateAllStats();
      this.save();
      return entry;
    }
    return null;
  }

  deleteDrinkEntry(entryId) {
    const index = this.data.drinkEntries.findIndex(e => e.id === entryId);
    if (index !== -1) {
      this.data.drinkEntries.splice(index, 1);
      this.recalculateAllStats();
      this.save();
      return true;
    }
    return false;
  }

  getAllDrinkEntries() {
    return this.data.drinkEntries;
  }

  // Statistics
  getUserStats(userId) {
    if (!this.data.userStats[userId]) {
      this.data.userStats[userId] = {
        userId,
        totalDrinks: { coffee: 0, beer: 0, other: 0, total: 0 },
        totalPaid: { coffee: 0, beer: 0, other: 0, total: 0 },
        paymentRatio: 0,
        badges: [],
        lastActive: Date.now()
      };
    }
    return this.data.userStats[userId];
  }

  getGlobalStats() {
    const stats = {
      totalDrinks: { coffee: 0, beer: 0, other: 0, total: 0 },
      totalPaid: { coffee: 0, beer: 0, other: 0, total: 0 },
      totalUsers: this.data.users.filter(u => u.status === 'approved').length,
      totalEntries: this.data.drinkEntries.length
    };

    Object.values(this.data.userStats).forEach(userStat => {
      stats.totalDrinks.coffee += userStat.totalDrinks.coffee;
      stats.totalDrinks.beer += userStat.totalDrinks.beer;
      stats.totalDrinks.other += userStat.totalDrinks.other;
      stats.totalDrinks.total += userStat.totalDrinks.total;
      stats.totalPaid.coffee += userStat.totalPaid.coffee;
      stats.totalPaid.beer += userStat.totalPaid.beer;
      stats.totalPaid.other += userStat.totalPaid.other;
      stats.totalPaid.total += userStat.totalPaid.total;
    });

    return stats;
  }

  updateStatsForEntry(entry) {
    // Update consumption stats
    entry.consumers.forEach(consumerId => {
      const stats = this.getUserStats(consumerId);
      const quantityPerConsumer = entry.quantity / entry.consumers.length;
      stats.totalDrinks[entry.drinkType] += quantityPerConsumer;
      stats.totalDrinks.total += quantityPerConsumer;
      stats.lastActive = Date.now();
    });

    // Update payment stats
    entry.payers.forEach(payer => {
      const stats = this.getUserStats(payer.userId);
      stats.totalPaid[entry.drinkType] += payer.quantity;
      stats.totalPaid.total += payer.quantity;
      stats.lastActive = Date.now();
    });

    // Update payment ratios
    Object.values(this.data.userStats).forEach(stats => {
      stats.paymentRatio = stats.totalDrinks.total > 0 
        ? stats.totalPaid.total / stats.totalDrinks.total 
        : 0;
    });
  }

  recalculateAllStats() {
    // Reset all stats
    this.data.userStats = {};
    
    // Recalculate from all entries
    this.data.drinkEntries.forEach(entry => {
      this.updateStatsForEntry(entry);
    });
  }

  // Badge management
  awardBadge(userId, badgeId) {
    const stats = this.getUserStats(userId);
    if (!stats.badges.find(b => b.badgeId === badgeId)) {
      stats.badges.push({
        badgeId,
        awardedAt: Date.now()
      });
      this.save();
      return true;
    }
    return false;
  }

  getUserBadges(userId) {
    const stats = this.getUserStats(userId);
    return stats.badges.map(b => ({
      ...this.data.badges.find(badge => badge.id === b.badgeId),
      awardedAt: b.awardedAt
    }));
  }

  getAllBadges() {
    return this.data.badges;
  }

  getDefaultBadges() {
    return [
      {
        id: 'first-drink',
        name: 'Primo Sorso',
        description: 'Registra la tua prima bevuta',
        icon: '🥤',
        rarity: 'common',
        criteria: { type: 'total_drinks', threshold: 1, drinkType: null }
      },
      {
        id: 'coffee-starter',
        name: 'Amante del Caffè',
        description: 'Bevi 5 caffè',
        icon: '☕',
        rarity: 'common',
        criteria: { type: 'total_drinks', threshold: 5, drinkType: 'coffee' }
      },
      {
        id: 'beer-starter',
        name: 'Appassionato di Birra',
        description: 'Bevi 5 birre',
        icon: '🍺',
        rarity: 'common',
        criteria: { type: 'total_drinks', threshold: 5, drinkType: 'beer' }
      },
      {
        id: 'social-drinker',
        name: 'Bevitore Sociale',
        description: 'Raggiungi 10 bevute totali',
        icon: '🎉',
        rarity: 'common',
        criteria: { type: 'total_drinks', threshold: 10, drinkType: null }
      },
      {
        id: 'generous-friend',
        name: 'Amico Generoso',
        description: 'Paga per 10 bevute',
        icon: '💰',
        rarity: 'rare',
        criteria: { type: 'total_paid', threshold: 10, drinkType: null }
      },
      {
        id: 'coffee-addict',
        name: 'Dipendente da Caffè',
        description: 'Bevi 25 caffè',
        icon: '☕',
        rarity: 'rare',
        criteria: { type: 'total_drinks', threshold: 25, drinkType: 'coffee' }
      },
      {
        id: 'beer-expert',
        name: 'Esperto di Birra',
        description: 'Bevi 25 birre',
        icon: '🍺',
        rarity: 'rare',
        criteria: { type: 'total_drinks', threshold: 25, drinkType: 'beer' }
      },
      {
        id: 'party-animal',
        name: 'Animale da Festa',
        description: 'Raggiungi 50 bevute totali',
        icon: '🎊',
        rarity: 'epic',
        criteria: { type: 'total_drinks', threshold: 50, drinkType: null }
      },
      {
        id: 'big-spender',
        name: 'Grande Spendaccione',
        description: 'Paga per 50 bevute',
        icon: '💸',
        rarity: 'epic',
        criteria: { type: 'total_paid', threshold: 50, drinkType: null }
      },
      {
        id: 'legend',
        name: 'Leggenda',
        description: 'Raggiungi 100 bevute totali',
        icon: '👑',
        rarity: 'legendary',
        criteria: { type: 'total_drinks', threshold: 100, drinkType: null }
      }
    ];
  }

  // Export/Import
  export() {
    return JSON.stringify(this.data, null, 2);
  }

  import(jsonData) {
    try {
      const imported = JSON.parse(jsonData);
      // Validate structure
      if (!imported.users || !imported.drinkEntries) {
        throw new Error('Invalid data format');
      }
      this.data = imported;
      this.save();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  clear() {
    this.data = {
      users: [],
      drinkEntries: [],
      userStats: {},
      badges: this.getDefaultBadges()
    };
    this.save();
  }
}
