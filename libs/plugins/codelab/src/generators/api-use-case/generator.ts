import {
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit'
import * as path from 'path'
import { toCamelCase, toKebabCase, toPascalCase } from '../utils'
import { ApiUseCaseGeneratorSchema, NormalizedSchema } from './schema'
import { UseCaseType } from './useCaseType'

const useCaseToClassMap: Record<UseCaseType, string> = {
  [UseCaseType.Regular]: 'UseCase',
  [UseCaseType.Dgraph]: 'DgraphUseCase',
  [UseCaseType.Mutation]: 'MutationUseCase',
  [UseCaseType.Query]: 'QueryUseCase',
}

const normalizeOptions = (
  host: Tree,
  options: ApiUseCaseGeneratorSchema,
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

  options.useCaseType = options.useCaseType || UseCaseType.Regular

  const useCaseName = toCamelCase(options.useCaseName)
  const useCaseNamePascalCase = toPascalCase(useCaseName)
  const useCaseKebabCase = toKebabCase(useCaseName)
  const modelName = toCamelCase(options.modelName)
  const modelNamePascalCase = toPascalCase(modelName)

  return {
    ...options,
    useCaseBaseClass: useCaseToClassMap[options.useCaseType],
    useCaseNamePascalCase,
    useCaseName,
    modelName,
    modelNamePascalCase,
    useCaseKebabCase,
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
    template: '',
  }

  generateFiles(
    host,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions,
  )
}

export default async function (host: Tree, options: ApiUseCaseGeneratorSchema) {
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
