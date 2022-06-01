import { ResourceOGM } from '@codelab/backend'
import { IResourceExport } from '@codelab/shared/abstract/core'

export const createResource = async (
  resource: IResourceExport,
  selectedUser: string,
) => {
  const Resource = await ResourceOGM()

  const {
    resources: [createdResource],
  } = await Resource.create({
    input: [
      {
        name: resource.id,
        type: resource.type,
        config: {
          create: { node: { data: resource.config.data } },
        },
      },
    ],
  })

  return createdResource
}
