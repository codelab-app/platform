import { workspaces } from '@angular-devkit/core'
import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  noop,
} from '@angular-devkit/schematics'
import { formatFiles, getWorkspacePath, readJsonInTree } from '@nrwl/workspace'
import { createStorybookProjectFiles } from '../../generators/library/react/generator'
import { removeFiles } from '../../generators/library/utils'

export interface ProjectDefinition {
  root: string
  sourceRoot: string
  projectType: 'library' | 'application'
  schematic?: Record<string, any>
  architect: Record<string, workspaces.TargetDefinition>
}

const update = (): Rule => {
  return (host: Tree, context: SchematicContext) => {
    const workspacePath = getWorkspacePath(host)
    const config = readJsonInTree(host, workspacePath)

    const rules = Object.entries<ProjectDefinition>(config.projects).reduce(
      (tmpRules: Array<Rule>, [projectName, projectConfig]) => {
        const isStorybook = !!projectConfig.architect.storybook?.builder
        const projectRoot = projectConfig.root

        if (isStorybook) {
          console.log(`Running migration for: ${projectConfig.root}`)
        }

        return [
          ...tmpRules,
          isStorybook
            ? chain([
                createStorybookProjectFiles({
                  name: projectName,
                  projectRoot,
                }),
                removeFiles([
                  `${projectRoot}/.storybook/addons.js`,
                  `${projectRoot}/.storybook/config.js`,
                ]),
              ])
            : noop(),
        ]
      },
      [],
    )

    return chain([...rules])
  }
}

export default () => {
  return (host: Tree, context: SchematicContext) => {
    return chain([update(), formatFiles()])
  }
}
