import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { ModalStore } from '@codelab/frontend/shared/utils'
import { PageWhere } from '@codelab/shared/abstract/codegen-v2'
import {
  addMiddleware,
  flow,
  Instance,
  toGenerator,
  types,
} from 'mobx-state-tree'
import { atomic } from 'mst-middlewares'
import type { CreatePageInput } from '../use-cases/create-page/createPageSchema'
import type { UpdatePageInput } from '../use-cases/update-page/updatePageSchema'
import { pageApi } from './pageApi'

export const PageModel = types
  .model({
    id: types.identifier,
    appId: types.string,
    name: types.string,
    rootElementId: types.string,
    providerElementId: types.string,
  })
  .actions((self) => {
    // This middleware rolls back if a synchronous or asynchronous action process fails.
    addMiddleware(self, atomic)

    return {
      update: flow(function* ({ name, appId }: UpdatePageInput) {
        self.name = name
        self.appId = appId

        const { updatePages } = yield* toGenerator(
          pageApi.UpdatePages({
            update: {
              name,
              app: { connect: { where: { node: { id: appId } } } },
            },
            where: { id: self.id },
          }),
        )

        const page = updatePages?.pages[0]

        if (!page) {
          throw new Error('Failed to update page')
        }

        self.name = page.name
        self.appId = page.app.id

        return page
      }),
    }
  })

export type PageModel = Instance<typeof PageModel>

const PageModalStore = ModalStore.named('PageModal')
  .props({
    page: types.optional(types.maybeNull(types.safeReference(PageModel)), null),
  })
  .actions((self) => {
    const superOpen = self.open
    const superClose = self.close

    return {
      open: (pageId: string) => {
        superOpen()
        self.page = pageId as any
      },
      close: () => {
        superClose()
        self.page = null
      },
    }
  })

export const PageStore = types
  .model({
    pages: types.map(PageModel),

    deleteModal: PageModalStore,
    updateModal: PageModalStore,
    createModal: ModalStore,
  })
  .views((self) => ({
    get pagesList() {
      return [...self.pages.values()]
    },

    page(id: string) {
      return self.pages.get(id)
    },
  }))
  .actions((self) => {
    addMiddleware(self, atomic)

    return {
      getAll: flow(function* (where?: PageWhere) {
        const { pages } = yield* toGenerator(pageApi.GetPages({ where }))

        const pageModels = pages.map((page) =>
          PageModel.create({
            id: page.id,
            appId: page.app.id,
            name: page.name,
            rootElementId: page.rootElement.id,
            providerElementId: page.app.rootProviderElement.id,
          }),
        )

        for (const page of pageModels) {
          self.pages.put(page)
        }

        return pageModels
      }),
    }
  })
  .actions((self) => ({
    getOne: flow(function* (id: string) {
      if (self.pages.has(id)) {
        return self.pages.get(id)
      }

      const all = yield* toGenerator(self.getAll({ id }))

      return all[0]
    }),
  }))
  .actions((self) => ({
    createPage: flow(function* ({ name, appId }: CreatePageInput) {
      const {
        createPages: { pages },
      } = yield* toGenerator(
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
        // Throw an error so that the atomic middleware rolls back the changes
        throw new Error('Page was not created')
      }

      const pageModel = PageModel.create({
        id: page.id,
        appId: page.app.id,
        name: page.name,
        rootElementId: page.rootElement.id,
        providerElementId: page.app.rootProviderElement.id,
      })

      self.pages.put(pageModel)

      return pageModel
    }),

    deletePage: flow(function* (id: string) {
      if (self.pages.has(id)) {
        self.pages.delete(id)
      }

      const { deletePages } = yield* toGenerator(
        pageApi.DeletePages({ where: { id } }),
      )

      if (deletePages.nodesDeleted === 0) {
        // throw error so that the atomic middleware rolls back the changes
        throw new Error('Page was not deleted')
      }

      return deletePages
    }),
  }))

export type PageStore = Instance<typeof PageStore>
