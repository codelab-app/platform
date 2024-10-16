import type { ICreateResourceData } from '@codelab/shared/abstract/core'

import { PropDomainService } from '@codelab/backend/domain/prop'
import { ResourceRepository } from '@codelab/backend/domain/resource'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ResourceApplicationService {
  constructor(
    private resourceRepository: ResourceRepository,
    private propDomainService: PropDomainService,
  ) {}

  async createResource(resourceDto: ICreateResourceData) {
    const resourceConfig = await this.propDomainService.createProp(
      resourceDto.config,
    )

    return this.resourceRepository.add({
      ...resourceDto,
      config: resourceConfig,
    })
  }
}
