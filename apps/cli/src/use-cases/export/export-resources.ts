import type { IResourceExport } from '@codelab/backend/abstract/core'
import {
  Repository,
  resourceSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'

export const exportResources = async (): Promise<Array<IResourceExport>> => {
  const Resource = await Repository.instance.Resource

  return await Resource.find({
    selectionSet: resourceSelectionSet,
  })
}
