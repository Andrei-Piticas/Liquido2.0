// Leaderboard calculations

export class LeaderboardManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
  }

  getConsumptionLeaderboard(drinkType = null) {
    const users = this.dataManager.getAllUsers().filter(u => u.status === 'approved');
    
    const leaderboard = users.map(user => {
      const stats = this.dataManager.getUserStats(user.id);
      const consumption = drinkType 
        ? stats.totalDrinks[drinkType] 
        : stats.totalDrinks.total;

      return {
        userId: user.id,
        username: user.username,
        profilePicture: user.profilePicture,
        consumption,
        drinkType
      };
    });

    // Sort by consumption descending
    leaderboard.sort((a, b) => b.consumption - a.consumption);

    return leaderboard;
  }

  getPaymentLeaderboard() {
    const users = this.dataManager.getAllUsers().filter(u => u.status === 'approved');
    
    const leaderboard = users.map(user => {
      const stats = this.dataManager.getUserStats(user.id);

      return {
        userId: user.id,
        username: user.username,
        profilePicture: user.profilePicture,
        totalPaid: stats.totalPaid.total,
        totalConsumed: stats.totalDrinks.total,
        percentage: stats.totalDrinks.total > 0 
          ? ((stats.totalPaid.total / stats.totalDrinks.total) * 100).toFixed(1)
          : 0
      };
    });

    // Sort by total paid descending
    leaderboard.sort((a, b) => b.totalPaid - a.totalPaid);

    return leaderboard;
  }

  getFreeloaderLeaderboard() {
    const users = this.dataManager.getAllUsers().filter(u => u.status === 'approved');
    
    const leaderboard = users
      .map(user => {
        const stats = this.dataManager.getUserStats(user.id);

        return {
          userId: user.id,
          username: user.username,
          profilePicture: user.profilePicture,
          totalPaid: stats.totalPaid.total,
          totalConsumed: stats.totalDrinks.total,
          ratio: stats.totalPaid.total > 0 
            ? stats.totalDrinks.total / stats.totalPaid.total 
            : (stats.totalDrinks.total > 0 ? Infinity : 0),
          percentage: stats.totalDrinks.total > 0 
            ? ((stats.totalPaid.total / stats.totalDrinks.total) * 100).toFixed(1)
            : 0
        };
      })
      .filter(entry => entry.totalConsumed > entry.totalPaid); // Only freeloaders

    // Sort by ratio descending (higher ratio = more freeloading)
    leaderboard.sort((a, b) => b.ratio - a.ratio);

    return leaderboard;
  }

  getUserRank(userId, leaderboardType, drinkType = null) {
    let leaderboard;
    
    switch (leaderboardType) {
      case 'consumption':
        leaderboard = this.getConsumptionLeaderboard(drinkType);
        break;
      case 'payment':
        leaderboard = this.getPaymentLeaderboard();
        break;
      case 'freeloader':
        leaderboard = this.getFreeloaderLeaderboard();
        break;
      default:
        return null;
    }

    const rank = leaderboard.findIndex(entry => entry.userId === userId);
    return rank >= 0 ? rank + 1 : null;
  }
}
