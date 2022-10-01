import {
  Repository,
  resourceSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { IResourceExport } from '@codelab/shared/abstract/core'

export const exportResources = async (): Promise<Array<IResourceExport>> => {
  const Resource = await Repository.instance.Resource

  return await Resource.find({
    selectionSet: resourceSelectionSet,
  })
}
