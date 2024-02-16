import type { IResourceDto } from '@codelab/shared/abstract/core'

export interface IBaseResourceConfigData {
  headers: string
  url: string
}

export type ICreateResourceData = Omit<IResourceDto, 'config'> & {
  config: IBaseResourceConfigData
}

export type IUpdateResourceData = ICreateResourceData
