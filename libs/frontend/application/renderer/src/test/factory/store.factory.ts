import { Store } from '@codelab/frontend/domain/store'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { createTestRootStore } from '../setup/test-root-store'
import chance from './chance'

export default Factory.define<IStoreDTO>(({ params }) => {
  const dto = {
    api: { id: params.api?.id ?? v4() },
    id: params.id ?? v4(),
    name:
      params.name ??
      Store.createName({ name: chance.word({ capitalize: true }) }),
  }

  createTestRootStore().storeService.storeDomainService.add(dto)

  return dto
})
