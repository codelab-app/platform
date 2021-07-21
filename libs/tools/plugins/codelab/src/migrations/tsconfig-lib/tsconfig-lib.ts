/* eslint-disable @typescript-eslint/no-unused-vars */
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

export default async function update(host: Tree) {
  const projects = getProjects(host)

  projects.forEach(({ targets, root, projectType }, projectName) => {
    const tsConfigExt = projectType === 'library' ? 'lib' : 'app'

    const paths = {
      tsConfig: joinPathFragments(root, `tsconfig.${tsConfigExt}.json`),
    }

    if (!existsSync(paths.tsConfig)) {
      return
    }

    // console.log(paths)

    const tsConfig = readJson<TsConfig>(host, paths.tsConfig)

    // console.log(tsConfig)

    tsConfig.compilerOptions.esModuleInterop = true
    tsConfig.compilerOptions.strict = true
    tsConfig.compilerOptions.noImplicitReturns = true
    tsConfig.compilerOptions.noFallthroughCasesInSwitch = true

    writeJson(host, paths.tsConfig, tsConfig)
  })

  // Format not working right now
  await formatFiles(host)
  // return chain([formatFiles()])
}
