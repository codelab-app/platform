import { PropRepository } from '@codelab/backend/domain/prop'
import { ResourceRepository } from '@codelab/backend/domain/resource'
import type { ICreateResourceData } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class ResourceApplicationService {
  constructor(
    private resourceRepository: ResourceRepository,
    private propRepository: PropRepository,
  ) {}

  async createResource(resourceDto: ICreateResourceData) {
    const resourceConfig = await this.propRepository.add({
      data: JSON.stringify(resourceDto.config),
      id: v4(),
    })

    return this.resourceRepository.add({
      ...resourceDto,
      config: resourceConfig,
    })
  }
}
