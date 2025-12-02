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
          
          <button class="hamburger" id="hamburger-btn" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div class="nav-links" id="nav-links">
            <a href="/" data-link class="nav-link">
              <span class="nav-icon">🏠</span>
              <span>Dashboard</span>
            </a>
            <a href="/leaderboards" data-link class="nav-link">
              <span class="nav-icon">🏆</span>
              <span>Classifiche</span>
            </a>
            <a href="/stats" data-link class="nav-link">
              <span class="nav-icon">📊</span>
              <span>Statistiche</span>
            </a>
            <a href="/profile" data-link class="nav-link">
              <span class="nav-icon">👤</span>
              <span>Profilo</span>
            </a>
            ${isAdmin ? '<a href="/admin" data-link class="nav-link"><span class="nav-icon">⚙️</span><span>Admin</span></a>' : ''}
            <div class="nav-actions">
              <button class="theme-toggle" onclick="window.app.toggleTheme()" title="Cambia tema">
                <span id="theme-icon">🌙</span>
              </button>
              <button class="btn btn-secondary btn-sm" onclick="window.app.authManager.logout(); window.app.router.navigate('/login')">Esci</button>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  mount() {
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      // Close menu when clicking a link
      const links = navLinks.querySelectorAll('.nav-link');
      links.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    }
  }
}
