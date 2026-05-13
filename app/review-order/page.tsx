"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { processSaleAction, processBatchSaleAction } from "@/lib/actions/sales.actions";
import { getInventoryItems } from "@/lib/actions/inventory.actions";

export default function ReviewOrder() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadData() {
      const result = await getInventoryItems();
      if (result.success && result.data) {
        setItems(result.data);
        setSelectedIds(new Set(result.data.map((i: any) => i.id)));
        const qtys = result.data.reduce((acc: any, item: any) => ({
          ...acc, [item.id]: Math.ceil(item.safetyThreshold * 1.4)
        }), {});
        setQuantities(qtys);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const { subtotal, tax, delivery, total } = useMemo(() => {
    const currentSubtotal = items.reduce((sum, item) => {
      const price = 5.50; // Gerçek DB'de unitPrice varsa onu kullan
      return selectedIds.has(item.id) ? sum + (quantities[item.id] || 0) * price : sum;
    }, 0);
    return {
      subtotal: currentSubtotal,
      tax: currentSubtotal * 0.08,
      delivery: currentSubtotal > 0 ? 45.00 : 0,
      total: currentSubtotal * 1.08 + (currentSubtotal > 0 ? 45.00 : 0)
    };
  }, [items, quantities, selectedIds]);

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    try {
      // ⚡ Bolt Optimization: Send all orders in a single HTTP request instead of N+1 requests
      const items = Array.from(selectedIds).map(id => ({ productId: id, quantity: 1 }));
      await processBatchSaleAction(items);
      alert("Order successfully sent to suppliers! 🚀");
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-[#F9FAFB] dark:bg-[#0F172A]">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-primary text-5xl">
        <span className="material-icons-round">sync</span>
      </motion.div>
    </div>
  );

  return (
    <div className="bg-[#F9FAFB] dark:bg-[#0F172A] min-h-screen text-slate-900 dark:text-slate-100 font-manrope">
      {/* Header Section */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-round text-white">eco</span>
              </div>
              <span className="font-bold text-xl tracking-tight uppercase">FreshFlow</span>
            </div>
            <nav className="hidden md:flex items-center text-sm font-medium text-slate-500 gap-2">
              <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <span className="material-icons-round text-sm">chevron_right</span>
              <span className="text-slate-900 dark:text-white font-semibold">Review Order</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCatEiE2VFL9CxRSgRmjaRcd7K_jLLTUWggo-m15Y2lv245eq4JOq84Xu6yaesIH3PnRQAhzy2Bbn-7veqiyWPXXpwGpN21BzEbKAE_yeV4cvM4lCvyJ4MhYWmvlcOVDfTLOZaYW22yVQAgMyDCTMKSn7NkVAZSEd9fZ4DwZAEfmU2AI7S9yhSiTxrzHujezXczAZ_BC6w-vkY2HFntCR1gh9ZMbfLur02e7gD_uql0ME73xwulPGmQVdopKLcfme2KABcpqfsYUes" alt="user" />
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Review & Confirm Order</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            Review the AI-generated supply list based on next week's demand forecast. Adjust quantities as needed.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Main List */}
          <div className="flex-1 space-y-8 w-full">
            
            {/* Category Group - Bakery (Örnek) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-slate-400">restaurant</span>
                  <h3 className="font-bold">Inventory Supplies</h3>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">Verified Items</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-white/5">
                      <th className="px-6 py-4 w-12">Status</th>
                      <th className="px-6 py-4">Item Details</th>
                      <th className="px-6 py-4 w-32">AI Qty</th>
                      <th className="px-6 py-4 text-right">Unit Price</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-white/5 text-sm">
                    {items.map((item) => (
                      <tr key={item.id} className={`group transition-all ${selectedIds.has(item.id) ? 'bg-white dark:bg-transparent' : 'opacity-40 grayscale-[0.5] bg-slate-50/50'}`}>
                        <td className="px-6 py-5">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.has(item.id)}
                            onChange={() => {
                              const next = new Set(selectedIds);
                              next.has(item.id) ? next.delete(item.id) : next.add(item.id);
                              setSelectedIds(next);
                            }}
                            className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-700 text-primary focus:ring-primary cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                               <span className="material-icons-round">inventory_2</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                              <p className="text-xs text-slate-400">{item.unit} • Stock: {item.stockLevel}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="relative flex items-center group/ai">
                            <input 
                              type="number" 
                              value={quantities[item.id]}
                              onChange={(e) => setQuantities({...quantities, [item.id]: parseInt(e.target.value) || 0})}
                              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-1.5 font-bold focus:ring-2 focus:ring-primary/50 text-sm"
                            />
                            <span className="material-icons-round absolute right-2 text-primary/40 text-xs cursor-help group-hover/ai:text-primary">psychology</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right font-medium text-slate-500">$5.50</td>
                        <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white">
                          ${((quantities[item.id] || 0) * 5.50).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Sticky Summary */}
          <div className="w-full lg:w-[380px] space-y-6 lg:sticky lg:top-28">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[24px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 p-8"
            >
              <h2 className="text-xl font-extrabold mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Taxes & Delivery</span>
                  <span className="font-bold">${(tax + delivery).toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-100 dark:bg-white/5 my-6" />
                <div className="flex justify-between items-end">
                  <span className="text-slate-400 font-bold">Estimated Total</span>
                  <span className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* AI Insight Card */}
              <div className="bg-[#ECFDF5] dark:bg-emerald-900/20 rounded-2xl p-5 border border-[#10B981]/10 mb-8 flex items-start gap-4">
                <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm text-emerald-500">
                  <span className="material-icons-round">recycling</span>
                </div>
                <div>
                  <p className="text-emerald-700 dark:text-emerald-400 font-black text-lg">12% Reduction</p>
                  <p className="text-xs text-emerald-600/80 dark:text-emerald-400/60 leading-relaxed mt-1">
                    By using AI predictions, you're preventing approx. <b>45 lbs</b> of food waste this week.
                  </p>
                </div>
              </div>

              <motion.button 
                onClick={handleConfirmOrder}
                disabled={isSubmitting || selectedIds.size === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#FDAAAA] hover:bg-[#F89696] text-[#632828] font-black py-5 rounded-2xl shadow-lg shadow-[#FDAAAA]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Confirm & Send to Suppliers"}
                <span className="material-icons-round text-xl">send</span>
              </motion.button>
              
              <p className="text-center text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-widest">
                Immediate processing enabled
              </p>
            </motion.div>

            {/* Support Widget */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-white/5 flex items-center gap-4">
               <span className="material-icons-round text-slate-300 text-3xl">support_agent</span>
               <div>
                  <h4 className="text-sm font-bold">Need help with this order?</h4>
                  <p className="text-[11px] text-primary font-bold cursor-pointer hover:underline">Contact Support</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}