import type { IPropDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { Prop } from '../store'

export const propFactory = (dto?: Partial<IPropDTO>) => {
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
