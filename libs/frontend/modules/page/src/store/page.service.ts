import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { PageWhere } from '@codelab/shared/abstract/codegen'
import {
  ICreatePageDTO,
  IPage,
  IPageDTO,
  IPageService,
  IUpdatePageDTO,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  Model,
  model,
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

export const pageRef = rootRef<Page>('@codelab/PageRef', {
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
    page: IPage,
    { name, appId, slug }: IUpdatePageDTO,
  ) {
    const { updatePages } = yield* _await(
      pageApi.UpdatePages({
        update: {
          name,
          slug: slugify(slug),
          app: { connect: { where: { node: { id: appId } } } },
        },
        where: { id: page.id },
      }),
    )

    const updatedPage = updatePages?.pages[0]

    if (!page) {
      throw new Error('Failed to update page')
    }

    const pageModel = Page.hydrate(updatedPage)

    this.pages.set(page.id, pageModel)

    return pageModel
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: PageService, where?: PageWhere) {
    const { pages } = yield* _await(pageApi.GetPages({ where }))

    return pages.map((page) => {
      if (this.pages.get(page.id)) {
        return throwIfUndefined(this.pages.get(page.id))
      } else {
        const pageModel = Page.hydrate(page)
        this.pages.set(page.id, pageModel)

        return pageModel
      }
    })
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
      app: { connect: { where: { node: { id: page.appId } } } },
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

    if (!pages.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Page was not created')
    }

    return pages.map((page) => {
      const pageModel = Page.hydrate(page)

      this.pages.set(pageModel.id, pageModel)

      return pageModel
    })
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PageService, id: string) {
    const existing = throwIfUndefined(this.pages.get(id))

    if (existing) {
      this.pages.delete(id)
    }

    const { deletePages } = yield* _await(
      pageApi.DeletePages({ where: { id } }),
    )

    if (deletePages.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Page was not deleted')
    }

    return existing
  })

  updateCache(pages: Array<IPageDTO>): Array<IPage> {
    return pages.map((page) => this.addOrUpdate(page))
  }

  addOrUpdate(page: IPageDTO): IPage {
    let pageModel = this.page(page.id)

    if (pageModel) {
      pageModel.updateCache(page)
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
