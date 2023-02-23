import type { IApp, IPage, IStore } from '@codelab/frontend/abstract/core'
import { IAppDTO } from '@codelab/frontend/abstract/core'
import { Page, PageFactory, pageRef } from '@codelab/frontend/domain/page'
import { Store, storeRef } from '@codelab/frontend/domain/store'
import {
  getTypeService,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/domain/type'
import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { connectNodeId } from '@codelab/shared/domain/mapper'
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
import slugify from 'voca/slugify'

const hydrate = (app: IAppDTO) => {
  const store = storeRef(app.store.id)

  return new App({
    id: app.id,
    name: app.name,
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
    store: prop<Ref<IStore>>(),
    pages: prop<Array<Ref<IPage>>>(() => []),
  })
  implements IApp
{
  static hydrate = hydrate

  @computed
  get slug() {
    return slugify(this.name)
  }

  @computed
  get toJson() {
    return {
      [this.slug]: {
        id: this.id,
        name: this.name,
        slug: this.slug,
        pages: this.pages.map((page) => page.current.toJson).reduce(merge, {}),
      },
    }
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @modelAction
  public writeCache(data: IAppDTO) {
    this.id = data.id
    this.ownerId = data.owner.id
    this.setName(data.name)
    this.store = storeRef(data.store.id)
    this.pages = data.pages.map((page) => pageRef(page.id))

    return this
  }

  @modelAction
  page(id: string) {
    const currentPage = this.pages.find(
      (page) => page.current.id === id,
    )?.current

    if (!currentPage) {
      throw new Error('Missing page')
    }

    return currentPage
  }

  toCreateInput(): AppCreateInput {
    return {
      id: this.id,
      name: this.name,
      owner: connectNodeId(this.ownerId),
      store: {
        create: {
          node: this.store.current.toCreateInput(),
        },
      },
      pages: {
        // create: [{ node: providerPage }],
      },
    }
  }
}

export const appRef = rootRef<IApp>('@codelab/AppRef', {
  onResolvedValueChange: (ref, newApp, oldApp) => {
    if (oldApp && !newApp) {
      detach(ref)
    }
  },
})
