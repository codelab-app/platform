import type {
  IPageDomainService,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { IPageDto } from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { ObjectMap } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
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
  @computed
  get pagesList() {
    return [...this.pages.values()]
  }

  @modelAction
  hydrate(pageDto: IPageDto) {
    const existingPage = this.pages.get(pageDto.id)

    if (existingPage) {
      return existingPage.writeCache(pageDto)
    } else {
      const page: IPageModel = Page.create(pageDto)

      this.pages.set(page.id, page)

      return page
    }
  }

  findBySlug(slug: string) {
    const found = this.pagesList.find((page) => page.slug === slug)

    assertIsDefined(found)

    return found
  }
}
