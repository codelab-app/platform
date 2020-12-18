import { strings } from '@angular-devkit/core'
import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics'
import { ProjectType, names } from '@nrwl/workspace'
import { NestSchematicSchema } from './schema'

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Library

interface NormalizedSchema extends NestSchematicSchema {
  projectDirectory: string
}

const toUpperCase = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const normalizeOptions = (options: NestSchematicSchema): NormalizedSchema => {
  options.moduleName = toUpperCase(options.name)
  const projectRoot = 'libs/modules'
  const projectDirectory = `${projectRoot}/${options.name}`

  return {
    ...options,
    projectDirectory,
  }
}

/**
 * We use `.eslintrc.js` instead of `.eslintrc`, so need to remove generated files
 */
const removeFiles = (options: NormalizedSchema): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    const dir = options.projectDirectory
    const filesToRemove = [
      '.eslintrc.json',
      `${dir}/.eslintrc.json`,
      `${dir}/src/lib/modules-${options.name}.module.ts`,
      `${dir}/tsconfig.spec.json`,
      `${dir}/jest.config.js`,
    ]

    filesToRemove.forEach((file: any) => {
      tree.delete(file)
    })
  }
}

const createNestjsLibrary = (options: NestSchematicSchema): Rule => {
  return externalSchematic('@nrwl/nest', 'library', {
    name: options.name,
    directory: 'modules',
  })
}

const createDirs = (options: NormalizedSchema): Rule => {
  const dir = options.projectDirectory

  return (tree: Tree) => {
    tree.create(`${dir}/src/common/.gitkeep`, '')
    tree.create(`${dir}/src/core/adapters/.gitkeep`, '')

    tree.create(`${dir}/src/core/application/commands/.gitkeep`, '')
    tree.create(`${dir}/src/core/application/handlers/.gitkeep`, '')
    tree.create(`${dir}/src/core/application/services/.gitkeep`, '')
    tree.create(`${dir}/src/core/application/useCases/.gitkeep`, '')

    tree.create(`${dir}/src/core/domain/dto/.gitkeep`, '')
    tree.create(`${dir}/src/framework/nestjs/.gitkeep`, '')
    tree.create(`${dir}/src/infrastructure/persistence/.gitkeep`, '')
    tree.create(`${dir}/src/presentation/controllers/.gitkeep`, '')

    return tree
  }
}

const createDirsFromStructure = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      move(`${options.projectDirectory}/src`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createConfigFiles = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./ConfigFiles`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      move(`${options.projectDirectory}/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const renameToDotFiles = (options: NormalizedSchema): Rule => {
  const dir = options.projectDirectory

  return (tree: Tree) => {
    tree.rename(`${dir}/babelrc`, `${dir}/.babelrc`)
    tree.rename(`${dir}/eslintrc.js`, `${dir}/.eslintrc.js`)
  }
}

const createNestModule = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./NestModule`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${options.projectDirectory}/src/framework/nestjs/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createDITokens = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./DITokens`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${options.projectDirectory}/src/framework/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createRepositoryAdapter = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./RepositoryAdapter`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${options.projectDirectory}/src/infrastructure/persistence/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createCommandQueryAdapter = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./CommandQueryAdapter`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${options.projectDirectory}/src/presentation/controllers/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createRepositoryPort = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./RepositoryPort`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${options.projectDirectory}/src/core/adapters/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const replaceIndexTsContents = (options: NormalizedSchema): Rule => {
  const dir = options.projectDirectory

  return (tree: Tree) => {
    tree.overwrite(
      `${dir}/src/index.ts`,
      `export * from './framework/nestjs/${options.moduleName}Module'`,
    )
  }
}

// export default function MySchematic(options: NormalizedSchema) {
export default (options: NormalizedSchema): Rule => {
  const normalizedOptions = normalizeOptions(options)

  return (host: Tree, context: SchematicContext) => {
    return chain([
      createNestjsLibrary(normalizedOptions),
      createDirsFromStructure(normalizedOptions),
      // replaceIndexTsContents(normalizedOptions),
      // removeFiles(normalizedOptions),
      // createConfigFiles(normalizedOptions),
      // renameToDotFiles(normalizedOptions),
      // createDirs(normalizedOptions),
      // createNestModule(normalizedOptions),
      // createDITokens(normalizedOptions),
      // createRepositoryAdapter(normalizedOptions),
      // createCommandQueryAdapter(normalizedOptions),
      // createRepositoryPort(normalizedOptions),
    ])
  }
}
