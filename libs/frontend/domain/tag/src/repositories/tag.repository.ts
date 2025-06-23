import type { ITagRepository } from '@codelab/frontend-abstract-domain'
import type { IRef, ITagDto } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'

import { tagMapper, tagServerActions } from '@codelab/shared-domain-module-tag'
import { Validator } from '@codelab/shared-infra-typebox'

const { CreateTags, DeleteTags, GetTags, UpdateTags } = tagServerActions

export const tagRepository: ITagRepository = {
  add: async (tag: ITagDto, next?: NextFetchOptions) => {
    const {
      createTags: { tags },
    } = await CreateTags(
      {
        input: tagMapper.toCreateInput(tag),
      },
      next,
    )

    const createdTag = tags[0]

    Validator.assertsDefined(createdTag)

    return createdTag
  },

  delete: async (tags, next?: NextFetchOptions) => {
    const {
      deleteTags: { nodesDeleted },
    } = await DeleteTags(
      {
        where: { id_IN: tags.map(({ id }) => id) },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (where, options, next?: NextFetchOptions) => {
    return await GetTags(
      {
        options,
        where,
      },
      next,
    )
  },

  findOne: async (where, next?: NextFetchOptions) => {
    return (await tagRepository.find(where, undefined, next)).items[0]
  },

  update: async ({ id }: IRef, tag: ITagDto, next?: NextFetchOptions) => {
    const {
      updateTags: { tags },
    } = await UpdateTags(
      {
        update: tagMapper.toUpdateInput(tag),
        where: { id },
      },
      next,
    )

    const updatedTag = tags[0]

    Validator.assertsDefined(updatedTag)

    return updatedTag
  },
}
