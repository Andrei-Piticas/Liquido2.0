# 🍺 Drink Tracker

A social web application for university friend groups to track and gamify their coffee, beer, and beverage consumption. Built with vanilla JavaScript and deployed on GitHub Pages with zero hosting costs.

## Features

- 👥 **User Management**: Registration with admin approval system
- ☕ **Quick Drink Entry**: Fast logging of coffee, beer, and other beverages
- 💰 **Split Payments**: Track complex payment scenarios with multiple payers
- 🏆 **Leaderboards**: Consumption rankings, most generous, and freeloader boards
- 🎖️ **Achievement Badges**: Unlock badges for reaching milestones
- 📊 **Fun Statistics**: Creative comparisons of consumption and spending
- 📈 **Trends**: Visualize drinking patterns over time
- 📱 **Mobile Responsive**: Optimized for on-the-go drink logging
- 💾 **Client-Side Storage**: All data stored locally in browser
- 📤 **Export/Import**: Download and backup your data

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/drink-tracker.git
cd drink-tracker

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Default Admin Account

On first launch, a default admin account is created:
- **Email**: admin@drinktracker.com
- **Password**: Admin123!

**Important**: Change these credentials immediately after first login!

## Usage

### For Users

1. **Register**: Create an account with username, email, password, and optional profile picture
2. **Wait for Approval**: Admin must approve your account before you can log in
3. **Add Drinks**: Use quick-add buttons or detailed form to log beverages
4. **Track Stats**: View your personal statistics and earned badges
5. **Compete**: Check leaderboards to see rankings

### For Admins

1. **Approve Users**: Review and approve pending registrations
2. **Manage Entries**: Edit or delete incorrect drink entries
3. **Monitor Activity**: View all users and their statistics

## Architecture

### Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with responsive design
- **Storage**: Browser LocalStorage
- **Build Tool**: Vite
- **Testing**: Vitest + fast-check (property-based testing)
- **Deployment**: GitHub Pages via GitHub Actions

### Project Structure

```
src/
├── components/       # UI components
│   ├── auth/        # Login, registration
│   ├── dashboard/   # Main drink entry interface
│   ├── leaderboards/# Ranking displays
│   ├── profile/     # User profiles
│   ├── admin/       # Admin dashboard
│   ├── stats/       # Statistics page
│   └── common/      # Shared components
├── core/            # Business logic
│   ├── auth.js      # Authentication
│   ├── drinks.js    # Drink management
│   ├── leaderboards.js # Rankings
│   ├── badges.js    # Achievement system
│   └── stats.js     # Statistics calculations
├── data/            # Data layer
│   ├── storage.js   # LocalStorage wrapper
│   ├── models.js    # Data models
│   └── storage.test.js # Property tests
├── utils/           # Utilities
│   ├── formatting.js
│   ├── validation.js
│   └── notifications.js
├── styles/          # CSS
└── main.js          # Entry point
```

## Deployment

### GitHub Pages

The app automatically deploys to GitHub Pages when you push to the main branch.

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch
4. Access at `https://yourusername.github.io/drink-tracker/`

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to any static hosting service
```

## Testing

The project includes comprehensive property-based tests using fast-check:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Property-Based Testing

Tests verify universal properties across all inputs:
- Data persistence
- Split payment validation
- Statistics calculations
- Leaderboard ordering
- Entry deletion recalculation

## Data Privacy

- All data stored locally in browser LocalStorage
- No external servers or analytics
- Export your data anytime as JSON
- Clear data by clearing browser storage

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

MIT License - feel free to use for your own friend groups!

## Troubleshooting

### LocalStorage Full

If you see storage errors:
1. Export your data
2. Clear browser storage
3. Import data back

### Can't Log In

- Ensure your account is approved by admin
- Check browser console for errors
- Try clearing cookies and cache

### Missing Data

- Data is stored per-browser
- Use export/import to transfer between devices
- Check browser's LocalStorage isn't disabled

## Future Enhancements

- Real-time sync across devices (Firebase/Supabase)
- PWA support for offline usage
- Advanced analytics and charts
- Group challenges and competitions
- Multi-language support
- Dark mode theme

## Credits

Built with ❤️ for tracking drinks with friends!
