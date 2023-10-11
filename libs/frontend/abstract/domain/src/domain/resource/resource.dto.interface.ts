import type {
  IResourceConfigData,
  IResourceDTO,
} from '@codelab/shared/abstract/core'

export type ICreateResourceData = Omit<IResourceDTO, 'config'> & {
  config: IResourceConfigData
}

export type IUpdateResourceData = ICreateResourceData
