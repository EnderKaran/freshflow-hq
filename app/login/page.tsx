"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="font-jakarta bg-leaf-green min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden w-full">
      {/* Decorative Abstract Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "40px 40px" }}
      ></div>

      {/* Large decorative leaf accents (SVG) */}
      <motion.div 
        initial={{ opacity: 0, rotate: -30, x: -50, y: 50 }}
        animate={{ opacity: 0.2, rotate: -12, x: 0, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute -bottom-20 -left-20 text-white transform w-64 h-64 pointer-events-none"
      >
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"></path>
        </svg>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, rotate: 20, x: 50, y: -50 }}
        animate={{ opacity: 0.1, rotate: 45, x: 0, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="absolute top-10 right-10 text-white transform w-48 h-48 pointer-events-none"
      >
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"></path>
        </svg>
      </motion.div>

      {/* Main Card */}
      <motion.main 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md bg-pale-rose rounded-3xl shadow-2xl relative z-10 overflow-hidden"
      >
        {/* Header Section */}
        <div className="pt-12 pb-8 px-10 text-center">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 mb-4 bg-primary/20 rounded-2xl cursor-pointer"
          >
            <span className="material-icons text-forest-green text-3xl">restaurant</span>
          </motion.div>
          <h1 className="text-3xl font-extrabold text-forest-green mb-1 tracking-tight">FreshFlow</h1>
          <p className="text-forest-green/80 font-medium text-lg">The Clean Counter</p>
        </div>

        {/* Login Form */}
        <form className="px-10 pb-12 space-y-6" onSubmit={handleLogin}>
          {/* Manager ID Input */}
          <div className="space-y-2 group">
            <label className="block text-sm font-bold text-forest-green uppercase tracking-wider" htmlFor="manager-id">Manager ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-forest-green/50 text-xl group-focus-within:text-forest-green transition-colors">badge</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-3 border-2 border-forest-green/30 rounded-xl bg-white/50 text-forest-green placeholder-forest-green/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-200" 
                id="manager-id" 
                placeholder="Enter your ID" 
                type="text"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2 group">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold text-forest-green uppercase tracking-wider" htmlFor="password">Password</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-forest-green/50 text-xl group-focus-within:text-forest-green transition-colors">lock</span>
              </div>
              <input 
                className="block w-full pl-10 pr-10 py-3 border-2 border-forest-green/30 rounded-xl bg-white/50 text-forest-green placeholder-forest-green/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-200" 
                id="password" 
                placeholder="••••••••" 
                type="password"
                required
              />
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-forest-green/50 hover:text-forest-green transition-colors" type="button">
                <span className="material-icons text-xl">visibility</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary hover:bg-[#ff9999] text-forest-green font-bold text-lg py-4 px-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-200 flex items-center justify-center gap-2 mt-4" 
            type="submit"
          >
            <span>Open Kitchen</span>
            <span className="material-icons text-xl">arrow_forward</span>
          </motion.button>

          {/* Footer Links */}
          <div className="flex items-center justify-between pt-4 text-sm font-medium text-forest-green/70">
            <Link className="hover:text-forest-green transition-colors border-b border-transparent hover:border-forest-green" href="#">Forgot Password?</Link>
            <Link className="hover:text-forest-green transition-colors border-b border-transparent hover:border-forest-green" href="#">Contact Support</Link>
          </div>
        </form>

        {/* Card Footer Decoration */}
        <div className="bg-forest-green/5 py-4 px-10 flex justify-center gap-6 border-t border-forest-green/10">
          <div className="flex flex-col items-center gap-1 group cursor-default" title="Inventory Status">
            <div className="bg-white/40 p-2 rounded-full group-hover:bg-white/60 transition-colors">
              <span className="material-icons text-forest-green/60 text-lg">inventory_2</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-forest-green/40">Stock</span>
          </div>
          <div className="flex flex-col items-center gap-1 group cursor-default" title="Recent Orders">
            <div className="bg-white/40 p-2 rounded-full group-hover:bg-white/60 transition-colors">
              <span className="material-icons text-forest-green/60 text-lg">receipt_long</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-forest-green/40">Orders</span>
          </div>
          <div className="flex flex-col items-center gap-1 group cursor-default" title="Sustainability Score">
            <div className="bg-white/40 p-2 rounded-full group-hover:bg-white/60 transition-colors">
              <span className="material-icons text-forest-green/60 text-lg">eco</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-forest-green/40">Eco</span>
          </div>
        </div>
      </motion.main>

      {/* Page Footer */}
      <footer className="absolute bottom-6 w-full text-center z-10">
        <p className="text-white/70 text-sm font-medium">© 2023 FreshFlow Systems. Sustainable Kitchen Management.</p>
      </footer>
    </div>
  );
}
