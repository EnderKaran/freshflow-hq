"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SalesChart } from "@/components/SalesChart";

export default function Predictions() {
  return (
    <div className="bg-fresh-rose text-fresh-forest font-display min-h-screen selection:bg-fresh-salmon selection:text-fresh-forest">
      {/* Sidebar & Mobile Nav Wrapper */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-white/90 border-r border-fresh-forest/10 h-full p-6 relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-fresh-primary flex items-center justify-center text-fresh-forest font-bold text-xl">F</div>
            <h1 className="text-xl font-bold tracking-tight">FreshFlow</h1>
          </div>
          
          <nav className="space-y-2 flex-1">
            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-fresh-forest/5 text-fresh-forest/70 hover:text-fresh-forest transition-colors" href="/dashboard">
              <span className="material-icons-round text-xl">dashboard</span>
              Dashboard
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-fresh-forest/5 text-fresh-forest/70 hover:text-fresh-forest transition-colors" href="#">
              <span className="material-icons-round text-xl">inventory_2</span>
              Inventory
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-fresh-forest/5 text-fresh-forest font-semibold transition-colors" href="/predictions">
              <span className="material-icons-round text-xl">insights</span>
              Predictions
              <span className="ml-auto w-2 h-2 rounded-full bg-fresh-primary"></span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-fresh-forest/5 text-fresh-forest/70 hover:text-fresh-forest transition-colors" href="#">
              <span className="material-icons-round text-xl">people</span>
              Staffing
            </Link>
          </nav>
          
          <div className="mt-auto pt-6 border-t border-fresh-forest/10">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-fresh-forest/5 cursor-pointer">
              <img alt="Restaurant Manager Portrait" className="w-10 h-10 rounded-full object-cover border-2 border-fresh-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBhQY3iQNFbdgpkx7vSvNCmxrkKV_wU411di0y6AStd2s9ZmEtEQVRJ3WIijTMnp_a195ykEO8o6eqhJJUUM-Fl6PbZ4DyTBgjVgBh0D1ynKZI87p7HRbmggUyvhS6JxOOgo06XmaI1ZFp71XxhwmHwYL018Qw2DttQD5C8CAbDLRaeD41rk0PbgkFpq9M-nK9FvQzBzx-18MJBbOE0V8I3U7aWKDWG6-mQuz-_Q_0QtZnXw6_S9C2WJ1gdmYbMF_E_yPcR8-lgxo"/>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Sarah Chen</p>
                <p className="text-xs text-fresh-forest/60 truncate">Manager</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative p-4 md:p-8 lg:p-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-fresh-primary/20 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>
          
          {/* Top Header (Mobile Only) */}
          <header className="md:hidden flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-fresh-primary flex items-center justify-center text-fresh-forest font-bold">F</div>
              <h1 className="text-lg font-bold">FreshFlow</h1>
            </div>
            <button className="p-2 text-fresh-forest">
              <span className="material-icons-round">menu</span>
            </button>
          </header>

          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Top Section: Weather & KPI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Weather Widget */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-fresh-forest/5 flex flex-col justify-between h-48 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-fresh-leaf/5 -z-0"></div>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-icons-round text-8xl">water_drop</span>
                </div>
                
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h3 className="text-fresh-forest/70 font-medium text-sm uppercase tracking-wide">Local Forecast</h3>
                    <p className="text-3xl font-bold mt-1">Rainy</p>
                  </div>
                  <div className="bg-fresh-forest/10 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-icons-round text-sm">location_on</span>
                    <span className="text-xs font-bold">Portland, OR</span>
                  </div>
                </div>
                
                <div className="relative z-10 mt-auto flex items-end gap-4">
                  <span className="text-5xl font-light">62°</span>
                  <div className="flex flex-col pb-1">
                    <span className="text-xs font-bold text-fresh-leaf">High Precipitation</span>
                    <span className="text-xs text-fresh-forest/60">Expect lower foot traffic</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white/80 rounded-xl p-6 shadow-sm border border-fresh-forest/5 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-fresh-salmon/20 rounded-lg text-fresh-salmon">
                      <span className="material-icons-round">trending_down</span>
                    </div>
                    <span className="text-sm font-medium text-fresh-forest/70">Projected Waste</span>
                  </div>
                  <p className="text-3xl font-bold text-fresh-forest">12.5 kg</p>
                  <p className="text-xs text-fresh-forest/60 mt-1">Without adjustment</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white/80 rounded-xl p-6 shadow-sm border border-fresh-forest/5 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-fresh-primary/20 rounded-lg text-fresh-forest">
                      <span className="material-icons-round">savings</span>
                    </div>
                    <span className="text-sm font-medium text-fresh-forest/70">Potential Savings</span>
                  </div>
                  <p className="text-3xl font-bold text-fresh-forest">$420</p>
                  <p className="text-xs text-fresh-forest/60 mt-1">If recommendation applied</p>
                </motion.div>
              </div>
            </div>

            {/* Main Hero: AI Recommendation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border-l-8 border-fresh-salmon overflow-hidden relative"
            >
              <div className="p-8 md:p-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fresh-salmon text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      <span className="material-icons-round text-sm">warning</span>
                      Sustainability Alert
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                      AI Recommendation: <br/>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-fresh-forest to-fresh-leaf">Order 20% less meat</span>
                    </h2>
                    <p className="text-lg text-fresh-forest/80 leading-relaxed">
                      Our predictive model indicates a significant drop in footfall due to the incoming storm front. Reducing your meat order will prevent spoilage and align with sustainability goals.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <motion.button 
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 bg-fresh-primary hover:bg-fresh-primary/90 text-fresh-forest font-bold rounded-xl shadow-lg shadow-fresh-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-icons-round">check</span>
                      Approve Change
                    </motion.button>
                    <motion.button 
                      whileHover={{ backgroundColor: "rgba(58, 111, 67, 0.05)" }}
                      className="w-full py-3 px-6 bg-transparent border-2 border-fresh-forest/10 text-fresh-forest font-semibold rounded-xl transition-colors"
                    >
                      Adjust Manually
                    </motion.button>
                  </div>
                </div>
                
                {/* AI Explanation Footer */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-fresh-forest/60">
                  <div className="flex items-center gap-2">
                    <span className="material-icons-round text-fresh-leaf">psychology</span>
                    <span>Based on 3 years of historical weather data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-icons-round text-fresh-leaf">history</span>
                    <span>Correlated with last month's Tuesday sales</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Background Graphic */}
              <div className="absolute right-0 bottom-0 h-full w-1/3 opacity-5 pointer-events-none">
                <img alt="Abstract green data pattern" className="w-full h-full object-cover" style={{ maskImage: "linear-gradient(to left, black, transparent)" }} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfrqWdSCYzLZ3bFyANPXuNGXRPGPMp8zHir60Vpuie3nfMquz_BKOiMHHDotrf0enhZ7zIbcnld_rlDT1gs4PnG0XODpLuajo7gODCFW1UuX6QjA5zEqla0s4VNAD7rFyXP_HsbAB_1z4b7q76QK1sT95FSEgurDzIYnugiVL4iFAriOlsMyEVEPehk0hPzUgMA5UZ4hvvHHep9j_ZRekmx3-pnHEMt4uoGl-RhP7Nr054Z5hrY763Undaxfo4nNp69ETMjM69gec"/>
              </div>
            </motion.div>

            {/* Bottom Section: Detailed Graph */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-fresh-forest/5"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-icons-round text-fresh-leaf">show_chart</span>
                    Weather vs. Sales Correlation
                  </h3>
                  <p className="text-fresh-forest/60 text-sm mt-1">Visualizing impact of precipitation on meat-based dish orders.</p>
                </div>
                <div className="flex items-center gap-2 bg-fresh-forest/5 p-1 rounded-lg">
                  <button className="px-3 py-1.5 bg-white shadow-sm rounded-md text-xs font-bold text-fresh-forest">Week</button>
                  <button className="px-3 py-1.5 hover:bg-white/50 rounded-md text-xs font-medium text-fresh-forest/60 transition">Month</button>
                  <button className="px-3 py-1.5 hover:bg-white/50 rounded-md text-xs font-medium text-fresh-forest/60 transition">Quarter</button>
                </div>
              </div>
              
              {/* Chart Container */}
              <div className="relative w-full h-64 md:h-80">
                <SalesChart />
              </div>
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  );
}
