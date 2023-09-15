import type { ProjectConfiguration, Tree } from '@nx/devkit'
import merge from 'lodash/merge'

const addExtensionToGlob = (glob: string, extension: string): string => {
  return glob.replace(/(\{.*\})/, `$1,${extension}`)
}

export const addGraphqlExtension = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const lintFilePatterns = projectConfig.targets?.lint?.options.lintFilePatterns

  merge(projectConfig, {
    targets: {
      lint: {
        options: {
          lintFilePatterns: addExtensionToGlob(lintFilePatterns, 'graphql'),
        },
      },
    },
  })
}
