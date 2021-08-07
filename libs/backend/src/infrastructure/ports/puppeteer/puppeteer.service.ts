import { Injectable, Logger } from '@nestjs/common'
import fs from 'fs'
import { parse } from 'json2csv'
import puppeteer from 'puppeteer'

export interface AntdDesignApi {
  property: string
  description: string
  type: string
  default: string
  version: string
  isEnum: boolean
}

interface ComponentData {
  name: string
  props: Array<AntdDesignApi>
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
    let pagesCount = 1

    for (const [componentPage, url] of urlsMap.entries()) {
      Logger.log(`Fetching [${pagesCount}/${urls.length}] ${componentPage}...`)
      await page.goto(url)

      const tableData: Array<ComponentData | undefined> = await page.evaluate(
        (_tableKeys, _pageName) => {
          const extractPropsFromTable = (tableToExtract: HTMLTableElement) => {
            const rows = Array.from<HTMLTableRowElement>(
              tableToExtract.querySelectorAll('tbody tr'),
            )

            return rows
              .map((tr) => tr.querySelectorAll('td'))
              .filter((tableValues) => tableValues.length >= 4) // some tables are missing version
              .map((tableValues) => {
                const typeTdChildren = Array.from(
                  tableValues[2].children,
                ) as Array<HTMLElement>

                return {
                  [_tableKeys[0]]: tableValues[0].innerText,
                  [_tableKeys[1]]: tableValues[1].innerText,
                  [_tableKeys[2]]: tableValues[2].innerText,
                  [_tableKeys[3]]: tableValues[3].innerText,
                  [_tableKeys[4]]: tableValues[4]?.innerText, // some tables are missing version
                  // Enums are displayed within a code block, we can recognize them by that
                  // if all children of type are in code blocks, we can say that the whole
                  // props in of enum type
                  isEnum:
                    typeTdChildren.length > 0 &&
                    typeTdChildren.every(
                      (child) =>
                        child.tagName === 'CODE' || child?.innerText === '"|"',
                    ),
                }
              })
          }

          const apiTitleHeaders = Array.from(
            document.querySelectorAll<HTMLHeadingElement>(
              'section.api-container h3',
            ),
          )

          if (apiTitleHeaders.length === 0) {
            const table = document.querySelector('section.api-container table')

            if (table) {
              // Single table
              return [
                {
                  name: _pageName,
                  props: extractPropsFromTable(
                    table as HTMLTableElement,
                  ) as any,
                },
              ]
            }

            // No tables?
            return []
          }

          // Multiple tables (components)
          return apiTitleHeaders.map((h3) => {
            const name = (h3.firstChild as HTMLElement)?.innerText

            if (!name) {
              return
            }

            const table = h3.nextSibling as HTMLTableElement

            if (table.tagName !== 'TABLE') {
              return
            }

            return {
              name,
              props: extractPropsFromTable(table) as any,
            }
          })
        },
        antdTableKeys,
        componentPage,
      )

      try {
        tableData
          .filter((d): d is ComponentData => !!d)
          .filter((d) => d.props.length > 0)
          .forEach(({ name, props }) => {
            const csv = parse(props, {
              fields: [...antdTableKeys, 'isEnum'],
            })

            console.log(csv)
            fs.writeFileSync(
              `${process.cwd()}/data/antd/${componentPage}--${name.replace(
                '/',
                '_',
              )}.csv`,
              csv,
            )
          })
      } catch (err) {
        console.error(err)
      }

      pagesCount++
    }

    await browser.close()
  }
}
