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
  _hasHydrated: boolean; // Next.js SSR uyumluluğu için eklendi
  setHasHydrated: (state: boolean) => void;
  setIngredients: (ingredients: Ingredient[]) => void;
  updateStock: (id: string, newStockLevel: number) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      ingredients: [],
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setIngredients: (ingredients) => set({ ingredients }),
      updateStock: (id, newStockLevel) =>
        set((state) => ({
          ingredients: state.ingredients.map((ing) =>
            ing.id === id ? { ...ing, stockLevel: newStockLevel >= 0 ? newStockLevel : 0 } : ing
          ),
        })),
    }),
    {
      name: 'inventory-storage', // localStorage'daki anahtar isim
      // Hydration işleminin bitip bitmediğini yakalayan middleware fonksiyonu
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
