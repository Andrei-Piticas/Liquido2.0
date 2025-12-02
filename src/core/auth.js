// Authentication manager
import bcrypt from 'bcryptjs';
import { createUser, validateEmail, validatePassword } from '../data/models.js';

export class AuthManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.currentUser = this.loadSession();
  }

  async register(username, email, password, profilePicture = null) {
    // Validate inputs
    if (!username || username.trim().length === 0) {
      return { success: false, error: 'Username is required' };
    }
    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }
    if (!validatePassword(password)) {
      return { success: false, error: 'Password must be at least 8 characters and contain a special character' };
    }

    // Check if email already exists
    if (this.dataManager.getUserByEmail(email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const userData = createUser({
      username,
      email,
      password: passwordHash,
      profilePicture,
      isAdmin: false
    });

    this.dataManager.createUser(userData);

    return { success: true, message: 'Registration successful. Awaiting admin approval.' };
  }

  async login(email, password) {
    const user = this.dataManager.getUserByEmail(email);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Check if approved
    if (user.status === 'pending') {
      return { success: false, error: 'Your account is awaiting admin approval' };
    }

    if (user.status === 'rejected') {
      return { success: false, error: 'Your account has been rejected' };
    }

    // Set current user and save session
    this.currentUser = user;
    this.saveSession(user);

    return { success: true, user };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('drink-tracker-session');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null && this.currentUser.status === 'approved';
  }

  isAdmin() {
    return this.isAuthenticated() && this.currentUser.isAdmin;
  }

  approveUser(userId) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Admin access required' };
    }

    const user = this.dataManager.updateUser(userId, {
      status: 'approved',
      approvedAt: Date.now()
    });

    if (user) {
      return { success: true, user };
    }

    return { success: false, error: 'User not found' };
  }

  rejectUser(userId) {
    if (!this.isAdmin()) {
      return { success: false, error: 'Admin access required' };
    }

    const user = this.dataManager.updateUser(userId, {
      status: 'rejected'
    });

    if (user) {
      return { success: true, user };
    }

    return { success: false, error: 'User not found' };
  }

  saveSession(user) {
    localStorage.setItem('drink-tracker-session', JSON.stringify({
      userId: user.id,
      email: user.email
    }));
  }

  loadSession() {
    try {
      const session = localStorage.getItem('drink-tracker-session');
      if (session) {
        const { userId } = JSON.parse(session);
        const user = this.dataManager.getUser(userId);
        if (user && user.status === 'approved') {
          return user;
        }
      }
    } catch (error) {
      console.error('Failed to load session:', error);
    }
    return null;
  }
}
