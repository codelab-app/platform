import type { IElement, IPage, IStore } from '@codelab/frontend/abstract/core'
import {
  elementRef,
  ElementTree,
  storeRef,
} from '@codelab/frontend/abstract/core'
import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IPageDTO, IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName, slugify } from '@codelab/shared/utils'
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
    app: { id: app.id },
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
    app: prop<IEntity>(),
    kind: prop<IPageKind>(),
    name: prop<string>().withSetter(),
    pageContentContainer: prop<Maybe<Ref<IElement>>>(),
    store: prop<Ref<IStore>>(),
    url: prop<string>(),
  })
  implements IPage
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
        url: `apps/${this.app.id}/pages/${this.id}`,
      },
    }
  }

  toCreateInput(): PageCreateInput {
    return {
      _compoundName: createUniqueName(this.name, this.app.id),
      app: connectNodeId(this.app.id),
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
      _compoundName: createUniqueName(this.name, this.app.id),
      app: connectNodeId(this.app.id),
      pageContentContainer: reconnectNodeId(
        this.pageContentContainer?.current.id,
      ),
      url: this.url,
    }
  }

  toDeleteInput(): PageDeleteInput {
    return {
      pageContentContainer: { delete: {}, where: {} },
      rootElement: {},
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
    url,
  }: Partial<IPageDTO>) {
    this.name = name ?? this.name
    this.rootElement = rootElement
      ? elementRef(rootElement.id)
      : this.rootElement
    this.app = app ? app : this.app
    this.pageContentContainer = pageContentContainer
      ? elementRef(pageContentContainer.id)
      : this.pageContentContainer
    this.kind = kind ? kind : this.kind
    this.store = store ? storeRef(store.id) : this.store
    this.url = url ?? ''

    return this
  }

  static create = create
}
