import { Tree, readProjectConfiguration } from '@nrwl/devkit'
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing'
import generator from './generator'
import { DomainModuleSchematicSchema } from './schema'

const SCHEMATIC_NAME = 'domain-module'

describe('@codelab/schematics:domain-module', () => {
  const appTree: Tree = createTreeWithEmptyWorkspace()

  const options: DomainModuleSchematicSchema = { name: 'user' }

  beforeAll(async () => {
    await generator(appTree, options)
  })

  it('should generate project configurations', () => {
    const config = readProjectConfiguration(appTree, 'modules-user')

    expect(config).toMatchObject({
      root: 'libs/modules/user',
    })
  })

  const expectedFiles = [
    // Common
    'common/.gitkeep',

    // Core - application
    'core/application/useCases/.gitkeep',

    // Core - domain
    'core/domain/User.ts',
    'core/domain/User.fragments.graphql',

    // Framework
    `framework/nestjs/UserModule.ts`,
    // `framework/${moduleNamePascalCase}DITokens.ts`,

    // Presentation
    `presentation/controllers/UserResolvers.ts`,
  ].map((file) => `libs/modules/user/src/${file}`)

  test.each(expectedFiles)('%p should exist', (file) => {
    expect(appTree.exists(file)).toBeTruthy()
  })
})
