import type { ITagRepository } from '@codelab/frontend/abstract/domain'
import type { IRef, ITagDto } from '@codelab/shared/abstract/core'

import { Validator } from '@codelab/shared/infra/schema'
import { tagMapper } from '@codelab/shared-domain-module/tag'

import {
  CreateTags,
  DeleteTags,
  GetTags,
  UpdateTags,
} from './tag.api.graphql.web.gen'

export const tagRepository: ITagRepository = {
  add: async (tag: ITagDto) => {
    const {
      createTags: { tags },
    } = await CreateTags({
      input: tagMapper.toCreateInput(tag),
    })

    const createdTag = tags[0]

    Validator.assertsDefined(createdTag)

    return createdTag
  },

  delete: async (tags) => {
    const {
      deleteTags: { nodesDeleted },
    } = await DeleteTags({
      where: { id_IN: tags.map(({ id }) => id) },
    })

    return nodesDeleted
  },

  find: async (where, options) => {
    return await GetTags({
      options,
      where: { ...where, parent: undefined },
    })
  },

  findOne: async (where) => {
    return (await tagRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, tag: ITagDto) => {
    const {
      updateTags: { tags },
    } = await UpdateTags({
      update: tagMapper.toUpdateInput(tag),
      where: { id },
    })

    const updatedTag = tags[0]

    Validator.assertsDefined(updatedTag)

    return updatedTag
  },
}
