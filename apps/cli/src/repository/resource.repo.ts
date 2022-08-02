import { ResourceOGM } from '@codelab/backend'
import { IResourceExport } from '@codelab/shared/abstract/core'

export const createResource = async (
  resource: IResourceExport,
  selectedUser: string,
) => {
  const Resource = await ResourceOGM()

  const input = {
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
