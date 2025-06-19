import { getPackageNameFromOldAlias, getPackageNameFromProjectName } from './path-alias'

describe('getPackageNameFromOldAlias', () => {
  it('should return the expected package name for a known old alias', () => {
    const result = getPackageNameFromOldAlias('@codelab/backend-infra-adapter/neo4j-driver')
    expect(result).toBe('@codelab/backend-infra-adapter-neo4j-driver')
  })

  it('should return the expected package name for multiple old aliases', () => {
    const testCases = [
      {
        oldAlias: '@codelab/backend-infra-adapter/neo4j-schema',
        expected: '@codelab/backend-infra-adapter-neo4j-schema'
      },
      {
        oldAlias: '@codelab/backend/infra/adapter/auth0',
        expected: '@codelab/backend-infra-adapter-auth0'
      },
      {
        oldAlias: '@codelab/backend/infra/adapter/digitalocean',
        expected: '@codelab/backend-infra-adapter-digitalocean'
      },
      {
        oldAlias: '@codelab/backend/abstract/core',
        expected: '@codelab/backend-abstract-core'
      }
    ]

    testCases.forEach(({ oldAlias, expected }) => {
      expect(getPackageNameFromOldAlias(oldAlias)).toBe(expected)
    })
  })

  it('should return the input alias if not found in the map', () => {
    const unknownAlias = '@codelab/unknown-package'
    const result = getPackageNameFromOldAlias(unknownAlias)
    expect(result).toBe(unknownAlias)
  })

  it('should handle aliases that are already in the expected format', () => {
    // Test with aliases that don't have slashes (already in expected format)
    const testCases = [
      '@codelab-codegen/codelab-preset',
      '@codelab-codegen/typescript-fetch',
      '@codelab-codegen/typescript-server-fetch'
    ]

    testCases.forEach((alias) => {
      expect(getPackageNameFromOldAlias(alias)).toBe(alias)
    })
  })

  it('should handle edge cases', () => {
    // Empty string
    expect(getPackageNameFromOldAlias('')).toBe('')
    
    // Just a scope
    expect(getPackageNameFromOldAlias('@codelab')).toBe('@codelab')
    
    // No scope
    expect(getPackageNameFromOldAlias('some-package')).toBe('some-package')
  })

  it('should be case sensitive', () => {
    // The function should be case sensitive since package names are case sensitive
    const upperCaseAlias = '@CODELAB/backend-infra-adapter/neo4j-driver'
    const result = getPackageNameFromOldAlias(upperCaseAlias)
    // Should return as-is since it won't match the lowercase version in the map
    expect(result).toBe(upperCaseAlias)
  })
})

describe('getPackageNameFromProjectName', () => {
  it('should return the expected package name for a known project name', () => {
    const result = getPackageNameFromProjectName('backend-infra-adapter-neo4j-driver')
    expect(result).toBe('@codelab/backend-infra-adapter-neo4j-driver')
  })

  it('should return the expected package names for multiple project names', () => {
    const testCases = [
      {
        projectName: 'codelab-codegen-codelab-preset',
        expected: '@codelab-codegen/codelab-preset'
      },
      {
        projectName: 'codelab-codegen-typescript-fetch',
        expected: '@codelab-codegen/typescript-fetch'
      },
      {
        projectName: 'backend-abstract-core',
        expected: '@codelab/backend-abstract-core'
      },
      {
        projectName: 'backend-application-action',
        expected: '@codelab/backend-application-action'
      },
      {
        projectName: 'frontend-application-admin',
        expected: '@codelab/frontend-application-admin'
      }
    ]

    testCases.forEach(({ projectName, expected }) => {
      expect(getPackageNameFromProjectName(projectName)).toBe(expected)
    })
  })

  it('should return the project name as-is if not found in the map', () => {
    // Based on the implementation, it returns the projectName when not found
    const unknownProject = 'unknown-project-name'
    const result = getPackageNameFromProjectName(unknownProject)
    expect(result).toBe(unknownProject)
  })

  it('should handle edge cases', () => {
    // Empty string
    expect(getPackageNameFromProjectName('')).toBe('')
    
    // Project name with special characters
    expect(getPackageNameFromProjectName('project-with-special-chars')).toBe('project-with-special-chars')
    
    // Very long project name
    const longProjectName = 'very-long-project-name-that-does-not-exist-in-map'
    expect(getPackageNameFromProjectName(longProjectName)).toBe(longProjectName)
  })

  it('should be case sensitive', () => {
    // The function should be case sensitive since project names are case sensitive
    const upperCaseProject = 'BACKEND-INFRA-ADAPTER-NEO4J-DRIVER'
    const result = getPackageNameFromProjectName(upperCaseProject)
    // Should return as-is since it won't match the lowercase version in the map
    expect(result).toBe(upperCaseProject)
  })

  it('should handle project names that appear as substrings in other project names', () => {
    // Ensure exact matching, not substring matching
    // For example, 'backend-abstract' should not match 'backend-abstract-core'
    const partialProjectName = 'backend-abstract'
    const result = getPackageNameFromProjectName(partialProjectName)
    // Should return as-is since it's not an exact match
    expect(result).toBe(partialProjectName)
  })
})