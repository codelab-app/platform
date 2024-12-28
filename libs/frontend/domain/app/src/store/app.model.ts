import type {
  IAppModel,
  IDomainModel,
  IPageModel,
  IUserModel,
} from '@codelab/frontend/abstract/domain'
import type { IAppDto } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

import {
  domainRef,
  getPageDomainService,
  getUserDomainService,
  pageRef,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { IPageKind } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/validation'
import { slugify } from '@codelab/shared/utils'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ domains = [], id, name, owner, pages = [] }: IAppDto) => {
  const app = new App({
    domains: domains.map((domain) => domainRef(domain.id)),
    id,
    name,
    owner: userRef(owner.id),
    pages: pages.map((page) => pageRef(page.id)),
  })

  return app
}

@model('@codelab/App')
export class App
  extends Model({
    domains: prop<Array<Ref<IDomainModel>>>(() => []),
    id: idProp,
    name: prop<string>(),
    owner: prop<Ref<IUserModel>>(),
    pages: prop<Array<Ref<IPageModel>>>(() => []),
  })
  implements IAppModel
{
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
      domains: this.domains.map((domain) => domain.current.toJson),
      id: this.id,
      name: this.name,
      owner: this.owner.current.toJson,
      pages: this.pages.map((page) => page.current.toJson),
      slug: this.slug,
    }
  }

  @modelAction
  static create = create

  @modelAction
  page(id: string) {
    return this.pages.find((page) => page.id === id)?.current
  }

  @modelAction
  pageByName(name: string) {
    const found = this.pages.find((page) => name === page.current.name)?.current

    Validator.assertsDefined(found)

    return found
  }

  /**
   * For cache writing, we don't write dto for nested models. We only write the ref. The top most use case calling function is responsible for properly hydrating the data.
   */
  @modelAction
  writeCache({ domains, id, name, owner, pages }: Partial<IAppDto>) {
    this.id = id ?? this.id
    this.name = name ?? this.name
    this.domains = domains
      ? domains.map((domain) => domainRef(domain.id))
      : this.domains
    this.owner = owner?.id ? userRef(owner.id) : this.owner
    this.pages = pages ? pages.map((page) => pageRef(page.id)) : this.pages

    return this
  }

  @computed
  private get pageDomainService() {
    return getPageDomainService(this)
  }

  @computed
  private get userDomainService() {
    return getUserDomainService(this)
  }
}
