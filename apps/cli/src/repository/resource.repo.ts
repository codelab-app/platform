import { IResourceExport } from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { connectNode } from '@codelab/shared/data'

export const createResource = async (
  resource: IResourceExport,
  userId: string,
) => {
  const Resource = await Repository.instance.Resource

  const input = {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    owner: connectNode(userId),
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
