import type { IResourceType } from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../service'
import type { IProp } from '../prop'
import type { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import type { IResourceDTO } from './resource.dto.interface'
import type { IRestResourceConfig } from './rest-resource-config.interface'

export type IResourceConfig = IProp<
  IGraphQLResourceConfig | IRestResourceConfig
>

export interface IResource extends ICacheService<IResourceDTO, IResource> {
  id: string
  name: string
  config: IResourceConfig
  type: IResourceType
  ownerId: string
}

export type IResourceRef = string
