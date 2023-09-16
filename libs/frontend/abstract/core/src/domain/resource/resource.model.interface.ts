import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IResourceDTO, IResourceType } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { IProp } from '../prop'

export interface IResourceModel
  extends Omit<
      IModel<ResourceCreateInput, ResourceUpdateInput, void>,
      'toDeleteInput'
    >,
    ICacheService<IResourceDTO, IResourceModel> {
  // TODO: should add typing to prop
  config: Ref<IProp>
  id: string
  name: string
  type: IResourceType
}

export type IResourceRef = string
