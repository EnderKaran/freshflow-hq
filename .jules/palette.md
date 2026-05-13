## 2024-05-12 - Accessible Icon Buttons
**Learning:** Using ligature-based icon fonts (like Material Icons) inside interactive elements causes screen readers to read the ligature string (e.g., "visibility_off") instead of the element's purpose, completely breaking the UX for screen reader users.
**Action:** When using icon-only buttons, ALWAYS add an `aria-label` to the `<button>` explaining the action, and ALWAYS add `aria-hidden="true"` to the inner icon element. Also, use `aria-pressed` to communicate toggle states.
