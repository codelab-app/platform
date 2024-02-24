import type {
  ResourceCreateInput,
  ResourceDeleteInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IResource,
  IResourceClient,
  IResourceDto,
  IResourceType,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IPropModel } from '../prop'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'

export interface IResourceModel
  extends Omit<
      IModel<
        ResourceCreateInput,
        ResourceUpdateInput,
        ResourceDeleteInput,
        IResource
      >,
      'toDeleteInput'
    >,
    ICacheService<IResourceDto, IResourceModel> {
  client: IResourceClient
  config: IPropModel
  id: string
  name: string
  type: IResourceType
}

export type IResourceRef = string
