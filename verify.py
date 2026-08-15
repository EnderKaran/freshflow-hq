from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000/dashboard")
    page.wait_for_timeout(3000)

    # Inject auth cookie to bypass login if needed
    page.context.add_cookies([{'name': 'freshflow-auth', 'value': 'mock-token', 'domain': 'localhost', 'path': '/'}])
    page.reload()
    page.wait_for_timeout(3000)

    # Focus the new "Add Ingredient" button using keyboard
    page.keyboard.press("Tab")
    page.wait_for_timeout(500)
    page.keyboard.press("Tab")
    page.wait_for_timeout(500)
    page.keyboard.press("Tab")
    page.wait_for_timeout(500)

    # Alternatively, directly tab to the button if possible, but let's just hover it to see the focus state or hover state
    button = page.get_by_role("button", name="Add new ingredient")
    if button.is_visible():
        button.focus()
        page.wait_for_timeout(1000)

    # Take screenshot
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
