import P from 'bluebird'
import { mergeWith } from 'lodash'
import { ExportData, SymbolMapCb, exportDataMerger } from '../utils/utils'

/**
 * @param files Files to search for
 * @param symbolPatterns Patterns to search for
 * @param cb Callback to generate data
 * @param exportData Input & output
 */
export const generateExportData = (
  files: Array<string>,
  symbolPatterns: Array<RegExp>,
  cb: SymbolMapCb,
  exportData: ExportData = {
    content: [],
    imports: [],
  },
): Promise<ExportData> => {
  return P.reduce(
    files,
    async (_exportData, file) => {
      const module = await import(file)

      // Map each symbol to the module
      const moreExportData = Object.keys(module)
        .filter((name) =>
          // Get only types with *Props or *Input in the export name
          // /Props/.test(name) || /Input/.test(name),
          symbolPatterns.reduce<boolean>((acc, regExp) => {
            return acc || regExp.test(name)
          }, false),
        )
        .reduce<ExportData>((_moreExportData, symbol: string) => {
          console.log(`Generating for symbol ${symbol}...`)

          return mergeWith(
            _moreExportData,
            cb({ symbol, module, file }),
            exportDataMerger,
          )
        }, _exportData)

      return mergeWith(_exportData, moreExportData, exportDataMerger)
    },
    exportData,
  )
}
