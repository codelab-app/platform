import type {
  IApp,
  ICreatePageData,
  IPage,
  IPageService,
  IUpdatePageData,
} from '@codelab/frontend/abstract/core'
import {
  DEFAULT_GET_SERVER_SIDE_PROPS,
  IPageDTO,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { Element, elementRef } from '@codelab/frontend/domain/element'
import { getElementService } from '@codelab/frontend/presenter/container'
import { createUniqueName, ModalService } from '@codelab/frontend/shared/utils'
import type { PageWhere } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
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
  Ref,
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
    const {
      updatePages: { pages },
    } = yield* _await(
      pageApi.UpdatePages({
        update: {
          name: createUniqueName(name, app.id),
          app: connectNodeId(app.id),
          getServerSideProps,
          pageContainerElement: reconnectNodeId(pageContentContainer),
        },
        where: { id },
      }),
    )

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
  createSubmit = _async(function* (
    this: PageService,
    data: Array<ICreatePageData>,
  ) {
    const input = data.map(({ id, name, app, getServerSideProps }) => {
      const pageId = id

      return {
        id: pageId,
        name: createUniqueName(name, app.id),
        app: connectNodeId(app.id),
        getServerSideProps: getServerSideProps,
        kind: IPageKind.Regular,
        rootElement: {
          create: {
            node: {
              id: v4(),
              name: createUniqueName(ROOT_ELEMENT_NAME, pageId),
            },
          },
        },
      }
    })

    const {
      createPages: { pages },
    } = yield* _await(
      pageApi.CreatePages({
        input,
      }),
    )

    return pages.map(({ rootElement, app, ...page }) =>
      this.add({
        ...page,
        rootElement,
        app,
      }),
    )
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PageService, ids: Array<string>) {
    ids.forEach((id) => this.pages.delete(id))

    const {
      deletePages: { nodesDeleted },
    } = yield* _await(pageApi.DeletePages({ where: { id_IN: ids } }))

    return nodesDeleted
  })

  @modelAction
  add({
    id,
    name,
    app,
    rootElement,
    getServerSideProps,
    descendentElements,
  }: IPageDTO) {
    const page = new Page({
      id,
      name,
      getServerSideProps,
      app,
      rootElement: elementRef(rootElement.id),
      kind: IPageKind.Provider,
    })

    this.pages.set(page.id, page)

    return page
  }
}
