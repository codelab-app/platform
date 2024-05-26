/* eslint-disable canonical/sort-keys */
import type { ProjectConfiguration, Tree } from '@nx/devkit'
import has from 'lodash/has'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import set from 'lodash/set'
import { updateJestConfig } from './update-jest-config'

export const updateTestConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  /**
   * Only add if library is already using jest
   */

  if (has(projectConfig, 'targets.test')) {
    // console.log(`Updating ${projectConfig.name}...`)

    /**
     * But we need to filter out reporters config, since we will use the jest config
     */
    const testConfiguration = pick(projectConfig.targets?.test, [
      'executor',
      'outputs',
      'options.jestConfig',
    ])

    /**
     * Use set because we want to remove old keys
     */
    set(
      projectConfig,
      'targets.test:integration',
      merge(
        {
          defaultConfiguration: 'dev',
          options: {
            memoryLimit: 8192,
            color: true,
            testPathPattern: ['i.spec.ts'],
            runInBand: true,
          },
          configurations: {
            dev: {
              reporters: ['default'],
            },
            test: {
              reporters: ['default'],
            },
            ci: {
              parallel: 3,
            },
          },
        },
        /**
         * First merge with the default test config, this way if migration update test, we can copy it over
         *
         */
        testConfiguration,
      ),
    )

    set(
      projectConfig,
      'targets.test:unit',
      merge(
        {
          defaultConfiguration: 'dev',
          options: {
            color: true,
            memoryLimit: 8192,
            parallel: 3,
            testPathIgnorePatterns: ['i.spec.ts'],
          },
          configurations: {
            dev: {
              reporters: ['default'],
            },
            test: {
              reporters: ['default'],
            },
            ci: {},
          },
        },
        testConfiguration,
      ),
    )

    /**
     * Add default reporters to development to override our jest config for reporters (since those config don't work in CLI, we had to add them to config file)
     */
    merge(projectConfig, {
      targets: {
        test: {
          options: {
            runInBand: true,
            reporters: ['default'],
          },
        },
      },
    })

    /**
     * jest reporters options don't work with CLI, so we need to add to jest config
     */
    updateJestConfig(tree, projectConfig)
  }
}
