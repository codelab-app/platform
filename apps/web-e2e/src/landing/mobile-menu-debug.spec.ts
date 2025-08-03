import { expect, test } from '@playwright/test'

test.describe('Mobile Menu Debug', () => {
  test('should capture mobile menu state', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navigate to landing page
    await page.goto('http://localhost:4200')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Take screenshot of initial state
    await page.screenshot({ path: 'mobile-menu-initial.png', fullPage: true })
    
    // Find and click the hamburger menu button
    const menuButton = await page.locator('button:has(svg)')
    await menuButton.waitFor({ state: 'visible' })
    
    // Log button state
    const buttonBoundingBox = await menuButton.boundingBox()
    console.log('Menu button location:', buttonBoundingBox)
    
    // Click the menu button
    await menuButton.click()
    
    // Wait a moment for animation
    await page.waitForTimeout(500)
    
    // Take screenshot after clicking
    await page.screenshot({ path: 'mobile-menu-clicked.png', fullPage: true })
    
    // Check if menu is visible
    const menu = await page.locator('menu')
    const isMenuVisible = await menu.isVisible()
    console.log('Menu visible after click:', isMenuVisible)
    
    // Check menu classes
    const menuClasses = await menu.getAttribute('class')
    console.log('Menu classes:', menuClasses)
    
    // Check if backdrop is active
    const backdrop = await page.locator('#backdrop')
    const backdropClasses = await backdrop.getAttribute('class')
    console.log('Backdrop classes:', backdropClasses)
  })
})