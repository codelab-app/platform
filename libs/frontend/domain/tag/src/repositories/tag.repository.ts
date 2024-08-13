import type { ITagRepository } from '@codelab/frontend/abstract/domain'
import { assertIsDefined } from '@codelab/shared/utils'
import {
  CreateTags,
  DeleteTags,
  GetTags,
  UpdateTags,
} from './tag.api.graphql.gen'

export const tagRepository: ITagRepository = {
  add: async (tag) => {
    const {
      createTags: { tags },
    } = await CreateTags({
      input: [tag.toCreateInput()],
    })

    const createdTag = tags[0]

    assertIsDefined(createdTag)

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

  update: async (tag) => {
    const {
      updateTags: { tags },
    } = await UpdateTags({
      update: tag.toUpdateInput(),
      where: { id: tag.id },
    })

    const updatedTag = tags[0]

    assertIsDefined(updatedTag)

    return updatedTag
  },
}
