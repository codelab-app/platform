import { Injectable } from '@nestjs/common'

import { PropRepository } from '../repository'

@Injectable()
export class PropDomainService {
  constructor(private propRepository: PropRepository) {}

  // This should not be used, since we are adding them as aggregate
  // async createProp(propData: ObjectLike = {}) {
  //   const data =
  //     propData instanceof Object ? JSON.stringify(propData) : propData

  //   const { id } = await this.propRepository.add({
  //     data,
  //     id: v4(),
  //   })

  //   const props = this.propRepository.findOneOrFail({ where: { id } })

  //   return props
  // }
}
