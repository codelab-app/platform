// eslint-disable-next-line @nx/enforce-module-boundaries
import type { ObjectLike } from '@codelab/shared/abstract/types'
import { type ProjectConfiguration, type Tree, updateJson } from '@nx/devkit'
import { entries, filter, fromEntries, pipe } from 'remeda'

export const sortKeys = (object: ObjectLike): ObjectLike =>
  Object.fromEntries(Object.entries(object).sort())

/**
 *
 * @param project
 * @param relativePathFromProjectSourceRoot `services` in `src/services` or `use-cases/create-app` in ` in `src/uses-cases/create-app`
 * @returns
 */
export const getModuleAlias = (
  project: ProjectConfiguration,
  relativePathFromProjectSourceRoot: string,
) => {
  return `@codelab/${project.name}/${relativePathFromProjectSourceRoot}`
}

export const appendTsconfigPath = (
  tree: Tree,
  project: ProjectConfiguration,
  moduleAlias: string,
  targetPath: string,
) => {
  const sourceRoot = project.sourceRoot

  if (!sourceRoot) {
    return
  }

  updateJson(tree, 'tsconfig.base.json', (json) => {
    console.log('Appending path', {
      [moduleAlias]: [targetPath],
    })

    const paths = json.compilerOptions.paths ?? {}

    Object.assign(paths, {
      [moduleAlias]: [targetPath],
    })

    json.compilerOptions.paths = sortKeys(paths)

    return json
  })
}

export const removeTsconfigPath = (tree: Tree, moduleAlias: string) => {
  updateJson(tree, 'tsconfig.base.json', (json) => {
    const paths = json.compilerOptions.paths ?? {}

    const updatedPaths = pipe(
      Object.entries<[string, unknown]>(paths),
      filter(([key]) => key !== moduleAlias),
      fromEntries,
    )

    json.compilerOptions.paths = updatedPaths

    return json
  })
}
