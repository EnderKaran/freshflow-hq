"use client";

import { motion } from "framer-motion";
import { useInventoryStore, selectIsBelowThreshold, Ingredient } from "../store/inventoryStore";

interface IngredientCardProps {
  ingredient: Ingredient;
}

export function IngredientCard({ ingredient }: IngredientCardProps) {
  // Use a custom selector directly with the store hook to ensure re-renders only when this specific ingredient changes
  const isBelowThreshold = useInventoryStore((state) => 
    selectIsBelowThreshold(state, ingredient.id)
  );

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`relative p-5 rounded-xl border shadow-sm transition-all duration-300 flex flex-col gap-2 overflow-hidden ${
        isBelowThreshold 
          ? "bg-[#FDAAAA] border-[#FDAAAA] dark:bg-[#FDAAAA]/90 dark:border-[#FDAAAA]" 
          : "bg-white border-slate-200 dark:bg-neutral-surface-dark dark:border-white/10 hover:shadow-md"
      }`}
    >
      {/* Low Stock Badge */}
      {isBelowThreshold && (
        <div className="absolute top-3 right-3 bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <span className="material-icons-round text-[14px]">warning</span> Low Stock
        </div>
      )}

      <h3 className={`font-bold text-lg pr-20 ${isBelowThreshold ? "text-red-950" : "text-slate-800 dark:text-white"}`}>
        {ingredient.name}
      </h3>
      
      <div className={`flex justify-between items-end mt-2 ${isBelowThreshold ? "text-red-900" : "text-slate-600 dark:text-slate-300"}`}>
        <div>
          <p className="text-[10px] opacity-70 mb-1 uppercase tracking-wider font-semibold">Current</p>
          <p className="text-3xl font-light tabular-nums">
            {ingredient.stockLevel}<span className="text-sm font-normal ml-1">{ingredient.unit}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] opacity-70 mb-1 uppercase tracking-wider font-semibold">Safety Limit</p>
          <p className="text-sm font-medium tabular-nums">
            {ingredient.safetyThreshold} {ingredient.unit}
          </p>
        </div>
      </div>
      
      {/* Mini Progress Indicator */}
      <div className={`w-full h-1.5 mt-3 rounded-full overflow-hidden ${isBelowThreshold ? "bg-red-900/10" : "bg-slate-100 dark:bg-white/10"}`}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (ingredient.stockLevel / Math.max(1, ingredient.safetyThreshold)) * 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${isBelowThreshold ? "bg-red-700" : "bg-primary"}`} 
        />
      </div>
    </motion.div>
  );
}