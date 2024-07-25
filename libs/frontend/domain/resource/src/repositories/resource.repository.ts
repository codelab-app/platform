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
import { resourceApi } from './resource.api'

export const resourceRepository: IResourceRepository = {
  add: async (resource: IResourceModel) => {
    const {
      createResources: { resources },
    } = await resourceApi.CreateResources({ input: [resource.toCreateInput()] })

    const createdResource = resources[0]

    assertIsDefined(createdResource)

    return createdResource
  },

  delete: async (resources: Array<IResourceModel>) => {
    const {
      deleteResources: { nodesDeleted },
    } = await resourceApi.DeleteResources({
      delete: { config: { where: {} } },
      where: { id_IN: resources.map((resource) => resource.id) },
    })

    return nodesDeleted
  },

  find: async (where?: ResourceWhere, options?: ResourceOptions) => {
    return await resourceApi.ResourceList({ options, where })
  },

  findOne: async (where: ResourceUniqueWhere) => {
    return (await resourceRepository.find(where)).items[0]
  },

  update: async (resource: IResourceModel) => {
    const {
      updateResources: { resources },
    } = await resourceApi.UpdateResource({
      update: resource.toUpdateInput(),
      where: { id: resource.id },
    })

    const updatedResource = resources[0]

    assertIsDefined(updatedResource)

    return updatedResource
  },
}
