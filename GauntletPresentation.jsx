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
      <div className="w-full h-full bg-[#0a0a0f] rounded-[3rem] overflow-hidden relative">
        {/* Status Bar with Dynamic Island */}
        <div className="absolute top-0 left-0 right-0 z-20 px-5 pt-3">
          <div className="flex items-center justify-between">
            {/* Time - Left corner */}
            <span className="text-[13px] font-semibold text-white w-12">9:41</span>
            
            {/* Dynamic Island - Center */}
            <div className="w-[100px] h-[32px] bg-black rounded-full flex items-center justify-center gap-1.5 px-3">
              <div className="w-1 h-1 bg-zinc-600 rounded-full" />
              <div className="w-5 h-5 bg-zinc-800 rounded-full border border-zinc-700" />
            </div>
            
            {/* Signal & Battery - Right corner */}
            <div className="flex items-center gap-1 w-12 justify-end">
              <div className="flex items-end gap-0.5">
                <div className="w-0.5 h-1 bg-white rounded-t" />
                <div className="w-0.5 h-1.5 bg-white rounded-t" />
                <div className="w-0.5 h-2 bg-white rounded-t" />
                <div className="w-0.5 h-2.5 bg-white rounded-t" />
              </div>
              <div className="flex items-center">
                <div className="w-5 h-2.5 border border-white rounded-[2px] px-[1px] flex items-center">
                  <div className="h-1.5 bg-white rounded-[1px]" style={{ width: '82%' }} />
                </div>
                <div className="w-0.5 h-1 bg-white rounded-r" />
              </div>
            </div>
          </div>
        </div>
        
        {children}
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  </div>
);

// Section Component
const Section = ({ children, className = '', id = '' }) => (
  <section id={id} className={`min-h-screen flex items-center justify-center py-20 px-6 relative ${className}`}>
    {children}
  </section>
);

// Accent Text Component (solid color, no gradient fade)
const GradientText = ({ children, className = '' }) => (
  <span className={`text-maple ${className}`}>
    {children}
  </span>
);

// Maple Logo Icon Component (icon only, no text)
const MapleIcon = ({ className = 'w-8 h-8' }) => (
  <svg 
    className={className} 
    width="100%" 
    height="100%" 
    viewBox="0 0 68 79" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.245784 39.2654C15.0249 38.8351 50.2753 37.2177 58.1423 25.7734C64.123 17.0767 50.923 8.02049 44.6492 4.74798C38.3754 1.46601 29.6479 0 29.6479 0C47.2117 1.98148 74.978 11.6004 66.3356 29.0885C58.5962 44.7417 18.2445 46.8698 0.236328 46.8698V39.2607H0.245784V39.2654Z" fill="#141414"></path>
    <path d="M0.236328 78.5499V71.0638C22.5893 70.3166 52.4596 69.6687 67.9525 54.8525C68.3733 67.9048 50.5023 73.7924 36.8247 76.2468C24.9864 78.3702 12.382 78.8904 0.241056 78.5499H0.236328Z" fill="#141414"></path>
    <path d="M67.9621 38.6411C55.6934 51.315 31.0758 54.8334 0 54.8334V62.4236C32.6785 62.4236 67.8675 57.6283 67.9621 38.6411Z" fill="#141414"></path>
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
  const autoPlayRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  const phoneScreens = useMemo(() => [
    { title: 'Vaults', id: 'vaults' },
    { title: 'Dashboard', id: 'dashboard' },
    { title: 'Card', id: 'card' },
    { title: 'Transactions', id: 'transactions' },
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
    }, 2500); // 2.5 seconds
    
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
    <div className="bg-[#0a0a0f] text-white font-sans overflow-x-hidden w-full min-w-0" style={{ width: '100vw', maxWidth: '100%' }}>
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapleIcon className="w-8 h-8" />
            <span className="font-bold text-lg tracking-tight hidden sm:block">MAPLE FINANCE</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <button onClick={() => {
              trackEvent('navigation_click', 'Navigation', 'Vision');
              document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} className="hover:text-white transition-colors cursor-pointer">Vision</button>
            <button onClick={() => {
              trackEvent('navigation_click', 'Navigation', 'Problem');
              document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} className="hover:text-white transition-colors cursor-pointer">Problem</button>
            <button onClick={() => {
              trackEvent('navigation_click', 'Navigation', 'Solution');
              document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} className="hover:text-white transition-colors cursor-pointer">Solution</button>
            <button onClick={() => {
              trackEvent('navigation_click', 'Navigation', 'Business');
              document.getElementById('business')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} className="hover:text-white transition-colors cursor-pointer">Business</button>
            <button onClick={() => {
              trackEvent('navigation_click', 'Navigation', 'Contact');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </div>
          
          {/* Desktop CTA */}
          <button 
            onClick={() => {
              trackEvent('cta_click', 'CTA', 'Schedule Call - Header');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hidden md:block px-4 py-2 bg-maple rounded-full text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Schedule Call
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
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
              className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {[
                  { label: 'Vision', id: 'vision' },
                  { label: 'Problem', id: 'problem' },
                  { label: 'Solution', id: 'solution' },
                  { label: 'Business', id: 'business' },
                  { label: 'Contact', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      trackEvent('navigation_click', 'Mobile Navigation', item.label);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setMobileMenuOpen(false);
                    }}
                    className="py-3 px-4 text-left text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    trackEvent('cta_click', 'CTA', 'Schedule Call - Mobile Menu');
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 py-3 px-4 bg-maple rounded-lg text-center font-semibold hover:opacity-90 transition-opacity"
                >
                  Schedule Call
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <Section className="pt-32" id="hero">
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
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-zinc-400 border border-white/10">
                <span className="w-2 h-2 bg-maple rounded-full animate-pulse" />
                Strategic Partnership Proposal
              </div>
            </div>
            
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Seamless DeFi Management<br />
                <GradientText>Powered by Maple Finance</GradientText>
            </h1>
            
              <p className="text-lg text-zinc-400 mb-8">
                A unified mobile interface that makes Maple's institutional-grade vault infrastructure accessible to everyone. One app. All chains. Zero complexity.
              </p>

              {/* Features with checkmarks - horizontal */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-maple flex-shrink-0" />
                  <span className="text-zinc-300">Zero Gas Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-maple flex-shrink-0" />
                  <span className="text-zinc-300">No Bridging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-maple flex-shrink-0" />
                  <span className="text-zinc-300">No Seed Phrases</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
              <button 
                onClick={() => {
                  trackEvent('cta_click', 'CTA', 'Explore Solution - Hero');
                  document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-8 py-4 bg-maple rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
              >
                Explore Solution <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  trackEvent('cta_click', 'CTA', 'View Business Model - Hero');
                  document.getElementById('business')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                View Business Model
              </button>
            </div>

          </motion.div>

            {/* Right Column - Animated Phone Preview */}
          <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex flex-col items-center md:items-end"
          >
            <PhoneMockup>
              <div className="h-full flex flex-col bg-[#0a0a0f] pt-11">
                {/* Screen Content */}
                <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                      initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                      className="absolute inset-0 overflow-y-auto"
                >
                      {/* Vaults Screen */}
                  {activeScreen === 0 && (
                        <div className="p-3 space-y-2.5 overflow-y-auto h-full">
                          <div className="mb-2">
                            <p className="text-lg font-bold mb-0.5 leading-tight">Your Vaults</p>
                            <p className="text-[10px] text-zinc-500">100% capital efficiency</p>
                      </div>

                          {/* Earn Strategy Vaults */}
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-zinc-400 mb-1.5">Earn Strategy</p>
                            {[
                              { name: 'USDC Earn', apy: '4.8%', balance: '$5,200', change: '+0.15%', color: 'maple', strategy: 'Earn' },
                              { name: 'ETH Earn', apy: '5.6%', balance: '$3,800', change: '+0.18%', color: 'maple', strategy: 'Earn' }
                            ].map((vault, i) => (
                              <motion.div
                                key={vault.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-3 bg-white/5 rounded-xl border border-white/10 mb-2"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="text-sm font-semibold mb-0.5 leading-tight">{vault.name}</p>
                                    <p className="text-[10px] text-zinc-500">Maple Finance Curated • {vault.strategy}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-base font-bold text-[#32d583] leading-tight">{vault.apy}</p>
                                    <p className="text-[10px] text-zinc-500">{vault.change}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <p className="text-xs text-zinc-400">Balance</p>
                                  <p className="text-xs font-semibold">{vault.balance}</p>
                                </div>
                                <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${[52, 38][i]}%` }}
                                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                                    className={`h-full ${
                                      vault.color === 'maple' ? 'bg-maple' :
                                      'bg-gradient-to-r from-maple-300 to-maple-600'
                                    }`}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Prime Lending Strategy Vaults */}
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-zinc-400 mb-1.5">Prime Lending</p>
                            {[
                              { name: 'USDC Prime', apy: '6.2%', balance: '$4,500', change: '+0.22%', color: 'maple', strategy: 'Prime Lending' },
                              { name: 'WETH Prime', apy: '7.1%', balance: '$2,100', change: '+0.28%', color: 'maple', strategy: 'Prime Lending' }
                            ].map((vault, i) => (
                              <motion.div
                                key={vault.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="p-3 bg-white/5 rounded-xl border border-white/10 mb-2"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="text-sm font-semibold mb-0.5 leading-tight">{vault.name}</p>
                                    <p className="text-[10px] text-zinc-500">Maple Finance Curated • {vault.strategy}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-base font-bold text-[#32d583] leading-tight">{vault.apy}</p>
                                    <p className="text-[10px] text-zinc-500">{vault.change}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <p className="text-xs text-zinc-400">Balance</p>
                                  <p className="text-xs font-semibold">{vault.balance}</p>
                                </div>
                                <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${[45, 21][i]}%` }}
                                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                                    className={`h-full ${
                                      vault.color === 'maple' ? 'bg-maple' :
                                      'bg-gradient-to-r from-maple-300 to-maple-600'
                                    }`}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Balanced Lending Strategy Vaults */}
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-zinc-400 mb-1.5">Balanced Lending</p>
                            {[
                              { name: 'USDC Balanced', apy: '7.8%', balance: '$3,200', change: '+0.32%', color: 'maple', strategy: 'Balanced Lending' },
                              { name: 'DAI Balanced', apy: '8.4%', balance: '$1,900', change: '+0.35%', color: 'amber', strategy: 'Balanced Lending' }
                            ].map((vault, i) => (
                              <motion.div
                                key={vault.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="p-3 bg-white/5 rounded-xl border border-white/10 mb-2"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="text-sm font-semibold mb-0.5 leading-tight">{vault.name}</p>
                                    <p className="text-[10px] text-zinc-500">Maple Finance Curated • {vault.strategy}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-base font-bold text-[#32d583] leading-tight">{vault.apy}</p>
                                    <p className="text-[10px] text-zinc-500">{vault.change}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <p className="text-xs text-zinc-400">Balance</p>
                                  <p className="text-xs font-semibold">{vault.balance}</p>
                                </div>
                                <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${[32, 19][i]}%` }}
                                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                                    className={`h-full ${
                                      'bg-gradient-to-r from-maple-300 to-maple-600'
                                    }`}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Frontier Lending Strategy Vaults */}
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-zinc-400 mb-1.5">Frontier Lending</p>
                            {[
                              { name: 'USDC Frontier', apy: '10.2%', balance: '$1,800', change: '+0.42%', color: 'amber', strategy: 'Frontier Lending' },
                              { name: 'WBTC Frontier', apy: '11.8%', balance: '$950', change: '+0.48%', color: 'maple', strategy: 'Frontier Lending' }
                            ].map((vault, i) => (
                              <motion.div
                                key={vault.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="p-3 bg-white/5 rounded-xl border border-white/10 mb-2"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="text-sm font-semibold mb-0.5 leading-tight">{vault.name}</p>
                                    <p className="text-[10px] text-zinc-500">Maple Finance Curated • {vault.strategy}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-base font-bold text-[#32d583] leading-tight">{vault.apy}</p>
                                    <p className="text-[10px] text-zinc-500">{vault.change}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <p className="text-xs text-zinc-400">Balance</p>
                                  <p className="text-xs font-semibold">{vault.balance}</p>
                                </div>
                                <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${[18, 9.5][i]}%` }}
                                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                                    className={`h-full ${
                                      vault.color === 'amber' ? 'bg-gradient-to-r from-maple-600 to-maple' :
                                      'bg-maple'
                                    }`}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 mt-2">
                            <TrendingUp className="w-3.5 h-3.5" />
                            Explore More Vaults
                          </button>
                    </div>
                  )}

                      {/* Dashboard Screen */}
                  {activeScreen === 1 && (
                        <div className="p-3 space-y-2.5 overflow-y-auto h-full">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-[10px] text-zinc-500 mb-0.5">Total Balance</p>
                              <p className="text-2xl font-bold leading-tight">$12,847.32</p>
                      </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maple/20 to-maple-300/20 flex items-center justify-center">
                              <Lock className="w-4 h-4 text-maple" />
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-maple text-xs bg-maple/10 px-2 py-1.5 rounded-lg">
                            <TrendingUp className="w-3 h-3" />
                            <span>+5.2% APY • All funds earning</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <button className="py-2 bg-maple rounded-lg font-semibold text-xs">
                              Deposit
                            </button>
                            <button className="py-2 bg-white/5 border border-white/10 rounded-lg font-semibold text-xs">
                              Withdraw
                            </button>
                          </div>

                          <div className="mt-3">
                            <p className="text-xs font-semibold mb-2">Quick Actions</p>
                            <div className="grid grid-cols-3 gap-2">
                              <button className="p-2 bg-white/5 rounded-lg flex flex-col items-center gap-1">
                                <CreditCard className="w-4 h-4 text-maple" />
                                <span className="text-[10px]">Pay</span>
                              </button>
                              <button className="p-2 bg-white/5 rounded-lg flex flex-col items-center gap-1">
                                <ArrowRight className="w-4 h-4 text-maple-300" />
                                <span className="text-[10px]">Send</span>
                              </button>
                              <button className="p-2 bg-white/5 rounded-lg flex flex-col items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-amber-400" />
                                <span className="text-[10px]">Earn</span>
                              </button>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-xs font-semibold mb-2">Recent Activity</p>
                            <div className="space-y-1.5">
                              {[
                                { type: 'Starbucks', amount: '-$5.20', time: '2h ago', icon: <CreditCard className="w-3.5 h-3.5" /> },
                                { type: 'Deposit', amount: '+$1,000', time: '1d ago', icon: <TrendingUp className="w-3.5 h-3.5" /> },
                                { type: 'Yield', amount: '+$12.45', time: '2d ago', icon: <DollarSign className="w-3.5 h-3.5" /> }
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.amount.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
                                      {item.icon}
                                    </div>
                                    <div>
                                      <p className="text-xs font-medium leading-tight">{item.type}</p>
                                      <p className="text-[10px] text-zinc-500 leading-tight">{item.time}</p>
                                    </div>
                                  </div>
                                  <p className={`text-xs font-semibold ${item.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
                                    {item.amount}
                                  </p>
                                </div>
                              ))}
                            </div>
                      </div>
                    </div>
                  )}

                      {/* Card Screen */}
                  {activeScreen === 2 && (
                        <div className="p-3 space-y-2.5 overflow-y-auto h-full">
                          <div className="mb-2">
                            <p className="text-lg font-bold mb-0.5 leading-tight">Maple Finance Card</p>
                            <p className="text-[10px] text-zinc-500">Spend your yield instantly</p>
                          </div>

                          <div className="aspect-[1.6/1] rounded-xl p-3 relative overflow-hidden border border-white/10" style={{ background: 'linear-gradient(135deg, #6c77f2 0%, #4a54c7 50%, #2D3362 100%)' }}>
                            
                            <div className="relative z-10 h-full flex flex-col justify-between">
                              <div className="flex items-center justify-between">
                                <div className="w-8 h-5 bg-white/30 rounded" />
                                <div className="flex gap-1">
                                  <div className="w-5 h-5 bg-white/30 rounded-full" />
                                  <div className="w-5 h-5 bg-white/20 rounded-full" />
                                </div>
                              </div>
                              
                              <div className="pb-1">
                                <p className="text-[9px] text-[#C6CCFB] mb-0.5 leading-tight">Card Number</p>
                                <p className="text-sm font-mono tracking-wide leading-tight text-white">4532 •••• •••• 4832</p>
                                <div className="flex items-center justify-between mt-2">
                                  <div>
                                    <p className="text-[9px] text-[#AAB3F9] leading-tight">Cardholder</p>
                                    <p className="text-[10px] font-semibold leading-tight text-white">JOHN SMITH</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[9px] text-[#AAB3F9] leading-tight">Expires</p>
                                    <p className="text-[10px] font-semibold leading-tight text-white">12/28</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button className="py-2 bg-maple rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5">
                              <Wallet className="w-3.5 h-3.5" />
                              Apple Pay
                            </button>
                            <button className="py-2 bg-white/5 border border-white/10 rounded-lg font-semibold text-xs">
                              Freeze
                            </button>
                          </div>

                          <div className="p-3 bg-maple/10 rounded-lg border border-maple/30/20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Zap className="w-3.5 h-3.5 text-maple" />
                              <p className="text-xs font-semibold">Just-in-Time Unstake</p>
                            </div>
                            <p className="text-[10px] text-zinc-400 leading-tight">
                              Funds unstake automatically when you pay. 100% capital efficiency.
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold">Card Settings</p>
                            {['Spending Limit', 'Notifications', 'Security'].map((setting) => (
                              <div key={setting} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                                <span className="text-xs">{setting}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                        </div>
                      ))}
                          </div>
                    </div>
                  )}

                      {/* Transactions Screen */}
                  {activeScreen === 3 && (
                        <div className="p-3 space-y-2.5 overflow-y-auto h-full">
                          <div className="mb-2">
                            <p className="text-lg font-bold mb-0.5 leading-tight">Activity</p>
                            <p className="text-[10px] text-zinc-500">All your transactions</p>
                        </div>

                          <div className="flex gap-1.5 mb-2 overflow-x-auto">
                            <button className="px-3 py-1.5 bg-maple rounded-full text-[10px] font-semibold whitespace-nowrap">All</button>
                            <button className="px-3 py-1.5 bg-white/5 rounded-full text-[10px] whitespace-nowrap">Payments</button>
                            <button className="px-3 py-1.5 bg-white/5 rounded-full text-[10px] whitespace-nowrap">Deposits</button>
                            <button className="px-3 py-1.5 bg-white/5 rounded-full text-[10px] whitespace-nowrap">Yield</button>
                      </div>

                          <div className="space-y-1.5">
                            {[
                              { type: 'Payment', merchant: 'Starbucks', amount: '-$5.20', date: 'Today, 2:34 PM', status: 'completed', icon: <CreditCard className="w-3.5 h-3.5" /> },
                              { type: 'Payment', merchant: 'Uber', amount: '-$12.50', date: 'Today, 10:12 AM', status: 'completed', icon: <CreditCard className="w-3.5 h-3.5" /> },
                              { type: 'Yield', merchant: 'Prime Lending', amount: '+$12.45', date: 'Yesterday', status: 'completed', icon: <TrendingUp className="w-3.5 h-3.5" /> },
                              { type: 'Deposit', merchant: 'Bank Transfer', amount: '+$1,000', date: '2 days ago', status: 'completed', icon: <ArrowRight className="w-3.5 h-3.5" /> },
                              { type: 'Payment', merchant: 'Amazon', amount: '-$89.99', date: '3 days ago', status: 'completed', icon: <CreditCard className="w-3.5 h-3.5" /> },
                              { type: 'Yield', merchant: 'Balanced', amount: '+$8.32', date: '4 days ago', status: 'completed', icon: <TrendingUp className="w-3.5 h-3.5" /> }
                            ].map((tx, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
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
                                    <p className="text-xs font-medium truncate">{tx.merchant}</p>
                                    <p className="text-[10px] text-zinc-500 truncate">{tx.date}</p>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0 ml-2">
                                  <p className={`text-xs font-semibold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
                                    {tx.amount}
                                  </p>
                                  <p className="text-[10px] text-zinc-500">{tx.status}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Profile Screen */}
                      {activeScreen === 4 && (
                        <div className="p-3 space-y-2.5 overflow-y-auto h-full">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-maple flex items-center justify-center text-lg font-bold text-black">
                              JS
                            </div>
                            <div>
                              <p className="text-base font-bold leading-tight">John Smith</p>
                              <p className="text-[10px] text-zinc-500">john.smith@example.com</p>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold mb-1.5">Account</p>
                            {['Wallet Settings', 'Security', 'Notifications', 'Privacy'].map((item) => (
                              <div key={item} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                                <span className="text-xs">{item}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                              </div>
                            ))}
                          </div>

                          <div className="space-y-1.5 mt-3">
                            <p className="text-xs font-semibold mb-1.5">Support</p>
                            {['Help Center', 'Contact Us', 'Terms & Privacy'].map((item) => (
                              <div key={item} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                                <span className="text-xs">{item}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 p-3 bg-maple/10 rounded-lg border border-maple/30/20">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Shield className="w-3.5 h-3.5 text-maple" />
                              <p className="text-xs font-semibold">Account Abstraction</p>
                            </div>
                            <p className="text-[10px] text-zinc-400 leading-tight">
                              Your wallet uses ERC-4337. Gas fees are sponsored. 100% capital efficiency.
                            </p>
                          </div>

                          <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg font-semibold text-xs mt-3">
                            Sign Out
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
                </div>

                {/* Tab Bar - Bottom Navigation */}
                <div className="flex items-center justify-around px-2 py-2 border-t border-white/5 bg-[#0a0a0f] relative z-10">
                  {[
                    { icon: <Wallet className="w-4 h-4" />, label: 'Vaults' },
                    { icon: <TrendingUp className="w-4 h-4" />, label: 'Home' },
                    { icon: <CreditCard className="w-4 h-4" />, label: 'Card' },
                    { icon: <Clock className="w-4 h-4" />, label: 'Activity' },
                    { icon: <Users className="w-4 h-4" />, label: 'Profile' }
                  ].map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => handleScreenChange(i)}
                      className={`flex flex-col items-center gap-0.5 py-0.5 transition-colors ${
                        i === activeScreen ? 'text-maple' : 'text-zinc-500'
                      }`}
                    >
                      {tab.icon}
                      <span className="text-[9px] leading-tight">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </PhoneMockup>
            
            {/* Screen Indicators - Below Phone, centered */}
            <div className="w-[320px] flex justify-center gap-2 mt-4">
              {phoneScreens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleScreenChange(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeScreen ? 'bg-maple w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </Section>

      {/* Vision Section - Strategic Framework */}
      <Section id="vision">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <GradientText>Unified DeFi Super-App</GradientText>
            </h2>
            <p className="text-zinc-400 max-w-3xl mx-auto text-lg">
              A single mobile interface that consolidates all Maple vault infrastructure across every supported chain into one seamless experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Phase 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-gradient-to-br from-maple/10 to-maple/0 rounded-3xl border border-maple/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-maple/20 rounded-xl flex items-center justify-center">
                  <span className="text-maple font-bold">1</span>
                </div>
                <span className="text-maple text-sm font-semibold tracking-wider">PHASE 1 — CORE PRODUCT</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Easy DeFi Management</h3>
              <p className="text-zinc-400 mb-6 text-sm">
                Institutional-grade vault infrastructure made accessible through consumer-grade mobile experience.
              </p>
              <ul className="space-y-3">
                {[
                  'All Maple vaults: Morpho, Kamino, Drift, Symbiotic',
                  'Multi-chain: Ethereum, Base, Arbitrum, Optimism, Polygon, Solana',
                  'Multi-asset: USDC, USDT, ETH, wstETH, cbBTC, SOL',
                  'One-tap position migration for yield optimization',
                  'Passkey auth (FaceID/TouchID) — no seed phrases'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-maple mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 bg-gradient-to-br from-maple-300/10 to-maple/0 rounded-3xl border border-maple-300/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-maple-300/20 rounded-xl flex items-center justify-center">
                  <span className="text-maple-300 font-bold">2</span>
                </div>
                <span className="text-maple-300 text-sm font-semibold tracking-wider">PHASE 2 — EXTENSION</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Instant Spending Layer</h3>
              <p className="text-zinc-400 mb-6 text-sm">
                A natural extension enabling users to spend on-chain balances in everyday situations once the super-app is established.
              </p>
              <ul className="space-y-3">
                {[
                  'Virtual Visa card via card issuance partner',
                  'Just-in-Time liquidity: 100% earning until payment',
                  'Apple Pay & Google Pay native integration',
                  '150M+ merchant acceptance globally',
                  '"Sticky capital" via spending convenience'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-maple-300 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Current User Friction */}
          <motion.div
            id="problem"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-16 scroll-mt-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Current User <span className="text-red-400">Friction</span>
            </h2>
            <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-16">
              To access or spend their Maple vault yields, users face a complex multi-step process that creates friction, delays, and unnecessary costs.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-zinc-300">Current Process</h3>
                <div className="space-y-3">
                {[
                    { step: 'Connect external wallet to Maple', issue: 'UX friction • Multiple clicks' },
                    { step: 'Unstake from vault', issue: 'Gas fees: $0.01-0.10 (L2) or $1-20 (L1)' },
                    { step: 'Bridge to exchange-supported network', issue: 'Additional gas + 5-30 min wait' },
                    { step: 'Swap to fiat via exchange/on-ramp', issue: 'Fees: 1-3% spread + trading fees' },
                    { step: 'Complete KYC verification', issue: 'Time delay • Privacy concerns' },
                    { step: 'Withdraw to bank account', issue: '1-3 day ACH wait' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-white">{item.step}</span>
                        <span className="text-red-400 text-sm">{item.issue}</span>
                  </div>
                </motion.div>
              ))}
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-zinc-300">Impact & Consequences</h3>
                {/* The Impact */}
                <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20">
                  <h4 className="text-lg font-bold mb-4">The Impact</h4>
                  <div className="grid grid-cols-2 gap-6">
                <div>
                      <p className="text-3xl font-bold text-red-400">10-30</p>
                      <p className="text-zinc-400 text-sm">Minutes to access funds</p>
                </div>
                <div>
                      <p className="text-3xl font-bold text-red-400">1.5-4%</p>
                      <p className="text-zinc-400 text-sm">Lost to fees & slippage</p>
                </div>
                </div>
              </div>

                {/* Strategic Consequence */}
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="text-lg font-bold mb-3">Strategic Consequence</h4>
                  <p className="text-zinc-400 mb-4">
                    This friction makes capital "mercenary" — users chase marginally higher yields elsewhere due to withdrawal complexity, not product quality.
                  </p>
                  <p className="text-zinc-400 text-sm border-t border-white/10 pt-4">
                    Maple operates as backend infrastructure, with no direct user relationship or brand engagement. Third-party interfaces capture all user interaction and retention value.
                  </p>
                </div>
            </motion.div>
          </div>
          </motion.div>
        </div>
      </Section>

      {/* Market Shift Section */}
      <Section id="market">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              The Market Has <GradientText>Shifted</GradientText>
            </h2>
            <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-16">
              Mobile-first users and the virtual card explosion create a massive opportunity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-maple/20 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-maple" />
                </div>
                <span className="text-zinc-400">Mobile DeFi</span>
              </div>
              <p className="text-6xl font-bold mb-2">
                <AnimatedCounter value={58} suffix="%" />
              </p>
              <p className="text-zinc-400 mb-4">of DeFi users on mobile wallets</p>
              <div className="flex items-center gap-2 text-maple text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>40-70M active mobile wallet users (+20% YoY)</span>
              </div>
              <p className="text-xs text-zinc-500 mt-4">
                Sources: <a href="https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/" target="_blank" rel="noopener noreferrer" className="text-[#AAB3F9] hover:text-maple hover:underline transition-colors">a16z State of Crypto 2025</a>, <a href="https://tradesanta.com/blog/defi-in-2025-key-market-insights" target="_blank" rel="noopener noreferrer" className="text-[#AAB3F9] hover:text-maple hover:underline transition-colors">TradeSanta 2025</a>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-maple-300/20 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-maple-300" />
                </div>
                <span className="text-zinc-400">Virtual Cards</span>
              </div>
              <p className="text-6xl font-bold mb-2">
                $<AnimatedCounter value={17.4} suffix="T" />
              </p>
              <p className="text-zinc-400 mb-4">market size by 2029</p>
              <div className="flex items-center gap-2 text-maple-300 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>235% growth from $5.2T (2025)</span>
              </div>
              <p className="text-xs text-zinc-500 mt-4">
                Source: <a href="https://www.juniperresearch.com/research/fintech-payments/emerging-payments/virtual-cards-market-research-report/" target="_blank" rel="noopener noreferrer" className="text-[#AAB3F9] hover:text-maple hover:underline transition-colors">Juniper Research Virtual Cards Market 2025-2029</a>
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 text-center"
          >
            <p className="text-2xl font-semibold">
              <AnimatedCounter value={9} prefix="$" suffix="T" /> annual stablecoin volume
            </p>
            <p className="text-xs text-zinc-500 mt-1">(adjusted, excluding bots and wash trading)</p>
            <p className="text-zinc-400 mt-2">Now rivals Visa's $14.2T — the infrastructure is ready</p>
            <p className="text-xs text-zinc-500 mt-4">
              Sources: <a href="https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/" target="_blank" rel="noopener noreferrer" className="text-[#AAB3F9] hover:text-maple hover:underline transition-colors">a16z State of Crypto 2025</a>, <a href="https://www.forbes.com/sites/roomykhan/2025/11/16/stablecoins-and-blockchain-becoming-the-backbone-of-finance/" target="_blank" rel="noopener noreferrer" className="text-[#AAB3F9] hover:text-maple hover:underline transition-colors">Forbes 2025</a>, <a href="https://annualreport.visa.com/financials/default.aspx" target="_blank" rel="noopener noreferrer" className="text-[#AAB3F9] hover:text-maple hover:underline transition-colors">Visa Annual Report 2025</a>
            </p>
          </motion.div>

          {/* Current State vs Proposed State */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 relative"
          >
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Current State */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="p-5 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-400 text-xs font-semibold tracking-wider">CURRENT STATE</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-zinc-300">Backend Infrastructure</h3>
                <p className="text-zinc-500 mb-4 text-xs">
                  $1.4B+ TVL. Users interact via third-party interfaces.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                    <span>Brand exposure via partner interfaces</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                    <span>User relationships managed by integrators</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                    <span>Distribution through ecosystem partners</span>
                  </div>
                </div>
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="w-12 h-12 bg-maple rounded-full flex items-center justify-center shadow-lg shadow-maple/30"
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Future State */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="p-5 bg-maple/10 rounded-2xl border border-maple/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-4 h-4 text-maple" />
                  <span className="text-maple text-xs font-semibold tracking-wider">PROPOSED STATE</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Consumer-Facing Brand</h3>
                <p className="text-zinc-400 mb-4 text-xs">
                  Proprietary distribution channel with direct user acquisition and retention.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-maple" />
                    <span className="text-zinc-300">Direct brand engagement</span>
                </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-maple" />
                    <span className="text-zinc-300">Own user relationships & data</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-maple" />
                    <span className="text-zinc-300">Controlled distribution channel</span>
                </div>
              </div>
            </motion.div>
          </div>

            {/* Bottom Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center text-zinc-500 mt-6 text-xs max-w-2xl mx-auto"
            >
              Transitioning Maple from <span className="text-zinc-300">backend infrastructure provider</span> to <span className="text-maple">consumer-facing DeFi brand</span>
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Problem Section - Removed, content moved to Vision section */}

      {/* Competition Section */}
      <Section id="competition">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Competitive <GradientText>Landscape</GradientText>
              </h2>
          </motion.div>

          {/* Comparison Table */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-zinc-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4">
                    <span className="text-white font-semibold">Maple Mobile</span>
                  </th>
                  <th className="text-center py-4 px-4 text-zinc-400">Legend.xyz</th>
                  <th className="text-center py-4 px-4 text-zinc-400">DeFi.app</th>
                  <th className="text-center py-4 px-4 text-zinc-400">Ready (Argent)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-zinc-300">Native Mobile App</td>
                  <td className="text-center py-4 px-4"><span className="text-maple font-semibold">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple">✓</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-zinc-300">Virtual Visa Card</td>
                  <td className="text-center py-4 px-4"><span className="text-maple font-semibold">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-600">✗</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-600">✗</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple">✓</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-zinc-300">Institutional Curator</td>
                  <td className="text-center py-4 px-4"><span className="text-maple font-semibold">Maple</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-500">Generic</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-600">✗</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-600">✗</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-zinc-300">Solana Support</td>
                  <td className="text-center py-4 px-4"><span className="text-maple font-semibold">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-600">✗</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-600">✗</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-zinc-300">Passkey Auth</td>
                  <td className="text-center py-4 px-4"><span className="text-maple font-semibold">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-600">✗</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-500">✗</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple">✓</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-4 text-zinc-300">Gas Sponsorship</td>
                  <td className="text-center py-4 px-4"><span className="text-maple font-semibold">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-zinc-600">✗</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple">✓</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple">✓</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-zinc-300">Status</td>
                  <td className="text-center py-4 px-4"><span className="text-maple text-[11px] px-2 py-1 bg-maple/10 rounded-full font-semibold">Proposal</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple text-[11px] px-2 py-1 bg-maple/10 rounded-full">Live</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple text-[11px] px-2 py-1 bg-maple/10 rounded-full">Live</span></td>
                  <td className="text-center py-4 px-4"><span className="text-maple text-[11px] px-2 py-1 bg-maple/10 rounded-full">Live</span></td>
                </tr>
              </tbody>
            </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {[
                { feature: 'Native Mobile App', maple: '✓', legend: '✓', defi: '✓', argent: '✓' },
                { feature: 'Virtual Visa Card', maple: '✓', legend: '✗', defi: '✗', argent: '✓' },
                { feature: 'Institutional Curator', maple: 'Maple', legend: 'Generic', defi: '✗', argent: '✗' },
                { feature: 'Solana Support', maple: '✓', legend: '✗', defi: '✓', argent: '✗' },
                { feature: 'Passkey Auth', maple: '✓', legend: '✗', defi: '✗', argent: '✓' },
                { feature: 'Gas Sponsorship', maple: '✓', legend: '✗', defi: '✓', argent: '✓' },
                { feature: 'Status', maple: 'Proposal', legend: 'Live', defi: 'Live', argent: 'Live', isStatus: true }
              ].map((row, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="text-white font-medium mb-3 text-sm">{row.feature}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-400 mb-1">Maple Mobile</span>
                      {row.isStatus ? (
                        <span className="text-maple text-[11px] px-2 py-1 bg-maple/10 rounded-full font-semibold inline-block w-fit">{row.maple}</span>
                      ) : (
                        <span className={`${row.maple === '✓' || row.maple === 'Maple' ? 'text-maple font-semibold' : 'text-zinc-600'}`}>{row.maple}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-400 mb-1">Legend.xyz</span>
                      {row.isStatus ? (
                        <span className="text-maple text-[11px] px-2 py-1 bg-maple/10 rounded-full inline-block w-fit">{row.legend}</span>
                      ) : (
                        <span className={row.legend === '✓' ? 'text-maple' : row.legend === 'Generic' ? 'text-zinc-500' : 'text-zinc-600'}>{row.legend}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-400 mb-1">DeFi.app</span>
                      {row.isStatus ? (
                        <span className="text-maple text-[11px] px-2 py-1 bg-maple/10 rounded-full inline-block w-fit">{row.defi}</span>
                      ) : (
                        <span className={row.defi === '✓' ? 'text-maple' : row.defi === '✗' ? 'text-zinc-500' : 'text-zinc-600'}>{row.defi}</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-400 mb-1">Ready (Argent)</span>
                      {row.isStatus ? (
                        <span className="text-maple text-[11px] px-2 py-1 bg-maple/10 rounded-full inline-block w-fit">{row.argent}</span>
                      ) : (
                        <span className={row.argent === '✓' ? 'text-maple' : 'text-zinc-600'}>{row.argent}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
              </motion.div>

          {/* Competitive Differentiation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-maple/5 to-maple-300/5 border border-maple/20"
          >
            <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Competitive Differentiation</h3>
                <p className="text-zinc-400 leading-relaxed text-xs md:text-sm mb-3 md:mb-4">
                  <span className="text-white font-medium">Legend.xyz</span> is live with $15M funding (a16z, Coinbase Ventures, Feb 2025) and uses 
                  similar infrastructure (Turnkey). However, they lack:
                </p>
                <ul className="space-y-2 text-xs md:text-sm text-zinc-400">
                  <li>• <span className="text-maple">No card/spending functionality</span> — we offer JIT card payments</li>
                  <li>• <span className="text-maple">No exclusive curator relationship</span> — we have Maple's $1.4B+ TVL</li>
                  <li>• <span className="text-maple">No Solana support</span> — we cover Kamino & Drift vaults ($215M on Solana)</li>
                  <li>• <span className="text-maple">Generic protocol integrations</span> — we offer Maple-curated strategies</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Solution Section */}
      <Section id="solution">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The <GradientText>Solution</GradientText>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Best-in-class infrastructure. Zero blockchain complexity for users.
            </p>
            <p className="text-maple text-sm mt-2 max-w-2xl mx-auto">
              Built on L2 with ERC-4337 Account Abstraction for 100% capital efficiency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                name: 'Turnkey',
                subtitle: 'Wallet Infrastructure',
                features: ['AWS Nitro Enclaves (MPC)', 'WebAuthn Passkeys', 'Session Keys (auto-signing)', 'Policy Engine (limits)'],
                highlight: ''
              },
              {
                icon: <CreditCard className="w-8 h-8" />,
                name: 'Card Issuance Partner',
                subtitle: 'Bridge (Stripe) or Rain.xyz',
                features: ['Virtual Visa issuance', 'Stablecoin → Fiat rails', '150M+ merchant network', 'Built-in KYC/AML'],
                highlight: ''
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                name: 'Maple Vaults',
                subtitle: 'Yield Engine',
                features: ['Morpho (EVM chains)', 'Kamino, Drift (Solana)', 'Symbiotic (Restaking)', '50+ curated strategies'],
                highlight: ''
              }
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-maple/30/30 transition-colors"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-maple/20 to-maple-300/20 rounded-xl flex items-center justify-center text-maple mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{item.subtitle}</p>
                <ul className="space-y-2 mb-4">
                  {item.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-maple" />
                      {f}
                    </li>
                  ))}
                </ul>
                {item.highlight && <p className="text-xs text-maple font-semibold">{item.highlight}</p>}
              </motion.div>
            ))}
          </div>

          {/* Just-in-Time Architecture Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              <GradientText>Just-in-Time Architecture</GradientText>
            </h3>
            <p className="text-zinc-400 text-center mb-12 max-w-3xl mx-auto">
              Unlike traditional crypto cards requiring pre-funded balances, this architecture maintains 
              <span className="text-maple font-semibold"> 100% of user funds in yield-generating positions</span> until the precise moment of payment.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Atomic Model - L2 & Solana */}
          <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 bg-gradient-to-br from-maple/10 to-maple/0 rounded-2xl border border-maple/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-maple" />
                  <div>
                    <h4 className="text-xl font-bold text-maple">Atomic Model</h4>
                    <p className="text-xs text-zinc-400">L2 Networks & Solana</p>
              </div>
              </div>
                <p className="text-sm text-zinc-300 mb-4">
                  Applicable to: <span className="text-maple font-semibold">Base, Arbitrum, Optimism, Polygon, Solana</span>
                </p>
                <p className="text-xs text-zinc-400 mb-6">
                  Since transactions are cheap (&lt; $0.01) and fast (2-4s finality), we use the Atomic Unstake model.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 bg-maple/20 rounded-full flex items-center justify-center text-maple font-bold text-xs flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Trigger</p>
                      <p className="text-xs text-zinc-400">User taps card. Card issuer sends webhook: "Authorize $5.00"</p>
                </div>
                </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 bg-maple/20 rounded-full flex items-center justify-center text-maple font-bold text-xs flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Batch Execution (ERC-4337)</p>
                      <p className="text-xs text-zinc-400">Backend forms batched transaction: Vault.withdraw(5 USDC) + USDC.transfer(CardIssuer)</p>
                </div>
                </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 bg-maple/20 rounded-full flex items-center justify-center text-maple font-bold text-xs flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Sign & Paymaster</p>
                      <p className="text-xs text-zinc-400">Turnkey signs using Session Key. Platform pays gas (Gas Sponsorship) — user pays $0</p>
              </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 bg-maple/20 rounded-full flex items-center justify-center text-maple font-bold text-xs flex-shrink-0">4</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Settlement</p>
                      <p className="text-xs text-zinc-400">Card issuer receives USDC, confirms Visa transaction. Total latency: 2-4 seconds</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-maple/10 rounded-lg border border-maple/20">
                  <p className="text-xs text-maple font-semibold text-center">
                    Result: 100% of funds were earning yield until the exact second of payment
                  </p>
              </div>
            </motion.div>

              {/* Credit Settlement Model - Ethereum L1 */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 bg-gradient-to-br from-maple-300/10 to-maple-300/0 rounded-2xl border border-maple-300/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-maple-300" />
                  <div>
                    <h4 className="text-xl font-bold text-maple-300">Credit Settlement Model</h4>
                    <p className="text-xs text-zinc-400">Ethereum L1</p>
                </div>
                </div>
                <p className="text-sm text-zinc-300 mb-4">
                  Used when gas costs make atomic transactions uneconomical
                </p>
                <p className="text-xs text-zinc-400 mb-6">
                  ($1-20 per transaction on Ethereum mainnet). User experiences instant payment UX. Gas costs amortized across many transactions.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 bg-maple-300/20 rounded-full flex items-center justify-center text-maple-300 font-bold text-xs flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Payment</p>
                      <p className="text-xs text-zinc-400">Platform fronts payment to card issuer from its own funds (instant)</p>
                </div>
                </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 bg-maple-300/20 rounded-full flex items-center justify-center text-maple-300 font-bold text-xs flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Debt Accumulation</p>
                      <p className="text-xs text-zinc-400">User's debt recorded in database ($5)</p>
                </div>
              </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 bg-maple-300/20 rounded-full flex items-center justify-center text-maple-300 font-bold text-xs flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Batch Settlement</p>
                      <p className="text-xs text-zinc-400">When debt reaches threshold ($100) or weekly, perform single Unstake transaction</p>
              </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-6 h-6 bg-maple-300/20 rounded-full flex items-center justify-center text-maple-300 font-bold text-xs flex-shrink-0">4</div>
                    <div>
                      <p className="text-sm font-semibold text-white">Reconciliation</p>
                      <p className="text-xs text-zinc-400">Single transaction covers all accumulated spend + gas fees (1 tx/week instead of per-purchase)</p>
                    </div>
                  </div>
          </div>

                <div className="mt-6 p-3 bg-maple-300/10 rounded-lg border border-maple-300/20">
                  <p className="text-xs text-maple-300 font-semibold text-center">
                    Result: Same 100% efficiency, different architecture. Instant UX with amortized gas costs.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Business Model Section */}
      <Section id="business">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <GradientText>Financial Model</GradientText>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Unit Economics
            </p>
          </motion.div>

          {/* Revenue Streams */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: <CreditCard />, name: 'Interchange', rate: '0.8-1.2%', desc: 'Every card purchase' },
              { icon: <Percent />, name: 'Yield Fees', rate: '0.1-0.2%', desc: 'TVL annually' },
              { icon: <DollarSign />, name: 'FX Spread', rate: '0.5-1%', desc: 'International txns' }
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-4 bg-white/5 rounded-xl border border-white/10 text-center"
              >
                <div className="w-10 h-10 mx-auto bg-maple/20 rounded-lg flex items-center justify-center text-maple mb-3">
                  {item.icon}
                </div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-maple font-bold text-lg">{item.rate}</p>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl border border-white/10"
          >
            <h3 className="text-xl font-bold mb-8 text-center text-white">Revenue Projection Calculator</h3>
            
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="text-zinc-400">Active Users</span>
                <span className="font-bold text-maple text-xl">{userCount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={userCount}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  setUserCount(newValue);
                  trackEvent('calculator_change', 'Calculator', 'User Count Slider', newValue);
                }}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-maple [&::-webkit-slider-thumb]:rounded-full"
              />
              <div className="flex justify-between text-[11px] text-zinc-600 mt-2">
                <span>10K</span>
                <span>200K</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-zinc-300 mb-4">Revenue Breakdown (Annual)</h4>
              <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-white/5">
                    <div>
                      <span className="text-zinc-300">Interchange Fees</span>
                      <p className="text-[11px] text-zinc-600">~1% of card spend</p>
                </div>
                    <span className="font-mono text-white">{fmt(interchangeRevenue)}</span>
                </div>
                  <div className="flex justify-between py-3 border-b border-white/5">
                    <div>
                      <span className="text-zinc-300">Yield Management</span>
                      <p className="text-[11px] text-zinc-600">0.15% of TVL</p>
                </div>
                    <span className="font-mono text-white">{fmt(yieldFees)}</span>
              </div>
                  <div className="flex justify-between py-3 border-b border-white/5">
                    <div>
                      <span className="text-zinc-300">FX Spread</span>
                      <p className="text-[11px] text-zinc-600">0.5-1% on intl txns (~15%)</p>
                    </div>
                    <span className="font-mono text-white">{fmt(fxRevenue)}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-zinc-300 font-semibold">Total Revenue</span>
                    <span className="font-mono text-maple font-bold">{fmt(totalRevenue)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-maple/10 to-maple-300/10 border border-maple/20 text-center">
                <p className="text-zinc-400 mb-2">Maple Annual Share (70%)</p>
                  <p className="text-5xl font-bold text-maple mb-4">{fmt(mapleShare)}</p>
                  <div className="flex justify-center text-sm">
                    <div>
                      <p className="text-zinc-500">Gas Cost/Tx</p>
                      <p className="text-white font-semibold">&lt; $0.01</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Partnership Structure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <h3 className="text-xl font-bold mb-6 text-center">Partnership Structure</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Rev Share Package */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
                
                <h4 className="text-lg font-bold text-maple mb-4">Rev Share</h4>
                <div className="space-y-4">
              <div>
                    <p className="text-3xl font-bold text-white">$120K</p>
                    <p className="text-zinc-400 text-sm">Development Cost</p>
              </div>
              <div>
                    <p className="text-2xl font-bold text-maple-300">75/25</p>
                <p className="text-zinc-400 text-sm">Revenue Share (Maple/WOOF)</p>
              </div>
              <div>
                    <p className="text-xl font-bold text-amber-400">7 Months</p>
                    <p className="text-zinc-400 text-sm">Timeline to Launch</p>
                  </div>
                </div>
              </div>

              {/* Fixed Price Package */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="text-lg font-bold text-zinc-300 mb-4">Fixed Price</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-white">$450K</p>
                    <p className="text-zinc-400 text-sm">Full Development Cost</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-zinc-500">No Rev Share</p>
                    <p className="text-zinc-400 text-sm">100% Revenue to Maple</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-amber-400">7 Months</p>
                    <p className="text-zinc-400 text-sm">Timeline to Launch</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Roadmap Section */}
      <Section id="roadmap">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <GradientText>Development Roadmap</GradientText>
            </h2>
           
          </motion.div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  phase: 'Phase 1',
                  title: 'DeFi Core',
                  months: 'Months 1-3',
                  items: ['Turnkey wallet integration', 'EVM vault connections (Morpho)', 'Solana integration (Kamino, Drift)', 'React Native app (iOS + Android)', 'Passkey authentication'],
                  deliverable: 'MVP on testnet'
                },
                {
                  phase: 'Phase 2',
                  title: 'Card Layer',
                  months: 'Months 4-5',
                  items: ['Card issuance partner integration', 'Virtual Visa issuance', 'JIT liquidity engine', 'Apple Pay / Google Pay', 'KYC/AML flow'],
                  deliverable: 'Beta with 100 users'
                },
                {
                  phase: 'Phase 3',
                  title: 'Scale',
                  months: 'Months 6-7',
                  items: ['Security audit', 'Mainnet deployment', 'Marketing launch', 'Distribution partnerships', 'User acquisition'],
                  deliverable: 'Public launch'
                }
              ].map((phase, i) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-maple font-semibold">{phase.phase}</span>
                      <span className="text-zinc-500 text-sm">{phase.months}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                    <ul className="space-y-2 mb-4">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                          <CheckCircle className="w-4 h-4 text-maple flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-zinc-400">Deliverable:</p>
                      <p className="font-semibold text-maple">{phase.deliverable}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Build the Primary Distribution<br />
              <GradientText>Channel for Maple</GradientText>
            </h2>
            <p className="text-xl text-zinc-400 mb-8">Transform Maple from backend infrastructure to consumer-facing DeFi brand.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-left">
                <h3 className="font-bold mb-4">Strategic Value</h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-maple" /> Direct user acquisition (not dependent on aggregators)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-maple" /> "Sticky capital" via spending convenience</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-maple" /> Differentiation from Legend.xyz (cards + Solana)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-maple" /> $1.4B+ TVL under unified mobile interface</li>
                </ul>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-left">
                <h3 className="font-bold mb-4">Partnership Structure</h3>
                <ul className="space-y-2 text-sm text-zinc-300">
                  <li>• White-label mobile application</li>
                  <li>• Revenue share model</li>
                  <li>• Full technical integration & support</li>
                  <li>• Joint go-to-market strategy</li>
                </ul>
              </div>
            </div>

            <motion.a
              href="https://calendly.com/dmitriy-woof/small-talk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('external_link_click', 'Contact', 'Calendly - Schedule Partnership Discussion')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-maple rounded-full text-xl font-bold text-black shadow-lg shadow-maple/25"
            >
              <Calendar className="w-6 h-6" />
              Schedule Partnership Discussion
            </motion.a>

            <p className="mt-6 text-zinc-500">
              Or reach out directly: <a 
                href="mailto:dmitriy@woof.software" 
                onClick={() => trackEvent('external_link_click', 'Contact', 'Email - dmitriy@woof.software')}
                className="text-maple hover:underline"
              >dmitriy@woof.software</a>
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <WoofLogo className="w-6 h-6" />
            <span className="font-semibold">WOOF SOFTWARE</span>
          </div>
          <p className="text-zinc-500 text-sm text-center flex-1">
            Enterprise DeFi Infrastructure & Integration Services.
          </p>
          <p className="text-zinc-500 text-sm">
            © 2026 WOOF Software
          </p>
        </div>
      </footer>
    </div>
  );
}
