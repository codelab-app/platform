import type { IPropDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { createTestRootStore } from '../setup/test-root-store'

export default Factory.define<IPropDTO>(({ params }) => {
  const dto = {
    data: params.data ?? '{}',
    id: params.id ?? v4(),
  }

  // createTestRootStore().propService.add(dto)

  return dto
})
