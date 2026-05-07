"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sustainabilityMetrics = [
  {
    title: "Food Waste Prevented",
    value: "420 lbs",
    change: "+18%",
    trend: "up",
    icon: "recycling",
    desc: "AI tahminleme sayesinde çöpe gitmekten kurtarılan malzeme miktarı."
  },
  {
    title: "Carbon Offset",
    value: "1.2 Tons",
    change: "-12%",
    trend: "down",
    icon: "co2",
    desc: "Yerel tedarikçi kullanımı ve lojistik optimizasyonu ile sağlanan tasarruf."
  },
  {
    title: "Water Saved",
    value: "850 L",
    change: "+5%",
    trend: "up",
    icon: "water_drop",
    desc: "Envanter rotasyonu ve verimli saklama koşullarıyla önlenen su israfı."
  }
];

export default function SustainabilityPage() {
  return (
    <div className="bg-[#F9FAFB] dark:bg-[#0F172A] min-h-screen font-manrope text-slate-900 dark:text-white">
      {/* Mini Nav */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center border-b border-slate-100 dark:border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <span className="material-icons-round text-slate-400 group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-sm font-bold text-slate-500">Back to Rail</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-forest-green rounded-lg flex items-center justify-center">
            <span className="material-icons-round text-white text-sm">eco</span>
          </div>
          <span className="font-black text-sm uppercase tracking-widest">Impact Report</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            Cooking for the <br />
            <span className="text-forest-green">Next Generation.</span>
          </motion.h1>
          <p className="max-w-2xl text-lg text-slate-500 leading-relaxed font-medium">
            FreshFlow Intelligence, mutfağınızdaki her veriyi gezegenin geleceği için analiz eder. 
            İsrafı kazanca, veriyi sürdürülebilirliğe dönüştürün.
          </p>
        </header>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {sustainabilityMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-white/5 shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-forest-green/10 text-forest-green rounded-2xl flex items-center justify-center">
                  <span className="material-icons-round">{metric.icon}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${metric.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  {metric.change}
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{metric.title}</p>
              <h3 className="text-4xl font-black mb-4 tracking-tighter">{metric.value}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Circular Economy Diagram Placeholder Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="space-y-8">
            <h2 className="text-4xl font-black tracking-tight">The Circular Kitchen Cycle</h2>
            <div className="space-y-6">
              <div className="flex gap-5">
                <div className="flex-none w-10 h-10 rounded-full bg-primary text-forest-green flex items-center justify-center font-black">1</div>
                <div>
                  <h4 className="font-bold text-lg">Smart Sourcing</h4>
                  <p className="text-sm text-slate-500">Sadece ihtiyacınız olanı, yerel üreticiden en taze haliyle sipariş edin.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-none w-10 h-10 rounded-full bg-primary text-forest-green flex items-center justify-center font-black">2</div>
                <div>
                  <h4 className="font-bold text-lg">Inventory Rail Monitoring</h4>
                  <p className="text-sm text-slate-500">Ürünlerin ömrünü gerçek zamanlı takip edin, son kullanma tarihlerini optimize edin.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-none w-10 h-10 rounded-full bg-primary text-forest-green flex items-center justify-center font-black">3</div>
                <div>
                  <h4 className="font-bold text-lg">Waste-to-Profit Conversion</h4>
                  <p className="text-sm text-slate-500">Fazla stoğu anlık kampanyalarla kazanca dönüştürün, israfı sıfırlayın.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-forest-green/20 rounded-full"
            />
          </div>
        </section>

        {/* Global Impact CTA */}
        <section className="text-center py-20 bg-slate-900 rounded-[48px] text-white overflow-hidden relative">
          <div className="relative z-10">
            <span className="material-icons-round text-primary text-5xl mb-6">public</span>
            <h2 className="text-3xl md:text-4xl font-black mb-6">Small Steps, Big Change.</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 px-6">
              FreshFlow kullanan her restoran, yıllık ortalama 2.4 ton gıda israfını önlüyor. 
              Siz de bu topluluğun bir parçası olun.
            </p>
            <Link href="/dashboard" className="inline-block px-10 py-4 bg-primary text-forest-green font-black rounded-2xl hover:scale-105 transition-transform uppercase tracking-widest text-sm">
              Sistemi Başlat
            </Link>
          </div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
        </section>
      </main>
    </div>
  );
}