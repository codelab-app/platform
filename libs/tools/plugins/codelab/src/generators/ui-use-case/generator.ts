import {
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit'
import * as path from 'path'
import { toCamelCase, toPascalCase, toTitleCase } from '../../utils/files'
import { NormalizedSchema, UiUseCaseGeneratorSchema } from './schema'

const normalizeOptions = (
  host: Tree,
  options: UiUseCaseGeneratorSchema,
): NormalizedSchema => {
  const name = names(options.name).fileName

  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name

  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')

  // const projectRoot = `${getWorkspaceLayout(host).libsDir}/${projectDirectory}`
  const { sourceRoot: projectRoot } = readProjectConfiguration(
    host,
    projectName,
  )

  if (!projectRoot) {
    throw new Error(`${projectName} cannot be found!`)
  }

  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : []

  const useCase = toCamelCase(options.useCase)
  const useCasePascalCase = toPascalCase(useCase)
  const useCaseCamelCase = toCamelCase(useCase)
  const modelCamelCase = toCamelCase(options.model)
  const modelPascalCase = toPascalCase(options.model)
  const useCaseTitleCase = toTitleCase(options.model)
  const useCaseType = toPascalCase(options.useCaseType)

  return {
    ...options,
    useCaseType,
    useCaseTitleCase,
    useCasePascalCase,
    useCaseCamelCase,
    modelCamelCase,
    modelPascalCase,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  }
}

const addFiles = (host: Tree, options: NormalizedSchema) => {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    tmpl: '',
  }

  generateFiles(
    host,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions,
  )
}

export default async function (host: Tree, options: UiUseCaseGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options)
  // addProjectConfiguration(host, normalizedOptions.projectName, {
  //   root: normalizedOptions.projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${normalizedOptions.projectRoot}/src`,
  //   targets: {
  //     build: {
  //       executor: '@codelab/plugins-codelab:build',
  //     },
  //   },
  //   tags: normalizedOptions.parsedTags,
  // })
  addFiles(host, normalizedOptions)
  await formatFiles(host)
}
