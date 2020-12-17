import { join } from 'path'
import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { NestSchematicSchema } from './schema'

const SCHEMATIC_NAME = 'nest-lib'

describe('@codelab/schematics:nest-lib', () => {
  let appTree: Tree
  const options: NestSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner(
    '@codelab/schematics',
    join(__dirname, '../../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    expect(true).toBeTruthy()
  })
})
