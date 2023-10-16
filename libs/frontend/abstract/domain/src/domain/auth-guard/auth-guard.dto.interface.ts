import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { IResourceFetchConfig } from '../resource'

export type ICreateAuthGuardData = Omit<IAuthGuardDTO, 'config'> & {
  config: {
    id: string
    data: IResourceFetchConfig
  }
}

export type IUpdateAuthGuardData = ICreateAuthGuardData
