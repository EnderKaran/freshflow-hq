"use client";

import React, { memo } from "react";

// ⚡ Bolt Optimization: Extracted the table row into a separate component wrapped in React.memo().
// When a single item's quantity or selection state changes, this prevents the entire list
// of items in ReviewOrder from performing an O(N) re-render cascade.
interface ReviewOrderItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  isSelected: boolean;
  quantity: number;
  onToggle: (id: string) => void;
  onChangeQuantity: (id: string, qty: number) => void;
}

export const ReviewOrderItem = memo(function ReviewOrderItem({
  item,
  isSelected,
  quantity,
  onToggle,
  onChangeQuantity
}: ReviewOrderItemProps) {
  return (
    <tr className={`group transition-all ${isSelected ? 'bg-white dark:bg-transparent' : 'opacity-40 grayscale-[0.5] bg-slate-50/50'}`}>
      <td className="px-6 py-5">
        <input
          type="checkbox"
          aria-label={`Select ${item.name} for order`}
          checked={isSelected}
          onChange={() => onToggle(item.id)}
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
            aria-label={`Quantity for ${item.name}`}
            value={quantity}
            onChange={(e) => onChangeQuantity(item.id, parseInt(e.target.value) || 0)}
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-1.5 font-bold focus:ring-2 focus:ring-primary/50 text-sm"
          />
          <span aria-hidden="true" className="material-icons-round absolute right-2 text-primary/40 text-xs cursor-help group-hover/ai:text-primary">psychology</span>
        </div>
      </td>
      <td className="px-6 py-5 text-right font-medium text-slate-500">$5.50</td>
      <td className="px-6 py-5 text-right font-bold text-slate-900 dark:text-white">
        ${((quantity || 0) * 5.50).toFixed(2)}
      </td>
    </tr>
  );
});
