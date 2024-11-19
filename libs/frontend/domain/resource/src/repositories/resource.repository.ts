import type { IRef, IResourceDto } from '@codelab/shared/abstract/core'
import type {
  ResourceOptions,
  ResourceUniqueWhere,
  ResourceWhere,
} from '@codelab/shared/infra/gql'

import {
  CACHE_TAGS,
  type IResourceModel,
  type IResourceRepository,
} from '@codelab/frontend/abstract/domain'
import { resourceMapper } from '@codelab/shared/domain-old'
import { Validator } from '@codelab/shared/infra/schema'

import {
  CreateResources,
  DeleteResources,
  ResourceList,
  UpdateResource,
} from './resource.api.graphql.web.gen'

export const resourceRepository: IResourceRepository = {
  add: async (resource: IResourceDto) => {
    const {
      createResources: { resources },
    } = await CreateResources(
      { input: [resourceMapper.toCreateInput(resource)] },
      { revalidateTag: CACHE_TAGS.RESOURCE_LIST },
    )

    const createdResource = resources[0]

    Validator.assertsDefined(createdResource)

    return createdResource
  },

  delete: async (resources: Array<IResourceModel>) => {
    const {
      deleteResources: { nodesDeleted },
    } = await DeleteResources(
      {
        delete: { config: { where: {} } },
        where: { id_IN: resources.map((resource) => resource.id) },
      },
      { revalidateTag: CACHE_TAGS.RESOURCE_LIST },
    )

    return nodesDeleted
  },

  find: async (where?: ResourceWhere, options?: ResourceOptions) => {
    return await ResourceList(
      { options, where },
      { tags: [CACHE_TAGS.RESOURCE_LIST] },
    )
  },

  findOne: async (where: ResourceUniqueWhere) => {
    return (await resourceRepository.find(where)).items[0]
  },

  update: async ({ id }: IRef, dto: IResourceDto) => {
    const {
      updateResources: { resources },
    } = await UpdateResource(
      {
        update: resourceMapper.toUpdateInput(dto),
        where: { id },
      },
      { revalidateTag: CACHE_TAGS.RESOURCE_LIST },
    )

    const updatedResource = resources[0]

    Validator.assertsDefined(updatedResource)

    return updatedResource
  },
}
