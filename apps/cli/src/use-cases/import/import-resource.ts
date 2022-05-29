import { IResourceExport } from '@codelab/shared/abstract/core'
import { createResource } from '../../repository/resource.repo'

export const importResource = async (
  resources: Array<IResourceExport> = [],
  userId: string,
) => {
  console.log('Importing resource...')

  for (const resource of resources) {
    const importedResource = await createResource(resource, userId)

    console.info(`Imported resource with id ${importedResource.id}`)
  }
}
