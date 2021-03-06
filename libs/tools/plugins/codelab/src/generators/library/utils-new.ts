import { Tree } from '@nrwl/devkit'

export const removeFiles = (host: Tree, filesToRemove: Array<string>) => {
  filesToRemove.forEach((file: any) => {
    if (host.exists(file)) {
      host.delete(file)
    }
  })
}
