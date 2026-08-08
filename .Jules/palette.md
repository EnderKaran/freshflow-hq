## 2024-05-24 - Prevent tab layout shift & Accessible action cards
**Learning:** Adding a `border-transparent` class to inactive tabs prevents a 2px layout shift when the active tab receives a border. Action cards like "Add Ingredient" should be semantic `<button>` elements rather than `<div>` elements, ensuring proper focus rings and keyboard accessibility without extra configuration.
**Action:** Use transparent borders matching active state width for smooth tab transitions. Use semantic `<motion.button>` over `<motion.div>` for interactive cards.
