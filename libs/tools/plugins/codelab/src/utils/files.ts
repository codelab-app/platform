// export const dirExists = (tree: Tree, path: string) => {
//   return tree.getDir(path).subfiles.length > 0
// }

export const dryRunMode = Boolean(
  process.env.NODE_ENV === 'test' || process.env.CI,
)

// export const removeFiles = (filesToRemove: Array<string>): Rule => {
//   return (tree: Tree) => {
//     filesToRemove.forEach((file: any) => {
//       if (tree.exists(file)) {
//         tree.delete(file)
//       }
//     })
//   }
// }

export interface BaseNormalizedSchema {
  projectName: string
  projectRoot: string
  projectDirectory: string
  parsedTags: Array<string>
}
