import type { IPageDomainService } from '@codelab/frontend/abstract/domain'
import type { IPageDto } from '@codelab/shared/abstract/core'

import { chance } from '@codelab/frontend-domain-shared'
import { IPageKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const pageFactory =
  (pageDomainService: IPageDomainService) => (dto: Partial<IPageDto>) => {
    const page: IPageDto = {
      app: { id: dto.app?.id ?? v4() },
      id: dto.id ?? v4(),
      kind: dto.kind ?? IPageKind.Regular,
      name: dto.name ?? chance.word(),
      pageContentContainer: { id: dto.pageContentContainer?.id ?? v4() },
      rootElement: { id: dto.rootElement?.id ?? v4() },
      store: { id: dto.store?.id ?? v4() },
      urlPattern: chance.word(),
    }

    return pageDomainService.hydrate(page)
  }
