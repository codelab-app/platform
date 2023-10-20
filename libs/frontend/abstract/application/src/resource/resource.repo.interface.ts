import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import type {
  ResourceFragment,
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type IResourceRepository = IRepository<
  IResourceModel,
  ResourceFragment,
  ResourceWhere,
  ResourceOptions
>
