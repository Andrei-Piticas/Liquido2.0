# Deployment Guide

## GitHub Pages Deployment

### Prerequisites
- GitHub repository
- GitHub Actions enabled

### Setup Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Drink Tracker app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/drink-tracker.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Under "Build and deployment", select "GitHub Actions" as source

3. **Automatic Deployment**
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
     - Run tests
     - Build the application
     - Deploy to GitHub Pages
   - Every push to `main` branch triggers deployment

4. **Access Your App**
   - URL: `https://YOUR_USERNAME.github.io/drink-tracker/`
   - May take a few minutes for first deployment

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the app
npm run build

# The dist/ folder contains your static site
# Upload contents to any static hosting service
```

### Custom Domain (Optional)

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update `base` in `vite.config.js` if needed

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

### Default Admin Account
- Email: `admin@drinktracker.com`
- Password: `Admin123!`

**⚠️ Important**: Change these credentials immediately after first deployment!

### Data Storage
- All data stored in browser LocalStorage
- No backend server required
- Users should export data regularly as backup

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for syntax errors: `npm test`

### GitHub Actions Fails
- Check Actions tab in GitHub repository
- Verify `package.json` scripts are correct
- Ensure all dependencies are listed

### App Not Loading
- Check browser console for errors
- Verify GitHub Pages is enabled
- Wait a few minutes after deployment
- Clear browser cache

## Security Notes

- All authentication happens client-side
- Passwords are hashed with bcrypt before storage
- No sensitive data leaves the browser
- Regular data exports recommended
- Consider adding authentication backend for production use

## Performance Optimization

- App uses lazy loading for components
- LocalStorage has ~5-10MB limit
- For large groups (50+ users), consider backend integration
- Export/import data to manage storage limits

## Future Enhancements

To add backend sync:
1. Set up Firebase/Supabase project
2. Replace LocalStorage calls with API calls
3. Add real-time sync functionality
4. Implement proper authentication

## Support

For issues or questions:
- Check README.md for documentation
- Review property-based tests for expected behavior
- Open an issue on GitHub repository
