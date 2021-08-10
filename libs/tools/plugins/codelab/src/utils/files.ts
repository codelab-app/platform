import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics'

export const dirExists = (tree: Tree, path: string) => {
  return tree.getDir(path).subfiles.length > 0
}

export const dryRunMode = !!(process.env.NODE_ENV === 'test' || process.env.CI)

export const removeFiles = (filesToRemove: Array<string>): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    filesToRemove.forEach((file: any) => {
      if (tree.exists(file)) {
        tree.delete(file)
      }
    })
  }
}

export type BaseNormalizedSchema = {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>
}
