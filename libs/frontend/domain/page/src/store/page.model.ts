import type {
  IElement,
  IPage,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { ElementTreeService } from '@codelab/frontend/domain/element'
import { getElementService } from '@codelab/frontend/presenter/container'
import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, idProp, model, prop } from 'mobx-keystone'
import slugify from 'voca/slugify'
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

// const hydrate = (page: IPageDTO) => {
//   const rootElement = new Element({
//     id: page.rootElement.id,
//     name: page.rootElement.name,
//   })

//   return new Page({
//     id: page.id,
//     name: extractName(page.name),
//     rootElement: elementRef(rootElement),
//     getServerSideProps: page.getServerSideProps,
//     app: { id: page.app.id },
//     pageContainerElement: page.pageContainerElement
//       ? { id: page.pageContainerElement.id }
//       : null,
//     kind: page.kind,
//   })
// }

@model('@codelab/Page')
export class Page
  extends ExtendedModel(ElementTreeService, {
    id: idProp,
    app: prop<IEntity>(),
    name: prop<string>().withSetter(),
    rootElement: prop<Ref<IElement>>(),
    getServerSideProps: prop<Nullish<string>>(),
    pageContainerElement: prop<Nullish<IEntity>>(),
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

  // static hydrate = hydrate

  static getServerSideProps = getServerSideProps
}
