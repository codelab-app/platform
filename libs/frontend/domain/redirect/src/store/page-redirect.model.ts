import type {
  IPageModel,
  IPageRedirectModel,
} from '@codelab/frontend/abstract/domain'
import { pageRef } from '@codelab/frontend/abstract/domain'
import type {
  PageRedirectCreateInput,
  PageRedirectUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IPageRedirectDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import { createBaseRedirect } from './base-redirect.model'

const create = ({ id, page }: IPageRedirectDTO) =>
  new PageRedirect({
    id,
    kind: IRedirectKind.Page,
    page: pageRef(page.id),
  })

@model('@codelab/PageRedirect')
export class PageRedirect
  extends ExtendedModel(createBaseRedirect(IRedirectKind.Page), {
    page: prop<Ref<IPageModel>>(),
  })
  implements IPageRedirectModel
{
  static create = create

  @modelAction
  writeCache({ page }: Partial<IPageRedirectDTO>) {
    this.page = page ? pageRef(page.id) : this.page

    return this
  }

  toCreateInput(): PageRedirectCreateInput {
    return {
      id: this.id,
      page: connectNodeId(this.page.id),
    }
  }

  toUpdateInput(): PageRedirectUpdateInput {
    return {
      page: reconnectNodeId(this.page.id),
    }
  }
}
