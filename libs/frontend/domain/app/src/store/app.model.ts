import type {
  IApp,
  IDomain,
  IPage,
  IUser,
} from '@codelab/frontend/abstract/core'
import {
  domainRef,
  getUserService,
  pageRef,
  userRef,
} from '@codelab/frontend/abstract/core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import {
  appName,
  connectAuth0Owner,
  connectNodeId,
} from '@codelab/shared/domain/mapper'
import { createUniqueName, slugify } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ _compositeKey, domains, id, owner, pages }: IAppDTO) => {
  const app = new App({
    _compositeKey,
    domains: domains?.map((domain) => domainRef(domain.id)),
    id,
    owner: userRef(owner.auth0Id),
    pages: pages?.map((page) => pageRef(page.id)),
  })

  return app
}

@model('@codelab/App')
export class App
  extends Model({
    _compositeKey: prop<string>().withSetter(),
    domains: prop<Array<Ref<IDomain>>>(() => []),
    id: idProp,
    owner: prop<Ref<IUser>>(),
    pages: prop<Array<Ref<IPage>>>(() => []),
  })
  implements IApp
{
  @computed
  get name() {
    return appName(this)
  }

  @computed
  get slug() {
    return slugify(this.name)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }

  @modelAction
  static create = create

  /**
   * For cache writing, we don't write dto for nested models. We only write the ref. The top most use case calling function is responsible for properly hydrating the data.
   */
  @modelAction
  writeCache({ domains, id, name, pages }: Partial<IAppDTO>) {
    this.id = id ?? this.id
    this.name = name ?? this.name
    this.pages = pages ? pages.map((page) => pageRef(page.id)) : this.pages
    this.domains = domains
      ? domains.map((domain) => domainRef(domain.id))
      : this.domains

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
      _compositeKey: createUniqueName(this.name, this.userService.auth0Id),
      id: this.id,
      owner: connectAuth0Owner(this.userService.user),
      pages: {
        create: this.pages.map((page) => ({
          node: page.current.toCreateInput(),
        })),
      },
    }
  }

  toUpdateInput(): AppUpdateInput {
    return {
      _compositeKey: createUniqueName(this.name, this.userService.auth0Id),
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
    }
  }
}
