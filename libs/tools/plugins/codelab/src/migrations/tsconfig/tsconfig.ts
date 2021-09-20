import {
  formatFiles,
  getProjects,
  joinPathFragments,
  readJson,
  Tree,
  writeJson,
} from '@nrwl/devkit'
import { TsConfig } from '@nrwl/storybook/src/utils/utilities'
// import { formatFiles } from '@nrwl/workspace'
import { existsSync } from 'fs'
import { merge } from 'lodash'

/**
 * Append some tsconfig too our libs & apps
 */
export default async function update(host: Tree) {
  const projects = getProjects(host)

  projects.forEach(({ root, projectType }) => {
    const tsConfigExt = projectType === 'library' ? 'lib' : 'app'

    const paths = {
      tsConfig: joinPathFragments(root, `tsconfig.${tsConfigExt}.json`),
      jestTsConfig: joinPathFragments(root, `tsconfig.spec.json`),
    }

    const options = {
      compilerOptions: {
        esModuleInterop: true,
        strict: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
      },
    }

    if (existsSync(paths.tsConfig)) {
      const tsConfig = readJson<TsConfig>(host, paths.tsConfig)
      writeJson(host, paths.tsConfig, merge(tsConfig, options))
    }

    if (existsSync(paths.jestTsConfig)) {
      const jestTsConfig = readJson<TsConfig>(host, paths.jestTsConfig)
      writeJson(host, paths.jestTsConfig, merge(jestTsConfig, options))
    }
  })

  // Format not working right now
  await formatFiles(host)
}
