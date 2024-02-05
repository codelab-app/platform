import type {
  IAuthGuardDomainService,
  IAuthGuardModel,
  IAuthGuardRef,
  ICreateAuthGuardData,
  IUpdateAuthGuardData,
} from '@codelab/frontend/abstract/domain'
import type {
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/abstract/codegen'
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
  authGuardDomainService: IAuthGuardDomainService
  authGuardList: Array<IAuthGuardModel>

  authGuard(authGuard: IAuthGuardRef): Maybe<IAuthGuardModel>
  getSelectAuthGuardOptions(): Promise<Array<DefaultOptionType>>
}
