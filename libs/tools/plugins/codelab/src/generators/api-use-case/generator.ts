import {
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit'
import * as path from 'path'
import { toCamelCase, toKebabCase, toPascalCase } from '../../utils/strings'
import { ApiUseCaseGeneratorSchema, NormalizedSchema } from './schema'
import { useCaseToClassMap, UseCaseType } from './useCaseType'

const normalizeOptions = (
  host: Tree,
  options: ApiUseCaseGeneratorSchema,
): NormalizedSchema => {
  const { model, useCase, graphqlType } = options
  const projectDirectory = names(`backend-modules-${model}`).fileName
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')

  // const projectRoot = `${getWorkspaceLayout(host).libsDir}/${projectDirectory}`
  const { sourceRoot: projectRoot } = readProjectConfiguration(
    host,
    projectName,
  )

  if (!projectRoot) {
    throw new Error(`${projectName} cannot be found!`)
  }

  const useCasePascalCase = toPascalCase(useCase)
  const useCaseKebabCase = toKebabCase(useCase)
  const modelPascalCase = toPascalCase(model)

  return {
    ...options,
    // useCaseBaseClass: useCaseToClassMap[options.useCaseType],
    useCasePascalCase,
    useCase,
    model,
    modelPascalCase,
    useCaseKebabCase,
    projectName,
    projectRoot,
    projectDirectory,
    graphqlType,
  }
}

const addFiles = (host: Tree, options: NormalizedSchema) => {
  const templateOptions = {
    ...options,
    ...names(options.projectDirectory),
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
