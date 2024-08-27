import { type ProjectConfiguration, type Tree } from '@nx/devkit'

export const checkLintConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
): boolean => {
  console.log('Checking lint target...')

  if (!projectConfig.targets) {
    projectConfig.targets = {}
  }

  if (!projectConfig.targets['lint']) {
    projectConfig.targets['lint'] = {
      executor: '@nx/eslint:lint',
    }
  }

  const lintTarget = projectConfig.targets['lint']

  return lintTarget.executor === '@nx/eslint:lint'
}
