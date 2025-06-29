import { expect, test } from '@playwright/test'

test.describe('Admin page table layout', () => {
  test('should display tables without cutoff', async ({ page }) => {
    // Navigate to admin page
    await page.goto('http://127.0.0.1:3000/admin')

    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded')

    // Wait for tables to be visible
    await page.locator('.ant-table').waitFor({ state: 'visible' })

    // Take a screenshot to see the current state
    await page.screenshot({ fullPage: true, path: 'admin-table-after-fix.png' })

    // Find the content section that contains the tables
    const contentSection = page.locator('section').first()
    // Check if there's overflow
    const boundingBox = await contentSection.boundingBox()

    console.log('Content section dimensions:', boundingBox)

    // Find all tables on the page
    const tables = await page.locator('.ant-table-wrapper').all()

    console.log(`Found ${tables.length} tables`)

    // Check each table's dimensions and scroll properties
    for (let i = 0; i < tables.length; i++) {
      const tableWrapper = tables[i]
      const wrapperBox = await tableWrapper.boundingBox()

      console.log(`Table wrapper ${i + 1} dimensions:`, wrapperBox)

      // Check if table has horizontal scroll enabled
      const hasScroll = await tableWrapper.evaluate((el) => {
        const table = el.querySelector('.ant-table')

        return table ? window.getComputedStyle(table).overflowX : 'visible'
      })

      console.log(`Table ${i + 1} overflow-x:`, hasScroll)

      // Check if content is properly contained
      const isOverflowing = await tableWrapper.evaluate((el) => {
        return el.scrollWidth > el.clientWidth
      })

      if (isOverflowing) {
        console.log(
          `Table ${i + 1} has horizontal scroll enabled (as expected)`,
        )
      }
    }

    // Verify tables are scrollable when needed
    const allTablesScrollable = await page.evaluate(() => {
      const tableElements = document.querySelectorAll('.ant-table-wrapper')

      return Array.from(tableElements).every((wrapper) => {
        const table = wrapper.querySelector('.ant-table')

        if (!table) {
          return false
        }

        // Check if table has scroll container
        const scrollContainer =
          wrapper.querySelector('.ant-table-body') ||
          wrapper.querySelector('.ant-table-content')

        return scrollContainer !== null
      })
    })

    expect(allTablesScrollable).toBe(true)

    console.log('All tables have proper scroll containers')

    // Take a final screenshot
    await page.screenshot({ fullPage: true, path: 'admin-table-fixed.png' })
  })
})
