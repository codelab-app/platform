import type {
  IPageDomainService,
  IPageModel,
} from '@codelab/frontend-abstract-domain'
import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { ObjectMap } from 'mobx-keystone'

import { type IPageDto, IPageKind } from '@codelab/shared-abstract-core'
import { Validator } from '@codelab/shared-infra-typebox'
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

  getSelectOptions(): Array<SelectOption> {
    return this.pagesList
      .filter((page) => page.kind === IPageKind.Regular)
      .map((page) => ({
        label: page.name,
        value: page.id,
      }))
  }

  @modelAction
  hydrate(pageDto: IPageDto) {
    const page: IPageModel = Page.create(pageDto)

    this.pages.set(page.id, page)

    return page
  }

  page(id: string) {
    const page = this.pages.get(id)

    Validator.assertsDefined(page)

    return page
  }
}
