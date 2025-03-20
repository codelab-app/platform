import { type ProjectConfiguration, type Tree, updateJson } from '@nx/devkit'

export const sortKeys = (object: object): object =>
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

    // Replace hold alias with new
    paths[moduleAlias] = [targetPath]

    json.compilerOptions.paths = sortKeys(paths)

    return json
  })
}

export const removeTsconfigPath = (tree: Tree, moduleAlias: string) => {
  updateJson(tree, 'tsconfig.base.json', (json) => {
    const paths = json.compilerOptions.paths ?? {}

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete json.compilerOptions.paths[moduleAlias]

    json.compilerOptions.paths = paths

    return json
  })
}
