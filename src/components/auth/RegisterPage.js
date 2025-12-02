// Registration page component
import { validateEmail, validatePassword } from '../../data/models.js';
import { validateImageFile, imageToBase64 } from '../../utils/validation.js';

export class RegisterPage {
  constructor(app) {
    this.app = app;
    this.profilePicture = null;
  }

  render() {
    return `
      <div class="auth-container">
        <div class="auth-card">
          <h1>🍺 Drink Tracker</h1>
          <h2>Register</h2>
          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required>
              <span class="error-message" id="username-error"></span>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
              <span class="error-message" id="email-error"></span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required>
              <small>At least 8 characters with a special character</small>
              <span class="error-message" id="password-error"></span>
            </div>
            <div class="form-group">
              <label for="profile-picture">Profile Picture (optional)</label>
              <input type="file" id="profile-picture" accept="image/*">
              <div id="picture-preview"></div>
              <span class="error-message" id="picture-error"></span>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <div class="form-footer">
              <p>Already have an account? <a href="/login" data-link>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  mount() {
    const form = document.getElementById('register-form');
    const pictureInput = document.getElementById('profile-picture');
    
    form.addEventListener('submit', (e) => this.handleSubmit(e));
    pictureInput.addEventListener('change', (e) => this.handlePictureChange(e));
  }

  async handlePictureChange(e) {
    const file = e.target.files[0];
    const errorEl = document.getElementById('picture-error');
    const previewEl = document.getElementById('picture-preview');

    if (!file) {
      this.profilePicture = null;
      previewEl.innerHTML = '';
      return;
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      errorEl.textContent = validation.error;
      this.profilePicture = null;
      previewEl.innerHTML = '';
      return;
    }

    errorEl.textContent = '';
    this.profilePicture = await imageToBase64(file);
    previewEl.innerHTML = `<img src="${this.profilePicture}" alt="Preview" class="profile-preview">`;
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear previous errors
    document.getElementById('username-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    // Validate
    let hasError = false;

    if (!username) {
      document.getElementById('username-error').textContent = 'Username is required';
      hasError = true;
    }

    if (!validateEmail(email)) {
      document.getElementById('email-error').textContent = 'Invalid email format';
      hasError = true;
    }

    if (!validatePassword(password)) {
      document.getElementById('password-error').textContent = 'Password must be at least 8 characters with a special character';
      hasError = true;
    }

    if (hasError) return;

    const result = await this.app.authManager.register(username, email, password, this.profilePicture);

    if (result.success) {
      this.app.notificationManager.success(result.message);
      setTimeout(() => this.app.router.navigate('/login'), 2000);
    } else {
      this.app.notificationManager.error(result.error);
    }
  }
}
