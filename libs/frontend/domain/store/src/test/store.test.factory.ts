import type { IRootStore } from '@codelab/frontend/abstract/application'
import type {
  IRootDomainStore,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
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
