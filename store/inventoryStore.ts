import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Ingredient {
  id: string;
  name: string;
  stockLevel: number;
  safetyThreshold: number;
  unit: string;
}

interface InventoryState {
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
  updateStock: (id: string, newStockLevel: number) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      ingredients: [],
      setIngredients: (ingredients) => set({ ingredients }),
      updateStock: (id, newStockLevel) =>
        set((state) => ({
          ingredients: state.ingredients.map((ing) =>
            ing.id === id ? { ...ing, stockLevel: newStockLevel } : ing
          ),
        })),
    }),
    {
      name: 'inventory-storage', // name of the item in the storage (must be unique)
    }
  )
);

// Selector to check if an ingredient is below safety threshold
export const selectIsBelowThreshold = (state: InventoryState, id: string) => {
  const ingredient = state.ingredients.find((ing) => ing.id === id);
  if (!ingredient) return false;
  return ingredient.stockLevel < ingredient.safetyThreshold;
};
