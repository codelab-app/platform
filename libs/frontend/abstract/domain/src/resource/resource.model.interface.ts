import type {
  IResource,
  IResourceClient,
  IResourceDto,
  IResourceType,
} from '@codelab/shared/abstract/core'
import type {
  DeleteResourcesMutationVariables,
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/infra/gql'
import type { IPropModel } from '../prop'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'

export interface IResourceModel
  extends IModel<
      ResourceCreateInput,
      ResourceUpdateInput,
      DeleteResourcesMutationVariables,
      IResource
    >,
    ICacheService<IResourceDto, IResourceModel> {
  client: IResourceClient
  config: IPropModel
  id: string
  name: string
  type: IResourceType
}

export type IResourceRef = string
