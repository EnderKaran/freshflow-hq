## 2024-08-02 - Ensure button accessibility for 'Add Ingredient'
**Learning:** Found an 'Add Ingredient' interactive card inside a `motion.div` instead of a semantic `motion.button` or `<button>`. This impacts accessibility as it lacks focus states, tab indexing, and keyboard accessibility for screen readers. Using semantic button elements ensures keyboard navigation functionality and role definition by default.
**Action:** Always prefer semantic `<button>` tags with appropriate `aria-label` attributes for custom interactive components, instead of adding `onClick` directly to `div`s.
