import type { IResourceExport } from '@codelab/backend/abstract/core'
import { createResource } from '@codelab/backend/domain/resource'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import { logSection, logTask } from '@codelab/shared/utils'

export const importResources = async (
  resources: Array<IResourceExport> = [],
  owner: IAuth0Owner,
) => {
  logSection('Importing Resource')

  for (const resource of resources) {
    const importedResource = await createResource(resource, owner)

    logTask('Imported Resource', resource.name)

    console.info(`Imported resource with id ${importedResource?.id}`)
  }
}
