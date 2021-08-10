import {
  camelToTitleCase,
  toCamelCase,
  toPascalCase,
} from '@codelab/shared/utils'
import {
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit'
import * as path from 'path'
import { NormalizedSchema, UiUseCaseGeneratorSchema } from './schema'
import { UseCaseType, useCaseTypeToPresentParticle } from './useCaseType'

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

  const modelCamelCase = toCamelCase(options.model)
  const modelPascalCase = toPascalCase(options.model)

  // Generate configs from the type
  const useCaseConfigs = options.useCaseTypes.map((useCaseType) => {
    const useCaseTypeCamelCase = useCaseType
    const useCaseTypePascalCase = toPascalCase(useCaseType)
    const useCasePascalCase = `${useCaseTypePascalCase}${modelPascalCase}`
    const useCaseCamelCase = `${useCaseTypeCamelCase}${modelPascalCase}`
    const useCaseTitleCase = camelToTitleCase(useCaseCamelCase)
    const useCaseErrorMessage = `Error while ${useCaseTypeToPresentParticle[useCaseType]} ${modelPascalCase}`

    const inputType =
      useCaseType === UseCaseType.Update
        ? `${useCasePascalCase}Data`
        : `${useCasePascalCase}Input`

    return {
      useCaseTypeCC: useCaseTypeCamelCase,
      useCaseTypePC: useCaseTypePascalCase,
      useCasePC: useCasePascalCase,
      useCaseCC: useCaseCamelCase,
      useCaseTC: useCaseTitleCase,
      inputType,
      useCaseErrorMessage,
    }
  })

  return {
    ...options,

    // model
    modelCC: modelCamelCase,
    modelPC: modelPascalCase,
    useCaseConfigs,

    projectName,
    projectRoot,
    projectDirectory,
  }
}

const addFiles = (host: Tree, options: NormalizedSchema) => {
  // Go through each use case type
  options.useCaseConfigs.forEach((useCaseConfig) => {
    const templateOptions = {
      ...options,
      // Use case specific settings
      ...useCaseConfig,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
      tmpl: '',
    }

    // Load different templates based on use cases
    if (useCaseConfig.useCaseTypeCC === UseCaseType.Create) {
      return generateFiles(
        host,
        path.join(__dirname, 'files', 'create'),
        options.projectRoot,
        templateOptions,
      )
    }

    if (useCaseConfig.useCaseTypeCC === UseCaseType.Update) {
      return generateFiles(
        host,
        path.join(__dirname, 'files', 'update'),
        options.projectRoot,
        templateOptions,
      )
    }

    if (useCaseConfig.useCaseTypeCC === UseCaseType.Delete) {
      return generateFiles(
        host,
        path.join(__dirname, 'files', 'delete'),
        options.projectRoot,
        templateOptions,
      )
    }
  })
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
