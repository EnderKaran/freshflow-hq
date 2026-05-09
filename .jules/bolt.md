## 2023-10-27 - Zustand Selector Performance Trap in Lists
**Learning:** Using `useStore(state => state.array.find(item => item.id === id))` inside a list item component (e.g., `IngredientCard`) creates a hidden O(N²) bottleneck. When the store updates, every single card re-evaluates the selector, scanning the array to find itself.
**Action:** Always compute derived item state from props directly when rendering list items, and use `React.memo` to prevent re-renders when the parent's collection reference changes but the specific item's data hasn't.
