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
  names,
  offsetFromRoot,
  projectRootDir,
  toFileName,
} from '@nrwl/workspace'
import { capitalize } from 'voca'
import { NestSchematicSchema } from './schema'

const projectType = ProjectType.Library

interface NormalizedSchema extends NestSchematicSchema {
  projectName: string
  moduleName: string
  projectRoot: string
  projectDirectory: string
  // parsedTags: Array<string>
}

export const normalizeOptions = (
  options: NestSchematicSchema,
): NormalizedSchema => {
  const name = toFileName(options.name)
  const projectDirectory = `modules/${name}`
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const moduleName = capitalize(name)
  // const parsedTags = options.tags
  //   ? options.tags.split(',').map((s) => s.trim())
  //   : []

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    moduleName,
    // parsedTags,
  }
}

// const removeFiles = (options: NormalizedSchema): Rule => {
//   return (tree: Tree, context: SchematicContext) => {
//     const dir = options.projectDirectory
//     const filesToRemove = [`${dir}/src/lib/modules-${options.name}.module.ts`]

//     filesToRemove.forEach((file: any) => {
//       tree.delete(file)
//     })
//   }
// }

const createFiles = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
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
      console.log(
        'Domain Module does not exists, run ( nx generate @codelab/schematics:nest-lib )',
      )

      return
    }

    return chain([
      createCodelabNestjsLibrary(normalizedOptions),
      createFiles(normalizedOptions),
      // removeFiles(normalizedOptions),
    ])
  }
}
