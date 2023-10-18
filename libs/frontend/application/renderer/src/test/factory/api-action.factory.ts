import { IActionKind, type IApiActionDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'

export default Factory.define<IApiActionDTO>(({ params }) => {
  const dto: IApiActionDTO = {
    __typename: IActionKind.ApiAction as 'ApiAction',
    config: {
      id: params.config?.id ?? v4(),
    },
    id: params.id ?? v4(),
    name: params.name ?? 'renderPropType',
    resource: {
      id: params.resource?.id ?? v4(),
    },
    store: { id: params.store?.id ?? v4() },
  }

  testRootStore.actionService.add(dto)

  return dto
})
