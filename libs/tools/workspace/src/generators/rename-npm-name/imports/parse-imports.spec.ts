import { parseImports } from './parse-imports'

describe('parseImports', () => {
  describe('ES6 imports', () => {
    it('should parse default imports', () => {
      const content = "import React from 'react'"
      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['react'])
    })

    it('should parse named imports', () => {
      const content = "import { useState, useEffect } from 'react'"
      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['react'])
    })

    it('should parse namespace imports', () => {
      const content = "import * as utils from '../utils'"
      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['../utils'])
    })

    it('should parse type imports', () => {
      const content = "import type { SomeType } from '@codelab/shared/types'"
      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['@codelab/shared/types'])
    })

    it('should parse side effect imports', () => {
      const content = "import './styles.css'"
      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['./styles.css'])
    })

    it('should parse imports with both single and double quotes', () => {
      const content = `
import React from 'react'
import axios from "axios"
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['react', 'axios'])
    })
  })

  describe('CommonJS requires', () => {
    it('should parse basic require calls', () => {
      const content = "const path = require('path')"
      const imports = parseImports(content, 'test.js')

      expect(imports).toEqual(['path'])
    })

    it('should parse destructured require calls', () => {
      const content = "const { readFile, writeFile } = require('fs')"
      const imports = parseImports(content, 'test.js')

      expect(imports).toEqual(['fs'])
    })

    it('should parse require calls with double quotes', () => {
      const content = 'const lodash = require("lodash")'
      const imports = parseImports(content, 'test.js')

      expect(imports).toEqual(['lodash'])
    })

    it('should not parse require in strings or comments', () => {
      const content = `
// const fake = require('not-real')
const str = "require('also-not-real')"
const real = require('real-package')
`

      const imports = parseImports(content, 'test.js')

      expect(imports).toEqual(['real-package'])
    })
  })

  describe('Dynamic imports', () => {
    it('should parse basic dynamic imports', () => {
      const content = `
const loadModule = async () => {
  const module = await import('@codelab/frontend/module')
  return module
}
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['@codelab/frontend/module'])
    })

    it('should parse dynamic imports with .then()', () => {
      const content = `
import('./lazy-module').then(module => {
  console.log(module)
})
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['./lazy-module'])
    })

    it('should parse conditional dynamic imports', () => {
      const content = `
if (condition) {
  import('../conditional')
}
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['../conditional'])
    })
  })

  describe('Mixed import types', () => {
    it('should parse all import types in one file', () => {
      const content = `
import React from 'react'
import { Component } from 'react'
const fs = require('fs')
import('./dynamic').then(m => m.default)
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['react', 'fs', './dynamic'])
    })
  })

  describe('Edge cases', () => {
    it('should handle empty content', () => {
      const imports = parseImports('', 'test.ts')

      expect(imports).toEqual([])
    })

    it('should handle content with no imports', () => {
      const content = `
const x = 5
function doSomething() {
  return x * 2
}
export default doSomething
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual([])
    })

    it('should deduplicate imports', () => {
      const content = `
import React from 'react'
import { useState } from 'react'
const React2 = require('react')
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['react'])
    })

    it('should handle multiline imports', () => {
      const content = `
import {
  useState,
  useEffect,
  useCallback
} from 'react'
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['react'])
    })

    it('should handle imports with trailing commas', () => {
      const content = "import { a, b, c, } from 'package'"
      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['package'])
    })

    it('should handle scoped packages', () => {
      const content = `
import test from '@scope/package-name'
import another from '@codelab/shared/utils'
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['@scope/package-name', '@codelab/shared/utils'])
    })

    it('should handle relative imports with various patterns', () => {
      const content = `
import a from './sibling'
import b from '../parent'
import c from '../../grandparent'
import d from './nested/deep/file'
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual([
        './sibling',
        '../parent',
        '../../grandparent',
        './nested/deep/file',
      ])
    })

    it('should handle imports with file extensions', () => {
      const content = `
import json from './data.json'
import styles from './styles.module.css'
import component from './component.jsx'
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual([
        './data.json',
        './styles.module.css',
        './component.jsx',
      ])
    })

    it('should handle imports with query parameters', () => {
      const content = `
import Worker from './worker.js?worker'
import url from './asset.png?url'
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toEqual(['./worker.js?worker', './asset.png?url'])
    })
  })

  describe('Invalid syntax handling', () => {
    it('should handle malformed imports gracefully', () => {
      const content = `
import { } from 'empty-import'
import normal from 'valid-import'
`

      const imports = parseImports(content, 'test.ts')

      expect(imports).toContain('valid-import')
      expect(imports).toContain('empty-import')
    })

    it('should parse imports even with syntax errors elsewhere', () => {
      const content = `
import valid from 'valid-import'
const x = // syntax error - incomplete
import another from 'another-import'
`

      const imports = parseImports(content, 'test.ts')

      // TypeScript parser is resilient and can still parse imports
      expect(imports).toContain('valid-import')
      expect(imports).toContain('another-import')
    })
  })
})
