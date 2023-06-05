import type { Tree } from '@nx/devkit'
import {
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'
import merge from 'lodash/merge'

export const addCiLintConfig = (tree: Tree, projectName: string) => {
  const projectConfig = readProjectConfiguration(tree, projectName)

  merge(projectConfig, {
    targets: {
      lint: {
        configurations: {
          ci: {
            format: 'junit',
            outputFile: `tmp/reports/lint/${projectConfig.name}.xml`,
          },
        },
      },
    },
  })

  updateProjectConfiguration(tree, projectName, projectConfig)
}
