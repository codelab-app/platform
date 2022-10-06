import type { IPageDTO } from '@codelab/frontend/abstract/core'
import { IPage } from '@codelab/frontend/abstract/core'
import { ElementTreeService } from '@codelab/frontend/domain/element'
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
    name: prop<string>().withSetter(),
    slug: prop<string>(),
    rootElement: prop<IEntity>(),
  })
  implements IPage
{
  @computed
  get toJson() {
    return {
      [this.name]: {
        id: this.id,
        name: this.name,
        slug: this.slug,
        url: `apps/${this.app.id}/pages/${this.id}`,
      },
    }
  }

  @modelAction
  writeCache(page: IPageDTO) {
    this.setName(page.name)
    this.rootElement = page.rootElement
    this.app = page.app

    return this
  }

  static hydrate = hydrate
}
