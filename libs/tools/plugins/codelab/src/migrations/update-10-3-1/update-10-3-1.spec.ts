import * as path from 'path'
import { join } from 'path'
import { Tree } from '@angular-devkit/schematics'
import { SchematicTestRunner } from '@angular-devkit/schematics/testing'
import { updateWorkspace } from '@nrwl/workspace'
import { callRule, createEmptyWorkspace } from '@nrwl/workspace/testing'
import { ReactSchematicSchema } from '../../generators/library/react/schema'

const SCHEMATIC_NAME = 'react-lib'

describe.skip('update-10.3.1', () => {
  let appTree: Tree
  let schematicRunner: SchematicTestRunner
  const projectRoot = '/libs/test'

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
          root: projectRoot,
          sourceRoot: projectRoot,
          targets: {
            storybook: {
              builder: '@nrwl/storybook:storybook',
            },
          },
        })
      }),
      appTree,
    )

    /**
     * Create .storybook files manually to simulate current state of project repo (before migration)
     *
     * These should be deleted afterwards
     */

    appTree.create(`${projectRoot}/.storybook/addons.js`, '')
    appTree.create(`${projectRoot}/.storybook/config.js`, '')

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

  it('should update .storybook config files', async () => {
    const result = await schematicRunner
      .runSchematicAsync('update-10.3.1', {}, appTree)
      .toPromise()

    const storybookFiles: Array<string> = []

    result.getDir(`${projectRoot}/.storybook`).visit((filePath) => {
      storybookFiles.push(filePath)
    })

    // Files that previously existed, but should now be absent
    expect(
      storybookFiles.includes(`${projectRoot}/.storybook/addon.js`),
    ).toBeFalsy()
    expect(
      storybookFiles.includes(`${projectRoot}/.storybook/config.js`),
    ).toBeFalsy()

    // Files we should have
    expect(
      storybookFiles.includes(`${projectRoot}/.storybook/main.js`),
    ).toBeTruthy()
    expect(
      storybookFiles.includes(`${projectRoot}/.storybook/preview.js`),
    ).toBeTruthy()
    expect(
      storybookFiles.includes(`${projectRoot}/.storybook/tsconfig.json`),
    ).toBeTruthy()
    expect(
      storybookFiles.includes(`${projectRoot}/.storybook/webpack.config.js`),
    ).toBeTruthy()
  })
})
