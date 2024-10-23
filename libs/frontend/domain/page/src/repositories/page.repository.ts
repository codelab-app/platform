import type {
  IPageModel,
  IPageRepository,
} from '@codelab/frontend/abstract/domain'
import type { IPage, IPageDto, IRef } from '@codelab/shared/abstract/core'
import type {
  PageCreateInput,
  PageDeleteInput,
  PageOptions,
  PageUniqueWhere,
  PageUpdateInput,
  PageWhere,
} from '@codelab/shared/infra/gql'

import { pageMapper } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'

import { Page } from '../store'
import {
  CreatePages,
  DeletePages,
  PageList,
  UpdatePages,
} from './page.api.graphql.gen'

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
    } = await DeletePages({
      delete: pageMapper.toDeleteInput(),
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
