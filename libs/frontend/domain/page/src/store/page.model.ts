import type { IPage, IPropData } from '@codelab/frontend/abstract/core'
import { IPageDTO } from '@codelab/frontend/abstract/core'
import { ElementTreeService } from '@codelab/frontend/domain/element'
import { extractName } from '@codelab/frontend/shared/utils'
import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, idProp, model, modelAction, prop } from 'mobx-keystone'
import { pageApi } from './page.api'

const getServerSideProps = async (context: IPropData) => {
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

const hydrate = (page: IPageDTO) => {
  return new Page({
    id: page.id,
    name: extractName(page.name),
    slug: page.slug,
    rootElement: { id: page.rootElement.id },
    getServerSideProps: page.getServerSideProps,
    app: { id: page.app.id },
    pageContainerElement: page.pageContainerElement
      ? { id: page.pageContainerElement.id }
      : null,
    kind: page.kind,
  })
}

@model('@codelab/Page')
export class Page
  extends ExtendedModel(ElementTreeService, {
    id: idProp,
    app: prop<IEntity>(),
    name: prop<string>().withSetter(),
    slug: prop<string>(),
    rootElement: prop<IEntity>(),
    getServerSideProps: prop<Nullish<string>>(),
    pageContainerElement: prop<Nullish<IEntity>>(),
    kind: prop<IPageKind>(),
  })
  implements IPage
{
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

  @modelAction
  writeCache(page: IPageDTO) {
    this.setName(extractName(page.name))
    this.rootElement = page.rootElement
    this.app = page.app
    this.slug = page.slug
    this.getServerSideProps = page.getServerSideProps
    this.pageContainerElement = page.pageContainerElement
    this.kind = page.kind

    return this
  }

  static hydrate = hydrate

  static getServerSideProps = getServerSideProps
}
