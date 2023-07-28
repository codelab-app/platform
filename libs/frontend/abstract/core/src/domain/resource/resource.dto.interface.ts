import type {
  IAuth0Owner,
  IResourceDTO,
  IResourceType,
} from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export interface IBaseResourceConfigData {
  headers: string
  url: string
}

export type ICreateResourceData = Omit<IResourceDTO, 'config'> & {
  config: IBaseResourceConfigData
}

export type IUpdateResourceData = ICreateResourceData
