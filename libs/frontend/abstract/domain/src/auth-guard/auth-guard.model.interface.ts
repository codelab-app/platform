import type { IAuthGuard, IAuthGuardDto } from '@codelab/shared/abstract/core'
import type {
  AuthGuardCreateInput,
  AuthGuardDeleteInput,
  AuthGuardUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { IPropModel } from '../prop'
import type { IResourceModel } from '../resource'
import type { IModel } from '../shared'

export interface IAuthGuardModel extends IModel<IAuthGuard, IAuthGuardModel> {
  config: IPropModel
  id: string
  name: string
  resource: Ref<IResourceModel>
  responseTransformer: string
}

export type IAuthGuardRef = string
