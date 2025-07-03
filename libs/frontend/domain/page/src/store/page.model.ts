import type {
  IAppModel,
  IElementModel,
  IPageModel,
  IRedirectModel,
  IStoreModel,
} from '@codelab/frontend-abstract-domain'
import type { IPageDto } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import {
  appRef,
  elementRef,
  ElementTree,
  redirectRef,
  storeRef,
} from '@codelab/frontend-abstract-domain'
import { IPageKind } from '@codelab/shared-abstract-core'
import { slugify } from '@codelab/shared-utils'
import { computed } from 'mobx'
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
}
