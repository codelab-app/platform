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
 * Output ESLint reporter to tmp library
 */
export const addCiLintConfig = (
  tree: Tree,
  projectConfig: ProjectConfiguration,
) => {
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
