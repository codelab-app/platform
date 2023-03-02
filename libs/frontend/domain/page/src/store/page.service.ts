import type {
  ICreatePageData,
  IPage,
  IPageService,
  IUpdatePageData,
} from '@codelab/frontend/abstract/core'
import { IPageDTO, ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/domain/element'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getElementService } from '@codelab/frontend/presenter/container'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { PageWhere } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { PageFactory } from '../services'
import { pageApi } from './page.api'
import { Page } from './page.model'
import { PageModalService } from './page-modal.service'

export const pageRef = rootRef<IPage>('@codelab/PageRef', {
  onResolvedValueChange: (ref, newPage, oldPage) => {
    if (oldPage && !newPage) {
      detach(ref)
    }
  },
})

@model('@codelab/PageService')
export class PageService
  extends Model({
    pages: prop(() => objectMap<IPage>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new PageModalService({})),
    deleteModal: prop(() => new PageModalService({})),
    pageFactory: prop(() => new PageFactory({})),
  })
  implements IPageService
{
  /**
    This function fetches all data related to the specific page.
   */
  @modelFlow
  @transaction
  getRenderedPage = _async(function* (this: PageService, pageId: string) {
    return yield* _await(pageApi.GetRenderedPage({ pageId }))
  })

  /**
    This function fetches the initial page and all the common data shared across all pages in the application:
     - app data
     - current page
     - providers page (_app)
     - components
     - resources
     - types
   */
  @modelFlow
  @transaction
  getRenderedPageAndCommonAppData = _async(function* (
    this: PageService,
    appId: string,
    pageId: string,
  ) {
    return yield* _await(
      pageApi.GetRenderedPageAndCommonAppData({ appId, pageId }),
    )
  })

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  get pagesList() {
    return [...this.pages.values()]
  }

  pagesByApp(appId: string) {
    return this.pagesList.filter((page) => page.app.id === appId)
  }

  page(id: string) {
    return this.pages.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: PageService,
    {
      id,
      name,
      getServerSideProps,
      app,
      pageContentContainer,
    }: IUpdatePageData,
  ) {
    const page = this.pages.get(id)

    page?.writeCache({
      name,
      getServerSideProps,
      app,
      pageContentContainer,
    })

    const {
      updatePages: { pages },
    } = yield* _await(
      pageApi.UpdatePages({
        update: {
          _compoundName: createUniqueName(name, app),
          app: connectNodeId(app.id),
          getServerSideProps,
          pageContentContainer: reconnectNodeId(pageContentContainer?.id),
        },
        where: { id },
      }),
    )

    return page!
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: PageService, where?: PageWhere) {
    const { pages } = yield* _await(pageApi.GetPages({ where }))

    return pages.map((page) =>
      this.add({
        ...page,
        app: page.app,
        rootElement: page.rootElement,
      }),
    )
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: PageService, id: string) {
    if (this.pages.has(id)) {
      return this.pages.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: PageService,
    { id, name, app, getServerSideProps, owner }: ICreatePageData,
  ) {
    const rootElementProps = this.propService.add({
      id: v4(),
      data: '',
    })

    const rootElement = this.elementService.add({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: rootElementProps,
    })

    const page = this.add({
      id,
      name,
      app,
      getServerSideProps,
      rootElement: elementRef(rootElement.id),
      kind: IPageKind.Regular,
      owner,
    })

    this.pages.set(page.id, page)

    const {
      createPages: { pages },
    } = yield* _await(
      pageApi.CreatePages({
        input: {
          id,
          _compoundName: createUniqueName(name, app),
          app: connectNodeId(app.id),
          getServerSideProps: getServerSideProps,
          kind: IPageKind.Regular,
          rootElement: {
            create: {
              node: {
                id: v4(),
                name: ROOT_ELEMENT_NAME,
              },
            },
          },
        },
      }),
    )

    return page
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PageService, id: string) {
    const page = this.pages.get(id)
    this.pages.delete(id)

    const {
      deletePages: { nodesDeleted },
    } = yield* _await(pageApi.DeletePages({ where: { id } }))

    return page!
  })

  @modelAction
  add({
    id,
    name,
    app,
    rootElement,
    kind,
    owner,
    getServerSideProps,
    descendentElements,
  }: IPageDTO) {
    const page = new Page({
      id,
      name,
      getServerSideProps,
      app,
      owner,
      rootElement: elementRef(rootElement.id),
      kind,
    })

    this.pages.set(page.id, page)

    return page
  }
}
