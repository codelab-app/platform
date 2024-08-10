import type {
  ICreateRedirectData,
  IRedirectModel,
  IRedirectRef,
  IUpdateRedirectData,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { RedirectOptions, RedirectWhere } from '@codelab/shared/infra/gql'
import type { ICRUDService, IQueryService } from '../services'

export interface IRedirectService
  extends ICRUDService<
      IRedirectModel,
      ICreateRedirectData,
      IUpdateRedirectData
    >,
    IQueryService<IRedirectModel, RedirectWhere, RedirectOptions> {
  // createForm: IEntityFormService<
  //   Ref<IPageModel>,
  //   { selectedPage: Ref<IPageModel> }
  // >
  // redirectDomainService: IRedirectDomainService
  redirectList: Array<IRedirectModel>

  redirect(redirect: IRedirectRef): Maybe<IRedirectModel>
}
