import { generateStringFromExportData } from './export-from-data'
import { ExportData } from './utils'

describe('Export from data utils', () => {
  it('generateStringFromExportData', () => {
    const data: ExportData = {
      header: ['/* eslint-disable import/order */', '// Some comment'],
      content: [`export const test = ''`, `export const anotherTest = ''`],
      imports: [
        {
          source: 'lodash',
          entities: ['map', 'reduce'],
        },
      ],
    }
    const actual = generateStringFromExportData(data)

    const expected = `/* eslint-disable import/order */\n// Some comment\nimport { map, reduce } from 'lodash'\n\nexport const test = ''\n\nexport const anotherTest = ''`

    expect(actual).toStrictEqual(expected)
  })
})
