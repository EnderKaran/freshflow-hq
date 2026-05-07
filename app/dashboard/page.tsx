"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK VERİ (Bunu daha sonra Neon DB'den çekeceksin) ---
const INVENTORY_DATA = [
  {
    id: "wagyu-1",
    name: "Wagyu Beef",
    subtitle: "Grade A5, Kagoshima Prefecture",
    current: 15,
    target: 50,
    unit: "kg",
    percentage: 30,
    status: "low", // 'low', 'healthy', 'full'
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUt-T20p3GcBEWr4aMA8tOyKJ35iajZWcUDOZjhWTBeIY08j4xIBO15BFYsS0S0zkssMgqU49lGT0CdVqbwEpQYyKpHyPe15qaDxcrcXGByeHbotGJzNyQDIK5dZ-uz5g9gsXTeeMVPsDQU4SRgin_nGKxfX3e16jq6BH2K12ZCpktNyPdcexH3FClWd5aDGMn2v4uMAMcyr80z3sZcjgr3wEJS-N6WmQGXzJIP_4TmYsN5eRUo_RTfjxSZo6YRiOBpctCAH7NmyQ",
    expiresSoon: false,
  },
  {
    id: "brioche-1",
    name: "Brioche Buns",
    subtitle: "Seeded, 4-inch diameter",
    current: 120,
    target: 200,
    unit: "units",
    percentage: 60,
    status: "healthy",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTNlKiJlH5MByPh3zbzE8WrKqieEpIxU4L3dYcXmbvXmJq3hyw0lbbhVOgadGQA74C9hOah1QALVagGSmxkJ_wvJ41eLCSnSXbS0_60IbKDdi2c6zVJlX12huFZJiKF5WQpKyncaQyDbu4zYbf6ltcDP9DCCsSk0YzTr8xmkFH_UogBTcdreBbOMjfKjmLDYRPl9HBhDESt9OHYYXQRHIWdAw-RNrwf7VpR0rHolM-v2S601ISeyU11oHih3GfHHi2hOp89voZPpc",
    expiresSoon: true, // Test için expiresSoon eklendi
  },
  {
    id: "romaine-1",
    name: "Romaine Lettuce",
    subtitle: "Organic, Local Farm Source",
    current: 40,
    target: 40,
    unit: "heads",
    percentage: 100,
    status: "full",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj8kMK6vwBS-PUJfXTvTYPKgORtJNyT7nOKqDvU_HZqkO83aGW7r1L-6IjPhxhF7RaF9v0OPfblY7WMvMld3YrQPRnag9F1qBFGFxxgQJCdsT0Vwor0myLi8K1tsVdFJqiFgloSW0B5xbIkVXRYUHJTpcjS6_TwHcXxyV2h5te9p9UhOYzPvOkx02Ru6xuBOjE_WquJ9ZMS4HSrG7eRoFRvw4H6mcbGLSKlzntSIAi7Pjl5bi-emNaufh6lWpgIFzu9oZe8Kw7FBs",
    expiresSoon: false,
  },
  {
    id: "evo-1",
    name: "EV Olive Oil",
    subtitle: "Italian Import, Cold Pressed",
    current: 12,
    target: 15,
    unit: "L",
    percentage: 80,
    status: "healthy",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtRj1ZgaFKE5V8DcDUjD0MgOm6ugdgHtjqhQClNlPdHtodgeJ6OJLmtlyvEgo7Jb8CnMgE4eDVr_SO2CvbRv9QovrSh5H_Skm45ziUiVlP3qUihrN_td5_xO2uzpiKb-eFhGcbKu3sL0UdsRuqzjoZlWQnqgvkhgYkVj8FQcO_1ICcdN_a8Pc_UYTC8ywz779Vlz2wR7A9GI1wud-Pd-0-ylqUL9zlVHy66WDbiuuk8LYwi65mrpVSKPEBiFQvzlyWY15c8losP1o",
    expiresSoon: false,
  },
];

export default function KitchenRail() {
  // --- STATE YÖNETİMİ ---
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Items");
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' veya 'grid'

  // --- FİLTRELEME MANTIĞI ---
  const filteredItems = useMemo(() => {
    return INVENTORY_DATA.filter((item) => {
      // 1. Arama Filtresi
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Sekme (Tab) Filtresi
      let matchesTab = true;
      if (activeTab === "Low Stock") matchesTab = item.status === "low";
      if (activeTab === "Expires Soon") matchesTab = item.expiresSoon === true;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

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
            <input 
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-48 text-gray-700 dark:text-gray-200 placeholder-gray-400" 
              placeholder="Search ingredients..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="relative p-2 text-gray-500 hover:text-forest-green transition-colors">
            <span className="material-icons">notifications_none</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <div 
            className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer" 
            title="Chef Profile"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCatEiE2VFL9CxRSgRmjaRcd7K_jLLTUWggo-m15Y2lv245eq4JOq84Xu6yaesIH3PnRQAhzy2Bbn-7veqiyWPXXpwGpN21BzEbKAE_yeV4cvM4lCvyJ4MhYWmvlcOVDfTLOZaYW22yVQAgMyDCTMKSn7NkVAZSEd9fZ4DwZAEfmU2AI7S9yhSiTxrzHujezXczAZ_BC6w-vkY2HFntCR1gh9ZMbfLur02e7gD_uql0ME73xwulPGmQVdopKLcfme2KABcpqfsYUes')", backgroundSize: "cover", backgroundPosition: "center" }}
          ></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col justify-center relative w-full">
        
        {/* Status Bar / Filters */}
        <div className="px-8 mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-light text-forest-green dark:text-white mb-2">My Pantry</h2>
            <div className="flex gap-4 text-sm font-medium">
              {["All Items", "Low Stock", "Expires Soon"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 transition-colors ${
                    activeTab === tab 
                      ? "text-forest-green border-b-2 border-primary dark:text-primary" 
                      : "text-gray-400 hover:text-forest-green dark:hover:text-gray-200"
                  }`}
                >
                  {tab} {tab === "All Items" && `(${INVENTORY_DATA.length})`}
                  {tab === "Low Stock" && `(${INVENTORY_DATA.filter(i => i.status === 'low').length})`}
                  {tab === "Expires Soon" && `(${INVENTORY_DATA.filter(i => i.expiresSoon).length})`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-dark-surface shadow-sm text-forest-green dark:text-primary' : 'text-gray-400 hover:bg-white/50 dark:hover:bg-dark-surface/50'}`}
            >
              <span className="material-icons">view_module</span>
            </button>
            <button 
              onClick={() => setViewMode("carousel")}
              className={`p-2 rounded-full transition-colors ${viewMode === 'carousel' ? 'bg-white dark:bg-dark-surface shadow-sm text-forest-green dark:text-primary' : 'text-gray-400 hover:bg-white/50 dark:hover:bg-dark-surface/50'}`}
            >
              <span className="material-icons">view_carousel</span>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="w-full overflow-x-auto no-scrollbar pb-12 pt-4 px-8 snap-x snap-mandatory">
          <div className="flex gap-8 w-max min-h-[480px]">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -8 }}
                    key={item.id}
                    className="snap-center group relative w-[320px] h-[480px] bg-white dark:bg-dark-surface rounded-xl shadow-soft hover:shadow-floating transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
                  >
                    {/* Dynamic Badges */}
                    {item.status === "low" && (
                      <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1">
                        <span className="material-icons text-sm">warning</span> Low
                      </div>
                    )}
                    {item.status === "full" && (
                      <div className="absolute top-4 right-4 bg-leaf-green/10 text-leaf-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1">
                        <span className="material-icons text-sm">check_circle</span> Full
                      </div>
                    )}
                    {item.expiresSoon && item.status !== "low" && (
                      <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1">
                        <span className="material-icons text-sm">schedule</span> Expiring
                      </div>
                    )}

                    {/* Image Area */}
                    <div className="h-1/2 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                      <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.image}/>
                    </div>

                    {/* Content */}
                    <div className="h-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-bold text-forest-green dark:text-white">{item.name}</h3>
                          <button className="text-gray-300 hover:text-primary transition-colors"><span className="material-icons">more_horiz</span></button>
                        </div>
                        <p className="text-gray-500 text-sm mb-4">{item.subtitle}</p>
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-3xl font-light text-forest-green dark:text-gray-200">
                            {item.current}<span className="text-sm text-gray-400 font-normal ml-1">{item.unit}</span>
                          </span>
                          <span className="text-sm text-gray-400">Target: {item.target}{item.unit === 'units' ? '' : item.unit}</span>
                        </div>
                      </div>

                      {/* Dynamic Liquid Progress Bar */}
                      <div className="relative w-full h-16 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: "linear-gradient(to right, transparent 19%, #e5e7eb 20%)", backgroundSize: "20% 100%" }}></div>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`absolute bottom-0 left-0 h-full flex items-center justify-end pr-2 ${item.status === 'low' ? 'bg-[#FDAAAA]/80' : 'bg-primary/80 liquid-fill'}`}
                        >
                          <div className="h-full w-2 bg-white/20 absolute right-0 top-0 backdrop-blur-sm"></div>
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className={`font-bold text-lg drop-shadow-md ${item.status === 'full' ? 'text-white' : 'text-forest-green mix-blend-multiply dark:mix-blend-normal dark:text-white'}`}>
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="w-full flex items-center justify-center text-gray-400 py-20">
                  <p>No ingredients found matching your criteria.</p>
                </div>
              )}

              {/* Add New Placeholder - Sadece arama boşken veya Tüm Itemlar seçiliyken göster */}
              {!searchQuery && activeTab === "All Items" && (
                <motion.div 
                  layout
                  whileHover={{ scale: 1.02 }}
                  className="snap-center min-w-[320px] h-[480px] bg-white dark:bg-dark-surface rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <span className="material-icons text-3xl">add</span>
                  </div>
                  <span className="font-medium">Add New Item</span>
                </motion.div>
              )}
            </AnimatePresence>
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