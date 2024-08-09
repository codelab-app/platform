import type {
  IAppModel,
  IDomainModel,
  IUserModel,
} from '@codelab/frontend/abstract/domain'
import {
  getPageDomainService,
  getUserDomainService,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { Domain } from '@codelab/frontend-domain-domain/store'
import { Page } from '@codelab/frontend-domain-page/store'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/infra/gql'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { AppProperties, connectOwner } from '@codelab/shared/domain'
import { slugify, throwIfUndefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ domains = [], id, name, owner }: IAppDto) => {
  const app = new App({
    domains: domains.map((domain) => Domain.create(domain)),
    id,
    name,
    owner: userRef(owner.id),
  })

  return app
}

@model('@codelab/App')
export class App
  extends Model({
    domains: prop<Array<IDomainModel>>(() => []),
    id: idProp,
    name: prop<string>(),
    owner: prop<Ref<IUserModel>>(),
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

  // @computed
  // get pageRootElements() {
  //   return this.pages.map((page) => page.rootElement)
  // }

  @computed
  get pageDomainService() {
    return getPageDomainService(this)
  }

  @computed
  get pages() {
    return this.pageDomainService.pagesList.filter(
      (page) => page.app.id === this.id,
    )
  }

  @computed
  get providerPage() {
    const providerPage = this.pages.find(
      (page) => page.kind === IPageKind.Provider,
    )

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
      domains: this.domains.map((domain) => domain.toJson),
      id: this.id,
      name: this.name,
      owner: this.owner.current.toJson,
      pages: this.pages.map((page) => page.toJson),
      slug: this.slug,
    }
  }

  @modelAction
  static create = create

  @modelAction
  page(id: string) {
    return this.pages.find((page) => page.id === id)
  }

  @modelAction
  pageByName(name: string) {
    return throwIfUndefined(this.pages.find((page) => name === page.name))
  }

  /**
   * For cache writing, we don't write dto for nested models. We only write the ref. The top most use case calling function is responsible for properly hydrating the data.
   */
  @modelAction
  writeCache({ domains, id, name, owner }: Partial<IAppDto>) {
    this.id = id ?? this.id
    this.name = name ?? this.name
    this.domains = domains
      ? domains.map((domain) => Domain.create(domain))
      : this.domains
    this.owner = owner?.id ? userRef(owner.id) : this.owner

    return this
  }

  toCreateInput(): AppCreateInput {
    return {
      compositeKey: AppProperties.appCompositeKey(
        this,
        this.userDomainService.user,
      ),
      id: this.id,
      owner: connectOwner(this.userDomainService.user),
      pages: {
        create: this.pages.map((page) => ({
          node: page.toCreateInput(),
        })),
      },
    }
  }

  toUpdateInput(): AppUpdateInput {
    return {
      compositeKey: AppProperties.appCompositeKey(
        this,
        this.userDomainService.user,
      ),
    }
  }

  @computed
  private get userDomainService() {
    return getUserDomainService(this)
  }
}
