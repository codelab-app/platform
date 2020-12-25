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
import { UseCaseSchematicSchema } from './schema'

const projectType = ProjectType.Library

export interface NormalizedSchema extends UseCaseSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  UseCaseName: string // capitalized
  ModuleName: string // capitalized
}

export const normalizeOptions = (
  options: UseCaseSchematicSchema,
): NormalizedSchema => {
  const name = toFileName(options.moduleName)
  const projectDirectory = `modules/${name}`
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const UseCaseName = v
    .chain(options.useCaseName)
    .camelCase()
    .capitalize()
    .value()
  const ModuleName = v
    .chain(options.moduleName)
    .camelCase()
    .capitalize()
    .value()

  // const moduleName = capitalize(name)
  // const parsedTags = options.tags
  //   ? options.tags.split(',').map((s) => s.trim())
  //   : []

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    UseCaseName,
    ModuleName,
    // parsedTags,
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

export default function MySchematic(options: NormalizedSchema) {
  const normalizedOptions = normalizeOptions(options)

  console.log('dry run mode', dryRunMode)

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
      // insertDiToken(normalizedOptions),
    ])
  }
}
