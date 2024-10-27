import type { IResourceDto } from '@codelab/shared/abstract/core'
import type {
  ResourceCreateInput,
  ResourceDeleteInput,
  ResourceFragment,
  ResourceOptions,
  ResourceUpdateInput,
  ResourceWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IResourceModel } from './resource.model.interface'

export type IResourceRepository = IRepository<
  IResourceDto,
  ResourceFragment,
  ResourceWhere,
  ResourceOptions
>
