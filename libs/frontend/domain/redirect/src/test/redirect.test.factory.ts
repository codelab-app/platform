import type { IRedirectDomainService } from '@codelab/frontend/abstract/domain'
import {
  type IRedirectDto,
  IRedirectTargetType,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const redirectFactory =
  (redirectDomainService: IRedirectDomainService) =>
  (dto: Partial<IRedirectDto>) => {
    const redirect: IRedirectDto = {
      authGuard: dto.authGuard ?? { id: v4() },
      id: dto.id ?? v4(),
      source: dto.source ?? { id: v4() },
      targetPage: dto.targetPage ?? { id: v4() },
      targetType: dto.targetType ?? IRedirectTargetType.Page,
      targetUrl: dto.targetUrl ?? '',
    }

    return redirectDomainService.hydrate(redirect)
  }
