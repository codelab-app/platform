import { ResourceRepository } from '@codelab/backend/domain/resource'
import type { ICreateResourceData } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ResourceApplicationService {
  constructor(private resourceRepository: ResourceRepository) {}

  async createResource(resourceDto: ICreateResourceData) {
    // return this.resourceRepository.add()
  }
}
