import type { IElement, IPage, IPageDTO } from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import { ElementTree } from '@codelab/frontend/domain/element'
import type { PageCreateInput } from '@codelab/shared/abstract/codegen'
import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'
import slugify from 'voca/slugify'

const create = ({
  app,
  id,
  kind,
  name,
  pageContentContainer,
  rootElement,
}: IPageDTO): IPage => {
  return new Page({
    app: { id: app.id },
    id,
    kind,
    name,
    pageContentContainer: pageContentContainer?.id
      ? elementRef(pageContentContainer.id)
      : undefined,
    rootElement: elementRef(rootElement.id),
  })
}

@model('@codelab/Page')
export class Page
  extends ExtendedModel(ElementTree, {
    app: prop<IEntity>(),
    kind: prop<IPageKind>(),
    name: prop<string>().withSetter(),
    pageContentContainer: prop<Maybe<Ref<IElement>>>(),
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
    }
  }

  @modelAction
  writeCache({
    app,
    kind,
    name,
    pageContentContainer,
    rootElement,
  }: Partial<IPageDTO>) {
    this.name = name ? name : this.name
    this.rootElement = rootElement
      ? elementRef(rootElement.id)
      : this.rootElement
    this.app = app ? app : this.app
    this.pageContentContainer = pageContentContainer
      ? elementRef(pageContentContainer.id)
      : this.pageContentContainer
    this.kind = kind ? kind : this.kind

    return this
  }

  static create = create
}
