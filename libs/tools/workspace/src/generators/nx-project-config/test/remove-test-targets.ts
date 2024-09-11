import { type ProjectConfiguration, type Tree, updateJson } from '@nx/devkit'
import { join } from 'path'
import { omit } from 'remeda'

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
  }
}
