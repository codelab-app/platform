import type {
  IPageModel,
  IPageRepository,
} from '@codelab/frontend/abstract/domain'
import type { IPage, IRef } from '@codelab/shared/abstract/core'
import type {
  PageCreateInput,
  PageDeleteInput,
  PageOptions,
  PageUniqueWhere,
  PageUpdateInput,
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
  add: async (input: PageCreateInput) => {
    const {
      createPages: { pages },
    } = await CreatePages({ input })

    const createdPage = pages[0]

    Validator.assertsDefined(createdPage)

    return createdPage
  },

  delete: async (pages: Array<IRef>, input: PageDeleteInput) => {
    const {
      deletePages: { nodesDeleted },
    } = await DeletePages({
      delete: input,
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

  update: async ({
    update,
    where,
  }: {
    update: PageUpdateInput
    where: PageWhere
  }) => {
    const {
      updatePages: { pages },
    } = await UpdatePages({
      update,
      where,
    })

    const updatedPage = pages[0]

    Validator.assertsDefined(updatedPage)

    return updatedPage
  },
}
