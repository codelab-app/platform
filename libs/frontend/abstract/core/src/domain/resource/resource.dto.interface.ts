import type { IResourceType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'

export interface IBaseResourceConfigData {
  headers: string
  url: string
}

export interface IResourceDTO extends IOwnerSchema {
  // ref to prop of IResourceConfigData
  config: IEntity
  id: string
  name: string
  type: IResourceType
}

export type ICreateResourceData = Omit<IResourceDTO, 'config'> & {
  config: IBaseResourceConfigData
}

export type IUpdateResourceData = ICreateResourceData
