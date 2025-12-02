// Statistics and fun comparisons

export class StatsManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  getUserStats(userId) {
    return this.dataManager.getUserStats(userId);
  }

  getGlobalStats() {
    return this.dataManager.getGlobalStats();
  }

  getMoneyComparisons(totalSpent) {
    // Assuming average prices: coffee $3, beer $5, other $4
    const comparisons = [];

    if (totalSpent >= 10) {
      const pizzas = Math.floor(totalSpent / 10);
      comparisons.push(`${pizzas} pizza${pizzas !== 1 ? 's' : ''}`);
    }

    if (totalSpent >= 1000) {
      const iphones = Math.floor(totalSpent / 1000);
      comparisons.push(`${iphones} iPhone${iphones !== 1 ? 's' : ''}`);
    }

    if (totalSpent >= 50) {
      const games = Math.floor(totalSpent / 50);
      comparisons.push(`${games} video game${games !== 1 ? 's' : ''}`);
    }

    if (totalSpent >= 15) {
      const movies = Math.floor(totalSpent / 15);
      comparisons.push(`${movies} movie ticket${movies !== 1 ? 's' : ''}`);
    }

    return comparisons;
  }

  getVolumeComparisons(stats) {
    // Assuming: coffee 250ml, beer 500ml, other 350ml
    const totalVolume = 
      (stats.totalDrinks.coffee * 250) +
      (stats.totalDrinks.beer * 500) +
      (stats.totalDrinks.other * 350);

    const volumeInLiters = totalVolume / 1000;
    const comparisons = [];

    if (volumeInLiters >= 1) {
      comparisons.push(`${volumeInLiters.toFixed(1)} liters of liquid`);
    }

    if (volumeInLiters >= 20) {
      const baobabs = Math.floor(volumeInLiters / 20);
      comparisons.push(`Enough to water ${baobabs} baobab tree${baobabs !== 1 ? 's' : ''}`);
    }

    if (volumeInLiters >= 200) {
      const bathtubs = Math.floor(volumeInLiters / 200);
      comparisons.push(`${bathtubs} bathtub${bathtubs !== 1 ? 's' : ''}`);
    }

    if (volumeInLiters >= 1000) {
      const pools = (volumeInLiters / 50000).toFixed(2);
      comparisons.push(`${pools}% of an Olympic swimming pool`);
    }

    return comparisons;
  }

  calculateTotalSpent(stats) {
    // Average prices
    const prices = { coffee: 3, beer: 5, other: 4 };
    
    return (
      stats.totalDrinks.coffee * prices.coffee +
      stats.totalDrinks.beer * prices.beer +
      stats.totalDrinks.other * prices.other
    );
  }

  getDetailedStats(userId = null) {
    const stats = userId 
      ? this.getUserStats(userId)
      : this.getGlobalStats();

    const totalSpent = this.calculateTotalSpent(stats);

    return {
      ...stats,
      totalSpent,
      moneyComparisons: this.getMoneyComparisons(totalSpent),
      volumeComparisons: this.getVolumeComparisons(stats)
    };
  }

  getTrendData(timeRange = 'week') {
    const entries = this.dataManager.getAllDrinkEntries();
    const now = Date.now();
    const ranges = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000
    };

    const cutoff = now - ranges[timeRange];
    const filteredEntries = entries.filter(e => e.timestamp >= cutoff);

    // Group by day
    const grouped = {};
    filteredEntries.forEach(entry => {
      const day = new Date(entry.timestamp).toDateString();
      if (!grouped[day]) {
        grouped[day] = { coffee: 0, beer: 0, other: 0 };
      }
      grouped[day][entry.drinkType] += entry.quantity;
    });

    return Object.entries(grouped).map(([date, drinks]) => ({
      date,
      ...drinks
    }));
  }

  getPeakConsumption(timeRange = 'week') {
    const trendData = this.getTrendData(timeRange);
    if (trendData.length === 0) return null;

    const peak = trendData.reduce((max, current) => {
      const currentTotal = current.coffee + current.beer + current.other;
      const maxTotal = max.coffee + max.beer + max.other;
      return currentTotal > maxTotal ? current : max;
    });

    return peak;
  }
}
