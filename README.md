# Westend Corporation Website

A modern, professional multi-page B2B e-commerce website for Westend Corporation Pvt. Ltd. featuring glassmorphism design, smooth animations, and Amazon-style product gallery.

## 🚀 Features

### **Multi-Page Application**
- **Home Page**: Hero section, product verticals, about, certifications, why choose us
- **Products Page**: Amazon-style product gallery with filters and search
- **Product Detail Page**: Detailed product information with image gallery
- **Contact Page**: Business inquiry form

### **Design & UX**
- **Professional Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Framer Motion powered transitions
- **Fully Responsive**: Mobile-first design that works on all devices
- **Amazon-Style Gallery**: Grid layout with hover effects and quick actions
- **React Router**: Seamless page navigation

### **Product Features**
- **Category Filtering**: Filter by product categories
- **Search Functionality**: Real-time product search
- **Product Cards**: With ratings, badges, pricing, and stock status
- **Product Details**: Full specifications, features, and related products
- **Image Gallery**: Multiple product images with thumbnail navigation

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- Lucide React (Icons)

### Backend (Coming Soon)
- Django REST Framework
- PostgreSQL

## 📦 Installation

1. **Install dependencies**
```bash
npm install
```

2. **Run development server**
```bash
npm run dev
```

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## 🎨 Design Features

- **Glassmorphism Cards**: Modern frosted glass effect
- **Gradient Backgrounds**: Vibrant color schemes
- **Smooth Scrolling**: Enhanced user experience
- **Hover Animations**: Interactive elements
- **Floating Elements**: Dynamic visual effects

## 📁 Project Structure

```
wesrend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Home page
│   │   ├── ProductsPage.jsx      # Products listing with filters
│   │   ├── ProductDetail.jsx     # Individual product details
│   │   └── ContactPage.jsx       # Contact form page
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation with routing
│   │   ├── Hero.jsx              # Hero section with background
│   │   ├── Verticals.jsx         # Product categories
│   │   ├── About.jsx             # Company information
│   │   ├── Certifications.jsx    # Certifications & stats
│   │   ├── WhyChooseUs.jsx       # Key benefits
│   │   ├── Contact.jsx           # Contact form
│   │   └── Footer.jsx            # Footer with links
│   ├── App.jsx                   # Router setup
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 Pages & Routes

### **Routes**
- `/` - Home page
- `/products` - Products listing page
- `/product/:id` - Individual product detail page
- `/contact` - Contact page

### **Home Page Sections**
1. **Hero Section**: Professional background image with overlay
2. **Product Verticals**: Three main categories (Groceries, Frozen, Processed)
3. **About Us**: Company story and infrastructure
4. **Certifications**: ISO, FSSAI, HACCP, and other certifications
5. **Why Choose Us**: 6 key benefits with professional descriptions
6. **Footer**: Complete site navigation and social links

### **Products Page Features**
- Category sidebar with filters
- Search functionality
- Amazon-style product grid (2-4 columns responsive)
- Product cards with images, ratings, badges, pricing
- Pagination
- Sort options (Featured, Price, Rating, etc.)

### **Product Detail Page**
- Image gallery with thumbnails
- Product specifications
- Features list
- Pricing and bulk order information
- Related products section
- Add to inquiry/quote functionality

## 🔧 Configuration

### Update Company Details

Edit the following files to update company information:

- `src/components/Contact.jsx` - Contact details
- `src/components/Footer.jsx` - Footer information
- `src/components/Hero.jsx` - Tagline and hero content

### Color Scheme

Primary colors are defined in `tailwind.config.js`:
- Green: Groceries
- Blue: Frozen Vegetables
- Orange/Red: Processed Food

## 🚀 Deployment

The site can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📝 TODO

- [ ] Connect contact form to Django backend
- [ ] Add product catalog pages
- [ ] Implement product search/filtering
- [ ] Add image galleries
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Analytics integration

## 👨‍💻 Development

This is a modern React application built with best practices:
- Component-based architecture
- Responsive design
- Performance optimized
- Accessible UI elements

## 📄 License

© 2024 Westend Corporation Pvt. Ltd. All rights reserved.

## 🤝 Contact

For any queries regarding this website:
- Email: support@westendcorporation.in
- Phone: +91 XXX XXX XXXX
- Address: B-106, Okhla Industrial Area, Phase 1, Delhi - 110020
