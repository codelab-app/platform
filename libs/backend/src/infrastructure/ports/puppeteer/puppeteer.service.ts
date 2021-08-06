import { Injectable, Logger } from '@nestjs/common'
import fs from 'fs'
import { parse } from 'json2csv'
import { Dictionary } from 'lodash'
import puppeteer from 'puppeteer'

export interface AntdDesignApi {
  property: string
  description: string
  type: string
  default: string
  version: string
}

export const antdTableKeys: Array<keyof AntdDesignApi> = [
  'property',
  'description',
  'type',
  'default',
  'version',
]

@Injectable({})
export class PuppeteerService {
  public async scrape() {
    const browser = await puppeteer.launch({
      headless: true,
    })

    const page = await browser.newPage()
    await page.goto('https://ant.design/components/overview/', {
      waitUntil: 'networkidle2',
    })

    // Get all links of components
    const urls = (
      await page.evaluate(() =>
        Array.from<HTMLLinkElement, [string, HTMLLinkElement['href']]>(
          document.querySelectorAll(
            'section.main-menu-inner li[role="menuitem"] a',
          ),
          (link) => {
            const component = link.innerText

            return [component, link.href]
          },
        ),
      )
    )
      // This page has no components
      .filter(([component, href]) => !href.includes('components/overview'))
    // Use this for testing only
    // .slice(0, 1)

    Logger.log(`Found ${urls.length} links!`)

    const urlsMap = new Map(urls)
    let componentCount = 1

    for (const [component, url] of urlsMap.entries()) {
      Logger.log(`Fetching [${componentCount}/${urls.length}] ${component}...`)
      await page.goto(url)

      const tableData = await page.evaluate(
        (_tableKeys) =>
          Array.from<HTMLTableRowElement, Dictionary<string>>(
            document.querySelectorAll('section.api-container table tbody tr'),
            (tr) => {
              const tableValues = Array.from<
                HTMLTableCellElement,
                HTMLTableCellElement['innerText']
              >(tr.querySelectorAll('td'), (td) => td.innerText)

              // Can't access lodash inside `page.evaluate`
              return {
                [_tableKeys[0]]: tableValues[0],
                [_tableKeys[1]]: tableValues[1],
                [_tableKeys[2]]: tableValues[2],
                [_tableKeys[3]]: tableValues[3],
                [_tableKeys[4]]: tableValues[4],
              }
            },
          ),
        antdTableKeys,
      )

      try {
        const csv = parse(tableData, {
          fields: antdTableKeys,
        })

        console.log(csv)
        fs.writeFileSync(`${process.cwd()}/data/antd/${component}.csv`, csv)
      } catch (err) {
        console.error(err)
      }

      componentCount++
    }

    await browser.close()
  }
}
