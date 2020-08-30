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
} from '@angular-devkit/schematics'
import {
  names,
  offsetFromRoot,
  projectRootDir,
  ProjectType,
  toFileName,
  Linter,
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

function removeFiles(options: any): Rule {
  const { filesToRemove, directory } = options

  return (tree) => {
    filesToRemove.forEach((file) => {
      tree.delete(`${directory}/${file}`)
    })
  }
}

function addFiles(options: NormalizedSchema): Rule {
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

export default function (options: ReactSchematicSchema): Rule {
  const normalizedOptions = normalizeOptions(options)

  console.log(normalizedOptions)

  return chain([
    /**
     * We want to extend the `@nrwl/react` schematics, and override the eslintrc file.
     */
    externalSchematic('@nrwl/react', 'library', {
      name: normalizedOptions.name,
      linter: Linter.EsLint,
    }),
    externalSchematic('@nrwl/react', 'storybook-configuration', {
      name: normalizedOptions.name,
    }),
    // removeFiles({
    //   directory: '/',
    //   filesToRemove: ['.eslintrc'],
    // }),
    // updateWorkspace((workspace) => {
    //   workspace.projects
    //     .add({
    //       name: normalizedOptions.projectName,
    //       root: normalizedOptions.projectRoot,
    //       sourceRoot: `${normalizedOptions.projectRoot}/src`,
    //       projectType,
    //     })
    //     .targets.add({
    //       name: 'build',
    //       builder: '@codelab/react:build',
    //     })
    // }),
    // addProjectToNxJsonInTree(normalizedOptions.projectName, {
    //   tags: normalizedOptions.parsedTags,
    // }),
    // addFiles(normalizedOptions),
  ])
}
