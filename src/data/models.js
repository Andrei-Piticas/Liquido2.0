// Data models and validation

export function createUser({ username, email, password, profilePicture = null, isAdmin = false }) {
  return {
    id: crypto.randomUUID(),
    username,
    email,
    passwordHash: password, // Will be hashed by auth manager
    profilePicture,
    status: 'pending',
    isAdmin,
    createdAt: Date.now(),
    approvedAt: null
  };
}

export function createDrinkEntry({ drinkType, quantity, consumers, payers, notes = null, createdBy }) {
  return {
    id: crypto.randomUUID(),
    drinkType,
    quantity,
    consumers,
    payers,
    timestamp: Date.now(),
    notes,
    createdBy
  };
}

export function createBadge({ name, description, icon, rarity, criteria }) {
  return {
    id: crypto.randomUUID(),
    name,
    description,
    icon,
    rarity,
    criteria
  };
}

export function createUserStats(userId) {
  return {
    userId,
    totalDrinks: {
      coffee: 0,
      beer: 0,
      other: 0,
      total: 0
    },
    totalPaid: {
      coffee: 0,
      beer: 0,
      other: 0,
      total: 0
    },
    paymentRatio: 0,
    badges: [],
    lastActive: Date.now()
  };
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

export function validateDrinkEntry(entry) {
  if (!['coffee', 'beer', 'other'].includes(entry.drinkType)) {
    return { valid: false, error: 'Invalid drink type' };
  }
  if (entry.quantity <= 0) {
    return { valid: false, error: 'Quantity must be positive' };
  }
  if (!entry.consumers || entry.consumers.length === 0) {
    return { valid: false, error: 'At least one consumer required' };
  }
  if (!entry.payers || entry.payers.length === 0) {
    return { valid: false, error: 'At least one payer required' };
  }
  
  const totalPaid = entry.payers.reduce((sum, p) => sum + p.quantity, 0);
  if (totalPaid !== entry.quantity) {
    return { valid: false, error: 'Payer quantities must sum to total quantity' };
  }
  
  return { valid: true };
}
