import { getRelativeExports } from './relative-exports'

describe('getRelativeExports', () => {
  it('should generate relative exports based on import data', () => {
    const packageName = '@codelab/frontend-application-element'
    const relativeExportsMap = getRelativeExports(packageName)
    const relativeExportKeys = Object.keys(relativeExportsMap)

    const expected = [
      '.',
      './services',
      './use-cases/create-element',
      './use-cases/delete-element',
      './use-cases/hook-description',
      './use-cases/move-element',
      './use-cases/update-element',
      './use-cases/update-element-props',
      './validation',
      './views',
    ]

    // Sort both arrays before comparison to ensure order doesn't matter
    expect(relativeExportKeys.sort()).toEqual(expected.sort())
  })
})
