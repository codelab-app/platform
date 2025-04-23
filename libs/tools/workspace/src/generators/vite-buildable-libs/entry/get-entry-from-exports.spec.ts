/* eslint-disable canonical/sort-keys */
import { getEntryFromExports } from './get-entry-from-exports'

describe('getEntryFromExports', () => {
  it('should return default entry when no exports field exists', () => {
    const packageJson = {
      name: 'test-lib',
      version: '1.0.0',
    }

    const result = getEntryFromExports(packageJson)

    expect(result).toEqual({
      index: 'src/index.ts',
    })
  })

  it('should return default entry when exports field is empty', () => {
    const packageJson = {
      exports: {},
    }

    const result = getEntryFromExports(packageJson)

    expect(result).toEqual({
      index: 'src/index.ts',
    })
  })

  it('should convert subpath exports to entry points', () => {
    const packageJson = {
      exports: {
        './collision-detection': {
          import: './dist/collision-detection/index.js',
          default: './dist/collision-detection/index.js',
          types: './dist/collision-detection/index.d.ts',
        },
        './components': {
          import: './dist/components/index.js',
          default: './dist/components/index.js',
          types: './dist/components/index.d.ts',
        },
        './hooks': {
          import: './dist/hooks/index.js',
          default: './dist/hooks/index.js',
          types: './dist/hooks/index.d.ts',
        },
      },
    }

    const result = getEntryFromExports(packageJson)

    expect(result).toEqual({
      'collision-detection': 'src/collision-detection/index.ts',
      index: 'src/index.ts',
      components: 'src/components/index.ts',
      hooks: 'src/hooks/index.ts',
    })
  })

  it('should handle root exports correctly', () => {
    const packageJson = {
      exports: {
        '.': {
          import: './dist/index.js',
          types: './dist/index.d.ts',
        },
        './utils': {
          import: './dist/utils/index.js',
          types: './dist/utils/index.d.ts',
        },
      },
    }

    const result = getEntryFromExports(packageJson)

    expect(result).toEqual({
      index: 'src/index.ts',
      utils: 'src/utils/index.ts',
    })
  })

  it('should handle alternative root export format', () => {
    const packageJson = {
      exports: {
        './': {
          import: './dist/index.js',
          types: './dist/index.d.ts',
        },
        './utils': {
          import: './dist/utils/index.js',
          types: './dist/utils/index.d.ts',
        },
      },
    }

    const result = getEntryFromExports(packageJson)

    expect(result).toEqual({
      index: 'src/index.ts',
      utils: 'src/utils/index.ts',
    })
  })

  it('should handle exports without ./ prefix', () => {
    const packageJson = {
      exports: {
        utils: {
          import: './dist/utils/index.js',
          types: './dist/utils/index.d.ts',
        },
      },
    }

    const result = getEntryFromExports(packageJson)

    expect(result).toEqual({
      index: 'src/index.ts',
      utils: 'src/utils/index.ts',
    })
  })

  it('should skip non-object export values', () => {
    const packageJson = {
      exports: {
        // string instead of object
        './components': {
          import: './dist/components/index.js',
          types: './dist/components/index.d.ts',
        },
        './utils': './dist/utils/index.js',
      },
    }

    const result = getEntryFromExports(packageJson)

    expect(result).toEqual({
      components: 'src/components/index.ts',
      index: 'src/index.ts',
    })
  })
})
