import type { IApp, IPage, IStore } from '@codelab/frontend/abstract/core'
import { IAppDTO } from '@codelab/frontend/abstract/core'
import { pageRef } from '@codelab/frontend/domain/page'
import { storeRef } from '@codelab/frontend/domain/store'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const hydrate = (app: IAppDTO) => {
  const store = storeRef(app.store.id)

  return new App({
    id: app.id,
    name: app.name,
    slug: app.slug,
    ownerId: app.owner.id,
    store,
    pages: app.pages.map((page) => pageRef(page.id)),
  })
}

@model('@codelab/App')
export class App
  extends Model({
    id: idProp,
    ownerId: prop<string>(),
    name: prop<string>().withSetter(),
    slug: prop<string>(),
    store: prop<Ref<IStore>>(),
    pages: prop<Array<Ref<IPage>>>(() => []),
  })
  implements IApp
{
  static hydrate = hydrate

  @computed
  get toJson() {
    return {
      [this.slug]: {
        id: this.id,
        name: this.name,
        slug: this.slug,
        pages: this.pages.map((p) => p.current.toJson).reduce(merge, {}),
      },
    }
  }

  @modelAction
  public writeCache(data: IAppDTO) {
    this.id = data.id
    this.ownerId = data.owner.id
    this.setName(data.name)
    this.slug = data.slug
    this.store = storeRef(data.store.id)
    this.pages = data.pages.map((page) => pageRef(page.id))

    return this
  }
}

export const appRef = rootRef<IApp>('@codelab/AppRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
