import type { IResourceType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'

export interface IBaseResourceConfigData {
  url: string
  headers: string
}

export interface IResourceDTO extends IOwnerSchema {
  id: string
  name: string
  type: IResourceType
  // ref to prop of IResourceConfigData
  config: IEntity
}

export type ICreateResourceData = Omit<IResourceDTO, 'config'> & {
  config: IBaseResourceConfigData
}

export type IUpdateResourceData = ICreateResourceData
