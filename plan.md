1. **Optimize search filtering using `useDeferredValue`**: The dashboard has a search filter (`searchQuery`) that triggers an `O(N)` list filtering calculation inside a `useMemo` on every keystroke. Although it is memoized, string comparisons over a long list still block the main thread and can cause typing lag. By wrapping `searchQuery` in `useDeferredValue` before passing it to the filtering logic, React will keep the text input perfectly responsive and calculate the filtered list at lower priority without blocking the main UI thread.

2. **Add Bolt journal entry**: Add a journal entry in `.jules/bolt.md` reflecting the critical learning about avoiding main-thread blocking on search inputs in complex React components with `useDeferredValue`.

3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**

4. **Submit the PR.**
