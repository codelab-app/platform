import type {
  IApp,
  ICreatePageDTO,
  IPage,
  IPageService,
  IUpdatePageDTO,
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
import type { Ref } from 'mobx-keystone'
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
    existingPage: IPage,
    { name, getServerSideProps, appId, pageContainerElementId }: IUpdatePageDTO,
  ) {
    const {
      updatePages: { pages },
    } = yield* _await(
      pageApi.UpdatePages({
        update: {
          name: createUniqueName(name, appId),
          app: connectNodeId(appId),
          getServerSideProps,
          pageContainerElement: reconnectNodeId(pageContainerElementId),
        },
        where: { id: existingPage.id },
      }),
    )

    return pages.map((page) =>
      this.add({
        ...page,
        appId: page.app.id,
        rootElementId: page.rootElement.id,
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
        appId: page.app.id,
        rootElementId: page.rootElement.id,
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
  create = _async(function* (this: PageService, data: Array<ICreatePageDTO>) {
    const input = data.map((page) => {
      const pageId = page.id ?? v4()

      return {
        id: pageId,
        name: createUniqueName(page.name, page.appId),
        app: connectNodeId(page.appId),
        getServerSideProps: page.getServerSideProps,
        kind: IPageKind.Regular,
        rootElement: {
          create: {
            node: {
              id: page.rootElementId,
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

    return pages.map((page) =>
      this.add({
        ...page,
        rootElementId: page.rootElement.id,
        appId: page.app.id,
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
  add(pageDTO: IPageDTO) {
    const providerPageId = v4()

    const page = new Page({
      id: providerPageId,
      name: pageDTO.name,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
      app: { id: pageDTO.appId },
      rootElement: elementRef(pageDTO.rootElementId),
      kind: IPageKind.Provider,
    })

    this.pages.set(page.id, page)

    return page
  }
}
