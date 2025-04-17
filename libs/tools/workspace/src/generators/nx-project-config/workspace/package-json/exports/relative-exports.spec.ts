import { getRelativeExports } from './relative-exports'
import data from './test-data.json'

describe('getRelativeExports', () => {
  it('should generate relative exports based on import data', () => {
    const {
      allImports,
      baseImportPaths,
      expectedRelativeExports,
      packageName,
    } = data

    const relativeExportsMap = getRelativeExports(
      allImports,
      baseImportPaths,
      packageName,
    )

    // Filter out the main export '.' key before comparing
    const relativeExportKeys = Object.keys(relativeExportsMap).filter(
      (key) => key !== '.',
    )

    console.log('allImports', allImports)

    console.log('Generated Relative Exports:', relativeExportKeys)

    // Add assertions here later if needed
    expect(expectedRelativeExports).toEqual(relativeExportKeys)
  })
})
