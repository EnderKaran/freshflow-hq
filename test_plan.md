1. **Identify Performance Opportunity**: The user is typing in a search input (`searchQuery`) which immediately updates state and forces the recalculation of `filteredIngredients` on every keystroke. For large lists, this causes jank because React is trying to filter and re-render the list synchronously with the user's typing.
2. **Apply Optimization**: We can use React's `useDeferredValue` hook on the `searchQuery` state. We will pass this deferred value into the `useMemo` that calculates `filteredIngredients`. This tells React that updating the list is a lower priority than updating the input field, allowing the input to remain responsive while the list updates in the background.
3. **Write to `.jules/bolt.md`**: I will add a journal entry to `.jules/bolt.md` explaining why `useDeferredValue` is useful for search inputs that filter large lists.
4. **Draft PR**:
   - `Title: "⚡ Bolt: [performance improvement]"`
   - `Description`: Explain the use of `useDeferredValue` to debounce high-frequency list rendering.
5. **Verify**: Use local execution, or write a playwright script to verify search input responsiveness. But I'll rely on running lint/build to ensure no regressions.
