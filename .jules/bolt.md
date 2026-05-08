## 2024-05-08 - React.memo and useMemo for Dashboard Performance
**Learning:** The Dashboard page renders a large list of `IngredientCard` components, which contain expensive Framer Motion animations. Parent state changes (like typing in the `searchQuery` input) were causing all of these cards to re-render, creating a severe performance bottleneck.
**Action:** Always verify if expensive components inside large lists (especially those with animations) are wrapped in `React.memo()`. Also, check for inline redundant `O(N)` calculations during renders and memoize them.
