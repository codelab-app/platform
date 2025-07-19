import type { CreateNodesContextV2, CreateNodesV2 } from '@nx/devkit'

import { createNodesFromFiles, readJsonFile } from '@nx/devkit'
import { existsSync } from 'fs'
import { dirname, join } from 'path'

export type MyPluginOptions = unknown

export const createNodesV2: CreateNodesV2<MyPluginOptions> = [
  '**/tsconfig{.spec,}.json',
  async (configFiles, options, context) => {
    return await createNodesFromFiles(
      (configFile, nodeOptions, nodeContext) =>
        createNodesInternal(configFile, nodeOptions, nodeContext),
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
  // Create targets based on which files exist
  // eslint-disable-next-line @typescript-eslint/no-restricted-types, @typescript-eslint/no-explicit-any
  const targets: Record<string, any> = {}

  if (hasTsconfig) {
    targets['tsc-check'] = {
      cache: true,
      command: `tsc -p ${tsconfigPath} --noEmit --incremental --tsBuildInfoFile /dev/null`,
    }
  }

  if (hasTsconfigSpec) {
    targets['tsc-check:spec'] = {
      cache: true,
      command: `tsc -p ${tsconfigSpecPath} --noEmit --incremental --tsBuildInfoFile /dev/null`,
    }
  }

  // Only return if we have at least one target
  if (Object.keys(targets).length === 0) {
    return {}
  }

  return {
    projects: {
      [projectRoot]: {
        targets,
      },
    },
  }
}
