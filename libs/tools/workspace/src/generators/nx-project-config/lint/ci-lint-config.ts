import type { ProjectConfiguration, Tree } from '@nx/devkit'

/**
 * Output ESLint reporter to tmp library
 */
export const addCiLintConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  Object.assign(projectConfig, {
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

  if (projectConfig.targets?.lint?.configurations) {
    delete projectConfig.targets.lint.configurations
  }

  console.log('After', projectConfig)
}
