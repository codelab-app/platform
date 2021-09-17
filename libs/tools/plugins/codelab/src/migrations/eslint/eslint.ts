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
import { existsSync } from 'fs'
import { merge } from 'lodash'

/**
 * Append
 */
export default async function update(host: Tree) {
  const projects = getProjects(host)
  projects.forEach((projectConfig, projectName) => {
    console.log(projectConfig)

    const { root, targets, sourceRoot, tags } = projectConfig

    const paths = {
      eslintConfig: joinPathFragments(root, '.eslintrc.json'),
      eslintCiConfig: joinPathFragments(root, '.eslintrc.ci.json'),
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
    const options = {
      overrides: [
        {
          files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
          extends: [paths.baseEslintPath],
        },
      ],
    }

    // Update existing .eslint.ci.config
    if (existsSync(paths.eslintCiConfig)) {
      const eslint = readJson<TsConfig>(host, paths.eslintCiConfig)

      writeJson(host, paths.eslintCiConfig, merge(eslint, options))
    } else {
      // Create .eslint.ci.config
      const eslint = readJson<TsConfig>(host, paths.eslintConfig)

      writeJson(host, paths.eslintCiConfig, merge(eslint, options))
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
