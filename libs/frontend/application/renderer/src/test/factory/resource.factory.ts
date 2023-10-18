import { type IResourceDTO, IResourceType } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'
import chance from './chance'

export default Factory.define<IResourceDTO>(({ params }) => {
  const dto: IResourceDTO = {
    config: {
      data: params.config?.data ?? '{}',
      id: params.config?.id ?? v4(),
    },
    id: params.id ?? v4(),
    name: params.name ?? chance.word(),
    type: IResourceType.Rest,
  }

  testRootStore.resourceService.add(dto)

  return dto
})
