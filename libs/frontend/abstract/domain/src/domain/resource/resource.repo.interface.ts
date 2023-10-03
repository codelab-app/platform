import type {
  ResourceFragment,
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IResourceModel } from './resource.model.interface'

export type IResourceRepository = IRepository<
  IResourceModel,
  ResourceFragment,
  ResourceWhere,
  ResourceOptions
>
