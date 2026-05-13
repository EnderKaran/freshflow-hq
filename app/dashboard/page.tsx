"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getInventoryItems } from "@/lib/actions/inventory.actions";
import { getAdjustedSalesForecast } from "@/lib/transactions/weatherService";
import { optimizeMenuPricing } from "@/lib/actions/pricing.actions";
import { useInventoryStore } from "@/store/inventoryStore";
import { IngredientCard } from "@/components/IngredientCard";

export default function DashboardPage() {
  const { ingredients, setIngredients, _hasHydrated } = useInventoryStore();
  
  // Local State
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Items");
  const [weatherData, setWeatherData] = useState<any>(null);

  // 1. Veri Senkronizasyonu (Neon DB + Weather API)
  useEffect(() => {
    if (_hasHydrated) {
      const initDashboard = async () => {
        try {
          // Paralel veri çekme (Performance Optimization)
          const [invResult, weatherResult] = await Promise.all([
            getInventoryItems(),
            getAdjustedSalesForecast(100, "Bursa") // Senin lokasyonun Bursa odaklı
          ]);

          if (invResult.success && invResult.data) {
            setIngredients(invResult.data);
          }
          
          setWeatherData(weatherResult);
        } catch (error) {
          console.error("Dashboard yüklenirken hata:", error);
        } finally {
          setIsLoading(false);
        }
      };
      initDashboard();
    }
  }, [_hasHydrated, setIngredients]);

  // 2. Fiyat Optimizasyon Handler'ı
  const handleOptimize = async () => {
    setIsOptimizing(true);
    const result = await optimizeMenuPricing("Bursa");
    if (result.success) {
      alert(result.message);
      // Fiyatlar değiştiği için sayfayı veya veriyi tazeleyebiliriz
    }
    setIsOptimizing(false);
  };

  // 3. Filtreleme Mantığı
  const filteredIngredients = useMemo(() => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    return ingredients.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(lowerSearchQuery);
      let matchesTab = true;
      if (activeTab === "Low Stock") matchesTab = item.stockLevel <= item.safetyThreshold;
      return matchesSearch && matchesTab;
    });
  }, [ingredients, searchQuery, activeTab]);

  if (!_hasHydrated || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="text-primary">
          <span className="material-icons-round text-5xl">eco</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] dark:bg-background-dark font-work text-forest-green dark:text-gray-200 min-h-screen flex flex-col w-full transition-colors duration-300">
      
      {/* Header */}
      <header className="flex-none px-8 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">F</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-forest-green dark:text-primary leading-tight">FreshFlow</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Kitchen Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Weather Widget Mini */}
          {weatherData && (
            <div className="hidden lg:flex items-center gap-3 bg-white dark:bg-dark-surface px-4 py-2 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
              <span className="material-icons-round text-primary text-xl">
                {weatherData.isRainy ? 'umbrella' : 'wb_sunny'}
              </span>
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Bursa, TR</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{weatherData.temp}°C</p>
              </div>
            </div>
          )}
          
          <div className="hidden md:flex items-center bg-white dark:bg-dark-surface px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-white/5">
            <span className="material-icons text-gray-400 text-xl mr-2">search</span>
            <input 
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-48" 
              placeholder="Search kitchen rail..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col px-8 relative overflow-hidden">
        
        {/* Insights & Actions Row */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          {/* Menu Intelligence Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-white dark:bg-dark-surface p-6 rounded-[28px] border border-slate-100 dark:border-white/5 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <span className="material-icons-round text-3xl">psychology</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Menu Intelligence</h3>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                  {weatherData?.message || "Analiz ediliyor..."}
                </p>
              </div>
            </div>
            <button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
            >
              {isOptimizing ? "Optimizing..." : "Optimize Prices"}
              <span className="material-icons-round text-sm">bolt</span>
            </button>
          </motion.div>

          {/* Quick Metrics */}
          <div className="flex gap-4">
             <div className="bg-forest-green text-white p-6 rounded-[28px] w-40">
                <p className="text-[10px] font-bold opacity-60 uppercase mb-2">Efficiency</p>
                <p className="text-2xl font-black">+12%</p>
             </div>
             <div className="bg-white dark:bg-dark-surface p-6 rounded-[28px] border border-slate-100 dark:border-white/5 w-40">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Stock Alerts</p>
                <p className="text-2xl font-black text-rose-500">
                  {ingredients.filter(i => i.stockLevel <= i.safetyThreshold).length}
                </p>
             </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-4xl font-black text-forest-green dark:text-white tracking-tighter mb-4">My Pantry</h2>
          <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
            {["All Items", "Low Stock"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition-all ${
                  activeTab === tab 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-gray-400 hover:text-forest-green"
                }`}
              >
                {tab} 
                <span className="ml-2 opacity-40">
                  {tab === "All Items" ? ingredients.length : ingredients.filter(i => i.stockLevel <= i.safetyThreshold).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Rail */}
        <div className="w-full overflow-x-auto no-scrollbar pb-12 pt-4 snap-x snap-mandatory">
          <div className="flex gap-8 w-max min-h-[480px]">
            <AnimatePresence mode="popLayout">
              {filteredIngredients.map((ingredient) => (
                <motion.div
                  key={ingredient.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="snap-center"
                >
                  <div className="w-[310px]">
                    <IngredientCard ingredient={ingredient} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {!searchQuery && activeTab === "All Items" && (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="snap-center w-[310px] h-full min-h-[400px] bg-white dark:bg-dark-surface rounded-[32px] border-2 border-dashed border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-gray-300 hover:border-primary hover:text-primary transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <span className="material-icons text-3xl">add</span>
                </div>
                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Add Ingredient</span>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Floating UI Elements */}
      <div className="fixed bottom-10 right-10 z-50">
        <motion.button 
          aria-label="Add new item"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-forest-green text-white rounded-2xl shadow-2xl flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 transition-shadow"
        >
          <span aria-hidden="true" className="material-icons text-2xl font-bold text-primary">add</span>
        </motion.button>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-leaf-green/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}