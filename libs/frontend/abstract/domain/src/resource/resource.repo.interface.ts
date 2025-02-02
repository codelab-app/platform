import type { IResourceDto } from '@codelab/shared/abstract/core'
import type {
  ResourceFragment,
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared/infra/gqlgen'

import type { IRepository } from '../shared'

export type IResourceRepository = IRepository<
  IResourceDto,
  ResourceFragment,
  ResourceWhere,
  ResourceOptions
>
