import * as path from 'path'
import {
  Tree,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
} from '@nrwl/devkit'
import { toFileName } from '@nrwl/workspace'
import { capitalize } from 'voca'
import libraryGenerator, { CodelabNestSchema } from '../nest/generator'
import { removeFiles } from '../utils-new'
import { DomainModuleSchematicSchema } from './schema'

interface NormalizedSchema extends DomainModuleSchematicSchema {
  projectName: string
  moduleNamePascalCase: string
  moduleName: string
  projectRoot: string
  projectSourceRoot: string
  projectDirectory: string
  // parsedTags: Array<string>
}

export const normalizeOptions = (
  host: Tree,
  options: DomainModuleSchematicSchema,
): NormalizedSchema => {
  const name = toFileName(options.name)
  const projectDirectory = name
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-')
  const projectRoot = `${
    getWorkspaceLayout(host).libsDir
  }/modules/${projectDirectory}`
  const projectSourceRoot = `${projectRoot}/src`

  const moduleNamePascalCase = capitalize(name)
  // const parsedTags = options.tags
  //   ? options.tags.split(',').map((s) => s.trim())
  //   : []

  return {
    ...options,
    moduleName: name,
    projectName,
    projectRoot,
    projectDirectory,
    moduleNamePascalCase,
    projectSourceRoot,
    // parsedTags,
  }
}

function addFiles(host: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectSourceRoot),
    tmpl: '',
  }

  generateFiles(
    host,
    path.join(__dirname, 'files'),
    options.projectSourceRoot,
    templateOptions,
  )
}

export default async function (
  host: Tree,
  options: DomainModuleSchematicSchema,
) {
  const normalizedOptions = normalizeOptions(host, options)

  // We put all domain module under `modules` directory
  const nestjsLibOptions: CodelabNestSchema = {
    name: normalizedOptions.projectName,
    directory: 'modules',
  }

  await libraryGenerator(host, nestjsLibOptions)
  addFiles(host, normalizedOptions)
  removeFiles(host, [
    `${normalizedOptions.projectSourceRoot}/lib/modules-${options.name}.module.ts`,
  ])
  await formatFiles(host)
}
