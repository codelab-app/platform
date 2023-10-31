import { getRedirectService } from '@codelab/frontend/abstract/application'
import type {
  IAppModel,
  IElementModel,
  IPageModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import {
  appRef,
  elementRef,
  ElementTree,
  getPageDomainService,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { Store } from '@codelab/frontend/domain/store'
import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  PageProperties,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { slugify } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  app,
  id,
  kind,
  name,
  pageContentContainer,
  rootElement,
  store,
  url,
}: IPageDTO) => {
  return new Page({
    app: appRef(app.id),
    id,
    kind,
    name,
    pageContentContainer: pageContentContainer?.id
      ? elementRef(pageContentContainer.id)
      : undefined,
    rootElement: elementRef(rootElement.id),
    store: storeRef(store.id),
    url,
  })
}

@model('@codelab/Page')
export class Page
  extends ExtendedModel(ElementTree, {
    app: prop<Ref<IAppModel>>(),
    kind: prop<IPageKind>(),
    name: prop<string>(),
    pageContentContainer: prop<Maybe<Ref<IElementModel>>>(),
    store: prop<Ref<IStoreModel>>(),
    url: prop<string>(),
  })
  implements IPageModel
{
  static create = create

  static toDeleteInput(): PageDeleteInput {
    return {
      // pageContentContainer: { delete: {}, where: {} },
      rootElement: {},
      store: {
        delete: Store.toDeleteInput(),
        where: {},
      },
    }
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
      rootElement: this.rootElement,
      slug: this.slug,
      store: this.store,
      url: `apps/${this.app.id}/pages/${this.id}`,
    }
  }

  @computed
  get pageDomainService() {
    return getPageDomainService(this)
  }

  @computed
  get providerPage() {
    return this.kind === IPageKind.Regular
      ? this.app.current.providerPage
      : undefined
  }

  @modelAction
  writeCache({
    app,
    kind,
    name,
    pageContentContainer,
    rootElement,
    store,
    url,
  }: Partial<IPageDTO>) {
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
    this.url = url ?? ''

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
      url: this.url,
    }
  }

  toUpdateInput(): PageUpdateInput {
    return {
      app: connectNodeId(this.app.id),
      compositeKey: PageProperties.pageCompositeKey(this.name, this.app),
      pageContentContainer: reconnectNodeId(
        this.pageContentContainer?.current.id,
      ),
      url: this.url,
    }
  }
}
