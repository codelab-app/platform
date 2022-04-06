import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { PageWhere } from '@codelab/shared/abstract/codegen'
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
import type { CreatePageInput } from '../use-cases/create-page/createPageSchema'
import { UpdatePageInput } from '../use-cases/update-page/updatePageSchema'
import { pageApi } from './page.api'
import { Page } from './page.model'
import { PageModalService } from './page-modal.service'

export const pageRef = rootRef<Page>('PageRef', {
  onResolvedValueChange(ref, newPage, oldPage) {
    if (oldPage && !newPage) {
      detach(ref)
    }
  },
})

export type WithPageService = {
  pageService: PageService
}

@model('codelab/PageService')
export class PageService extends Model({
  pages: prop(() => objectMap<Page>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new PageModalService({})),
  deleteModal: prop(() => new PageModalService({})),
}) {
  @computed
  get pagesList() {
    return [...this.pages.values()]
  }

  page(id: string) {
    return this.pages.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: PageService,
    page: Page,
    { name, appId }: UpdatePageInput,
  ) {
    const { updatePages } = yield* _await(
      pageApi.UpdatePages({
        update: {
          name,
          app: { connect: { where: { node: { id: appId } } } },
        },
        where: { id: page.id },
      }),
    )

    const updatedPage = updatePages?.pages[0]

    if (!page) {
      throw new Error('Failed to update page')
    }

    const pageModel = Page.fromFragment(updatedPage)

    this.pages.set(page.id, pageModel)

    return pageModel
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: PageService, where?: PageWhere) {
    const { pages } = yield* _await(pageApi.GetPages({ where }))

    return pages.map((page) => {
      if (this.pages.get(page.id)) {
        return this.pages.get(page.id)
      } else {
        const pageModel = Page.fromFragment(page)
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
  create = _async(function* (
    this: PageService,
    { name, appId }: CreatePageInput,
  ) {
    const {
      createPages: { pages },
    } = yield* _await(
      pageApi.CreatePages({
        input: {
          name,
          app: { connect: { where: { node: { id: appId } } } },
          rootElement: { create: { node: { name: ROOT_ELEMENT_NAME } } },
        },
      }),
    )

    const page = pages[0]

    if (!page) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Page was not created')
    }

    const pageModel = Page.fromFragment(page)

    this.pages.set(pageModel.id, pageModel)

    return pageModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PageService, id: string) {
    if (this.pages.has(id)) {
      this.pages.delete(id)
    }

    const { deletePages } = yield* _await(
      pageApi.DeletePages({ where: { id } }),
    )

    if (deletePages.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Page was not deleted')
    }

    return deletePages
  })
}
