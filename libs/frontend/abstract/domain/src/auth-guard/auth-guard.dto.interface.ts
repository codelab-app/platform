import type {
  IAuthGuardDto,
  IResourceFetchConfig,
} from '@codelab/shared/abstract/core'

export type ICreateAuthGuardData = Omit<IAuthGuardDto, 'config'> & {
  config: {
    id: string
    data: IResourceFetchConfig
  }
}

export type IUpdateAuthGuardData = ICreateAuthGuardData
