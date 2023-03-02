import type {
  ResourceFragment,
  ResourceWhere,
} from '@codelab/shared/abstract/codegen'
import type { IBaseRepository } from '../../service'
import type { IResource } from './resource.model.interface'

export type IResourceRepository = IBaseRepository<
  IResource,
  ResourceFragment,
  ResourceWhere
>
