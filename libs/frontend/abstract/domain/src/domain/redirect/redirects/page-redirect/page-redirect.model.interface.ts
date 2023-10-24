import type {
  PageRedirectCreateInput,
  PageRedirectDeleteInput,
  PageRedirectUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IPageRedirectDTO,
  IRedirectKind,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../../../service'
import type { IModel } from '../../../model.interface'
import type { IPageModel } from '../../../page'
import type { IBaseRedirect } from '../../base-redirect.interface'

export interface IPageRedirectModel
  extends IBaseRedirect,
    ICacheService<IPageRedirectDTO, IPageRedirectModel>,
    Omit<
      IModel<
        PageRedirectCreateInput,
        PageRedirectUpdateInput,
        PageRedirectDeleteInput
      >,
      'toUpdateInput'
    > {
  kind: IRedirectKind.PageRedirect
  page: Ref<IPageModel>
}
