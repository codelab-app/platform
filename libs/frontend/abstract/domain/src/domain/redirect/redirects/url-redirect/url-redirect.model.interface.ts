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
    IModel<
      UrlRedirectCreateInput,
      UrlRedirectUpdateInput,
      UrlRedirectCreateInput
    > {
  kind: IRedirectKind.Url
  url: string
}
