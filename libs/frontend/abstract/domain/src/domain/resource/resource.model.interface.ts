import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IResourceDTO, IResourceType } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { IPropModel } from '../prop'
import type { IResourceClient } from './resource-client'

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
