import * as fs from 'fs'
import {
  MergeStrategy,
  Rule,
  SchematicContext,
  Tree,
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  url,
} from '@angular-devkit/schematics'
import { names } from '@nrwl/workspace'
import { NestSchematicSchema } from './schema'

interface NormalizedSchema extends NestSchematicSchema {
  projectDirectory?: string
  useCaseDirName: string
  projectRoot: string
  toUpperCase?: (name: string) => string
  toLowerCase?: (name: string) => string
}

const toUpperCase = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const toLowerCase = (name: string) => {
  return name.charAt(0).toLowerCase() + name.slice(1)
}

const normalizeOptions = (options: NormalizedSchema): NormalizedSchema => {
  options.toUpperCase = toUpperCase
  options.toLowerCase = toLowerCase
  const useCaseDirName = toLowerCase(options.useCaseName)
  const projectRoot = `libs/modules/${options.moduleName}`

  return {
    ...options,
    projectRoot,
    useCaseDirName,
  }
}

const domainModuleExists = (options: NormalizedSchema): boolean => {
  const { projectRoot } = options
  const cwd = process.cwd()
  const moduleDirPath = `${cwd}/${projectRoot}/`

  return fs.existsSync(moduleDirPath)
}

const createDirsFromStructure = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.useCaseName),
      }),
      move(`${options.projectRoot}/src`),
    ]),
    MergeStrategy.Overwrite,
  )
}

export default function MySchematic(options: NormalizedSchema) {
  const normalizedOptions = normalizeOptions(options)

  return (host: Tree, context: SchematicContext) => {
    if (domainModuleExists(normalizedOptions)) {
      return chain([createDirsFromStructure(normalizedOptions)])
    }

    console.log(
      `Domain Module does not exists, run ( nx generate @codelab/schematics:nest-lib )`,
    )
  }
}
