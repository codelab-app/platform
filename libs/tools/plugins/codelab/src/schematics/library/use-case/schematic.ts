import * as fs from 'fs'
import { strings } from '@angular-devkit/core'
import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics'
import { names } from '@nrwl/workspace'
import { NestSchematicSchema } from './schema'

interface NormalizedSchema extends NestSchematicSchema {
  projectDirectory?: string
  useCaseDirName: string
  projectRoot: string
  toUpperCase?: (name: string) => string
  toLowerCase?: (name: string) => string
}

const toUpperCase = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const toLowerCase = (name: string) => {
  return name.charAt(0).toLowerCase() + name.slice(1)
}

const normalizeOptions = (options: NormalizedSchema): NormalizedSchema => {
  options.toUpperCase = toUpperCase
  options.toLowerCase = toLowerCase
  const useCaseDirName = toLowerCase(options.useCaseName)
  const projectRoot = `libs/modules/${options.moduleName}`

  return {
    ...options,
    projectRoot,
    useCaseDirName,
  }
}

const domainModuleExists = (options: NormalizedSchema): boolean => {
  const { projectRoot } = options
  const cwd = process.cwd()
  const moduleDirPath = `${cwd}/${projectRoot}/`

  return fs.existsSync(moduleDirPath)
}

const createUseCaseDir = (options: NormalizedSchema): Rule => {
  const { useCaseDirName, projectRoot } = options

  return (tree: Tree) => {
    tree.create(
      `${projectRoot}/src/core/application/useCases/${useCaseDirName}/.gitkeep`,
      '',
    )
  }
}

const createCommand = (options: NormalizedSchema): Rule => {
  const { projectRoot } = options

  return mergeWith(
    apply(url(`./CommandFiles`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.useCaseName),
      }),
      move(`${projectRoot}/src/core/application/commands`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createCommandHandler = (options: NormalizedSchema): Rule => {
  const { projectRoot } = options

  return mergeWith(
    apply(url(`./CommandHandlerFiles`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.useCaseName),
      }),
      move(`${projectRoot}/src/core/application/handlers`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createService = (options: NormalizedSchema): Rule => {
  const { projectRoot } = options

  return mergeWith(
    apply(url(`./ServiceFiles`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.useCaseName),
      }),
      move(`${projectRoot}/src/core/application/services`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const createUseCaseFiles = (options: NormalizedSchema): Rule => {
  const { useCaseDirName, projectRoot } = options

  return mergeWith(
    apply(url(`./UseCaseFiles`), [
      applyTemplates({
        ...options,
        ...strings,
        ...names(options.useCaseName),
      }),
      move(`${projectRoot}/src/core/application/useCases/${useCaseDirName}`),
    ]),
    MergeStrategy.Overwrite,
  )
}

export default function MySchematic(options: NormalizedSchema) {
  const normalizedOptions = normalizeOptions(options)

  return (host: Tree, context: SchematicContext) => {
    if (domainModuleExists(normalizedOptions)) {
      return chain([
        createUseCaseDir(normalizedOptions),
        createCommand(normalizedOptions),
        createCommandHandler(normalizedOptions),
        createService(normalizedOptions),
        createUseCaseFiles(normalizedOptions),
      ])
    }

    console.log(
      `Domain Module does not exists, run ( nx generate @codelab/schematics:domain-module )`,
    )
  }
}
