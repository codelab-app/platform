import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { createEmptyWorkspace } from '@nrwl/workspace/testing'
import { join } from 'path'

import { PluginsPlugSchematicSchema } from './schema.d'

describe('plugins-plug schematic', () => {
  let appTree: Tree
  const options: PluginsPlugSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner(
    '@codelab/plug',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty())
  })

  it('should run successfully', async () => {
    await expect(
      testRunner
        .runSchematicAsync('plugins-plug', options, appTree)
        .toPromise(),
    ).resolves.not.toThrowError()
  })
})
