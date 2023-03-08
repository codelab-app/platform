import type {
  IApp,
  IAppDTO,
  IAuth0Owner,
  IPage,
  IStore,
} from '@codelab/frontend/abstract/core'
import { pageRef } from '@codelab/frontend/domain/page'
import { deleteStoreInput, storeRef } from '@codelab/frontend/domain/store'
import { getTypeService } from '@codelab/frontend/domain/type'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import slugify from 'voca/slugify'

const create = ({ id, name, owner, pages, store }: IAppDTO) => {
  const app = new App({
    id,
    name,
    owner,
    pages: pages?.map((page) => pageRef(page.id)),
    store: storeRef(store.id),
  })

  return app
}

@model('@codelab/App')
export class App
  extends Model({
    id: idProp,
    name: prop<string>().withSetter(),
    owner: prop<IAuth0Owner>(),
    pages: prop<Array<Ref<IPage>>>(() => []),
    // slug: prop<string>().withSetter(),
    store: prop<Ref<IStore>>(),
  })
  implements IApp
{
  @computed
  get slug() {
    return slugify(this.name)
  }

  @modelAction
  static create = create

  /**
   * For cache writing, we don't write dto for nested models. We only write the ref. The top most use case calling function is responsible for properly hydrating the data.
   */
  @modelAction
  writeCache({ id, name, store, pages }: Partial<IAppDTO>) {
    this.id = id ?? this.id
    this.name = name ?? this.name
    this.store = store ? storeRef(store.id) : this.store
    this.pages = pages ? pages.map((page) => pageRef(page.id)) : this.pages

    return this
  }

  @computed
  get pageRootElements() {
    return this.pages.map((page) => page.current.rootElement)
  }

  @computed
  get providerPage() {
    const providerPage = this.pages.find(
      (page) => page.current.kind === IPageKind.Provider,
    )?.current

    if (!providerPage) {
      throw new Error('ProviderPage is required')
    }

    return providerPage
  }

  @computed
  get toJson() {
    return {
      [this.slug]: {
        id: this.id,
        name: this.name,
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
    )?.maybeCurrent

    if (!currentPage) {
      throw new Error('Missing page')
    }

    return currentPage
  }

  toCreateInput(): AppCreateInput {
    return {
      _compoundName: createUniqueName(this.name, this.owner.auth0Id),
      id: this.id,
      owner: connectAuth0Owner(this.owner),
      pages: {
        create: this.pages.map((page) => ({
          node: page.current.toCreateInput(),
        })),
      },
      store: {
        create: {
          node: this.store.current.toCreateInput(),
        },
      },
    }
  }

  toUpdateInput(): AppUpdateInput {
    return {
      _compoundName: createUniqueName(this.name, this.owner.auth0Id),
    }
  }

  toDeleteInput(): AppDeleteInput {
    return {
      pages: [
        {
          delete: {},
          where: {},
        },
      ],
      store: {
        delete: deleteStoreInput,
        where: {},
      },
    }
  }
}
