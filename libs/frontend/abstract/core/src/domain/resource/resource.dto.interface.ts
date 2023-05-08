import type { IOwner, IResourceType } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export interface IBaseResourceConfigData {
  headers: string
  url: string
}

export interface IResourceDTO extends IOwner {
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
