"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  // Mobil menü görünürlüğünü kontrol eden state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Newsletter form submit handler
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Bülten kayıt API'si buraya eklenecek
    console.log("Newsletter subscription triggered");
  };

  return (
    <>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed w-full z-50 top-0 left-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-forest-green/10 dark:border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-forest-green to-leaf-green flex items-center justify-center text-white">
                <span className="material-icons-round text-lg">eco</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-forest-green dark:text-white">FreshFlow</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link className="text-forest-green/80 dark:text-gray-300 hover:text-leaf-green dark:hover:text-primary transition-colors font-medium" href="/solutions">Solutions</Link>
              <Link className="text-forest-green/80 dark:text-gray-300 hover:text-leaf-green dark:hover:text-primary transition-colors font-medium" href="/sustainability">Sustainability</Link>
              <Link className="text-forest-green/80 dark:text-gray-300 hover:text-leaf-green dark:hover:text-primary transition-colors font-medium" href="/pricing">Pricing</Link>
              <Link className="text-forest-green dark:text-white font-semibold hover:opacity-80 transition-opacity" href="/dashboard">Login</Link>
              <Link className="bg-primary hover:bg-primary-dark text-forest-green dark:text-background-dark font-bold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5" href="/dashboard">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-forest-green dark:text-white hover:text-leaf-green focus:outline-none p-2" 
                type="button"
              >
                <span className="material-icons-round text-3xl">
                  {isMobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-background-dark border-b border-forest-green/10 dark:border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
                <Link onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-forest-green dark:text-gray-300 font-medium" href="#">Solutions</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-forest-green dark:text-gray-300 font-medium" href="#">Sustainability</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-forest-green dark:text-gray-300 font-medium" href="#">Pricing</Link>
                <div className="h-px bg-forest-green/10 dark:bg-white/10 my-2 w-full"></div>
                <Link onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-forest-green dark:text-white font-semibold" href="/dashboard">Login</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-primary text-forest-green font-bold px-6 py-3 rounded-lg" href="/dashboard">
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden organic-gradient">
        <div className="absolute inset-0 hero-pattern z-0 opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leaf-green/10 text-leaf-green dark:text-primary text-sm font-semibold border border-leaf-green/20">
                <span className="w-2 h-2 rounded-full bg-leaf-green dark:bg-primary animate-pulse"></span>
                New: AI-Powered Waste Analysis
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-forest-green dark:text-white">
                Efficiency meets <span className="text-leaf-green dark:text-primary">Sustainability.</span>
              </h1>
              <p className="text-lg text-forest-green/70 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The smart supply manager that cuts waste and boosts margins. Transform your restaurant's inventory from a guessing game into a precise, profit-generating science.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link className="inline-flex justify-center items-center px-8 py-4 rounded-lg bg-primary hover:bg-primary-dark text-forest-green dark:text-background-dark font-bold text-lg shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1" href="/dashboard">
                  Start Reducing Waste
                  <span className="material-icons-round ml-2">arrow_forward</span>
                </Link>
                <Link className="inline-flex justify-center items-center px-8 py-4 rounded-lg border-2 border-forest-green/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-forest-green dark:text-white font-semibold hover:bg-white/80 dark:hover:bg-white/10 transition-colors" href="#">
                  <span className="material-icons-round mr-2 text-leaf-green">play_circle</span>
                  Watch Demo
                </Link>
              </div>
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-forest-green/60 dark:text-gray-400">
                <div className="flex -space-x-2">
                  <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_vHNCzrq_QrYSqIudIpTM9FDvtEOVGTZNUWUtNKBz825hq8KFYUKdNhxoleSIpWqRMS8GTG-FYprfyyYmk-TfLT83SMq8fJOhPnS4_8F2Q0TNwJdgSs5dgwAjbzwwduV_0cirJZ1_jdnrvFXgYpzlifPzqI6HHqzjIe9oPU4CRcXWyK2nVMoIkVAfsEYUmp4ApRRcjQ4qm8Hy5Pux3NaEDJj0rm9GPQ4Ll7dfwdIuOBelCYspKPZ1K_s7uJVUaWAe22uvkLzgfGU"/>
                  <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfmzlkN9P4--MiYIT89lyzmtInK5WzK8JRx5ZtHCKOlFXpdPfJRCWIHQouRhR270p_dNj_8gE1T_6K2QFeon6pNEoHDRhuDNfsKSW47mYu-6QhkLCOPd1isBTpY-n5pXvTbBvxhHuJkK6oqHKzdhG0D68UqqoNbL8Ykim2VqbAi-bAoCaZlG41GHymLfQEF06ujAApqeiR095-SbGU7ps7mwvz4IC701H6S9PejOZ5WUDylFNTbO8JmiTKhkE9OoyucDPDLWoAiEY"/>
                  <img alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJNck7fl1XHBRQvPxIWN5X8mwUIi_1r2ejgCvT-nI_931LTEn3FOGwsbhbSLcgFyxJvI-Ek-hsLQfm47-UbkW7z69M2LyC99vtqmBZVxdtpoet8x_cy-OeLikbyQTX536GBHt7ldhSKub1osw-8G9VE4n4AZeQ3664MLf0T-8SjzFy4MMSOwpHR1DoA5uI1b6kIlayCnorpstahlkfMiLDnfrsQ_zloIpxJYNg_lJgGD787xIK6zIc50HZFxs_CtTDlLRUboAxwQ0"/>
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-leaf-green/10 flex items-center justify-center text-xs font-bold text-leaf-green">+2k</div>
                </div>
                <p>Trusted by 2,000+ kitchens</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="absolute top-10 right-10 w-72 h-72 bg-leaf-green/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full max-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700 bg-white dark:bg-gray-800">
                <img alt="3D Visualization" className="absolute inset-0 w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuColkl6PAsmXw-JBvEC-_W0SsiycdbEvetvZ1AKujKrA1LqFU_Ka3h3GXzYZ1zltP1ac8jzp9zI25v7VyAno8YegyQOJwoWA8GbdsWyhhg4GC0LTM8LYrJZmj7z08eCGqR6Lg_Jfx-5V8SAX0cfjELm7jQHKf2yUoYmZteJAZHYahBkT6jzy5ig8OMlxw_oNrro9-KV_0tbpPzNzYSNMuItMoAZjdIlB_rKrG6fGChJ2oBAfN1vDz4xik4h8uHMzNkYwhcn3WUuvt8"/>
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-forest-green/5 dark:border-white/10"
                >
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Waste Reduction</p>
                      <p className="text-2xl font-bold text-forest-green dark:text-white">-32% <span className="text-sm font-normal text-leaf-green">this month</span></p>
                    </div>
                    <div className="h-8 flex items-end space-x-1">
                      <motion.div initial={{ height: 0 }} animate={{ height: "16px" }} className="w-2 bg-leaf-green/30 rounded-t-sm"></motion.div>
                      <motion.div initial={{ height: 0 }} animate={{ height: "24px" }} className="w-2 bg-leaf-green/40 rounded-t-sm"></motion.div>
                      <motion.div initial={{ height: 0 }} animate={{ height: "12px" }} className="w-2 bg-leaf-green/60 rounded-t-sm"></motion.div>
                      <motion.div initial={{ height: 0 }} animate={{ height: "32px" }} className="w-2 bg-leaf-green/80 rounded-t-sm"></motion.div>
                      <motion.div initial={{ height: 0 }} animate={{ height: "20px" }} className="w-2 bg-primary rounded-t-sm"></motion.div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="bg-gradient-to-r from-leaf-green to-primary h-full rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 3, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute top-6 right-6 bg-forest-green text-white p-3 rounded-lg shadow-lg flex items-center gap-2"
                >
                  <span className="material-icons-round text-primary">check_circle</span>
                  <span className="text-sm font-medium">Inventory Synced</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-forest-green/5 bg-white dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">Powering modern kitchens worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60 dark:opacity-40">
            <div className="text-xl font-bold font-serif flex items-center gap-2"><span className="material-icons-round">restaurant</span> BISTRO.IO</div>
            <div className="text-xl font-bold font-sans flex items-center gap-2"><span className="material-icons-round">local_cafe</span> GreenLeaf</div>
            <div className="text-xl font-bold font-mono flex items-center gap-2"><span className="material-icons-round">lunch_dining</span> URBAN EATS</div>
            <div className="text-xl font-bold font-serif italic flex items-center gap-2"><span className="material-icons-round">bakery_dining</span> Flourish</div>
            <div className="text-xl font-bold flex items-center gap-2"><span className="material-icons-round">eco</span> ROOTS</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background-light dark:bg-background-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-forest-green dark:text-white mb-4">Complete control over your kitchen ecosystem</h2>
            <p className="text-lg text-forest-green/70 dark:text-gray-400">Our platform bridges the gap between raw ingredients and digital efficiency.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'recycling', title: 'Waste Reduction', desc: 'AI-driven predictions to stop spoilage before it starts. Analyze what gets tossed and optimize future orders automatically.', color: 'text-leaf-green', bgHover: 'hover:shadow-leaf-green/10 hover:border-leaf-green/20' },
              { icon: 'inventory_2', title: 'Inventory Tracking', desc: 'Real-time tracking of every ingredient. Know exactly what\'s in your walk-in and what needs to be used first.', color: 'text-primary-dark dark:text-primary', bgHover: 'hover:shadow-primary/10 hover:border-primary/20' },
              { icon: 'storefront', title: 'Supplier Integration', desc: 'Automated ordering directly from local farms. Connect your inventory levels directly to your suppliers\' dashboards.', color: 'text-leaf-green', bgHover: 'hover:shadow-leaf-green/10 hover:border-leaf-green/20' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group bg-white dark:bg-white/5 p-8 rounded-xl shadow-sm border border-transparent transition-all duration-300 ${feature.bgHover}`}
              >
                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className={`material-icons-round text-3xl ${feature.color}`}>{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-forest-green dark:text-white mb-3">{feature.title}</h3>
                <p className="text-forest-green/70 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Feature Split */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-forest-green rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 w-fit backdrop-blur-sm border border-white/10">
                  Smart Analytics
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">See your savings grow in real-time.</h2>
                <p className="text-white/80 text-lg mb-8">
                  Track your environmental impact alongside your profit margins. Our dashboard highlights opportunities to switch to sustainable suppliers and cut costs simultaneously.
                </p>
                <ul className="space-y-4 mb-8">
                  {['CO2 footprint calculation per dish', 'Automated seasonal menu suggestions', 'Expiration alerts via SMS'].map((item, i) => (
                    <li key={i} className="flex items-center text-white/90">
                      <span className="material-icons-round text-primary mr-3">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link className="inline-flex items-center text-primary font-bold hover:text-white transition-colors w-fit" href="#">
                  Explore Analytics Features
                  <span className="material-icons-round ml-2">arrow_right_alt</span>
                </Link>
              </div>
              <div className="relative min-h-[400px] lg:min-h-full">
                <img alt="Chef using tablet" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCLpq_KkFYyArEJbtv_o75Bk7x8O0q05BxQNZXJf6BAYEDYwhD-WQLEc-gj9uFV3bG-6xx1R6Y7kmSBeRsBPzNmU6XQgcXxvAWW2Oj4b7G4oZQvvrcKSWUc-Q_VB4Dh3mRtA8KGNpyRsFq_wPcM70H0gUN9Yprfw-2Opjekd-sozspv31OXwkMXMUINnSbMNgcHFZY-iWPIdgCZqTfewQJwk0docDC0A8mhLUrIgxlHe1wSdg7iEamD5h1NMDFs3i0FUT1EHw9S3I"/>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-green via-transparent to-transparent"></div>
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium opacity-80">Weekly Savings</span>
                    <span className="text-primary font-bold text-xl">$1,240</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="bg-primary h-full rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-xs mt-3 opacity-70">You're in the top 10% of efficient kitchens this week.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Calculator CTA */}
      <section className="py-24 bg-white dark:bg-background-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-forest-green dark:text-white mb-6">Ready to optimize your kitchen?</h2>
          <p className="text-lg text-forest-green/70 dark:text-gray-400 mb-10">
            Join thousands of restaurants reducing their food waste by an average of 30% in the first 3 months.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background-light dark:bg-white/5 p-8 rounded-2xl border border-forest-green/5 dark:border-white/10 shadow-lg mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-forest-green/10 dark:divide-white/10">
              <div className="p-4">
                <p className="text-4xl font-bold text-leaf-green mb-2">30%</p>
                <p className="text-sm text-forest-green/60 dark:text-gray-400 font-medium uppercase tracking-wide">Average Waste Reduction</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold text-leaf-green mb-2">12hrs</p>
                <p className="text-sm text-forest-green/60 dark:text-gray-400 font-medium uppercase tracking-wide">Saved Weekly on Inventory</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold text-leaf-green mb-2">5%</p>
                <p className="text-sm text-forest-green/60 dark:text-gray-400 font-medium uppercase tracking-wide">Boost in Profit Margins</p>
              </div>
            </div>
          </motion.div>
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary hover:bg-primary-dark text-forest-green dark:text-background-dark font-bold text-lg px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-primary/40 transition-all"
          >
            Schedule a Free Consultation
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-green text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-forest-green">
                  <span className="material-icons-round text-sm">eco</span>
                </div>
                <span className="font-bold text-xl tracking-tight">FreshFlow</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Helping restaurants build sustainable, profitable futures through smart inventory management.
              </p>
              <div className="flex space-x-4 pt-2">
                <Link className="text-white/60 hover:text-primary transition-colors" href="#"><span className="material-icons-round">facebook</span></Link>
                <Link className="text-white/60 hover:text-primary transition-colors" href="#"><span className="material-icons-round">thumb_up_alt</span></Link>
                <Link className="text-white/60 hover:text-primary transition-colors" href="#"><span className="material-icons-round">camera_alt</span></Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link className="hover:text-white transition-colors" href="#">Features</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Pricing</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Integrations</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link className="hover:text-white transition-colors" href="#">About Us</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Sustainability Report</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Careers</Link></li>
                <li><Link className="hover:text-white transition-colors" href="#">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-primary">Stay Fresh</h4>
              <p className="text-sm text-white/70 mb-4">Subscribe to our newsletter for tips on sustainable kitchen management.</p>
              
              {/* Güncellenmiş Form (onSubmit ve type="submit" eklendi) */}
              <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
                <input 
                  className="bg-white/10 border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="Enter your email" 
                  type="email"
                  required
                />
                <button 
                  className="bg-primary text-forest-green font-bold text-sm px-4 py-2 rounded hover:bg-white hover:text-forest-green transition-colors" 
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            {/* Dinamik Tarih Eklendi */}
            <p>© {new Date().getFullYear()} FreshFlow Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link className="hover:text-white" href="#">Privacy Policy</Link>
              <Link className="hover:text-white" href="#">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}