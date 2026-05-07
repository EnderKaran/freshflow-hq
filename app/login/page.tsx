"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { loginAction } from "@/lib/actions/auth.actions";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
    // Başarılıysa action içindeki redirect("/dashboard") otomatik çalışacak
  };

  return (
    <div className="font-jakarta bg-leaf-green min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden w-full transition-colors duration-500">
      {/* Arka Plan Desenleri */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "40px 40px" }}
      ></div>

      {/* Ana Kart */}
      <motion.main 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-md bg-pale-rose rounded-3xl shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="pt-12 pb-6 px-10 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-primary/20 rounded-2xl">
            <span className="material-icons text-forest-green text-3xl">restaurant</span>
          </div>
          <h1 className="text-3xl font-extrabold text-forest-green mb-1 tracking-tight">FreshFlow</h1>
          <p className="text-forest-green/80 font-medium text-lg">The Clean Counter</p>
        </div>

        {/* Hata Mesajı Alanı */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-10 mb-4"
            >
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                <span className="material-icons text-sm">error</span>
                {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form className="px-10 pb-12 space-y-6" onSubmit={handleSubmit}>
          {/* Email / Manager ID */}
          <div className="space-y-2 group">
            <label className="block text-sm font-bold text-forest-green uppercase tracking-wider" htmlFor="email">Manager ID / Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-forest-green/50 text-xl group-focus-within:text-forest-green transition-colors">badge</span>
              </div>
              <input 
                name="email"
                className="block w-full pl-10 pr-3 py-3 border-2 border-forest-green/30 rounded-xl bg-white/50 text-forest-green placeholder-forest-green/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-200 font-medium" 
                id="email" 
                placeholder="ender@freshflow.com" 
                type="text"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2 group">
            <label className="block text-sm font-bold text-forest-green uppercase tracking-wider" htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-forest-green/50 text-xl group-focus-within:text-forest-green transition-colors">lock</span>
              </div>
              <input 
                name="password"
                className="block w-full pl-10 pr-10 py-3 border-2 border-forest-green/30 rounded-xl bg-white/50 text-forest-green placeholder-forest-green/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-200 font-medium" 
                id="password" 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"} 
                required
              />
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-forest-green/50 hover:text-forest-green transition-colors" 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-icons text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`w-full bg-primary hover:bg-[#ff9999] text-forest-green font-bold text-lg py-4 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all duration-200 flex items-center justify-center gap-2 mt-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
            type="submit"
          >
            {isLoading ? (
              <span className="material-icons animate-spin">sync</span>
            ) : (
              <>
                <span>Open Kitchen</span>
                <span className="material-icons text-xl">arrow_forward</span>
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-between pt-4 text-sm font-medium text-forest-green/70">
            <Link className="hover:text-forest-green transition-colors" href="#">Forgot Password?</Link>
            <Link className="hover:text-forest-green transition-colors" href="#">Contact Support</Link>
          </div>
        </form>
      </motion.main>

      <footer className="absolute bottom-6 w-full text-center z-10">
        <p className="text-white/70 text-sm font-medium">© {new Date().getFullYear()} FreshFlow Systems. Sustainable Kitchen Management.</p>
      </footer>
    </div>
  );
}