// Toast notification system

export class NotificationManager {
  constructor() {
    this.container = document.getElementById('notifications');
    this.notifications = [];
  }

  show(message, type = 'info', duration = 3000) {
    const notification = {
      id: crypto.randomUUID(),
      message,
      type,
      duration
    };

    this.notifications.push(notification);
    this.render(notification);

    if (duration > 0) {
      setTimeout(() => this.dismiss(notification.id), duration);
    }

    return notification.id;
  }

  dismiss(id) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index >= 0) {
      this.notifications.splice(index, 1);
      const element = document.querySelector(`[data-notification-id="${id}"]`);
      if (element) {
        element.classList.add('fade-out');
        setTimeout(() => element.remove(), 300);
      }
    }
  }

  render(notification) {
    const toast = document.createElement('div');
    toast.className = `notification notification-${notification.type}`;
    toast.setAttribute('data-notification-id', notification.id);
    toast.innerHTML = `
      <span class="notification-message">${notification.message}</span>
      <button class="notification-close" onclick="window.notificationManager.dismiss('${notification.id}')">×</button>
    `;

    this.container.appendChild(toast);
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }

  badge(badgeName, badgeIcon) {
    return this.show(`🎉 Badge Sbloccato: ${badgeIcon} ${badgeName}!`, 'success', 5000);
  }
}
