import type { IResourceDomainService } from '@codelab/frontend/abstract/domain'
import type {
  ICreateResourceData,
  IPropDto,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { createResourcesRepository } from './create-resource.repository'

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
