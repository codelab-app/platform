import type {
  IApp,
  IAuth0Owner,
  IPage,
  IStore,
} from '@codelab/frontend/abstract/core'
import { getTypeService } from '@codelab/frontend/domain/type'
import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
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

@model('@codelab/App')
export class App
  extends Model({
    id: idProp,
    owner: prop<IAuth0Owner>(),
    name: prop<string>().withSetter(),
    store: prop<Ref<IStore>>(),
    pages: prop<Array<Ref<IPage>>>(() => []),
  })
  implements IApp
{
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
      owner: connectAuth0Owner(this.owner.auth0Id),
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
