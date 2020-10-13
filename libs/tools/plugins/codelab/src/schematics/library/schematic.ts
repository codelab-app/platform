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
const removeFiles = (options: NormalizedSchema): Rule => {
  const { projectRoot } = options
  const filesToRemove = ['.eslintrc', `${projectRoot}/.eslintrc`]

  return (tree: Tree, context: SchematicContext) => {
    filesToRemove.forEach((file) => {
      tree.delete(file)
    })
  }
}

const addFiles = (options: NormalizedSchema): Rule => {
  return (tree: Tree, context: SchematicContext) => {
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
}

export const createReactLibrary = (options: NormalizedSchema): Rule => {
  return (_: Tree, context: SchematicContext) => {
    return externalSchematic('@nrwl/react', 'library', {
      name: options.name,
      directory: options.directory,
      linter: Linter.EsLint,
      component: false,
      style: '@emotion/styled',
    })
  }
}

export const addStorybookConfig = (options: NormalizedSchema): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    return externalSchematic('@nrwl/react', 'storybook-configuration', {
      name: options.projectName,
      configureCypress: false,
      generateStories: false,
    })
  }
}

export default function (options: ReactSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options)

  // console.log(normalizedOptions)

  return chain([
    /**
     * We want to extend the `@nrwl/react` schematics, and override the eslintrc file.
     */
    createReactLibrary(normalizedOptions),
    options.storybook ? addStorybookConfig(normalizedOptions) : noop(),
    addFiles(normalizedOptions),
    removeFiles(normalizedOptions),
  ])
}
