import type { IResourceExport } from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { connectOwner } from '@codelab/shared/domain/mapper'

export const createResource = async (
  resource: IResourceExport,
  userId: string,
) => {
  const Resource = await Repository.instance.Resource

  const existing = await Resource.find({
    where: { id: resource.id },
  })

  if (existing.length) {
    console.log('Deleting resource before re-creating...')

    await Resource.delete({
      where: { id: resource.id },
    })
  }

  const input = {
    id: resource.id,
    name: resource.name,
    type: resource.type,
    owner: connectOwner(userId),
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
