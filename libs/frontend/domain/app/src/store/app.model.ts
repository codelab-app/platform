import type {
  IAppModel,
  IDomainModel,
  IPageModel,
  IUser,
} from '@codelab/frontend/abstract/core'
import {
  domainRef,
  getUserService,
  pageRef,
  userRef,
} from '@codelab/frontend/abstract/core'
import { Domain } from '@codelab/frontend/domain/domain'
import { Page } from '@codelab/frontend/domain/page'
import { Store } from '@codelab/frontend/domain/store'
import { useCurrentInterfaceId } from '@codelab/frontend/domain/type'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import {
  AppProperties,
  connectNodeId,
  connectOwner,
} from '@codelab/shared/domain/mapper'
import { slugify } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ domains, id, name, owner, pages }: IAppDTO) => {
  const app = new App({
    domains: domains?.map((domain) => domainRef(domain.id)),
    id,
    name,
    owner: userRef(owner.id),
    pages: pages?.map((page) => pageRef(page.id)),
  })

  return app
}

@model('@codelab/App')
export class App
  extends Model({
    domains: prop<Array<Ref<IDomainModel>>>(() => []),
    id: idProp,
    name: prop<string>(),
    owner: prop<Ref<IUser>>(),
    pages: prop<Array<Ref<IPageModel>>>(() => []),
  })
  implements IAppModel
{
  static toDeleteInput(): AppDeleteInput {
    return {
      domains: [
        {
          delete: Domain.toDeleteInput(),
          where: {},
        },
      ],
      pages: [
        {
          delete: Page.toDeleteInput(),
          where: {},
        },
      ],
    }
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
  get slug() {
    return slugify(this.name)
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
  static create = create

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

  /**
   * For cache writing, we don't write dto for nested models. We only write the ref. The top most use case calling function is responsible for properly hydrating the data.
   */
  @modelAction
  writeCache({ domains, id, name, owner, pages }: Partial<IAppDTO>) {
    this.id = id ?? this.id
    this.pages = pages ? pages.map((page) => pageRef(page.id)) : this.pages
    this.name = name ?? this.name
    this.domains = domains
      ? domains.map((domain) => domainRef(domain.id))
      : this.domains
    this.owner = owner?.id ? userRef(owner.id) : this.owner

    return this
  }

  toCreateInput(): AppCreateInput {
    return {
      compositeKey: AppProperties.appCompositeKey(
        this.name,
        this.userService.user,
      ),
      id: this.id,
      owner: connectOwner(this.userService.user),
      pages: {
        create: this.pages.map((page) => ({
          node: page.current.toCreateInput(),
        })),
      },
    }
  }

  toUpdateInput(): AppUpdateInput {
    return {
      compositeKey: AppProperties.appCompositeKey(
        this.name,
        this.userService.user,
      ),
    }
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
