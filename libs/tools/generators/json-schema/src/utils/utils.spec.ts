import { generateImports } from './export-from-data'
import { ImportDetails } from './utils'

describe('Util generate imports', () => {
  it('should convert importDetails to string', () => {
    const firstSourceDetails: ImportDetails = {
      source: 'source1',
      entities: ['firstEntity', 'secondEntity'],
    }
    const secondSourceDetails: ImportDetails = {
      source: 'source2',
      entities: ['firstEntity', 'secondEntity'],
    }
    const importDetails = [firstSourceDetails, secondSourceDetails]

    expect(generateImports(importDetails)).toBe(
      `import { firstEntity, secondEntity } from 'source1'\nimport { firstEntity, secondEntity } from 'source2'`,
    )
  })

  it('should combine imports with the same sources', () => {
    const firstSourceDetails: ImportDetails = {
      source: 'source1',
      entities: ['firstEntity', 'secondEntity'],
    }
    const secondSourceDetails: ImportDetails = {
      source: 'source1',
      entities: ['thirdEntity'],
    }
    const importDetails = [firstSourceDetails, secondSourceDetails]

    expect(generateImports(importDetails)).toBe(
      `import { firstEntity, secondEntity, thirdEntity } from 'source1'`,
    )
  })

  it('should rid of duplication', () => {
    const firstSourceDetails: ImportDetails = {
      source: 'source1',
      entities: ['firstEntity', 'secondEntity', 'secondEntity'],
    }
    const importDetails = [firstSourceDetails]

    expect(generateImports(importDetails)).toBe(
      `import { firstEntity, secondEntity } from 'source1'`,
    )
  })
})
