import type {
  IAuthGuardDto,
  IResourceFetchConfig,
} from '@codelab/shared-abstract-core'

export type IAuthGuardCreateFormData = Omit<IAuthGuardDto, 'config'> & {
  config: {
    id: string
    data: IResourceFetchConfig
  }
}

export type IAuthGuardUpdateFormData = IAuthGuardCreateFormData
