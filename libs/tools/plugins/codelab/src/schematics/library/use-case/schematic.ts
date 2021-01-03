import * as fs from 'fs'
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
import { ProjectType, projectRootDir, toFileName } from '@nrwl/workspace'
import * as v from 'voca'
import { dirExists, dryRunMode } from '../utils'
import { modifyFiles } from './helpers/modify-files'
import { UseCaseSchematicSchema } from './schema'

const projectType = ProjectType.Library

export interface NormalizedSchema extends UseCaseSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  useCaseNamePascalCase: string // PascalCase
  useCaseFolderName: string // folderName
  moduleNamePascalCase: string // PascalCase
  useCaseCommandOrQuery: string
  handlerType: 'CommandHandler' | 'QueryHandler' | string
}

export const normalizeOptions = (
  options: UseCaseSchematicSchema,
): NormalizedSchema => {
  const name = toFileName(options.moduleName)
  const projectDirectory = `modules/${name}`
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const useCaseFolderName = v.chain(options.useCaseName).camelCase().value()
  const useCaseNamePascalCase = v
    .chain(options.useCaseName)
    .camelCase()
    .capitalize()
    .value()
  const moduleNamePascalCase = v
    .chain(options.moduleName)
    .camelCase()
    .capitalize()
    .value()

  const commandOrQuery =
    options.resolverType === 'Mutation' ? 'Command' : 'Query'
  const useCaseCommandOrQuery = useCaseNamePascalCase + commandOrQuery
  const handlerType = `${commandOrQuery}Handler`

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    useCaseFolderName,
    useCaseNamePascalCase,
    moduleNamePascalCase,
    useCaseCommandOrQuery,
    handlerType,
  }
}

const createFiles = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        // ...names(options.useCaseName),
      }),
      move(`${options.projectRoot}/src`),
    ]),
    MergeStrategy.Overwrite,
  )
}

export default (options: NormalizedSchema) => {
  const normalizedOptions = normalizeOptions(options)

  return (host: Tree, context: SchematicContext) => {
    if (
      // Missing module in test/ci env
      (dryRunMode && !dirExists(host, normalizedOptions.projectRoot)) ||
      // Missing module in normal env
      (!dryRunMode && !fs.existsSync(normalizedOptions.projectRoot))
    ) {
      console.log(
        `${normalizedOptions.moduleName} module does not exists, run "nx generate @codelab/schematics:domain-module"`,
      )

      return
    }

    return chain([
      createFiles(normalizedOptions),
      modifyFiles(normalizedOptions),
    ])
  }
}
