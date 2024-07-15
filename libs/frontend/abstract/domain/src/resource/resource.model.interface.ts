import type { DeleteResourcesMutationVariables } from '@codelab/frontend/infra/gql'
import type {
  ResourceCreateInput,
  ResourceDeleteInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IPropData,
  IResource,
  IResourceClient,
  IResourceConfigData,
  IResourceDto,
  IResourceType,
} from '@codelab/shared/abstract/core'
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
