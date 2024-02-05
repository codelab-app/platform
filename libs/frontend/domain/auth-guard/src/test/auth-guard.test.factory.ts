import type { IAuthGuardDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import { type IAuthGuardDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const authGuardFactory =
  (authGuardDomainService: IAuthGuardDomainService) =>
  (dto: Partial<IAuthGuardDTO>) => {
    const authGuard: IAuthGuardDTO = {
      config: dto.config ?? {
        api: { id: v4() },
        data: JSON.stringify({}),
        id: v4(),
      },
      id: dto.id ?? v4(),
      name: dto.name ?? `${chance.word({ capitalize: true })} Auth Guard`,
      resource: dto.resource ?? { id: v4() },
      responseTransformer: '(response) => response',
    }

    return authGuardDomainService.hydrate(authGuard)
  }
