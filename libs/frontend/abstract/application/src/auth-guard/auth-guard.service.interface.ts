import type {
  IAuthGuardModel,
  IAuthGuardRef,
  ICreateAuthGuardData,
  IUpdateAuthGuardData,
} from '@codelab/frontend/abstract/domain'
import type {
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/abstract/codegen'
import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../services'

export interface IAuthGuardService
  extends ICRUDService<
      IAuthGuardModel,
      ICreateAuthGuardData,
      IUpdateAuthGuardData
    >,
    IQueryService<IAuthGuardModel, AuthGuardWhere, AuthGuardOptions>,
    ICRUDModalService<Ref<IAuthGuardModel>, { authGuard: IAuthGuardModel }>,
    ICRUDFormService<Ref<IAuthGuardModel>, { authGuard: IAuthGuardModel }> {
  authGuardList: Array<IAuthGuardModel>

  add(authGuard: IAuthGuardDTO): IAuthGuardModel
  authGuard(authGuard: IAuthGuardRef): Maybe<IAuthGuardModel>
  getSelectAuthGuardOptions(): Promise<Array<DefaultOptionType>>
}
