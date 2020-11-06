import * as path from 'path'
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
  Linter,
  ProjectType,
  names,
  offsetFromRoot,
  projectRootDir,
  toFileName,
} from '@nrwl/workspace'
import { ReactSchematicSchema } from './schema'

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Library

interface NormalizedSchema extends ReactSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>
}

const normalizeOptions = (options: ReactSchematicSchema): NormalizedSchema => {
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

/**
 * We use `.eslintrc.js` instead of `.eslintrc`, so need to remove generated files
 */
export const removeFiles = (filesToRemove: Array<string>): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    filesToRemove.forEach((file: string) => {
      if (tree.exists(file)) {
        tree.delete(file)
      }
    })
  }
}

export const createStorybookProjectFiles = (
  options: Pick<NormalizedSchema, 'name' | 'projectRoot'>,
): Rule => {
  const filesPath = path.resolve(__dirname, './files')

  return mergeWith(
    apply(url(filesPath), [
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

export const createReactLibrary = (options: NormalizedSchema): Rule => {
  return externalSchematic('@nrwl/react', 'library', {
    name: options.name,
    directory: options.directory,
    linter: Linter.EsLint,
    component: false,
    style: '@emotion/styled',
  })
}

export const createStorybookLibrary = (options: NormalizedSchema): Rule => {
  return externalSchematic('@nrwl/storybook', 'configuration', {
    name: options.name,
    uiFramework: '@storybook/react',
  })
}

export default (options: ReactSchematicSchema): Rule => {
  const normalizedOptions = normalizeOptions(options)
  const filesToRemove = [
    '.eslintrc.json',
    `${normalizedOptions.projectRoot}/.eslintrc.json`,
  ]

  return (host: Tree, context: SchematicContext) => {
    return chain([
      /**
       * We want to extend the `@nrwl/react` schematics, and override the eslintrc file.
       */
      createReactLibrary(normalizedOptions),
      createStorybookLibrary(normalizedOptions),
      createStorybookProjectFiles(normalizedOptions),
      removeFiles(filesToRemove),
    ])
  }
}
