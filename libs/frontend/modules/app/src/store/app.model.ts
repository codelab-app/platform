import { ElementTreeService } from '@codelab/frontend/modules/element'
import { pageRef } from '@codelab/frontend/modules/page'
import { IApp, IAppDTO, IPage } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import {
  detach,
  ExtendedModel,
  idProp,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'

const hydrate = (app: IAppDTO) => {
  return new App({
    id: app.id,
    name: app.name,
    slug: app.slug,
    ownerId: app.owner?.id,
    store: { id: app.store.id },
    pages: app.pages.map((page) => pageRef(page.id)),
  })
}

@model('@codelab/App')
export class App
  extends ExtendedModel(ElementTreeService, {
    id: idProp,
    ownerId: prop<string>(),
    name: prop<string>().withSetter(),
    slug: prop<string>(),
    store: prop<IEntity>(),
    pages: prop<Array<Ref<IPage>>>(() => []),
  })
  implements IApp
{
  static hydrate = hydrate

  @modelAction
  public writeCache(data: IAppDTO): IApp {
    this.id = data.id
    this.ownerId = data.owner?.id
    this.setName(data.name)
    this.slug = data.slug
    this.store.id = data.store.id
    this.pages = data.pages.map((page) => pageRef(page.id))

    return this
  }
}

export const appRef = rootRef<App>('@codelab/AppRef', {
  onResolvedValueChange(ref, newApp, oldApp) {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
