import { getUserService } from '@codelab/frontend/abstract/application'
import type {
  IAppModel,
  IDomainModel,
  IPageModel,
  IUser,
} from '@codelab/frontend/abstract/domain'
<<<<<<< HEAD
import { userRef } from '@codelab/frontend/abstract/domain'
=======
import {
  domainRef,
  getUserService,
  pageRef,
  userRef,
} from '@codelab/frontend/abstract/domain'
>>>>>>> 6a8128374 (wip: separate interface to application & domain layer)
import { Domain } from '@codelab/frontend/domain/domain'
import { Page } from '@codelab/frontend/domain/page'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IPageDTO, IPageKind } from '@codelab/shared/abstract/core'
import { AppProperties, connectOwner } from '@codelab/shared/domain/mapper'
import { slugify, throwIfUndefined } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({ domains = [], id, name, owner, pages = [] }: IAppDTO) => {
  const app = new App({
    domains: domains.map((domain) => Domain.create(domain)),
    id,
    name,
    owner: userRef(owner.id),
    pages: pages.map((page) => Page.create(page)),
  })

  return app
}

@model('@codelab/App')
export class App
  extends Model({
    domains: prop<Array<IDomainModel>>(() => []),
    id: idProp,
    name: prop<string>(),
    owner: prop<Ref<IUser>>(),
    pages: prop<Array<IPageModel>>(() => []),
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
      owner: this.owner,
      pages: this.pages.map((page) => page.toJson),
    }
  }

  @modelAction
  static create = create

  @modelAction
  addPageInCache(pageDto: IPageDTO) {
    const existingPage = this.page(pageDto.id)

    if (existingPage) {
      return existingPage.writeCache(pageDto)
    } else {
      const page: IPageModel = Page.create(pageDto)

      this.pages.push(page)

      return page
    }
  }

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
  writeCache({ domains, id, name, owner, pages }: Partial<IAppDTO>) {
    this.id = id ?? this.id
    this.pages = pages ? pages.map((page) => Page.create(page)) : this.pages
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
        this.name,
        this.userService.user,
      ),
      id: this.id,
      owner: connectOwner(this.userService.user),
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
