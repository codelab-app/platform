import type { IResourceType } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IProp, IPropData } from '../prop'
import type { IAuth0Owner } from '../user'
import type { IGraphQLResourceConfigDTO } from './graphql-resource-config.interface'
import type { IResourceDTO } from './resource.dto.interface'
import type { IRestResourceConfigDTO } from './rest-resource-config.interface'

export type IResourceConfig = IProp

export interface IResource extends ICacheService<IResourceDTO, IResource> {
  id: string
  name: string
  config: Ref<IProp>
  type: IResourceType
}

export type IResourceRef = string
