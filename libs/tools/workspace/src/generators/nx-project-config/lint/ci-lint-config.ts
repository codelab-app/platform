import type { ProjectConfiguration, Tree } from '@nx/devkit'
import merge from 'lodash/merge'

/**
 * Output ESLint reporter to tmp library
 */
export const addCiLintConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  merge(projectConfig, {
    targets: {
      lint: {
        configurations: {
          ci: {
            format: 'junit',
            outputFile: `tmp/reports/lint/${projectConfig.name}.xml`,
            quiet: true,
          },
        },
      },
    },
  })
}
