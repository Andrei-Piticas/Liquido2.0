// Login page component
import { sanitizeHTML } from '../../utils/validation.js';

export class LoginPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    return `
      <div class="auth-container">
        <div class="auth-card">
          <h1>🍺 Drink Tracker</h1>
          <h2>Accedi</h2>
          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
              <span class="error-message" id="email-error"></span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required>
              <span class="error-message" id="password-error"></span>
            </div>
            <button type="submit" class="btn btn-primary">Accedi</button>
            <div class="form-footer">
              <p>Non hai un account? <a href="/register" data-link>Registrati</a></p>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  mount() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Clear previous errors
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    const result = await this.app.authManager.login(email, password);

    if (result.success) {
      this.app.notificationManager.success('Accesso effettuato!');
      this.app.router.navigate('/');
    } else {
      this.app.notificationManager.error(result.error);
    }
  }
}
