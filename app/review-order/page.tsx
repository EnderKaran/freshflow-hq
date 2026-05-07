"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ReviewOrder() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-white font-manrope min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="bg-white dark:bg-neutral-surface-dark border-b border-slate-200 dark:border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-white text-xl">eco</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">FreshFlow</span>
              </div>
              {/* Breadcrumbs */}
              <nav className="hidden md:flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
                <Link className="hover:text-primary transition-colors" href="/dashboard">Dashboard</Link>
                <span className="material-icons-round text-base mx-2">chevron_right</span>
                <Link className="hover:text-primary transition-colors" href="/predictions">Inventory Predictions</Link>
                <span className="material-icons-round text-base mx-2">chevron_right</span>
                <span className="text-slate-900 dark:text-white font-semibold">Review Order</span>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <span className="material-icons-round">notifications</span>
              </button>
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbwKNPnKD518xuUEWfrHRaIla3EHL-cdHrZz-H7714Esxh02OcZ1HmfJPz5VWF73F9b7_QWSwUF9Fx6xNInZRjOR1O5Tfv03_2ZhbY1oO9Cv-uN1MJM919810t41qZoRYg1tZGBqvbOGy_GyM4hqTMPlRD3SLXvSEUzNi7nDwz1ykAu7w4bWyg6teeW2fLhWtnsNGBiWgWd_s_9aduPTlscwBQ-r6oOlmbyjWow6KZuDijUfJloXvErV4WcFG-agjfVU0inWCwKDU"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full custom-scrollbar">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Review & Confirm Order</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Review the AI-generated supply list based on next week's demand forecast. Adjust quantities as needed.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Supply Checklist */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Supplier Group: Bakery & Grains */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-neutral-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-slate-400">bakery_dining</span>
                  <h3 className="font-semibold text-slate-800 dark:text-white">Bakery & Grains</h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">Supplier: Golden Wheat Co.</span>
                </div>
                <button className="text-sm text-primary font-medium hover:text-primary-dark transition-colors">Edit Supplier</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5">
                      <th className="px-6 py-3 w-12 text-center">
                        <input defaultChecked className="checkbox-custom rounded border-slate-300 text-forest-green focus:ring-forest-green" type="checkbox"/>
                      </th>
                      <th className="px-6 py-3">Item Details</th>
                      <th className="px-6 py-3 w-32">AI Qty</th>
                      <th className="px-6 py-3 text-right">Unit Price</th>
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {/* Row 1 */}
                    <tr className="group hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-center">
                        <input defaultChecked className="checkbox-custom rounded border-slate-300 text-forest-green focus:ring-forest-green" type="checkbox"/>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                            <span className="material-icons-round text-xl">lunch_dining</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Brioche Buns</p>
                            <p className="text-xs text-slate-500">Pack of 12 • SKU: BB-402</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <input className="w-full pl-3 pr-8 py-1.5 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-surface-dark text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-primary" type="number" defaultValue="150"/>
                          <div className="absolute right-2 top-1.5 group/tooltip cursor-help">
                            <span className="material-icons-round text-primary text-sm opacity-70">psychology</span>
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 text-center">
                                +15% for projected Friday rush
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300 tabular-nums">$0.50</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white tabular-nums">$75.00</td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="group hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-center">
                        <input defaultChecked className="checkbox-custom rounded border-slate-300 text-forest-green focus:ring-forest-green" type="checkbox"/>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                            <span className="material-icons-round text-xl">grain</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Whole Grain Flour</p>
                            <p className="text-xs text-slate-500">50lb Bag • SKU: FL-220</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <input className="w-full pl-3 pr-8 py-1.5 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-surface-dark text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-primary" type="number" defaultValue="5"/>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300 tabular-nums">$22.00</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white tabular-nums">$110.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Supplier Group: Produce & Meats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-neutral-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-slate-400">restaurant</span>
                  <h3 className="font-semibold text-slate-800 dark:text-white">Fresh Produce & Meats</h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">Supplier: Local Farms Inc.</span>
                </div>
                <button className="text-sm text-primary font-medium hover:text-primary-dark transition-colors">Edit Supplier</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5">
                      <th className="px-6 py-3 w-12 text-center">
                        <input defaultChecked className="checkbox-custom rounded border-slate-300 text-forest-green focus:ring-forest-green" type="checkbox"/>
                      </th>
                      <th className="px-6 py-3">Item Details</th>
                      <th className="px-6 py-3 w-32">AI Qty</th>
                      <th className="px-6 py-3 text-right">Unit Price</th>
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {/* Row 3 */}
                    <tr className="group hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-center">
                        <input defaultChecked className="checkbox-custom rounded border-slate-300 text-forest-green focus:ring-forest-green" type="checkbox"/>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                            <span className="material-icons-round text-xl">set_meal</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Premium Beef Patties</p>
                            <p className="text-xs text-slate-500">Per lb • SKU: BF-101</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <input className="w-full pl-3 pr-8 py-1.5 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-surface-dark text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-primary" type="number" defaultValue="200"/>
                          <div className="absolute right-2 top-1.5 group/tooltip cursor-help">
                            <span className="material-icons-round text-primary text-sm opacity-70">psychology</span>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 text-center">
                                Seasonal adjustment applied
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300 tabular-nums">$4.50</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white tabular-nums">$900.00</td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="group hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-center">
                        <input defaultChecked className="checkbox-custom rounded border-slate-300 text-forest-green focus:ring-forest-green" type="checkbox"/>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-forest-green">
                            <span className="material-icons-round text-xl">eco</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Organic Lettuce</p>
                            <p className="text-xs text-slate-500">Heads • SKU: VEG-005</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <input className="w-full pl-3 pr-8 py-1.5 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-surface-dark text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-primary" type="number" defaultValue="30"/>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300 tabular-nums">$1.20</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white tabular-nums">$36.00</td>
                    </tr>
                    {/* Row 5 */}
                    <tr className="group hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 text-center">
                        <input defaultChecked className="checkbox-custom rounded border-slate-300 text-forest-green focus:ring-forest-green" type="checkbox"/>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                            <span className="material-icons-round text-xl">local_pizza</span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Roma Tomatoes</p>
                            <p className="text-xs text-slate-500">Crates • SKU: VEG-012</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <input className="w-full pl-3 pr-8 py-1.5 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-neutral-surface-dark text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-primary" type="number" defaultValue="12"/>
                          <div className="absolute right-2 top-1.5 group/tooltip cursor-help">
                            <span className="material-icons-round text-primary text-sm opacity-70">psychology</span>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 text-center">
                                Reduced due to lower forecast
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300 tabular-nums">$27.50</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white tabular-nums">$330.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Sticky Summary Panel */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24 h-fit space-y-6">
            
            {/* Financial Summary Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-neutral-surface-dark rounded-xl shadow-lg border border-slate-100 dark:border-white/5 p-6"
            >
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
              
              {/* Metric: Total Cost */}
              <div className="flex justify-between items-end mb-2">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Estimated Total</span>
                <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">$1,451.00</span>
              </div>
              <div className="flex justify-end mb-6">
                <span className="text-xs text-slate-400">Includes projected taxes & delivery fees</span>
              </div>
              
              <div className="h-px bg-slate-100 dark:bg-white/10 w-full mb-6"></div>
              
              {/* Metric: Waste Reduction */}
              <div className="bg-leaf-green/10 rounded-lg p-4 mb-6 border border-leaf-green/20">
                <div className="flex items-start gap-3">
                  <span className="material-icons-round text-leaf-green text-2xl">recycling</span>
                  <div>
                    <p className="text-leaf-green font-bold text-lg">12% Reduction</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        By using AI predictions, you're preventing approx. <span className="font-semibold text-forest-green">45 lbs</span> of food waste this week.
                    </p>
                  </div>
                </div>
              </div>

              {/* Supplier Breakdown Mini-List */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sending Orders To:</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700 dark:text-slate-300">Golden Wheat Co.</span>
                  <span className="text-slate-400">2 Items</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700 dark:text-slate-300">Local Farms Inc.</span>
                  <span className="text-slate-400">3 Items</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary hover:bg-primary-dark text-slate-900 font-bold py-4 px-6 rounded-lg shadow-md shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Confirm & Send to Suppliers</span>
                <span className="material-icons-round text-lg group-hover:translate-x-1 transition-transform">send</span>
              </motion.button>
              
              <p className="text-center text-xs text-slate-400 mt-4">
                  Orders will be processed immediately. Cancellation available within 1 hour.
              </p>
            </motion.div>

            {/* Help Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-slate-50 dark:bg-white/5 rounded-xl p-5 border border-slate-200 dark:border-white/5 flex items-start gap-4"
            >
              <div className="bg-white dark:bg-neutral-surface-dark p-2 rounded-lg shadow-sm">
                <span className="material-icons-round text-slate-400">support_agent</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Need help with this order?</h4>
                <p className="text-xs text-slate-500 mt-1 mb-2">Our support team can help verify supplier availability.</p>
                <Link className="text-xs font-bold text-primary hover:underline" href="#">Contact Support</Link>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}
