import type {
  IAppModel,
  IElementModel,
  IPageModel,
  IRedirectModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  appRef,
  elementRef,
  ElementTree,
  getRedirectDomainService,
  getUserDomainService,
  redirectRef,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { Store } from '@codelab/frontend-domain-store/store'
import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared/infra/gql'
import type { IPageDto } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  PageProperties,
  reconnectNodeId,
} from '@codelab/shared/domain'
import { slugify } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  app,
  elements,
  id,
  kind,
  name,
  pageContentContainer,
  redirect,
  rootElement,
  store,
  urlPattern,
}: IPageDto) => {
  return new Page({
    app: appRef(app.id),
    elementsIds: elements?.map((element) => element.id) ?? [],
    id,
    kind,
    name,
    pageContentContainer: pageContentContainer?.id
      ? elementRef(pageContentContainer.id)
      : undefined,
    redirect: redirect?.id ? redirectRef(redirect.id) : undefined,
    rootElement: elementRef(rootElement.id),
    store: storeRef(store.id),
    urlPattern,
  })
}

@model('@codelab/Page')
export class Page
  extends ExtendedModel(ElementTree, {
    app: prop<Ref<IAppModel>>(),
    /**
     * a pre-computed descendant elements ids
     * mainly used for deletePageUseCase to avoid element hydrating
     */
    elementsIds: prop<Array<string>>(),
    kind: prop<IPageKind>(),
    name: prop<string>(),
    pageContentContainer: prop<Maybe<Ref<IElementModel>>>(),
    redirect: prop<Ref<IRedirectModel> | undefined>(),
    store: prop<Ref<IStoreModel>>(),
    /**
     * This is the URL pattern
     */
    urlPattern: prop<string>(),
  })
  implements IPageModel
{
  static create = create

  static toDeleteInput(): PageDeleteInput {
    return {
      redirect: { where: {} },
      // pageContentContainer: { delete: {}, where: {} },
      rootElement: {},
      store: {
        delete: Store.toDeleteInput(),
        where: {},
      },
    }
  }

  /**
   * /home /apps/codelab/test/pages/home?primarySidebarKey=explorer
   */
  @computed
  get builderUrlInstance() {
    return `/apps/${this.userDomainService.user.username}/${this.app.current.slug}/pages/${this.slug}?primarySidebarKey=explorer`
  }

  @computed
  get providerPage() {
    return this.kind === IPageKind.Regular
      ? this.app.current.providerPage
      : undefined
  }

  @computed
  get slug() {
    return slugify(this.name)
  }

  @computed
  get toJson() {
    return {
      $modelType: 'serialized' as const,
      app: this.app,
      id: this.id,
      kind: this.kind,
      name: this.name,
      pageContentContainer: this.pageContentContainer,
      redirect: this.redirect,
      rootElement: this.rootElement,
      slug: this.slug,
      store: this.store,
      urlPattern: this.urlPattern,
      // urlPattern: `apps/${this.app.id}/pages/${this.id}`,
    }
  }

  @modelAction
  writeCache({
    app,
    kind,
    name,
    pageContentContainer,
    rootElement,
    store,
    urlPattern,
  }: Partial<IPageDto>) {
    this.name = name ?? this.name
    this.rootElement = rootElement
      ? elementRef(rootElement.id)
      : this.rootElement
    this.app = app ? appRef(app.id) : this.app
    this.pageContentContainer = pageContentContainer
      ? elementRef(pageContentContainer.id)
      : this.pageContentContainer
    this.kind = kind ? kind : this.kind
    this.store = store ? storeRef(store.id) : this.store
    this.urlPattern = urlPattern ?? ''

    return this
  }

  toCreateInput(): PageCreateInput {
    return {
      app: connectNodeId(this.app.id),
      compositeKey: PageProperties.pageCompositeKey(this.name, this.app),
      id: this.id,
      kind: this.kind,
      pageContentContainer: connectNodeId(
        this.pageContentContainer?.current.id,
      ),
      rootElement: {
        create: {
          node: this.rootElement.current.toCreateInput(),
        },
      },
      store: {
        create: {
          node: this.store.current.toCreateInput(),
        },
      },
      urlPattern: this.urlPattern,
    }
  }

  toUpdateInput(): PageUpdateInput {
    return {
      app: connectNodeId(this.app.id),
      compositeKey: PageProperties.pageCompositeKey(this.name, this.app),
      pageContentContainer: reconnectNodeId(
        this.pageContentContainer?.current.id,
      ),
      urlPattern: this.urlPattern,
    }
  }

  @computed
  private get redirectDomainService() {
    return getRedirectDomainService(this)
  }

  @computed
  private get userDomainService() {
    return getUserDomainService(this)
  }
}
