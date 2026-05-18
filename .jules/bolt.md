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
