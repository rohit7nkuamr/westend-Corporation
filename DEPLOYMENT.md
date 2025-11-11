# Deploy Westend Corporation to Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Accept default settings
   - Your site will be deployed!

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub (Recommended for continuous deployment)

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Westend Corporation website"
   ```

2. **Create GitHub Repository**
   - Go to https://github.com/new
   - Create a new repository named "wesrend" or "westend-corporation"
   - Don't initialize with README (you already have files)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/wesrend.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

### Option 3: Deploy via Vercel Dashboard (Easiest)

1. **Create a ZIP file** of your project folder

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Drag and drop your project folder

3. **Configure (if needed)**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Click Deploy**

## Environment Variables (if needed in future)
If you add any API keys or secrets later:
- Go to Project Settings → Environment Variables
- Add your variables
- Redeploy

## Custom Domain (Optional)
1. Go to your project on Vercel
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Automatic Deployments
Once connected to GitHub:
- Every push to `main` branch = Production deployment
- Every pull request = Preview deployment

## Your Site URLs
After deployment, you'll get:
- Production: `https://wesrend.vercel.app` (or your custom domain)
- Preview URLs for each deployment

## Troubleshooting

### Build Fails
- Check that all dependencies are in package.json
- Ensure Node version compatibility (Vercel uses Node 18 by default)

### Routes Not Working
- The `vercel.json` file handles SPA routing
- All routes redirect to index.html for React Router

### Images Not Loading
- Ensure all image URLs are absolute or properly imported
- Check Unsplash URLs are accessible

## Support
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

**Quick Deploy Command:**
```bash
npx vercel
```

That's it! Your Westend Corporation website will be live! 🚀
