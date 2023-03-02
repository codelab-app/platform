import type {
  ResourceCreateInput,
  ResourceUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IResourceType } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IProp } from '../prop'
import type { IOwnerSchema } from '../user'
import type { IResourceDTO } from './resource.dto.interface'

export interface IResource
  extends ICacheService<IResourceDTO, IResource>,
    IOwnerSchema {
  id: string
  name: string
  config: Ref<IProp>
  type: IResourceType
  toCreateInput(): ResourceCreateInput
  toUpdateInput(): ResourceUpdateInput
}

export type IResourceRef = string
