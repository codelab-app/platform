import type {
  ResourceFragment,
  ResourceOptions,
  ResourceWhere,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { IResourceModel } from './resource.model.interface'

export type IResourceRepository = IRepository<
  IResourceModel,
  ResourceFragment,
  ResourceWhere,
  ResourceOptions
>
