// Navigation bar component

export class NavBar {
  constructor(app) {
    this.app = app;
  }

  render() {
    const user = this.app.authManager.getCurrentUser();
    const isAdmin = this.app.authManager.isAdmin();

    return `
      <nav class="navbar">
        <div class="nav-container">
          <a href="/" data-link class="nav-brand">🍺 Drink Tracker</a>
          <div class="nav-links">
            <a href="/" data-link class="nav-link">Dashboard</a>
            <a href="/leaderboards" data-link class="nav-link">Classifiche</a>
            <a href="/stats" data-link class="nav-link">Statistiche</a>
            <a href="/profile" data-link class="nav-link">Profilo</a>
            ${isAdmin ? '<a href="/admin" data-link class="nav-link">Admin</a>' : ''}
            <button class="theme-toggle" onclick="window.app.toggleTheme()" title="Cambia tema">
              <span id="theme-icon">🌙</span>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="window.app.authManager.logout(); window.app.router.navigate('/login')">Esci</button>
          </div>
        </div>
      </nav>
    `;
  }
}
