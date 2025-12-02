// Badge management and awarding

export class BadgeManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  checkAndAwardBadges(userId) {
    const stats = this.dataManager.getUserStats(userId);
    const allBadges = this.dataManager.getAllBadges();
    const awardedBadges = [];

    allBadges.forEach(badge => {
      // Check if already awarded
      if (stats.badges.find(b => b.badgeId === badge.id)) {
        return;
      }

      // Check criteria
      if (this.checkBadgeCriteria(badge, stats)) {
        this.dataManager.awardBadge(userId, badge.id);
        awardedBadges.push(badge);
      }
    });

    return awardedBadges;
  }

  checkBadgeCriteria(badge, stats) {
    const { type, threshold, drinkType } = badge.criteria;

    switch (type) {
      case 'total_drinks':
        if (drinkType) {
          return stats.totalDrinks[drinkType] >= threshold;
        }
        return stats.totalDrinks.total >= threshold;

      case 'total_paid':
        if (drinkType) {
          return stats.totalPaid[drinkType] >= threshold;
        }
        return stats.totalPaid.total >= threshold;

      case 'payment_ratio':
        return stats.paymentRatio >= threshold;

      default:
        return false;
    }
  }

  getUserBadges(userId) {
    return this.dataManager.getUserBadges(userId);
  }

  getAllBadges() {
    return this.dataManager.getAllBadges();
  }

  getBadgeProgress(userId, badgeId) {
    const badge = this.dataManager.getAllBadges().find(b => b.id === badgeId);
    if (!badge) return null;

    const stats = this.dataManager.getUserStats(userId);
    const { type, threshold, drinkType } = badge.criteria;

    let current = 0;

    switch (type) {
      case 'total_drinks':
        current = drinkType ? stats.totalDrinks[drinkType] : stats.totalDrinks.total;
        break;
      case 'total_paid':
        current = drinkType ? stats.totalPaid[drinkType] : stats.totalPaid.total;
        break;
      case 'payment_ratio':
        current = stats.paymentRatio;
        break;
    }

    return {
      current,
      threshold,
      percentage: Math.min((current / threshold) * 100, 100),
      completed: current >= threshold
    };
  }
}
