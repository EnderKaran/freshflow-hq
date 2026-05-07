"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: { monthly: 29, annual: 24 },
    description: "Küçük ölçekli butik restoranlar ve kafeler için ideal.",
    features: [
      "Basic Inventory Rail",
      "Manual Price Management",
      "1 Location Support",
      "Email Support",
      "Core Analytics"
    ],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Professional",
    price: { monthly: 79, annual: 64 },
    description: "Zeka ve verimlilik arayan büyüyen işletmeler için.",
    features: [
      "AI Weather Pricing Engine",
      "Demand Forecasting",
      "Up to 3 Locations",
      "Priority Support",
      "Advanced Sales Insights",
      "Menu Engineering Tools"
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: { monthly: 199, annual: 159 },
    description: "Çok şubeli ve sürdürülebilirlik odaklı büyük zincirler.",
    features: [
      "Unlimited Locations",
      "Custom AI Model Tuning",
      "Sustainability & ESG Reports",
      "24/7 Dedicated Manager",
      "Full API Access",
      "Custom Integrations"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="bg-[#F9FAFB] dark:bg-[#0F172A] min-h-screen font-manrope text-slate-900 dark:text-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative z-20">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-icons-round text-white">eco</span>
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">FreshFlow</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/dashboard" className="px-5 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tighter mb-6"
          >
            Simple Pricing. <br />
            <span className="text-forest-green">Intelligent Growth.</span>
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10 font-medium">
            Mutfak operasyonlarınızı modernize etmek için ihtiyacınız olan her şey. 
            Gizli ücret yok, sadece verimlilik var.
          </p>

          {/* Toggle Button */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-slate-200 dark:bg-slate-800 rounded-full p-1 relative transition-colors"
            >
              <motion.div 
                animate={{ x: isAnnual ? 24 : 0 }}
                className="w-6 h-6 bg-primary rounded-full shadow-sm"
              />
            </button>
            <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
              Annual <span className="text-forest-green text-[10px] ml-1 uppercase font-black">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-slate-900 p-10 rounded-[40px] border ${plan.popular ? 'border-primary border-2 shadow-2xl shadow-primary/10' : 'border-slate-100 dark:border-white/5 shadow-sm'} flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Most Intelligent
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-400 font-medium">{plan.description}</p>
              </div>

              <div className="mb-10 flex items-baseline gap-1">
                <span className="text-4xl font-black tracking-tighter">
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className="text-slate-400 text-sm font-bold">/month</span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <span className="material-icons-round text-forest-green text-lg">check_circle</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/login"
                className={`w-full py-4 rounded-2xl text-center font-black text-sm uppercase tracking-widest transition-all ${
                  plan.popular 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:scale-[1.02]' 
                    : 'bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-100'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="mt-40 text-center">
          <h2 className="text-3xl font-black mb-12 tracking-tight">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6 text-left">
            {[
              { q: "Can I cancel anytime?", a: "Evet, istediğiniz zaman iptal edebilirsiniz. Aylık aboneliklerde bir sonraki ay ücret alınmaz." },
              { q: "Do you offer custom training?", a: "Enterprise planımızda ekibinize özel yerinde eğitim ve 7/24 destek hattı sunuyoruz." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/5">
                <h4 className="font-bold mb-2">{faq.q}</h4>
                <p className="text-sm text-slate-500 font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Final Footer */}
      <footer className="py-20 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-primary">eco</span>
            <span>FreshFlow Intelligence © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}