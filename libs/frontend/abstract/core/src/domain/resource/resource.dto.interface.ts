import type { IResourceDTO } from '@codelab/shared/abstract/core'

export interface IBaseResourceConfigData {
  headers: string
  url: string
}

export type ICreateResourceData = Omit<IResourceDTO, 'config'> & {
  config: IBaseResourceConfigData
}

export type IUpdateResourceData = ICreateResourceData
