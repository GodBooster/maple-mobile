# Maple Mobile - Strategic Partnership Proposal

A modern, responsive landing page presenting the Maple Mobile neobank proposal. Built with React, Vite, and Framer Motion for smooth animations and optimal performance.

## 🚀 Features

- **Responsive Design**: Fully optimized for desktop and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Phone Mockup**: Interactive Retail / Corporate modes with Syrup Debit Card and Maple Corporate Card
- **Choose Your Product**: For Individuals (Syrup) and For Institutions (Maple Corporate) with fixed-height tab content
- **Modern UI/UX**: Maple brand colors, gradient designs, smooth scrolling
- **Performance Optimized**: Memoized calculations, lazy-loaded images
- **Mobile Navigation**: Hamburger menu for mobile devices

## 🛠️ Tech Stack

- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **Framer Motion 10.16** - Animation library
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Lucide React** - Icon library
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/GodBooster/maple-mobile.git
cd maple-mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
maple-mobile/
├── public/
│   ├── dog.png              # WOOF logo image
│   ├── dog-cursor.png       # Custom cursor image
│   ├── favicon.svg          # Site favicon
│   ├── image.avif           # OG / favicon asset
│   └── metadata.png        # Social preview image
├── src/
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── MaplePresentation.jsx    # Main presentation component
├── index.html               # HTML template
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js          # Vite configuration
└── README.md                # This file
```

## 🎨 Key Sections

1. **Hero Section**: Introduction with animated phone mockup (Retail / Corporate toggle)
2. **Choose Your Product**: Syrup Debit Card (Individuals) and Maple Corporate Card (Institutions)
3. **Current Friction (Problem)**: Yield–Liquidity paradox for individuals and institutions
4. **How It Works**: Settlement models, Why Solana
5. **Comparison**: Maple vs Ondo, Coinbase Card, Revolut
6. **Market Opportunity**: Stats and opportunity
7. **Tokenomics**: Spend to Burn flywheel
8. **Business Model**: Revenue streams and unit economics
9. **Partnership**: Contact and Calendly CTA

## ⚙️ Configuration

### Custom Cursor
The site can use a custom dog cursor. To disable it, comment out the cursor styles in `src/index.css`:

```css
body {
  /* cursor: url('/dog-cursor.png') 24 24, auto; */
}
```

### Colors
Brand colors are defined in `tailwind.config.js` and `src/index.css` (Maple palette):
- Primary: `#0E121B` (maple)
- Accent: `#FC784A` (orange)
- Background: `#F5F7FA` (maple-bg)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Development

### Adding New Sections
1. Create or edit sections in `MaplePresentation.jsx`
2. Use the `Section` wrapper component for consistent styling
3. Add navigation link in the header navigation

## 📄 License

This project is proprietary and confidential.

## 👥 Contact

For questions or partnership inquiries:
- Email: dmitriy@woof.software
- Schedule a call: [Calendly](https://calendly.com/dmitriy-woof/small-talk)

## 🙏 Acknowledgments

- Maple Finance for institutional-grade yields and infrastructure
- WOOF Software for development and design

---

Built with ❤️ by WOOF Software
