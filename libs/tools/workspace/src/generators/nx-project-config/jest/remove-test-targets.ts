import { type ProjectConfiguration, type Tree } from '@nx/devkit'

export const migrateToConfigBasedTest = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  /**
   * Remove the old targets
   */
  if ('targets' in projectConfig) {
    delete projectConfig['targets']?.['test:integration']
    delete projectConfig['targets']?.['test:unit']

    delete projectConfig['targets']?.['test']?.['options']?.['reporters']
  }
}
