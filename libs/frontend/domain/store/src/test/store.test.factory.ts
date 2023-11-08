import type {
  IRootDomainStore,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import type { DeepPartial } from 'fishery'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const StoreTestFactory = (rootStore: Partial<IRootDomainStore>) =>
  Factory.define<IStoreModel, IStoreDTO>(({ transientParams }) => {
    const dto: IStoreDTO = {
      api: { id: transientParams.api?.id ?? v4() },
      id: transientParams.id ?? v4(),
      name:
        transientParams.name ?? `${chance.word({ capitalize: true })} Store`,
    }

    const model = rootStore.storeDomainService?.hydrate(dto)

    return model!
  })

export const storeFactory =
  (rootStore: IRootDomainStore) => (dto: DeepPartial<IStoreDTO>) => {
    const store: IStoreDTO = {
      api: { id: dto.api?.id ?? v4() },
      id: dto.id ?? v4(),
      name: dto.name ?? `${chance.word({ capitalize: true })} Store`,
    }

    return rootStore.storeDomainService.hydrate(store)
  }
