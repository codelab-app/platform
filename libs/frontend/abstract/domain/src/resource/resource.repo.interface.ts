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
  ResourceCreateInput,
  ResourceUpdateInput,
  ResourceDeleteInput,
  ResourceFragment,
  ResourceWhere,
  ResourceOptions
>
