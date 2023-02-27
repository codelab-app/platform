import type {
  IElement,
  IPage,
  IPageDTO,
  IPropData,
} from '@codelab/frontend/abstract/core'
import {
  Element,
  elementRef,
  ElementTreeService,
} from '@codelab/frontend/domain/element'
import { getElementService } from '@codelab/frontend/presenter/container'
import { extractName } from '@codelab/frontend/shared/utils'
import type { IPageKind } from '@codelab/shared/abstract/core'
import type {
  IEntity,
  Maybe,
  Nullable,
  Nullish,
} from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, idProp, model, prop } from 'mobx-keystone'
import slugify from 'voca/slugify'
import { pageApi } from './page.api'

@model('@codelab/Page')
export class Page
  extends ExtendedModel(ElementTreeService, {
    id: idProp,
    app: prop<IEntity>(),
    name: prop<string>().withSetter(),
    rootElement: prop<Ref<IElement>>(),
    getServerSideProps: prop<Nullish<string>>(),
    pageContentContainer: prop<Maybe<Ref<IElement>>>(),
    kind: prop<IPageKind>(),
  })
  implements IPage
{
  @computed
  get slug() {
    return slugify(this.name)
  }

  @computed
  private get elementService() {
    return getElementService(this)
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

  // onAttachedToRootStore() {
  //   console.log('Page model attached')
  // }

  // @modelAction
  // writeCache(page: IPageDTO) {
  //   const rootElement = new Element({
  //     id: page.rootElement.id,
  //     name: page.rootElement.name,
  //   })

  //   this.setName(extractName(page.name))
  //   this.rootElement = elementRef(rootElement)
  //   this.app = page.app
  //   this.getServerSideProps = page.getServerSideProps
  //   this.pageContainerElement = page.pageContainerElement
  //   this.kind = page.kind

  //   return this
  // }

  static create({
    id,
    name,
    app,
    kind,
    rootElement,
    getServerSideProps,
    pageContentContainer,
    descendentElements,
  }: IPageDTO): IPage {
    return new Page({
      id,
      name,
      rootElement: elementRef(rootElement.id),
      getServerSideProps: getServerSideProps,
      app: { id: app.id },
      pageContentContainer: pageContentContainer?.id
        ? elementRef(pageContentContainer.id)
        : undefined,
      kind: kind,
    })
  }

  static getServerSideProps = async (context: IPropData) => {
    const id = context.params?.pageId as string

    const {
      pages: [page],
    } = await pageApi.GetPages({ where: { id } })

    if (!page || !page.getServerSideProps) {
      return { props: {} }
    }

    const {
      props = {},
      notFound = false,
      redirect = undefined,
    } = await eval(`(${page.getServerSideProps})`)(context)

    return {
      props: {
        getServerSidePropsData: props,
      },
      notFound,
      redirect,
    }
  }
}
