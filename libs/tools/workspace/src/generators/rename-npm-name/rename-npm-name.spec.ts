import type { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { libraryGenerator } from '@nx/react'
import { Linter } from '@nx/eslint'

import renameNpmNameGenerator from './rename-npm-name'

describe('rename-npm-name generator', () => {
  let tree: Tree

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should migrate import paths in TypeScript files', async () => {
    // Create a test library - the libraryGenerator creates it at the root with the full name
    await libraryGenerator(tree, {
      name: 'test-lib',
      directory: 'libs/frontend/domain',
      linter: Linter.EsLint,
      style: 'none',
    })

    // Create test files with old import paths that exist in the mapping
    const testFile1Content = `import { someFunction } from '@codelab/backend/abstract/core'
import { anotherFunction } from '@codelab/frontend/abstract/domain'
import type { SomeType } from '@codelab/shared/abstract/core'

export const myFunction = () => {
  someFunction()
  anotherFunction()
}`

    const testFile2Content = `const module1 = require('@codelab/backend/abstract/core')
const module2 = require('@codelab/frontend/abstract/domain')

// Dynamic import
const loadModule = async () => {
  const dynamicModule = await import('@codelab/shared/abstract/core')
  return dynamicModule
}

export { module1, module2, loadModule }`

    // Write test files - note the library generator creates the path as libs/frontend/domain/src
    tree.write('libs/frontend/domain/src/lib/test-file1.ts', testFile1Content)
    tree.write('libs/frontend/domain/src/lib/test-file2.ts', testFile2Content)

    // Run the generator
    await renameNpmNameGenerator(tree)

    // Check that imports were migrated
    const updatedFile1 = tree.read(
      'libs/frontend/domain/src/lib/test-file1.ts',
      'utf-8',
    )
    const updatedFile2 = tree.read(
      'libs/frontend/domain/src/lib/test-file2.ts',
      'utf-8',
    )

    // Verify ES6 imports were updated (formatFiles adds semicolons)
    expect(updatedFile1).toContain(
      "import { someFunction } from '@codelab/backend-abstract-core';",
    )
    expect(updatedFile1).toContain(
      "import { anotherFunction } from '@codelab/frontend-abstract-domain';",
    )
    expect(updatedFile1).toContain(
      "import type { SomeType } from '@codelab/shared-abstract-core';",
    )

    // Verify old paths are no longer present
    expect(updatedFile1).not.toContain('@codelab/backend/abstract/core')
    expect(updatedFile1).not.toContain('@codelab/frontend/abstract/domain')
    expect(updatedFile1).not.toContain('@codelab/shared/abstract/core')

    // Verify require imports were updated (with formatting applied)
    expect(updatedFile2).toContain(
      "const module1 = require('@codelab/backend-abstract-core');",
    )
    expect(updatedFile2).toContain(
      "const module2 = require('@codelab/frontend-abstract-domain');",
    )

    // Verify dynamic imports were updated
    expect(updatedFile2).toContain(
      "const dynamicModule = await import('@codelab/shared-abstract-core');",
    )
  })

  it('should handle files with no @codelab imports', async () => {
    // Create a test library
    await libraryGenerator(tree, {
      name: 'no-codelab-imports',
      directory: 'libs/frontend/domain',
      linter: Linter.EsLint,
      style: 'none',
    })

    const testFileContent = `import React from 'react'
import { render } from '@testing-library/react'

export const MyComponent = () => {
  return <div>Hello World</div>
}`

    // Write test file
    tree.write('libs/frontend/domain/src/lib/component.tsx', testFileContent)

    // Run the generator
    await renameNpmNameGenerator(tree)

    // Check that file content remains unchanged
    const updatedFile = tree.read(
      'libs/frontend/domain/src/lib/component.tsx',
      'utf-8',
    )

    // Expect the formatted content with semicolons
    const expectedContent = `import React from 'react';
import { render } from '@testing-library/react';

export const MyComponent = () => {
  return <div>Hello World</div>;
};
`

    expect(updatedFile).toBe(expectedContent)
  })

  it('should handle mixed import formats in the same file', async () => {
    // Create a test library
    await libraryGenerator(tree, {
      name: 'mixed-imports',
      directory: 'libs/frontend/domain',
      linter: Linter.EsLint,
      style: 'none',
    })

    const testFileContent = `// Named imports
import { func1, func2 } from '@codelab/backend/application/app'

// Default import
import defaultExport from '@codelab/frontend/abstract/domain'

// Namespace import
import * as namespace from '@codelab/shared/abstract/types'

// Side effect import
import '@codelab/backend/abstract/core'

// Multi-line import
import {
  multiFunc1,
  multiFunc2,
  multiFunc3
} from '@codelab/frontend/abstract/application'

export { func1, func2, defaultExport, namespace }`

    // Write test file
    tree.write('libs/frontend/domain/src/lib/mixed.ts', testFileContent)

    // Run the generator
    await renameNpmNameGenerator(tree)

    // Check that all import formats were migrated correctly
    const updatedFile = tree.read(
      'libs/frontend/domain/src/lib/mixed.ts',
      'utf-8',
    )

    // Verify all imports were updated (with formatting applied)
    expect(updatedFile).toContain(
      "import { func1, func2 } from '@codelab/backend-application-app';",
    )
    expect(updatedFile).toContain(
      "import defaultExport from '@codelab/frontend-abstract-domain';",
    )
    expect(updatedFile).toContain(
      "import * as namespace from '@codelab/shared-abstract-types';",
    )
    expect(updatedFile).toContain("import '@codelab/backend-abstract-core';")
    expect(updatedFile).toContain(
      "} from '@codelab/frontend-abstract-application';",
    )

    // Verify old paths are gone
    expect(updatedFile).not.toContain('@codelab/backend/application/app')
    expect(updatedFile).not.toContain('@codelab/frontend/abstract/domain')
    expect(updatedFile).not.toContain('@codelab/shared/abstract/types')
    expect(updatedFile).not.toContain('@codelab/backend/abstract/core')
    expect(updatedFile).not.toContain('@codelab/frontend/abstract/application')
  })

  it('should only process TypeScript and JavaScript files', async () => {
    // Create a test library
    await libraryGenerator(tree, {
      name: 'file-types',
      directory: 'libs/frontend/domain',
      linter: Linter.EsLint,
      style: 'none',
    })

    // Create various file types
    const importStatement =
      "import { something } from '@codelab/backend/abstract/core'"

    tree.write('libs/frontend/domain/src/lib/test.ts', importStatement)
    tree.write('libs/frontend/domain/src/lib/test.tsx', importStatement)
    tree.write('libs/frontend/domain/src/lib/test.js', importStatement)
    tree.write('libs/frontend/domain/src/lib/test.jsx', importStatement)
    tree.write(
      'libs/frontend/domain/src/lib/test.json',
      '{ "import": "@codelab/backend/abstract/core" }',
    )
    tree.write('libs/frontend/domain/src/lib/test.md', importStatement)

    // Run the generator
    await renameNpmNameGenerator(tree)

    // Check that only TS/JS files were processed
    expect(
      tree.read('libs/frontend/domain/src/lib/test.ts', 'utf-8'),
    ).toContain('@codelab/backend-abstract-core')
    expect(
      tree.read('libs/frontend/domain/src/lib/test.tsx', 'utf-8'),
    ).toContain('@codelab/backend-abstract-core')
    expect(
      tree.read('libs/frontend/domain/src/lib/test.js', 'utf-8'),
    ).toContain('@codelab/backend-abstract-core')
    expect(
      tree.read('libs/frontend/domain/src/lib/test.jsx', 'utf-8'),
    ).toContain('@codelab/backend-abstract-core')

    // Non-TS/JS files should remain unchanged
    expect(
      tree.read('libs/frontend/domain/src/lib/test.json', 'utf-8'),
    ).toContain('@codelab/backend/abstract/core')
    expect(
      tree.read('libs/frontend/domain/src/lib/test.md', 'utf-8'),
    ).toContain('@codelab/backend/abstract/core')
  })

  it('should update tsconfig.base.json paths correctly preserving subpaths', async () => {
    // Create a tsconfig.base.json with various path types
    const tsconfigContent = {
      compilerOptions: {
        paths: {
          // Direct package mapping (should stay the same)
          '@codelab/shared-infra-auth0': [
            'libs/shared/infra/auth0/src/index.ts',
          ],
          // NEW-style subpath mappings (these stay the same - not transformed)
          '@codelab/shared-infra-auth0/client': [
            'libs/shared/infra/auth0/src/client/index.ts',
          ],
          '@codelab/shared-infra-auth0/server': [
            'libs/shared/infra/auth0/src/server/index.ts',
          ],
          // OLD-style path that needs transformation
          '@codelab/backend/infra/adapter/auth0': [
            'libs/backend/infra/adapter/auth0/src/index.ts',
          ],
          // OLD-style path with subpath that should be preserved
          '@codelab/shared/infra/logging/server': [
            'libs/shared/infra/logging/src/server/index.ts',
          ],
          // Unknown path with slashes (should stay the same - only known mappings are transformed)
          '@codelab/some/unknown/path': ['libs/some/unknown/path/src/index.ts'],
        },
      },
    }

    tree.write('tsconfig.base.json', JSON.stringify(tsconfigContent, null, 2))

    // Run the generator
    await renameNpmNameGenerator(tree)

    // Read the updated tsconfig
    const updatedTsconfig = JSON.parse(
      tree.read('tsconfig.base.json', 'utf-8')!,
    )
    const paths = updatedTsconfig.compilerOptions.paths

    // Direct mappings should stay the same
    expect(paths['@codelab/shared-infra-auth0']).toEqual([
      'libs/shared/infra/auth0/src/index.ts',
    ])

    // NEW-style subpaths stay the same (not transformed)
    expect(paths['@codelab/shared-infra-auth0/client']).toEqual([
      'libs/shared/infra/auth0/src/client/index.ts',
    ])
    expect(paths['@codelab/shared-infra-auth0/server']).toEqual([
      'libs/shared/infra/auth0/src/server/index.ts',
    ])

    // OLD-style paths that need transformation
    expect(paths['@codelab/backend-infra-adapter-auth0']).toEqual([
      'libs/backend/infra/adapter/auth0/src/index.ts',
    ])

    // OLD-style path with subpath preserved (because /server exists after src/)
    expect(paths['@codelab/shared-infra-logging/server']).toEqual([
      'libs/shared/infra/logging/src/server/index.ts',
    ])

    // Unknown paths stay the same (only known mappings are transformed)
    expect(paths['@codelab/some/unknown/path']).toEqual([
      'libs/some/unknown/path/src/index.ts',
    ])

    // Original OLD-style paths with slashes should not exist
    expect(paths['@codelab/shared-infra-auth0-client']).toBeUndefined()
    expect(paths['@codelab/shared-infra-auth0-server']).toBeUndefined()
    expect(paths['@codelab/backend/infra/adapter/auth0']).toBeUndefined()
    expect(paths['@codelab/shared/infra/logging/server']).toBeUndefined()
  })
})
