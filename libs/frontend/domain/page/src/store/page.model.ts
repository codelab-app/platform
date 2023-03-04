import type {
  IElement,
  IPage,
  IPageDTO,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { elementRef, getElementService } from '@codelab/frontend/abstract/core'
import { ElementTreeService } from '@codelab/frontend/domain/element'
import type { PageCreateInput } from '@codelab/shared/abstract/codegen'
import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Maybe, Nullish } from '@codelab/shared/abstract/types'
import { createUniqueName } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, idProp, model, modelAction, prop } from 'mobx-keystone'
import slugify from 'voca/slugify'
import { pageApi } from './page.api'

const create = ({
  id,
  name,
  app,
  kind,
  rootElement,
  getServerSideProps,
  pageContentContainer,
  descendentElements,
}: IPageDTO): IPage => {
  return new Page({
    app: { id: app.id },
    getServerSideProps: getServerSideProps,
    id,
    kind,
    name,
    pageContentContainer: pageContentContainer?.id
      ? elementRef(pageContentContainer.id)
      : undefined,
    rootElement: elementRef(rootElement.id),
  })
}

const getPageServerSideProps = async (context: IPropData) => {
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
    notFound,
    props: {
      getServerSidePropsData: props,
    },
    redirect,
  }
}

@model('@codelab/Page')
export class Page
  extends ExtendedModel(ElementTreeService, {
    app: prop<IEntity>(),
    getServerSideProps: prop<Nullish<string>>(),
    id: idProp,
    kind: prop<IPageKind>(),
    name: prop<string>().withSetter(),
    pageContentContainer: prop<Maybe<Ref<IElement>>>(),
    rootElement: prop<Ref<IElement>>(),
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

  toCreateInput(): PageCreateInput {
    return {
      _compoundName: createUniqueName(this.name, this),
      getServerSideProps: this.getServerSideProps,
      id: this.id,
      kind: this.kind,
      pageContentContainer: {
        create: this.pageContentContainer
          ? {
              node: this.pageContentContainer.current.toCreateInput(),
            }
          : null,
      },
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
    name,
    rootElement,
    getServerSideProps,
    pageContentContainer,
    kind,
  }: Partial<IPageDTO>) {
    this.name = name ? name : this.name
    this.rootElement = rootElement
      ? elementRef(rootElement.id)
      : this.rootElement
    this.app = app ? app : this.app
    this.getServerSideProps = getServerSideProps
      ? getServerSideProps
      : this.getServerSideProps
    this.pageContentContainer = pageContentContainer
      ? elementRef(pageContentContainer.id)
      : this.pageContentContainer
    this.kind = kind ? kind : this.kind

    return this
  }

  static create = create

  static getServerSideProps = getPageServerSideProps
}
