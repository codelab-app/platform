import {
  Rule,
  SchematicContext,
  Tree,
  externalSchematic,
} from '@angular-devkit/schematics'
import { callRule, createEmptyWorkspace } from '@nrwl/workspace/testing'

export const createTestLib = async (
  domainModuleName: string,
): Promise<Tree> => {
  let appTree = Tree.empty()

  appTree = createEmptyWorkspace(appTree)
  appTree = await callRule(
    externalSchematic('@codelab/schematics', 'domain-module', {
      name: domainModuleName,
    }),
    appTree,
  )

  return appTree
}

export const dirExists = (tree: Tree, path: string) => {
  return tree.getDir(path).subfiles.length > 0
}

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
