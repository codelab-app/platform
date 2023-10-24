import type {
  IPageDomainService,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { IPageDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { Page } from '../store'
import { PageDomainFactory } from './page.domain.factory'

@model('@codelab/PageDomainService')
export class PageDomainService
  extends Model({
    pageFactory: prop(() => new PageDomainFactory({})),
    pages: prop<ObjectMap<IPageModel>>(() => objectMap()),
  })
  implements IPageDomainService
{
  @modelAction
  hydrate(pageDto: IPageDTO) {
    const existingPage = this.pages.get(pageDto.id)

    if (existingPage) {
      return existingPage.writeCache(pageDto)
    } else {
      const page: IPageModel = Page.create(pageDto)

      this.pages.set(page.id, page)

      return page
    }
  }
}
