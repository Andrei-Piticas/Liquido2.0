# Requirements Document

## Introduction

The Drink Tracker is a social web application designed for university friend groups to track and gamify their coffee, beer, and other beverage consumption. The system enables users to log drinks, track who pays, view leaderboards, earn badges, and see entertaining statistics about their consumption habits. The application will be deployed as a static website on GitHub Pages with zero hosting costs, using client-side storage and optional backend services.

## Glossary

- **Drink Tracker System**: The complete web application including frontend, data storage, and user interface
- **User**: A member of the friend group who has registered and been approved to use the system
- **Admin**: The system administrator who approves new user registrations
- **Drink Entry**: A record of one or more beverages consumed, including type, quantity, consumers, and payers
- **Payer**: A user who paid for drinks in a specific entry
- **Consumer**: A user who consumed drinks in a specific entry
- **Split Payment**: A drink entry where multiple users contributed payment in different amounts
- **Leaderboard**: A ranked list of users based on specific metrics
- **Badge**: An achievement award given to users for meeting specific criteria
- **Profile**: A user's personal page containing their statistics, badges, and settings
- **Drink Type**: A category of beverage (coffee, beer, or other drinks)

## Requirements

### Requirement 1: User Registration and Authentication

**User Story:** As a new user, I want to register for an account and wait for admin approval, so that only approved friends can access the drink tracking system.

#### Acceptance Criteria

1. WHEN a new user visits the registration page, THE Drink Tracker System SHALL display a registration form requesting username, email, password, and profile picture
2. WHEN a user submits the registration form with valid data, THE Drink Tracker System SHALL create a pending account and notify the user that approval is required
3. WHEN a user attempts to log in with a pending account, THE Drink Tracker System SHALL display a message indicating the account is awaiting admin approval
4. WHEN the admin views pending registrations, THE Drink Tracker System SHALL display all pending accounts with user details
5. WHEN the admin approves a pending account, THE Drink Tracker System SHALL activate the account and allow the user to log in

### Requirement 2: Quick Drink Entry

**User Story:** As a user, I want to quickly add drink entries with consumer and payer information, so that I can log our group's beverage consumption efficiently.

#### Acceptance Criteria

1. WHEN a user accesses the drink entry interface, THE Drink Tracker System SHALL display quick-add buttons for coffee, beer, and other drinks
2. WHEN a user selects a drink type, THE Drink Tracker System SHALL prompt for quantity, consumers, and payer information
3. WHEN a user adds a drink entry with a single payer, THE Drink Tracker System SHALL record the entry with the specified payer and consumers
4. WHEN a user submits a drink entry, THE Drink Tracker System SHALL timestamp the entry and save it to storage
5. WHEN a drink entry is saved, THE Drink Tracker System SHALL update all relevant user statistics immediately

### Requirement 3: Split Payment Support

**User Story:** As a user, I want to record drink entries where multiple people paid different amounts, so that I can accurately track complex payment scenarios.

#### Acceptance Criteria

1. WHEN a user enables split payment mode, THE Drink Tracker System SHALL display an interface to add multiple payers
2. WHEN a user adds multiple payers, THE Drink Tracker System SHALL allow specifying the number of drinks each payer covered
3. WHEN a user submits a split payment entry, THE Drink Tracker System SHALL validate that the sum of paid drinks equals the total quantity
4. WHEN a split payment entry is saved, THE Drink Tracker System SHALL attribute the correct payment amounts to each payer
5. WHEN displaying split payment entries, THE Drink Tracker System SHALL show all payers and their respective contributions

### Requirement 4: Consumption Leaderboards

**User Story:** As a user, I want to view leaderboards showing top consumers by drink type, so that I can see who drinks the most coffee, beer, or other beverages.

#### Acceptance Criteria

1. WHEN a user views the leaderboard page, THE Drink Tracker System SHALL display separate leaderboards for coffee, beer, and other drinks
2. WHEN displaying a consumption leaderboard, THE Drink Tracker System SHALL rank users by total quantity consumed in descending order
3. WHEN a user's consumption changes, THE Drink Tracker System SHALL update the leaderboard rankings immediately
4. WHEN displaying leaderboard entries, THE Drink Tracker System SHALL show username, profile picture, and total quantity consumed
5. WHEN a user views the leaderboard, THE Drink Tracker System SHALL highlight the current user's position

### Requirement 5: Payment Leaderboards

**User Story:** As a user, I want to view leaderboards showing who pays most often and who consumes without paying, so that we can track generosity and freeloading in our group.

#### Acceptance Criteria

1. WHEN a user views the payment leaderboard, THE Drink Tracker System SHALL display a ranking of users by total drinks paid for
2. WHEN a user views the freeloader leaderboard, THE Drink Tracker System SHALL display users ranked by the ratio of drinks consumed to drinks paid for
3. WHEN calculating freeloader rankings, THE Drink Tracker System SHALL exclude users who have paid for at least as many drinks as they consumed
4. WHEN displaying payment statistics, THE Drink Tracker System SHALL show both absolute numbers and percentages
5. WHEN a user has never paid for drinks, THE Drink Tracker System SHALL mark them with a special indicator on the freeloader leaderboard

### Requirement 6: Fun Statistics and Comparisons

**User Story:** As a user, I want to see entertaining comparisons of our consumption, so that I can understand the scale of our drinking habits in relatable terms.

#### Acceptance Criteria

1. WHEN a user views statistics, THE Drink Tracker System SHALL display total money spent with comparisons to purchasable items
2. WHEN displaying volume statistics, THE Drink Tracker System SHALL convert total beverage volume to relatable comparisons
3. WHEN calculating comparisons, THE Drink Tracker System SHALL use realistic pricing and volume data
4. WHEN a user views group statistics, THE Drink Tracker System SHALL display creative comparisons such as "enough water to plant X baobab trees"
5. WHEN statistics are updated, THE Drink Tracker System SHALL recalculate all comparisons automatically

### Requirement 7: Achievement Badges

**User Story:** As a user, I want to earn badges for completing challenges, so that I can showcase my achievements and compete with friends.

#### Acceptance Criteria

1. WHEN a user meets badge criteria, THE Drink Tracker System SHALL automatically award the badge and notify the user
2. WHEN a user views their profile, THE Drink Tracker System SHALL display all earned badges with unlock dates
3. WHEN a user views available badges, THE Drink Tracker System SHALL show locked badges with unlock requirements
4. WHEN a badge is awarded, THE Drink Tracker System SHALL record the timestamp and display it on the badge
5. WHEN displaying badges, THE Drink Tracker System SHALL show badge icons, names, descriptions, and rarity levels

### Requirement 8: User Profiles

**User Story:** As a user, I want to customize my profile with pictures and view my personal statistics, so that I can personalize my experience and track my own progress.

#### Acceptance Criteria

1. WHEN a user accesses profile settings, THE Drink Tracker System SHALL allow updating username, email, password, and profile picture
2. WHEN a user uploads a profile picture, THE Drink Tracker System SHALL validate the image format and size
3. WHEN a user views their profile, THE Drink Tracker System SHALL display personal statistics including total drinks consumed, paid for, and by type
4. WHEN a user views their profile, THE Drink Tracker System SHALL display their earned badges and current rankings
5. WHEN a user updates profile information, THE Drink Tracker System SHALL save changes and update all displays immediately

### Requirement 9: Admin Dashboard

**User Story:** As an admin, I want to manage user accounts and moderate content, so that I can maintain control over who accesses the system.

#### Acceptance Criteria

1. WHEN the admin logs in, THE Drink Tracker System SHALL display an admin dashboard with management options
2. WHEN the admin views user management, THE Drink Tracker System SHALL display all users with their status and statistics
3. WHEN the admin approves or rejects a pending user, THE Drink Tracker System SHALL update the user status immediately
4. WHEN the admin views drink entries, THE Drink Tracker System SHALL allow editing or deleting incorrect entries
5. WHEN the admin deletes a drink entry, THE Drink Tracker System SHALL recalculate all affected statistics and leaderboards

### Requirement 10: Data Persistence and Export

**User Story:** As a user, I want my data to be saved reliably and exportable, so that I don't lose tracking history and can analyze data externally.

#### Acceptance Criteria

1. WHEN a user makes any data change, THE Drink Tracker System SHALL persist the change to browser local storage immediately
2. WHEN a user accesses the export feature, THE Drink Tracker System SHALL generate a downloadable JSON file with all data
3. WHEN a user imports a data file, THE Drink Tracker System SHALL validate the format and merge with existing data
4. WHEN data is corrupted or missing, THE Drink Tracker System SHALL display an error message and prevent data loss
5. WHEN the system detects data conflicts, THE Drink Tracker System SHALL prompt the user to resolve conflicts manually

### Requirement 11: Responsive Design and Mobile Support

**User Story:** As a user, I want to use the app on my phone during social gatherings, so that I can quickly log drinks without needing a computer.

#### Acceptance Criteria

1. WHEN a user accesses the website on a mobile device, THE Drink Tracker System SHALL display a mobile-optimized interface
2. WHEN a user interacts with touch controls, THE Drink Tracker System SHALL respond with appropriate touch feedback
3. WHEN the screen size changes, THE Drink Tracker System SHALL adapt the layout without losing functionality
4. WHEN a user adds drinks on mobile, THE Drink Tracker System SHALL provide large, easy-to-tap buttons
5. WHEN viewing leaderboards on mobile, THE Drink Tracker System SHALL display condensed information that fits the screen

### Requirement 12: Real-time Notifications

**User Story:** As a user, I want to receive notifications when I earn badges or when someone pays for my drinks, so that I stay engaged with the app.

#### Acceptance Criteria

1. WHEN a user earns a badge, THE Drink Tracker System SHALL display a celebratory notification with the badge details
2. WHEN a user is added as a consumer in a drink entry, THE Drink Tracker System SHALL show a notification indicating who paid
3. WHEN a user achieves a leaderboard milestone, THE Drink Tracker System SHALL display a notification with their new rank
4. WHEN displaying notifications, THE Drink Tracker System SHALL use non-intrusive toast messages that auto-dismiss
5. WHEN a user dismisses a notification, THE Drink Tracker System SHALL mark it as read and not show it again

### Requirement 13: Historical Data and Trends

**User Story:** As a user, I want to view historical trends of our drinking habits, so that I can see patterns over time.

#### Acceptance Criteria

1. WHEN a user views the trends page, THE Drink Tracker System SHALL display consumption graphs by day, week, and month
2. WHEN displaying trends, THE Drink Tracker System SHALL show separate lines for coffee, beer, and other drinks
3. WHEN a user selects a time range, THE Drink Tracker System SHALL filter the trend data to that period
4. WHEN displaying historical data, THE Drink Tracker System SHALL show peak consumption days and times
5. WHEN a user views personal trends, THE Drink Tracker System SHALL compare their consumption to group averages

### Requirement 14: GitHub Pages Deployment

**User Story:** As a developer, I want to deploy the app on GitHub Pages with zero costs, so that the app is freely accessible without ongoing expenses.

#### Acceptance Criteria

1. WHEN the application is built, THE Drink Tracker System SHALL generate static HTML, CSS, and JavaScript files
2. WHEN deployed to GitHub Pages, THE Drink Tracker System SHALL function entirely client-side without server dependencies
3. WHEN a user accesses the GitHub Pages URL, THE Drink Tracker System SHALL load and function correctly
4. WHEN using client-side storage, THE Drink Tracker System SHALL store all data in browser local storage or IndexedDB
5. WHEN the repository is updated, THE Drink Tracker System SHALL automatically redeploy via GitHub Actions
