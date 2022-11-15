import { IResourceType } from '@codelab/shared/abstract/core'
import { ICacheService } from '../../service'
import { IProp } from '../prop'
import { IGraphQLResourceConfig } from './graphql-resource-config.interface'
import { IResourceDTO } from './resource.dto.interface'
import { IRestResourceConfig } from './rest-resource-config.interface'

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
