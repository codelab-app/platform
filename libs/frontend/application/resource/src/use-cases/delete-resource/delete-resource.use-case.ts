import type {
  IResourceDomainService,
  IResourceModel,
} from '@codelab/frontend/abstract/domain'
import { Resource } from '@codelab/frontend-domain-resource/store'
import { deleteResourcesRepository } from './delete-resource.repository'

export const deleteResourceUseCase = async (
  resource: IResourceModel,
  resourceDomainService: IResourceDomainService,
) => {
  resourceDomainService.resources.delete(resource.id)

  await deleteResourcesRepository({
    delete: Resource.toDeleteInput(),
    where: { id: resource.id },
  })
}
