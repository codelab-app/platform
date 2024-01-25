import type { IResourceDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import { type IResourceDTO, IResourceType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const resourceFactory =
  (resourceDomainService: IResourceDomainService) =>
  (dto: Partial<IResourceDTO>) => {
    const resource: IResourceDTO = {
      config: dto.config ?? {
        api: { id: v4() },
        data: JSON.stringify({}),
        id: v4(),
      },
      id: dto.id ?? v4(),
      name: dto.name ?? `${chance.word({ capitalize: true })} Resource`,
      type: dto.type ?? IResourceType.GraphQl,
    }

    return resourceDomainService.hydrate(resource)
  }
