"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
}

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      
      {/* AnimatePresence, bileşen DOM'dan silinirken de animasyon oynatmasını sağlar */}
      <AnimatePresence>
        {show && (
          <motion.div 
            initial={{ opacity: 0, y: position === "top" ? 5 : -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? 2 : -2, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute ${
              position === "top" ? "bottom-full mb-2.5" : "top-full mt-2.5"
            } left-1/2 -translate-x-1/2 w-max max-w-[250px] px-3 py-2 text-xs font-medium text-white dark:text-gray-100 bg-slate-800 dark:bg-neutral-800 rounded-lg shadow-xl border border-white/10 z-50 pointer-events-none text-center leading-relaxed`}
            role="tooltip"
          >
            {content}
            
            {/* Dinamik Üçgen Ok (Arrow) */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
                position === "top" 
                  ? "top-full border-t-slate-800 dark:border-t-neutral-800" 
                  : "bottom-full border-b-slate-800 dark:border-b-neutral-800"
              }`}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}