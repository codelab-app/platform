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
  filter,
  mergeWith,
  move,
  noop,
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
import { removeFiles } from '../utils'
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

export const createStorybookProjectFiles = (
  options: Pick<NormalizedSchema, 'name' | 'projectRoot'>,
): Rule => {
  const filesPath = path.resolve(__dirname, './files/.storybook')

  return mergeWith(
    apply(url(filesPath), [
      applyTemplates({
        ...options,
        ...names(options.name),
        offsetFromRoot: offsetFromRoot(options.projectRoot),
      }),
      move(`${options.projectRoot}/.storybook`),
    ]),
    MergeStrategy.Overwrite,
  )
}

export const createProjectFiles = (
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
      filter((file) => {
        return !file.includes('.storybook')
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
    name: options.projectName,
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
      /*
       * We want to extend the `@nrwl/react` schematics, and override the eslintrc file.
       */
      createReactLibrary(normalizedOptions),
      createProjectFiles(normalizedOptions),
      normalizedOptions.storybook === true
        ? chain([
            createStorybookLibrary(normalizedOptions),
            createStorybookProjectFiles(normalizedOptions),
          ])
        : noop(),
      removeFiles(filesToRemove),
    ])
  }
}
