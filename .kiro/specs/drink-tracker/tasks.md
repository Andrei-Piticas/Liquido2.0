# Implementation Plan

- [x] 1. Set up project structure and build configuration
  - Initialize Vite project with vanilla JavaScript
  - Configure build scripts for development and production
  - Set up directory structure (components, core, data, utils)
  - Create index.html with basic layout structure
  - Configure GitHub Actions workflow for deployment
  - _Requirements: 14.1, 14.5_

- [ ] 2. Implement data models and storage layer
  - Create data model interfaces for User, DrinkEntry, Badge, and Statistics
  - Implement LocalStorage wrapper with save/load functionality
  - Add data validation functions for all models
  - Implement UUID generation for entity IDs
  - _Requirements: 10.1_

- [-] 2.1 Write property test for data persistence
  - **Property 32: Data persistence**
  - **Validates: Requirements 10.1**

- [ ] 3. Implement authentication system
  - Create password hashing utility using bcrypt.js
  - Implement user registration with validation
  - Implement login/logout functionality
  - Add session management using LocalStorage
  - Implement admin check functionality
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 3.1 Write property test for registration
  - **Property 1: Registration creates pending accounts**
  - **Validates: Requirements 1.2**

- [ ] 3.2 Write property test for pending login
  - **Property 2: Pending accounts cannot log in**
  - **Validates: Requirements 1.3**

- [ ] 3.3 Write property test for approval
  - **Property 4: Approval enables login**
  - **Validates: Requirements 1.5**

- [ ] 4. Build registration and login UI components
  - Create registration form with username, email, password, and profile picture upload
  - Create login form with email and password fields
  - Add form validation with inline error messages
  - Implement profile picture preview
  - Add pending approval message display
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 4.1 Write unit tests for form validation
  - Test email format validation
  - Test password strength validation
  - Test empty field handling
  - _Requirements: 1.1_

- [ ] 5. Implement admin approval system
  - Create admin dashboard component
  - Build pending users list view
  - Add approve/reject buttons with confirmation
  - Implement user status update logic
  - Add notification for approved users
  - _Requirements: 1.4, 1.5, 9.1, 9.2, 9.3_

- [ ] 5.1 Write property test for admin pending list
  - **Property 3: Admin view shows all pending users**
  - **Validates: Requirements 1.4**

- [ ] 5.2 Write property test for admin status update
  - **Property 30: Admin status update**
  - **Validates: Requirements 9.3**

- [ ] 6. Create drink entry system
  - Build quick-add interface with coffee, beer, and other drink buttons
  - Create drink entry form with quantity, consumers, and payer selection
  - Implement single payer entry logic
  - Add timestamp generation on entry creation
  - Implement entry save functionality
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 6.1 Write property test for drink entry persistence
  - **Property 5: Drink entry persistence**
  - **Validates: Requirements 2.3, 2.4**

- [ ] 7. Implement split payment functionality
  - Add split payment mode toggle
  - Create multi-payer interface with quantity inputs
  - Implement split payment validation (sum equals total)
  - Add payer contribution tracking
  - Update entry display to show all payers
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 7.1 Write property test for split payment validation
  - **Property 7: Split payment sum validation**
  - **Validates: Requirements 3.3**

- [ ] 7.2 Write property test for split payment attribution
  - **Property 8: Split payment attribution**
  - **Validates: Requirements 3.4**

- [ ] 7.3 Write property test for split payment display
  - **Property 9: Split payment display completeness**
  - **Validates: Requirements 3.5**

- [ ] 8. Build statistics calculation engine
  - Implement user statistics aggregation (total drinks by type)
  - Calculate payment statistics (total paid by type)
  - Compute payment ratio (paid / consumed)
  - Add statistics update on entry save
  - Implement statistics caching for performance
  - _Requirements: 2.5, 8.3_

- [ ] 8.1 Write property test for statistics update
  - **Property 6: Statistics update on entry**
  - **Validates: Requirements 2.5**

- [ ] 8.2 Write property test for profile statistics display
  - **Property 26: Profile statistics display**
  - **Validates: Requirements 8.3**

- [ ] 9. Implement leaderboard system
  - Create consumption leaderboard calculation (by drink type)
  - Implement payment leaderboard calculation
  - Build freeloader leaderboard with filtering
  - Add leaderboard sorting logic
  - Implement current user highlighting
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3_

- [ ] 9.1 Write property test for consumption leaderboard ordering
  - **Property 10: Leaderboard ordering**
  - **Validates: Requirements 4.2**

- [ ] 9.2 Write property test for leaderboard consistency
  - **Property 11: Leaderboard consistency**
  - **Validates: Requirements 4.3**

- [ ] 9.3 Write property test for payment leaderboard ordering
  - **Property 13: Payment leaderboard ordering**
  - **Validates: Requirements 5.1**

- [ ] 9.4 Write property test for freeloader ordering
  - **Property 14: Freeloader leaderboard ordering**
  - **Validates: Requirements 5.2**

- [ ] 9.5 Write property test for freeloader filtering
  - **Property 15: Freeloader filtering**
  - **Validates: Requirements 5.3**

- [ ] 10. Create leaderboard UI components
  - Build leaderboard page with tabs for different types
  - Create leaderboard entry cards with user info
  - Add profile picture display in leaderboard entries
  - Implement current user highlighting style
  - Display absolute numbers and percentages
  - _Requirements: 4.1, 4.4, 4.5, 5.4_

- [ ] 10.1 Write property test for leaderboard entry completeness
  - **Property 12: Leaderboard entry completeness**
  - **Validates: Requirements 4.4**

- [ ] 10.2 Write property test for payment statistics display
  - **Property 16: Payment statistics display**
  - **Validates: Requirements 5.4**

- [ ] 11. Implement fun statistics and comparisons
  - Create money-to-items comparison calculator
  - Implement volume-to-comparisons converter (baobab trees, etc.)
  - Add creative comparison templates
  - Build statistics display component
  - Implement automatic recalculation on data changes
  - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [ ] 11.1 Write property test for statistics comparison display
  - **Property 17: Statistics comparison display**
  - **Validates: Requirements 6.1**

- [ ] 11.2 Write property test for volume conversion
  - **Property 18: Volume conversion accuracy**
  - **Validates: Requirements 6.2**

- [ ] 11.3 Write property test for statistics recalculation
  - **Property 19: Statistics recalculation**
  - **Validates: Requirements 6.5**

- [ ] 12. Create badge system
  - Define badge criteria and metadata
  - Implement badge checking logic
  - Add automatic badge awarding on data changes
  - Create badge progress calculation
  - Implement badge timestamp recording
  - _Requirements: 7.1, 7.4_

- [ ] 12.1 Write property test for badge auto-award
  - **Property 20: Badge auto-award**
  - **Validates: Requirements 7.1**

- [ ] 12.2 Write property test for badge timestamp
  - **Property 23: Badge timestamp recording**
  - **Validates: Requirements 7.4**

- [ ] 13. Build badge UI components
  - Create badge display component with icon, name, description
  - Build earned badges section for profile
  - Create locked badges view with requirements
  - Add badge unlock notification
  - Display badge rarity levels with styling
  - _Requirements: 7.2, 7.3, 7.5_

- [ ] 13.1 Write property test for badge display completeness
  - **Property 21: Badge display completeness**
  - **Validates: Requirements 7.2**

- [ ] 13.2 Write property test for locked badge display
  - **Property 22: Locked badge requirements display**
  - **Validates: Requirements 7.3**

- [ ] 13.3 Write property test for badge field completeness
  - **Property 24: Badge field completeness**
  - **Validates: Requirements 7.5**

- [ ] 14. Implement user profile system
  - Create profile page component
  - Build profile settings form
  - Implement profile picture upload with validation
  - Add profile update logic with persistence
  - Display personal statistics on profile
  - Show earned badges and rankings on profile
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 14.1 Write property test for image validation
  - **Property 25: Image validation**
  - **Validates: Requirements 8.2**

- [ ] 14.2 Write property test for profile update persistence
  - **Property 28: Profile update persistence**
  - **Validates: Requirements 8.5**

- [ ] 14.3 Write property test for profile badges display
  - **Property 27: Profile badges and rankings display**
  - **Validates: Requirements 8.4**

- [ ] 15. Build admin management features
  - Create admin user management view
  - Add user list with status and statistics
  - Implement drink entry management (view, edit, delete)
  - Add entry deletion with statistics recalculation
  - Create admin action logging
  - _Requirements: 9.1, 9.2, 9.4, 9.5_

- [ ] 15.1 Write property test for admin user list
  - **Property 29: Admin user list completeness**
  - **Validates: Requirements 9.2**

- [ ] 15.2 Write property test for entry deletion recalculation
  - **Property 31: Entry deletion recalculation**
  - **Validates: Requirements 9.5**

- [ ] 16. Implement data export and import
  - Create export functionality to generate JSON file
  - Add download trigger for export file
  - Implement import file validation
  - Build data merge logic for imports
  - Add conflict resolution UI
  - Handle corrupted data with error messages
  - _Requirements: 10.2, 10.3, 10.4, 10.5_

- [ ] 16.1 Write property test for export completeness
  - **Property 33: Export completeness**
  - **Validates: Requirements 10.2**

- [ ] 16.2 Write property test for import validation
  - **Property 34: Import validation and merge**
  - **Validates: Requirements 10.3**

- [ ] 17. Create notification system
  - Implement toast notification component
  - Add notification queue management
  - Create auto-dismiss timer
  - Implement notification dismissal with persistence
  - Add badge award notifications
  - Create consumer notifications for drink entries
  - Add milestone notifications for leaderboard achievements
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 17.1 Write property test for badge notification
  - **Property 38: Badge notification display**
  - **Validates: Requirements 12.1**

- [ ] 17.2 Write property test for consumer notification
  - **Property 39: Consumer notification display**
  - **Validates: Requirements 12.2**

- [ ] 17.3 Write property test for milestone notification
  - **Property 40: Milestone notification display**
  - **Validates: Requirements 12.3**

- [ ] 17.4 Write property test for notification auto-dismiss
  - **Property 41: Notification auto-dismiss**
  - **Validates: Requirements 12.4**

- [ ] 17.5 Write property test for notification dismissal
  - **Property 42: Notification dismissal persistence**
  - **Validates: Requirements 12.5**

- [ ] 18. Build historical trends system
  - Implement trend data aggregation by time period
  - Create graph data generation for day/week/month views
  - Add time range filtering
  - Calculate peak consumption days and times
  - Implement personal vs group average comparison
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 18.1 Write property test for trend data separation
  - **Property 43: Trend data separation**
  - **Validates: Requirements 13.2**

- [ ] 18.2 Write property test for trend filtering
  - **Property 44: Trend filtering**
  - **Validates: Requirements 13.3**

- [ ] 18.3 Write property test for peak identification
  - **Property 45: Peak identification**
  - **Validates: Requirements 13.4**

- [ ] 18.4 Write property test for personal comparison
  - **Property 46: Personal vs group comparison**
  - **Validates: Requirements 13.5**

- [ ] 19. Create trends visualization UI
  - Build trends page component
  - Implement chart rendering (using Chart.js or similar)
  - Add time range selector
  - Create separate lines for drink types
  - Display peak consumption highlights
  - _Requirements: 13.1, 13.2_

- [ ] 20. Implement responsive design
  - Create mobile-optimized CSS with media queries
  - Implement responsive navigation
  - Add touch-friendly button sizing (44x44px minimum)
  - Create mobile leaderboard layout
  - Test and adjust layouts for various screen sizes
  - _Requirements: 11.1, 11.3, 11.4, 11.5_

- [ ] 20.1 Write property test for responsive layout
  - **Property 35: Responsive layout adaptation**
  - **Validates: Requirements 11.1, 11.3**

- [ ] 20.2 Write property test for mobile button sizing
  - **Property 36: Mobile button sizing**
  - **Validates: Requirements 11.4**

- [ ] 20.3 Write property test for mobile leaderboard display
  - **Property 37: Mobile leaderboard display**
  - **Validates: Requirements 11.5**

- [ ] 21. Add client-side security measures
  - Implement input sanitization for XSS prevention
  - Add Content Security Policy meta tags
  - Validate all user inputs before processing
  - Ensure no external server requests in production
  - Verify LocalStorage-only data storage
  - _Requirements: 14.2, 14.4_

- [ ] 21.1 Write property test for client-side operation
  - **Property 47: Client-side operation**
  - **Validates: Requirements 14.2**

- [ ] 21.2 Write property test for LocalStorage usage
  - **Property 48: LocalStorage usage**
  - **Validates: Requirements 14.4**

- [ ] 22. Create main application shell
  - Build app router for navigation
  - Create main layout with header and navigation
  - Implement route guards for authentication
  - Add admin route protection
  - Create 404 page for invalid routes
  - Wire all components together
  - _Requirements: All_

- [ ] 23. Style and polish UI
  - Create consistent color scheme and typography
  - Add animations and transitions
  - Implement loading states
  - Add empty states for lists
  - Create error state displays
  - Polish mobile experience
  - _Requirements: 11.1, 11.2_

- [ ] 24. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 25. Create documentation and README
  - Write comprehensive README with setup instructions
  - Document data models and API
  - Add user guide for features
  - Create admin guide
  - Document deployment process
  - Add troubleshooting section
  - _Requirements: All_

- [ ] 26. Final testing and deployment
  - Run full test suite
  - Test on multiple browsers
  - Test on mobile devices
  - Verify GitHub Actions workflow
  - Deploy to GitHub Pages
  - Test production deployment
  - _Requirements: 14.1, 14.3, 14.5_
