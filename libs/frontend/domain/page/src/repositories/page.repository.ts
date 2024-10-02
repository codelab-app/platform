import type {
  IPageModel,
  IPageRepository,
} from '@codelab/frontend/abstract/domain'
import type { IPage } from '@codelab/shared/abstract/core'
import type {
  PageOptions,
  PageUniqueWhere,
  PageWhere,
} from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'

import { Page } from '../store'
import {
  CreatePages,
  DeletePages,
  PageList,
  UpdatePages,
} from './page.api.graphql.gen'

export const pageRepository: IPageRepository = {
  add: async (page: IPageModel) => {
    const {
      createPages: { pages },
    } = await CreatePages({ input: page.toCreateInput() })

    const createdPage = pages[0]

    Validator.assertsDefined(createdPage)

    return createdPage
  },

  delete: async (pages: Array<IPage>) => {
    const {
      deletePages: { nodesDeleted },
    } = await DeletePages({
      delete: Page.toDeleteInput(),
      where: { id_IN: pages.map((page) => page.id) },
    })

    return nodesDeleted
  },

  find: async (where?: PageWhere, options?: PageOptions) => {
    return PageList({ options, where })
  },

  findOne: async (where: PageUniqueWhere) => {
    return (await pageRepository.find(where)).items[0]
  },

  update: async (page: IPageModel) => {
    const {
      updatePages: { pages },
    } = await UpdatePages({
      update: page.toUpdateInput(),
      where: { id: page.id },
    })

    const updatedPage = pages[0]

    Validator.assertsDefined(updatedPage)

    return updatedPage
  },
}
