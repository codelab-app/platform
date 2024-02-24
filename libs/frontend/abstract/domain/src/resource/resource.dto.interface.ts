import type {
  IResourceConfigData,
  IResourceDto,
} from '@codelab/shared/abstract/core'

export type ICreateResourceData = Omit<IResourceDto, 'config'> & {
  config: IResourceConfigData
}

export type IUpdateResourceData = ICreateResourceData
