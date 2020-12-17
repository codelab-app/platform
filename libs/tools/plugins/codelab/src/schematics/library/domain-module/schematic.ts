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

const rootDir = 'libs/modules'

interface NormalizedSchema extends NestSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>
}

export const toUpperCase = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const normalizeOptions = (
  options: NestSchematicSchema,
): NestSchematicSchema => {
  options.moduleName = toUpperCase(options.name)

  return {
    ...options,
  }
}

/**
 * We use `.eslintrc.js` instead of `.eslintrc`, so need to remove generated files
 */
const removeFiles = (options: NormalizedSchema): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    const { projectRoot } = options
    const filesToRemove = ['.eslintrc.json', `${projectRoot}/.eslintrc.json`]

    filesToRemove.forEach((file: any) => {
      tree.delete(file)
    })
  }
}

export const createNestjsLibrary = (options: NormalizedSchema): Rule => {
  return externalSchematic('@nrwl/nest', 'library', {
    name: options.name,
    directory: options.directory,
  })
}

const createDirs = (options: NestSchematicSchema): Rule => {
  const dir = `${rootDir}/${options.name}`

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

const createNestModule = (options: NestSchematicSchema): Rule => {
  return mergeWith(
    apply(url(`./NestModule`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${rootDir}/${options.name}/framework/nestjs/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createDITokens = (options: NestSchematicSchema): Rule => {
  return mergeWith(
    apply(url(`./DITokens`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${rootDir}/${options.name}/src/framework/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createRepositoryAdapter = (options: NestSchematicSchema): Rule => {
  return mergeWith(
    apply(url(`./RepositoryAdapter`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${rootDir}/${options.name}/src/infrastructure/persistence/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createCommandQueryAdapter = (options: NestSchematicSchema): Rule => {
  return mergeWith(
    apply(url(`./CommandQueryAdapter`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${rootDir}/${options.name}/src/presentation/controllers/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createRepositoryPort = (options: NestSchematicSchema): Rule => {
  return mergeWith(
    apply(url(`./RepositoryPort`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.name),
      }),
      move(`${rootDir}/${options.name}/src/core/adapters/`),
    ]),
    MergeStrategy.Overwrite,
  )
}

export default function MySchematic(options: NormalizedSchema) {
  const normalizedOptions = normalizeOptions(options)

  return (host: Tree, context: SchematicContext) => {
    return chain([
      createDirs(normalizedOptions),
      createNestModule(normalizedOptions),
      createDITokens(normalizedOptions),
      createRepositoryAdapter(normalizedOptions),
      createCommandQueryAdapter(normalizedOptions),
      createRepositoryPort(normalizedOptions),
    ])
  }
}
