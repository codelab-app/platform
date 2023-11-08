import type {
  IPropModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { Prop } from '../store'

export const propFactory =
  (rootStore: IRootDomainStore) => (dto?: Partial<IPropDTO>) => {
    const propDto: IPropDTO = {
      // Api is optional here
      api: dto?.api?.id
        ? {
            id: dto.api.id,
          }
        : null,
      data: dto?.data ?? '"{}"',
      id: dto?.id ?? v4(),
    }

    return Prop.create(propDto)
  }

export const PropTestFactory = (rootStore: Partial<IRootDomainStore>) =>
  Factory.define<IPropModel, IPropDTO>(({ transientParams }) => {
    const dto: IPropDTO = {
      // Api is optional here
      api: transientParams.api?.id
        ? {
            id: transientParams.api.id,
          }
        : null,
      data: transientParams.data ?? '"{}"',
      id: transientParams.id ?? v4(),
    }

    console.log('PropTestFactory', dto)

    const model = Prop.create(dto)

    return model
  })
