"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const solutions = [
  {
    id: "01",
    title: "Dynamic Weather Pricing",
    description: "Hava durumunu anlık takip eden algoritmamız, sıcaklık ve yağış değişimlerine göre menü fiyatlarını optimize ederek kâr marjınızı %15'e kadar artırır.",
    icon: "cloudy_snowing",
    color: "bg-blue-50 text-blue-600",
    feature: "Real-time API Integration"
  },
  {
    id: "02",
    title: "Predictive Inventory Rail",
    description: "Geçmiş satış verileri ve gelecek tahminlerini birleştirerek, ihtiyacınız olan malzemeleri siz daha fark etmeden listeler ve gıda israfını minimuma indirir.",
    icon: "analytics",
    color: "bg-emerald-50 text-emerald-600",
    feature: "AI-Powered Forecasting"
  },
  {
    id: "03",
    title: "Menu Intelligence & Engineering",
    description: "Hangi ürünlerin yıldız, hangilerinin 'atıl' olduğunu analiz eder. Menü yerleşiminizi otomatik optimize ederek en kârlı ürünleri öne çıkarır.",
    icon: "auto_awesome",
    color: "bg-amber-50 text-amber-600",
    feature: "Data-Driven Insights"
  },
  {
    id: "04",
    title: "Sustainable Kitchen Management",
    description: "Karbon ayak izinizi ve atık miktarınızı raporlar. Sürdürülebilir bir mutfak yönetimi için gereken tüm metrikleri tek bir panelde sunar.",
    icon: "eco",
    color: "bg-forest-green/10 text-forest-green",
    feature: "ESG Reporting Ready"
  }
];

export default function SolutionsPage() {
  return (
    <div className="bg-[#F9FAFB] dark:bg-[#0F172A] min-h-screen font-manrope text-slate-900 dark:text-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative z-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
            <span className="material-icons-round text-white">eco</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">FreshFlow</span>
        </Link>
        <div className="flex items-center gap-8 text-sm font-bold">
          <Link href="/login" className="px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl hover:opacity-90 transition-all">
            Access Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Solutions</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-green to-primary">Kitchen Logic.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
            FreshFlow, restoran yönetimini manuel bir süreçten çıkarıp, veri odaklı bir otonom sisteme dönüştürür. 
            Maliyetleri düşürün, verimliliği artırın.
          </p>
        </motion.div>

        {/* Floating Background Decor */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </section>

      {/* Solutions Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <span className="material-icons-round text-3xl">{item.icon}</span>
                  </div>
                  <span className="text-4xl font-black text-slate-100 dark:text-white/5">{item.id}</span>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  {item.description}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-50 dark:border-white/5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.feature}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-forest-green rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-forest-green/20"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              Mutfaktaki değişimi başlatmaya <br /> hazır mısınız?
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link href="/login" className="px-10 py-5 bg-primary text-forest-green font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest text-sm">
                Sistemi Deneyimleyin
              </Link>
              <Link href="#" className="px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-sm">
                Satış Ekibiyle Görüşün
              </Link>
            </div>
          </div>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-white/5 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
        © {new Date().getFullYear()} FreshFlow Intelligence. All Rights Reserved.
      </footer>
    </div>
  );
}