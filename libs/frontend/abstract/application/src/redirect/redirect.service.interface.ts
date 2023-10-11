import type {
  RedirectOptions,
  RedirectWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRedirectDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IQueryService,
} from '../services'
import {
  ICreateRedirectData,
  IPageModel,
  IRedirectModel,
  IRedirectRef,
  IUpdateRedirectData,
} from '@codelab/frontend/abstract/domain'

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
  createForm: IEntityFormService<Ref<IPageModel>, { selectedPage: IPageModel }>
  redirectList: Array<IRedirectModel>
  add(redirect: IRedirectDTO): IRedirectModel
  redirect(redirect: IRedirectRef): Maybe<IRedirectModel>
}
