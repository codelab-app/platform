import * as path from 'path'
import { join } from 'path'
import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { updateWorkspace } from '@nrwl/workspace'
import { callRule, createEmptyWorkspace } from '@nrwl/workspace/testing'
import { ReactSchematicSchema } from '../../schematics/library/react/schema'

const SCHEMATIC_NAME = 'react-lib'

describe('update-0.0.2', () => {
  let appTree: Tree
  let schematicRunner: SchematicTestRunner

  const options: ReactSchematicSchema = { name: 'test' }

  const testRunner = new SchematicTestRunner(
    '@codelab/schematics',
    join(__dirname, '../../../collection.json'),
  )

  beforeEach(async () => {
    appTree = createEmptyWorkspace(Tree.empty())

    appTree = await callRule(
      updateWorkspace((workspace) => {
        workspace.projects.add({
          name: 'test',
          root: 'libs/test',
          targets: {
            storybook: {
              builder: '@nrwl/storybook:storybook',
            },
          },
        })
      }),
      appTree,
    )

    schematicRunner = new SchematicTestRunner(
      '@nrwl/nx-plugin',
      path.join(__dirname, '../../../migrations.json'),
    )

    // appTree = await testRunner
    //   .runSchematicAsync(SCHEMATIC_NAME, options, appTree)
    //   .toPromise()

    // Remove all .storybook files, so we can re-add later
    // appTree.getDir('libs/test/.storybook').visit((filePath) => {
    //   appTree.delete(filePath)
    // })

    // appTree.create(
    //   'package.json',
    //   serializeJson({
    //     dependencies: {},
    //   }),
    // )
  })

  it(`should update dependencies`, async () => {
    const result = await schematicRunner
      .runSchematicAsync('update-0.0.2', {}, appTree)
      .toPromise()

    // const { dependencies } = readJsonInTree(result, '/package.json')

    // expect(dependencies).toEqual({})

    result.getDir('libs/test/.storybook').visit((filePath) => {
      console.log(filePath)
    })
  })
})
