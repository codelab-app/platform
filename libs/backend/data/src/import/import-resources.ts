import type { IResourceExport } from '@codelab/backend/abstract/core'
import { createResource } from '@codelab/backend/domain/resource'
import { logSection, logTask } from '@codelab/shared/utils'

export const importResources = async (
  resources: Array<IResourceExport> = [],
  userId: string,
) => {
  logSection('Importing Resource')

  for (const resource of resources) {
    const importedResource = await createResource(resource, userId)

    logTask('Imported Resource', resource.name)

    console.info(`Imported resource with id ${importedResource?.id}`)
  }
}
