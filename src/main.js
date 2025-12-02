// Main application entry point
import { DataManager } from './data/storage.js';
import { AuthManager } from './core/auth.js';
import { DrinkManager } from './core/drinks.js';
import { LeaderboardManager } from './core/leaderboards.js';
import { BadgeManager } from './core/badges.js';
import { StatsManager } from './core/stats.js';
import { NotificationManager } from './utils/notifications.js';
import { Router } from './components/router.js';

class App {
  constructor() {
    // Initialize managers
    this.dataManager = new DataManager();
    this.authManager = new AuthManager(this.dataManager);
    this.drinkManager = new DrinkManager(this.dataManager);
    this.leaderboardManager = new LeaderboardManager(this.dataManager);
    this.badgeManager = new BadgeManager(this.dataManager);
    this.statsManager = new StatsManager(this.dataManager);
    this.notificationManager = new NotificationManager();

    // Make notification manager globally accessible
    window.notificationManager = this.notificationManager;

    // Initialize theme
    this.initializeTheme();

    // Initialize router
    this.router = new Router(this);

    // Create first admin if no users exist
    this.initializeFirstAdmin();
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('drink-tracker-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('drink-tracker-theme', newTheme);
    this.updateThemeIcon(newTheme);
  }

  updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  async initializeFirstAdmin() {
    const users = this.dataManager.getAllUsers();
    if (users.length === 0) {
      // Create default admin account
      const result = await this.authManager.register(
        'admin',
        'admin@drinktracker.com',
        'Admin123!',
        null
      );
      
      if (result.success) {
        // Approve and set as admin
        const admin = this.dataManager.getUserByEmail('admin@drinktracker.com');
        this.dataManager.updateUser(admin.id, {
          status: 'approved',
          isAdmin: true,
          approvedAt: Date.now()
        });
        console.log('Default admin created: admin@drinktracker.com / Admin123!');
      }
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
