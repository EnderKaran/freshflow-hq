from playwright.sync_api import sync_playwright

def test_tabs():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:3000/predictions')

        # Test tablist
        try:
            page.locator('[role="tablist"]').wait_for(timeout=2000)
            print("Tablist found")
        except Exception as e:
            print("Tablist not found")

        browser.close()
