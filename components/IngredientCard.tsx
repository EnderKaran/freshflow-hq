"use client";

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
    <div 
      className="p-4 rounded-lg border shadow-sm transition-colors"
      style={{ 
        backgroundColor: isBelowThreshold ? "#FDAAAA" : "white",
        borderColor: isBelowThreshold ? "#FDAAAA" : "#e5e7eb"
      }}
    >
      <h3 className="font-semibold text-lg text-gray-800">{ingredient.name}</h3>
      <div className="mt-2 text-gray-600">
        <p>Stock: {ingredient.stockLevel} {ingredient.unit}</p>
        <p className="text-sm text-gray-500">Threshold: {ingredient.safetyThreshold} {ingredient.unit}</p>
      </div>
      {isBelowThreshold && (
        <p className="mt-2 text-sm font-medium text-red-800">
          Warning: Low Stock!
        </p>
      )}
    </div>
  );
}
