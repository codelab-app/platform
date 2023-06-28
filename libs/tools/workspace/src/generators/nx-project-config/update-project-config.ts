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
import { addCiLintConfig } from './lint/ci-lint-config'
import { updateTestConfig } from './test/test-config'

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
  // updateLibTsconfig()
}
