import type { Overwrite } from 'utility-types'
import type { IResourceDto } from './resource.dto.interface'
import type { IResourceConfigData } from './resource-config'

export type ICreateResourceData = Overwrite<
  IResourceDto,
  {
    config: IResourceConfigData
  }
>

export type IUpdateResourceData = ICreateResourceData
