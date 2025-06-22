import type { IRef, IResourceDto } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type {
  ResourceOptions,
  ResourceWhere,
} from '@codelab/shared-infra-gqlgen'

import {
  type IResourceModel,
  type IResourceRepository,
} from '@codelab/frontend-abstract-domain'
import { Validator } from '@codelab/shared-infra-typebox'
import {
  resourceMapper,
  resourceServerActions,
} from '@codelab/shared-domain-module-resource'

const { CreateResources, DeleteResources, ResourceList, UpdateResources } =
  resourceServerActions

export const resourceRepository: IResourceRepository = {
  add: async (resource: IResourceDto, next?: NextFetchOptions) => {
    const {
      createResources: { resources },
    } = await CreateResources(
      { input: [resourceMapper.toCreateInput(resource)] },
      next,
    )

    const createdResource = resources[0]

    Validator.assertsDefined(createdResource)

    return createdResource
  },

  delete: async (resources: Array<IResourceModel>, next?: NextFetchOptions) => {
    const {
      deleteResources: { nodesDeleted },
    } = await DeleteResources(
      {
        delete: { config: { where: {} } },
        where: { id_IN: resources.map((resource) => resource.id) },
      },
      next,
    )

    return nodesDeleted
  },

  find: async (
    where?: ResourceWhere,
    options?: ResourceOptions,
    next?: NextFetchOptions,
  ) => {
    return await ResourceList({ options, where }, next)
  },

  // FIXME: make a unique where
  findOne: async (where: ResourceWhere, next?: NextFetchOptions) => {
    return (await resourceRepository.find(where, {}, next)).items[0]
  },

  update: async ({ id }: IRef, dto: IResourceDto, next?: NextFetchOptions) => {
    const {
      updateResources: { resources },
    } = await UpdateResources(
      {
        update: resourceMapper.toUpdateInput(dto),
        where: { id },
      },
      next,
    )

    const updatedResource = resources[0]

    Validator.assertsDefined(updatedResource)

    return updatedResource
  },
}
