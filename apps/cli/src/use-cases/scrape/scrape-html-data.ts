import puppeteer from 'puppeteer'

export interface HtmlApi {
  // The name of the tag
  name: string
  description: string
}

// interface HtmlAttributeList = {}

export const scrapeHtmlData = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()
  await page.goto(
    'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes',
    {
      waitUntil: 'networkidle2',
    },
  )

  // const tableData: Array<>
}
