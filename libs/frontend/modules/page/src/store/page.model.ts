import { ElementTreeService } from '@codelab/frontend/modules/element'
import { getElementService } from '@codelab/frontend/presenter/container'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import { IPage } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, idProp, model, modelAction, prop } from 'mobx-keystone'

const hydrate = (page: IPageDTO) => {
  return new Page({
    id: page.id,
    name: page.name,
    slug: page.slug,
    rootElement: { id: page.rootElement.id },
    app: { id: page.app.id },
  })
}

@model('@codelab/Page')
export class Page
  extends ExtendedModel(ElementTreeService, {
    id: idProp,
    app: prop<IEntity>(),
    name: prop<string>(),
    slug: prop<string>(),
    rootElement: prop<IEntity>(),
  })
  implements IPage
{
  @computed
  get elementService() {
    return getElementService(this)
  }

  @modelAction
  updateCache(page: IPageDTO) {
    this.name = page.name
    this.rootElement = page.rootElement
    this.app = page.app
  }

  static hydrate = hydrate
}
