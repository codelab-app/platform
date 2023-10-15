import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IResourceDTO, IResourceType } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IGraphQLActionConfig, IRestActionConfig } from '../action'
import type { IModel } from '../model.interface'
import type { IPropModel } from '../prop'

interface IBaseResourceClient<IActionConfig> {
  fetch(config: IActionConfig): Promise<unknown>
}

export type IResourceGraphqlClient = IBaseResourceClient<IGraphQLActionConfig>

export type IResourceRestClient = IBaseResourceClient<IRestActionConfig>

export type IResourceClient = IResourceGraphqlClient | IResourceRestClient

export interface IResourceModel
  extends Omit<
      IModel<ResourceCreateInput, ResourceUpdateInput, void>,
      'toDeleteInput'
    >,
    ICacheService<IResourceDTO, IResourceModel> {
  client: IResourceClient
  // TODO: should add typing to prop
  config: Ref<IPropModel>
  id: string
  name: string
  type: IResourceType
}

export type IResourceRef = string
