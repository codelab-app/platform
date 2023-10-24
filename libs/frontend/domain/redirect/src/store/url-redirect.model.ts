import type { IUrlRedirectModel } from '@codelab/frontend/abstract/domain'
import { UrlRedirectCreateInput } from '@codelab/shared/abstract/codegen'
import type { IUrlRedirectDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseRedirect } from './base-redirect.model'

const create = ({ id, url }: IUrlRedirectDTO) =>
  new UrlRedirect({
    id,
    kind: IRedirectKind.UrlRedirect,
    url,
  })

@model('@urllab/UrlRedirect')
export class UrlRedirect
  extends ExtendedModel(createBaseRedirect(IRedirectKind.UrlRedirect), {
    url: prop<string>(),
  })
  implements IUrlRedirectModel
{
  static create = create

  @modelAction
  toCreateInput(): UrlRedirectCreateInput {
    return {
      id: this.id,
      url: this.url,
    }
  }

  @modelAction
  writeCache({ url }: Partial<IUrlRedirectDTO>) {
    this.url = url ?? this.url

    return this
  }
}
