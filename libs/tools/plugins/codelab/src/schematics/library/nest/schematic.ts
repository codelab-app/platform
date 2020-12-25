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
import { removeFiles } from '../utils'
import { NestSchematicSchema } from './schema'

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Library

interface NormalizedSchema extends NestSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>
}

const normalizeOptions = (options: NestSchematicSchema): NormalizedSchema => {
  const name = toFileName(options.name)
  const projectDirectory = options.directory
    ? `${toFileName(options.directory)}/${name}`
    : name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${projectRootDir(projectType)}/${projectDirectory}`
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : []

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  }
}

const createFiles = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(options.projectRoot),
    ]),
    MergeStrategy.Overwrite,
  )
}

export const createNestjsLibrary = (options: NormalizedSchema): Rule => {
  return externalSchematic('@nrwl/nest', 'library', {
    name: options.name,
    directory: options.directory,
  })
}

export default (options: NestSchematicSchema): Rule => {
  const normalizedOptions = normalizeOptions(options)

  return (host: Tree, context: SchematicContext) => {
    return chain([
      createNestjsLibrary(normalizedOptions),
      createFiles(normalizedOptions),
      removeFiles([
        '.eslintrc.json',
        `${normalizedOptions.projectRoot}/.eslintrc.json`,
      ]),
    ])
  }
}
