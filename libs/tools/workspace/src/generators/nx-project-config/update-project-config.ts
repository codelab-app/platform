/* eslint-disable canonical/sort-keys */
import type { ProjectConfiguration, Tree } from '@nx/devkit'
import {
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit'
import get from 'lodash/get'
import has from 'lodash/has'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import set from 'lodash/set'
import path from 'path'
import tsMorph, { Project } from 'ts-morph'

/**
 * Each project needs to output reporters to individual file, and we can't do that as CLI argument, so needs to be done at project level.
 *
 * We loop through each project and add the configurations there at a per-library basis.
 */
export const updateProjectConfig = (tree: Tree, projectName: string) => {
  const projectConfig = readProjectConfiguration(tree, projectName)

  console.log(`Checking for ${projectConfig.name}...`)

  addCiLintConfig(tree, projectConfig)
  updateTestConfig(tree, projectConfig)

  updateProjectConfiguration(tree, projectName, projectConfig)
}

/**
 * Output ESLint reporter to tmp library
 */
const addCiLintConfig = (tree: Tree, projectConfig: ProjectConfiguration) => {
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

const updateTestConfig = (tree: Tree, projectConfig: ProjectConfiguration) => {
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
              // outputFile: `tmp/reports/test-integration/${projectConfig.name}.xml`,
              // reporters: ['default', 'jest-junit'],
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
            memoryLimit: 8192,
            parallel: 3,
            color: true,
            testPathPattern: ['[^i].spec.ts'],
          },
          configurations: {
            dev: {
              reporters: ['default'],
            },
            test: {
              reporters: ['default'],
            },
            ci: {
              /**
               * Reporter options are not available via CLI
               *
               * https://stackoverflow.com/questions/59372493/override-jest-junit-default-output-location
               */
              // So specs that fail to run will show as errors
              // reportTestSuiteErrors: true,
              // outputFile: `${projectConfig.name}.xml`,
              // reporters: ['default', 'jest-junit'],
            },
          },
        },
        testOptions,
      ),
    )

    /**
     * jest reporters options don't work with CLI, so we need to add to jest config
     */
    addReportersToJestConfig(tree, projectConfig)
  }
}

const addReportersToJestConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
  const project = new Project()
  const filePath = path.join(projectConfig.root, 'jest.config.ts')
  console.log(filePath)

  const sourceFile = project.addSourceFileAtPath(filePath)

  const defaultExportAssignment = sourceFile.getExportAssignment(
    (exp) => !exp.isExportEquals(),
  )

  if (!defaultExportAssignment) {
    throw new Error('Could not find default export in jest.config.ts')
  }

  const configObject = defaultExportAssignment.getExpression()

  if (!tsMorph.Node.isObjectLiteralExpression(configObject)) {
    throw new Error('Default export is not an object literal')
  }

  const reportersProperty = configObject.getProperty('reporters')

  const newInitializer = `
  [
    'default',
    [
      'jest-junit',
      {
        outputName: '${projectConfig.name}.xml',
        reportTestSuiteErrors: true,
      }
    ]
  ]`

  if (!reportersProperty) {
    // add the reporters property if it doesn't exist
    configObject.addPropertyAssignment({
      name: 'reporters',
      initializer: newInitializer,
    })
  } else if (tsMorph.Node.isPropertyAssignment(reportersProperty)) {
    // if the reporters property exists and is a PropertyAssignment, update it
    reportersProperty.setInitializer(newInitializer)
  }

  tree.write(filePath, sourceFile.getFullText())
}
