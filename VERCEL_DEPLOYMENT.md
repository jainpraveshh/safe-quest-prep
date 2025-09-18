# 🚀 Vercel Deployment Guide for EduShield

This guide will walk you through deploying your EduShield application to Vercel with all the necessary configurations.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Supabase project set up
- Node.js 18+ installed locally

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push to GitHub**
   ```bash
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit: EduShield disaster preparedness platform"
   
   # Create GitHub repository and push
   git remote add origin https://github.com/your-username/edushield.git
   git branch -M main
   git push -u origin main
   ```

2. **Verify Build Locally**
   ```bash
   # Test production build
   npm run build:prod
   
   # Test preview
   npm run preview:prod
   ```

### Step 2: Deploy to Vercel

#### Option A: GitHub Integration (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"

2. **Import Repository**
   - Select your EduShield repository
   - Click "Import"

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following variables:
   
   ```
   VITE_SUPABASE_URL = your_supabase_project_url
   VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
   VITE_APP_NAME = EduShield
   VITE_APP_VERSION = 1.0.0
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Option B: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   # Navigate to your project
   cd safe-quest-prep
   
   # Deploy to Vercel
   vercel
   
   # Follow the prompts:
   # - Link to existing project? No
   # - Project name: edushield
   # - Directory: ./
   # - Override settings? No
   ```

4. **Set Environment Variables**
   ```bash
   # Set Supabase URL
   vercel env add VITE_SUPABASE_URL
   # Enter your Supabase project URL
   
   # Set Supabase Anon Key
   vercel env add VITE_SUPABASE_ANON_KEY
   # Enter your Supabase anon key
   
   # Set App Name
   vercel env add VITE_APP_NAME
   # Enter: EduShield
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

### Step 3: Configure Supabase

1. **Update Supabase Settings**
   - Go to your Supabase project dashboard
   - Navigate to Authentication → Settings
   - Update Site URL: `https://your-project.vercel.app`
   - Add Redirect URLs:
     - `https://your-project.vercel.app`
     - `https://your-project.vercel.app/auth/callback`

2. **Configure Email Settings**
   - Go to Authentication → Settings → Email
   - Update email templates if needed
   - Configure SMTP settings for production emails

3. **Database Security**
   - Ensure RLS policies are enabled
   - Test authentication flow
   - Verify profile creation works

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your domain (e.g., `edushield.in`)
   - Configure DNS records as instructed

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - Your site will be available at `https://yourdomain.com`

## 🔧 Vercel Configuration Files

### vercel.json (Optional)
```json
{
  "buildCommand": "npm run build:prod",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Environment Variables Checklist
```
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_ANON_KEY
✅ VITE_APP_NAME
✅ VITE_APP_VERSION
✅ NODE_ENV=production
```

## 🧪 Testing Deployment

### 1. Test Authentication
- Visit your deployed URL
- Try creating a new account
- Test login functionality
- Verify email confirmation (if enabled)

### 2. Test Core Features
- Age group selection
- Disaster modules
- Quiz functionality
- Emergency tools
- Mobile responsiveness

### 3. Performance Testing
- Check Core Web Vitals
- Test loading speeds
- Verify offline functionality
- Test on different devices

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build logs in Vercel dashboard
# Common fixes:
npm run build:prod  # Test locally first
npm install         # Ensure dependencies are installed
```

#### Environment Variables Not Working
```bash
# Verify variables are set correctly
vercel env ls
# Redeploy after adding variables
vercel --prod
```

#### Authentication Issues
- Check Supabase URL and keys
- Verify redirect URLs in Supabase
- Check browser console for errors
- Test with different email providers

#### Database Connection Issues
- Verify Supabase project is active
- Check RLS policies
- Test database queries in Supabase dashboard

### Debug Commands
```bash
# Check Vercel deployment status
vercel ls

# View deployment logs
vercel logs

# Redeploy with debug info
vercel --prod --debug
```

## 📊 Monitoring & Analytics

### Vercel Analytics
1. **Enable Vercel Analytics**
   - Go to Project Settings → Analytics
   - Enable Web Analytics
   - Monitor Core Web Vitals

2. **Performance Monitoring**
   - Check deployment metrics
   - Monitor build times
   - Track user engagement

### Supabase Monitoring
1. **Database Performance**
   - Monitor query performance
   - Check connection limits
   - Review error logs

2. **Authentication Metrics**
   - Track signup/login rates
   - Monitor email delivery
   - Check security events

## 🔄 Continuous Deployment

### Automatic Deployments
- Every push to `main` branch triggers deployment
- Preview deployments for pull requests
- Automatic rollback on build failures

### Manual Deployments
```bash
# Deploy specific branch
vercel --prod --target production

# Deploy with specific environment
vercel --prod --env production
```

## 🎯 Production Checklist

### Before Going Live
- [ ] Environment variables configured
- [ ] Supabase settings updated
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Authentication flow tested
- [ ] Database migrations applied
- [ ] Performance optimized
- [ ] Error monitoring set up

### Post-Deployment
- [ ] Test all user flows
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify email functionality
- [ ] Test on mobile devices
- [ ] Set up monitoring alerts

## 🚀 Advanced Configuration

### Edge Functions (Optional)
```javascript
// api/health.js
export default function handler(req, res) {
  res.status(200).json({ status: 'healthy' });
}
```

### Redirects Configuration
```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

### Headers Configuration
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)

### EduShield Support
- Check project documentation
- Review GitHub issues
- Contact development team

---

## 🎉 Success!

Your EduShield application is now deployed on Vercel! 

**Next Steps:**
1. Test all functionality
2. Set up monitoring
3. Configure custom domain (optional)
4. Share with users
5. Monitor performance and usage

**Your app is live at:** `https://your-project.vercel.app`

Happy learning with EduShield! 🛡️
