import type { IPropDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'

export default Factory.define<IPropDTO>(({ params }) => {
  const dto = {
    data: params.data ?? '{}',
    id: params.id ?? v4(),
  }

  testRootStore.propService.add(dto)

  return dto
})
