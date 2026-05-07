"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getInventoryItems } from "@/lib/actions/inventory.actions";
import { useInventoryStore } from "@/store/inventoryStore";
import { IngredientCard } from "@/components/IngredientCard";

export default function DashboardPage() {
  // Zustand Store
  const { ingredients, setIngredients, _hasHydrated } = useInventoryStore();
  
  // Local State
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Items");

  // 1. Neon DB'den Canlı Veriyi Çekme
  useEffect(() => {
    if (_hasHydrated) {
      const fetchLiveInventory = async () => {
        const result = await getInventoryItems();
        if (result.success && result.data) {
          // Gelen veriyi hem store'a hem de persist katmanına yazıyoruz
          const formattedData = result.data.map(item => ({
            ...item,
            // Ensure safetyThreshold exists, defaulting to 0 if missing from DB
            safetyThreshold: (item as any).safetyThreshold ?? 0,
            // Ensure lastRestocked exists for Ingredient type compatibility
            lastRestocked: (item as any).lastRestocked || item.updatedAt.toISOString()
          }));
          setIngredients(formattedData);
        }
        setIsLoading(false);
      };
      fetchLiveInventory();
    }
  }, [_hasHydrated, setIngredients]);

  // 2. Arama ve Sekme Filtreleme Mantığı
  const filteredIngredients = useMemo(() => {
    return ingredients.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesTab = true;
      if (activeTab === "Low Stock") {
        matchesTab = item.stockLevel <= item.safetyThreshold;
      }
      // "Expires Soon" mantığı şemaya göre ileride eklenebilir, şimdilik boş dönüyoruz
      if (activeTab === "Expires Soon") matchesTab = false; 

      return matchesSearch && matchesTab;
    });
  }, [ingredients, searchQuery, activeTab]);

  // Hydration veya Veri Yüklenme Kontrolü
  if (!_hasHydrated || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-primary"
        >
          <span className="material-icons-round text-5xl">eco</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-work text-forest-green dark:text-gray-200 min-h-screen flex flex-col w-full transition-colors duration-300">
      
      {/* Header */}
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
          <div 
            className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCatEiE2VFL9CxRSgRmjaRcd7K_jLLTUWggo-m15Y2lv245eq4JOq84Xu6yaesIH3PnRQAhzy2Bbn-7veqiyWPXXpwGpN21BzEbKAE_yeV4cvM4lCvyJ4MhYWmvlcOVDfTLOZaYW22yVQAgMyDCTMKSn7NkVAZSEd9fZ4DwZAEfmU2AI7S9yhSiTxrzHujezXczAZ_BC6w-vkY2HFntCR1gh9ZMbfLur02e7gD_uql0ME73xwulPGmQVdopKLcfme2KABcpqfsYUes')", backgroundSize: "cover", backgroundPosition: "center" }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center relative w-full overflow-hidden">
        
        <div className="px-8 mb-4 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-light text-forest-green dark:text-white mb-2">My Pantry</h2>
            <div className="flex gap-4 text-sm font-medium">
              {["All Items", "Low Stock", "Expires Soon"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 transition-all ${
                    activeTab === tab 
                      ? "text-forest-green border-b-2 border-primary dark:text-primary" 
                      : "text-gray-400 hover:text-forest-green"
                  }`}
                >
                  {tab} 
                  {tab === "All Items" && ` (${ingredients.length})`}
                  {tab === "Low Stock" && ` (${ingredients.filter(i => i.stockLevel <= i.safetyThreshold).length})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Rail */}
        <div className="w-full overflow-x-auto no-scrollbar pb-12 pt-4 px-8 snap-x snap-mandatory">
          <div className="flex gap-8 w-max min-h-[500px]">
            <AnimatePresence mode="popLayout">
              {filteredIngredients.map((ingredient) => (
                <motion.div
                  key={ingredient.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="snap-center"
                >
                  {/* Daha önce optimize ettiğimiz IngredientCard bileşenini kullanıyoruz */}
                  <div className="w-[320px]">
                    <IngredientCard ingredient={ingredient} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add New Item Placeholder */}
            {!searchQuery && activeTab === "All Items" && (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="snap-center w-[320px] h-full min-h-[400px] bg-white dark:bg-dark-surface rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <span className="material-icons text-3xl">add</span>
                </div>
                <span className="font-medium font-manrope">Add New Ingredient</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-2 opacity-50 text-xs flex items-center justify-center gap-2 font-manrope uppercase tracking-widest">
          <span className="material-icons text-sm">arrow_back</span>
          Swipe to explore kitchen rail
          <span className="material-icons text-sm">arrow_forward</span>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-12 right-12 z-50">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-primary rounded-full shadow-2xl flex items-center justify-center text-forest-green hover:bg-white transition-all duration-300"
        >
          <span className="material-icons text-3xl">add</span>
        </motion.button>
      </div>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-leaf-green/5 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}