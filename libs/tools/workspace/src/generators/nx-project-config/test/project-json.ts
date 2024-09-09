/* eslint-disable canonical/sort-keys */
import type {
  ProjectConfiguration,
  TargetConfiguration,
  Tree,
} from '@nx/devkit'
import { isEmpty, merge, mergeDeep, pathOr, set, setPath } from 'remeda'
import { updateJestConfig } from './update-jest-config'

export const updateTestConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  /**
   * Only add if library is already using jest
   */
  const testProjestConfig = projectConfig.targets?.test

  if (testProjestConfig) {
    // console.log(`Updating ${projectConfig.name}...`)

    /**
     * But we need to filter out reporters config, since we will use the jest config
     */
    const testConfiguration: TargetConfiguration = {
      executor: projectConfig.targets?.test?.['executor'],
      outputs: projectConfig.targets?.test?.['outputs'],
      options: {
        jestConfig: projectConfig.targets?.test?.['options']['jestConfig'],
      },
    }

    /**
     * Use set because we want to remove old keys
     */
    const updatedProjectConfiguration = merge(projectConfig, {
      targets: {
        targets: {
          /**
           * Add default reporters to development to override our jest config for reporters (since those config don't work in CLI, we had to add them to config file)
           */
          test: {
            ...projectConfig.targets?.test,
            options: {
              ...projectConfig.targets?.test?.options,
              runInBand: true,
              reporters: ['default'],
            },
          },
        },
        'test:unit': merge(
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
        'test:integration': merge(
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
      },
    })

    Object.assign(projectConfig, updatedProjectConfiguration)

    /**
     * jest reporters options don't work with CLI, so we need to add to jest config
     */
    updateJestConfig(tree, projectConfig)
  }
}
