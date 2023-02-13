import type {
  ICreatePageDTO,
  IPageService,
  IUpdatePageDTO,
} from '@codelab/frontend/abstract/core'
import {
  IPage,
  IPageDTO,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
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
  rootRef,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
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
    { name, appId, getServerSideProps, pageContainerElementId }: IUpdatePageDTO,
  ) {
    const {
      updatePages: { pages },
    } = yield* _await(
      pageApi.UpdatePages({
        update: {
          name,
          app: connectNodeId(appId),
          getServerSideProps,
          pageContainerElement: reconnectNodeId(pageContainerElementId),
        },
        where: { id: existingPage.id },
      }),
    )

    return pages.map((page) => this.writeCache(page))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: PageService, where?: PageWhere) {
    const { pages } = yield* _await(pageApi.GetPages({ where }))

    return pages.map((page) => this.writeCache(page))
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
        name: page.name,
        app: connectNodeId(page.appId),
        getServerSideProps: page.getServerSideProps,
        kind: IPageKind.Regular,
        rootElement: {
          create: {
            node: {
              id: page.rootElementId ?? v4(),
              name: ROOT_ELEMENT_NAME,
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

    return pages.map((page) => this.writeCache(page))
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
  writeCache(page: IPageDTO): IPage {
    let pageModel = this.page(page.id)

    if (pageModel) {
      pageModel = pageModel.writeCache(page)
    } else {
      pageModel = Page.hydrate(page)
      this.pages.set(page.id, pageModel)
    }

    return pageModel
  }

  // @modelFlow
  // @transaction
  // deleteMany = _async(function* (this: PageService, ids: Array<string>) {
  //   if (ids.length === 0) {
  //     return []
  //   }
  //
  //   const existingPages: Array<IPage> = []
  //
  //   for (const id of ids) {
  //     const existing = throwIfUndefined(this.pages.get(id))
  //     existingPages.push(existing)
  //     this.pages.delete(id)
  //   }
  //
  //   const { deletePages } = yield* _await(
  //     pageApi.DeletePages({ where: { id_IN: ids } }),
  //   )
  //
  //   if (deletePages.nodesDeleted === 0) {
  //     // throw error so that the atomic middleware rolls back the changes
  //     throw new Error('Page was not deleted')
  //   }
  //
  //   return existingPages
  // })
}
