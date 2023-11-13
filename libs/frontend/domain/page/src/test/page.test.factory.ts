import type { IPageDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const pageFactory =
  (pageDomainService: IPageDomainService) => (dto: Partial<IPageDTO>) => {
    const page: IPageDTO = {
      app: { id: dto.app?.id ?? v4() },
      id: dto.id ?? v4(),
      kind: dto.kind ?? IPageKind.Regular,
      name: dto.name ?? chance.word(),
      rootElement: { id: dto.rootElement?.id ?? v4() },
      store: { id: dto.store?.id ?? v4() },
      url: chance.word(),
    }

    return pageDomainService.hydrate(page)
  }
