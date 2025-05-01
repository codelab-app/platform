import type { CreateNodesContextV2, CreateNodesV2 } from '@nx/devkit'

import { createNodesFromFiles, readJsonFile } from '@nx/devkit'
import { existsSync } from 'fs'
import { dirname, join } from 'path'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MyPluginOptions {}

export const createNodesV2: CreateNodesV2<MyPluginOptions> = [
  '**/tsconfig.spec.json',
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

  const isProject =
    existsSync(join(projectRoot, 'project.json')) ||
    existsSync(join(projectRoot, 'package.json'))

  const hasSwc = existsSync(join(projectRoot, '.swcrc'))

  if (!isProject || !hasSwc) {
    return {}
  }

  return {
    projects: {
      [projectRoot]: {
        targets: {
          build: {
            executor: '@nx/js:swc',
            options: {
              assets: [`${projectRoot}/**/*.md`],
              main: `${projectRoot}/src/index.ts`,
              outputPath: `dist/${projectRoot}`,
              tsConfig: `${projectRoot}/tsconfig.lib.json`,
            },
            outputs: ['{options.outputPath}'],
          },
          // 'tsc-check': {
          //   cache: true,
          //   command: `tsc -p ${configFilePath}`,
          // },
        },
      },
    },
  }
}
