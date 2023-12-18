import type { IStoreDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const storeFactory =
  (storeDomainService: IStoreDomainService) => (dto: Partial<IStoreDTO>) => {
    const store: IStoreDTO = {
      api: { id: dto.api?.id ?? v4() },
      component: dto.component ?? { id: v4() },
      id: dto.id ?? v4(),
      name: dto.name ?? `${chance.word({ capitalize: true })} Store`,
      page: dto.page ?? { id: v4() },
    }

    return storeDomainService.hydrate(store)
  }
