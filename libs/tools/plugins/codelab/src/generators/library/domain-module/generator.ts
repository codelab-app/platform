import * as fs from 'fs'
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
import {
  ProjectType,
  offsetFromRoot,
  projectRootDir,
  toFileName,
} from '@nrwl/workspace'
import { capitalize } from 'voca'
import { removeFiles } from '../utils'
import { DomainModuleSchematicSchema } from './schema'

const projectType = ProjectType.Library

interface NormalizedSchema extends DomainModuleSchematicSchema {
  projectName: string
  moduleNamePascalCase: string
  moduleName: string
  projectRoot: string
  projectDirectory: string
  // parsedTags: Array<string>
}

export const normalizeOptions = (
  options: DomainModuleSchematicSchema,
): NormalizedSchema => {
  const name = toFileName(options.name)
  const projectDirectory = `modules/${name}`
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const moduleNamePascalCase = capitalize(name)
  // const parsedTags = options.tags
  //   ? options.tags.split(',').map((s) => s.trim())
  //   : []

  return {
    ...options,
    moduleName: name,
    projectName,
    projectRoot,
    projectDirectory,
    moduleNamePascalCase,
    // parsedTags,
  }
}

const createFiles = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        // ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(`${options.projectRoot}/src`),
    ]),
    MergeStrategy.Overwrite,
  )
}

export const createCodelabNestjsLibrary = (options: NormalizedSchema): Rule => {
  return externalSchematic('@codelab/schematics', 'nest-lib', {
    name: options.name,
    directory: 'modules',
  })
}

export default (options: NormalizedSchema): Rule => {
  const normalizedOptions = normalizeOptions(options)

  return (host: Tree, context: SchematicContext) => {
    if (fs.existsSync(normalizedOptions.projectRoot)) {
      console.log(`module ${normalizedOptions.name} already exists`)

      return
    }

    return chain([
      createCodelabNestjsLibrary(normalizedOptions),
      removeFiles([
        `${options.projectRoot}/src/lib/modules-${options.name}.module.ts`,
      ]),
      createFiles(normalizedOptions),
    ])
  }
}
