// Input validation utilities

export function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function validateImageFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid image format. Please use JPEG, PNG, GIF, or WebP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image too large. Maximum size is 5MB.' };
  }

  return { valid: true };
}

export function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function validateQuantity(quantity) {
  const num = parseInt(quantity);
  if (isNaN(num) || num <= 0) {
    return { valid: false, error: 'Quantity must be a positive number' };
  }
  if (num > 100) {
    return { valid: false, error: 'Quantity cannot exceed 100' };
  }
  return { valid: true, value: num };
}
