import type { IAppDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend-domain-shared'
import { type IAppDto } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const appFactory =
  (appDomainService: IAppDomainService) => (dto: Partial<IAppDto>) => {
    const app: IAppDto = {
      domains: dto.domains ?? [],
      id: dto.id ?? v4(),
      name: dto.name ?? chance.word({ capitalize: true }),
      owner: { id: dto.owner?.id ?? v4() },
      pages: dto.pages ?? [],
    }

    return appDomainService.create(app)
  }
