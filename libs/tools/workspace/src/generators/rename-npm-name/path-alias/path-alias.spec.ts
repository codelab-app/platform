import {
  getPackageNameFromOldAlias,
  getPackageNameFromProjectName,
} from './path-alias'

describe('getPackageNameFromOldAlias', () => {
  it('should return the expected package name for a known old alias', () => {
    const result = getPackageNameFromOldAlias(
      '@codelab/backend-infra-adapter/neo4j-driver',
    )

    expect(result).toBe('@codelab/backend-infra-adapter-neo4j-driver')
  })

  it('should return the expected package name for multiple old aliases', () => {
    const testCases = [
      {
        expected: '@codelab/backend-infra-adapter-neo4j-schema',
        oldAlias: '@codelab/backend-infra-adapter/neo4j-schema',
      },
      {
        expected: '@codelab/backend-infra-adapter-auth0',
        oldAlias: '@codelab/backend/infra/adapter/auth0',
      },
      {
        expected: '@codelab/backend-infra-adapter-digitalocean',
        oldAlias: '@codelab/backend/infra/adapter/digitalocean',
      },
      {
        expected: '@codelab/backend-abstract-core',
        oldAlias: '@codelab/backend/abstract/core',
      },
    ]

    testCases.forEach(({ expected, oldAlias }) => {
      expect(getPackageNameFromOldAlias(oldAlias)).toBe(expected)
    })
  })

  it('should handle @codelab base entry with subpaths', () => {
    // Since @codelab exists in the map, any @codelab/xxx will match and preserve the subpath
    const unknownAlias = '@codelab/xyz123'
    const result = getPackageNameFromOldAlias(unknownAlias)

    // @codelab maps to @codelab, so @codelab/xyz123 returns @codelab/xyz123
    expect(result).toBe(unknownAlias)
  })

  it('should return non-@codelab aliases as-is if not found in the map', () => {
    const unknownAlias = '@other-scope/unknown-package'
    const result = getPackageNameFromOldAlias(unknownAlias)

    expect(result).toBe(unknownAlias)
  })

  it('should handle aliases that are already in the expected format', () => {
    // Test with aliases that don't have slashes (already in expected format)
    const testCases = [
      '@codelab-codegen/codelab-preset',
      '@codelab-codegen/typescript-fetch',
      '@codelab-codegen/typescript-server-fetch',
    ]

    testCases.forEach((alias) => {
      expect(getPackageNameFromOldAlias(alias)).toBe(alias)
    })
  })

  it('should handle edge cases', () => {
    // Empty string
    expect(getPackageNameFromOldAlias('')).toBe('')

    // Just a scope - @codelab exists in the map so it should return as-is
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

  it('should preserve subpaths that exist after src/ in the file path', () => {
    // Test that subpaths are preserved when they exist after src/ in the actual file path
    // These are OLD-style paths that should be transformed but preserve subpaths
    const testCases = [
      {
        expected: '@codelab/shared-infra-logger/server',
        oldAlias: '@codelab/shared/infra/logging/server',
      },
    ]

    testCases.forEach(({ expected, oldAlias }) => {
      expect(getPackageNameFromOldAlias(oldAlias)).toBe(expected)
    })
  })

  it('should handle known base paths with subpaths correctly', () => {
    // Test specific cases mentioned by the user
    const testCases = [
      {
        expected: '@codelab/backend-infra-adapter-auth0',
        // This is an old-style path that should be transformed
        oldAlias: '@codelab/backend/infra/adapter/auth0',
      },
    ]

    testCases.forEach(({ expected, oldAlias }) => {
      expect(getPackageNameFromOldAlias(oldAlias)).toBe(expected)
    })
  })

  it('should preserve new-style paths with subpaths that are not in the map', () => {
    // Test that new-style paths with subpaths that don't exist in the map remain unchanged
    const testCases = [
      {
        expected: '@codelab/frontend-application-app/use-cases/app-builder',
        oldAlias: '@codelab/frontend-application-app/use-cases/app-builder',
      },
    ]

    testCases.forEach(({ expected, oldAlias }) => {
      expect(getPackageNameFromOldAlias(oldAlias)).toBe(expected)
    })
  })

  it('should preserve subpaths when transforming known aliases', () => {
    // Test that subpaths are preserved when a base alias is found
    const testCases = [
      {
        expected: '@codelab/backend-infra-adapter-auth0/client',
        oldAlias: '@codelab/backend/infra/adapter/auth0/client',
      },
      {
        expected: '@codelab/backend-abstract-core/services/logger',
        oldAlias: '@codelab/backend/abstract/core/services/logger',
      },
      {
        expected: '@codelab/frontend-abstract-application/services/router',
        oldAlias: '@codelab/frontend/abstract/application/services/router',
      },
    ]

    testCases.forEach(({ expected, oldAlias }) => {
      expect(getPackageNameFromOldAlias(oldAlias)).toBe(expected)
    })
  })
})

describe('getPackageNameFromProjectName', () => {
  it('should return the expected package name for a known project name', () => {
    const result = getPackageNameFromProjectName(
      'backend-infra-adapter-neo4j-driver',
    )

    expect(result).toBe('@codelab/backend-infra-adapter-neo4j-driver')
  })

  it('should return the expected package names for multiple project names', () => {
    const testCases = [
      {
        expected: '@codelab-codegen/codelab-preset',
        projectName: 'codelab-codegen-codelab-preset',
      },
      {
        expected: '@codelab-codegen/typescript-fetch',
        projectName: 'codelab-codegen-typescript-fetch',
      },
      {
        expected: '@codelab/backend-abstract-core',
        projectName: 'backend-abstract-core',
      },
      {
        expected: '@codelab/backend-application-action',
        projectName: 'backend-application-action',
      },
      {
        expected: '@codelab/frontend-application-admin',
        projectName: 'frontend-application-admin',
      },
    ]

    testCases.forEach(({ expected, projectName }) => {
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
    expect(getPackageNameFromProjectName('project-with-special-chars')).toBe(
      'project-with-special-chars',
    )

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
