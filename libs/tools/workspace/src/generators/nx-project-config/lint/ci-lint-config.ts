import type { ProjectConfiguration, Tree } from '@nx/devkit'
import { merge } from 'remeda'

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

/**
 * We can put these in nx.js instead
 */
export const removeCiLintConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  console.log('Before', projectConfig)

  unset(projectConfig, 'targets.lint.configurations')

  console.log('After', projectConfig)
}
