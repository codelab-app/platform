import type {
  ICreateRedirectData,
  IPageModel,
  IRedirectModel,
  IRedirectRef,
  IUpdateRedirectData,
} from '@codelab/frontend/abstract/domain'
import type {
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRedirectDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IQueryService,
} from '../services'

export interface IRedirectService
  extends ICRUDService<
      IRedirectModel,
      ICreateRedirectData,
      IUpdateRedirectData
    >,
    IQueryService<IRedirectModel, RedirectWhere, RedirectOptions>,
    Omit<
      ICRUDFormService<Ref<IRedirectModel>, { redirect: IRedirectModel }>,
      'createForm'
    >,
    Pick<
      ICRUDModalService<Ref<IRedirectModel>, { redirect: IRedirectModel }>,
      'deleteModal'
    > {
  createForm: IEntityFormService<
    Ref<IPageModel>,
    { selectedPage: Ref<IPageModel> }
  >
  redirectList: Array<IRedirectModel>
  add(redirect: IRedirectDTO): IRedirectModel
  redirect(redirect: IRedirectRef): Maybe<IRedirectModel>
}
