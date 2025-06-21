import { createTree } from '@nx/devkit/testing'
import type { Tree } from '@nx/devkit'

import { updateProjectImports } from './update-project-imports'

describe('update-project-imports', () => {
  // parseImports tests are now in parse-imports.spec.ts

  describe('updateProjectImports', () => {
    let tree: Tree

    beforeEach(() => {
      tree = createTree()
    })

    it('should get imports from all files in a directory', () => {
      // Create test files
      tree.write('src/index.ts', `
import { app } from './app'
import React from 'react'
`)
      tree.write('src/app.ts', `
import { config } from './config'
import axios from 'axios'
`)
      tree.write('src/utils/helper.ts', `
import path from 'path'
import { format } from 'date-fns'
`)
      // Non-TS/JS file should be ignored
      tree.write('src/styles.css', `@import 'should-not-extract.css';`)
      
      const imports = updateProjectImports(tree, 'src')
      
      expect(imports).toEqual({
        'src/index.ts': ['./app', 'react'],
        'src/app.ts': ['./config', 'axios'],
        'src/utils/helper.ts': ['path', 'date-fns']
      })
    })

    it('should handle empty directories', () => {
      tree.write('src/.gitkeep', '')
      
      const imports = updateProjectImports(tree, 'src')
      
      expect(imports).toEqual({})
    })

    it('should handle files with no imports', () => {
      tree.write('src/constants.ts', `
export const API_URL = 'https://api.example.com'
export const TIMEOUT = 5000
`)
      
      const imports = updateProjectImports(tree, 'src')
      
      expect(imports).toEqual({})
    })

    it('should only process TypeScript and JavaScript files', () => {
      tree.write('src/data.json', '{"import": "should-not-extract"}')
      tree.write('src/README.md', 'import should not be extracted')
      tree.write('src/script.sh', 'import command should not be extracted')
      tree.write('src/valid.ts', 'import { valid } from "package"')
      
      const imports = updateProjectImports(tree, 'src')
      
      expect(imports).toEqual({
        'src/valid.ts': ['package']
      })
    })

    it('should recursively process subdirectories', () => {
      tree.write('src/components/Button.tsx', `import React from 'react'`)
      tree.write('src/components/forms/Input.tsx', `import { useState } from 'react'`)
      tree.write('src/utils/api/client.ts', `import axios from 'axios'`)
      
      const imports = updateProjectImports(tree, 'src')
      
      expect(imports).toEqual({
        'src/components/Button.tsx': ['react'],
        'src/components/forms/Input.tsx': ['react'],
        'src/utils/api/client.ts': ['axios']
      })
    })
  })
})