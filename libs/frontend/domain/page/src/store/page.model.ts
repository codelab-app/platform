import type { IPageDTO, IPropData } from '@codelab/frontend/abstract/core'
import { IPage } from '@codelab/frontend/abstract/core'
import { ElementTreeService } from '@codelab/frontend/domain/element'
import { IEntity, Nullish } from '@codelab/shared/abstract/types'
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

  return { props, notFound, redirect }
}

const hydrate = (page: IPageDTO) => {
  return new Page({
    id: page.id,
    name: page.name,
    slug: page.slug,
    rootElement: { id: page.rootElement.id },
    getServerSideProps: page.getServerSideProps,
    app: { id: page.app.id },
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
    this.setName(page.name)
    this.rootElement = page.rootElement
    this.app = page.app
    this.getServerSideProps = page.getServerSideProps

    return this
  }

  static hydrate = hydrate

  static getServerSideProps = getServerSideProps
}
