// Simple client-side router
import { LoginPage } from './auth/LoginPage.js';
import { RegisterPage } from './auth/RegisterPage.js';
import { DashboardPage } from './dashboard/DashboardPage.js';
import { LeaderboardPage } from './leaderboards/LeaderboardPage.js';
import { ProfilePage } from './profile/ProfilePage.js';
import { AdminPage } from './admin/AdminPage.js';
import { StatsPage } from './stats/StatsPage.js';

export class Router {
  constructor(app) {
    this.app = app;
    this.routes = {
      '/': DashboardPage,
      '/login': LoginPage,
      '/register': RegisterPage,
      '/leaderboards': LeaderboardPage,
      '/profile': ProfilePage,
      '/admin': AdminPage,
      '/stats': StatsPage
    };

    this.currentPage = null;
    this.init();
  }

  init() {
    // Handle navigation
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Handle link clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigate(e.target.getAttribute('href'));
      }
    });

    // Initial route
    this.handleRoute();
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const PageClass = this.routes[path] || this.routes['/'];

    // Check authentication
    const isAuthenticated = this.app.authManager.isAuthenticated();
    const isAdmin = this.app.authManager.isAdmin();

    // Redirect logic
    if (!isAuthenticated && path !== '/login' && path !== '/register') {
      this.navigate('/login');
      return;
    }

    if (isAuthenticated && (path === '/login' || path === '/register')) {
      this.navigate('/');
      return;
    }

    if (path === '/admin' && !isAdmin) {
      this.app.notificationManager.error('Admin access required');
      this.navigate('/');
      return;
    }

    // Render page
    this.renderPage(PageClass);
  }

  renderPage(PageClass) {
    const appContainer = document.getElementById('app');
    
    if (this.currentPage && this.currentPage.destroy) {
      this.currentPage.destroy();
    }

    this.currentPage = new PageClass(this.app);
    appContainer.innerHTML = this.currentPage.render();

    if (this.currentPage.mount) {
      this.currentPage.mount();
    }

    // Mount navbar if present
    const navbar = appContainer.querySelector('.navbar');
    if (navbar) {
      const navBarComponent = new (require('./components/common/NavBar.js').NavBar)(this.app);
      if (navBarComponent.mount) {
        navBarComponent.mount();
      }
    }
  }
}
