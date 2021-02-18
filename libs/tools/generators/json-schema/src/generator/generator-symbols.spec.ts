import * as path from 'path'
import { ExportData, SymbolMap } from '../utils/utils'
import { generateExportData } from './generator-symbols'
import { MoreTestProps, TestProps } from './generator-symbols.data'

describe('Generator symbols', () => {
  it('generates meta data from searched files & symbols', async () => {
    const file = path.resolve(__dirname, 'generator-symbols.data.ts')

    const symbolMap: Array<SymbolMap> = []

    await generateExportData(
      [file],
      [/Props$/, /Input/],
      (data: SymbolMap): ExportData => {
        symbolMap.push(data)

        // Mock return value, we're just testing what comes through here
        return {
          content: [],
          imports: [],
        }
      },
    )

    expect(symbolMap).toMatchObject([
      {
        symbol: 'TestProps',
        module: { TestProps },
        file,
      },
      {
        symbol: 'MoreTestProps',
        module: { MoreTestProps },
        file,
      },
    ])
  })

  it('builds export data', async () => {
    const file = path.resolve(__dirname, 'generator-symbols.data.ts')

    const exportData = await generateExportData(
      [file],
      [/Props$/, /Input/],
      (data: SymbolMap): ExportData => {
        /**
         * These content & imports aren't semantically correct, we're only using them as placeholder for testing
         */
        return {
          content: [data.symbol],
          imports: [{ source: data.file, entities: [data.symbol] }],
        }
      },
    )

    expect(exportData).toMatchObject({
      content: ['TestProps', 'MoreTestProps'],
      imports: [
        { source: file, entities: ['TestProps'] },
        { source: file, entities: ['MoreTestProps'] },
      ],
    })
  })
})
