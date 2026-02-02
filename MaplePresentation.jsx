import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, CreditCard, TrendingUp, Shield, Zap, Clock, 
  CheckCircle, XCircle, AlertTriangle, ArrowRight, ChevronDown,
  DollarSign, Users, Percent, Calendar, Lock, Wallet, Building2, X, Menu
} from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(numericValue * eased);
      
      if (progress < 1) requestAnimationFrame(tick);
    };
    
    requestAnimationFrame(tick);
  }, [isVisible, value, duration]);

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toFixed(num % 1 === 0 ? 0 : 1);
  };

  return (
    <span ref={ref}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

// Phone Mockup Component - iPhone 17 Pro Max
const PhoneMockup = ({ children, className = '' }) => (
  <div className={`relative ${className}`}>
    <div className="relative mx-auto w-[320px] h-[620px] bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 rounded-[3.5rem] p-2.5 shadow-2xl shadow-black/70 border border-white/5" 
         style={{
           boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.9), 0 30px 60px -30px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255,255,255,0.1)'
         }}>
      {/* Screen */}
      <div className="w-full h-full bg-maple-bg rounded-[3rem] overflow-hidden relative">
        {/* Status Bar with Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-3">
          <div className="flex items-center justify-between">
            {/* Time - Left corner */}
            <span className="text-[13px] font-semibold text-maple-text w-12">9:41</span>
            
            {/* Dynamic Island - Center (вырез под камеру, тёмный) */}
            <div className="w-[100px] h-[32px] bg-maple rounded-full flex items-center justify-center gap-1.5 px-3">
              <div className="w-1 h-1 bg-white/40 rounded-full" />
              <div className="w-5 h-5 bg-white/20 rounded-full border border-white/30" />
            </div>
            
            {/* Signal & Battery - Right corner */}
            <div className="flex items-center gap-1 w-12 justify-end">
              <div className="flex items-end gap-0.5">
                <div className="w-0.5 h-1 bg-maple-text rounded-t" />
                <div className="w-0.5 h-1.5 bg-maple-text rounded-t" />
                <div className="w-0.5 h-2 bg-maple-text rounded-t" />
                <div className="w-0.5 h-2.5 bg-maple-text rounded-t" />
              </div>
              <div className="flex items-center">
                <div className="w-5 h-2.5 border border-maple-text rounded-[2px] px-[1px] flex items-center">
                  <div className="h-1.5 bg-maple-text rounded-[1px]" style={{ width: '82%' }} />
                </div>
                <div className="w-0.5 h-1 bg-maple-text rounded-r" />
              </div>
            </div>
          </div>
        </div>
        
        {children}
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-maple-text/30 rounded-full" />
      </div>
    </div>
  </div>
);

// Section Component — компактные отступы, контент задаёт высоту
const Section = ({ children, className = '', id = '' }) => (
  <section id={id} className={`py-14 px-6 relative ${className}`}>
    {children}
  </section>
);

// Accent Text Component (solid color, no gradient fade)
const GradientText = ({ children, className = '' }) => (
  <span className={`text-maple ${className}`} style={{ fontFamily: 'inherit' }}>
    {children}
  </span>
);

// Business Model revenue icons (SVG, no emoji)
const YieldSpreadIcon = ({ className = 'w-6 h-6', stroke = 'currentColor' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 16v-3h3v3H5zM11 16v-6h3v6h-3zM17 16V8h3v8h-3z" />
  </svg>
);
const InterchangeIcon = ({ className = 'w-6 h-6', stroke = 'currentColor' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
);
const FXFeesIcon = ({ className = 'w-6 h-6', stroke = 'currentColor' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 8l4 4-4 4" />
    <path d="M17 16l-4-4 4-4" />
    <path d="M3 12h18" />
  </svg>
);
const SubscriptionIcon = ({ className = 'w-6 h-6', stroke = 'currentColor' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15 9 22 9 17 14 18 22 12 18 6 22 7 14 2 9 9 9" />
  </svg>
);

// Maple Logo Icon Component (icon only, no text; fill для карточек — white)
const MapleIcon = ({ className = 'w-8 h-8', fill = '#141414' }) => (
  <svg 
    className={className} 
    width="100%" 
    height="100%" 
    viewBox="0 0 68 79" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.245784 39.2654C15.0249 38.8351 50.2753 37.2177 58.1423 25.7734C64.123 17.0767 50.923 8.02049 44.6492 4.74798C38.3754 1.46601 29.6479 0 29.6479 0C47.2117 1.98148 74.978 11.6004 66.3356 29.0885C58.5962 44.7417 18.2445 46.8698 0.236328 46.8698V39.2607H0.245784V39.2654Z" fill={fill} />
    <path d="M0.236328 78.5499V71.0638C22.5893 70.3166 52.4596 69.6687 67.9525 54.8525C68.3733 67.9048 50.5023 73.7924 36.8247 76.2468C24.9864 78.3702 12.382 78.8904 0.241056 78.5499H0.236328Z" fill={fill} />
    <path d="M67.9621 38.6411C55.6934 51.315 31.0758 54.8334 0 54.8334V62.4236C32.6785 62.4236 67.8675 57.6283 67.9621 38.6411Z" fill={fill} />
  </svg>
);

// Woof Logo Component
const WoofLogo = ({ className = 'w-6 h-6' }) => (
  <svg 
    className={className} 
    viewBox="0 0 500 500" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_3112_761)">
      <rect width="500" height="500" rx="35" fill="#E5EBFB"/>
      <g filter="url(#filter0_f_3112_761)">
        <path d="M-572.51 -757H1418.51V298H-572.51V-757Z" fill="#88C1FF"/>
      </g>
      <path fillRule="evenodd" clipRule="evenodd" d="M330.183 312.966L262.525 169.396C259.812 163.639 263.983 157 270.314 157H334.266C350.135 157 363 169.95 363 185.924V305.528C363 324.036 338.063 329.688 330.183 312.966Z" fill="#040404"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M228.26 333.234C238.585 347.589 259.83 347.589 270.155 333.234L292.463 302.219C296.589 296.481 292.517 288.453 285.48 288.453H212.935C205.898 288.453 201.826 296.481 205.952 302.219L228.26 333.234Z" fill="#040404"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M168.817 312.963C160.937 329.685 136 324.034 136 305.525V185.924C136 169.95 148.865 157 164.734 157H228.682C235.013 157 239.184 163.639 236.471 169.396L168.817 312.963Z" fill="#040404"/>
    </g>
    <defs>
      <filter id="filter0_f_3112_761" x="-1024.33" y="-1208.82" width="2894.66" height="1958.64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="225.91" result="effect1_foregroundBlur_3112_761"/>
      </filter>
      <clipPath id="clip0_3112_761">
        <rect width="500" height="500" rx="35" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

// Google Analytics event tracking helper
const trackEvent = (eventName, eventCategory, eventLabel = '', value = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: value
    });
  }
};

// Main Presentation Component
export default function MaplePresentation() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [userCount, setUserCount] = useState(10000);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mode, setMode] = useState('retail'); // 'retail' | 'corporate'
  const [activeProductTab, setActiveProductTab] = useState('retail'); // 'retail' | 'institutional'
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const autoPlayRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  const phoneScreens = useMemo(() => [
    { title: 'Card', id: 'card' },
    { title: 'Home', id: 'home' },
    { title: 'Activity', id: 'activity' },
    { title: 'Profile', id: 'profile' }
  ], []);

  // Handle manual screen change - disable auto-play
  const handleScreenChange = useCallback((index) => {
    setActiveScreen(index);
    setAutoPlayEnabled(false);
    trackEvent('phone_screen_change', 'Phone Mockup', phoneScreens[index].title);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, [phoneScreens]);

  // Auto-play animation
  useEffect(() => {
    if (!autoPlayEnabled) return;
    
    autoPlayRef.current = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % phoneScreens.length);
    }, 5000); // 3 seconds
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlayEnabled, phoneScreens.length]);

  // Format numbers like in HTML version - memoized
  const fmt = useCallback((n) => n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : `$${n.toLocaleString(undefined, {maximumFractionDigits: 0})}`, []);

  // Calculate revenue based on user count - memoized for performance
  const revenueData = useMemo(() => {
    const avgBalance = 5000;
    const avgMonthlySpend = 1000;
    const internationalTxnRate = 0.15;
    const fxSpreadRate = 0.0075;
    const totalAnnualSpend = userCount * avgMonthlySpend * 12;
    const interchangeRevenue = totalAnnualSpend * 0.01;
    const yieldFees = userCount * avgBalance * 0.0015;
    const fxRevenue = totalAnnualSpend * internationalTxnRate * fxSpreadRate;
    const totalRevenue = interchangeRevenue + yieldFees + fxRevenue;
    const mapleShare = totalRevenue * 0.7;
    const ltv = totalRevenue / userCount;
    
    return {
      interchangeRevenue,
      yieldFees,
      fxRevenue,
      totalRevenue,
      mapleShare,
      ltv
    };
  }, [userCount]);

  const { interchangeRevenue, yieldFees, fxRevenue, totalRevenue, mapleShare, ltv } = revenueData;

  return (
    <div className="bg-maple-bg text-maple-text font-sans overflow-x-hidden w-full min-w-0" style={{ width: '100vw', maxWidth: '100%' }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-maple/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-maple-300/10 rounded-full blur-[128px]" />
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(113,128,245,0.05) 0%, transparent 50%)',
            y: backgroundY 
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-maple-bg/95 backdrop-blur-xl border-b border-maple-structure">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapleIcon className="w-8 h-8" />
            <span className="font-bold text-lg tracking-tight hidden sm:block">MAPLE FINANCE</span>
          </div>
          
          {/* Desktop Navigation — пункты соответствуют блокам сайта */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            {[
              { id: 'products', label: 'Products' },
              { id: 'friction', label: 'The Problem' },
              { id: 'how-it-works', label: 'How It Works' },
              { id: 'compare-options', label: 'Сompetition' },
              { id: 'tokenomics', label: 'Tokenomics' },
              { id: 'business-model', label: 'Business Model' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  trackEvent('navigation_click', 'Navigation', label);
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-4 py-2.5 rounded-lg text-maple-text-secondary border border-transparent hover:text-maple hover:bg-maple-bg-alt hover:border-maple-structure hover:shadow-[0_2px_12px_rgba(14,18,27,0.1)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
          
          {/* Desktop CTA — ведёт к блоку Partnership (contact) */}
          <button 
            onClick={() => {
              trackEvent('cta_click', 'CTA', 'Schedule Call - Header');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hidden md:block px-4 py-2 bg-maple rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer text-white"
          >
            Schedule Call
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-maple-text hover:bg-maple-structure/50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-maple-bg/95 backdrop-blur-xl border-t border-maple-structure overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {[
                  { label: 'Products', id: 'products' },
                  { label: 'Competitive', id: 'comparison' },
                  { label: 'Technology', id: 'tech' },
                  { label: 'Tokenomics', id: 'tokenomics' },
                  { label: 'Roadmap', id: 'roadmap' },
                  { label: 'Partnership', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      trackEvent('navigation_click', 'Mobile Navigation', item.label);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setMobileMenuOpen(false);
                    }}
                    className="py-3 px-4 text-left text-maple-text-secondary hover:text-maple-text hover:bg-maple-structure/30 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    trackEvent('cta_click', 'CTA', 'Join Waitlist - Mobile Menu');
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 py-3 px-4 bg-maple rounded-lg text-center font-semibold hover:opacity-90 transition-opacity"
                >
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <Section className="min-h-screen flex items-center justify-center pt-32 pb-20" id="hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
          <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
              className="text-left"
          >
            <div className="flex items-center gap-4 mb-8">
              {/* WOOF Dog Animation */}
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                className="relative"
              >
                <motion.img 
                  src="/dog.png" 
                  alt="WOOF" 
                  loading="lazy"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg"
                  animate={{ 
                    rotate: [0, 3, -3, 0],
                    y: [0, -2, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ willChange: 'transform' }}
                />
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-maple/30 rounded-full blur-xl -z-10"
                />
              </motion.div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-maple-bg-alt rounded-full text-sm text-maple-text-secondary border border-maple-structure">
                <span className="w-2 h-2 bg-maple rounded-full animate-pulse" />
                Strategic Partnership Proposal
              </div>
            </div>
            
              <h1 className="font-heading-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <GradientText>Earn Like an Institution</GradientText><br />
                Spend Like a Local
            </h1>
            
              <p className="text-lg text-maple-text-secondary mb-4">
              The first on-chain neobank with institutional-grade yields. Earn yield on your balance. Spend instantly with your Maple Card.
              </p>
              <p className="text-base text-maple-text-secondary mb-8 font-semibold">
                Non-Custodial & Permissionless
              </p>

              {/* Features with checkmarks - horizontal */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <button 
                onClick={() => {
                    trackEvent('cta_click', 'CTA', 'Products - Hero');
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-8 py-4 bg-maple rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
              >
                  Products <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                    trackEvent('cta_click', 'CTA', 'Corporate Sale - Hero');
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                  className="px-8 py-4 bg-maple border border-maple rounded-full font-semibold text-lg text-white/90 hover:opacity-90 transition-opacity cursor-pointer"
              >
                  Corporate Sale
              </button>
            </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                  { label: 'Total AUM', value: '$4.5B' },
                  { label: 'Instant Buffer', value: '$204M' },
                  { label: 'Losses Since 2024', value: 'Zero' }
                ].map((stat) => (
                  <div key={stat.label} className="stat">
                    <p className="text-3xl md:text-4xl font-bold text-maple-text">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wide text-maple-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
          </motion.div>

            {/* Right Column - Animated Phone Preview */}
          <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex flex-col items-center"
          >
            <PhoneMockup>
              <div className="h-full flex flex-col bg-maple-bg pt-11">
                {/* Screen Content */}
                <div className="flex-1 overflow-hidden relative">
                  {mode === 'retail' ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                      initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-y-auto"
                >
                      {/* Card Screen — первая вкладка (🚀 Retail) */}
                  {activeScreen === 0 && (
                        <div className="p-3 space-y-3 overflow-y-auto h-full">
                          <div className="mb-1">
                            <p className="text-lg font-bold mb-0.5 leading-tight text-maple-text">Syrup Debit Card</p>
                            <p className="text-[10px] text-maple-text-muted">Earn 5-7% APY (with Drips) until you swipe.</p>
                      </div>

                          {/* In-app Syrup Card Visual — тот же скин, что в Choose Your Product */}
                          <div className="w-full">
                            <div
                              className="relative w-full aspect-[1.586] rounded-xl overflow-hidden border border-maple-structure shadow-lg flex flex-col justify-between p-3"
                              style={{
                                background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a, #1a1a1a)',
                                boxShadow: '0 10px 24px rgba(0,0,0,0.35)'
                              }}
                            >
                              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,87,51,0.15), transparent 50%)' }} />
                              <div className="flex justify-between items-start relative z-10">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                    <MapleIcon className="w-5 h-5" fill="#FC784A" />
                                  </span>
                                  <span className="font-bold text-xs text-white">Maple</span>
                                  </div>
                                <div className="w-7 h-5 rounded" style={{ background: 'linear-gradient(135deg, #d4af37, #f9e076, #d4af37)' }} />
                                  </div>
                              <div className="font-mono text-xs tracking-[0.15em] text-white relative z-10">4532 •••• •••• 7891</div>
                              <div className="flex justify-between items-end relative z-10">
                                <div>
                                  <div className="text-[8px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Cardholder</div>
                                  <div className="text-[10px] font-semibold text-white uppercase tracking-wider mt-0.5">Your Name</div>
                                </div>
                                <div className="text-sm font-bold italic text-white">VISA</div>
                                </div>
                                </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <button className="py-2 bg-maple rounded-lg font-semibold text-xs text-white flex items-center justify-center gap-1.5">
                              <Wallet className="w-3.5 h-3.5" />
                              Apple Pay
                            </button>
                            <button className="py-2 bg-maple-bg-alt border border-maple-structure rounded-lg font-semibold text-xs text-maple-text">
                              Freeze
                            </button>
                                  </div>

                          <div className="p-3 bg-maple/10 rounded-lg border border-maple/30/20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Zap className="w-3.5 h-3.5 text-maple" />
                              <p className="text-xs font-semibold text-maple-text">Just-in-Time Unstake</p>
                                  </div>
                            <p className="text-[10px] text-maple-text-secondary leading-tight">
                              Funds unstake automatically when you pay. 100% capital efficiency.
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-maple-text">Card Settings</p>
                            {['Spending Limit', 'Notifications', 'Security'].map((setting) => (
                              <div key={setting} className="flex items-center justify-between p-2 bg-maple-bg-alt rounded-lg">
                                <span className="text-xs text-maple-text">{setting}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-maple-icon" />
                                  </div>
                            ))}
                          </div>
                        </div>
                  )}

                      {/* Home Screen (Retail Dashboard) */}
                  {activeScreen === 1 && (
                        <div className="p-3 space-y-3 overflow-y-auto h-full">
                          {/* App Header (Retail) */}
                          <div className="flex items-center justify-between mb-2 pb-2 border-b border-maple-structure/60">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-xl bg-maple flex items-center justify-center text-xs font-bold text-white">
                                M
                                  </div>
                              <div className="text-left">
                                <p className="text-[11px] font-semibold text-maple-text">Maple Mobile</p>
                                <p className="text-[10px] text-maple-text-muted leading-tight">Syrup Retail Mode</p>
                                  </div>
                                </div>
                            <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-maple/10 text-maple border border-maple/40">
                              🚀 Retail
                            </span>
                          </div>

                          {/* Balance Card */}
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-[10px] text-maple-text-muted mb-0.5">Total Balance</p>
                              <p className="text-2xl font-bold leading-tight text-maple-text">$12,847</p>
                              <p className="text-[11px] text-maple-text-muted leading-tight">≈ 12,847 syrupUSDC</p>
                      </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maple/20 to-maple-300/20 flex items-center justify-center">
                              <Lock className="w-4 h-4 text-maple" />
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-maple text-[11px] bg-maple/10 px-2 py-1.5 rounded-lg">
                            <TrendingUp className="w-3 h-3" />
                            <span>14.5% APY • Syrup Retail Yield</span>
                          </div>

                          {/* Card Snapshot */}
                          <div className="mt-2 p-3 rounded-2xl bg-maple-bg-alt border border-maple-structure">
                            <p className="text-[10px] text-maple-text-muted mb-1">Your Card</p>
                            <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[11px] text-maple-text-muted uppercase tracking-wide mb-0.5">Available</p>
                                <p className="text-sm font-semibold text-maple-text">$12,847</p>
                      </div>
                              <div className="text-right">
                                <p className="text-[11px] text-maple-text-muted uppercase tracking-wide mb-0.5">Settlement</p>
                                <p className="text-sm font-semibold text-emerald-600">Instant JIT</p>
                            </div>
                          </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="mt-3">
                            <p className="text-xs font-semibold mb-2 text-maple-text">Quick Actions</p>
                            <div className="grid grid-cols-2 gap-2">
                              <button className="p-2 bg-maple-bg-alt rounded-lg border border-maple-structure flex flex-col items-start gap-0.5">
                                <span className="text-[10px] text-maple-text">Top Up</span>
                                <span className="text-[9px] text-maple-text-muted">Add funds to syrupUSDC</span>
                              </button>
                              <button className="p-2 bg-maple-bg-alt rounded-lg border border-maple-structure flex flex-col items-start gap-0.5">
                                <span className="text-[10px] text-maple-text">Send</span>
                                <span className="text-[9px] text-maple-text-muted">Transfer to wallet</span>
                              </button>
                              <button className="p-2 bg-maple-bg-alt rounded-lg border border-maple-structure flex flex-col items-start gap-0.5">
                                <span className="text-[10px] text-maple-text">Swap</span>
                                <span className="text-[9px] text-maple-text-muted">Exchange assets</span>
                              </button>
                              <button className="p-2 bg-maple-bg-alt rounded-lg border border-maple-structure flex flex-col items-start gap-0.5">
                                <span className="text-[10px] text-maple-text">Yield</span>
                                <span className="text-[9px] text-maple-text-muted">View strategies</span>
                              </button>
                            </div>
                          </div>

                          {/* Recent Activity */}
                          <div className="mt-3">
                            <p className="text-xs font-semibold mb-2 text-maple-text">Recent Activity</p>
                            <div className="space-y-1.5">
                              {[
                                { type: 'Starbucks', amount: '-$5.47', time: 'Today, 5:32 PM', icon: <CreditCard className="w-3.5 h-3.5" /> },
                                { type: 'Shell Gas', amount: '-$47.21', time: 'Today, 2:15 PM', icon: <CreditCard className="w-3.5 h-3.5" /> },
                                { type: 'Yield Earned', amount: '+$4.32', time: 'Yesterday', icon: <TrendingUp className="w-3.5 h-3.5" /> }
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-maple-bg-alt rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                      item.amount.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-maple-structure text-maple-text-muted'
                                    }`}>
                                      {item.icon}
                                    </div>
                                    <div>
                                      <p className="text-xs font-medium leading-tight text-maple-text">{item.type}</p>
                                      <p className="text-[10px] text-maple-text-muted leading-tight">{item.time}</p>
                                    </div>
                                  </div>
                                  <p className={`text-xs font-semibold ${
                                    item.amount.startsWith('+') ? 'text-emerald-600' : 'text-maple-text'
                                  }`}>
                                    {item.amount}
                                  </p>
                                </div>
                              ))}
                            </div>
                      </div>
                    </div>
                  )}

                      {/* Activity Screen */}
                  {activeScreen === 2 && (
                        <div className="p-3 space-y-2.5 overflow-y-auto h-full">
                          <div className="mb-2">
                            <p className="text-lg font-bold mb-0.5 leading-tight text-maple-text">Activity</p>
                            <p className="text-[10px] text-maple-text-muted">All your transactions</p>
                        </div>

                          <div className="flex gap-1.5 mb-2 overflow-x-auto">
                            <button className="px-3 py-1.5 bg-maple rounded-full text-[10px] font-semibold text-white whitespace-nowrap">All</button>
                            <button className="px-3 py-1.5 bg-maple-bg-alt rounded-full text-[10px] text-maple-text whitespace-nowrap">Payments</button>
                            <button className="px-3 py-1.5 bg-maple-bg-alt rounded-full text-[10px] text-maple-text whitespace-nowrap">Deposits</button>
                            <button className="px-3 py-1.5 bg-maple-bg-alt rounded-full text-[10px] text-maple-text whitespace-nowrap">Yield</button>
                      </div>

                          <div className="space-y-1.5">
                            {[
                              { type: 'Payment', merchant: 'Starbucks', amount: '-$5.20', date: 'Today, 2:34 PM', status: 'completed', icon: <CreditCard className="w-3.5 h-3.5" /> },
                              { type: 'Payment', merchant: 'Uber', amount: '-$12.50', date: 'Today, 10:12 AM', status: 'completed', icon: <CreditCard className="w-3.5 h-3.5" /> },
                              { type: 'Yield', merchant: 'Syrup Yield', amount: '+$12.45', date: 'Yesterday', status: 'completed', icon: <TrendingUp className="w-3.5 h-3.5" /> },
                              { type: 'Deposit', merchant: 'Bank Transfer', amount: '+$1,000', date: '2 days ago', status: 'completed', icon: <ArrowRight className="w-3.5 h-3.5" /> },
                              { type: 'Payment', merchant: 'Amazon', amount: '-$89.99', date: '3 days ago', status: 'completed', icon: <CreditCard className="w-3.5 h-3.5" /> },
                              { type: 'Yield', merchant: 'Syrup Yield', amount: '+$8.32', date: '4 days ago', status: 'completed', icon: <TrendingUp className="w-3.5 h-3.5" /> }
                            ].map((tx, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-2 bg-maple-bg-alt rounded-lg"
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    tx.type === 'Payment' ? 'bg-red-500/20 text-red-400' :
                                    tx.type === 'Yield' ? 'bg-emerald-500/20 text-emerald-400' :
                                    'bg-emerald-500/20 text-emerald-400'
                                  }`}>
                                    {tx.icon}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium truncate text-maple-text">{tx.merchant}</p>
                                    <p className="text-[10px] text-maple-text-muted truncate">{tx.date}</p>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-2">
                                  <p className={`text-xs font-semibold ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-maple-text'}`}>
                                    {tx.amount}
                                  </p>
                                  <p className="text-[10px] text-maple-text-muted">{tx.status}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Profile Screen */}
                      {activeScreen === 3 && (
                        <div className="p-3 space-y-2.5 overflow-y-auto h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-maple flex items-center justify-center text-lg font-bold text-black">
                              JS
                            </div>
                            <div>
                              <p className="text-base font-bold leading-tight text-maple-text">John Smith</p>
                              <p className="text-[10px] text-maple-text-muted">john.smith@example.com</p>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold mb-1.5 text-maple-text">Account</p>
                            {['Wallet Settings', 'Security', 'Notifications', 'Privacy'].map((item) => (
                              <div key={item} className="flex items-center justify-between p-2 bg-maple-bg-alt rounded-lg">
                                <span className="text-xs text-maple-text">{item}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-maple-icon" />
                              </div>
                            ))}
                          </div>

                          <div className="space-y-1.5 mt-3">
                            <p className="text-xs font-semibold mb-1.5 text-maple-text">Support</p>
                            {['Help Center', 'Contact Us', 'Terms & Privacy'].map((item) => (
                              <div key={item} className="flex items-center justify-between p-2 bg-maple-bg-alt rounded-lg">
                                <span className="text-xs text-maple-text">{item}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-maple-icon" />
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 p-3 bg-maple/10 rounded-lg border border-maple/30/20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Shield className="w-3.5 h-3.5 text-maple" />
                              <p className="text-xs font-semibold text-maple-text">Account Abstraction</p>
                            </div>
                            <p className="text-[10px] text-maple-text-secondary leading-tight">
                              Your wallet uses ERC-4337. Gas fees are sponsored. 100% capital efficiency.
                            </p>
                          </div>

                      <button className="w-full py-2 bg-maple-bg-alt border border-maple-structure rounded-lg font-semibold text-xs text-maple-text mt-3">
                            Sign Out
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`corporate-${activeScreen}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 overflow-y-auto"
                      >
                        {/* Corporate Card Screen — первая вкладка (🏛️ Corporate) */}
                        {activeScreen === 0 && (
                          <div className="p-3 space-y-3 overflow-y-auto h-full">
                            <div className="mb-1">
                              <p className="text-lg font-bold mb-0.5 leading-tight text-maple-text">Corporate Charge Card</p>
                              <p className="text-[10px] text-maple-text-muted">Daily T+1 settlement backed by Maple Cash.</p>
                </div>

                            {/* In-app Corporate Card Visual — тот же скин, что в Choose Your Product */}
                            <div className="w-full">
                              <div
                                className="relative w-full aspect-[1.586] rounded-xl overflow-hidden border border-maple-structure shadow-lg flex flex-col justify-between p-3"
                                style={{
                                  background: 'linear-gradient(135deg, #1a1a2e, #2a2a4e, #1a1a2e)',
                                  boxShadow: '0 10px 24px rgba(0,0,0,0.35)'
                                }}
                              >
                                <div className="flex justify-between items-start relative z-10">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                      <MapleIcon className="w-5 h-5" fill="#FC784A" />
                                    </span>
                                    <span className="font-bold text-xs text-white">Maple</span>
                                  </div>
                                  <div className="w-7 h-5 rounded" style={{ background: 'linear-gradient(135deg, #d4af37, #f9e076, #d4af37)' }} />
                                </div>
                                <div className="font-mono text-xs tracking-[0.15em] text-white relative z-10">4532 •••• •••• 1234</div>
                                <div className="flex justify-between items-end relative z-10">
                                  <div>
                                    <div className="text-[8px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Company</div>
                                    <div className="text-[10px] font-semibold text-white uppercase tracking-wider mt-0.5">Acme Treasury</div>
                                  </div>
                                  <div className="text-sm font-bold italic text-white">VISA</div>
                                </div>
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-maple-bg-alt border border-maple-structure space-y-1.5">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-maple-text">ACME DAO • Primary Card</p>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-maple/10 text-maple">
                                  T+1 Settlement
                                </span>
                              </div>
                              <p className="text-sm font-mono tracking-wide leading-tight text-maple-text">$50,000 Daily Limit</p>
                              <p className="text-[10px] text-maple-text-muted">
                                Employee spend auto-settles once per day against your Maple Cash position.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Corporate Home Screen */}
                        {activeScreen === 1 && (
                          <div className="p-3 space-y-3 overflow-y-auto h-full">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="text-[10px] text-maple-text-muted mb-0.5">Corporate Mode</p>
                                <p className="text-lg font-bold leading-tight text-maple-text">Treasury Overview</p>
                              </div>
                              <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-maple-bg-alt border border-maple-structure text-maple">
                                🏛️ Corporate
                              </span>
                            </div>

                            <div className="p-3 rounded-2xl bg-gradient-to-br from-maple/10 to-maple-300/10 border border-maple-structure">
                              <p className="text-[10px] text-maple-text-muted uppercase tracking-wide mb-1">Treasury Balance</p>
                              <p className="text-2xl font-bold text-maple mb-1">$2,500,000</p>
                              <p className="text-xs text-maple-text-secondary">Maple Cash Management • 4.8% - 5.3% APY</p>
                            </div>

                            <div className="p-3 rounded-2xl bg-maple-bg-alt border border-maple-structure space-y-1.5">
                              <p className="text-xs font-semibold text-maple-text mb-1">Daily Net Settlement</p>
                              <p className="text-[10px] text-maple-text-secondary leading-tight">
                                Employee spend is fronted from float and settled in a single T+1 withdrawal, keeping treasury fully deployed in T-Bills until end of day.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Corporate Activity Screen */}
                        {activeScreen === 2 && (
                          <div className="p-3 space-y-3 overflow-y-auto h-full">
                            <div>
                              <p className="text-xs font-semibold text-maple-text mb-2">Team Actions</p>
                              <div className="grid grid-cols-2 gap-2">
                                {['Team Cards', 'Spending Controls', 'Analytics', 'Reports'].map((label) => (
                                  <button
                                    key={label}
                                    className="p-2 bg-maple-bg-alt rounded-lg border border-maple-structure flex flex-col items-start gap-0.5"
                                  >
                                    <span className="text-[10px] text-maple-text">{label}</span>
                                    <span className="text-[9px] text-maple-text-muted">Tap to view</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-maple-text mb-2">Team Spending</p>
                              <div className="space-y-1.5">
                                {[
                                  { who: 'Alice • Travel', amount: '-$2,450' },
                                  { who: 'Bob • Cloud', amount: '-$1,200' },
                                  { who: 'T-Bill Yield', amount: '+$328' }
                                ].map((row, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between p-2 bg-maple-bg-alt rounded-lg border border-maple-structure"
                                  >
                                    <p className="text-[11px] text-maple-text">{row.who}</p>
                                    <p
                                      className={`text-[11px] font-semibold ${
                                        row.amount.startsWith('+') ? 'text-emerald-600' : 'text-maple-text'
                                      }`}
                                    >
                                      {row.amount}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Corporate Profile Screen */}
                        {activeScreen === 3 && (
                          <div className="p-3 space-y-2.5 overflow-y-auto h-full">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-maple flex items-center justify-center text-lg font-bold text-black">
                                AD
                              </div>
                              <div>
                                <p className="text-base font-bold leading-tight text-maple-text">ACME DAO Treasury</p>
                                <p className="text-[10px] text-maple-text-muted">treasury@acmedao.xyz</p>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <p className="text-xs font-semibold mb-1.5 text-maple-text">Account & Controls</p>
                              {['Spending Policies', 'Approval Rules', 'Billing Details'].map((item) => (
                                <div key={item} className="flex items-center justify-between p-2 bg-maple-bg-alt rounded-lg">
                                  <span className="text-xs text-maple-text">{item}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-maple-icon" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <div className="flex items-center justify-around px-2 py-2 border-t border-maple-structure bg-maple-bg relative z-10">
                    {[
                    { icon: <CreditCard className="w-4 h-4" />, label: 'Card' },
                    { icon: <TrendingUp className="w-4 h-4" />, label: 'Home' },
                    { icon: <Clock className="w-4 h-4" />, label: 'Activity' },
                    { icon: <Users className="w-4 h-4" />, label: 'Profile' }
                  ].map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => handleScreenChange(i)}
                      className={`flex flex-col items-center gap-0.5 py-0.5 transition-colors ${
                          i === activeScreen ? 'text-maple' : 'text-maple-text-secondary'
                      }`}
                    >
                      {tab.icon}
                      <span className="text-[9px] leading-tight">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </PhoneMockup>
            
            {/* Screen Indicators (слайдер) — под телефоном, по центру */}
            <div className="w-[320px] flex justify-center gap-2 mt-4">
              {phoneScreens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleScreenChange(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeScreen ? 'bg-maple w-6' : 'bg-maple-structure'
                  }`}
                />
              ))}
            </div>

            {/* Retail / Corporate Toggle — под слайдером, по центру относительно телефона */}
            <div className="flex justify-center w-full mt-3">
              <div className="inline-flex bg-maple-bg-alt border border-maple-structure rounded-full p-1.5 text-sm font-semibold shadow-sm">
                <button
                  onClick={() => {
                    setMode('retail');
                    setActiveScreen(0);
                    trackEvent('mode_toggle', 'Phone Mode', 'Retail');
                  }}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 ${
                    mode === 'retail'
                      ? 'bg-maple text-white shadow-[0_0_20px_rgba(14,18,27,0.45)]'
                      : 'text-maple-text-secondary hover:text-maple'
                  }`}
                >
                  🚀 Retail
                </button>
                <button
                  onClick={() => {
                    setMode('corporate');
                    setActiveScreen(0);
                    setAutoPlayEnabled(false);
                    trackEvent('mode_toggle', 'Phone Mode', 'Corporate');
                  }}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 ${
                    mode === 'corporate'
                      ? 'bg-maple text-white shadow-[0_0_20px_rgba(14,18,27,0.45)]'
                      : 'text-maple-text-secondary hover:text-maple'
                  }`}
                >
                  🏛️ Corporate
                </button>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </Section>

      {/* The Solution — Two Products. One App. (как в maple-index.html) */}
      <Section id="products" className="border-t-2 border-maple-structure shadow-[0_2px_10px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-maple-structure text-xs font-semibold uppercase tracking-[0.2em] text-maple-text-secondary mb-4">
              Choose Your Product
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Two Products. <GradientText>One App.</GradientText>
            </h2>
            <p className="text-maple-text-secondary max-w-2xl mx-auto text-lg">
              Whether you're an individual or company, Maple App has the right solution for you.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-maple-bg-alt rounded-xl border border-maple-structure">
              <button
                onClick={() => { setActiveProductTab('retail'); trackEvent('product_tab', 'Products', 'For Individuals'); }}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  activeProductTab === 'retail'
                    ? 'bg-maple text-white shadow-lg'
                    : 'text-maple-text-secondary hover:text-maple-text'
                }`}
              >
                For Individuals
              </button>
              <button
                onClick={() => { setActiveProductTab('institutional'); trackEvent('product_tab', 'Products', 'For Institutions'); }}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  activeProductTab === 'institutional'
                    ? 'bg-maple text-white shadow-lg'
                    : 'text-maple-text-secondary hover:text-maple-text'
                }`}
              >
                For Institutions
              </button>
                </div>
              </div>

          {/* Фиксированная высота блока — при переключении табов контент не дергается */}
          <div className="relative min-h-[520px] md:min-h-[480px]">
          {/* For Individuals — только карточка Visa в стиле maple-v2 */}
          {activeProductTab === 'retail' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-maple-text">Syrup Debit Card</h3>
                <p className="text-maple-text-secondary mb-6 leading-relaxed">
                The bank account that actually pays you base APY + SYRUP Drips. Your funds earn yield from institutional lending until the exact moment you spend. Non-custodial and instant.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-maple">5–7%</span>
                  <span className="text-maple-text-muted">APY on syrupUSDC</span>
                </div>
                <ul className="space-y-3 mb-8 text-maple-text-secondary text-sm">
                  {['Institutional-grade — yield from overcollateralized lending', 'Non-custodial — Turnkey MPC wallets, you control keys', 'Instant access — withdraw anytime via liquidity buffer', 'Global — EU, APAC, UAE (non-US)'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-maple mt-0.5">✓</span>
                      {item}
                  </li>
                ))}
              </ul>
                <button
                  onClick={() => { trackEvent('cta_click', 'Products', 'Contact Sales'); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  className="px-6 py-3 bg-maple rounded-full font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Contact Sales
                </button>
              </div>
              <div className="flex justify-center md:justify-end">
                {/* Visa card — maple-v2: dark gradient + orange overlay, gold chip, maple-orange logo */}
                <div
                  className="w-full max-w-[340px] aspect-[1.586] rounded-2xl flex flex-col justify-between p-6 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a, #1a1a1a)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,87,51,0.15), transparent 50%)' }} />
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                        <MapleIcon className="w-7 h-7" fill="#FC784A" />
                      </span>
                      <span className="font-bold text-base text-white">Maple</span>
                    </div>
                    <div className="w-10 h-7 rounded" style={{ background: 'linear-gradient(135deg, #d4af37, #f9e076, #d4af37)' }} />
                  </div>
                  <div className="font-mono text-lg tracking-[0.2em] text-white relative z-10">4532 •••• •••• 7891</div>
                  <div className="flex justify-between items-end relative z-10">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Cardholder</div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider mt-1">Your Name</div>
                    </div>
                    <div className="text-xl font-bold italic text-white">VISA</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* For Institutions — только карточка Visa в стиле maple-v2 */}
          {activeProductTab === 'institutional' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-maple-text">Maple Corporate Card</h3>
                <p className="text-maple-text-secondary mb-6 leading-relaxed">
                Operational capital that earns yield until spent. T-Bill backed security for DAOs, funds, and startups. US-compliant (Reg D).
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-maple">4.8-5.3%</span>
                  <span className="text-maple-text-muted">Net APY on US T-Bills</span>
                </div>
                <ul className="space-y-3 mb-8 text-maple-text-secondary text-sm">
                  {['Treasury management — earn on operational capital', 'T-Bill backed — US Treasury, institutional-grade security', 'Multi-card issuance — for your entire team', 'Reg D compliant — for US accredited investors'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-maple mt-0.5">✓</span>
                      {item}
                  </li>
                ))}
              </ul>
                <button
                  onClick={() => { trackEvent('cta_click', 'Products', 'Corporate Demo'); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                  className="px-6 py-3 bg-maple rounded-full font-semibold text-sm text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Contact Sales
                </button>
              </div>
              <div className="flex justify-center md:justify-end">
                {/* Visa card Corporate — maple-v2: gradient #1a1a2e, #2a2a4e, gold chip, orange M */}
                <div
                  className="w-full max-w-[340px] aspect-[1.586] rounded-2xl flex flex-col justify-between p-6 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a2e, #2a2a4e, #1a1a2e)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                  }}
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                        <MapleIcon className="w-7 h-7" fill="#FC784A" />
                      </span>
                      <span className="font-bold text-base text-white">Maple</span>
                    </div>
                    <div className="w-10 h-7 rounded" style={{ background: 'linear-gradient(135deg, #d4af37, #f9e076, #d4af37)' }} />
                  </div>
                  <div className="font-mono text-lg tracking-[0.2em] text-white relative z-10">4532 •••• •••• 1234</div>
                  <div className="flex justify-between items-end relative z-10">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Company</div>
                      <div className="text-xs font-semibold text-white uppercase tracking-wider mt-1">Acme Treasury</div>
                    </div>
                    <div className="text-xl font-bold italic text-white">VISA</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          </div>
          </div>
      </Section>

      {/* Current Friction (Problem) — сразу после Choose Your Product */}
      <Section id="friction" className="border-t-2 border-maple-structure shadow-[0_2px_10px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-maple-structure text-xs font-semibold uppercase tracking-[0.2em] text-maple-text-secondary mb-4">
              Current Friction (Problem)
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maple-text">
              The Yield-Liquidity Paradox
            </h2>
            <p className="text-maple-text-secondary max-w-2xl mx-auto text-base">
              Whether you are an individual or a DAO, accessing your capital currently costs you time, money, and sanity.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-maple-bg-alt border border-maple-structure hover:border-red-500/30 transition duration-300 relative group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-40 text-6xl font-bold text-maple-text-muted group-hover:text-red-500/10 transition select-none">01</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-500/20 rounded-xl text-2xl">🛑</div>
                <div>
                  <h3 className="text-xl font-bold text-maple-text">For Individuals</h3>
                  <p className="text-red-500 text-sm font-mono uppercase tracking-wider">The &quot;6-Step Trap&quot;</p>
                </div>
              </div>
              <p className="text-maple-text-secondary mb-6 text-sm">
                To spend your Maple yield, you face a complex multi-step process creating friction and delays.
              </p>
              <div className="space-y-4 mb-8 relative pl-1">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-maple-structure rounded-full" />
                {[
                  { num: '1', title: 'Connect Wallet', sub: 'UX friction • Multiple clicks' },
                  { num: '2', title: 'Withdraw from Syrup', sub: 'Gas fees (Solana, L2 or Ethereum)' },
                  { num: '3', title: 'Bridge to Exchange', sub: "Add'l gas + 15-30 min wait" },
                  { num: '…', title: 'Swap → KYC → Bank', sub: '1–3% spread + 3 day ACH wait' }
              ].map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-8 h-8 rounded-full bg-maple-bg border border-maple-structure flex items-center justify-center text-xs font-bold text-maple-text-muted shrink-0 z-10">
                      {item.num}
                  </div>
                    <div>
                      <div className="text-maple-text font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-maple-text-muted">{item.sub}</div>
                  </div>
                  </div>
              ))}
                </div>
              <div className="grid grid-cols-3 gap-3 border-t border-maple-structure pt-6">
                <div>
                  <div className="text-red-500 font-bold text-lg">15-30 min</div>
                  <div className="text-[10px] text-maple-text-muted uppercase">Wasted Time</div>
                </div>
                <div>
                  <div className="text-red-500 font-bold text-lg">4%</div>
                  <div className="text-[10px] text-maple-text-muted uppercase">Lost to Fees</div>
                </div>
                <div>
                  <div className="text-maple-text font-bold text-lg">Mercenary</div>
                  <div className="text-[10px] text-maple-text-muted uppercase">Capital Loyalty</div>
                </div>
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-maple-bg-alt border border-maple-structure hover:border-blue-500/30 transition duration-300 relative group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-40 text-6xl font-bold text-maple-text-muted group-hover:text-blue-500/10 transition select-none">02</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl text-2xl">📉</div>
                <div>
                  <h3 className="text-xl font-bold text-maple-text">For Institutions</h3>
                  <p className="text-blue-500 text-sm font-mono uppercase tracking-wider">The &quot;Operational Drag&quot;</p>
                </div>
              </div>
              <p className="text-maple-text-secondary mb-6 text-sm">
                DAOs and Funds manage treasury on-chain but pay expenses in fiat, leading to massive opportunity costs.
              </p>
              <div className="space-y-5 mb-8">
                {[
                  { title: 'Trapped Capital (The Float Problem)', sub: 'To pay expenses, you must keep $500k+ in a checking account earning 0% instead of 4.8-5.3% in T-Bills.' },
                  { title: 'Slow Operations (T+2)', sub: 'Need to pay a vendor urgently? Redeeming T-Bills to a bank account takes 2 business days.' },
                  { title: 'Accounting Nightmare', sub: 'Manual reconciliation between Etherscan, bank statements, and DAO votes.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <div>
                      <div className="text-maple-text font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-maple-text-muted mt-1">{item.sub}</div>
                </div>
                </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-maple-structure pt-6">
                <div>
                  <div className="text-blue-500 font-bold text-lg">0%</div>
                  <div className="text-[10px] text-maple-text-muted uppercase">Yield on Float</div>
                </div>
                <div>
                  <div className="text-blue-500 font-bold text-lg">T+2</div>
                  <div className="text-[10px] text-maple-text-muted uppercase">Liquidity Lag</div>
                </div>
                <div>
                  <div className="text-maple-text font-bold text-lg">Manual</div>
                  <div className="text-[10px] text-maple-text-muted uppercase">Ops Workload</div>
                </div>
                </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 text-center border-t border-maple-structure pt-8"
          >
            <p className="text-maple-text-secondary text-sm max-w-2xl mx-auto">
              <span className="font-medium text-maple-text">Strategic Consequence:</span>{' '}
              Maple currently operates as backend infrastructure. Without a direct app, third-party wallets capture the user relationship and retention value.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* How It Works — Technology */}
      <Section id="how-it-works" className="bg-maple-bg-alt/40 border-t-2 border-maple-structure shadow-[0_2px_10px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-maple-structure text-xs font-semibold uppercase tracking-[0.2em] text-maple-text-secondary mb-4">
              Technology (Solution)
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maple-text">
              How It Works
            </h2>
            <p className="text-maple-text-secondary max-w-xl mx-auto text-base">
            Your money stays earning yield until the exact second you pay. Powered by Maple's $204M+ instant liquidity buffer.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center max-w-[180px]"
            >
              <div className="w-[72px] h-[72px] rounded-full bg-maple-bg border-2 border-maple-structure flex items-center justify-center text-3xl mb-4">
                💳
                </div>
              <h4 className="text-base font-semibold mb-1.5 text-maple-text">Swipe Card</h4>
              <p className="text-sm text-maple-text-muted">Pay at any of 150M+ merchants worldwide</p>
            </motion.div>
            <div className="text-2xl text-maple-accent font-bold">→</div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center text-center max-w-[180px]"
            >
              <div className="w-[72px] h-[72px] rounded-full bg-maple-bg border-2 border-maple-structure flex items-center justify-center text-3xl mb-4">
                ⚡
                </div>
              <h4 className="text-base font-semibold mb-1.5 text-maple-text">Instant Swap</h4>
              <p className="text-sm text-maple-text-muted">Atomic settlement via liquidity buffer</p>
            </motion.div>
            <div className="text-2xl text-maple-accent font-bold">→</div>
          <motion.div
              initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center text-center max-w-[180px]"
            >
              <div className="w-[72px] h-[72px] rounded-full bg-maple-bg border-2 border-maple-structure flex items-center justify-center text-3xl mb-4">
                🏦
                  </div>
              <h4 className="text-base font-semibold mb-1.5 text-maple-text">Visa Settlement</h4>
              <p className="text-sm text-maple-text-muted">Instant approval, seamless payment</p>
          </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mt-10"
          >
            <div className="inline-block px-4 py-2 rounded-lg bg-emerald-500/10 text-sm">
              <span className="font-semibold text-emerald-500">Total time: &lt;5 seconds</span>
              <span className="text-maple-text-secondary"> — Your funds earn yield until the moment of payment</span>
                </div>
              </motion.div>

          {/* Settlement Models — две колонки, без переключения */}
                <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 pt-16 border-t border-maple-structure"
                >
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-maple-text mb-2">Settlement Models</h3>
              <p className="text-maple-text-secondary text-sm max-w-xl mx-auto">Two distinct settlement paths solve the liquidity trilemma</p>
              </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Atomic (Syrup) */}
              <div className="p-6 rounded-2xl border border-maple-structure bg-maple-bg-alt/50">
                <h4 className="text-base font-bold text-maple-text mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Atomic (Syrup)
                </h4>
                <p className="text-xs text-maple-text-muted mb-4">JIT — yield until the moment you pay</p>
                <ul className="space-y-2">
                  {[
                    { title: 'User swipes card', time: '0ms' },
                    { title: 'Marqeta webhook → JIT request', time: '50ms' },
                    { title: 'Atomic swap (syrupUSDC → USDC)', time: '400ms' },
                    { title: 'Off-ramp to fiat', time: '1s' },
                    { title: 'Visa approved', time: '<5s' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-maple-structure/50 last:border-0">
                      <span className="text-maple-text-secondary">{item.title}</span>
                      <span className="text-xs font-semibold text-emerald-500 tabular-nums">{item.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-maple-text-muted mt-4">$204M Instant Buffer • Solana 400ms finality</p>
                </div>
              {/* Credit (Cash Mgmt) */}
              <div className="p-6 rounded-2xl border border-maple-structure bg-maple-bg-alt/50">
                <h4 className="text-base font-bold text-maple-text mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" /> Credit (Cash Mgmt)
                </h4>
                <p className="text-xs text-maple-text-muted mb-4">T+1 net — treasury earns until End of Day</p>
                <ul className="space-y-2">
                  {[
                    { title: 'Employee spends (cards)', time: 'All day' },
                    { title: 'Float covers payments', time: 'Real-time' },
                    { title: 'End of Day netting (5 PM ET)', time: '5 PM' },
                    { title: 'Single batch withdrawal', time: 'Evening' },
                    { title: 'T+1 settlement', time: 'Next day' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-maple-structure/50 last:border-0">
                      <span className="text-maple-text-secondary">{item.title}</span>
                      <span className="text-xs font-semibold text-purple-400 tabular-nums">{item.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-maple-text-muted mt-4">T-Bill backed • 4.8-5.3% APY until settlement</p>
                </div>
              </div>
            </motion.div>

          {/* Why Solana — компактно и красиво */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-10 pt-8 border-t border-maple-structure"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-maple-text-muted">Why Solana</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-maple-structure" />
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-maple-bg-alt border border-maple-structure">
                <span className="text-maple font-bold tabular-nums">400ms</span>
                <span className="text-xs text-maple-text-muted">finality</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-maple-bg-alt border border-maple-structure">
                <span className="text-maple font-bold tabular-nums">&lt;$0.01</span>
                <span className="text-xs text-maple-text-muted">fees</span>
              </span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-maple-structure" />
              <span className="text-sm text-maple-text-secondary text-center md:text-left max-w-md">
                Card-sized txns profitable on-chain. Yield until the moment you pay.
              </span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Compare the Options — таблица как в maple-v2 */}
      <Section id="compare-options" className="border-t-2 border-maple-structure shadow-[0_2px_10px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-maple-structure text-xs font-semibold uppercase tracking-[0.2em] text-maple-text-secondary mb-4">
              Why Maple Wins
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maple-text">
              Compare the Options
              </h2>
            <p className="text-maple-text-secondary max-w-xl mx-auto text-base">
              See how Maple Mobile stacks up against the competition.
            </p>
          </motion.div>

              <motion.div
            initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto rounded-2xl border border-maple-structure mt-12"
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-maple-bg-alt">
                  <th className="py-4 px-5 text-left text-xs font-semibold uppercase tracking-wider text-maple-text-muted">Feature</th>
                  <th className="py-4 px-5 text-center text-xs font-semibold uppercase tracking-wider bg-maple-accent text-white rounded-t-xl">Maple Mobile</th>
                  <th className="py-4 px-5 text-center text-xs font-semibold uppercase tracking-wider text-maple-text-muted">Ondo Finance</th>
                  <th className="py-4 px-5 text-center text-xs font-semibold uppercase tracking-wider text-maple-text-muted">Coinbase Card</th>
                  <th className="py-4 px-5 text-center text-xs font-semibold uppercase tracking-wider text-maple-text-muted">Revolut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Yield on Balance', maple: '5-7% (Retail) / 4.8-5.3% (Inst.)', ondo: '4–5%', coinbase: '0% yield / 4% cashback', revolut: '0.5–1%' },
                  { feature: 'Instant Liquidity', maple: '✓ Buffer / T+1 (Corp)', ondo: 'T+0 to T+1', coinbase: '✓ Yes', revolut: '✓ Yes' },
                  { feature: 'Card Product', maple: '✓ Yes (Retail / Corp)', ondo: '✗ None', coinbase: '✓ Yes', revolut: '✓ Yes' },
                  { feature: 'Custody', maple: 'Non-custodial', ondo: 'Non-custodial', coinbase: 'Custodial', revolut: 'Custodial' },
                  { feature: 'Transaction Fees', maple: '<$0.01', ondo: '$2–50', coinbase: 'Low', revolut: 'Medium' }
              ].map((row, idx) => (
                  <tr key={idx} className="border-b border-maple-structure last:border-0">
                    <td className="py-4 px-5 font-medium text-maple-text text-left">{row.feature}</td>
                    <td className="py-4 px-5 text-center bg-maple-accent/5 font-semibold text-maple-text">{row.maple}</td>
                    <td className="py-4 px-5 text-center text-maple-text-secondary">{row.ondo}</td>
                    <td className="py-4 px-5 text-center text-maple-text-secondary">{row.coinbase}</td>
                    <td className="py-4 px-5 text-center text-maple-text-secondary">{row.revolut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </Section>

      {/* Market Opportunity — компактный стиль после Why Maple Wins */}
      <Section id="market" className="py-24 border-t-2 border-maple-structure shadow-[0_2px_10px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-maple-structure text-xs font-semibold uppercase tracking-[0.2em] text-maple-text-secondary mb-4">
              📈 Market Opportunity
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maple-text">
              The Market Has <GradientText>Shifted</GradientText>
            </h2>
            <p className="text-maple-text-secondary max-w-xl mx-auto text-base">
              Mobile-first users and virtual card growth create a massive opportunity for institutional DeFi to go mainstream.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { category: 'Mobile DeFi Adoption', number: '58%', description: 'of DeFi users on mobile wallets', details: '40–70M active mobile wallet users globally, +20% YoY. Mobile-first is present reality.', sources: 'a16z State of Crypto 2025, TradeSanta 2025' },
              { category: 'Virtual Card Market', number: '$17.4T', description: 'market size by 2029', details: '235% growth from $5.2T (2025). Virtual cards replace plastic; crypto-native rails can capture this shift.', sources: 'Juniper Research Virtual Cards 2025–2029' },
              { category: 'Stablecoin Infrastructure', number: '$9T', description: 'annual stablecoin volume', details: 'Adjusted for bots and wash trading, stablecoin volume rivals Visa\'s $14.2T. On-chain payments are ready.', sources: 'a16z, Forbes 2025, Visa Annual Report 2025' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-2xl border border-maple-structure bg-maple-bg-alt hover:border-maple/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-maple to-purple-500" />
                <div className="text-xs font-bold uppercase tracking-wider text-maple mb-3">{stat.category}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">{stat.number}</div>
                <div className="text-base font-semibold text-maple-text mb-2">{stat.description}</div>
                <div className="text-sm text-maple-text-secondary leading-relaxed mb-3">{stat.details}</div>
                <div className="pt-3 border-t border-maple-structure text-xs text-maple-text-muted italic">{stat.sources}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Tokenomics — Spend to Burn (как maple-v2: flywheel + steps) */}
      <Section id="tokenomics" className="bg-maple-bg-alt/30 border-t-2 border-maple-structure shadow-[0_2px_10px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-maple-structure text-xs font-semibold uppercase tracking-[0.2em] text-maple-text-secondary mb-4">
              Tokenomics
              </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maple-text">
              Spend to Burn
            </h2>
            <p className="text-maple-text-secondary max-w-xl mx-auto text-base">
              Every card transaction fuels SYRUP token buybacks. Use the app = support the token.
              </p>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-10 md:gap-12 items-center mt-12"
          >
            {/* Flywheel visual — круг с 4 пунктами и центром */}
            <div className="flex justify-center">
              <div
                className="relative flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 300, height: 300, borderColor: '#FF5733', borderWidth: 3 }}
              >
                <div className="absolute text-center z-10">
                  <h4 className="text-2xl font-bold" style={{ color: '#FF5733' }}>MIP-019</h4>
                  <p className="text-xs text-maple-text-muted mt-0.5">Flywheel</p>
                </div>
                <div className="absolute w-[100px] text-center" style={{ top: -50 }}>
                  <div className="w-12 h-12 rounded-xl border-2 border-maple-structure bg-maple-bg-alt flex items-center justify-center text-xl mx-auto mb-2">💳</div>
                  <span className="text-[11px] text-maple-text-secondary leading-tight">Card Usage</span>
                </div>
                <div className="absolute w-[100px] text-center" style={{ right: -60 }}>
                  <div className="w-12 h-12 rounded-xl border-2 border-maple-structure bg-maple-bg-alt flex items-center justify-center text-xl mx-auto mb-2">💰</div>
                  <span className="text-[11px] text-maple-text-secondary leading-tight">Revenue</span>
                </div>
                <div className="absolute w-[100px] text-center" style={{ bottom: -50 }}>
                  <div className="w-12 h-12 rounded-xl border-2 border-maple-structure bg-maple-bg-alt flex items-center justify-center text-xl mx-auto mb-2">🔥</div>
                  <span className="text-[11px] text-maple-text-secondary leading-tight">SYRUP Buyback</span>
                </div>
                <div className="absolute w-[100px] text-center" style={{ left: -60 }}>
                  <div className="w-12 h-12 rounded-xl border-2 border-maple-structure bg-maple-bg-alt flex items-center justify-center text-xl mx-auto mb-2">📈</div>
                  <span className="text-[11px] text-maple-text-secondary leading-tight">Token Value</span>
                    </div>
                  </div>
          </div>

            {/* Flywheel info + steps */}
            <div>
              <h3 className="text-2xl md:text-[28px] font-bold mb-4 text-maple-text">The SYRUP Flywheel</h3>
              <p className="text-maple-text-secondary text-base mb-6">
                Unlike other crypto cards that dilute token value with cashback rewards, Maple uses a deflationary model aligned with MIP-019.
              </p>
              <ul className="space-y-0 list-none">
                {[
                  'More card users → More AUM & transactions',
                  'Higher protocol revenue (interchange + yield share)',
                  '25% of revenue → Syrup Strategic Fund',
                  'Fund executes SYRUP market buybacks',
                  [<strong key="r">Result:</strong>, ' Card adoption = Token appreciation']
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 py-3 text-sm text-maple-text-secondary items-start">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0" style={{ background: '#FF5733' }}>
                      {i + 1}
                    </span>
                    <span>
                      {Array.isArray(text) ? <>{text[0]} {text[1]}</> : text}
                    </span>
                  </li>
                ))}
              </ul>
                </div>
              </motion.div>
            </div>


      </Section>

      {/* Business Model — Proven Unit Economics (после Tokenomics) */}
      <Section id="business-model" className="py-24 border-t-2 border-maple-structure shadow-[0_2px_10px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-maple-structure text-xs font-semibold uppercase tracking-[0.2em] text-maple-text-secondary mb-4">
            Business Model
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maple-text">
              Proven <GradientText>Unit Economics</GradientText>
            </h2>
            <p className="text-maple-text-secondary max-w-xl mx-auto text-base">
              A diversified revenue model combining yield management, interchange, and subscriptions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { Icon: YieldSpreadIcon, title: 'Yield Spread', amount: '0.5 - 1%', amountClass: 'text-maple', desc: 'Management fee on AUM. Primary driver at scale.', iconBg: 'bg-maple/10', iconColor: 'text-maple' },
              { Icon: InterchangeIcon, title: 'Interchange', amount: '0.8%', amountClass: 'text-blue-400', desc: 'Visa revenue on every card transaction.', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
              { Icon: FXFeesIcon, title: 'FX Fees', amount: '1.5%', amountClass: 'text-purple-400', desc: 'Markup on international spend (vs 3% at banks).', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
              { Icon: SubscriptionIcon, title: 'Subscription', amount: '$3 - $10/mo', amountClass: 'text-emerald-400', desc: 'Premium tiers for metal cards & higher limits.', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-maple-bg-alt border border-maple-structure hover:border-maple/30 transition-all duration-300 text-center group"
              >
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition ${item.iconBg} ${item.iconColor}`}>
                  <item.Icon className="w-6 h-6" stroke="currentColor" />
                </div>
                <h3 className="text-maple-text font-bold mb-1">{item.title}</h3>
                <div className={`font-mono text-xl mb-2 ${item.amountClass}`}>{item.amount}</div>
                <p className="text-xs text-maple-text-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-maple-bg-alt border border-maple-structure bg-gradient-to-br from-maple-bg-alt to-maple-bg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-maple-text">Retail Unit Economics</h3>
                <span className="px-3 py-1 rounded-full bg-maple/20 text-maple text-xs font-bold">Syrup Users</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-maple-text-secondary">Avg Revenue / User</span>
                  <span className="text-maple-text font-mono">$102.25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-maple-text-secondary">Total Cost / User</span>
                  <span className="text-red-400 font-mono">-$37.88</span>
                </div>
                <div className="h-px bg-maple-structure my-2" />
                <div className="flex justify-between items-end">
                    <div>
                    <div className="text-3xl font-bold text-maple-text mb-1">$64.37</div>
                    <div className="text-xs text-maple-text-muted">Gross Profit per User</div>
                </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">63%</div>
                    <div className="text-xs text-maple-text-muted">Margin</div>
              </div>
                    </div>
                  </div>
              <div className="mt-6 pt-6 border-t border-maple-structure">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-maple-text-muted mb-2">Assumptions</div>
                <p className="text-xs text-maple-text-secondary leading-relaxed">
                  $2,500 avg AUM, 1.5x spend velocity ($3,750 annual spending), 20% international transactions, 50% subscribe to premium tier.
                </p>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-maple-bg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-maple-text">Institutional Economics</h3>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">Corporate</span>
              </div>
                <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-maple-text-secondary">Avg Revenue / Client</span>
                  <span className="text-maple-text font-mono">$29,300</span>
                  </div>
                <div className="flex justify-between text-sm">
                  <span className="text-maple-text-secondary">LTV / CAC Ratio</span>
                  <span className="text-blue-400 font-mono font-bold">55x</span>
                  </div>
                <div className="h-px bg-maple-structure my-2" />
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold text-maple-text mb-1">$23,150</div>
                    <div className="text-xs text-maple-text-muted">Gross Profit per Client</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">79%</div>
                    <div className="text-xs text-maple-text-muted">Margin</div>
                </div>
              </div>
            </div>
              <div className="mt-6 pt-6 border-t border-blue-500/20">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-maple-text-muted mb-2">Assumptions</div>
                <p className="text-xs text-maple-text-secondary leading-relaxed">
                  $5M avg AUM, $1.8M annual team spending, $30K float reserve (2 weeks), $2K CAC (enterprise sales).
                </p>
            </div>
          </motion.div>
        </div>

          <p className="text-center text-xs text-maple-text-muted mt-8">
            Full financial model available in the technical whitepaper.
          </p>
        </div>
      </Section>

      {/* Contact — Let's Build This Together (в стиле сайта) */}
      <Section id="contact" className="border-t-2 border-maple-structure shadow-[0_2px_10px_rgba(0,0,0,0.07),0_4px_20px_rgba(0,0,0,0.04)]">
    
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Partnership</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maple-text leading-tight">
              The Infrastructure is Ready.<br />
              <GradientText>Let’s Build This Together.</GradientText>
            </h2>
            <p className="text-maple-text-secondary max-w-xl mx-auto text-base mb-10">
              WOOF Software has architected the full stack: Solana contracts, Turnkey wallets, and Rain issuance. We are ready to execute this vision for Maple Finance immediately.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
              href="https://calendly.com/dmitriy-woof/small-talk"
              target="_blank"
              rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-maple font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ color: '#ffffff' }}
              >
                <span className="text-white">Schedule Partnership Discussion</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <div
                className="w-full sm:w-auto flex items-center gap-3 px-6 py-4 rounded-xl bg-maple-bg-alt border border-maple-structure hover:border-maple/30 transition-colors cursor-pointer"
                onClick={() => { navigator.clipboard.writeText('dmitriy@woof.software'); alert('Email copied to clipboard!'); }}
                onKeyDown={(e) => e.key === 'Enter' && (navigator.clipboard.writeText('dmitriy@woof.software'), alert('Email copied to clipboard!'))}
                role="button"
                tabIndex={0}
              >
                <span className="text-maple-text-secondary font-mono text-sm">dmitriy@woof.software</span>
                <svg className="w-5 h-5 text-maple-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Footer — тёмный тон #1e1e1e */}
      <footer className="py-8 border-t border-white/10" style={{ backgroundColor: '#1e1e1e' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="WOOF" className="w-8 h-8 flex-shrink-0" />
            <span className="font-semibold text-white">WOOF SOFTWARE</span>
          </div>
          <p className="text-gray-400 text-sm text-center flex-1 px-4">
            Proposal prepared by <strong>WOOF Software</strong> for Maple Finance Leadership.
          </p>
          <p className="text-gray-400 text-sm">© 2026 WOOF</p>
        </div>
      </footer>
    </div>
  );
}
