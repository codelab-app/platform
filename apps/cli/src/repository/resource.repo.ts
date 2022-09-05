import { ResourceOGM } from '@codelab/backend/adapter/neo4j'
import { IResourceExport } from '@codelab/shared/abstract/core'

export const createResource = async (
  resource: IResourceExport,
  selectedUser: string,
) => {
  const Resource = await ResourceOGM()

  const input = {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    owner: { connect: { where: { node: { id: selectedUser } } } },
    config: {
      create: { node: { data: resource.config.data } },
    },
  }

  const {
    resources: [createdResource],
  } = await Resource.create({
    input: [input],
  })

  return createdResource
}
