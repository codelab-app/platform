import type { ICreateResourceData } from '@codelab/shared/abstract/core'

import { ResourceRepository } from '@codelab/backend/domain/resource'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class ResourceApplicationService {
  constructor(private resourceRepository: ResourceRepository) {}

  async createResource(resourceDto: ICreateResourceData) {
    const resourceConfig = {
      data: JSON.stringify(resourceDto.config),
      id: v4(),
    }

    return this.resourceRepository.add({
      ...resourceDto,
      config: resourceConfig,
    })
  }
}
