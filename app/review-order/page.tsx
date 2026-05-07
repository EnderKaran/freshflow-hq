"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { processSaleAction } from "@/lib/actions/sales.actions";
import { getInventoryItems } from "@/lib/actions/inventory.actions";
// Not: Ürünleri çekmek için getProductsItems gibi bir action da ekleyebilirsin, 
// şimdilik envanter üzerinden gidiyoruz.

export default function ReviewOrder() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- STATE YÖNETİMİ ---
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // 1. Veritabanından Malzemeleri Çek
  useEffect(() => {
    async function loadData() {
      const result = await getInventoryItems();
      if (result.success && result.data) {
        setItems(result.data);
        // Başlangıçta tümünü seçili yap ve miktarları ata
        setSelectedIds(new Set(result.data.map((i: any) => i.id)));
        const qtys = result.data.reduce((acc: any, item: any) => ({
          ...acc, [item.id]: Math.ceil(item.safetyThreshold * 1.5) // Örnek AI önerisi
        }), {});
        setQuantities(qtys);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // --- MATEMATİKSEL HESAPLAMALAR ---
  const { subtotal, tax, delivery, total } = useMemo(() => {
    const currentSubtotal = items.reduce((sum, item) => {
      // Not: Şemada price yoksa buraya sabit bir değer veya 
      // şemaya ekleyeceğin unitPrice alanını koyabilirsin
      const price = 5.50; 
      if (selectedIds.has(item.id)) {
        return sum + (quantities[item.id] || 0) * price;
      }
      return sum;
    }, 0);

    const calculatedTax = currentSubtotal * 0.08;
    const calculatedDelivery = currentSubtotal > 0 ? 45.00 : 0;
    
    return {
      subtotal: currentSubtotal,
      tax: calculatedTax,
      delivery: calculatedDelivery,
      total: currentSubtotal + calculatedTax + calculatedDelivery
    };
  }, [items, quantities, selectedIds]);

  // --- HANDLERS ---
  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    try {
      // Örnek: Seçili her bir ürün için stok düşümü yapıyoruz
      // Gerçek senaryoda bu bir 'Order' tablosuna yazılır
      for (const id of Array.from(selectedIds)) {
        await processSaleAction(id, 1); // Test amaçlı 1 birim düşüyoruz
      }
      alert("Sipariş başarıyla geçildi! Stoklar güncellendi. 🎉");
    } catch (err) {
      alert("İşlem sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (id: string, value: string) => {
    const newQty = parseInt(value, 10) || 0;
    setQuantities(prev => ({ ...prev, [id]: newQty >= 0 ? newQty : 0 }));
  };

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedIds(newSelection);
  };

  if (isLoading) return <div className="p-20 text-center">Loading Fresh Data...</div>;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-white font-manrope min-h-screen flex flex-col">
      <header className="bg-white dark:bg-neutral-surface-dark border-b border-slate-200 dark:border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-icons-round text-white text-xl">eco</span>
                </div>
                <span className="font-bold text-xl tracking-tight">FreshFlow</span>
              </div>
              <nav className="hidden md:flex items-center text-sm font-medium text-slate-500">
                <Link href="/dashboard">Dashboard</Link>
                <span className="material-icons-round text-base mx-2">chevron_right</span>
                <span className="text-slate-900 dark:text-white font-semibold">Review Order</span>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* List Section */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white dark:bg-neutral-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-slate-500 border-b border-slate-100 dark:border-white/5">
                    <th className="px-6 py-3 w-12 text-center">Status</th>
                    <th className="px-6 py-3">Item Details</th>
                    <th className="px-6 py-3 w-32">AI Qty</th>
                    <th className="px-6 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {items.map((item) => (
                    <tr key={item.id} className={selectedIds.has(item.id) ? "" : "opacity-40"}>
                      <td className="px-6 py-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.has(item.id)}
                          onChange={() => toggleSelection(item.id)}
                          className="w-5 h-5 accent-primary"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-slate-500">Current Stock: {item.stockLevel} {item.unit}</p>
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="number" 
                          value={quantities[item.id]}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="w-20 p-1 border rounded bg-transparent"
                        />
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        ${((quantities[item.id] || 0) * 5.50).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white dark:bg-neutral-surface-dark rounded-xl shadow-lg p-6 border border-slate-100 dark:border-white/5">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
              </div>
              <div className="border-t pt-4 mb-6 flex justify-between items-end">
                <span className="font-bold">Total</span>
                <span className="text-3xl font-extrabold text-primary">${total.toFixed(2)}</span>
              </div>
              
              <motion.button 
                onClick={handleConfirmOrder}
                disabled={isSubmitting || selectedIds.size === 0}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-slate-900 font-bold py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Confirm & Send"}
                <span className="material-icons-round">send</span>
              </motion.button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}