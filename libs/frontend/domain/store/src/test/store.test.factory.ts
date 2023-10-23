import type { IRootStore } from '@codelab/frontend/abstract/application'
import { chance } from '@codelab/frontend/domain/shared'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const StoreTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IStoreDTO>(({ params }) => {
    const dto: IStoreDTO = {
      api: { id: params.api?.id ?? v4() },
      id: params.id ?? v4(),
      name: params.name ?? `${chance.word({ capitalize: true })} Store`,
    }

    rootStore.storeService?.storeDomainService.hydrate(dto)

    return dto
  })
