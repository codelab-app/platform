import type {
  AuthGuardCreateInput,
  AuthGuardDeleteInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IModel } from '../model.interface'
import type { IPropModel } from '../prop'
import type { IResourceModel } from '../resource'

export interface IAuthGuardModel
  extends IModel<
      AuthGuardCreateInput,
      AuthGuardUpdateInput,
      AuthGuardDeleteInput
    >,
    ICacheService<IAuthGuardDTO, IAuthGuardModel> {
  config: Ref<IPropModel>
  id: string
  name: string
  resource: Ref<IResourceModel>
}

export type IAuthGuardRef = string
