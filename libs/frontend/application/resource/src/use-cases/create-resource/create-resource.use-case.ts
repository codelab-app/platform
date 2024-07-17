import type { IResourceDomainService } from '@codelab/frontend/abstract/domain'
import { createResourcesRepository } from '@codelab/frontend-domain-resource/repositories'
import type {
  ICreateResourceData,
  IPropDto,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const createResourceUseCase = async (
  data: ICreateResourceData,
  resourceDomainService: IResourceDomainService,
) => {
  const config: IPropDto = {
    data: JSON.stringify(data.config),
    id: v4(),
  }

  const resource = resourceDomainService.hydrate({ ...data, config })

  await createResourcesRepository(resource.toCreateInput())
}
