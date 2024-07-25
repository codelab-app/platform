import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { resourceApi } from './resource.api'

export const createResourcesRepository = async (resource: IResourceModel) => {
  await resourceApi.CreateResources({ input: resource.toCreateInput() })
}
