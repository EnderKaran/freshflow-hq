## 2024-08-06 - [useDeferredValue for filtering]
**Learning:** High-frequency inputs like search bars that drive large array filter/reduce operations can cause synchronous rendering to block the main thread.
**Action:** Use React's `useDeferredValue` to allow React to prioritize user input over expensive list updates, preventing UI jank during typing.
