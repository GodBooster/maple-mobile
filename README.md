# Gauntlet Mobile - Strategic Partnership Proposal

A modern, responsive landing page presenting the Gauntlet Mobile DeFi application proposal. Built with React, Vite, and Framer Motion for smooth animations and optimal performance.

## 🚀 Features

- **Responsive Design**: Fully optimized for desktop and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Interactive Calculator**: Real-time revenue projection calculator with adjustable user count
- **Modern UI/UX**: Beautiful gradient designs with custom cursor and smooth scrolling
- **Performance Optimized**: Memoized calculations and lazy-loaded images
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
git clone https://github.com/GodBooster/gauntlet-mobile-woof.git
cd gauntlet-mobile-woof
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
gauntlet-mobile/
├── public/
│   ├── dog.png              # WOOF logo image
│   ├── dog-cursor.png       # Custom cursor image
│   └── favicon.svg          # Site favicon
├── src/
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── GauntletPresentation.jsx  # Main presentation component
├── index.html               # HTML template
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎨 Key Sections

1. **Hero Section**: Introduction with animated phone mockup
2. **Vision Section**: Strategic framework and goals
3. **Problem Section**: Current user friction points
4. **Solution Section**: Gauntlet Mobile solution overview
5. **Competition Section**: Competitive landscape comparison
6. **Business Model**: Financial projections and calculator
7. **Partnership Structure**: Revenue share and fixed price options
8. **Roadmap**: Development phases and timeline
9. **Contact Section**: Call-to-action and contact information

## ⚙️ Configuration

### Custom Cursor
The site features a custom dog cursor. To disable it, comment out the cursor styles in `src/index.css`:

```css
body {
  /* cursor: url('/dog-cursor.png') 24 24, auto; */
}
```

### Colors
Brand colors are defined in `src/index.css`:
- Primary: `#7180F5` (Gauntlet Blue)
- Secondary: `#8D99F7` (Gauntlet 300)
- Custom colors can be modified in the `:root` CSS variables

## 🎯 Performance Optimizations

- **Memoized Calculations**: Revenue calculations use `useMemo` to prevent unnecessary recalculations
- **Lazy Loading**: Images load on demand with `loading="lazy"`
- **Optimized Animations**: All `whileInView` animations use `once: true` to prevent re-triggering
- **Layout Containment**: CSS `contain: layout` prevents layout shifts during scroll
- **Stable Scrollbar**: `scrollbar-gutter: stable` prevents content width changes

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Development

### Adding New Sections

1. Create a new section component in `GauntletPresentation.jsx`
2. Use the `Section` wrapper component for consistent styling
3. Add navigation link in the header navigation

### Modifying Calculator

The revenue calculator is located in the Business Model section. Key variables:
- `userCount`: Adjustable via slider (10K - 200K)
- Revenue streams: Interchange (1%), Yield Fees (0.15%), FX Spread (0.75%)

## 📄 License

This project is proprietary and confidential.

## 👥 Contact

For questions or partnership inquiries:
- Email: dmitriy@woof.software
- Schedule a call: [Calendly Link](https://calendly.com/dmitriy-woof/small-talk)

## 🙏 Acknowledgments

- Gauntlet for institutional-grade vault infrastructure
- WOOF Software for development and design

---

Built with ❤️ by WOOF Software
