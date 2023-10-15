import type {
  AuthGuardCreateInput,
  AuthGuardDeleteInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { IResourceModel } from '../resource'

export interface IAuthGuardModel
  extends IModel<
      AuthGuardCreateInput,
      AuthGuardUpdateInput,
      AuthGuardDeleteInput
    >,
    ICacheService<IAuthGuardDTO, IAuthGuardModel> {
  id: string
  name: string
  resource: Nullable<Ref<IResourceModel>>
}

export type IAuthGuardRef = string
