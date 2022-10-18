import {
  ICreatePageDTO,
  IPage,
  IPageDTO,
  IPageService,
  IUpdatePageDTO,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { PageWhere } from '@codelab/shared/abstract/codegen'
import { connectNode } from '@codelab/shared/data'
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
import slugify from 'slugify'
import { v4 } from 'uuid'
import { pageApi } from './page.api'
import { Page } from './page.model'
import { PageModalService } from './page-modal.service'

export const pageRef = rootRef<IPage>('@codelab/PageRef', {
  onResolvedValueChange(ref, newPage, oldPage) {
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
This function fetches all data required for the rendered page in a single API call.
  Getting `App`, `Page`, `Store` is easy and works with default GraphQL API
  Getting `Element` is a bit trickier, since we only get the rootElementId from Page query, we would need a custom resolver to get descendant elements

term: Rendered. Everything with these terms requires to load dependencies of elementTree to be functional:
page/component
  rootElement
    descendantElements
   */
  @modelFlow
  @transaction
  getRenderedPage = _async(function* (
    this: PageService,
    appId: string,
    pageId: string,
  ) {
    return yield* _await(
      pageApi.GetRenderedPage({
        appId,
        pageId,
      }),
    )
  })

  @computed
  get pagesList() {
    return [...this.pages.values()]
  }

  pagesByApp(appId: string) {
    return this.pagesList.filter((p) => p.app.id === appId)
  }

  page(id: string) {
    return this.pages.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: PageService,
    existingPage: IPage,
    { name, appId, slug, getServerSideProps }: IUpdatePageDTO,
  ) {
    const {
      updatePages: { pages },
    } = yield* _await(
      pageApi.UpdatePages({
        update: {
          name,
          slug: slugify(slug),
          app: connectNode(appId),
          getServerSideProps,
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
    const input = data.map((page) => ({
      id: page.id ?? v4(),
      name: page.name,
      slug: slugify(page.slug),
      app: connectNode(page.appId),
      getServerSideProps: page.getServerSideProps,
      rootElement: {
        create: {
          node: {
            id: page.rootElementId ?? v4(),
            name: ROOT_ELEMENT_NAME,
          },
        },
      },
    }))

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
