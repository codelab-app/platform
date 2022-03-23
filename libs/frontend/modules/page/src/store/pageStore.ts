import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { PageWhere } from '@codelab/shared/abstract/codegen-v2'
import { Nullish } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  detach,
  ExtendedModel,
  idProp,
  Model,
  model,
  modelClass,
  modelFlow,
  objectMap,
  prop,
  Ref,
  rootRef,
  transaction,
} from 'mobx-keystone'
import { PageFragment } from '../graphql/Page.fragment.v2.1.graphql.gen'
import type { CreatePageInput } from '../use-cases/create-page/createPageSchema'
import type { UpdatePageInput } from '../use-cases/update-page/updatePageSchema'
import { pageApi } from './pageApi'

@model('codelab/Page')
export class PageModel extends Model({
  id: idProp,
  appId: prop<Nullish<string>>(),
  name: prop<string>(),
  rootElementId: prop<string>(),
  providerElementId: prop<string>(),
}) {
  @modelFlow
  @transaction
  update = _async(function* (
    this: PageModel,
    { name, appId }: UpdatePageInput,
  ) {
    this.name = name
    this.appId = appId

    const { updatePages } = yield* _await(
      pageApi.UpdatePages({
        update: {
          name,
          app: { connect: { where: { node: { id: appId } } } },
        },
        where: { id: this.id },
      }),
    )

    const page = updatePages?.pages[0]

    if (!page) {
      throw new Error('Failed to update page')
    }

    this.name = page.name
    this.appId = page.app.id

    return page
  })

  getRefId() {
    // when `getId` is not specified in the custom reference it will use this as id
    return this.id
  }

  static fromFragment(page: PageFragment) {
    return new PageModel({
      id: page.id,
      name: page.name,
      rootElementId: page.rootElement.id,
      appId: page.app.id,
      providerElementId: page.app.rootProviderElement.id,
    })
  }
}

export const pageRef = rootRef<PageModel>('PageRef', {
  onResolvedValueChange(ref, newPage, oldPage) {
    if (oldPage && !newPage) {
      detach(ref)
    }
  },
})

@model('codelab/PageModalStore')
class PageModalStore extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<PageModel>>>(ModalService),
  props: {},
})) {
  @computed
  get page() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/PageStore')
export class PageStore extends Model({
  pages: prop(() => objectMap<PageModel>()),
  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new PageModalStore({})),
  deleteModal: prop(() => new PageModalStore({})),
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
  getAll = _async(function* (this: PageStore, where?: PageWhere) {
    const { pages } = yield* _await(pageApi.GetPages({ where }))

    return pages.map((page) => {
      if (this.pages.get(page.id)) {
        return this.pages.get(page.id)
      } else {
        const pageModel = PageModel.fromFragment(page)
        this.pages.set(page.id, pageModel)

        return pageModel
      }
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: PageStore, id: string) {
    if (this.pages.has(id)) {
      return this.pages.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: PageStore,
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

    const pageModel = PageModel.fromFragment(page)

    this.pages.set(pageModel.id, pageModel)

    return pageModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PageStore, id: string) {
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
