import type { CreateNodesContextV2, CreateNodesV2 } from '@nx/devkit'

import { createNodesFromFiles, readJsonFile } from '@nx/devkit'
import { existsSync } from 'fs'
import { dirname, join } from 'path'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MyPluginOptions {}

export const createNodesV2: CreateNodesV2<MyPluginOptions> = [
  '**/tsconfig{.spec,}.json',
  async (configFiles, options, context) => {
    return await createNodesFromFiles(
      (configFile, _options, _context) =>
        createNodesInternal(configFile, _options, _context),
      configFiles,
      options ?? {},
      context,
    )
  },
]

const createNodesInternal = async (
  configFilePath: string,
  options: MyPluginOptions | undefined,
  context: CreateNodesContextV2,
) => {
  const projectConfiguration = readJsonFile(configFilePath)
  const projectRoot = dirname(configFilePath)

  // Skip root project
  if (projectRoot === '.') {
    return {}
  }

  const isProject =
    existsSync(join(projectRoot, 'project.json')) ||
    existsSync(join(projectRoot, 'package.json'))

  if (!isProject) {
    return {}
  }

  // Check which config files exist in the project
  const tsconfigPath = join(projectRoot, 'tsconfig.json')
  const tsconfigSpecPath = join(projectRoot, 'tsconfig.spec.json')
  const hasTsconfig = existsSync(tsconfigPath)
  const hasTsconfigSpec = existsSync(tsconfigSpecPath)
  // Build command based on which files exist
  let command: string

  if (hasTsconfig && hasTsconfigSpec) {
    command = `tsc -p ${tsconfigPath} && tsc -p ${tsconfigSpecPath}`
  } else if (hasTsconfig) {
    command = `tsc -p ${tsconfigPath}`
  } else {
    command = `tsc -p ${tsconfigSpecPath}`
  }

  return {
    projects: {
      [projectRoot]: {
        targets: {
          'tsc-check': {
            cache: true,
            command,
          },
        },
      },
    },
  }
}
