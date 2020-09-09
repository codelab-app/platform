import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  url,
  externalSchematic,
  MergeStrategy,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics'
import {
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  Linter,
  updateWorkspace,
  addProjectToNxJsonInTree,
} from '@nrwl/workspace'
import { ReactSchematicSchema } from './schema.d'

/**
 * Depending on your needs, you can change this to either `Library` or `Application`
 */
const projectType = ProjectType.Library

interface NormalizedSchema extends ReactSchematicSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: string[]
}

function normalizeOptions(options: ReactSchematicSchema): NormalizedSchema {
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
function removeFiles(options: NormalizedSchema): Rule {
  const { projectRoot } = options
  const filesToRemove = ['.eslintrc', `${projectRoot}/.eslintrc`]

  return (tree: Tree, context: SchematicContext) => {
    filesToRemove.forEach((file) => {
      tree.delete(file)
    })
  }
}

function addFiles(options: NormalizedSchema): Rule {
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

export function createReactLibrary(options: NormalizedSchema): Rule {
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

export function addStorybookConfig(options: NormalizedSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return externalSchematic('@nrwl/react', 'storybook-configuration', {
      name: options.name,
      configureCypress: false,
      generateStories: false,
    })
  }
}

export default function (options: ReactSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options)

  console.log(normalizedOptions)

  return chain([
    /**
     * We want to extend the `@nrwl/react` schematics, and override the eslintrc file.
     */
    createReactLibrary(normalizedOptions),
    addStorybookConfig(normalizedOptions),
    addFiles(normalizedOptions),
    removeFiles(normalizedOptions),
  ])
}
