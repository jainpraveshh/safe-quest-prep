# 🛡️ EduShield - Disaster Preparedness Education Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/edushield)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

> **EduShield** is a comprehensive disaster preparedness education platform designed specifically for students in India. Learn earthquake safety, fire emergency protocols, flood response, and cyclone preparedness through interactive simulations, gamified learning, and virtual drills.

## 🌟 Features

### 🎯 **Age-Appropriate Learning**
- **Kids UI** (Primary school, 5-10 years)
- **Middle School UI** (11-14 years) 
- **High School UI** (15-18 years)
- **Adults UI** (Teachers/Administrators)

### 🚨 **Disaster Preparedness Modules**
- **🌍 Earthquakes** - Safety protocols and response procedures
- **🔥 Fire Emergencies** - Evacuation routes and safety measures
- **🌊 Floods** - Water safety and emergency preparedness
- **🌪️ Cyclones** - Weather awareness and shelter procedures

### 🎮 **Interactive Learning**
- **Quiz Systems** with scoring and progress tracking
- **Drill Simulations** for hands-on practice
- **Achievement System** with badges and streaks
- **AI Chatbot** for instant help and guidance
- **Emergency Tools** and contact information

### 🏫 **Educational Features**
- **Regional Disaster Awareness** based on Indian geography
- **Emergency Contacts** (Police: 100, Fire: 101, Ambulance: 108)
- **Evacuation Routes** and safety procedures
- **Progress Tracking** and learning analytics
- **Offline Capability** for emergency situations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/edushield.git
cd edushield

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the application.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **React Query** - Data fetching

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Row Level Security (RLS)** - Data protection
- **Real-time subscriptions** - Live updates

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Vite** - Hot module replacement
- **Tailwind CSS** - Utility-first CSS

## 📁 Project Structure

```
edushield/
├── src/
│   ├── components/          # React components
│   │   ├── age-groups/      # Age-specific UI components
│   │   ├── auth/            # Authentication components
│   │   └── ui/              # Reusable UI components
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # External service integrations
│   │   └── supabase/        # Supabase configuration
│   ├── pages/               # Page components
│   └── data/                 # Static data and content
├── public/                   # Static assets
├── supabase/                 # Database migrations
└── docs/                     # Documentation
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run build:prod      # Build for production with optimizations
npm run preview         # Preview production build
npm run preview:prod    # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
npm run type-check      # Run TypeScript checks

# Testing
npm run test            # Run tests
npm run test:coverage   # Run tests with coverage
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
VITE_APP_NAME=EduShield
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Disaster Preparedness Education Platform

# Google Maps API (optional)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Environment
NODE_ENV=production
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

#### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Set environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

#### Option 2: Deploy with GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add your Supabase credentials:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Other Deployment Options

#### Netlify
```bash
# Build the project
npm run build

# Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 🗄️ Database Setup

### Supabase Configuration

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run Migrations**
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Link to your project
   supabase link --project-ref your-project-ref

   # Run migrations
   supabase db push
   ```

3. **Configure Authentication**
   - Go to Authentication → Settings
   - Set up email templates
   - Configure redirect URLs
   - Enable/disable email confirmations

## 🔒 Security

### Security Features
- **Row Level Security (RLS)** enabled on all tables
- **Authentication** with Supabase Auth
- **Input validation** and sanitization
- **CORS** configuration
- **Rate limiting** for API calls
- **Secure headers** in production

### Security Headers
```javascript
// Automatically applied in production
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

## 📱 Mobile & PWA

### Progressive Web App Features
- **Service Worker** for offline functionality
- **App Manifest** for app-like experience
- **Push Notifications** for emergency alerts
- **Offline Caching** of critical content
- **Responsive Design** for all devices

### Mobile Optimization
- Touch-friendly interactions
- Fast loading on mobile networks
- Battery-efficient operations
- Offline emergency procedures

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
src/
├── __tests__/           # Test files
├── components/          # Component tests
├── hooks/               # Hook tests
└── utils/               # Utility tests
```

## 📊 Performance

### Bundle Analysis
- **Total Bundle Size**: 253KB (65KB gzipped)
- **Vendor Chunk**: 141KB (45KB gzipped)
- **UI Components**: 70KB (24KB gzipped)
- **Code Splitting**: Automatic chunk splitting

### Performance Optimizations
- **Code Splitting** and lazy loading
- **Tree Shaking** for unused code
- **Asset Optimization** and compression
- **Service Worker** for caching
- **CDN Integration** for static assets

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint for code quality
- Write tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check the `/docs` folder
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: support@edushield.in

### Common Issues
- **Email not sending**: Check `EMAIL_SETUP.md`
- **Database connection**: Verify Supabase credentials
- **Build errors**: Check Node.js version and dependencies

## 🎯 Roadmap

### Upcoming Features
- [ ] **Multi-language Support** (Hindi, Tamil, Bengali)
- [ ] **Advanced Analytics** for learning progress
- [ ] **Parent Dashboard** for monitoring children's progress
- [ ] **School Integration** with existing LMS
- [ ] **Emergency Alert System** with SMS integration
- [ ] **AR/VR Simulations** for immersive learning

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Mobile optimizations and PWA features
- **v1.2.0** - Advanced analytics and reporting
- **v2.0.0** - Multi-language support and AR features

## 🙏 Acknowledgments

- **Supabase** for backend infrastructure
- **Vercel** for deployment platform
- **shadcn/ui** for beautiful components
- **Tailwind CSS** for styling framework
- **React** community for excellent documentation

---

<div align="center">

**Made with ❤️ for Disaster Preparedness Education in India**

[🌐 Live Demo](https://edushield.vercel.app) • [📚 Documentation](https://docs.edushield.in) • [🐛 Report Bug](https://github.com/your-username/edushield/issues) • [✨ Request Feature](https://github.com/your-username/edushield/issues)

</div>