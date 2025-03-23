import type { IPageDto, IRef } from '@codelab/shared/abstract/core'
import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import type { PageOptions, PageWhere } from '@codelab/shared/infra/gqlgen'

import { type IPageRepository } from '@codelab/frontend/abstract/domain'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  pageMapper,
  pageServerActions,
} from '@codelab/shared-domain-module/page'

const { CreatePages, DeletePages, PageList, UpdatePages } = pageServerActions

export const pageRepository: IPageRepository = {
  add: async (input: IPageDto, next?: NextFetchOptions) => {
    const {
      createPages: { pages },
    } = await CreatePages({ input: pageMapper.toCreateInput(input) }, next)

    const createdPage = pages[0]

    Validator.assertsDefined(createdPage)

    return createdPage
  },

  delete: async (pages: Array<IRef>, next?: NextFetchOptions) => {
    const {
      deletePages: { nodesDeleted },
    } = await DeletePages(
      {
        delete: pageMapper.toDeleteInput(),
        where: { id_IN: pages.map((page) => page.id) },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: PageWhere,
    options?: PageOptions,
    next?: NextFetchOptions,
  ) => {
    return PageList({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: PageWhere, next?: NextFetchOptions) => {
    return (await pageRepository.find(where, {}, next)).items[0]
  },

  update: async ({ id }: IRef, input: IPageDto, next?: NextFetchOptions) => {
    const {
      updatePages: { pages },
    } = await UpdatePages(
      {
        update: pageMapper.toUpdateInput(input),
        where: { id },
      },
      next,
    )

    const updatedPage = pages[0]

    Validator.assertsDefined(updatedPage)

    return updatedPage
  },
}
