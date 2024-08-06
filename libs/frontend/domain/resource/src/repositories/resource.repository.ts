import type {
  IResourceModel,
  IResourceRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  ResourceOptions,
  ResourceUniqueWhere,
  ResourceWhere,
} from '@codelab/frontend/infra/gql'
import { assertIsDefined } from '@codelab/shared/utils'
import {
  CreateResources,
  DeleteResources,
  ResourceList,
  UpdateResource,
} from './resource.api.graphql.gen'

export const resourceRepository: IResourceRepository = {
  add: async (resource: IResourceModel) => {
    const {
      createResources: { resources },
    } = await CreateResources({ input: [resource.toCreateInput()] })

    const createdResource = resources[0]

    assertIsDefined(createdResource)

    return createdResource
  },

  delete: async (resources: Array<IResourceModel>) => {
    const {
      deleteResources: { nodesDeleted },
    } = await DeleteResources({
      delete: { config: { where: {} } },
      where: { id_IN: resources.map((resource) => resource.id) },
    })

    return nodesDeleted
  },

  find: async (where?: ResourceWhere, options?: ResourceOptions) => {
    return await ResourceList({ options, where })
  },

  findOne: async (where: ResourceUniqueWhere) => {
    return (await resourceRepository.find(where)).items[0]
  },

  update: async (resource: IResourceModel) => {
    const {
      updateResources: { resources },
    } = await UpdateResource({
      update: resource.toUpdateInput(),
      where: { id: resource.id },
    })

    const updatedResource = resources[0]

    assertIsDefined(updatedResource)

    return updatedResource
  },
}
