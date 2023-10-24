import type {
  UrlRedirectCreateInput,
  UrlRedirectUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IRedirectKind,
  IUrlRedirectDTO,
} from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../../service'
import type { IModel } from '../../../model.interface'
import type { IBaseRedirect } from '../../base-redirect.interface'

export interface IUrlRedirectModel
  extends IBaseRedirect,
    ICacheService<IUrlRedirectDTO, IUrlRedirectModel>,
    Omit<
      IModel<UrlRedirectCreateInput, UrlRedirectUpdateInput, unknown>,
      'toUpdateInput'
    > {
  kind: IRedirectKind.UrlRedirect
  url: string
}
