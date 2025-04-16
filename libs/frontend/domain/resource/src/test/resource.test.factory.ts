import type { IResourceDomainService } from '@codelab/frontend-abstract-domain'

import { chance } from '@codelab/frontend-domain-shared'
import { type IResourceDto, IResourceType } from '@codelab/shared-abstract-core'
import { v4 } from 'uuid'

export const resourceFactory =
  (resourceDomainService: IResourceDomainService) =>
  (dto: Partial<IResourceDto>) => {
    const resource: IResourceDto = {
      config: dto.config ?? {
        data: JSON.stringify({}),
        id: v4(),
      },
      id: dto.id ?? v4(),
      name: dto.name ?? `${chance.word({ capitalize: true })} Resource`,
      owner: { id: v4() },
      type: dto.type ?? IResourceType.GraphQl,
    }

    return resourceDomainService.hydrate(resource)
  }
