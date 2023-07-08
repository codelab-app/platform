/* eslint-disable canonical/sort-keys */
import type { ProjectConfiguration, Tree } from '@nx/devkit'
import has from 'lodash/has'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
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
    console.log(`Updating ${projectConfig.name}...`)

    /**
     * First need to add default reporters to developmentto override our jest config for reporters (since those config don't work in CLI, we had to add them to config file)
     */
    merge(projectConfig, {
      targets: {
        test: {
          options: {
            reporters: ['default'],
          },
        },
      },
    })

    /**
     * But we need to filter out reporters config, since we will use the jest config
     */
    const testOptions = omit(projectConfig.targets?.test, 'options.reporters')

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
            testPathPattern: ['[i].spec.ts'],
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
        testOptions,
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
            testPathPattern: ['[^i].spec.ts'],
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
        testOptions,
      ),
    )

    /**
     * jest reporters options don't work with CLI, so we need to add to jest config
     */
    updateJestConfig(tree, projectConfig)
  }
}
