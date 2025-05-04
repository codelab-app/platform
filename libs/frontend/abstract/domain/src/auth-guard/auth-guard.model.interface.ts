import type { IAuthGuardDto } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

import type { IPropModel } from '../prop'
import type { IResourceModel } from '../resource'
import type { IModel } from '../shared'
import type { IUserModel } from '../user'

export interface IAuthGuardModel
  extends IModel<IAuthGuardDto, IAuthGuardModel> {
  config: IPropModel
  id: string
  name: string
  owner: Ref<IUserModel>
  resource: Ref<IResourceModel>
  responseTransformer: string
}

export type IAuthGuardRef = string
