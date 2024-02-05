import type {
  AuthGuardCreateInput,
  AuthGuardDeleteInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAuthGuard, IAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IPropModel } from '../prop'
import type { IResourceModel } from '../resource'
import type { ICacheService, IModel } from '../shared'

export interface IAuthGuardModel
  extends IModel<
      AuthGuardCreateInput,
      AuthGuardUpdateInput,
      AuthGuardDeleteInput,
      IAuthGuard
    >,
    ICacheService<IAuthGuardDTO, IAuthGuardModel> {
  config: IPropModel
  id: string
  name: string
  resource: Ref<IResourceModel>
  responseTransformer: string
}

export type IAuthGuardRef = string
