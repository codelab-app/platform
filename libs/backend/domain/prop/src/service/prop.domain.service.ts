import type { ObjectLike } from '@codelab/shared/abstract/types'

import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

import { PropRepository } from '../repository'

@Injectable()
export class PropDomainService {
  constructor(private propRepository: PropRepository) {}

  async createProp(propData: ObjectLike = {}) {
    const data =
      propData instanceof Object ? JSON.stringify(propData) : propData

    const { id } = await this.propRepository.add({
      data,
      id: v4(),
    })

    const props = this.propRepository.findOneOrFail({ where: { id } })

    return props
  }
}
