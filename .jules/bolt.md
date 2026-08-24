## 2026-05-07 - React Component Re-render Optimization\n**Learning:** The dashboard has a long list of complex `IngredientCard` components that update dynamically via state management. Without `React.memo`, typing in the local search filter was causing every single card to re-render on every keystroke because the parent component updated state. \n**Action:** Always verify if child components in large lists should be memoized, especially when the parent frequently updates state unrelated to individual items (like search inputs).

## 2026-05-11 - Zustand Selector Bottleneck in List Components
**Learning:** Using an O(N) array search inside a Zustand selector (`selectIsBelowThreshold`) for each item in a rendered list created an O(N²) bottleneck. Whenever the store updated, ALL list items re-evaluated the selector, unnecessarily iterating through the entire inventory array on the main thread.
**Action:** When a parent component already passes the full item object to a child as a prop, avoid using a global store selector to find it again. Compute derived state (`isBelowThreshold = stockLevel <= safetyThreshold`) locally in O(1) time within the child component instead.

## 2026-05-12 - N+1 Network Requests in Server Actions
**Learning:** Next.js Server Actions are essentially HTTP POST requests under the hood. When calling a Server Action inside a loop (e.g., `for` loop iterating over selected items), it triggers a separate network request for each iteration, causing an N+1 bottleneck and severe UI lagging.
**Action:** Always batch related Server Action calls into a single request by creating a "bulk" or "batch" action on the backend that accepts an array of data. Process them concurrently (e.g., `Promise.all`) on the server to optimize network roundtrips and improve responsiveness.

## 2024-05-20 - Concurrent Prisma Transactions
**Learning:** Sequential `await` calls inside Prisma transaction loops (e.g., `for...of`) introduce severe N+1 database roundtrips.
**Action:** Always batch array operations using `Promise.all(array.map(...))` to send them concurrently within the transaction context.

## 2026-05-13 - Prisma Serverless DB Connection Pooling
**Learning:** In a Serverless Postgres architecture (like Neon), sending a large array of database queries directly to `Promise.all(updates)` forces Prisma to attempt opening a separate DB connection for each query simultaneously. This can quickly exhaust the connection pool and result in significant network overhead, degrading performance on bulk updates.
**Action:** When executing multiple independent database update/create operations, use `await prisma.$transaction(updates)` instead of `Promise.all()`. This bundles all operations into a single network request and reuses a single transaction connection, preventing pool exhaustion and vastly reducing latency.
## 2024-05-17 - Prevent Serverless DB Connection Pool Exhaustion in Prisma Transactions
**Learning:** In a Serverless Postgres architecture (like Neon), sending a large array of independent Prisma transactions (`createSaleTransaction`) to `Promise.all()` opens multiple independent database connections simultaneously. This causes severe network latency and quickly exhausts the DB connection pool when batch processing operations like sales.
**Action:** Always batch multiple interactive database operations into a single sequential `prisma.$transaction(async (tx) => { ... })` instead of using `Promise.all()` over multiple independent transactions. Pass the transaction client (`tx`) down to helper functions to reuse the single connection for the entire batch.

## 2026-05-14 - Prisma Unused Relations Bottleneck
**Learning:** Over-fetching relations in Prisma (e.g., using `include: { relation: true }` "just in case") when the returned relational data is never consumed causes wasteful SQL JOINs. In Serverless Postgres architectures, this unnecessarily increases database memory overhead and network payload size, degrading transaction performance.
**Action:** Always verify if included relations are actually mapped or accessed in the code. If only scalar foreign keys are needed, remove the `include` statement to prevent unnecessary database JOINs and reduce payload size.

## 2026-05-15 - React State Initialization Bottleneck (O(N²))
**Learning:** Using `Array.reduce` with the object spread operator (`...acc`) to build a state dictionary from an array inside a `useEffect` loop creates an O(N²) memory and CPU bottleneck. On each iteration, the entire accumulator object is cloned, which becomes increasingly expensive for large datasets.
**Action:** When initializing large dictionary objects in React state from arrays, always use `Object.fromEntries(array.map(...))` to construct the object in O(N) time instead of using `reduce` with the object spread operator.

## 2026-05-16 - Subtotal Calculation Efficiency (O(N) vs O(K))
**Learning:** Calculating a subtotal by filtering or checking every element in a full `items` array against a Set (`selectedIds.has(item.id)`) forces an O(N) operation on every state change.
**Action:** When calculating derived state (like subtotals) that only depends on selected items, iterate directly over the subset (`selectedIds`) rather than the full list. This reduces the time complexity from O(N) to O(K) and improves rendering performance for large lists.

## 2026-05-18 - React Array Allocation Bottleneck inside Render
**Learning:** Performing inline O(N) array operations like `array.filter(condition).length` directly inside a React component's return statement forces the creation of intermediate array objects on every single render. This triggers frequent garbage collection cycles, especially when typing in a search bar.
**Action:** Extract list counts into a `useMemo` and use `array.reduce((count, item) => condition ? count + 1 : count, 0)` to count items in O(N) time without allocating any intermediate arrays.

## 2026-05-18 - Early Returns in Filter Callbacks
**Learning:** Running expensive string operations (like `item.name.toLowerCase()`) unconditionally inside an `array.filter()` callback creates a CPU bottleneck, even for items that would fail other simple boolean checks or when the search query is empty.
**Action:** Always add early returns in filter callbacks. If the search query is empty (`!searchQuery`), return `true` immediately to skip string allocations. If an item fails a simple condition (like active tab mismatch), return `false` before performing string searches.

## 2026-05-19 - React Component Re-render Bottleneck (O(N) List Updates)
**Learning:** In the `ReviewOrder` page, mapping over the `items` array to render inline `<tr>` elements caused the entire table (all N rows) to re-render whenever a single item's state (like its quantity or checkbox selection) changed. This is because the state updates were handled at the parent (`ReviewOrder`) level without memoizing the individual list items, resulting in an O(N) re-render bottleneck when the dataset scaled.
**Action:** Always extract inline list items that depend on dynamic state into their own separate components and wrap them in `React.memo()`. Use `useCallback` for event handlers (`onToggle`, `onQuantityChange`) in the parent to pass stable function references down to the memoized children, ensuring O(1) rendering updates when a single item changes.
## 2026-05-20 - High-Frequency Input Blocking Main Thread
**Learning:** Synchronous rendering of a large list (like `IngredientCard`s in the dashboard) driven by a high-frequency input (like a search bar) causes significant jank, as the main thread blocks on every keystroke.
**Action:** When a search bar or similar high-frequency input filters a large list, use React's `useDeferredValue` to decouple the fast input state updates from the heavy list rendering. This ensures the UI remains responsive.
