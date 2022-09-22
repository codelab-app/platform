import { IResourceExport } from '@codelab/shared/abstract/core'
import { createResource } from '../../repository/resource.repo'
import { logSection, logTask } from '../../shared/utils/log-task'

export const importResources = async (
  resources: Array<IResourceExport> = [],
  userId: string,
) => {
  logSection('Importing Resource')

  for (const resource of resources) {
    const importedResource = await createResource(resource, userId)

    logTask('Imported Resource', resource.name)

    console.info(`Imported resource with id ${importedResource.id}`)
  }
}
