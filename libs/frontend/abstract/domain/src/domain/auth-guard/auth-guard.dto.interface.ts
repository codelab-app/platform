import type {
  IAuthGuardDTO,
  IResourceFetchConfig,
} from '@codelab/shared/abstract/core'

export type ICreateAuthGuardData = Omit<IAuthGuardDTO, 'config'> & {
  config: {
    id: string
    data: IResourceFetchConfig
  }
}

export type IUpdateAuthGuardData = ICreateAuthGuardData
