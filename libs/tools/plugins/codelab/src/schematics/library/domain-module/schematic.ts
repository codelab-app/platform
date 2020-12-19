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
  projectDirectory: string
}

const toUpperCase = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const normalizeOptions = (options: NestSchematicSchema): NormalizedSchema => {
  options.moduleName = toUpperCase(options.name)
  const projectRoot = 'libs/modules'
  const projectDirectory = `${projectRoot}/${options.name}`

  return {
    ...options,
    projectDirectory,
  }
}

const domainModuleExists = (options: NormalizedSchema): boolean => {
  const { projectDirectory } = options
  const cwd = process.cwd()
  const moduleDirPath = `${cwd}/${projectDirectory}/`

  return fs.existsSync(moduleDirPath)
}

const removeFiles = (options: NormalizedSchema): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    const dir = options.projectDirectory
    const filesToRemove = [`${dir}/src/lib/modules-${options.name}.module.ts`]

    filesToRemove.forEach((file: any) => {
      tree.delete(file)
    })
  }
}

const createDirsFromStructure = (options: NormalizedSchema): Rule => {
  return mergeWith(
    apply(url(`./files`), [
      applyTemplates({
        ...options,
        ...names(options.name),
      }),
      move(`${options.projectDirectory}/src`),
    ]),
    MergeStrategy.Overwrite,
  )
}

const replaceIndexTsContents = (options: NormalizedSchema): Rule => {
  const dir = options.projectDirectory

  return (tree: Tree) => {
    tree.overwrite(
      `${dir}/src/index.ts`,
      `export * from './framework/nestjs/${options.moduleName}Module'`,
    )
  }
}

export default (options: NormalizedSchema): Rule => {
  const normalizedOptions = normalizeOptions(options)

  return (host: Tree, context: SchematicContext) => {
    if (domainModuleExists(normalizedOptions)) {
      return chain([
        createDirsFromStructure(normalizedOptions),
        replaceIndexTsContents(normalizedOptions),
        removeFiles(normalizedOptions),
      ])
    }

    console.log(
      'Domain Module does not exists, run ( nx generate @codelab/schematics:nest-lib )',
    )
  }
}
