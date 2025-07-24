# EuroPlast Website - Netlify Deployment Guide

This project is now configured for deployment on Netlify with demo data.

## Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=YOUR_GITHUB_REPO_URL)

## Manual Deployment Steps

1. **Fork/Clone this repository** to your GitHub account

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Netlify will auto-detect the build settings from `netlify.toml`

3. **Build Settings** (auto-configured):
   - Build command: `npm run build:netlify`
   - Publish directory: `dist/public`
   - Functions directory: `netlify/functions`

4. **Deploy:**
   - Click "Deploy site"
   - Your site will be available at a generated URL like `https://amazing-site-name.netlify.app`

## Features

✅ **Static Frontend** - React app built with Vite
✅ **Serverless API** - Netlify Functions handle all `/api/*` routes
✅ **Demo Data** - No database required, uses in-memory demo data
✅ **Full Functionality** - All pages and forms work (data is logged but not persisted)

## Project Structure for Netlify

```
├── client/                 # React frontend
├── netlify/
│   └── functions/
│       └── api.ts         # Single serverless function handling all API routes
├── server/
│   └── demo-storage.ts    # Demo data and storage logic
├── shared/                # Shared types and schemas
├── netlify.toml          # Netlify configuration
└── package.json          # Build scripts updated for Netlify
```

## Development

```bash
# Install dependencies
npm install

# Run locally (original full-stack mode)
npm run dev

# Build for Netlify
npm run build:netlify

# Test Netlify functions locally (requires Netlify CLI)
npx netlify dev
```

## API Endpoints

All API routes are handled by the single Netlify function at `/.netlify/functions/api/*`:

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `GET /api/industries` - Get all industries
- `GET /api/industries/:slug` - Get specific industry
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:slug` - Get specific blog post
- `GET /api/resources` - Get resources
- `GET /api/testimonials` - Get testimonials
- `POST /api/quote-request` - Submit quote request
- `POST /api/contact` - Submit contact form

## Demo Data

The site includes realistic demo data for:
- 2 sample products (PET trays, PP sheets)
- 1 industry (Food & Beverage)
- 1 blog post
- 1 resource document
- 1 customer testimonial

Forms work and log submissions to the function console, but data is not persisted.

## Going to Production

To use with a real database:

1. Replace `demo-storage.ts` with the original `storage.ts`
2. Set up your database (PostgreSQL recommended)
3. Add `DATABASE_URL` environment variable in Netlify dashboard
4. Run database migrations: `npm run db:push`

## Environment Variables

For demo: No environment variables needed.

For production with database:
- `DATABASE_URL` - PostgreSQL connection string

## Support

- The demo showcases all UI components and functionality
- Forms validate properly and show success messages
- All pages and navigation work correctly
- Responsive design works on all devices