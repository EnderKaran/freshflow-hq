"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function KitchenRail() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-work text-forest-green dark:text-gray-200 transition-colors duration-300 h-screen overflow-hidden flex flex-col w-full">
      {/* Header Section */}
      <header className="flex-none px-8 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-forest-green font-bold text-xl shadow-lg">F</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-forest-green dark:text-primary">The Kitchen Rail</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">FreshFlow Inventory System</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-white dark:bg-dark-surface px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
            <span className="material-icons text-gray-400 text-xl mr-2">search</span>
            <input className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-48 text-gray-700 dark:text-gray-200 placeholder-gray-400" placeholder="Search ingredients..." type="text"/>
          </div>
          <button className="relative p-2 text-gray-500 hover:text-forest-green transition-colors">
            <span className="material-icons">notifications_none</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <div 
            className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer" 
            title="Portrait of a smiling chef in a kitchen setting"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCatEiE2VFL9CxRSgRmjaRcd7K_jLLTUWggo-m15Y2lv245eq4JOq84Xu6yaesIH3PnRQAhzy2Bbn-7veqiyWPXXpwGpN21BzEbKAE_yeV4cvM4lCvyJ4MhYWmvlcOVDfTLOZaYW22yVQAgMyDCTMKSn7NkVAZSEd9fZ4DwZAEfmU2AI7S9yhSiTxrzHujezXczAZ_BC6w-vkY2HFntCR1gh9ZMbfLur02e7gD_uql0ME73xwulPGmQVdopKLcfme2KABcpqfsYUes')", backgroundSize: "cover", backgroundPosition: "center" }}
          ></div>
        </div>
      </header>

      {/* Main Content Area: The Rail */}
      <main className="flex-grow flex flex-col justify-center relative w-full">
        {/* Status Bar / Filters */}
        <div className="px-8 mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-light text-forest-green dark:text-white mb-2">My Pantry</h2>
            <div className="flex gap-4 text-sm font-medium">
              <button className="text-forest-green border-b-2 border-primary pb-1">All Items (42)</button>
              <button className="text-gray-400 hover:text-forest-green transition-colors pb-1">Low Stock (3)</button>
              <button className="text-gray-400 hover:text-forest-green transition-colors pb-1">Expires Soon (5)</button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-white dark:hover:bg-dark-surface transition-colors text-gray-400">
              <span className="material-icons">view_module</span>
            </button>
            <button className="p-2 rounded-full bg-white dark:bg-dark-surface shadow-sm text-forest-green">
              <span className="material-icons">view_carousel</span>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="w-full overflow-x-auto no-scrollbar pb-12 pt-4 px-8 snap-x snap-mandatory">
          <div className="flex gap-8 w-max">
            {/* Card 1: Wagyu Beef (Low Stock Alert) */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="snap-center group relative w-[320px] h-[480px] bg-white dark:bg-dark-surface rounded-xl shadow-soft hover:shadow-floating transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              {/* Low Stock Badge */}
              <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1">
                <span className="material-icons text-sm">warning</span> Low
              </div>
              {/* Image Area */}
              <div className="h-1/2 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img alt="Marbled wagyu beef steak raw on dark background" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUt-T20p3GcBEWr4aMA8tOyKJ35iajZWcUDOZjhWTBeIY08j4xIBO15BFYsS0S0zkssMgqU49lGT0CdVqbwEpQYyKpHyPe15qaDxcrcXGByeHbotGJzNyQDIK5dZ-uz5g9gsXTeeMVPsDQU4SRgin_nGKxfX3e16jq6BH2K12ZCpktNyPdcexH3FClWd5aDGMn2v4uMAMcyr80z3sZcjgr3wEJS-N6WmQGXzJIP_4TmYsN5eRUo_RTfjxSZo6YRiOBpctCAH7NmyQ"/>
              </div>
              {/* Content */}
              <div className="h-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-forest-green dark:text-white">Wagyu Beef</h3>
                    <button className="text-gray-300 hover:text-primary transition-colors"><span className="material-icons">more_horiz</span></button>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Grade A5, Kagoshima Prefecture</p>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-light text-forest-green dark:text-gray-200">15<span className="text-sm text-gray-400 font-normal ml-1">kg</span></span>
                    <span className="text-sm text-gray-400">Target: 50kg</span>
                  </div>
                </div>
                {/* Liquid Progress Bar Container */}
                <div className="relative w-full h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "linear-gradient(to right, transparent 19%, #e5e7eb 20%)", backgroundSize: "20% 100%" }}></div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 h-full bg-primary/80 flex items-center justify-end pr-2"
                  >
                    <div className="h-full w-2 bg-white/20 absolute right-0 top-0 backdrop-blur-sm"></div>
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-forest-green font-bold text-lg mix-blend-multiply dark:mix-blend-normal dark:text-white">30%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Brioche Buns (Healthy Stock) */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="snap-center group relative w-[320px] h-[480px] bg-white dark:bg-dark-surface rounded-xl shadow-soft hover:shadow-floating transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="h-1/2 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <img alt="Golden brown freshly baked brioche buns" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTNlKiJlH5MByPh3zbzE8WrKqieEpIxU4L3dYcXmbvXmJq3hyw0lbbhVOgadGQA74C9hOah1QALVagGSmxkJ_wvJ41eLCSnSXbS0_60IbKDdi2c6zVJlX12huFZJiKF5WQpKyncaQyDbu4zYbf6ltcDP9DCCsSk0YzTr8xmkFH_UogBTcdreBbOMjfKjmLDYRPl9HBhDESt9OHYYXQRHIWdAw-RNrwf7VpR0rHolM-v2S601ISeyU11oHih3GfHHi2hOp89voZPpc"/>
              </div>
              <div className="h-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-forest-green dark:text-white">Brioche Buns</h3>
                    <button className="text-gray-300 hover:text-primary transition-colors"><span className="material-icons">more_horiz</span></button>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Seeded, 4-inch diameter</p>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-light text-forest-green dark:text-gray-200">120<span className="text-sm text-gray-400 font-normal ml-1">units</span></span>
                    <span className="text-sm text-gray-400">Target: 200</span>
                  </div>
                </div>
                <div className="relative w-full h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "linear-gradient(to right, transparent 19%, #e5e7eb 20%)", backgroundSize: "20% 100%" }}></div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="liquid-fill absolute bottom-0 left-0 h-full flex items-center justify-end pr-2"
                  >
                    <div className="h-full w-2 bg-white/20 absolute right-0 top-0 backdrop-blur-sm"></div>
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-forest-green font-bold text-lg mix-blend-multiply dark:mix-blend-normal dark:text-white">60%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Romaine Lettuce (Full Stock) */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="snap-center group relative w-[320px] h-[480px] bg-white dark:bg-dark-surface rounded-xl shadow-soft hover:shadow-floating transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="absolute top-4 right-4 bg-leaf-green/10 text-leaf-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1">
                <span className="material-icons text-sm">check_circle</span> Full
              </div>
              <div className="h-1/2 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <img alt="Fresh green romaine lettuce heads" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj8kMK6vwBS-PUJfXTvTYPKgORtJNyT7nOKqDvU_HZqkO83aGW7r1L-6IjPhxhF7RaF9v0OPfblY7WMvMld3YrQPRnag9F1qBFGFxxgQJCdsT0Vwor0myLi8K1tsVdFJqiFgloSW0B5xbIkVXRYUHJTpcjS6_TwHcXxyV2h5te9p9UhOYzPvOkx02Ru6xuBOjE_WquJ9ZMS4HSrG7eRoFRvw4H6mcbGLSKlzntSIAi7Pjl5bi-emNaufh6lWpgIFzu9oZe8Kw7FBs"/>
              </div>
              <div className="h-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-forest-green dark:text-white">Romaine Lettuce</h3>
                    <button className="text-gray-300 hover:text-primary transition-colors"><span className="material-icons">more_horiz</span></button>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Organic, Local Farm Source</p>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-light text-forest-green dark:text-gray-200">40<span className="text-sm text-gray-400 font-normal ml-1">heads</span></span>
                    <span className="text-sm text-gray-400">Target: 40</span>
                  </div>
                </div>
                <div className="relative w-full h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "linear-gradient(to right, transparent 19%, #e5e7eb 20%)", backgroundSize: "20% 100%" }}></div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="liquid-fill absolute bottom-0 left-0 h-full flex items-center justify-end pr-2"
                  >
                    <div className="h-full w-2 bg-white/20 absolute right-0 top-0 backdrop-blur-sm"></div>
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white font-bold text-lg drop-shadow-md">100%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Olive Oil */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="snap-center group relative w-[320px] h-[480px] bg-white dark:bg-dark-surface rounded-xl shadow-soft hover:shadow-floating transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="h-1/2 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <img alt="Bottle of olive oil with olives nearby" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtRj1ZgaFKE5V8DcDUjD0MgOm6ugdgHtjqhQClNlPdHtodgeJ6OJLmtlyvEgo7Jb8CnMgE4eDVr_SO2CvbRv9QovrSh5H_Skm45ziUiVlP3qUihrN_td5_xO2uzpiKb-eFhGcbKu3sL0UdsRuqzjoZlWQnqgvkhgYkVj8FQcO_1ICcdN_a8Pc_UYTC8ywz779Vlz2wR7A9GI1wud-Pd-0-ylqUL9zlVHy66WDbiuuk8LYwi65mrpVSKPEBiFQvzlyWY15c8losP1o"/>
              </div>
              <div className="h-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-forest-green dark:text-white">EV Olive Oil</h3>
                    <button className="text-gray-300 hover:text-primary transition-colors"><span className="material-icons">more_horiz</span></button>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Italian Import, Cold Pressed</p>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-light text-forest-green dark:text-gray-200">12<span className="text-sm text-gray-400 font-normal ml-1">L</span></span>
                    <span className="text-sm text-gray-400">Target: 15L</span>
                  </div>
                </div>
                <div className="relative w-full h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "linear-gradient(to right, transparent 19%, #e5e7eb 20%)", backgroundSize: "20% 100%" }}></div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="liquid-fill absolute bottom-0 left-0 h-full flex items-center justify-end pr-2"
                  >
                    <div className="h-full w-2 bg-white/20 absolute right-0 top-0 backdrop-blur-sm"></div>
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-forest-green font-bold text-lg mix-blend-multiply dark:mix-blend-normal dark:text-white">80%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Add New Placeholder */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="snap-center w-[320px] h-[480px] bg-white dark:bg-dark-surface rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <span className="material-icons text-3xl">add</span>
              </div>
              <span className="font-medium">Add New Item</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator / Hint */}
        <div className="text-center mt-2 opacity-50 text-sm flex items-center justify-center gap-2">
          <span className="material-icons text-sm">arrow_back</span>
          Scroll to explore
          <span className="material-icons text-sm">arrow_forward</span>
        </div>
      </main>

      {/* FAB: Floating Action Button */}
      <div className="fixed bottom-12 right-12 z-50">
        <button className="group w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center text-forest-green hover:bg-white hover:text-primary hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 relative">
          <span className="absolute right-full mr-4 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Quick Add Inventory
          </span>
          <span className="material-icons text-3xl">add</span>
        </button>
      </div>

      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-leaf-green/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
