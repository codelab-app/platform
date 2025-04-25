import type { IAuthGuardDomainService } from '@codelab/frontend-abstract-domain'

import { chance } from '@codelab/frontend-domain-shared'
import { type IAuthGuardDto } from '@codelab/shared-abstract-core'
import { v4 } from 'uuid'

export const authGuardFactory =
  (authGuardDomainService: IAuthGuardDomainService) =>
  (dto: Partial<IAuthGuardDto>) => {
    const authGuard: IAuthGuardDto = {
      config: dto.config ?? {
        data: JSON.stringify({}),
        id: v4(),
      },
      id: dto.id ?? v4(),
      name: dto.name ?? `${chance.word({ capitalize: true })} Auth Guard`,
      owner: dto.owner ?? { id: v4() },
      resource: dto.resource ?? { id: v4() },
      responseTransformer: '(response) => response',
    }

    return authGuardDomainService.hydrate(authGuard)
  }
