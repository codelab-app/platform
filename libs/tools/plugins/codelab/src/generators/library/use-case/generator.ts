import * as path from 'path'
import {
  Tree,
  formatFiles,
  generateFiles,
  names,
  offsetFromRoot,
  readProjectConfiguration,
} from '@nrwl/devkit'
import { toCamelCase, toPascalCase } from '../utils'

export interface UseCaseGeneratorSchema {
  name: string
  useCaseName: string
  moduleName: string
  resolverType: string
  tags?: string
  directory?: string
}

export interface NormalizedUseCaseGeneratorSchema
  extends UseCaseGeneratorSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>

  // Custom
  useCaseNamePascalCase: string
  moduleNamePascalCase: string
  resolverTypePascalCase: string
}

export function normalizeOptions(
  host: Tree,
  options: UseCaseGeneratorSchema,
): NormalizedUseCaseGeneratorSchema {
  const name = names(options.name).fileName
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  // const projectRoot = `${getWorkspaceLayout(host).libsDir}/${projectDirectory}`
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : []

  // Custom
  const { sourceRoot: projectRoot, root } = readProjectConfiguration(
    host,
    projectName,
  )

  if (!projectRoot) {
    throw new Error(`${projectName} cannot be found!`)
  }

  const useCaseName = toCamelCase(options.useCaseName)
  const useCaseNamePascalCase = toPascalCase(useCaseName)
  const moduleName = toCamelCase(options.moduleName)
  const moduleNamePascalCase = toPascalCase(moduleName)
  const resolverType = toCamelCase(options.resolverType)
  const resolverTypePascalCase = toPascalCase(options.resolverType)

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    useCaseName,
    useCaseNamePascalCase,
    moduleName,
    moduleNamePascalCase,
    resolverType,
    resolverTypePascalCase,
  }
}

function addFiles(host: Tree, options: NormalizedUseCaseGeneratorSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    // `tmpl: ''` is a common pattern. With it you can name files like this: `index.ts__tmpl__`, so your editor
    tmpl: '',
  }

  generateFiles(
    host,
    path.join(__dirname, 'files/core/application/useCases'),
    path.join(options.projectRoot, 'core/application/useCases'),
    templateOptions,
  )
}

export default async function (host: Tree, options: UseCaseGeneratorSchema) {
  const normalizedOptions = normalizeOptions(host, options)

  addFiles(host, normalizedOptions)

  await formatFiles(host)
}
