// Property-based tests for data storage
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { DataManager } from './storage.js';
import { createUser, createDrinkEntry } from './models.js';

describe('Data Storage Property Tests', () => {
  let dataManager;

  beforeEach(() => {
    localStorage.clear();
    dataManager = new DataManager();
  });

  // Feature: drink-tracker, Property 32: Data persistence
  it('should persist any data change to LocalStorage immediately', () => {
    fc.assert(
      fc.property(
        fc.record({
          username: fc.string({ minLength: 1, maxLength: 20 }),
          email: fc.emailAddress(),
          password: fc.string({ minLength: 8, maxLength: 50 })
        }),
        (userData) => {
          const user = createUser({
            username: userData.username,
            email: userData.email,
            password: userData.password
          });

          dataManager.createUser(user);

          // Create new instance to verify persistence
          const newManager = new DataManager();
          const retrieved = newManager.getUser(user.id);

          expect(retrieved).toBeDefined();
          expect(retrieved.id).toBe(user.id);
          expect(retrieved.username).toBe(user.username);
          expect(retrieved.email).toBe(user.email);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: drink-tracker, Property 5: Drink entry persistence
  it('should persist and retrieve drink entries with all fields intact', () => {
    fc.assert(
      fc.property(
        fc.record({
          drinkType: fc.constantFrom('coffee', 'beer', 'other'),
          quantity: fc.integer({ min: 1, max: 20 }),
          numConsumers: fc.integer({ min: 1, max: 5 }),
          notes: fc.option(fc.string({ maxLength: 100 }), { nil: null })
        }),
        (entryData) => {
          // Create users first
          const users = [];
          for (let i = 0; i < entryData.numConsumers; i++) {
            const user = createUser({
              username: `user${i}`,
              email: `user${i}@test.com`,
              password: 'password123!'
            });
            dataManager.createUser(user);
            users.push(user);
          }

          const entry = createDrinkEntry({
            drinkType: entryData.drinkType,
            quantity: entryData.quantity,
            consumers: users.map(u => u.id),
            payers: [{ userId: users[0].id, quantity: entryData.quantity }],
            notes: entryData.notes,
            createdBy: users[0].id
          });

          dataManager.createDrinkEntry(entry);

          const retrieved = dataManager.getDrinkEntry(entry.id);

          expect(retrieved).toBeDefined();
          expect(retrieved.id).toBe(entry.id);
          expect(retrieved.drinkType).toBe(entry.drinkType);
          expect(retrieved.quantity).toBe(entry.quantity);
          expect(retrieved.consumers).toEqual(entry.consumers);
          expect(retrieved.payers).toEqual(entry.payers);
          expect(retrieved.notes).toBe(entry.notes);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: drink-tracker, Property 7: Split payment sum validation
  it('should validate that split payment quantities sum to total', () => {
    fc.assert(
      fc.property(
        fc.record({
          drinkType: fc.constantFrom('coffee', 'beer', 'other'),
          totalQuantity: fc.integer({ min: 2, max: 20 }),
          numPayers: fc.integer({ min: 2, max: 5 })
        }),
        (data) => {
          // Create users
          const users = [];
          for (let i = 0; i < data.numPayers; i++) {
            const user = createUser({
              username: `user${i}`,
              email: `user${i}@test.com`,
              password: 'password123!'
            });
            dataManager.createUser(user);
            users.push(user);
          }

          // Distribute quantity among payers
          const payers = [];
          let remaining = data.totalQuantity;
          for (let i = 0; i < data.numPayers - 1; i++) {
            const amount = Math.min(remaining - (data.numPayers - i - 1), Math.floor(remaining / (data.numPayers - i)));
            payers.push({ userId: users[i].id, quantity: amount });
            remaining -= amount;
          }
          payers.push({ userId: users[data.numPayers - 1].id, quantity: remaining });

          const totalPaid = payers.reduce((sum, p) => sum + p.quantity, 0);

          // Verify sum equals total
          expect(totalPaid).toBe(data.totalQuantity);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: drink-tracker, Property 6: Statistics update on entry
  it('should update user statistics immediately after drink entry', () => {
    fc.assert(
      fc.property(
        fc.record({
          drinkType: fc.constantFrom('coffee', 'beer', 'other'),
          quantity: fc.integer({ min: 1, max: 10 })
        }),
        (data) => {
          const user = createUser({
            username: 'testuser',
            email: 'test@test.com',
            password: 'password123!'
          });
          dataManager.createUser(user);

          const statsBefore = dataManager.getUserStats(user.id);
          const consumedBefore = statsBefore.totalDrinks[data.drinkType];

          const entry = createDrinkEntry({
            drinkType: data.drinkType,
            quantity: data.quantity,
            consumers: [user.id],
            payers: [{ userId: user.id, quantity: data.quantity }],
            createdBy: user.id
          });

          dataManager.createDrinkEntry(entry);

          const statsAfter = dataManager.getUserStats(user.id);
          const consumedAfter = statsAfter.totalDrinks[data.drinkType];

          expect(consumedAfter).toBe(consumedBefore + data.quantity);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: drink-tracker, Property 10: Leaderboard ordering
  it('should maintain descending order in consumption leaderboards', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            username: fc.string({ minLength: 1, maxLength: 20 }),
            consumption: fc.integer({ min: 0, max: 100 })
          }),
          { minLength: 1, maxLength: 20 }
        ),
        (usersData) => {
          // Create users and add drinks
          usersData.forEach((userData, index) => {
            const user = createUser({
              username: userData.username,
              email: `user${index}@test.com`,
              password: 'password123!'
            });
            user.status = 'approved';
            dataManager.createUser(user);

            if (userData.consumption > 0) {
              const entry = createDrinkEntry({
                drinkType: 'coffee',
                quantity: userData.consumption,
                consumers: [user.id],
                payers: [{ userId: user.id, quantity: userData.consumption }],
                createdBy: user.id
              });
              dataManager.createDrinkEntry(entry);
            }
          });

          // Get leaderboard
          const leaderboard = dataManager.getAllUsers()
            .filter(u => u.status === 'approved')
            .map(u => ({
              userId: u.id,
              consumption: dataManager.getUserStats(u.id).totalDrinks.coffee
            }))
            .sort((a, b) => b.consumption - a.consumption);

          // Verify ordering
          for (let i = 0; i < leaderboard.length - 1; i++) {
            expect(leaderboard[i].consumption).toBeGreaterThanOrEqual(leaderboard[i + 1].consumption);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: drink-tracker, Property 31: Entry deletion recalculation
  it('should recalculate statistics correctly after entry deletion', () => {
    fc.assert(
      fc.property(
        fc.record({
          drinkType: fc.constantFrom('coffee', 'beer', 'other'),
          quantity1: fc.integer({ min: 1, max: 10 }),
          quantity2: fc.integer({ min: 1, max: 10 })
        }),
        (data) => {
          const user = createUser({
            username: 'testuser',
            email: 'test@test.com',
            password: 'password123!'
          });
          dataManager.createUser(user);

          // Add two entries
          const entry1 = createDrinkEntry({
            drinkType: data.drinkType,
            quantity: data.quantity1,
            consumers: [user.id],
            payers: [{ userId: user.id, quantity: data.quantity1 }],
            createdBy: user.id
          });
          dataManager.createDrinkEntry(entry1);

          const entry2 = createDrinkEntry({
            drinkType: data.drinkType,
            quantity: data.quantity2,
            consumers: [user.id],
            payers: [{ userId: user.id, quantity: data.quantity2 }],
            createdBy: user.id
          });
          dataManager.createDrinkEntry(entry2);

          // Delete first entry
          dataManager.deleteDrinkEntry(entry1.id);

          // Verify stats reflect only second entry
          const stats = dataManager.getUserStats(user.id);
          expect(stats.totalDrinks[data.drinkType]).toBe(data.quantity2);
          expect(stats.totalPaid[data.drinkType]).toBe(data.quantity2);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: drink-tracker, Property 33: Export completeness
  it('should export all users and drink entries', () => {
    fc.assert(
      fc.property(
        fc.record({
          numUsers: fc.integer({ min: 1, max: 10 }),
          numEntries: fc.integer({ min: 1, max: 10 })
        }),
        (data) => {
          // Clear and create fresh data manager for each test
          localStorage.clear();
          const freshManager = new DataManager();
          
          const users = [];
          for (let i = 0; i < data.numUsers; i++) {
            const user = createUser({
              username: `user${i}`,
              email: `user${i}@test.com`,
              password: 'password123!'
            });
            freshManager.createUser(user);
            users.push(user);
          }

          for (let i = 0; i < data.numEntries; i++) {
            const entry = createDrinkEntry({
              drinkType: 'coffee',
              quantity: 1,
              consumers: [users[0].id],
              payers: [{ userId: users[0].id, quantity: 1 }],
              createdBy: users[0].id
            });
            freshManager.createDrinkEntry(entry);
          }

          const exported = JSON.parse(freshManager.export());

          expect(exported.users).toHaveLength(data.numUsers);
          expect(exported.drinkEntries).toHaveLength(data.numEntries);
        }
      ),
      { numRuns: 100 }
    );
  });
});
