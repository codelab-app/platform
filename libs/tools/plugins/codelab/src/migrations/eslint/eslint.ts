import {
  formatFiles,
  getProjects,
  joinPathFragments,
  offsetFromRoot,
  readJson,
  Tree,
  updateProjectConfiguration,
  writeJson,
} from '@nrwl/devkit'
import { TsConfig } from '@nrwl/storybook/src/utils/utilities'
// import { formatFiles } from '@nrwl/workspace'
import { existsSync, unlinkSync } from 'fs'
import { merge, set } from 'lodash'

/**
 * Append
 */
export default async function update(host: Tree) {
  const projects = getProjects(host)
  projects.forEach((projectConfig, projectName) => {
    const { root, targets, sourceRoot, tags } = projectConfig

    const paths = {
      eslintConfig: joinPathFragments(root, '.eslintrc.json'),
      eslintCiConfig: joinPathFragments(root, '.eslintrc.ci.json'),
      tsconfigPath: joinPathFragments(root, 'tsconfig.*?.json'),
      tsconfigStorybookPath: joinPathFragments(
        root,
        '.storybook/tsconfig.json',
      ),
      /**
       *
       */
      baseEslintPath: joinPathFragments(
        offsetFromRoot(root),
        '.eslintrc.ci.json',
      ),
    }

    if (!existsSync(paths.eslintConfig)) {
      return
    }

    /**
     * Add option to extend a base shared eslint config for CI only
     */

    const project = existsSync(paths.tsconfigStorybookPath)
      ? [paths.tsconfigPath, paths.tsconfigStorybookPath]
      : [paths.tsconfigPath]

    console.log(projectName, project)

    const options = {
      project,
    }

    console.log('Checking...', paths.eslintCiConfig)

    if (existsSync(paths.eslintCiConfig)) {
      console.log('Removing!')
      unlinkSync(paths.eslintCiConfig)
    }

    // Update existing .eslint.ci.config
    if (existsSync(paths.eslintCiConfig)) {
      const eslint = readJson<TsConfig>(host, paths.eslintCiConfig)

      set(eslint, 'overrides.1.parserOptions', options)

      writeJson(host, paths.eslintCiConfig, eslint)
    } else {
      // Create .eslint.ci.config
      const eslint = readJson<TsConfig>(host, paths.eslintConfig)

      set(eslint, 'overrides.1.parserOptions', options)
      writeJson(host, paths.eslintCiConfig, eslint)
    }

    /**
     * We add ci configuration that points to .eslintrc.ci.json
     */
    const lintOptions = {
      targets: {
        lint: {
          configurations: {
            ci: {
              eslintConfig: paths.eslintCiConfig,
            },
          },
        },
      },
    }

    // Update configuration for "lint" inside workspace
    // updateWorkspaceConfiguration(host)
    updateProjectConfiguration(host, projectName, {
      ...merge(projectConfig, lintOptions),
    })
  })

  await formatFiles(host)
}
