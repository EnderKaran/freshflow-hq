from playwright.sync_api import sync_playwright, expect
import time

def verify_ux_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mock auth cookie to bypass middleware redirect to login
        context = browser.new_context()
        context.add_cookies([{
            'name': 'freshflow-auth',
            'value': 'mock-token',
            'domain': 'localhost',
            'path': '/'
        }])
        page = context.new_page()

        # 1. Navigate to dashboard
        page.goto("http://localhost:3000/dashboard")

        # Wait for hydration/loading to complete
        page.wait_for_selector('h2:has-text("My Pantry")', timeout=10000)

        # 2. Verify Tab Keyboard Navigation and Transparent Border Fix
        # Force a tab cycle to test focus rings
        all_items_tab = page.get_by_role("tab", name="All Items")
        low_stock_tab = page.get_by_role("tab", name="Low Stock")

        # Click "Low Stock" so "All Items" becomes inactive
        low_stock_tab.click()

        # Check that inactive tab has transparent border
        expect(all_items_tab).to_have_class(re.compile(r".*border-transparent.*"))

        # Focus inactive tab to verify focus-visible
        all_items_tab.focus()
        page.screenshot(path="tabs-focus.png")

        # 3. Verify Add Ingredient button
        # Click back to All Items to see the add ingredient card
        all_items_tab.click()

        # The add ingredient is now a button with aria-label
        add_btn = page.get_by_role("button", name="Add new ingredient card")
        expect(add_btn).to_be_visible()

        # Verify focus states on the Add button
        add_btn.focus()
        page.screenshot(path="add-button-focus.png")

        browser.close()

if __name__ == "__main__":
    import re
    verify_ux_changes()
