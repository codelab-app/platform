import type { IRootStore } from '@codelab/frontend/abstract/application'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const PropTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IPropDTO>(({ params }) => {
    const dto: IPropDTO = {
      api: {
        id: params.api?.id ?? v4(),
      },
      data: params.data ?? '{}',
      id: params.id ?? v4(),
    }

    return dto
  })
