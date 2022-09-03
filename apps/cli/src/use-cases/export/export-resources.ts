import { ResourceOGM, resourceSelectionSet } from '@codelab/backend'
import { IResourceExport } from '@codelab/shared/abstract/core'

export const exportResources = async (): Promise<Array<IResourceExport>> => {
  const Store = await ResourceOGM()

  return await Store.find({
    selectionSet: resourceSelectionSet,
  })
}
