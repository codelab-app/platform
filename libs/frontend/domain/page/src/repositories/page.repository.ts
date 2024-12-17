import type { IPageDto, IRef } from '@codelab/shared/abstract/core'
import type {
  PageOptions,
  PageUniqueWhere,
  PageWhere,
} from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'
import {
  pageMapper,
  pageServerActions,
} from '@codelab/shared-domain-module/page'

const { CreatePages, DeletePages, PageList, UpdatePages } = pageServerActions

export const pageRepository: IPageRepository = {
  add: async (input: IPageDto) => {
    const {
      createPages: { pages },
    } = await CreatePages({ input: pageMapper.toCreateInput(input) })

    const createdPage = pages[0]

    Validator.assertsDefined(createdPage)

    return createdPage
  },

  delete: async (pages: Array<IRef>) => {
    const {
      deletePages: { nodesDeleted },
    } = await DeletePages(
      {
        delete: pageMapper.toDeleteInput(),
        where: { id_IN: pages.map((page) => page.id) },
      },
      { revalidateTag: CACHE_TAGS.PAGE_LIST },
    )

    return nodesDeleted
  },

  find: async (where?: PageWhere, options?: PageOptions) => {
    return PageList({ options, where })
  },

  findOne: async (where: PageUniqueWhere) => {
    return (await pageRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, input: IPageDto) => {
    const {
      updatePages: { pages },
    } = await UpdatePages({
      update: pageMapper.toUpdateInput(input),
      where: { id },
    })

    const updatedPage = pages[0]

    Validator.assertsDefined(updatedPage)

    return updatedPage
  },
}
