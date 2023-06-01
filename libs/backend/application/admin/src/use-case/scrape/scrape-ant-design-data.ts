import 'jquery'
import type { AntDesignApi } from '@codelab/backend/abstract/core'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import path from 'path'
import type { Browser } from 'puppeteer'
import puppeteer from 'puppeteer'

declare const $: JQueryStatic

const BASE_URL = 'https://ant.design/components/'
const outputDirectory = './data/antd-v5'

const getComponentApiData = async (
  browser: Browser,
  component: string,
): Promise<Array<AntDesignApi>> => {
  const componentUrl = `${BASE_URL}${component}`
  const componentPage = await browser.newPage()

  await componentPage.goto(componentUrl)

  // Inject jQuery into the page
  await componentPage.addScriptTag({
    path: 'node_modules/jquery/dist/jquery.min.js',
  })

  return await componentPage.evaluate((name) => {
    const apiTables = Array.from($('table.component-api-table'))

    return apiTables.map((table) => {
      const apiTitle = $(table)
        .closest('.dumi-default-table')
        .prev('h3, h4')
        .text()

      const rows = Array.from($(table).find('tbody tr'))

      const fields = rows.map((row) => {
        const rowData = Array.from($(row).find('td')).map(
          (cell) => cell.textContent,
        )

        return {
          defaultValue: rowData[4] ?? '',
          description: rowData[1] ?? '',
          property: rowData[0] ?? '',
          type: rowData[2] ?? '',
          version: rowData[3] ?? '',
        }
      })

      return {
        atom: {
          api: apiTitle,
          name,
        },
        fields,
      }
    })
  }, component)
}

export const scrapeAntDesignData = async () => {
  const browser = await puppeteer.launch({ headless: 'new' })
  const overviewPage = await browser.newPage()

  await overviewPage.goto(`${BASE_URL}overview`, { waitUntil: 'networkidle2' })

  // Inject jQuery into the page
  await overviewPage.addScriptTag({
    path: 'node_modules/jquery/dist/jquery.min.js',
  })

  overviewPage.on('console', (msg) => console.log('PAGE LOG:', msg.text()))

  const components = await overviewPage.evaluate(() => {
    const sidebarLinks = Array.from(
      $('section.main-menu-inner .ant-menu-item a'),
    )

    return sidebarLinks
      .map((link) => $(link).attr('href')?.replace('/components/', '') || '')
      .filter((link) => link !== 'overview')
    // .slice(0, 3)
  })

  for (const [index, component] of components.entries()) {
    console.log(
      `Fetching component data: ${component} (${index + 1}/${
        components.length
      })...`,
    )

    const apiData = await getComponentApiData(browser, component)

    saveFormattedFile(path.join(outputDirectory, `${component}.json`), apiData)
  }

  await browser.close()

  console.log(
    'Scraping completed. The data has been saved to the "data/antd-v5" directory.',
  )
}
