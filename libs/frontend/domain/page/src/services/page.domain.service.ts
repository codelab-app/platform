import type {
  IPageDomainService,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { ObjectMap } from 'mobx-keystone'

import { IPageDto } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { Page } from '../store'

@model('@codelab/PageDomainService')
export class PageDomainService
  extends Model({
    pages: prop<ObjectMap<IPageModel>>(() => objectMap()),
  })
  implements IPageDomainService
{
  @computed
  get pagesList() {
    return [...this.pages.values()]
  }

  @modelAction
  hydrate(pageDto: IPageDto) {
    const page: IPageModel = Page.create(pageDto)

    this.pages.set(page.id, page)

    return page
  }

  findById(id: string) {
    const found = this.pages.get(id)

    Validator.assertsDefined(found)

    return found
  }
}
